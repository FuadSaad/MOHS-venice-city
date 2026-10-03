import React from "react";
import AdminMapSettingsClient from "@/components/admin/AdminMapSettingsClient";
import { getWebsiteSettings } from "@/lib/settings";
import { getSessionAdmin } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Interactive Map Settings | Admin",
};

export default async function MapSettingsPage() {
  const admin = await getSessionAdmin();
  if (!admin || !hasPermission(admin, "settings")) {
    redirect("/admin");
  }

  const settings = await getWebsiteSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-heading tracking-tight text-[#12262D]">
            Interactive Map Settings
          </h1>
          <p className="text-xs text-[#657278] font-medium mt-1">
            Configure the background maps, titles, and zones for the Interactive Map page.
          </p>
        </div>
      </div>

      <AdminMapSettingsClient initialSettings={settings} />
    </div>
  );
}
