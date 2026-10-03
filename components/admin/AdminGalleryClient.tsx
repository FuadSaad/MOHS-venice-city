"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Image as ImageIcon, Loader2 } from "lucide-react";
import { GalleryItemType } from "@/types/property";

interface AdminGalleryClientProps {
  initialItems: GalleryItemType[];
}

export default function AdminGalleryClient({ initialItems }: AdminGalleryClientProps) {
  const [items, setItems] = useState<GalleryItemType[]>(initialItems);
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
    }
  };

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
        await fetchItems();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Add New Photo Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E7E5] shadow-soft">
        <h3 className="text-base font-bold text-[#12262D] font-heading mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-[#00695C]" /> Add New Photo
        </h3>

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-[#12262D] mb-1">
              Photo Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sector 3 High Ground"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs text-[#12262D] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12262D] mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs text-[#12262D] outline-none"
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
            <label className="block text-xs font-bold text-[#12262D] mb-1">
              Image URL
            </label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs text-[#12262D] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12262D] mb-1">
              Description (Optional)
            </label>
            <input
              type="text"
              placeholder="Short description..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2 text-xs text-[#12262D] outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#00695C] hover:bg-[#005B50] disabled:bg-slate-400 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
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
              <span className="absolute top-2 left-2 bg-[#00695C] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>
            <div className="p-3">
              <p className="font-bold text-xs text-[#12262D] truncate font-heading">
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
