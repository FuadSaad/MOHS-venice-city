"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  Landmark,
  Wallet,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"PLOT" | "FLAT">("PLOT");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [plotKatha, setPlotKatha] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("type", activeTab.toLowerCase());
    if (location) params.set("location", location);
    if (budget) params.set("budget", budget);
    if (activeTab === "PLOT" && plotKatha) params.set("katha", plotKatha);
    if (activeTab === "FLAT" && bedrooms) params.set("beds", bedrooms);

    if (activeTab === "PLOT") {
      router.push(`/plots?${params.toString()}`);
    } else {
      router.push(`/flats?${params.toString()}`);
    }
  };

  return (
    <section className="relative w-full aspect-video flex items-center bg-[#12262D] overflow-hidden">
      {/* Background Video with optimized dark green overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 scale-100"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
    </section>
  );
}
