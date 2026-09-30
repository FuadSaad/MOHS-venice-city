"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, LayoutGrid, Maximize2, X, Compass, ExternalLink } from "lucide-react";

function ImageMagnifier({ src, alt }: { src: string; alt: string }) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);

  const magnifierHeight = 250;
  const magnifierWidth = 250;
  const zoomLevel = 2.5;

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#E8F5F3]/30 overflow-hidden cursor-crosshair">
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain"
        onMouseEnter={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          const elem = e.currentTarget;
          // Get the position of the IMAGE itself, not the container
          const { top, left, width, height } = elem.getBoundingClientRect();
          
          // Calculate mouse position relative to the image
          let mouseX = e.clientX - left;
          let mouseY = e.clientY - top;
          
          // Constrain within image bounds so magnifier doesn't glitch outside
          mouseX = Math.max(0, Math.min(mouseX, width));
          mouseY = Math.max(0, Math.min(mouseY, height));
          
          // Set x,y for the magnifier div position (relative to viewport/container if we use clientX but let's use standard positioning)
          setXY([e.clientX - left, e.clientY - top]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
      />
      
      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            // Center the magnifier on the mouse
            top: `calc(50% - ${imgHeight / 2}px + ${y}px - ${magnifierHeight / 2}px)`,
            left: `calc(50% - ${imgWidth / 2}px + ${x}px - ${magnifierWidth / 2}px)`,
            opacity: "1", 
            border: "2px solid #00695C",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            // Shift background by zoom amount, plus offset to center the magnifying lens
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            borderRadius: "12px",
            zIndex: 100
          }}
        />
      )}
    </div>
  );
}

export default function MapSection() {
  const [activeModal, setActiveModal] = useState<"LOCATION" | "LAYOUT" | null>(null);

  const locationMapImage = "/images/MOHS-Layout-map.webp";
  const layoutMapImage = "/images/layout-map-v2.png";

  return (
    <section className="pt-16 sm:pt-24 pb-4 sm:pb-6 bg-white border-b border-[#E2E7E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12262D] font-heading tracking-tight">
            Strategic Location & Planned Layout
          </h2>
          <p className="text-sm sm:text-base text-[#657278] mt-2">
            MOHS Venice City is strategically situated directly between Uttara and
            Purbachal, providing unparalleled accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Location Map Card */}
          <div className="bg-white rounded-2xl border border-[#E2E7E5] shadow-xs overflow-hidden group flex flex-col hover:border-[#00695C]/30 hover:shadow-md transition-all duration-300">
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

          {/* Layout Map Card */}
          <div className="bg-white rounded-2xl border border-[#E2E7E5] shadow-xs overflow-hidden group flex flex-col hover:border-[#00695C]/30 hover:shadow-md transition-all duration-300">
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
                <span className="hidden sm:inline-flex px-2 py-1 bg-amber-100 text-amber-800 text-[10px] uppercase font-bold rounded">Hover to Zoom</span>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-[#12262D] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* The Image Magnifier Area */}
            <div className="flex-1 w-full bg-[#E8F5F3]/20 relative">
              <ImageMagnifier 
                src={activeModal === "LOCATION" ? locationMapImage : layoutMapImage} 
                alt="Map Enlarge" 
              />
            </div>
            
            <div className="p-4 bg-white border-t border-[#E2E7E5] flex items-center justify-between text-xs text-[#657278] shrink-0">
              <span>
                To schedule an in-person site inspection or receive high-res blueprints, call our team.
              </span>
              <a
                href="tel:+8801711000000"
                className="font-bold text-[#00695C] hover:underline"
              >
                +880 1711-000000
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
