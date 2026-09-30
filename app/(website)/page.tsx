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

      {/* Interest-Free Ecosystem Banner with Water Wave Animation */}
      <div className="relative overflow-hidden bg-[#00695C] text-white py-3 sm:py-4 text-center text-sm sm:text-base font-bold tracking-wide border-y border-[#005B50]">
        {/* Animated Water Wave Layers */}
        <div className="absolute inset-0 w-[200%] h-full flex opacity-20 animate-slide-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[50%] h-full fill-white">
            <path d="M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[50%] h-full fill-white">
            <path d="M0,60 C150,100 350,20 600,60 C850,100 1050,20 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
        
        <div className="absolute inset-0 w-[200%] h-full flex opacity-10 animate-slide-wave-slow">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[50%] h-full fill-white">
            <path d="M0,60 C150,20 350,100 600,60 C850,20 1050,100 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-[50%] h-full fill-white">
            <path d="M0,60 C150,20 350,100 600,60 C850,20 1050,100 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>

        <span className="relative z-10 drop-shadow-md">An Interest-Free Business Ecosystem</span>
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
