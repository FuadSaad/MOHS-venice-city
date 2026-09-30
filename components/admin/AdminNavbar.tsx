"use client";

import React from "react";
import Link from "next/link";
import { User, Bell, ExternalLink, Plus } from "lucide-react";

export default function AdminNavbar({ adminEmail }: { adminEmail?: string }) {
  return (
    <header className="h-16 bg-white border-b border-[#E2E7E5] flex items-center justify-between px-6 sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#657278]">
          MOHS VENICE CITY MANAGEMENT
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/admin/properties/new"
          className="bg-[#00695C] hover:bg-[#005B50] text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Property</span>
        </Link>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#E8F5F3] text-[#00695C] flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold text-[#12262D]">Administrator</p>
            <p className="text-[11px] text-[#657278]">{adminEmail || "admin@mohs.com"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
