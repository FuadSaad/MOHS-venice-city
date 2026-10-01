"use client";

import React, { useState } from "react";
import BrochureViewer from "@/components/brochure/BrochureViewer";
import { FileText, Map, ArrowRight, Building, PhoneCall, Calendar } from "lucide-react";

export const brochures = [
  {
    id: "venice-city",
    name: "MOHS Venice City",
    description: "Explore the comprehensive masterplan, sector layouts, and premium amenities.",
    pages: Array.from({ length: 10 }, (_, i) => `/images/brochure/${i + 1}.jpg`),
    mapImage: "/images/map-interactive.jpg"
  },
  {
    id: "islamic-city",
    name: "MOHS Venice Islamic City",
    description: "Discover the serenity, community spaces, and unique lifestyle offerings.",
    pages: Array.from({ length: 5 }, (_, i) => `/images/brochure/${i + 1}.jpg`),
    mapImage: "/images/map-interactive-2.jpg"
  }
];

export default function BrochurePageClient() {
  const [selectedId, setSelectedId] = useState(brochures[0].id);
  const activeBrochure = brochures.find(b => b.id === selectedId) || brochures[0];

  return (
    <div className="w-full flex flex-col">
      {/* Compact Hero & Project Selector */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12262D] font-heading tracking-tight mb-2">
            Official Project Document
          </h1>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl">
            Interactive brochure and masterplan viewer.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-slate-200">
          {brochures.map((brochure) => (
            <button
              key={brochure.id}
              onClick={() => setSelectedId(brochure.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all duration-300
                ${selectedId === brochure.id 
                  ? "bg-[#00695C] text-white shadow-md" 
                  : "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-[#12262D]"
                }
              `}
            >
              <FileText className={`w-4 h-4 ${selectedId === brochure.id ? "text-emerald-300" : "text-slate-400"}`} />
              <span className="hidden sm:inline">{brochure.name}</span>
              <span className="sm:hidden">{brochure.name.replace("MOHS ", "")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Viewer Section */}
      <div className="w-full bg-[#12262D] border-y border-slate-800">
        <BrochureViewer brochure={activeBrochure} />
      </div>

      {/* Highlights & CTAs */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 text-[#00695C] rounded-full flex items-center justify-center mb-4">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#12262D] mb-2">Master-Planned Sectors</h3>
            <p className="text-sm text-slate-500">Carefully designed zones for residential, commercial, and recreational use ensuring a balanced lifestyle.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 text-[#00695C] rounded-full flex items-center justify-center mb-4">
              <Building className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#12262D] mb-2">Premium Amenities</h3>
            <p className="text-sm text-slate-500">World-class facilities including international schools, hospitals, mega malls, and lush green parks.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-50 text-[#00695C] rounded-full flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#12262D] mb-2">Secure Investment</h3>
            <p className="text-sm text-slate-500">Rajuk-approved layouts with clear documentation and high potential for future appreciation.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button className="flex items-center gap-2 bg-[#00695C] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#004d40] transition-colors">
            <Map className="w-5 h-5" />
            Explore Interactive Masterplan
          </button>
          <button className="flex items-center gap-2 bg-white text-[#12262D] border border-slate-200 px-6 py-3 rounded-xl font-bold hover:border-[#00695C] hover:text-[#00695C] transition-colors">
            <Building className="w-5 h-5" />
            View Properties
          </button>
          <button className="flex items-center gap-2 bg-white text-[#12262D] border border-slate-200 px-6 py-3 rounded-xl font-bold hover:border-[#00695C] hover:text-[#00695C] transition-colors">
            <Calendar className="w-5 h-5" />
            Schedule Site Visit
          </button>
          <button className="flex items-center gap-2 bg-white text-[#12262D] border border-slate-200 px-6 py-3 rounded-xl font-bold hover:border-[#00695C] hover:text-[#00695C] transition-colors">
            <PhoneCall className="w-5 h-5" />
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
