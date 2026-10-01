import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWidgets from "@/components/layout/FloatingWidgets";
import { getWebsiteSettings } from "@/lib/settings";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getWebsiteSettings();

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWidgets settings={settings} />
    </div>
  );
}
