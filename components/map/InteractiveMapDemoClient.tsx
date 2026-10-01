"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, Expand, X, CheckCircle2, PhoneCall, Info, Calendar, Share2, RotateCcw, ChevronDown } from "lucide-react";

const module1Plots = Array.from({ length: 15 }, (_, i) => {
  const num = i + 1;
  const is30 = num <= 7;
  const statuses = ["AVAILABLE", "AVAILABLE", "BOOKED", "SOLD", "AVAILABLE"];
  return {
    id: `CP-${num.toString().padStart(2, '0')}`,
    size: is30 ? "30 Katha" : "40 Katha",
    type: "Commercial Plot",
    status: statuses[i % statuses.length],
    price: is30 ? "৳ 4,05,00,000" : "৳ 5,40,00,000",
    facing: num % 2 === 0 ? "South Facing" : "River Facing",
    frontRoad: "100ft Riverfront Boulevard",
    location: "Commercial Riverfront",
    desc: "High-visibility commercial plot suitable for corporate towers, financial institutions, shopping malls, and hospitality complexes."
  };
});

const module2Plots = Array.from({ length: 16 }, (_, i) => {
  const num = i + 1;
  let size = "20 Katha";
  let price = "৳ 2,70,00,000";
  if (num === 1) { size = "30 Katha"; price = "৳ 4,05,00,000"; }
  else if (num >= 2 && num <= 6) { size = "25 Katha"; price = "৳ 3,37,50,000"; }
  
  const statuses = ["AVAILABLE", "BOOKED", "AVAILABLE", "AVAILABLE", "SOLD"];
  return {
    id: num.toString().padStart(2, '0'),
    size: size,
    type: "Premium Plot",
    status: statuses[(i + 2) % statuses.length],
    price: price,
    facing: num % 2 === 0 ? "East Facing" : "West Facing",
    frontRoad: "60ft Internal Avenue",
    location: "Premium Zone",
    desc: "Exclusive premium plot perfect for building your dream home in a highly secure, master-planned community."
  };
});

export default function InteractiveMapDemoClient() {
  const [filterZone, setFilterZone] = useState("All Zones");
  const [filterSize, setFilterSize] = useState("All Sizes");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModule1 = module1Plots.filter(p => {
    if (filterZone === "Premium Residential") return false;
    if (filterSize !== "All Sizes" && p.size !== filterSize) return false;
    if (filterStatus !== "All Status" && p.status !== filterStatus) return false;
    if (searchQuery && !p.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const filteredModule2 = module2Plots.filter(p => {
    if (filterZone === "Corporate & Commercial") return false;
    if (filterSize !== "All Sizes" && p.size !== filterSize) return false;
    if (filterStatus !== "All Status" && p.status !== filterStatus) return false;
    if (searchQuery && !p.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const totalPlots = 31; // 15 + 16
  const availablePlots = [...module1Plots, ...module2Plots].filter(p => p.status === "AVAILABLE").length;
  const matchingPlots = filteredModule1.length + filteredModule2.length;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      
      {/* Top Header & Stats */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between mb-6 gap-4 lg:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-left">
          <h1 className="text-3xl md:text-4xl font-black font-heading text-[#12262D] tracking-tight mb-2">
            Interactive Property Map
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl">
            Explore our master-planned sectors side-by-side. Use the filters below to find the perfect location for your future home or business.
          </p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 self-start lg:self-auto">
          <div className="flex flex-col items-center justify-center px-3 md:px-5 py-1.5 md:py-2 border-r border-slate-100">
            <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total Plots</span>
            <span className="font-heading font-black text-[#12262D] text-lg md:text-2xl leading-none">{totalPlots}+</span>
          </div>
          <div className="flex flex-col items-center justify-center px-3 md:px-5 py-1.5 md:py-2 bg-emerald-50 rounded-xl border border-emerald-100/50">
            <span className="text-[10px] md:text-xs text-emerald-600 font-bold uppercase tracking-wider mb-0.5">Available</span>
            <span className="font-heading font-black text-emerald-700 text-lg md:text-2xl leading-none">{availablePlots}</span>
          </div>
          <div className="flex flex-col items-center justify-center px-3 md:px-5 py-1.5 md:py-2">
            <span className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">Facilities</span>
            <span className="font-heading font-black text-[#00695C] text-lg md:text-2xl leading-none">12 Hubs</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full max-w-7xl mx-auto mb-6 flex flex-col md:flex-row gap-3 md:gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <div className="w-full md:w-auto flex-1 flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide snap-x">
          
          <div className="relative snap-start shrink-0">
            <select 
              value={filterZone} 
              onChange={(e) => setFilterZone(e.target.value)}
              className="w-full bg-white border border-slate-200 text-[#12262D] text-xs font-bold rounded-xl pl-4 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00695C] shadow-sm appearance-none cursor-pointer hover:border-slate-300 transition-colors"
            >
              <option value="All Zones">Zone: All Zones</option>
              <option value="Corporate & Commercial">Corporate & Commercial</option>
              <option value="Premium Residential">Premium Residential</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>

          <div className="relative snap-start shrink-0">
            <select 
              value={filterSize} 
              onChange={(e) => setFilterSize(e.target.value)}
              className="w-full bg-white border border-slate-200 text-[#12262D] text-xs font-bold rounded-xl pl-4 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00695C] shadow-sm appearance-none cursor-pointer hover:border-slate-300 transition-colors"
            >
              <option value="All Sizes">Size: All Sizes</option>
              <option value="20 Katha">20 Katha</option>
              <option value="25 Katha">25 Katha</option>
              <option value="30 Katha">30 Katha</option>
              <option value="40 Katha">40 Katha</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>

          <div className="relative snap-start shrink-0">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-white border border-slate-200 text-[#12262D] text-xs font-bold rounded-xl pl-4 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00695C] shadow-sm appearance-none cursor-pointer hover:border-slate-300 transition-colors"
            >
              <option value="All Status">Status: All Status</option>
              <option value="AVAILABLE">Available</option>
              <option value="BOOKED">Booked</option>
              <option value="SOLD">Sold</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>

          <div className="snap-start shrink-0 bg-[#E8F5F3] text-[#00695C] text-xs font-black px-4 py-2.5 rounded-xl border border-[#00695C]/20 whitespace-nowrap">
            {matchingPlots} Properties Matching
          </div>
          
          {(filterZone !== "All Zones" || filterSize !== "All Sizes" || filterStatus !== "All Status" || searchQuery !== "") && (
            <button
              onClick={() => {
                setFilterZone("All Zones");
                setFilterSize("All Sizes");
                setFilterStatus("All Status");
                setSearchQuery("");
              }}
              className="snap-start shrink-0 flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 px-3 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        <div className="w-full md:w-[280px] shrink-0 relative">
          <input
            type="text"
            placeholder="Search by Plot No. (e.g. CP-04)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 text-[#12262D] text-xs font-bold rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00695C] shadow-sm placeholder:text-slate-400 placeholder:font-medium"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-start gap-6">
        
        {/* Module 1 */}
        <MapModule 
          imageSrc="/images/map-interactive.jpg" 
          title="Sector 1" 
          subtitle="Corporate & Commercial Zone"
          plotsData={filteredModule1} 
        />
        
        {/* Module 2 */}
        <MapModule 
          imageSrc="/images/map-interactive-2.jpg" 
          title="Sector 2" 
          subtitle="Premium Residential Zone"
          plotsData={filteredModule2} 
        />

      </div>
    </div>
  );
}

function MapModule({ imageSrc, title, subtitle, plotsData }: { imageSrc: string, title: string, subtitle: string, plotsData: any[] }) {
  const [selectedPlot, setSelectedPlot] = useState<typeof module1Plots[0] | null>(null);

  return (
    <div className="flex-1 bg-white rounded-2xl lg:rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-row relative w-full">
      
      {/* Left Side: Map Viewer */}
      <div className="w-[55%] lg:w-[60%] relative bg-[#E8F5F3]/30 flex flex-col">
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
              <div className="absolute top-2 left-2 lg:top-4 lg:left-4 z-20 flex flex-col gap-1 lg:gap-2">
                <button onClick={() => zoomIn()} className="bg-white/90 backdrop-blur text-slate-700 hover:text-[#00695C] p-1.5 lg:p-2 rounded-lg lg:rounded-xl shadow-lg border border-slate-100 transition-all hover:scale-105">
                  <ZoomIn className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
                <button onClick={() => zoomOut()} className="bg-white/90 backdrop-blur text-slate-700 hover:text-[#00695C] p-1.5 lg:p-2 rounded-lg lg:rounded-xl shadow-lg border border-slate-100 transition-all hover:scale-105">
                  <ZoomOut className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
                <button onClick={() => resetTransform()} className="bg-white/90 backdrop-blur text-slate-700 hover:text-[#00695C] p-1.5 lg:p-2 rounded-lg lg:rounded-xl shadow-lg border border-slate-100 transition-all hover:scale-105">
                  <Expand className="w-3 h-3 lg:w-4 lg:h-4" />
                </button>
              </div>

              <TransformComponent wrapperClass="!w-full" contentClass="!w-full flex items-center justify-center">
                <div className="relative w-full p-2 lg:p-4">
                  <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-auto object-contain drop-shadow-2xl rounded-xl lg:rounded-2xl"
                    draggable={false}
                  />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Right Side: Sidebar & Plot Selection */}
      <div className="absolute top-0 right-0 bottom-0 w-[45%] lg:w-[40%] flex flex-col bg-white border-l border-slate-100 shadow-xl z-10">
        <div className="py-1.5 px-2 md:p-4 border-b border-slate-100 flex flex-col items-center justify-center">
          <div className="w-[60px] md:w-[120px] mb-0.5 md:mb-1">
            <Image 
              src="/images/logo.png" 
              alt="MOHS Venice City" 
              width={120} 
              height={40} 
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>
          <div className="bg-[#00695C] text-white text-[6px] md:text-[10px] px-1.5 py-0.5 md:px-3 md:py-1 rounded-full font-bold uppercase tracking-wider mb-1 md:mb-2 shadow-sm text-center">
            {subtitle}
          </div>
          <div className="text-center flex flex-col items-center justify-center leading-tight md:leading-normal">
            <h2 className="font-heading font-black text-[#12262D] text-[9px] md:text-sm tracking-widest md:tracking-wide m-0">
              SELECT A PLOT
            </h2>
            <p className="text-[7px] md:text-[11px] text-slate-400 font-medium hidden sm:block md:mt-0.5">
              Click for details
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-1.5 md:p-4 scrollbar-thin scrollbar-thumb-slate-200 flex flex-col">
          {plotsData.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4 opacity-60">
              <span className="text-slate-400 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </span>
              <p className="text-[10px] md:text-xs font-bold text-slate-500">No plots match<br/>your filters here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5 md:gap-3">
              {plotsData.map((plot) => (
              <button
                key={plot.id}
                onClick={() => setSelectedPlot(plot)}
                className={`
                  relative group flex flex-col items-center justify-center py-1 px-1 md:p-3 rounded-lg md:rounded-2xl border-2 transition-all duration-300
                  ${plot.status === "AVAILABLE" ? "bg-emerald-50/50 border-emerald-100 text-emerald-900 hover:bg-emerald-100 hover:border-emerald-300" : ""}
                  ${plot.status === "BOOKED" ? "bg-amber-50/50 border-amber-100 text-amber-900 hover:bg-amber-100 hover:border-amber-300" : ""}
                  ${plot.status === "SOLD" ? "bg-rose-50/50 border-rose-100 text-rose-900 hover:bg-rose-100 hover:border-rose-300" : ""}
                  ${selectedPlot?.id === plot.id ? "!border-[#12262D] !shadow-md scale-[1.03] ring-1 md:ring-2 ring-[#12262D]/10" : "hover:shadow-sm hover:-translate-y-0.5"}
                `}
              >
                <span className={`text-[10px] md:text-lg font-black font-heading leading-tight ${selectedPlot?.id === plot.id ? "text-[#12262D]" : ""}`}>
                  {plot.id}
                </span>
                <span className="text-[8px] md:text-[11px] leading-tight font-bold opacity-75">
                  {plot.size}
                </span>
                <span className={`text-[6px] md:text-[8px] uppercase font-black tracking-widest mt-0.5 md:mt-2 px-1 md:px-2 py-0.5 rounded-full
                  ${plot.status === "AVAILABLE" ? "bg-emerald-200/60 text-emerald-800" : ""}
                  ${plot.status === "BOOKED" ? "bg-amber-200/60 text-amber-800" : ""}
                  ${plot.status === "SOLD" ? "bg-rose-200/60 text-rose-800" : ""}
                `}>
                  {plot.status}
                </span>
              </button>
            ))}
          </div>
          )}
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
