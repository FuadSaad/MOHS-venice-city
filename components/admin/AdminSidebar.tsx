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
  Search
} from "lucide-react";
import { AdminPayload, isSuperAdmin, hasPermission } from "@/lib/rbac";

interface NavItem {
  label: string;
  href: string;
  icon: any;
  permission?: string;
  superAdminOnly?: boolean;
  badge?: number | string;
}

const ALL_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "All Properties", href: "/admin/properties", icon: Home, permission: "properties" },
  { label: "Add Property", href: "/admin/properties/new", icon: PlusCircle, permission: "properties" },
  { label: "Township Projects", href: "/admin/projects", icon: FolderKanban, permission: "projects" },
  { label: "Client Enquiries", href: "/admin/enquiries", icon: MessageSquare, permission: "enquiries", badge: "12" },
  { label: "Site Visit Requests", href: "/admin/site-visits", icon: CalendarCheck, permission: "site_visits", badge: "5" },
  { label: "Photo Gallery", href: "/admin/gallery", icon: ImageIcon, permission: "gallery" },
  { label: "Customer Reviews", href: "/admin/reviews", icon: Star, permission: "reviews" },
  { label: "Website Settings", href: "/admin/settings", icon: Settings, permission: "settings" },
  { label: "Configure", href: "/admin/sub-admins", icon: ShieldCheck, superAdminOnly: true },
];

export default function AdminSidebar({ admin: serverAdmin }: { admin?: AdminPayload | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<AdminPayload | null>(serverAdmin || null);

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

  const visibleNavItems = ALL_NAV_ITEMS.filter((item) => {
    if (isSuper) return true;
    if (item.superAdminOnly) return false;
    if (!item.permission) return true;
    return hasPermission(admin, item.permission);
  });

  return (
    <aside className="w-56 bg-[#12262D] text-white flex flex-col shrink-0 min-h-screen border-r border-white/10">
      {/* Brand header */}
      <div className="h-14 flex items-center px-4 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="relative w-28 h-8 flex items-center">
            <Image
              src="/images/logo.png"
              alt="MOHS Venice City"
              fill
              className="object-contain object-left brightness-0 invert"
            />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {visibleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                  isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/70"
                }`}>
                  {item.badge}
                </span>
              )}
              {item.superAdminOnly && !item.badge && (
                <span className="text-[9px] uppercase font-bold bg-white/10 text-white/70 px-1.5 py-0.5 rounded">
                  Super
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile and Actions */}
      <div className="p-3 border-t border-white/10 space-y-2">
        {admin && (
          <div className="px-3 py-2 flex items-center gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-[13px] font-medium text-white truncate">{admin.name || "Administrator"}</p>
                {isSuper ? (
                  <span className="text-[10px] text-amber-300 flex items-center" title="Super Admin">👑</span>
                ) : (
                  <Shield className="w-3 h-3 text-emerald-400 shrink-0" title="Sub Admin" />
                )}
              </div>
              <p className="text-[11px] text-white/50 truncate">
                {admin.username ? `@${admin.username}` : admin.email}
              </p>
            </div>
          </div>
        )}

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-rose-400 hover:text-rose-300 hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
