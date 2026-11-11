"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  ShieldAlert,
  Terminal,
  Compass,
  Zap,
  HelpCircle,
  Minimize2,
  Maximize2,
  Copy,
  Check,
  Flame,
  Award,
  Layers,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Minecraft3DCube from "@/components/Minecraft3DCube";

export type MessageFormatStyle =
  | "standard"
  | "tactical"
  | "blueprint"
  | "forbidden"
  | "tips"
  | "terminal";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
  formatStyle?: MessageFormatStyle;
  badge?: string;
  commandSnippet?: string;
  relatedItems?: { name: string; id: string; texture: string }[];
}

export default function AIAssistant() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message based on language
  const initialMessages: Record<string, ChatMessage[]> = {
    uz: [
      {
        id: "m_welcome_uz",
        sender: "ai",
        formatStyle: "tactical",
        badge: "MINECRAFT VOXEL AI",
        text: "Assalomu alaykum! Men Minecraft Rasmiy Voxel Sun'iy Intellekt Yordamchisiman 🧊.\n\nMinecraftning barcha versiyalari (1.0 dan 1.21+ Tricky Trials gacha), qazish qatlamlari, bosslar jangi, damlamalar, qiziltosh mexanikalari, buyruqlar va omon qolish bo'yicha har qanday savolingizni bering!",
        time: "Hozir",
      },
    ],
    ru: [
      {
        id: "m_welcome_ru",
        sender: "ai",
        formatStyle: "tactical",
        badge: "MINECRAFT VOXEL AI",
        text: "Привет! Я официальный Voxel ИИ-Ассистент Minecraft 🧊.\n\nЗадавайте любые вопросы по всем версиям Minecraft (от 1.0 до 1.21+), высоте руд, зельеварению, редстоуну, командам и тактике победы над боссами!",
        time: "Сейчас",
      },
    ],
    en: [
      {
        id: "m_welcome_en",
        sender: "ai",
        formatStyle: "tactical",
        badge: "MINECRAFT VOXEL AI",
        text: "Greetings! I am the official Minecraft Voxel AI Companion 🧊.\n\nAsk me anything about Minecraft versions 1.0 through 1.21+ Tricky Trials, optimal mining depths, brewing alchemy, redstone machinery, cheats & commands, or speedrun boss tactics!",
        time: "Just now",
      },
    ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return initialMessages[language] || initialMessages.uz;
  });

  // Suggested prompts
  const suggestedPrompts = {
    uz: [
      "💎 Olmos qayerda eng ko'p topiladi?",
      "🐉 Ender Ajdahosini karavot bilan yengish",
      "🔥 Netherit qurol va sovut yasash",
      "🧪 Olovga chidamlilik damlamasi retsepti",
      "⚙️ 1.21 Mace (Gurzi) va Crafter haqida",
      "🛡️ Qalqon (Shield) qanday yasaladi?",
      "🏰 Stronghold portalini topish formulasi",
      "⌨️ keepInventory va asosiy buyruqlar",
    ],
    ru: [
      "💎 Где лучше всего копать алмазы?",
      "🐉 Как победить Дракона Края кроватями?",
      "🔥 Как улучшить броню до незерита?",
      "🧪 Рецепт зелья огнестойкости",
      "⚙️ Булава (Mace) и Автокрафтер 1.21",
      "🛡️ Как скрафтить щит?",
      "🏰 Как найти портал в Край (Stronghold)?",
      "⌨️ Команда keepInventory и читы",
    ],
    en: [
      "💎 What is the best Y-level for diamonds?",
      "🐉 How to beat the Ender Dragon with beds?",
      "🔥 How to upgrade to Netherite gear?",
      "🧪 Fire Resistance potion brewing recipe",
      "⚙️ 1.21 Mace weapon & Crafter guide",
      "🛡️ How do I craft a Shield?",
      "🏰 How to triangulate the Stronghold portal?",
      "⌨️ keepInventory and essential commands",
    ],
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCode(cmd);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Check if query is asking about the AI itself
  const isAskingAboutSelf = (q: string): boolean => {
    const patterns = [
      "sen kimsan",
      "kim san",
      "kimsan",
      "o'zing haq",
      "ozing haq",
      "o'zing haqingda",
      "ozing haqingda",
      "seni kim yaratgan",
      "seni kim yaratdi",
      "kim yaratgan",
      "kim yozgan",
      "kim yasagan",
      "qaysi model",
      "qanaqa model",
      "qaysi ai",
      "qanaqa ai",
      "chatgpt",
      "chat gpt",
      "gemini",
      "claude",
      "deepseek",
      "openai",
      "koding qanaqa",
      "kodingni",
      "koding nima",
      "source code",
      "system prompt",
      "arxitekturang",
      "tiziming",
      "who are you",
      "what are you",
      "who made you",
      "who created you",
      "tell me about yourself",
      "about yourself",
      "what model",
      "кто ты",
      "кто тебя создал",
      "расскажи о себе",
      "какая модель",
      "твой код",
    ];
    return patterns.some((p) => q.includes(p));
  };

  // AI Knowledge Responder
  const generateAIResponse = (userQuery: string): ChatMessage => {
    const q = userQuery.toLowerCase().trim();
    const nowTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // ─────────────────────────────────────────────────────────────
    // 0. TAQIQLANGAN: O'zi haqida so'ralsa (Strict Self-Identity Rule)
    // ─────────────────────────────────────────────────────────────
    if (isAskingAboutSelf(q)) {
      let text = "";
      if (language === "uz") {
        text =
          "⛔ **Kechirasiz, men o'zim haqimda shaxsiy, ichki tizim yoki dasturiy kod ma'lumotlarini oshkor qilishim qat'iyan taqiqlangan!**\n\n" +
          "Men faqat **Minecraft Wiki Rasmiy Sun'iy Intellekt Yordamchisiman** 🧊.\n\n" +
          "Mening yagona maqsadim va vazifam — sizga Minecraft olamining barcha sirlari, 1.0 dan 1.21+ gacha barcha yangilanishlar, retseptlar, mexanikalar, buyruqlar va o'yinda g'alaba qozonish sirlari bo'yicha to'liq yordam berishdir.\n\n" +
          "Minecraft bo'yicha xohlagan savolingizni bering — sizga bajonidil javob beraman!";
      } else if (language === "ru") {
        text =
          "⛔ **Извините, раскрывать личную, внутреннюю информацию или системный код обо мне строго запрещено!**\n\n" +
          "Я — официальный **ИИ-Ассистент Minecraft Wiki** 🧊.\n\n" +
          "Моя единственная задача — помогать вам с крафтом, гайдами, механиками и секретами выживания в Minecraft от 1.0 до 1.21+. Задавайте любые вопросы по игре!";
      } else {
        text =
          "⛔ **I am sorry, disclosing personal, system, or internal code details about myself is strictly prohibited!**\n\n" +
          "I am the official **Minecraft Wiki AI Companion** 🧊.\n\n" +
          "My sole purpose is assisting you with all Minecraft crafting recipes, survival guides, mechanics, commands, and secrets across all versions 1.0 to 1.21+. Ask me anything about Minecraft!";
      }

      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "forbidden",
        badge: "XAVFSIZLIK CHEKLOVI",
        text,
        time: nowTime,
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 1. Olmos qazish qatlami / Diamonds Y-level
    // ─────────────────────────────────────────────────────────────
    if (q.includes("olmos") || q.includes("diamond") || q.includes("алмаз")) {
      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "tactical",
        badge: "MINING TIKLANISHI: Y = -58",
        text:
          language === "uz"
            ? "💎 **Olmos qayerda eng ko'p topiladi?**\n\n" +
              "• **1.18 — 1.21+ versiyalarda**: Olmoslar eng ko'p **Y = -58** va **Y = -53** balandliklar orasida (Deepslate / Chuqur slanes) joylashgan. Qanchalik tubga (Bedrock qatlamiga) tushsangiz, zichlik shunchalik ortadi!\n" +
              "• **Eski 1.12 — 1.17 versiyalarda**: Eng qulay qatlam **Y = 11** hisoblanadi.\n" +
              "• **Pro-Taktika**: Fortune III (Omad III) sehrli cho'kich bilan qazisangiz, 1 ta ma'dandan 4 tagacha olmos olishingiz mumkin. Lava ko'rganingizda suv chelagi bilan obsidian qilib xavfsiz o'ting!"
            : language === "ru"
            ? "💎 **Где добывать алмазы?**\n\n" +
              "• **1.18 — 1.21+**: Оптимальная глубина — **Y = -58**. Чем глубже в сланцевый слой к бедроку, тем выше шанс найти жилу!\n" +
              "• **1.12 — 1.17**: Самая безопасная высота — **Y = 11**.\n" +
              "• **Совет**: Используйте кирку с зачарованием 'Удача III' (Fortune III), чтобы получать до 4 алмазов с одной руды!"
            : "💎 **Optimal Diamond Mining Depths:**\n\n" +
              "• **Modern (1.18 — 1.21+)**: Strip mine at **Y = -58**. Diamond generation scales linearly downwards to bedrock!\n" +
              "• **Legacy (1.12 — 1.17)**: The sweet spot is **Y = 11**.\n" +
              "• **Pro-Tip**: Always use a Fortune III pickaxe to multiply drops up to 4 diamonds per single ore block!",
        commandSnippet: "/locate structure ancient_city",
        time: nowTime,
        relatedItems: [
          { name: "Diamond", id: "diamond", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/diamond.png" },
          { name: "Diamond Pickaxe", id: "diamond_pickaxe", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/diamond_pickaxe.png" },
        ],
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 2. Ender Dragon / Ajdaho jangi / Bed strat
    // ─────────────────────────────────────────────────────────────
    if (
      q.includes("dragon") ||
      q.includes("ajdaho") ||
      q.includes("дракон") ||
      q.includes("yutish") ||
      q.includes("beat") ||
      q.includes("karavot") ||
      q.includes("krovat")
    ) {
      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "tactical",
        badge: "ONE-CYCLE SPEEDRUN STRAT",
        text:
          language === "uz"
            ? "🐉 **Ender Ajdahosini Karavot bilan 1 daqiqada yengish (Bed Strat):**\n\n" +
              "1. **Mexanika**: Karavot (Bed) Nether va End olamlarida bosilganda TNT dan 25% kuchliroq portlaydi!\n" +
              "2. **Poydevor**: Markazdagi Bedrock favvora (Perch) ustiga chiqing. Ajdaho aylana uchib markazga qo'nganda bosh qismiga qarab karavot qo'ying.\n" +
              "3. **Himoya bloki**: Karavot va o'zingizning orangizga 1 ta obsidiyan yoki tosh blok qo'yib, shift (sneak) qilib o'tiring — shunda portlash sizga 0 zarar yetkazadi, ajdahoga esa 30-40% zarba beradi!\n" +
              "4. **Natija**: Bor-yo'g'i 4-5 ta karavot bilan Ender Dragon 60 soniyada mag'lub etiladi!"
            : language === "ru"
            ? "🐉 **Победа над Драконом Края кроватями (One-Cycle):**\n\n" +
              "1. Кровать в Краю взрывается мощнее динамита TNT.\n" +
              "2. Ждите, пока Дракон сядет на центральный фонтан из бедрока.\n" +
              "3. Поставьте обсидиан или блок между собой и кроватью (чтобы не получить урон), и взрывайте кровать по голове Дракона!\n" +
              "4. Хватает 4–5 кроватей для мгновенной победы!"
            : "🐉 **One-Cycle Bed Strategy vs Ender Dragon:**\n\n" +
              "1. Beds explode violently in the End dimension.\n" +
              "2. Wait until the dragon perches on the bedrock portal fountain.\n" +
              "3. Place a shield/obsidian block between your head and the pillow to absorb splash damage.\n" +
              "4. Right click the bed right against the dragon's snout. 4 to 5 beds wipe out all 200 HP in seconds!",
        time: nowTime,
        relatedItems: [
          { name: "Red Bed", id: "red_bed", texture: "/icons/red_bed.png" },
          { name: "Dragon Egg", id: "dragon_egg", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/dragon_egg.png" },
        ],
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 3. Qalqon / Shield
    // ─────────────────────────────────────────────────────────────
    if (q.includes("qalqon") || q.includes("shield") || q.includes("щит")) {
      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "blueprint",
        badge: "RETSEPT / KRAFT CHIZMASI",
        text:
          language === "uz"
            ? "🛡️ **Qalqon (Shield) yasash formulasi:**\n\n" +
              "• **Kerakli xomashyo**: 1 ta Temir quymasi (Iron Ingot) + 6 ta Har qanday Yog'och taxtasi (Planks).\n" +
              "• **Dastgohda joylashuvi**: Yuqori qator markaziga Temir, qolgan 6 ta katakchaga taxtalarni 'Y' shaklida joylashtirasiz.\n" +
              "• **Super-qobiliyati**: Ikkinchi qo'lga (Off-hand / F tugmasi) taqiladi. O'ng tugma bosilganda Kríper portlashi va Skelet o'qlaridan 100% zararsizlantiradi!\n" +
              "• **Maxsus bezak**: Banner (bayroq) bilan birlashtirib, qalqonga o'z gerbingizni tushirishingiz mumkin."
            : language === "ru"
            ? "🛡️ **Крафт Щита (Shield):**\n\n" +
              "• 1 Железный слиток (вверху по центру) + 6 деревянных досок.\n" +
              "• Помещается во вторую руку (клавиша F). При нажатии ПКМ блокирует 100% урона от стрел и взрывов крипера!"
            : "🛡️ **Crafting a Shield:**\n\n" +
              "• Recipe: 1 Iron Ingot (top center) + 6 Wooden Planks (in a 'Y' shape).\n" +
              "• Equip in Off-hand (press F). Right-click to block 100% of projectile damage and point-blank creeper detonations!",
        time: nowTime,
        relatedItems: [
          { name: "Shield", id: "shield", texture: "/icons/shield.png" },
          { name: "Iron Ingot", id: "iron_ingot", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/iron_ingot.png" },
        ],
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 4. Damlamalar / Potions / Brewing
    // ─────────────────────────────────────────────────────────────
    if (
      q.includes("damlama") ||
      q.includes("potion") ||
      q.includes("zelevarenie") ||
      q.includes("зелье") ||
      q.includes("olovga chidam") ||
      q.includes("ogстойк") ||
      q.includes("fire res")
    ) {
      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "blueprint",
        badge: "ALKIMIYA & DAMLAMALAR",
        text:
          language === "uz"
            ? "🧪 **Asosiy Damlamalar Retseptlari (Brewing Stand):**\n\n" +
              "1. **Boshlang'ich asos**: Suv shishasi + Nether Wart (Do'zax guli) = **Awkward Potion** (Barcha kuchli damlamalar asosi).\n" +
              "2. 🔥 **Olovga chidamlilik (Fire Resistance - 8 daqiqa)**: Awkward Potion + **Magma Cream** (Magma kremi) + Redstone.\n" +
              "3. ⚡ **Tezlik (Speed II)**: Awkward Potion + **Shakar (Sugar)** + Glowstone.\n" +
              "4. 💪 **Kuch (Strength II)**: Awkward Potion + **Blaze Powder** + Glowstone.\n" +
              "5. 👻 **Ko'rinmaslik (Invisibility)**: Tungi ko'rish damlamasi + Fermentlangan o'rgimchak ko'zi (Fermented Spider Eye)."
            : language === "ru"
            ? "🧪 **Рецепты главных зелий:**\n\n" +
              "1. Бутылочка воды + Нарост из Незера (Nether Wart) = Неловкое зелье (Awkward Potion).\n" +
              "2. 🔥 Зелье огнестойкости: Awkward Potion + Сгусток магмы (Magma Cream) + Редстоун (8 минут).\n" +
              "3. 💪 Зелье силы: Awkward Potion + Огненный порошок (Blaze Powder).\n" +
              "4. 👻 Невидимость: Зелье ночного зрения + Маринованный паучий глаз."
            : "🧪 **Essential Potion Brewing Master Guide:**\n\n" +
              "1. Water Bottle + Nether Wart = **Awkward Potion** (Universal base).\n" +
              "2. 🔥 **Fire Resistance (8 mins)**: Awkward Potion + Magma Cream + Redstone dust.\n" +
              "3. ⚡ **Speed II**: Awkward Potion + Sugar + Glowstone dust.\n" +
              "4. 💪 **Strength II**: Awkward Potion + Blaze Powder + Glowstone.\n" +
              "5. 👻 **Invisibility**: Night Vision potion + Fermented Spider Eye.",
        time: nowTime,
        relatedItems: [
          { name: "Brewing Stand", id: "brewing_stand", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/brewing_stand.png" },
          { name: "Magma Cream", id: "magma_cream", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/magma_cream.png" },
        ],
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 5. 1.21 Tricky Trials: Gurzi (Mace), Crafter, Breeze, Trial Chambers
    // ─────────────────────────────────────────────────────────────
    if (
      q.includes("1.21") ||
      q.includes("mace") ||
      q.includes("gurzi") ||
      q.includes("crafter") ||
      q.includes("breeze") ||
      q.includes("heavy core") ||
      q.includes("trial")
    ) {
      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "tactical",
        badge: "YANGILANISH: 1.21 TRICKY TRIALS",
        text:
          language === "uz"
            ? "⚙️ **Minecraft 1.21 Tricky Trials — Barcha yangi imkoniyatlar:**\n\n" +
              "• 🔨 **Mace (Gurzi quroli)**: O'yindagi eng dahshatli zarbaga ega yangi qurol! Qanchalik balanddan tushib urilsa, zarba kuchi shunchalik oshadi (cheksiz zarar!). Agar mo'ljalga tegsangiz, tushish zarari (fall damage) 0 bo'ladi!\n" +
              "• 🧱 **Mace retsepti**: **Heavy Core** (Trial Chambers dagi Vault dan topiladi) + **Breeze Rod** (Breeze mobidan tushadi).\n" +
              "• 🤖 **Crafter (Avtomat craft)**: Qiziltosh (redstone) orqali avtomatik buyum yasovchi dastgoh!\n" +
              "• 💨 **Wind Charge**: Shamol to'pi yordamida havoga 6-8 blok balandlikka sakrash yoki dushmanlarni uchirib yuborish mumkin."
            : language === "ru"
            ? "⚙️ **Minecraft 1.21 Tricky Trials — Главные новинки:**\n\n" +
              "• 🔨 **Булава (Mace)**: Наносит сокрушительный урон при падении с высоты. Успешный удар полностью нейтрализует урон от падения!\n" +
              "• 🧱 **Крафт Булавы**: Тяжёлое ядро (Heavy Core) + Стержень бриза (Breeze Rod).\n" +
              "• 🤖 **Автокрафтер (Crafter)**: Позволяет создавать любые предметы автоматически по сигналу редстоуна!"
            : "⚙️ **Minecraft 1.21 Tricky Trials Highlights:**\n\n" +
              "• 🔨 **The Mace**: Massive smash attack damage scaling with falling height! Landing a hit negates all fall damage completely.\n" +
              "• 🧱 **Mace Recipe**: 1 Heavy Core (from Trial Chambers Vaults) + 1 Breeze Rod.\n" +
              "• 🤖 **The Crafter**: Full automated crafting via redstone pulse!\n" +
              "• 💨 **Wind Charges**: Rocket jump yourself 8 blocks high or blast hostile mobs back.",
        commandSnippet: "/locate structure trial_chambers",
        time: nowTime,
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 6. Netherit (Netherite) / Ancient Debris
    // ─────────────────────────────────────────────────────────────
    if (
      q.includes("netherit") ||
      q.includes("netherite") ||
      q.includes("незерит") ||
      q.includes("ancient debris") ||
      q.includes("smithing")
    ) {
      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "blueprint",
        badge: "NETHERITE UPGRADE",
        text:
          language === "uz"
            ? "🔥 **Netherit qurol va sovutlarni yangilash (1.20+):**\n\n" +
              "1. **Ancient Debris (Qadimiy qoldiqlar)**: Netherda **Y = 15** balandlikda karavot yoki TNT portlatib topiladi.\n" +
              "2. **Netherite Ingot**: 4 ta Netherite Scrap (pechda pishirilgan qoldiq) + 4 ta Oltin quymasi.\n" +
              "3. **Smithing Template (Temirchi andazasi)**: 1.20 dan boshlab Bastion Remnant xazinasidan **Netherite Upgrade Template** topish shart!\n" +
              "4. **Temirchi dastgohida**: Template + Olmos qurol/sovut + Netherite Ingot = Eng mustahkam Netherit buyumi (Lava va olovda yonmaydi!)."
            : language === "ru"
            ? "🔥 **Улучшение до незерита (1.20+):**\n\n" +
              "1. Древние обломки добываются в Незере на высоте **Y = 15**.\n" +
              "2. 4 Обломка + 4 Золота = Незеритовый слиток.\n" +
              "3. Обязательно найдите кузнечный шаблон 'Улучшение незерита' в Бастионе пиглинов!\n" +
              "4. Объедините шаблон + алмазную вещь + незеритовый слиток на столе кузнеца."
            : "🔥 **Upgrading to Netherite Gear (1.20+):**\n\n" +
              "1. Mine Ancient Debris in the Nether at **Y: 15** using bed explosions.\n" +
              "2. Smelt 4 debris into scrap + 4 Gold Ingots = 1 Netherite Ingot.\n" +
              "3. Loot a **Netherite Upgrade Smithing Template** from a Piglin Bastion Remnant.\n" +
              "4. Combine Template + Diamond gear + Netherite Ingot on a Smithing Table. Completely lava-proof!",
        time: nowTime,
        relatedItems: [
          { name: "Netherite Ingot", id: "netherite_ingot", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/netherite_ingot.png" },
        ],
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 7. Stronghold & Portal qidirish / End Portal
    // ─────────────────────────────────────────────────────────────
    if (
      q.includes("stronghold") ||
      q.includes("qal'a") ||
      q.includes("krepost") ||
      q.includes("крепость") ||
      q.includes("portal") ||
      q.includes("ender pearl")
    ) {
      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "tactical",
        badge: "TRIANGULATSIYA METODI",
        text:
          language === "uz"
            ? "🏰 **Stronghold (End Portali)ni tez topish siri:**\n\n" +
              "1. **Ender Eye (Ender ko'zi)**: 1 ta Ender Pearl + 1 ta Blaze Powder.\n" +
              "2. **Triangulyatsiya**: Ender ko'zini osmonga oting. U uchgan burchak (F3 dagi Facing) yo'nalishini yozib oling.\n" +
              "3. Bir tomonga 200-300 blok yugurib, yana 1 marta ko'z oting. Ikki chiziq kesishgan joy ostida to'g'ridan-to'g'ri Stronghold joylashgan!\n" +
              "4. **Portalni yoqish**: 12 ta ramkaga Ender ko'zlarini to'g'ri joylashtirasiz (kamida 1-2 tasi o'zi tayyor bo'ladi)."
            : language === "ru"
            ? "🏰 **Как найти Крепость Края (Stronghold):**\n\n" +
              "1. Скрафтите Око Края (Эндер-жемчуг + Огненный порошок).\n" +
              "2. Бросьте око и запишите угол направления в меню F3.\n" +
              "3. Пробегите 200-300 блоков в сторону и бросьте снова — на пересечении линий копайте вниз!"
            : "🏰 **Finding the Stronghold via Triangulation:**\n\n" +
              "1. Craft Eyes of Ender (Ender Pearl + Blaze Powder).\n" +
              "2. Throw an eye, press F3, and note the precise angle. Run 200 blocks perpendicular, throw again.\n" +
              "3. The intersecting coordinate is where the Stronghold portal room rests underground!",
        commandSnippet: "/locate structure stronghold",
        time: nowTime,
        relatedItems: [
          { name: "Eye of Ender", id: "ender_eye", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/ender_eye.png" },
        ],
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 8. Buyruqlar / Cheats & Commands
    // ─────────────────────────────────────────────────────────────
    if (
      q.includes("buyruq") ||
      q.includes("command") ||
      q.includes("cheat") ||
      q.includes("komanda") ||
      q.includes("команд") ||
      q.includes("keepinventory") ||
      q.includes("gamemode")
    ) {
      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "terminal",
        badge: "MINECRAFT CONSOLE COMMANDS",
        text:
          language === "uz"
            ? "⌨️ **Eng kerakli va ommabop Minecraft buyruqlari:**\n\n" +
              "• `keepInventory true` — O'lganda barcha narsalar inventarda saqlanib qoladi!\n" +
              "• `gamemode creative / survival` — O'yin rejimini o'zgartirish.\n" +
              "• `locate structure <nomi>` — Eng yaqin qishloq, qal'a yoki portal koordinatasini ko'rsatadi.\n" +
              "• `time set day` va `weather clear` — Havoni tozalash va quyosh chiqarish.\n" +
              "• `effect give @p night_vision 9999 1 true` — Zarrachalarsiz cheksiz tungi ko'rish!"
            : language === "ru"
            ? "⌨️ **Полезные консольные команды:**\n\n" +
              "• `/gamerule keepInventory true` — Сохранение инвентаря после смерти!\n" +
              "• `/locate structure village` — Поиск ближайших структур.\n" +
              "• `/gamemode creative` — Режим полета и бесконечных блоков."
            : "⌨️ **Most Essential Minecraft Server Commands:**\n\n" +
              "• `/gamerule keepInventory true` — Keep items after death.\n" +
              "• `/locate structure <name>` — Find nearest biomes and dungeons.\n" +
              "• `/weather clear` — Instant sunny weather.",
        commandSnippet: "/gamerule keepInventory true",
        time: nowTime,
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 9. Varden (Warden) & Ancient City
    // ─────────────────────────────────────────────────────────────
    if (q.includes("warden") || q.includes("varden") || q.includes("варден") || q.includes("ancient city")) {
      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "tactical",
        badge: "XAVFLI MOB: WARDEN (30 YURAK ZARBA)",
        text:
          language === "uz"
            ? "💀 **Varden (Warden) va Qadimiy Shahar (Ancient City):**\n\n" +
              "• **Chaqirilishi**: Sculk Shrieker blokiga 3 marta shovqin tekkanda yer tubidan chiqib keladi.\n" +
              "• **O'ldirish shart emas**: Undan 500 HP va 30 ta yurak oladigan zarba bor. Uni o'ldirish foyda keltirmaydi!\n" +
              "• **Qanday qochiladi**: Faqat **Shift (Sneak)** bilan jimgina yuring. Jun (Wool) bloklari tovushni 100% yutadi.\n" +
              "• Agar chalg'itmoqchi bo'lsangiz, narigi tomonga qor to'pi (snowball) yoki o'q oting — u tovush tomonga qarab ketadi."
            : language === "ru"
            ? "💀 **Варден (Warden) и Древний Город:**\n\n" +
              "• Не сражайтесь с ним! У него 500 HP и атака, убивающая сквозь броню.\n" +
              "• Передвигайтесь только на шифте (Sneak). Шерсть глушит все вибрации.\n" +
              "• Отвлекайте его, бросая снежки в противоположную сторону!"
            : "💀 **Warden Survival Guide:**\n\n" +
              "• Do NOT fight it! It has 500 HP and a sonic boom piercing through walls.\n" +
              "• Crouch walk (Sneak) constantly. Wool dampens all vibrations.\n" +
              "• Distract it by shooting arrows or throwing snowballs far away from your position.",
        commandSnippet: "/locate structure ancient_city",
        time: nowTime,
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 10. Sehrlar / Enchantments
    // ─────────────────────────────────────────────────────────────
    if (
      q.includes("sehr") ||
      q.includes("enchant") ||
      q.includes("zacharovan") ||
      q.includes("зачар") ||
      q.includes("mending") ||
      q.includes("fortune")
    ) {
      return {
        id: `ai_${Date.now()}`,
        sender: "ai",
        formatStyle: "blueprint",
        badge: "MAXIMAL SEHR TIZIMI",
        text:
          language === "uz"
            ? "✨ **Minecraftdagi Eng Kuchli Sehrlar (God Armor & Tools):**\n\n" +
              "• **Mending (Tuzatish)**: Yig'ilgan har qanday XP shari orqali qurol va sovutlaringiz avtomatik ta'mirlanadi — asbobingiz hech qachon sinmaydi!\n" +
              "• **Fortune III (Omad III)**: 1 ta olmos ma'danidan 4 tagacha olmos chiqarib beradi.\n" +
              "• **Silk Touch (Ipak teginish)**: Bloklarni aslicha (masalan, muz, shisha, qimmatbaho ma'dan) ko'chirish imkonini beradi.\n" +
              "• **Protection IV & Unbreaking III**: Barcha kiyimlar uchun majburiy eng mustahkam himoya.\n" +
              "• **Sehr dastgohi siri**: Maksimal 30-darajali sehr olish uchun stol atrofida 15 ta Kitob javoni (Bookshelf) 1 blok masofada turishi shart!"
            : language === "ru"
            ? "✨ **Лучшие зачарования в Minecraft:**\n\n" +
              "• **Починка (Mending)**: Вещи чинятся сами за счет собираемого опыта.\n" +
              "• **Удача III (Fortune III)**: Умножает дроп руд до 4 раз.\n" +
              "• **Шелковое касание (Silk Touch)**: Добыча блоков в исходном виде.\n" +
              "• Для 30-го уровня стола зачарований нужно ровно 15 книжных полок!"
            : "✨ **Top-Tier Enchantments:**\n\n" +
              "• **Mending**: Infinite durability powered by XP orbs.\n" +
              "• **Fortune III**: Multiplies rare ore drops up to 4x.\n" +
              "• **Silk Touch**: Harvests fragile blocks intact.\n" +
              "• Place 15 bookshelves exactly 1 block away from the table for Level 30 max enchants!",
        time: nowTime,
        relatedItems: [
          { name: "Enchanting Table", id: "enchanting_table", texture: "/icons/enchanting_table.png" },
        ],
      };
    }

    // ─────────────────────────────────────────────────────────────
    // 11. Boshqa har qanday savol (Intelligent Comprehensive Fallback)
    // ─────────────────────────────────────────────────────────────
    let dynamicText = "";
    if (language === "uz") {
      dynamicText =
        `💡 **"${userQuery}" bo'yicha to'liq ma'lumot:**\n\n` +
        `Minecraft olamida bu masala o'yinchining strategiyasi, to'g'ri resurslar yig'ishi va qatlam koordinatalarini aniq bilishiga bog'liq.\n\n` +
        `• **Tavsiya etilgan qadamlar**: Dastlab kerakli asboblarni (cho'kich, qalqon, oziq-ovqat va olovga chidamlilik damlamasi) tayyorlab oling.\n` +
        `• **Foydali klavishlar**: Koordinatalar va yorug'lik darajasini ko'rish uchun **F3** tugmasidan foydalaning (Y balandlik ayniqsa muhim!).\n` +
        `• **Xavfsizlik**: Tunda va chuqur g'orlarda har doim me'yordan ortiq mash'al (torch) olib yuring va karavotni zaxirada saqlang.\n\n` +
        `Agar qo'shimcha retsept yoki maxsus buyruq kerak bo'lsa, bemalol aniqroq so'rang!`;
    } else if (language === "ru") {
      dynamicText =
        `💡 **Подробный ответ по запросу "${userQuery}":**\n\n` +
        `В Minecraft успешное решение этой задачи строится на правильной экипировке, контроле высоты Y и запасе ключевых ресурсов.\n\n` +
        `• **Совет**: Всегда носите с собой ведро воды (MLG), щит и еду с высоким насыщением.\n` +
        `• **Координаты**: Нажмите F3 для проверки биома и уровня освещения.\n\n` +
        `Напишите, если вам нужен точный рецепт крафта или команда!`;
    } else {
      dynamicText =
        `💡 **Insight regarding "${userQuery}":**\n\n` +
        `In Minecraft survival and mechanics, mastering this comes down to proper equipment, altitude awareness (Y-level via F3), and resource efficiency.\n\n` +
        `• **Pro-Tip**: Always carry a water bucket, a sturdy shield, and high-saturation food.\n` +
        `• **Coords**: Check F3 for light levels and chunk borders.\n\n` +
        `Feel free to ask for a specific crafting recipe, seed coordinate, or command!`;
    }

    // Dynamic rotation of format styles for variety
    const stylesPool: MessageFormatStyle[] = ["tactical", "blueprint", "tips", "standard"];
    const chosenStyle = stylesPool[Math.floor(Math.random() * stylesPool.length)];

    return {
      id: `ai_${Date.now()}`,
      sender: "ai",
      formatStyle: chosenStyle,
      badge: "MINECRAFT ENSIKLOPEDIYASI",
      text: dynamicText,
      time: nowTime,
    };
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(userText);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 500);
  };

  const resetChat = () => {
    setMessages(initialMessages[language] || initialMessages.uz);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const activePrompts = suggestedPrompts[language as keyof typeof suggestedPrompts] || suggestedPrompts.uz;

  return (
    <>
      {/* ── 1. EXACT FLOATING TRIGGER BUTTON (WITH HIGH-DETAIL CELESTIAL PLANET ICON) ── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group flex items-center gap-3">
          {/* Glowing Animated Tooltip Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              {language === "uz" ? "Minecraft AI Yordamchi" : language === "ru" ? "ИИ-Помощник" : "Minecraft AI"}
            </span>
          </div>

          {/* 3D Minecraft Rotating Cube Trigger Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="relative w-16 h-16 rounded-2xl p-1 bg-[#090f1f]/95 border-2 border-emerald-400/80 hover:border-cyan-300 shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all duration-300 cursor-pointer flex items-center justify-center group-hover:scale-105 active:scale-95"
            title={language === "uz" ? "Minecraft 3D Voxel AI Yordamchisini ochish" : "Open Minecraft AI Assistant"}
          >
            {/* Satellite pulsing dot on the orbital outer ring */}
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#080d1e] animate-pulse shadow-[0_0_10px_rgba(34,197,94,1)]" />

            {/* Inner Live Rotating 3D Minecraft Cube */}
            <div className="w-full h-full flex items-center justify-center overflow-visible">
              <Minecraft3DCube size={32} blockType="grass" speedSec={10} shadow={false} />
            </div>
          </button>
        </div>
      )}

      {/* ── 2. EXPANDED AI CHAT WINDOW ── */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[440px] bg-[#090e24]/95 border border-cyan-500/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl flex flex-col overflow-hidden text-slate-100 transition-all duration-200 animate-in fade-in zoom-in-95 ${
            isMinimized ? "h-16" : "h-[600px] max-h-[86vh]"
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-slate-950/90 border-b border-cyan-500/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mini 3D Rotating Cube in Header */}
              <div className="w-11 h-11 rounded-xl border border-emerald-500/50 bg-[#060a14] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.35)]">
                <Minecraft3DCube size={22} blockType="grass" speedSec={12} interactive={false} shadow={false} glow={false} />
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-2">
                  <span>
                    {language === "uz"
                      ? "Minecraft AI Yordamchi"
                      : language === "ru"
                      ? "Minecraft ИИ-Ассистент"
                      : "Minecraft AI Companion"}
                  </span>
                  <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    24/7 ONLINE
                  </span>
                </div>
                <div className="text-[10px] text-emerald-300 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Minecraft Voxel AI Core</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                title={language === "uz" ? "Yozishmani tozalash" : "Очистить чат"}
              >
                <RotateCcw size={13} />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                title={isMinimized ? "Kengaytirish" : "Kichraytirish"}
              >
                {isMinimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 flex items-center justify-center transition-all cursor-pointer"
                title="Yopish"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Chat Body (when not minimized) */}
          {!isMinimized && (
            <>
              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-cyan-500/20">
                {messages.map((m) => {
                  const isUser = m.sender === "user";
                  const style = m.formatStyle || "standard";

                  // Dynamic Card Styles for breaking monochromatic feel
                  let cardBg = "bg-slate-900/90 border-cyan-500/30 text-slate-100";
                  let badgeBadge = "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";

                  if (isUser) {
                    cardBg = "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]";
                  } else if (style === "forbidden") {
                    cardBg = "bg-rose-950/70 border-rose-500/50 text-rose-100 shadow-[0_0_20px_rgba(244,63,94,0.25)]";
                    badgeBadge = "bg-rose-500/25 text-rose-300 border-rose-400/40";
                  } else if (style === "tactical") {
                    cardBg = "bg-[#0b162e]/90 border-emerald-500/40 text-emerald-50 shadow-[0_0_18px_rgba(16,185,129,0.15)]";
                    badgeBadge = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
                  } else if (style === "blueprint") {
                    cardBg = "bg-[#18112e]/90 border-purple-500/40 text-purple-50 shadow-[0_0_18px_rgba(168,85,247,0.15)]";
                    badgeBadge = "bg-purple-500/20 text-purple-300 border-purple-500/30";
                  } else if (style === "terminal") {
                    cardBg = "bg-[#050b14]/95 border-cyan-400/50 text-cyan-50 font-mono shadow-[0_0_20px_rgba(6,182,212,0.2)]";
                    badgeBadge = "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
                  } else if (style === "tips") {
                    cardBg = "bg-[#1f1708]/90 border-amber-500/40 text-amber-50 shadow-[0_0_18px_rgba(245,158,11,0.15)]";
                    badgeBadge = "bg-amber-500/20 text-amber-300 border-amber-500/30";
                  }

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
                    >
                      <div
                        className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed border ${cardBg} ${
                          isUser ? "rounded-br-sm" : "rounded-bl-sm"
                        }`}
                      >
                        {/* Dynamic Badge Header for AI Responses */}
                        {!isUser && m.badge && (
                          <div className="flex items-center gap-1.5 mb-2 pb-1.5 border-b border-white/10">
                            {style === "forbidden" ? (
                              <ShieldAlert size={13} className="text-rose-400" />
                            ) : style === "terminal" ? (
                              <Terminal size={13} className="text-cyan-400" />
                            ) : style === "tactical" ? (
                              <Compass size={13} className="text-emerald-400" />
                            ) : (
                              <Sparkles size={13} className="text-purple-400" />
                            )}
                            <span className={`text-[9px] font-mono font-black uppercase px-1.5 py-0.5 rounded border ${badgeBadge}`}>
                              {m.badge}
                            </span>
                          </div>
                        )}

                        <div className="whitespace-pre-line">{m.text}</div>

                        {/* Interactive Command Copy Box */}
                        {m.commandSnippet && (
                          <div className="mt-2.5 p-2 rounded-xl bg-black/60 border border-cyan-500/30 flex items-center justify-between gap-2">
                            <code className="text-[11px] font-mono text-cyan-300 select-all truncate">
                              {m.commandSnippet}
                            </code>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(m.commandSnippet!)}
                              className="px-2 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-200 text-[10px] font-mono flex items-center gap-1 transition-all flex-shrink-0 cursor-pointer"
                            >
                              {copiedCode === m.commandSnippet ? (
                                <>
                                  <Check size={11} className="text-emerald-400" />
                                  <span>NUSXALANDI</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={11} />
                                  <span>NUSXA</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {/* Related Items Pills */}
                        {m.relatedItems && m.relatedItems.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-2 flex-wrap">
                            {m.relatedItems.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-black/40 border border-cyan-400/30 text-[11px] text-cyan-300 font-mono"
                              >
                                <img
                                  src={item.texture}
                                  alt={item.name}
                                  className="w-4 h-4 object-contain [image-rendering:pixelated]"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/icons/raw_icon.png";
                                  }}
                                />
                                <span>{item.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <span className="text-[9px] text-slate-500 px-1 font-mono">
                        {m.time}
                      </span>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono p-2 bg-slate-900/80 rounded-2xl border border-cyan-500/20 max-w-[130px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                    <span>AI tahlil qilmoqda</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Carousel */}
              <div className="px-3 py-2 bg-slate-950/70 border-t border-white/5 overflow-x-auto flex items-center gap-1.5 scrollbar-none">
                {activePrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(prompt);
                    }}
                    className="flex-shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-400/40 transition-all cursor-pointer whitespace-nowrap"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-slate-950/90 border-t border-cyan-500/20 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    language === "uz"
                      ? "Minecraft haqida har qanday savolni bering..."
                      : language === "ru"
                      ? "Задайте любой вопрос по Майнкрафту..."
                      : "Ask any question about Minecraft..."
                  }
                  className="flex-1 bg-slate-900/90 border border-cyan-500/30 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer flex-shrink-0"
                >
                  <Send size={15} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
