"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PlusCircle, Edit, Trash2, ExternalLink, Search, CheckCircle2 } from "lucide-react";
import { PropertyItem } from "@/types/property";
import { formatBDTFull } from "@/lib/utils";

interface AdminPropertiesClientProps {
  initialProperties: PropertyItem[];
}

export default function AdminPropertiesClient({
  initialProperties,
}: AdminPropertiesClientProps) {
  const router = useRouter();
  const [properties, setProperties] = useState<PropertyItem[]>(initialProperties);
  const [filterType, setFilterType] = useState<"ALL" | "PLOT" | "FLAT">("ALL");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = properties.filter((item) => {
    if (filterType !== "ALL" && item.propertyType !== filterType) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setProperties((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete property.");
      }
    } catch (e) {
      alert("Error deleting property.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Actions Bar */}
      <div className="bg-white p-5 rounded-2xl border border-[#E2E7E5] shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex p-1 bg-[#F7F8F6] rounded-xl border border-[#E2E7E5]">
            <button
              onClick={() => setFilterType("ALL")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterType === "ALL"
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "text-[#657278] hover:text-[#17232B]"
              }`}
            >
              All ({properties.length})
            </button>
            <button
              onClick={() => setFilterType("PLOT")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterType === "PLOT"
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "text-[#657278] hover:text-[#17232B]"
              }`}
            >
              Plots
            </button>
            <button
              onClick={() => setFilterType("FLAT")}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                filterType === "FLAT"
                  ? "bg-[#006B5B] text-white shadow-xs"
                  : "text-[#657278] hover:text-[#17232B]"
              }`}
            >
              Flats
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#17232B] outline-none"
            />
          </div>
        </div>

        <Link
          href="/admin/properties/new"
          className="bg-[#006B5B] hover:bg-[#004F45] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E2E7E5] shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F7F8F6] border-b border-[#E2E7E5] text-[#657278] font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E7E5]">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-[#F7F8F6] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-[#E2E7E5]">
                        <Image
                          src={item.featuredImage}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-[#17232B] line-clamp-1 max-w-xs font-heading">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-[#657278]">
                          {item.propertyType === "PLOT"
                            ? `${item.plotKatha} Katha | Road: ${item.plotRoadWidth || "40ft"}`
                            : `${item.flatSizeSqft} Sqft | ${item.bedrooms} Bed, ${item.bathrooms} Bath`}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.propertyType === "PLOT"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {item.propertyType}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-[#657278] max-w-[150px] truncate">
                    {item.location}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-[#006B5B] font-heading">
                    {formatBDTFull(item.price)}
                  </td>

                  <td className="py-3.5 px-4">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className={`text-xs font-bold px-2 py-1 rounded border outline-none cursor-pointer ${
                        item.status === "AVAILABLE"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : item.status === "SOLD"
                          ? "bg-rose-50 text-rose-800 border-rose-300"
                          : "bg-amber-50 text-amber-800 border-amber-300"
                      }`}
                    >
                      <option value="AVAILABLE">AVAILABLE</option>
                      <option value="RESERVED">RESERVED</option>
                      <option value="SOLD">SOLD</option>
                      <option value="HIDDEN">HIDDEN</option>
                    </select>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/properties/${item.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#006B5B] hover:bg-slate-100 transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/properties/${item.id}`}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        title="Edit Property"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        disabled={deletingId === item.id}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
