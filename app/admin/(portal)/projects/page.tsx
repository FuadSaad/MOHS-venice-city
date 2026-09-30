import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FolderKanban, Plus, ExternalLink, MapPin } from "lucide-react";
import { getSessionAdmin, hasPermission } from "@/lib/auth";
import AccessDenied from "@/components/admin/AccessDenied";

export const revalidate = 0;

export default async function AdminProjectsPage() {
  const admin = await getSessionAdmin();
  if (!hasPermission(admin, "projects")) {
    return <AccessDenied moduleName="Township Projects" />;
  }

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
          <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
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
              <div className="flex items-center justify-between text-xs text-[#00695C] font-bold">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {proj.location}
                </span>
                <span>{proj.totalArea || "Mega Township"}</span>
              </div>
              <h3 className="font-bold text-lg text-[#12262D]">{proj.title}</h3>
              <p className="text-xs text-[#657278] line-clamp-2">{proj.description}</p>
              <div className="pt-2 flex items-center justify-between border-t border-[#E2E7E5] text-xs">
                <span className="font-semibold text-slate-700">
                  {proj.properties.length} Associated Properties
                </span>
                <Link
                  href={`/projects/${proj.slug}`}
                  target="_blank"
                  className="font-bold text-[#00695C] flex items-center gap-1 hover:underline"
                >
                  <span>Public View</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
