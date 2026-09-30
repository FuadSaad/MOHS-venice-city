import React from "react";
import prisma from "@/lib/prisma";
import GalleryClient from "@/components/gallery/GalleryClient";
import { GalleryItemType } from "@/types/property";
import { ShieldCheck, Camera } from "lucide-react";

export const revalidate = 0;

export default async function GalleryPage() {
  const itemsRaw = await prisma.galleryItem.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const items: GalleryItemType[] = JSON.parse(JSON.stringify(itemsRaw));

  return (
    <div className="py-10 sm:py-16 bg-[#F5F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12262D] font-heading tracking-tight">
            Photo Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#657278] mt-2">
            Explore authentic photographs of our demarcated residential plots, luxury
            model apartments, Venice water canals, and ongoing civil construction.
          </p>
        </div>

        {/* Gallery Client Component */}
        <GalleryClient initialItems={items} />
      </div>
    </div>
  );
}
