"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import { PropertyItem } from "@/types/property";
import { MapModuleConfig } from "./AdminMapSettingsClient";

interface MapPlotsManagerProps {
  initialPlots: PropertyItem[];
  modules: MapModuleConfig[];
}

export default function MapPlotsManager({ initialPlots, modules }: MapPlotsManagerProps) {
  const [plots, setPlots] = useState<PropertyItem[]>(initialPlots);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<PropertyItem | null>(null);
  
  // Form State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [facing, setFacing] = useState("South Facing");
  const [frontRoad, setFrontRoad] = useState("40 Feet");
  const [description, setDescription] = useState("");
  const [moduleSelect, setModuleSelect] = useState(modules[0]?.id || "");

  const openAddModal = () => {
    setEditingPlot(null);
    setTitle("");
    setPrice("");
    setSize("");
    setStatus("AVAILABLE");
    setFacing("");
    setFrontRoad("");
    setDescription("");
    setModuleSelect(modules[0]?.id || "");
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (plot: any) => {
    setEditingPlot(plot);
    setTitle(plot.title);
    setPrice(plot.price?.toString() || "");
    setSize(plot.plotKatha?.toString() || "");
    setStatus(plot.status || "AVAILABLE");
    setFacing(plot.facing || "");
    setFrontRoad(plot.plotRoadWidth || "");
    setDescription(plot.description || "");
    
    // Find which module it belongs to
    let matchedModuleId = modules[0]?.id || "";
    for (const mod of modules) {
      if (plot.sectorBlock?.toLowerCase().includes((mod.keyword || "").toLowerCase())) {
        matchedModuleId = mod.id;
        break;
      }
    }
    setModuleSelect(matchedModuleId);
    
    setError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this plot button?")) return;
    
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPlots(prev => prev.filter(p => p.id !== id));
      } else {
        alert("Failed to delete plot.");
      }
    } catch (e) {
      alert("Network error.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const selectedModule = modules.find(m => m.id === moduleSelect);
    const keyword = selectedModule?.keyword || "Map Plot";

    const payload = {
      title: title || "Plot",
      propertyType: "PLOT",
      status,
      location: "Map Plot", 
      price: parseFloat(price) || 0,
      description: description || "Detailed description...",
      plotKatha: parseFloat(size) || 0,
      plotRoadWidth: frontRoad,
      facing,
      sectorBlock: keyword,
    };

    try {
      const url = editingPlot ? `/api/properties/${editingPlot.id}` : "/api/properties";
      const method = editingPlot ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        if (editingPlot) {
          setPlots(prev => prev.map(p => p.id === editingPlot.id ? data.data : p));
        } else {
          setPlots([data.data, ...plots]);
        }
        setIsModalOpen(false);
      } else {
        setError(data.error || "Failed to save plot.");
      }
    } catch (err) {
      setError("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Pre-calculate plots per module so we can render them properly
  const getPlotsForModule = (keyword: string) => {
    if (!keyword) return [];
    return plots.filter(p => p.sectorBlock?.toLowerCase().includes(keyword.toLowerCase()));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-[#12262D] uppercase tracking-wide">Manage Plot Buttons</h3>
        <button onClick={openAddModal} disabled={modules.length === 0} className="bg-[#00695C] hover:bg-[#005B50] disabled:bg-slate-300 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Plot Button
        </button>
      </div>

      {modules.length === 0 && (
        <div className="p-8 text-center border border-dashed border-slate-300 rounded-2xl bg-slate-50 text-slate-500 font-medium text-sm">
          No map modules configured yet. Go to "Map Layout & Images" to add one.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod, index) => {
          const modPlots = getPlotsForModule(mod.keyword);
          return (
            <div key={mod.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
                <span className="text-xs font-bold text-[#12262D] uppercase">{mod.title || `Module ${index + 1}`}</span>
                <span className="bg-[#00695C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{modPlots.length}</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
                {modPlots.map((plot, i) => (
                  <div key={plot.id} className="p-3 hover:bg-slate-50 transition-colors flex justify-between items-center">
                    <div>
                      <div className="text-xs font-bold text-[#12262D]">{plot.title || `Plot ${i + 1}`}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{plot.plotKatha} Katha • ৳{plot.price} • {plot.status}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(plot)} className="text-[#00695C] hover:bg-[#00695C]/10 p-1.5 rounded-lg"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(plot.id)} className="text-rose-500 hover:bg-rose-50 p-1.5 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
                {modPlots.length === 0 && <div className="p-6 text-center text-xs text-slate-500 font-medium">No plots added yet.</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-black text-[#12262D] uppercase">
                {editingPlot ? "Edit Plot Details" : "Add New Plot to Map"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1">Place plot on which Map?</label>
                  <select value={moduleSelect} onChange={(e) => setModuleSelect(e.target.value)} className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-xs text-[#12262D] outline-none">
                    {modules.map(m => (
                      <option key={m.id} value={m.id}>{m.title}</option>
                    ))}
                  </select>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1">Internal Name (Optional)</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Plot 1" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-xs text-[#12262D] outline-none" />
                </div>

                <div>
                  <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1">Size (Katha)</label>
                  <input type="number" step="0.5" required value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g. 5" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-xs text-[#12262D] outline-none" />
                </div>
                
                <div>
                  <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-xs text-[#12262D] outline-none">
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="RESERVED">RESERVED</option>
                    <option value="SOLD">SOLD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1">Facing</label>
                  <input type="text" value={facing} onChange={(e) => setFacing(e.target.value)} placeholder="e.g. South" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-xs text-[#12262D] outline-none" />
                </div>
                
                <div>
                  <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1">Front Road Width</label>
                  <input type="text" value={frontRoad} onChange={(e) => setFrontRoad(e.target.value)} placeholder="e.g. 40ft" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-xs text-[#12262D] outline-none" />
                </div>

                <div className="col-span-2">
                  <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1">Price (Numeric BDT)</label>
                  <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 6700000" className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-xs text-[#12262D] outline-none" />
                </div>

                <div className="col-span-2">
                  <label className="block text-[11px] font-black text-[#12262D] uppercase tracking-wider mb-1">Description (for popup)</label>
                  <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2.5 text-xs text-[#12262D] outline-none" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="bg-[#00695C] hover:bg-[#005B50] disabled:bg-slate-400 text-white font-bold py-2 px-6 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-colors">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>{editingPlot ? "Update Details" : "Add to Map"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
