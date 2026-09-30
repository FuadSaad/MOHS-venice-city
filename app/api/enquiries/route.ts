import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin, hasPermission } from "@/lib/auth";

// GET /api/enquiries (Admin only)
export async function GET(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if (!hasPermission(admin, "enquiries")) {
      return NextResponse.json({ success: false, error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    const enquiries = await prisma.enquiry.findMany({
      include: {
        property: { select: { id: true, title: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}

// POST /api/enquiries (Public enquiry form)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, propertyId, propertyType, preferredLocation, budget, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        propertyId: propertyId || null,
        propertyType: propertyType || "ANY",
        preferredLocation: preferredLocation || null,
        budget: budget || null,
        message: message || "General Property Enquiry",
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/enquiries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}
