import React from "react";
import { Award, ShieldCheck, Users, Map, CheckCircle } from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      value: "10+",
      label: "Years of Trust",
      description: "Proven real-estate excellence",
      icon: Award,
    },
    {
      value: "100+",
      label: "Verified Properties",
      description: "Plots & flats ready for mutation",
      icon: ShieldCheck,
    },
    {
      value: "500+",
      label: "Happy Families",
      description: "Living & building with confidence",
      icon: Users,
    },
    {
      value: "620+",
      label: "Bigha Planned City",
      description: "Modern masterplanned sectors",
      icon: Map,
    },
    {
      value: "100%",
      label: "Legal Transparency",
      description: "Direct ownership documentation",
      icon: CheckCircle,
    },
  ];

  return (
    <section className="bg-white border-b border-[#E2E7E5] py-8 sm:py-12 relative z-20 -mt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-3 rounded-xl hover:bg-[#F7F8F6] transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#E8F5F1] text-[#006B5B] flex items-center justify-center mb-3">
                  <IconComponent className="w-5 h-5 text-[#006B5B]" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#17232B] font-heading tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#004F45] mt-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-[#657278] mt-1 leading-tight">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
