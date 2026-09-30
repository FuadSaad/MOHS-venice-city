"use client";

import React, { useEffect, useState } from "react";
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
  ShieldCheck,
  Shield,
} from "lucide-react";
import { AdminPayload, isSuperAdmin, hasPermission } from "@/lib/auth";

interface NavItem {
  label: string;
  href: string;
  icon: any;
  permission?: string;
  superAdminOnly?: boolean;
}

const ALL_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard }, // accessible to all
  { label: "All Properties", href: "/admin/properties", icon: Home, permission: "properties" },
  { label: "Add Property", href: "/admin/properties/new", icon: PlusCircle, permission: "properties" },
  { label: "Township Projects", href: "/admin/projects", icon: FolderKanban, permission: "projects" },
  { label: "Client Enquiries", href: "/admin/enquiries", icon: MessageSquare, permission: "enquiries" },
  { label: "Site Visit Requests", href: "/admin/site-visits", icon: CalendarCheck, permission: "site_visits" },
  { label: "Photo Gallery", href: "/admin/gallery", icon: ImageIcon, permission: "gallery" },
  { label: "Customer Reviews", href: "/admin/reviews", icon: Star, permission: "reviews" },
  { label: "Website Settings", href: "/admin/settings", icon: Settings, permission: "settings" },
  { label: "Sub-Admins & Team", href: "/admin/sub-admins", icon: ShieldCheck, superAdminOnly: true },
];

export default function AdminSidebar({ admin: serverAdmin }: { admin?: AdminPayload | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminPayload | null>(serverAdmin || null);

  // Sync client session if server prop wasn't provided or updated
  useEffect(() => {
    if (!serverAdmin) {
      fetch("/api/auth/me")
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated && data.user) {
            setAdmin({
              userId: data.user.id,
              name: data.user.name,
              email: data.user.email,
              username: data.user.username,
              role: data.user.role,
              permissions: data.user.permissions || [],
            });
          }
        })
        .catch(() => {});
    }
  }, [serverAdmin]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error(e);
    }
  };

  const isSuper = isSuperAdmin(admin);

  // Filter navigation items by role and permissions
  const visibleNavItems = ALL_NAV_ITEMS.filter((item) => {
    if (isSuper) return true; // Super admin sees everything
    if (item.superAdminOnly) return false; // Sub-admin cannot see super admin items
    if (!item.permission) return true; // Dashboard is visible
    return hasPermission(admin, item.permission);
  });

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

      {/* Role Badge Bar */}
      <div className="px-4 py-3 bg-[#005B50]/40 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {isSuper ? (
            <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
              <span>👑 Super Administrator</span>
            </span>
          ) : (
            <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sub-Administrator</span>
            </span>
          )}
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {visibleNavItems.map((item) => {
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
              {item.superAdminOnly && (
                <span className="ml-auto text-[9px] uppercase font-bold bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
                  Super
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile and Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        {/* User Card */}
        {admin && (
          <div className="px-3 py-2 bg-white/5 rounded-xl border border-white/5 mb-2">
            <p className="text-xs font-bold text-white truncate">{admin.name || "Administrator"}</p>
            <p className="text-[10px] text-slate-400 truncate">
              {admin.username ? `@${admin.username}` : admin.email}
            </p>
          </div>
        )}

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
