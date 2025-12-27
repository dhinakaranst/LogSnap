import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Log from "@/model/Log";

export async function GET() {
  try {
    await connectDB();

    const totalLogs = await Log.countDocuments();
    const errorLogs = await Log.countDocuments({ level: "ERROR" });
    const warnLogs = await Log.countDocuments({ level: "WARN" });

    return NextResponse.json({
      success: true,
      stats: {
        total: totalLogs,
        errors: errorLogs,
        warnings: warnLogs,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
