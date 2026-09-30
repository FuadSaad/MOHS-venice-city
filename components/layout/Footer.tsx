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

export default function Footer() {
  return (
    <footer className="bg-[#004F45] text-white pt-16 pb-10 border-t border-[#006B5B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/95 rounded-xl p-3 inline-block shadow-sm mb-4">
              <div className="relative w-64 h-24">
                <Image
                  src="/images/logo.png"
                  alt="MOHS Venice City"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              MOHS Venice City is a flagship eco-waterfront township located at the
              prestigious Uttara - Purbachal extension. We offer 100% verified
              residential plots and modern architectural flats with guaranteed
              documentation transparency.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-200">
              <ShieldCheck className="w-4 h-4 text-[#C99A3D]" />
              <span>Dedicated strictly to Residential Plots & Living Flats</span>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006B5B] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006B5B] flex items-center justify-center text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006B5B] flex items-center justify-center text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#006B5B] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#C99A3D]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C99A3D]" /> Home
                </Link>
              </li>
              <li>
                <Link href="/plots" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C99A3D]" /> Residential Plots
                </Link>
              </li>
              <li>
                <Link href="/flats" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C99A3D]" /> Modern Flats
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C99A3D]" /> Township Projects
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C99A3D]" /> Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C99A3D]" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#C99A3D]" /> Contact & Enquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Properties Focus */}
          <div>
            <h4 className="text-base font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#C99A3D]">
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
            <h4 className="text-base font-semibold text-white tracking-wide uppercase text-xs mb-4 text-[#C99A3D]">
              Contact Office
            </h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C99A3D] shrink-0 mt-0.5" />
                <span>Uttara - Purbachal Link Road, Sector 3, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C99A3D] shrink-0" />
                <a href="tel:+8801711000000" className="hover:text-white">
                  +880 1711-000000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C99A3D] shrink-0" />
                <a href="mailto:info@mohsvenicecity.com" className="hover:text-white">
                  info@mohsvenicecity.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#C99A3D] shrink-0 mt-0.5" />
                <span>Sat - Thu: 9:00 AM - 7:00 PM (Fri open for site visits)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} MOHS Venice City. All Rights Reserved. "Your Property Partner".</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/admin/login" className="hover:text-[#C99A3D] transition-colors">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
