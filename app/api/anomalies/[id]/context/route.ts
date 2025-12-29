import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { buildAnomalyContext } from "@/lib/buildAnomalyContext";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    const ctx = await buildAnomalyContext(id);

    return NextResponse.json({
      success: true,
      context: ctx,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
