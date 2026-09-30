import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";

// GET /api/properties/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const property = await prisma.property.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        features: true,
        project: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: property });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}

// PUT /api/properties/[id] (Admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    const existing = await prisma.property.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }

    const updated = await prisma.property.update({
      where: { id },
      data: {
        title: body.title !== undefined ? body.title : undefined,
        status: body.status !== undefined ? body.status.toUpperCase() : undefined,
        location: body.location !== undefined ? body.location : undefined,
        address: body.address !== undefined ? body.address : undefined,
        price: body.price !== undefined ? parseFloat(body.price) : undefined,
        priceFormatted: body.priceFormatted !== undefined ? body.priceFormatted : undefined,
        description: body.description !== undefined ? body.description : undefined,
        overview: body.overview !== undefined ? body.overview : undefined,
        isFeatured: body.isFeatured !== undefined ? Boolean(body.isFeatured) : undefined,
        isReady: body.isReady !== undefined ? Boolean(body.isReady) : undefined,
        isCorner: body.isCorner !== undefined ? Boolean(body.isCorner) : undefined,
        plotKatha: body.plotKatha !== undefined ? parseFloat(body.plotKatha) : undefined,
        plotRoadWidth: body.plotRoadWidth !== undefined ? body.plotRoadWidth : undefined,
        facing: body.facing !== undefined ? body.facing : undefined,
        landCategory: body.landCategory !== undefined ? body.landCategory : undefined,
        flatSizeSqft: body.flatSizeSqft !== undefined ? parseInt(body.flatSizeSqft) : undefined,
        bedrooms: body.bedrooms !== undefined ? parseInt(body.bedrooms) : undefined,
        bathrooms: body.bathrooms !== undefined ? parseInt(body.bathrooms) : undefined,
        parkingAvailable: body.parkingAvailable !== undefined ? Boolean(body.parkingAvailable) : undefined,
        featuredImage: body.featuredImage !== undefined ? body.featuredImage : undefined,
        layoutMapUrl: body.layoutMapUrl !== undefined ? body.layoutMapUrl : undefined,
        locationMapUrl: body.locationMapUrl !== undefined ? body.locationMapUrl : undefined,
      },
      include: {
        images: true,
        features: true,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update property" },
      { status: 500 }
    );
  }
}

// DELETE /api/properties/[id] (Admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await prisma.property.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Property deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to delete property" },
      { status: 500 }
    );
  }
}
