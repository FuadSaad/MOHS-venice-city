"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Calendar,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Building,
} from "lucide-react";

export default function ContactClient() {
  const [activeTab, setActiveTab] = useState<"ENQUIRY" | "VISIT">("ENQUIRY");

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [propertyType, setPropertyType] = useState("PLOT");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("Morning (10:00 AM - 12:00 PM)");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setError("Please fill in your name and phone number.");
      return;
    }

    if (activeTab === "VISIT" && !visitDate) {
      setError("Please choose your preferred date for the site visit.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const endpoint = activeTab === "VISIT" ? "/api/site-visits" : "/api/contact";
      const payload =
        activeTab === "VISIT"
          ? {
              name,
              phone,
              email,
              preferredDate: visitDate,
              preferredTime: visitTime,
              message: message ? `[Site Visit Request] ${message}` : "Site visit request from Contact page",
            }
          : {
              name,
              phone,
              email,
              propertyType,
              preferredLocation,
              budget,
              message,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setVisitDate("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left: Contact Info & Address */}
      <div className="lg:col-span-5 space-y-8">
        <div className="bg-white rounded-2xl p-7 sm:p-8 border border-[#E2E7E5] shadow-soft space-y-6">
          <div>
            <span className="text-xs font-bold text-[#006B5B] uppercase tracking-wider">
              HEAD OFFICE & SITE PAVILION
            </span>
            <h2 className="text-2xl font-extrabold text-[#17232B] font-heading mt-1">
              Contact MOHS Venice City
            </h2>
            <p className="text-sm text-[#657278] mt-2">
              Our site offices are open 7 days a week for prospective buyers and plot owners.
            </p>
          </div>

          <div className="space-y-5 text-sm text-[#17232B]">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F1] text-[#006B5B] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#17232B] font-heading">Site Office Address</p>
                <p className="text-xs sm:text-sm text-[#657278] mt-0.5 leading-relaxed">
                  Sector 3, Main Boulevard, MOHS Venice City, Uttara - Purbachal Link Road, Dhaka.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F1] text-[#006B5B] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#17232B] font-heading">Direct Hotline</p>
                <p className="text-xs sm:text-sm text-[#657278] mt-0.5">
                  <a href="tel:+8801711000000" className="text-[#006B5B] font-bold hover:underline">
                    +880 1711-000000
                  </a>{" "}
                  (Sales & Verification)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F1] text-[#006B5B] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#17232B] font-heading">Email Address</p>
                <p className="text-xs sm:text-sm text-[#657278] mt-0.5">
                  <a href="mailto:info@mohsvenicecity.com" className="text-[#006B5B] font-bold hover:underline">
                    info@mohsvenicecity.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5F1] text-[#006B5B] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-[#17232B] font-heading">Visiting Hours</p>
                <p className="text-xs sm:text-sm text-[#657278] mt-0.5 leading-relaxed">
                  Saturday - Thursday: 9:00 AM – 7:00 PM
                  <br />
                  <span className="text-emerald-700 font-semibold">Friday: Open for Guided Site Tours</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Free Transport Notice */}
        <div className="p-6 bg-[#17232B] text-white rounded-2xl shadow-soft space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-[#C99A3D]" />
            Complimentary Transport Service
          </div>
          <p className="text-sm font-bold font-heading">
            Need Free Pick & Drop from Uttara?
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            We provide complimentary AC vehicle transport from Uttara Sector 3 and
            House Building to our project site for families wanting to inspect plots.
          </p>
        </div>
      </div>

      {/* Right: Interactive Form Tabbed (General Enquiry vs Site Visit) */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-7 sm:p-9 border border-[#E2E7E5] shadow-soft">
        {/* Tab switch */}
        <div className="flex rounded-xl bg-[#F7F8F6] p-1 border border-[#E2E7E5] mb-6">
          <button
            type="button"
            onClick={() => {
              setActiveTab("ENQUIRY");
              setSuccess(false);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "ENQUIRY"
                ? "bg-[#006B5B] text-white shadow-xs"
                : "text-[#657278] hover:text-[#17232B]"
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Property Enquiry</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("VISIT");
              setSuccess(false);
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              activeTab === "VISIT"
                ? "bg-[#006B5B] text-white shadow-xs"
                : "text-[#657278] hover:text-[#17232B]"
            }`}
          >
            <Calendar className="w-4 h-4 text-[#C99A3D]" />
            <span>Schedule Site Visit</span>
          </button>
        </div>

        {success ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-[#E8F5F1] text-[#006B5B] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-[#006B5B]" />
            </div>
            <h3 className="text-2xl font-bold text-[#17232B] font-heading">
              {activeTab === "VISIT" ? "Site Visit Booked!" : "Enquiry Received!"}
            </h3>
            <p className="text-sm text-[#657278] max-w-md mx-auto">
              Thank you, <strong>{name}</strong>. Our senior consultant has received your
              request and will contact you at <strong>{phone}</strong> today.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 bg-[#006B5B] text-white font-bold rounded-xl text-sm hover:bg-[#004F45] transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17232B] mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mahfuzur Rahman"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17232B] mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="01711-XXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#17232B] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17232B] mb-1">
                  Property Category
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
                >
                  <option value="PLOT">Residential Plot (Katha)</option>
                  <option value="FLAT">Flat / Apartment (Sq Ft)</option>
                  <option value="ANY">Both Plots & Flats</option>
                </select>
              </div>
            </div>

            {/* Visit specific fields */}
            {activeTab === "VISIT" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#E8F5F1]/50 border border-[#006B5B]/20">
                <div>
                  <label className="block text-xs font-semibold text-[#004F45] mb-1">
                    Preferred Visit Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-white border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#004F45] mb-1">
                    Time Slot
                  </label>
                  <select
                    value={visitTime}
                    onChange={(e) => setVisitTime(e.target.value)}
                    className="w-full bg-white border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 outline-none"
                  >
                    <option value="Morning (10:00 AM - 12:00 PM)">
                      Morning (10:00 AM - 12:00 PM)
                    </option>
                    <option value="Afternoon (02:00 PM - 04:00 PM)">
                      Afternoon (02:00 PM - 04:00 PM)
                    </option>
                    <option value="Late Afternoon (04:00 PM - 06:00 PM)">
                      Late Afternoon (04:00 PM - 06:00 PM)
                    </option>
                  </select>
                </div>
              </div>
            )}

            {/* Enquiry specific fields */}
            {activeTab === "ENQUIRY" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17232B] mb-1">
                    Preferred Sector / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sector 3, Lake View, VIP Zone"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17232B] mb-1">
                    Target Budget
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ৳ 60 Lakh - ৳ 90 Lakh"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3.5 py-2.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#17232B] mb-1">
                Your Message / Specific Question
              </label>
              <textarea
                rows={4}
                placeholder="Ask about available plots, boundary demarcation, installment plans, or legal khatiyans..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl p-3.5 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#006B5B] hover:bg-[#004F45] disabled:bg-slate-400 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : activeTab === "VISIT" ? (
                <>
                  <Calendar className="w-4 h-4 text-[#C99A3D]" />
                  <span>Confirm Site Visit Tour</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#C99A3D]" />
                  <span>Submit Property Enquiry</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
