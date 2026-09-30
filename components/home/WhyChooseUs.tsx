"use client";

import React, { useState } from "react";
import { CheckCircle2, Map, Waves, Building, Briefcase, GraduationCap, Library, BookOpen, Stethoscope, Zap, Users, Store, ShoppingCart, TreePine, Coffee, Landmark, Car, Hotel, ShieldCheck, Droplet, ChevronDown, ChevronUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function WhyChooseUs() {
  const [isExpanded, setIsExpanded] = useState(false);

  const facilities = [
    { title: "300 ft Wide Road", desc: "Direct access to major regional corridors ensuring smooth transportation.", icon: Map },
    { title: "River & Waterway", desc: "Scenic waterfront planning designed for environmental balance.", icon: Waves },
    { title: "City Center", desc: "A central urban hub combining retail, services, and community interaction.", icon: Building },
    { title: "Business City", desc: "Dedicated commercial plots for structured and long-term business growth.", icon: Briefcase },
    { title: "School & College", desc: "Quality English Medium education facilities for future generations.", icon: GraduationCap },
    { title: "International University", desc: "Planned higher education infrastructure supporting global standards.", icon: Library },
    { title: "Mosque & Madrasah", desc: "Spiritual and ethical foundation integrated into the community framework.", icon: BookOpen },
    { title: "Health Clinic", desc: "Accessible healthcare services ensuring everyday medical support.", icon: Stethoscope },
    { title: "Fuel & EV Station", desc: "Modern fueling infrastructure including electric vehicle support.", icon: Zap },
    { title: "Smart Security & CCTV", desc: "Integrated digital surveillance ensuring 24/7 safety and controlled access.", icon: ShieldCheck },
    { title: "Convention Center", desc: "A professional venue for corporate events, seminars, and gatherings.", icon: Users },
    { title: "Food Court & Shops", desc: "Organized retail and dining spaces enhancing lifestyle convenience.", icon: Store },
    { title: "Super Shop", desc: "Daily essentials and grocery access within walking distance.", icon: ShoppingCart },
    { title: "Park & Playground", desc: "Open green spaces designed for recreation, wellness, and family time.", icon: TreePine },
    { title: "Lakeside Restaurant", desc: "Premium dining experience with beautiful waterfront views.", icon: Coffee },
    { title: "Trade Center", desc: "Structured commercial complex supporting entrepreneurship.", icon: Landmark },
    { title: "VIP Car Parking", desc: "Dedicated parking management ensuring convenience and organization.", icon: Car },
    { title: "Five-Star Hotel", desc: "Planned premium hospitality infrastructure supporting business growth.", icon: Hotel },
    { title: "Sewerage Treatment", desc: "Integrated waste management system promoting environmental sustainability.", icon: Droplet },
  ];

  const visibleFacilities = isExpanded ? facilities : facilities.slice(0, 7);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-[#E2E7E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12262D] font-heading tracking-tight mb-4">
            A Self-Sustained, Secure & Comfortable Lifestyle
          </h2>
          <p className="text-sm sm:text-base text-[#657278]">
            MOHS Venice City offers a thoughtfully planned range of facilities and amenities designed to create a self-sustained urban lifestyle where residents can live, learn, work and grow within their own community.
          </p>
        </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {visibleFacilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Reveal direction="up" delay={idx * 0.05} key={idx} className="h-full">
              <div
                className="bg-[#F5F8F8] h-full p-5 rounded-xl border border-[#E2E7E5] hover:border-[#00695C]/30 hover:shadow-sm transition-all duration-300 flex items-start gap-4 group"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-white text-[#00695C] group-hover:bg-[#00695C] group-hover:text-white flex items-center justify-center shadow-xs transition-colors border border-[#E2E7E5]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#12262D] mb-1 font-heading group-hover:text-[#00695C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-[#657278] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
              </Reveal>
            );
          })}
          
          {/* View More / Show Less Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-[#E8F5F3] p-5 rounded-xl border border-[#00695C]/20 hover:bg-emerald-100 transition-colors flex flex-col items-center justify-center text-center gap-2 group"
          >
            <h3 className="text-lg font-bold text-[#00695C] font-heading group-hover:text-[#005B50]">
              {isExpanded ? "Show Less" : "& Many More..."}
            </h3>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-[#00695C]" />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#00695C]" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}