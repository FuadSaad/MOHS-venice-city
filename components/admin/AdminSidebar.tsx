"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  PlusCircle,
  FolderKanban,
  MessageSquare,
  CalendarCheck,
  Image as ImageIcon,
  Star,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "All Properties", href: "/admin/properties", icon: Home },
    { label: "Add Property", href: "/admin/properties/new", icon: PlusCircle },
    { label: "Township Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Client Enquiries", href: "/admin/enquiries", icon: MessageSquare },
    { label: "Site Visit Requests", href: "/admin/site-visits", icon: CalendarCheck },
    { label: "Photo Gallery", href: "/admin/gallery", icon: ImageIcon },
    { label: "Customer Reviews", href: "/admin/reviews", icon: Star },
    { label: "Website Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <aside className="w-64 bg-[#12262D] text-white flex flex-col shrink-0 min-h-screen border-r border-white/10">
      {/* Brand header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative w-36 h-10 bg-white/95 rounded-lg p-1.5 flex items-center">
            <Image
              src="/images/logo.png"
              alt="MOHS Venice City"
              fill
              className="object-contain object-left"
            />
          </div>
        </Link>
      </div>

      <div className="px-4 py-3 bg-[#005B50]/50 border-b border-white/5 text-xs text-emerald-300 font-semibold flex items-center justify-between">
        <span>Admin Management Panel</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                isActive
                  ? "bg-[#00695C] text-white shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 text-[#D6A84F]" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#D6A84F]" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-rose-300 hover:text-rose-100 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
