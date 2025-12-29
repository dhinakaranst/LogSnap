import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { generateExplanation } from "@/lib/generateExplanation";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    await connectDB();

    const explanation = await generateExplanation(id);

    return NextResponse.json({
      success: true,
      explanation,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
