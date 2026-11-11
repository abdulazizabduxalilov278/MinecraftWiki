"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Sparkles,
  Hammer,
  ShieldAlert,
  Skull,
  Layers,
  Sword,
  FlaskConical,
  Flame,
  Boxes,
  BookOpen,
  ChevronDown,
  MessageCircle,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  Zap,
  Trophy,
  Wand2,
} from "lucide-react";
import { ITEMS, MinecraftItem, TEXTURES } from "@/data/items";
import SearchBar from "@/components/SearchBar";
import ItemCard from "@/components/ItemCard";
import ItemModal from "@/components/ItemModal";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import VersionSelector from "@/components/VersionSelector";
import SafeItemImage from "@/components/SafeItemImage";
import CosmicBackground from "@/components/CosmicBackground";
import ProgressionGuide from "@/components/ProgressionGuide";
import Minecraft3DCube from "@/components/Minecraft3DCube";
import { useLanguage } from "@/context/LanguageContext";
import { useVersion } from "@/context/VersionContext";

const PAGE_SIZE = 36;

export default function HomePage() {
  const { t, getCategoryName, language } = useLanguage();
  const { selectedVersion, currentEditionInfo, isItemInVersion, getItemCountForVersion } = useVersion();
  const [currentView, setCurrentView] = useState<"landing" | "catalog">("landing");
  const [selectedItem, setSelectedItem] = useState<MinecraftItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [isProgressionOpen, setIsProgressionOpen] = useState<boolean>(false);

  const categories = [
    { id: "all", label: getCategoryName("all"), icon: <Layers size={15} /> },
    { id: "blocks", label: getCategoryName("blocks"), icon: <Boxes size={15} /> },
    { id: "potions", label: getCategoryName("potions"), icon: <FlaskConical size={15} /> },
    { id: "weapons_tools", label: getCategoryName("weapons_tools"), icon: <Sword size={15} /> },
    { id: "craftable", label: getCategoryName("craftable"), icon: <Hammer size={15} /> },
    { id: "uncraftable", label: getCategoryName("uncraftable"), icon: <ShieldAlert size={15} /> },
    { id: "mobs", label: getCategoryName("mobs"), icon: <Skull size={15} /> },
    { id: "materials", label: getCategoryName("materials"), icon: <Flame size={15} /> },
  ];

  // Filter items dynamically based on the selected Minecraft version
  const versionItems = useMemo(() => {
    return ITEMS.filter((item) => isItemInVersion(item.id));
  }, [isItemInVersion, selectedVersion]);

  const filteredItems = useMemo(() => {
    setVisibleCount(PAGE_SIZE);
    if (activeTab === "all") return versionItems;
    if (activeTab === "blocks") return versionItems.filter((item) => item.category === "blocks");
    if (activeTab === "potions") return versionItems.filter((item) => item.category === "potions");
    if (activeTab === "craftable") return versionItems.filter((item) => item.isCraftable);
    if (activeTab === "uncraftable") return versionItems.filter((item) => !item.isCraftable && item.category !== "mobs");
    if (activeTab === "mobs") return versionItems.filter((item) => item.category === "mobs");
    if (activeTab === "weapons_tools") return versionItems.filter((item) => item.category === "weapons_tools");
    if (activeTab === "materials") return versionItems.filter((item) => item.category === "materials");
    return versionItems.filter((item) => item.category === activeTab);
  }, [activeTab, versionItems]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const enterSection = (tab: string) => {
    setActiveTab(tab);
    setCurrentView("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSubHeaderBadge = () => {
    return `${currentEditionInfo.icon} ${selectedVersion}`;
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-hidden bg-[#080d1e]">
      {/* ── Mesmerizing 3D Cosmic Background with Floating Crystal Cube ── */}
      <CosmicBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ── Frosted Glass Cosmic Top Navbar ── */}
        <header className="border-b border-white/[0.08] bg-[#0c142c]/80 backdrop-blur-2xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row items-center justify-between gap-3.5">
            {/* Left: Brand Logo & Title + Back to Landing button */}
            <div className="flex items-center gap-3">
              {currentView === "catalog" && (
                <button
                  onClick={() => setCurrentView("landing")}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.25)] cursor-pointer mr-1"
                  title="Return to Main Welcome Menu"
                >
                  <ArrowLeft size={14} />
                  <span>{t("menuBack")}</span>
                </button>
              )}

              <div
                className="flex items-center gap-3 cursor-pointer select-none"
                onClick={() => setCurrentView("landing")}
              >
                <div className="w-10 h-10 rounded-2xl bg-[#0f1d3a] border border-cyan-400/50 flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(56,189,248,0.35)] overflow-hidden">
                  <img
                    src="/icon.png"
                    alt="MC-DEX"
                    className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  />
                </div>

                <div>
                  <h1 className="font-black text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 tracking-tight">
                    {t("brandTitle")}
                  </h1>
                  <div className="text-cyan-300 text-[11px] font-bold tracking-wide flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>{getSubHeaderBadge()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: Live Search Bar across items */}
            <div className="w-full lg:w-auto flex-1 max-w-xl">
              <SearchBar
                onSelectItem={(item) => {
                  setSelectedItem(item);
                }}
              />
            </div>

            {/* Right: AI Assistant, Progression Walkthrough, Version, Wiki, Lang, Telegram */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center sm:justify-end">
              {/* Minecraft AI Assistant Launch Button */}
              <button
                onClick={() => {
                  const trigger = document.querySelector('button[title*="AI"]') as HTMLButtonElement;
                  if (trigger) trigger.click();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/35 hover:to-purple-500/35 border border-cyan-400/50 text-cyan-200 text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
                title={language === "uz" ? "Minecraft AI Yordamchisini ochish" : "Open Minecraft AI Assistant"}
              >
                <Wand2 size={13} className="text-cyan-300" />
                <span>{t("aiAssistantNav")}</span>
              </button>

              {/* Beat Minecraft Walkthrough Guide Button */}
              <button
                onClick={() => setIsProgressionOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-amber-200 text-xs font-extrabold transition-all shadow-[0_0_18px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] cursor-pointer"
                title={language === "uz" ? "Minecraftni yutish ketma-ketligi" : "Beat Minecraft Guide"}
              >
                <Trophy size={14} className="text-amber-400 animate-bounce" />
                <span>{t("beatMinecraftNav")}</span>
              </button>

              {/* Dynamic Version & Edition Selector Dropdown */}
              <VersionSelector />

              {/* Wiki Link */}
              <Link href="/wiki">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/40 text-purple-200 text-xs font-bold transition-all shadow-[0_0_15px_rgba(192,132,252,0.25)] cursor-pointer">
                  <BookOpen size={14} className="text-purple-300" />
                  <span>{t("wikiBtn")}</span>
                </button>
              </Link>

              {/* Multilingual EN / RU / UZ Language Switcher */}
              <LanguageSwitcher />

              {/* Telegram Support Button */}
              <a
                href="https://t.me/XAVIK_ORG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all shadow-sm"
                title="Contact Support on Telegram"
              >
                <MessageCircle size={14} />
                <span className="hidden sm:inline">Telegram</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {/* VIEW 1: LANDING PAGE HERO SECTION                                     */}
        {/* ═══════════════════════════════════════════════════════════════════════ */}
        {currentView === "landing" ? (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-1 w-full flex flex-col justify-center space-y-10">
            {/* Cinematic Hero Title Section */}
            <div className="text-center space-y-5 max-w-4xl mx-auto">
              {/* Interactive Rotating 3D Minecraft Cube */}
              <div className="flex justify-center mb-1">
                <Minecraft3DCube size={74} blockType="grass" interactive={true} className="cursor-pointer" />
              </div>

              {/* Floating Glowing Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-400/40 shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                <Sparkles size={14} className="text-emerald-300 animate-pulse" />
                <span>
                  {language === "uz"
                    ? `MINECRAFT 3D VOXEL ENSIKLOPEDIYASI · ${currentEditionInfo.labelUz} (${selectedVersion})`
                    : language === "ru"
                    ? `3D ВОКСЕЛЬНАЯ ЭНЦИКЛОПЕДИЯ MINECRAFT · ${currentEditionInfo.labelRu} (${selectedVersion})`
                    : `AUTHENTIC 3D MINECRAFT COMPENDIUM · ${currentEditionInfo.labelEn} (${selectedVersion})`}
                </span>
              </div>

              {/* Massive Bold Gradient Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-cyan-100 to-sky-300 tracking-tight leading-none drop-shadow-2xl">
                {language === "uz"
                  ? "ASOSIY MINECRAFT ENSIKLOPEDIYASI"
                  : language === "ru"
                  ? "ГЛАВНАЯ ЭНЦИКЛОПЕДИЯ MINECRAFT"
                  : "THE ULTIMATE MINECRAFT ARCHIVE"}
              </h1>

              {/* Welcoming Subtitle */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto font-normal drop-shadow">
                {language === "uz"
                  ? `Minecraft ${selectedVersion} uchun mukammal baza: 3x3 ish stoli retseptlari, yerosti ma'danlari qatlamlari, damlamalar daraxti, o'yinni 100% yutish bo'yicha bosqichma-bosqich qo'llanma va aylanuvchi 3D bloklar inspeksiyasi.`
                  : language === "ru"
                  ? `Интерактивная база для Minecraft ${selectedVersion}: аутентичные рецепты верстака 3x3, гайд по прохождению игры, подземные высоты генерации руд и 3D осмотр блоков.`
                  : `Explore authentic ${selectedVersion} crafting recipes, full victory walkthrough from Day 1 to the Ender Dragon, underground ore distributions, and pure 3D rotating voxel inspection.`}
              </p>

              {/* Large Premium Glowing Call-To-Action (CTA) Buttons */}
              <div className="flex items-center justify-center gap-3.5 flex-wrap pt-3">
                {/* Primary CTA: Explore Items */}
                <button
                  onClick={() => enterSection("all")}
                  className="cyber-glow-btn flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white font-extrabold text-sm sm:text-base cursor-pointer shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                >
                  <Sparkles size={18} className="text-cyan-300" />
                  <span>
                    {language === "uz"
                      ? "Katalogga o'tish"
                      : language === "ru"
                      ? "Открыть Каталог Предметов"
                      : "Explore Items & Crafting"}
                  </span>
                  <ArrowRight size={18} className="text-cyan-300 ml-1" />
                </button>

                {/* Beat Minecraft Walkthrough Masterclass Button */}
                <button
                  onClick={() => setIsProgressionOpen(true)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500/25 to-orange-500/25 hover:from-amber-500/35 hover:to-orange-500/35 border border-amber-400/60 text-amber-200 font-extrabold text-sm sm:text-base backdrop-blur-md transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] cursor-pointer"
                >
                  <Trophy size={18} className="text-amber-400" />
                  <span>
                    {language === "uz"
                      ? "O'yinni Yutish Qo'llanmasi"
                      : language === "ru"
                      ? "Как пройти Minecraft"
                      : "How to Beat Minecraft"}
                  </span>
                </button>

                {/* Secondary CTA: Wikipedia */}
                <Link href="/wiki">
                  <button className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/50 text-purple-200 font-bold text-sm sm:text-base backdrop-blur-md transition-all shadow-[0_0_20px_rgba(192,132,252,0.25)] hover:shadow-[0_0_30px_rgba(192,132,252,0.4)] cursor-pointer">
                    <BookOpen size={18} className="text-purple-300" />
                    <span>
                      {language === "uz"
                        ? "Vikipediya va Mexanikalar"
                        : language === "ru"
                        ? "Википедия и Механики"
                        : "Wikipedia & Exploits"}
                    </span>
                  </button>
                </Link>

                {/* Tertiary CTA: Potions */}
                <button
                  onClick={() => enterSection("potions")}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#0e1733]/80 hover:bg-[#131f45] border border-white/15 text-slate-200 hover:text-white font-semibold text-sm backdrop-blur-md transition-all cursor-pointer"
                >
                  <FlaskConical size={16} className="text-amber-300" />
                  <span>
                    {language === "uz"
                      ? "Damlamalar Alkimyosi"
                      : language === "ru"
                      ? "Гайд по Зельям"
                      : "Potion Alchemy"}
                  </span>
                </button>

                {/* AI Assistant Direct CTA */}
                <button
                  onClick={() => {
                    const trigger = document.querySelector('button[title*="AI"]') as HTMLButtonElement;
                    if (trigger) trigger.click();
                  }}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-400/50 text-cyan-200 hover:text-white font-bold text-sm backdrop-blur-md transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] cursor-pointer"
                >
                  <Wand2 size={16} className="text-cyan-300" />
                  <span>
                    {language === "uz"
                      ? "AI Yordamchi"
                      : language === "ru"
                      ? "ИИ-Ассистент"
                      : "AI Assistant"}
                  </span>
                </button>
              </div>

              {/* Soothing Metric Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4">
                {[
                  {
                    value: `${versionItems.length}`,
                    label:
                      language === "uz"
                        ? "Buyum va Bloklar"
                        : language === "ru"
                        ? "Предметов и Блоков"
                        : "Items & Blocks",
                  },
                  {
                    value: "3x3",
                    label:
                      language === "uz"
                        ? "Haqiqiy Crafting Retseptlari"
                        : language === "ru"
                        ? "Аутентичный Крафт 3x3"
                        : "Authentic Recipes",
                  },
                  {
                    value: "7 Bosqich",
                    label:
                      language === "uz"
                        ? "G'alaba Yo'riqnomasi"
                        : language === "ru"
                        ? "Этапов Прохождения"
                        : "Victory Stages",
                  },
                  {
                    value: `${currentEditionInfo.icon} ${selectedVersion}`,
                    label:
                      language === "uz"
                        ? "Faol o'yin versiyasi"
                        : language === "ru"
                        ? "Активная версия"
                        : "Active Version",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-[#0e1733]/55 border border-white/[0.08] backdrop-blur-xl shadow-lg"
                  >
                    <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-300 font-medium mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── GRAND FEATURE CARD: BEAT MINECRAFT PROGRESSION GUIDE ── */}
            <div className="max-w-5xl mx-auto w-full">
              <div
                onClick={() => setIsProgressionOpen(true)}
                className="group relative text-left rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950/40 via-[#1a142e]/70 to-[#0e1e3b]/80 hover:from-amber-950/60 hover:to-[#0e1e3b]/95 backdrop-blur-2xl border border-amber-500/40 hover:border-amber-400/80 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shadow-[0_15px_50px_rgba(245,158,11,0.2)] hover:shadow-[0_20px_60px_rgba(245,158,11,0.4)] cursor-pointer"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-400 p-0.5 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)] flex-shrink-0 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-[#0d152c] rounded-[14px] flex items-center justify-center">
                      <Trophy size={28} className="text-amber-400" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {language === "uz" ? "7 TA BOSQICH" : language === "ru" ? "7 ЭТАПОВ" : "7 STAGES"}
                      </span>
                      <span className="text-xs text-cyan-400 font-mono font-bold">
                        {language === "uz" ? "Day 1 → Ender Dragon → Elytra" : "Day 1 → Ender Dragon → Elytra"}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                      {language === "uz"
                        ? "Minecraftni Yutish Ketma-ketligi (To'liq Masterklass)"
                        : language === "ru"
                        ? "Пошаговое прохождение Minecraft (Полный мастер-класс)"
                        : "How to Beat Minecraft Masterclass (Step-by-Step)"}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      {language === "uz"
                        ? "1-kun omon qolish, Y: -58 da olmos qidiruvi, Nether qal'asi, Stronghold triangulyatsiyasi, Karavot bilan Ajdahoni o'ldirish (Bed strat) va Elitra bilan cheksiz parvozgacha interaktiv qo'llanma."
                        : language === "ru"
                        ? "От первого деревянного верстака до взрыва кроватей у головы Дракона Края и крыльев Элитры. Интерактивный чек-лист с профессиональными советами спидраннеров."
                        : "Interactive walkthrough with task checklists, pro speedrun tips, gear recommendations, and danger warnings from Day 1 to the final dragon egg."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-extrabold flex-shrink-0 group-hover:bg-amber-500/30 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                  <span>{language === "uz" ? "Qo'llanmani ochish" : language === "ru" ? "Открыть гайд" : "Open Guide"}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* 4 Large Interactive Portal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto w-full">
              {/* PORTAL 1: Items & Crafting */}
              <button
                onClick={() => enterSection("all")}
                className="group relative text-left rounded-3xl p-6 sm:p-8 bg-[#0c142c]/60 hover:bg-[#0c142c]/85 backdrop-blur-2xl border border-white/[0.08] hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(56,189,248,0.25)] cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform" />

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#0f1d3a] border border-cyan-400/40 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(56,189,248,0.3)]">
                    <SafeItemImage
                      src={TEXTURES.diamond_pickaxe}
                      alt="Pickaxe"
                      className="w-10 h-10 object-contain drop-shadow"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-200 border border-cyan-400/40">
                    {versionItems.length} {language === "uz" ? "Buyumlar" : language === "ru" ? "Предметов" : "Items"}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                    <span>{t("secItemsTitle")}</span>
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-cyan-400" />
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {t("secItemsDesc")}
                  </p>
                </div>
              </button>

              {/* PORTAL 2: Mobs & Entities */}
              <button
                onClick={() => enterSection("mobs")}
                className="group relative text-left rounded-3xl p-6 sm:p-8 bg-[#0c142c]/60 hover:bg-[#0c142c]/85 backdrop-blur-2xl border border-white/[0.08] hover:border-red-400/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(239,68,68,0.25)] cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform" />

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#0f1d3a] border border-red-400/40 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(239,68,68,0.3)]">
                    <SafeItemImage
                      src="https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/creeper_spawn_egg.png"
                      alt="Creeper"
                      className="w-10 h-10 object-contain drop-shadow"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-200 border border-red-400/40">
                    80 {language === "uz" ? "Moblar (2D)" : language === "ru" ? "Мобов (2D)" : "Mobs (2D)"}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-red-300 transition-colors flex items-center gap-2">
                    <span>{t("secMobsTitle")}</span>
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-red-400" />
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {language === "uz"
                      ? "80 ta Minecraft moblari: yurak shaklidagi salomatlik ko'rsatkichlari, tushadigan o'lja ehtimolligi va sun'iy intellekt xulq-atvori."
                      : language === "ru"
                      ? "80 мобов Minecraft: здоровье в сердечках, шансы дропа предметов, поведение ИИ и естественные биомы спавна."
                      : "80 authentic Minecraft creatures: heart health bars, exact drop rate chances, AI behaviors, and spawn conditions."}
                  </p>
                </div>
              </button>

              {/* PORTAL 3: Wikipedia & Secrets */}
              <Link href="/wiki" className="block w-full">
                <div className="group relative text-left rounded-3xl p-6 sm:p-8 bg-[#0c142c]/60 hover:bg-[#0c142c]/85 backdrop-blur-2xl border border-white/[0.08] hover:border-purple-400/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(192,132,252,0.25)] cursor-pointer h-full">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform" />

                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#0f1d3a] border border-purple-400/40 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(192,132,252,0.3)]">
                      <SafeItemImage
                        src="https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/enchanted_book.png"
                        alt="Wiki"
                        className="w-10 h-10 object-contain drop-shadow"
                      />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-500/20 text-purple-200 border border-purple-400/40">
                      {language === "uz" ? "Ensiklopediya" : language === "ru" ? "Энциклопедия" : "Encyclopedia"}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                      <span>{t("secWikiTitle")}</span>
                      <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-purple-400" />
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {t("secWikiDesc")}
                    </p>
                  </div>
                </div>
              </Link>

              {/* PORTAL 4: Potion Alchemy */}
              <button
                onClick={() => enterSection("potions")}
                className="group relative text-left rounded-3xl p-6 sm:p-8 bg-[#0c142c]/60 hover:bg-[#0c142c]/85 backdrop-blur-2xl border border-white/[0.08] hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] cursor-pointer"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform" />

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#0f1d3a] border border-amber-400/40 flex items-center justify-center p-2.5 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                    <SafeItemImage
                      src="https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/potion.png"
                      alt="Potions"
                      className="w-10 h-10 object-contain drop-shadow"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-200 border border-amber-400/40">
                    {language === "uz" ? "Damlamalar Stendi" : language === "ru" ? "Варочная Стойка" : "Brewing Stand"}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                    <span>{t("secPotionsTitle")}</span>
                    <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-amber-400" />
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {t("secPotionsDesc")}
                  </p>
                </div>
              </button>
            </div>
          </main>
        ) : (
          /* ═══════════════════════════════════════════════════════════════════════ */
          /* VIEW 2: CONTENT CATALOG (DYNAMIC VERSION-FILTERED ITEMS)              */
          /* ═══════════════════════════════════════════════════════════════════════ */
          <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-7">
            {/* ── Category Filters (Soothing Cyber Pills) ── */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm whitespace-nowrap transition-all border cursor-pointer font-bold ${
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/25 to-purple-500/25 text-cyan-200 border-cyan-400/70 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                        : "bg-[#0c142c]/60 text-slate-300 hover:text-white border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    <span className={isActive ? "text-cyan-300" : "text-slate-400"}>
                      {tab.icon}
                    </span>
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                        isActive
                          ? "bg-cyan-500/30 text-cyan-200"
                          : "bg-white/5 text-slate-400"
                      }`}
                    >
                      {tab.id === "all"
                        ? versionItems.length
                        : tab.id === "blocks"
                        ? versionItems.filter((i) => i.category === "blocks").length
                        : tab.id === "potions"
                        ? versionItems.filter((i) => i.category === "potions").length
                        : tab.id === "craftable"
                        ? versionItems.filter((i) => i.isCraftable).length
                        : tab.id === "uncraftable"
                        ? versionItems.filter((i) => !i.isCraftable && i.category !== "mobs").length
                        : tab.id === "mobs"
                        ? versionItems.filter((i) => i.category === "mobs").length
                        : tab.id === "weapons_tools"
                        ? versionItems.filter((i) => i.category === "weapons_tools").length
                        : tab.id === "materials"
                        ? versionItems.filter((i) => i.category === "materials").length
                        : 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ── Active Version Badge & Item Counter ── */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1 border-b border-white/[0.08] pb-3">
              <span className="font-medium">
                {t("showingCount")
                  .replace("{count}", `${displayedItems.length}`)
                  .replace("{total}", `${filteredItems.length}`)}
              </span>
              <span className="font-mono text-cyan-400 font-bold">
                {currentEditionInfo.icon} {selectedVersion}
              </span>
            </div>

            {/* ── Items Grid ── */}
            {displayedItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {displayedItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={() => setSelectedItem(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 space-y-3 bg-[#0c142c]/50 rounded-3xl border border-white/[0.08] backdrop-blur-xl">
                <Boxes size={48} className="mx-auto text-slate-500 opacity-50" />
                <h3 className="text-lg font-bold text-slate-300">
                  {t("noResultsTitle")}
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  {t("noResultsDesc")}
                </p>
                <button
                  onClick={() => setActiveTab("all")}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold transition-all border border-cyan-400/40 cursor-pointer"
                >
                  {t("resetFilter")}
                </button>
              </div>
            )}

            {/* ── Load More Pagination Trigger ── */}
            {displayedItems.length < filteredItems.length && (
              <div className="text-center pt-6 pb-12">
                <button
                  onClick={() =>
                    setVisibleCount((prev) =>
                      Math.min(prev + PAGE_SIZE, filteredItems.length)
                    )
                  }
                  className="px-8 py-3.5 rounded-2xl bg-[#0c142c]/80 hover:bg-[#131f45] border border-cyan-400/40 hover:border-cyan-400/70 text-cyan-300 hover:text-white font-bold text-sm transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{t("loadMore")}</span>
                  <span className="text-xs font-mono text-cyan-400/70">
                    ({displayedItems.length} / {filteredItems.length})
                  </span>
                </button>
              </div>
            )}
          </main>
        )}

        {/* ── Premium Footer with Telegram Support ── */}
        <footer className="mt-auto border-t border-white/[0.08] bg-[#0c142c]/75 backdrop-blur-2xl py-6 px-4 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {t("footerRights")}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://t.me/XAVIK_ORG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-bold transition-colors border border-cyan-400/30 shadow-[0_0_15px_rgba(56,189,248,0.15)]"
              >
                <MessageCircle size={14} />
                <span>
                  {language === "uz"
                    ? "Telegramda aloqa (@XAVIK_ORG)"
                    : language === "ru"
                    ? "Поддержка в Telegram (@XAVIK_ORG)"
                    : "Contact Support on Telegram (@XAVIK_ORG)"}
                </span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </footer>

        {/* ── Item Detail Modal (Pure 3D High-Fidelity Viewer) ── */}
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />

        {/* ── Minecraft Progression Walkthrough Modal ── */}
        <ProgressionGuide
          isOpen={isProgressionOpen}
          onClose={() => setIsProgressionOpen(false)}
        />
      </div>
    </div>
  );
}
