import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth/jwt";
import { connectToDatabase } from "@/lib/database/mongoose";
import Series from "@/lib/database/models/series.model";
import { inngest } from "@/inngest/client";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: seriesId } = await context.params;
    if (!seriesId) {
      return NextResponse.json({ success: false, error: "Series ID missing" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const decoded = await verifyJwt(token);
    if (!decoded?.userId) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    await connectToDatabase();
    const series = await Series.findOne({ _id: seriesId, userId: decoded.userId });
    if (!series) {
      return NextResponse.json({ success: false, error: "Series not found" }, { status: 404 });
    }

    // Update status to 'scripting'
    await Series.updateOne({ _id: seriesId }, { status: 'scripting' });

    // Trigger Inngest workflow
    await inngest.send({
      name: "series/generate",
      data: { seriesId },
    });

    return NextResponse.json({ success: true, message: "Video generation started" });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: seriesId } = await context.params;
    if (!seriesId) return NextResponse.json({ success: false, error: "Series ID missing" }, { status: 400 });

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    
    const decoded = await verifyJwt(token);
    if (!decoded?.userId && !decoded?.id) return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });

    await connectToDatabase();
    const series = await Series.findOne({ _id: seriesId, userId: decoded.userId || decoded.id });
    if (!series) return NextResponse.json({ success: false, error: "Series not found" }, { status: 404 });

    return NextResponse.json({ success: true, series });
  } catch (error) {
    console.error("Series GET API error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: seriesId } = await context.params;
    if (!seriesId) return NextResponse.json({ success: false, error: "Series ID missing" }, { status: 400 });

    const body = await req.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    
    const decoded = await verifyJwt(token);
    if (!decoded?.userId && !decoded?.id) return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });

    await connectToDatabase();
    
    const updated = await Series.findOneAndUpdate(
      { _id: seriesId, userId: decoded.userId || decoded.id },
      { $set: body },
      { new: true }
    );
    
    if (!updated) return NextResponse.json({ success: false, error: "Series not found" }, { status: 404 });

    return NextResponse.json({ success: true, series: updated });
  } catch (error) {
    console.error("Series PUT API error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}