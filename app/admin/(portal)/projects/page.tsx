import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FolderKanban, Plus, ExternalLink, MapPin } from "lucide-react";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      properties: { select: { id: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#17232B] font-heading">
            Township Projects
          </h1>
          <p className="text-xs sm:text-sm text-[#657278] mt-1">
            Manage satellite city masterplans, total areas, and blueprints.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-[#E2E7E5] shadow-soft overflow-hidden"
          >
            <div className="relative aspect-[16/9] bg-slate-100">
              <Image
                src={proj.heroImage}
                alt={proj.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#006B5B] font-bold">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {proj.location}
                </span>
                <span className="text-[#657278]">
                  {proj.properties.length} Active Listings
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#17232B] font-heading">
                {proj.title}
              </h3>
              <p className="text-xs text-[#657278] line-clamp-2">
                {proj.description}
              </p>
              <div className="pt-3 border-t border-[#E2E7E5] flex items-center justify-between text-xs">
                <span className="text-[#657278]">
                  Area: <strong>{proj.totalArea || "620 Bigha"}</strong>
                </span>
                <Link
                  href={`/projects/${proj.slug}`}
                  target="_blank"
                  className="font-bold text-[#006B5B] hover:underline flex items-center gap-1"
                >
                  <span>View Public Page</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
