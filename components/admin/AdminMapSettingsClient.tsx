"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon } from "lucide-react";
import { WebsiteSettingsData } from "@/lib/settings";

interface AdminMapSettingsClientProps {
  initialSettings: WebsiteSettingsData;
}

export default function AdminMapSettingsClient({ initialSettings }: AdminMapSettingsClientProps) {
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
    <div className="bg-white rounded-2xl p-7 border border-[#E2E7E5] shadow-soft max-w-4xl">
      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Interactive Map settings saved successfully!</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Module 1 */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2 mb-4">
            <h3 className="text-sm font-black text-[#12262D] uppercase tracking-wide flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#00695C]" />
              Map Module 1 Configuration
            </h3>
            <p className="text-[10px] text-slate-500 font-medium mt-1">Configure the first map image, titles, and filtering keyword.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Background Map Image URL</label>
              <input type="url" required value={map1Image} onChange={(e) => setMap1Image(e.target.value)} className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Module Title</label>
              <input type="text" required value={map1Title} onChange={(e) => setMap1Title(e.target.value)} placeholder="e.g. Sector 1" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Module Subtitle / Zone</label>
              <input type="text" required value={map1Subtitle} onChange={(e) => setMap1Subtitle(e.target.value)} placeholder="e.g. Corporate & Commercial Zone" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Filtering Keyword (Sector / Block matches this to show here)</label>
              <input type="text" required value={map1Keyword} onChange={(e) => setMap1Keyword(e.target.value)} placeholder="e.g. Sector 1" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]" />
            </div>
          </div>
        </div>

        {/* Module 2 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="border-b border-slate-200 pb-2 mb-4">
            <h3 className="text-sm font-black text-[#12262D] uppercase tracking-wide flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#00695C]" />
              Map Module 2 Configuration
            </h3>
            <p className="text-[10px] text-slate-500 font-medium mt-1">Configure the second map image, titles, and filtering keyword.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Background Map Image URL</label>
              <input type="url" required value={map2Image} onChange={(e) => setMap2Image(e.target.value)} className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Module Title</label>
              <input type="text" required value={map2Title} onChange={(e) => setMap2Title(e.target.value)} placeholder="e.g. Sector 2" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Module Subtitle / Zone</label>
              <input type="text" required value={map2Subtitle} onChange={(e) => setMap2Subtitle(e.target.value)} placeholder="e.g. Premium Residential Zone" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Filtering Keyword (Sector / Block matches this to show here)</label>
              <input type="text" required value={map2Keyword} onChange={(e) => setMap2Keyword(e.target.value)} placeholder="e.g. Sector 2" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]" />
            </div>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#00695C] hover:bg-[#005B50] disabled:bg-slate-400 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#D6A84F]" />
            ) : (
              <Save className="w-4 h-4 text-[#D6A84F]" />
            )}
            <span>{loading ? "Saving Map Data..." : "Save Map Settings"}</span>
          </button>
        </div>
      </form>
      
      {/* Help block */}
      <div className="mt-8 p-5 bg-[#F5F8F8] rounded-xl border border-[#E2E7E5]">
        <h4 className="text-xs font-bold text-[#12262D] mb-2">How do I add Plot Buttons to the map?</h4>
        <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
          The interactive plots (buttons) are pulled automatically from your <strong>Properties</strong> database. To add a new plot button:
        </p>
        <ol className="list-decimal pl-4 text-[11px] text-slate-600 space-y-1.5 font-medium">
          <li>Go to <strong>Add Property</strong> in the sidebar.</li>
          <li>Select <strong>Residential Plot</strong> as the Property Category.</li>
          <li>Fill out the size, price, availability status, and description.</li>
          <li>In the <strong>Sector / Block</strong> or <strong>Location</strong> field, include the filtering keyword you set above (e.g. <code>Sector 1</code> or <code>Sector 2</code>). The system will automatically place the plot button in the correct map module!</li>
        </ol>
      </div>
    </div>
  );
}
