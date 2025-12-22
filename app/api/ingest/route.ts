import { NextResponse } from "next/server";
import { addLog } from "../../lib/logStore";

export async function POST(req: Request) {
  const log = await req.json();
  addLog(log);

  return NextResponse.json({ success: true });
}
