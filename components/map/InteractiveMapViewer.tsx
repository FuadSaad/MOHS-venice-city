"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapPolygon } from "@/lib/mapPolygons";
import { X, ZoomIn, ZoomOut, Expand } from "lucide-react";

interface InteractiveMapViewerProps {
  imageSrc: string;
  polygons: MapPolygon[];
}

export default function InteractiveMapViewer({ imageSrc, polygons }: InteractiveMapViewerProps) {
  const [selectedPlot, setSelectedPlot] = useState<MapPolygon | null>(null);

  // We are using percentages for SVG so it scales perfectly with the image!
  // The SVG viewBox is set to "0 0 100 100", and points are drawn in percentages (0-100).
  // preserveAspectRatio="none" ensures it stretches to match the image precisely.
  
  return (
    <div className="relative w-full h-[80vh] bg-slate-900 overflow-hidden flex rounded-2xl shadow-2xl border border-slate-700">
      
      {/* Zoom and Pan Wrapper */}
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={10}
        centerOnInit
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Toolbar */}
            <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
              <button onClick={() => zoomIn()} className="bg-white/90 hover:bg-white text-slate-800 p-2 rounded-lg shadow-md transition-colors">
                <ZoomIn className="w-5 h-5" />
              </button>
              <button onClick={() => zoomOut()} className="bg-white/90 hover:bg-white text-slate-800 p-2 rounded-lg shadow-md transition-colors">
                <ZoomOut className="w-5 h-5" />
              </button>
              <button onClick={() => resetTransform()} className="bg-white/90 hover:bg-white text-slate-800 p-2 rounded-lg shadow-md transition-colors">
                <Expand className="w-5 h-5" />
              </button>
            </div>

            <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
              
              {/* THE SINGLE SOURCE OF TRUTH CONTAINER */}
              <div className="relative inline-block select-none" style={{ width: '100%', maxWidth: '2000px' }}>
                
                {/* 1. ORIGINAL BACKGROUND IMAGE (100% unchanged) */}
                <img
                  src={imageSrc}
                  alt="MOHS Venice City Masterplan"
                  className="w-full h-auto block pointer-events-none"
                  draggable={false}
                />

                {/* 2. TRANSPARENT INTERACTIVE SVG OVERLAY */}
                {/* ViewBox 0 0 100 100 with preserveAspectRatio="none" maps to percentage X,Y coordinates */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full z-10"
                >
                  {polygons.map((polygon) => (
                    <polygon
                      key={polygon.id}
                      points={polygon.points}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlot(polygon);
                      }}
                      className={`
                        cursor-pointer transition-all duration-200 stroke-[0.2]
                        ${selectedPlot?.id === polygon.id 
                          ? "fill-[#00695C]/40 stroke-[#00695C] z-20" 
                          : "fill-transparent stroke-transparent hover:fill-[#00695C]/20 hover:stroke-[#005B50] hover:stroke-[0.3]"
                        }
                      `}
                    />
                  ))}
                </svg>
              </div>

            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      {/* Plot Information Panel Overlay */}
      {selectedPlot && (
        <div className="absolute bottom-6 left-6 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 w-72 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-[#12262D]">Plot {selectedPlot.plotId}</h3>
            <button 
              onClick={() => setSelectedPlot(null)}
              className="text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-xs text-slate-500 font-semibold uppercase">Status</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                selectedPlot.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' :
                selectedPlot.status === 'BOOKED' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {selectedPlot.status}
              </span>
            </div>
            
            {selectedPlot.size && (
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs text-slate-500 font-semibold uppercase">Size</span>
                <span className="text-sm font-bold text-slate-800">{selectedPlot.size}</span>
              </div>
            )}
            
            {selectedPlot.type && (
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-xs text-slate-500 font-semibold uppercase">Type</span>
                <span className="text-sm font-bold text-slate-800">{selectedPlot.type}</span>
              </div>
            )}
            
            {selectedPlot.price && (
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs text-slate-500 font-semibold uppercase">Price</span>
                <span className="text-lg font-black text-[#00695C]">{selectedPlot.price}</span>
              </div>
            )}
          </div>
          
          <button className="w-full mt-4 bg-[#00695C] hover:bg-[#005B50] text-white font-bold py-2.5 rounded-xl text-sm transition-colors shadow-md">
            Enquire Now
          </button>
        </div>
      )}
      
    </div>
  );
}
