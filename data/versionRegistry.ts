import versionItemSets from "./versionItemSets.json";

export type EditionType = "java" | "bedrock" | "mcpe" | "classic";

export interface EditionInfo {
  id: EditionType;
  labelEn: string;
  labelRu: string;
  labelUz: string;
  icon: string;
  badge: string;
  descriptionEn: string;
  descriptionRu: string;
  descriptionUz: string;
}

export interface VersionInfo {
  id: string;
  edition: EditionType;
  label: string;
  titleEn: string;
  titleRu: string;
  titleUz: string;
  year: string;
  itemCount: number;
  highlightBadge?: string;
  descriptionEn?: string;
  descriptionRu?: string;
  descriptionUz?: string;
}

export const SUPPORTED_EDITIONS: EditionInfo[] = [
  {
    id: "java",
    labelEn: "Java Edition (PC)",
    labelRu: "Java Edition (ПК)",
    labelUz: "Java Edition (Kompyuter)",
    icon: "☕",
    badge: "PC / Mac / Linux",
    descriptionEn: "Original flagship edition for desktop computers with full modding and snapshot history.",
    descriptionRu: "Оригинальное издание для ПК с полной поддержкой модов и снапшотов.",
    descriptionUz: "Kompyuterlar uchun original va eng boy versiya, to'liq modlar va yangilanishlar tarixi bilan.",
  },
  {
    id: "bedrock",
    labelEn: "Bedrock Edition",
    labelRu: "Bedrock Edition",
    labelUz: "Bedrock Edition",
    icon: "🪨",
    badge: "Console / Win 10",
    descriptionEn: "Cross-platform C++ engine for Windows 10/11, Xbox, PlayStation, and Nintendo Switch.",
    descriptionRu: "Кроссплатформенный движок C++ для Windows 10/11, Xbox, PlayStation и Switch.",
    descriptionUz: "Windows 10/11, Xbox, PlayStation va Nintendo Switch konsollari uchun krossplatforma tizimi.",
  },
  {
    id: "mcpe",
    labelEn: "Mobile (MCPE)",
    labelRu: "Телефон (MCPE)",
    labelUz: "Telefon (MCPE)",
    icon: "📱",
    badge: "Android & iOS",
    descriptionEn: "Pocket Edition era & mobile touchscreen gameplay from Nether Reactor Core to Tricky Trials.",
    descriptionRu: "Мобильное издание Pocket Edition: от эры Реактора Незера до Tricky Trials.",
    descriptionUz: "Android va iPhone uchun mo'ljallangan mobil versiya: qadimiy Nether Reactor davridan to hozirgacha.",
  },
  {
    id: "classic",
    labelEn: "Alpha & Beta Classic",
    labelRu: "Alpha, Beta и Классика",
    labelUz: "Alpha, Beta va Klassik",
    icon: "⏳",
    badge: "Nostalgia 2009-2011",
    descriptionEn: "Legendary historical releases: Classic 0.30, Alpha Halloween, and Beta 1.7.3 golden era.",
    descriptionRu: "Легендарные исторические версии: Classic 0.30, Хэллоуин Alpha и золотая эра Beta 1.7.3.",
    descriptionUz: "Afsonaviy qadimiy davr: Notch-ning ilk Classic 0.30, Alpha Halloween va oltin davr Beta 1.7.3.",
  },
];

export const SUPPORTED_VERSIONS: VersionInfo[] = [
  // ================= JAVA EDITION =================
  {
    id: "1.21.1",
    edition: "java",
    label: "Java 1.21.1 / 1.21.11+",
    titleEn: "Tricky Trials",
    titleRu: "Tricky Trials (Испытания)",
    titleUz: "Tricky Trials (Sinovlar)",
    year: "2024",
    highlightBadge: "CURRENT",
    itemCount: (versionItemSets as Record<string, string[]>)["1.21.1"]?.length || 1326,
    descriptionUz: "Trial Chambers, Shamol tayog'i (Breeze), Mace bolg'asi va avtomatlashtirilgan Crafter.",
  },
  {
    id: "1.20.4",
    edition: "java",
    label: "Java 1.20.4",
    titleEn: "Trails & Tales",
    titleRu: "Trails & Tales (Тропы и Сказки)",
    titleUz: "Trails & Tales (Izlar va Qissalar)",
    year: "2023",
    itemCount: (versionItemSets as Record<string, string[]>)["1.20.4"]?.length || 1327,
    descriptionUz: "Arxeologiya cho'tkasi, Sniffer dinozavri, Bambuk yog'ochi va Tuya (Camel).",
  },
  {
    id: "1.19.4",
    edition: "java",
    label: "Java 1.19.4",
    titleEn: "The Wild Update",
    titleRu: "Дикое обновление (The Wild)",
    titleUz: "Yovvoyi Tabiat (The Wild)",
    year: "2023",
    itemCount: (versionItemSets as Record<string, string[]>)["1.19.4"]?.length || 1297,
    descriptionUz: "Deep Dark o'lchami, Warden mahluqi, Mangrov botqoqligi va Qayiqda sandiq.",
  },
  {
    id: "1.18.2",
    edition: "java",
    label: "Java 1.18.2",
    titleEn: "Caves & Cliffs II",
    titleRu: "Пещеры и Скалы II",
    titleUz: "G'orlar va Qoyalar II",
    year: "2022",
    itemCount: (versionItemSets as Record<string, string[]>)["1.18.2"]?.length || 1168,
    descriptionUz: "Yangi Y: -64 gacha chuqur dunyo, ulkan g'orlar va Y: 320 baland tog'lar.",
  },
  {
    id: "1.17.1",
    edition: "java",
    label: "Java 1.17.1",
    titleEn: "Caves & Cliffs I",
    titleRu: "Пещеры и Скалы I",
    titleUz: "G'orlar va Qoyalar I",
    year: "2021",
    itemCount: (versionItemSets as Record<string, string[]>)["1.17.1"]?.length || 1167,
    descriptionUz: "Ametist geodalari, Mis (Copper), Aholotl (Axolotl) va Durbin (Spyglass).",
  },
  {
    id: "1.16.5",
    edition: "java",
    label: "Java 1.16.5",
    titleEn: "Nether Update",
    titleRu: "Обновление Незера (Nether)",
    titleUz: "Do'zax Yangilanishi (Nether)",
    year: "2021",
    itemCount: (versionItemSets as Record<string, string[]>)["1.16.5"]?.length || 1039,
    descriptionUz: "Netherite qurollari, Piglinlar, Bastion qal'asi va 4 ta yangi do'zax biomi.",
  },
  {
    id: "1.15.2",
    edition: "java",
    label: "Java 1.15.2",
    titleEn: "Buzzy Bees",
    titleRu: "Жужжащие пчёлы",
    titleUz: "G'o'ng'ir Asalarilar",
    year: "2020",
    itemCount: (versionItemSets as Record<string, string[]>)["1.15.2"]?.length || 940,
    descriptionUz: "Asalarilar, asal bloklari va asalarichilik uyalari.",
  },
  {
    id: "1.14.4",
    edition: "java",
    label: "Java 1.14.4",
    titleEn: "Village & Pillage",
    titleRu: "Деревня и Грабители",
    titleUz: "Qishloq va Bosqinchilar",
    year: "2019",
    itemCount: (versionItemSets as Record<string, string[]>)["1.14.4"]?.length || 932,
    descriptionUz: "Yangi qishloqliklar kasblari, Arbalet va Qaroqchilar reydi (Raid).",
  },
  {
    id: "1.13.2",
    edition: "java",
    label: "Java 1.13.2",
    titleEn: "Update Aquatic",
    titleRu: "Морское обновление",
    titleUz: "Suv Osti Yangilanishi",
    year: "2018",
    itemCount: (versionItemSets as Record<string, string[]>)["1.13.2"]?.length || 833,
    descriptionUz: "Okean tubi, Cho'kkan kemalar, Delfinlar, Toshbaqalar va Uch tishli nayza (Trident).",
  },
  {
    id: "1.12.2",
    edition: "java",
    label: "Java 1.12.2",
    titleEn: "World of Color",
    titleRu: "Мир Цветов",
    titleUz: "Ranglar Olami",
    year: "2017",
    itemCount: (versionItemSets as Record<string, string[]>)["1.12.2"]?.length || 380,
    descriptionUz: "Glazurlangan sopol plitkalar, Beton bloklar va to'tiqushlar.",
  },
  {
    id: "1.8.9",
    edition: "java",
    label: "Java 1.8.9",
    titleEn: "Bountiful (PvP Golden Era)",
    titleRu: "Bountiful Update (Эра PvP)",
    titleUz: "Bountiful Update (PvP Oltin Davri)",
    year: "2015",
    itemCount: (versionItemSets as Record<string, string[]>)["1.8.9"]?.length || 273,
    descriptionUz: "Klassik 1.8 PvP zarba mexanikasi, Ocean Monument qal'asi va Zirh stendi.",
  },
  {
    id: "1.7.10",
    edition: "java",
    label: "Java 1.7.10",
    titleEn: "Update That Changed World",
    titleRu: "Обновление, изменившее мир",
    titleUz: "Dunyoni O'zgartirgan Yangilanish",
    year: "2014",
    itemCount: (versionItemSets as Record<string, string[]>)["1.7.10"]?.length || 241,
    descriptionUz: "Ikki barobar ko'paygan biomlar, Rangli shishalar va modlar uchun eng barqaror poydevor.",
  },

  // ================= BEDROCK EDITION =================
  {
    id: "bedrock_1.21",
    edition: "bedrock",
    label: "Bedrock 1.21",
    titleEn: "Bedrock Tricky Trials",
    titleRu: "Bedrock Tricky Trials",
    titleUz: "Bedrock 1.21 (Sinovlar)",
    year: "2024",
    highlightBadge: "CONSOLE / PC",
    itemCount: (versionItemSets as Record<string, string[]>)["bedrock_1.21"]?.length || 1326,
    descriptionUz: "RenderDragon grafikasi, do'stlar bilan krossplatforma va sinov xonalari.",
  },
  {
    id: "bedrock_1.20",
    edition: "bedrock",
    label: "Bedrock 1.20",
    titleEn: "Bedrock Trails & Tales",
    titleRu: "Bedrock Trails & Tales",
    titleUz: "Bedrock 1.20 (Izlar va Qissalar)",
    year: "2023",
    itemCount: (versionItemSets as Record<string, string[]>)["bedrock_1.20"]?.length || 925,
    descriptionUz: "Bambukdan yasalgan sal (Raft) va arxeologik qazilmalar.",
  },
  {
    id: "bedrock_1.19",
    edition: "bedrock",
    label: "Bedrock 1.19",
    titleEn: "Bedrock The Wild Update",
    titleRu: "Bedrock The Wild Update",
    titleUz: "Bedrock 1.19 (Yovvoyi Tabiat)",
    year: "2022",
    itemCount: (versionItemSets as Record<string, string[]>)["bedrock_1.19"]?.length || 1297,
    descriptionUz: "Warden, Allay do'stona ruhi va Mangrov daraxtzorlari.",
  },
  {
    id: "bedrock_1.18",
    edition: "bedrock",
    label: "Bedrock 1.18",
    titleEn: "Bedrock Caves & Cliffs",
    titleRu: "Bedrock Caves & Cliffs",
    titleUz: "Bedrock 1.18 (G'orlar va Qoyalar)",
    year: "2021",
    itemCount: (versionItemSets as Record<string, string[]>)["bedrock_1.18"]?.length || 721,
    descriptionUz: "Yangi dunyo balandligi va chuqurlashgan kanyonlar.",
  },
  {
    id: "bedrock_1.16",
    edition: "bedrock",
    label: "Bedrock 1.16",
    titleEn: "Bedrock Nether Update",
    titleRu: "Bedrock Nether Update",
    titleUz: "Bedrock 1.16 (Nether)",
    year: "2020",
    itemCount: (versionItemSets as Record<string, string[]>)["bedrock_1.16"]?.length || 598,
    descriptionUz: "Netherite zaxiralari va Target nishon bloki.",
  },

  // ================= TELEFON / MCPE (POCKET EDITION) =================
  {
    id: "mcpe_1.21",
    edition: "mcpe",
    label: "MCPE 1.21 (Telefon)",
    titleEn: "Pocket Edition 1.21",
    titleRu: "MCPE 1.21 (Смартфоны)",
    titleUz: "MCPE 1.21 (Android & iOS)",
    year: "2024",
    highlightBadge: "MOBILE",
    itemCount: (versionItemSets as Record<string, string[]>)["mcpe_1.21"]?.length || 1326,
    descriptionUz: "Smartfonlar uchun to'liq sensor boshqaruvli Tricky Trials va sinov xonalari.",
  },
  {
    id: "mcpe_1.20",
    edition: "mcpe",
    label: "MCPE 1.20 (Telefon)",
    titleEn: "Pocket Edition 1.20",
    titleRu: "MCPE 1.20 (Смартфоны)",
    titleUz: "MCPE 1.20 (Trails & Tales Mobil)",
    year: "2023",
    itemCount: (versionItemSets as Record<string, string[]>)["mcpe_1.20"]?.length || 925,
    descriptionUz: "Telefonda arxeologiya va tuyalarda 2 kishi bo'lib minish imkoniyati.",
  },
  {
    id: "mcpe_1.16",
    edition: "mcpe",
    label: "MCPE 1.16 (Telefon)",
    titleEn: "Pocket Edition 1.16",
    titleRu: "MCPE 1.16 (Смартфоны)",
    titleUz: "MCPE 1.16 (Nether Mobil)",
    year: "2020",
    itemCount: (versionItemSets as Record<string, string[]>)["mcpe_1.16"]?.length || 598,
    descriptionUz: "Do'zaxdagi barcha yangi biomlar telefonga ilk bor to'liq olib kelingan versiya.",
  },
  {
    id: "mcpe_1.0",
    edition: "mcpe",
    label: "MCPE 1.0 (Ender Update)",
    titleEn: "MCPE 1.0 Ender Update",
    titleRu: "MCPE 1.0 Обновление Края",
    titleUz: "MCPE 1.0 (Ajdaho O'lchami Davri)",
    year: "2016",
    itemCount: (versionItemSets as Record<string, string[]>)["mcpe_1.0"]?.length || 246,
    descriptionUz: "Smartfonda The End o'lchami va Ender Dragon paydo bo'lgan burilish nuqtasi.",
  },
  {
    id: "mcpe_0.15",
    edition: "mcpe",
    label: "MCPE 0.15 (Friendly Update)",
    titleEn: "MCPE 0.15 The Friendly Update",
    titleRu: "MCPE 0.15 The Friendly Update",
    titleUz: "MCPE 0.15 (Pistonlar va Otlar)",
    year: "2016",
    itemCount: (versionItemSets as Record<string, string[]>)["mcpe_0.15"]?.length || 226,
    descriptionUz: "Mobil Minecraftga Otlar, Pistonlar va Redstone mexanizmlari qo'shilgan versiya.",
  },
  {
    id: "mcpe_0.14",
    edition: "mcpe",
    label: "MCPE 0.14 (Nether Reactor)",
    titleEn: "MCPE 0.14 Overworld Update",
    titleRu: "MCPE 0.14 Overworld Update",
    titleUz: "MCPE 0.14 (Nether Reactor Core Davri)",
    year: "2016",
    itemCount: (versionItemSets as Record<string, string[]>)["mcpe_0.14"]?.length || 191,
    descriptionUz: "Nether Reactor Core orqali spiral do'zax binosi hosil qilingan nostalgiya cho'qqisi.",
  },

  // ================= HISTORICAL: ALPHA / BETA / CLASSIC =================
  {
    id: "beta_1.8",
    edition: "classic",
    label: "Beta 1.8 (Adventure)",
    titleEn: "Beta 1.8 Adventure Update",
    titleRu: "Beta 1.8 Приключенческое обновление",
    titleUz: "Beta 1.8 (Sarguzasht Yangilanishi)",
    year: "2011",
    itemCount: (versionItemSets as Record<string, string[]>)["beta_1.8"]?.length || 234,
    descriptionUz: "Ochlik (Hunger) shkalasi, Tez yugurish (Sprint), Enderman va Tajriba (XP).",
  },
  {
    id: "beta_1.7.3",
    edition: "classic",
    label: "Beta 1.7.3 (Golden Era)",
    titleEn: "Beta 1.7.3 Legendary Era",
    titleRu: "Beta 1.7.3 Золотая эра",
    titleUz: "Beta 1.7.3 (Minecraftning Oltin Davri)",
    year: "2011",
    itemCount: (versionItemSets as Record<string, string[]>)["beta_1.7.3"]?.length || 226,
    descriptionUz: "Ochlik shkalasisiz bevosita ovqat yeb jon to'ldirish, afsonaviy neon o'tlar.",
  },
  {
    id: "alpha_1.2.6",
    edition: "classic",
    label: "Alpha v1.2.6 (Halloween)",
    titleEn: "Alpha v1.2.6 Halloween Update",
    titleRu: "Alpha v1.2.6 Хэллоуинское обновление",
    titleUz: "Alpha v1.2.6 (Do'zaxning Tug'ilishi)",
    year: "2010",
    itemCount: (versionItemSets as Record<string, string[]>)["alpha_1.2.6"]?.length || 221,
    descriptionUz: "Nether o'lchami, Ghast va Qovoqlar ilk bor o'yinga kiritilgan 2010-yilgi davr.",
  },
  {
    id: "alpha_1.0.14",
    edition: "classic",
    label: "Alpha v1.0.14 (Redstone)",
    titleEn: "Alpha v1.0.14 Redstone Dawn",
    titleRu: "Alpha v1.0.14 Зарождение Редстоуна",
    titleUz: "Alpha v1.0.14 (Redstoun va Vagonetkalar)",
    year: "2010",
    itemCount: (versionItemSets as Record<string, string[]>)["alpha_1.0.14"]?.length || 217,
    descriptionUz: "Redstone changi va temir yo'l vagonetkalari birinchi marta o'yinga kelgan payt.",
  },
  {
    id: "classic_0.30",
    edition: "classic",
    label: "Classic 0.30 (Notch 2009)",
    titleEn: "Classic 0.30 Primitive",
    titleRu: "Classic 0.30 Первозданный",
    titleUz: "Classic 0.30 (Notch-ning Ilk 32 Bloki)",
    year: "2009",
    highlightBadge: "2009 ORIGINAL",
    itemCount: (versionItemSets as Record<string, string[]>)["classic_0.30"]?.length || 25,
    descriptionUz: "Faqat 32 ta eng oddiy qurilish bloklari: Tosh, Tuproq, O't va Rangli junlar.",
  },
];

export const DEFAULT_VERSION = "1.21.1";
export const DEFAULT_EDITION: EditionType = "java";

// Fast lookup sets created on module initialization
const VERSION_LOOKUP_SETS: Record<string, Set<string>> = {};
for (const [v, ids] of Object.entries(versionItemSets as Record<string, string[]>)) {
  VERSION_LOOKUP_SETS[v] = new Set(ids);
}

export function isItemInVersion(itemId: string, version: string = DEFAULT_VERSION): boolean {
  const normalizedVersion = version === "1.21.11" ? "1.21.1" : version;
  const set = VERSION_LOOKUP_SETS[normalizedVersion] || VERSION_LOOKUP_SETS[DEFAULT_VERSION];
  return set ? set.has(itemId) : true;
}

export function getEditionForVersion(versionId: string): EditionType {
  const found = SUPPORTED_VERSIONS.find((v) => v.id === versionId);
  return found ? found.edition : "java";
}
