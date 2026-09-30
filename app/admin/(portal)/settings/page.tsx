import React from "react";
import AdminSettingsClient from "@/components/admin/AdminSettingsClient";
import { getSessionAdmin, hasPermission } from "@/lib/auth";
import AccessDenied from "@/components/admin/AccessDenied";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const admin = await getSessionAdmin();
  if (!hasPermission(admin, "settings")) {
    return <AccessDenied moduleName="Website Settings" />;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
          Website & Corporate Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Configure public company details, hotlines, and address coordinates.
        </p>
      </div>

      <AdminSettingsClient />
    </div>
  );
}
