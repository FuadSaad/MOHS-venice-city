"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard, Home, PlusCircle, FolderKanban, MessageSquare,
  CalendarCheck, Image as ImageIcon, Star, Settings, ShieldCheck,
  LogOut, ExternalLink, Search, Bell, ChevronDown, TrendingUp,
  TrendingDown, Users, DollarSign, BarChart3, ArrowUpRight,
  Clock, CheckCircle2, AlertCircle, Phone, MapPin, Building,
  FileText, Filter, MoreHorizontal, ChevronRight
} from "lucide-react";

// ─── SIDEBAR ───
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "#", active: true },
  { label: "All Properties", icon: Home, href: "#", badge: "161" },
  { label: "Add Property", icon: PlusCircle, href: "#" },
  { label: "Township Projects", icon: FolderKanban, href: "#" },
  { label: "Client Leads", icon: MessageSquare, href: "#", badge: "3" },
  { label: "Site Visits", icon: CalendarCheck, href: "#", badge: "2" },
  { label: "Photo Gallery", icon: ImageIcon, href: "#" },
  { label: "Customer Reviews", icon: Star, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
  { label: "Team Management", icon: ShieldCheck, href: "#" },
];

// ─── STAT CARDS ───
const stats = [
  { label: "Total Properties", value: "161", change: "+12", up: true, icon: Home, color: "text-emerald-600 bg-emerald-50" },
  { label: "Available Plots", value: "91", change: "+5", up: true, icon: MapPin, color: "text-teal-600 bg-teal-50" },
  { label: "Available Flats", value: "1", change: "0", up: false, icon: Building, color: "text-blue-600 bg-blue-50" },
  { label: "New Leads", value: "8", change: "+3", up: true, icon: Users, color: "text-amber-600 bg-amber-50" },
  { label: "Pending Visits", value: "2", change: "-1", up: false, icon: CalendarCheck, color: "text-purple-600 bg-purple-50" },
  { label: "Monthly Revenue", value: "৳1.2 Cr", change: "+18%", up: true, icon: DollarSign, color: "text-rose-600 bg-rose-50" },
];

// ─── RECENT LEADS ───
const recentLeads = [
  { name: "Mahfuzur Rahman", phone: "+880 1819 234567", budget: "70-80 Lakh", status: "New", statusColor: "bg-blue-50 text-blue-700", time: "10 min ago" },
  { name: "Farzana Yasmin", phone: "+880 1712 345078", budget: "1 Crore+", status: "Follow-up", statusColor: "bg-amber-50 text-amber-700", time: "2 hours ago" },
  { name: "Abdul Karim", phone: "+880 1911 876543", budget: "50-60 Lakh", status: "Interested", statusColor: "bg-emerald-50 text-emerald-700", time: "This morning" },
  { name: "Nazmul Hasan", phone: "+880 1655 432198", budget: "3 Crore", status: "New", statusColor: "bg-blue-50 text-blue-700", time: "Yesterday" },
];

// ─── SITE VISITS ───
const siteVisits = [
  { name: "Farzana Yasmin", date: "5 Oct 2026", time: "10:00 AM", plot: "CP-01", status: "Confirmed", statusColor: "bg-emerald-50 text-emerald-700" },
  { name: "Rasel Ahmed", date: "6 Oct 2026", time: "3:00 PM", plot: "PR-05", status: "Pending", statusColor: "bg-amber-50 text-amber-700" },
  { name: "Tania Sultana", date: "8 Oct 2026", time: "11:00 AM", plot: "CP-03", status: "Pending", statusColor: "bg-amber-50 text-amber-700" },
];

// ─── ACTIVITIES ───
const activities = [
  { text: "New plot CP-15 has been added", time: "5 min ago", icon: PlusCircle, color: "text-emerald-600" },
  { text: "New enquiry from Mahfuzur Rahman", time: "10 min ago", icon: MessageSquare, color: "text-blue-600" },
  { text: "Farzana Yasmin's site visit confirmed", time: "1 hour ago", icon: CheckCircle2, color: "text-teal-600" },
  { text: "Plot PR-03 status changed to 'Booked'", time: "3 hours ago", icon: AlertCircle, color: "text-amber-600" },
  { text: "4 new photos added to gallery", time: "Yesterday", icon: ImageIcon, color: "text-purple-600" },
];

export default function AdminDemoPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFB] font-sans">

      {/* ─── SIDEBAR ─── */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-56'} bg-[#12262D] text-white flex flex-col shrink-0 transition-all duration-300`}>
        {/* Logo */}
        <div className="p-4 flex items-center justify-center border-b border-white/5">
          {!sidebarCollapsed ? (
            <div className="relative w-28 h-8">
              <Image src="/images/logo.png" alt="MOHS" fill className="object-contain brightness-0 invert" unoptimized />
            </div>
          ) : (
            <div className="w-8 h-8 bg-[#00695C] rounded-lg flex items-center justify-center text-sm font-black">M</div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 space-y-0.5 px-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all
                  ${item.active 
                    ? "bg-white/10 text-white" 
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }
                `}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {!sidebarCollapsed && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] bg-white/15 px-1.5 py-0.5 rounded-md font-bold">{item.badge}</span>
                    )}
                  </>
                )}
              </a>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-white/5 space-y-1">
          {!sidebarCollapsed && (
            <div className="px-3 py-2 mb-1">
              <p className="text-xs font-semibold text-white/80 truncate">MOHS Venice City Admin</p>
              <p className="text-[10px] text-white/40 truncate">@admin</p>
            </div>
          )}
          <a href="#" className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors rounded-lg">
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            {!sidebarCollapsed && <span>View Public Website</span>}
          </a>
          <button className="flex items-center gap-2 px-3 py-1.5 text-[12px] text-red-400/70 hover:text-red-300 transition-colors rounded-lg w-full">
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Navbar */}
        <header className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
              <BarChart3 className="w-4 h-4" />
            </button>
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-slate-50 border-0 rounded-lg text-sm w-64 focus:outline-none focus:ring-1 focus:ring-[#00695C]/30 placeholder:text-slate-300" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="h-5 w-px bg-slate-100" />
            <button className="flex items-center gap-2 hover:bg-slate-50 px-2 py-1 rounded-lg transition-colors">
              <div className="w-7 h-7 bg-[#00695C] rounded-full flex items-center justify-center text-white text-[11px] font-bold">MA</div>
              <span className="text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-5 overflow-y-auto">

          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-[#12262D]">Dashboard</h1>
              <p className="text-xs text-slate-400 mt-0.5">Last updated: Today 10:00 AM</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-500 hover:border-slate-300 transition-colors flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Reports
              </button>
              <button className="px-3 py-1.5 bg-[#00695C] text-white rounded-lg text-xs font-semibold hover:bg-[#005B50] transition-colors flex items-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5" /> New Property
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-6">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="bg-white rounded-xl p-4 border border-slate-100 hover:border-slate-200 transition-colors group">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-1.5 rounded-lg ${s.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    {s.up ? (
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />{s.change}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-0.5">
                        {s.change !== "0" && <TrendingDown className="w-3 h-3" />}{s.change}
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold text-[#12262D] leading-none mb-0.5">{s.value}</p>
                  <p className="text-[11px] text-slate-400">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* Main Grid: Leads + Visits + Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

            {/* Recent Leads */}
            <div className="xl:col-span-1 bg-white rounded-xl border border-slate-100 flex flex-col">
              <div className="px-4 py-3 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#12262D]">Recent Leads</h3>
                <button className="text-[11px] text-[#00695C] font-semibold hover:underline flex items-center gap-0.5">View All <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="flex-1 divide-y divide-slate-50">
                {recentLeads.map((lead, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-[#12262D]">{lead.name}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${lead.statusColor}`}>{lead.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                      <span>Budget: {lead.budget}</span>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1">{lead.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Site Visits */}
            <div className="xl:col-span-1 bg-white rounded-xl border border-slate-100 flex flex-col">
              <div className="px-4 py-3 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#12262D]">Upcoming Site Visits</h3>
                <button className="text-[11px] text-[#00695C] font-semibold hover:underline flex items-center gap-0.5">View All <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="flex-1 divide-y divide-slate-50">
                {siteVisits.map((visit, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-[#12262D]">{visit.name}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${visit.statusColor}`}>{visit.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1"><CalendarCheck className="w-3 h-3" />{visit.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{visit.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-1">Plot: {visit.plot}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="xl:col-span-1 bg-white rounded-xl border border-slate-100 flex flex-col">
              <div className="px-4 py-3 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#12262D]">Recent Activity</h3>
                <button className="text-slate-300 hover:text-slate-500 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <div className="flex-1 px-4 py-2">
                {activities.map((act, i) => {
                  const Icon = act.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 py-2.5">
                      <div className={`mt-0.5 p-1 rounded-md bg-slate-50 ${act.color}`}>
                        <Icon className="w-3 h-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-600 leading-tight">{act.text}</p>
                        <p className="text-[10px] text-slate-300 mt-0.5">{act.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Revenue Chart Placeholder */}
            <div className="bg-white rounded-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#12262D]">Monthly Sales</h3>
                <div className="flex items-center gap-2">
                  <button className="text-[10px] font-semibold text-[#00695C] bg-emerald-50 px-2 py-1 rounded-md">This Year</button>
                  <button className="text-[10px] font-semibold text-slate-400 px-2 py-1 rounded-md hover:bg-slate-50">Last Year</button>
                </div>
              </div>
              {/* Fake chart bars */}
              <div className="flex items-end gap-2 h-32">
                {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div 
                      className={`w-full rounded-t-md transition-all ${i === 9 ? 'bg-[#00695C]' : 'bg-slate-100 hover:bg-slate-200'}`}
                      style={{ height: `${h}%` }} 
                    />
                    <span className="text-[9px] text-slate-300">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plot Status Breakdown */}
            <div className="bg-white rounded-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#12262D]">Plot Status</h3>
                <button className="text-[10px] font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1"><Filter className="w-3 h-3" /> Filter</button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Available", count: 91, total: 161, color: "bg-emerald-500" },
                  { label: "Booked", count: 42, total: 161, color: "bg-amber-500" },
                  { label: "Sold", count: 25, total: 161, color: "bg-blue-500" },
                  { label: "Unavailable", count: 3, total: 161, color: "bg-slate-300" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-600">{item.label}</span>
                      <span className="text-xs font-bold text-slate-700">{item.count}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.count / item.total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
