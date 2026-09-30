import React from "react";
import prisma from "@/lib/prisma";
import AdminGalleryClient from "@/components/admin/AdminGalleryClient";
import { GalleryItemType } from "@/types/property";
import { getSessionAdmin, hasPermission } from "@/lib/auth";
import AccessDenied from "@/components/admin/AccessDenied";

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const admin = await getSessionAdmin();
  if (!hasPermission(admin, "gallery")) {
    return <AccessDenied moduleName="Photo Gallery" />;
  }

  const itemsRaw = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  const items: GalleryItemType[] = JSON.parse(JSON.stringify(itemsRaw));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
          Photo Gallery Management
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Upload and manage photos for residential plots, apartments, canal waterways, and amenities.
        </p>
      </div>

      <AdminGalleryClient initialItems={items} />
    </div>
  );
}
