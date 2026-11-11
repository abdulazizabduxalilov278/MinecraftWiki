"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles } from "lucide-react";
import { ITEMS, MinecraftItem, RARITY_INFO } from "@/data/items";
import { useLanguage } from "@/context/LanguageContext";
import SafeItemImage from "./SafeItemImage";

interface SearchBarProps {
  onSelectItem: (item: MinecraftItem) => void;
}

export default function SearchBar({ onSelectItem }: SearchBarProps) {
  const { t, getItemName, getItemDesc, language } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MinecraftItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 0) {
      const q = query.toLowerCase().trim();
      const matched = ITEMS.filter((item) => {
        const engName = item.name.toLowerCase();
        const id = item.id.toLowerCase();
        const cat = item.category.toLowerCase();
        const localizedName = getItemName(item).toLowerCase();
        return (
          engName.includes(q) ||
          id.includes(q) ||
          cat.includes(q) ||
          localizedName.includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
      setResults(matched.slice(0, 40));
      setIsOpen(matched.length > 0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, getItemName]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(item: MinecraftItem) {
    onSelectItem(item);
    setQuery("");
    setIsOpen(false);
  }

  function handleClear() {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-40 font-sans">
      {/* Search Bar Input Container */}
      <div
        className={`glass-panel flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
          isFocused
            ? "border-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
            : "border-white/15"
        }`}
      >
        <Search size={18} className="text-cyan-400 flex-shrink-0" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (query.trim()) setIsOpen(results.length > 0);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder={t("searchPlaceholder")}
          className="flex-1 bg-transparent border-none outline-none text-white text-sm sm:text-base placeholder-slate-400 font-sans"
          autoComplete="off"
          spellCheck={false}
        />

        <AnimatePresence>
          {query && (
            <button
              onClick={handleClear}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Dropdown Results */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-xl overflow-hidden shadow-2xl border border-white/20 z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-2.5 border-b border-white/10 flex items-center justify-between text-xs text-slate-400 px-3 bg-slate-900/70">
              <span className="flex items-center gap-1.5 font-semibold text-cyan-300">
                <Sparkles size={12} className="text-yellow-400" />
                {language === "ru" ? `НАЙДЕНО ${results.length} РЕЗУЛЬТАТОВ` : `FOUND ${results.length} MATCHES`}
              </span>
              <span>{language === "ru" ? "Нажмите для открытия 3D модели и рецепта" : "Click to view recipe & 3D model"}</span>
            </div>

            <div className="divide-y divide-white/5">
              {results.map((item) => {
                const rarity = RARITY_INFO[item.rarity] || RARITY_INFO.common;
                const localizedName = getItemName(item);
                const localizedDesc = getItemDesc(item);

                const rarityLabel = language === "ru" ? {
                  common: "Обычный",
                  uncommon: "Необычный",
                  rare: "Редкий",
                  epic: "Эпический",
                  legendary: "Легендарный",
                }[item.rarity] || rarity.label : rarity.label;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="w-full flex items-center gap-3.5 px-4 py-2.5 text-left transition-colors hover:bg-white/10 cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0 bg-black/50"
                      style={{
                        border: `1.5px solid ${item.themeColor}50`,
                      }}
                    >
                      <SafeItemImage
                        src={item.texture}
                        alt={localizedName}
                        itemId={item.id}
                        category={item.category}
                        itemName={localizedName}
                        className="w-7 h-7 object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="font-semibold text-sm leading-tight truncate text-white"
                          style={{ color: item.themeColor }}
                        >
                          {localizedName}
                        </span>
                        {!item.isCraftable && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-medium">
                            {language === "ru" ? "Несоздаваемый" : "Uncraftable"}
                          </span>
                        )}
                        {item.category === "mobs" && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40 font-medium">
                            {language === "ru" ? "Моб" : "Mob"}
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 text-xs truncate">
                        {localizedDesc}
                      </div>
                    </div>

                    <div
                      className="text-[10px] px-2 py-0.5 rounded uppercase font-semibold tracking-wider flex-shrink-0"
                      style={{
                        color: rarity.color,
                        background: `${rarity.color}15`,
                        border: `1px solid ${rarity.color}40`,
                      }}
                    >
                      {rarityLabel}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
