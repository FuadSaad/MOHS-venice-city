"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Image as ImageIcon, Loader2, Trash2 } from "lucide-react";
import { GalleryItemType } from "@/types/property";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("PLOTS");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, imageUrl, caption }),
      });
      if (res.ok) {
        setTitle("");
        setImageUrl("");
        setCaption("");
        fetchItems();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#17232B] font-heading">
          Photo Gallery Management
        </h1>
        <p className="text-xs sm:text-sm text-[#657278] mt-1">
          Upload and manage photos for residential plots, apartments, canal waterways, and amenities.
        </p>
      </div>

      {/* Add New Photo Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E7E5] shadow-soft">
        <h3 className="text-base font-bold text-[#17232B] font-heading mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#006B5B]" /> Add New Photo
        </h3>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-[#17232B] mb-1">
              Photo Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sector 3 High Ground"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs text-[#17232B] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17232B] mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs text-[#17232B] outline-none"
            >
              <option value="PROJECTS">Masterplan</option>
              <option value="PLOTS">Residential Plots</option>
              <option value="FLATS">Flats / Apartments</option>
              <option value="AMENITIES">Amenities</option>
              <option value="LOCATION">Location & Canals</option>
              <option value="CONSTRUCTION">Civil Construction</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17232B] mb-1">
              Image URL
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs text-[#17232B] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#006B5B] hover:bg-[#004F45] disabled:bg-slate-400 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            {submitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            <span>Add to Gallery</span>
          </button>
        </form>
      </div>

      {/* Gallery Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-[#E2E7E5] overflow-hidden shadow-xs relative group"
          >
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
              <span className="absolute top-2 left-2 bg-[#006B5B] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>
            <div className="p-3">
              <p className="font-bold text-xs text-[#17232B] truncate font-heading">
                {item.title}
              </p>
              {item.caption && (
                <p className="text-[11px] text-[#657278] truncate mt-0.5">{item.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
