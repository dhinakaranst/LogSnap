import { NextResponse } from "next/server";
import Log from "@/model/Log";
import { connectDB } from "@/lib/db";
import { normalizeLog } from "@/lib/normalizeLog";
import { hashLog } from "@/lib/hashLog";
import LogCluster from "@/model/LogCluster";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const normalizedMessage = normalizeLog(body.message);
    const hash = hashLog(normalizedMessage);

    const log = await Log.create({
      level: body.level,
      message: body.message,
      normalizedMessage,
      hash,
      source: body.source,
      metadata: body.metadata || {},
    });

      await LogCluster.findOneAndUpdate(
    { hash },
    {
      $setOnInsert: {
        normalizedMessage,
        firstSeen: new Date(),
      },
      $inc: { count: 1 },
      $set: { lastSeen: new Date() },
    },
    { upsert: true }
  );

    return NextResponse.json({ success: true, log });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
