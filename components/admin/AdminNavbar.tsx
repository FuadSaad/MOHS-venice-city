"use client";

import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { AdminPayload } from "@/lib/rbac";

export default function AdminNavbar({ admin }: { admin?: AdminPayload | null }) {
  const initials = admin?.name
    ? admin.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AD';

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left side */}
      <div className="flex items-center flex-1">
        <div className="relative w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border-none rounded-lg text-[13px] text-slate-700 focus:ring-1 focus:ring-slate-300 outline-none"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="relative p-1.5 text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
        </button>

        <div className="h-5 w-px bg-slate-200" />

        <button className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[13px] font-bold text-slate-600">
            {initials}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-[13px] font-medium text-slate-700">
              {admin?.name || "Administrator"}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
