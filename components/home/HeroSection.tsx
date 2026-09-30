"use client";

import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full aspect-video sm:aspect-auto sm:h-[52vh] sm:min-h-[400px] sm:max-h-[500px] flex items-center bg-[#12262D] overflow-hidden">
      {/* Background Video with subtle dark overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  );
}
