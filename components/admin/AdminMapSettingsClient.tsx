"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, Map as MapIcon, SlidersHorizontal } from "lucide-react";
import { WebsiteSettingsData } from "@/lib/settings";
import MapPlotsManager from "./MapPlotsManager";
import { PropertyItem } from "@/types/property";

interface AdminMapSettingsClientProps {
  initialSettings: WebsiteSettingsData;
  plots: PropertyItem[];
}

export default function AdminMapSettingsClient({ initialSettings, plots }: AdminMapSettingsClientProps) {
  const [activeTab, setActiveTab] = useState<"CONFIG" | "PLOTS">("CONFIG");

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map 1 Settings
  const [map1Image, setMap1Image] = useState(initialSettings.map1Image);
  const [map1Title, setMap1Title] = useState(initialSettings.map1Title);
  const [map1Subtitle, setMap1Subtitle] = useState(initialSettings.map1Subtitle);
  const [map1Keyword, setMap1Keyword] = useState(initialSettings.map1Keyword);

  // Map 2 Settings
  const [map2Image, setMap2Image] = useState(initialSettings.map2Image);
  const [map2Title, setMap2Title] = useState(initialSettings.map2Title);
  const [map2Subtitle, setMap2Subtitle] = useState(initialSettings.map2Subtitle);
  const [map2Keyword, setMap2Keyword] = useState(initialSettings.map2Keyword);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          map1Image, map1Title, map1Subtitle, map1Keyword,
          map2Image, map2Title, map2Subtitle, map2Keyword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      } else {
        setError(data.error || "Failed to save map settings.");
      }
    } catch (err: any) {
      setError("Network error occurred while saving settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Custom Tabs */}
      <div className="flex bg-white rounded-xl p-1.5 border border-slate-200 shadow-sm w-max">
        <button 
          onClick={() => setActiveTab("CONFIG")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === "CONFIG" 
              ? "bg-[#12262D] text-white shadow-md" 
              : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Map Layout & Images
        </button>
        <button 
          onClick={() => setActiveTab("PLOTS")}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === "PLOTS" 
              ? "bg-[#12262D] text-white shadow-md" 
              : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          <MapIcon className="w-4 h-4" />
          Manage Plot Buttons
        </button>
      </div>

      {activeTab === "CONFIG" ? (
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm relative animate-in fade-in slide-in-from-bottom-2 duration-300">
        
        {/* Status Messages */}
        <div className="absolute top-6 right-6 z-10 flex flex-col gap-2">
          {saved && (
            <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 shadow-lg animate-in slide-in-from-top-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Settings saved!</span>
            </div>
          )}
          {error && (
            <div className="px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 shadow-lg animate-in slide-in-from-top-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-10">
          
          {/* Module 1 */}
          <div className="flex flex-col lg:flex-row gap-8 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            {/* Preview side */}
            <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#00695C] text-white flex items-center justify-center font-black text-sm shadow-sm">1</div>
                <div>
                  <h3 className="text-sm font-black text-[#12262D] uppercase tracking-wide">Module 1</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{map1Title || "Untitled"}</p>
                </div>
              </div>
              <div className="aspect-[3/4] w-full bg-white rounded-xl border border-slate-200 shadow-inner overflow-hidden relative flex items-center justify-center">
                {map1Image ? (
                  <img src={map1Image} alt="Map 1 Preview" className="w-full h-full object-contain p-2" onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none"></div>
              </div>
            </div>
            
            {/* Form side */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 content-start">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Background Map Image URL</label>
                <input type="url" required value={map1Image} onChange={(e) => setMap1Image(e.target.value)} placeholder="/images/map-interactive.jpg" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#12262D] outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] transition-all shadow-sm" />
                <p className="text-[10px] text-slate-500 mt-1.5 font-medium">Link to the high-resolution map image (local path or external URL).</p>
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Module Title</label>
                <input type="text" required value={map1Title} onChange={(e) => setMap1Title(e.target.value)} placeholder="e.g. Sector 1" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#12262D] outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] transition-all shadow-sm" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Module Subtitle / Zone</label>
                <input type="text" required value={map1Subtitle} onChange={(e) => setMap1Subtitle(e.target.value)} placeholder="e.g. Corporate & Commercial Zone" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#12262D] outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] transition-all shadow-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Filtering Keyword</label>
                <input type="text" required value={map1Keyword} onChange={(e) => setMap1Keyword(e.target.value)} placeholder="e.g. Sector 1" className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-4 py-3 text-sm font-bold text-emerald-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm" />
                <p className="text-[10px] text-emerald-600 mt-1.5 font-bold">Properties with this word in their "Sector/Block" will appear on this map.</p>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Module 2 */}
          <div className="flex flex-col lg:flex-row gap-8 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            {/* Preview side */}
            <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#00695C] text-white flex items-center justify-center font-black text-sm shadow-sm">2</div>
                <div>
                  <h3 className="text-sm font-black text-[#12262D] uppercase tracking-wide">Module 2</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{map2Title || "Untitled"}</p>
                </div>
              </div>
              <div className="aspect-[3/4] w-full bg-white rounded-xl border border-slate-200 shadow-inner overflow-hidden relative flex items-center justify-center">
                {map2Image ? (
                  <img src={map2Image} alt="Map 2 Preview" className="w-full h-full object-contain p-2" onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none"></div>
              </div>
            </div>
            
            {/* Form side */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 content-start">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Background Map Image URL</label>
                <input type="url" required value={map2Image} onChange={(e) => setMap2Image(e.target.value)} placeholder="/images/map-interactive-2.jpg" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#12262D] outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] transition-all shadow-sm" />
                <p className="text-[10px] text-slate-500 mt-1.5 font-medium">Link to the high-resolution map image (local path or external URL).</p>
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Module Title</label>
                <input type="text" required value={map2Title} onChange={(e) => setMap2Title(e.target.value)} placeholder="e.g. Sector 2" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#12262D] outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] transition-all shadow-sm" />
              </div>
              <div>
                <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Module Subtitle / Zone</label>
                <input type="text" required value={map2Subtitle} onChange={(e) => setMap2Subtitle(e.target.value)} placeholder="e.g. Premium Residential Zone" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#12262D] outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] transition-all shadow-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Filtering Keyword</label>
                <input type="text" required value={map2Keyword} onChange={(e) => setMap2Keyword(e.target.value)} placeholder="e.g. Sector 2" className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl px-4 py-3 text-sm font-bold text-emerald-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm" />
                <p className="text-[10px] text-emerald-600 mt-1.5 font-bold">Properties with this word in their "Sector/Block" will appear on this map.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#12262D] hover:bg-[#00695C] disabled:bg-slate-400 text-white font-bold py-3.5 px-8 rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-[#00695C]/20 transition-all hover:-translate-y-0.5"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-[#D6A84F]" />
              ) : (
                <Save className="w-5 h-5 text-[#D6A84F]" />
              )}
              <span>{loading ? "Saving Changes..." : "Save All Map Settings"}</span>
            </button>
          </div>
        </form>
      </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <MapPlotsManager initialPlots={plots} map1Keyword={map1Keyword} map2Keyword={map2Keyword} />
        </div>
      )}
    </div>
  );
}
