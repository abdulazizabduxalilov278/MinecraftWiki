"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Wand2,
  Sparkles,
  X,
  Send,
  RotateCcw,
  Bot,
  User,
  ExternalLink,
  ChevronRight,
  Zap,
  HelpCircle,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ITEMS, MinecraftItem } from "@/data/items";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
  relatedItems?: { name: string; id: string; texture: string }[];
}

export default function AIAssistant() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message based on language
  const initialMessages: Record<string, ChatMessage[]> = {
    uz: [
      {
        id: "m_welcome_uz",
        sender: "ai",
        text: "Assalomu alaykum! Men Minecraft Sun'iy Intellekt (AI) Yordamchisiman. 1.12 dan 1.21+ gacha bo'lgan barcha retseptlar, Ender Dragonni yutish sirlari, olmos qazish qatlamlari (Y = -58) va damlamalar haqida xohlagan savolingizni bering!",
        time: "Hozir",
      },
    ],
    ru: [
      {
        id: "m_welcome_ru",
        sender: "ai",
        text: "Привет! Я ИИ-помощник по Minecraft. Задайте любой вопрос по рецептам крафта от 1.12 до 1.21+, тактике победы над Драконом Края, высоте спавна алмазов (Y = -58) или зельеварению!",
        time: "Сейчас",
      },
    ],
    en: [
      {
        id: "m_welcome_en",
        sender: "ai",
        text: "Greetings! I am your Minecraft AI Companion. Ask me anything about 1.12-1.21+ crafting recipes, Ender Dragon speedrun bed strats, diamond mining depths (Y: -58), or potion alchemy!",
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
      "🐉 Ender Ajdahosini qanday yengish mumkin?",
      "🛡️ Qalqon (Shield) qanday yasaladi?",
      "🧪 Olovga chidamlilik damlamasi retsepti",
      "🔥 Netherit qurol qanday olinadi?",
      "🏰 Stronghold portalini qidirish yo'li",
    ],
    ru: [
      "💎 Где лучше всего копать алмазы?",
      "🐉 Как победить Дракона Края кроватями?",
      "🛡️ Как скрафтить щит?",
      "🧪 Рецепт зелья огнестойкости",
      "🔥 Как улучшить броню до незерита?",
      "🏰 Как найти портал в Край (Stronghold)?",
    ],
    en: [
      "💎 What is the best Y-level for diamonds?",
      "🐉 How to beat the Ender Dragon with beds?",
      "🛡️ How do I craft a Shield?",
      "🧪 Fire Resistance potion brewing recipe",
      "🔥 How to upgrade to Netherite gear?",
      "🏰 How to triangulate the Stronghold portal?",
    ],
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  // AI Knowledge Responder
  const generateAIResponse = (userQuery: string): { text: string; relatedItems?: any[] } => {
    const q = userQuery.toLowerCase().trim();

    // 1. Olmos qazish qatlami / Diamonds Y-level
    if (q.includes("olmos") || q.includes("diamond") || q.includes("алмаз")) {
      if (language === "uz") {
        return {
          text: "💎 **Olmos qayerda eng ko'p topiladi?**\n\n• **1.18 — 1.21+ versiyalarda**: Olmoslar eng ko'p **Y = -58** va **Y = -53** balandliklar orasida joylashgan. Qanchalik chuqurroq (Bedrock gacha) qazisangiz, olmos uchrash ehtimoli shunchalik yuqori bo'ladi!\n• **Eski 1.12 — 1.17 versiyalarda**: Eng qulay qatlam **Y = 11** hisoblanadi.\n• **Maslahat**: Fortune III (Omad III) sehrli cho'kich bilan qazisangiz, 1 ta ma'dandan 4 tagacha olmos olishingiz mumkin!",
          relatedItems: [
            { name: "Diamond", id: "diamond", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/diamond.png" },
            { name: "Diamond Pickaxe", id: "diamond_pickaxe", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/diamond_pickaxe.png" },
          ],
        };
      } else if (language === "ru") {
        return {
          text: "💎 **Где добывать алмазы?**\n\n• **В версиях 1.18 — 1.21+**: Оптимальная высота — **Y = -58**. Чем глубже в сланцевый слой, тем выше концентрация алмазной руды!\n• **В версиях 1.12 — 1.17**: Самая безопасная и эффективная высота — **Y = 11**.\n• **Совет**: Используйте кирку на 'Удачу III' (Fortune III), чтобы получать до 4 алмазов с одной руды!",
        };
      } else {
        return {
          text: "💎 **Best Diamond Mining Levels:**\n\n• **Modern (1.18 — 1.21+)**: Dig down to **Y: -58**. Diamond generation increases with depth all the way to bedrock!\n• **Legacy (1.12 — 1.17)**: The sweet spot is strip mining at **Y: 11**.\n• **Pro-Tip**: Always use a Fortune III pickaxe to multiply drops up to 4 diamonds per ore block!",
        };
      }
    }

    // 2. Ender Dragon / Ajdaho jangi / Bed strat
    if (q.includes("dragon") || q.includes("ajdaho") || q.includes("дракон") || q.includes("yutish") || q.includes("beat")) {
      if (language === "uz") {
        return {
          text: "🐉 **Ender Ajdahosini yengish sirlari (Bed Strat):**\n\n1. **End Kristallarini portlatish**: Obsidian ustunlar ustidagi barcha kristallarni kamon bilan yo'q qiling, aks holda ajdaho o'zini davolayveradi.\n2. **Karavot Portlatish (Pro Speedrun usuli)**: Ajdaho markaziy tosh poydevorga (Perch) qo'nganda, uning boshiga qarab Karavot (Bed) qo'ying va bosing! Karavot The End'da ulkan TNT kabi portlaydi. Atigi 4-5 ta karavot bilan ajdahoni 30 soniyada o'ldirish mumkin!\n3. **Xavfsizlik**: Portlash sizga zarar yetkazmasligi uchun o'zingiz va karavot orasiga 1 dona obsidian yoki tosh blok qo'ying (bu zararni 80% to'sadi).\n4. **Mukofot**: Ajdaho o'lgach 68 level tajriba va qimmatbaho **Ajdaho Tuxumi (Dragon Egg)** beradi!",
          relatedItems: [
            { name: "Dragon Egg", id: "dragon_egg", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/block/dragon_egg.png" },
            { name: "Red Bed", id: "red_bed", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/red_bed.png" },
          ],
        };
      } else if (language === "ru") {
        return {
          text: "🐉 **Тактика победы над Драконом Края (Взрыв кроватей):**\n\n1. Сбейте луком все кристаллы Края на обсидиановых столбах.\n2. Дождитесь, пока дракон опустится на центральный бедрок-фонтан.\n3. Поставьте кровать у его головы, закройтесь 1 блоком булыжника и зажмите клик по кровати. В Краю кровати взрываются с разрушительной силой!\n4. Достаточно 4-5 кроватей, чтобы убить босса менее чем за минуту.",
        };
      } else {
        return {
          text: "🐉 **How to Beat the Ender Dragon (Bed Exploding Strat):**\n\n1. Destroy all healing End Crystals atop the obsidian pillars using a bow.\n2. When the Dragon perches over the center bedrock fountain, place a Bed on top.\n3. Put 1 cobblestone block between you and the bed to block 80% blowback, then right-click the bed to detonate massive damage!\n4. 4 beds are enough to 1-cycle the boss into oblivion.",
        };
      }
    }

    // 3. Qalqon / Shield
    if (q.includes("qalqon") || q.includes("shield") || q.includes("щит")) {
      if (language === "uz") {
        return {
          text: "🛡️ **Qalqon (Shield) yasash:**\n\n• **Kerakli narsalar**: 1 ta Temir quymasi (Iron Ingot) + 6 ta Taxta (Planks).\n• **Qo'llanishi**: Ikkinchi qo'lga (Off-hand / F tugmasi) taqiladi. Sichqonchaning o'ng tugmasi bosilganda skelet o'qlari va Kríper portlashlarini 100% zararsizlantiradi!\n• **Maslahat**: Temirchi dastgohida bannerlar bilan birlashtirib, unga chiroyli naqsh tushirishingiz mumkin.",
          relatedItems: [
            { name: "Shield", id: "shield", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/shield.png" },
            { name: "Iron Ingot", id: "iron_ingot", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/iron_ingot.png" },
          ],
        };
      } else {
        return {
          text: "🛡️ **Crafting a Shield:**\n\n• **Recipe**: 1 Iron Ingot (top center) + 6 Wooden Planks (forming a 'Y' shape around it).\n• **Combat Utility**: Blocks 100% of projectile damage and point-blank creeper detonations when holding Right Click!",
        };
      }
    }

    // 4. Olovga chidamlilik / Fire resistance potion
    if (q.includes("damlama") || q.includes("potion") || q.includes("зель") || q.includes("olov") || q.includes("fire")) {
      if (language === "uz") {
        return {
          text: "🧪 **Olovga Chidamlilik Damlamasi (Fire Resistance Potion):**\n\n1. Suvli kolbani Potion stendiga qo'ying.\n2. **Nether Wart** qo'shing → *Awkward Potion* hosil bo'ladi.\n3. **Magma Cream** (Magma kremi) qo'shing → *3 daqiqalik Olovga chidamlilik* beradi.\n4. **Redstone** qo'shing → Vaqtini **8 daqiqagacha** uzaytiradi!\n• **Foydasi**: Lavada va olovda 8 daqiqa davomida umuman kuymasdan suzish imkonini beradi.",
          relatedItems: [
            { name: "Potion", id: "potion", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/potion.png" },
            { name: "Magma Cream", id: "magma_cream", texture: "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/magma_cream.png" },
          ],
        };
      } else {
        return {
          text: "🧪 **Fire Resistance Potion Brewing Tree:**\n\n1. Water Bottle + Nether Wart = Awkward Potion\n2. Awkward Potion + Magma Cream = Fire Resistance (3:00)\n3. Add Redstone Dust = Extended Fire Resistance (8:00)!\n• Complete immunity to direct fire, blazes, and lava submersion.",
        };
      }
    }

    // 5. Netherit / Netherite
    if (q.includes("netherit") || q.includes("netherite") || q.includes("незерит")) {
      if (language === "uz") {
        return {
          text: "🔥 **Netherit Qurollar va Sovutlar tayyorlash:**\n\n1. Do'zaxda Y = 15 balandlikda karavot yoki TNT bilan qazib **Ancient Debris** (Qadimiy qoldiq) toping.\n2. Pechda eritib **Netherite Scrap** oling (4 ta scrap + 4 ta oltin quymasi = 1 ta **Netherite Ingot**).\n3. 1.20+ da Bastiondan **Netherite Upgrade Smithing Template** topishingiz shart!\n4. Smithing Table'da Olmos qurol + Smithing Template + Netherite Ingot birlashtirib Netheritga aylantiring.\n• **Xususiyati**: Lavada yonmaydi, suvda va lavada suzib yuradi va zarbasi juda kuchli!",
        };
      } else {
        return {
          text: "🔥 **How to craft Netherite Gear:**\n\n1. Mine Ancient Debris around Y: 15 in the Nether using bed/TNT blasts.\n2. Smelt into 4 Netherite Scraps + 4 Gold Ingots = 1 Netherite Ingot.\n3. In 1.20+, find a Netherite Upgrade Template in a Bastion Remnant.\n4. Combine Diamond Gear + Template + Ingot at a Smithing Table!",
        };
      }
    }

    // 6. Stronghold / Eye of Ender
    if (q.includes("stronghold") || q.includes("portal") || q.includes("ko'z") || q.includes("око")) {
      if (language === "uz") {
        return {
          text: "🏰 **Stronghold (Yerosti Qal'asi)ni topish yo'li:**\n\n1. **Eye of Ender (Ender Ko'zi)** yasang: 1 ta Blaze Powder + 1 ta Ender Pearl.\n2. Bo'sh maydonda ko'zni havoga oting — u qal'a tomonga uchib boradi.\n3. U uchgan yo'nalish bo'ylab 400-500 blok yugurib, yana bitta ko'z oting.\n4. Ko'z osmonga emas, to'g'ridan-to'g'ri yer ostiga qarab kirib ketsa — siz qal'a ustidasiz!\n5. Pastga qazib Stronghold'ga kiring va 12 ta ramkani to'ldirib End portalini oching.",
        };
      } else {
        return {
          text: "🏰 **How to Locate the Stronghold:**\n\n1. Craft Eyes of Ender (Blaze Powder + Ender Pearl).\n2. Throw an eye into the sky and follow the trajectory line for 400-500 blocks.\n3. When a thrown eye plunges straight down into the dirt, dig down into the stone brick stronghold labyrinths!",
        };
      }
    }

    // 7. General search against item database
    const matchedItem = ITEMS.find(
      (item) => item.id.includes(q) || item.name.toLowerCase().includes(q)
    );
    if (matchedItem) {
      if (language === "uz") {
        return {
          text: `📦 **${matchedItem.name}** haqida ma'lumot:\n\n• **Kategoriya**: ${matchedItem.category}\n• **Nodirligi**: ${matchedItem.rarity.toUpperCase()}\n• **Yasaladimi?**: ${matchedItem.isCraftable ? "Ha, 3x3 ish stolida yasaladi" : "Yo'q, tabiatdan yoki moblardan topiladi"}\n\nUshbu buyumni katalogda ko'rish uchun qidiruv tizimiga uning nomini yozishingiz mumkin!`,
          relatedItems: [{ name: matchedItem.name, id: matchedItem.id, texture: matchedItem.texture }],
        };
      } else {
        return {
          text: `📦 **${matchedItem.name}** info:\n\n• **Category**: ${matchedItem.category}\n• **Rarity**: ${matchedItem.rarity}\n• **Craftable**: ${matchedItem.isCraftable ? "Yes, standard 3x3 recipe" : "No, obtained naturally in-game"}\n\nSearch for this item in the catalog above to view its full 3D orbital model and stats!`,
          relatedItems: [{ name: matchedItem.name, id: matchedItem.id, texture: matchedItem.texture }],
        };
      }
    }

    // Fallback friendly answer
    if (language === "uz") {
      return {
        text: `🤖 Men "${userQuery}" bo'yicha ma'lumotlarni tahlil qildim. \n\nMinecraft'da har qanday retsept, ma'dan qatlamlari, bosslar bilan jang yoki damlamalar haqida so'rashingiz mumkin. Masalan:\n• *"Olmos qayerda eng ko'p topiladi?"*\n• *"Ender Ajdahosini qanday yutsa bo'ladi?"*\n• *"Qalqon qanday yasaladi?"*\n\nSavolingizni aniqroq qilib yozsangiz, darhol to'liq yo'riqnoma beraman!`,
      };
    } else {
      return {
        text: `🤖 I analyzed "${userQuery}". You can ask me any question about Minecraft crafting recipes, mob stats, Y-level ore depths, or speedrun tricks. Try asking: *"Best level for diamonds"*, *"How to defeat the dragon with beds"*, or *"How to brew fire resistance"*!`,
      };
    }
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");

    // Add user message
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: "user",
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const resp = generateAIResponse(userText);
      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: resp.text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        relatedItems: resp.relatedItems,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
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
      {/* ── 1. EXACT FLOATING TRIGGER BUTTON (MATCHING USER'S SCREENSHOT) ── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group flex items-center gap-3">
          {/* Glowing Animated Tooltip Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-cyan-400/40 text-cyan-300 text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>
              {language === "uz" ? "Minecraft AI Yordamchi" : language === "ru" ? "ИИ-Помощник" : "Minecraft AI"}
            </span>
          </div>

          {/* Circular Button matching user's image: cyan border ring + cyan-purple gradient inner + magic wand */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="relative w-14 h-14 rounded-full p-1 bg-transparent border-2 border-cyan-400 hover:border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.65)] hover:shadow-[0_0_35px_rgba(168,85,247,0.8)] transition-all duration-300 cursor-pointer flex items-center justify-center group-hover:scale-110 active:scale-95"
            title={language === "uz" ? "Minecraft AI Yordamchisini ochish" : "Open Minecraft AI Assistant"}
          >
            {/* Satellite pulsing dot on the orbital outer ring */}
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-cyan-300 border-2 border-[#080d1e] animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />

            {/* Inner Vibrant Gradient Circle: Cyan to Violet */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-purple-600 flex items-center justify-center shadow-inner">
              {/* Magic Wand icon with sparkles angled at 45° matching image */}
              <Wand2
                size={22}
                className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] transform rotate-12 group-hover:rotate-45 transition-transform"
              />
            </div>
          </button>
        </div>
      )}

      {/* ── 2. EXPANDED AI CHAT WINDOW ── */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] bg-[#0c142c]/95 border border-cyan-500/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl flex flex-col overflow-hidden text-slate-100 transition-all duration-200 animate-in fade-in zoom-in-95 ${
            isMinimized ? "h-16" : "h-[580px] max-h-[85vh]"
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 bg-slate-950/90 border-b border-cyan-500/25 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mini version of the wand icon */}
              <div className="w-9 h-9 rounded-full border-2 border-cyan-400/80 p-0.5 bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                <Wand2 size={16} className="text-white transform rotate-12" />
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
                <div className="text-[10px] text-cyan-300 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>MinecraftWiki.uz AI Engine</span>
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
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                          isUser
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                            : "bg-slate-900/90 border border-cyan-500/30 text-slate-100 rounded-bl-sm shadow-md"
                        }`}
                      >
                        <div className="whitespace-pre-line">{m.text}</div>

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
                                    (e.target as HTMLImageElement).src =
                                      "https://raw.githubusercontent.com/misode/mcmeta/assets/assets/minecraft/textures/item/diamond.png";
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
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono p-2 bg-slate-900/80 rounded-2xl border border-cyan-500/20 max-w-[120px]">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                    <span>AI o&apos;ylamoqda</span>
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
                      ? "Minecraft haqida xohlagan narsangizni so'rang..."
                      : language === "ru"
                      ? "Спросите что угодно о Майнкрафте..."
                      : "Ask anything about Minecraft..."
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
