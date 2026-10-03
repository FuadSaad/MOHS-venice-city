"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Clock, MapPin, X } from "lucide-react";

type PlotStatus = "AVAILABLE" | "BOOKED" | "SOLD";

interface PlotData {
  id: string;
  title: string;
  status: PlotStatus;
  size: string;
  price: string;
  path: string;
}

const DUMMY_PLOTS: PlotData[] = [
  { id: "A-01", title: "Plot A-01", status: "AVAILABLE", size: "3 Katha", price: "৳ 15,00,000", path: "M 50 50 L 150 50 L 150 150 L 50 150 Z" },
  { id: "A-02", title: "Plot A-02", status: "BOOKED", size: "5 Katha", price: "৳ 25,00,000", path: "M 160 50 L 260 50 L 260 150 L 160 150 Z" },
  { id: "A-03", title: "Plot A-03", status: "SOLD", size: "3 Katha", price: "৳ 15,00,000", path: "M 270 50 L 370 50 L 370 150 L 270 150 Z" },
  { id: "B-01", title: "Plot B-01", status: "AVAILABLE", size: "10 Katha", price: "৳ 50,00,000", path: "M 50 160 L 260 160 L 260 260 L 50 260 Z" },
  { id: "B-02", title: "Plot B-02", status: "SOLD", size: "4 Katha", price: "৳ 20,00,000", path: "M 270 160 L 370 160 L 370 260 L 270 260 Z" },
  { id: "C-01", title: "Plot C-01", status: "AVAILABLE", size: "5 Katha", price: "৳ 25,00,000", path: "M 50 270 L 150 270 L 150 370 L 50 370 Z" },
  { id: "C-02", title: "Plot C-02", status: "AVAILABLE", size: "5 Katha", price: "৳ 25,00,000", path: "M 160 270 L 260 270 L 260 370 L 160 370 Z" },
  { id: "C-03", title: "Plot C-03", status: "BOOKED", size: "5 Katha", price: "৳ 25,00,000", path: "M 270 270 L 370 270 L 370 370 L 270 370 Z" },
];

const getStatusColor = (status: PlotStatus) => {
  switch (status) {
    case "AVAILABLE": return { fill: "#10B981", stroke: "#047857", text: "text-emerald-600", bg: "bg-emerald-100", label: "Available" };
    case "BOOKED": return { fill: "#F59E0B", stroke: "#B45309", text: "text-amber-600", bg: "bg-amber-100", label: "Booked" };
    case "SOLD": return { fill: "#EF4444", stroke: "#B91C1C", text: "text-rose-600", bg: "bg-rose-100", label: "Sold" };
  }
};

export default function SvgInteractiveMapDemo() {
  const [hoveredPlot, setHoveredPlot] = useState<PlotData | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 p-8 flex flex-col md:flex-row gap-8">
      {/* Map Section */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-200 p-8 flex flex-col">
        <h2 className="text-2xl font-black text-[#12262D] mb-6">Interactive SVG Map Demo</h2>
        
        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#10B981] opacity-70"></div>
            <span className="text-sm font-bold text-slate-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#F59E0B] opacity-70"></div>
            <span className="text-sm font-bold text-slate-600">Booked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#EF4444] opacity-70"></div>
            <span className="text-sm font-bold text-slate-600">Sold</span>
          </div>
        </div>

        <div className="flex-1 relative bg-slate-100/50 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center p-8">
          {/* SVG Container */}
          <svg viewBox="0 0 420 420" className="w-full h-full max-w-2xl drop-shadow-md">
            {DUMMY_PLOTS.map((plot) => {
              const colors = getStatusColor(plot.status);
              const isHovered = hoveredPlot?.id === plot.id;
              const isSelected = selectedPlot?.id === plot.id;

              return (
                <g key={plot.id} className="cursor-pointer transition-all duration-300">
                  <path
                    d={plot.path}
                    fill={colors.fill}
                    fillOpacity={isHovered || isSelected ? 0.9 : 0.4}
                    stroke={colors.stroke}
                    strokeWidth={isSelected ? 3 : 1}
                    className="transition-all duration-200 hover:brightness-110"
                    onMouseEnter={() => setHoveredPlot(plot)}
                    onMouseLeave={() => setHoveredPlot(null)}
                    onClick={() => setSelectedPlot(plot)}
                  />
                  {/* Plot ID Text */}
                  <text
                    x={plot.path.split(" ")[1]} // Just calculating a rough center for demo
                    y={plot.path.split(" ")[2]}
                    dx="50"
                    dy="50"
                    textAnchor="middle"
                    fill="#12262D"
                    className="font-bold text-[12px] pointer-events-none select-none"
                    opacity={isHovered || isSelected ? 1 : 0.7}
                  >
                    {plot.id}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Floating Hover Tooltip */}
          {hoveredPlot && (
            <div 
              className="absolute pointer-events-none bg-[#12262D] text-white px-4 py-2 rounded-xl shadow-xl flex items-center gap-3 z-10"
              style={{ bottom: "20px", left: "50%", transform: "translateX(-50%)" }}
            >
              <span className="font-bold">{hoveredPlot.title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
              <span className={`text-xs font-black px-2 py-1 rounded-md ${
                hoveredPlot.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-400' :
                hoveredPlot.status === 'BOOKED' ? 'bg-amber-500/20 text-amber-400' :
                'bg-rose-500/20 text-rose-400'
              }`}>
                {hoveredPlot.status}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Details Sidebar */}
      <div className="w-full md:w-[380px] shrink-0">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden sticky top-8">
          <div className="p-6 bg-[#12262D] text-white relative">
            <MapPin className="w-8 h-8 opacity-20 absolute top-6 right-6" />
            <h3 className="text-xl font-black mb-1">Plot Details</h3>
            <p className="text-sm text-slate-300 font-medium">Click on any plot to see details</p>
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
                <p className="text-slate-500 font-medium">Select a plot from the map<br/>to view its full details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
