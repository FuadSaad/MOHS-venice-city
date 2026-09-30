"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, ArrowLeft, Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { PropertyItem } from "@/types/property";

interface PropertyFormProps {
  initialData?: PropertyItem;
  isEdit?: boolean;
}

export default function PropertyForm({ initialData, isEdit }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(initialData?.title || "");
  const [propertyType, setPropertyType] = useState<"PLOT" | "FLAT">(
    (initialData?.propertyType as "PLOT" | "FLAT") || "PLOT"
  );
  const [status, setStatus] = useState(initialData?.status || "AVAILABLE");
  const [location, setLocation] = useState(initialData?.location || "Sector 3, MOHS Venice City");
  const [address, setAddress] = useState(initialData?.address || "");
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [overview, setOverview] = useState(initialData?.overview || "");
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? true);
  const [isReady, setIsReady] = useState(initialData?.isReady ?? true);
  const [isCorner, setIsCorner] = useState(initialData?.isCorner ?? false);

  // Plot specific
  const [plotKatha, setPlotKatha] = useState(initialData?.plotKatha ? String(initialData.plotKatha) : "5");
  const [plotRoadWidth, setPlotRoadWidth] = useState(initialData?.plotRoadWidth || "40 Feet");
  const [facing, setFacing] = useState(initialData?.facing || "South Facing");
  const [sectorBlock, setSectorBlock] = useState(initialData?.sectorBlock || "Sector 3, Block B");

  // Flat specific
  const [flatSizeSqft, setFlatSizeSqft] = useState(initialData?.flatSizeSqft ? String(initialData.flatSizeSqft) : "1450");
  const [bedrooms, setBedrooms] = useState(initialData?.bedrooms ? String(initialData.bedrooms) : "3");
  const [bathrooms, setBathrooms] = useState(initialData?.bathrooms ? String(initialData.bathrooms) : "3");
  const [floorNumber, setFloorNumber] = useState(initialData?.floorNumber || "6th Floor");
  const [parkingAvailable, setParkingAvailable] = useState(initialData?.parkingAvailable ?? true);
  const [handoverStatus, setHandoverStatus] = useState(initialData?.handoverStatus || "Ready to Move");

  // Media & Features
  const [featuredImage, setFeaturedImage] = useState(
    initialData?.featuredImage ||
      (propertyType === "PLOT"
        ? "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
        : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80")
  );
  const [featuresText, setFeaturesText] = useState(
    initialData?.features && initialData.features.length > 0
      ? initialData.features.map((f) => f.name).join("\n")
      : "100% Boundary Demarcated\nDirect Road Access\nHigh Elevation Ready Ground\nImmediate Mutation & Registration"
  );
  const [extraImagesText, setExtraImagesText] = useState(
    initialData?.images && initialData.images.length > 0
      ? initialData.images.map((i) => i.url).join("\n")
      : "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80\nhttps://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=80"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !location) {
      setError("Please fill in the title, price, and location.");
      return;
    }

    setLoading(true);
    setError("");

    const featuresArray = featuresText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const imagesArray = extraImagesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      propertyType,
      status,
      location,
      address,
      price: parseFloat(price),
      description,
      overview,
      isFeatured,
      isReady,
      isCorner,
      plotKatha: propertyType === "PLOT" ? parseFloat(plotKatha) : null,
      plotRoadWidth: propertyType === "PLOT" ? plotRoadWidth : null,
      facing,
      sectorBlock: propertyType === "PLOT" ? sectorBlock : null,
      flatSizeSqft: propertyType === "FLAT" ? parseInt(flatSizeSqft) : null,
      bedrooms: propertyType === "FLAT" ? parseInt(bedrooms) : null,
      bathrooms: propertyType === "FLAT" ? parseInt(bathrooms) : null,
      floorNumber: propertyType === "FLAT" ? floorNumber : null,
      parkingAvailable: propertyType === "FLAT" ? parkingAvailable : null,
      handoverStatus: propertyType === "FLAT" ? handoverStatus : null,
      featuredImage,
      features: featuresArray,
      images: imagesArray,
    };

    try {
      const url = isEdit ? `/api/properties/${initialData?.id}` : "/api/properties";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin/properties");
        router.refresh();
      } else {
        setError(data.error || "Failed to save property.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/properties"
          className="text-xs font-bold text-[#657278] hover:text-[#17232B] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Properties List</span>
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#006B5B] hover:bg-[#004F45] disabled:bg-slate-400 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>{isEdit ? "Update Property" : "Publish Property"}</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Basic Info Card */}
      <div className="bg-white p-7 rounded-2xl border border-[#E2E7E5] shadow-soft space-y-5">
        <h3 className="text-base font-bold text-[#17232B] font-heading border-b border-[#E2E7E5] pb-3">
          1. Basic Property Details
        </h3>

        {/* Property Type Toggle */}
        <div>
          <label className="block text-xs font-bold text-[#17232B] uppercase mb-2">
            Property Category <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <button
              type="button"
              onClick={() => setPropertyType("PLOT")}
              className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all text-center ${
                propertyType === "PLOT"
                  ? "bg-[#006B5B] text-white border-[#006B5B] shadow-sm"
                  : "bg-[#F7F8F6] text-[#657278] border-[#E2E7E5] hover:bg-slate-100"
              }`}
            >
              Residential Plot
            </button>
            <button
              type="button"
              onClick={() => setPropertyType("FLAT")}
              className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all text-center ${
                propertyType === "FLAT"
                  ? "bg-[#006B5B] text-white border-[#006B5B] shadow-sm"
                  : "bg-[#F7F8F6] text-[#657278] border-[#E2E7E5] hover:bg-slate-100"
              }`}
            >
              Flat / Apartment
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
            Property Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder={
              propertyType === "PLOT"
                ? "e.g. 5 Katha South-Facing Prime Plot - Sector 3"
                : "e.g. 3 Bedroom Luxury Lake-View Flat - Tower 1"
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-4 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
              Price (BDT Numeric) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 7500000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-4 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
              Availability Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-4 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 outline-none"
            >
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="RESERVED">RESERVED</option>
              <option value="SOLD">SOLD</option>
              <option value="HIDDEN">HIDDEN (Draft)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
              Township Sector / Location <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sector 3, MOHS Venice City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-4 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
              Road / Block Specific Address
            </label>
            <input
              type="text"
              placeholder="e.g. Road 12, Block B, Sector 3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-4 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 outline-none"
            />
          </div>
        </div>

        {/* Checkbox toggles */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#17232B]">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-[#006B5B] accent-[#006B5B]"
            />
            <span>Mark as Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#17232B]">
            <input
              type="checkbox"
              checked={isReady}
              onChange={(e) => setIsReady(e.target.checked)}
              className="w-4 h-4 rounded text-[#006B5B] accent-[#006B5B]"
            />
            <span>Verified Ready Status</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#17232B]">
            <input
              type="checkbox"
              checked={isCorner}
              onChange={(e) => setIsCorner(e.target.checked)}
              className="w-4 h-4 rounded text-[#006B5B] accent-[#006B5B]"
            />
            <span>Corner Plot / Corner Unit</span>
          </label>
        </div>
      </div>

      {/* Category Specific Specs Card */}
      <div className="bg-white p-7 rounded-2xl border border-[#E2E7E5] shadow-soft space-y-5">
        <h3 className="text-base font-bold text-[#17232B] font-heading border-b border-[#E2E7E5] pb-3">
          2. {propertyType === "PLOT" ? "Residential Plot Specifications" : "Flat / Apartment Specifications"}
        </h3>

        {propertyType === "PLOT" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
                Size (Katha)
              </label>
              <input
                type="number"
                step="0.5"
                placeholder="e.g. 5"
                value={plotKatha}
                onChange={(e) => setPlotKatha(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
                Road Width
              </label>
              <input
                type="text"
                placeholder="e.g. 40 Feet"
                value={plotRoadWidth}
                onChange={(e) => setPlotRoadWidth(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
                Facing
              </label>
              <input
                type="text"
                placeholder="e.g. South Facing"
                value={facing}
                onChange={(e) => setFacing(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
                Sector / Block
              </label>
              <input
                type="text"
                placeholder="e.g. Block B"
                value={sectorBlock}
                onChange={(e) => setSectorBlock(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
                Size (Sq Ft)
              </label>
              <input
                type="number"
                placeholder="e.g. 1450"
                value={flatSizeSqft}
                onChange={(e) => setFlatSizeSqft(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                placeholder="e.g. 3"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                placeholder="e.g. 3"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
                Floor Number
              </label>
              <input
                type="text"
                placeholder="e.g. 7th Floor (Apartment 7B)"
                value={floorNumber}
                onChange={(e) => setFloorNumber(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
                Handover Status
              </label>
              <input
                type="text"
                placeholder="e.g. Ready for Handover"
                value={handoverStatus}
                onChange={(e) => setHandoverStatus(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] outline-none"
              />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#17232B]">
                <input
                  type="checkbox"
                  checked={parkingAvailable}
                  onChange={(e) => setParkingAvailable(e.target.checked)}
                  className="w-4 h-4 rounded text-[#006B5B] accent-[#006B5B]"
                />
                <span>Includes Car Parking</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Description & Features Card */}
      <div className="bg-white p-7 rounded-2xl border border-[#E2E7E5] shadow-soft space-y-5">
        <h3 className="text-base font-bold text-[#17232B] font-heading border-b border-[#E2E7E5] pb-3">
          3. Descriptions & Features
        </h3>

        <div>
          <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
            Detailed Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl p-3 text-sm text-[#17232B] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
            Features & Specs (One per line)
          </label>
          <textarea
            rows={4}
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl p-3 text-sm text-[#17232B] outline-none font-mono text-xs"
          />
        </div>
      </div>

      {/* Images Card */}
      <div className="bg-white p-7 rounded-2xl border border-[#E2E7E5] shadow-soft space-y-5">
        <h3 className="text-base font-bold text-[#17232B] font-heading border-b border-[#E2E7E5] pb-3">
          4. Media & Image URLs
        </h3>

        <div>
          <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
            Main Featured Image URL <span className="text-rose-500">*</span>
          </label>
          <input
            type="url"
            required
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-4 py-2.5 text-sm text-[#17232B] outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#17232B] uppercase mb-1">
            Additional Gallery Image URLs (One URL per line)
          </label>
          <textarea
            rows={3}
            value={extraImagesText}
            onChange={(e) => setExtraImagesText(e.target.value)}
            className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl p-3 text-xs text-[#17232B] outline-none font-mono"
          />
        </div>
      </div>

      {/* Bottom Submit */}
      <div className="flex justify-end gap-4">
        <Link
          href="/admin/properties"
          className="px-6 py-3 rounded-xl border border-[#E2E7E5] text-xs font-bold text-[#657278] hover:bg-slate-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#006B5B] hover:bg-[#004F45] disabled:bg-slate-400 text-white text-xs sm:text-sm font-bold px-8 py-3 rounded-xl shadow-md transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Property...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>{isEdit ? "Update Property" : "Publish to Website"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
