import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PropertyDetailsClient from "@/components/property/PropertyDetailsClient";
import { PropertyItem } from "@/types/property";

interface PageProps {
  params: { slug: string };
}

export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const property = await prisma.property.findUnique({
    where: { slug: params.slug },
  });

  if (!property) {
    return {
      title: "Property Not Found | MOHS Venice City",
    };
  }

  return {
    title: `${property.title} | MOHS Venice City`,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.title} | MOHS Venice City`,
      description: property.description.slice(0, 160),
      images: [property.featuredImage],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const propertyRaw = await prisma.property.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      features: true,
      project: { select: { id: true, title: true, slug: true } },
    },
  });

  if (!propertyRaw) {
    notFound();
  }

  // Fetch similar properties of same type
  const similarRaw = await prisma.property.findMany({
    where: {
      propertyType: propertyRaw.propertyType,
      id: { not: propertyRaw.id },
      status: { not: "HIDDEN" },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const property: PropertyItem = JSON.parse(JSON.stringify(propertyRaw));
  const similarProperties: PropertyItem[] = JSON.parse(JSON.stringify(similarRaw));

  return (
    <PropertyDetailsClient
      property={property}
      similarProperties={similarProperties}
    />
  );
}
