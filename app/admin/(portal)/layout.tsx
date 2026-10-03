import React from "react";
import { getSessionAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default async function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getSessionAdmin();

  // Redirect to login if unauthenticated
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F8F8]">
      <AdminSidebar admin={admin} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar admin={admin} />
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
