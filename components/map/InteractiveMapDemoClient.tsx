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
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F8F8] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row h-[85vh]">
        
        {/* Left Side: Map Viewer (65%) */}
        <div className="lg:w-[65%] relative bg-slate-100 border-r border-slate-200">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={8}
            centerOnInit
            wheel={{ step: 0.1 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Map Controls */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <button onClick={() => zoomIn()} className="bg-white text-slate-700 hover:text-[#00695C] p-2 rounded-xl shadow-md transition-colors">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button onClick={() => zoomOut()} className="bg-white text-slate-700 hover:text-[#00695C] p-2 rounded-xl shadow-md transition-colors">
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <button onClick={() => resetTransform()} className="bg-white text-slate-700 hover:text-[#00695C] p-2 rounded-xl shadow-md transition-colors">
                    <Expand className="w-5 h-5" />
                  </button>
                </div>

                <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <img
                      src="/images/map-interactive.jpg"
                      alt="Masterplan Map"
                      className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg"
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
          <div className="p-6 border-b border-slate-100 flex flex-col items-center justify-center bg-slate-50/50">
            <Image 
              src="/images/logo.png" 
              alt="MOHS Venice City" 
              width={160} 
              height={60} 
              className="object-contain"
            />
            <h2 className="mt-4 font-heading font-extrabold text-[#12262D] text-lg uppercase tracking-wider">
              Select a Plot
            </h2>
            <p className="text-sm text-slate-500 text-center mt-1">
              Click any plot button below to view specific details
            </p>
          </div>

          {/* Plot Buttons Grid (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-2 gap-4">
              {plotsData.map((plot) => (
                <button
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot)}
                  className={`
                    relative group flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300
                    ${selectedPlot?.id === plot.id 
                      ? "bg-[#00695C] border-[#00695C] text-white shadow-lg shadow-[#00695C]/20 scale-[1.02]" 
                      : "bg-[#F8FAFA] border-slate-200 text-slate-700 hover:border-[#00695C]/40 hover:bg-white hover:shadow-md"
                    }
                  `}
                >
                  <span className={`text-xl font-extrabold font-heading ${selectedPlot?.id === plot.id ? "text-white" : "text-[#12262D]"}`}>
                    {plot.id}
                  </span>
                  <span className={`text-sm mt-1 font-semibold ${selectedPlot?.id === plot.id ? "text-emerald-100" : "text-slate-500"}`}>
                    {plot.size}
                  </span>
                  
                  {/* Status Indicator Dot */}
                  <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${
                    plot.status === "AVAILABLE" ? "bg-emerald-500" :
                    plot.status === "BOOKED" ? "bg-amber-500" : "bg-red-500"
                  }`}></div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* DETAILS MODAL OVERLAY */}
        {selectedPlot && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#12262D]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl scale-in-95 duration-200">
              
              {/* Modal Header */}
              <div className="bg-[#00695C] p-6 text-white relative">
                <button 
                  onClick={() => setSelectedPlot(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-1.5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-[#00695C] font-black text-xl">{selectedPlot.id.split('-')[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">{selectedPlot.id}</h3>
                    <p className="text-emerald-100 font-medium">{selectedPlot.type}</p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">Plot Size</span>
                  <span className="text-lg font-bold text-[#12262D]">{selectedPlot.size}</span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    selectedPlot.status === "AVAILABLE" ? "bg-emerald-100 text-emerald-700" :
                    selectedPlot.status === "BOOKED" ? "bg-amber-100 text-amber-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {selectedPlot.status}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 font-semibold">Pricing</span>
                  <span className="text-xl font-black text-[#00695C]">{selectedPlot.price}</span>
                </div>

                <div className="bg-[#F8FAFA] p-4 rounded-xl mt-4 border border-emerald-100">
                  <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-800 mb-2">
                    <CheckCircle2 className="w-4 h-4" /> 100% Verified Plot
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This plot comes with complete CS, SA, RS, and BS record verification. Instant mutation registration available upon full payment.
                  </p>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-6 pt-0 flex gap-3">
                <button 
                  onClick={() => setSelectedPlot(null)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                >
                  Close
                </button>
                <button className="flex-[2] py-3 bg-[#00695C] hover:bg-[#005B50] text-white font-bold rounded-xl shadow-lg shadow-[#00695C]/30 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
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
