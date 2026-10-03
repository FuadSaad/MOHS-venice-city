"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Clock, MapPin, X } from "lucide-react";
import Image from "next/image";

type PlotStatus = "AVAILABLE" | "BOOKED" | "SOLD";

interface PlotData {
  id: string;
  plotNumber: string;
  title: string;
  status: PlotStatus;
  size: string;
  price: string;
  x: number; // percentage from left
  y: number; // percentage from top
}

const DUMMY_PLOTS: PlotData[] = [
  { id: "1", plotNumber: "25", title: "Plot 25", status: "AVAILABLE", size: "9.41 Katha", price: "৳ 45,00,000", x: 23.5, y: 68.2 },
  { id: "2", plotNumber: "26", title: "Plot 26", status: "BOOKED", size: "4.87 Katha", price: "৳ 24,00,000", x: 42.1, y: 22.5 },
  { id: "3", plotNumber: "24", title: "Plot 24", status: "SOLD", size: "8.02 Katha", price: "৳ 38,00,000", x: 15.5, y: 15.5 },
  { id: "4", plotNumber: "22", title: "Plot 22", status: "AVAILABLE", size: "5 Katha", price: "৳ 25,00,000", x: 4.5, y: 22.0 },
];

const getStatusColor = (status: PlotStatus) => {
  switch (status) {
    case "AVAILABLE": return { fill: "bg-emerald-500", shadow: "shadow-emerald-500/50", text: "text-emerald-600", bg: "bg-emerald-100", label: "Available" };
    case "BOOKED": return { fill: "bg-amber-500", shadow: "shadow-amber-500/50", text: "text-amber-600", bg: "bg-amber-100", label: "Booked" };
    case "SOLD": return { fill: "bg-rose-500", shadow: "shadow-rose-500/50", text: "text-rose-600", bg: "bg-rose-100", label: "Sold" };
  }
};

export default function PinInteractiveMapDemo() {
  const [hoveredPlot, setHoveredPlot] = useState<PlotData | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col md:flex-row gap-8">
      {/* Map Section */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col">
        <h2 className="text-2xl font-black text-[#12262D] mb-2">Image Pin Map Demo</h2>
        <p className="text-sm text-slate-500 font-medium mb-6">Using static image with absolute positioned pins overlay.</p>
        
        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-md"></div>
            <span className="text-sm font-bold text-slate-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-amber-500 shadow-md"></div>
            <span className="text-sm font-bold text-slate-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-rose-500 shadow-md"></div>
            <span className="text-sm font-bold text-slate-600">Sold</span>
          </div>
        </div>

        <div className="flex-1 relative bg-slate-100/50 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center p-4">
          
          {/* Map Container */}
          <div className="relative w-full max-w-5xl aspect-[1.5/1] shadow-xl rounded-xl overflow-hidden border border-slate-300">
            {/* Background Image */}
            <Image 
              src="/images/mohs-map-demo.png" 
              alt="MOHS Map" 
              fill 
              className="object-contain lg:object-cover"
              priority
            />
            
            {/* Overlay Pins */}
            {DUMMY_PLOTS.map((plot) => {
              const colors = getStatusColor(plot.status);
              const isSelected = selectedPlot?.id === plot.id;
              const isHovered = hoveredPlot?.id === plot.id;

              return (
                <div
                  key={plot.id}
                  className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${plot.x}%`, top: `${plot.y}%` }}
                  onMouseEnter={() => setHoveredPlot(plot)}
                  onMouseLeave={() => setHoveredPlot(null)}
                  onClick={() => setSelectedPlot(plot)}
                >
                  {/* Pin Button */}
                  <button className={`
                    relative group flex flex-col items-center justify-center transition-all duration-300
                    ${isSelected ? 'scale-125 z-20' : 'hover:scale-110 z-10'}
                  `}>
                    {/* Ripple Effect for Available */}
                    {plot.status === 'AVAILABLE' && !isSelected && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400 opacity-40"></span>
                    )}

                    {/* The Pin Dot */}
                    <div className={`
                      w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center
                      ${colors.fill} ${colors.shadow}
                      ${isSelected ? 'ring-4 ring-black/10' : ''}
                    `}>
                      <span className="text-white text-xs font-black">{plot.plotNumber}</span>
                    </div>

                    {/* Hover Tooltip (Small text bubble above pin) */}
                    {(isHovered || isSelected) && (
                      <div className="absolute bottom-full mb-2 bg-[#12262D] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                        {plot.title}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#12262D]"></div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Details Sidebar (Reused from previous demo) */}
      <div className="w-full md:w-[380px] shrink-0">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden sticky top-8">
          <div className="p-6 bg-[#12262D] text-white relative">
            <MapPin className="w-8 h-8 opacity-20 absolute top-6 right-6" />
            <h3 className="text-xl font-black mb-1">Plot Details</h3>
            <p className="text-sm text-slate-300 font-medium">Click on any pin to see details</p>
          </div>
          
          <div className="p-6">
            {selectedPlot ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="flex items-center justify-between">
                  <h4 className="text-2xl font-black text-[#12262D]">{selectedPlot.title}</h4>
                  <div className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 ${getStatusColor(selectedPlot.status).bg} ${getStatusColor(selectedPlot.status).text}`}>
                    {selectedPlot.status === "AVAILABLE" && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {selectedPlot.status === "BOOKED" && <Clock className="w-3.5 h-3.5" />}
                    {selectedPlot.status === "SOLD" && <XCircle className="w-3.5 h-3.5" />}
                    {getStatusColor(selectedPlot.status).label}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Plot Size</p>
                    <p className="text-lg font-bold text-[#12262D]">{selectedPlot.size}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Price</p>
                    <p className="text-lg font-bold text-[#12262D]">{selectedPlot.status === "SOLD" ? "N/A" : selectedPlot.price}</p>
                  </div>
                </div>

                {selectedPlot.status === "AVAILABLE" && (
                  <button className="w-full py-4 mt-4 bg-[#00695C] hover:bg-[#004D40] text-white font-bold rounded-xl shadow-lg shadow-[#00695C]/20 transition-all hover:-translate-y-0.5">
                    Book This Plot
                  </button>
                )}
                {selectedPlot.status === "BOOKED" && (
                  <button className="w-full py-4 mt-4 bg-slate-100 text-slate-500 font-bold rounded-xl cursor-not-allowed">
                    Currently Reserved
                  </button>
                )}
                {selectedPlot.status === "SOLD" && (
                  <button className="w-full py-4 mt-4 bg-slate-100 text-slate-500 font-bold rounded-xl cursor-not-allowed">
                    Already Sold
                  </button>
                )}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">Select a plot pin from the map<br/>to view its full details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
