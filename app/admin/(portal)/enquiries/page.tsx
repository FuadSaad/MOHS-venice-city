import React from "react";
import prisma from "@/lib/prisma";
import AdminEnquiriesClient from "@/components/admin/AdminEnquiriesClient";
import { EnquiryItem } from "@/types/property";

import { getSessionAdmin, hasPermission } from "@/lib/auth";
import AccessDenied from "@/components/admin/AccessDenied";

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const admin = await getSessionAdmin();
  if (!hasPermission(admin, "enquiries")) {
    return <AccessDenied moduleName="Client Enquiries" />;
  }

  const enquiriesRaw = await prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      property: { select: { title: true, slug: true } },
    },
  });

  const enquiries: EnquiryItem[] = JSON.parse(JSON.stringify(enquiriesRaw));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
          Prospective Buyer Enquiries
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Review incoming leads, customer inquiries, and budget specifications.
        </p>
      </div>

      <AdminEnquiriesClient initialEnquiries={enquiries} />
    </div>
  );
}
