import React from "react";
import PropertyForm from "@/components/admin/PropertyForm";
import { getSessionAdmin, hasPermission } from "@/lib/auth";
import AccessDenied from "@/components/admin/AccessDenied";

export default async function NewPropertyPage() {
  const admin = await getSessionAdmin();
  if (!hasPermission(admin, "properties")) {
    return <AccessDenied moduleName="Properties Management" />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
          Add New Property
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Create and publish a verified residential plot or modern apartment listing.
        </p>
      </div>

      <PropertyForm />
    </div>
  );
}
