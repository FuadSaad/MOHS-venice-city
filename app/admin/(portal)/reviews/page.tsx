import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";
import { ReviewItem } from "@/types/property";

export const revalidate = 0;

export default async function AdminReviewsPage() {
  const reviewsRaw = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
  });

  const reviews: ReviewItem[] = JSON.parse(JSON.stringify(reviewsRaw));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#12262D] font-heading">
          Customer Reviews & Testimonials
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Verified reviews displayed on the homepage trust section.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 border border-[#E2E7E5] shadow-soft flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-[#D6A84F] mb-3">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D6A84F]" />
                ))}
              </div>
              <p className="text-xs text-[#12262D] italic leading-relaxed mb-4">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#E2E7E5] flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-[#E2E7E5]">
                <Image
                  src={
                    rev.avatarUrl ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  }
                  alt={rev.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-[#12262D] font-heading">{rev.name}</p>
                <p className="text-[11px] text-[#657278]">{rev.roleOrLocation}</p>
                {rev.propertyPurchased && (
                  <p className="text-[10px] text-[#00695C] font-semibold">
                    {rev.propertyPurchased}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
