import React from "react";
import prisma from "@/lib/prisma";
import FlatFilterClient from "@/components/property/FlatFilterClient";
import { PropertyItem } from "@/types/property";
import { Building, ShieldCheck } from "lucide-react";

export const revalidate = 0;

export default async function FlatsPage() {
  const flatsRaw = await prisma.property.findMany({
    where: {
      propertyType: "FLAT",
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

  const flats: PropertyItem[] = JSON.parse(JSON.stringify(flatsRaw));

  return (
    <div className="py-10 sm:py-16 bg-[#F7F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Banner Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5F1] text-[#006B5B] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C99A3D]" />
            MOHS VENICE CITY • MODERN APARTMENTS
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17232B] font-heading tracking-tight">
            Modern Luxury Flats & Penthouses
          </h1>
          <p className="text-sm sm:text-base text-[#657278] mt-2 max-w-2xl">
            Explore 2, 3, and 4-bedroom apartments offering panoramic lake vistas,
            premium European fittings, and tranquil waterfront breezes.
          </p>
        </div>

        {/* Filter & Listing */}
        <FlatFilterClient initialFlats={flats} />
      </div>
    </div>
  );
}
