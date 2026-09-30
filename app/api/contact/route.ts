import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, propertyType, preferredLocation, budget, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const contactLead = await prisma.enquiry.create({
      data: {
        name,
        phone,
        email: email || null,
        propertyType: propertyType || "ANY",
        preferredLocation: preferredLocation || null,
        budget: budget || null,
        message: message || "Direct Contact Form Submission",
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, data: contactLead }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process contact message" },
      { status: 500 }
    );
  }
}
