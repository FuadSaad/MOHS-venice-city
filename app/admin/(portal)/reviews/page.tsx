import React from "react";
import prisma from "@/lib/prisma";
import { ReviewItem } from "@/types/property";

import { getSessionAdmin, hasPermission } from "@/lib/auth";
import AccessDenied from "@/components/admin/AccessDenied";
import AdminReviewsClient from "@/components/admin/AdminReviewsClient";

export const revalidate = 0;

export default async function AdminReviewsPage() {
  const admin = await getSessionAdmin();
  if (!hasPermission(admin, "reviews")) {
    return <AccessDenied moduleName="Customer Reviews" />;
  }

  const reviewsRaw = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  const reviews: ReviewItem[] = JSON.parse(JSON.stringify(reviewsRaw));

  return <AdminReviewsClient initialReviews={reviews} />;
}
