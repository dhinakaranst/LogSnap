import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Anomaly from "@/model/Anomaly";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const severity = searchParams.get("severity");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const query: any = {};
    if (severity) {
      query.severity = severity;
    }

    const anomalies = await Anomaly.find(query)
      .sort({ detectedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Anomaly.countDocuments(query);

    return NextResponse.json({
      success: true,
      anomalies,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
