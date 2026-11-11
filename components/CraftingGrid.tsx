"use client";

import React, { useState } from "react";
import { Ingredient, CraftingRecipe } from "@/data/items";
import { useLanguage } from "@/context/LanguageContext";
import SafeItemImage from "./SafeItemImage";

interface CraftingSlotProps {
  ingredient: Ingredient | null;
  size?: "sm" | "md" | "lg";
  isResult?: boolean;
  count?: number;
}

export function CraftingSlot({
  ingredient,
  size = "md",
  isResult = false,
  count = 1,
}: CraftingSlotProps) {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-11 h-11",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  const imgSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const hasItem = Boolean(ingredient && ingredient.texture);

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`${sizeClasses[size]} rounded-xl flex items-center justify-center cursor-pointer transition-all border ${
          isResult
            ? "bg-slate-800/90 border-emerald-400/60 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
            : "bg-slate-800/70 border-white/10 hover:border-cyan-400/50 hover:bg-slate-700/80"
        }`}
      >
        {hasItem && (
          <SafeItemImage
            src={ingredient?.texture}
            alt={ingredient?.name || ""}
            itemId={ingredient?.id}
            itemName={ingredient?.name}
            className={`${imgSizes[size]} object-contain drop-shadow-md`}
          />
        )}

        {/* Stack Count Indicator */}
        {isResult && count > 1 && (
          <span className="absolute bottom-1 right-1 font-bold text-white text-[10px] leading-none px-1 py-0.5 rounded bg-black/80 font-sans">
            {count}
          </span>
        )}
      </div>

      {/* Clean Modern Tooltip on Slot Hover */}
      {isHovered && hasItem && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 whitespace-nowrap z-50 pointer-events-none rounded-lg bg-slate-900 border border-white/20 text-white text-xs font-medium shadow-xl">
          {ingredient?.name}
        </div>
      )}
    </div>
  );
}

interface CraftingGridProps {
  recipe: CraftingRecipe;
  itemTexture: string;
  itemName: string;
}

export default function CraftingGrid({
  recipe,
  itemTexture,
  itemName,
}: CraftingGridProps) {
  const { language, t } = useLanguage();

  if (recipe.type === "brewing_stand") {
    return (
      <BrewingStandDisplay
        recipe={recipe}
        resultTexture={itemTexture}
        resultName={itemName}
      />
    );
  }

  const grid = recipe.grid || Array(9).fill(null);
  const resultIngredient: Ingredient = recipe.result || {
    id: "result",
    name: itemName,
    texture: itemTexture,
  };

  return (
    <div className="flex flex-col items-center gap-4 font-sans">
      <div className="text-cyan-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
        <span>{t("recipeTitle")}</span>
      </div>

      {/* Crafting Table GUI Container */}
      <div className="p-5 rounded-2xl glass-panel border border-white/10 flex items-center justify-center gap-6 sm:gap-8 flex-wrap">
        {/* 3x3 Grid */}
        <div className="p-3 bg-slate-900/80 rounded-xl border border-white/10">
          <div className="text-xs text-slate-400 mb-2 font-medium text-center">
            {language === "uz" ? "Ish stoli setkasi" : language === "ru" ? "Сетка верстака" : "Crafting Grid"}
          </div>
          <div className="grid grid-cols-3 gap-1.5 p-1">
            {grid.map((ing, idx) => (
              <CraftingSlot key={idx} ingredient={ing} size="md" />
            ))}
          </div>
        </div>

        {/* Animated Arrow */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-slate-400 font-medium mb-1">
            {language === "uz" ? "Natija" : language === "ru" ? "Итог" : "Result"}
          </span>
          <div className="w-10 h-7 flex items-center justify-center text-2xl font-bold text-cyan-400">
            ➜
          </div>
        </div>

        {/* Result Slot */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-slate-400 font-medium">
            {language === "uz" ? "Tayyor buyum" : language === "ru" ? "Готовый предмет" : "Output Item"}
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-500/30">
            <CraftingSlot
              ingredient={resultIngredient}
              size="lg"
              isResult
              count={recipe.resultCount || 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function BrewingStandDisplay({
  recipe,
  resultTexture,
  resultName,
}: {
  recipe: CraftingRecipe;
  resultTexture: string;
  resultName: string;
}) {
  const { language } = useLanguage();
  const grid = recipe.grid || Array(9).fill(null);
  const ingredient = grid[0];
  const fuel = recipe.fuel || grid[1];
  const bottles = [grid[3], grid[4], grid[5]].filter(Boolean);

  const resultItem: Ingredient = recipe.result || {
    id: "potion",
    name: resultName,
    texture: resultTexture,
  };

  return (
    <div className="flex flex-col items-center gap-4 font-sans">
      <div className="text-cyan-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
        <span>
          {language === "uz"
            ? "Damlamani tayyorlash retsepti"
            : language === "ru"
            ? "Рецепт зельеварения"
            : "Brewing Stand Recipe"}
        </span>
      </div>

      <div className="p-5 rounded-2xl glass-panel border border-white/10 flex items-center justify-center gap-6 sm:gap-8 flex-wrap">
        <div className="p-4 bg-slate-900/80 rounded-xl border border-white/10 flex flex-col items-center gap-3">
          <div className="text-xs text-slate-400 font-medium">
            {language === "uz" ? "Damlamalar stendi" : language === "ru" ? "Зельеварочная стойка" : "Brewing Stand"}
          </div>

          {/* Top row: Fuel + Ingredient */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className="text-[11px] text-slate-400">
                {language === "uz" ? "Yoqilg'i" : language === "ru" ? "Топливо" : "Fuel"}
              </span>
              <CraftingSlot ingredient={fuel} size="sm" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[11px] text-slate-400">
                {language === "uz" ? "Ingredient" : language === "ru" ? "Ингредиент" : "Ingredient"}
              </span>
              <CraftingSlot ingredient={ingredient} size="sm" />
            </div>
          </div>

          {/* Connecting Pipe */}
          <div className="w-0.5 h-4 bg-slate-600" />

          {/* Bottom row: 3 bottles */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <CraftingSlot
                key={i}
                ingredient={bottles[i] || bottles[0] || null}
                size="sm"
              />
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs text-slate-400 font-medium mb-1">
            {language === "uz" ? "Qaynatish" : language === "ru" ? "Варка" : "Brew"}
          </span>
          <div className="w-10 h-7 flex items-center justify-center text-2xl font-bold text-cyan-400">
            ➜
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-slate-400 font-medium">
            {language === "uz" ? "Natija" : language === "ru" ? "Результат" : "Output"}
          </div>
          <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-500/30">
            <CraftingSlot
              ingredient={resultItem}
              size="lg"
              isResult
              count={recipe.resultCount || 3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
