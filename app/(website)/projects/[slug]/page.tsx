import React from "react";
import prisma from "@/lib/prisma";
import PlotFilterClient from "@/components/property/PlotFilterClient";
import { PropertyItem } from "@/types/property";
import { ShieldCheck, MapPin } from "lucide-react";

export const revalidate = 0;

export default async function PlotsPage() {
  const plotsRaw = await prisma.property.findMany({
    where: {
      propertyType: "PLOT",
      status: { not: "HIDDEN" },
    },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      features: true,
      project: { select: { id: true, title: true, slug: true } },
    },
    orderBy: [
      { isFeatured: "desc" },
      { createdAt: "desc" },
    ],
  });

  const plots: PropertyItem[] = JSON.parse(JSON.stringify(plotsRaw));

  return (
    <div className="py-10 sm:py-16 bg-[#F5F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12262D] font-heading tracking-tight">
            Verified Residential Plots
          </h1>
          <p className="text-sm sm:text-base text-[#657278] mt-2 max-w-2xl">
            Choose from 3 Katha, 5 Katha, 7.5 Katha, and 10 Katha high-land ready
            plots with immediate mutation clearance and direct arterial road connectivity.
          </p>
        </div>

        {/* Filter & Listing */}
        <PlotFilterClient initialPlots={plots} />
      </div>
    </div>
  );
}
