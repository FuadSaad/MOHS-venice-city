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
  Phone,
  Info,
  X,
  Share2,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
  EyeOff,
  GraduationCap,
  Trees,
  Waves,
  Ship,
  BookOpen,
  Store,
  Shield,
  Droplets,
  Fuel,
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
  const [showFacilities, setShowFacilities] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  // Modals
  const [isVisitModalOpen, setIsVisitModalOpen] = useState<boolean>(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);

  // Filter matching calculation
  const { matchingPlotIds, matchingPlots } = useMemo(() => {
    const matching = PLOT_DATASET.filter((plot) => {
      // Type filter
      if (typeFilter !== "ALL" && plot.type !== typeFilter) return false;
      // Size filter
      if (sizeFilter !== "ALL") {
        if (!plot.size.toLowerCase().includes(sizeFilter.toLowerCase())) return false;
      }
      // Status filter
      if (statusFilter !== "ALL" && plot.status !== statusFilter) return false;
      // Facing filter
      if (facingFilter !== "ALL") {
        if (!plot.facing.toLowerCase().includes(facingFilter.toLowerCase())) return false;
      }
      // Search query (plotNo or title or sector)
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchNo = plot.plotNo.toLowerCase().includes(q);
        const matchTitle = plot.title.toLowerCase().includes(q);
        const matchSector = plot.sector.toLowerCase().includes(q);
        if (!matchNo && !matchTitle && !matchSector) return false;
      }
      return true;
    });

    return {
      matchingPlotIds: new Set(matching.map((p) => p.id)),
      matchingPlots: matching,
    };
  }, [typeFilter, sizeFilter, statusFilter, facingFilter, searchQuery]);

  // Handle URL query param on mount (e.g. ?plot=P-005)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const plotParam = params.get("plot");
      if (plotParam) {
        const found = PLOT_DATASET.find(
          (p) => p.id.toLowerCase() === plotParam.toLowerCase() || p.plotNo.toLowerCase() === plotParam.toLowerCase()
        );
        if (found) {
          handleSelectPlot(found);
        }
      }
    }
  }, []);

  // Zoom to a specific plot coordinates
  const zoomToPlot = (plot: PlotItem) => {
    if (!transformRef.current || !containerRef.current) return;
    const [cx, cy] = plot.center;
    const container = containerRef.current;
    const containerW = container.clientWidth;
    const containerH = container.clientHeight;

    const scale = 2.4;
    // Calculate translation so (cx, cy) is centered in container
    // scaledX = cx * (containerW / MAP_DIMENSIONS.width)
    // scaledY = cy * (containerH / MAP_DIMENSIONS.height)
    // viewBox mapping:
    const normX = cx / MAP_DIMENSIONS.width;
    const normY = cy / MAP_DIMENSIONS.height;

    // React-zoom-pan-pinch works on inner rendered size
    const targetX = -(normX * containerW * scale - containerW / 2);
    const targetY = -(normY * containerH * scale - containerH / 2);

    transformRef.current.setTransform(targetX, targetY, scale, 600);
  };

  const handleSelectPlot = (plot: PlotItem) => {
    setSelectedPlot(plot);
    setSelectedFacility(null);
    zoomToPlot(plot);
  };

  const handleSelectFacility = (fac: FacilityItem) => {
    setSelectedFacility(fac);
    setSelectedPlot(null);

    if (transformRef.current && containerRef.current) {
      const container = containerRef.current;
      const containerW = container.clientWidth;
      const containerH = container.clientHeight;
      const scale = 2.2;
      const normX = fac.x / MAP_DIMENSIONS.width;
      const normY = fac.y / MAP_DIMENSIONS.height;
      const targetX = -(normX * containerW * scale - containerW / 2);
      const targetY = -(normY * containerH * scale - containerH / 2);
      transformRef.current.setTransform(targetX, targetY, scale, 600);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim().toLowerCase();
    const found = PLOT_DATASET.find(
      (p) => p.plotNo.toLowerCase() === q || p.id.toLowerCase() === q
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

  // Helper for facility icons
  const renderFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case "Mosque":
        return <Compass className="w-4 h-4" />;
      case "GraduationCap":
        return <GraduationCap className="w-4 h-4" />;
      case "Trees":
        return <Trees className="w-4 h-4" />;
      case "Waves":
        return <Waves className="w-4 h-4" />;
      case "Ship":
        return <Ship className="w-4 h-4" />;
      case "BookOpen":
        return <BookOpen className="w-4 h-4" />;
      case "Store":
        return <Store className="w-4 h-4" />;
      case "Shield":
        return <Shield className="w-4 h-4" />;
      case "Droplets":
        return <Droplets className="w-4 h-4" />;
      case "Fuel":
        return <Fuel className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[#F5F8F8] min-h-screen flex flex-col">
      {/* 1. Header Section */}
      <div className="bg-white border-b border-[#E2E7E5] py-6 sm:py-8 shadow-xs">
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
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12262D] font-heading tracking-tight">
                Interactive Property Map
              </h1>
              <p className="text-xs sm:text-sm text-[#657278] mt-1">
                Explore available plots, apartments and community facilities across all sectors of MOHS Venice City.
              </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="flex items-center gap-2 sm:gap-3 bg-[#F5F8F8] p-2 sm:p-2.5 rounded-2xl border border-[#E2E7E5] shrink-0">
              <div className="px-3 py-1.5 bg-white rounded-xl border border-[#E2E7E5] shadow-xs text-center">
                <div className="text-xs text-[#657278] font-medium">Total Plots</div>
                <div className="text-base sm:text-lg font-extrabold text-[#12262D]">
                  {PLOT_DATASET.length}+
                </div>
              </div>
              <div className="px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <div className="text-xs text-emerald-700 font-medium">Available</div>
                <div className="text-base sm:text-lg font-extrabold text-emerald-800">
                  {PLOT_DATASET.filter((p) => p.status === "Available").length}
                </div>
              </div>
              <div className="px-3 py-1.5 bg-white rounded-xl border border-[#E2E7E5] shadow-xs text-center">
                <div className="text-xs text-[#657278] font-medium">Facilities</div>
                <div className="text-base sm:text-lg font-extrabold text-[#00695C]">
                  {FACILITIES_DATASET.length} Hubs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Bar */}
      <div className="bg-white border-b border-[#E2E7E5] py-3.5 px-4 sm:px-6 lg:px-8 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-1 overflow-x-auto pb-1 lg:pb-0">
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
                <option value="Lake">Lake Facing</option>
                <option value="River">River Facing</option>
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
              {matchingPlots.length} Properties Matching
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
              placeholder="Search by Plot No. (e.g. P-045, CP-04)..."
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
        className="flex-1 relative w-full overflow-hidden bg-[#0F1E24] min-h-[620px] sm:min-h-[720px] lg:min-h-[780px] flex items-center justify-center"
      >
        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={0.7}
          maxScale={6}
          centerOnInit={true}
          wheel={{ step: 0.12 }}
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
                    title="Reset View"
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

                {/* Layer Toggles */}
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#E2E7E5] p-1.5 flex flex-col gap-1">
                  <button
                    onClick={() => setShowFacilities(!showFacilities)}
                    className={`p-2.5 rounded-xl transition-colors flex items-center justify-center ${
                      showFacilities ? "bg-[#00695C] text-white" : "text-[#657278] hover:bg-slate-100"
                    }`}
                    title={showFacilities ? "Hide Facilities" : "Show Facilities"}
                  >
                    <Compass className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowLegend(!showLegend)}
                    className={`p-2.5 rounded-xl transition-colors flex items-center justify-center border-t border-[#E2E7E5] ${
                      showLegend ? "bg-[#159ED0] text-white" : "text-[#657278] hover:bg-slate-100"
                    }`}
                    title={showLegend ? "Hide Legend" : "Show Legend"}
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Floating Legend (Bottom Left) */}
              {showLegend && (
                <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#E2E7E5] p-3 max-w-xs animate-fade-in">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#E2E7E5]">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#12262D] font-heading">
                      <Layers className="w-3.5 h-3.5 text-[#00695C]" />
                      <span>Map Legend</span>
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
                    <div className="flex items-center gap-2 col-span-2 pt-1 border-t border-[#E2E7E5]/60 text-[11px] text-[#657278]">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-600 shadow-xs" />
                      <span>Civic Amenities & Parks</span>
                    </div>
                  </div>
                </div>
              )}

              {/* The Actual Pan-Zoom Canvas */}
              <TransformComponent
                wrapperClass="!w-full !h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                contentClass="!w-full !h-full flex items-center justify-center"
              >
                <div
                  className="relative select-none"
                  style={{
                    width: "100%",
                    maxWidth: "5100px",
                    aspectRatio: "5100 / 3300",
                  }}
                >
                  {/* Base Original Masterplan Image */}
                  <img
                    src="/images/map/masterplan.jpg"
                    alt="MOHS Venice City Official Masterplan"
                    className="w-full h-full object-contain pointer-events-none block"
                    draggable={false}
                  />

                  {/* SVG Overlay Layer */}
                  <svg
                    viewBox="0 0 5100 3300"
                    className="absolute inset-0 w-full h-full pointer-events-auto"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  >
                    <defs>
                      {/* Glow filter for selected plot */}
                      <filter id="plot-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                      {/* Subtle hover shadow */}
                      <filter id="hover-shadow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.3" />
                      </filter>
                    </defs>

                    {/* Plots Polygons */}
                    {PLOT_DATASET.map((plot) => {
                      const isMatching = matchingPlotIds.has(plot.id);
                      const isSelected = selectedPlot?.id === plot.id;
                      const isHovered = hoveredPlot?.id === plot.id;
                      const statusColor = STATUS_COLORS[plot.status];

                      // Compute dynamic styles based on match, hover, selection
                      let fillOpacity = 0.32;
                      let strokeColor = statusColor.stroke;
                      let strokeWidth = 2;
                      let filter = undefined;

                      if (!isMatching) {
                        fillOpacity = 0.05;
                        strokeColor = "rgba(0,0,0,0.15)";
                        strokeWidth = 1;
                      } else if (isSelected) {
                        fillOpacity = 0.85;
                        strokeColor = "#D6A84F"; // Gold highlight
                        strokeWidth = 8;
                        filter = "url(#plot-glow)";
                      } else if (isHovered) {
                        fillOpacity = 0.65;
                        strokeColor = "#159ED0"; // Cyan hover
                        strokeWidth = 5;
                        filter = "url(#hover-shadow)";
                      }

                      const pointsString = plot.points
                        .map(([px, py]) => `${px},${py}`)
                        .join(" ");

                      return (
                        <g key={plot.id}>
                          <polygon
                            points={pointsString}
                            fill={statusColor.fill}
                            fillOpacity={fillOpacity}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            strokeLinejoin="round"
                            className="transition-all duration-150 cursor-pointer"
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

                          {/* Plot ID Label inside centroid */}
                          {showLabels && isMatching && (
                            <text
                              x={plot.center[0]}
                              y={plot.center[1] + 5}
                              textAnchor="middle"
                              fill="#FFFFFF"
                              stroke="rgba(0,0,0,0.7)"
                              strokeWidth={3}
                              paintOrder="stroke"
                              fontSize={16}
                              fontWeight="bold"
                              fontFamily="sans-serif"
                              className="pointer-events-none select-none transition-opacity"
                              opacity={isSelected || isHovered ? 1 : 0.85}
                            >
                              {plot.plotNo}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Community Facilities Layer */}
                    {showFacilities &&
                      FACILITIES_DATASET.map((fac) => {
                        const isFacSelected = selectedFacility?.id === fac.id;
                        return (
                          <g
                            key={fac.id}
                            className="cursor-pointer group"
                            onClick={() => handleSelectFacility(fac)}
                          >
                            {/* Pulsing ring */}
                            <circle
                              cx={fac.x}
                              cy={fac.y}
                              r={fac.radius}
                              fill="none"
                              stroke="#7C3AED"
                              strokeWidth={3}
                              strokeDasharray="6 4"
                              opacity={0.8}
                              className="animate-pulse"
                            />
                            {/* Inner circle badge */}
                            <circle
                              cx={fac.x}
                              cy={fac.y}
                              r={isFacSelected ? 36 : 28}
                              fill={isFacSelected ? "#D6A84F" : "#7C3AED"}
                              stroke="#FFFFFF"
                              strokeWidth={4}
                              className="transition-all duration-200"
                            />
                            {/* Facility label */}
                            <text
                              x={fac.x}
                              y={fac.y + fac.radius + 20}
                              textAnchor="middle"
                              fill="#FFFFFF"
                              stroke="#12262D"
                              strokeWidth={4}
                              paintOrder="stroke"
                              fontSize={18}
                              fontWeight="bold"
                              className="pointer-events-none select-none"
                            >
                              {fac.name}
                            </text>
                          </g>
                        );
                      })}
                  </svg>
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

        {/* 4. Hover Tooltip (follows cursor) */}
        {hoveredPlot && tooltipPos && (
          <div
            className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3 bg-[#12262D]/95 text-white backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-2xl border border-white/20 text-xs animate-fade-in"
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y - 12}px` }}
          >
            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="font-extrabold text-[#D6A84F] text-sm">{hoveredPlot.plotNo}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  STATUS_COLORS[hoveredPlot.status].badgeBg
                } ${STATUS_COLORS[hoveredPlot.status].badgeText}`}
              >
                {hoveredPlot.status}
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium">{hoveredPlot.size} • {hoveredPlot.facing}</div>
            <div className="text-xs font-bold text-emerald-400 mt-1">{hoveredPlot.priceFormatted}</div>
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
              <div className="bg-[#F5F8F8] p-3 rounded-2xl border border-[#E2E7E5] space-y-2">
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
              </div>

              {/* Price Banner */}
              <div className="p-3 bg-gradient-to-r from-[#00695C] to-[#087FA8] rounded-2xl text-white shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-100 tracking-wider">
                    Total Estimated Price
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
                <span>100% Verified Legal Title & Ready Mutation</span>
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

        {/* 6. Facility Details Card (When a facility marker is selected) */}
        {selectedFacility && (
          <div className="absolute bottom-4 right-4 sm:top-4 sm:bottom-auto w-[calc(100%-2rem)] sm:w-96 bg-white/98 backdrop-blur-lg rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#E2E7E5] p-5 z-40 animate-slide-up sm:animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E7E5]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  {renderFacilityIcon(selectedFacility.icon)}
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-[#12262D] font-heading leading-tight">
                    {selectedFacility.name}
                  </h4>
                  <span className="text-[11px] text-purple-700 font-bold">
                    {selectedFacility.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedFacility(null)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-[#657278] hover:text-[#12262D]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="bg-[#F5F8F8] p-3 rounded-2xl border border-[#E2E7E5] space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#657278] font-medium">Sector Zone:</span>
                  <span className="font-bold text-[#12262D]">{selectedFacility.sector}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#657278] font-medium">Capacity / Size:</span>
                  <span className="font-bold text-[#00695C]">{selectedFacility.capacity}</span>
                </div>
              </div>

              <p className="text-xs text-[#657278] leading-relaxed">
                {selectedFacility.description}
              </p>
            </div>

            <div className="pt-2 border-t border-[#E2E7E5]">
              <button
                onClick={() => setIsVisitModalOpen(true)}
                className="w-full py-2.5 px-3 bg-[#00695C] hover:bg-[#005B50] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md"
              >
                <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>Tour This Zone During Site Visit</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 7. Bottom Masterplan Accuracy & Disclaimer Banner */}
      <div className="bg-[#12262D] text-slate-300 py-3 px-4 sm:px-6 lg:px-8 text-xs border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#D6A84F] shrink-0" />
            <span>
              <strong>Note:</strong> Masterplan visual guide. Boundaries and plot allocations are subject to official registered layout mutations.
            </span>
          </div>
          <div className="text-emerald-300 font-bold shrink-0">
            Helpline: +880 1711-000000 (Physical Tours Available 7 Days)
          </div>
        </div>
      </div>

      {/* 8. Modals */}
      <SiteVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        propertyTitle={selectedPlot ? `Plot ${selectedPlot.plotNo} - ${selectedPlot.size}` : selectedFacility?.name || "MOHS Venice City Project Tour"}
        propertyId={selectedPlot?.id || selectedFacility?.id}
      />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        propertyTitle={selectedPlot ? `Plot ${selectedPlot.plotNo} - ${selectedPlot.size}` : "MOHS Venice City Masterplan"}
        propertyId={selectedPlot?.id}
        propertyType={selectedPlot?.type}
      />
    </div>
  );
}
