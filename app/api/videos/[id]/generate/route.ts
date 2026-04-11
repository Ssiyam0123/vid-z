import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth/jwt";
import Video from "@/lib/database/models/video.model";
import { inngest } from "@/inngest/client";
import { connectToDatabase } from "@/lib/database/mongoose";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: videoId } = await context.params;
    if (!videoId) return NextResponse.json({ success: false }, { status: 400 });

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decoded;
    try { decoded = await verifyJwt(token); } catch(e) { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }
    const userId = decoded?.userId || decoded?.id;

    await connectToDatabase();
    
    // Confirm video exists and belongs to user
    const video = await Video.findOne({ _id: videoId, userId });
    if (!video) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    // Ensure status is explicitly reset to scripting before dispatching Inngest queue
    await Video.updateOne({ _id: videoId }, { status: "scripting" });

    // trigger Inngest workflow (this proxies to the single-video orchestrated event payload array structure instead of legacy series wide)
    await inngest.send({ name: "video/generate", data: { videoId } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Trigger generation error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
