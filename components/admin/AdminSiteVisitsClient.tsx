"use client";

import React, { useState } from "react";
import { Calendar, Clock, Phone, Mail, CheckCircle2, User, Search } from "lucide-react";
import { SiteVisitItem } from "@/types/property";

interface AdminSiteVisitsClientProps {
  initialVisits: SiteVisitItem[];
}

export default function AdminSiteVisitsClient({
  initialVisits,
}: AdminSiteVisitsClientProps) {
  const [visits, setVisits] = useState<SiteVisitItem[]>(initialVisits);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = visits.filter((item) => {
    if (statusFilter !== "ALL" && item.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E7E5] shadow-soft flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                statusFilter === st
                  ? "bg-[#00695C] text-white"
                  : "bg-[#F5F8F8] text-[#657278] hover:text-[#12262D]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 border border-[#E2E7E5] shadow-soft flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-base text-[#12262D] font-heading">
                  {item.name}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    item.status === "PENDING"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="p-3 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5] text-xs space-y-2 mb-3">
                <div className="flex items-center gap-2 text-[#00695C] font-bold">
                  <Calendar className="w-4 h-4 text-[#D6A84F]" />
                  <span>{item.preferredDate}</span>
                </div>
                <div className="flex items-center gap-2 text-[#657278]">
                  <Clock className="w-4 h-4 text-[#00695C]" />
                  <span>{item.preferredTime}</span>
                </div>
              </div>

              <div className="text-xs space-y-1 text-[#657278]">
                <p>
                  Phone:{" "}
                  <a href={`tel:${item.phone}`} className="font-bold text-[#12262D] hover:underline">
                    {item.phone}
                  </a>
                </p>
                {item.email && <p>Email: {item.email}</p>}
                {item.message && (
                  <p className="mt-2 text-[#12262D] italic">"{item.message}"</p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E7E5] flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Booked: {new Date(item.createdAt).toLocaleDateString()}
              </span>
              <a
                href={`tel:${item.phone}`}
                className="font-bold text-[#00695C] hover:underline"
              >
                Call Visitor →
              </a>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center text-sm text-[#657278] border border-[#E2E7E5]">
          No site visits found for this status.
        </div>
      )}
    </div>
  );
}
