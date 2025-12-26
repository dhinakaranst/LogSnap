import { NextResponse } from "next/server";
import Log from "@/model/Log";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    const logs = await Log.find()
      .sort({ timestamp: -1 })
      .limit(50);

    return NextResponse.json({ success: true, logs });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
