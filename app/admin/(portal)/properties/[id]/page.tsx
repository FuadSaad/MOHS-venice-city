import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { PropertyItem } from "@/types/property";

interface PageProps {
  params: { id: string };
}

export const revalidate = 0;

export default async function EditPropertyPage({ params }: PageProps) {
  const propertyRaw = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      features: true,
    },
  });

  if (!propertyRaw) {
    notFound();
  }

  const property: PropertyItem = JSON.parse(JSON.stringify(propertyRaw));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#17232B] font-heading">
          Edit Property: {property.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Update pricing, specifications, description, and status.
        </p>
      </div>

      <PropertyForm initialData={property} isEdit={true} />
    </div>
  );
}
