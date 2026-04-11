import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth/jwt";
import Series from "@/lib/database/models/series.model";
import { inngest } from "@/inngest/client";
import { connectToDatabase } from "@/lib/database/mongoose";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decoded;
    try { decoded = await verifyJwt(token); } 
    catch(e) { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }
    
    const userId = decoded?.userId || decoded?.id;
    if (!userId) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const paramsResolved = await params;

    await connectToDatabase();
    const series = await Series.findOne({ _id: paramsResolved.id, userId });
    
    if (!series) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    await inngest.send({ name: 'series/generate', data: { seriesId: paramsResolved.id } });
    await Series.updateOne({ _id: paramsResolved.id }, { status: 'scripting' });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
