import React from "react";
import InteractiveMapViewer from "@/components/map/InteractiveMapViewer";
import { initialPolygons } from "@/lib/mapPolygons";

export const metadata = {
  title: "Interactive Masterplan | MOHS Venice City",
  description: "Explore the verified plots of MOHS Venice City through our interactive masterplan overlay.",
};

export default function InteractiveMapPage() {
  const layoutMapImage = "/images/layout-map-v2-optimized.jpg"; // Using the single source of truth image

  return (
    <div className="py-8 sm:py-12 bg-[#F5F8F8] min-h-screen">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#12262D] font-heading">
            Interactive Masterplan
          </h1>
          <p className="text-[#657278] text-sm sm:text-base">
            Click on individual plots on the masterplan below to view their details, availability, and sizes. 
            Use the mouse wheel to zoom in and drag to pan across the sectors.
          </p>
        </div>

        {/* 
          IMPORTANT: 
          The InteractiveMapViewer preserves the EXACT original image background as a Single Source of Truth.
          It layers clickable SVG polygons precisely over the existing map artwork.
        */}
        <InteractiveMapViewer 
          imageSrc={layoutMapImage} 
          polygons={initialPolygons} 
        />

        <div className="text-center text-sm text-slate-500 mt-4">
          <p>
            Admin Notice: Currently showing {initialPolygons.length} traced plots. 
            Use the <a href="/interactive-map/editor" className="text-[#00695C] underline font-bold">Map Tracer Admin Tool</a> to trace and add more plots pixel-perfectly over the source image.
          </p>
        </div>

      </div>
    </div>
  );
}
