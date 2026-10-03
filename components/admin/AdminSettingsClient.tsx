"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { WebsiteSettingsData } from "@/lib/settings";

interface AdminSettingsClientProps {
  initialSettings: WebsiteSettingsData;
}

export default function AdminSettingsClient({ initialSettings }: AdminSettingsClientProps) {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [companyName, setCompanyName] = useState(initialSettings.companyName);
  const [tagline, setTagline] = useState(initialSettings.tagline);
  
  // Parse existing comma-separated phones or default to one empty string
  const initialPhones = initialSettings.phone 
    ? initialSettings.phone.split(",").map(p => p.trim()).filter(Boolean) 
    : [];
  const [phones, setPhones] = useState<string[]>(initialPhones.length > 0 ? initialPhones : [""]);

  const [email, setEmail] = useState(initialSettings.email);
  const [address, setAddress] = useState(initialSettings.address);
  const [visitingHours, setVisitingHours] = useState(initialSettings.visitingHours);

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
          companyName,
          tagline,
          phone: phones.map(p => p.trim()).filter(Boolean).join(", "),
          email,
          address,
          visitingHours,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      } else {
        setError(data.error || "Failed to save settings to database.");
      }
    } catch (err: any) {
      setError("Network error occurred while saving settings.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...phones];
    newPhones[index] = value;
    setPhones(newPhones);
  };

  const addPhoneField = () => {
    setPhones([...phones, ""]);
  };

  const removePhoneField = (index: number) => {
    if (phones.length > 1) {
      const newPhones = [...phones];
      newPhones.splice(index, 1);
      setPhones(newPhones);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-7 border border-[#E2E7E5] shadow-soft">
      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Settings saved to database and live website updated successfully!</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#12262D] uppercase mb-1">
              Company Brand Name
            </label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12262D] uppercase mb-1">
              Company Tagline / Subtitle
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#12262D] uppercase">
                Direct Sales Hotline(s)
              </label>
              <button
                type="button"
                onClick={addPhoneField}
                className="text-[10px] font-bold text-[#00695C] bg-[#E8F5F3] px-2 py-0.5 rounded-full hover:bg-[#D1EBE7] transition-colors"
              >
                + Add Another
              </button>
            </div>
            <div className="space-y-2">
              {phones.map((p, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required={index === 0}
                    placeholder="+880 1711-000000"
                    value={p}
                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                    className="flex-1 bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]"
                  />
                  {phones.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePhoneField(index)}
                      className="px-3 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                      title="Remove number"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12262D] uppercase mb-1">
              Corporate Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#12262D] uppercase mb-1">
            Site & Corporate Office Address
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#12262D] uppercase mb-1">
            Office & Site Inspection Hours
          </label>
          <input
            type="text"
            value={visitingHours}
            onChange={(e) => setVisitingHours(e.target.value)}
            className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none focus:border-[#00695C]"
          />
        </div>

        <div className="pt-4 flex justify-end">
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
            <span>{loading ? "Saving to Database..." : "Save Configuration"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
