"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MinecraftItem } from "@/data/items";

export type Language = "en" | "ru" | "uz";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getItemName: (item: MinecraftItem) => string;
  getItemDesc: (item: MinecraftItem) => string;
  getCategoryName: (cat: string) => string;
}

const UI_DICTIONARY: Record<Language, Record<string, string>> = {
  en: {
    // Welcome Menu
    welcomeBadge: "MC-DEX · 3D COMPANION (1.12 - 1.21+)",
    welcomeTitle: "MC-DEX ENCYCLOPEDIA",
    welcomeSubtitle: "Select a portal below to explore complete crafting recipes, examine authentic 3D models with 360° orbit inspection, and delve into technical mechanics.",
    menuBack: "Main Menu",
    secItemsTitle: "Items & Crafting",
    secItemsDesc: "1,200+ blocks, tools, and weapons. Authentic 3x3 crafting recipes and subterranean ore Y-level guides.",
    secMobsTitle: "Mobs & Entities",
    secMobsDesc: "80+ living creatures. High-fidelity 3D mob models with 360° orbit, combat stats, and loot drop tables.",
    secWikiTitle: "Wikipedia & Secrets",
    secWikiDesc: "Technical redstone, Turing computers, 1.21 Tricky Trials, and historical engine exploits.",
    secPotionsTitle: "Potion Alchemy",
    secPotionsDesc: "Interactive Brewing Stand flowcharts, ingredient trees, and duration upgrade recipes.",
    secProgressionTitle: "How to Beat Minecraft",
    secProgressionDesc: "Step-by-step masterclass: Day 1 survival, diamond strip mining, Nether fortress, Stronghold triangulation, Dragon bed strat, and Elytra flight.",
    beatMinecraftNav: "Beat Minecraft",
    aiAssistantNav: "AI Assistant",

    // Header & Brand
    brandTitle: "MC-DEX",
    brandSubtitle: "3D Interactive Crafting & Item Encyclopedia",
    searchPlaceholder: "Search 1,300+ items, blocks, potions, mobs...",
    wikiBtn: "Wikipedia",
    supportBtn: "Contact Support",
    versionSelector: "Minecraft Version",

    // Categories
    cat_all: "All Items",
    cat_blocks: "Blocks",
    cat_potions: "Potions",
    cat_weapons_tools: "Weapons & Tools",
    cat_craftable: "Craftables",
    cat_uncraftable: "Uncraftables",
    cat_mobs: "Mobs & Entities",
    cat_materials: "Materials",

    // Hero
    heroBadge: "1,328+ MINECRAFT ASSETS · 360° 3D ORBIT · VERSION SWITCHER",
    heroTitle: "Comprehensive Minecraft Crafting & 3D Guide",
    heroSubtitle: "Explore every block, mob, weapon, and crafting pattern in Minecraft 1.12 to 1.21+. Filter items and authentic recipes dynamically for your exact game version.",
    statItems: "1,300+ Items & Blocks",
    statMobs: "80+ Real In-Game Mobs",
    stat3D: "3D Orbit Inspection",

    // Item List
    showingCount: "Showing {count} of {total} Minecraft assets",
    loadMore: "Load More Items",
    noResultsTitle: "No Minecraft items found",
    noResultsDesc: "Try adjusting your search terms or selecting a different category filter.",
    resetFilter: "Reset to All Items",

    // Modal Tabs & Headings
    tabOverview: "Overview & Recipe",
    tab3D: "3D Orbit Viewer",
    tab3DTag: "360° Orbit Inspection",
    tabMechanics: "Mechanics & Usage",
    badgeCraftable: "Craftable in 3x3",
    badgeUncraftable: "Uncraftable Item",
    badgeMob: "Living Entity / Mob",
    recipeTitle: "3x3 Crafting Table Recipe",
    recipeResult: "Output: {count}x {name}",
    howToObtain: "How to Obtain & Find",
    mobDrops: "Mob Drops & Loot Table",
    mobStats: "Entity Combat & Health Stats",
    behavior: "AI Behavior & Combat Profile",
    spawnCondition: "Natural Spawn Conditions",

    // 3D Test Zone & Controls
    clickToEnter: "Click to inspect in 3D orbit",
    testZoneActive: "3D ORBIT ACTIVE: Left Click — Rotate · Right Click — Pan · Scroll — Zoom",
    mobInspectMode: "MOB INSPECTION: 2D combat cards & loot statistics",
    blockInspectMode: "BLOCK INSPECTION: Examine the authentic 3D block from all 6 angles",
    itemGroundMode: "DROPPED ITEM: Hovering in 3D space with genuine voxel textures",
    pickUpPrompt: "Click to inspect details",
    itemInInventory: "Item selected",
    dropBtn: "Close",
    pickupBtn: "Inspect",
    hitsLanded: "Hits Landed",
    testElytraGlide: "Test Elytra Glide",
    glidingActive: "Gliding in Air...",
    simulateFatalDamage: "Simulate Fatal Damage",
    deathPrevented: "DEATH PREVENTED!",
    totemEffect: "Totem of Undying Activated! Restored Health + Absorption & Fire Resistance",
    hotbarLabel: "Item Inspector",
    howToPlayTitle: "How to use the 3D Viewer:",
    instruction1: "1. Left Click + Drag to rotate 360° smoothly around the 3D model.",
    instruction2: "2. Right Click + Drag to pan camera across the model surface.",
    instruction3: "3. Use the Scroll Wheel to zoom in and examine pixel-perfect textures.",
    instruction4: "4. Click Mechanics tab to review stats, brewing recipes, or beacon pyramid builds.",
    instruction5: "5. Use the Version Selector to view version-specific recipes from 1.12 to 1.21+.",
    instruction6: "6. Press ESC anytime to close the modal.",

    // Footer
    footerRights: "Antigravity Minecraft Companion. Authentic in-game textures and dynamic version data.",
    footerDevNotice: "Built for Minecraft enthusiasts. All assets belong to Mojang Studios.",

    // Wiki Page
    wikiTitle: "Minecraft Wiki, Secrets & OG Glitches",
    wikiSubtitle: "Uncover deep trivia, hidden technical mechanics, and legendary historical bugs that defined Minecraft.",
    backToCrafting: "Back to Crafting Guide",
    sectionTrivia: "Deep Game Trivia & Hidden Mechanics",
    sectionOGBugs: "Legendary OG Bugs & Exploits",
    eraLabel: "Era / Versions",
  },
  ru: {
    // Welcome Menu
    welcomeBadge: "MC-DEX · 3D БАЗА ЗНАНИЙ (1.12 - 1.21+)",
    welcomeTitle: "MC-DEX ЭНЦИКЛОПЕДИЯ",
    welcomeSubtitle: "Выберите раздел ниже для изучения полных рецептов крафта, осмотра аутентичных 3D моделей с вращением на 360° и изучения механик.",
    menuBack: "Главное меню",
    secItemsTitle: "Предметы и Крафт",
    secItemsDesc: "1200+ блоков, инструментов и оружия. Аутентичные рецепты 3x3 и таблицы высот руд.",
    secMobsTitle: "Мобы и Существа",
    secMobsDesc: "80+ живых существ. Высокодетализированные 3D модели с обзором 360°, характеристики и дроп.",
    secWikiTitle: "Википедия и Секреты",
    secWikiDesc: "Технический редстоун, компьютеры Тьюринга, обновление 1.21 Tricky Trials и исторические баги.",
    secPotionsTitle: "Зельеварение",
    secPotionsDesc: "Интерактивная варочная стойка, деревья ингредиентов и рецепты улучшения длительности зелий.",
    secProgressionTitle: "Как пройти Minecraft",
    secProgressionDesc: "Пошаговый мастер-класс: выживание в 1-й день, Y: -58, Незер, Око Края, победа над Драконом и крылья Элитры.",
    beatMinecraftNav: "Как пройти игру",
    aiAssistantNav: "ИИ-Помощник",

    // Header & Brand
    brandTitle: "MC-DEX",
    brandSubtitle: "3D интерактивный гид по крафту и энциклопедия предметов",
    searchPlaceholder: "Поиск 1300+ предметов, блоков, зелий, мобов...",
    wikiBtn: "Википедия",
    supportBtn: "Поддержка в Telegram",
    versionSelector: "Версия Minecraft",

    // Categories
    cat_all: "Все предметы",
    cat_blocks: "Блоки",
    cat_potions: "Зелья",
    cat_weapons_tools: "Оружие и инструменты",
    cat_craftable: "Создаваемые",
    cat_uncraftable: "Несоздаваемые",
    cat_mobs: "Мобы и сущности",
    cat_materials: "Материалы",

    // Hero
    heroBadge: "1328+ АССЕТОВ МАЙНКРАФТ · 3D ORBIT ОБЗОР · ВЫБОР ВЕРСИИ 1.12 - 1.21+",
    heroTitle: "Полный 3D справочник и рецепты крафта Майнкрафт",
    heroSubtitle: "Исследуйте каждый блок, моба, оружие и рецепт в Майнкрафт от 1.12 до 1.21+. Выбирайте версию игры для мгновенной фильтрации предметов и аутентичных рецептов.",
    statItems: "1300+ предметов и блоков",
    statMobs: "80+ живых мобов",
    stat3D: "3D 360° осмотр",

    // Item List
    showingCount: "Показано {count} из {total} предметов Майнкрафт",
    loadMore: "Загрузить больше предметов",
    noResultsTitle: "Предметы Майнкрафт не найдены",
    noResultsDesc: "Попробуйте изменить поисковый запрос или выбрать другую категорию.",
    resetFilter: "Сбросить на все предметы",

    // Modal Tabs & Headings
    tabOverview: "Обзор и рецепт",
    tab3D: "3D Осмотр",
    tab3DTag: "360° вращение",
    tabMechanics: "Механика и применение",
    badgeCraftable: "Создаётся в верстаке 3x3",
    badgeUncraftable: "Несоздаваемый предмет",
    badgeMob: "Живое существо / Моб",
    recipeTitle: "Рецепт крафта в верстаке 3x3",
    recipeResult: "Результат: {count}x {name}",
    howToObtain: "Где найти и как добыть",
    mobDrops: "Таблица дропа и добыча",
    mobStats: "Характеристики здоровья и урона",
    behavior: "Поведение ИИ и боевой стиль",
    spawnCondition: "Условия естественного спавна",

    // 3D Test Zone & Controls
    clickToEnter: "Нажмите для осмотра в 3D",
    testZoneActive: "3D ОСМОТР: ЛКМ — вращение на 360° · ПКМ — панорама · Колёсико — зум",
    mobInspectMode: "КАРТОЧКА МОБА: Характеристики здоровья, дроп и условия спавна",
    blockInspectMode: "ОСМОТР БЛОКА: Изучите аутентичный 3D блок со всех 6 граней",
    itemGroundMode: "ПАРИТ В ПРОСТРАНСТВЕ: Осмотрите пиксельные текстуры предмета",
    pickUpPrompt: "Кликните для деталей",
    itemInInventory: "Предмет выбран",
    dropBtn: "Закрыть",
    pickupBtn: "Осмотреть",
    hitsLanded: "Нанесено ударов",
    testElytraGlide: "Испытать полёт на элитрах",
    glidingActive: "Полёт в воздухе...",
    simulateFatalDamage: "Симулировать смертельный урон",
    deathPrevented: "СМЕРТЬ ПРЕДОТВРАЩЕНА!",
    totemEffect: "Сработал Тотем Бессмертия! Здоровье восстановлено + Поглощение и Огнестойкость",
    hotbarLabel: "Инспектор предметов",
    howToPlayTitle: "Инструкция к 3D просмотрщику:",
    instruction1: "1. Зажмите левую кнопку мыши для плавного вращения модели на 360°.",
    instruction2: "2. Зажмите правую кнопку мыши для панорамирования камеры.",
    instruction3: "3. Прокручивайте колёсико мыши для приближения текстуры без размытия.",
    instruction4: "4. Перейдите во вкладку «Механика» для гайда по зельям или маяку.",
    instruction5: "5. Используйте переключатель версий для просмотра старых и новых рецептов.",
    instruction6: "6. Нажмите клавишу ESC для закрытия окна в любой момент.",

    // Footer
    footerRights: "Интерактивный справочник Майнкрафт. Аутентичные текстуры и динамические версии.",
    footerDevNotice: "Создано для игроков Майнкрафт. Все ресурсы принадлежат Mojang Studios.",

    // Wiki Page
    wikiTitle: "Майнкрафт Вики, Секреты и Легендарные баги",
    wikiSubtitle: "Откройте для себя скрытые технические механики, лор и знаменитые исторические глитчи игры.",
    backToCrafting: "Назад к справочнику крафта",
    sectionTrivia: "Глубокие факты и скрытые механики",
    sectionOGBugs: "Легендарные олдскульные баги и глитчи",
    eraLabel: "Эра / Версии",
  },
  uz: {
    // Welcome Menu
    welcomeBadge: "MC-DEX · RASMIY 3D BAZA (1.12 - 1.21+)",
    welcomeTitle: "MC-DEX ENSIKLOPEDIYASI",
    welcomeSubtitle: "Mukammal yasash (crafting) retseptlarini o'rganish, haqiqiy 3D modellarni 360° orbital ko'rish va texnik mexanikalarni bilish uchun quyidagi portallardan birini tanlang.",
    menuBack: "Bosh menyu",
    secItemsTitle: "Buyumlar va Yasash",
    secItemsDesc: "1,200+ bloklar, asboblar va qurollar. 3x3 ish stoli retseptlari va yerosti ma'danlarining Y-balandlik qatlamlari qo'llanmasi.",
    secMobsTitle: "Moblar va Mavjudotlar",
    secMobsDesc: "80+ tirik mavjudotlar. 360° aylanuvchi aniq 3D mob modellari, jangovar xususiyatlar va tushadigan o'lja (drop) jadvallari.",
    secWikiTitle: "Vikipediya va Sirlar",
    secWikiDesc: "Texnik redstoun, Tyuring kompyuterlari, 1.21 Tricky Trials yangilanishi va afsonaviy o'yin xatolari (glitchlar).",
    secPotionsTitle: "Damlamalar Alkimyosi",
    secPotionsDesc: "Interaktiv Potion Brewing stendi, ingredientlar daraxti va damlama davomiyligini oshirish retseptlari.",
    secProgressionTitle: "Minecraftni Yutish Ketma-ketligi",
    secProgressionDesc: "1-kundan boshlab Y: -58 qatlam, Nether qal'asi, Stronghold qidiruvi, Dragon bed strat va Elitragacha to'liq g'alaba yo'riqnomasi.",
    beatMinecraftNav: "O'yinni Yutish",
    aiAssistantNav: "AI Yordamchi",

    // Header & Brand
    brandTitle: "MC-DEX",
    brandSubtitle: "3D Interaktiv Crafting va Buyumlar Ensiklopediyasi",
    searchPlaceholder: "1,300+ buyumlar, bloklar, damlamalar, moblarni qidirish...",
    wikiBtn: "Vikipediya",
    supportBtn: "Telegramda Aloqa",
    versionSelector: "Minecraft Versiyasi",

    // Categories
    cat_all: "Barcha buyumlar",
    cat_blocks: "Bloklar",
    cat_potions: "Damlamalar",
    cat_weapons_tools: "Qurol va Asboblar",
    cat_craftable: "Yasaladigan",
    cat_uncraftable: "Yasalmaydigan",
    cat_mobs: "Moblar va Mavjudotlar",
    cat_materials: "Materiallar",

    // Hero
    heroBadge: "1,328+ MINECRAFT AKTIVLARI · 3D ORBITAL KO'RISH · 100% O'ZBEKCHA",
    heroTitle: "Mukammal Minecraft Crafting va 3D Qo'llanmasi",
    heroSubtitle: "Minecraft'dagi har bir blok, mob, qurol va yasash retseptlarini o'rganing. 1.12 dan 1.21+ gacha bo'lgan istalgan versiyani tanlang va autentik retseptlarni ko'ring.",
    statItems: "1,300+ Buyum va Bloklar",
    statMobs: "80+ Haqiqiy Moblar",
    stat3D: "3D Orbital Inspeksiya",

    // Item List
    showingCount: "{total} ta Minecraft aktivlaridan {count} tasi ko'rsatilmoqda",
    loadMore: "Yana yuklash",
    noResultsTitle: "Hech qanday Minecraft buyumi topilmadi",
    noResultsDesc: "Qidiruv so'zini o'zgartirib ko'ring yoki boshqa kategoriya filtrini tanlang.",
    resetFilter: "Barcha buyumlarga qaytish",

    // Modal Tabs & Headings
    tabOverview: "Tavsif va Retsept",
    tab3D: "3D Ko'rish Zonasiga",
    tab3DTag: "360° Orbital Ko'rish",
    tabMechanics: "Mexanika va Qo'llanishi",
    badgeCraftable: "3x3 Stolida Yasaladi",
    badgeUncraftable: "Yasalmaydigan Buyum",
    badgeMob: "Tirik Mavjudot / Mob",
    recipeTitle: "3x3 Ish Stolida Yasash Retsepti",
    recipeResult: "Natija: {count}x {name}",
    howToObtain: "Qayerdan topish va qanday olish",
    mobDrops: "Mob O'ljasi va Drop Jadvali",
    mobStats: "Jangovar va Salomatlik Ko'rsatkichlari",
    behavior: "Sun'iy Intellekt va Harakati",
    spawnCondition: "Tabiiy Paydo Bo'lish Shartlari",

    // 3D Test Zone & Controls
    clickToEnter: "3D orbital ko'rish uchun bosing",
    testZoneActive: "3D KO'RISH FAOLLASHDI: Sichqoncha bilan 360° aylantiring",
    mobInspectMode: "MOB KARTASI: Salomatlik ko'rsatkichlari, tushadigan o'lja va ma'lumotlar",
    blockInspectMode: "BLOKNI KO'ZDATAN KECHIRISH: Blokni barcha 6 tomondan tekshiring",
    itemGroundMode: "BUYUM: Fazoda muallaq turgan aniq pikselli model",
    pickUpPrompt: "Tafsilotlar uchun bosing",
    itemInInventory: "Buyum tanlandi",
    dropBtn: "Yopish",
    pickupBtn: "Ko'rish",
    hitsLanded: "Yetkazilgan zarbalar",
    testElytraGlide: "Elitra parvozini sinash",
    glidingActive: "Havoda parvoz...",
    simulateFatalDamage: "Halokatli zarbani simulyatsiya qilish",
    deathPrevented: "O'LIMNING OLDINI OLINDI!",
    totemEffect: "Totem of Undying faollashdi! Salomatlik tiklandi + Himoya va Olovga chidamlilik",
    hotbarLabel: "Buyumlar Paneli",
    howToPlayTitle: "3D Ko'rish bo'yicha ko'rsatma:",
    instruction1: "1. Sichqonchaning chap tugmasini bosib ushlab modelni 360° aylantiring.",
    instruction2: "2. Sichqonchaning o'ng tugmasi orqali kamerani siljiting.",
    instruction3: "3. Sichqoncha g'ildirakchasi (scroll) yordamida piksellarni yo'qotmagan holda yaqinlashtiring.",
    instruction4: "4. Damlamalar yoki mayoq mexanikasini ko'rish uchun «Mexanika» bo'limiga o'ting.",
    instruction5: "5. Yuqoridagi versiya tanlagich orqali 1.12 dan 1.21+ gacha o'zgaruvchan retseptlarni ko'ring.",
    instruction6: "6. Oynani yopish uchun istalgan paytda ESC tugmasini bosing.",

    // Footer
    footerRights: "Antigravity Minecraft Hamrohi. Haqiqiy o'yin teksturalari va dinamik versiyalar arxivi.",
    footerDevNotice: "Minecraft ishqibozlari uchun yaratilgan. Barcha aktivlar Mojang Studios ga tegishli.",

    // Wiki Page
    wikiTitle: "Minecraft Vikipediya, Sirlar va Qadimiy Glitchlar",
    wikiSubtitle: "Chuqur o'yin faktlari, yashirin texnik mexanikalar va o'yin tarixini belgilagan afsonaviy xatoliklarni kashf eting.",
    backToCrafting: "Crafting Qo'llanmasiga Qaytish",
    sectionTrivia: "Chuqur O'yin Faktlari va Yashirin Mexanikalar",
    sectionOGBugs: "Afsonaviy Qadimiy Glitchlar va Xatolar",
    eraLabel: "Davr / Versiyalar",
  },
};

// Russian translations dictionary for common Minecraft items, mobs, and blocks
const RU_ITEMS_MAP: Record<string, string> = {
  diamond_pickaxe: "Алмазная кирка",
  diamond_sword: "Алмазный меч",
  diamond_axe: "Алмазный топор",
  diamond_shovel: "Алмазная лопата",
  diamond_hoe: "Алмазная мотыга",
  diamond_helmet: "Алмазный шлем",
  diamond_chestplate: "Алмазный нагрудник",
  diamond_leggings: "Алмазные поножи",
  diamond_boots: "Алмазные ботинки",
  diamond: "Алмаз",
  diamond_block: "Алмазный блок",
  diamond_ore: "Алмазная руда",
  deepslate_diamond_ore: "Глубинная алмазная руда",

  netherite_sword: "Незеритовый меч",
  netherite_pickaxe: "Незеритовая кирка",
  netherite_axe: "Незеритовый топор",
  netherite_shovel: "Незеритовая лопата",
  netherite_hoe: "Незеритовая мотыга",
  netherite_helmet: "Незеритовый шлем",
  netherite_chestplate: "Незеритовый нагрудник",
  netherite_leggings: "Незеритовые поножи",
  netherite_boots: "Незеритовые ботинки",
  netherite_ingot: "Незеритовый слиток",
  netherite_scrap: "Незеритовый лом",
  netherite_block: "Незеритовый блок",
  ancient_debris: "Древние обломки",

  iron_sword: "Железный меч",
  iron_pickaxe: "Железная кирка",
  iron_axe: "Железный топор",
  iron_shovel: "Железная лопата",
  iron_hoe: "Железная мотыга",
  iron_helmet: "Железный шлем",
  iron_chestplate: "Железный нагрудник",
  iron_leggings: "Железные поножи",
  iron_boots: "Железные ботинки",
  iron_ingot: "Железный слиток",
  iron_block: "Железный блок",
  iron_ore: "Железная руда",

  golden_sword: "Золотой меч",
  golden_pickaxe: "Золотая кирка",
  golden_axe: "Золотой топор",
  golden_shovel: "Золотая лопата",
  golden_hoe: "Золотая мотыга",
  golden_helmet: "Золотой шлем",
  golden_chestplate: "Золотой нагрудник",
  golden_leggings: "Золотые поножи",
  golden_boots: "Золотые ботинки",
  golden_apple: "Золотое яблоко",
  enchanted_golden_apple: "Зачарованное золотое яблоко",
  gold_ingot: "Золотой слиток",
  gold_block: "Золотой блок",

  elytra: "Элитры",
  totem_of_undying: "Тотем бессмертия",
  beacon: "Маяк",
  trident: "Трезубец",
  shield: "Щит",
  bow: "Лук",
  crossbow: "Арбалет",
  arrow: "Стрела",
  spectral_arrow: "Спектральная стрела",
  ender_pearl: "Жемчуг Края",
  eye_of_ender: "Око Края",
  nether_star: "Звезда Незера",
  experience_bottle: "Пузырёк опыта",
  enchanting_table: "Стол зачаровывания",
  anvil: "Наковальня",
  crafting_table: "Верстак",
  furnace: "Печь",
  blast_furnace: "Плавильная печь",
  smoker: "Коптильня",
  brewing_stand: "Варочная стойка",
  cauldron: "Котёл",
  chest: "Сундук",
  ender_chest: "Эндер-сундук",
  shulker_box: "Шалкеровый ящик",
  tnt: "Динамит",
  flint_and_steel: "Огниво",
  shears: "Ножницы",
  fishing_rod: "Удочка",
  spyglass: "Подзорная труба",
  compass: "Компас",
  clock: "Часы",
  recovery_compass: "Компас возвращения",

  // Mobs
  warden: "Хранитель (Варден)",
  ender_dragon: "Дракон Края",
  wither: "Иссушитель",
  creeper: "Крипер",
  zombie: "Зомби",
  skeleton: "Скелет",
  spider: "Паук",
  cave_spider: "Пещерный паук",
  enderman: "Эндермен",
  blaze: "Ифрит (Блейз)",
  ghast: "Гаст",
  slime: "Слизень",
  magma_cube: "Лавовый куб",
  drowned: "Утопленник",
  husk: "Кадавр",
  stray: "Зимогор",
  phantom: "Фантом",
  piglin: "Пиглин",
  piglin_brute: "Жестокий пиглин",
  zombified_piglin: "Зомбифицированный пиглин",
  iron_golem: "Железный голем",
  snow_golem: "Снежный голем",
  villager: "Деревенский житель",
  pillager: "Разбойник",
  evoker: "Заклинатель",
  vindicator: "Поборник",
  ravager: "Разоритель",
  witch: "Ведьма",
  shulker: "Шалкер",
  cow: "Корова",
  pig: "Свинья",
  sheep: "Овца",
  chicken: "Курица",
  horse: "Лошадь",
  donkey: "Осёл",
  mule: "Мул",
  wolf: "Волк",
  cat: "Кошка",
  ocelot: "Оцелот",
  bee: "Пчела",
  fox: "Лиса",
  panda: "Панда",
  polar_bear: "Белый медведь",
  llama: "Лама",
  bat: "Летучая мышь",
  parrot: "Попугай",
  dolphin: "Дельфин",
  turtle: "Черепаха",
  squid: "Спрут",
  glow_squid: "Светящийся спрут",
  axolotl: "Аксилолотль",
  allay: "Эллей (Тихоня)",
  frog: "Лягушка",
  tadpole: "Головастик",
  camel: "Верблюд",
  sniffer: "Нюхач",
  strider: "Лавомерка",
  silverfish: "Чешуйница",
  endermite: "Эндермит",
  guardian: "Страж",
  elder_guardian: "Древний страж",

  // Blocks & Materials
  grass_block: "Блок травы",
  dirt: "Земля",
  cobblestone: "Булыжник",
  stone: "Камень",
  bedrock: "Бедрок",
  obsidian: "Обсидиан",
  crying_obsidian: "Плачущий обсидиан",
  glass: "Стекло",
  glowstone: "Светокамень",
  redstone: "Красная пыль (Редстоун)",
  redstone_block: "Редстоуновый блок",
  lapis_lazuli: "Лазурит",
  emerald: "Изумруд",
  emerald_block: "Изумрудный блок",
  coal: "Уголь",
  charcoal: "Древесный уголь",
  copper_ingot: "Медный слиток",
  amethyst_shard: "Осколок аметиста",
  sculk: "Скалк",
  sculk_catalyst: "Скалк-катализатор",
  sculk_shrieker: "Скалк-крикун",
  sculk_sensor: "Скалк-сенсор",
  dragon_egg: "Яйцо дракона",
};

const WORD_TRANSLATIONS: [RegExp, string][] = [
  [/Diamond/g, "Алмазный"],
  [/Netherite/g, "Незеритовый"],
  [/Golden/g, "Золотой"],
  [/Gold/g, "Золото"],
  [/Iron/g, "Железный"],
  [/Stone/g, "Каменный"],
  [/Wooden/g, "Деревянный"],
  [/Wood/g, "Дерево"],
  [/Leather/g, "Кожаный"],
  [/Chainmail/g, "Кольчужный"],
  [/Copper/g, "Медный"],
  [/Pickaxe/g, "Кирка"],
  [/Sword/g, "Меч"],
  [/Axe/g, "Топор"],
  [/Shovel/g, "Лопата"],
  [/Hoe/g, "Мотыга"],
  [/Helmet/g, "Шлем"],
  [/Chestplate/g, "Нагрудник"],
  [/Leggings/g, "Поножи"],
  [/Boots/g, "Ботинки"],
  [/Block/g, "Блок"],
  [/Ore/g, "Руда"],
  [/Ingot/g, "Слиток"],
  [/Raw/g, "Сырой"],
  [/Deepslate/g, "Глубинный"],
  [/Potion/g, "Зелье"],
  [/Splash Potion/g, "Взрывное зелье"],
  [/Lingering Potion/g, "Оседающее зелье"],
  [/Arrow/g, "Стрела"],
  [/Spawn Egg/g, "Яйцо призыва"],
  [/Stairs/g, "Ступеньки"],
  [/Slab/g, "Плита"],
  [/Wall/g, "Ограда"],
  [/Fence/g, "Забор"],
  [/Gate/g, "Калитка"],
  [/Door/g, "Дверь"],
  [/Trapdoor/g, "Люк"],
  [/Button/g, "Кнопка"],
  [/Pressure Plate/g, "Нажимная пластина"],
  [/Wool/g, "Шерсть"],
  [/Carpet/g, "Ковёр"],
  [/Concrete/g, "Бетон"],
  [/Terracotta/g, "Терракота"],
  [/Glass/g, "Стекло"],
  [/Stained Glass/g, "Окрашенное стекло"],
  [/Candle/g, "Свеча"],
  [/Banner/g, "Флаг"],
  [/Bucket/g, "Ведро"],
  [/Water/g, "Вода"],
  [/Lava/g, "Лава"],
  [/Milk/g, "Молоко"],
  [/Apple/g, "Яблоко"],
  [/Bread/g, "Хлеб"],
  [/Cooked/g, "Жареный"],
  [/Beef/g, "Говядина"],
  [/Porkchop/g, "Свинина"],
  [/Mutton/g, "Баранина"],
  [/Chicken/g, "Курица"],
  [/Fish/g, "Рыба"],
  [/Cod/g, "Треска"],
  [/Salmon/g, "Лосось"],
];

function translateName(name: string, id: string): string {
  if (RU_ITEMS_MAP[id]) return RU_ITEMS_MAP[id];
  let res = name;
  for (const [re, repl] of WORD_TRANSLATIONS) {
    res = res.replace(re, repl);
  }
  return res;
}

function translateDescriptionRu(item: MinecraftItem): string {
  if (item.category === "mobs") {
    const isHostile = item.mobDetails?.type === "Hostile" || item.mobDetails?.type === "Boss";
    return `${translateName(item.name, item.id)} — ${isHostile ? "враждебная" : "мирная"} сущность Майнкрафт. Макс. здоровье: ${item.mobDetails?.health || 20} HP (${Math.ceil((item.mobDetails?.health || 20) / 2)} сердец).`;
  }
  if (item.isCraftable) {
    return `${translateName(item.name, item.id)} — предмет Майнкрафт, доступный для крафта на верстаке 3x3. Размер стака: ${item.stats?.find(s => s.label.includes('Stack'))?.value || 64}.`;
  }
  return `${translateName(item.name, item.id)} — ценный ресурс и артефакт вселенной Майнкрафт. Размер стака: ${item.stats?.find(s => s.label.includes('Stack'))?.value || 64}.`;
}

function translateDescriptionUz(item: MinecraftItem): string {
  if (item.category === "mobs") {
    const isHostile = item.mobDetails?.type === "Hostile" || item.mobDetails?.type === "Boss";
    return `${item.name} — Minecraft olamidagi ${isHostile ? "tajovuzkor" : "tinch"} jonzot. Maksimal salomatlik: ${item.mobDetails?.health || 20} HP (${Math.ceil((item.mobDetails?.health || 20) / 2)} ta yurak).`;
  }
  if (item.isCraftable) {
    return `${item.name} — 3x3 ish stolida (Crafting Table) tayyorlanadigan Minecraft buyumi. Bir katakdagi miqdori (Stack): ${item.stats?.find(s => s.label.includes('Stack'))?.value || 64}.`;
  }
  return `${item.name} — Minecraft olamidagi qimmatbaho resurs va buyum. Bir katakdagi miqdori (Stack): ${item.stats?.find(s => s.label.includes('Stack'))?.value || 64}.`;
}

const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: (key: string) => UI_DICTIONARY.en[key] || key,
  getItemName: (item: MinecraftItem) => item?.name || "",
  getItemDesc: (item: MinecraftItem) => item?.description || "",
  getCategoryName: (cat: string) => UI_DICTIONARY.en[`cat_${cat}`] || cat,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mc_app_lang") as Language;
      if (saved === "en" || saved === "ru" || saved === "uz") {
        setLanguageState(saved);
      }
    } catch {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("mc_app_lang", lang);
    } catch {}
  };

  const t = (key: string): string => {
    return UI_DICTIONARY[language]?.[key] || UI_DICTIONARY.en[key] || key;
  };

  const getItemName = (item: MinecraftItem): string => {
    if (!item) return "";
    // MANDATE: In UZ and EN, raw database item/mob names remain in their original game format (e.g. "Diamond Pickaxe", "Ghast")
    if (language === "ru") {
      return translateName(item.name, item.id);
    }
    return item.name;
  };

  const getItemDesc = (item: MinecraftItem): string => {
    if (!item) return "";
    if (language === "uz") {
      return translateDescriptionUz(item);
    }
    if (language === "ru") {
      return translateDescriptionRu(item);
    }
    return item.description;
  };

  const getCategoryName = (cat: string): string => {
    const key = `cat_${cat}`;
    return t(key);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getItemName,
        getItemDesc,
        getCategoryName,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return ctx || defaultContext;
}
