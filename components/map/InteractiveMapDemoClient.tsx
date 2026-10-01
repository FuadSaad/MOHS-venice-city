"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Expand, X, CheckCircle2, PhoneCall } from "lucide-react";

const plotsData = [
  { id: "CP-1", size: "30 Katha", type: "Commercial Plot", status: "AVAILABLE", price: "Contact for Pricing" },
  { id: "CP-2", size: "30 Katha", type: "Commercial Plot", status: "AVAILABLE", price: "Contact for Pricing" },
  { id: "CP-3", size: "15 Katha", type: "Commercial Plot", status: "BOOKED", price: "Contact for Pricing" },
  { id: "CP-4", size: "10 Katha", type: "Commercial Plot", status: "AVAILABLE", price: "Contact for Pricing" },
  { id: "CP-5", size: "10 Katha", type: "Commercial Plot", status: "SOLD", price: "Contact for Pricing" },
  { id: "CP-6", size: "20 Katha", type: "Commercial Plot", status: "AVAILABLE", price: "Contact for Pricing" },
  { id: "P-101", size: "5 Katha", type: "Residential Plot", status: "AVAILABLE", price: "৳ 75,00,000" },
  { id: "P-102", size: "3 Katha", type: "Residential Plot", status: "AVAILABLE", price: "৳ 45,00,000" },
];

export default function InteractiveMapDemoClient() {
  const [selectedPlot, setSelectedPlot] = useState<typeof plotsData[0] | null>(null);

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
                {/* Map Controls */}
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
          
          {/* Header & Logo */}
          <div className="p-8 pb-6 border-b border-slate-100 flex flex-col items-center justify-center">
            <Image 
              src="/images/logo.png" 
              alt="MOHS Venice City" 
              width={180} 
              height={70} 
              className="object-contain drop-shadow-sm"
            />
            <div className="mt-8 text-center space-y-1.5">
              <h2 className="font-heading font-black text-[#12262D] text-xl tracking-wide">
                SELECT A PLOT
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Click any plot below to view specific details
              </p>
            </div>
          </div>

          {/* Plot Buttons Grid (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">
            <div className="grid grid-cols-2 gap-4">
              {plotsData.map((plot) => (
                <button
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  className={`
                    relative group flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300
                    ${plot.status === "AVAILABLE" ? "bg-emerald-50/50 border-emerald-100 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-300" : ""}
                    ${plot.status === "BOOKED" ? "bg-amber-50/50 border-amber-100 text-amber-900 hover:bg-amber-100 hover:border-amber-300" : ""}
                    ${plot.status === "SOLD" ? "bg-rose-50/50 border-rose-100 text-rose-900 hover:bg-rose-100 hover:border-rose-300" : ""}
                    ${selectedPlot?.id === plot.id ? "!border-[#12262D] !shadow-lg scale-[1.03] ring-4 ring-[#12262D]/10" : "hover:shadow-md hover:-translate-y-0.5"}
                  `}
                >
                  <span className={`text-2xl font-black font-heading ${selectedPlot?.id === plot.id ? "text-[#12262D]" : ""}`}>
                    {plot.id}
                  </span>
                  <span className="text-sm mt-1.5 font-bold opacity-75">
                    {plot.size}
                  </span>
                  
                  <span className={`text-[10px] uppercase font-black tracking-widest mt-3 px-3 py-1 rounded-full
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#12262D]/40 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl scale-in-95 duration-300 border border-slate-100">
              
              {/* Modal Header */}
              <div className="bg-[#12262D] p-6 text-white relative">
                <button 
                  onClick={() => setSelectedPlot(null)}
                  className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-emerald-400 font-bold text-sm tracking-wider uppercase">{selectedPlot.type}</span>
                  <h3 className="text-4xl font-black tracking-tight">{selectedPlot.id}</h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4 bg-slate-50">
                
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-500 font-bold text-sm">Plot Size</span>
                  <span className="text-lg font-black text-[#12262D]">{selectedPlot.size}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-500 font-bold text-sm">Status</span>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                    selectedPlot.status === "AVAILABLE" ? "bg-emerald-100 text-emerald-700" :
                    selectedPlot.status === "BOOKED" ? "bg-amber-100 text-amber-700" :
                    "bg-rose-100 text-rose-700"
                  }`}>
                    {selectedPlot.status}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-200">
                  <span className="text-slate-500 font-bold text-sm">Pricing</span>
                  <span className="text-xl font-black text-[#00695C]">{selectedPlot.price}</span>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl mt-4 border border-emerald-100">
                  <h4 className="flex items-center gap-2 text-sm font-black text-emerald-800 mb-2">
                    <CheckCircle2 className="w-4 h-4" /> 100% Verified Plot
                  </h4>
                  <p className="text-xs text-emerald-700/80 font-medium leading-relaxed">
                    This plot comes with complete CS, SA, RS, and BS record verification. Instant mutation registration available upon full payment.
                  </p>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-6 pt-0 bg-slate-50 flex gap-3">
                <button 
                  onClick={() => setSelectedPlot(null)}
                  className="flex-1 py-3.5 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 transition-colors shadow-sm"
                >
                  Close
                </button>
                <button className="flex-[2] py-3.5 bg-[#00695C] hover:bg-[#005B50] text-white font-bold rounded-xl shadow-lg shadow-[#00695C]/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                  <PhoneCall className="w-4 h-4" /> Contact Sales
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
