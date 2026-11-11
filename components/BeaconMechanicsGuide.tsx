"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Activity } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BeaconMechanicsGuide() {
  const { language } = useLanguage();

  const MATERIALS = [
    {
      id: "iron",
      name: language === "uz" ? "Temir blok" : language === "ru" ? "Железный блок" : "Iron Block",
      color: "#d8d8d8",
      glow: "#ffffff",
    },
    {
      id: "gold",
      name: language === "uz" ? "Oltin blok" : language === "ru" ? "Золотой блок" : "Gold Block",
      color: "#f5d442",
      glow: "#ffd700",
    },
    {
      id: "diamond",
      name: language === "uz" ? "Olmos blok" : language === "ru" ? "Алмазный блок" : "Diamond Block",
      color: "#3fb8c0",
      glow: "#00ffff",
    },
    {
      id: "emerald",
      name: language === "uz" ? "Zumrad blok" : language === "ru" ? "Изумрудный блок" : "Emerald Block",
      color: "#17dd62",
      glow: "#00ff66",
    },
    {
      id: "netherite",
      name: language === "uz" ? "Nezerit blok" : language === "ru" ? "Незеритовый блок" : "Netherite Block",
      color: "#433242",
      glow: "#9966cc",
    },
  ];

  const PYRAMID_TIERS = [
    {
      tier: 1,
      size: language === "uz" ? "3x3 Asos (1 Qatlam)" : language === "ru" ? "3x3 Основание (1 Слой)" : "3x3 Base (1 Layer)",
      blocks: 9,
      range: language === "uz" ? "20 ta blok" : language === "ru" ? "20 блоков" : "20 Blocks",
      powers:
        language === "uz"
          ? ["Tezlik I (Speed)", "Shoshilish I (Haste)"]
          : language === "ru"
          ? ["Скорость I", "Спешка I"]
          : ["Speed I", "Haste I"],
      layersTopToBottom: [3],
    },
    {
      tier: 2,
      size: language === "uz" ? "5x5 Asos + 3x3 (2 Qatlam)" : language === "ru" ? "5x5 Основание + 3x3 (2 Слоя)" : "5x5 Base + 3x3 (2 Layers)",
      blocks: 34,
      range: language === "uz" ? "30 ta blok" : language === "ru" ? "30 блоков" : "30 Blocks",
      powers:
        language === "uz"
          ? ["Tezlik I", "Shoshilish I", "Himoya I (Resistance)", "Sakrash I (Jump Boost)"]
          : language === "ru"
          ? ["Скорость I", "Спешка I", "Сопротивление I", "Прыгучесть I"]
          : ["Speed I", "Haste I", "Resistance I", "Jump Boost I"],
      layersTopToBottom: [3, 5],
    },
    {
      tier: 3,
      size: language === "uz" ? "7x7 Asos + 5x5 + 3x3 (3 Qatlam)" : language === "ru" ? "7x7 Основание + 5x5 + 3x3 (3 Слоя)" : "7x7 Base + 5x5 + 3x3 (3 Layers)",
      blocks: 83,
      range: language === "uz" ? "40 ta blok" : language === "ru" ? "40 блоков" : "40 Blocks",
      powers:
        language === "uz"
          ? ["Tezlik I", "Shoshilish I", "Himoya I", "Sakrash I", "Kuch I (Strength)"]
          : language === "ru"
          ? ["Скорость I", "Спешка I", "Сопротивление I", "Прыгучесть I", "Сила I"]
          : ["Speed I", "Haste I", "Resistance I", "Jump Boost I", "Strength I"],
      layersTopToBottom: [3, 5, 7],
    },
    {
      tier: 4,
      size: language === "uz" ? "9x9 Asos + 7x7 + 5x5 + 3x3 (To'liq Piramida)" : language === "ru" ? "9x9 Основание + 7x7 + 5x5 + 3x3 (Полная пирамида)" : "9x9 Base + 7x7 + 5x5 + 3x3 (Full 4-Tier Pyramid)",
      blocks: 164,
      range: language === "uz" ? "50 ta blok" : language === "ru" ? "50 блоков" : "50 Blocks",
      powers:
        language === "uz"
          ? ["Kuch II", "Regeneratsiya (Tiklanish)", "Tezlik II", "Shoshilish II", "Himoya II", "Sakrash II"]
          : language === "ru"
          ? ["Сила II", "Регенерация", "Скорость II", "Спешка II", "Сопротивление II", "Прыгучесть II"]
          : ["Strength II", "Regeneration", "Speed II", "Haste II", "Resistance II", "Jump Boost II"],
      layersTopToBottom: [3, 5, 7, 9],
    },
  ];

  const [selectedTier, setSelectedTier] = useState(4);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[2]); // Diamond default

  const currentTier = PYRAMID_TIERS.find((p) => p.tier === selectedTier) || PYRAMID_TIERS[3];

  return (
    <div className="space-y-6 font-sans">
      {/* Intro info box */}
      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-400/30 text-cyan-200">
        <h4 className="font-semibold text-sm tracking-wide text-cyan-300 flex items-center gap-2">
          <Sparkles size={16} className="text-yellow-400" />
          {language === "uz"
            ? "Mayoq (Beacon) Faollashuvi va Piramida Mexanikasi"
            : language === "ru"
            ? "Активация Маяка и Механика Пирамиды"
            : "Beacon Activation & Pyramid Mechanics"}
        </h4>
        <p className="text-sm mt-1.5 text-gray-300 leading-relaxed">
          {language === "uz"
            ? "Mayoq temir, oltin, zumrad, olmos yoki nezerit bloklaridan iborat piramidaning CHO'QQISIGA o'rnatiladi. Piramida asosi qanchalik keng bo'lsa (4-darajada 9x9 gacha), ta'sir radiusi shunchalik kengayadi va kuchli effektlar beradi."
            : language === "ru"
            ? "Маяк устанавливается на ВЕРШИНУ пирамиды из блоков железа, золота, изумруда, алмаза или незерита. Чем шире основание пирамиды (до 9x9 на 4-м уровне), тем больше радиус действия и сильнее эффекты ауры."
            : "A Beacon is placed on the TOP of a solid mineral pyramid. The pyramid base expands outward at the bottom (up to 9x9 blocks for Tier 4), while the Beacon sits on top shooting an infinite beam upwards into the sky."}
        </p>
      </div>

      {/* Tier Selector & Material Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tier Buttons */}
        <div className="p-4 rounded-xl glass-panel-subtle border border-white/10 space-y-2.5">
          <label className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">
            {language === "uz"
              ? "Mayoq piramidasining darajasi:"
              : language === "ru"
              ? "Уровень пирамиды маяка:"
              : "Pyramid Tier Level:"}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {PYRAMID_TIERS.map((tier) => (
              <button
                key={tier.tier}
                onClick={() => setSelectedTier(tier.tier)}
                className={`py-2 px-2 rounded-lg text-xs transition-all border cursor-pointer font-medium ${
                  selectedTier === tier.tier
                    ? "bg-cyan-500/25 text-cyan-300 border-cyan-400 font-bold shadow-[0_0_12px_rgba(66,223,223,0.3)]"
                    : "bg-black/30 text-gray-400 hover:text-white border-white/5"
                }`}
              >
                {language === "uz"
                  ? `${tier.tier}-Daraja`
                  : language === "ru"
                  ? `Уровень ${tier.tier}`
                  : `Tier ${tier.tier}`}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-300 pt-1 flex items-center justify-between">
            <span>
              {language === "uz" ? "Kerakli bloklar:" : language === "ru" ? "Блоков нужно:" : "Blocks needed:"}{" "}
              <strong className="text-cyan-400">{currentTier.blocks}</strong>
            </span>
            <span>
              {language === "uz" ? "Ta'sir radiusi:" : language === "ru" ? "Радиус баффа:" : "Buff Range:"}{" "}
              <strong className="text-emerald-400">{currentTier.range}</strong>
            </span>
          </div>
        </div>

        {/* Mineral Material Selector */}
        <div className="p-4 rounded-xl glass-panel-subtle border border-white/10 space-y-2.5">
          <label className="text-xs text-gray-400 uppercase tracking-wider block font-semibold">
            {language === "uz"
              ? "Piramida qurilish materiali:"
              : language === "ru"
              ? "Строительный минерал пирамиды:"
              : "Pyramid Construction Block:"}
          </label>
          <div className="flex flex-wrap gap-2">
            {MATERIALS.map((mat) => (
              <button
                key={mat.id}
                onClick={() => setSelectedMaterial(mat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all border cursor-pointer font-medium ${
                  selectedMaterial.id === mat.id
                    ? "border-cyan-400 text-white font-bold bg-white/15"
                    : "border-white/5 text-gray-400 hover:text-white bg-black/30"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: mat.color, boxShadow: `0 0 8px ${mat.glow}` }}
                />
                <span>{mat.name.replace(" Block", "").replace(" блок", "").replace(" blok", "")}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── AUTHENTIC PYRAMID LAYOUT (Base at BOTTOM, Beacon on TOP) ── */}
      <div className="p-6 rounded-2xl glass-panel border border-cyan-400/20 bg-black/60 relative overflow-hidden flex flex-col items-center justify-center min-h-[340px]">
        {/* 1. SKY BEAM */}
        <div className="relative flex flex-col items-center">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 25px rgba(85, 255, 255, 0.8), 0 0 60px rgba(85, 255, 255, 0.4)",
                "0 0 45px rgba(85, 255, 255, 1.0), 0 0 90px rgba(85, 255, 255, 0.6)",
                "0 0 25px rgba(85, 255, 255, 0.8), 0 0 60px rgba(85, 255, 255, 0.4)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-48 bg-gradient-to-t from-cyan-300 via-cyan-400 to-transparent rounded-t-full relative z-20 flex items-center justify-center"
          >
            <div className="w-2.5 h-full bg-white rounded-t-full opacity-90 blur-[1px]" />
          </motion.div>

          {/* 2. BEACON BLOCK */}
          <div
            className="w-12 h-12 rounded-lg border-2 border-cyan-300 relative z-30 flex items-center justify-center shadow-[0_0_25px_rgba(85,255,255,0.8)] -mt-1"
            style={{
              background: "linear-gradient(135deg, rgba(166,255,236,0.7) 0%, rgba(30,20,36,0.95) 100%)",
            }}
          >
            <div className="w-5 h-5 rounded-sm bg-cyan-200 animate-pulse shadow-[0_0_12px_#fff]" />
            <span className="absolute -right-16 text-[10px] text-cyan-300 font-bold uppercase tracking-wider bg-black/80 px-1.5 py-0.5 rounded border border-cyan-400/40">
              BEACON
            </span>
          </div>

          {/* 3. STEPPED PYRAMID LAYERS */}
          <div className="flex flex-col items-center gap-1.5 mt-2">
            {currentTier.layersTopToBottom.map((layerSize, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-1"
              >
                {Array.from({ length: Math.min(layerSize, 9) }).map((_, bIdx) => (
                  <div
                    key={bIdx}
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-sm border transition-colors shadow-sm"
                    style={{
                      backgroundColor: selectedMaterial.color,
                      borderColor: `${selectedMaterial.glow}90`,
                      boxShadow: `0 0 6px ${selectedMaterial.glow}40`,
                    }}
                    title={`${selectedMaterial.name} (Layer ${idx + 1}: ${layerSize}x${layerSize})`}
                  />
                ))}
              </div>
            ))}
          </div>

          <span className="text-xs text-cyan-300/80 mt-3 font-medium">
            ▲ {currentTier.size} ({currentTier.blocks} {selectedMaterial.name})
          </span>
        </div>
      </div>

      {/* Available Powers in this tier */}
      <div className="p-4 rounded-xl glass-panel-subtle border border-white/10 space-y-3">
        <h5 className="text-xs uppercase text-gray-400 tracking-wider flex items-center gap-2 font-semibold">
          <Activity size={14} className="text-emerald-400" />
          {language === "uz"
            ? `Faol ta'sirlar va sehrli kuchlar (${selectedTier}-daraja):`
            : language === "ru"
            ? `Действующие эффекты (Уровень ${selectedTier}):`
            : `Active Status Effects (Tier ${selectedTier}):`}
        </h5>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {currentTier.powers.map((power, i) => (
            <div
              key={i}
              className="p-2.5 rounded-lg bg-black/40 border border-emerald-500/30 flex items-center gap-2"
            >
              <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-white">{power}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
