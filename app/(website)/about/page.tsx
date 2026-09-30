import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Users,
  Building2,
  FileCheck2,
  Trees,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "About Us | MOHS Venice City | Your Property Partner",
  description:
    "Learn about MOHS Venice City, our vision for modern eco-waterfront residential living in the Uttara - Purbachal corridor, and our pledge for 100% verified legal land documentation.",
};

export default function AboutPage() {
  const pillars = [
    {
      title: "100% Verified Land Ownership",
      desc: "Every inch of MOHS Venice City is backed by authentic CS, SA, RS, and BS record verification. We guarantee zero legal dispute and instant mutation registration.",
      icon: FileCheck2,
    },
    {
      title: "Eco-Friendly Waterfront Urbanism",
      desc: "Our masterplan integrates natural water canals, 35% designated open greenery, and pedestrian-friendly boulevards inspired by European canal living.",
      icon: Trees,
    },
    {
      title: "High-Quality Civil Execution",
      desc: "From 40ft-80ft arterial avenues to advanced underground drainage and high-elevation land leveling, our civil infrastructure is built to endure.",
      icon: Building2,
    },
    {
      title: "Customer-Centric Transparency",
      desc: "No hidden charges, no speculative hype. We offer transparent pricing, flexible milestone installments, and hands-on legal handholding.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#F5F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12262D] font-heading tracking-tight leading-tight">
            Your Trusted Partner in Premium Residential Property
          </h1>
          <p className="text-sm sm:text-base text-[#657278] leading-relaxed">
            MOHS Venice City was founded with a singular conviction: real estate
            buyers deserve authentic property, transparent legal documentation, and
            uncompromising civic quality.
          </p>
        </div>

        {/* Story Section with visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-2xl p-6 sm:p-10 border border-[#E2E7E5] shadow-soft">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-[#E2E7E5]">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="MOHS Venice City Development"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading">
              A Masterplanned Community at the Intersection of Uttara & Purbachal
            </h2>
            <p className="text-sm sm:text-base text-[#657278] leading-relaxed">
              Located directly along the rapid growth corridor connecting Uttara
              Sector 18 to the Purbachal 300ft Expressway, MOHS Venice City
              encompasses 620+ Bighas of planned residential sectors, scenic Venice
              canals, and modern mid-rise and high-rise apartment clusters.
            </p>
            <p className="text-sm sm:text-base text-[#657278] leading-relaxed">
              Whether you are an established professional looking to construct your
              permanent family residence on a 3 or 5 Katha plot, or a family seeking
              a peaceful lake-view apartment close to international schools and
              airports, MOHS Venice City provides the ideal sanctuary.
            </p>

            <div className="pt-2">
              <Link
                href="/contact?type=visit"
                className="inline-flex items-center gap-2 bg-[#00695C] hover:bg-[#005B50] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
              >
                <span>Book a Guided Site Tour</span>
                <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
              </Link>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading">
              Our Core Commitments
            </h2>
            <p className="text-sm text-[#657278] mt-2">
              The foundational principles guiding every land parcel and residential building we develop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil, idx) => {
              const Icon = pil.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-[#E2E7E5] shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#E8F5F3] text-[#00695C] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#12262D] font-heading mb-2">
                      {pil.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#657278] leading-relaxed">
                      {pil.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verification Guarantee Card */}
        <div className="bg-[#12262D] text-white rounded-2xl p-8 sm:p-12 text-center space-y-5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#00695C] text-white mx-auto">
            <CheckCircle2 className="w-8 h-8 text-[#D6A84F]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Our Document Verification Guarantee
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Prior to any booking, our legal department provides complete photocopies
            of CS, SA, RS, BS Khatiyan, DCR, and non-encumbrance certificates so your
            own legal counsel can verify each document thoroughly.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="bg-[#00695C] hover:bg-[#005B50] text-white font-bold px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2"
            >
              <span>Speak to Our Property Counsel</span>
              <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
