"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, CheckCircle2, Loader2, User, Phone, Mail } from "lucide-react";

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
  propertyId?: string;
}

export default function SiteVisitModal({
  isOpen,
  onClose,
  propertyTitle,
  propertyId,
}: SiteVisitModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning (10:00 AM - 12:00 PM)");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !preferredDate) {
      setError("Please fill in your name, phone number, and preferred date.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/site-visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          propertyId: propertyId || null,
          preferredDate,
          preferredTime,
          message: message ? `${propertyTitle ? `[Property: ${propertyTitle}] ` : ""}${message}` : propertyTitle || "General Site Visit",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to schedule site visit. Please try again.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again or call our hotline.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setName("");
    setPhone("");
    setEmail("");
    setPreferredDate("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2E7E5] relative">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E2E7E5] bg-[#F5F8F8]">
          <div>
            <h3 className="text-lg font-bold text-[#12262D] font-heading flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#00695C]" />
              Schedule a Site Visit
            </h3>
            <p className="text-xs text-[#657278] mt-0.5">
              {propertyTitle ? `Viewing: ${propertyTitle}` : "Complimentary guided township tour"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#12262D] hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-[#E8F5F3] text-[#00695C] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#00695C]" />
              </div>
              <h4 className="text-xl font-bold text-[#12262D] font-heading">
                Site Visit Request Received!
              </h4>
              <p className="text-sm text-[#657278] max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>. Our relationship manager will call you at{" "}
                <strong>{phone}</strong> to confirm your transport and timing.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-[#00695C] text-white font-bold rounded-xl text-sm hover:bg-[#005B50] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#12262D] mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahbub Hasan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-9 pr-3 py-2 text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#12262D] mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="01711-XXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-9 pr-3 py-2 text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#12262D] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="name@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-9 pr-3 py-2 text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#12262D] mb-1">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#12262D] mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
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

              <div>
                <label className="block text-xs font-semibold text-[#12262D] mb-1">
                  Special Notes / Requirements
                </label>
                <textarea
                  rows={2}
                  placeholder="Need transport from Uttara / specific plot inspection..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl p-3 text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00695C] hover:bg-[#005B50] disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Booking Your Visit...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4 text-[#D6A84F]" />
                    <span>Confirm Site Visit Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
