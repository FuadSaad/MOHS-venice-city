import React from "react";
import { Metadata } from "next";
import InteractiveMapViewer from "@/components/map/InteractiveMapViewer";

export const metadata: Metadata = {
  title: "Interactive Property Map | MOHS Venice City",
  description:
    "Explore the official masterplan of MOHS Venice City interactively. View and select available residential plots, modern apartments, and community amenities in real-time.",
};

export default function InteractiveMapPage() {
  return <InteractiveMapViewer />;
}
