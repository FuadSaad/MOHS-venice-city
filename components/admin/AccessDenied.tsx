"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function AccessDenied({ moduleName }: { moduleName?: string }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-[#E2E7E5] shadow-soft text-center animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-xs">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-extrabold text-[#12262D] font-heading">
          Access Restricted
        </h2>
        <p className="text-xs sm:text-sm text-[#657278] mt-2">
          Your sub-admin account does not have permission to access or edit{" "}
          <strong className="text-[#12262D]">{moduleName || "this section"}</strong>.
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Please contact the Super Administrator to grant you access.
        </p>

        <div className="mt-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00695C] hover:bg-[#005B50] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
