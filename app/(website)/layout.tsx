import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getWebsiteSettings } from "@/lib/settings";

export default async function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getWebsiteSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
