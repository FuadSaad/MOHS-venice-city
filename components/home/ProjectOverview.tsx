import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Layers, Trees, ShieldAlert, Sparkles, Compass } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export default function ProjectOverview() {
  const points = [
    {
      title: "Advanced Civil Infrastructure",
      desc: "Wide 40ft to 80ft paved boulevards, deep underground stormwater drainage, and uninterrupted utility ducting.",
      icon: Layers,
    },
    {
      title: "Waterfront Living & Serene Lakes",
      desc: "Over 3.5 km of interconnected Venice-style water canals and pedestrian jogging promenades.",
      icon: Trees,
    },
    {
      title: "Prime Corridor Connectivity",
      desc: "Unmatched travel convenience—connects seamlessly to Dhaka Airport, Uttara Sector 18, and 300ft Purbachal Expressway.",
      icon: Compass,
    },
  ];

  return (
    <section className="pt-16 pb-8 sm:pt-24 sm:pb-12 bg-[#F5F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <Reveal direction="left">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card border border-[#E2E7E5]">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                alt="MOHS Venice City Township"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12262D]/70 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E2E7E5] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#00695C] uppercase tracking-wider">
                    Mega Satellite Township
                  </p>
                  <p className="text-base font-extrabold text-[#12262D] font-heading">
                    MOHS Venice City Masterplan
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="px-3.5 py-1.5 bg-[#00695C] text-white rounded-lg text-xs font-semibold hover:bg-[#005B50] transition-colors"
                >
                  View Masterplan
                </Link>
              </div>
            </div>
            </Reveal>
          </div>

          {/* Right Column: Project Story & Value Props */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal direction="right">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12262D] font-heading tracking-tight leading-tight">
              Designed for Better Living & Lasting Value
            </h2>

            <p className="text-sm sm:text-base text-[#657278] leading-relaxed">
              MOHS Venice City blends the natural tranquility of waterfront living
              with cutting-edge urban planning. Whether you are constructing your
              family residence on a solid high-land plot or moving into a modern
              architectural flat, every sector is engineered for peace of mind.
            </p>

            {/* Feature Points */}
            <div className="space-y-4 pt-2">
              {points.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#E2E7E5] shadow-xs"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#E8F5F3] text-[#00695C] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#12262D] font-heading">
                        {pt.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#657278] mt-1 leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 bg-[#00695C] hover:bg-[#005B50] text-white font-bold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all text-sm"
              >
                <span>Discover Township Details</span>
                <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
              </Link>
            </div>
            </Reveal>
          </div>
        </div>

        {/* Project Highlights Horizontal Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-[#E2E7E5] shadow-soft">
          <div className="text-center p-3 border-r border-[#E2E7E5] last:border-none">
            <p className="text-xs font-semibold text-[#657278] uppercase">Total Masterplan</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading mt-1">620+ Bigha</p>
            <p className="text-xs text-emerald-700 mt-0.5">Planned Sectors</p>
          </div>
          <div className="text-center p-3 border-r border-[#E2E7E5] last:border-none">
            <p className="text-xs font-semibold text-[#657278] uppercase">Road Network</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading mt-1">40 - 80 Ft</p>
            <p className="text-xs text-emerald-700 mt-0.5">Wide Paved Avenues</p>
          </div>
          <div className="text-center p-3 border-r border-[#E2E7E5] last:border-none">
            <p className="text-xs font-semibold text-[#657278] uppercase">Lake Promenade</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading mt-1">3.5 KM</p>
            <p className="text-xs text-emerald-700 mt-0.5">Waterfront Walkways</p>
          </div>
          <div className="text-center p-3">
            <p className="text-xs font-semibold text-[#657278] uppercase">Open Green Space</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading mt-1">35%+</p>
            <p className="text-xs text-emerald-700 mt-0.5">Parks & Playgrounds</p>
          </div>
        </div>
      </div>
    </section>
  );
}
