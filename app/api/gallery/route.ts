import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where: any = {};
    if (category && category !== "ALL") {
      where.category = category.toUpperCase();
    }

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json({ success: true, count: items.length, data: items });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, category, imageUrl, caption, sortOrder } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { success: false, error: "Title and Image URL are required" },
        { status: 400 }
      );
    }

    const newItem = await prisma.galleryItem.create({
      data: {
        title,
        category: category ? category.toUpperCase() : "PROJECTS",
        imageUrl,
        caption: caption || null,
        sortOrder: sortOrder ? parseInt(sortOrder) : 0,
      },
    });

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to add gallery item" },
      { status: 500 }
    );
  }
}
