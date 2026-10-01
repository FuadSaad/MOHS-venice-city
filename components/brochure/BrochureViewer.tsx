"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  ChevronLeft, ChevronRight, LayoutList, BookOpen, Download, 
  Map, ZoomIn, ZoomOut, Maximize, Search, Printer, Share2, 
  PanelLeftClose, PanelLeft, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface Brochure {
  id: string;
  name: string;
  description: string;
  pages: string[];
  mapImage: string;
}

interface BrochureViewerProps {
  brochure: Brochure;
}

// Dummy plots for the interactive masterplan
const dummyPlots = [
  { id: "CP-01", size: "30 Katha", status: "AVAILABLE", type: "Commercial Plot", facing: "South Facing", frontRoad: "100ft Boulevard", price: "৳ 4,05,00,000", polygon: "40,30 45,30 45,45 40,45" },
  { id: "CP-02", size: "30 Katha", status: "SOLD", type: "Commercial Plot", facing: "River Facing", frontRoad: "100ft Boulevard", price: "৳ 4,05,00,000", polygon: "47,30 52,30 52,45 47,45" },
  { id: "CP-03", size: "40 Katha", status: "BOOKED", type: "Commercial Plot", facing: "North Facing", frontRoad: "80ft Avenue", price: "৳ 5,40,00,000", polygon: "54,30 61,30 61,45 54,45" },
  { id: "PR-01", size: "20 Katha", status: "AVAILABLE", type: "Residential Plot", facing: "East Facing", frontRoad: "60ft Road", price: "৳ 2,50,00,000", polygon: "30,60 38,60 38,70 30,70" },
];

export default function BrochureViewer({ brochure }: BrochureViewerProps) {
  const [viewMode, setViewMode] = useState<"SCROLL" | "BOOK" | "MASTERPLAN">("SCROLL");
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlot, setSelectedPlot] = useState<typeof dummyPlots[0] | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(0);
  }, [brochure]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === "BOOK") {
        if (e.key === "ArrowRight") nextPage();
        if (e.key === "ArrowLeft") prevPage();
      }
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, currentPage, isFullscreen]);

  const nextPage = () => {
    if (currentPage < brochure.pages.length - 1) setCurrentPage(p => p + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {
        setIsFullscreen(!isFullscreen); // Fallback to CSS fullscreen
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`bg-white text-[#12262D] flex flex-col font-sans transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50' : 'relative w-full h-[85vh]'
      }`}
    >
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 bg-white border-b border-slate-200 shrink-0">
        
        {/* Left: View Modes */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button onClick={() => setViewMode("BOOK")} className={`p-2 rounded-md flex items-center gap-2 text-xs font-bold transition-colors ${viewMode === "BOOK" ? "bg-[#00695C] text-white shadow-sm" : "hover:bg-slate-200 text-slate-500"}`}>
            <BookOpen className="w-4 h-4" /> <span className="hidden sm:inline">Book View</span>
          </button>
          <button onClick={() => setViewMode("SCROLL")} className={`p-2 rounded-md flex items-center gap-2 text-xs font-bold transition-colors ${viewMode === "SCROLL" ? "bg-[#00695C] text-white shadow-sm" : "hover:bg-slate-200 text-slate-500"}`}>
            <LayoutList className="w-4 h-4" /> <span className="hidden sm:inline">Scroll View</span>
          </button>
          <button onClick={() => setViewMode("MASTERPLAN")} className={`p-2 rounded-md flex items-center gap-2 text-xs font-bold transition-colors ${viewMode === "MASTERPLAN" ? "bg-[#00695C] text-white shadow-sm" : "hover:bg-slate-200 text-slate-500"}`}>
            <Map className="w-4 h-4" /> <span className="hidden sm:inline">Interactive Masterplan</span>
          </button>
        </div>

        {/* Center: Title / Page Indicator */}
        <div className="flex-1 flex justify-center items-center">
          {viewMode !== "MASTERPLAN" && (
            <div className="flex items-center gap-3">
              <button onClick={prevPage} disabled={currentPage === 0} className="p-1 hover:bg-slate-100 rounded disabled:opacity-30">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-bold text-slate-700">Page {currentPage + 1} of {brochure.pages.length}</span>
              <button onClick={nextPage} disabled={currentPage === brochure.pages.length - 1} className="p-1 hover:bg-slate-100 rounded disabled:opacity-30">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          {viewMode === "MASTERPLAN" && (
            <span className="text-sm font-bold text-[#00695C]">Interactive Masterplan Mode</span>
          )}
        </div>

        {/* Right: Tools */}
        <div className="flex items-center gap-2 text-slate-500">
          {viewMode !== "MASTERPLAN" && (
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 hover:bg-slate-100 hover:text-slate-800 rounded-md transition-colors" title="Search Text">
              <Search className="w-4 h-4" />
            </button>
          )}
          <button onClick={() => alert("Print dialog opening...")} className="p-2 hover:bg-slate-100 hover:text-slate-800 rounded-md transition-colors hidden sm:block" title="Print">
            <Printer className="w-4 h-4" />
          </button>
          <button onClick={() => alert("Share link copied!")} className="p-2 hover:bg-slate-100 hover:text-slate-800 rounded-md transition-colors hidden sm:block" title="Share">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={() => alert("PDF Download starting...")} className="p-2 hover:bg-emerald-50 hover:text-[#00695C] rounded-md transition-colors text-[#00695C]" title="Download PDF">
            <Download className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-slate-300 mx-1 hidden sm:block"></div>
          <button onClick={toggleFullscreen} className="p-2 hover:bg-slate-100 hover:text-slate-800 rounded-md transition-colors" title="Fullscreen">
            <Maximize className="w-4 h-4" />
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 hover:text-slate-800 rounded-md transition-colors" title="Toggle Thumbnails">
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-slate-50 border-b border-slate-200 overflow-hidden shrink-0">
            <div className="p-3 flex items-center gap-3 max-w-2xl mx-auto">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search document text..." className="flex-1 bg-transparent border-none outline-none text-sm text-[#12262D] placeholder:text-slate-400" />
              <button onClick={() => setSearchOpen(false)} className="p-1 hover:bg-slate-200 text-slate-500 rounded"><X className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewer Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Thumbnails Sidebar */}
        <AnimatePresence>
          {sidebarOpen && viewMode !== "MASTERPLAN" && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 50 }}
              className="absolute sm:relative inset-x-0 bottom-0 sm:inset-y-0 sm:left-0 z-40 bg-slate-50 sm:border-r border-t sm:border-t-0 border-slate-200 flex flex-col shrink-0 overflow-y-auto h-48 sm:h-auto sm:w-60 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] sm:shadow-none"
            >
              <div className="p-3 border-b border-slate-200 sticky top-0 bg-slate-50/90 backdrop-blur z-10 flex justify-between items-center">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Pages</span>
                <button className="sm:hidden p-1 hover:bg-slate-200 text-slate-500 rounded" onClick={() => setSidebarOpen(false)}><X className="w-4 h-4" /></button>
              </div>
              <div className="p-3 grid grid-cols-3 sm:grid-cols-2 gap-3">
                {brochure.pages.map((src, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setCurrentPage(idx); if (window.innerWidth < 640) setSidebarOpen(false); }}
                    className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${currentPage === idx ? "border-[#00695C] shadow-lg shadow-[#00695C]/20 scale-105" : "border-slate-200 hover:border-[#00695C]/50 bg-white"}`}
                  >
                    <Image src={src} alt={`Thumb ${idx+1}`} fill className="object-cover" unoptimized />
                    <div className="absolute bottom-1 right-1 bg-white/90 shadow px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700">{idx + 1}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Viewer Canvas */}
        <div className="flex-1 bg-[#F5F8F8] relative overflow-hidden flex flex-col items-center justify-center">
          
          {/* SCROLL MODE */}
          {viewMode === "SCROLL" && (
            <div className="w-full h-full overflow-y-auto p-4 sm:p-12 flex flex-col items-center gap-8 scrollbar-thin scrollbar-thumb-slate-300">
              {brochure.pages.map((src, idx) => (
                <div key={idx} className="w-full max-w-4xl relative aspect-[3/4] bg-white shadow-xl rounded-sm border border-slate-200">
                  <Image src={src} alt={`Page ${idx+1}`} fill className="object-contain" unoptimized />
                </div>
              ))}
            </div>
          )}

          {/* BOOK MODE */}
          {viewMode === "BOOK" && (
            <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
                    <button onClick={() => zoomIn()} className="p-2 bg-white/90 hover:bg-white backdrop-blur rounded-lg shadow-sm border border-slate-200 text-slate-600"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={() => zoomOut()} className="p-2 bg-white/90 hover:bg-white backdrop-blur rounded-lg shadow-sm border border-slate-200 text-slate-600"><ZoomOut className="w-5 h-5" /></button>
                    <button onClick={() => resetTransform()} className="p-2 bg-white/90 hover:bg-white backdrop-blur rounded-lg shadow-sm border border-slate-200 text-slate-600 text-xs font-bold">FIT</button>
                  </div>
                  <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentPage}
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-4xl aspect-[3/4] bg-white shadow-xl rounded-sm border border-slate-200"
                      >
                        <Image src={brochure.pages[currentPage]} alt={`Page ${currentPage+1}`} fill className="object-contain" unoptimized />
                      </motion.div>
                    </AnimatePresence>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          )}

          {/* MASTERPLAN MODE */}
          {viewMode === "MASTERPLAN" && (
            <TransformWrapper initialScale={1} minScale={0.5} maxScale={8} centerOnInit>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
                    <button onClick={() => zoomIn()} className="p-2 bg-white/90 hover:bg-white backdrop-blur rounded-lg shadow-sm border border-slate-200 text-slate-600"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={() => zoomOut()} className="p-2 bg-white/90 hover:bg-white backdrop-blur rounded-lg shadow-sm border border-slate-200 text-slate-600"><ZoomOut className="w-5 h-5" /></button>
                    <button onClick={() => resetTransform()} className="p-2 bg-white/90 hover:bg-white backdrop-blur rounded-lg shadow-sm border border-slate-200 text-slate-600 text-xs font-bold">FIT</button>
                  </div>

                  {/* Legend Overlay */}
                  <div className="absolute left-4 top-4 z-20 bg-white/90 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-sm pointer-events-none hidden sm:block">
                    <h4 className="text-xs font-black text-[#12262D] uppercase tracking-wider mb-3">Map Legend</h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-emerald-100 border border-emerald-400"></div><span className="text-xs font-bold text-slate-600">Available</span></div>
                      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-amber-100 border border-amber-400"></div><span className="text-xs font-bold text-slate-600">Reserved</span></div>
                      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-rose-100 border border-rose-400"></div><span className="text-xs font-bold text-slate-600">Sold</span></div>
                      <div className="flex items-center gap-2"><div className="w-4 h-4 bg-slate-200 border border-slate-400"></div><span className="text-xs font-bold text-slate-600">Unavailable</span></div>
                    </div>
                  </div>

                  <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                    <div className="relative inline-block w-full max-w-[1200px]">
                      <Image 
                        src={brochure.mapImage} 
                        alt="Masterplan" 
                        width={2000} 
                        height={1400} 
                        className="w-full h-auto object-contain pointer-events-none" 
                        unoptimized 
                      />
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
                        {dummyPlots.map((plot) => (
                          <polygon 
                            key={plot.id}
                            points={plot.polygon} 
                            onClick={(e) => { e.stopPropagation(); setSelectedPlot(plot); }}
                            className={`
                              cursor-pointer stroke-[0.2] transition-all duration-300
                              ${plot.status === 'AVAILABLE' ? 'fill-emerald-500/30 stroke-emerald-400 hover:fill-emerald-500/50' : ''}
                              ${plot.status === 'BOOKED' ? 'fill-amber-500/30 stroke-amber-400 hover:fill-amber-500/50' : ''}
                              ${plot.status === 'SOLD' ? 'fill-rose-500/30 stroke-rose-400 hover:fill-rose-500/50' : ''}
                              ${selectedPlot?.id === plot.id ? '!stroke-[0.5] !stroke-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' : ''}
                            `}
                          >
                            <title>{plot.id} - Click for details</title>
                          </polygon>
                        ))}
                      </svg>
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          )}
        </div>

        {/* Masterplan Plot Details Drawer */}
        <AnimatePresence>
          {viewMode === "MASTERPLAN" && selectedPlot && (
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              className="absolute inset-y-0 right-0 z-40 w-full sm:w-80 bg-white text-[#12262D] border-l border-slate-200 shadow-2xl flex flex-col"
            >
              <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50">
                <div>
                  <h3 className="text-2xl font-black font-heading leading-none mb-1">{selectedPlot.id}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full
                    ${selectedPlot.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' : ''}
                    ${selectedPlot.status === 'BOOKED' ? 'bg-amber-100 text-amber-700' : ''}
                    ${selectedPlot.status === 'SOLD' ? 'bg-rose-100 text-rose-700' : ''}
                  `}>
                    {selectedPlot.status}
                  </span>
                </div>
                <button onClick={() => setSelectedPlot(null)} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-5">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Plot Size</label>
                    <div className="font-bold text-lg">{selectedPlot.size}</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Property Type</label>
                    <div className="font-bold">{selectedPlot.type}</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Facing</label>
                    <div className="font-bold">{selectedPlot.facing}</div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Front Road</label>
                    <div className="font-bold">{selectedPlot.frontRoad}</div>
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Estimated Price</label>
                    <div className="font-black text-2xl text-[#00695C]">{selectedPlot.price}</div>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3">
                <button className="w-full bg-[#00695C] text-white py-3 rounded-xl font-bold hover:bg-[#004d40] transition-colors shadow-md">
                  Schedule Site Visit
                </button>
                <button className="w-full bg-white text-[#12262D] border border-slate-200 py-3 rounded-xl font-bold hover:border-[#00695C] hover:text-[#00695C] transition-colors">
                  Contact Sales Team
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
