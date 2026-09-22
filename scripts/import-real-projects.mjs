/**
 * Imports Uranium's real delivered projects (sourced from the owner's Obsidian
 * Knowledge Base) into Sanity, with real screenshots.
 *
 * Run: node scripts/import-real-projects.mjs <screenshot-dir>
 * Auth: uses the Sanity CLI login token from ~/.config/sanity/config.json (never printed).
 * Idempotent: fixed document ids, createOrReplace.
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join, basename } from "node:path";

const shots = process.argv[2];
const SCALP = "C:/Users/dmitr/OneDrive/Документы/ScalpScreener";
if (!shots) {
  console.error("Usage: node scripts/import-real-projects.mjs <screenshot-dir>");
  process.exit(1);
}

const token = JSON.parse(readFileSync(join(homedir(), ".config/sanity/config.json"), "utf8")).authToken;
const client = createClient({ projectId: "3avhk8pg", dataset: "production", apiVersion: "2024-01-01", token, useCdn: false });

const ls = (ro, en, ru) => ({ _type: "localeString", ro, en, ru });
const lt = (ro, en, ru) => ({ _type: "localeText", ro, en, ru });

const PROJECTS = [
  {
    id: "real-watt-security",
    slug: "watt-security-website",
    order: -5,
    category: "web",
    year: 2026,
    color: "#111111",
    title: ls("Watt Security — Site de prezentare", "Watt Security — Company Website", "Watt Security — Сайт компании"),
    categoryLabel: ls("Dezvoltare Web", "Web Development", "Веб-разработка"),
    client: ls("Watt Security", "Watt Security", "Watt Security"),
    description: lt(
      "Site pentru o firmă de securitate din Moldova care instalează camere de supraveghere, sisteme de alarmă, control acces și interfoane. Am construit o pagină rapidă în React, în trei limbi (română, rusă, engleză), cu temă luminoasă și întunecată și un panou de administrare prin care echipa își editează singură textele, fotografiile și contactele.",
      "A website for a Moldovan security company that installs CCTV, alarm systems, access control and intercoms. We built a fast React site in three languages (Romanian, Russian, English), with light and dark themes and an admin panel where the team edits its own copy, photos and contacts.",
      "Сайт для охранной компании из Молдовы, которая устанавливает видеонаблюдение, сигнализации, контроль доступа и домофоны. Мы сделали быстрый сайт на React на трёх языках (румынский, русский, английский), со светлой и тёмной темой и панелью администратора, где команда сама меняет тексты, фото и контакты."
    ),
    results: lt(
      "Site live pe domeniul watt-security.md, publicat automat la fiecare modificare. Conținutul se editează din panoul de administrare, fără programator. SEO local configurat: date structurate, sitemap, Google Search Console și profil Google Business. Fonturile sunt găzduite local, pentru încărcare rapidă în Moldova.",
      "Live on watt-security.md and published automatically on every change. Content is edited from the admin panel, no developer needed. Local SEO in place: structured data, sitemap, Google Search Console and a Google Business profile. Fonts are self-hosted for fast loading in Moldova.",
      "Сайт работает на домене watt-security.md и публикуется автоматически при каждом изменении. Контент редактируется из панели администратора без программиста. Настроено локальное SEO: структурированные данные, sitemap, Google Search Console и профиль Google Business. Шрифты размещены локально для быстрой загрузки в Молдове."
    ),
    main: "watt-0.png",
    gallery: ["watt-2.png", "watt-1.png", "watt-m.png", "watt-3.png"],
  },
  {
    id: "real-watt-shop",
    slug: "watt-security-online-store",
    order: -4,
    category: "design",
    year: 2026,
    color: "#f4f5f7",
    title: ls("Watt Security Shop — Machetă magazin online", "Watt Security Shop — Online Store Prototype", "Watt Security Shop — Прототип интернет-магазина"),
    categoryLabel: ls("UI/UX Design", "UI/UX Design", "UI/UX-дизайн"),
    client: ls("Watt Security", "Watt Security", "Watt Security"),
    description: lt(
      "Machetă interactivă pentru magazinul online Watt Security, prezentată clientului înainte de dezvoltare. Șase ecrane funcționale: pagina principală cu meniu de categorii, catalog cu filtre tehnice (rezoluție, tip carcasă, PoE, stoc), pagina de produs cu specificații și documentație, coș cu plata la livrare, contul clientului cu urmărirea comenzii și panoul de administrare pentru comenzi, stoc și furnizori.",
      "An interactive prototype of the Watt Security online store, presented to the client before development. Six working screens: a home page with a category menu, a catalogue with technical filters (resolution, housing, PoE, stock), a product page with specs and documentation, a cart with cash on delivery, a customer account with order tracking, and an admin panel for orders, stock and suppliers.",
      "Интерактивный прототип интернет-магазина Watt Security, показанный клиенту до разработки. Шесть рабочих экранов: главная с меню категорий, каталог с техническими фильтрами (разрешение, тип корпуса, PoE, наличие), страница товара с характеристиками и документацией, корзина с оплатой при доставке, личный кабинет с отслеживанием заказа и панель администратора для заказов, склада и поставщиков."
    ),
    results: lt(
      "Clientul a parcurs tot fluxul de cumpărare înainte de prima linie de cod și a ales culoarea de accent și tema direct în întâlnire, cu comutatoare live. Interfața e tradusă integral în română și rusă.",
      "The client walked through the full purchase flow before a line of production code, and picked the accent colour and theme live in the meeting with on-screen switches. The interface is fully translated into Romanian and Russian.",
      "Клиент прошёл весь путь покупки до начала разработки и прямо на встрече выбрал цвет акцента и тему с помощью живых переключателей. Интерфейс полностью переведён на румынский и русский."
    ),
    main: "shop-home-0.png",
    gallery: ["shop-catalog-0.png", "shop-product-0.png", "shop-admin-0.png", "shop-home-1.png"],
  },
  {
    id: "real-scalpscreener",
    slug: "scalpscreener-trading-platform",
    order: -3,
    category: "apps",
    year: 2026,
    color: "#12141c",
    title: ls("ScalpScreener — Platformă pentru traderi", "ScalpScreener — Trading Platform", "ScalpScreener — Платформа для трейдеров"),
    categoryLabel: ls("Aplicație Web", "Web App", "Веб-приложение"),
    client: ls("ScalpScreener", "ScalpScreener", "ScalpScreener"),
    description: lt(
      "Platformă web pentru scalperii de criptomonede: screener pe mai multe burse, zeci de grafice live în același timp, radar de volume, hartă a densităților din carnetul de ordine și căutare automată a formațiunilor, plus un simulator pe date istorice și o comunitate, toate sub un singur cont.",
      "A web platform for crypto scalpers: a multi-exchange screener, dozens of live charts at once, a volume radar, an order-book density map and automatic pattern search, plus a simulator on historical data and a community, all under one account.",
      "Веб-платформа для криптоскальперов: скринер по нескольким биржам, десятки живых графиков одновременно, радар объёмов, карта плотностей стакана и автопоиск формаций, а также тренажёр на истории и сообщество под одним аккаунтом."
    ),
    results: lt(
      "Backend în Python (FastAPI și WebSocket) care scanează perechile de pe Binance, Bybit și OKX pe intervale de la 1 minut la 1 oră, cu filtre de volum și volatilitate și indicatori RSI, ATR, fractali și niveluri de suport și rezistență. Rulează în Docker, cu deploy pe Fly.io și Oracle Cloud.",
      "A Python backend (FastAPI and WebSocket) that scans pairs on Binance, Bybit and OKX from 1-minute to 1-hour timeframes, with volume and volatility filters and RSI, ATR, fractal and support/resistance indicators. Runs in Docker, deployed to Fly.io and Oracle Cloud.",
      "Бэкенд на Python (FastAPI и WebSocket) сканирует пары на Binance, Bybit и OKX на таймфреймах от 1 минуты до 1 часа, с фильтрами объёма и волатильности и индикаторами RSI, ATR, фракталами и уровнями поддержки и сопротивления. Работает в Docker, развёрнут на Fly.io и Oracle Cloud."
    ),
    main: `${SCALP}/now-grid.png`,
    gallery: [`${SCALP}/docs/compare/cmp-v2-radar.png`, `${SCALP}/dash-icoane.png`, `${SCALP}/desktop-desene.png`, `${SCALP}/live-icoane.png`],
  },
  {
    id: "real-nano-scalp",
    slug: "nano-scalp-landing",
    order: -2,
    category: "web",
    year: 2026,
    color: "#0e1024",
    title: ls("Nano Scalp — Landing page", "Nano Scalp — Landing Page", "Nano Scalp — Лендинг"),
    categoryLabel: ls("Landing page", "Landing Page", "Лендинг"),
    client: ls("Nano Scalp", "Nano Scalp", "Nano Scalp"),
    description: lt(
      "Pagina de prezentare a screener-ului de scalping crypto Nano Scalp: un hero cu bandă live de prețuri, secțiuni despre semnale în timp real, filtre personalizabile, grafice și ghiduri de trading, plus un flux în trei pași de la conectare la primele semnale.",
      "The marketing site for the Nano Scalp crypto scalping screener: a hero with a live price ticker, sections on real-time signals, custom filters, charts and trading guides, and a three-step flow from connecting to the first signals.",
      "Продающий сайт криптоскринера Nano Scalp: первый экран с живой лентой цен, блоки о сигналах в реальном времени, настраиваемых фильтрах, графиках и торговых гайдах, и путь из трёх шагов от подключения до первых сигналов."
    ),
    results: lt(
      "Landing static și rapid, în temă întunecată cu accente verzi care continuă interfața produsului, cu formular de înscriere direct în primul ecran.",
      "A fast static landing page in a dark theme with green accents that continue the product's interface, with sign-up right in the first screen.",
      "Быстрый статический лендинг в тёмной теме с зелёными акцентами, продолжающими интерфейс продукта, с формой регистрации прямо на первом экране."
    ),
    main: "nano-0.png",
    gallery: ["nano-1.png", "nano-m.png", "nano-2.png"],
  },
  {
    id: "real-proboi-scanner",
    slug: "proboi-breakout-scanner",
    order: -1,
    category: "apps",
    year: 2026,
    color: "#10131a",
    title: ls("Proboi Scanner — Scanner de breakout", "Proboi Scanner — Breakout Scanner", "Proboi Scanner — Сканер пробоев"),
    categoryLabel: ls("Instrument de trading", "Trading Tool", "Торговый инструмент"),
    client: ls("Proiect intern", "In-house project", "Внутренний проект"),
    description: lt(
      "Scanner de breakout pentru scalping pe Bybit Futures, într-un singur fișier HTML, fără server și fără chei API, doar cu date publice. Calculează un scor de la 0 la 100 din apropierea de nivel, comprimarea volatilității, acumularea de volum, testările nivelului și alinierea cu trendul.",
      "A breakout scanner for scalping Bybit Futures, in a single HTML file with no server and no API keys, using public data only. It scores each pair from 0 to 100 on distance to level, volatility compression, volume build-up, level tests and trend alignment.",
      "Сканер пробоев для скальпинга на Bybit Futures в одном HTML-файле, без сервера и API-ключей, только на публичных данных. Считает оценку от 0 до 100 по близости к уровню, сжатию волатильности, накоплению объёма, тестам уровня и согласованности с трендом."
    ),
    results: lt(
      "Pragurile au fost calibrate prin replay pe date reale (50 de perechi, câte 1000 de lumânări de 5 minute), nu alese din intuiție: la pragul ales, 79% din alerte ajung la breakout, iar 73% se mențin după 3 lumânări.",
      "Thresholds were calibrated by replaying real data (50 pairs, 1,000 five-minute candles each) rather than chosen by intuition: at the chosen threshold, 79% of alerts reach a breakout and 73% hold after 3 candles.",
      "Пороги откалиброваны реплеем на реальных данных (50 пар по 1000 пятиминутных свечей), а не выбраны интуитивно: при выбранном пороге 79% сигналов доходят до пробоя, а 73% удерживаются через 3 свечи."
    ),
    main: "proboi-0.png",
    gallery: ["proboi-m.png"],
  },
];

async function upload(file) {
  const path = file.includes("/") ? file : join(shots, file);
  if (!existsSync(path)) {
    console.warn("  missing image, skipped:", path);
    return null;
  }
  const asset = await client.assets.upload("image", readFileSync(path), { filename: basename(path) });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

for (const p of PROJECTS) {
  console.log("→", p.slug);
  const mainImage = await upload(p.main);
  const gallery = [];
  for (const [i, g] of p.gallery.entries()) {
    const img = await upload(g);
    if (img) gallery.push({ ...img, _key: `g${i}` });
  }
  await client.createOrReplace({
    _id: p.id,
    _type: "portfolioItem",
    title: p.title,
    slug: { _type: "slug", current: p.slug },
    category: p.category,
    categoryLabel: p.categoryLabel,
    client: p.client,
    year: p.year,
    color: p.color,
    order: p.order,
    description: p.description,
    results: p.results,
    ...(mainImage ? { mainImage } : {}),
    gallery,
  });
  console.log("  saved with", gallery.length, "gallery images");
}
console.log("done");
