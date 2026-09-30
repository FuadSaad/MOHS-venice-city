import React from "react";
import prisma from "@/lib/prisma";
import AdminSiteVisitsClient from "@/components/admin/AdminSiteVisitsClient";
import { SiteVisitItem } from "@/types/property";

export const revalidate = 0;

export default async function AdminSiteVisitsPage() {
  const visitsRaw = await prisma.siteVisit.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      property: { select: { title: true, slug: true } },
    },
  });

  const visits: SiteVisitItem[] = JSON.parse(JSON.stringify(visitsRaw));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
          Site Visit Tour Bookings
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Review customer visit appointments, transport arrangements, and preferred viewing times.
        </p>
      </div>

      <AdminSiteVisitsClient initialVisits={visits} />
    </div>
  );
}
