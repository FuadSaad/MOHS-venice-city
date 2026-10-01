"use client";

import React, { useState } from "react";
import BrochureViewer from "@/components/brochure/BrochureViewer";
import { ChevronDown, FileText } from "lucide-react";

const brochures = [
  {
    id: "venice-city",
    name: "MOHS Venice City",
    description: "Explore the comprehensive masterplan, sector layouts, and premium amenities of MOHS Venice City.",
    pages: Array.from({ length: 10 }, (_, i) => `/images/brochure/${i + 1}.jpg`),
  },
  {
    id: "islamic-city",
    name: "MOHS Venice Islamic City",
    description: "Discover the serenity, community spaces, and unique lifestyle offerings of MOHS Venice Islamic City.",
    // Demo: using the same images for now, but limiting it or shifting to show variation
    pages: Array.from({ length: 5 }, (_, i) => `/images/brochure/${i + 1}.jpg`),
  }
];

export default function BrochurePageClient() {
  const [selectedId, setSelectedId] = useState(brochures[0].id);
  const activeBrochure = brochures.find(b => b.id === selectedId) || brochures[0];

  return (
    <div className="w-full">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12262D] font-heading tracking-tight mb-4">
          Official Project Brochures
        </h1>
        <p className="text-base sm:text-lg text-[#657278] px-4">
          Select a project below to view its comprehensive masterplan and details.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12 flex justify-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-white p-2 sm:p-3 rounded-2xl shadow-sm border border-slate-100">
          {brochures.map((brochure) => (
            <button
              key={brochure.id}
              onClick={() => setSelectedId(brochure.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 w-full sm:w-auto justify-center
                ${selectedId === brochure.id 
                  ? "bg-[#00695C] text-white shadow-md scale-105" 
                  : "bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }
              `}
            >
              <FileText className={`w-4 h-4 ${selectedId === brochure.id ? "text-emerald-300" : "text-slate-400"}`} />
              {brochure.name}
            </button>
          ))}
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-4">
        <h2 className="text-2xl font-black text-[#12262D] font-heading mb-2">
          {activeBrochure.name}
        </h2>
        <p className="text-sm text-slate-500 px-4">
          {activeBrochure.description}
        </p>
      </div>

      <BrochureViewer pages={activeBrochure.pages} />
    </div>
  );
}
