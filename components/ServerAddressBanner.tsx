"use client";

import React, { useState } from "react";
import { Copy, Check, Server, Wifi, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ServerAddressBannerProps {
  variant?: "compact" | "full";
}

export default function ServerAddressBanner({ variant = "full" }: ServerAddressBannerProps) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const SERVER_IP = "mc-dex.vercel.app";

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleCopy}
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/40 hover:border-emerald-400 text-slate-200 hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer group text-xs font-mono font-bold"
        title={language === "uz" ? "Server IP manzilidan nusxa olish" : "Copy Server IP Address"}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-emerald-300 font-extrabold">{SERVER_IP}</span>
        {copied ? (
          <span className="text-[10px] text-emerald-300 font-sans flex items-center gap-1 font-bold">
            <Check size={12} className="stroke-[3]" />
            {language === "uz" ? "Nusxalandi!" : language === "ru" ? "Скопировано!" : "Copied!"}
          </span>
        ) : (
          <Copy size={12} className="text-emerald-400 opacity-60 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-emerald-950/30 via-[#0e1f3a]/80 to-[#121c38]/90 border border-emerald-500/35 backdrop-blur-2xl shadow-[0_15px_45px_rgba(16,185,129,0.15)] overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-10">
          {/* Left: Server Info */}
          <div className="flex items-center gap-4 text-left w-full md:w-auto">
            <div className="relative w-14 h-14 rounded-2xl bg-[#09152a] border border-cyan-400/60 flex items-center justify-center p-1.5 shadow-[0_0_25px_rgba(6,182,212,0.45)] flex-shrink-0 group overflow-hidden">
              <img
                src="/icon.png"
                alt="MC-DEX Server"
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.7)] group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  24/7 ONLINE SERVER
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Wifi size={12} className="text-emerald-400" />
                  12ms Ping
                </span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  Java: 25565 · Bedrock: 19132
                </span>
              </div>

              <div className="text-lg sm:text-xl font-black text-white flex items-center gap-2 font-mono">
                <span className="text-emerald-300 drop-shadow">{SERVER_IP}</span>
                <span className="text-xs font-normal text-slate-400 font-sans">
                  ({language === "uz" ? "Barcha versiyalar 1.12 - 1.21+" : "All versions 1.12 - 1.21+"})
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                {language === "uz"
                  ? "O'zbekistondagi doimiy 24/7 ishlovchi rasmiy server. Java (PC) va Bedrock / Telefon orqali ulanishingiz mumkin."
                  : language === "ru"
                  ? "Официальный сервер проекта MinecraftWiki.uz с круглосуточной работой 24/7. Поддержка Java и Bedrock / MCPE."
                  : "Official 24/7 persistent Minecraft server for PC Java and Mobile Bedrock editions."}
              </p>
            </div>
          </div>

          {/* Right: One-Click Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full md:w-auto px-6 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg flex-shrink-0 ${
              copied
                ? "bg-emerald-500 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.7)]"
                : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.55)] border border-emerald-400/40"
            }`}
          >
            {copied ? (
              <>
                <Check size={18} className="stroke-[3]" />
                <span>{language === "uz" ? "IP NUSXALANDI!" : language === "ru" ? "СКОПИРОВАНО!" : "IP COPIED!"}</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>{language === "uz" ? "SERVER IP NUSXA OLISH" : language === "ru" ? "СКОПИРОВАТЬ IP" : "COPY SERVER IP"}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
