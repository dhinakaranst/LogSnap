import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Anomaly from "@/model/Anomaly";
import LogCluster from "@/model/LogCluster";
import Log from "@/model/Log";
import { generateAnomalyExplanation } from "@/lib/ai/explainAnomaly";

export async function GET(req: Request, context: any) {
  try {
    const { id } = await context.params;

    const projectId =
      new URL(req.url).searchParams.get("projectId") || "default";

    await connectDB();

    // ✅ PROJECT-SCOPED FIND
    const anomaly = await Anomaly.findOne({
      _id: id,
      projectId,
    });

    if (!anomaly) {
      return NextResponse.json(
        { success: false, error: "Anomaly not found" },
        { status: 404 }
      );
    }

    // ✅ PROJECT-SCOPED CLUSTER
    const cluster = await LogCluster.findOne({
      projectId,
      hash: anomaly.clusterHash,
    }).lean();

    // ✅ AI explanation (safe)
    if (!anomaly.aiExplanation && cluster?.normalizedMessage) {
      const explanation = await generateAnomalyExplanation({
        severity: anomaly.severity,
        spikeCount: anomaly.count,
        message: cluster.normalizedMessage,
      });

      if (explanation) {
        anomaly.aiExplanation = explanation;
        await anomaly.save();
      }
    }

    // ✅ PROJECT-SCOPED LOGS
    const logs = await Log.find({
      projectId,
      hash: anomaly.clusterHash,
    })
      .sort({ timestamp: -1 })
      .limit(10)
      .lean();

    return NextResponse.json({
      success: true,
      anomaly,
      cluster,
      logs,
    });
  } catch (err) {
    console.error("Anomaly API error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to load anomaly details" },
      { status: 500 }
    );
  }
}
