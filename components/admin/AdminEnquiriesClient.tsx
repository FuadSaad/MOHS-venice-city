"use client";

import React, { useState } from "react";
import { MessageSquare, Phone, Mail, CheckCircle2, Clock, Search, Trash2 } from "lucide-react";
import { EnquiryItem } from "@/types/property";

interface AdminEnquiriesClientProps {
  initialEnquiries: EnquiryItem[];
}

export default function AdminEnquiriesClient({
  initialEnquiries,
}: AdminEnquiriesClientProps) {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>(initialEnquiries);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = enquiries.filter((item) => {
    if (statusFilter !== "ALL" && item.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.message.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E7E5] shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {["ALL", "NEW", "CONTACTED", "RESOLVED"].map((st) => (
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

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#12262D] outline-none"
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-[#E2E7E5] shadow-soft overflow-hidden">
        <div className="divide-y divide-[#E2E7E5]">
          {filtered.length > 0 ? (
            filtered.map((enq) => (
              <div key={enq.id} className="p-5 hover:bg-[#F5F8F8] transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base text-[#12262D] font-heading">
                      {enq.name}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                        enq.status === "NEW"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                  <span className="text-xs text-[#657278]">
                    {new Date(enq.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#657278] mb-3">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#00695C]" />
                    <a href={`tel:${enq.phone}`} className="font-bold text-[#12262D] hover:underline">
                      {enq.phone}
                    </a>
                  </div>
                  {enq.email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#00695C]" />
                      <span>{enq.email}</span>
                    </div>
                  )}
                  {enq.budget && (
                    <div>
                      <span>Budget: </span>
                      <strong className="text-[#00695C]">{enq.budget}</strong>
                    </div>
                  )}
                </div>

                <div className="bg-[#F5F8F8] p-3 rounded-xl border border-[#E2E7E5] text-xs text-[#12262D]">
                  <p className="font-semibold text-[11px] text-[#657278] mb-0.5">Buyer Message:</p>
                  <p className="whitespace-pre-line">{enq.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-sm text-[#657278]">
              No enquiries match the filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
