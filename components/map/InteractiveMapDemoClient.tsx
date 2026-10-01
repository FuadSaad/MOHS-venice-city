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
  const [selectedPlot, setSelectedPlot] = useState<typeof expandedPlotsData[0] | null>(null);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-[1600px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row h-[85vh]">
        
        {/* Left Side: Map Viewer (65%) */}
        <div className="lg:w-[65%] relative bg-[#E8F5F3]/30 border-r border-slate-100">
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
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                  <button onClick={() => zoomIn()} className="bg-white/90 backdrop-blur text-slate-700 hover:text-[#00695C] p-2.5 rounded-xl shadow-lg border border-slate-100 transition-all hover:scale-105">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button onClick={() => zoomOut()} className="bg-white/90 backdrop-blur text-slate-700 hover:text-[#00695C] p-2.5 rounded-xl shadow-lg border border-slate-100 transition-all hover:scale-105">
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <button onClick={() => resetTransform()} className="bg-white/90 backdrop-blur text-slate-700 hover:text-[#00695C] p-2.5 rounded-xl shadow-lg border border-slate-100 transition-all hover:scale-105">
                    <Expand className="w-5 h-5" />
                  </button>
                </div>

                <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-8">
                    <img
                      src="/images/map-interactive.jpg"
                      alt="Masterplan Map"
                      className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-2xl"
                      draggable={false}
                    />
                  </div>
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>

        {/* Right Side: Sidebar & Plot Selection (35%) */}
        <div className="lg:w-[35%] flex flex-col h-full relative bg-white">
          <div className="p-4 border-b border-slate-100 flex flex-col items-center justify-center">
            <Image 
              src="/images/logo.png" 
              alt="MOHS Venice City" 
              width={140} 
              height={50} 
              className="object-contain drop-shadow-sm"
            />
            <div className="-mt-1 text-center">
              <h2 className="font-heading font-black text-[#12262D] text-base tracking-wide">
                SELECT A PLOT
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Click any plot below to view specific details
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-5 scrollbar-thin scrollbar-thumb-slate-200">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {expandedPlotsData.map((plot) => (
                <button
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  className={`
                    relative group flex flex-col items-center justify-center p-3.5 rounded-[1.25rem] border-2 transition-all duration-300
                    ${plot.status === "AVAILABLE" ? "bg-emerald-50/50 border-emerald-100 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-300" : ""}
                    ${plot.status === "BOOKED" ? "bg-amber-50/50 border-amber-100 text-amber-900 hover:bg-amber-100 hover:border-amber-300" : ""}
                    ${plot.status === "SOLD" ? "bg-rose-50/50 border-rose-100 text-rose-900 hover:bg-rose-100 hover:border-rose-300" : ""}
                    ${selectedPlot?.id === plot.id ? "!border-[#12262D] !shadow-md scale-[1.03] ring-2 ring-[#12262D]/10" : "hover:shadow-sm hover:-translate-y-0.5"}
                  `}
                >
                  <span className={`text-xl font-black font-heading ${selectedPlot?.id === plot.id ? "text-[#12262D]" : ""}`}>
                    {plot.id}
                  </span>
                  <span className="text-xs mt-1 font-bold opacity-75">
                    {plot.size}
                  </span>
                  <span className={`text-[9px] uppercase font-black tracking-widest mt-2 px-2.5 py-0.5 rounded-full
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

        {/* DETAILS MODAL OVERLAY (GLASSMORPHISM) */}
        {selectedPlot && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4 animate-in fade-in duration-300">
            {/* The Glassmorphism Container */}
            <div className="w-full max-w-[420px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] scale-in-95 duration-300 border border-white/40 bg-white/40 backdrop-blur-2xl p-6 relative">
              
              {/* Header */}
              <div className="flex items-start justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <h3 className="text-[22px] font-black text-[#12262D] font-heading tracking-tight">Plot No: {selectedPlot.id}</h3>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${
                    selectedPlot.status === "AVAILABLE" ? "bg-white text-[#00695C] border border-[#00695C]/20" :
                    selectedPlot.status === "BOOKED" ? "bg-white text-amber-600 border border-amber-600/20" :
                    "bg-white text-red-600 border border-red-600/20"
                  }`}>
                    {selectedPlot.status}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedPlot(null)}
                  className="text-slate-600 hover:text-slate-900 bg-white/50 hover:bg-white/80 p-1.5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* White Info Card */}
              <div className="bg-white/95 rounded-[20px] p-5 shadow-sm border border-white/60 space-y-3.5 mb-4 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-medium text-slate-500">Property Type:</span>
                  <span className="text-[13px] font-bold text-[#12262D]">{selectedPlot.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-medium text-slate-500">Plot Size:</span>
                  <span className="text-[12px] font-bold text-[#00695C] bg-[#E8F5F3] px-2.5 py-0.5 rounded-full">{selectedPlot.size}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-medium text-slate-500">Facing:</span>
                  <span className="text-[13px] font-bold text-[#12262D]">{selectedPlot.facing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-medium text-slate-500">Front Road:</span>
                  <span className="text-[13px] font-bold text-[#12262D]">{selectedPlot.frontRoad}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] font-medium text-slate-500">Location:</span>
                  <span className="text-[13px] font-bold text-[#12262D]">{selectedPlot.location}</span>
                </div>
              </div>

              {/* Teal Price Box */}
              <div className="bg-[#0b7b75] rounded-[20px] p-5 mb-4 shadow-inner flex justify-between items-center text-white relative z-10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-100/80 mb-0.5">Total Estimated Price</p>
                  <p className="text-[26px] font-black tracking-tight">{selectedPlot.price}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-lg">
                  <span className="text-[11px] font-bold text-white">Mutation Ready</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] text-slate-700/90 font-medium leading-relaxed mb-4 px-1 relative z-10">
                {selectedPlot.desc}
              </p>

              {/* Verified Badge */}
              <div className="bg-[#E8F5F3]/90 backdrop-blur-md rounded-xl p-3.5 mb-5 flex items-center gap-2 border border-emerald-500/20 shadow-sm relative z-10">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[12px] font-bold text-emerald-800">100% Verified Legal Title & Ready Mutation</span>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mb-4 relative z-10">
                <button className="flex-1 bg-white/90 hover:bg-white text-[#00695C] font-bold text-[13px] py-3.5 rounded-xl border-2 border-white/50 shadow-sm flex items-center justify-center gap-1.5 transition-colors">
                  <Info className="w-4 h-4" /> View Details
                </button>
                <button className="flex-1 bg-[#00695C] hover:bg-[#005B50] text-white font-bold text-[13px] py-3.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors">
                  <Calendar className="w-4 h-4" /> Schedule Site Visit
                </button>
              </div>

              {/* Share Link */}
              <button className="w-full flex items-center justify-center gap-1.5 text-[12px] font-bold text-slate-600/80 hover:text-slate-800 transition-colors relative z-10">
                <Share2 className="w-3.5 h-3.5" /> Copy Direct Plot Link
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
