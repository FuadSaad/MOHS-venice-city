"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Maximize2, Sparkles, Filter } from "lucide-react";
import { GalleryItemType } from "@/types/property";

interface GalleryClientProps {
  initialItems: GalleryItemType[];
}

export default function GalleryClient({ initialItems }: GalleryClientProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItemType | null>(null);

  const categories = [
    { label: "All Photos", value: "ALL" },
    { label: "Masterplan", value: "PROJECTS" },
    { label: "Plots", value: "PLOTS" },
    { label: "Flats", value: "FLATS" },
    { label: "Amenities", value: "AMENITIES" },
    { label: "Location", value: "LOCATION" },
    { label: "Construction", value: "CONSTRUCTION" },
  ];

  const filteredItems = initialItems.filter((item) => {
    if (activeCategory === "ALL") return true;
    return item.category === activeCategory;
  });

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeCategory === cat.value
                ? "bg-[#00695C] text-white shadow-sm"
                : "bg-white text-[#657278] hover:text-[#12262D] hover:bg-slate-50 border border-[#E2E7E5]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModalItem(item)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 cursor-pointer shadow-soft hover:shadow-card transition-all border border-[#E2E7E5]"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#00695C] rounded-md text-[11px] font-bold uppercase tracking-wider shadow-xs">
                {item.category}
              </span>
            </div>

            {/* Title & Caption */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h4 className="text-sm font-bold line-clamp-1 font-heading">
                {item.title}
              </h4>
              {item.caption && (
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {item.caption}
                </p>
              )}
            </div>

            {/* Hover expand icon */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full bg-black/40 text-white backdrop-blur-sm">
              <Maximize2 className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E7E5]">
          <p className="text-sm text-[#657278]">No images in this category yet.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-[#E2E7E5] bg-[#F5F8F8]">
              <div>
                <span className="text-[11px] font-bold text-[#00695C] uppercase tracking-wider">
                  {activeModalItem.category}
                </span>
                <h4 className="text-base font-bold text-[#12262D] font-heading">
                  {activeModalItem.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-black hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={activeModalItem.imageUrl}
                alt={activeModalItem.title}
                fill
                className="object-contain"
              />
            </div>

            {activeModalItem.caption && (
              <div className="p-4 bg-white text-xs text-[#657278] border-t border-[#E2E7E5]">
                {activeModalItem.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
