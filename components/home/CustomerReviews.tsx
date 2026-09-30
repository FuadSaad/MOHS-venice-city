import React from "react";
import Image from "next/image";
import { Star, MessageSquareQuote, CheckCircle2 } from "lucide-react";
import { ReviewItem } from "@/types/property";

interface CustomerReviewsProps {
  reviews: ReviewItem[];
}

export default function CustomerReviews({ reviews }: CustomerReviewsProps) {
  return (
    <section className="py-16 sm:py-24 bg-[#F5F8F8] border-b border-[#E2E7E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#12262D] font-heading tracking-tight">
            Trusted by Property Buyers
          </h2>
          <p className="text-sm sm:text-base text-[#657278] mt-2">
            Read firsthand experiences from homeowners and land investors who have
            secured their plots and apartments with MOHS Venice City.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-7 border border-[#E2E7E5] shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between relative"
            >
              <div className="absolute top-6 right-6 text-[#E8F5F3]">
                <MessageSquareQuote className="w-10 h-10 text-[#00695C]/20" />
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#D6A84F] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D6A84F]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-[#12262D] leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#E2E7E5] flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-[#E2E7E5]">
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
                  <h4 className="text-sm font-bold text-[#12262D] font-heading">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-[#657278]">{rev.roleOrLocation}</p>
                  {rev.propertyPurchased && (
                    <p className="text-[11px] font-semibold text-[#00695C] mt-0.5">
                      Purchased: {rev.propertyPurchased}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
