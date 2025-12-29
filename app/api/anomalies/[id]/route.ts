import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Anomaly from "@/model/Anomaly";
import LogCluster from "@/model/LogCluster";
import Log from "@/model/Log";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const anomaly = await Anomaly.findById(id).lean();

    if (!anomaly) {
      return NextResponse.json(
        { success: false, error: "Anomaly not found" },
        { status: 404 }
      );
    }

    const cluster = await LogCluster.findOne({
      hash: anomaly.clusterHash,
    }).lean();

    const logs = await Log.find({
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
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
