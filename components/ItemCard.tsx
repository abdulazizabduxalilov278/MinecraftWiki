"use client";

import React from "react";
import { MinecraftItem, RARITY_INFO } from "@/data/items";
import { useLanguage } from "@/context/LanguageContext";
import SafeItemImage from "./SafeItemImage";

interface ItemCardProps {
  item: MinecraftItem;
  onClick: () => void;
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  const { getItemName, language } = useLanguage();
  const rarity = RARITY_INFO[item.rarity] || RARITY_INFO.common;
  const localizedName = getItemName(item);

  const localizedRarityLabel = language === "ru" ? {
    common: "Обычный",
    uncommon: "Необычный",
    rare: "Редкий",
    epic: "Эпический",
    legendary: "Легендарный",
  }[item.rarity] || rarity.label : rarity.label;

  const categoryBadge = language === "ru" ? (
    item.category === "mobs" ? "Моб" : !item.isCraftable ? "Несоздаваемый" : "Крафт"
  ) : (
    item.category === "mobs" ? "Mob" : !item.isCraftable ? "Uncraftable" : "Craftable"
  );

  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left rounded-2xl p-3.5 bg-slate-900/40 backdrop-blur-xl transition-all duration-300 flex flex-col items-center gap-2.5 overflow-hidden border border-white/[0.08] hover:border-cyan-400/60 hover:bg-slate-900/70 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:-translate-y-1 cursor-pointer font-sans"
    >
      {/* Subtle top neon ambient glow edge on hover */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Category / Type Tag at Top */}
      <div className="w-full flex items-center justify-between text-[11px] font-medium">
        <span
          className="uppercase tracking-wider font-extrabold text-[10px]"
          style={{ color: rarity.color }}
        >
          {localizedRarityLabel}
        </span>

        {item.category === "mobs" ? (
          <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-bold">
            {categoryBadge}
          </span>
        ) : !item.isCraftable ? (
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
            {categoryBadge}
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
            {categoryBadge}
          </span>
        )}
      </div>

      {/* Item Texture Slot - Cyber frosted container */}
      <div className="w-20 h-20 rounded-2xl bg-slate-950/80 border border-white/10 flex items-center justify-center p-3 relative overflow-hidden group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all">
        <SafeItemImage
          src={item.texture}
          alt={localizedName}
          itemId={item.id}
          category={item.category}
          itemName={localizedName}
          className="w-14 h-14 object-contain transition-transform duration-200 ease-out group-hover:scale-110 drop-shadow-md"
        />
      </div>

      {/* Item Title & Subtitle */}
      <div className="w-full text-center">
        <h3
          className="font-bold text-sm leading-snug truncate px-1 text-slate-100 group-hover:text-cyan-300 transition-colors"
        >
          {localizedName}
        </h3>

        <p className="text-xs text-slate-400 mt-0.5 truncate font-medium">
          {item.category === "mobs"
            ? `${item.mobDetails?.health} HP · ${language === "ru" ? (item.mobDetails?.type === "Hostile" ? "Враждебный" : item.mobDetails?.type === "Boss" ? "Босс" : "Мирный") : item.mobDetails?.type}`
            : (language === "ru" ? (item.isCraftable ? "Верстак 3x3" : "Исследование мира") : item.obtain[0]?.title)}
        </p>
      </div>
    </button>
  );
}
