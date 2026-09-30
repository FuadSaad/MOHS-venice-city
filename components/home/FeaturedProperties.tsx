"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { PropertyItem } from "@/types/property";
import PropertyCard from "@/components/property/PropertyCard";

interface FeaturedPropertiesProps {
  initialProperties: PropertyItem[];
}

export default function FeaturedProperties({
  initialProperties,
}: FeaturedPropertiesProps) {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "PLOT" | "FLAT">("ALL");

  const filteredProperties = initialProperties.filter((item) => {
    if (activeFilter === "ALL") return true;
    return item.propertyType === activeFilter;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#F7F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17232B] font-heading tracking-tight">
              Prime Plots & Modern Flats
            </h2>
            <p className="text-sm sm:text-base text-[#657278] mt-2 max-w-xl">
              Explore our carefully selected residential plots and flats in the most
              promising sectors of MOHS Venice City.
            </p>
          </div>

          {/* Filter tabs & View All */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex p-1 bg-white rounded-xl border border-[#E2E7E5] shadow-xs">
              <button
                type="button"
                onClick={() => setActiveFilter("ALL")}
                className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeFilter === "ALL"
                    ? "bg-[#006B5B] text-white shadow-xs"
                    : "text-[#657278] hover:text-[#17232B]"
                }`}
              >
                All Properties
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("PLOT")}
                className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeFilter === "PLOT"
                    ? "bg-[#006B5B] text-white shadow-xs"
                    : "text-[#657278] hover:text-[#17232B]"
                }`}
              >
                Residential Plots
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("FLAT")}
                className={`px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  activeFilter === "FLAT"
                    ? "bg-[#006B5B] text-white shadow-xs"
                    : "text-[#657278] hover:text-[#17232B]"
                }`}
              >
                Modern Flats
              </button>
            </div>

            <Link
              href="/properties"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#006B5B] hover:text-[#004F45] transition-colors pl-2"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.slice(0, 6).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E2E7E5] p-8">
            <p className="text-[#657278] text-base">
              No properties found in this category.
            </p>
          </div>
        )}

        {/* Mobile View All CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-white border border-[#E2E7E5] rounded-xl text-sm font-bold text-[#006B5B] shadow-xs"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
