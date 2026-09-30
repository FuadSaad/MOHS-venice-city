import React from "react";
import PropertyForm from "@/components/admin/PropertyForm";
import prisma from "@/lib/prisma";
import { getSessionAdmin, hasPermission } from "@/lib/auth";
import AccessDenied from "@/components/admin/AccessDenied";

export default async function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const admin = await getSessionAdmin();
  if (!hasPermission(admin, "properties")) {
    return <AccessDenied moduleName="Properties Management" />;
  }

  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      features: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
          Edit Property: {property?.title || params.id}
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Update pricing, details, features, or images for this property.
        </p>
      </div>

      <PropertyForm initialData={property ? JSON.parse(JSON.stringify(property)) : undefined} />
    </div>
  );
}
