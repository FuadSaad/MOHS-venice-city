"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, RotateCcw, Landmark, MapPin, Compass, ShieldCheck } from "lucide-react";
import { PropertyItem } from "@/types/property";
import PropertyCard from "@/components/property/PropertyCard";

interface PlotFilterClientProps {
  initialPlots: PropertyItem[];
}

export default function PlotFilterClient({ initialPlots }: PlotFilterClientProps) {
  const [search, setSearch] = useState("");
  const [katha, setKatha] = useState("");
  const [facing, setFacing] = useState("");
  const [roadWidth, setRoadWidth] = useState("");
  const [cornerOnly, setCornerOnly] = useState(false);
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");

  const filteredPlots = useMemo(() => {
    return initialPlots.filter((item) => {
      // Search text
      if (search) {
        const query = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesDesc) return false;
      }

      // Katha
      if (katha) {
        const targetKatha = parseFloat(katha);
        if (item.plotKatha !== targetKatha) return false;
      }

      // Facing
      if (facing && !item.facing?.toLowerCase().includes(facing.toLowerCase())) {
        return false;
      }

      // Road width
      if (roadWidth && !item.plotRoadWidth?.includes(roadWidth)) {
        return false;
      }

      // Corner only
      if (cornerOnly && !item.isCorner) {
        return false;
      }

      // Location
      if (location && !item.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      // Budget
      if (budget) {
        const [min, max] = budget.split("-").map(Number);
        if (item.price < min) return false;
        if (max && item.price > max) return false;
      }

      return true;
    });
  }, [initialPlots, search, katha, facing, roadWidth, cornerOnly, budget, location]);

  const handleReset = () => {
    setSearch("");
    setKatha("");
    setFacing("");
    setRoadWidth("");
    setCornerOnly(false);
    setBudget("");
    setLocation("");
  };

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-5 border border-[#E2E7E5] shadow-soft mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search by keyword, sector..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl pl-10 pr-3 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
            />
          </div>

          {/* Katha Filter */}
          <div>
            <select
              value={katha}
              onChange={(e) => setKatha(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
            >
              <option value="">All Plot Sizes (Katha)</option>
              <option value="3">3 Katha (Duplex Friendly)</option>
              <option value="5">5 Katha (Standard Executive)</option>
              <option value="7.5">7.5 Katha (Waterfront Estate)</option>
              <option value="10">10 Katha (VIP Corner)</option>
            </select>
          </div>

          {/* Facing Filter */}
          <div>
            <select
              value={facing}
              onChange={(e) => setFacing(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
            >
              <option value="">Any Facing Direction</option>
              <option value="South">South Facing</option>
              <option value="North">North Facing</option>
              <option value="East">East Facing</option>
              <option value="North-East">North-East Facing</option>
              <option value="South-East">South-East Facing</option>
            </select>
          </div>

          {/* Road Width */}
          <div>
            <select
              value={roadWidth}
              onChange={(e) => setRoadWidth(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
            >
              <option value="">Any Road Width</option>
              <option value="40">40 Feet Road</option>
              <option value="50">50 Feet Road</option>
              <option value="60">60 Feet Avenue</option>
              <option value="80">80 Feet Grand Boulevard</option>
            </select>
          </div>
        </div>

        {/* Second Row: Budget, Location, Corner Toggle, Reset */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E2E7E5]/70">
          <div className="flex flex-wrap items-center gap-3">
            {/* Budget */}
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#17232B] outline-none"
            >
              <option value="">Any Budget</option>
              <option value="0-6000000">Up to ৳ 60 Lakh</option>
              <option value="6000000-10000000">৳ 60 Lakh - ৳ 1 Crore</option>
              <option value="10000000-15000000">৳ 1 Crore - ৳ 1.50 Crore</option>
              <option value="15000000-50000000">Above ৳ 1.50 Crore</option>
            </select>

            {/* Corner Plot checkbox */}
            <label className="inline-flex items-center gap-2 cursor-pointer bg-[#F7F8F6] px-3.5 py-2 rounded-xl border border-[#E2E7E5] text-xs font-semibold text-[#17232B] hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={cornerOnly}
                onChange={(e) => setCornerOnly(e.target.checked)}
                className="w-4 h-4 text-[#006B5B] rounded accent-[#006B5B]"
              />
              <span>Corner Plots Only</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#657278] font-medium">
              Showing <strong className="text-[#17232B]">{filteredPlots.length}</strong> plots
            </span>
            {(search || katha || facing || roadWidth || cornerOnly || budget || location) && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Plots Result Grid */}
      {filteredPlots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPlots.map((plot) => (
            <PropertyCard key={plot.id} property={plot} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E7E5] p-8">
          <p className="text-base text-[#17232B] font-bold">
            No residential plots match your chosen filters.
          </p>
          <p className="text-sm text-[#657278] mt-1">
            Try resetting your filters or contacting our sales team for upcoming sector releases.
          </p>
          <button
            onClick={handleReset}
            className="mt-4 px-5 py-2 bg-[#006B5B] text-white rounded-xl text-sm font-semibold hover:bg-[#004F45] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
