import React from "react";
import AdminSettingsClient from "@/components/admin/AdminSettingsClient";
import { getSessionAdmin } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
import AccessDenied from "@/components/admin/AccessDenied";
import { getWebsiteSettings } from "@/lib/settings";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const admin = await getSessionAdmin();
  if (!hasPermission(admin, "settings")) {
    return <AccessDenied moduleName="Website Settings" />;
  }

  const settings = await getWebsiteSettings();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
          Website & Corporate Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Configure real-time company details, hotlines, and address coordinates stored in the database.
        </p>
      </div>

      <AdminSettingsClient initialSettings={settings} />
    </div>
  );
}
