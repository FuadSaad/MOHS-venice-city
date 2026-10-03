import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin, hasPermission } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const admin = await getSessionAdmin();
    if (!hasPermission(admin, "reviews", "edit")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const { id } = params;
    const body = await req.json();
    const { name, roleOrLocation, rating, comment, avatarUrl, propertyPurchased, isApproved } = body;

    const review = await prisma.review.update({
      where: { id },
      data: {
        name,
        roleOrLocation,
        rating: rating ? parseInt(rating) : undefined,
        comment,
        avatarUrl,
        propertyPurchased,
        isApproved,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error: any) {
    console.error("Error updating review:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const admin = await getSessionAdmin();
    if (!hasPermission(admin, "reviews", "delete")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const { id } = params;
    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting review:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
