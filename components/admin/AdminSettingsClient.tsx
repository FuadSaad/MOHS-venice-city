"use client";

import React, { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";

export default function AdminSettingsClient() {
  const [saved, setSaved] = useState(false);
  const [companyName, setCompanyName] = useState("MOHS Venice City");
  const [tagline, setTagline] = useState("Your Property Partner | Uttara - Purbachal");
  const [phone, setPhone] = useState("+880 1711-000000");
  const [email, setEmail] = useState("info@mohsvenicecity.com");
  const [address, setAddress] = useState("Uttara - Purbachal Link Road, Sector 3, Dhaka, Bangladesh");
  const [visitingHours, setVisitingHours] = useState("Sat - Thu: 9:00 AM - 7:00 PM (Fri open for site visits)");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl p-7 border border-[#E2E7E5] shadow-soft">
      {saved && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Settings saved successfully!</span>
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
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none"
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
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#12262D] uppercase mb-1">
              Direct Sales Hotline
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#12262D] uppercase mb-1">
              Corporate Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#12262D] uppercase mb-1">
            Site & Corporate Office Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none"
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
            className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-xs text-[#12262D] outline-none"
          />
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="bg-[#00695C] hover:bg-[#005B50] text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
          >
            <Save className="w-4 h-4 text-[#D6A84F]" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
