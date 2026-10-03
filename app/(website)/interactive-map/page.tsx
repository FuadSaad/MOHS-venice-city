import React from "react";
import InteractiveMapDemoClient from "@/components/map/InteractiveMapDemoClient";
import prisma from "@/lib/prisma";
import { getWebsiteSettings } from "@/lib/settings";

export const metadata = {
  title: "Interactive Masterplan | MOHS Venice City",
  description: "Explore our master-planned sectors side-by-side. View detailed plot layouts, check real-time availability, and find the perfect location for your future home or business.",
};

export const revalidate = 60;

export default async function InteractiveMapPage() {
  const plots = await prisma.property.findMany({
    where: { propertyType: "PLOT" },
    orderBy: { createdAt: "desc" },
  });

  const settings = await getWebsiteSettings();

  return (
    <div className="w-full">
      <InteractiveMapDemoClient initialPlots={plots} settings={settings} />
    </div>
  );
}
