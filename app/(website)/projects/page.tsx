import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Layers, MapPin, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const revalidate = 0;

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      properties: {
        where: { status: { not: "HIDDEN" } },
        select: { id: true, title: true, slug: true, propertyType: true, priceFormatted: true, featuredImage: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="py-10 sm:py-16 bg-[#F7F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5F1] text-[#006B5B] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C99A3D]" />
            MOHS VENICE CITY MEGA TOWNSHIPS
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#17232B] font-heading tracking-tight">
            Township Projects & Masterplans
          </h1>
          <p className="text-sm sm:text-base text-[#657278] mt-2 max-w-2xl">
            Explore our integrated satellite city project designed for lasting
            tranquility, civic convenience, and family prosperity.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-[#E2E7E5] overflow-hidden shadow-soft hover:shadow-card transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8">
                {/* Visual */}
                <div className="lg:col-span-6 relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-[#E2E7E5]">
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#006B5B] text-white text-xs font-bold px-3 py-1 rounded-md">
                    Featured Masterplan
                  </div>
                </div>

                {/* Details */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-[#006B5B] font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{project.location}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17232B] font-heading">
                    {project.title}
                  </h2>

                  {project.tagline && (
                    <p className="text-xs sm:text-sm font-semibold text-[#004F45]">
                      {project.tagline}
                    </p>
                  )}

                  <p className="text-sm text-[#657278] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#E2E7E5] text-xs">
                    <div>
                      <span className="text-[#657278]">Masterplan Area:</span>
                      <p className="font-bold text-[#17232B] mt-0.5">
                        {project.totalArea || "620+ Bigha"}
                      </p>
                    </div>
                    <div>
                      <span className="text-[#657278]">Listed Properties:</span>
                      <p className="font-bold text-[#006B5B] mt-0.5">
                        {project.properties.length} Available Listings
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="bg-[#006B5B] hover:bg-[#004F45] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <span>Explore Sector Blueprint</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact?type=visit"
                      className="bg-[#F7F8F6] hover:bg-[#E8F5F1] text-[#006B5B] border border-[#006B5B]/30 text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
                    >
                      Schedule Site Tour
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
