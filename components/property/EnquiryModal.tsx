"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, Loader2, Phone, Mail, User, HelpCircle } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
  propertyId?: string;
  propertyType?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  propertyTitle,
  propertyId,
  propertyType,
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setError("Please provide your name and phone number.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          propertyId: propertyId || null,
          propertyType: propertyType || "ANY",
          budget: budget || null,
          message: message ? `${propertyTitle ? `[Regarding: ${propertyTitle}] ` : ""}${message}` : `Inquiry about ${propertyTitle || "properties"}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err: any) {
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
    setBudget("");
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E2E7E5] relative">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E2E7E5] bg-[#F7F8F6]">
          <div>
            <h3 className="text-lg font-bold text-[#17232B] font-heading flex items-center gap-2">
              <Send className="w-4 h-4 text-[#006B5B]" />
              Property Enquiry
            </h3>
            <p className="text-xs text-[#657278] mt-0.5 truncate max-w-sm">
              {propertyTitle ? propertyTitle : "Ask about price, registration, and installment plans"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#17232B] hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-[#E8F5F1] text-[#006B5B] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#006B5B]" />
              </div>
              <h4 className="text-xl font-bold text-[#17232B] font-heading">
                Enquiry Submitted Successfully!
              </h4>
              <p className="text-sm text-[#657278] max-w-sm mx-auto">
                Thank you for your interest. A MOHS Venice City senior sales executive will contact you shortly at <strong>{phone}</strong>.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-[#006B5B] text-white font-bold rounded-xl text-sm hover:bg-[#004F45] transition-colors"
              >
                Done
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
                <label className="block text-xs font-semibold text-[#17232B] mb-1">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Engr. Tanvir"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl pl-9 pr-3 py-2 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17232B] mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="01XXXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl pl-9 pr-3 py-2 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17232B] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="email@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl pl-9 pr-3 py-2 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17232B] mb-1">
                  Budget Expectation
                </label>
                <input
                  type="text"
                  placeholder="e.g. ৳ 50 Lakh - ৳ 80 Lakh"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl px-3 py-2 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17232B] mb-1">
                  Your Message / Query
                </label>
                <textarea
                  rows={3}
                  placeholder="Ask about payment schedules, mutation, land visits, or bank loans..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F7F8F6] border border-[#E2E7E5] rounded-xl p-3 text-sm text-[#17232B] focus:ring-2 focus:ring-[#006B5B]/30 focus:border-[#006B5B] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#006B5B] hover:bg-[#004F45] disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#C99A3D]" />
                    <span>Send Enquiry Now</span>
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
