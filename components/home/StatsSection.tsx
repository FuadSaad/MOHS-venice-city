import React from "react";
import { Award, ShieldCheck, Users, Map, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function StatsSection() {
  const stats = [
    {
      value: "10+",
      label: "Years of Trust",
      description: "Proven real-estate excellence",
      icon: Award,
      gradient: "from-[#D6A84F] via-[#B78628] to-[#916215]",
      glowColor: "shadow-amber-500/25",
    },
    {
      value: "100+",
      label: "Verified Properties",
      description: "Plots & flats ready for mutation",
      icon: ShieldCheck,
      gradient: "from-[#00897B] via-[#00695C] to-[#004D40]",
      glowColor: "shadow-teal-600/25",
    },
    {
      value: "500+",
      label: "Happy Families",
      description: "Living & building with confidence",
      icon: Users,
      gradient: "from-[#3949AB] via-[#283593] to-[#1A237E]",
      glowColor: "shadow-indigo-600/25",
    },
    {
      value: "620+",
      label: "Bigha Planned City",
      description: "Modern masterplanned sectors",
      icon: Map,
      gradient: "from-[#0288D1] via-[#0097A7] to-[#00695C]",
      glowColor: "shadow-cyan-600/25",
    },
    {
      value: "100%",
      label: "Legal Transparency",
      description: "Direct ownership documentation",
      icon: CheckCircle,
      gradient: "from-[#2E7D32] via-[#00695C] to-[#004D40]",
      glowColor: "shadow-emerald-600/25",
    },
  ];

  return (
    <section className="bg-white border-b border-[#E2E7E5] pt-6 sm:pt-8 pb-10 sm:pb-14 relative z-20 -mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Reveal key={index} delay={index * 0.1}>
                <div className="group flex flex-col items-center text-center p-4 rounded-2xl hover:bg-[#F9FBFA] border border-transparent hover:border-[#E2E7E5] hover:shadow-xs transition-all duration-300">
                  {/* Luxury Multi-Layered Icon Badge */}
                  <div className="relative mb-3.5">
                    <div
                      className={`relative w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} p-0.5 shadow-md ${stat.glowColor} group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
                    >
                      {/* Specular Radial Glass Overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.45)_0%,transparent_70%)] pointer-events-none" />
                      <div className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none" />
                      <IconComponent className="w-5 h-5 text-white relative z-10 drop-shadow-xs" />
                    </div>
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading tracking-tight group-hover:text-[#00695C] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-[#00695C] mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[#657278] mt-1 leading-tight max-w-[150px]">
                    {stat.description}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
