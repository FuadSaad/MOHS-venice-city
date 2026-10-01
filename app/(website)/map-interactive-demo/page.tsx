import React from "react";
import InteractiveMapDemoClient from "@/components/map/InteractiveMapDemoClient";

export const metadata = {
  title: "Interactive Map Layout | MOHS Venice City",
  description: "View the masterplan and interactive plot selection layout.",
};

export default function MapInteractiveDemoPage() {
  return (
    <div className="w-full">
      <InteractiveMapDemoClient />
    </div>
  );
}
