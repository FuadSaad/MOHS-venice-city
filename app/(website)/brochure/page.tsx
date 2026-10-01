import React from "react";
import BrochurePageClient from "@/components/brochure/BrochurePageClient";

export const metadata = {
  title: "Official Brochures | MOHS Venice City",
  description: "View or download the official masterplan brochures for MOHS Venice City and other projects.",
};

export default function BrochurePage() {
  return (
    <div className="min-h-screen bg-[#F5F8F8] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BrochurePageClient />
      </div>
    </div>
  );
}
