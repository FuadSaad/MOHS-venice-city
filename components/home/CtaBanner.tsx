import React from "react";
import Link from "next/link";
import { Calendar, PhoneCall, ArrowRight, ShieldCheck } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-20 bg-[#12262D] relative overflow-hidden text-white">
      {/* Background glow and lines */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00695C]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D6A84F]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight leading-tight">
          Looking for a Verified Plot or Flat?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Talk to our real estate advisory team today to inspect available sector
          lots, review legal Khatiyans, and schedule your complimentary site visit.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/contact?type=visit"
            className="bg-[#00695C] hover:bg-[#005B50] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 border border-emerald-400/30 text-sm sm:text-base"
          >
            <Calendar className="w-4 h-4 text-[#D6A84F]" />
            <span>Schedule a Site Visit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="bg-white hover:bg-slate-100 text-[#12262D] font-bold px-7 py-3.5 rounded-xl shadow-sm transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
          >
            <PhoneCall className="w-4 h-4 text-[#00695C]" />
            <span>Contact Us</span>
          </Link>
        </div>

        <div className="pt-4 text-xs text-slate-400">
          Direct Inquiries: <a href="tel:+8801711000000" className="text-emerald-300 font-bold hover:underline">+880 1711-000000</a> | Open 7 Days a Week for Physical Tours
        </div>
      </div>
    </section>
  );
}
