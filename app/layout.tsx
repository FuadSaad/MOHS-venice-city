import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MOHS Venice City | Your Property Partner | Residential Plots & Flats",
  description:
    "Discover verified residential plots and modern luxury flats in MOHS Venice City, strategically positioned in the Uttara - Purbachal corridor with lakeside living and premium infrastructure.",
  keywords: [
    "MOHS Venice City",
    "Residential Plots Uttara",
    "Purbachal Plots",
    "Flats in Uttara",
    "Real Estate Dhaka",
    "Verified Land Bangladesh",
    "Waterfront Living",
  ],
  authors: [{ name: "MOHS Venice City" }],
  openGraph: {
    title: "MOHS Venice City | Your Property Partner",
    description: "Verified Residential Plots & Modern Flats in Uttara - Purbachal.",
    url: "https://mohsvenicecity.com",
    siteName: "MOHS Venice City",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F7F8F6] text-[#17232B] antialiased">
        {children}
      </body>
    </html>
  );
}
