"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@mohs.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Invalid login credentials.");
      }
    } catch (err) {
      setError("An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8F8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo */}
        <div className="relative w-52 h-16 mx-auto mb-4 bg-white rounded-xl p-2 border border-[#E2E7E5] shadow-xs flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="MOHS Venice City"
            fill
            priority
            className="object-contain"
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#12262D] font-heading">
          Management Portal Login
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-[#657278]">
          Sign in to manage plots, flats, enquiries, and site visits
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-[#E2E7E5] shadow-soft">
          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#12262D] mb-1">
                Username or Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin or user@mohs.com"
                  className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-10 pr-3 py-2.5 text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#12262D] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F5F8F8] border border-[#E2E7E5] rounded-xl pl-10 pr-3 py-2.5 text-sm text-[#12262D] focus:ring-2 focus:ring-[#00695C]/30 focus:border-[#00695C] outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00695C] hover:bg-[#005B50] disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
                </>
              )}
            </button>
          </form>

          {/* Helper Credentials Box for Easy Evaluation */}
          <div className="mt-6 pt-5 border-t border-[#E2E7E5] bg-[#E8F5F3] p-3.5 rounded-xl border border-emerald-200/80">
            <p className="text-xs font-bold text-[#005B50] flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#D6A84F]" /> Default Admin Credentials
            </p>
            <div className="text-xs text-[#12262D] space-y-0.5">
              <p>Email: <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[#00695C]">admin@mohs.com</code></p>
              <p>Password: <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[#00695C]">admin123</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
