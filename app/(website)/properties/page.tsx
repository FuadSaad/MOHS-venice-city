import React from "react";
import prisma from "@/lib/prisma";
import { PropertyItem } from "@/types/property";
import PropertyCard from "@/components/property/PropertyCard";
import { ShieldCheck, Search, Filter } from "lucide-react";
import Link from "next/link";
import HorizontalFilterBar from "@/components/property/HorizontalFilterBar";

export const revalidate = 0;

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const type = searchParams.type?.toUpperCase();
  const search = searchParams.search;

  const where: any = {
    status: { not: "HIDDEN" },
  };

  if (type && (type === "PLOT" || type === "FLAT")) {
    where.propertyType = type;
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { location: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const propertiesRaw = await prisma.property.findMany({
    where,
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      features: true,
      project: { select: { id: true, title: true, slug: true } },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });

  const properties: PropertyItem[] = JSON.parse(JSON.stringify(propertiesRaw));

  return (
    <div className="py-10 sm:py-16 bg-[#F5F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12262D] font-heading tracking-tight">
            All Verified Properties
          </h1>
          <p className="text-sm sm:text-base text-[#657278] mt-2 max-w-2xl">
            Browse our complete inventory of verified residential plots and modern
            apartments across all sectors of MOHS Venice City.
          </p>
        </div>

        {/* Horizontal Filter Bar matching screenshot */}
        <HorizontalFilterBar />


        {/* Grid */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E7E5] p-8">
            <p className="text-base text-[#12262D] font-bold">
              No properties matched your criteria.
            </p>
            <Link
              href="/properties"
              className="mt-4 inline-block px-5 py-2 bg-[#00695C] text-white rounded-xl text-sm font-semibold hover:bg-[#005B50]"
            >
              Reset Filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
