"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, Map as MapIcon, SlidersHorizontal, Plus, Trash2 } from "lucide-react";
import { WebsiteSettingsData } from "@/lib/settings";
import MapPlotsManager from "./MapPlotsManager";
import { PropertyItem } from "@/types/property";

interface AdminMapSettingsClientProps {
  initialSettings: WebsiteSettingsData;
  plots: PropertyItem[];
}

export interface MapModuleConfig {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  keyword: string;
}

export default function AdminMapSettingsClient({ initialSettings, plots }: AdminMapSettingsClientProps) {
  const [activeTab, setActiveTab] = useState<"CONFIG" | "PLOTS">("CONFIG");

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modules, setModules] = useState<MapModuleConfig[]>([]);
  const [editingModules, setEditingModules] = useState<number[]>([]);

  const toggleEdit = (index: number) => {
    if (editingModules.includes(index)) {
      setEditingModules(editingModules.filter((i) => i !== index));
    } else {
      setEditingModules([...editingModules, index]);
    }
  };

  useEffect(() => {
    try {
      if (initialSettings.mapModulesJson) {
        setModules(JSON.parse(initialSettings.mapModulesJson));
      } else {
        // Fallback to legacy structure if mapModulesJson is empty
        setModules([
          {
            id: "1",
            image: initialSettings.map1Image,
            title: initialSettings.map1Title,
            subtitle: initialSettings.map1Subtitle,
            keyword: initialSettings.map1Keyword,
          },
          {
            id: "2",
            image: initialSettings.map2Image,
            title: initialSettings.map2Title,
            subtitle: initialSettings.map2Subtitle,
            keyword: initialSettings.map2Keyword,
          }
        ]);
      }
    } catch (e) {
      setModules([]);
    }
  }, [initialSettings]);

  const handleModuleChange = (index: number, field: keyof MapModuleConfig, value: string) => {
    const newModules = [...modules];
    newModules[index] = { ...newModules[index], [field]: value };
    setModules(newModules);
  };

  const addModule = () => {
    const newId = Date.now().toString();
    const newIndex = modules.length;
    setModules([
      ...modules, 
      { id: newId, image: "", title: `New Module ${newIndex + 1}`, subtitle: "", keyword: "" }
    ]);
    setEditingModules([...editingModules, newIndex]);
  };

  const removeModule = (index: number) => {
    if (confirm("Are you sure you want to remove this map module?")) {
      const newModules = [...modules];
      newModules.splice(index, 1);
      setModules(newModules);
    }
  };

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
          mapModulesJson: JSON.stringify(modules)
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
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {modules.map((mod, index) => (
              <div key={mod.id} className="relative">
                
                <div className="flex flex-col xl:flex-row gap-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-200 relative group shadow-sm h-full">
                  <button type="button" onClick={() => removeModule(index)} className="absolute -top-3 -left-3 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-500 border border-slate-200 hover:border-rose-200 p-2 rounded-full shadow-sm transition-all opacity-0 group-hover:opacity-100 z-20">
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Edit Button at absolute top-right of the card */}
                  {!editingModules.includes(index) && (
                    <div className="absolute -top-3 right-4 z-10">
                      <button type="button" onClick={() => toggleEdit(index)} className="bg-[#12262D] hover:bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm border border-slate-200 transition-colors">
                        Edit Module
                      </button>
                    </div>
                  )}
                  {editingModules.includes(index) && (
                    <div className="absolute -top-3 right-4 z-10">
                      <button type="button" onClick={() => toggleEdit(index)} className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold px-4 py-1.5 rounded-full shadow-sm border border-emerald-200 transition-colors">
                        Done Editing
                      </button>
                    </div>
                  )}

                  {/* Preview side */}
                  <div className="w-full xl:w-[220px] shrink-0 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-2 pr-20">
                      <div className="w-8 h-8 rounded-lg bg-[#00695C] text-white flex items-center justify-center font-black text-sm shadow-sm">{index + 1}</div>
                      <div>
                        <h3 className="text-sm font-black text-[#12262D] uppercase tracking-wide">Module {index + 1}</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase truncate">{mod.title || "Untitled"}</p>
                      </div>
                    </div>
                    <div className="aspect-[3/4] w-full bg-white rounded-xl border border-slate-200 shadow-inner overflow-hidden relative flex items-center justify-center">
                      {mod.image ? (
                        <img src={mod.image} alt={`Map ${index + 1} Preview`} className="w-full h-full object-contain p-2" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-300" />
                      )}
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Form side */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start pt-10 xl:pt-0">
                    <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Background Map Image URL</label>
                    <input type="text" required disabled={!editingModules.includes(index)} value={mod.image} onChange={(e) => handleModuleChange(index, "image", e.target.value)} placeholder="/images/map-interactive.jpg" className="w-full bg-white disabled:bg-slate-100 disabled:text-slate-500 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#12262D] outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Module Title</label>
                    <input type="text" required disabled={!editingModules.includes(index)} value={mod.title} onChange={(e) => handleModuleChange(index, "title", e.target.value)} placeholder="e.g. Sector 1" className="w-full bg-white disabled:bg-slate-100 disabled:text-slate-500 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#12262D] outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] transition-all shadow-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Module Subtitle / Zone</label>
                    <input type="text" required disabled={!editingModules.includes(index)} value={mod.subtitle} onChange={(e) => handleModuleChange(index, "subtitle", e.target.value)} placeholder="e.g. Corporate Zone" className="w-full bg-white disabled:bg-slate-100 disabled:text-slate-500 border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#12262D] outline-none focus:border-[#00695C] focus:ring-1 focus:ring-[#00695C] transition-all shadow-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1.5">Filtering Keyword</label>
                    <input type="text" required disabled={!editingModules.includes(index)} value={mod.keyword} onChange={(e) => handleModuleChange(index, "keyword", e.target.value)} placeholder="e.g. Sector 1" className="w-full bg-emerald-50/50 disabled:bg-slate-100 disabled:text-slate-500 border border-emerald-200 disabled:border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-emerald-900 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all shadow-sm" />
                    <p className="text-[10px] text-emerald-600 mt-1.5 font-bold">Properties with this word in their "Sector/Block" will appear on this map.</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>

          <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={addModule}
              className="bg-slate-100 hover:bg-slate-200 text-[#12262D] font-bold py-3.5 px-6 rounded-xl text-sm flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Map Module</span>
            </button>

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
          <MapPlotsManager initialPlots={plots} modules={modules} />
        </div>
      )}
    </div>
  );
}
