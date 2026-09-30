import React from "react";
import prisma from "@/lib/prisma";
import AdminPropertiesClient from "@/components/admin/AdminPropertiesClient";
import { PropertyItem } from "@/types/property";
import { getSessionAdmin, hasPermission } from "@/lib/auth";
import AccessDenied from "@/components/admin/AccessDenied";

export const revalidate = 0;

export default async function AdminPropertiesPage() {
  const admin = await getSessionAdmin();
  if (!hasPermission(admin, "properties")) {
    return <AccessDenied moduleName="Properties Management" />;
  }

  const propertiesRaw = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      features: true,
    },
  });

  const properties: PropertyItem[] = JSON.parse(JSON.stringify(propertiesRaw));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
          Property Inventory Management
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Manage, publish, update pricing, and modify availability for residential plots and flats.
        </p>
      </div>

      <AdminPropertiesClient initialProperties={properties} />
    </div>
  );
}
