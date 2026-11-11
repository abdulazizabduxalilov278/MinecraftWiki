"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl glass-panel-subtle border border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="pl-1.5 pr-0.5 text-cyan-400/80 hidden sm:block">
        <Globe size={13} />
      </div>

      {/* English Toggle */}
      <button
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          language === "en"
            ? "bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.5)] scale-105"
            : "text-slate-300 hover:text-white hover:bg-white/5"
        }`}
        title="English"
      >
        EN
      </button>

      {/* Russian Toggle */}
      <button
        onClick={() => setLanguage("ru")}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          language === "ru"
            ? "bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(52,211,153,0.5)] scale-105"
            : "text-slate-300 hover:text-white hover:bg-white/5"
        }`}
        title="Русский язык"
      >
        RU
      </button>

      {/* Uzbek Toggle */}
      <button
        onClick={() => setLanguage("uz")}
        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          language === "uz"
            ? "bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.5)] scale-105"
            : "text-slate-300 hover:text-white hover:bg-white/5"
        }`}
        title="O'zbek tili"
      >
        UZ
      </button>
    </div>
  );
}
