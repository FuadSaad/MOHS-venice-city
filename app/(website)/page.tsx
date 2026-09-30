import React from "react";
import prisma from "@/lib/prisma";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProjectOverview from "@/components/home/ProjectOverview";
import MapSection from "@/components/home/MapSection";
import CustomerReviews from "@/components/home/CustomerReviews";
import CtaBanner from "@/components/home/CtaBanner";
import { PropertyItem, ReviewItem } from "@/types/property";

export const revalidate = 0; // Fresh dynamic data

export default async function HomePage() {
  const propertiesRaw = await prisma.property.findMany({
    where: {
      status: { not: "HIDDEN" },
    },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      features: true,
      project: { select: { id: true, title: true, slug: true } },
    },
    orderBy: [
      { isFeatured: "desc" },
      { createdAt: "desc" },
    ],
  });

  const reviewsRaw = await prisma.review.findMany({
    where: { isApproved: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const properties: PropertyItem[] = JSON.parse(JSON.stringify(propertiesRaw));
  const reviews: ReviewItem[] = JSON.parse(JSON.stringify(reviewsRaw));

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with Floating Search */}
      <HeroSection />

      {/* Interest-Free Ecosystem Banner */}
      <div className="bg-[#00695C] text-white py-3 text-center text-sm sm:text-base font-semibold tracking-wide border-y border-[#005B50]">
        An Interest-Free Business Ecosystem
      </div>

      {/* 6. Location & Layout Map Interactive Showcase */}
      <MapSection />

      {/* 2. Quick Statistics Bar */}
      <StatsSection />

      {/* 3. Featured Properties (Plots & Flats with instant filters) */}
      <FeaturedProperties initialProperties={properties} />

      {/* 4. Why Choose MOHS Venice City */}
      <WhyChooseUs />

      {/* 5. Master Township Overview & Highlights */}
      <ProjectOverview />

      {/* 7. Client Reviews & Testimonials */}
      <CustomerReviews reviews={reviews} />

      {/* 8. Conversion CTA Banner */}
      <CtaBanner />
    </div>
  );
}
