import React from "react";
import BrochurePageClient from "@/components/brochure/BrochurePageClient";

export const metadata = {
  title: "Official Brochures | MOHS Venice City",
  description: "View or download the official masterplan brochures for MOHS Venice City and other projects.",
};

export default function BrochurePage() {
  return (
    <div className="min-h-screen bg-[#F5F8F8]">
      <BrochurePageClient />
    </div>
  );
}
