import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin, hasPermission } from "@/lib/auth";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        properties: {
          select: {
            id: true,
            title: true,
            slug: true,
            propertyType: true,
            status: true,
            price: true,
            priceFormatted: true,
            featuredImage: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
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
    if (!hasPermission(admin, "projects")) {
      return NextResponse.json({ success: false, error: "Forbidden: Insufficient permissions" }, { status: 403 });
    }

    const body = await req.json();
    const { title, tagline, description, location, totalArea, heroImage, layoutMapUrl, locationMapUrl } = body;

    if (!title || !description || !location || !heroImage) {
      return NextResponse.json(
        { success: false, error: "Title, description, location, and heroImage are required" },
        { status: 400 }
      );
    }

    const slug = slugify(title);

    const project = await prisma.project.create({
      data: {
        title,
        slug,
        tagline: tagline || null,
        description,
        location,
        totalArea: totalArea || null,
        heroImage,
        layoutMapUrl: layoutMapUrl || null,
        locationMapUrl: locationMapUrl || null,
      },
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}
