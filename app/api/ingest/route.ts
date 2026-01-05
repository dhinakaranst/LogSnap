import { NextResponse } from "next/server";
import Log from "@/model/Log";
import LogCluster from "@/model/LogCluster";
import { connectDB } from "@/lib/db";
import { normalizeLog } from "@/lib/normalizeLog";
import { hashLog } from "@/lib/hashLog";
import LogStat from "@/model/LogStat";
import { getWindowStart } from "@/lib/timeWindow";
import Anomaly from "@/model/Anomaly";


function isClusterable(normalizedMessage: string): boolean {
  return normalizedMessage.split(" ").length >= 3;
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const projectId = body.projectId || "default";

    // 1️⃣ Normalize + hash
    const normalizedMessage = normalizeLog(body.message);
    const hash = hashLog(normalizedMessage);
    

    // 2️⃣ ALWAYS save the log
    const log = await Log.create({
      projectId,
      level: body.level,
      message: body.message,
      normalizedMessage,
      hash,
      source: body.source,
      metadata: body.metadata || {},
    });

    // 3️⃣ SAFETY CHECK — skip clustering if message is weak
    if (!isClusterable(normalizedMessage)) {
      return NextResponse.json({
        success: true,
        log,
        clustered: false,
        reason: "Message too generic to cluster",
      });
    }

    // 4️⃣ CLUSTERING (only if clusterable)
    await LogCluster.findOneAndUpdate(
      { projectId, hash },
      {
        $setOnInsert: {
          projectId,
          normalizedMessage,
          firstSeen: new Date(),
        },
        $inc: { count: 1 },
        $set: { lastSeen: new Date() },
      },
      { upsert: true }
    );

    const windowStart = getWindowStart(new Date());

      await LogStat.findOneAndUpdate(
  {
    projectId,
    clusterHash: hash,
    windowStart,
  },
  {
    $setOnInsert: {
      projectId,
      clusterHash: hash,
      windowStart,
    },
    $inc: { count: 1 },
  },
  { upsert: true }
);

          //SPIKE DETECTION
    const recentStats = await LogStat.find({ projectId, clusterHash: hash })
      .sort({ windowStart: -1 })
      .limit(6)
      .lean();

    if (recentStats.length >= 2) {
      const current = recentStats[0];
      const previous = recentStats.slice(1);

      const baseline =
        previous.reduce((sum, s) => sum + s.count, 0) / previous.length;

      if (current.count >= Math.max(5, baseline * 3)) {
        let severity: "LOW" | "MEDIUM" | "HIGH" = "LOW";

        if (current.count >= baseline * 5) severity = "HIGH";
        else if (current.count >= baseline * 3) severity = "MEDIUM";

       await Anomaly.findOneAndUpdate(
  {
    projectId,                    // ✅ ADD
    clusterHash: hash,
    windowStart: current.windowStart,
  },
  {
    projectId,
    clusterHash: hash,
    windowStart: current.windowStart,
    count: current.count,
    baseline,
    severity,
    reason: "Spike detected compared to recent baseline",
    detectedAt: new Date(),
  },
  { upsert: true }
);


      }
    }



    // 5️⃣ Success response
    return NextResponse.json({
      success: true,
      log,
      clustered: true,
    });

  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
