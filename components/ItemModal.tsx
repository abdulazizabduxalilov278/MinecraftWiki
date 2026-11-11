"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, AlertTriangle, Skull, MapPin, Box, Layers, BookOpen, Pickaxe, Heart, Loader2 } from "lucide-react";
import { MinecraftItem, RARITY_INFO, ORE_MINING_SOURCES, CraftingRecipe } from "@/data/items";
import { useLanguage } from "@/context/LanguageContext";
import { useVersion } from "@/context/VersionContext";
import CraftingGrid from "./CraftingGrid";
import Item3DViewer from "./Item3DViewer";
import BeaconMechanicsGuide from "./BeaconMechanicsGuide";
import PotionBrewingGuide from "./PotionBrewingGuide";
import SafeItemImage from "./SafeItemImage";

interface ItemModalProps {
  item: MinecraftItem | null;
  onClose: () => void;
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const { t, getItemName, getItemDesc, language } = useLanguage();
  const { selectedVersion, fetchRecipeForVersion } = useVersion();
  const [activeTab, setActiveTab] = useState<"overview" | "3d" | "mechanics">("overview");
  const [currentRecipe, setCurrentRecipe] = useState<CraftingRecipe | null>(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);

  // Reset tab on item change
  useEffect(() => {
    setActiveTab("overview");
  }, [item?.id]);

  // Fetch version-specific recipe dynamically
  useEffect(() => {
    if (!item) {
      setCurrentRecipe(null);
      return;
    }

    // Default to item's built-in recipe initially
    setCurrentRecipe(item.recipe);

    let isMounted = true;
    if (item.isCraftable) {
      setLoadingRecipe(true);
      fetchRecipeForVersion(item.id, item.recipe).then((recipe) => {
        if (isMounted && recipe) {
          setCurrentRecipe(recipe);
          setLoadingRecipe(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [item?.id, selectedVersion, fetchRecipeForVersion]);

  // ESC key listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  if (!item) return null;

  const rarity = RARITY_INFO[item.rarity] || RARITY_INFO.common;
  const isMob = item.category === "mobs";
  const isSpawnEgg = item.id.includes("spawn_egg");
  // 3D is strictly disabled for all Mobs and Spawn Eggs (2D cards only)
  const has3D = !isMob && !isSpawnEgg;

  const localizedName = getItemName(item);
  const localizedDesc = getItemDesc(item);

  const localizedRarityLabel =
    language === "uz"
      ? {
          common: "Oddiy",
          uncommon: "Noyob",
          rare: "Kam uchraydigan",
          epic: "Epik",
          legendary: "Afsonaviy",
        }[item.rarity] || rarity.label
      : language === "ru"
      ? {
          common: "Обычный",
          uncommon: "Необычный",
          rare: "Редкий",
          epic: "Эпический",
          legendary: "Легендарный",
        }[item.rarity] || rarity.label
      : rarity.label;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Animated Blurred Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030712]/85 backdrop-blur-xl"
        />

        {/* Modal Window Container - Premium Cyber Hosting Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0b0f19]/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.18)] z-10 overflow-hidden font-sans text-white"
        >
          {/* ── Modal Header with Cyber Gradient Accent ── */}
          <div
            className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10"
            style={{
              background: `linear-gradient(90deg, rgba(11, 15, 25, 0.98) 0%, rgba(6, 182, 212, 0.12) 100%)`,
            }}
          >
            <div className="flex items-center gap-4">
              {/* Texture Badge with Neon Border */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900/90 flex items-center justify-center p-2.5 flex-shrink-0 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
              >
                <SafeItemImage
                  src={item.texture}
                  alt={localizedName}
                  itemId={item.id}
                  category={item.category}
                  itemName={localizedName}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain drop-shadow-md"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full tracking-wider"
                    style={{
                      color: rarity.color,
                      background: `${rarity.color}18`,
                      border: `1px solid ${rarity.color}45`,
                    }}
                  >
                    {localizedRarityLabel}
                  </span>

                  {isMob ? (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 font-bold tracking-wide">
                      {t("badgeMob")}
                    </span>
                  ) : !item.isCraftable ? (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold tracking-wide">
                      {t("badgeUncraftable")}
                    </span>
                  ) : (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold tracking-wide">
                      {t("badgeCraftable")}
                    </span>
                  )}

                  {/* Minecraft Active Version Badge */}
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-cyan-400/30 font-mono font-bold">
                    MC {selectedVersion}
                  </span>
                </div>

                <h2
                  className="text-xl sm:text-2xl font-black mt-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-200 leading-tight"
                >
                  {localizedName}
                </h2>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Navigation Tabs ── */}
          <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-white/10 bg-slate-950/60">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "overview"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Layers size={14} />
              <span>{t("tabOverview")}</span>
            </button>

            {/* 3D Tab ONLY for non-mob items */}
            {has3D && (
              <button
                onClick={() => setActiveTab("3d")}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeTab === "3d"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Box size={14} className="text-cyan-400" />
                <span>{t("tab3D")}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-500/30 text-cyan-200">
                  360° Orbit
                </span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("mechanics")}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === "mechanics"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-400/60 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <BookOpen size={14} className="text-purple-400" />
              <span>{t("tabMechanics")}</span>
            </button>
          </div>

          {/* ── Modal Scrollable Body ── */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
            {/* TAB: 3D PURE HIGH-FIDELITY VIEWER (Blocks, Plants, Items) */}
            {activeTab === "3d" && has3D && (
              <div className="space-y-4">
                <Item3DViewer item={item} />
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-xs text-slate-300 space-y-1.5">
                  <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-cyan-400" />
                    <span>
                      {language === "uz"
                        ? "3D Orbital boshqaruv:"
                        : language === "ru"
                        ? "Управление 3D осмотром:"
                        : "3D Orbit Controls:"}
                    </span>
                  </div>
                  <div>
                    •{" "}
                    {language === "uz"
                      ? "Modelni 360° orbital aylantirish uchun chap tugmani bosib suring"
                      : language === "ru"
                      ? "Зажмите левую кнопку мыши для плавного вращения на 360°"
                      : "Left Click Drag: Rotate seamlessly 360° around the model"}
                  </div>
                  <div>
                    •{" "}
                    {language === "uz"
                      ? "Kamerani siljitish uchun o'ng tugmani bosib suring"
                      : language === "ru"
                      ? "Зажмите правую кнопку мыши для панорамирования"
                      : "Right Click Drag: Pan the camera"}
                  </div>
                  <div>
                    •{" "}
                    {language === "uz"
                      ? "Piksellarni yo'qotmagan holda yaqinlashtirish uchun sichqoncha g'ildirakchasini aylantiring"
                      : language === "ru"
                      ? "Прокручивайте колёсико мыши для зума без размытия пикселей"
                      : "Scroll Wheel: Zoom in and inspect pixel-perfect textures"}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: MECHANICS & USAGE */}
            {activeTab === "mechanics" && (
              <div>
                {item.id === "beacon" ? (
                  <BeaconMechanicsGuide />
                ) : item.category === "potions" || item.id.includes("potion") || item.id === "brewing_stand" ? (
                  <PotionBrewingGuide initialPotionId={item.id.replace("potion_of_", "").replace("potion_", "")} />
                ) : (
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                      <Sparkles size={16} className="text-yellow-400" />
                      {language === "uz"
                        ? `Buyum mexanikasi: ${localizedName}`
                        : language === "ru"
                        ? `Механика предмета: ${localizedName}`
                        : `In-Game Mechanics: ${localizedName}`}
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {localizedDesc}
                    </p>

                    {item.stats && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        {item.stats.map((st, i) => (
                          <div key={i} className="p-3 rounded-xl bg-slate-950/80 border border-white/5">
                            <span className="text-xs text-gray-400 block">
                              {language === "uz"
                                ? st.label === "Stack Size"
                                  ? "Bir katak miqdori"
                                  : st.label === "Item ID"
                                  ? "Buyum ID"
                                  : st.label === "Craftable"
                                  ? "Yasalishi"
                                  : st.label === "Health"
                                  ? "Salomatlik"
                                  : st.label === "Type"
                                  ? "Turi"
                                  : st.label === "Height"
                                  ? "Balandligi"
                                  : st.label === "Width"
                                  ? "Kengligi"
                                  : st.label
                                : language === "ru"
                                ? st.label === "Stack Size"
                                  ? "Размер стака"
                                  : st.label === "Item ID"
                                  ? "ID предмета"
                                  : st.label === "Craftable"
                                  ? "Крафт"
                                  : st.label === "Health"
                                  ? "Здоровье"
                                  : st.label === "Type"
                                  ? "Тип"
                                  : st.label === "Height"
                                  ? "Высота"
                                  : st.label === "Width"
                                  ? "Ширина"
                                  : st.label
                                : st.label}
                            </span>
                            <span className="text-base font-bold text-cyan-300">
                              {language === "uz"
                                ? st.value === "Yes (3x3)"
                                  ? "Ha (3x3)"
                                  : st.value === "No"
                                  ? "Yo'q"
                                  : st.value
                                : language === "ru"
                                ? st.value === "Yes (3x3)"
                                  ? "Да (3x3)"
                                  : st.value === "No"
                                  ? "Нет"
                                  : st.value
                                : st.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB: OVERVIEW & RECIPE */}
            {activeTab === "overview" && (
              <>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-white/10">
                  {localizedDesc}
                </p>

                {/* Uncraftable Banner */}
                {!item.isCraftable && !isMob && (
                  <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 flex items-start gap-3 text-amber-200">
                    <AlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <h4 className="font-bold text-xs tracking-wide text-amber-300 uppercase">
                        {t("badgeUncraftable")}
                      </h4>
                      <p className="text-xs mt-1 text-amber-200/90 leading-relaxed">
                        {language === "uz"
                          ? "Ushbu buyumni ish stolida yasab bo'lmaydi. U faqat xazinalar, qadimiy binolar, o'lja sandiqlari yoki moblardan olinadi."
                          : language === "ru"
                          ? "Этот предмет нельзя создать на верстаке. Его можно добыть только исследовав структуры, данжи, сокровищницы или победив боссов."
                          : "This item cannot be crafted on a Crafting Table. It must be obtained via structure exploration, mob drops, loot chests, or ancient dimensions."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Mob Details Section (Rich 2D Display) */}
                {isMob && item.mobDetails && (
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-red-500/20 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Skull className="text-red-400" size={18} />
                        <span className="font-bold text-xs text-red-300 uppercase tracking-wider">
                          {t("mobStats")}
                        </span>
                      </div>

                      {/* Health Indicator */}
                      <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-white/10">
                        <span className="text-xs text-gray-400 mr-1">
                          {language === "uz" ? "Salomatlik:" : language === "ru" ? "Здоровье:" : "Health:"}
                        </span>
                        <div className="flex items-center text-red-500">
                          {Array.from({ length: Math.min(10, Math.ceil(item.mobDetails.health / 2)) }).map((_, i) => (
                            <Heart key={i} size={14} className="fill-red-500 text-red-500 -ml-0.5 first:ml-0" />
                          ))}
                        </div>
                        <span className="text-xs font-bold text-red-300 ml-1">
                          {item.mobDetails.health} HP
                        </span>
                      </div>
                    </div>

                    {/* Mob Behavior */}
                    <div className="text-slate-300 text-xs leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                      <span className="text-red-400 font-bold">{t("behavior")}: </span>
                      {language === "uz"
                        ? item.mobDetails.type === "Hostile" || item.mobDetails.type === "Boss"
                          ? "Agressiv ravishda o'yinchilarni ta'qib qiladi va to'g'ridan-to'g'ri hujum qiladi."
                          : "Tinch harakatlanuvchi mavjudot. Hujum qilinganda qochadi yoki oziq-ovqat bilan jalb qilinadi."
                        : language === "ru"
                        ? item.mobDetails.type === "Hostile" || item.mobDetails.type === "Boss"
                          ? "Агрессивно преследует и атакует игроков в зоне видимости. Наносит прямой урон."
                          : "Мирное блуждающее существо. Убегает при атаке или следует за игроком с пищей."
                        : item.mobDetails.behavior}
                    </div>

                    {/* Mob Drops Table with Safe Image Fallbacks */}
                    <div>
                      <h4 className="text-xs text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-bold">
                        <Sparkles size={12} className="text-yellow-400" />
                        {t("mobDrops")}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {item.mobDetails.drops.map((drop, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/80 border border-white/10"
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center p-1.5 flex-shrink-0 border border-white/10">
                              <SafeItemImage
                                src={drop.texture}
                                alt={drop.name}
                                itemName={drop.name}
                                className="w-7 h-7 object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-sm text-slate-200 truncate">
                                {/* Raw game format preserved in uz and en */}
                                {language === "ru" ? (
                                  drop.name === "Sculk Catalyst" ? "Скалк-катализатор" :
                                  drop.name === "Dragon Egg" ? "Яйцо дракона" :
                                  drop.name === "Nether Star" ? "Звезда Незера" :
                                  drop.name === "Gunpowder" ? "Порох" :
                                  drop.name === "Rotten Flesh" ? "Гнилая плоть" :
                                  drop.name === "Bone" ? "Кость" :
                                  drop.name === "Arrow" ? "Стрела" :
                                  drop.name === "Ender Pearl" ? "Жемчуг Края" :
                                  drop.name === "Blaze Rod" ? "Стержень ифрита" :
                                  drop.name === "Totem of Undying" ? "Тотем бессмертия" :
                                  drop.name === "Experience Orbs" ? "Сферы опыта" : drop.name
                                ) : drop.name}
                              </div>
                              <div className="text-xs text-slate-400">
                                {language === "uz" ? "Ehtimollik: " : language === "ru" ? "Шанс: " : "Chance: "}
                                <span className="text-emerald-400 font-bold">{drop.chance}</span> ·{" "}
                                {language === "uz" ? "Miqdori: " : language === "ru" ? "Кол-во: " : "Qty: "}
                                {drop.amount}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Crafting Grid Section with Dynamic Version Recipe */}
                {item.isCraftable && currentRecipe && (
                  <div className="space-y-3">
                    <CraftingGrid
                      recipe={currentRecipe}
                      itemTexture={item.texture}
                      itemName={localizedName}
                    />
                    {loadingRecipe && (
                      <div className="flex items-center justify-center gap-2 text-xs text-cyan-300">
                        <Loader2 size={12} className="animate-spin" />
                        <span>
                          {language === "uz"
                            ? `Minecraft ${selectedVersion} retsepti yangilanmoqda...`
                            : language === "ru"
                            ? `Загрузка рецепта для Minecraft ${selectedVersion}...`
                            : `Updating recipe for Minecraft ${selectedVersion}...`}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Ore Generation & Mining Guide */}
                {ORE_MINING_SOURCES[item.id] && (() => {
                  const oreInfo = ORE_MINING_SOURCES[item.id];
                  return (
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-cyan-400/30 space-y-3.5 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-2">
                          <Pickaxe size={17} className="text-cyan-400" />
                          <h4 className="font-extrabold text-sm text-cyan-300 uppercase tracking-wide">
                            {language === "uz"
                              ? "Yerosti ma'dan qatlamlari va qazib olish"
                              : language === "ru"
                              ? "Подземная генерация и добыча руды"
                              : "Ore Generation & Mining Guide"}
                          </h4>
                        </div>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                          {oreInfo.dimension}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10">
                          <span className="text-[11px] text-slate-400 block">
                            {language === "uz" ? "Cho'qqi balandlik" : language === "ru" ? "Пик генерации" : "Peak Y-Level"}
                          </span>
                          <span className="text-sm font-bold text-emerald-400">{oreInfo.peakY}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10">
                          <span className="text-[11px] text-slate-400 block">
                            {language === "uz" ? "Diapazon" : language === "ru" ? "Диапазон высот" : "Range"}
                          </span>
                          <span className="text-sm font-bold text-cyan-300">{oreInfo.rangeY}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10">
                          <span className="text-[11px] text-slate-400 block">
                            {language === "uz" ? "Kerakli asbob" : language === "ru" ? "Кирка для добычи" : "Tool Needed"}
                          </span>
                          <span className="text-sm font-bold text-yellow-300">{oreInfo.pickaxeRequired}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-950/80 border border-white/10">
                          <span className="text-[11px] text-slate-400 block">
                            {language === "uz" ? "Fortune III" : language === "ru" ? "Чары Удача" : "Fortune III"}
                          </span>
                          <span className="text-sm font-bold text-purple-300">{oreInfo.fortuneMultiplier}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-white/5 leading-relaxed">
                        💡 <strong className="text-white">
                          {language === "uz"
                            ? "Qazib olish maslahati: "
                            : language === "ru"
                            ? "Совет по добыче: "
                            : "Mining Strategy: "}
                        </strong>
                        {language === "uz" ? oreInfo.notesUz : language === "ru" ? oreInfo.notesRu : oreInfo.notesEn}
                      </p>
                    </div>
                  );
                })()}

                {/* How to Obtain Section */}
                <div className="space-y-3">
                  <div className="text-xs text-slate-300 uppercase tracking-wider flex items-center gap-2 font-bold">
                    <MapPin size={14} className="text-emerald-400" />
                    <span>{t("howToObtain")}</span>
                  </div>

                  <div className="space-y-2.5">
                    {item.obtain.map((method, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 flex items-start gap-4 transition-all"
                      >
                        <div className="w-11 h-11 rounded-xl bg-slate-950 flex items-center justify-center p-2 flex-shrink-0 border border-white/10">
                          <SafeItemImage
                            src={method.iconTexture || item.texture}
                            alt=""
                            itemId={item.id}
                            category={item.category}
                            itemName={localizedName}
                            className="w-7 h-7 object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                              {language === "uz"
                                ? method.category === "Crafting"
                                  ? "Ish stoli retsepti"
                                  : method.category === "Mining"
                                  ? "Qazib olish"
                                  : method.category === "Mob Drop"
                                  ? "Mob o'ljasi"
                                  : method.category === "Structure / Chest"
                                  ? "Qasr va xazinalar"
                                  : method.category === "Spawn Condition"
                                  ? "Paydo bo'lish"
                                  : method.category
                                : language === "ru"
                                ? method.category === "Crafting"
                                  ? "Крафт"
                                  : method.category === "Mining"
                                  ? "Добыча руды"
                                  : method.category === "Mob Drop"
                                  ? "Дроп с моба"
                                  : method.category === "Structure / Chest"
                                  ? "Сундуки и структуры"
                                  : method.category === "Spawn Condition"
                                  ? "Спавн"
                                  : method.category
                                : method.category}
                            </span>
                            <h4 className="font-bold text-white text-sm">
                              {language === "uz"
                                ? method.title === "3x3 Crafting Table"
                                  ? "3x3 Ish stoli"
                                  : method.title === "End City Ships"
                                  ? "End shahri kemalari"
                                  : method.title === "Evoker Drop"
                                  ? "Evoker o'ljasi"
                                  : method.title === "Crafted with Nether Star"
                                  ? "Nether Star orqali yasaladi"
                                  : method.title === "Subterranean Mining"
                                  ? "Yerosti qazilmasi"
                                  : method.title === "Nether Dimension Loot"
                                  ? "Nether o'lchami o'ljasi"
                                  : method.title === "Harvested from World"
                                  ? "Tabiatdan yig'iladi"
                                  : method.title.startsWith("Natural")
                                  ? "Tabiiy paydo bo'lish"
                                  : method.title
                                : language === "ru"
                                ? method.title === "3x3 Crafting Table"
                                  ? "Верстак 3x3"
                                  : method.title === "End City Ships"
                                  ? "Корабли Края"
                                  : method.title === "Evoker Drop"
                                  ? "Добыча с Заклинателя"
                                  : method.title === "Crafted with Nether Star"
                                  ? "Крафт со Звездой Незера"
                                  : method.title === "Subterranean Mining"
                                  ? "Подземная добыча"
                                  : method.title === "Nether Dimension Loot"
                                  ? "Лут Незера"
                                  : method.title === "Harvested from World"
                                  ? "Сбор в мире"
                                  : method.title.startsWith("Natural")
                                  ? "Естественный спавн"
                                  : method.title
                                : method.title}
                            </h4>
                            {method.chance && (
                              <span className="text-xs text-yellow-300 font-bold ml-auto">
                                {language === "uz" ? "Ehtimollik: " : language === "ru" ? "Шанс: " : "Rate: "}
                                {method.chance}
                              </span>
                            )}
                          </div>

                          {method.location && (
                            <div className="text-xs text-cyan-300 font-medium mt-1">
                              📍{" "}
                              {language === "uz"
                                ? method.location.includes("The End")
                                  ? "End o'lchami (Y: 60 - 100)"
                                  : method.location.includes("Woodland")
                                  ? "O'rmon saroyi va reydlar"
                                  : method.location.includes("Deepslate")
                                  ? "Chuqur slanets (Y: -58 dan -64 gacha)"
                                  : method.location.includes("Nether")
                                  ? "Nether qal'alari va bastionlar"
                                  : method.location.includes("Dark caves")
                                  ? "Qorong'u g'orlar va tungi zamin"
                                  : method.location.includes("Overworld")
                                  ? "Tashqi olam o'rmon va tekisliklari"
                                  : method.location
                                : language === "ru"
                                ? method.location.includes("The End")
                                  ? "Измерение Край (Y: 60 - 100)"
                                  : method.location.includes("Woodland")
                                  ? "Лесной особняк и рейды"
                                  : method.location.includes("Deepslate")
                                  ? "Глубинный сланец (Y: -58 до -64)"
                                  : method.location.includes("Nether")
                                  ? "Адские крепости и бастионы"
                                  : method.location.includes("Dark caves")
                                  ? "Тёмные пещеры и ночная поверхность"
                                  : method.location.includes("Overworld")
                                  ? "Равнины и леса Верхнего мира"
                                  : method.location
                                : method.location}
                            </div>
                          )}

                          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                            {language === "uz"
                              ? method.category === "Crafting"
                                ? "Kerakli ingredientlarni 3x3 ish stoliga to'g'ri joylashtirish orqali tayyorlanadi."
                                : method.title === "End City Ships"
                                ? "Tashqi End orollaridagi muallaq kema ichidagi ramkadan topiladi."
                                : method.title === "Evoker Drop"
                                ? "O'rmon saroyi yoki reydlarda Evokerni mag'lub etganda 100% tushadi."
                                : method.title === "Crafted with Nether Star"
                                ? "1 ta Nether Star, 3 ta obsidian va 5 ta shisha blokidan yasaladi."
                                : "Omon qolish (Survival) rejimida dunyoni kashf qilish yoki qazib olish orqali topiladi."
                              : language === "ru"
                              ? method.category === "Crafting"
                                ? "Создаётся путём размещения необходимых ингредиентов в сетке верстака 3x3 в точном соответствии с рецептом."
                                : method.title === "End City Ships"
                                ? "Находится в рамке на борту парящего Корабля Края на внешних островах Энда."
                                : method.title === "Evoker Drop"
                                ? "Гарантированно выпадает при победе над Заклинателем в Лесном особняке или во время рейдов."
                                : method.title === "Crafted with Nether Star"
                                ? "Крафтится из 1 Звезды Незера (выбивается с Иссушителя), 3 блоков обсидиана и 5 блоков стекла."
                                : "Добывается в режиме выживания при исследовании структур, генерации мира или сборе ресурсов."
                              : method.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── Modal Footer ── */}
          <div className="p-4 border-t border-white/10 bg-slate-950/80 flex items-center justify-between">
            <span className="text-xs font-mono text-cyan-400">
              minecraft:{item.id}
            </span>

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs border border-white/15 transition-all cursor-pointer font-bold"
            >
              {language === "uz" ? "Yopish [ESC]" : language === "ru" ? "Закрыть [ESC]" : "Close [ESC]"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
