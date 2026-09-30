import React from "react";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Home,
  MapPin,
  Building,
  MessageSquare,
  CalendarCheck,
  PlusCircle,
  FolderKanban,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { formatBDTFull } from "@/lib/utils";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    totalProperties,
    availablePlots,
    availableFlats,
    soldProperties,
    totalEnquiries,
    pendingVisits,
    totalProjects,
    recentEnquiries,
    recentVisits,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { propertyType: "PLOT", status: "AVAILABLE" } }),
    prisma.property.count({ where: { propertyType: "FLAT", status: "AVAILABLE" } }),
    prisma.property.count({ where: { status: "SOLD" } }),
    prisma.enquiry.count(),
    prisma.siteVisit.count({ where: { status: "PENDING" } }),
    prisma.project.count(),
    prisma.enquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { property: { select: { title: true, slug: true } } },
    }),
    prisma.siteVisit.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { property: { select: { title: true, slug: true } } },
    }),
  ]);

  const cards = [
    {
      title: "Total Properties",
      value: totalProperties,
      desc: "Plots & Flats in Database",
      icon: Home,
      color: "bg-emerald-50 text-[#00695C] border-emerald-200",
    },
    {
      title: "Available Plots",
      value: availablePlots,
      desc: "Ready for Registration",
      icon: MapPin,
      color: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
      title: "Available Flats",
      value: availableFlats,
      desc: "Move-in / Handover Ready",
      icon: Building,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Client Enquiries",
      value: totalEnquiries,
      desc: "Incoming Buyer Leads",
      icon: MessageSquare,
      color: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      title: "Pending Site Visits",
      value: pendingVisits,
      desc: "Awaiting Confirmation",
      icon: CalendarCheck,
      color: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      title: "Active Projects",
      value: totalProjects,
      desc: "Township Masterplans",
      icon: FolderKanban,
      color: "bg-slate-50 text-slate-700 border-slate-200",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E2E7E5] shadow-soft">
        <div>
          <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
            MOHS Venice City Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#657278] mt-1">
            Real estate inventory, prospective buyer leads, and site visit scheduling.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/properties/new?type=PLOT"
            className="bg-[#00695C] hover:bg-[#005B50] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Plot</span>
          </Link>
          <Link
            href="/admin/properties/new?type=FLAT"
            className="bg-[#12262D] hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Flat</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-[#E2E7E5] shadow-soft flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-[#657278] uppercase truncate">
                  {c.title}
                </span>
                <div className={`p-2 rounded-lg border ${c.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#12262D] font-heading">
                  {c.value}
                </p>
                <p className="text-[11px] text-[#657278] mt-0.5">{c.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Table: Recent Enquiries vs Recent Site Visits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <div className="bg-white rounded-2xl border border-[#E2E7E5] shadow-soft overflow-hidden">
          <div className="p-5 border-b border-[#E2E7E5] flex items-center justify-between">
            <h3 className="text-base font-bold text-[#12262D] font-heading flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#00695C]" />
              Recent Client Enquiries
            </h3>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-[#00695C] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-[#E2E7E5] overflow-x-auto">
            {recentEnquiries.length > 0 ? (
              recentEnquiries.map((enq) => (
                <div key={enq.id} className="p-4 hover:bg-[#F5F8F8] transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-[#12262D]">{enq.name}</span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        enq.status === "NEW"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#657278]">
                    Phone: <span className="font-mono text-[#12262D]">{enq.phone}</span> | Budget:{" "}
                    {enq.budget || "Not specified"}
                  </p>
                  <p className="text-xs text-[#12262D] line-clamp-1 mt-1 bg-[#F5F8F8] p-1.5 rounded">
                    "{enq.message}"
                  </p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#657278]">No enquiries yet.</div>
            )}
          </div>
        </div>

        {/* Recent Site Visits */}
        <div className="bg-white rounded-2xl border border-[#E2E7E5] shadow-soft overflow-hidden">
          <div className="p-5 border-b border-[#E2E7E5] flex items-center justify-between">
            <h3 className="text-base font-bold text-[#12262D] font-heading flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#00695C]" />
              Scheduled Site Visits
            </h3>
            <Link
              href="/admin/site-visits"
              className="text-xs font-bold text-[#00695C] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-[#E2E7E5] overflow-x-auto">
            {recentVisits.length > 0 ? (
              recentVisits.map((visit) => (
                <div key={visit.id} className="p-4 hover:bg-[#F5F8F8] transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-[#12262D]">{visit.name}</span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        visit.status === "PENDING"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {visit.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#657278]">
                    Date: <strong className="text-[#00695C]">{visit.preferredDate}</strong> | Slot:{" "}
                    {visit.preferredTime}
                  </p>
                  <p className="text-xs text-[#657278] mt-0.5">
                    Phone: <span className="font-mono text-[#12262D]">{visit.phone}</span>
                  </p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#657278]">No site visits scheduled.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
