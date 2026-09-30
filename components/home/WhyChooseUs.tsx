"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

// High-fidelity custom SVG icons for each facility
const FacilityIcons: Record<string, React.ReactNode> = {
  road: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21L9 3" />
      <path d="M20 21L15 3" />
      <line x1="12" y1="4" x2="12" y2="7" strokeWidth="2.5" />
      <line x1="12" y1="11" x2="12" y2="14" strokeWidth="2.5" />
      <line x1="12" y1="18" x2="12" y2="21" strokeWidth="2.5" />
    </svg>
  ),
  waterway: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c3-2.5 6-2.5 9 0s6 2.5 9 0" />
      <path d="M2 12c3-2.5 6-2.5 9 0s6 2.5 9 0" />
      <path d="M2 18c3-2.5 6-2.5 9 0s6 2.5 9 0" />
    </svg>
  ),
  cityCenter: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V9l5-4v16" />
      <path d="M14 21V3l5 4v14" />
      <circle cx="9" cy="9" r="0.8" fill="currentColor" />
      <circle cx="9" cy="13" r="0.8" fill="currentColor" />
      <circle cx="9" cy="17" r="0.8" fill="currentColor" />
      <circle cx="16" cy="7" r="0.8" fill="currentColor" />
      <circle cx="16" cy="11" r="0.8" fill="currentColor" />
      <circle cx="16" cy="15" r="0.8" fill="currentColor" />
    </svg>
  ),
  business: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M12 12v3" />
      <path d="M2 12h20" />
    </svg>
  ),
  school: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  university: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M4 10h16" />
      <path d="M12 2L2 7h20L12 2z" />
      <path d="M6 10v9" />
      <path d="M10 10v9" />
      <path d="M14 10v9" />
      <path d="M18 10v9" />
    </svg>
  ),
  mosque: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 21h20" />
      {/* Minaret on Left */}
      <path d="M4 21V8l2-2 2 2v13" />
      <path d="M6 3v3" />
      {/* Dome */}
      <path d="M9 21v-7c0-3.5 2.5-6.5 5.5-6.5S20 10.5 20 14v7" />
      {/* Crescent finial */}
      <path d="M14.5 4.5a1.8 1.8 0 1 1-1.3-1.7 2 2 0 0 0 1.3 1.7z" fill="currentColor" stroke="none" />
      {/* Arched door */}
      <path d="M13 21v-3.5a1.5 1.5 0 0 1 3 0V21" />
    </svg>
  ),
  clinic: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M3.22 12H8.5l1.5-3 2 6 1.5-3h4.78" />
    </svg>
  ),
  fuel: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22h12" />
      <path d="M4 22V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v17" />
      <path d="M14 9h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9l-3-3" />
      <path d="M9 7l-2 4h3l-1 4 3-5H9z" fill="currentColor" stroke="none" />
    </svg>
  ),
  security: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  convention: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  foodCourt: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="5" />
      <line x1="10" y1="2" x2="10" y2="5" />
      <line x1="14" y1="2" x2="14" y2="5" />
    </svg>
  ),
  superShop: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="21" r="1.5" fill="currentColor" />
      <circle cx="19" cy="21" r="1.5" fill="currentColor" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  ),
  park: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-5" />
      <path d="M7 17l5-5 5 5" />
      <path d="M8 12l4-4 4 4" />
      <path d="M9 7l3-4 3 4" />
      <path d="M3 22h18" />
    </svg>
  ),
  restaurant: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2v8a3 3 0 0 1-3 3h-2" />
      <path d="M13 2v18" />
      <path d="M7 2v5a3 3 0 0 0 3 3h3" />
      <path d="M7 22v-8" />
      <path d="M10 22h6" />
    </svg>
  ),
  tradeCenter: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M6 21V7l6-4 6 4v14" />
      <path d="M10 11h4" />
      <path d="M10 15h4" />
      <path d="M12 7v2" />
    </svg>
  ),
  parking: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M9 17V7h4.5a3.5 3.5 0 0 1 0 7H9" />
    </svg>
  ),
  hotel: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m2 5 3 11h14l3-11-6 6-4-6-4 6-6-6z" />
      <circle cx="7" cy="19" r="1.2" fill="currentColor" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" />
      <circle cx="17" cy="19" r="1.2" fill="currentColor" />
    </svg>
  ),
  sewerage: (
    <svg className="w-6 h-6 text-white drop-shadow-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M12 12a3 3 0 0 0 3 3" />
    </svg>
  ),
};

interface FacilityItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  iconKey: string;
  gradient: string;
  glowColor: string;
  accentColor: string;
}

export default function WhyChooseUs() {
  const [isExpanded, setIsExpanded] = useState(false);

  const facilities: FacilityItem[] = [
    {
      id: "road",
      category: "CONNECTIVITY",
      title: "300 ft Wide Road",
      desc: "Direct access to major regional corridors ensuring smooth, congestion-free transportation.",
      iconKey: "road",
      gradient: "from-[#00897B] via-[#00695C] to-[#004D40]",
      glowColor: "shadow-teal-600/30",
      accentColor: "#00695C",
    },
    {
      id: "waterway",
      category: "WATERFRONT",
      title: "River & Waterway",
      desc: "Scenic waterfront canal planning engineered for serene microclimate and ecological balance.",
      iconKey: "waterway",
      gradient: "from-[#0288D1] via-[#0097A7] to-[#00695C]",
      glowColor: "shadow-cyan-600/30",
      accentColor: "#0288D1",
    },
    {
      id: "cityCenter",
      category: "URBAN HUB",
      title: "City Center",
      desc: "A central urban downtown combining premium retail, civic services, and lively community plaza.",
      iconKey: "cityCenter",
      gradient: "from-[#D6A84F] via-[#B78628] to-[#916215]",
      glowColor: "shadow-amber-500/30",
      accentColor: "#D6A84F",
    },
    {
      id: "business",
      category: "COMMERCIAL",
      title: "Business City",
      desc: "Dedicated corporate commercial plots structured for long-term multinational enterprise growth.",
      iconKey: "business",
      gradient: "from-[#3949AB] via-[#283593] to-[#1A237E]",
      glowColor: "shadow-indigo-600/30",
      accentColor: "#3949AB",
    },
    {
      id: "school",
      category: "EDUCATION",
      title: "School & College",
      desc: "Quality English Medium and academic institutions preparing future generations within the gates.",
      iconKey: "school",
      gradient: "from-[#7E57C2] via-[#5E35B1] to-[#4527A0]",
      glowColor: "shadow-purple-600/30",
      accentColor: "#7E57C2",
    },
    {
      id: "university",
      category: "ACADEMICS",
      title: "International University",
      desc: "Planned higher education research campus adhering to recognized global accreditation standards.",
      iconKey: "university",
      gradient: "from-[#1E88E5] via-[#1565C0] to-[#0D47A1]",
      glowColor: "shadow-blue-600/30",
      accentColor: "#1E88E5",
    },
    {
      id: "mosque",
      category: "SPIRITUAL",
      title: "Mosque & Madrasah",
      desc: "Serene central grand mosque and ethical institution integrated into the community framework.",
      iconKey: "mosque",
      gradient: "from-[#00695C] via-[#004D40] to-[#12262D]",
      glowColor: "shadow-emerald-700/30",
      accentColor: "#00695C",
    },
    {
      id: "clinic",
      category: "HEALTHCARE",
      title: "Health Clinic",
      desc: "24/7 emergency medical services, diagnostic centers, and dedicated everyday healthcare care.",
      iconKey: "clinic",
      gradient: "from-[#E53935] via-[#C62828] to-[#B71C1C]",
      glowColor: "shadow-rose-600/30",
      accentColor: "#E53935",
    },
    {
      id: "fuel",
      category: "MOBILITY",
      title: "Fuel & EV Station",
      desc: "Modern rapid electric vehicle fast-charging grid along with premium motor fueling facilities.",
      iconKey: "fuel",
      gradient: "from-[#00897B] via-[#00796B] to-[#004D40]",
      glowColor: "shadow-teal-600/30",
      accentColor: "#00897B",
    },
    {
      id: "security",
      category: "SMART SAFETY",
      title: "Smart Security & CCTV",
      desc: "Round-the-clock AI-powered digital surveillance, automated boom barriers, and gated patrol.",
      iconKey: "security",
      gradient: "from-[#455A64] via-[#263238] to-[#12262D]",
      glowColor: "shadow-slate-700/30",
      accentColor: "#455A64",
    },
    {
      id: "convention",
      category: "EVENTS",
      title: "Convention Center",
      desc: "State-of-the-art auditorium and banquet halls for corporate seminars, exhibitions, and galas.",
      iconKey: "convention",
      gradient: "from-[#8E24AA] via-[#6A1B9A] to-[#4A148C]",
      glowColor: "shadow-purple-700/30",
      accentColor: "#8E24AA",
    },
    {
      id: "foodCourt",
      category: "DINING",
      title: "Food Court & Shops",
      desc: "Lively culinary promenade featuring international flavors and convenient neighborhood boutiques.",
      iconKey: "foodCourt",
      gradient: "from-[#FB8C00] via-[#F57C00] to-[#E65100]",
      glowColor: "shadow-orange-600/30",
      accentColor: "#FB8C00",
    },
    {
      id: "superShop",
      category: "CONVENIENCE",
      title: "Super Shop",
      desc: "Fresh organic groceries, imported essentials, and daily household market within footsteps.",
      iconKey: "superShop",
      gradient: "from-[#43A047] via-[#2E7D32] to-[#1B5E20]",
      glowColor: "shadow-green-600/30",
      accentColor: "#43A047",
    },
    {
      id: "park",
      category: "ECO WELLNESS",
      title: "Park & Playground",
      desc: "Lush botanical gardens, jogging tracks, and safe kids play arenas promoting healthy active living.",
      iconKey: "park",
      gradient: "from-[#2E7D32] via-[#00695C] to-[#004D40]",
      glowColor: "shadow-emerald-600/30",
      accentColor: "#2E7D32",
    },
    {
      id: "restaurant",
      category: "EXPERIENCE",
      title: "Lakeside Restaurant",
      desc: "Exquisite fine-dining terrace overlooking serene canal waters and sunset skyline views.",
      iconKey: "restaurant",
      gradient: "from-[#D84315] via-[#BF360C] to-[#870000]",
      glowColor: "shadow-red-600/30",
      accentColor: "#D84315",
    },
    {
      id: "tradeCenter",
      category: "COMMERCE",
      title: "Trade Center",
      desc: "Multi-storey commercial hub engineered for venture incubators, fintech, and modern retail.",
      iconKey: "tradeCenter",
      gradient: "from-[#00838F] via-[#006064] to-[#12262D]",
      glowColor: "shadow-cyan-700/30",
      accentColor: "#00838F",
    },
    {
      id: "parking",
      category: "INFRASTRUCTURE",
      title: "VIP Car Parking",
      desc: "Dedicated automated multi-level parking management ensuring effortless vehicle convenience.",
      iconKey: "parking",
      gradient: "from-[#546E7A] via-[#37474F] to-[#212121]",
      glowColor: "shadow-slate-600/30",
      accentColor: "#546E7A",
    },
    {
      id: "hotel",
      category: "HOSPITALITY",
      title: "Five-Star Hotel",
      desc: "Planned luxury hospitality resort offering presidential suites, infinity pool, and wellness spa.",
      iconKey: "hotel",
      gradient: "from-[#D6A84F] via-[#C4933F] to-[#996515]",
      glowColor: "shadow-amber-500/35",
      accentColor: "#D6A84F",
    },
    {
      id: "sewerage",
      category: "SUSTAINABILITY",
      title: "Sewerage Treatment",
      desc: "Underground eco-friendly bio-treatment plant preserving clean waterways and ecological hygiene.",
      iconKey: "sewerage",
      gradient: "from-[#00897B] via-[#004D40] to-[#00332C]",
      glowColor: "shadow-teal-700/30",
      accentColor: "#00897B",
    },
  ];

  const visibleFacilities = isExpanded ? facilities : facilities.slice(0, 7);

  return (
    <section className="py-20 sm:py-28 bg-[#F9FBFA] border-b border-[#E2E7E5] relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00695C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D6A84F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#00695C]/20 shadow-xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00695C] font-mono">
                PLANNED MASTERPLAN INFRASTRUCTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12262D] font-heading tracking-tight mb-4">
              A Self-Sustained, Secure & Comfortable Lifestyle
            </h2>
            <p className="text-sm sm:text-base text-[#657278] leading-relaxed">
              MOHS Venice City offers a thoughtfully planned range of international-standard facilities designed to create an independent urban ecosystem where families live, learn, work, and thrive.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {visibleFacilities.map((item, idx) => {
            const iconSvg = FacilityIcons[item.iconKey];
            return (
              <Reveal direction="up" delay={idx * 0.04} key={item.id} className="h-full">
                <div className="group h-full bg-white rounded-2xl p-5 sm:p-6 border border-[#E2E7E5] hover:border-[#00695C]/35 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,105,92,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Subtle top ambient indicator */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${item.accentColor}, #D6A84F)`,
                    }}
                  />

                  <div>
                    {/* Header: Icon Badge & Category Tag */}
                    <div className="flex items-center justify-between mb-4">
                      {/* Premium Multi-Layered Icon Badge */}
                      <div className="relative">
                        {/* Outer Glow Halo on Hover */}
                        <div
                          className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300`}
                        />

                        {/* Main Icon Container */}
                        <div
                          className={`relative w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${item.gradient} p-0.5 shadow-md ${item.glowColor} group-hover:scale-105 group-hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
                        >
                          {/* Inner Specular Radial Glass Overlay */}
                          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.45)_0%,transparent_70%)] pointer-events-none" />
                          <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />

                          {/* Centered Crisp Vector Icon */}
                          <div className="relative z-10">
                            {iconSvg}
                          </div>
                        </div>
                      </div>

                      {/* Micro Category Tag */}
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D6A84F] bg-amber-50/60 border border-amber-200/50 px-2 py-0.5 rounded-md font-mono">
                        {item.category}
                      </span>
                    </div>

                    {/* Facility Title */}
                    <h3 className="text-base sm:text-[17px] font-bold text-[#12262D] font-heading group-hover:text-[#00695C] transition-colors leading-snug mb-1.5">
                      {item.title}
                    </h3>

                    {/* Facility Description */}
                    <p className="text-[12.5px] sm:text-[13px] text-[#657278] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Micro Footer Accent */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#00695C] group-hover:text-[#004D40] flex items-center gap-1 transition-colors">
                      Verified Infrastructure
                    </span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00695C]/30 group-hover:bg-[#00695C] transition-colors" />
                  </div>
                </div>
              </Reveal>
            );
          })}

          {/* Interactive Expand / Collapse VIP Card */}
          <Reveal direction="up" delay={0.28} className="h-full">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? "Collapse facilities list" : "Expand all 19 facilities"}
              className="w-full text-left h-full rounded-2xl p-6 bg-gradient-to-br from-[#00695C] via-[#005B50] to-[#12262D] text-white shadow-lg shadow-[#00695C]/20 hover:shadow-2xl hover:shadow-[#00695C]/35 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group cursor-pointer border border-teal-400/20"
            >
              {/* Glowing Background Accent */}
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#D6A84F]/20 blur-2xl group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15)_0%,transparent_60%)] pointer-events-none" />

              <div className="relative z-10">
                {/* Header Icon Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center text-[#D6A84F] group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-md">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200 bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full font-mono">
                    {isExpanded ? "FULL LIST" : "+12 MORE"}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold font-heading text-white mb-1.5 group-hover:text-[#D6A84F] transition-colors">
                  {isExpanded ? "Show Top Facilities" : "& Many More..."}
                </h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">
                  {isExpanded
                    ? "Click to collapse view back to primary township highlights."
                    : "Discover 12 additional amenities including VIP parking, 5-star hotel, trade center, and dining."}
                </p>
              </div>

              {/* Action Trigger Bar */}
              <div className="relative z-10 pt-4 mt-6 border-t border-white/15 flex items-center justify-between">
                <span className="text-xs font-bold text-[#D6A84F] group-hover:text-white transition-colors flex items-center gap-1.5">
                  {isExpanded ? "Collapse View" : "Explore All 19 Amenities"}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-[#00695C] flex items-center justify-center transition-all duration-300">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                  )}
                </div>
              </div>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}