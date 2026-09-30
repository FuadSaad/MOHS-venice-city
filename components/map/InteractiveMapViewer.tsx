"use client";

import React, { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import {
  Search,
  Plus,
  Minus,
  RotateCcw,
  Maximize2,
  Minimize2,
  Layers,
  MapPin,
  Compass,
  CheckCircle2,
  Calendar,
  Info,
  X,
  Share2,
  Code,
  Target,
  Sparkles,
} from "lucide-react";
import {
  PLOT_DATASET,
  FACILITIES_DATASET,
  PlotItem,
  FacilityItem,
  MAP_DIMENSIONS,
  STATUS_COLORS,
} from "@/data/interactiveMapData";
import SiteVisitModal from "@/components/property/SiteVisitModal";
import EnquiryModal from "@/components/property/EnquiryModal";

export default function InteractiveMapViewer() {
  const transformRef = useRef<ReactZoomPanPinchRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  // Selection states
  const [selectedPlot, setSelectedPlot] = useState<PlotItem | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);
  const [hoveredPlot, setHoveredPlot] = useState<PlotItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Filters
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [sizeFilter, setSizeFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [facingFilter, setFacingFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Map view layers & controls
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [showFacilities, setShowFacilities] = useState<boolean>(false);
  // Development Mode (Requirement 14: "Show Plot Boundaries")
  const [showPlotBoundaries, setShowPlotBoundaries] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Modals
  const [isVisitModalOpen, setIsVisitModalOpen] = useState<boolean>(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);

  // Filter matching calculation
  const { matchingPlotIds, matchingPlots } = useMemo(() => {
    const matching = PLOT_DATASET.filter((plot) => {
      if (typeFilter !== "ALL" && plot.type !== typeFilter) return false;
      if (sizeFilter !== "ALL" && !plot.size.toLowerCase().includes(sizeFilter.toLowerCase())) return false;
      if (statusFilter !== "ALL" && plot.status !== statusFilter) return false;
      if (facingFilter !== "ALL" && !plot.facing.toLowerCase().includes(facingFilter.toLowerCase())) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchNo = plot.plotNo.toLowerCase().includes(q);
        const matchMapNum = plot.mapPlotNum?.toLowerCase().includes(q);
        const matchTitle = plot.title.toLowerCase().includes(q);
        const matchSector = plot.sector.toLowerCase().includes(q);
        if (!matchNo && !matchTitle && !matchSector && !matchMapNum) return false;
      }
      return true;
    });

    return {
      matchingPlotIds: new Set(matching.map((p) => p.id)),
      matchingPlots: matching,
    };
  }, [typeFilter, sizeFilter, statusFilter, facingFilter, searchQuery]);

  // Handle URL query param on mount (e.g. ?plot=P-093)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const plotParam = params.get("plot");
      if (plotParam) {
        const found = PLOT_DATASET.find(
          (p) => p.id.toLowerCase() === plotParam.toLowerCase() || p.plotNo.toLowerCase() === plotParam.toLowerCase()
        );
        if (found) {
          setSelectedPlot(found);
          const timer = setTimeout(() => {
            zoomToPlot(found);
          }, 300);
          return () => clearTimeout(timer);
        }
      }

      // If no query param, initial zoom to the verified test area
      const timer = setTimeout(() => {
        focusTestArea();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  // Zoom to a specific plot using react-zoom-pan-pinch zoomToElement
  const zoomToPlot = (plot: PlotItem) => {
    if (!transformRef.current) return;
    setTimeout(() => {
      try {
        transformRef.current?.zoomToElement(plot.id, 5.0, 500);
      } catch (err) {
        console.warn("zoomToPlot error:", err);
      }
    }, 50);
  };

  // Focus directly on the verified prototype test area (P-093, P-094, P-102, P-103, P-111)
  const focusTestArea = () => {
    if (!transformRef.current) return;
    setTimeout(() => {
      try {
        transformRef.current?.zoomToElement("P-102", 4.2, 500);
      } catch (err) {
        console.warn("focusTestArea error:", err);
      }
    }, 50);
  };

  const handleSelectPlot = (plot: PlotItem) => {
    setSelectedPlot(plot);
    setSelectedFacility(null);
    zoomToPlot(plot);
  };

  const handleSelectFacility = (fac: FacilityItem) => {
    setSelectedFacility(fac);
    setSelectedPlot(null);

    if (transformRef.current && containerRef.current && mapWrapperRef.current) {
      const container = containerRef.current;
      const mapWrapper = mapWrapperRef.current;
      const containerW = container.clientWidth;
      const containerH = container.clientHeight;
      const mapW = mapWrapper.clientWidth;
      const mapH = mapWrapper.clientHeight;

      const scale = 4.0;
      const pixelX = (fac.x / MAP_DIMENSIONS.width) * mapW;
      const pixelY = (fac.y / MAP_DIMENSIONS.height) * mapH;

      const targetX = containerW / 2 - pixelX * scale;
      const targetY = containerH / 2 - pixelY * scale;

      transformRef.current.setTransform(targetX, targetY, scale, 600);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim().toLowerCase();
    const found = PLOT_DATASET.find(
      (p) => p.plotNo.toLowerCase() === q || p.id.toLowerCase() === q || p.mapPlotNum?.toLowerCase() === q
    ) || matchingPlots[0];

    if (found) {
      handleSelectPlot(found);
    }
  };

  const handleResetFilters = () => {
    setTypeFilter("ALL");
    setSizeFilter("ALL");
    setStatusFilter("ALL");
    setFacingFilter("ALL");
    setSearchQuery("");
  };

  const handleSharePlot = (plot: PlotItem) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/interactive-map?plot=${plot.id}`;
      navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="bg-[#F5F8F8] min-h-screen flex flex-col">
      {/* 1. Header Section */}
      <div className="bg-white border-b border-[#E2E7E5] py-4 sm:py-5 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#657278] mb-1">
                <Link href="/" className="hover:text-[#00695C] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#00695C] font-bold">Interactive Map</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading tracking-tight">
                Interactive Property Map
              </h1>
              <p className="text-xs sm:text-sm text-[#657278] mt-0.5">
                Explore available plots, apartments and community facilities with precise vector plot boundaries.
              </p>
            </div>

            {/* Quick Test Area & Development Mode Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {/* Focus Verified Test Area Button */}
              <button
                onClick={focusTestArea}
                className="px-3.5 py-2 bg-[#E8F5F3] hover:bg-emerald-100 text-[#00695C] border border-[#00695C]/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                title="Focus on verified test plots P-093, P-094, P-102, P-103, P-111"
              >
                <Target className="w-3.5 h-3.5 text-[#00695C]" />
                <span>Test Area (P-093, P-094, P-102...)</span>
              </button>

              {/* Dev Mode: Show Plot Boundaries (Requirement 14) */}
              <button
                onClick={() => setShowPlotBoundaries(!showPlotBoundaries)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-xs ${
                  showPlotBoundaries
                    ? "bg-[#12262D] text-white border-[#12262D]"
                    : "bg-white hover:bg-slate-100 text-[#12262D] border-[#E2E7E5]"
                }`}
                title="Toggle visual SVG plot boundaries and labels on/off"
              >
                <Code className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>Show Plot Boundaries: {showPlotBoundaries ? "ON" : "OFF"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="bg-white border-b border-[#E2E7E5] py-3 shadow-xs sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Property Type */}
            <div className="flex items-center gap-1.5 bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-2.5 py-1.5 text-xs">
              <span className="font-bold text-[#657278]">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-transparent font-bold text-[#12262D] focus:outline-none cursor-pointer text-xs"
              >
                <option value="ALL">All Types</option>
                <option value="Residential Plot">Residential Plot</option>
                <option value="Flat / Apartment">Flat / Apartment</option>
                <option value="Commercial Plot">Commercial Plot</option>
              </select>
            </div>

            {/* Plot Size */}
            <div className="flex items-center gap-1.5 bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-2.5 py-1.5 text-xs">
              <span className="font-bold text-[#657278]">Size:</span>
              <select
                value={sizeFilter}
                onChange={(e) => setSizeFilter(e.target.value)}
                className="bg-transparent font-bold text-[#12262D] focus:outline-none cursor-pointer text-xs"
              >
                <option value="ALL">All Sizes</option>
                <option value="3 Katha">3 Katha</option>
                <option value="4 Katha">4 Katha</option>
                <option value="5 Katha">5 Katha</option>
                <option value="10 Katha">10 Katha</option>
              </select>
            </div>

            {/* Status */}
            <div className="flex items-center gap-1.5 bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-2.5 py-1.5 text-xs">
              <span className="font-bold text-[#657278]">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent font-bold text-[#12262D] focus:outline-none cursor-pointer text-xs"
              >
                <option value="ALL">All Status</option>
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Sold">Sold</option>
                <option value="Featured">Featured</option>
              </select>
            </div>

            {/* Facing */}
            <div className="flex items-center gap-1.5 bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-2.5 py-1.5 text-xs">
              <span className="font-bold text-[#657278]">Facing:</span>
              <select
                value={facingFilter}
                onChange={(e) => setFacingFilter(e.target.value)}
                className="bg-transparent font-bold text-[#12262D] focus:outline-none cursor-pointer text-xs"
              >
                <option value="ALL">All Facing</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>

            {/* Active Filters Clear Button */}
            {(typeFilter !== "ALL" || sizeFilter !== "ALL" || statusFilter !== "ALL" || facingFilter !== "ALL" || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-2.5 py-1.5 rounded-xl border border-rose-200 transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Reset
              </button>
            )}

            {/* Matching Count Badge */}
            <div className="text-xs font-bold text-[#00695C] bg-[#E8F5F3] px-3 py-1.5 rounded-xl border border-[#00695C]/20 whitespace-nowrap">
              {matchingPlots.length} Plots Matching
            </div>
          </div>

          {/* Search by Plot No */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5] px-3 py-1.5 w-full lg:w-72 shrink-0"
          >
            <Search className="w-4 h-4 text-[#657278]" />
            <input
              type="text"
              placeholder="Search Plot (e.g. P-093, P-102)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs font-bold text-[#12262D] placeholder-[#657278] focus:outline-none w-full"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>
      </div>

      {/* 3. Main Map Canvas Area */}
      <div
        ref={containerRef}
        className="flex-1 relative w-full overflow-hidden bg-[#1E292E] min-h-[620px] sm:min-h-[720px] lg:min-h-[820px] flex items-center justify-center"
      >
        <TransformWrapper
          ref={transformRef}
          initialScale={1.0}
          minScale={0.8}
          maxScale={12}
          centerOnInit={true}
          wheel={{ step: 0.15 }}
          pinch={{ step: 5 }}
          doubleClick={{ mode: "zoomIn", step: 0.8 }}
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Floating Map Controls (Top Right) */}
              <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#E2E7E5] p-1.5 flex flex-col gap-1">
                  <button
                    onClick={() => zoomIn(0.4)}
                    className="p-2.5 rounded-xl hover:bg-[#F5F8F8] text-[#12262D] hover:text-[#00695C] transition-colors"
                    title="Zoom In (+)"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => zoomOut(0.4)}
                    className="p-2.5 rounded-xl hover:bg-[#F5F8F8] text-[#12262D] hover:text-[#00695C] transition-colors border-t border-[#E2E7E5]"
                    title="Zoom Out (−)"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => resetTransform(400)}
                    className="p-2.5 rounded-xl hover:bg-[#F5F8F8] text-[#12262D] hover:text-[#00695C] transition-colors border-t border-[#E2E7E5]"
                    title="Reset Full View"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="p-2.5 rounded-xl hover:bg-[#F5F8F8] text-[#12262D] hover:text-[#00695C] transition-colors border-t border-[#E2E7E5]"
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                </div>

                {/* Quick Target Verified Test Area Button */}
                <button
                  onClick={focusTestArea}
                  className="bg-white/95 backdrop-blur-md hover:bg-emerald-50 text-[#00695C] p-2.5 rounded-2xl shadow-xl border border-[#E2E7E5] transition-colors flex items-center justify-center group"
                  title="Target Test Area (P-093, P-094, P-102, P-103, P-111)"
                >
                  <Target className="w-4 h-4 text-[#00695C] group-hover:scale-110 transition-transform" />
                </button>
              </div>

              {/* Floating Legend (Bottom Left) */}
              {showLegend && (
                <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#E2E7E5] p-3 max-w-xs animate-fade-in">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#E2E7E5]">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#12262D] font-heading">
                      <Layers className="w-3.5 h-3.5 text-[#00695C]" />
                      <span>Plot Legend</span>
                    </div>
                    <button
                      onClick={() => setShowLegend(false)}
                      className="text-gray-400 hover:text-gray-600 p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs font-bold text-[#12262D]">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-[#00695C] shadow-xs" />
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-[#D6A84F] shadow-xs" />
                      <span>Reserved</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-[#EF4444] shadow-xs" />
                      <span>Sold</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-[#159ED0] shadow-xs" />
                      <span>Featured</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-[#E2E7E5] text-[10px] text-[#657278]">
                    Click on any individual plot boundary to inspect details.
                  </div>
                </div>
              )}

              {/* The Pan-Zoom Vector SVG Canvas */}
              <TransformComponent
                wrapperClass="!w-full !h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                contentClass="!w-full !h-full flex items-center justify-center"
              >
                <div
                  ref={mapWrapperRef}
                  className="relative select-none shadow-2xl bg-white"
                  style={{
                    width: "100%",
                    maxWidth: "6600px",
                    aspectRatio: "6600 / 10200",
                  }}
                >
                  <svg
                    viewBox="0 0 6600 10200"
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full h-full block pointer-events-auto bg-white"
                    style={{ width: "100%", height: "100%", backgroundColor: "#FFFFFF" }}
                  >
                    <defs>
                      {/* Glow filter for selected plot */}
                      <filter id="plot-glow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Architectural Paper White Base */}
                    <rect x="0" y="0" width="6600" height="10200" fill="#FFFFFF" />

                    {/* 1. Base Masterplan Vector SVG (100% Vector Quality, No Rasterization) */}
                    <image
                      href="/images/map/MOHS-Venice-City-Project-Map-02.svg"
                      width="6600"
                      height="10200"
                      preserveAspectRatio="xMidYMid meet"
                      className="pointer-events-none block"
                    />

                    {/* 2. Interactive Vector Plot Paths (<path id="..." d="..." class="plot" />) */}
                    {PLOT_DATASET.map((plot) => {
                      const isMatching = matchingPlotIds.has(plot.id);
                      const isSelected = selectedPlot?.id === plot.id;
                      const isHovered = hoveredPlot?.id === plot.id;

                      let fill = "transparent";
                      let stroke = "transparent";
                      let strokeWidth = 0;
                      let filter = undefined;

                      if (isSelected) {
                        fill = "rgba(214, 168, 79, 0.45)"; // Gold highlight
                        stroke = "#D6A84F"; // Gold boundary
                        strokeWidth = 6;
                        filter = "url(#plot-glow)";
                      } else if (isHovered) {
                        fill = "rgba(0, 105, 92, 0.40)"; // Subtle teal fill
                        stroke = "#00695C"; // Subtle teal boundary
                        strokeWidth = 4.5;
                      } else if (showPlotBoundaries) {
                        fill = isMatching ? "rgba(0, 105, 92, 0.12)" : "transparent";
                        stroke = isMatching ? "rgba(0, 105, 92, 0.60)" : "rgba(0,0,0,0.15)";
                        strokeWidth = 2;
                      }

                      return (
                        <g key={plot.id} className="cursor-pointer">
                          {/* Authentic Angled Boundary Vector Path */}
                          <path
                            id={plot.id}
                            d={plot.d}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            strokeLinejoin="round"
                            className="transition-colors duration-150"
                            filter={filter}
                            onClick={() => handleSelectPlot(plot)}
                            onMouseEnter={(e) => {
                              setHoveredPlot(plot);
                              setTooltipPos({ x: e.clientX, y: e.clientY });
                            }}
                            onMouseMove={(e) => {
                              setTooltipPos({ x: e.clientX, y: e.clientY });
                            }}
                            onMouseLeave={() => {
                              setHoveredPlot(null);
                              setTooltipPos(null);
                            }}
                          />

                          {/* Development Mode: Show Plot ID inside centroid */}
                          {(showPlotBoundaries || isSelected || isHovered) && (
                            <text
                              x={plot.center[0]}
                              y={plot.center[1] + 6}
                              textAnchor="middle"
                              fill="#FFFFFF"
                              stroke="rgba(0,0,0,0.85)"
                              strokeWidth={5}
                              paintOrder="stroke"
                              fontSize={isSelected ? 26 : 20}
                              fontWeight="bold"
                              fontFamily="sans-serif"
                              className="pointer-events-none select-none transition-all"
                            >
                              {plot.plotNo}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Facilities Markers */}
                    {showFacilities &&
                      FACILITIES_DATASET.map((fac) => (
                        <g
                          key={fac.id}
                          className="cursor-pointer"
                          onClick={() => handleSelectFacility(fac)}
                        >
                          <circle
                            cx={fac.x}
                            cy={fac.y}
                            r={fac.radius}
                            fill="#159ED0"
                            fillOpacity={0.25}
                            stroke="#159ED0"
                            strokeWidth={4}
                          />
                          <circle cx={fac.x} cy={fac.y} r={14} fill="#159ED0" />
                          <text
                            x={fac.x}
                            y={fac.y - fac.radius - 10}
                            textAnchor="middle"
                            fill="#12262D"
                            stroke="#FFFFFF"
                            strokeWidth={6}
                            paintOrder="stroke"
                            fontSize={22}
                            fontWeight="bold"
                          >
                            {fac.name}
                          </text>
                        </g>
                      ))}
                  </svg>
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

        {/* 4. Hover Tooltip (follows cursor on hover) */}
        {hoveredPlot && tooltipPos && (
          <div
            className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3 bg-[#12262D]/95 text-white backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-2xl border border-white/20 text-xs animate-fade-in"
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y - 12}px` }}
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-extrabold text-[#D6A84F] text-sm">
                Plot {hoveredPlot.plotNo}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  STATUS_COLORS[hoveredPlot.status].badgeBg
                } ${STATUS_COLORS[hoveredPlot.status].badgeText}`}
              >
                {hoveredPlot.status}
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">
              {hoveredPlot.size} • {hoveredPlot.facing} Facing
            </div>
            <div className="text-xs font-bold text-emerald-400 mt-1">
              {hoveredPlot.priceFormatted}
            </div>
          </div>
        )}

        {/* 5. Property Details Panel (Right side card on Desktop / Bottom Sheet on Mobile) */}
        {selectedPlot && (
          <div className="absolute bottom-4 right-4 sm:top-4 sm:bottom-auto w-[calc(100%-2rem)] sm:w-96 max-h-[85vh] overflow-y-auto bg-white/98 backdrop-blur-lg rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#E2E7E5] p-5 z-40 animate-slide-up sm:animate-fade-in">
            {/* Panel Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E7E5]">
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-[#12262D] font-heading">
                  Plot No: {selectedPlot.plotNo}
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    STATUS_COLORS[selectedPlot.status].badgeBg
                  } ${STATUS_COLORS[selectedPlot.status].badgeText} ${
                    STATUS_COLORS[selectedPlot.status].badgeBorder
                  }`}
                >
                  {selectedPlot.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedPlot(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-[#657278] hover:text-[#12262D] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Plot Information Grid */}
            <div className="py-4 space-y-3">
              <div className="bg-[#F5F8F8] p-3.5 rounded-2xl border border-[#E2E7E5] space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#657278] font-medium">Property Type:</span>
                  <span className="font-bold text-[#12262D]">{selectedPlot.type}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#657278] font-medium">Plot Size:</span>
                  <span className="font-bold text-[#00695C] bg-[#E8F5F3] px-2 py-0.5 rounded-md">
                    {selectedPlot.size}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#657278] font-medium">Facing:</span>
                  <span className="font-bold text-[#12262D]">{selectedPlot.facing}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#657278] font-medium">Front Road:</span>
                  <span className="font-bold text-[#12262D]">{selectedPlot.roadWidth}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#657278] font-medium">Location:</span>
                  <span className="font-bold text-[#12262D] text-right truncate max-w-[180px]">
                    {selectedPlot.sector}
                  </span>
                </div>
                {selectedPlot.mapPlotNum && (
                  <div className="flex justify-between items-center text-xs pt-1 border-t border-[#E2E7E5]/70">
                    <span className="text-[#657278] font-medium">Map Sector Label:</span>
                    <span className="font-bold text-[#00695C]">{selectedPlot.mapPlotNum}</span>
                  </div>
                )}
              </div>

              {/* Price Banner */}
              <div className="p-3 bg-gradient-to-r from-[#00695C] to-[#087FA8] rounded-2xl text-white shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider">
                    Price
                  </div>
                  <div className="text-xl font-extrabold font-heading">
                    {selectedPlot.priceFormatted}
                  </div>
                </div>
                <div className="text-[11px] font-bold bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                  Mutation Ready
                </div>
              </div>

              {/* Brief Description */}
              <p className="text-xs text-[#657278] leading-relaxed">
                {selectedPlot.description}
              </p>

              {/* Legal Verification Tag */}
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00695C] bg-[#E8F5F3] p-2 rounded-xl border border-[#00695C]/20">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <span>100% Verified Legal Title & Individual Khatiyan</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2 border-t border-[#E2E7E5]">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="w-full py-2.5 px-3 bg-white border border-[#00695C] text-[#00695C] hover:bg-[#E8F5F3] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="w-full py-2.5 px-3 bg-[#00695C] hover:bg-[#005B50] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                  <span>Schedule Site Visit</span>
                </button>
              </div>

              {/* Share Plot Link */}
              <button
                onClick={() => handleSharePlot(selectedPlot)}
                className="w-full py-2 px-3 text-[11px] text-[#657278] hover:text-[#12262D] hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copySuccess ? "Link Copied to Clipboard!" : "Copy Direct Plot Link"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 6. Modals */}
      <SiteVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        propertyTitle={selectedPlot ? `Plot ${selectedPlot.plotNo} (${selectedPlot.mapPlotNum || ""}) - ${selectedPlot.size}` : "MOHS Venice City Project Tour"}
        propertyId={selectedPlot?.id}
      />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        propertyTitle={selectedPlot ? `Plot ${selectedPlot.plotNo} (${selectedPlot.mapPlotNum || ""}) - ${selectedPlot.size}` : "MOHS Venice City Masterplan"}
        propertyId={selectedPlot?.id}
        propertyType={selectedPlot?.type}
      />
    </div>
  );
}
