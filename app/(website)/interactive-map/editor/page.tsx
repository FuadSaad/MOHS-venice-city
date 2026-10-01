import React from "react";
import MapTracerAdmin from "@/components/map/MapTracerAdmin";

export const metadata = {
  title: "Map Tracer | Admin Tools",
};

export default function MapEditorPage() {
  const layoutMapImage = "/images/layout-map-v2-optimized.jpg"; // Using the single source of truth image

  return (
    <div className="w-full h-full min-h-screen">
      <MapTracerAdmin imageSrc={layoutMapImage} />
    </div>
  );
}
