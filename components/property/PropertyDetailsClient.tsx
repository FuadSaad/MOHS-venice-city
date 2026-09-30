"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Send,
  Download,
  Share2,
  CheckCircle2,
  Maximize2,
  Compass,
  Bed,
  Bath,
  Car,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { PropertyItem } from "@/types/property";
import { formatBDTFull } from "@/lib/utils";
import SiteVisitModal from "./SiteVisitModal";
import EnquiryModal from "./EnquiryModal";

interface PropertyDetailsClientProps {
  property: PropertyItem;
  similarProperties: PropertyItem[];
}

export default function PropertyDetailsClient({
  property,
  similarProperties,
}: PropertyDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(
    property.images && property.images.length > 0
      ? property.images[0].url
      : property.featuredImage
  );
  const [siteVisitOpen, setSiteVisitOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [mapZoomModal, setMapZoomModal] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isPlot = property.propertyType === "PLOT";

  const allImages = property.images && property.images.length > 0
    ? property.images.map((img) => img.url)
    : [property.featuredImage];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadBrochure = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-[#F5F8F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#657278] mb-6">
          <Link href="/" className="hover:text-[#12262D]">
            Home
          </Link>
          <span>/</span>
          <Link
            href={isPlot ? "/plots" : "/flats"}
            className="hover:text-[#12262D]"
          >
            {isPlot ? "Residential Plots" : "Modern Flats"}
          </Link>
          <span>/</span>
          <span className="text-[#12262D] font-semibold truncate max-w-xs sm:max-w-md">
            {property.title}
          </span>
        </nav>

        {/* Top Split: Gallery (Left) & Key Information / Actions (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* LEFT: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Active Image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-200 border border-[#E2E7E5] shadow-soft">
              <Image
                src={selectedImage}
                alt={property.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white shadow-sm ${
                    isPlot ? "bg-[#00695C]" : "bg-[#12262D]"
                  }`}
                >
                  {isPlot ? "Residential Plot" : "Apartment / Flat"}
                </span>
                {property.isReady && (
                  <span className="bg-emerald-600 text-white text-xs font-semibold px-2.5 py-1 rounded shadow-sm">
                    Verified Ready
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === imgUrl
                        ? "border-[#00695C] shadow-sm scale-102"
                        : "border-[#E2E7E5] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Price, Specs, CTA Buttons */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E7E5] shadow-soft space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#657278] mb-2 font-medium">
                <span className="flex items-center gap-1.5 text-[#00695C]">
                  <MapPin className="w-3.5 h-3.5" />
                  {property.location}
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {property.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading tracking-tight leading-snug">
                {property.title}
              </h1>

              {property.address && (
                <p className="text-xs text-[#657278] mt-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {property.address}
                </p>
              )}
            </div>

            {/* Price Highlight */}
            <div className="p-4 rounded-xl bg-[#F5F8F8] border border-[#E2E7E5] flex items-baseline justify-between">
              <div>
                <p className="text-xs text-[#657278] font-medium">Listing Price</p>
                <p className="text-2xl sm:text-3xl font-extrabold font-heading text-[#00695C]">
                  {formatBDTFull(property.price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#657278]">Ownership</p>
                <p className="text-xs font-bold text-[#12262D]">Immediate Namzari</p>
              </div>
            </div>

            {/* Key Information Quick Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              {isPlot ? (
                <>
                  <div className="p-3 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5]">
                    <span className="text-[#657278]">Plot Size</span>
                    <p className="text-sm font-bold text-[#12262D] mt-0.5">
                      {property.plotKatha} Katha
                    </p>
                  </div>
                  <div className="p-3 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5]">
                    <span className="text-[#657278]">Road Width</span>
                    <p className="text-sm font-bold text-[#12262D] mt-0.5">
                      {property.plotRoadWidth || "40 Feet"}
                    </p>
                  </div>
                  <div className="p-3 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5]">
                    <span className="text-[#657278]">Facing</span>
                    <p className="text-sm font-bold text-[#12262D] mt-0.5">
                      {property.facing || "South"}
                    </p>
                  </div>
                  <div className="p-3 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5]">
                    <span className="text-[#657278]">Corner Status</span>
                    <p className="text-sm font-bold text-[#12262D] mt-0.5">
                      {property.isCorner ? "Yes (Dual Road)" : "Standard"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5]">
                    <span className="text-[#657278]">Apartment Size</span>
                    <p className="text-sm font-bold text-[#12262D] mt-0.5">
                      {property.flatSizeSqft} Sq Ft
                    </p>
                  </div>
                  <div className="p-3 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5]">
                    <span className="text-[#657278]">Bedrooms / Baths</span>
                    <p className="text-sm font-bold text-[#12262D] mt-0.5">
                      {property.bedrooms} Bed / {property.bathrooms} Bath
                    </p>
                  </div>
                  <div className="p-3 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5]">
                    <span className="text-[#657278]">Floor</span>
                    <p className="text-sm font-bold text-[#12262D] mt-0.5">
                      {property.floorNumber || "Mid Level"}
                    </p>
                  </div>
                  <div className="p-3 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5]">
                    <span className="text-[#657278]">Parking</span>
                    <p className="text-sm font-bold text-[#12262D] mt-0.5">
                      {property.parkingAvailable ? "Covered Basement" : "Available"}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => setEnquiryOpen(true)}
                className="w-full bg-[#00695C] hover:bg-[#005B50] text-white font-bold py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4 text-[#D6A84F]" />
                <span>Enquire About This Property</span>
              </button>

              <button
                type="button"
                onClick={() => setSiteVisitOpen(true)}
                className="w-full bg-[#F5F8F8] hover:bg-[#E8F5F3] text-[#00695C] border border-[#00695C]/30 font-bold py-3.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <Calendar className="w-4 h-4 text-[#D6A84F]" />
                <span>Schedule a Site Visit</span>
              </button>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadBrochure}
                  className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-[#E2E7E5] rounded-xl text-xs font-semibold text-[#12262D] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#00695C]" />
                  <span>Brochure / Print</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="py-2.5 px-3 bg-white hover:bg-slate-50 border border-[#E2E7E5] rounded-xl text-xs font-semibold text-[#12262D] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#00695C]" />
                  <span>{copied ? "Link Copied!" : "Share Property"}</span>
                </button>
              </div>
            </div>

            {/* Direct hotline call */}
            <div className="pt-2 border-t border-[#E2E7E5] text-center text-xs text-[#657278]">
              Prefer to talk now? Call{" "}
              <a
                href="tel:+8801711000000"
                className="font-bold text-[#00695C] hover:underline"
              >
                +880 1711-000000
              </a>
            </div>
          </div>
        </div>

        {/* Middle Section: Overview, Features, Location Advantages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="bg-white rounded-2xl p-7 border border-[#E2E7E5] shadow-soft">
              <h2 className="text-xl font-bold text-[#12262D] font-heading mb-4 pb-3 border-b border-[#E2E7E5]">
                Property Overview
              </h2>
              <p className="text-sm sm:text-base text-[#12262D]/85 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
              {property.overview && (
                <p className="text-sm sm:text-base text-[#12262D]/85 leading-relaxed mt-4 whitespace-pre-line">
                  {property.overview}
                </p>
              )}
            </div>

            {/* Features & Amenities */}
            <div className="bg-white rounded-2xl p-7 border border-[#E2E7E5] shadow-soft">
              <h2 className="text-xl font-bold text-[#12262D] font-heading mb-4 pb-3 border-b border-[#E2E7E5] flex items-center justify-between">
                <span>Features & Specifications</span>
                <span className="text-xs text-[#00695C] font-semibold">Verified</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {property.features && property.features.length > 0 ? (
                  property.features.map((feat) => (
                    <div
                      key={feat.id}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F8F8] border border-[#E2E7E5]/80 text-sm text-[#12262D]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00695C] shrink-0" />
                      <span className="font-medium">{feat.name}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F8F8] border border-[#E2E7E5]/80 text-sm text-[#12262D]">
                      <CheckCircle2 className="w-4 h-4 text-[#00695C] shrink-0" />
                      <span className="font-medium">Direct Road Access & Clear Boundary</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F8F8] border border-[#E2E7E5]/80 text-sm text-[#12262D]">
                      <CheckCircle2 className="w-4 h-4 text-[#00695C] shrink-0" />
                      <span className="font-medium">100% High Land (No filling required)</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Location Advantages */}
            <div className="bg-white rounded-2xl p-7 border border-[#E2E7E5] shadow-soft">
              <h2 className="text-xl font-bold text-[#12262D] font-heading mb-4 pb-3 border-b border-[#E2E7E5]">
                Location Advantages & Connectivity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#12262D]">
                <div className="p-4 rounded-xl bg-[#F5F8F8] border border-[#E2E7E5]">
                  <p className="font-bold text-[#00695C] text-xs uppercase mb-1">
                    Air & Metro Access
                  </p>
                  <p className="text-sm">
                    15 Minutes to Hazrat Shahjalal International Airport & 10 minutes to MRT Line 6 station.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F5F8F8] border border-[#E2E7E5]">
                  <p className="font-bold text-[#00695C] text-xs uppercase mb-1">
                    Expressway Connection
                  </p>
                  <p className="text-sm">
                    Direct access to Purbachal 300 Feet Expressway, connecting swiftly to Gulshan & Banani.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F5F8F8] border border-[#E2E7E5]">
                  <p className="font-bold text-[#00695C] text-xs uppercase mb-1">
                    Education & Healthcare
                  </p>
                  <p className="text-sm">
                    Near leading international schools, medical colleges, and specialty hospitals.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#F5F8F8] border border-[#E2E7E5]">
                  <p className="font-bold text-[#00695C] text-xs uppercase mb-1">
                    Township Environment
                  </p>
                  <p className="text-sm">
                    Serene Venice-themed water canals, jogging promenades, and 35% planned greenery.
                  </p>
                </div>
              </div>
            </div>

            {/* Maps Section */}
            <div className="bg-white rounded-2xl p-7 border border-[#E2E7E5] shadow-soft">
              <h2 className="text-xl font-bold text-[#12262D] font-heading mb-4 pb-3 border-b border-[#E2E7E5]">
                Project Location & Sector Layout Plan
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-[#E2E7E5]">
                  <Image
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80"
                    alt="Location Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      onClick={() =>
                        setMapZoomModal(
                          "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1600&q=80"
                        )
                      }
                      className="px-3 py-1.5 bg-white text-xs font-bold rounded-lg text-[#12262D] shadow flex items-center gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5" /> View Location Map
                    </button>
                  </div>
                </div>

                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-[#E2E7E5]">
                  <Image
                    src="https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=800&q=80"
                    alt="Layout Map"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <button
                      onClick={() =>
                        setMapZoomModal(
                          "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1600&q=80"
                        )
                      }
                      className="px-3 py-1.5 bg-white text-xs font-bold rounded-lg text-[#12262D] shadow flex items-center gap-1.5"
                    >
                      <Maximize2 className="w-3.5 h-3.5" /> View Layout Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar: Quick Enquiry Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-[#12262D] text-white rounded-2xl p-6 sm:p-7 shadow-card space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
                Direct Consultant Contact
              </div>
              <h3 className="text-xl font-bold font-heading">
                Interested in this property?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Contact our authorized sales advisors to receive complete legal
                deeds, mutation verification, and payment installments.
              </p>

              <button
                type="button"
                onClick={() => setEnquiryOpen(true)}
                className="w-full bg-[#00695C] hover:bg-[#005B50] text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow"
              >
                <Send className="w-4 h-4 text-[#D6A84F]" />
                <span>Send Quick Enquiry</span>
              </button>

              <button
                type="button"
                onClick={() => setSiteVisitOpen(true)}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-xl text-sm border border-white/20 flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#D6A84F]" />
                <span>Book Site Tour</span>
              </button>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="pt-8 border-t border-[#E2E7E5]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-extrabold text-[#12262D] font-heading">
                  Similar Properties You May Like
                </h3>
                <p className="text-sm text-[#657278] mt-1">
                  Discover other verified {isPlot ? "plots" : "apartments"} in MOHS Venice City
                </p>
              </div>
              <Link
                href={isPlot ? "/plots" : "/flats"}
                className="text-xs sm:text-sm font-bold text-[#00695C] hover:text-[#005B50] flex items-center gap-1"
              >
                <span>View More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {similarProperties.slice(0, 3).map((item) => (
                <div key={item.id} className="h-full">
                  <div className="group bg-white rounded-card border border-[#E2E7E5] overflow-hidden shadow-soft hover:shadow-card transition-all flex flex-col h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={item.featuredImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[11px] font-bold text-white bg-[#00695C]">
                        {item.propertyType}
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-[#657278] mb-1">{item.location}</p>
                        <h4 className="text-sm font-bold text-[#12262D] group-hover:text-[#00695C] line-clamp-1 font-heading">
                          {item.title}
                        </h4>
                        <p className="text-base font-extrabold text-[#00695C] mt-2 font-heading">
                          {formatBDTFull(item.price)}
                        </p>
                      </div>
                      <Link
                        href={`/properties/${item.slug}`}
                        className="mt-3 pt-2 border-t border-[#E2E7E5] text-xs font-bold text-[#00695C] flex items-center justify-between"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <SiteVisitModal
        isOpen={siteVisitOpen}
        onClose={() => setSiteVisitOpen(false)}
        propertyTitle={property.title}
        propertyId={property.id}
      />

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        propertyTitle={property.title}
        propertyId={property.id}
        propertyType={property.propertyType}
      />

      {mapZoomModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setMapZoomModal(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 p-2 rounded-full text-[#12262D]"
            >
              ✕
            </button>
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image src={mapZoomModal} alt="Enlarged Map" fill className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
