"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SiteVisitModal from "@/components/property/SiteVisitModal";
import { Menu, X, PhoneCall, Calendar, ShieldCheck, User, TrendingUp, ExternalLink, ChevronDown, Map, Building2, FileText, Compass } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setPropertiesOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/" && pathname !== "/") return false;
    return pathname.startsWith(href);
  };

  const isPropertiesActive = isActive('/plots') || isActive('/flats');

  return (
    <>
      <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E7E5]"
          : "bg-white border-b border-[#E2E7E5]"
      }`}
    >
      {/* Top micro bar for trust & quick contact */}
      <div className="bg-[#12262D] text-white/90 text-xs py-1.5 px-4 hidden sm:block border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> An Interest-Free Business Ecosystem • 100% Verified Legal Titles
            </span>
            <span className="text-white/40">|</span>
            <span className="text-slate-300">Uttara - Purbachal Extension, Dhaka</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+8801711000000"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#D6A84F]" />
              <span>Hotline: +880 1711-000000</span>
            </a>

          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 xl:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-44 h-16 sm:w-52 sm:h-20 flex items-center">
              <Image
                src="/images/logo.png"
                alt="MOHS Venice City Logo"
                fill
                priority
                className="object-contain object-left transition-transform group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 2xl:gap-6 shrink-0">
            <Link
              href="/"
              className={`text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors relative py-1 ${
                isActive('/') ? "text-[#00695C] font-semibold" : "text-[#12262D] hover:text-[#00695C]"
              }`}
            >
              Home
              {isActive('/') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00695C] rounded-full" />}
            </Link>

            {/* Properties Dropdown */}
            <div className="relative group">
              <button 
                className={`flex items-center gap-1 text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors relative py-1 ${
                  isPropertiesActive ? "text-[#00695C] font-semibold" : "text-[#12262D] hover:text-[#00695C]"
                }`}
              >
                Properties
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                {isPropertiesActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00695C] rounded-full" />}
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-[280px] z-50">
                <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-2.5 flex flex-col gap-1">
                  <Link 
                    href="/plots" 
                    className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#E8F5F3] group/item transition-colors"
                  >
                    <div className="mt-0.5 bg-[#F5F8F8] group-hover/item:bg-white p-2 rounded-md transition-colors">
                      <Map className="w-5 h-5 text-[#657278] group-hover/item:text-[#00695C] transition-colors" />
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold text-[#12262D] group-hover/item:text-[#00695C] transition-colors">Plots</div>
                      <div className="text-[13px] text-[#657278] mt-0.5">Residential & Commercial Plots</div>
                    </div>
                  </Link>
                  <Link 
                    href="/flats" 
                    className="flex items-start gap-3.5 p-3 rounded-lg hover:bg-[#E8F5F3] group/item transition-colors"
                  >
                    <div className="mt-0.5 bg-[#F5F8F8] group-hover/item:bg-white p-2 rounded-md transition-colors">
                      <Building2 className="w-5 h-5 text-[#657278] group-hover/item:text-[#00695C] transition-colors" />
                    </div>
                    <div>
                      <div className="text-[15px] font-semibold text-[#12262D] group-hover/item:text-[#00695C] transition-colors">Flats</div>
                      <div className="text-[13px] text-[#657278] mt-0.5">Modern Flats & Apartments</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/projects"
              className={`text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors relative py-1 ${
                isActive('/projects') ? "text-[#00695C] font-semibold" : "text-[#12262D] hover:text-[#00695C]"
              }`}
            >
              Projects
              {isActive('/projects') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00695C] rounded-full" />}
            </Link>

            <Link
              href="/interactive-map"
              className={`text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors relative py-1 flex items-center gap-1.5 ${
                isActive('/interactive-map') ? "text-[#00695C] font-semibold" : "text-[#12262D] hover:text-[#00695C]"
              }`}
            >
              <Compass className="w-4 h-4 text-[#D6A84F]" />
              <span>Map</span>
              {isActive('/interactive-map') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00695C] rounded-full" />}
            </Link>

            <Link
              href="/gallery"
              className={`text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors relative py-1 ${
                isActive('/gallery') ? "text-[#00695C] font-semibold" : "text-[#12262D] hover:text-[#00695C]"
              }`}
            >
              Gallery
              {isActive('/gallery') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00695C] rounded-full" />}
            </Link>

            <Link
              href="/brochure"
              className={`text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors relative py-1 flex items-center gap-1.5 ${
                isActive('/brochure') ? "text-[#00695C] font-semibold" : "text-[#12262D] hover:text-[#00695C]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Brochure</span>
              {isActive('/brochure') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00695C] rounded-full" />}
            </Link>

            <Link
              href="/about"
              className={`text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors relative py-1 ${
                isActive('/about') ? "text-[#00695C] font-semibold" : "text-[#12262D] hover:text-[#00695C]"
              }`}
            >
              About Us
              {isActive('/about') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00695C] rounded-full" />}
            </Link>

            <Link
              href="/contact"
              className={`text-[14px] xl:text-[15px] font-medium whitespace-nowrap transition-colors relative py-1 ${
                isActive('/contact') ? "text-[#00695C] font-semibold" : "text-[#12262D] hover:text-[#00695C]"
              }`}
            >
              Contact
              {isActive('/contact') && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00695C] rounded-full" />}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            <a
              href="https://biniyog-club-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] xl:text-[14px] font-bold text-[#00695C] hover:text-[#005B50] bg-[#E8F5F3] hover:bg-emerald-100 border border-[#00695C]/20 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#00695C]" />
              <span>Invest</span>
              <ExternalLink className="w-3 h-3 text-[#00695C]/70" />
            </a>
            <button
              onClick={() => setIsVisitModalOpen(true)}
              className="bg-[#00695C] hover:bg-[#005B50] text-white text-[13px] xl:text-[14px] font-semibold px-3.5 xl:px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-[#D6A84F]" />
              <span>Schedule Site Visit</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="https://biniyog-club-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#E8F5F3] text-[#00695C] border border-[#00695C]/20 text-xs font-bold px-2.5 py-1.5 rounded-md flex items-center gap-1"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Invest</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#12262D] hover:bg-slate-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-[#E2E7E5] px-4 pt-3 pb-6 space-y-3 shadow-lg h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-3 rounded-md text-base font-medium ${
                isActive("/") ? "bg-[#E8F5F3] text-[#00695C] font-semibold" : "text-[#12262D] hover:bg-slate-50"
              }`}
            >
              Home
            </Link>
            
            {/* Mobile Properties Expandable */}
            <div>
              <button 
                onClick={() => setPropertiesOpen(!propertiesOpen)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-md text-base font-medium ${
                  isPropertiesActive ? "bg-[#E8F5F3] text-[#00695C] font-semibold" : "text-[#12262D] hover:bg-slate-50"
                }`}
              >
                <span>Properties</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${propertiesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {propertiesOpen && (
                <div className="pl-6 pr-3 py-2 space-y-1 bg-slate-50/50 rounded-b-md">
                  <Link
                    href="/plots"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                      isActive("/plots") ? "text-[#00695C] font-semibold" : "text-[#657278] hover:text-[#00695C] hover:bg-white"
                    }`}
                  >
                    <Map className="w-4 h-4" />
                    Plots
                  </Link>
                  <Link
                    href="/flats"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                      isActive("/flats") ? "text-[#00695C] font-semibold" : "text-[#657278] hover:text-[#00695C] hover:bg-white"
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    Flats
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-3 rounded-md text-base font-medium ${
                isActive("/projects") ? "bg-[#E8F5F3] text-[#00695C] font-semibold" : "text-[#12262D] hover:bg-slate-50"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/interactive-map"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-3 rounded-md text-base font-medium flex items-center gap-2 ${
                isActive("/interactive-map") ? "bg-[#E8F5F3] text-[#00695C] font-semibold" : "text-[#12262D] hover:bg-slate-50"
              }`}
            >
              <Compass className="w-5 h-5 text-[#D6A84F]" />
              <span>Map</span>
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-3 rounded-md text-base font-medium ${
                isActive("/gallery") ? "bg-[#E8F5F3] text-[#00695C] font-semibold" : "text-[#12262D] hover:bg-slate-50"
              }`}
            >
              Gallery
            </Link>
            <Link
              href="/brochure"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-3 rounded-md text-base font-medium flex items-center gap-2 ${
                isActive("/brochure") ? "bg-[#E8F5F3] text-[#00695C] font-semibold" : "text-[#12262D] hover:bg-slate-50"
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Brochure</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-3 rounded-md text-base font-medium ${
                isActive("/about") ? "bg-[#E8F5F3] text-[#00695C] font-semibold" : "text-[#12262D] hover:bg-slate-50"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-3 rounded-md text-base font-medium ${
                isActive("/contact") ? "bg-[#E8F5F3] text-[#00695C] font-semibold" : "text-[#12262D] hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>
          </nav>
          
          <div className="pt-6 mt-4 border-t border-[#E2E7E5] flex flex-col gap-3">
            <a
              href="https://biniyog-club-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-[15px] font-bold text-[#00695C] hover:text-[#005B50] bg-[#E8F5F3] py-3 rounded-lg border border-[#00695C]/20 flex items-center justify-center gap-2 shadow-xs"
            >
              <TrendingUp className="w-4 h-4 text-[#00695C]" />
              <span>Invest (Biniyog Club)</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00695C]/70" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsVisitModalOpen(true);
              }}
              className="w-full bg-[#00695C] text-white text-center font-medium py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#D6A84F]" />
              <span>Schedule Site Visit</span>
            </button>

          </div>
        </div>
      )}
      </header>

      {/* Site Visit Modal (Moved outside header to fix backdrop-blur containing block issue) */}
      <SiteVisitModal 
        isOpen={isVisitModalOpen} 
        onClose={() => setIsVisitModalOpen(false)} 
      />
    </>
  );
}
