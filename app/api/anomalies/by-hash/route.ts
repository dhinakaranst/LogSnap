import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Anomaly from "@/model/Anomaly";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const hash = searchParams.get("hash");

    if (!hash) {
      return NextResponse.json({ success: true, anomaly: null });
    }

    const anomaly = await Anomaly.findOne({ clusterHash: hash })
      .sort({ detectedAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      anomaly,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
