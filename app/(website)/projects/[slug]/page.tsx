import React from "react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Layers, Trees, ShieldCheck, ArrowRight, Download, Calendar } from "lucide-react";
import PropertyCard from "@/components/property/PropertyCard";
import { PropertyItem } from "@/types/property";

interface PageProps {
  params: { slug: string };
}

export const revalidate = 0;

export default async function ProjectDetailPage({ params }: PageProps) {
  const projectRaw = await prisma.project.findUnique({
    where: { slug: params.slug },
    include: {
      properties: {
        where: { status: { not: "HIDDEN" } },
        include: {
          images: { orderBy: { sortOrder: "asc" } },
          features: true,
        },
      },
    },
  });

  if (!projectRaw) {
    notFound();
  }

  const project = JSON.parse(JSON.stringify(projectRaw));
  const properties: PropertyItem[] = project.properties;

  return (
    <div className="py-10 sm:py-16 bg-[#F7F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-[#E2E7E5] shadow-soft">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5F1] text-[#006B5B] text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C99A3D]" />
            TOWNSHIP MASTERPLAN BLUEPRINT
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17232B] font-heading">
            {project.title}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-[#006B5B] mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> {project.location}
          </p>
          <p className="text-sm sm:text-base text-[#657278] mt-4 leading-relaxed max-w-3xl">
            {project.description}
          </p>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-[#E2E7E5]">
            <div>
              <span className="text-xs text-[#657278]">Masterplan Area:</span>
              <p className="text-lg font-bold text-[#17232B] font-heading">{project.totalArea || "620+ Bigha"}</p>
            </div>
            <div>
              <span className="text-xs text-[#657278]">Venice Canals:</span>
              <p className="text-lg font-bold text-[#17232B] font-heading">3.5 KM Interconnected</p>
            </div>
            <div>
              <span className="text-xs text-[#657278]">Boulevard Roads:</span>
              <p className="text-lg font-bold text-[#17232B] font-heading">40 Ft - 80 Ft Paved</p>
            </div>
            <div>
              <span className="text-xs text-[#657278]">Legal Status:</span>
              <p className="text-lg font-bold text-emerald-700 font-heading">100% Mutation Ready</p>
            </div>
          </div>
        </div>

        {/* Masterplan Layout & Maps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-[#E2E7E5] shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-[#17232B] font-heading flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#006B5B]" />
              Sector Demarcation Layout
            </h3>
            <p className="text-xs text-[#657278]">
              High-resolution layout displaying Sectors 1, 2, 3, VIP Zone, and central lake.
            </p>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-[#E2E7E5]">
              <Image
                src={project.layoutMapUrl || "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80"}
                alt="Layout Plan"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#E2E7E5] shadow-soft space-y-4">
            <h3 className="text-lg font-bold text-[#17232B] font-heading flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#006B5B]" />
              Regional Location Map
            </h3>
            <p className="text-xs text-[#657278]">
              Direct connection from Uttara Sector 18 and Purbachal 300ft Expressway.
            </p>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-[#E2E7E5]">
              <Image
                src={project.locationMapUrl || "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80"}
                alt="Location Map"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Properties Inside This Project */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17232B] font-heading">
                Available Plots & Flats in this Township
              </h2>
              <p className="text-xs sm:text-sm text-[#657278] mt-1">
                Showing {properties.length} verified listings ready for immediate inspection
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
