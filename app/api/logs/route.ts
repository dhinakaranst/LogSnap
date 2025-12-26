import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { connectDB } from "@/lib/db";
import Log from "../../../model/Log";


export async function GET() {
  await connectDB();

  const logs = await Log.find()
  .sort({timestamp: -1})
  .limit(50);

  return NextResponse.json(logs);
}
