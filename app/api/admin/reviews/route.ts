import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin, hasPermission } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const admin = await getSessionAdmin();
    if (!hasPermission(admin, "reviews", "add")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { name, roleOrLocation, rating, comment, avatarUrl, propertyPurchased, isApproved } = body;

    if (!name || !roleOrLocation || !comment) {
      return NextResponse.json({ success: false, error: "Name, role, and comment are required." }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        name,
        roleOrLocation,
        rating: rating ? parseInt(rating) : 5,
        comment,
        avatarUrl: avatarUrl || null,
        propertyPurchased: propertyPurchased || null,
        isApproved: isApproved !== undefined ? isApproved : true,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    console.error("Error creating review:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
