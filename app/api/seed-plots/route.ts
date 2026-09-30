import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PLOT_DATASET } from "@/data/interactiveMapData";

export async function GET() {
  try {
    let createdCount = 0;
    
    // Create a default project if none exists
    let project = await prisma.project.findFirst();
    if (!project) {
      project = await prisma.project.create({
        data: {
          title: "MOHS Venice City",
          slug: "mohs-venice-city",
          description: "Premium township.",
          location: "Dhaka",
          heroImage: "/images/hero-bg.jpg",
        }
      });
    }

    for (const plot of PLOT_DATASET) {
      // Check if it exists
      const exists = await prisma.property.findUnique({
        where: { slug: plot.id.toLowerCase() }
      });

      if (!exists) {
        await prisma.property.create({
          data: {
            title: plot.title,
            slug: plot.id.toLowerCase(),
            propertyType: "PLOT",
            status: plot.status.toUpperCase() === "FEATURED" ? "AVAILABLE" : plot.status.toUpperCase(),
            location: plot.location,
            price: plot.price,
            priceFormatted: plot.priceFormatted,
            description: plot.description || `${plot.title} in ${plot.sector}.`,
            isFeatured: plot.status === "Featured",
            plotKatha: parseFloat(plot.size) || 3,
            plotRoadWidth: plot.roadWidth,
            facing: plot.facing,
            sectorBlock: plot.sector,
            project: { connect: { id: project.id } },
            featuredImage: "/images/plot-placeholder.webp",
          }
        });
        createdCount++;
      }
    }

    return NextResponse.json({ success: true, createdCount });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
