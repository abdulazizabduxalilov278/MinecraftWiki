"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowLeft,
  Flame,
  Skull,
  Mountain,
  Zap,
  Bug,
  Gem,
  MessageCircle,
  ExternalLink,
  Shield,
  Layers,
  HelpCircle,
  X,
  BookOpen,
  Calendar,
  Clock,
  Compass,
  Lightbulb,
  MessageSquare,
  Share2,
  Trophy,
  Wand2,
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import VersionSelector from "@/components/VersionSelector";
import CosmicBackground from "@/components/CosmicBackground";
import ProgressionGuide from "@/components/ProgressionGuide";
import ServerAddressBanner from "@/components/ServerAddressBanner";
import { useLanguage } from "@/context/LanguageContext";

interface WikiArticle {
  id: string;
  titleEn: string;
  titleRu: string;
  titleUz: string;
  categoryEn: string;
  categoryRu: string;
  categoryUz: string;
  eraEn: string;
  eraRu: string;
  eraUz: string;
  summaryEn: string;
  summaryRu: string;
  summaryUz: string;
  fullTextEn: string[];
  fullTextRu: string[];
  fullTextUz: string[];
  mechanicsEn: string[];
  mechanicsRu: string[];
  mechanicsUz: string[];
  triviaEn: string;
  triviaRu: string;
  triviaUz: string;
  comments: { user: string; role: string; textEn: string; textRu: string; textUz: string; time: string }[];
  accentColor: string;
  badgeColor: string;
  imageUrl: string;
  youtubeVideoId?: string;
}

const WIKI_ARTICLES: WikiArticle[] = [
  {
    id: "tricky_trials",
    titleEn: "1.21 Tricky Trials: The Crafter & Mace",
    titleRu: "1.21 Tricky Trials: Авто-крафтер и Булава",
    titleUz: "1.21 Tricky Trials: Avto-krafter va Gurzi (Mace)",
    categoryEn: "Major Game Update",
    categoryRu: "Крупное обновление игры",
    categoryUz: "Katta o'yin yangilanishi",
    eraEn: "Minecraft 1.21 (2024)",
    eraRu: "Майнкрафт 1.21 (2024)",
    eraUz: "Minecraft 1.21 (2024)",
    summaryEn: "Introduced the revolutionary automated Crafter block, challenging underground Trial Chambers, The Breeze mob, and the devastating fall-damage scaling Mace.",
    summaryRu: "Революционный блок автоматического крафта (Crafter), подземные Испытательные палаты, моб Бриз и смертоносная Булава со скейлингом урона от падения.",
    summaryUz: "Inqilobiy avtomatik Crafter bloki, yerosti Trial Chambers sinov xonalari, Breeze mobi va balandlikdan tushish zararini ko'paytiruvchi halokatli Gurzi (Mace).",
    fullTextEn: [
      "Minecraft 1.21, officially titled 'Tricky Trials', marks the largest leap forward for technical Minecraft automation since the introduction of hoppers in 2013. The centerpiece of the update is the Crafter block, which executes crafting recipes automatically via redstone pulses.",
      "Trial Chambers generate deep in the Overworld, built from copper and tuff bricks. They host Trial Spawners that dynamically adapt difficulty based on the number of participating players, rewarding victors with Trial Keys to unlock Vaults.",
      "The Mace weapon introduces unprecedented kinetic damage: falling from extreme heights with Elytra or wind charges multiplies the impact damage infinitely, capable of one-shotting the Warden."
    ],
    fullTextRu: [
      "Обновление 1.21 «Tricky Trials» стало крупнейшим прорывом в автоматизации со времён появления воронок в 2013 году. Главное новшество — блок Crafter, позволяющий выполнять крафт автоматически по редстоун-импульсу.",
      "Испытательные палаты (Trial Chambers) генерируются в глубинах Верхнего мира из медных и туфовых кирпичей. Спавнеры испытаний динамически подстраивают сложность под число игроков и выдают ключи от сокровищниц.",
      "Оружие Булава (Mace) использует кинетическую механику: падение с большой высоты на элитрах или ветровых зарядах многократно умножает урон, позволяя ликвидировать даже Вардена с одного удара."
    ],
    fullTextUz: [
      "Minecraft 1.21 'Tricky Trials' yangilanishi 2013-yildagi voronkalar paydo bo'lganidan buyon o'yin avtomatizatsiyasidagi eng katta sakrash bo'ldi. Yangilanishning markaziy elementi — redstoun impulslari orqali avtomatik ravishda buyumlarni yasaydigan Crafter blokidir.",
      "Trial Chambers (Sinov xonalari) yerosti chuqurliklarida mis va tuf g'ishtlaridan paydo bo'ladi. U yerdagi sinov spavnerlari o'yinchilar soniga qarab qiyinchilikni moslashtiradi va g'oliblarga maxsus kalitlarni taqdim etadi.",
      "Gurzi (Mace) quroli kinetik zarar mexanikasini taqdim etadi: Elitra yoki shamol zaryadlari yordamida balandlikdan sakrab zarba berish orqali hatto Vardenni bitta zarbada yo'q qilish mumkin."
    ],
    mechanicsEn: [
      "Crafter slots can be locked individually to construct exact 3x3 recipe shapes.",
      "Mace smash attack negates all accumulated fall damage upon successful enemy impact.",
      "Breeze projectiles reflect player arrows and activate levers, buttons, and trapdoors."
    ],
    mechanicsRu: [
      "Слоты блока Crafter можно блокировать по отдельности для точного задания формы рецепта.",
      "Успешный удар булавой в падении полностью обнуляет накопленный урон от падения.",
      "Снаряды Бриза отбивают стрелы и могут нажимать рычаги, кнопки и активировать люки."
    ],
    mechanicsUz: [
      "Crafter kataklarini retsept shaklini aniq belgilash uchun alohida-alohida bloklash mumkin.",
      "Gurzi bilan dushmanga zarba berilganda to'plangan barcha yiqilish zarari butunlay nolga tenglashadi.",
      "Breeze snaryadlari otilgan o'qlarni qaytaradi va richaglar, tugmalar hamda lyuklarni faollashtiradi."
    ],
    triviaEn: "The Crafter was requested by redstone engineers for over 11 years before Mojang officially designed it.",
    triviaRu: "Сообщество редстоун-инженеров просило авто-крафтер более 11 лет, прежде чем Mojang решились внедрить его.",
    triviaUz: "Redstoun muhandislari Crafter blokini Mojang rasman qo'shishidan oldin 11 yildan ortiq vaqt davomida so'rab kelishgan.",
    comments: [
      { user: "RedstonePro", role: "Technical Builder", textEn: "The Crafter completely revolutionized survival sorting systems!", textRu: "Крафтер полностью перевернул системы автоматической сортировки!", textUz: "Crafter avtomatik saralash tizimlarini butunlay yangi bosqichga olib chiqdi!", time: "2 days ago" },
      { user: "MaceMaster", role: "PvP Enthusiast", textEn: "Jumping 50 blocks down with a Mace is the most satisfying feeling.", textRu: "Прыжок с 50 блоков с булавой — самое эпичное чувство в игре.", textUz: "Gurzi bilan 50 blok balandlikdan dushman ustiga sakrash — o'yindagi eng ajoyib hissiyot.", time: "5 days ago" }
    ],
    accentColor: "#e0734c",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    imageUrl: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=1200&q=80",
    youtubeVideoId: "d6iZ38mJ0oQ",
  },
  {
    id: "warden_deep_dark",
    titleEn: "The Warden & Ancient City Lore",
    titleRu: "Хранитель (Варден) и Тайны Древнего Города",
    titleUz: "Varden (Warden) va Qadimiy Shahar Sirlari",
    categoryEn: "Boss Mechanics & Lore",
    categoryRu: "Механика боссов и лор",
    categoryUz: "Boss mexanikasi va o'yin tarixi",
    eraEn: "Minecraft 1.19 The Wild Update",
    eraRu: "Майнкрафт 1.19 The Wild Update",
    eraUz: "Minecraft 1.19 The Wild Update",
    summaryEn: "Dwelling in subterranean Ancient Cities, the blind Warden possesses 500 HP and a sonic boom attack that pierces all shields and Netherite Protection IV armor.",
    summaryRu: "Обитающий в Древних городах слепой Варден обладает 500 HP и ультразвуковой волной, пробивающей любые щиты и незеритовую броню с Защитой IV.",
    summaryUz: "Qadimiy shaharlar tubida yashovchi ko'r Varden 500 HP ga ega bo'lib, har qanday qalqon va IV-himoyali nezerit sovutlarini teshib o'tuvchi tovush to'lqiniga ega.",
    fullTextEn: [
      "The Warden was intentionally engineered not as a traditional boss to be slain, but as an insurmountable horror hazard that forces players into stealth. It is completely blind, navigating exclusively via vibrations detected by Sculk Sensors and olfactory sniffing.",
      "Disturbing three Sculk Shriekers triggers the Warden's summoning animation from underground. If alarmed by footsteps, vibrations, or projectile impacts, it enters an enraged state with boosted sprint speed.",
      "Its devastating ranged attack, the Sonic Boom, penetrates solid terrain, shields, and Protection enchantments, dealing up to 30 damage points directly to the player."
    ],
    fullTextRu: [
      "Варден был спроектирован не как традиционный босс для фарма, а как неодолимая природная угроза, заставляющая игрока переходить на скрытное перемещение. Он полностью слеп и ориентируется только по вибрациям и запаху.",
      "Активация трёх скалк-крикунов запускает жуткую анимацию появления Вардена из-под земли. Привлечённый звуками шагов или выстрелов, он впадает в ярость и развивает высокую скорость бега.",
      "Его дальнобойный ультразвуковой залп (Sonic Boom) пробивает твёрдые блоки, щиты и любые чары Защиты, нанося до 30 единиц чистого урона прямо по персонажу."
    ],
    fullTextUz: [
      "Varden an'anaviy o'ldiriladigan boss sifatida emas, balki o'yinchilarni yashirincha harakatlanishga majbur qiluvchi dahshatli xavf sifatida loyihalashtirilgan. U butunlay ko'r bo'lib, faqat Skalk datchiklari orqali seziladigan tebranishlar va hidlar bo'yicha harakatlanadi.",
      "Uchta Skalk qichqiruvchisini (Shrieker) bezovta qilish Vardenning yer ostidan chiqish animatsiyasini ishga tushiradi. Qadam tovushlari yoki otilgan o'qlardan g'azablanib, yuqori yugurish tezligiga erishadi.",
      "Uning dahshatli uzoq masofali hujumi — Sonic Boom tosh bloklar, qalqonlar va himoya sehrlarini chetlab o'tib, to'g'ridan-to'g'ri 30 gacha zarar yetkazadi."
    ],
    mechanicsEn: [
      "Health pool of 500 HP (250 Hearts) — the highest of any vanilla Minecraft entity.",
      "Vibrations caused by sneaking (crouching) or walking on wool blocks are undetectable.",
      "The massive frame at the center of Ancient Cities strongly hints at an inactive dimension portal."
    ],
    mechanicsRu: [
      "Запас здоровья составляет 500 HP (250 сердец) — абсолютный рекорд среди сущностей игры.",
      "Перемещение крадучись (Shift) или ходьба по блокам шерсти не создают слышимых вибраций.",
      "Исполинская рамка в центре Древнего города намекает на портал в неисследованное измерение."
    ],
    mechanicsUz: [
      "500 HP (250 ta yurak) salomatlik zaxirasi — Minecraft o'yinidagi barcha mavjudotlar orasida eng yuqori ko'rsatkich.",
      "Egilib yurish (Shift) yoki jun bloklari ustida yurish paytidagi tebranishlar Varden tomonidan sezilmaydi.",
      "Qadimiy shahar markazidagi bahaybat ramka noma'lum yangi o'lchamga ochiladigan portalga ishora qiladi."
    ],
    triviaEn: "During development, Mojang tested pitch-black pitch-shifted audio files to make the Warden encounter psychologically terrifying.",
    triviaRu: "При разработке звуков Вардена разработчики тестировали инфразвуковые частоты для создания эффекта тревоги.",
    triviaUz: "Varden tovushlarini yaratishda psixologik qo'rquv uyg'otish uchun maxsus past chastotali audio fayllardan foydalanilgan.",
    comments: [
      { user: "SilentNinja", role: "Explorer", textEn: "Always carry three stacks of wool when looting Ancient Cities!", textRu: "Всегда берите три стака шерсти перед спуском в Древний город!", textUz: "Qadimiy shaharga tushishdan oldin har doim o'zingiz bilan 3 stack jun oling!", time: "1 week ago" }
    ],
    accentColor: "#2dd4bf",
    badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    youtubeVideoId: "3aGkY9r8oWw",
  },
  {
    id: "far_lands",
    titleEn: "The Far Lands: 32-Bit Overflow Cliff",
    titleRu: "Далёкие земли: Ошибка 32-битного переполнения",
    titleUz: "Uzoq Yerlar (Far Lands): 32-Bitli Xatolik Qoyalari",
    categoryEn: "Legendary Glitch",
    categoryRu: "Легендарный глитч",
    categoryUz: "Afsonaviy glitch",
    eraEn: "Infdev to Beta 1.7.3",
    eraRu: "От Infdev до Beta 1.7.3",
    eraUz: "Infdev dan Beta 1.7.3 gacha",
    summaryEn: "At exactly 12,550,821 blocks from world center, floating point precision limits broke world generation into towering Swiss-cheese cliff walls.",
    summaryRu: "На отметке 12 550 821 блок от центра мира погрешность вычислений с плавающей точкой превращала генерацию в циклопические дырчатые скалы.",
    summaryUz: "Dunyo markazidan roppa-rosa 12,550,821 blok masofada suzuvchi nuqta xatoligi dunyo hosil bo'lishini teshik-teshik bahaybat qoyalarga aylantirgan.",
    fullTextEn: [
      "The Far Lands remain the most iconic terrain glitch in digital gaming history. When Notch wrote the Perlin noise algorithms that determine terrain elevation, he used 32-bit single-precision floating point numbers.",
      "At coordinates beyond 12,550,821 blocks from coordinate origin (0,0), low-order bits were discarded, causing noise octaves to calculate wildly distorted values. This resulted in vertical cliffs stretching endlessly from bedrock to sky height.",
      "In Beta 1.8 (The Adventure Update), the noise equations were refactored, patching the terrain collapse. However, the Far Lands live on in community folklore as the true edge of the infinite realm."
    ],
    fullTextRu: [
      "Далёкие земли — самый узнаваемый ландшафтный баг в истории видеоигр. При написании алгоритмов шума Перлина для генерации рельефа Нотч использовал 32-битные числа с плавающей запятой.",
      "На расстоянии свыше 12 550 821 блока от спавна младшие биты терялись, из-за чего формулы выдавали экстремальные значения. Мир рассекался отвесными скалами с пустотами в виде дырчатого сыра.",
      "В версии Beta 1.8 формулы шума были переписаны, и баг исчез. Однако Далёкие земли навсегда вошли в историю как символ неизведанных границ Майнкрафта."
    ],
    fullTextUz: [
      "Uzoq Yerlar (Far Lands) videoo'yinlar tarixidagi eng mashhur landshaft xatoligi bo'lib qolmoqda. Notch yer balandligini hisoblovchi Perlin shovqini algoritmini yozishda 32-bitli suzuvchi nuqta sonlaridan foydalangan.",
      "Boshlang'ich (0,0) koordinatasidan 12,550,821 blokdan narida hisoblash aniqligi buzilib, o'ta noto'g'ri qiymatlarni bera boshlagan. Bu bedrokdan osmongacha cho'zilgan ulkan tik qoyalarni hosil qilgan.",
      "Beta 1.8 versiyasida formulalar qayta yozilib, bu xatolik tuzatilgan. Biroq Uzoq Yerlar hamjamiyat xotirasida o'yin olamining haqiqiy chegarasi sifatida mangu qoldi."
    ],
    mechanicsEn: [
      "Trigger boundary: X or Z coordinate ±12,550,821.",
      "Severe physics lag: entities, falling sand, and collision boxes glitch through solid geometry.",
      "KurtJMac's 'Far Lands or Bust' expedition has been walking toward the boundary since 2011 to raise charity funds."
    ],
    mechanicsRu: [
      "Точная граница проявления: координаты X или Z ±12 550 821.",
      "Экстремальный лаг физики: сущности и падающие блоки проваливались сквозь текстуры.",
      "Стример KurtJMac идёт пешком к Далёким землям без читов с 2011 года в рамках благотворительности."
    ],
    mechanicsUz: [
      "Aniq chegara koordinatasi: X yoki Z bo'yicha ±12,550,821.",
      "Fizika qonunlarining buzilishi: bloklar va mavjudotlar qattiq qoyalarning ichiga botib ketadi.",
      "KurtJMac ismli o'yinchi xayriya mablag'lari to'plash uchun 2011-yildan beri Uzoq Yerlarga piyoda yurib bormoqda."
    ],
    triviaEn: "Walking legitimately to the Far Lands without teleportation commands requires approximately 820 hours of continuous sprinting.",
    triviaRu: "Пеший путь до Далёких земель без читов занимает около 820 часов непрерывного бега.",
    triviaUz: "Hech qanday buyruqlarsiz Uzoq Yerlargacha piyoda yugurib borish taxminan 820 soat to'xtovsiz yugurishni talab qiladi.",
    comments: [
      { user: "BetaVeteran", role: "OG Player", textEn: "I remember visiting the Far Lands back in 2011 on Beta 1.7. Unforgettable.", textRu: "Помню, как летал туда в 2011 году на Бете 1.7. Незабываемое зрелище.", textUz: "2011-yilda Beta 1.7 versiyasida Uzoq Yerlarga borganimni eslayman. Unutilmas manzara edi.", time: "3 days ago" }
    ],
    accentColor: "#a855f7",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    youtubeVideoId: "Y3F9wB0e-9k",
  },
  {
    id: "redstone_turing",
    titleEn: "Redstone Computing & Turing Completeness",
    titleRu: "Редстоун-компьютеры и Полнота по Тьюрингу",
    titleUz: "Redstoun Kompyuterlari va Tyuring To'liqligi",
    categoryEn: "Technical Engineering",
    categoryRu: "Технический инжиниринг",
    categoryUz: "Texnik muhandislik",
    eraEn: "Alpha to Present",
    eraRu: "От Alpha до наших дней",
    eraUz: "Alpha dan hozirgi kungacha",
    summaryEn: "Redstone wiring in Minecraft is mathematically Turing-complete, allowing technical engineers to construct functioning 16-bit CPUs, RAM, and game emulators.",
    summaryRu: "Логика редстоуна математически полна по Тьюрингу. Игроки собирают в обычном мире рабочие 16-битные процессоры, ОЗУ и эмуляторы ретро-игр.",
    summaryUz: "Minecraftdagi redstoun mantig'i matematik jihatdan Tyuring to'liq hisoblanadi. O'yinchilar ishlaydigan 16-bitli protsessorlar va xotira modullarini yasashadi.",
    fullTextEn: [
      "By combining Redstone Dust, Repeaters, Comparators, and Redstone Torches, players can construct every fundamental Boolean logic gate: AND, OR, NOT, NAND, NOR, and XOR. This gives Minecraft the formal computational properties of a universal Turing machine.",
      "Technical teams have assembled complete central processing units (CPUs) capable of running assembly code, calculating floating-point mathematics, and rendering 3D graphics on massive Redstone Lamp displays.",
      "Modern server networks also leverage sub-tick and wireless redstone mechanics to coordinate massive automated item sorting and bulk quarry perimeters."
    ],
    fullTextRu: [
      "Комбинация красной пыли, повторителей, компараторов и факелов позволяет строить все логические вентили булевой алгебры: И, ИЛИ, НЕ, И-НЕ, ИЛИ-НЕ и Исключающее ИЛИ. Это наделяет игру свойствами машины Тьюринга.",
      "Технические сообщества создали в игре полноценные 16-битные процессоры, способные исполнять ассемблерный код, выполнять вычисления и выводить 3D-графику на экраны из редстоун-ламп.",
      "Современные серверные фермы также используют механики суб-тиков и беспроводного редстоуна для координации гигантских периметров карьеров."
    ],
    fullTextUz: [
      "Qizil chang, takrorlagichlar, komparatorlar va mash'alalarni birlashtirish orqali mantiqiy elementlarni (AND, OR, NOT, NAND, XOR) qurish mumkin. Bu Minecraftga universal Tyuring mashinasi xususiyatlarini beradi.",
      "Muhandislar o'yin ichida assembler kodini bajaradigan, matematik amallarni hisoblaydigan va lampalar ekranida 3D grafikalarni ko'rsatadigan 16-bitli kompyuterlarni yasashgan.",
      "Zamonaviy texnik serverlar simsiz redstoun va sub-tik mexanizmlaridan foydalanib ulkan avtomatlashtirilgan saralash tizimlarini boshqaradilar."
    ],
    mechanicsEn: [
      "1 Redstone Tick equals exactly 0.1 seconds (2 Game Ticks).",
      "Signal strength diminishes by 1 every block, capping at distance 15 without repeaters.",
      "Comparators can read container fill levels (chests, hoppers, barrels) with exact integer fidelity."
    ],
    mechanicsRu: [
      "1 редстоун-тик равен ровно 0,1 секунды (2 игровых тика).",
      "Сила сигнала затухает на 1 единицу за блок, ограничиваясь дальностью 15 без повторителей.",
      "Компараторы считывают степень заполненности сундуков и воронок с точностью до предмета."
    ],
    mechanicsUz: [
      "1 Redstoun tiki roppa-rosa 0.1 soniyaga (2 o'yin tikiga) teng.",
      "Signal kuchi har bir blokda 1 birlikka kamayadi va takrorlagichsiz maksimal 15 blok masofaga yetadi.",
      "Komparatorlar sandiqlar va bochkalarning to'lganlik darajasini aniq butun sonli aniqlikda o'qiydi."
    ],
    triviaEn: "A team of engineering students famously constructed an 8-bit computer in Minecraft that played Tetris on a 64x64 lamp screen.",
    triviaRu: "Группа студентов-инженеров построила в Майнкрафте 8-битный компьютер, запустивший Тетрис на ламповом экране.",
    triviaUz: "Talaba-muhandislar guruhi Minecraftda 64x64 lampali ekranda Tetris o'yinini o'ynaydigan 8-bitli kompyuter yasashgan.",
    comments: [
      { user: "LogicGateKing", role: "Redstone Engineer", textEn: "Comparators changed everything back in 1.5. Infinite possibilities.", textRu: "Компараторы изменили всё в обновлении 1.5. Бесконечные возможности.", textUz: "1.5 yangilanishidagi komparatorlar hamma narsani o'zgartirdi. Cheksiz imkoniyatlar ochildi.", time: "1 day ago" }
    ],
    accentColor: "#ef4444",
    badgeColor: "bg-red-500/20 text-red-300 border-red-500/40",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    youtubeVideoId: "m9596hA9h50",
  },
  {
    id: "quasi_connectivity",
    titleEn: "Quasi-Connectivity: The Bug Preserved Forever",
    titleRu: "Квази-проводимость: Баг, ставший стандартом",
    titleUz: "Kvazi-O'tkazuvchanlik: Standartga Aylangan Xato",
    categoryEn: "Quirk Turned Feature",
    categoryRu: "Особенность движка",
    categoryUz: "Dvigatel xususiyati",
    eraEn: "Java Exclusive (Alpha to Present)",
    eraRu: "Эксклюзив Java (От Alpha до сих пор)",
    eraUz: "Java Eksklyuzivi (Alpha dan hozirgacha)",
    summaryEn: "Pistons and droppers inherit two-block door activation logic, powering from diagonal or high redstone signals. Mojang permanently made it a Java feature.",
    summaryRu: "Поршни и выбрасыватели унаследовали код двухблочных дверей, активируясь по диагонали сверху. Mojang навсегда закрепили этот баг как фичу.",
    summaryUz: "Porshenlar ikki blokli eshiklar kodini meros qilib olib, diagonal yuqoridagi signaldan quvvat oladi. Mojang bu xatoni doimiy xususiyat sifatida saqlab qolgan.",
    fullTextEn: [
      "When Notch added pistons to Minecraft Beta 1.7, he repurposed the activation code from wooden doors to save development time. Because doors occupy two vertical blocks, pistons inherited the ability to be powered by signals targeting the block space directly above them.",
      "This behavior, named 'Quasi-Connectivity' by the community, created Block Update Detectors (BUD switches). Pistons could be primed with power but wouldn't extend until a neighbouring block updated, acting as instant proximity tripwires.",
      "When Mojang attempted to fix this bug during early releases, technical players demonstrated that thousands of compact flying machines, auto-farms, and logic systems relied on it. Mojang decided to preserve it permanently in Java Edition."
    ],
    fullTextRu: [
      "Когда Нотч добавлял поршни в Бете 1.7, он скопировал часть кода дверей для экономии времени. Так как двери занимают два блока по вертикали, поршни переняли свойство активироваться сигналом на блок выше.",
      "Это свойство получило название «Квази-проводимость» и породило детекторы обновления блоков (BUD-переключатели). Поршень заряжался сигналом, но срабатывал лишь при изменении соседнего блока.",
      "Когда разработчики попытались удалить баг, сообщество доказало, что на нём держатся тысячи механизмов и летающих машин. Mojang навсегда оставили квази-проводимость в Java Edition."
    ],
    fullTextUz: [
      "Notch Beta 1.7 versiyasida porshenlarni qo'shganda, vaqtni tejash uchun eshiklarning kodidan foydalangan. Eshiklar ikki blok balandlikda bo'lgani sababli, porshenlar ham o'zidan bir blok yuqoridagi signallardan faollashish qobiliyatini meros qilib olgan.",
      "Bu hodisa 'Kvazi-o'tkazuvchanlik' deb nomlanib, blok yangilanishini sezuvchi datchiklarni (BUD) yaratish imkonini berdi. Porshen quvvatlanib turadi, ammo qo'shni blok yangilanmaguncha ochilmaydi.",
      "Mojang bu xatolikni tuzatishga uringanida, minglab mexanizmlar va uchuvchi mashinalar aynan shu xatoga tayangani ma'lum bo'ldi. Mojang uni Java Editionda butunlay qoldirishga qaror qildi."
    ],
    mechanicsEn: [
      "Affects: Pistons, Sticky Pistons, Droppers, and Dispensers.",
      "The block is powered if the space directly above it would receive power if it were a solid block.",
      "Requires a block update (block placement, growth, movement) to trigger state transitions."
    ],
    mechanicsRu: [
      "Действует на: поршни, липкие поршни, выбрасыватели и раздатчики.",
      "Блок запитывается, если блок над ним получил бы сигнал при наличии твёрдой поверхности.",
      "Требует обновления соседнего блока для перехода в активное или пассивное состояние."
    ],
    mechanicsUz: [
      "Ta'sir qiladi: Oddiy porshenlar, yopishqoq porshenlar va otgichlar (dispenserlar).",
      "Agar blokning to'g'ridan-to'g'ri tepasidagi bo'shliq signal olsa, porshen quvvatlanadi.",
      "Holatini o'zgartirish uchun yonidagi blokning yangilanishi (o'sishi, harakati) talab etiladi."
    ],
    triviaEn: "Bedrock Edition does not feature Quasi-Connectivity, which is why Java redstone contraptions frequently fail on consoles and mobile.",
    triviaRu: "В Bedrock Edition квази-проводимость отсутствует, поэтому сложные механизмы Java не работают на телефонах и консолях.",
    triviaUz: "Bedrock Editionda bu xato mavjud emas, shuning uchun Java redstoun mexanizmlari telefon va konsollarda ishlamaydi.",
    comments: [
      { user: "PistonFlyer", role: "Slime Enthusiast", textEn: "Without QC, two-way flying machines wouldn't even exist!", textRu: "Без квази-проводимости двухсторонние летающие машины были бы невозможны!", textUz: "Bu xatosiz ikki tomonlama uchuvchi mexanizmlar umuman mavjud bo'lmas edi!", time: "4 days ago" }
    ],
    accentColor: "#38bdf8",
    badgeColor: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    youtubeVideoId: "d6iZ38mJ0oQ",
  },
  {
    id: "sand_duping",
    titleEn: "End Portal Gravity Block Duplication",
    titleRu: "Дюп песка и гравия через портал Энда",
    titleUz: "End Portali Orqali Qum va Graviyni Ko'paytirish (Dyup)",
    categoryEn: "Industrial Exploit",
    categoryRu: "Промышленный эксплойт",
    categoryUz: "Sanoat eksploysi",
    eraEn: "Release 1.8 to Present",
    eraRu: "С версии 1.8 по сей день",
    eraUz: "1.8 versiyasidan hozirgacha",
    summaryEn: "Pushing falling sand or concrete powder into active End Portal frames at the exact state-change tick creates an infinite stream of duplicated blocks.",
    summaryRu: "Сброс падающего песка, гравия или бетона в портал Края в точный микро-тик смены состояния дублирует блок, снабжая сырьём фабрики стекла.",
    summaryUz: "Yiqilayotgan qum, shag'al yoki beton kukunini End portali ramkasiga aniq tik paytida itarish orqali cheksiz bloklar oqimini yaratish mumkin.",
    fullTextEn: [
      "In Minecraft's engine, falling blocks (Sand, Red Sand, Gravel, Dragon Egg, Concrete Powder) alternate between two states: a static block grid tile and a dynamic falling entity.",
      "When a piston pushes a falling block into the horizontal vortex of an active End Portal at the exact millisecond of entity conversion, the portal teleportation trigger duplicate-copies the entity into the End dimension while the physics engine retains the original block tile in the Overworld.",
      "This exploit fuels technical server glass and concrete industries, generating upwards of 120,000 duplicated blocks per hour with minimal hardware lag."
    ],
    fullTextRu: [
      "В движке игры сыпучие блоки (песок, гравий, яйцо дракона, цемент) переключаются между двумя состояниями: статичным блоком сетки и падающей сущностью.",
      "Когда поршень толкает блок в воронку портала Энда в точный тик трансформации, триггер телепортации создаёт копию в Энде, пока физический движок фиксирует блок в Верхнем мире.",
      "Этот баг питает колоссальные строительные фабрики стекла и бетона, генерируя до 120 000 блоков в час без просадки серверного тикрейта."
    ],
    fullTextUz: [
      "Minecraft dvigatelida to'kiluvchi bloklar (qum, qizil qum, shag'al, ajdaho tuxumi) ikki holatda bo'ladi: statik blok va dinamik yiqiluvchi ob'ekt.",
      "Porshen yiqilayotgan blokni aynan aylanish millisekundida End portalining gorizontal voronkasiga itarganida, teleportatsiya ob'ekt nusxasini Endga yuboradi, ayni paytda blok Tashqi olamda ham saqlanib qoladi.",
      "Bu xatolik texnik serverlarda shisha va beton sanoatini ta'minlab, soatiga 120 000 tagacha bloklarni ishlab chiqarish imkonini beradi."
    ],
    mechanicsEn: [
      "Requires coordinate alignment: pushing block precisely into Y=0 frame layer.",
      "Can duplicate Dragon Eggs, creating unlimited decorative trophies in survival.",
      "Relies on the split-second tick desynchronization between world chunk managers."
    ],
    mechanicsRu: [
      "Требует точной юстировки поршней относительно горизонтальных блоков портала.",
      "Позволяет бесконечно копировать яйца дракона для редстоун-ломателей бедрока.",
      "Основан на рассинхронизации обработки сущностей между измерениями."
    ],
    mechanicsUz: [
      "Aniq joylashtirishni talab qiladi: porshen blokni to'g'ri portal ramkasiga itarishi lozim.",
      "Ajdaho tuxumlarini ham cheksiz nusxalash imkonini beradi.",
      "O'lchamlar o'rtasidagi soniyaning ulushlaridagi desinxronizatsiyaga tayanadi."
    ],
    triviaEn: "Mojang has acknowledged sand duping but hesitates to patch it because vanilla Minecraft offers no renewable source of sand.",
    triviaRu: "Mojang знают об этом дюпе, но не удаляют его, так как в игре до сих пор нет возобновляемого источника песка.",
    triviaUz: "Mojang ushbu xatoni biladi, ammo uni o'chirib tashlamaydi, chunki o'yinda qumni qayta tiklashning boshqa tabiiy manbai yo'q.",
    comments: [
      { user: "ConcreteBaron", role: "Industrialist", textEn: "Built a 100k/hr factory. Infinite glass for our mega-base!", textRu: "Построили завод на 100k в час. Бесконечное стекло для мега-базы!", textUz: "Soatiga 100 ming blok chiqaradigan zavod qurdik. Baza uchun cheksiz oyna!", time: "6 days ago" }
    ],
    accentColor: "#eab308",
    badgeColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    youtubeVideoId: "Y3F9wB0e-9k",
  }
];

const SECRET_FACTS = [
  {
    en: "Creepers were born from a coding bug when Notch swapped the height and length values of a pig model in 2009.",
    ru: "Крипер появился из-за ошибки в коде в 2009 году: Нотч случайно перепутал значения высоты и длины модели свиньи.",
    uz: "Kriperlar 2009-yilda kod xatoligi tufayli paydo bo'lgan: Notch cho'chqa modelining bo'yi va uzunligi qiymatlarini tasodifan almashtirib qo'ygan.",
  },
  {
    en: "The iconic eerie Ghast sounds were recorded from sound designer C418's sleeping cat when disturbed.",
    ru: "Жуткие крики Гаста были записаны с кота композитора C418, которого случайно потревожили во сне.",
    uz: "Gastning dahshatli ovozlari bastakor C418 ning uyqusi buzilgan mushugi chiqargan tovushlardan yozib olingan.",
  },
  {
    en: "Endermen speak English backwards and pitch-shifted, whispering phrases like 'Hello', 'What's up?', and 'Look for the eye'.",
    ru: "Речь Эндерменов — это английские фразы ('Hello', 'What's up?'), проигранные задом наперёд с искажением тона.",
    uz: "Endermenlarning g'alati ovozi — bu teskari aylantirilgan inglizcha so'zlar ('Hello', 'What's up?').",
  },
  {
    en: "Netherite gear is completely buoyant and floats on lava, preventing items from ever being destroyed by magma.",
    ru: "Незеритовые предметы не горят в лаве и плавают на её поверхности, защищая экипировку от потери.",
    uz: "Nezerit qurollari va sovutlari lavada cho'kmaydi va yonmaydi, har doim lava yuzasida suzib yuradi.",
  },
  {
    en: "Wearing a carved pumpkin on your head prevents Endermen from becoming hostile when looked at directly.",
    ru: "Тыква на голове позволяет смотреть прямо в глаза Эндерменам без риска спровоцировать атаку.",
    uz: "Boshga o'yilgan oshqovoqni kiyish Endermenlarning ko'ziga to'g'ridan-to'g'ri qaraganda ularning g'azablanishining oldini oladi.",
  },
  {
    en: "Lightning striking a creeper charges it with a blue kinetic aura, doubling its blast radius.",
    ru: "Удар молнии в крипера заряжает его синей кинетической аурой, удваивая радиус и силу детонации.",
    uz: "Chaqmoq urganda kriper ko'k kinetik aura bilan quvvatlanadi va uning portlash kuchi ikki barobarga oshadi.",
  },
  {
    en: "Cats scare away Creepers and Phantoms, making them the ultimate survival base companions.",
    ru: "Кошки отпугивают криперов и фантомов, являясь лучшими естественными защитниками базы в выживании.",
    uz: "Mushuklar Kriperlar va Fantomlarni qo'rqitadi, bu ularni omon qolish bazasining eng yaxshi himoyachisiga aylantiradi.",
  },
  {
    en: "A single bucket of lava smelts 100 items in a furnace, making it the most fuel-dense heat source in the game.",
    ru: "Одно ведро лавы переплавляет 100 предметов в печи, являясь самым эффективным топливом в игре.",
    uz: "Bitta paqir lava pechda 100 ta buyumni eritadi va o'yindagi eng samarali yoqilg'i hisoblanadi.",
  },
];

export default function WikipediaPage() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedArticle, setSelectedArticle] = useState<WikiArticle | null>(null);
  const [factIndex, setFactIndex] = useState(0);
  const [isProgressionOpen, setIsProgressionOpen] = useState<boolean>(false);

  // Close modal on ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedArticle(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedArticle]);

  const categories = [
    {
      id: "all",
      label: language === "uz" ? "Barcha maqolalar" : language === "ru" ? "Все статьи" : "All Articles",
    },
    {
      id: "updates",
      label: language === "uz" ? "O'yin yangilanishlari" : language === "ru" ? "Обновления" : "Game Updates",
    },
    {
      id: "technical",
      label: language === "uz" ? "Texnik Redstoun" : language === "ru" ? "Редстоун и логика" : "Technical Redstone",
    },
    {
      id: "glitches",
      label: language === "uz" ? "Afsonaviy Glitchlar" : language === "ru" ? "Легендарные баги" : "OG Exploits & Glitches",
    },
  ];

  const filteredArticles = WIKI_ARTICLES.filter((art) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "updates") return art.id === "tricky_trials" || art.id === "warden_deep_dark";
    if (activeCategory === "technical") return art.id === "redstone_turing" || art.id === "quasi_connectivity";
    if (activeCategory === "glitches") return art.id === "far_lands" || art.id === "sand_duping";
    return true;
  });

  const getArticleTitle = (art: WikiArticle) => {
    if (language === "uz") return art.titleUz;
    if (language === "ru") return art.titleRu;
    return art.titleEn;
  };

  const getArticleCategory = (art: WikiArticle) => {
    if (language === "uz") return art.categoryUz;
    if (language === "ru") return art.categoryRu;
    return art.categoryEn;
  };

  const getArticleEra = (art: WikiArticle) => {
    if (language === "uz") return art.eraUz;
    if (language === "ru") return art.eraRu;
    return art.eraEn;
  };

  const getArticleSummary = (art: WikiArticle) => {
    if (language === "uz") return art.summaryUz;
    if (language === "ru") return art.summaryRu;
    return art.summaryEn;
  };

  const getArticleFullText = (art: WikiArticle) => {
    if (language === "uz") return art.fullTextUz;
    if (language === "ru") return art.fullTextRu;
    return art.fullTextEn;
  };

  const getArticleMechanics = (art: WikiArticle) => {
    if (language === "uz") return art.mechanicsUz;
    if (language === "ru") return art.mechanicsRu;
    return art.mechanicsEn;
  };

  const getArticleTrivia = (art: WikiArticle) => {
    if (language === "uz") return art.triviaUz;
    if (language === "ru") return art.triviaRu;
    return art.triviaEn;
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-hidden bg-[#080d1e]">
      {/* Background Ambience - Mesmerizing 3D Cosmic Background with Floating Crystal Cube */}
      <CosmicBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ── Navigation Header ── */}
        <header className="border-b border-white/[0.08] bg-[#0c142c]/75 backdrop-blur-2xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">{t("backToCrafting")}</span>
            </Link>

            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-cyan-400" />
              <h1 className="font-extrabold text-base sm:text-lg text-white tracking-wide">
                {language === "uz" ? "MINECRAFT VIKIPEDIYASI" : language === "ru" ? "MINECRAFT ВИКИПЕДИЯ" : "MINECRAFT WIKIPEDIA"}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {/* Server IP */}
              <ServerAddressBanner variant="compact" />

              {/* AI Assistant Button */}
              <button
                onClick={() => {
                  const trigger = document.querySelector('button[title*="AI"]') as HTMLButtonElement;
                  if (trigger) trigger.click();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/35 hover:to-purple-500/35 border border-cyan-400/50 text-cyan-200 text-xs font-bold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
                title={language === "uz" ? "Minecraft AI Yordamchisini ochish" : "Open Minecraft AI Assistant"}
              >
                <Wand2 size={13} className="text-cyan-300" />
                <span>{t("aiAssistantNav")}</span>
              </button>

              <button
                onClick={() => setIsProgressionOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 text-amber-200 text-xs font-extrabold transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-pointer"
                title={language === "uz" ? "Minecraftni yutish ketma-ketligi" : "Beat Minecraft Guide"}
              >
                <Trophy size={14} className="text-amber-400" />
                <span>{t("beatMinecraftNav")}</span>
              </button>
              <VersionSelector />
              <LanguageSwitcher />

              <a
                href="https://t.me/XAVIK_ORG"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle size={14} />
                <span>{language === "uz" ? "Telegramda Aloqa" : language === "ru" ? "Поддержка в Telegram" : "Contact Support"}</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </header>

        {/* ── Main Content ── */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
          {/* Hero Banner */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 relative overflow-hidden border border-white/15 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                <Sparkles size={13} className="text-yellow-400" />
                <span>
                  {language === "uz"
                    ? "RASMIY BILIMLAR BAZASI · AVTOMATIZATSIYA · TEXNIK TARIX"
                    : language === "ru"
                    ? "ОФИЦИАЛЬНАЯ БАЗА ЗНАНИЙ · АВТОМАТИЗАЦИЯ · ТЕХНИЧЕСКИЙ ЛОР"
                    : "OFFICIAL KNOWLEDGE BASE · AUTOMATION · TECHNICAL LORE"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {language === "uz"
                  ? "Minecraft Texnik Ensiklopediyasi"
                  : language === "ru"
                  ? "Игровая энциклопедия Майнкрафт"
                  : "Minecraft Technical Wikipedia"}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {language === "uz"
                  ? "Chuqur texnik maqolalar, yangilanishlar tahlili, redstoun arxitekturasi va afsonaviy o'yin xatolari (glitchlar). To'liq maqolani ochish uchun kartani bosing."
                  : language === "ru"
                  ? "Глубокие технические статьи, подробные механики обновлений 1.20 и 1.21, редстоун-архитектура и легендарные баги движка. Нажмите на любую карточку для открытия полноэкранной статьи."
                  : "In-depth technical articles, comprehensive update breakdowns for 1.20 and 1.21, redstone engineering, and legendary engine exploits. Click any card to open the Full-Screen Modal."}
              </p>
            </div>
          </div>

          {/* Dynamic Secret Minecraft Facts Generator */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-cyan-400/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <Lightbulb size={22} className="text-yellow-400 animate-pulse" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles size={12} className="text-yellow-400" />
                  <span>
                    {language === "uz"
                      ? "Minecraft Maxfiy Fakti"
                      : language === "ru"
                      ? "Секретный факт Майнкрафт"
                      : "Secret Minecraft Lore & Fact"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-relaxed">
                  {language === "uz"
                    ? SECRET_FACTS[factIndex].uz
                    : language === "ru"
                    ? SECRET_FACTS[factIndex].ru
                    : SECRET_FACTS[factIndex].en}
                </p>
              </div>
            </div>
            <button
              onClick={() => setFactIndex((prev) => (prev + 1) % SECRET_FACTS.length)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer shadow-md"
            >
              <Sparkles size={13} className="text-yellow-400" />
              <span>
                {language === "uz"
                  ? "Keyingi fakt 🎲"
                  : language === "ru"
                  ? "Следующий факт 🎲"
                  : "Next Fact 🎲"}
              </span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-cyan-500/25 text-cyan-300 border border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.3)] font-bold"
                    : "text-slate-400 hover:text-white bg-slate-900/40 hover:bg-slate-800/60 border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── ARTICLES GRID ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <article
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group relative rounded-2xl glass-panel p-5 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(0,0,0,0.8)]"
              >
                <div className="space-y-3.5">
                  {/* Top Bar: Era Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold uppercase tracking-wider ${art.badgeColor}`}>
                      {getArticleCategory(art)}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock size={12} />
                      <span>{language === "uz" ? "5 daqiqa o'qish" : language === "ru" ? "5 мин чтения" : "5 min read"}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-lg text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {getArticleTitle(art)}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {getArticleSummary(art)}
                  </p>
                </div>

                {/* Footer of Card */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">
                    {getArticleEra(art)}
                  </span>
                  <span className="font-bold text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>
                      {language === "uz" ? "Maqolani o'qish" : language === "ru" ? "Читать статью" : "Read Article"}
                    </span>
                    <span>➜</span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* ── FULL-SCREEN MODAL OVERLAY (WIKIPEDIA DEEP INSPECTION) ── */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
              {/* Blurred Dark Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArticle(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md"
              />

              {/* Full-Screen Modal Window Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl glass-panel border border-white/20 shadow-2xl z-10 overflow-hidden font-sans text-white bg-slate-950/95"
                style={{
                  boxShadow: `0 24px 70px -12px rgba(0, 0, 0, 0.95), 0 0 45px ${selectedArticle.accentColor}30`,
                }}
              >
                {/* ── Modal Header Banner with Image ── */}
                <div className="relative h-48 sm:h-64 w-full overflow-hidden border-b border-white/10 bg-slate-900 flex-shrink-0">
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.titleEn}
                    className="w-full h-full object-cover filter brightness-75 contrast-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

                  {/* Close Button on top right */}
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 p-2 rounded-xl bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer z-20 shadow-lg"
                  >
                    <X size={20} />
                  </button>

                  {/* Title & Category over banner */}
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className={`text-xs px-3 py-1 rounded-full border font-bold uppercase tracking-wider inline-block mb-2 ${selectedArticle.badgeColor}`}>
                      {getArticleCategory(selectedArticle)} · {getArticleEra(selectedArticle)}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow-md">
                      {getArticleTitle(selectedArticle)}
                    </h2>
                  </div>
                </div>

                {/* ── Modal Scrollable Body ── */}
                <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-200">
                  {/* Detailed In-Depth Articles */}
                  <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-300">
                    {getArticleFullText(selectedArticle).map((para, i) => (
                      <p key={i} className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Embedded YouTube Showcase / Documentary */}
                  {selectedArticle.youtubeVideoId && (
                    <div className="space-y-2">
                      <h4 className="text-xs sm:text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                        <Sparkles size={15} className="text-yellow-400" />
                        <span>
                          {language === "uz"
                            ? "Video tahlil va hujjatli namoyish:"
                            : language === "ru"
                            ? "Видеообзор механики & документалка:"
                            : "Video Showcase & Gameplay:"}
                        </span>
                      </h4>
                      <div className="rounded-2xl overflow-hidden border border-white/15 bg-black aspect-video shadow-2xl">
                        <iframe
                          className="w-full h-full"
                          src={`https://www.youtube-nocookie.com/embed/${selectedArticle.youtubeVideoId}`}
                          title={selectedArticle.titleEn}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Technical Mechanics Breakdown */}
                  <div className="p-5 rounded-2xl glass-panel-subtle border border-cyan-400/30 space-y-3 bg-cyan-950/20">
                    <h4 className="text-xs sm:text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <Zap size={16} className="text-yellow-400" />
                      <span>
                        {language === "uz"
                          ? "Asosiy texnik mexanikalar:"
                          : language === "ru"
                          ? "Ключевые технические механики:"
                          : "Key Technical Mechanics:"}
                      </span>
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                      {getArticleMechanics(selectedArticle).map((mech, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">✔</span>
                          <span>{mech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trivia / Did you know? */}
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 flex items-start gap-3">
                    <Lightbulb size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-yellow-300 block mb-0.5 font-semibold">
                        {language === "uz"
                          ? "Qiziqarli fakt (Bilasizmi?):"
                          : language === "ru"
                          ? "Интересный факт (Did You Know?):"
                          : "Did You Know?"}
                      </strong>
                      <span>{getArticleTrivia(selectedArticle)}</span>
                    </div>
                  </div>

                  {/* Community Discussion / Architect Notes */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <MessageSquare size={14} className="text-cyan-400" />
                      <span>
                        {language === "uz"
                          ? "Hamjamiyat muhandislari fikrlari:"
                          : language === "ru"
                          ? "Заметки инженеров сообщества:"
                          : "Community Architect Notes:"}
                      </span>
                    </h4>

                    <div className="space-y-2.5">
                      {selectedArticle.comments.map((c, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-900/70 border border-white/5 flex items-start justify-between gap-3 text-xs">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-white">{c.user}</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-semibold">{c.role}</span>
                            </div>
                            <p className="text-slate-300">
                              {language === "uz" ? c.textUz : language === "ru" ? c.textRu : c.textEn}
                            </p>
                          </div>
                          <span className="text-[10px] text-slate-500 whitespace-nowrap">{c.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Modal Footer ── */}
                <div className="p-4 border-t border-white/10 glass-panel flex items-center justify-between flex-shrink-0">
                  <span className="text-xs text-slate-400">
                    Minecraft Wikipedia Archive · Topic ID: {selectedArticle.id}
                  </span>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-lg active:scale-95"
                  >
                    {language === "uz"
                      ? "Maqolani yopish [ESC]"
                      : language === "ru"
                      ? "Закрыть статью [ESC]"
                      : "Close Article [ESC]"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── Page Footer with Telegram Support ── */}
        <footer className="border-t border-white/10 glass-panel py-6 text-center text-xs text-slate-400 font-sans">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              {t("footerRights")}
            </div>
            <a
              href="https://t.me/XAVIK_ORG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-medium underline"
            >
              <MessageCircle size={14} />
              <span>
                {language === "uz"
                  ? "Telegramda aloqa (@XAVIK_ORG)"
                  : language === "ru"
                  ? "Поддержка в Telegram (@XAVIK_ORG)"
                  : "Contact Support on Telegram (@XAVIK_ORG)"}
              </span>
            </a>
          </div>
        </footer>

        {/* ── Minecraft Progression Walkthrough Modal ── */}
        <ProgressionGuide
          isOpen={isProgressionOpen}
          onClose={() => setIsProgressionOpen(false)}
        />
      </div>
    </div>
  );
}
