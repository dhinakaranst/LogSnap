import { NextResponse } from "next/server";
import Log from "@/model/Log";
import {connectDB} from "@/lib/db";

export async function POST(req: Request){
  try{
    await connectDB();
    const body = await req.json();

    const log = await Log.create({
      level: body.level,
      message: body.message,
      source: body.source,
      metadata: body.metadata || {}
    });

    return NextResponse.json({success: true, log});
  }
  catch(err: any){
    return NextResponse.json(
      {success: false, error: err.message},
      {status : 500}
    );
  }

}