"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LayoutList, BookOpen, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BrochureViewerProps {
  pages: string[];
  pdfUrl?: string;
}

export default function BrochureViewer({ pages, pdfUrl = "#" }: BrochureViewerProps) {
  const [viewMode, setViewMode] = useState<"SCROLL" | "BOOK">("SCROLL");
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(p => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  return (
    <div className="max-w-5xl mx-auto w-full">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-[#E2E7E5] shadow-sm">
        <div className="flex items-center gap-2 bg-[#F5F8F8] p-1.5 rounded-xl border border-[#E2E7E5]">
          <button
            onClick={() => setViewMode("SCROLL")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              viewMode === "SCROLL"
                ? "bg-[#00695C] text-white shadow-sm"
                : "text-[#657278] hover:text-[#12262D]"
            }`}
          >
            <LayoutList className="w-4 h-4" />
            Scroll View
          </button>
          <button
            onClick={() => setViewMode("BOOK")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              viewMode === "BOOK"
                ? "bg-[#00695C] text-white shadow-sm"
                : "text-[#657278] hover:text-[#12262D]"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Book View
          </button>
        </div>

        <a 
          href="/images/brochure/1.jpg" // Ideally a PDF link, but this is a placeholder
          download="MOHS_Venice_City_Brochure.pdf"
          className="flex items-center gap-2 text-[#00695C] hover:text-[#005B50] font-bold text-sm px-4 py-2 rounded-lg hover:bg-[#E8F5F3] transition-colors"
          onClick={(e) => { e.preventDefault(); alert("PDF Download will be available soon!"); }}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </a>
      </div>

      {/* Viewer Content */}
      <div className="w-full bg-[#12262D] rounded-2xl overflow-hidden shadow-2xl border border-[#12262D]/20 min-h-[500px]">
        {viewMode === "SCROLL" ? (
          <div className="flex flex-col w-full h-full p-4 sm:p-8 space-y-8 bg-[#E8F5F3]/10">
            {pages.map((src, idx) => (
              <div key={idx} className="w-full relative shadow-lg rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={src}
                  alt={`Brochure Page ${idx + 1}`}
                  width={1200}
                  height={1600}
                  className="w-full h-auto object-contain bg-white"
                  unoptimized
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="relative w-full aspect-[3/4] sm:aspect-auto sm:h-[80vh] flex items-center justify-center bg-[#E8F5F3]/10 p-4 sm:p-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="relative w-full h-full max-w-full max-h-full shadow-2xl border border-white/20">
                  <Image
                    src={pages[currentPage]}
                    alt={`Brochure Page ${currentPage + 1}`}
                    fill
                    className="object-contain bg-white"
                    unoptimized
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Book Controls */}
            <div className="absolute inset-x-0 bottom-4 sm:bottom-8 flex items-center justify-center gap-4 z-10 pointer-events-none">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-white/90 text-[#12262D] shadow-lg backdrop-blur hover:bg-[#00695C] hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white/90 disabled:hover:text-[#12262D]"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="pointer-events-auto px-4 py-2 rounded-full bg-white/90 text-[#12262D] font-bold shadow-lg backdrop-blur text-sm">
                Page {currentPage + 1} of {pages.length}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
                className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full bg-white/90 text-[#12262D] shadow-lg backdrop-blur hover:bg-[#00695C] hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-white/90 disabled:hover:text-[#12262D]"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
