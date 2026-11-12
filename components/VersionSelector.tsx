"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Check,
  Box,
  Calendar,
  Layers,
  Search,
  X,
  Info,
} from "lucide-react";
import { useVersion } from "@/context/VersionContext";
import { useLanguage } from "@/context/LanguageContext";
import { EditionType, VersionInfo } from "@/data/versionRegistry";

export default function VersionSelector() {
  const {
    selectedVersion,
    selectedEdition,
    setVersion,
    setEdition,
    supportedEditions,
    currentVersionInfo,
    currentEditionInfo,
    versionsByEdition,
  } = useVersion();
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<EditionType>(selectedEdition);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync active tab whenever selectedEdition changes
  useEffect(() => {
    setActiveTab(selectedEdition);
  }, [selectedEdition]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const getVersionTitle = (v: VersionInfo) => {
    if (language === "uz") return v.titleUz;
    if (language === "ru") return v.titleRu;
    return v.titleEn;
  };

  const getVersionDesc = (v: VersionInfo) => {
    if (language === "uz") return v.descriptionUz;
    if (language === "ru") return v.descriptionRu;
    return v.descriptionEn;
  };

  const getEditionShort = (id: EditionType) => {
    if (id === "java") return "Java";
    if (id === "bedrock") return "Bedrock";
    if (id === "mcpe") return language === "uz" ? "Telefon" : language === "ru" ? "MCPE" : "Mobile";
    return language === "uz" ? "Klassik" : language === "ru" ? "Классика" : "Classic";
  };

  const getItemsCountLabel = (count: number) => {
    if (language === "uz") return `${count} ta buyum`;
    if (language === "ru") return `${count} предм.`;
    return `${count} items`;
  };

  const currentEditionTab = supportedEditions.find((e) => e.id === activeTab) || supportedEditions[0];
  const rawVersions = versionsByEdition[activeTab] || [];

  // Filter versions by search query
  const filteredVersions = rawVersions.filter((v) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      v.label.toLowerCase().includes(q) ||
      v.id.toLowerCase().includes(q) ||
      v.year.toString().includes(q) ||
      (v.titleUz && v.titleUz.toLowerCase().includes(q)) ||
      (v.titleRu && v.titleRu.toLowerCase().includes(q)) ||
      (v.titleEn && v.titleEn.toLowerCase().includes(q))
    );
  });

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* ── 1. NAVBAR TRIGGER BUTTON ── */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090f1f] hover:bg-[#121c38] border border-cyan-400/50 hover:border-cyan-300 text-slate-200 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.25)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] cursor-pointer text-xs font-bold"
        title={t("versionSelector")}
      >
        <span className="text-sm select-none">{currentEditionInfo.icon}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-cyan-300 font-extrabold font-mono tracking-tight">
          {currentVersionInfo.label}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── 2. MOTION BLUR BACKDROP OVERLAY (ORQA FONNI XIRALASHTIRISH) ── */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ── 3. NATURAL DROPDOWN MENU DIRECTLY UNDER TRIGGER BUTTON ── */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-[#0a1022] border-2 border-cyan-500/60 shadow-[0_20px_70px_rgba(0,0,0,0.98)] z-40 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
          {/* Header with Edition Switcher Tabs */}
          <div className="p-3 bg-[#070b18] border-b border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-mono">
                <Box size={13} className="text-cyan-400" />
                {language === "uz"
                  ? "NASHR VA VERSIYA TANLASH"
                  : language === "ru"
                  ? "ВЫБОР ИЗДАНИЯ И ВЕРСИИ"
                  : "SELECT EDITION & VERSION"}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                title="Yopish"
              >
                <X size={14} />
              </button>
            </div>

            {/* Edition Tabs: Java | Bedrock | Telefon | Klassik */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-[#050812] rounded-xl border border-white/5">
              {supportedEditions.map((ed) => {
                const isActive = ed.id === activeTab;
                return (
                  <button
                    key={ed.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(ed.id);
                      setEdition(ed.id);
                    }}
                    className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)] border border-cyan-400/50"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    <span className="text-sm mb-0.5">{ed.icon}</span>
                    <span className="truncate w-full text-center leading-tight">
                      {getEditionShort(ed.id)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search Bar */}
            <div className="relative pt-0.5">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === "uz" ? "Versiya qidirish (masalan, 1.21)..." : "Поиск версии..."}
                className="w-full pl-7 pr-3 py-1 bg-[#050812] border border-cyan-500/30 focus:border-cyan-400 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          {/* List of Versions for Active Tab (100% Solid Opaque Background) */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1.5 bg-[#0a1022] scrollbar-thin scrollbar-thumb-cyan-500/20">
            {filteredVersions.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                {language === "uz" ? "Mos versiya topilmadi" : "Версия не найдена"}
              </div>
            ) : (
              filteredVersions.map((v) => {
                const isSelected = v.id === selectedVersion;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setVersion(v.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-gradient-to-r from-cyan-950/90 to-[#0e2242] border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400"
                        : "bg-[#0e162c] hover:bg-[#14203f] border-white/10 hover:border-cyan-500/40 text-slate-200"
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isSelected ? "text-cyan-300" : "text-white"
                          }`}
                        >
                          {v.label}
                        </span>
                        {v.highlightBadge && (
                          <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-mono">
                            {v.highlightBadge}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 flex items-center gap-0.5 font-mono">
                          <Calendar size={10} className="text-slate-500" />
                          {v.year}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-300 truncate">
                        {getVersionTitle(v)}
                      </div>
                      {v.descriptionUz && (
                        <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                          {getVersionDesc(v)}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#050812] text-cyan-300 border border-cyan-500/30 font-bold">
                        {getItemsCountLabel(v.itemCount)}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Info */}
          <div className="px-3.5 py-2 bg-[#070b18] border-t border-cyan-500/20 flex items-center justify-between text-[11px] text-slate-400">
            <span className="truncate">
              {language === "uz"
                ? "Dinamik retseptlar va buyumlar filtri"
                : language === "ru"
                ? "Фильтр предметов и рецептов"
                : "Dynamic recipes & item filter"}
            </span>
            <span className="font-mono text-cyan-300 font-bold flex-shrink-0 ml-2">
              {currentVersionInfo.itemCount}{" "}
              {language === "uz" ? "buyum" : "items"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
