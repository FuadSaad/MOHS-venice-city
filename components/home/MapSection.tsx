"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  LayoutGrid,
  Maximize2,
  X,
  Compass,
  ExternalLink,
  Plus,
  Minus,
  RotateCcw,
} from "lucide-react";
import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";
import { Reveal } from "@/components/ui/Reveal";

function MapZoomViewer({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full bg-[#12262D]/5 flex items-center justify-center overflow-hidden">
      <TransformWrapper
        initialScale={1}
        minScale={0.8}
        maxScale={6}
        centerOnInit={true}
        wheel={{ step: 0.15 }}
        pinch={{ step: 5 }}
        doubleClick={{ step: 0.7 }}
        limitToBounds={false}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Floating Zoom & Pan Controls */}
            <div className="absolute top-4 right-4 z-30 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#E2E7E5] p-1.5">
              <button
                type="button"
                onClick={() => zoomIn(0.4)}
                className="p-2.5 rounded-xl hover:bg-[#F5F8F8] text-[#12262D] hover:text-[#00695C] transition-colors"
                title="Zoom In (+)"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => zoomOut(0.4)}
                className="p-2.5 rounded-xl hover:bg-[#F5F8F8] text-[#12262D] hover:text-[#00695C] transition-colors border-t border-[#E2E7E5]"
                title="Zoom Out (−)"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => resetTransform(300)}
                className="p-2.5 rounded-xl hover:bg-[#F5F8F8] text-[#12262D] hover:text-[#00695C] transition-colors border-t border-[#E2E7E5]"
                title="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Helper hint badge at bottom */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none bg-[#12262D]/75 backdrop-blur-sm text-white text-[11px] font-medium px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-md">
              <span>Scroll wheel or pinch to zoom • Drag to pan</span>
            </div>

            <TransformComponent
              wrapperClass="!w-full !h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              contentClass="!w-full !h-full flex items-center justify-center"
              wrapperStyle={{ width: "100%", height: "100%" }}
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[85vh] object-contain select-none pointer-events-auto"
                draggable={false}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

export default function MapSection() {
  const [activeModal, setActiveModal] = useState<"LOCATION" | "LAYOUT" | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("map") === "layout") setActiveModal("LAYOUT");
      if (params.get("map") === "location") setActiveModal("LOCATION");
    }
  }, []);

  const locationMapImage = "/images/MOHS-Layout-map.webp";
  const layoutMapImage = "/images/layout-map-v2-optimized.jpg";

  return (
    <section className="pt-16 sm:pt-24 pb-4 sm:pb-6 bg-white border-b border-[#E2E7E5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12262D] font-heading tracking-tight">
              Strategic Location & Planned Layout
            </h2>
            <p className="text-sm sm:text-base text-[#657278] mt-2">
              MOHS Venice City is strategically situated directly between Uttara and
              Purbachal, providing unparalleled accessibility.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Map Card */}
          <Reveal delay={0.1}>
            <div className="bg-white rounded-2xl border border-[#E2E7E5] shadow-xs overflow-hidden group flex flex-col h-full hover:border-[#00695C]/30 hover:shadow-md transition-all duration-300">
            <div className="p-6 border-b border-[#E2E7E5] flex-grow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-[#00695C] text-xs font-bold uppercase tracking-wider">
                  <MapPin className="w-4 h-4" /> REGIONAL CONNECTIVITY
                </div>
                <span className="text-xs text-[#657278] font-medium bg-[#F5F8F8] px-2.5 py-1 rounded-md border border-[#E2E7E5]">
                  Uttara - Purbachal Link
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#12262D] mb-2 font-heading">
                Location Map
              </h3>
              <p className="text-sm text-[#657278] leading-relaxed">
                Find us easily. 15 minutes from Hazrat Shahjalal International Airport, 10 minutes from Uttara Sector 18, and connected to the 300ft Expressway.
              </p>
            </div>
            
            {/* Location Preview Image */}
            <div className="relative aspect-[16/9] mx-6 rounded-xl overflow-hidden border border-[#E2E7E5] bg-slate-200">
              <Image
                src={locationMapImage}
                alt="MOHS Venice City Location Map"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <button 
                onClick={() => setActiveModal("LOCATION")}
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Enlarge location map"
              >
                <span className="bg-white/95 text-[#12262D] text-xs font-bold px-4 py-2 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-sm group-hover:bg-[#00695C] group-hover:text-white transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" /> Enlarge Location Map
                </span>
              </button>
            </div>

            <div className="p-6 pt-4">
              <button 
                onClick={() => setActiveModal("LOCATION")}
                className="w-full py-2.5 px-4 bg-white hover:bg-[#E8F5F3] text-[#00695C] border border-[#00695C]/30 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Full Location Map</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
          </Reveal>

          {/* Layout Map Card */}
          <Reveal delay={0.2}>
          <div className="bg-white rounded-2xl border border-[#E2E7E5] shadow-xs overflow-hidden group flex flex-col h-full hover:border-[#00695C]/30 hover:shadow-md transition-all duration-300">
            <div className="p-6 border-b border-[#E2E7E5] flex-grow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5 text-[#00695C] text-xs font-bold uppercase tracking-wider">
                  <LayoutGrid className="w-4 h-4" /> MASTER TOWN PLANNING
                </div>
                <span className="text-xs text-[#657278] font-medium bg-[#F5F8F8] px-2.5 py-1 rounded-md border border-[#E2E7E5]">
                  Sector 1, 2, 3 & VIP Zone
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#12262D] mb-2 font-heading">
                Township Layout Map
              </h3>
              <p className="text-sm text-[#657278] leading-relaxed">
                Explore the detailed project sector layout, designated canal network, central commercial zone, and 40ft-80ft arterial road networks.
              </p>
            </div>
            
            {/* Layout Preview Image */}
            <div className="relative aspect-[16/9] mx-6 rounded-xl overflow-hidden border border-[#E2E7E5] bg-slate-200">
              <Image
                src={layoutMapImage}
                alt="MOHS Venice City Layout Masterplan"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              <button
                onClick={() => setActiveModal("LAYOUT")}
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Enlarge layout map"
              >
                <span className="bg-white/95 text-[#12262D] text-xs font-bold px-4 py-2 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-sm group-hover:bg-[#00695C] group-hover:text-white transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" /> Enlarge Layout Plan
                </span>
              </button>
            </div>

            <div className="p-6 pt-4">
              <button
                onClick={() => setActiveModal("LAYOUT")}
                className="w-full py-2.5 px-4 bg-white hover:bg-[#E8F5F3] text-[#00695C] border border-[#00695C]/30 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Detailed Layout Map</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
          </Reveal>
        </div>
      </div>

      {/* Modal Viewer */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-6xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl relative border border-white/20">
            <div className="flex items-center justify-between p-4 border-b border-[#E2E7E5] bg-[#F5F8F8] shrink-0">
              <div className="flex items-center gap-3">
                <h4 className="font-bold text-base text-[#12262D] font-heading">
                  {activeModal === "LOCATION"
                    ? "MOHS Venice City — Regional Location Map"
                    : "MOHS Venice City — Sector Layout & Masterplan"}
                </h4>
                <span className="hidden sm:inline-flex px-2.5 py-1 bg-emerald-50 text-[#00695C] border border-[#00695C]/20 text-[10px] uppercase font-bold rounded-lg items-center gap-1">
                  Pan & Zoom
                </span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-[#12262D] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* The Pan & Zoom Map Canvas Area */}
            <div className="flex-1 w-full bg-[#E8F5F3]/10 relative min-h-0 overflow-hidden">
              <MapZoomViewer 
                src={activeModal === "LOCATION" ? locationMapImage : layoutMapImage} 
                alt="Map Enlarge" 
              />
            </div>
            
            <div className="p-4 bg-white border-t border-[#E2E7E5] flex flex-wrap items-center justify-between gap-3 text-xs text-[#657278] shrink-0">
              <div className="flex items-center gap-3">
                <span>
                  To schedule an in-person site inspection or receive high-res blueprints, call our team:
                </span>
                <a
                  href="tel:+8801711000000"
                  className="font-bold text-[#00695C] hover:underline"
                >
                  +880 1711-000000
                </a>
              </div>
              {activeModal === "LAYOUT" && (
                <Link
                  href="/interactive-map"
                  className="px-3.5 py-1.5 bg-[#00695C] hover:bg-[#005247] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <span>Open Interactive Map</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
