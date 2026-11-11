import generatedItems from "./generatedItems.json";

export interface Ingredient {
  id: string;
  name: string;
  texture: string;
  color?: string;
}

export interface CraftingRecipe {
  type: "crafting_table" | "brewing_stand" | "smithing" | "uncraftable";
  grid?: (Ingredient | null)[]; // 9 slots for 3x3
  fuel?: Ingredient;
  result?: Ingredient;
  resultCount?: number;
}

export interface ObtainMethod {
  category: "Structure / Chest" | "Mob Drop" | "Mining" | "Crafting" | "Brewing" | "Fishing" | "Bartering" | "Spawn Condition";
  title: string;
  location?: string;
  chance?: string;
  details: string;
  iconTexture?: string;
}

export interface MobDrop {
  name: string;
  texture: string;
  chance: string;
  amount: string;
}

export interface MobDetails {
  type: "Hostile" | "Neutral" | "Passive" | "Boss";
  health: number; // in HP (20 HP = 10 hearts)
  attackDamage?: string;
  spawnLocations?: string[];
  drops: MobDrop[];
  behavior: string;
  fullBodyRender?: string;
}

export interface MinecraftItem {
  id: string;
  name: string;
  texture: string;
  category: "weapons_tools" | "armor" | "materials" | "blocks" | "potions" | "mobs" | "uncraftable";
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  isCraftable: boolean;
  description: string;
  tags: string[];
  themeColor: string;
  glowColor: string;
  stats?: { label: string; value: string; icon?: string }[];
  recipe: CraftingRecipe;
  obtain: ObtainMethod[];
  mobDetails?: MobDetails;
}

export interface OreMiningInfo {
  peakY: string;
  rangeY: string;
  dimension: string;
  pickaxeRequired: string;
  fortuneMultiplier: string;
  notesEn: string;
  notesRu: string;
  notesUz: string;
}

export const ORE_MINING_SOURCES: Record<string, OreMiningInfo> = {
  diamond_ore: {
    peakY: "Y: -58 to -64",
    rangeY: "Y: 16 to -64 (Generates triangularly deeper)",
    dimension: "Overworld (Deepslate Layer)",
    pickaxeRequired: "Iron Pickaxe or higher",
    fortuneMultiplier: "Fortune III drops up to 4 diamonds per block",
    notesEn: "Strip mining at Y: -58 or caving in deep aquifer ravines is the optimal method.",
    notesRu: "Оптимальная добыча: копание тоннелей на высоте Y: -58 или исследование глубоких пещер.",
    notesUz: "Eng optimal qazib olish: Y: -58 balandligida to'g'ri tunnel qazish yoki chuqur g'orlarni o'rganish.",
  },
  deepslate_diamond_ore: {
    peakY: "Y: -58 to -64",
    rangeY: "Y: 0 to -64",
    dimension: "Overworld (Deepslate Layer)",
    pickaxeRequired: "Iron Pickaxe or higher",
    fortuneMultiplier: "Fortune III drops up to 4 diamonds",
    notesEn: "Harder to break than stone diamond ore, but contains identical diamond drop rates.",
    notesRu: "Имеет повышенную прочность по сравнению с обычным камнем, даёт столько же алмазов.",
    notesUz: "Oddiy toshga nisbatan qattiqroq, ammo bir xil miqdorda olmos beradi.",
  },
  diamond: {
    peakY: "Y: -58 to -64",
    rangeY: "Y: 16 to -64",
    dimension: "Overworld (Mined from Diamond Ore)",
    pickaxeRequired: "Iron Pickaxe or higher",
    fortuneMultiplier: "Fortune III applies",
    notesEn: "Best acquired by mining with Fortune III at Y: -58.",
    notesRu: "Добывается из алмазной руды киркой с удачей III на глубине Y: -58.",
    notesUz: "Y: -58 chuqurlikda Fortune III sehriga ega temir yoki olmos cho'kich bilan olinadi.",
  },
  ancient_debris: {
    peakY: "Y: 15 (Peak concentration)",
    rangeY: "Y: 8 to 22 (Rarely up to Y: 119)",
    dimension: "The Nether (All Biomes)",
    pickaxeRequired: "Diamond Pickaxe or higher",
    fortuneMultiplier: "Unaffected by Fortune (Always drops 1 block)",
    notesEn: "Completely immune to lava and explosions. Bed-mining or TNT tunneling at Y: 15 is best.",
    notesRu: "Полный иммунитет к лаве и взрывам. Лучшая добыча: взрывы кроватями или ТНТ на Y: 15.",
    notesUz: "Lava va portlashlarga 100% chidamli. Eng yaxshi qazib olish: Y: 15 da karavot yoki TNT portlatish.",
  },
  iron_ore: {
    peakY: "Y: 16 & Y: 232 (Mountain peaks)",
    rangeY: "Y: -64 to 256",
    dimension: "Overworld",
    pickaxeRequired: "Stone Pickaxe or higher",
    fortuneMultiplier: "Fortune III boosts Raw Iron drops up to 4x",
    notesEn: "Generates in two massive peaks: mountain ridges and subterranean Y: 16.",
    notesRu: "Генерируется двумя пиками: на горных вершинах и под землёй на высоте Y: 16.",
    notesUz: "Ikki asosiy cho'qqida uchraydi: baland tog'lar va yerosti Y: 16 chuqurligi.",
  },
  deepslate_iron_ore: {
    peakY: "Y: -16 to -32",
    rangeY: "Y: 0 to -64",
    dimension: "Overworld (Deepslate)",
    pickaxeRequired: "Stone Pickaxe or higher",
    fortuneMultiplier: "Fortune III applies",
    notesEn: "Common in deep underground cave systems.",
    notesRu: "Обильно встречается в глубоких пещерных каньонах.",
    notesUz: "Chuqur yerosti g'orlarida ko'p miqdorda uchraydi.",
  },
  copper_ore: {
    peakY: "Y: 48 (Most abundant)",
    rangeY: "Y: -16 to 112 (Dripstone Caves)",
    dimension: "Overworld",
    pickaxeRequired: "Stone Pickaxe or higher",
    fortuneMultiplier: "Fortune III drops up to 20 Raw Copper from one block",
    notesEn: "Massively concentrated in Dripstone Cave biomes.",
    notesRu: "В огромных количествах генерируется в биомах Карстовых пещер.",
    notesUz: "Karst g'orlari (Dripstone Caves) biomlarida juda ko'p miqdorda paydo bo'ladi.",
  },
  deepslate_copper_ore: {
    peakY: "Y: -8 to 0",
    rangeY: "Y: 0 to -16",
    dimension: "Overworld",
    pickaxeRequired: "Stone Pickaxe or higher",
    fortuneMultiplier: "Fortune III applies",
    notesEn: "Found at bottom of standard copper vein limits.",
    notesRu: "Встречается на нижней границе медных залежей.",
    notesUz: "Mis qatlamlarining eng quyi chegarasida uchraydi.",
  },
  gold_ore: {
    peakY: "Y: -16 (Overworld) & Badlands Y: 32 to 256",
    rangeY: "Y: -64 to 32",
    dimension: "Overworld & Nether",
    pickaxeRequired: "Iron Pickaxe or higher",
    fortuneMultiplier: "Fortune III applies",
    notesEn: "Badlands (Mesa) biomes contain up to 10x more gold at any altitude.",
    notesRu: "В биомах Пустошей (Меса) золота генерируется в 10 раз больше на любой высоте.",
    notesUz: "Badlands (Mesa) biomida har qanday balandlikda 10 barobargacha ko'proq oltin bo'ladi.",
  },
  deepslate_gold_ore: {
    peakY: "Y: -16",
    rangeY: "Y: 0 to -64",
    dimension: "Overworld (Deepslate)",
    pickaxeRequired: "Iron Pickaxe or higher",
    fortuneMultiplier: "Fortune III applies",
    notesEn: "Found in lower Overworld deepslate.",
    notesRu: "Залегает в глубинных слоях Верхнего мира.",
    notesUz: "Tashqi olamning chuqur slanets qatlamlarida joylashgan.",
  },
  nether_gold_ore: {
    peakY: "Y: 10 to 117 (All Nether layers)",
    rangeY: "Y: 10 to 117",
    dimension: "The Nether",
    pickaxeRequired: "Wood Pickaxe or higher",
    fortuneMultiplier: "Fortune III yields up to 24 Gold Nuggets per block",
    notesEn: "Mining without Silk Touch alerts nearby Piglins unless invisible/out of range.",
    notesRu: "Добыча без Шёлкового касания провоцирует пиглинов поблизости.",
    notesUz: "Ipak teginishi (Silk Touch)siz qazilsa, yaqin atrofdagi Piglinlarni g'azablantiradi.",
  },
  redstone_ore: {
    peakY: "Y: -58 to -64",
    rangeY: "Y: 16 to -64",
    dimension: "Overworld (Deepslate)",
    pickaxeRequired: "Iron Pickaxe or higher",
    fortuneMultiplier: "Fortune III yields up to 6-8 redstone dust per block",
    notesEn: "Emits light level 9 when punched or stepped on.",
    notesRu: "Излучает свет уровня 9 при ударе или наступании.",
    notesUz: "Urilsa yoki ustiga bosilsa 9-darajali nur taratadi.",
  },
  deepslate_redstone_ore: {
    peakY: "Y: -58 to -64",
    rangeY: "Y: 0 to -64",
    dimension: "Overworld (Deepslate)",
    pickaxeRequired: "Iron Pickaxe or higher",
    fortuneMultiplier: "Fortune III applies",
    notesEn: "Very abundant near bedrock layers.",
    notesRu: "Очень часто встречается возле нижнего слоя бедрока.",
    notesUz: "Bedrok qatlamiga yaqin joylarda juda ko'p uchraydi.",
  },
  lapis_ore: {
    peakY: "Y: 0 (Exact middle layer)",
    rangeY: "Y: 64 to -64",
    dimension: "Overworld",
    pickaxeRequired: "Stone Pickaxe or higher",
    fortuneMultiplier: "Fortune III yields up to 36 Lapis Lazuli per block",
    notesEn: "Generates in triangular distribution centered precisely at Y: 0.",
    notesRu: "Распределяется треугольником с центром ровно на высоте Y: 0.",
    notesUz: "Aynan Y: 0 balandligida eng ko'p uchraydigan uchburchak taqsimotda paydo bo'ladi.",
  },
  deepslate_lapis_ore: {
    peakY: "Y: 0 to -16",
    rangeY: "Y: 0 to -64",
    dimension: "Overworld (Deepslate)",
    pickaxeRequired: "Stone Pickaxe or higher",
    fortuneMultiplier: "Fortune III applies",
    notesEn: "Found just below sea level down into deepslate.",
    notesRu: "Залегает на глубине от нулевой отметки вниз.",
    notesUz: "Nol balandlikdan pastdagi slanets qatlamlarida joylashgan.",
  },
  coal_ore: {
    peakY: "Y: 96 & Y: 136 (High mountains)",
    rangeY: "Y: 0 to 256",
    dimension: "Overworld",
    pickaxeRequired: "Wood Pickaxe or higher",
    fortuneMultiplier: "Fortune III yields up to 4 coal per block",
    notesEn: "Extremely abundant on exposed cliff faces and mountain sides.",
    notesRu: "В огромных количествах выходит на поверхность скал и гор.",
    notesUz: "Tog'lar va qoyalarning ochiq yuzalarida juda ko'p miqdorda uchraydi.",
  },
  emerald_ore: {
    peakY: "Y: 232 (Highest mountain peaks)",
    rangeY: "Y: -16 to 320 (Mountain biomes only)",
    dimension: "Overworld (Mountains only)",
    pickaxeRequired: "Iron Pickaxe or higher",
    fortuneMultiplier: "Fortune III yields up to 4 emeralds",
    notesEn: "Never generates in veins larger than 1-2 blocks. Mountain exclusive.",
    notesRu: "Никогда не генерируется большими жилами. Эксклюзив горных биомов.",
    notesUz: "Hech qachon 1-2 blokdan katta bo'lib paydo bo'lmaydi. Faqat tog' biomlarida bo'ladi.",
  },
  deepslate_emerald_ore: {
    peakY: "Y: -16 (Ultra-rare Collector's item)",
    rangeY: "Y: 0 to -16",
    dimension: "Overworld (Mountain deepslate)",
    pickaxeRequired: "Iron Pickaxe or higher",
    fortuneMultiplier: "Fortune III applies",
    notesEn: "Mathematically the rarest naturally generating ore block in vanilla Minecraft.",
    notesRu: "Самая редкая натуральная руда во всём ванильном Майнкрафте.",
    notesUz: "Minecraft o'yinidagi matematik jihatdan eng kamyob tabiiy ma'dan bloki.",
  },
  nether_quartz_ore: {
    peakY: "Y: 10 to 117 (Uniform distribution)",
    rangeY: "Y: 10 to 117",
    dimension: "The Nether",
    pickaxeRequired: "Wood Pickaxe or higher",
    fortuneMultiplier: "Fortune III yields up to 4 quartz crystals + high XP",
    notesEn: "Excellent source of fast experience points (XP) in early Nether survival.",
    notesRu: "Отличный источник быстрого опыта на ранней стадии выживания в Незере.",
    notesUz: "Netherda o'yin boshida tez tajriba (XP) to'plashning ajoyib manbai.",
  },
};

// Strict filter:
// 1. REMOVE Air block entirely
// 2. Remove duplicate copper block variants (keep only ONE pristine copper_block)
// 3. Remove all waxed_ duplicate blocks
const DUPLICATE_COPPER_IDS = new Set([
  "exposed_copper",
  "weathered_copper",
  "oxidized_copper",
  "cut_copper",
  "exposed_cut_copper",
  "weathered_cut_copper",
  "oxidized_cut_copper",
  "cut_copper_stairs",
  "exposed_cut_copper_stairs",
  "weathered_cut_copper_stairs",
  "oxidized_cut_copper_stairs",
  "cut_copper_slab",
  "exposed_cut_copper_slab",
  "weathered_cut_copper_slab",
  "oxidized_cut_copper_slab",
]);

export const ITEMS: MinecraftItem[] = (generatedItems as MinecraftItem[]).filter((item) => {
  // Remove Air
  if (item.id === "air" || item.id === "cave_air" || item.id === "void_air" || item.name.toLowerCase() === "air") {
    return false;
  }
  // Remove all waxed_ duplicates
  if (item.id.startsWith("waxed_")) {
    return false;
  }
  // Keep only ONE pristine copper block among weathered/cut variants
  if (DUPLICATE_COPPER_IDS.has(item.id)) {
    return false;
  }
  return true;
});

export const RARITY_INFO = {
  common: { color: "#ffffff", border: "#aaaaaa", label: "Common" },
  uncommon: { color: "#55ff55", border: "#22aa22", label: "Uncommon" },
  rare: { color: "#55ffff", border: "#00aaaa", label: "Rare" },
  epic: { color: "#ff55ff", border: "#aa00aa", label: "Epic" },
  legendary: { color: "#ffaa00", border: "#ff5500", label: "Legendary" },
};

export const RARITY_COLORS: Record<string, string> = {
  common: "#ffffff",
  uncommon: "#55ff55",
  rare: "#55ffff",
  epic: "#ff55ff",
  legendary: "#ffaa00",
};

export const TEXTURES = {
  diamond_pickaxe: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/diamond_pickaxe.png",
  crafting_table: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/crafting_table_top.png",
  elytra: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/elytra.png",
  beacon: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/beacon.png",
  zombie_head: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/zombie_head.png",
  boat: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/oak_boat.png",
  chest_boat: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/oak_chest_boat.png",
};

export function searchItems(query: string): MinecraftItem[] {
  if (!query.trim()) return ITEMS;
  const q = query.toLowerCase().trim();
  return ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q))
  );
}
