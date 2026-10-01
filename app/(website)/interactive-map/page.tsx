import React from "react";
import InteractiveMapDemoClient from "@/components/map/InteractiveMapDemoClient";

export const metadata = {
  title: "Interactive Masterplan | MOHS Venice City",
  description: "Explore our master-planned sectors side-by-side. View detailed plot layouts, check real-time availability, and find the perfect location for your future home or business.",
};

export default function InteractiveMapPage() {
  return (
    <div className="w-full">
      <InteractiveMapDemoClient />
    </div>
  );
}
