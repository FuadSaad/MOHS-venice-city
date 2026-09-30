import React from "react";
import { Metadata } from "next";
import InteractiveMapViewer from "@/components/map/InteractiveMapViewer";

import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Interactive Property Map | MOHS Venice City",
  description:
    "Explore the official masterplan of MOHS Venice City interactively. View and select available residential plots, modern apartments, and community amenities in real-time.",
};

export default async function InteractiveMapPage() {
  const dbPlots = await prisma.property.findMany({
    where: { propertyType: "PLOT" },
    select: {
      id: true,
      slug: true,
      title: true,
      status: true,
      price: true,
      priceFormatted: true,
      isFeatured: true,
    }
  });

  return <InteractiveMapViewer dbPlots={dbPlots} />;
}
