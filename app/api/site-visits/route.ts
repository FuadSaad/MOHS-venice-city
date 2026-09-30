import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

// GET /api/site-visits (Admin only)
export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const visits = await prisma.siteVisit.findMany({
      include: {
        property: { select: { id: true, title: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: visits.length, data: visits });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch site visit requests" },
      { status: 500 }
    );
  }
}

// POST /api/site-visits (Public site visit request)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, propertyId, preferredDate, preferredTime, message } = body;

    if (!name || !phone || !preferredDate) {
      return NextResponse.json(
        { success: false, error: "Name, phone, and preferred date are required" },
        { status: 400 }
      );
    }

    const visit = await prisma.siteVisit.create({
      data: {
        name,
        phone,
        email: email || null,
        propertyId: propertyId || null,
        preferredDate,
        preferredTime: preferredTime || "Morning (10:00 AM - 12:00 PM)",
        message: message || null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, data: visit }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/site-visits error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to schedule site visit" },
      { status: 500 }
    );
  }
}
