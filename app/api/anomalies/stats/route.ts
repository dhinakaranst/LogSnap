import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Anomaly from "@/model/Anomaly";

export async function GET() {
  try {
    await connectDB();

    const last24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const total = await Anomaly.countDocuments({
      detectedAt: { $gte: last24h },
    });

    const high = await Anomaly.countDocuments({
      severity: "HIGH",
      detectedAt: { $gte: last24h },
    });

    const medium = await Anomaly.countDocuments({
      severity: "MEDIUM",
      detectedAt: { $gte: last24h },
    });

    return NextResponse.json({
      success: true,
      stats: {
        total,
        high,
        medium,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
