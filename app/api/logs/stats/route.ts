import { NextResponse } from "next/server";
import LogStat from "@/model/LogStat";
import { connectDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const hash = searchParams.get("hash");

    if (!hash) {
      return NextResponse.json(
        { success: false, error: "cluster hash required" },
        { status: 400 }
      );
    }

    // 1️⃣ FETCH WINDOW STATS
    const stats = await LogStat.find({ clusterHash: hash })
      .sort({ windowStart: 1 })
      .lean();

    // 2️⃣ AGGREGATION (ADD THIS PART)
    const total = stats.reduce((sum, s) => sum + s.count, 0);
    const average = stats.length ? total / stats.length : 0;
    const max = stats.length ? Math.max(...stats.map(s => s.count)) : 0;

    // 3️⃣ RETURN ENRICHED RESPONSE
    return NextResponse.json({
      success: true,
      stats,
      summary: {
        total,
        average,
        max,
        windows: stats.length,
      },
    });

  } catch (err: any) {
    console.error("Stats API error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
