import React from "react";
import BrochureViewer from "@/components/brochure/BrochureViewer";

export const metadata = {
  title: "Official Brochure | MOHS Venice City",
  description: "View or download the official masterplan brochure for MOHS Venice City.",
};

export default function BrochurePage() {
  return (
    <div className="min-h-screen bg-[#F5F8F8] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12262D] font-heading tracking-tight mb-4">
            Official Project Brochure
          </h1>
          <p className="text-base sm:text-lg text-[#657278]">
            Explore the comprehensive masterplan, sector layouts, and premium amenities of MOHS Venice City.
          </p>
        </div>

        <BrochureViewer />
      </div>
    </div>
  );
}
