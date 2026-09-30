import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSessionAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";

// GET /api/properties?type=plot&location=Sector+3&minPrice=...
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type"); // "plot" or "flat"
    const location = searchParams.get("location");
    const katha = searchParams.get("katha");
    const beds = searchParams.get("beds");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const limit = searchParams.get("limit");

    const where: any = {};

    if (type) {
      where.propertyType = type.toUpperCase();
    }

    if (location) {
      where.location = { contains: location };
    }

    if (status) {
      where.status = status.toUpperCase();
    } else {
      where.status = { not: "HIDDEN" };
    }

    if (katha) {
      const parsedKatha = parseFloat(katha);
      if (!isNaN(parsedKatha)) {
        where.plotKatha = { gte: parsedKatha };
      }
    }

    if (beds) {
      const parsedBeds = parseInt(beds);
      if (!isNaN(parsedBeds)) {
        where.bedrooms = parsedBeds;
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { location: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const properties = await prisma.property.findMany({
      where,
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        features: true,
        project: { select: { id: true, title: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json({ success: true, count: properties.length, data: properties });
  } catch (error: any) {
    console.error("GET /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

// POST /api/properties (Admin only)
export async function POST(req: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      propertyType,
      status,
      location,
      address,
      price,
      priceFormatted,
      description,
      overview,
      isFeatured,
      isReady,
      isCorner,
      plotKatha,
      plotRoadWidth,
      facing,
      landCategory,
      sectorBlock,
      flatSizeSqft,
      bedrooms,
      bathrooms,
      floorNumber,
      parkingAvailable,
      handoverStatus,
      featuredImage,
      layoutMapUrl,
      locationMapUrl,
      brochureUrl,
      projectId,
      features,
      images,
    } = body;

    if (!title || !propertyType || !location || !price) {
      return NextResponse.json(
        { success: false, error: "Title, property type, location, and price are required" },
        { status: 400 }
      );
    }

    // Generate unique slug
    let baseSlug = slugify(title);
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await prisma.property.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    const newProperty = await prisma.property.create({
      data: {
        title,
        slug: uniqueSlug,
        propertyType: propertyType.toUpperCase(),
        status: status ? status.toUpperCase() : "AVAILABLE",
        location,
        address: address || null,
        price: parseFloat(price),
        priceFormatted: priceFormatted || `৳ ${parseFloat(price).toLocaleString("en-IN")}`,
        description,
        overview: overview || null,
        isFeatured: Boolean(isFeatured),
        isReady: Boolean(isReady),
        isCorner: Boolean(isCorner),
        plotKatha: plotKatha ? parseFloat(plotKatha) : null,
        plotRoadWidth: plotRoadWidth || null,
        facing: facing || null,
        landCategory: landCategory || "Residential",
        sectorBlock: sectorBlock || null,
        flatSizeSqft: flatSizeSqft ? parseInt(flatSizeSqft) : null,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        floorNumber: floorNumber || null,
        parkingAvailable: parkingAvailable !== undefined ? Boolean(parkingAvailable) : true,
        handoverStatus: handoverStatus || null,
        featuredImage:
          featuredImage ||
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
        layoutMapUrl: layoutMapUrl || null,
        locationMapUrl: locationMapUrl || null,
        brochureUrl: brochureUrl || null,
        projectId: projectId || null,
        features: features && Array.isArray(features)
          ? {
              create: features.map((f: string) => ({ name: f, category: "SPEC" })),
            }
          : undefined,
        images: images && Array.isArray(images)
          ? {
              create: images.map((img: string, idx: number) => ({ url: img, sortOrder: idx })),
            }
          : undefined,
      },
      include: {
        images: true,
        features: true,
      },
    });

    return NextResponse.json({ success: true, data: newProperty }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create property" },
      { status: 500 }
    );
  }
}
