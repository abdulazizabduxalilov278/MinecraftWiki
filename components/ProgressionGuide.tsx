"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Trophy,
  X,
  CheckCircle2,
  Circle,
  Sparkles,
  Flame,
  ShieldAlert,
  Zap,
  ArrowRight,
  RotateCcw,
  Compass,
  Check,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface ProgressionTask {
  id: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  descUz: string;
  descRu: string;
  descEn: string;
}

export interface ProgressionGear {
  name: string;
  texture: string;
  purposeUz: string;
  purposeRu: string;
  purposeEn: string;
}

export interface ProgressionStage {
  id: number;
  stageNumber: string;
  icon: string;
  titleUz: string;
  titleRu: string;
  titleEn: string;
  subtitleUz: string;
  subtitleRu: string;
  subtitleEn: string;
  badgeUz: string;
  badgeRu: string;
  badgeEn: string;
  badgeColor: string;
  tasks: ProgressionTask[];
  recommendedGear: ProgressionGear[];
  speedrunTipUz: string;
  speedrunTipRu: string;
  speedrunTipEn: string;
  dangerWarningUz: string;
  dangerWarningRu: string;
  dangerWarningEn: string;
}

export const PROGRESSION_STAGES: ProgressionStage[] = [
  // 1-Bosqich
  {
    id: 1,
    stageNumber: "01",
    icon: "🪵",
    titleUz: "Boshlang'ich Hayot & Tosh Asri",
    titleRu: "Первые шаги и Каменный век",
    titleEn: "Day 1 Survival & Stone Age",
    subtitleUz: "Birinchi quyosh botishidan oldin omon qolish, yog'och va karavot tayyorlash",
    subtitleRu: "Выживание до захода солнца: дерево, первая кирка и кровать",
    subtitleEn: "Surviving before sunset: harvesting wood, crafting tools, and finding a bed",
    badgeUz: "1-KUN / ASOSIY",
    badgeRu: "ДЕНЬ 1 / ОСНОВА",
    badgeEn: "DAY 1 / ESSENTIAL",
    badgeColor: "from-amber-600 to-yellow-500",
    tasks: [
      {
        id: "s1_t1",
        titleUz: "Daraxt kesish va Taxtalar yasash",
        titleRu: "Добыть дерево и создать доски",
        titleEn: "Punch wood and craft planks",
        descUz: "Kamida 16-20 ta yog'och kesing. Ularni Crafting Table (Dastgoh) va tayoqchalarga aylantiring.",
        descRu: "Срубите 16-20 блоков древесины. Создайте верстак и палки.",
        descEn: "Chop at least 16-20 logs. Turn them into a Crafting Table and wooden sticks.",
      },
      {
        id: "s1_t2",
        titleUz: "Tosh Asriga o'tish",
        titleRu: "Перейти в каменный век",
        titleEn: "Upgrade to Stone Tools",
        descUz: "Yog'och cho'kich bilan 3 dona tosh qazib, zudlik bilan Tosh Cho'kich (Stone Pickaxe) va bolta yasang.",
        descRu: "Добудьте 3 камня деревянной киркой и сразу сделайте каменную кирку и топор.",
        descEn: "Mine 3 cobblestone with a wooden pickaxe and immediately upgrade to a stone pickaxe and axe.",
      },
      {
        id: "s1_t3",
        titleUz: "3 ta Qo'y topib Karavot (Bed) yasash",
        titleRu: "Найти овец и скрафтить кровать",
        titleEn: "Find 3 sheep and craft a Bed",
        descUz: "Kecha tushganda uxlamasangiz, Phantom mahluqlari paydo bo'ladi. Karavot o'lim nuqtasini ham saqlaydi.",
        descRu: "Кровать защитит от фантомов ночью и установит точку возрождения (спавн).",
        descEn: "Sleeping prevents Phantom attacks and sets your permanent respawn coordinate.",
      },
      {
        id: "s1_t4",
        titleUz: "Oziq-ovqat va Mash'ala (Torch) tayyorlash",
        titleRu: "Приготовить еду и сделать факелы",
        titleEn: "Cook food and craft torches",
        descUz: "Pechka (Furnace) yasang. Ko'mir qazib oling yoki yog'ochni pishirib ko'mir oling va go'shtlarni pishiring.",
        descRu: "Сделайте печь, добудьте уголь для факелов и пожарьте мясо для восстановления сил.",
        descEn: "Build a furnace, obtain coal or charcoal for torches, and roast raw meat for high saturation.",
      },
    ],
    recommendedGear: [
      {
        name: "Stone Pickaxe",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/stone_pickaxe.png",
        purposeUz: "Temir va tosh qazish uchun",
        purposeRu: "Для добычи железа и камня",
        purposeEn: "For mining stone & iron",
      },
      {
        name: "Red Bed",
        texture: "/icons/red_bed.png",
        purposeUz: "Kechani o'tkazib yuborish",
        purposeRu: "Пропуск ночи и точка спавна",
        purposeEn: "Skip night & set spawn",
      },
      {
        name: "Cooked Beef",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/cooked_beef.png",
        purposeUz: "Ochlik shkalasini to'ldirish",
        purposeRu: "Быстрое насыщение",
        purposeEn: "High saturation food",
      },
    ],
    speedrunTipUz: "Birinchi kundan uy qurishga aslo vaqt yo'qotmang! Karavot va pechkani o'zingiz bilan olib yuring yoki qishloq (Village) qidiring.",
    speedrunTipRu: "Не тратьте время на постройку дома в первый день! Носите кровать с собой или сразу ищите деревню жителей.",
    speedrunTipEn: "Never waste time building a dirt hut on Day 1! Keep a bed and furnace in your hotbar or sprint towards a village.",
    dangerWarningUz: "Birinchi tunda zombi va skeletlar bilan ochiq dalada to'qnashmang, darhol uxlab tong ottiring.",
    dangerWarningRu: "В первую ночь избегайте схваток со скелетами на открытой местности. Спите сразу при наступлении заката.",
    dangerWarningEn: "Avoid open fights with skeletons during night one. Jump into bed the exact second the sky dims.",
  },

  // 2-Bosqich
  {
    id: 2,
    stageNumber: "02",
    icon: "⚔️",
    titleUz: "Temir Asri & To'liq Himoya",
    titleRu: "Железный век и Полная экипировка",
    titleEn: "Iron Age & Shield Defense",
    subtitleUz: "Chuqur g'orlarni kashf etish, to'liq temir sovut va qalqon bilan qurollanish",
    subtitleRu: "Исследование пещер, крафт полного комплекта брони, щита и ведра",
    subtitleEn: "Spelunking in deep ravines, full iron armor set, shield, and water bucket",
    badgeUz: "HIMOYA ASOSI",
    badgeRu: "БРОНЯ И ЩИТ",
    badgeEn: "ESSENTIAL ARMOR",
    badgeColor: "from-slate-400 to-zinc-500",
    tasks: [
      {
        id: "s2_t1",
        titleUz: "Kamida 35+ dona Temir (Iron Ore) qazib olish",
        titleRu: "Добыть 35+ железной руды",
        titleEn: "Mine at least 35+ Iron Ore",
        descUz: "G'or yoki kanyonlarga tushib temir qazing va pechkada eritib Temir Quymasi (Iron Ingot) oling.",
        descRu: "Спуститесь в пещеры или овраги, добудьте железо и переплавьте его в слитки.",
        descEn: "Spelunk caves or surface ravines, smelt iron ore into ingots inside your furnace.",
      },
      {
        id: "s2_t2",
        titleUz: "To'liq Temir Sovut (Full Iron Armor) yasash",
        titleRu: "Скрафтить полный комплект железной брони",
        titleEn: "Craft Full Iron Armor Set",
        descUz: "Shlem (5), Ko'krak nishoni (8), Shim (7) va Etik (4) — jami 24 ta temir talab qiladi.",
        descRu: "Шлем (5), нагрудник (8), поножи (7) и ботинки (4) — суммарно 24 слитка железа.",
        descEn: "Helmet (5), Chestplate (8), Leggings (7), and Boots (4) for a total of 24 iron ingots.",
      },
      {
        id: "s2_t3",
        titleUz: "QALQON (Shield) yasash — 100% zarba himoyasi",
        titleRu: "Создать ЩИТ — 100% блок атак",
        titleEn: "Craft a SHIELD — 100% damage block",
        descUz: "1 ta temir va 6 ta taxta. Qalqon skelet o'qlari va hatto Kríper portlashini ham butunlay to'sadi!",
        descRu: "1 железо и 6 досок. Щит блокирует 100% урона от стрел и прямого взрыва крипера!",
        descEn: "1 iron + 6 planks. Blocks 100% of projectile damage and direct point-blank creeper blasts!",
      },
      {
        id: "s2_t4",
        titleUz: "Suv Chelagi (Water Bucket) tayyorlash",
        titleRu: "Создать ведро с водой (MLG)",
        titleEn: "Craft a Water Bucket (MLG clutch)",
        descUz: "3 ta temirdan chelak yasab suv to'ldiring. U balandlikdan yiqilganda o'limdan qutqaradi va lavani sovutadi.",
        descRu: "Спасает при падении с любой высоты (MLG) и мгновенно превращает лавовые озера в обсидиан.",
        descEn: "Crucial for negating lethal fall damage (MLG bucket trick) and turning lava pools into obsidian.",
      },
    ],
    recommendedGear: [
      {
        name: "Shield",
        texture: "/icons/shield.png",
        purposeUz: "Kríper va skelet o'qlarini to'sish",
        purposeRu: "Защита от взрывов и стрел",
        purposeEn: "Negates creeper & arrow hits",
      },
      {
        name: "Water Bucket",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/water_bucket.png",
        purposeUz: "MLG sakrash va lava o'chirish",
        purposeRu: "Спасение от падений и лавы",
        purposeEn: "Fall negation & obsidian creation",
      },
      {
        name: "Iron Chestplate",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/iron_chestplate.png",
        purposeUz: "+6 himoya nuqtasi",
        purposeRu: "+6 единиц брони",
        purposeEn: "+6 armor defense",
      },
    ],
    speedrunTipUz: "Qishloq topsangiz, 3 ta blok balandlikka chiqib Temir Golem (Iron Golem)ni o'ldiring: bu sizga qazimasdan darhol 3-5 ta temir beradi!",
    speedrunTipRu: "В деревне постройте столб из 3 блоков и победите Железного голема: мгновенно получите 3-5 слитков без шахты!",
    speedrunTipEn: "Pillar up 3 blocks in a village and take down the Iron Golem: free 3-5 ingots without setting foot in a mine!",
    dangerWarningUz: "G'orlarda qalqonni doim ikkinchi qo'lingizda (Off-hand) tuting. Kríper ovozini eshitishingiz bilan o'ng tugmani bosing!",
    dangerWarningRu: "Всегда держите щит во второй руке (F). При малейшем шипении крипера зажимайте блок!",
    dangerWarningEn: "Keep the shield locked in your off-hand. The millisecond you hear a creeper hiss, right-click immediately!",
  },

  // 3-Bosqich
  {
    id: 3,
    stageNumber: "03",
    icon: "💎",
    titleUz: "Olmos Qidiruvi & Qurollanish",
    titleRu: "Поиск Алмазов и Зачарования",
    titleEn: "Diamond Mining & Enchanting",
    subtitleUz: "Y: -58 chuqurlikdagi qatlamlar, olmos qurollar, obsidiyan va sehr stoli",
    subtitleRu: "Добыча на высоте Y: -58, обсидиан, стол зачарований и лук со стрелами",
    subtitleEn: "Digging down to Y: -58, obsidian mining, enchanting table, and long-range bow",
    badgeUz: "OLMOS DAVRI",
    badgeRu: "ЭРА АЛМАЗОВ",
    badgeEn: "DIAMOND ERA",
    badgeColor: "from-cyan-500 to-blue-600",
    tasks: [
      {
        id: "s3_t1",
        titleUz: "Y = -58 chuqurlikka tushish (1.18+ dunyo)",
        titleRu: "Спуститься на высоту Y = -58",
        titleEn: "Descend to depth Y = -58",
        descUz: "1.18+ yangilanishida olmoslar eng ko'p Y: -58 va -53 orasida to'planadi (eski versiyalarda Y = 11).",
        descRu: "В современных версиях максимум алмазов на Y: -58 (в старых версиях — на Y = 11).",
        descEn: "Diamonds concentrate heavily between Y: -53 and Y: -58 in modern versions (Y: 11 in older versions).",
      },
      {
        id: "s3_t2",
        titleUz: "Kamida 5 ta Olmos topish va Olmos Cho'kich yasash",
        titleRu: "Добыть 5 алмазов и сделать кирку",
        titleEn: "Mine 5 Diamonds & craft Diamond Pickaxe",
        descUz: "3 ta olmos bilan Diamond Pickaxe yasang (obsidiyan qazish uchun shart!), qolgan 2 tasi Sehr stoli uchun kerak.",
        descRu: "3 алмаза на алмазную кирку (нужна для обсидиана) и 2 алмаза на стол зачарований.",
        descEn: "Craft a Diamond Pickaxe (mandatory to break obsidian) and save 2 diamonds for the Enchanting Table.",
      },
      {
        id: "s3_t3",
        titleUz: "Kamida 10-14 dona Obsidiyan (Obsidian) qazib olish",
        titleRu: "Добыть 10-14 блоков обсидиана",
        titleEn: "Mine 10-14 Obsidian blocks",
        descUz: "Lava ko'liga suv quying va hosil bo'lgan obsidiyanni olmos cho'kich bilan qazib oling (Nether portali va stol uchun).",
        descRu: "Залейте лавовое озеро водой и добудьте обсидиан для портала в Незер и стола зачарований.",
        descEn: "Pour water over standing lava blocks to create obsidian for the Nether Portal and Enchanting Table.",
      },
      {
        id: "s3_t4",
        titleUz: "Sehr Stoli (Enchanting Table) va Kamon yasash",
        titleRu: "Создать стол зачарований и лук со стрелами",
        titleEn: "Craft Enchanting Table & Bow with arrows",
        descUz: "Sigir terisi + Qamish = Kitob. 1 ta Kitob + 2 ta Olmos + 4 ta Obsidiyan = Sehr Stoli. Zirh va qurollarga sehr bering!",
        descRu: "Книга + 2 алмаза + 4 обсидиана. Зачаруйте меч (Острота) и броню (Защита) перед походом в Незер.",
        descEn: "Combine Book + 2 Diamonds + 4 Obsidian. Enchant your gear with Protection and Sharpness before the Nether.",
      },
    ],
    recommendedGear: [
      {
        name: "Diamond Pickaxe",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/diamond_pickaxe.png",
        purposeUz: "Obsidiyan va qimmatbaho ma'danlar",
        purposeRu: "Добыча обсидиана и древних обломков",
        purposeEn: "Mining obsidian & ancient debris",
      },
      {
        name: "Enchanting Table",
        texture: "/icons/enchanting_table.png",
        purposeUz: "Qurol va sovutlarni kuchaytirish",
        purposeRu: "Зачарование снаряжения",
        purposeEn: "Powering up combat gear",
      },
      {
        name: "Bow",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/bow.png",
        purposeUz: "Uzoq masofadagi janglar uchun",
        purposeRu: "Стрельба на расстоянии",
        purposeEn: "Long range combat against Ghasts",
      },
    ],
    speedrunTipUz: "Speedrun usuli: Olmos cho'kich qazishga vaqt sarflamang! Lava ko'li toping, chelak bilan lavani olib suv yoniga qo'yib 10 ta blokli portal ramasini 1 daqiqada yasang!",
    speedrunTipRu: "Спидран-трюк: не ищите алмазы для кирки! Создайте портал из лавового озера прямо ведрами за 60 секунд!",
    speedrunTipEn: "Speedrun trick: Skip diamond mining! Mold a portal directly out of a surface lava pool using water and buckets in under a minute!",
    dangerWarningUz: "Y: -58 qatlamda kutilmagan lava oqimlari ko'p uchraydi. Hech qachon to'g'ridan-to'g'ri oyoq ostingizdagi blokni qazmang!",
    dangerWarningRu: "Никогда не копайте прямо под себя: глубокие пещеры усеяны скрытыми лавовыми карманами!",
    dangerWarningEn: "Never dig straight down at Y: -58. Hidden lava pockets are lethal without instant water reactions.",
  },

  // 4-Bosqich
  {
    id: 4,
    stageNumber: "04",
    icon: "🔥",
    titleUz: "Do'zax (Nether) O'lchamiga Sayohat",
    titleRu: "Экспедиция в Незер (Ад)",
    titleEn: "The Nether Dimension & Ingredients",
    subtitleUz: "Nether qal'asini topish, Blaze Rods va Ender Ko'zlarini (Eyes of Ender) yasash",
    subtitleRu: "Поиск Крепости Незера, добыча стержней ифритов и торговля с пиглинами",
    subtitleEn: "Infiltrating Nether Fortress, harvesting Blaze Rods, and bartering for Ender Pearls",
    badgeUz: "DO'ZAX BOSQICHI",
    badgeRu: "НЕЗЕР",
    badgeEn: "NETHER REALM",
    badgeColor: "from-red-600 to-orange-500",
    tasks: [
      {
        id: "s4_t1",
        titleUz: "Nether Portali yoqish va kirish",
        titleRu: "Активировать портал и войти в Незер",
        titleEn: "Ignite Portal & enter the Nether",
        descUz: "Flint and Steel (Chaquqtosh va po'lat) bilan portalni yoqing. Eslatma: Oltin etik (Golden Boots) kiyib oling, shunda Piglinlar hujum qilmaydi!",
        descRu: "Наденьте золотые ботинки, чтобы пиглины не атаковали, и зажгите огнивом обсидиановую рамку.",
        descEn: "Equip gold boots so Piglins stay neutral, then strike the obsidian frame with flint and steel.",
      },
      {
        id: "s4_t2",
        titleUz: "Nether Qal'asi (Nether Fortress)ni topish",
        titleRu: "Найти Адскую крепость (Nether Fortress)",
        titleEn: "Locate a Nether Fortress",
        descUz: "Qizil toshli baland ko'priklar va labirintlarga ega qal'ani qidiring (ko'pincha Z-o'qi bo'ylab harakatlanish osonroq).",
        descRu: "Ищите мосты из тёмно-красного адского кирпича вдоль оси X или Z.",
        descEn: "Scout along the Z-axis for towering nether brick bridges and fortress walkways.",
      },
      {
        id: "s4_t3",
        titleUz: "Kamida 7-10 ta Olov tayoqchasi (Blaze Rod) olish",
        titleRu: "Добыть 7-10 стержней ифрита (Blaze Rod)",
        titleEn: "Harvest 7-10 Blaze Rods",
        descUz: "Qal'adagi Blaze spawnerini toping va uchuvchi olovli iblislarni o'ldiring. Tayoqchalarni Olov kukuni (Blaze Powder)ga aylantiring.",
        descRu: "Уничтожайте ифритов на спавнере в крепости. Переработайте стержни в огненный порошок.",
        descEn: "Slay Blazes around spawners in the fortress. Convert their rods into essential Blaze Powder.",
      },
      {
        id: "s4_t4",
        titleUz: "12-16 ta Ender Pearl to'plash va Ender Ko'zi yasash",
        titleRu: "Добыть 12-16 жемчужин Края и скрафтить Око Края",
        titleEn: "Barter for 12-16 Ender Pearls & craft Eyes of Ender",
        descUz: "Piglinlarga Oltin quymalari tashlab savdo qiling (Bartering) yoki Endermen ovlang. Blaze Powder + Ender Pearl = Eye of Ender!",
        descRu: "Бросайте золотые слитки пиглинам для бартера жемчужин. Соедините порошок и жемчуг в Око Края.",
        descEn: "Toss gold ingots to Piglins to trade for pearls, then combine them with Blaze Powder to form Eyes of Ender.",
      },
    ],
    recommendedGear: [
      {
        name: "Eye of Ender",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/ender_eye.png",
        purposeUz: "Stronghold qidirish va portalni ochish",
        purposeRu: "Поиск крепости и активация портала",
        purposeEn: "Locating Stronghold & opening End Portal",
      },
      {
        name: "Golden Boots",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/golden_boots.png",
        purposeUz: "Piglinlarning do'stona munosabati",
        purposeRu: "Защита от агрессии пиглинов",
        purposeEn: "Keeps wild Piglins pacified",
      },
      {
        name: "Fire Resistance Potion",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/potion.png",
        purposeUz: "Lavada yonmaslik (8 daqiqa)",
        purposeRu: "Полный иммунитет к огню и лаве",
        purposeEn: "Full immunity to fire and lava damage",
      },
    ],
    speedrunTipUz: "Eng tezkor usul: Bastion Remnant qal'asini toping, ichidagi oltin bloklarni qazib oling va 15 ta piglinga bering — 2 daqiqada 20+ ta Ender Pearl olasiz!",
    speedrunTipRu: "Быстрый метод: найдите Бастион пиглинов, добудьте золотые блоки и заприте пиглинов в яме для моментального обмена!",
    speedrunTipEn: "Pro route: Locate a Bastion Remnant, mine the gold blocks, and box in piglins to trade for all 16 pearls in two minutes flat!",
    dangerWarningUz: "Wither skeletlarning qilich zarbasi zaharli qora 'Wither' effekti beradi. Ghast olov to'pini qilich bilan urib o'ziga qaytaring!",
    dangerWarningRu: "Удары визер-скелетов накладывают иссушение. Огненные шары гаста можно отбивать мечом обратно!",
    dangerWarningEn: "Wither skeletons inflict wither decay. Ghast fireballs can and should be batted back with any sword swing!",
  },

  // 5-Bosqich
  {
    id: 5,
    stageNumber: "05",
    icon: "🏰",
    titleUz: "Stronghold (Yerosti Qal'asi) Qidiruvi",
    titleRu: "Поиск Подземной Крепости (Stronghold)",
    titleEn: "Hunting the Stronghold",
    subtitleUz: "Ender ko'zlarini otib yo'nalishni topish, yerosti labirintlaridan portal xonasini topish",
    subtitleRu: "Броски Ока Края по триангуляции, раскопки и нахождение комнаты с порталом",
    subtitleEn: "Throwing Eyes of Ender for triangulation, excavating, and activating the End Portal",
    badgeUz: "PORTAL SARI",
    badgeRu: "К ПОРТАЛУ",
    badgeEn: "ROAD TO THE END",
    badgeColor: "from-emerald-600 to-teal-500",
    tasks: [
      {
        id: "s5_t1",
        titleUz: "Oddiy dunyoda Ender Ko'zini havoga otish",
        titleRu: "Бросить Око Края в воздух",
        titleEn: "Throw Eye of Ender into the sky",
        descUz: "Overworldga qayting. Eye of Ender'ni o'ng tugma bilan havoga oting: u qal'a tomonga qarab uchadi va yerga tushadi.",
        descRu: "Вернитесь в обычный мир и бросьте Око: оно полетит строго в направлении ближайшей крепости.",
        descEn: "Return to the Overworld and toss an eye: follow the exact azimuth towards which it floats.",
      },
      {
        id: "s5_t2",
        titleUz: "Ko'z yo'nalishi bo'ylab yugurish va triangulyatsiya qilish",
        titleRu: "Следовать за направлением Ока Края",
        titleEn: "Follow trajectory & pinpoint coordinates",
        descUz: "Uchgan yo'nalishda 400-600 blok yuguring. Agar yangi otilgan ko'z orqaga yoki to'g'ridan-to'g'ri yer ostiga qarab ketsa — qal'a shu yerda!",
        descRu: "Бегите 400-600 блоков. Когда брошенное око полетит прямо под землю — вы точно над крепостью!",
        descEn: "Run 400-600 blocks in that line. When a thrown eye floats directly into the dirt beneath your feet, stop and dig!",
      },
      {
        id: "s5_t3",
        titleUz: "Yer ostiga qazib Stronghold labirintiga kirish",
        titleRu: "Раскопать вход в Stronghold",
        titleEn: "Excavate down into the Stronghold",
        descUz: "Zina shaklida xavfsiz qazing. Tosh g'ishtlar (Stone Bricks) va temir panjaralarni ko'rsangiz — siz qal'aga kirdingiz.",
        descRu: "Спускайтесь спиральной лестницей. Как только появятся замшелые каменные кирпичи — вы на месте.",
        descEn: "Dig down in a safe spiral staircase until you hit mossy stone bricks and iron bars.",
      },
      {
        id: "s5_t4",
        titleUz: "Portal Xonasini topish va 12 ta ramkani to'ldirish",
        titleRu: "Найти комнату портала и вставить Очи Края",
        titleEn: "Locate End Portal Room & insert Eyes",
        descUz: "Kumushbaliqlar (Silverfish) uyasini yo'q qiling. 12 ta portal ramkasiga (End Portal Frame) yetishmayotgan ko'zlarni soling. Yulduzli portal ochiladi!",
        descRu: "Разбейте спавнер чешуйниц над лавой. Заполните недостающие рамки Очами Края — откроется бездна космоса!",
        descEn: "Break the silverfish spawner above the lava pit. Place remaining eyes into all empty frames to ignite the cosmic portal!",
      },
    ],
    recommendedGear: [
      {
        name: "End Portal Frame",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/end_portal_frame_top.png",
        purposeUz: "Portalni to'liq faollashtirish",
        purposeRu: "Активация портала в Край",
        purposeEn: "Completes portal ring",
      },
      {
        name: "Iron Bars",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/iron_bars.png",
        purposeUz: "Qal'a arxitekturasi belgisi",
        purposeRu: "Ориентир в коридорах крепости",
        purposeEn: "Stronghold structural marker",
      },
      {
        name: "Golden Apple",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/golden_apple.png",
        purposeUz: "Tezkor jon va qo'shimcha yuraklar",
        purposeRu: "Мгновенная регенерация и золотые сердца",
        purposeEn: "Emergency absorption & regen",
      },
    ],
    speedrunTipUz: "Stronghold labirintida adashmaslik uchun doim o'ng devor bo'ylab harakatlaning (Right-hand rule). Portal xonasi eshigi ko'pincha tosh zinapoyadan keyin keladi.",
    speedrunTipRu: "В лабиринте крепости держитесь правила правой руки. Комната с порталом обычно расположена в 4-6 комнатах от входа.",
    speedrunTipEn: "Stick to the right-hand wall rule in the corridors. The portal room typically sits within 5 rooms of the main entrance staircase.",
    dangerWarningUz: "Portal xonasidagi lava havzasiga tushib ketmang! Xonaga kirishingiz bilan lavaga suv quyib, uni tosh yoki obsidianga aylantiring.",
    dangerWarningRu: "Под рамками портала расположен бассейн с лавой! Сразу залейте его ведром воды перед активацией.",
    dangerWarningEn: "The portal sits directly over open lava! Pour water over the pool before touching the frames.",
  },

  // 6-Bosqich
  {
    id: 6,
    stageNumber: "06",
    icon: "🐉",
    titleUz: "Buyuk Jang: Ender Ajdahosini Yengish!",
    titleRu: "Финальная битва: Победа над Драконом Края",
    titleEn: "The Final Battle: Slaying the Ender Dragon",
    subtitleUz: "End kristallarini yo'q qilish, karavot portlatish (Bed strat) va Ajdaho tuxumini olish",
    subtitleRu: "Взрыв кристаллов Края, убийство дракона кроватями и добыча яйца дракона",
    subtitleEn: "Destroying End Crystals, one-cycle bed exploding strat, and claiming the Dragon Egg",
    badgeUz: "BUYUK G'ALABA",
    badgeRu: "БОСС КРАЯ",
    badgeEn: "BOSS DEFEAT",
    badgeColor: "from-purple-600 to-pink-500",
    tasks: [
      {
        id: "s6_t1",
        titleUz: "The End o'lchamiga sakrash va markazga o'tish",
        titleRu: "Прыгнуть в портал и выйти на центральный остров",
        titleEn: "Leap into The End & bridge to main island",
        descUz: "Obsidian platformada paydo bo'lasiz. Agar platforma havoda bo'lsa, bloklar bilan ehtiyotkorlik bilan orolga ko'prik quring.",
        descRu: "Вы появитесь на обсидиановой платформе. Аккуратно постройте мост из булыжника к центру острова.",
        descEn: "Spawn on the obsidian pad. Bridge carefully to the central obsidian pillars without tumbling into the Void.",
      },
      {
        id: "s6_t2",
        titleUz: "Barcha End Kristallarini (End Crystals) portlatish",
        titleRu: "Взорвать все кристаллы Края на башнях",
        titleEn: "Destroy all End Crystals atop towers",
        descUz: "Obsidian ustunlari ustidagi nurlanuvchi kristallarni kamon bilan oting. Panjarali 2 ta kristall uchun ustunga chiqib zarba bering.",
        descRu: "Стреляйте из лука по кристаллам на вершинах обсидиановых столбов, чтобы лишить дракона регенерации.",
        descEn: "Shoot crystals off high towers using your bow. Pillar up to crack the two iron-caged crystals manually.",
      },
      {
        id: "s6_t3",
        titleUz: "Ajdahoni o'ldirish (Kamon yoki Bed Strat)",
        titleRu: "Победить Дракона (Меч, Лук или Взрыв кроватей)",
        titleEn: "Defeat Dragon (Beds or Bow & Sword)",
        descUz: "Klassik: Markaziy poydevorga qo'nganda boshiga qilich bilan zarba bering. Pro Speedrun: Markazga karavot qo'yib uxlash tugmasini bosing — 4 ta karavot ajdahoni daqiqada yakson qiladi!",
        descRu: "Спидран-метод: когда дракон садится в центр, взрывайте кровати прямо у его головы из-за обсидианового блока!",
        descEn: "Speedrun Bed Strat: Place beds on the bedrock fountain when the dragon perches and right-click to detonate massive TNT-level damage!",
      },
      {
        id: "s6_t4",
        titleUz: "Ajdaho Tuxumi (Dragon Egg)ni olish va G'alaba!",
        titleRu: "Забрать Яйцо Дракона и прыгнуть в портал победы",
        titleEn: "Collect the Dragon Egg & claim Victory",
        descUz: "Ajdaho o'lgach 68+ level tajriba beradi. Tuxumni mash'ala ustiga tushirib inventarga oling va chiqish portaliga kiring. SIZ MINECRAFTNI YUTDINGIZ!",
        descRu: "Соберите 68 уровней опыта. Уроните яйцо на факел, чтобы забрать трофей, и прыгайте в титры поэмы Края!",
        descEn: "Collect 68 levels of XP. Drop the egg onto a torch to break it into an item, then leap into the fountain to beat the game!",
      },
    ],
    recommendedGear: [
      {
        name: "Dragon Egg",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/dragon_egg.png",
        purposeUz: "Minecraftdagi eng nodir g'alaba kubogi",
        purposeRu: "Главный трофей победы в игре",
        purposeEn: "Ultimate trophy of beating Minecraft",
      },
      {
        name: "Red Bed",
        texture: "/icons/red_bed.png",
        purposeUz: "Ajdahoga qarshi portlash quroli (Bed Strat)",
        purposeRu: "Оружие массового урона по дракону",
        purposeEn: "Devastating one-cycle detonation",
      },
      {
        name: "Slow Falling Potion",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/potion.png",
        purposeUz: "Ajdaho osmonga otganda qulamaslik",
        purposeRu: "Защита от подбрасывания драконом ввысь",
        purposeEn: "Soft floating landing when launched",
      },
    ],
    speedrunTipUz: "Karavot portlatganda o'zingiz bilan karavot orasiga 1 ta tosh yoki obsidian blok qo'ying: bu sizga yetadigan portlash zararini 80% ga kamaytiradi!",
    speedrunTipRu: "При взрыве кроватей всегда ставьте 1 блок булыжника между собой и подушкой — блок поглотит почти весь обратный взрыв!",
    speedrunTipEn: "Always place a single cobblestone block between yourself and the bed foot: it blocks 80% of explosion blowback onto you!",
    dangerWarningUz: "Ajdahoning binafsharang nafasi (Dragon's Breath) erga tushganda juda tez jon oladi. Havoga uchganda esa doim Suv Chelagingizni tayyor tuting!",
    dangerWarningRu: "Дыхание дракона на земле мгновенно уничтожает здоровье сквозь любую броню! Не наступайте на фиолетовые частицы.",
    dangerWarningEn: "Dragon's purple lingering breath bypasses normal armor protection entirely. Never stand in the cloud.",
  },

  // 7-Bosqich
  {
    id: 7,
    stageNumber: "07",
    icon: "🚀",
    titleUz: "O'yindan Keyingi Bosqich: Elitra & Cheksiz Parvoz",
    titleRu: "Эндшпиль: Элитры, Шалкеры и Маяк",
    titleEn: "Endgame Mastery: Elytra & Beacons",
    subtitleUz: "End shaharlarini kashf etish, Elitrani qo'lga kiritish, Shulker qutilari va Wither boss",
    subtitleRu: "Поиск Городов Края, крылья Элитры, шалкер-боксы и призыв Визера для Маяка",
    subtitleEn: "Raiding End Cities, securing the Elytra, building Shulker Boxes, and summoning the Wither",
    badgeUz: "MASTER / ENDGAME",
    badgeRu: "ЭЛИТНЫЙ ФИНАЛ",
    badgeEn: "ENDGAME GOD",
    badgeColor: "from-indigo-600 to-violet-500",
    tasks: [
      {
        id: "s7_t1",
        titleUz: "End Gateway portaliga Ender Pearl otish",
        titleRu: "Бросить жемчуг в портал Врат Края (Gateway)",
        titleEn: "Toss an Ender Pearl into End Gateway",
        descUz: "Orol chetida kichik binafsharang portal paydo bo'ladi. Uning ichiga Ender Pearl oting va uzoq orollarga o'ting.",
        descRu: "На краю острова появится плавающий портал из бедpushка. Киньте в него жемчуг Края для телепортации.",
        descEn: "Aim directly into the tiny floating bedrock gateway pod using a pearl to reach the outer islands.",
      },
      {
        id: "s7_t2",
        titleUz: "End Qal'asi (End City) va Uchar Kemani topish",
        titleRu: "Найти Город Края и Корабль Края (End Ship)",
        titleEn: "Locate End City & Flying End Ship",
        descUz: "Binafsharang minoralardan iborat qal'ani qidiring. Kema kabinasida ramkaga osilgan ELITRA (Elytra) qanotlarini oling!",
        descRu: "В трюме летающего корабля в рамке висят легендарные крылья Элитры — величайший артефакт игры.",
        descEn: "Climb the floating ship attached to the city and break the item frame holding the legendary Elytra wings!",
      },
      {
        id: "s7_t3",
        titleUz: "Shulker qutilari (Shulker Box) yasash",
        titleRu: "Скрафтить ящики шалкера (Shulker Box)",
        titleEn: "Craft portable Shulker Boxes",
        descUz: "Shulkerlarni o'ldirib qobig'ini (Shulker Shell) oling. Quti ichidagi narsalarni buzib ko'chirsa ham saqlab qoladi!",
        descRu: "Сделайте портативные сундуки из панцирей шалкеров: они сохраняют лут внутри даже после поломки.",
        descEn: "Combine 2 Shulker Shells + Chest. Shulker boxes retain every item inside when mined, expanding inventory endlessly.",
      },
      {
        id: "s7_t4",
        titleUz: "Mushak (Rockets) bilan cheksiz parvoz va Mayoq (Beacon)",
        titleRu: "Бесконечные полёты на фейерверках и Маяк",
        titleEn: "Endless Rocket Flight & Base Beacon",
        descUz: "Elitrani kiyib, porox va qog'ozdan yasalgan feyerverk bilan havoda tezlaning. Wither bossni o'ldirib mayoq o'rnating!",
        descRu: "Заряжайте фейерверки для мгновенного разгона в воздухе. Победите Визера и постройте пирамиду Маяка.",
        descEn: "Combine paper and gunpowder for flight rockets. Slay the Wither to place a gleaming pyramid Beacon at your main base!",
      },
    ],
    recommendedGear: [
      {
        name: "Elytra",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/elytra.png",
        purposeUz: "Minecraft osmonida erkin uchish",
        purposeRu: "Свободный полет сквозь облака",
        purposeEn: "High-speed supersonic aerial flight",
      },
      {
        name: "Firework Rocket",
        texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/firework_rocket.png",
        purposeUz: "Elitraga parvoz tezlanishi berish",
        purposeRu: "Реактивный ускоритель для крыльев",
        purposeEn: "Rocket thrust propulsion",
      },
      {
        name: "Beacon",
        texture: "/icons/beacon.png",
        purposeUz: "Tezkor qazish (Haste II) va kuch",
        purposeRu: "Эффекты Спешки II и регенерации на базе",
        purposeEn: "Haste II instant mining & base buff",
      },
    ],
    speedrunTipUz: "Elitraga imkon qadar tezroq Mending (Tuzatish) va Unbreaking III sehr kitoblarini bosing — shunda u tajriba sharlaridan o'z-o'zini tiklaydi va hech qachon sinmaydi!",
    speedrunTipRu: "Сразу наложите на элитры книги 'Починка' и 'Прочность III' — крылья будут вечно чиниться от обычного опыта!",
    speedrunTipEn: "Enchant your Elytra with Mending and Unbreaking III immediately: it will repair itself continuously from gathered XP orbs!",
    dangerWarningUz: "End orollari orasida uchayotganda bo'shliqqa (Void) qulab tushmang. Bo'shliqqa tushgan barcha nodir buyumlaringiz abadiy yo'qoladi!",
    dangerWarningRu: "Никогда не летайте с пустым запасом фейерверков над пустотой Края: упавшие вещи невозможно вернуть!",
    dangerWarningEn: "Never glide over the open Void without a full stack of rockets in your hand: falling into the void destroys all gear permanently.",
  },
];

interface ProgressionGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProgressionGuide({ isOpen, onClose }: ProgressionGuideProps) {
  const { language } = useLanguage();
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [activeStageId, setActiveStageId] = useState<number>(1);

  // Restore completed tasks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mc_progression_tasks_v2");
      if (saved) {
        setCompletedTasks(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Save to localStorage
  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev, [taskId]: !prev[taskId] };
      try {
        localStorage.setItem("mc_progression_tasks_v2", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const resetAllProgress = () => {
    setCompletedTasks({});
    try {
      localStorage.removeItem("mc_progression_tasks_v2");
    } catch {}
  };

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Total progress calculations
  const totalTasksCount = useMemo(() => {
    return PROGRESSION_STAGES.reduce((acc, s) => acc + s.tasks.length, 0);
  }, []);

  const completedCount = useMemo(() => {
    return Object.values(completedTasks).filter(Boolean).length;
  }, [completedTasks]);

  const progressPercentage = Math.round((completedCount / totalTasksCount) * 100);

  const activeStage = PROGRESSION_STAGES.find((s) => s.id === activeStageId) || PROGRESSION_STAGES[0];

  const getStageTitle = (s: ProgressionStage) => {
    if (language === "uz") return s.titleUz;
    if (language === "ru") return s.titleRu;
    return s.titleEn;
  };

  const getStageSubtitle = (s: ProgressionStage) => {
    if (language === "uz") return s.subtitleUz;
    if (language === "ru") return s.subtitleRu;
    return s.subtitleEn;
  };

  const getStageBadge = (s: ProgressionStage) => {
    if (language === "uz") return s.badgeUz;
    if (language === "ru") return s.badgeRu;
    return s.badgeEn;
  };

  const getTaskTitle = (t: ProgressionTask) => {
    if (language === "uz") return t.titleUz;
    if (language === "ru") return t.titleRu;
    return t.titleEn;
  };

  const getTaskDesc = (t: ProgressionTask) => {
    if (language === "uz") return t.descUz;
    if (language === "ru") return t.descRu;
    return t.descEn;
  };

  const getGearPurpose = (g: ProgressionGear) => {
    if (language === "uz") return g.purposeUz;
    if (language === "ru") return g.purposeRu;
    return g.purposeEn;
  };

  const getSpeedrunTip = (s: ProgressionStage) => {
    if (language === "uz") return s.speedrunTipUz;
    if (language === "ru") return s.speedrunTipRu;
    return s.speedrunTipEn;
  };

  const getDangerWarning = (s: ProgressionStage) => {
    if (language === "uz") return s.dangerWarningUz;
    if (language === "ru") return s.dangerWarningRu;
    return s.dangerWarningEn;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Dim backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0c1429]/95 border border-cyan-500/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-950/90 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-400 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.35)]">
              <div className="w-full h-full bg-[#0c1429] rounded-[14px] flex items-center justify-center">
                <Trophy size={20} className="text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {language === "uz"
                    ? "G'ALABA MASTERKLASSI"
                    : language === "ru"
                    ? "МАСТЕР-КЛАСС ПРОХОЖДЕНИЯ"
                    : "VICTORY WALKTHROUGH"}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {completedCount}/{totalTasksCount} ({progressPercentage}%)
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                {language === "uz"
                  ? "Minecraftni Yutish Ketma-ketligi"
                  : language === "ru"
                  ? "Пошаговое прохождение Minecraft"
                  : "How to Beat Minecraft Masterclass"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetAllProgress}
              className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/5"
              title={language === "uz" ? "Barcha belgilarni tozalash" : "Сбросить прогресс"}
            >
              <RotateCcw size={13} />
              <span className="hidden sm:inline">
                {language === "uz" ? "Tozalash" : language === "ru" ? "Сброс" : "Reset"}
              </span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 flex items-center justify-center transition-all cursor-pointer border border-white/5"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-900/90 h-2 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-300 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Main Content Layout: Sidebar Stages + Active Stage Details */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
          {/* Stages Navigation Sidebar */}
          <div className="w-full md:w-80 bg-slate-950/60 border-b md:border-b-0 md:border-r border-white/5 overflow-y-auto p-2.5 space-y-1.5 flex-shrink-0">
            <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
              {language === "uz" ? "Bosqichlar (1-7)" : language === "ru" ? "Этапы (1-7)" : "Stages (1-7)"}
            </div>

            {PROGRESSION_STAGES.map((s) => {
              const isSelected = s.id === activeStageId;
              const stageTasks = s.tasks.map((t) => t.id);
              const doneInStage = stageTasks.filter((id) => completedTasks[id]).length;
              const isStageComplete = doneInStage === stageTasks.length;

              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStageId(s.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-transform ${
                      isSelected ? "scale-110 bg-cyan-500/30 text-white" : "bg-slate-900 text-slate-300"
                    }`}
                  >
                    {s.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-cyan-400">
                        {language === "uz" ? `${s.id}-BOSQICH` : language === "ru" ? `ЭТАП ${s.id}` : `STAGE ${s.id}`}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {doneInStage}/{stageTasks.length}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-100 truncate">
                      {getStageTitle(s)}
                    </div>
                  </div>

                  {isStageComplete ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                  ) : (
                    <ChevronRight size={14} className="text-slate-600 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Stage Detail Panel */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Stage Hero Banner */}
            <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#0f1b38]/80 to-slate-950/90 border border-cyan-500/30 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white bg-gradient-to-r ${activeStage.badgeColor} shadow-sm`}
                    >
                      {getStageBadge(activeStage)}
                    </span>
                    <span className="text-xs font-mono text-cyan-400 font-bold">
                      {language === "uz"
                        ? `${activeStage.id}-Bosqich`
                        : language === "ru"
                        ? `Этап ${activeStage.id}`
                        : `Stage ${activeStage.id}`}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                    <span>{activeStage.icon}</span>
                    <span>{getStageTitle(activeStage)}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {getStageSubtitle(activeStage)}
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist: Tasks to Complete */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-cyan-400" />
                  {language === "uz"
                    ? "Bajarilishi Shart Bo'lgan Vazifalar (Checklist)"
                    : language === "ru"
                    ? "Обязательные задачи этапа (Чек-лист)"
                    : "Mandatory Stage Tasks (Checklist)"}
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  {activeStage.tasks.filter((t) => completedTasks[t.id]).length}/
                  {activeStage.tasks.length}{" "}
                  {language === "uz" ? "bajarildi" : language === "ru" ? "выполнено" : "done"}
                </span>
              </div>

              <div className="space-y-2">
                {activeStage.tasks.map((task) => {
                  const isDone = Boolean(completedTasks[task.id]);
                  return (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                        isDone
                          ? "bg-emerald-950/20 border-emerald-500/40 text-slate-300"
                          : "bg-slate-900/70 hover:bg-slate-800/80 border-white/5 hover:border-cyan-500/30 text-white"
                      }`}
                    >
                      <button
                        type="button"
                        className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                          isDone
                            ? "bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            : "border-2 border-slate-600 hover:border-cyan-400"
                        }`}
                      >
                        {isDone && <Check size={13} className="stroke-[3]" />}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-sm font-bold ${
                            isDone ? "line-through text-slate-400" : "text-slate-100"
                          }`}
                        >
                          {getTaskTitle(task)}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          {getTaskDesc(task)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommended Equipment */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono flex items-center gap-2">
                <Sparkles size={15} className="text-amber-400" />
                {language === "uz"
                  ? "Tavsiya Qilinadigan Qurol va Anjomlar"
                  : language === "ru"
                  ? "Рекомендуемое снаряжение и экипировка"
                  : "Recommended Gear & Key Assets"}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeStage.recommendedGear.map((gear, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center gap-3 shadow-sm hover:border-cyan-500/30 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center p-1.5 flex-shrink-0">
                      <img
                        src={gear.texture}
                        alt={gear.name}
                        className="w-full h-full object-contain [image-rendering:pixelated]"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/icons/raw_icon.png";
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white font-mono truncate">
                        {gear.name}
                      </div>
                      <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                        {getGearPurpose(gear)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Speedrun Pro-Tips & Danger Warnings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Speedrunner Tip */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5 font-mono">
                  <Zap size={14} className="text-amber-400" />
                  {language === "uz"
                    ? "Speedrun Pro Maslahati"
                    : language === "ru"
                    ? "Совет спидраннера"
                    : "Speedrun Pro-Tip"}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {getSpeedrunTip(activeStage)}
                </p>
              </div>

              {/* Danger Warning */}
              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-1.5">
                <div className="text-xs font-extrabold uppercase tracking-wider text-rose-300 flex items-center gap-1.5 font-mono">
                  <ShieldAlert size={14} className="text-rose-400" />
                  {language === "uz"
                    ? "Ehtiyot Bo'ling / Xavf"
                    : language === "ru"
                    ? "Внимание / Опасность"
                    : "Hazard / Danger Warning"}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {getDangerWarning(activeStage)}
                </p>
              </div>
            </div>

            {/* Next Stage Navigation Button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                disabled={activeStageId === 1}
                onClick={() => setActiveStageId((prev) => Math.max(1, prev - 1))}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeStageId === 1
                    ? "opacity-30 cursor-not-allowed bg-white/5 text-slate-500"
                    : "bg-white/10 hover:bg-white/15 text-slate-200"
                }`}
              >
                {language === "uz" ? "← Oldingi bosqich" : language === "ru" ? "← Предыдущий этап" : "← Previous Stage"}
              </button>

              <button
                disabled={activeStageId === PROGRESSION_STAGES.length}
                onClick={() => setActiveStageId((prev) => Math.min(PROGRESSION_STAGES.length, prev + 1))}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeStageId === PROGRESSION_STAGES.length
                    ? "opacity-30 cursor-not-allowed bg-white/5 text-slate-500"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                }`}
              >
                <span>
                  {language === "uz" ? "Keyingi bosqich →" : language === "ru" ? "Следующий этап →" : "Next Stage →"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
