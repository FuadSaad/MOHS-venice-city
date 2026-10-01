"use client";

import React, { useState, useRef, useEffect } from "react";

export default function MapTracerAdmin({ imageSrc }: { imageSrc: string }) {
  const [points, setPoints] = useState<{x: number, y: number}[]>([]);
  const [savedPolygons, setSavedPolygons] = useState<{id: string, points: string}[]>([]);
  const [plotId, setPlotId] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    
    // Calculate percentage based coordinates
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setPoints([...points, { x, y }]);
  };

  const undoLastPoint = () => {
    setPoints(points.slice(0, -1));
  };

  const clearCurrent = () => {
    setPoints([]);
  };

  const savePolygon = () => {
    if (points.length < 3) {
      alert("A polygon needs at least 3 points!");
      return;
    }
    if (!plotId) {
      alert("Please enter a Plot ID");
      return;
    }

    const pointsString = points.map(p => `${p.x.toFixed(3)},${p.y.toFixed(3)}`).join(" ");
    
    setSavedPolygons([...savedPolygons, { id: plotId, points: pointsString }]);
    setPoints([]);
    setPlotId("");
  };

  const exportJSON = () => {
    const jsonStr = JSON.stringify(savedPolygons, null, 2);
    // Create a blob and download it
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'traced-plots.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Convert current points to a polygon string for live preview
  const currentPolygonString = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      
      {/* Top Toolbar */}
      <div className="bg-slate-800 p-4 flex items-center gap-4 shadow-md z-20">
        <h2 className="font-bold text-xl mr-auto">Map Tracer Admin Tool</h2>
        
        <div className="flex items-center gap-2 bg-slate-700 p-1.5 rounded-lg">
          <input 
            type="text" 
            placeholder="Plot ID (e.g. CP-04)" 
            value={plotId}
            onChange={(e) => setPlotId(e.target.value)}
            className="px-3 py-1.5 rounded bg-slate-800 border border-slate-600 text-sm focus:outline-none focus:border-emerald-500 w-32"
          />
          <button 
            onClick={savePolygon}
            className="bg-emerald-600 hover:bg-emerald-500 px-4 py-1.5 rounded text-sm font-bold transition-colors"
          >
            Save Plot
          </button>
        </div>

        <div className="h-8 w-px bg-slate-700 mx-2"></div>

        <button onClick={undoLastPoint} className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-sm transition-colors">Undo Point</button>
        <button onClick={clearCurrent} className="bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded text-sm transition-colors text-red-400">Clear</button>
        <button onClick={exportJSON} className="bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded text-sm font-bold transition-colors ml-4">Export JSON</button>
      </div>

      {/* Main Workspace (Scrollable) */}
      <div className="flex-1 overflow-auto relative p-8">
        <p className="text-slate-400 text-sm mb-4">
          INSTRUCTIONS: Click on the image corners of a plot to trace it. The coordinates are calculated as precise percentages.
        </p>

        {/* Image Container with SVG Overlay */}
        <div className="relative inline-block border-2 border-slate-700 cursor-crosshair">
          
          <img 
            ref={imageRef}
            src={imageSrc} 
            alt="Trace Map" 
            className="block"
            onClick={handleImageClick}
            draggable={false}
          />
          
          {/* SVG Overlay covering the exact image dimensions */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            {/* Draw previously saved polygons */}
            {savedPolygons.map((poly, idx) => (
              <g key={idx}>
                <polygon 
                  points={poly.points} 
                  className="fill-emerald-500/20 stroke-emerald-500 stroke-[0.1]" 
                />
                {/* Find center of polygon to place text (approximate bounding box center) */}
                <text 
                  x={poly.points.split(' ')[0].split(',')[0]} 
                  y={poly.points.split(' ')[0].split(',')[1]} 
                  className="fill-white text-[0.4px] font-bold"
                  dy="-0.5"
                >
                  {poly.id}
                </text>
              </g>
            ))}

            {/* Draw currently tracing polygon */}
            {points.length > 0 && (
              <>
                <polygon 
                  points={currentPolygonString} 
                  className="fill-blue-500/30 stroke-blue-400 stroke-[0.2]" 
                />
                {/* Draw corner points */}
                {points.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="0.3" className="fill-white" />
                ))}
              </>
            )}
          </svg>

        </div>
      </div>

    </div>
  );
}
