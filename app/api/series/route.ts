import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/auth/jwt";
import { connectToDatabase } from "@/lib/database/mongoose";
import Series from "@/lib/database/models/series.model";

export async function GET() {
  try {
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
    const series = await Series.find({ userId: decoded.userId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, series });
  } catch (error) {
    console.error("GET /api/series error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}