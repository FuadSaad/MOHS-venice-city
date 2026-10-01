"use client";

import React, { useState, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { WebsiteSettingsData } from "@/lib/settings";

export default function FloatingWidgets({ settings }: { settings?: WebsiteSettingsData | null }) {
  const [lang, setLang] = useState("EN");
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    // Inject Google Translate Script
    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate globally
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,bn", autoDisplay: false },
        "google_translate_element"
      );
    };

    // Check which language is active from the cookie
    const cookies = document.cookie;
    if (cookies.includes("googtrans=/en/bn")) {
      setLang("BN");
    } else {
      setLang("EN");
    }
  }, []);

  const waNumber = settings?.phone ? settings.phone.replace(/[^0-9+]/g, '') : "8801711000000";

  const toggleLangMenu = () => {
    setShowLangMenu(!showLangMenu);
  };

  const selectLang = (selected: string) => {
    setLang(selected);
    setShowLangMenu(false);
    
    // Set google translate cookie and reload
    const langCode = selected === "BN" ? "bn" : "en";
    
    // Fallback cookie setting
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=` + window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; path=/`;

    // The robust way: trigger the hidden google translate dropdown without reloading
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else {
      // If widget hasn't loaded yet, reload the page to apply the cookie
      window.location.reload();
    }
  };

  return (
    <>
      <div id="google_translate_element" className="hidden"></div>
      
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[90] flex flex-col gap-4 items-end">
        {/* Language Toggle Widget */}
        <div className="relative">
          {/* Dropdown Menu */}
          <div 
            className={`absolute bottom-full right-0 mb-4 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden w-36 transition-all duration-300 origin-bottom-right ${
              showLangMenu ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="bg-[#F5F8F8] px-4 py-2 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Language</span>
            </div>
            <button 
              onClick={() => selectLang("EN")}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold hover:bg-slate-50 transition-colors text-slate-800"
            >
              <span>English (EN)</span>
              {lang === "EN" && <Check className="w-4 h-4 text-emerald-500" />}
            </button>
            <button 
              onClick={() => selectLang("BN")}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold hover:bg-slate-50 transition-colors text-slate-800 border-t border-slate-50"
            >
              <span>বাংলা (BN)</span>
              {lang === "BN" && <Check className="w-4 h-4 text-emerald-500" />}
            </button>
          </div>

          {/* Floating Button */}
          <button 
            onClick={toggleLangMenu}
            className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#00695C] rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100"
          >
            {/* Subtle pulse animation for language button */}
            <div className="absolute inset-[-4px] rounded-full border-2 border-[#00695C]/20 animate-ping" style={{ animationDuration: '3s' }}></div>
            
            <Globe className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:rotate-45" />
            
            <div className="absolute -top-1 -right-1 bg-[#00695C] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-sm">
              {lang}
            </div>
          </button>
        </div>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Contact us on WhatsApp"
          className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Continuous Pulse Animation */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
          
          {/* WhatsApp SVG Icon */}
          <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10 transition-transform group-hover:scale-110">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </a>
      </div>
    </>
  );
}
