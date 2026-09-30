"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, LayoutGrid, Maximize2, X, Compass, ExternalLink } from "lucide-react";

export default function MapSection() {
  const [activeModal, setActiveModal] = useState<"LOCATION" | "LAYOUT" | null>(null);

  const locationMapImage =
    "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1600&q=80";
  const layoutMapImage =
    "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E2E7E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#17232B] font-heading tracking-tight">
            Strategic Location & Planned Layout
          </h2>
          <p className="text-sm sm:text-base text-[#657278] mt-2">
            MOHS Venice City is strategically situated directly between Uttara and
            Purbachal, providing unparalleled accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Location Map */}
          <div className="bg-[#F7F8F6] rounded-2xl border border-[#E2E7E5] overflow-hidden shadow-soft flex flex-col justify-between group">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006B5B] uppercase tracking-wider">
                  <MapPin className="w-4 h-4" /> Regional Connectivity
                </span>
                <span className="text-xs bg-white border border-[#E2E7E5] px-2.5 py-1 rounded-md text-[#657278] font-medium">
                  Uttara - Purbachal Link
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#17232B] font-heading mb-2">
                Location Map
              </h3>
              <p className="text-sm text-[#657278]">
                Find us easily. 15 minutes from Hazrat Shahjalal International
                Airport, 10 minutes from Uttara Sector 18, and connected to the
                300ft Expressway.
              </p>
            </div>

            {/* Map Preview Image */}
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
                <span className="bg-white/95 text-[#17232B] text-xs font-bold px-4 py-2 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-sm group-hover:bg-[#006B5B] group-hover:text-white transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" /> Enlarge Location Map
                </span>
              </button>
            </div>

            <div className="p-6 pt-4">
              <button
                onClick={() => setActiveModal("LOCATION")}
                className="w-full py-2.5 px-4 bg-white hover:bg-[#E8F5F1] text-[#006B5B] border border-[#006B5B]/30 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>View Full Location Map</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Layout Map */}
          <div className="bg-[#F7F8F6] rounded-2xl border border-[#E2E7E5] overflow-hidden shadow-soft flex flex-col justify-between group">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006B5B] uppercase tracking-wider">
                  <LayoutGrid className="w-4 h-4" /> Master Town Planning
                </span>
                <span className="text-xs bg-white border border-[#E2E7E5] px-2.5 py-1 rounded-md text-[#657278] font-medium">
                  Sector 1, 2, 3 & VIP Zone
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#17232B] font-heading mb-2">
                Township Layout Map
              </h3>
              <p className="text-sm text-[#657278]">
                Explore the detailed project sector layout, designated canal
                network, central commercial zone, and 40ft-80ft arterial road
                networks.
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
                <span className="bg-white/95 text-[#17232B] text-xs font-bold px-4 py-2 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-sm group-hover:bg-[#006B5B] group-hover:text-white transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" /> Enlarge Layout Plan
                </span>
              </button>
            </div>

            <div className="p-6 pt-4">
              <button
                onClick={() => setActiveModal("LAYOUT")}
                className="w-full py-2.5 px-4 bg-white hover:bg-[#E8F5F1] text-[#006B5B] border border-[#006B5B]/30 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
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
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-white/20">
            <div className="flex items-center justify-between p-4 border-b border-[#E2E7E5] bg-[#F7F8F6]">
              <h4 className="font-bold text-base text-[#17232B] font-heading">
                {activeModal === "LOCATION"
                  ? "MOHS Venice City — Regional Location Map"
                  : "MOHS Venice City — Sector Layout & Masterplan"}
              </h4>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-[#17232B] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src={activeModal === "LOCATION" ? locationMapImage : layoutMapImage}
                alt="Map enlargement"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 bg-white flex items-center justify-between text-xs text-[#657278]">
              <span>
                To schedule an in-person site inspection or receive high-res blueprints, call our team.
              </span>
              <a
                href="tel:+8801711000000"
                className="font-bold text-[#006B5B] hover:underline"
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
