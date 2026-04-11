import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth/jwt";
import { connectToDatabase } from "@/lib/database/mongoose";
import Video from "@/lib/database/models/video.model";
import Series from "@/lib/database/models/series.model";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: seriesId } = await context.params;
    
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decoded;
    try { decoded = await verifyJwt(token); } catch(e) { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }
    const userId = decoded?.userId || decoded?.id;

    await connectToDatabase();
    const videos = await Video.find({ seriesId, userId }).sort({ order: 1 });
    return NextResponse.json({ videos });
  } catch(e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: seriesId } = await context.params;
    
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let decoded;
    try { decoded = await verifyJwt(token); } catch(e) { return NextResponse.json({ error: "Invalid token" }, { status: 401 }); }
    const userId = decoded?.userId || decoded?.id;

    await connectToDatabase();
    
    // Determine episode order
    const videoCount = await Video.countDocuments({ seriesId });
    const order = videoCount + 1;

    // Fetch the series to get title
    const series = await Series.findOne({ _id: seriesId, userId });
    let titlePrefix = series ? series.seriesTitle : "Series";

    // Create the video
    const video = await Video.create({
        seriesId,
        userId,
        order,
        title: `${titlePrefix} Episode ${order}`,
        status: 'draft'
    });

    return NextResponse.json({ video });
  } catch(e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
