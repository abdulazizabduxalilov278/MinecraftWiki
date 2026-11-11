"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Box, Calendar, Layers, Smartphone, Sparkles, History } from "lucide-react";
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on ESC
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const getEditionLabel = (id: EditionType) => {
    const ed = supportedEditions.find((e) => e.id === id);
    if (!ed) return id;
    if (language === "uz") return ed.labelUz;
    if (language === "ru") return ed.labelRu;
    return ed.labelEn;
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
  const versionsForTab = versionsByEdition[activeTab] || [];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-cyan-400/40 hover:border-cyan-400/70 text-slate-200 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] cursor-pointer text-xs font-bold"
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

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0b1226]/98 backdrop-blur-2xl border border-cyan-500/40 shadow-[0_12px_45px_rgba(0,0,0,0.85)] z-50 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
          {/* Header with Edition Switcher Tabs */}
          <div className="p-3 bg-slate-950/80 border-b border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 font-mono">
                <Box size={13} className="text-cyan-400" />
                {language === "uz"
                  ? "NASHR VA VERSIYA TANLASH"
                  : language === "ru"
                  ? "ВЫБОР ИЗДАНИЯ И ВЕРСИИ"
                  : "SELECT EDITION & VERSION"}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {currentEditionTab.badge}
              </span>
            </div>

            {/* Edition Tabs: Java | Bedrock | Telefon | Klassik */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
              {supportedEditions.map((ed) => {
                const isActive = ed.id === activeTab;
                return (
                  <button
                    key={ed.id}
                    onClick={() => {
                      setActiveTab(ed.id);
                      setEdition(ed.id);
                    }}
                    className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-600/80 to-blue-600/80 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)] border border-cyan-400/40"
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

            {/* Edition Description Bar */}
            <p className="text-[10px] text-slate-400 px-1 italic line-clamp-1">
              {language === "uz"
                ? currentEditionTab.descriptionUz
                : language === "ru"
                ? currentEditionTab.descriptionRu
                : currentEditionTab.descriptionEn}
            </p>
          </div>

          {/* List of Versions for Active Tab */}
          <div className="max-h-80 overflow-y-auto p-1.5 space-y-1">
            {versionsForTab.map((v) => {
              const isSelected = v.id === selectedVersion;
              return (
                <button
                  key={v.id}
                  onClick={() => {
                    setVersion(v.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500/20 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isSelected ? "text-cyan-300" : "text-slate-200"
                        }`}
                      >
                        {v.label}
                      </span>
                      {v.highlightBadge && (
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {v.highlightBadge}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                        <Calendar size={10} />
                        {v.year}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium truncate">
                      {getVersionTitle(v)}
                    </div>
                    {v.descriptionUz && (
                      <div className="text-[10px] text-slate-400/90 truncate mt-0.5">
                        {getVersionDesc(v)}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {getItemsCountLabel(v.itemCount)}
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-cyan-500/30 flex items-center justify-center text-cyan-300">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="px-4 py-2 bg-slate-950/90 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
            <span>
              {language === "uz"
                ? "Dinamik retseptlar va buyumlar filtri"
                : language === "ru"
                ? "Динамические рецепты и фильтр предметов"
                : "Dynamic recipes and item filtering"}
            </span>
            <span className="font-mono text-cyan-400 font-bold">
              {currentVersionInfo.itemCount}{" "}
              {language === "uz" ? "buyum" : language === "ru" ? "предм." : "items"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
