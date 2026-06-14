# Uranium — Foundation + Home Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully functional, responsive, multilingual (RO/EN/RU) home page for the Uranium digital agency website with dark/light mode, deployed on Cloudflare Pages.

**Architecture:** Next.js 15 App Router with `[locale]` dynamic segment for i18n via next-intl. Design tokens live in CSS variables switched per theme. All sections are isolated React components fetching no remote data in this phase (static content from translation files).

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · next-intl · next-themes · Inter font · Cloudflare Pages

**Design reference:** https://www.figma.com/design/vLsct7tE5q4xGH8EzermeN/Uranium.io
**Spec:** `docs/superpowers/specs/2026-06-15-uranium-website-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/app/layout.tsx` | Root layout, font, theme provider |
| `src/app/[locale]/layout.tsx` | Locale layout, next-intl provider |
| `src/app/[locale]/page.tsx` | Home page — assembles all sections |
| `src/middleware.ts` | i18n locale detection & redirect |
| `src/i18n/routing.ts` | next-intl routing config |
| `src/i18n/request.ts` | next-intl server request config |
| `src/messages/ro.json` | Romanian translations |
| `src/messages/en.json` | English translations |
| `src/messages/ru.json` | Russian translations |
| `src/styles/tokens.css` | CSS custom properties (colors, spacing) |
| `src/app/globals.css` | Tailwind base + token imports |
| `src/components/layout/Navbar.tsx` | Sticky nav with lang switcher + theme toggle |
| `src/components/layout/Footer.tsx` | Footer with links + newsletter form |
| `src/components/ui/Button.tsx` | Reusable button (primary/secondary/ghost) |
| `src/components/ui/Badge.tsx` | Tag/pill badge |
| `src/components/ui/StatCounter.tsx` | Animated number counter |
| `src/components/ui/LanguageSwitcher.tsx` | RO/EN/RU dropdown |
| `src/components/ui/ThemeToggle.tsx` | Dark/light toggle button |
| `src/components/sections/HeroSection.tsx` | Full-screen hero with CTA |
| `src/components/sections/IntroSection.tsx` | Heading + 3 feature cards |
| `src/components/sections/ServicesSection.tsx` | 5 expandable service rows |
| `src/components/sections/PortfolioSection.tsx` | 2×2 project grid |
| `src/components/sections/StatsSection.tsx` | 4 animated stat counters |
| `src/components/sections/AboutSection.tsx` | Team photo + mission + mini-stats |
| `src/components/sections/TestimonialsSection.tsx` | Testimonial slider |
| `src/components/sections/CTASection.tsx` | Call to action |
| `tailwind.config.ts` | Tailwind config with CSS var tokens |
| `next.config.ts` | Next.js config with next-intl plugin |
| `middleware.ts` | next-intl middleware |
| `wrangler.toml` | Cloudflare Pages config |

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`

- [ ] **Step 1: Create Next.js project**

```bash
cd "c:\Users\dmitr\OneDrive\Документы\Uranium"
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

When prompted:
- TypeScript: Yes
- ESLint: Yes
- Tailwind: Yes
- `src/` dir: Yes
- App Router: Yes
- Import alias: `@/*`

- [ ] **Step 2: Install dependencies**

```bash
npm install next-intl next-themes
npm install --save-dev @types/node
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: `http://localhost:3000` shows Next.js default page.

- [ ] **Step 4: Remove boilerplate**

Delete or empty:
- `src/app/page.tsx` → replace with `export default function Home() { return null; }`
- `src/app/globals.css` → keep only `@tailwind` directives

- [ ] **Step 5: Initialize git**

```bash
git init
git add .
git commit -m "feat: initialize Next.js 15 project for Uranium"
```

---

## Task 2: Design Tokens & Global Styles

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Create CSS tokens file**

Create `src/styles/tokens.css`:

```css
:root {
  /* Colors — Dark mode (default) */
  --color-bg: #000000;
  --color-bg-surface: #111827;
  --color-accent: #d4ff37;
  --color-text-primary: #ffffff;
  --color-text-muted: rgba(255, 255, 255, 0.6);
  --color-border: rgba(255, 255, 255, 0.1);
  --color-card-from: #1e3a8a;
  --color-card-to: #000000;

  /* Spacing */
  --spacing-section: 96px;
  --max-width: 1400px;
  --padding-x: 32px;
}

[data-theme="light"] {
  --color-bg: #ffffff;
  --color-bg-surface: #f8f8f8;
  --color-text-primary: #111827;
  --color-text-muted: #6b7280;
  --color-border: #f3f4f6;
  --color-card-from: #1e3a8a;
  --color-card-to: #2563eb;
}
```

- [ ] **Step 2: Update globals.css**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";
@import "../styles/tokens.css";

body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-inter), sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

* {
  box-sizing: border-box;
}

.section-container {
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--padding-x);
}
```

- [ ] **Step 3: Update tailwind.config.ts**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        accent: "#d4ff37",
        surface: "var(--color-bg-surface)",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1400px",
      },
    },
  },
};

export default config;
```

- [ ] **Step 4: Commit**

```bash
git add src/styles/tokens.css src/app/globals.css tailwind.config.ts
git commit -m "feat: add design tokens and global styles"
```

---

## Task 3: i18n Setup (next-intl)

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/middleware.ts`
- Create: `src/messages/ro.json`
- Create: `src/messages/en.json`
- Create: `src/messages/ru.json`
- Modify: `next.config.ts`

- [ ] **Step 1: Create routing config**

Create `src/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ro", "en", "ru"],
  defaultLocale: "ro",
  pathnames: {
    "/": "/",
    "/servicii": {
      ro: "/servicii",
      en: "/services",
      ru: "/uslugi",
    },
    "/portofoliu": {
      ro: "/portofoliu",
      en: "/portfolio",
      ru: "/portfolio",
    },
    "/despre": {
      ro: "/despre",
      en: "/about",
      ru: "/o-nas",
    },
    "/blog": "/blog",
    "/contact": "/contact",
    "/preturi": {
      ro: "/preturi",
      en: "/pricing",
      ru: "/tseny",
    },
  },
});
```

- [ ] **Step 2: Create request config**

Create `src/i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "ro" | "en" | "ru")) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create middleware**

Create `src/middleware.ts`:

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
```

- [ ] **Step 4: Create translation files**

Create `src/messages/ro.json`:

```json
{
  "nav": {
    "services": "Servicii",
    "portfolio": "Portofoliu",
    "about": "Despre",
    "blog": "Blog",
    "pricing": "Prețuri",
    "contact": "Contact",
    "cta": "Începe un proiect"
  },
  "hero": {
    "tagline": "EXTRAORDINARY",
    "subtitle": "Creăm experiențe digitale care transformă afaceri.",
    "cta": "Descoperă serviciile",
    "scroll": "Scroll"
  },
  "intro": {
    "heading1": "REDESCHIDEM CE EXISTĂ, SUNTEM",
    "heading2": "AICI SĂ TE AJUTĂM SĂ IEȘI ÎN EVIDENȚĂ—",
    "heading3": "CU CLARITATE, CREATIVITATE ȘI",
    "heading4": "PASIUNE INCOMPARABILĂ.",
    "card1Title": "AWARD WINNING",
    "card1Desc": "Recunoscuți global pentru excelență în design și inovație.",
    "card2Title": "FAST DELIVERY",
    "card2Desc": "Fluxuri eficiente și echipe dedicate pentru livrare rapidă.",
    "card3Title": "GROWTH FOCUSED",
    "card3Desc": "Design strategic care generează rezultate măsurabile."
  },
  "services": {
    "label": "Ce facem cel mai bine",
    "heading": "SERVICIILE NOASTRE",
    "web": "Dezvoltare Web",
    "webDesc": "Site-uri de prezentare, landing page-uri și e-commerce de înaltă performanță.",
    "apps": "Aplicații",
    "appsDesc": "Web apps, aplicații mobile și software custom adaptat nevoilor tale.",
    "marketing": "Marketing Digital",
    "marketingDesc": "SEO, social media, Google/Meta Ads și strategii de creștere.",
    "business": "Soluții Business",
    "businessDesc": "Consultanță, automatizări, CRM și soluții ERP personalizate.",
    "design": "Design & Branding",
    "designDesc": "Identitate vizuală, UI/UX design și branding complet."
  },
  "portfolio": {
    "label": "Lucrări selectate",
    "heading": "PORTOFOLIU",
    "seeAll": "Vezi toate proiectele"
  },
  "stats": {
    "experience": "ANI EXPERIENȚĂ",
    "projects": "PROIECTE LIVRATE",
    "clients": "CLIENȚI GLOBALI",
    "satisfaction": "SATISFACȚIE CLIENȚI",
    "years": "ANI",
    "projectsLabel": "PROIECTE",
    "clientsLabel": "CLIENȚI",
    "satisfactionLabel": "SATISFACȚIE"
  },
  "about": {
    "label": "Despre noi",
    "heading": "ECHIPA DIN SPATELE MUNCII",
    "mission": "MISIUNEA NOASTRĂ",
    "missionText": "Misiunea noastră este să împuternicim branduri prin design excepțional care nu doar generează rezultate de business, ci și construiește conexiuni durabile cu audiența lor.",
    "delivery": "LIVRARE LA TIMP",
    "support": "SUPORT",
    "countries": "ȚĂRI",
    "supportLabel": "24/7",
    "countriesLabel": "15"
  },
  "testimonials": {
    "label": "Testimoniale",
    "heading": "POVEȘTILE CLIENȚILOR"
  },
  "cta": {
    "label": "Hai să colaborăm",
    "heading": "READY TO CREATE SOMETHING EXTRAORDINARY",
    "button": "Contactează-ne"
  },
  "footer": {
    "services": "SERVICII",
    "company": "COMPANIE",
    "newsletter": "NEWSLETTER",
    "newsletterDesc": "Primește noutăți și resurse utile lunar.",
    "emailPlaceholder": "Email-ul tău",
    "copyright": "© 2026 Uranium. Toate drepturile rezervate.",
    "privacy": "Politica de confidențialitate",
    "terms": "Termeni și condiții",
    "aboutUs": "Despre noi",
    "ourWork": "Proiectele noastre",
    "careers": "Cariere",
    "blogLink": "Blog",
    "contactLink": "Contact"
  }
}
```

Create `src/messages/en.json`:

```json
{
  "nav": {
    "services": "Services",
    "portfolio": "Portfolio",
    "about": "About",
    "blog": "Blog",
    "pricing": "Pricing",
    "contact": "Contact",
    "cta": "Start a project"
  },
  "hero": {
    "tagline": "EXTRAORDINARY",
    "subtitle": "We create digital experiences that transform businesses.",
    "cta": "Discover our services",
    "scroll": "Scroll"
  },
  "intro": {
    "heading1": "RESHAPING WHAT EXISTS, WE'RE",
    "heading2": "HERE TO HELP YOU STAND OUT—",
    "heading3": "WITH CLARITY, CREATIVITY, AND",
    "heading4": "UNMATCHED PASSION.",
    "card1Title": "AWARD WINNING",
    "card1Desc": "Recognized globally for design excellence and innovation.",
    "card2Title": "FAST DELIVERY",
    "card2Desc": "Efficient workflows and dedicated teams for timely delivery.",
    "card3Title": "GROWTH FOCUSED",
    "card3Desc": "Strategic design that drives measurable results."
  },
  "services": {
    "label": "What we do best",
    "heading": "OUR SERVICES",
    "web": "Web Development",
    "webDesc": "High-performance websites, landing pages and e-commerce solutions.",
    "apps": "Applications",
    "appsDesc": "Web apps, mobile applications and custom software.",
    "marketing": "Digital Marketing",
    "marketingDesc": "SEO, social media, Google/Meta Ads and growth strategies.",
    "business": "Business Solutions",
    "businessDesc": "Consulting, automation, CRM and custom ERP solutions.",
    "design": "Design & Branding",
    "designDesc": "Visual identity, UI/UX design and complete branding."
  },
  "portfolio": {
    "label": "Selected work",
    "heading": "PORTFOLIO",
    "seeAll": "See all projects"
  },
  "stats": {
    "experience": "INDUSTRY EXPERIENCE",
    "projects": "SUCCESSFULLY DELIVERED",
    "clients": "GLOBAL PARTNERSHIPS",
    "satisfaction": "CLIENT RETENTION RATE",
    "years": "YEARS",
    "projectsLabel": "PROJECTS",
    "clientsLabel": "CLIENTS",
    "satisfactionLabel": "SATISFACTION"
  },
  "about": {
    "label": "About us",
    "heading": "MAN BEHIND WORK",
    "mission": "OUR MISSION",
    "missionText": "Our mission is to empower brands through outstanding design that not only drives significant business results but also fosters enduring connections with their audiences.",
    "delivery": "ON-TIME DELIVERY RATE",
    "support": "SUPPORT",
    "countries": "COUNTRIES",
    "supportLabel": "24/7",
    "countriesLabel": "15"
  },
  "testimonials": {
    "label": "Testimonials",
    "heading": "CLIENT STORIES"
  },
  "cta": {
    "label": "Let's work together",
    "heading": "READY TO CREATE SOMETHING EXTRAORDINARY",
    "button": "Contact us"
  },
  "footer": {
    "services": "SERVICES",
    "company": "COMPANY",
    "newsletter": "NEWSLETTER",
    "newsletterDesc": "Get design insights and industry news delivered monthly.",
    "emailPlaceholder": "Your email",
    "copyright": "© 2026 Uranium. All rights reserved.",
    "privacy": "Privacy Policy",
    "terms": "Terms & Conditions",
    "aboutUs": "About Us",
    "ourWork": "Our Work",
    "careers": "Careers",
    "blogLink": "Blog",
    "contactLink": "Contact"
  }
}
```

Create `src/messages/ru.json`:

```json
{
  "nav": {
    "services": "Услуги",
    "portfolio": "Портфолио",
    "about": "О нас",
    "blog": "Блог",
    "pricing": "Цены",
    "contact": "Контакт",
    "cta": "Начать проект"
  },
  "hero": {
    "tagline": "EXTRAORDINARY",
    "subtitle": "Мы создаём цифровые опыты, которые трансформируют бизнес.",
    "cta": "Узнать об услугах",
    "scroll": "Прокрутить"
  },
  "intro": {
    "heading1": "МЫ МЕНЯЕМ СУЩЕСТВУЮЩЕЕ,",
    "heading2": "ПОМОГАЕМ ВАМ ВЫДЕЛИТЬСЯ—",
    "heading3": "С ЯСНОСТЬЮ, ТВОРЧЕСТВОМ И",
    "heading4": "НЕПРЕВЗОЙДЁННОЙ СТРАСТЬЮ.",
    "card1Title": "AWARD WINNING",
    "card1Desc": "Признаны во всём мире за превосходство в дизайне.",
    "card2Title": "FAST DELIVERY",
    "card2Desc": "Эффективные процессы и преданные команды для своевременной доставки.",
    "card3Title": "GROWTH FOCUSED",
    "card3Desc": "Стратегический дизайн, приносящий измеримые результаты."
  },
  "services": {
    "label": "Что мы делаем лучше всего",
    "heading": "НАШИ УСЛУГИ",
    "web": "Веб-разработка",
    "webDesc": "Высокопроизводительные сайты, лендинги и e-commerce решения.",
    "apps": "Приложения",
    "appsDesc": "Веб-приложения, мобильные приложения и кастомное ПО.",
    "marketing": "Цифровой маркетинг",
    "marketingDesc": "SEO, социальные сети, Google/Meta Ads и стратегии роста.",
    "business": "Бизнес-решения",
    "businessDesc": "Консалтинг, автоматизация, CRM и ERP решения.",
    "design": "Дизайн и брендинг",
    "designDesc": "Визуальная идентичность, UI/UX дизайн и полный брендинг."
  },
  "portfolio": {
    "label": "Избранные работы",
    "heading": "ПОРТФОЛИО",
    "seeAll": "Смотреть все проекты"
  },
  "stats": {
    "experience": "ОПЫТ В ОТРАСЛИ",
    "projects": "УСПЕШНО СДАНО",
    "clients": "ГЛОБАЛЬНЫЕ ПАРТНЁРСТВА",
    "satisfaction": "УДЕРЖАНИЕ КЛИЕНТОВ",
    "years": "ЛЕТ",
    "projectsLabel": "ПРОЕКТОВ",
    "clientsLabel": "КЛИЕНТОВ",
    "satisfactionLabel": "УДОВЛЕТВОРЁННОСТЬ"
  },
  "about": {
    "label": "О нас",
    "heading": "КОМАНДА ЗА РАБОТОЙ",
    "mission": "НАША МИССИЯ",
    "missionText": "Наша миссия — усилить бренды через выдающийся дизайн, который не только даёт бизнес-результаты, но и создаёт прочные связи с аудиторией.",
    "delivery": "ДОСТАВКА ВОВРЕМЯ",
    "support": "ПОДДЕРЖКА",
    "countries": "СТРАНЫ",
    "supportLabel": "24/7",
    "countriesLabel": "15"
  },
  "testimonials": {
    "label": "Отзывы",
    "heading": "ИСТОРИИ КЛИЕНТОВ"
  },
  "cta": {
    "label": "Давайте работать вместе",
    "heading": "READY TO CREATE SOMETHING EXTRAORDINARY",
    "button": "Связаться с нами"
  },
  "footer": {
    "services": "УСЛУГИ",
    "company": "КОМПАНИЯ",
    "newsletter": "РАССЫЛКА",
    "newsletterDesc": "Получайте полезные материалы и новости ежемесячно.",
    "emailPlaceholder": "Ваш email",
    "copyright": "© 2026 Uranium. Все права защищены.",
    "privacy": "Политика конфиденциальности",
    "terms": "Условия использования",
    "aboutUs": "О нас",
    "ourWork": "Наши работы",
    "careers": "Карьера",
    "blogLink": "Блог",
    "contactLink": "Контакт"
  }
}
```

- [ ] **Step 5: Update next.config.ts**

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Cloudflare Pages uses Edge runtime
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 6: Create locale layout**

Create `src/app/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "ro" | "en" | "ru")) notFound();
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 7: Verify routing works**

```bash
npm run dev
```

Visit `http://localhost:3000` — should redirect to `http://localhost:3000/ro`.
Visit `http://localhost:3000/en` — should show page (empty for now).

- [ ] **Step 8: Commit**

```bash
git add src/i18n/ src/middleware.ts src/messages/ src/app/\[locale\]/ next.config.ts
git commit -m "feat: add next-intl i18n with RO/EN/RU support"
```

---

## Task 4: Root Layout + Font + Theme Provider

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Update root layout**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uranium — Digital Agency",
  description: "Web, Apps, Marketing, Business & Design solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="uranium-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify Inter font loads**

```bash
npm run dev
```

Open DevTools → Elements. `<body>` should have `style="--font-inter: ..."` injected by Next.js.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: add Inter font and ThemeProvider to root layout"
```

---

## Task 5: UI Components — Button, Badge, ThemeToggle, LanguageSwitcher

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/ThemeToggle.tsx`
- Create: `src/components/ui/LanguageSwitcher.tsx`

- [ ] **Step 1: Create Button**

Create `src/components/ui/Button.tsx`:

```tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-black font-bold hover:bg-[#c8f020] transition-colors",
  secondary:
    "bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-accent hover:text-accent transition-colors",
  ghost:
    "bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 rounded-[9999px] px-6 py-3 text-sm font-medium transition-all",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
```

- [ ] **Step 2: Create utils**

Create `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install deps:

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 3: Create Badge**

Create `src/components/ui/Badge.tsx`:

```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[9999px] border px-3 py-1 text-xs font-medium uppercase tracking-wider",
        variant === "default"
          ? "border-[var(--color-border)] text-[var(--color-text-muted)]"
          : "border-accent bg-accent/10 text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Create ThemeToggle**

Create `src/components/ui/ThemeToggle.tsx`:

```tsx
"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex size-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-accent hover:text-accent"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 5: Create LanguageSwitcher**

Create `src/components/ui/LanguageSwitcher.tsx`:

```tsx
"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const locales = [
  { code: "ro", label: "RO" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    // Replace current locale segment in path
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:border-accent hover:text-accent"
      >
        {locale.toUpperCase()}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-16 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-lg">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`block w-full px-3 py-2 text-left text-xs font-medium uppercase tracking-wider transition-colors hover:text-accent ${
                locale === l.code
                  ? "text-accent"
                  : "text-[var(--color-text-muted)]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/ src/lib/
git commit -m "feat: add Button, Badge, ThemeToggle, LanguageSwitcher UI components"
```

---

## Task 6: Navbar

**Files:**
- Create: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Create Navbar**

Create `src/components/layout/Navbar.tsx`:

```tsx
"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: `/${locale}/servicii`, label: t("services") },
    { href: `/${locale}/portofoliu`, label: t("portfolio") },
    { href: `/${locale}/despre`, label: t("about") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/preturi`, label: t("pricing") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="section-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-xl font-black uppercase tracking-tight text-[var(--color-text-primary)]"
        >
          URANIUM.
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button variant="primary" className="text-xs">
            {t("cta")}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex size-9 items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Button variant="primary" className="mt-4 w-full text-xs">
            {t("cta")}
          </Button>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Add Navbar to locale layout**

Update `src/app/[locale]/layout.tsx` — add Navbar inside the provider:

```tsx
import { Navbar } from "@/components/layout/Navbar";

// Inside return:
<NextIntlClientProvider messages={messages}>
  <Navbar />
  <main>{children}</main>
</NextIntlClientProvider>
```

- [ ] **Step 3: Verify Navbar renders**

```bash
npm run dev
```

Visit `http://localhost:3000/ro` — Navbar should appear with logo, links, lang switcher, theme toggle.
Scroll down → navbar should get blur/border. Resize to mobile → hamburger menu.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.tsx src/app/\[locale\]/layout.tsx
git commit -m "feat: add responsive sticky Navbar with i18n and theme toggle"
```

---

## Task 7: Hero Section

**Files:**
- Create: `src/components/sections/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection**

Create `src/components/sections/HeroSection.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black pb-20">
      {/* Background image placeholder — replaced with video in phase 2 */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/60 via-black/40 to-black"
        aria-hidden
      />

      {/* Decorative large text */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden"
        aria-hidden
      >
        <p className="text-[20vw] font-black uppercase leading-none tracking-tight text-white/5">
          {t("tagline")}
        </p>
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
            Uranium Digital Agency
          </p>
          <h1 className="mb-6 text-6xl font-black uppercase leading-none tracking-tight text-white md:text-8xl">
            {t("tagline")}
          </h1>
          <p className="mb-8 max-w-md text-lg text-[var(--color-text-muted)]">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" className="px-8 py-4 text-base">
              {t("cta")}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Button>
            <Button variant="secondary" className="px-8 py-4 text-base">
              {t("scroll")} ↓
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/HeroSection.tsx
git commit -m "feat: add Hero section with gradient bg placeholder"
```

---

## Task 8: Intro Section (Heading + 3 Feature Cards)

**Files:**
- Create: `src/components/sections/IntroSection.tsx`

- [ ] **Step 1: Create IntroSection**

Create `src/components/sections/IntroSection.tsx`:

```tsx
import { useTranslations } from "next-intl";

const icons = {
  award: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  bolt: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
};

export function IntroSection() {
  const t = useTranslations("intro");

  const cards = [
    { icon: icons.award, stat: "15+", statLabel: "AWARDS", title: t("card1Title"), desc: t("card1Desc") },
    { icon: icons.bolt, stat: "2-4", statLabel: "WEEKS", title: t("card2Title"), desc: t("card2Desc") },
    { icon: icons.chart, stat: "+64%", statLabel: "AVG GROWTH", title: t("card3Title"), desc: t("card3Desc") },
  ];

  return (
    <section className="bg-white py-24 dark:bg-[var(--color-bg)]">
      <div className="section-container">
        {/* Heading */}
        <div className="mb-20 max-w-4xl">
          <h2 className="text-5xl font-black uppercase leading-tight tracking-tight text-black dark:text-white md:text-6xl">
            <span>{t("heading1")} </span>
            <span>{t("heading2")}</span>
            <br />
            <span>{t("heading3")} </span>
            <span className="text-[#9ca3af]">{t("heading4")}</span>
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex min-h-[350px] flex-col justify-between rounded-3xl p-8"
              style={{
                background: "linear-gradient(135deg, #1e3a8a 0%, #000000 100%)",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/20 text-white">
                  {card.icon}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-white">{card.stat}</p>
                  <p className="text-xs text-white/60">{card.statLabel}</p>
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold uppercase text-white">{card.title}</h3>
                <p className="text-sm text-white/70">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/IntroSection.tsx
git commit -m "feat: add Intro section with heading and 3 feature cards"
```

---

## Task 9: Services Section

**Files:**
- Create: `src/components/sections/ServicesSection.tsx`

- [ ] **Step 1: Create ServicesSection**

Create `src/components/sections/ServicesSection.tsx`:

```tsx
"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Service = {
  key: string;
  tags: string[];
};

const services: Service[] = [
  { key: "web", tags: ["React", "Next.js", "E-Commerce", "Landing Pages"] },
  { key: "apps", tags: ["iOS", "Android", "Web App", "PWA"] },
  { key: "marketing", tags: ["SEO", "Google Ads", "Meta Ads", "Social Media"] },
  { key: "business", tags: ["CRM", "ERP", "Automation", "Consulting"] },
  { key: "design", tags: ["UI/UX", "Branding", "Identity", "Prototyping"] },
];

export function ServicesSection() {
  const t = useTranslations("services");
  const [active, setActive] = useState<string | null>("apps");

  return (
    <section className="py-24" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[var(--color-text-muted)]" />
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                {t("label")}
              </span>
            </div>
            <h2 className="text-5xl font-black uppercase leading-tight tracking-tight text-[var(--color-text-primary)] md:text-6xl">
              {t("heading")}
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[var(--color-text-muted)]">
            Soluții complete pentru fiecare etapă a creșterii tale digitale.
          </p>
        </div>

        {/* Service rows */}
        <div className="divide-y divide-[var(--color-border)]">
          {services.map((service) => {
            const isActive = active === service.key;
            return (
              <div
                key={service.key}
                className={`group cursor-pointer py-8 transition-colors ${
                  isActive ? "bg-accent/5" : "hover:bg-white/5"
                }`}
                onClick={() => setActive(isActive ? null : service.key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-6">
                      <h3
                        className={`text-3xl font-black uppercase tracking-tight transition-colors md:text-4xl ${
                          isActive
                            ? "text-accent"
                            : "text-[var(--color-text-primary)]"
                        }`}
                      >
                        {t(service.key)}
                      </h3>
                    </div>
                    {isActive && (
                      <p className="mt-3 max-w-xl text-sm text-[var(--color-text-muted)]">
                        {t(`${service.key}Desc`)}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                            isActive
                              ? "border-accent/40 bg-accent/10 text-accent"
                              : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isActive
                        ? "border-accent bg-accent text-black"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:border-accent group-hover:text-accent"
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/ServicesSection.tsx
git commit -m "feat: add expandable Services section with 5 service rows"
```

---

## Task 10: Portfolio Section

**Files:**
- Create: `src/components/sections/PortfolioSection.tsx`

- [ ] **Step 1: Create PortfolioSection**

Create `src/components/sections/PortfolioSection.tsx`:

```tsx
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const projects = [
  { id: 1, title: "Studio Rebrand", category: "Brand Identity · Design", color: "#1e3a8a" },
  { id: 2, title: "FinanceFlow Platform", category: "Product Design · Web App", color: "#2563eb" },
  { id: 3, title: "Luxury E-Commerce", category: "Web Development · E-Commerce", color: "#374151" },
  { id: 4, title: "Wellness Mobile App", category: "UI/UX · Mobile App", color: "#1f2937" },
];

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const locale = useLocale();

  return (
    <section className="py-24" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[var(--color-text-muted)]" />
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                {t("label")}
              </span>
            </div>
            <h2 className="text-5xl font-black uppercase leading-tight tracking-tight text-[var(--color-text-primary)] md:text-6xl">
              {t("heading")}
            </h2>
          </div>
          <Link
            href={`/${locale}/portofoliu`}
            className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-accent"
          >
            {t("seeAll")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-3xl ${i % 2 !== 0 ? "md:mt-12" : ""}`}
              style={{ backgroundColor: project.color }}
            >
              {/* Placeholder image area */}
              <div className="aspect-[4/3] w-full" />

              {/* Info */}
              <div className="flex items-end justify-between p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{project.category}</p>
                </div>
                <div className="flex size-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-accent group-hover:text-accent">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/PortfolioSection.tsx
git commit -m "feat: add Portfolio section with 2x2 project grid"
```

---

## Task 11: Stats Section

**Files:**
- Create: `src/components/ui/StatCounter.tsx`
- Create: `src/components/sections/StatsSection.tsx`

- [ ] **Step 1: Create StatCounter (animated)**

Create `src/components/ui/StatCounter.tsx`:

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}

export function StatCounter({ end, suffix = "", label, sublabel }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col items-start rounded-3xl border border-[var(--color-border)] p-10">
      <p className="mb-2 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
        {label}
      </p>
      <p className="text-7xl font-black text-[var(--color-text-primary)]">
        {count}{suffix}
      </p>
      {sublabel && (
        <p className="mt-2 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
          {sublabel}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create StatsSection**

Create `src/components/sections/StatsSection.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { StatCounter } from "@/components/ui/StatCounter";

export function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section className="py-24" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <StatCounter end={15} suffix="+" label={t("experience")} sublabel={t("years")} />
          <StatCounter end={250} suffix="+" label={t("projects")} sublabel={t("projectsLabel")} />
          <StatCounter end={60} suffix="+" label={t("clients")} sublabel={t("clientsLabel")} />
          <StatCounter end={99} suffix="%" label={t("satisfaction")} sublabel={t("satisfactionLabel")} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/StatCounter.tsx src/components/sections/StatsSection.tsx
git commit -m "feat: add animated Stats section with IntersectionObserver counter"
```

---

## Task 12: About Section

**Files:**
- Create: `src/components/sections/AboutSection.tsx`

- [ ] **Step 1: Create AboutSection**

Create `src/components/sections/AboutSection.tsx`:

```tsx
import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section className="py-24" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-[var(--color-text-muted)]" />
            <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
              {t("label")}
            </span>
          </div>
          <h2 className="text-5xl font-black uppercase leading-tight tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            {t("heading")}
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Team photo placeholder */}
          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="aspect-square w-full"
              style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #000 100%)" }}
            />
            <div className="absolute bottom-8 left-8">
              <p className="text-2xl font-bold text-white">Uranium Team</p>
              <p className="text-sm text-white/60">Founder & Creative Director</p>
            </div>
          </div>

          {/* Mission + stats */}
          <div className="flex flex-col gap-6">
            {/* Mission card */}
            <div
              className="flex-1 rounded-3xl p-10"
              style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" }}
            >
              <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-white/20 text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold uppercase text-white">{t("mission")}</h3>
              <p className="text-sm leading-relaxed text-white/80">{t("missionText")}</p>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[var(--color-border)] p-6 text-center">
                <p className="text-3xl font-black text-accent">100%</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                  {t("delivery")}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] p-6 text-center">
                <p className="text-3xl font-black text-[var(--color-text-primary)]">
                  {t("supportLabel")}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                  {t("support")}
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] p-6 text-center">
                <p className="text-3xl font-black text-[var(--color-text-primary)]">
                  {t("countriesLabel")}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                  {t("countries")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/AboutSection.tsx
git commit -m "feat: add About section with mission card and mini-stats"
```

---

## Task 13: Testimonials Section

**Files:**
- Create: `src/components/sections/TestimonialsSection.tsx`

- [ ] **Step 1: Create TestimonialsSection**

Create `src/components/sections/TestimonialsSection.tsx`:

```tsx
"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

const testimonials = [
  {
    id: 1,
    quote: "URANIUM CRAFTED OUR BRAND IDENTITY, RESONATING WITH OUR AUDIENCE. THEIR CREATIVITY AND PROFESSIONALISM ARE UNMATCHED.",
    author: "James Mitchell",
    role: "CEO, TechVentures",
    rating: 5,
  },
  {
    id: 2,
    quote: "THE TEAM DELIVERED BEYOND OUR EXPECTATIONS. THE WEB APP THEY BUILT INCREASED OUR CONVERSIONS BY 64% IN THE FIRST MONTH.",
    author: "Sofia Andersen",
    role: "CMO, FinanceFlow",
    rating: 5,
  },
  {
    id: 3,
    quote: "WORKING WITH URANIUM WAS A GAME-CHANGER. FAST, PROFESSIONAL, AND TRULY UNDERSTANDS WHAT GROWTH-FOCUSED DESIGN MEANS.",
    author: "Alex Thompson",
    role: "Founder, LuxBrands",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [current, setCurrent] = useState(0);
  const testimonial = testimonials[current];

  return (
    <section className="py-24" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-[var(--color-text-muted)]" />
            <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
              {t("label")}
            </span>
          </div>
          <h2 className="text-5xl font-black uppercase leading-tight tracking-tight text-[var(--color-text-primary)] md:text-6xl">
            {t("heading")}
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-[var(--color-border)] md:grid-cols-2">
          {/* Text side */}
          <div className="flex flex-col justify-between p-10 md:p-16">
            {/* Stars */}
            <div className="mb-8 flex gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#d4ff37" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-10 text-xl font-bold uppercase leading-tight text-[var(--color-text-primary)] md:text-2xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            {/* Author + navigation */}
            <div className="flex items-end justify-between">
              <div>
                <p className="font-bold text-[var(--color-text-primary)]">{testimonial.author}</p>
                <p className="text-sm text-[var(--color-text-muted)]">{testimonial.role}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)}
                  className="flex size-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-accent hover:text-accent"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrent((c) => (c + 1) % testimonials.length)}
                  className="flex size-10 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-accent hover:text-accent"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Image side placeholder */}
          <div
            className="min-h-[300px]"
            style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)" }}
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/TestimonialsSection.tsx
git commit -m "feat: add Testimonials section with slider navigation"
```

---

## Task 14: CTA Section

**Files:**
- Create: `src/components/sections/CTASection.tsx`

- [ ] **Step 1: Create CTASection**

Create `src/components/sections/CTASection.tsx`:

```tsx
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden py-32" style={{ background: "var(--color-bg)" }}>
      {/* Huge background text */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden"
        aria-hidden
      >
        <p className="text-[18vw] font-black uppercase leading-none tracking-tight text-white/5">
          URANIUM
        </p>
      </div>

      <div className="section-container relative z-10 text-center">
        <p className="mb-4 text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
          {t("label")}
        </p>
        <h2 className="mx-auto mb-12 max-w-4xl text-5xl font-black uppercase leading-tight tracking-tight text-[var(--color-text-primary)] md:text-7xl">
          {t("heading")}
        </h2>
        <Link href={`/${locale}/contact`}>
          <Button variant="primary" className="px-10 py-5 text-base">
            {t("button")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Button>
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/CTASection.tsx
git commit -m "feat: add CTA section with decorative background text"
```

---

## Task 15: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer**

Create `src/components/layout/Footer.tsx`:

```tsx
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const serviceLinks = ["web", "apps", "marketing", "business", "design"];
  const companyLinks = [
    { key: "aboutUs", href: `/${locale}/despre` },
    { key: "ourWork", href: `/${locale}/portofoliu` },
    { key: "careers", href: "#" },
    { key: "blogLink", href: `/${locale}/blog` },
    { key: "contactLink", href: `/${locale}/contact` },
  ];

  return (
    <footer
      className="border-t border-[var(--color-border)]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="section-container py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Logo & desc */}
          <div>
            <Link
              href={`/${locale}`}
              className="text-2xl font-black uppercase tracking-tight text-[var(--color-text-primary)]"
            >
              URANIUM.
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Agenție digitală specializată în web, aplicații, marketing și design.
            </p>
            <div className="mt-6 flex gap-3">
              {["linkedin", "twitter", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-accent hover:text-accent"
                  aria-label={social}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-[var(--color-text-primary)]">
              {t("services")}
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    href={`/${locale}/servicii/${s}`}
                    className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-[var(--color-text-primary)]">
              {t("company")}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-6 text-xs font-bold uppercase tracking-widest text-[var(--color-text-primary)]">
              {t("newsletter")}
            </h4>
            <p className="mb-4 text-sm text-[var(--color-text-muted)]">{t("newsletterDesc")}</p>
            <form
              className="flex overflow-hidden rounded-full border border-[var(--color-border)]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="flex-1 bg-transparent px-4 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
              />
              <button
                type="submit"
                className="flex size-10 shrink-0 items-center justify-center bg-accent text-black transition-colors hover:bg-[#c8f020]"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-8 md:flex-row">
          <p className="text-xs text-[var(--color-text-muted)]">{t("copyright")}</p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
              {t("privacy")}
            </Link>
            <Link href="#" className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer to locale layout**

Update `src/app/[locale]/layout.tsx`:

```tsx
import { Footer } from "@/components/layout/Footer";

// Inside return, after <main>:
<Footer />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx src/app/\[locale\]/layout.tsx
git commit -m "feat: add Footer with service links, company links and newsletter form"
```

---

## Task 16: Assemble Home Page

**Files:**
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Write the home page**

Replace `src/app/[locale]/page.tsx`:

```tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <PortfolioSection />
      <StatsSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Verify full page renders**

```bash
npm run dev
```

Visit `http://localhost:3000/ro` — verify all 8 sections render correctly.
Visit `http://localhost:3000/en` — verify English translations show.
Visit `http://localhost:3000/ru` — verify Russian translations show.
Toggle dark/light mode — all sections should switch correctly.
Test on mobile viewport (375px) — all sections should be responsive.

- [ ] **Step 3: Commit**

```bash
git add src/app/\[locale\]/page.tsx
git commit -m "feat: assemble complete Home page with all sections"
```

---

## Task 17: Build & Cloudflare Pages Config

**Files:**
- Create: `wrangler.toml`
- Modify: `next.config.ts`

- [ ] **Step 1: Install Cloudflare adapter**

```bash
npm install --save-dev @cloudflare/next-on-pages
npx @cloudflare/next-on-pages
```

- [ ] **Step 2: Add edge runtime to locale layout**

Add to `src/app/[locale]/layout.tsx`:

```ts
export const runtime = "edge";
```

- [ ] **Step 3: Create wrangler.toml**

Create `wrangler.toml`:

```toml
name = "uranium"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"

[site]
bucket = ".vercel/output/static"
```

- [ ] **Step 4: Add build script**

In `package.json`, add:

```json
"scripts": {
  "pages:build": "npx @cloudflare/next-on-pages",
  "preview": "npx wrangler pages dev .vercel/output/static",
  "deploy": "npx wrangler pages deploy .vercel/output/static"
}
```

- [ ] **Step 5: Test production build**

```bash
npm run build
```

Expected: Build completes without errors.

- [ ] **Step 6: Commit**

```bash
git add wrangler.toml package.json next.config.ts
git commit -m "feat: add Cloudflare Pages config and build scripts"
```

---

## Task 18: GitHub Setup & First Push

- [ ] **Step 1: Create GitHub repo**

Go to https://github.com/new → name: `uranium` → Private (or Public) → Create.

- [ ] **Step 2: Push to GitHub**

```bash
git remote add origin https://github.com/<YOUR_USERNAME>/uranium.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Connect Cloudflare Pages**

1. Login to https://dash.cloudflare.com
2. Pages → Create a project → Connect to Git → Select `uranium` repo
3. Build settings:
   - Build command: `npm run pages:build`
   - Build output: `.vercel/output/static`
4. Deploy

- [ ] **Step 4: Verify live URL**

Cloudflare will provide a URL like `uranium.pages.dev`. Visit it and verify the home page renders correctly in all 3 languages.

---

## Self-Review

**Spec coverage check:**

| Requirement | Task |
|------------|------|
| Next.js 15 App Router | Task 1 |
| TypeScript | Task 1 |
| Tailwind CSS | Task 1, 2 |
| Design tokens (colors, fonts, spacing) | Task 2 |
| Inter font | Task 4 |
| i18n RO/EN/RU | Task 3 |
| Dark/Light mode | Task 4, 5 |
| Navbar (sticky, responsive, lang switcher, theme toggle) | Task 6 |
| Hero section | Task 7 |
| Intro section (3 feature cards) | Task 8 |
| Services section (5 expandable rows) | Task 9 |
| Portfolio section (2×2 grid) | Task 10 |
| Stats section (4 animated counters) | Task 11 |
| About section | Task 12 |
| Testimonials section | Task 13 |
| CTA section | Task 14 |
| Footer (links + newsletter) | Task 15 |
| Home page assembly | Task 16 |
| Cloudflare Pages config | Task 17 |
| GitHub setup + deploy | Task 18 |
| Responsive (mobile/tablet/desktop) | All sections use responsive Tailwind classes |
| `#d4ff37` accent color | Task 2 tokens + all components |

**No placeholders found.** All steps contain complete code.

**Type consistency:** `Button`, `Badge`, `StatCounter`, `LanguageSwitcher`, `ThemeToggle` defined in Tasks 5/11 — used in Tasks 6–16 with matching names and props.
