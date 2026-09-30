"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Landmark,
  Wallet,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"PLOT" | "FLAT">("PLOT");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [plotKatha, setPlotKatha] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", activeTab.toLowerCase());
    if (location) params.set("location", location);
    if (budget) params.set("budget", budget);
    if (activeTab === "PLOT" && plotKatha) params.set("katha", plotKatha);
    if (activeTab === "FLAT" && bedrooms) params.set("beds", bedrooms);

    if (activeTab === "PLOT") {
      router.push(`/plots?${params.toString()}`);
    } else {
      router.push(`/flats?${params.toString()}`);
    }
  };

  return (
    <section className="relative min-h-[620px] lg:min-h-[680px] flex items-center bg-[#12262D] overflow-hidden">
      {/* Background Video with optimized dark green overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-100"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-[#12262D]/95 via-[#005B50]/85 to-[#12262D]/90" />

      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading & Content */}
          <div className="lg:col-span-7 space-y-6 text-white text-center lg:text-left">

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white">
              Find the Right{" "}
              <span className="text-[#3DD5B8] drop-shadow-sm">
                Property
              </span>{" "}
              for Your Future
            </h1>

            <p className="text-base sm:text-lg text-slate-200/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover verified residential plots and modern flats in carefully
              selected locations across the prestigious Uttara - Purbachal
              waterfront corridor.
            </p>

            {/* Value checklist pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" /> 100% High Land & Ready Mutation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D6A84F]" /> Direct Road Access (40ft - 80ft)
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/properties"
                className="bg-[#00695C] hover:bg-[#005B50] text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 border border-emerald-400/30"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
              </Link>
              <Link
                href="/projects"
                className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-200"
              >
                View Projects
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Floating Search Panel */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-white/40 backdrop-blur-lg">
              {/* Search Panel Header Tabs */}
              <div className="flex rounded-xl bg-[#F5F8F8] p-1 border border-[#E2E7E5] mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("PLOT")}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    activeTab === "PLOT"
                      ? "bg-[#00695C] text-white shadow-sm"
                      : "text-[#657278] hover:text-[#12262D]"
                  }`}
                >
                  Residential Plots
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("FLAT")}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    activeTab === "FLAT"
                      ? "bg-[#00695C] text-white shadow-sm"
                      : "text-[#657278] hover:text-[#12262D]"
                  }`}
                >
                  Flats / Apartments
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearch} className="space-y-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-xs font-semibold text-[#12262D] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00695C]" /> Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-sm text-[#12262D] focus:outline-none focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] transition-all"
                  >
                    <option value="">All Locations in Township</option>
                    <option value="Sector 1">Sector 1 (Lake View)</option>
                    <option value="Sector 2">Sector 2 (Waterfront)</option>
                    <option value="Sector 3">Sector 3 (Prime Highland)</option>
                    <option value="VIP Zone">VIP Boulevard Zone</option>
                    <option value="Uttara - Purbachal">Uttara - Purbachal Corridor</option>
                  </select>
                </div>

                {/* Plot / Flat Specific Field */}
                {activeTab === "PLOT" ? (
                  <div>
                    <label className="block text-xs font-semibold text-[#12262D] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-[#00695C]" /> Plot Size (Katha)
                    </label>
                    <select
                      value={plotKatha}
                      onChange={(e) => setPlotKatha(e.target.value)}
                      className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-sm text-[#12262D] focus:outline-none focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] transition-all"
                    >
                      <option value="">Any Katha Size</option>
                      <option value="3">3 Katha (Duplex Friendly)</option>
                      <option value="5">5 Katha (Standard Executive)</option>
                      <option value="7.5">7.5 Katha (Waterfront Estate)</option>
                      <option value="10">10 Katha (VIP Corner)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-[#12262D] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-[#00695C]" /> Bedrooms
                    </label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-sm text-[#12262D] focus:outline-none focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] transition-all"
                    >
                      <option value="">Any Bedrooms</option>
                      <option value="2">2 Bedrooms (Smart Flat)</option>
                      <option value="3">3 Bedrooms (Family Luxury)</option>
                      <option value="4">4 Bedrooms (Penthouse / Duplex)</option>
                    </select>
                  </div>
                )}

                {/* Budget Range */}
                <div>
                  <label className="block text-xs font-semibold text-[#12262D] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Wallet className="w-3.5 h-3.5 text-[#00695C]" /> Budget Range
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-sm text-[#12262D] focus:outline-none focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] transition-all"
                  >
                    <option value="">Any Budget</option>
                    <option value="0-6000000">Up to ৳ 60 Lakh</option>
                    <option value="6000000-10000000">৳ 60 Lakh - ৳ 1 Crore</option>
                    <option value="10000000-20000000">৳ 1 Crore - ৳ 2 Crore</option>
                    <option value="20000000-50000000">Above ৳ 2 Crore</option>
                  </select>
                </div>

                {/* Search CTA */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-[#00695C] hover:bg-[#005B50] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Search className="w-4 h-4 text-[#D6A84F]" />
                  <span>Search Properties</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
