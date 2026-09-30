"use client";

import React from "react";
import Link from "next/link";
import { User, Plus, ShieldCheck, Shield } from "lucide-react";
import { AdminPayload, isSuperAdmin, hasPermission } from "@/lib/rbac";

export default function AdminNavbar({ admin }: { admin?: AdminPayload | null }) {
  const isSuper = isSuperAdmin(admin);
  const canAddProperty = hasPermission(admin, "properties");

  return (
    <header className="h-16 bg-white border-b border-[#E2E7E5] flex items-center justify-between px-6 sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#657278]">
          MOHS VENICE CITY MANAGEMENT
        </span>
        {isSuper ? (
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full">
            👑 Super Admin Mode
          </span>
        ) : (
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
            <Shield className="w-3 h-3 text-[#00695C]" /> Sub-Admin Mode
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        {canAddProperty && (
          <Link
            href="/admin/properties/new"
            className="bg-[#00695C] hover:bg-[#005B50] text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Property</span>
          </Link>
        )}

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              isSuper ? "bg-amber-100 text-amber-800" : "bg-[#E8F5F3] text-[#00695C]"
            }`}
          >
            {isSuper ? "👑" : <User className="w-4 h-4" />}
          </div>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-[#12262D]">
                {admin?.name || "Administrator"}
              </p>
              {isSuper && (
                <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1 rounded">
                  Super
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#657278]">
              {admin?.username ? `@${admin.username}` : (admin?.email || "admin@mohs.com")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
