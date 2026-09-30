"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Landmark, CheckCircle2, MapPin, Wallet, Search } from "lucide-react";

export default function HorizontalFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialType = searchParams.get("type")?.toUpperCase() === "FLAT" ? "FLAT" : "PLOT";
  
  const [activeTab, setActiveTab] = useState<"PLOT" | "FLAT">(initialType);
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [budget, setBudget] = useState(searchParams.get("budget") || "");
  const [plotKatha, setPlotKatha] = useState(searchParams.get("size") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("beds") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", activeTab.toLowerCase());
    if (location) params.set("location", location);
    if (budget) params.set("budget", budget);
    if (activeTab === "PLOT" && plotKatha) params.set("size", plotKatha);
    if (activeTab === "FLAT" && bedrooms) params.set("beds", bedrooms);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="bg-white p-2 rounded-2xl shadow-sm border border-[#E2E7E5] flex flex-col md:flex-row items-center gap-4 mb-8"
    >
      {/* Toggle Switch */}
      <div className="flex items-center bg-[#F5F8F8] p-1.5 rounded-xl border border-[#E2E7E5] shrink-0 w-full md:w-auto">
        <button
          type="button"
          onClick={() => setActiveTab("PLOT")}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === "PLOT"
              ? "bg-[#00695C] text-white shadow-sm"
              : "text-[#657278] hover:text-[#12262D]"
          }`}
        >
          <Landmark className="w-4 h-4" />
          Residential Plots
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("FLAT")}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
            activeTab === "FLAT"
              ? "bg-[#00695C] text-white shadow-sm"
              : "text-[#657278] hover:text-[#12262D]"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Flats / Apartments
        </button>
      </div>

      {/* Selects Container */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full border-l border-[#E2E7E5] pl-4">
        {/* Location */}
        <div className="flex flex-col relative border-r border-[#E2E7E5] pr-3">
          <label className="text-[10px] uppercase font-bold text-[#657278] tracking-wider mb-1 px-1">Location</label>
          <div className="relative flex items-center">
            <MapPin className="w-4 h-4 text-[#00695C] absolute left-2" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-[#12262D] pl-8 pr-4 py-1 appearance-none focus:outline-none cursor-pointer"
            >
              <option value="">All Locations in Township</option>
              <option value="Zone-2">Zone-2</option>
              <option value="Uttara">Uttara Side</option>
              <option value="Purbachal">Purbachal Extension</option>
            </select>
          </div>
        </div>

        {/* Type Specific */}
        <div className="flex flex-col relative border-r border-[#E2E7E5] pr-3">
          <label className="text-[10px] uppercase font-bold text-[#657278] tracking-wider mb-1 px-1">
            {activeTab === "PLOT" ? "Plot Size (Katha)" : "Bedrooms"}
          </label>
          <div className="relative flex items-center">
            <Landmark className="w-4 h-4 text-[#00695C] absolute left-2" />
            {activeTab === "PLOT" ? (
              <select
                value={plotKatha}
                onChange={(e) => setPlotKatha(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#12262D] pl-8 pr-4 py-1 appearance-none focus:outline-none cursor-pointer"
              >
                <option value="">Any Katha Size</option>
                <option value="3">3 Katha</option>
                <option value="5">5 Katha</option>
                <option value="10">10 Katha</option>
                <option value="20">20 Katha</option>
              </select>
            ) : (
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-[#12262D] pl-8 pr-4 py-1 appearance-none focus:outline-none cursor-pointer"
              >
                <option value="">Any Bedrooms</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            )}
          </div>
        </div>

        {/* Budget */}
        <div className="flex flex-col relative">
          <label className="text-[10px] uppercase font-bold text-[#657278] tracking-wider mb-1 px-1">Budget Range</label>
          <div className="relative flex items-center">
            <Wallet className="w-4 h-4 text-[#00695C] absolute left-2" />
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-transparent text-sm font-bold text-[#12262D] pl-8 pr-4 py-1 appearance-none focus:outline-none cursor-pointer"
            >
              <option value="">Any Budget</option>
              <option value="below-5m">Below 50 Lakhs</option>
              <option value="5m-10m">50 Lakhs - 1 Crore</option>
              <option value="above-10m">Above 1 Crore</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full md:w-auto bg-[#00695C] hover:bg-[#005B50] text-white px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shrink-0"
      >
        <Search className="w-5 h-5" />
        <span>Search</span>
      </button>
    </form>
  );
}
