import React from "react";
import AdminMapSettingsClient from "@/components/admin/AdminMapSettingsClient";
import { getWebsiteSettings } from "@/lib/settings";
import { getSessionAdmin } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Interactive Map Settings | Admin",
};

export default async function MapSettingsPage() {
  const admin = await getSessionAdmin();
  if (!admin || !hasPermission(admin, "settings")) {
    redirect("/admin");
  }

  const settings = await getWebsiteSettings();
  
  // Fetch all plots so we can manage map buttons directly here
  const plots = await prisma.property.findMany({
    where: { propertyType: "PLOT" },
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-[#12262D]">
            Interactive Map Settings
          </h1>
          <p className="text-xs text-[#657278] font-medium mt-1">
            Configure the background maps and manage all plot buttons on the map.
          </p>
        </div>
      </div>

      <AdminMapSettingsClient initialSettings={settings} plots={plots} />
    </div>
  );
}
