"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  ChevronLeft, ChevronRight, LayoutList, BookOpen, Download, 
  Map, ZoomIn, ZoomOut, Maximize, Search, PanelLeftClose, PanelLeft, X
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isClickScroll = useRef(false);

  useEffect(() => {
    isClickScroll.current = true;
    setCurrentPage(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [brochure]);

  useEffect(() => {
    if (viewMode === "SCROLL" && pageRefs.current[currentPage] && isClickScroll.current) {
      pageRefs.current[currentPage]?.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { isClickScroll.current = false; }, 800);
    }
  }, [currentPage, viewMode]);

  const handleScroll = () => {
    if (viewMode !== "SCROLL" || !scrollContainerRef.current || isClickScroll.current) return;
    const container = scrollContainerRef.current;
    const scrollPosition = container.scrollTop + container.clientHeight / 3;
    let closestIndex = 0;
    let minDistance = Infinity;
    
    pageRefs.current.forEach((ref, index) => {
      if (ref) {
        const distance = Math.abs(ref.offsetTop - scrollPosition);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      }
    });
    
    if (closestIndex !== currentPage) {
      setCurrentPage(closestIndex);
    }
  };

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
    if (currentPage < brochure.pages.length - 1) {
      isClickScroll.current = true;
      setCurrentPage(p => p + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      isClickScroll.current = true;
      setCurrentPage(p => p - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {
        setIsFullscreen(!isFullscreen);
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
        isFullscreen ? 'fixed inset-0 z-50' : 'relative w-full h-[85vh] sm:h-[800px]'
      }`}
    >
      {/* Top Toolbar - CLEANED UP */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 shrink-0 bg-white">
        
        {/* Left: View Modes */}
        <div className="flex items-center gap-2 sm:gap-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-md transition-colors" title="Toggle Thumbnails">
            {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
          </button>
          
          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

          <button onClick={() => setViewMode("SCROLL")} className={`flex items-center gap-2 text-sm font-semibold transition-colors ${viewMode === "SCROLL" ? "text-[#00695C]" : "text-slate-400 hover:text-slate-600"}`}>
            <LayoutList className="w-4 h-4" /> <span className="hidden sm:inline">Scroll</span>
          </button>
          <button onClick={() => setViewMode("BOOK")} className={`flex items-center gap-2 text-sm font-semibold transition-colors ${viewMode === "BOOK" ? "text-[#00695C]" : "text-slate-400 hover:text-slate-600"}`}>
            <BookOpen className="w-4 h-4" /> <span className="hidden sm:inline">Book</span>
          </button>
          <button onClick={() => setViewMode("MASTERPLAN")} className={`flex items-center gap-2 text-sm font-semibold transition-colors ${viewMode === "MASTERPLAN" ? "text-[#00695C]" : "text-slate-400 hover:text-slate-600"}`}>
            <Map className="w-4 h-4" /> <span className="hidden sm:inline">Map</span>
          </button>
        </div>

        {/* Center: Title / Page Indicator */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          {viewMode !== "MASTERPLAN" && (
            <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase">
              Page {currentPage + 1} / {brochure.pages.length}
            </span>
          )}
        </div>

        {/* Right: Tools */}
        <div className="flex items-center gap-1 sm:gap-2">
          {viewMode !== "MASTERPLAN" && (
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-md transition-colors" title="Search">
              <Search className="w-5 h-5" />
            </button>
          )}
          <button onClick={() => alert("PDF Download starting...")} className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-[#00695C] rounded-md transition-colors" title="Download PDF">
            <Download className="w-5 h-5" />
          </button>
          <button onClick={toggleFullscreen} className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-md transition-colors" title="Fullscreen">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-slate-50 border-b border-slate-100 overflow-hidden shrink-0">
            <div className="px-6 py-3 flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent border-none outline-none text-sm text-[#12262D] placeholder:text-slate-400" />
              <button onClick={() => setSearchOpen(false)} className="p-1 hover:bg-slate-200 text-slate-500 rounded-full"><X className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Viewer Area */}
      <div className="flex-1 flex overflow-hidden relative bg-slate-50/50">
        
        {/* Thumbnails Sidebar - Single Column */}
        <AnimatePresence>
          {sidebarOpen && viewMode !== "MASTERPLAN" && (
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -50 }}
              className="absolute sm:relative inset-y-0 left-0 z-40 bg-white border-r border-slate-100 flex flex-col shrink-0 overflow-y-auto w-40 sm:w-48 shadow-2xl sm:shadow-none"
            >
              <div className="p-4 grid grid-cols-1 gap-4">
                {brochure.pages.map((src, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { isClickScroll.current = true; setCurrentPage(idx); if (window.innerWidth < 640) setSidebarOpen(false); }}
                    className={`relative w-full aspect-[3/4] rounded shadow-sm overflow-hidden transition-all duration-300
                      ${currentPage === idx ? "ring-2 ring-[#00695C] scale-[1.02]" : "hover:shadow-md hover:scale-[1.02] ring-1 ring-slate-200"}
                    `}
                  >
                    <Image src={src} alt={`Thumb ${idx+1}`} fill className="object-cover" unoptimized />
                    <div className="absolute bottom-1 right-1 bg-white/90 shadow px-1.5 py-0.5 rounded text-[9px] font-bold text-slate-500">{idx + 1}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Viewer Canvas */}
        <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center">
          
          {/* SCROLL MODE */}
          {viewMode === "SCROLL" && (
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="w-full h-full overflow-y-auto px-4 py-8 sm:px-12 flex flex-col items-center gap-6 sm:gap-12 scrollbar-thin scrollbar-thumb-slate-200"
            >
              {brochure.pages.map((src, idx) => (
                <div 
                  key={idx} 
                  ref={el => { pageRefs.current[idx] = el; }}
                  className="w-full max-w-3xl relative aspect-[3/4] bg-white shadow-sm ring-1 ring-slate-100"
                >
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
                  <div className="absolute right-4 bottom-4 z-20 flex gap-2">
                    <button onClick={() => zoomOut()} className="p-2.5 bg-white shadow-sm hover:shadow-md ring-1 ring-slate-100 rounded-full text-slate-500 transition-all"><ZoomOut className="w-4 h-4" /></button>
                    <button onClick={() => resetTransform()} className="px-4 bg-white shadow-sm hover:shadow-md ring-1 ring-slate-100 rounded-full text-slate-500 text-xs font-bold transition-all">FIT</button>
                    <button onClick={() => zoomIn()} className="p-2.5 bg-white shadow-sm hover:shadow-md ring-1 ring-slate-100 rounded-full text-slate-500 transition-all"><ZoomIn className="w-4 h-4" /></button>
                  </div>

                  {/* Navigation Arrows for Book Mode */}
                  <button onClick={prevPage} disabled={currentPage === 0} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/80 hover:bg-white rounded-full shadow-sm ring-1 ring-slate-100 text-slate-600 disabled:opacity-0 transition-all hidden sm:block">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button onClick={nextPage} disabled={currentPage === brochure.pages.length - 1} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/80 hover:bg-white rounded-full shadow-sm ring-1 ring-slate-100 text-slate-600 disabled:opacity-0 transition-all hidden sm:block">
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentPage}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative w-full max-w-3xl aspect-[3/4] bg-white shadow-sm ring-1 ring-slate-100"
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
                  <div className="absolute right-4 bottom-4 z-20 flex gap-2">
                    <button onClick={() => zoomOut()} className="p-2.5 bg-white shadow-sm hover:shadow-md ring-1 ring-slate-100 rounded-full text-slate-500 transition-all"><ZoomOut className="w-4 h-4" /></button>
                    <button onClick={() => resetTransform()} className="px-4 bg-white shadow-sm hover:shadow-md ring-1 ring-slate-100 rounded-full text-slate-500 text-xs font-bold transition-all">FIT</button>
                    <button onClick={() => zoomIn()} className="p-2.5 bg-white shadow-sm hover:shadow-md ring-1 ring-slate-100 rounded-full text-slate-500 transition-all"><ZoomIn className="w-4 h-4" /></button>
                  </div>

                  <div className="absolute left-4 top-4 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-slate-100 shadow-sm pointer-events-none hidden sm:block">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Map Legend</h4>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-2.5"><div className="w-3 h-3 bg-emerald-100 border border-emerald-300 rounded-sm"></div><span className="text-xs font-bold text-slate-600">Available</span></div>
                      <div className="flex items-center gap-2.5"><div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded-sm"></div><span className="text-xs font-bold text-slate-600">Reserved</span></div>
                      <div className="flex items-center gap-2.5"><div className="w-3 h-3 bg-rose-100 border border-rose-300 rounded-sm"></div><span className="text-xs font-bold text-slate-600">Sold</span></div>
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
                              cursor-pointer stroke-[0.3] transition-all duration-300
                              ${plot.status === 'AVAILABLE' ? 'fill-emerald-500/20 stroke-emerald-400 hover:fill-emerald-500/40' : ''}
                              ${plot.status === 'BOOKED' ? 'fill-amber-500/20 stroke-amber-400 hover:fill-amber-500/40' : ''}
                              ${plot.status === 'SOLD' ? 'fill-rose-500/20 stroke-rose-400 hover:fill-rose-500/40' : ''}
                              ${selectedPlot?.id === plot.id ? '!stroke-[0.6] !stroke-white drop-shadow-md' : ''}
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
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="absolute inset-y-0 right-0 z-40 w-full sm:w-80 bg-white border-l border-slate-100 shadow-xl flex flex-col"
            >
              <div className="p-5 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black font-heading leading-none mb-1">{selectedPlot.id}</h3>
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-slate-100
                    ${selectedPlot.status === 'AVAILABLE' ? 'text-emerald-600' : ''}
                    ${selectedPlot.status === 'BOOKED' ? 'text-amber-600' : ''}
                    ${selectedPlot.status === 'SOLD' ? 'text-rose-600' : ''}
                  `}>
                    {selectedPlot.status}
                  </span>
                </div>
                <button onClick={() => setSelectedPlot(null)} className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto px-5 py-2">
                <div className="space-y-4 text-sm">
                  <div><span className="text-[10px] text-slate-400 font-bold uppercase block">Size</span><span className="font-semibold text-slate-700">{selectedPlot.size}</span></div>
                  <div><span className="text-[10px] text-slate-400 font-bold uppercase block">Type</span><span className="font-semibold text-slate-700">{selectedPlot.type}</span></div>
                  <div><span className="text-[10px] text-slate-400 font-bold uppercase block">Facing</span><span className="font-semibold text-slate-700">{selectedPlot.facing}</span></div>
                  <div><span className="text-[10px] text-slate-400 font-bold uppercase block">Road</span><span className="font-semibold text-slate-700">{selectedPlot.frontRoad}</span></div>
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Price</span>
                    <span className="font-black text-xl text-[#00695C]">{selectedPlot.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-50 space-y-2">
                <button className="w-full bg-[#00695C] text-white py-3 rounded-lg font-bold text-sm hover:bg-[#004d40] transition-colors">
                  Schedule Site Visit
                </button>
                <button className="w-full bg-white text-[#12262D] border border-slate-200 py-3 rounded-lg font-bold text-sm hover:border-[#00695C] transition-colors">
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
