# Inner Pages — Plan 2 Design Spec

## Goal

Build all inner pages for the Uranium Digital Agency site: Prețuri, Contact (with Telegram notifications), Portofoliu (with filters), Despre, and 6 Service pages (overview + 5 detail pages). All pages follow the established design system (CSS variables, Tailwind v4, next-intl i18n in RO/EN/RU).

## Architecture

**Tech stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, next-intl v4, Server Actions for form submission, Telegram Bot API for contact notifications.

**Build order (Approach A — business value first):**
1. Prețuri
2. Contact + Telegram
3. Portofoliu
4. Despre
5. Servicii overview + 5 detail pages

---

## File Structure

### New routes (all under `src/app/[locale]/`)
```
preturi/page.tsx
contact/page.tsx
portofoliu/page.tsx
despre/page.tsx
servicii/page.tsx
servicii/web/page.tsx
servicii/aplicatii/page.tsx
servicii/marketing/page.tsx
servicii/business/page.tsx
servicii/design/page.tsx
```

### New data files
- `src/data/pricing.ts` — hardcoded pricing per service with subcategories
- `src/data/portfolio.ts` — ~8 projects with `category` field for filtering (extracted from PortfolioSection)

### New components
- `src/components/ui/PageHero.tsx` — reusable hero for inner pages (large title + subtitle + optional breadcrumb)
- `src/components/ui/Tabs.tsx` — client-side tab switcher (used on pricing page)
- `src/components/sections/service/ServiceDetailTemplate.tsx` — shared template for all 5 service detail pages

### Server Actions
- `src/app/actions/contact.ts` — validates form, calls Telegram Bot API, returns success/error

### Environment variables
- `TELEGRAM_BOT_TOKEN` — bot token from @BotFather
- `TELEGRAM_CHAT_ID` — user's personal chat ID (or group ID)
- Added to `.env.local` (local) and GitHub repo secrets (production CI/CD)

### i18n
Translations added to `src/messages/ro.json`, `en.json`, `ru.json` for all new pages.

---

## Page Designs

### 1. Prețuri (`/[locale]/preturi`)

**Layout:**
- `PageHero` with title "PREȚURILE NOASTRE" and subtitle
- 5 horizontal tabs: Web / Aplicații / Marketing / Business / Design
- Active tab shows a grid of pricing subcategory cards (2 cols on md, 3 on lg)
- Bottom: standard CTASection

**Pricing card anatomy:**
- Service subcategory name (e.g. "Landing Page")
- 3-4 bullet points of what's included
- Price "de la X €"
- CTA button → `/contact`

**Data shape (`src/data/pricing.ts`):**
```ts
type PricingItem = {
  name: string;
  includes: string[];
  priceFrom: number;
  currency: "€";
};
type PricingService = {
  key: "web" | "apps" | "marketing" | "business" | "design";
  items: PricingItem[];
};
```

**Pricing content (RO, placeholder prices):**
- Web: Landing Page (500€), Site Prezentare (1200€), E-Commerce (3500€)
- Aplicații: Web App (4000€), Mobile App iOS/Android (8000€), PWA (3000€)
- Marketing: SEO (300€/lună), Google Ads management (400€/lună), Social Media (500€/lună)
- Business: CRM Implementation (2000€), Automation (1500€), Consultanță (150€/oră)
- Design: Logo & Identity (800€), UI/UX Design (2500€), Full Branding Package (4500€)

**Tabs component:** Client component with `useState` for active tab. Tabs render as buttons; active tab content animates with `opacity` transition.

---

### 2. Contact (`/[locale]/contact`)

**Layout:** 2-column on desktop (lg:grid-cols-2), single column on mobile.

**Left column — Form:**
Fields (all required except Phone):
- Nume (text input)
- Email (email input)
- Telefon (tel input, optional)
- Serviciu (select dropdown: Web / Aplicații / Marketing / Business / Design / Altul)
- Mesaj (textarea, min 4 rows)
- Submit button (primary variant, full width)

**Right column — Info:**
- Email: contact@uranium.md (placeholder)
- Telefon: +373 XX XXX XXX (placeholder)
- Ore de lucru: Luni–Vineri, 9:00–18:00
- Adresă: Chișinău, Moldova (placeholder)
- Optional: small map placeholder div

**Server Action (`src/app/actions/contact.ts`):**
```ts
"use server";
export async function submitContact(formData: FormData): Promise<{ success: boolean; error?: string }> {
  // 1. Extract + validate fields
  // 2. Format Telegram message
  // 3. POST to https://api.telegram.org/bot{TOKEN}/sendMessage
  // 4. Return { success: true } or { success: false, error: "..." }
}
```

**Telegram message format:**
```
🔔 Nou mesaj de contact — Uranium

👤 Nume: [name]
📧 Email: [email]
📞 Telefon: [phone || "—"]
🛠 Serviciu: [service]

💬 Mesaj:
[message]
```

**Form state management:** `useActionState` hook (React 19 / Next.js 16 App Router pattern) for pending/success/error UI states. The form component is `"use client"`, calls the Server Action via `action={submitContact}`.

**Success state:** Replace form with a confirmation message ("Mulțumim! Te contactăm în curând.") + accent checkmark icon.

**Error state:** Red error text below submit button.

---

### 3. Portofoliu (`/[locale]/portofoliu`)

**Layout:**
- `PageHero` with "PORTOFOLIU" + subtitle
- Filter bar: pill buttons — Toate / Web / Aplicații / Marketing / Design / Business
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, gap-6
- ~8 projects (hardcoded in `src/data/portfolio.ts`)

**Filter behavior:** Client component. Active filter stored in `useState`. Cards with non-matching category get `opacity-0 pointer-events-none` or are removed from render. Transition: `transition-opacity duration-200`.

**Project card:** Same design as home PortfolioSection cards (colored background, title, category text, ↗ arrow icon).

**Portfolio data shape:**
```ts
type Project = {
  id: number;
  title: string;
  category: "web" | "apps" | "marketing" | "design" | "business";
  categoryLabel: string;
  color: string;
};
```

**Note:** `PortfolioSection.tsx` on the home page will be updated to import from `src/data/portfolio.ts` instead of its current inline array.

**8 projects:**
1. Studio Rebrand — design — #1e3a8a
2. FinanceFlow Platform — apps — #2563eb
3. Luxury E-Commerce — web — #374151
4. Wellness Mobile App — apps — #1f2937
5. TechCorp Landing Page — web — #0f172a
6. Brand Identity Package — design — #1e3a8a
7. Google Ads Campaign — marketing — #065f46
8. ERP Implementation — business — #1c1917

---

### 4. Despre (`/[locale]/despre`)

**Sections (top to bottom):**
1. `PageHero` — "DESPRE NOI" + subtitle
2. **Mission** — 2-col (lg): left = large bold text paragraph, right = team photo placeholder (aspect-[4/3], rounded-3xl, bg gradient)
3. **Values** — 4 cards in a 2×2 grid: Calitate / Viteză / Inovație / Transparență. Each card: icon (SVG), title, 2-sentence description
4. **Team** — "ECHIPA NOASTRĂ" heading + 3-col grid of team member cards: photo placeholder (circle avatar, gradient bg), Name, Role, brief bio. 4 placeholder members.
5. **CTASection** — reuse existing component

---

### 5. Servicii overview (`/[locale]/servicii`)

Extends the home ServicesSection concept into a full page:
- `PageHero` — "SERVICIILE NOASTRE"
- Accordion list (same as home ServicesSection) but each service row has a "Află mai mult →" link to `/servicii/[slug]`
- Below accordion: 3 reasons to choose Uranium (cards: Experiență / Viteză / Rezultate)
- CTASection

---

### 6. Service detail pages (`/[locale]/servicii/[slug]`)

**Shared template (`ServiceDetailTemplate`)** receives a `serviceKey` prop and renders:

1. `PageHero` — service name (e.g. "DEZVOLTARE WEB") + short tagline
2. **Ce include** — 2-col grid of features (icon + title + description). 6 features per service.
3. **Cum lucrăm** — 3-step horizontal timeline: Briefing → Execuție → Livrare
4. **Proiecte relevante** — 3 portfolio cards filtered by matching category (from `portfolio.ts`)
5. **CTASection**

**5 service slugs and their PageHero taglines:**
- `web` → "Dezvoltare Web" / "Site-uri care convertesc și performează."
- `aplicatii` → "Aplicații" / "Software custom pentru orice platformă."
- `marketing` → "Marketing Digital" / "Creștem branduri prin date și creativitate."
- `business` → "Soluții Business" / "Automatizăm și optimizăm operațiunile tale."
- `design` → "Design & Branding" / "Identitate vizuală care rămâne în memorie."

---

## Shared Component: PageHero

```tsx
// src/components/ui/PageHero.tsx — Server component
type PageHeroProps = {
  label?: string;      // small uppercase label above title
  title: string;       // large h1
  subtitle?: string;   // muted paragraph
};
```

Renders a `<section>` with `pt-32 pb-16` (accounts for fixed navbar), dark background, large h1 using `--color-text-primary`, optional label in `--color-text-muted`.

---

## i18n Keys Added

New top-level keys in all 3 locale files: `pricing`, `contact`, `portfolio` (page-level), `aboutPage`, `serviciiPage`, `serviceDetail`.

---

## Environment Variables

`.env.local` (to be created locally, never committed):
```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Both also added to GitHub repo secrets for production deployment.

`.env.example` committed to repo (with empty values) as documentation.
