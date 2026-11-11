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
  Sparkles,
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

  // Sync active tab whenever selectedEdition changes
  useEffect(() => {
    setActiveTab(selectedEdition);
  }, [selectedEdition]);

  // Close on ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Prevent background scrolling while version modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
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
    if (id === "java") return "Java (PC)";
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
    <>
      {/* ── 1. NAVBAR TRIGGER BUTTON ── */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
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

      {/* ── 2. MODAL & SOLID OVERLAY (ORQASI MUTLAQO XALAQIT BERMAYDI) ── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Dimmed Dark Backdrop: dims and blurs background hero so nothing clashes */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Solid Opaque Modal Container (Zero Transparency / Zero Bleed-Through) */}
          <div className="relative w-full max-w-2xl bg-[#0b1122] border-2 border-cyan-500/60 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.98)] overflow-hidden z-10 text-slate-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[#070b16] border-b border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <Box size={20} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white tracking-wide flex items-center gap-2">
                    <span>
                      {language === "uz"
                        ? "MINECRAFT NASHR VA VERSIYA TANLASH"
                        : language === "ru"
                        ? "ВЫБОР ИЗДАНИЯ И ВЕРСИИ MINECRAFT"
                        : "SELECT MINECRAFT EDITION & VERSION"}
                    </span>
                  </h3>
                  <p className="text-[11px] text-cyan-400 font-mono mt-0.5">
                    {language === "uz"
                      ? "Har bir versiya uchun unikal retseptlar, buyumlar va mexanikalar"
                      : language === "ru"
                      ? "Уникальные рецепты, предметы и механики для выбранной версии"
                      : "Unique crafting recipes, items and mechanics for the chosen version"}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
                title="Yopish (ESC)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Edition Selector Tabs: Java | Bedrock | Telefon | Klassik */}
            <div className="p-3 sm:p-4 bg-[#090e1d] border-b border-white/10 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                      className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                          : "bg-[#0c1429] text-slate-300 hover:text-white hover:bg-[#121c3b] border-white/10"
                      }`}
                    >
                      <span className="text-xl">{ed.icon}</span>
                      <div className="text-left min-w-0">
                        <div className="font-extrabold truncate leading-tight">
                          {getEditionShort(ed.id)}
                        </div>
                        <div className="text-[10px] text-cyan-200/80 font-mono font-normal">
                          {ed.badge}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Edition description & Quick Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                <p className="text-xs text-slate-300 italic flex items-center gap-1.5">
                  <Info size={14} className="text-cyan-400 flex-shrink-0" />
                  <span>
                    {language === "uz"
                      ? currentEditionTab.descriptionUz
                      : language === "ru"
                      ? currentEditionTab.descriptionRu
                      : currentEditionTab.descriptionEn}
                  </span>
                </p>

                {/* Filter Search Input */}
                <div className="relative flex-shrink-0 sm:w-48">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === "uz" ? "Versiya qidirish..." : "Поиск версии..."}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#060a14] border border-cyan-500/30 focus:border-cyan-400 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Version List (100% Solid Opaque Background, High Contrast) */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 bg-[#0b1122]">
              {filteredVersions.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  {language === "uz"
                    ? "Mos keluvchi versiya topilmadi"
                    : "Подходящая версия не найдена"}
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
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-gradient-to-r from-cyan-950/90 to-[#0e2242] border-cyan-400 text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400"
                          : "bg-[#0e162c] hover:bg-[#14203f] border-white/10 hover:border-cyan-500/40 text-slate-200"
                      }`}
                    >
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                          <span
                            className={`font-mono text-sm font-black ${
                              isSelected ? "text-cyan-300" : "text-white"
                            }`}
                          >
                            {v.label}
                          </span>
                          {v.highlightBadge && (
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 font-mono">
                              {v.highlightBadge}
                            </span>
                          )}
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                            <Calendar size={12} className="text-slate-500" />
                            {v.year}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-200 truncate">
                          {getVersionTitle(v)}
                        </div>
                        {v.descriptionUz && (
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {getVersionDesc(v)}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#070b16] text-cyan-300 border border-cyan-500/30 font-bold">
                          {getItemsCountLabel(v.itemCount)}
                        </span>
                        {isSelected && (
                          <div className="flex items-center gap-1 text-[11px] font-bold text-cyan-300">
                            <Check size={14} className="stroke-[3] text-cyan-400" />
                            <span>TANLANGAN</span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Summary */}
            <div className="px-5 py-3 bg-[#070b16] border-t border-cyan-500/20 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles size={13} className="text-cyan-400" />
                <span>
                  {language === "uz"
                    ? "Tanlangan versiya bo'yicha ma'lumotlar avtomatik yangilanadi"
                    : language === "ru"
                    ? "Данные обновляются автоматически для выбранной версии"
                    : "Data automatically updates for selected version"}
                </span>
              </span>
              <span className="font-mono text-cyan-300 font-extrabold">
                {currentVersionInfo.itemCount}{" "}
                {language === "uz" ? "ta buyum" : "items"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
