"use client";

import React, { useState, useMemo } from "react";
import { Search, RotateCcw, Bed, Bath, Car, Maximize2, Building } from "lucide-react";
import { PropertyItem } from "@/types/property";
import PropertyCard from "@/components/property/PropertyCard";

interface FlatFilterClientProps {
  initialFlats: PropertyItem[];
}

export default function FlatFilterClient({ initialFlats }: FlatFilterClientProps) {
  const [search, setSearch] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [parkingOnly, setParkingOnly] = useState(false);
  const [budget, setBudget] = useState("");
  const [handover, setHandover] = useState("");

  const filteredFlats = useMemo(() => {
    return initialFlats.filter((item) => {
      // Search
      if (search) {
        const query = search.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLoc && !matchesDesc) return false;
      }

      // Bedrooms
      if (bedrooms) {
        const bedsNum = parseInt(bedrooms);
        if (item.bedrooms !== bedsNum) return false;
      }

      // Bathrooms
      if (bathrooms) {
        const bathsNum = parseInt(bathrooms);
        if (item.bathrooms !== bathsNum) return false;
      }

      // Parking
      if (parkingOnly && !item.parkingAvailable) {
        return false;
      }

      // Handover
      if (handover && !item.handoverStatus?.toLowerCase().includes(handover.toLowerCase())) {
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
  }, [initialFlats, search, bedrooms, bathrooms, parkingOnly, budget, handover]);

  const handleReset = () => {
    setSearch("");
    setBedrooms("");
    setBathrooms("");
    setParkingOnly(false);
    setBudget("");
    setHandover("");
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
              placeholder="Search apartment, tower, floor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl pl-10 pr-3 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
            />
          </div>

          {/* Bedrooms */}
          <div>
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
            >
              <option value="">All Bedrooms (BHK)</option>
              <option value="2">2 Bedrooms (Smart Living)</option>
              <option value="3">3 Bedrooms (Executive Living)</option>
              <option value="4">4 Bedrooms (Penthouse / Royal)</option>
            </select>
          </div>

          {/* Bathrooms */}
          <div>
            <select
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
            >
              <option value="">All Bathrooms</option>
              <option value="2">2 Bathrooms</option>
              <option value="3">3 Bathrooms</option>
              <option value="4">4 Bathrooms</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
            >
              <option value="">Any Budget</option>
              <option value="0-8000000">Up to ৳ 80 Lakh</option>
              <option value="8000000-15000000">৳ 80 Lakh - ৳ 1.50 Crore</option>
              <option value="15000000-25000000">৳ 1.50 Crore - ৳ 2.50 Crore</option>
              <option value="25000000-50000000">Above ৳ 2.50 Crore</option>
            </select>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E2E7E5]/70">
          <div className="flex flex-wrap items-center gap-3">
            {/* Handover status */}
            <select
              value={handover}
              onChange={(e) => setHandover(e.target.value)}
              className="bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#17232B] outline-none"
            >
              <option value="">Any Handover Status</option>
              <option value="Ready">Ready for Handover</option>
              <option value="Move">Ready to Move</option>
            </select>

            {/* Parking Only */}
            <label className="inline-flex items-center gap-2 cursor-pointer bg-[#F7F8F6] px-3.5 py-2 rounded-xl border border-[#E2E7E5] text-xs font-semibold text-[#17232B] hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={parkingOnly}
                onChange={(e) => setParkingOnly(e.target.checked)}
                className="w-4 h-4 text-[#006B5B] rounded accent-[#006B5B]"
              />
              <span>Includes Dedicated Car Parking</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#657278] font-medium">
              Showing <strong className="text-[#17232B]">{filteredFlats.length}</strong> apartments
            </span>
            {(search || bedrooms || bathrooms || parkingOnly || budget || handover) && (
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

      {/* Flats Result Grid */}
      {filteredFlats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFlats.map((flat) => (
            <PropertyCard key={flat.id} property={flat} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#E2E7E5] p-8">
          <p className="text-base text-[#17232B] font-bold">
            No flats or apartments match your chosen criteria.
          </p>
          <p className="text-sm text-[#657278] mt-1">
            Try adjusting your bedroom or budget filters, or reach out to our team for custom floor plans.
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
