"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Heart,
  ArrowRight,
  Maximize2,
  Compass,
  Bed,
  Bath,
  Car,
  CheckCircle2,
} from "lucide-react";
import { PropertyItem } from "@/types/property";
import { formatBDTFull } from "@/lib/utils";

interface PropertyCardProps {
  property: PropertyItem;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const isPlot = property.propertyType === "PLOT";

  return (
    <div className="group bg-white rounded-card border border-[#E2E7E5] overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 flex flex-col h-full">
      {/* Image container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <Image
          src={property.featuredImage || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-sm ${
              isPlot ? "bg-[#00695C]" : "bg-[#12262D]"
            }`}
          >
            {isPlot ? "Residential Plot" : "Apartment / Flat"}
          </span>
          {property.isReady && (
            <span className="bg-emerald-600/90 text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-sm flex items-center gap-1 backdrop-blur-sm">
              <CheckCircle2 className="w-3 h-3 text-[#D6A84F]" /> Ready
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors backdrop-blur-md shadow-sm ${
            isFavorite
              ? "bg-rose-50 text-rose-600"
              : "bg-white/80 hover:bg-white text-slate-700"
          }`}
          aria-label="Add to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-600" : ""}`} />
        </button>

        {/* Price on image bottom */}
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xs text-slate-200 font-medium">Price</p>
          <p className="text-lg sm:text-xl font-bold font-heading text-white drop-shadow-sm">
            {formatBDTFull(property.price)}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location row */}
          <div className="flex items-center gap-1.5 text-xs text-[#657278] mb-2 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#00695C] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <Link href={`/properties/${property.slug}`}>
            <h3 className="text-base sm:text-lg font-bold text-[#12262D] hover:text-[#00695C] transition-colors line-clamp-2 leading-snug mb-3 font-heading">
              {property.title}
            </h3>
          </Link>

          {/* Property Specific Specs */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#F5F8F8] rounded-lg border border-[#E2E7E5]/70 text-xs text-[#12262D] mb-4">
            {isPlot ? (
              <>
                <div className="flex flex-col">
                  <span className="text-[#657278] text-[11px]">Size</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-[#00695C]" />
                    {property.plotKatha} Katha
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#657278] text-[11px]">Road</span>
                  <span className="font-semibold truncate">
                    {property.plotRoadWidth || "40 Ft"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#657278] text-[11px]">Facing</span>
                  <span className="font-semibold flex items-center gap-1 truncate">
                    <Compass className="w-3 h-3 text-[#00695C]" />
                    {property.facing || "South"}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <span className="text-[#657278] text-[11px]">Size</span>
                  <span className="font-semibold">
                    {property.flatSizeSqft} Sq Ft
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#657278] text-[11px]">Bed / Bath</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Bed className="w-3 h-3 text-[#00695C]" />
                    {property.bedrooms}B / {property.bathrooms}B
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#657278] text-[11px]">Parking</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Car className="w-3 h-3 text-[#00695C]" />
                    {property.parkingAvailable ? "Yes" : "N/A"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Card Footer / CTA */}
        <div className="pt-3 border-t border-[#E2E7E5] flex items-center justify-between">
          <span className="text-xs font-medium text-[#657278]">
            Status: <span className="text-emerald-700 font-bold">{property.status}</span>
          </span>
          <Link
            href={`/properties/${property.slug}`}
            className="text-xs font-semibold text-[#00695C] group-hover:text-[#005B50] flex items-center gap-1 transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
