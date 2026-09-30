import React from "react";
import ContactClient from "@/components/contact/ContactClient";
import { ShieldCheck, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact & Schedule Site Visit | MOHS Venice City",
  description:
    "Get in touch with the MOHS Venice City property sales department. Schedule your complimentary guided site visit or submit an inquiry for residential plots and flats.",
};

export default function ContactPage() {
  return (
    <div className="py-10 sm:py-16 bg-[#F5F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12262D] font-heading tracking-tight">
            Connect With Our Property Team
          </h1>
          <p className="text-sm sm:text-base text-[#657278] mt-2">
            Book an in-person plot inspection or ask our consultants about prices,
            layout maps, and legal documentation.
          </p>
        </div>

        <ContactClient />
      </div>
    </div>
  );
}
