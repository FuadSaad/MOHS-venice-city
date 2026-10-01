import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  ArrowRight,
} from "lucide-react";
import { getWebsiteSettings } from "@/lib/settings";

export default async function Footer() {
  const settings = await getWebsiteSettings();
  return (
    <footer className="bg-[#005B50] text-white pt-16 pb-10 border-t border-[#00695C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 rounded-xl p-3 inline-block shadow-sm mb-4">
              <div className="relative w-64 h-24">
                <Image
                  src="/images/logo.png"
                  alt={settings.companyName}
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              {settings.companyName} is a flagship eco-waterfront township located at the
              prestigious Uttara - Purbachal extension. We offer 100% verified
              residential plots and modern architectural flats with guaranteed
              documentation transparency.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
              <span>Dedicated strictly to Residential Plots & Living Flats</span>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#00695C] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#00695C] flex items-center justify-center text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#00695C] flex items-center justify-center text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#00695C] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#D6A84F]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D6A84F]" /> Home
                </Link>
              </li>
              <li>
                <Link href="/plots" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D6A84F]" /> Residential Plots
                </Link>
              </li>
              <li>
                <Link href="/flats" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D6A84F]" /> Modern Flats
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D6A84F]" /> Township Projects
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D6A84F]" /> Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D6A84F]" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#D6A84F]" /> Contact & Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Properties Focus */}
          <div>
            <h4 className="text-base font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#D6A84F]">
              Our Properties
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/plots?katha=3" className="hover:text-white transition-colors">
                  3 Katha Ready Plots
                </Link>
              </li>
              <li>
                <Link href="/plots?katha=5" className="hover:text-white transition-colors">
                  5 Katha Lakeside Plots
                </Link>
              </li>
              <li>
                <Link href="/plots?katha=10" className="hover:text-white transition-colors">
                  10 Katha VIP Corner Plots
                </Link>
              </li>
              <li>
                <Link href="/flats?beds=3" className="hover:text-white transition-colors">
                  3 Bedroom Luxury Apartments
                </Link>
              </li>
              <li>
                <Link href="/flats?beds=4" className="hover:text-white transition-colors">
                  4 Bedroom Signature Penthouses
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  Featured Verified Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h4 className="text-base font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#D6A84F]">
              Contact Office
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, "")}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6A84F] shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D6A84F] shrink-0 mt-0.5" />
                <span>{settings.visitingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>&copy; {new Date().getFullYear()} {settings.companyName}. All Rights Reserved. &quot;{settings.tagline}&quot;.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/admin/login" className="hover:text-[#D6A84F] transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
