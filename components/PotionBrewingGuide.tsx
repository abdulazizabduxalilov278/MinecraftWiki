"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Flame, Clock, Zap, Shield, HelpCircle } from "lucide-react";
import SafeItemImage from "./SafeItemImage";
import { useLanguage } from "@/context/LanguageContext";

interface PotionRecipe {
  id: string;
  nameEn: string;
  nameRu: string;
  nameUz: string;
  color: string;
  texture: string;
  baseItem: { name: string; nameUz: string; id: string; texture: string };
  ingredient: { name: string; nameUz: string; id: string; texture: string };
  intermediate: { name: string; nameUz: string; id: string; texture: string };
  output: { name: string; duration: string; effect: string; effectUz: string };
  upgrades: {
    extended?: { name: string; duration: string; ingredient: string };
    enhanced?: { name: string; duration: string; ingredient: string };
    splash?: boolean;
    lingering?: boolean;
  };
}

const BASE_IMG = "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item";

export const POTION_RECIPES: Record<string, PotionRecipe> = {
  strength: {
    id: "strength",
    nameEn: "Potion of Strength",
    nameRu: "Зелье силы",
    nameUz: "Potion of Strength (Kuch damlamasi)",
    color: "#932423",
    texture: `${BASE_IMG}/potion.png`,
    baseItem: { name: "Water Bottle", nameUz: "Water Bottle (Suv idishi)", id: "potion", texture: `${BASE_IMG}/potion.png` },
    ingredient: { name: "Blaze Powder", nameUz: "Blaze Powder (Olov kukuni)", id: "blaze_powder", texture: `${BASE_IMG}/blaze_powder.png` },
    intermediate: { name: "Awkward Potion", nameUz: "Awkward Potion (Oddiy asos)", id: "potion", texture: `${BASE_IMG}/potion.png` },
    output: {
      name: "Potion of Strength",
      duration: "3:00",
      effect: "+3 Attack Damage (+1.5 Hearts)",
      effectUz: "+3 Hujum zarari (+1.5 ta yurak)",
    },
    upgrades: {
      extended: { name: "Strength (Extended)", duration: "8:00", ingredient: "Redstone Dust" },
      enhanced: { name: "Strength II", duration: "1:30", ingredient: "Glowstone Dust" },
      splash: true,
      lingering: true,
    },
  },
  healing: {
    id: "healing",
    nameEn: "Potion of Healing",
    nameRu: "Зелье исцеления",
    nameUz: "Potion of Healing (Davolash damlamasi)",
    color: "#f82423",
    texture: `${BASE_IMG}/potion.png`,
    baseItem: { name: "Water Bottle", nameUz: "Water Bottle", id: "potion", texture: `${BASE_IMG}/potion.png` },
    ingredient: { name: "Glistering Melon Slice", nameUz: "Glistering Melon Slice (Yaltiroq tarvuz)", id: "glistering_melon_slice", texture: `${BASE_IMG}/glistering_melon_slice.png` },
    intermediate: { name: "Awkward Potion", nameUz: "Awkward Potion", id: "potion", texture: `${BASE_IMG}/potion.png` },
    output: {
      name: "Potion of Healing",
      duration: "Instant",
      effect: "Instantly restores 4 HP (2 Hearts)",
      effectUz: "Bir zumda 4 HP (2 ta yurak) salomatlikni tiklaydi",
    },
    upgrades: {
      enhanced: { name: "Healing II", duration: "Instant", ingredient: "Glowstone Dust" },
      splash: true,
      lingering: true,
    },
  },
  swiftness: {
    id: "swiftness",
    nameEn: "Potion of Swiftness (Speed)",
    nameRu: "Зелье стремительности (Скорость)",
    nameUz: "Potion of Swiftness (Tezlik damlamasi)",
    color: "#7cafc6",
    texture: `${BASE_IMG}/potion.png`,
    baseItem: { name: "Water Bottle", nameUz: "Water Bottle", id: "potion", texture: `${BASE_IMG}/potion.png` },
    ingredient: { name: "Sugar", nameUz: "Sugar (Shakar)", id: "sugar", texture: `${BASE_IMG}/sugar.png` },
    intermediate: { name: "Awkward Potion", nameUz: "Awkward Potion", id: "potion", texture: `${BASE_IMG}/potion.png` },
    output: {
      name: "Potion of Swiftness",
      duration: "3:00",
      effect: "+20% Movement Speed & FOV",
      effectUz: "+20% Harakat tezligi va ko'rish maydoni",
    },
    upgrades: {
      extended: { name: "Speed (Extended)", duration: "8:00", ingredient: "Redstone Dust" },
      enhanced: { name: "Speed II", duration: "1:30", ingredient: "Glowstone Dust" },
      splash: true,
      lingering: true,
    },
  },
  fire_resistance: {
    id: "fire_resistance",
    nameEn: "Potion of Fire Resistance",
    nameRu: "Зелье огнестойкости",
    nameUz: "Potion of Fire Resistance (Olovdan himoya)",
    color: "#e49a3a",
    texture: `${BASE_IMG}/potion.png`,
    baseItem: { name: "Water Bottle", nameUz: "Water Bottle", id: "potion", texture: `${BASE_IMG}/potion.png` },
    ingredient: { name: "Magma Cream", nameUz: "Magma Cream (Magma kremi)", id: "magma_cream", texture: `${BASE_IMG}/magma_cream.png` },
    intermediate: { name: "Awkward Potion", nameUz: "Awkward Potion", id: "potion", texture: `${BASE_IMG}/potion.png` },
    output: {
      name: "Potion of Fire Resistance",
      duration: "3:00",
      effect: "Total immunity to Fire & Lava damage",
      effectUz: "Olov va lava zararlaridan 100% to'liq himoya",
    },
    upgrades: {
      extended: { name: "Fire Resistance (Extended)", duration: "8:00", ingredient: "Redstone Dust" },
      splash: true,
      lingering: true,
    },
  },
  night_vision: {
    id: "night_vision",
    nameEn: "Potion of Night Vision",
    nameRu: "Зелье ночного зрения",
    nameUz: "Potion of Night Vision (Tungi ko'rish)",
    color: "#1f1fa1",
    texture: `${BASE_IMG}/potion.png`,
    baseItem: { name: "Water Bottle", nameUz: "Water Bottle", id: "potion", texture: `${BASE_IMG}/potion.png` },
    ingredient: { name: "Golden Carrot", nameUz: "Golden Carrot (Oltin sabzi)", id: "golden_carrot", texture: `${BASE_IMG}/golden_carrot.png` },
    intermediate: { name: "Awkward Potion", nameUz: "Awkward Potion", id: "potion", texture: `${BASE_IMG}/potion.png` },
    output: {
      name: "Potion of Night Vision",
      duration: "3:00",
      effect: "Maximum brightness in pitch darkness",
      effectUz: "Zulmat va suv tubida 100% yorqin ko'rish imkoniyati",
    },
    upgrades: {
      extended: { name: "Night Vision (Extended)", duration: "8:00", ingredient: "Redstone Dust" },
      splash: true,
      lingering: true,
    },
  },
  invisibility: {
    id: "invisibility",
    nameEn: "Potion of Invisibility",
    nameRu: "Зелье невидимости",
    nameUz: "Potion of Invisibility (Ko'rinmaslik damlamasi)",
    color: "#7f8392",
    texture: `${BASE_IMG}/potion.png`,
    baseItem: { name: "Potion of Night Vision", nameUz: "Potion of Night Vision", id: "potion", texture: `${BASE_IMG}/potion.png` },
    ingredient: { name: "Fermented Spider Eye", nameUz: "Fermented Spider Eye (O'rgimchak ko'zi)", id: "fermented_spider_eye", texture: `${BASE_IMG}/fermented_spider_eye.png` },
    intermediate: { name: "Night Vision (3:00)", nameUz: "Night Vision (3:00)", id: "potion", texture: `${BASE_IMG}/potion.png` },
    output: {
      name: "Potion of Invisibility",
      duration: "3:00",
      effect: "Renders player invisible to mobs & players",
      effectUz: "O'yinchini moblar va dushmanlarga ko'rinmas qiladi",
    },
    upgrades: {
      extended: { name: "Invisibility (Extended)", duration: "8:00", ingredient: "Redstone Dust" },
      splash: true,
      lingering: true,
    },
  },
  slow_falling: {
    id: "slow_falling",
    nameEn: "Potion of Slow Falling",
    nameRu: "Зелье плавного падения",
    nameUz: "Potion of Slow Falling (Sekin tushish)",
    color: "#f7f0e0",
    texture: `${BASE_IMG}/potion.png`,
    baseItem: { name: "Water Bottle", nameUz: "Water Bottle", id: "potion", texture: `${BASE_IMG}/potion.png` },
    ingredient: { name: "Phantom Membrane", nameUz: "Phantom Membrane (Fantom membranasi)", id: "phantom_membrane", texture: `${BASE_IMG}/phantom_membrane.png` },
    intermediate: { name: "Awkward Potion", nameUz: "Awkward Potion", id: "potion", texture: `${BASE_IMG}/potion.png` },
    output: {
      name: "Potion of Slow Falling",
      duration: "1:30",
      effect: "Glides softly, zero fall damage taken",
      effectUz: "Havoda muloyim siljiydi, yiqilish zarari 0 ga teng",
    },
    upgrades: {
      extended: { name: "Slow Falling (Extended)", duration: "4:00", ingredient: "Redstone Dust" },
      splash: true,
      lingering: true,
    },
  },
  water_breathing: {
    id: "water_breathing",
    nameEn: "Potion of Water Breathing",
    nameRu: "Зелье подводного дыхания",
    nameUz: "Potion of Water Breathing (Suv ostida nafas olish)",
    color: "#2e5299",
    texture: `${BASE_IMG}/potion.png`,
    baseItem: { name: "Water Bottle", nameUz: "Water Bottle", id: "potion", texture: `${BASE_IMG}/potion.png` },
    ingredient: { name: "Pufferfish", nameUz: "Pufferfish (Ignabaliq)", id: "pufferfish", texture: `${BASE_IMG}/pufferfish.png` },
    intermediate: { name: "Awkward Potion", nameUz: "Awkward Potion", id: "potion", texture: `${BASE_IMG}/potion.png` },
    output: {
      name: "Potion of Water Breathing",
      duration: "3:00",
      effect: "Prevents drowning oxygen meter loss",
      effectUz: "Suv ostida kislorod yo'qolishining oldini oladi",
    },
    upgrades: {
      extended: { name: "Water Breathing (Extended)", duration: "8:00", ingredient: "Redstone Dust" },
      splash: true,
      lingering: true,
    },
  },
  regeneration: {
    id: "regeneration",
    nameEn: "Potion of Regeneration",
    nameRu: "Зелье регенерации",
    nameUz: "Potion of Regeneration (Tiklanish damlamasi)",
    color: "#cd5cab",
    texture: `${BASE_IMG}/potion.png`,
    baseItem: { name: "Water Bottle", nameUz: "Water Bottle", id: "potion", texture: `${BASE_IMG}/potion.png` },
    ingredient: { name: "Ghast Tear", nameUz: "Ghast Tear (Gast ko'zyoshi)", id: "ghast_tear", texture: `${BASE_IMG}/ghast_tear.png` },
    intermediate: { name: "Awkward Potion", nameUz: "Awkward Potion", id: "potion", texture: `${BASE_IMG}/potion.png` },
    output: {
      name: "Potion of Regeneration",
      duration: "0:45",
      effect: "Restores 1 HP every 2.5 seconds",
      effectUz: "Har 2.5 soniyada 1 HP salomatlikni tiklaydi",
    },
    upgrades: {
      extended: { name: "Regeneration (Extended)", duration: "1:30", ingredient: "Redstone Dust" },
      enhanced: { name: "Regen II", duration: "0:22", ingredient: "Glowstone Dust" },
      splash: true,
      lingering: true,
    },
  },
};

interface PotionBrewingGuideProps {
  initialPotionId?: string;
}

export default function PotionBrewingGuide({ initialPotionId = "strength" }: PotionBrewingGuideProps) {
  const { language } = useLanguage();
  const [selectedKey, setSelectedKey] = useState<string>(
    POTION_RECIPES[initialPotionId] ? initialPotionId : "strength"
  );

  const recipe = POTION_RECIPES[selectedKey] || POTION_RECIPES.strength;

  const getPotionName = (p: PotionRecipe) => {
    if (language === "uz") return p.nameUz;
    if (language === "ru") return p.nameRu;
    return p.nameEn;
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ── Top Potion Selector Pills ── */}
      <div className="space-y-2">
        <label className="text-xs text-gray-400 uppercase tracking-wider block font-semibold flex items-center gap-1.5">
          <Sparkles size={14} className="text-yellow-400" />
          <span>
            {language === "uz"
              ? "Damlama retseptini tanlang:"
              : language === "ru"
              ? "Выберите рецепт зелья:"
              : "Select Potion to Brew:"}
          </span>
        </label>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {Object.values(POTION_RECIPES).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedKey(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                selectedKey === p.id
                  ? "bg-purple-500/25 text-purple-200 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] font-bold scale-105"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border-white/10"
              }`}
            >
              <div
                className="w-3.5 h-3.5 rounded-full border border-white/30"
                style={{ backgroundColor: p.color }}
              />
              <span>{getPotionName(p)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Stand Fuel & Brewing Stand Header ── */}
      <div className="p-4 rounded-2xl glass-panel-subtle border border-amber-500/30 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl glass-slot flex items-center justify-center p-1.5 border border-amber-500/50">
            <SafeItemImage
              src={`${BASE_IMG}/blaze_powder.png`}
              alt="Blaze Powder"
              itemId="blaze_powder"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div>
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Flame size={14} className="text-amber-400 animate-pulse" />
              <span>
                {language === "uz"
                  ? "Damlamalar stendi yoqilg'isi: Olovli kukun (Blaze Powder)"
                  : language === "ru"
                  ? "Топливо варочной стойки: Огненный порошок"
                  : "Brewing Stand Fuel: Blaze Powder"}
              </span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              {language === "uz"
                ? "1 ta Blaze Powder stendni 20 ta to'liq qaynatish sikli uchun energiya bilan ta'minlaydi."
                : language === "ru"
                ? "1 порошок ифрита питает стойку на 20 циклов варки."
                : "1 Blaze Powder powers 20 complete brewing operations."}
            </p>
          </div>
        </div>

        <div className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold">
          {language === "uz"
            ? "Qaynatish vaqti: 20 soniya"
            : language === "ru"
            ? "Время варки: 20 секунд"
            : "Brew Time: 20 Seconds"}
        </div>
      </div>

      {/* ── STEP-BY-STEP VISUAL BREWING SEQUENCE ── */}
      <div className="p-6 rounded-2xl glass-panel border border-cyan-400/20 bg-slate-950/80 space-y-6">
        <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
          <Zap size={16} className="text-yellow-400" />
          <span>
            {language === "uz"
              ? `Bosqichma-bosqich tayyorlash sxemasi: ${getPotionName(recipe)}`
              : language === "ru"
              ? `Пошаговая схема варки: ${recipe.nameRu}`
              : `Step-by-Step Brewing Sequence: ${recipe.nameEn}`}
          </span>
        </h4>

        {/* The 3-Step Sequence Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* STEP 1: Awkward Base */}
          <div className="p-4 rounded-xl glass-panel-subtle border border-white/10 flex flex-col items-center text-center space-y-2 relative">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {language === "uz"
                ? "1-Bosqich: Asos (Baza)"
                : language === "ru"
                ? "Шаг 1: Основа (База)"
                : "Step 1: Awkward Base"}
            </span>

            <div className="flex items-center gap-3 my-1">
              {/* Water Bottle */}
              <div className="w-12 h-12 rounded-xl glass-slot flex items-center justify-center p-2">
                <SafeItemImage
                  src={recipe.baseItem.texture}
                  alt={recipe.baseItem.name}
                  itemId={recipe.baseItem.id}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-cyan-400">+</span>
              {/* Nether Wart */}
              <div className="w-12 h-12 rounded-xl glass-slot flex items-center justify-center p-2 border border-red-500/40">
                <SafeItemImage
                  src={`${BASE_IMG}/nether_wart.png`}
                  alt="Nether Wart"
                  itemId="nether_wart"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>

            <div className="font-semibold text-xs text-white">
              {language === "uz"
                ? "Water Bottle + Nether Wart"
                : language === "ru"
                ? "Колба воды + Адский нарост"
                : "Water Bottle + Nether Wart"}
            </div>
            <div className="text-[11px] text-cyan-300">
              ➜{" "}
              {language === "uz"
                ? "Awkward Potion (Oddiy damlama)"
                : language === "ru"
                ? "Мутное зелье (Awkward)"
                : "Awkward Potion"}
            </div>
          </div>

          {/* STEP 2: Primary Ingredient & Potion Output */}
          <div className="p-4 rounded-xl glass-panel border border-cyan-400/40 bg-cyan-950/20 flex flex-col items-center text-center space-y-2 relative shadow-[0_0_20px_rgba(34,211,238,0.15)]">
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
              {language === "uz"
                ? "2-Bosqich: Asosiy ingredient"
                : language === "ru"
                ? "Шаг 2: Главный ингредиент"
                : "Step 2: Primary Ingredient"}
            </span>

            <div className="flex items-center gap-3 my-1">
              {/* Awkward Potion */}
              <div className="w-12 h-12 rounded-xl glass-slot flex items-center justify-center p-2">
                <SafeItemImage
                  src={recipe.intermediate.texture}
                  alt={recipe.intermediate.name}
                  itemId={recipe.intermediate.id}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-xl font-bold text-yellow-400">+</span>
              {/* Main Ingredient */}
              <div className="w-12 h-12 rounded-xl glass-slot flex items-center justify-center p-2 border border-yellow-400/50 shadow-[0_0_12px_rgba(250,204,21,0.3)]">
                <SafeItemImage
                  src={recipe.ingredient.texture}
                  alt={recipe.ingredient.name}
                  itemId={recipe.ingredient.id}
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>

            <div className="font-bold text-xs text-yellow-300">
              {language === "uz" ? recipe.ingredient.nameUz : recipe.ingredient.name}
            </div>
            <div className="text-xs font-extrabold text-white" style={{ color: recipe.color }}>
              ★ {getPotionName(recipe)}
            </div>
          </div>

          {/* STEP 3: Modifiers (Extended / Tier II) */}
          <div className="p-4 rounded-xl glass-panel-subtle border border-white/10 flex flex-col items-center text-center space-y-2 relative">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {language === "uz"
                ? "3-Bosqich: Modifikatorlar"
                : language === "ru"
                ? "Шаг 3: Модификаторы"
                : "Step 3: Modifiers & Upgrades"}
            </span>

            <div className="flex items-center gap-2 my-1">
              {/* Redstone Dust */}
              <div className="w-10 h-10 rounded-xl glass-slot flex items-center justify-center p-1.5" title="Redstone Dust: Extends Duration">
                <SafeItemImage
                  src={`${BASE_IMG}/redstone.png`}
                  alt="Redstone"
                  itemId="redstone"
                  className="w-6 h-6 object-contain"
                />
              </div>
              {/* Glowstone Dust */}
              <div className="w-10 h-10 rounded-xl glass-slot flex items-center justify-center p-1.5" title="Glowstone Dust: Enhances Potency to Level II">
                <SafeItemImage
                  src={`${BASE_IMG}/glowstone_dust.png`}
                  alt="Glowstone"
                  itemId="glowstone_dust"
                  className="w-6 h-6 object-contain"
                />
              </div>
              {/* Gunpowder */}
              <div className="w-10 h-10 rounded-xl glass-slot flex items-center justify-center p-1.5" title="Gunpowder: Creates Splash Potion">
                <SafeItemImage
                  src={`${BASE_IMG}/gunpowder.png`}
                  alt="Gunpowder"
                  itemId="gunpowder"
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>

            <div className="text-xs text-slate-300 leading-snug">
              <div>
                <strong className="text-red-400">+ Redstone:</strong>{" "}
                {language === "uz" ? "Davomiylik (8:00)" : language === "ru" ? "Длительность (8:00)" : "Extended (8:00)"}
              </div>
              <div>
                <strong className="text-yellow-400">+ Glowstone:</strong>{" "}
                {language === "uz" ? "II-Daraja kuchi" : language === "ru" ? "Уровень II" : "Potency (Level II)"}
              </div>
            </div>
          </div>
        </div>

        {/* Potion Stats Banner */}
        <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs text-slate-400 block">
              {language === "uz"
                ? "Damlama samarasi va ta'siri:"
                : language === "ru"
                ? "Действие эффекта:"
                : "Status Effect Provided:"}
            </span>
            <span className="text-sm font-bold text-emerald-300">
              {language === "uz" ? recipe.output.effectUz : recipe.output.effect}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5">
              <Clock size={13} />
              <span>{recipe.output.duration}</span>
            </span>

            {recipe.upgrades.enhanced && (
              <span className="px-3 py-1 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 text-xs font-semibold">
                {recipe.upgrades.enhanced.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
