"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Expand, X, CheckCircle2, PhoneCall, Info, Calendar, Share2 } from "lucide-react";

const plotsData = [
  { 
    id: "CP-01", 
    size: "30 Katha", 
    type: "Commercial Plot", 
    status: "AVAILABLE", 
    price: "৳ 4,05,00,000",
    facing: "South Facing",
    frontRoad: "100ft Riverfront Boulevard",
    location: "Commercial Riverfront",
    desc: "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  { 
    id: "CP-05", 
    size: "10 Katha", 
    type: "Commercial Plot", 
    status: "AVAILABLE", 
    price: "৳ 1,35,00,000",
    facing: "River Facing",
    frontRoad: "100ft Riverfront Boulevard",
    location: "Commercial Riverfront",
    desc: "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  },
  { 
    id: "P-101", 
    size: "5 Katha", 
    type: "Residential Plot", 
    status: "BOOKED", 
    price: "৳ 75,00,000",
    facing: "North",
    frontRoad: "40ft Internal Road",
    location: "Residential Zone",
    desc: "Premium residential plot perfect for building your dream home in a secure, master-planned community."
  }
];

// Replicate data to fill the sidebar
const expandedPlotsData = [...plotsData, ...plotsData, ...plotsData].map((p, i) => ({...p, id: p.id.replace(/[0-9]+/, String(i+1).padStart(2, '0'))}));


export default function InteractiveMapDemoClient() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
      
      {/* Page Header */}
      <div className="text-center mb-6 lg:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-3xl md:text-4xl font-black font-heading text-[#12262D] tracking-tight mb-3">
          Interactive Masterplan Explorer
        </h1>
        <p className="text-slate-600 font-medium text-sm md:text-base max-w-3xl mx-auto">
          Explore our master-planned sectors side-by-side. View detailed plot layouts, check real-time availability, and find the perfect location for your future home or business.
        </p>
      </div>

      <div className="w-full max-w-[1800px] flex flex-col xl:flex-row gap-6 h-[85vh] xl:h-[75vh]">
        
        {/* Module 1 */}
        <MapModule imageSrc="/images/map-interactive.jpg" title="Sector 1" />
        
        {/* Module 2 */}
        <MapModule imageSrc="/images/map-interactive-2.jpg" title="Sector 2" />

      </div>
    </div>
  );
}

function MapModule({ imageSrc, title }: { imageSrc: string, title: string }) {
  const [selectedPlot, setSelectedPlot] = useState<typeof expandedPlotsData[0] | null>(null);

  return (
    <div className="flex-1 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row relative">
      
      {/* Left Side: Map Viewer (60%) */}
      <div className="lg:w-[60%] relative bg-[#E8F5F3]/30 border-r border-slate-100">
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={3}
          centerOnInit
          limitToBounds={true}
          wheel={{ step: 0.1 }}
          panning={{ velocityDisabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                <button onClick={() => zoomIn()} className="bg-white/90 backdrop-blur text-slate-700 hover:text-[#00695C] p-2 rounded-xl shadow-lg border border-slate-100 transition-all hover:scale-105">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button onClick={() => zoomOut()} className="bg-white/90 backdrop-blur text-slate-700 hover:text-[#00695C] p-2 rounded-xl shadow-lg border border-slate-100 transition-all hover:scale-105">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button onClick={() => resetTransform()} className="bg-white/90 backdrop-blur text-slate-700 hover:text-[#00695C] p-2 rounded-xl shadow-lg border border-slate-100 transition-all hover:scale-105">
                  <Expand className="w-4 h-4" />
                </button>
              </div>

              <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-2xl"
                    draggable={false}
                  />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Right Side: Sidebar & Plot Selection (40%) */}
      <div className="lg:w-[40%] flex flex-col h-full relative bg-white">
        <div className="p-4 border-b border-slate-100 flex flex-col items-center justify-center">
          <Image 
            src="/images/logo.png" 
            alt="MOHS Venice City" 
            width={120} 
            height={40} 
            className="object-contain drop-shadow-sm"
          />
          <div className="mt-2 text-center">
            <h2 className="font-heading font-black text-[#12262D] text-sm tracking-wide">
              SELECT A PLOT
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Click below for details
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="grid grid-cols-2 gap-3">
            {expandedPlotsData.map((plot) => (
              <button
                key={plot.id}
                onClick={() => setSelectedPlot(plot)}
                className={`
                  relative group flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300
                  ${plot.status === "AVAILABLE" ? "bg-emerald-50/50 border-emerald-100 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-300" : ""}
                  ${plot.status === "BOOKED" ? "bg-amber-50/50 border-amber-100 text-amber-900 hover:bg-amber-100 hover:border-amber-300" : ""}
                  ${plot.status === "SOLD" ? "bg-rose-50/50 border-rose-100 text-rose-900 hover:bg-rose-100 hover:border-rose-300" : ""}
                  ${selectedPlot?.id === plot.id ? "!border-[#12262D] !shadow-md scale-[1.03] ring-2 ring-[#12262D]/10" : "hover:shadow-sm hover:-translate-y-0.5"}
                `}
              >
                <span className={`text-lg font-black font-heading ${selectedPlot?.id === plot.id ? "text-[#12262D]" : ""}`}>
                  {plot.id}
                </span>
                <span className="text-[11px] mt-0.5 font-bold opacity-75">
                  {plot.size}
                </span>
                <span className={`text-[8px] uppercase font-black tracking-widest mt-2 px-2 py-0.5 rounded-full
                  ${plot.status === "AVAILABLE" ? "bg-emerald-200/60 text-emerald-800" : ""}
                  ${plot.status === "BOOKED" ? "bg-amber-200/60 text-amber-800" : ""}
                  ${plot.status === "SOLD" ? "bg-rose-200/60 text-rose-800" : ""}
                `}>
                  {plot.status}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DETAILS MODAL OVERLAY */}
      {selectedPlot && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 p-3 animate-in fade-in duration-300">
          <div className="w-full max-w-[360px] rounded-3xl overflow-hidden shadow-2xl scale-in-95 duration-300 border border-white/40 bg-white/50 backdrop-blur-xl p-5 relative">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-[#12262D] font-heading tracking-tight">Plot No: {selectedPlot.id}</h3>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm ${
                  selectedPlot.status === "AVAILABLE" ? "bg-white text-[#00695C] border border-[#00695C]/20" :
                  selectedPlot.status === "BOOKED" ? "bg-white text-amber-600 border border-amber-600/20" :
                  "bg-white text-red-600 border border-red-600/20"
                }`}>
                  {selectedPlot.status}
                </span>
              </div>
              <button 
                onClick={() => setSelectedPlot(null)}
                className="text-slate-600 hover:text-slate-900 bg-white/50 hover:bg-white/80 p-1 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* White Info Card */}
            <div className="bg-white/95 rounded-[16px] p-4 shadow-sm border border-white/60 space-y-3 mb-3 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500">Type:</span>
                <span className="text-xs font-bold text-[#12262D]">{selectedPlot.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500">Size:</span>
                <span className="text-[11px] font-bold text-[#00695C] bg-[#E8F5F3] px-2 py-0.5 rounded-full">{selectedPlot.size}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500">Facing:</span>
                <span className="text-xs font-bold text-[#12262D]">{selectedPlot.facing}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500">Front Road:</span>
                <span className="text-xs font-bold text-[#12262D]">{selectedPlot.frontRoad}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-slate-500">Location:</span>
                <span className="text-xs font-bold text-[#12262D]">{selectedPlot.location}</span>
              </div>
            </div>

            {/* Teal Price Box */}
            <div className="bg-[#0b7b75] rounded-[16px] p-4 mb-3 shadow-inner flex justify-between items-center text-white relative z-10">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-100/80 mb-0.5">Total Estimated Price</p>
                <p className="text-xl font-black tracking-tight">{selectedPlot.price}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm border border-white/20 px-2 py-1 rounded-md">
                <span className="text-[9px] font-bold text-white">Mutation Ready</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[11px] text-slate-800 font-medium leading-relaxed mb-3 px-1 relative z-10">
              {selectedPlot.desc}
            </p>

            {/* Buttons */}
            <div className="flex gap-2 mb-2 relative z-10">
              <button className="flex-1 bg-white/90 hover:bg-white text-[#00695C] font-bold text-[11px] py-2.5 rounded-xl border-2 border-white/50 shadow-sm flex items-center justify-center gap-1 transition-colors">
                <Info className="w-3.5 h-3.5" /> View Details
              </button>
              <button className="flex-1 bg-[#00695C] hover:bg-[#005B50] text-white font-bold text-[11px] py-2.5 rounded-xl shadow-md flex items-center justify-center gap-1 transition-colors">
                <Calendar className="w-3.5 h-3.5" /> Site Visit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
