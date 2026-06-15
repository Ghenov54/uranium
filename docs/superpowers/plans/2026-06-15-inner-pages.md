# Inner Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all inner pages for Uranium — Prețuri, Contact (Telegram notifications), Portofoliu (filtered grid), Despre, Servicii overview, and 5 Service detail pages — using the established design system.

**Architecture:** Server Components for all static pages; isolated Client Components only where interactivity is required (pricing tabs, portfolio filter, contact form). Shared `PageHero` and `Tabs` UI components. Contact form submits via a Server Action that calls the Telegram Bot API.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, next-intl v4 (RO/EN/RU), CSS custom properties for theming. No new dependencies required.

> ⚠️ This project runs Next.js 16 which has breaking changes vs older versions. Read `node_modules/next/dist/docs/` before writing any code. Follow patterns from existing files exactly.

---

## File Map

**Create:**
- `src/data/portfolio.ts` — exported project data (used by home PortfolioSection + full portfolio page)
- `src/data/pricing.ts` — exported pricing tiers per service
- `src/components/ui/PageHero.tsx` — reusable inner-page hero (Server Component)
- `src/components/ui/Tabs.tsx` — client-side tab switcher
- `src/app/actions/contact.ts` — Server Action → Telegram Bot API
- `.env.example` — documents required env vars
- `src/app/[locale]/preturi/page.tsx` — Pricing page (Server)
- `src/app/[locale]/preturi/PricingContent.tsx` — Pricing tabs (Client)
- `src/app/[locale]/contact/page.tsx` — Contact page (Server)
- `src/app/[locale]/contact/ContactForm.tsx` — Contact form (Client)
- `src/app/[locale]/portofoliu/page.tsx` — Portfolio page (Server)
- `src/app/[locale]/portofoliu/PortfolioGrid.tsx` — Filtered grid (Client)
- `src/app/[locale]/despre/page.tsx` — About page (Server)
- `src/app/[locale]/servicii/page.tsx` — Services overview (Server)
- `src/app/[locale]/servicii/[slug]/page.tsx` — Service detail dynamic route (Server)
- `src/components/sections/service/ServiceDetailTemplate.tsx` — Shared service detail layout (Server)

**Modify:**
- `src/components/sections/PortfolioSection.tsx` — import projects from `src/data/portfolio.ts` instead of inline array
- `src/messages/ro.json` — add new page translation keys
- `src/messages/en.json` — add new page translation keys
- `src/messages/ru.json` — add new page translation keys

---

## Task 1: Data Layer

**Files:**
- Create: `src/data/portfolio.ts`
- Create: `src/data/pricing.ts`
- Modify: `src/components/sections/PortfolioSection.tsx`

- [ ] **Step 1: Create `src/data/portfolio.ts`**

```ts
export type ProjectCategory = "web" | "apps" | "marketing" | "design" | "business";

export type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  color: string;
};

export const projects: Project[] = [
  { id: 1, title: "Studio Rebrand", category: "design", categoryLabel: "Brand Identity · Design", color: "#1e3a8a" },
  { id: 2, title: "FinanceFlow Platform", category: "apps", categoryLabel: "Product Design · Web App", color: "#2563eb" },
  { id: 3, title: "Luxury E-Commerce", category: "web", categoryLabel: "Web Development · E-Commerce", color: "#374151" },
  { id: 4, title: "Wellness Mobile App", category: "apps", categoryLabel: "UI/UX · Mobile App", color: "#1f2937" },
  { id: 5, title: "TechCorp Landing Page", category: "web", categoryLabel: "Landing Page · Web", color: "#0f172a" },
  { id: 6, title: "Brand Identity Package", category: "design", categoryLabel: "Branding · Identity", color: "#312e81" },
  { id: 7, title: "Google Ads Campaign", category: "marketing", categoryLabel: "Google Ads · Marketing", color: "#065f46" },
  { id: 8, title: "ERP Implementation", category: "business", categoryLabel: "ERP · Business", color: "#1c1917" },
];
```

- [ ] **Step 2: Create `src/data/pricing.ts`**

```ts
export type PricingItem = {
  name: string;
  includes: string[];
  priceFrom: number;
  unit?: string;
};

export type ServicePricing = {
  key: "web" | "apps" | "marketing" | "business" | "design";
  items: PricingItem[];
};

export const pricingData: ServicePricing[] = [
  {
    key: "web",
    items: [
      { name: "Landing Page", includes: ["Design custom", "Responsiv mobile", "SEO de bază", "Hosting 1 an", "SSL inclus"], priceFrom: 500 },
      { name: "Site Prezentare", includes: ["Până la 10 pagini", "Design custom", "CMS integrat", "SEO On-Page", "Hosting 1 an", "SSL inclus"], priceFrom: 1200 },
      { name: "E-Commerce", includes: ["Produse nelimitate", "Plăți online", "Design custom", "Admin dashboard", "SEO complet", "Suport 6 luni"], priceFrom: 3500 },
    ],
  },
  {
    key: "apps",
    items: [
      { name: "Web App", includes: ["Design UI/UX", "Frontend + Backend", "Autentificare", "Panou admin", "API REST", "Deploy inclus"], priceFrom: 4000 },
      { name: "Mobile App iOS/Android", includes: ["Design nativ", "iOS + Android", "Push notifications", "Integrări API", "Deploy store", "Suport 6 luni"], priceFrom: 8000 },
      { name: "PWA", includes: ["Funcționare offline", "Instalabil", "Push notifications", "Performanță maximă", "Cross-platform"], priceFrom: 3000 },
    ],
  },
  {
    key: "marketing",
    items: [
      { name: "SEO", includes: ["Audit complet", "Optimizare on-page", "Link building", "Raport lunar", "Google Search Console"], priceFrom: 300, unit: "/lună" },
      { name: "Google Ads", includes: ["Setup campanii", "Targeting avansat", "Optimizare continuă", "Rapoarte săptămânale", "Call tracking"], priceFrom: 400, unit: "/lună" },
      { name: "Social Media", includes: ["4 postări/săptămână", "Grafică custom", "Story-uri", "Moderare comentarii", "Raport lunar"], priceFrom: 500, unit: "/lună" },
    ],
  },
  {
    key: "business",
    items: [
      { name: "Implementare CRM", includes: ["Analiză nevoi", "Setup & configurare", "Import date", "Training echipă", "Suport 3 luni"], priceFrom: 2000 },
      { name: "Automatizări Business", includes: ["Analiză procese", "Implementare workflow", "Integrări sisteme", "Testare & validare", "Documentație"], priceFrom: 1500 },
      { name: "Consultanță Strategică", includes: ["Audit digital", "Strategie personalizată", "Roadmap implementare", "Follow-up lunar"], priceFrom: 150, unit: "/oră" },
    ],
  },
  {
    key: "design",
    items: [
      { name: "Logo & Identitate Vizuală", includes: ["Concept logo", "Variante culori", "Brand guidelines de bază", "Formate SVG/PNG/PDF"], priceFrom: 800 },
      { name: "UI/UX Design", includes: ["Research utilizatori", "Wireframes", "Prototip interactiv", "Design system", "Handoff Figma"], priceFrom: 2500 },
      { name: "Full Branding Package", includes: ["Logo + identitate", "Brand guidelines complete", "Materiale marketing", "Social media kit", "Prezentare brand"], priceFrom: 4500 },
    ],
  },
];
```

- [ ] **Step 3: Update `src/components/sections/PortfolioSection.tsx` to use the shared data file**

Replace the top of the file (the inline `projects` array) with an import. Open the file and make these changes:

Remove:
```ts
const projects = [
  { id: 1, title: "Studio Rebrand", category: "Brand Identity · Design", color: "#1e3a8a" },
  { id: 2, title: "FinanceFlow Platform", category: "Product Design · Web App", color: "#2563eb" },
  { id: 3, title: "Luxury E-Commerce", category: "Web Development · E-Commerce", color: "#374151" },
  { id: 4, title: "Wellness Mobile App", category: "UI/UX · Mobile App", color: "#1f2937" },
];
```

Add at the top (with existing imports):
```ts
import { projects } from "@/data/portfolio";
```

In the JSX, change `project.category` (which was a free-form string) to `project.categoryLabel`:
```tsx
<p className="mt-1 text-sm text-white/60">{project.categoryLabel}</p>
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/portfolio.ts src/data/pricing.ts src/components/sections/PortfolioSection.tsx
git commit -m "feat: add data layer for portfolio and pricing"
```

---

## Task 2: Shared UI Components

**Files:**
- Create: `src/components/ui/PageHero.tsx`
- Create: `src/components/ui/Tabs.tsx`

- [ ] **Step 1: Create `src/components/ui/PageHero.tsx`**

```tsx
type PageHeroProps = {
  label?: string;
  title: string;
  subtitle?: string;
};

export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="pb-16 pt-32" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
        {label && (
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--color-text-muted)" }} />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              {label}
            </span>
          </div>
        )}
        <h1
          className="text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl md:text-7xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-6 max-w-xl text-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/components/ui/Tabs.tsx`**

```tsx
"use client";
import { useState } from "react";
import type { ReactNode } from "react";

export type Tab = { key: string; label: string };

type TabsProps = {
  tabs: Tab[];
  children: (activeKey: string) => ReactNode;
};

export function Tabs({ tabs, children }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.key ?? "");

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2 border-b pb-6" style={{ borderColor: "var(--color-border)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={
              active === tab.key
                ? { background: "var(--color-accent)", color: "#000" }
                : { background: "var(--color-bg-surface)", color: "var(--color-text-muted)" }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{children(active)}</div>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/PageHero.tsx src/components/ui/Tabs.tsx
git commit -m "feat: add PageHero and Tabs shared UI components"
```

---

## Task 3: i18n Translations

**Files:**
- Modify: `src/messages/ro.json`
- Modify: `src/messages/en.json`
- Modify: `src/messages/ru.json`

- [ ] **Step 1: Add keys to `src/messages/ro.json`**

Open the file and add the following top-level keys before the closing `}`:

```json
  "pricing": {
    "label": "Investiție",
    "heading": "PREȚURILE NOASTRE",
    "subtitle": "Prețuri transparente, fără costuri ascunse.",
    "from": "de la",
    "includes": "Ce include:",
    "contactCta": "Solicită ofertă",
    "tab": {
      "web": "Web",
      "apps": "Aplicații",
      "marketing": "Marketing",
      "business": "Business",
      "design": "Design"
    }
  },
  "contact": {
    "label": "Să colaborăm",
    "heading": "CONTACTEAZĂ-NE",
    "subtitle": "Spune-ne despre proiectul tău și te contactăm în 24 de ore.",
    "namePlaceholder": "Numele tău *",
    "emailPlaceholder": "Email-ul tău *",
    "phonePlaceholder": "Telefon (opțional)",
    "servicePlaceholder": "Selectează serviciul *",
    "serviceWeb": "Dezvoltare Web",
    "serviceApps": "Aplicații",
    "serviceMarketing": "Marketing Digital",
    "serviceBusiness": "Soluții Business",
    "serviceDesign": "Design & Branding",
    "serviceOther": "Altul",
    "messagePlaceholder": "Descrie proiectul tău *",
    "submit": "Trimite mesajul",
    "sending": "Se trimite...",
    "successTitle": "Mesaj trimis!",
    "successDesc": "Te contactăm în maximum 24 de ore.",
    "errorGeneric": "A apărut o eroare. Încearcă din nou.",
    "infoEmail": "Email",
    "infoEmailValue": "contact@uranium.md",
    "infoPhone": "Telefon",
    "infoPhoneValue": "+373 60 000 000",
    "infoHours": "Program",
    "infoHoursValue": "Luni–Vineri, 9:00–18:00",
    "infoAddress": "Adresă",
    "infoAddressValue": "Chișinău, Moldova"
  },
  "portfolioPage": {
    "label": "Lucrările noastre",
    "heading": "PORTOFOLIU",
    "subtitle": "Proiecte care vorbesc de la sine.",
    "filterAll": "Toate",
    "filterWeb": "Web",
    "filterApps": "Aplicații",
    "filterMarketing": "Marketing",
    "filterDesign": "Design",
    "filterBusiness": "Business"
  },
  "aboutPage": {
    "label": "Cine suntem",
    "heading": "DESPRE NOI",
    "subtitle": "O echipă de creatori dedicați excelenței digitale.",
    "missionLabel": "Misiunea noastră",
    "missionText": "Misiunea Uranium este să transforme viziunile clienților în realitate digitală de înaltă calitate, combinând strategia, designul și tehnologia pentru a obține rezultate excepționale și durabile.",
    "valuesLabel": "Valorile noastre",
    "value1Title": "Calitate",
    "value1Desc": "Fiecare pixel contează. Livrăm numai ce ne-am mândri să semnăm.",
    "value2Title": "Viteză",
    "value2Desc": "Timp înseamnă bani. Lucrăm eficient fără a compromite calitatea.",
    "value3Title": "Inovație",
    "value3Desc": "Adoptăm cele mai noi tehnologii pentru soluții care durează.",
    "value4Title": "Transparență",
    "value4Desc": "Comunicare clară, prețuri corecte, fără surprize.",
    "teamLabel": "Echipa noastră",
    "member1Name": "Alexandru Popa",
    "member1Role": "CEO & Creative Director",
    "member2Name": "Maria Ionescu",
    "member2Role": "Lead Developer",
    "member3Name": "Andrei Lungu",
    "member3Role": "UI/UX Designer",
    "member4Name": "Elena Rus",
    "member4Role": "Marketing Manager"
  },
  "serviciiPage": {
    "label": "Ce facem",
    "heading": "SERVICIILE NOASTRE",
    "subtitle": "Soluții digitale complete pentru orice nevoie de business.",
    "learnMore": "Află mai mult →",
    "whyTitle": "DE CE URANIUM?",
    "reason1Title": "Experiență dovedită",
    "reason1Desc": "15+ ani și 250+ proiecte livrate cu succes în diverse industrii.",
    "reason2Title": "Livrare rapidă",
    "reason2Desc": "Procese eficiente și echipe dedicate. Lansăm în 2–4 săptămâni.",
    "reason3Title": "Rezultate măsurabile",
    "reason3Desc": "KPI-uri clare, rapoarte transparente și creștere demonstrabilă."
  },
  "serviceDetail": {
    "featuresLabel": "Ce include",
    "processLabel": "Cum lucrăm",
    "step1Title": "Briefing",
    "step1Desc": "Analizăm nevoile, obiectivele și publicul tău țintă în detaliu.",
    "step2Title": "Execuție",
    "step2Desc": "Design, dezvoltare și testare riguroasă, cu actualizări regulate.",
    "step3Title": "Livrare",
    "step3Desc": "Lansare, training pentru echipa ta și suport post-livrare.",
    "portfolioLabel": "Proiecte relevante",
    "web": {
      "title": "DEZVOLTARE WEB",
      "tagline": "Site-uri care convertesc și performează.",
      "feature1Title": "Design Responsiv",
      "feature1Desc": "Design adaptat perfect pentru toate dispozitivele și rezoluțiile.",
      "feature2Title": "Performanță Maximă",
      "feature2Desc": "Core Web Vitals optimizat pentru viteză și experiență fluidă.",
      "feature3Title": "SEO On-Page",
      "feature3Desc": "Structură tehnică optimizată pentru vizibilitate organică crescută.",
      "feature4Title": "Integrare CMS",
      "feature4Desc": "Administrare facilă a conținutului fără cunoștințe tehnice.",
      "feature5Title": "Securitate SSL",
      "feature5Desc": "Protecție completă a datelor și certificat SSL inclus gratuit.",
      "feature6Title": "Suport & Mentenanță",
      "feature6Desc": "Asistență tehnică continuă și actualizări regulate de securitate."
    },
    "aplicatii": {
      "title": "APLICAȚII",
      "tagline": "Software custom pentru orice platformă.",
      "feature1Title": "iOS & Android",
      "feature1Desc": "Aplicații native de înaltă calitate pentru ambele platforme majore.",
      "feature2Title": "UX Fluid",
      "feature2Desc": "Interfețe intuitive care îmbunătățesc experiența utilizatorului.",
      "feature3Title": "Performanță Nativă",
      "feature3Desc": "Viteză și responsivitate maximă, fără compromisuri.",
      "feature4Title": "Integrări API",
      "feature4Desc": "Conectare cu orice serviciu extern sau sistem existent.",
      "feature5Title": "Push Notifications",
      "feature5Desc": "Comunicare directă și personalizată cu utilizatorii tăi.",
      "feature6Title": "Actualizări Continue",
      "feature6Desc": "Suport, îmbunătățiri și actualizări regulate post-lansare."
    },
    "marketing": {
      "title": "MARKETING DIGITAL",
      "tagline": "Creștem branduri prin date și creativitate.",
      "feature1Title": "SEO Tehnic",
      "feature1Desc": "Optimizare completă pentru motoarele de căutare și vizibilitate organică.",
      "feature2Title": "Google Ads",
      "feature2Desc": "Campanii PPC cu ROI maxim și targeting extrem de precis.",
      "feature3Title": "Meta Ads",
      "feature3Desc": "Facebook & Instagram advertising cu impact real și măsurabil.",
      "feature4Title": "Social Media",
      "feature4Desc": "Prezență activă și conținut care generează engagement real.",
      "feature5Title": "Email Marketing",
      "feature5Desc": "Campanii de nurturing care transformă abonații în clienți fideli.",
      "feature6Title": "Analytics & Rapoarte",
      "feature6Desc": "Date clare și decizii informate bazate pe performanță reală."
    },
    "business": {
      "title": "SOLUȚII BUSINESS",
      "tagline": "Automatizăm și optimizăm operațiunile tale.",
      "feature1Title": "Implementare CRM",
      "feature1Desc": "Gestionare eficientă și centralizată a relațiilor cu clienții.",
      "feature2Title": "Sisteme ERP",
      "feature2Desc": "Automatizarea proceselor de business la orice scară.",
      "feature3Title": "Consultanță Strategică",
      "feature3Desc": "Analiză profundă și optimizare operațională cu rezultate clare.",
      "feature4Title": "Automatizări",
      "feature4Desc": "Workflow-uri inteligente care elimină munca manuală repetitivă.",
      "feature5Title": "Integrări Third-Party",
      "feature5Desc": "Conectare perfectă cu sisteme și platforme deja existente.",
      "feature6Title": "Training & Onboarding",
      "feature6Desc": "Echipa ta va ști să folosească noile sisteme din prima zi."
    },
    "design": {
      "title": "DESIGN & BRANDING",
      "tagline": "Identitate vizuală care rămâne în memorie.",
      "feature1Title": "Logo & Identitate",
      "feature1Desc": "Brand memorabil și distinctiv care îți reflectă perfect valorile.",
      "feature2Title": "UI/UX Design",
      "feature2Desc": "Interfețe frumoase, funcționale și centrate pe utilizator.",
      "feature3Title": "Brand Guidelines",
      "feature3Desc": "Manual complet de brand pentru consistență vizuală totală.",
      "feature4Title": "Materiale Marketing",
      "feature4Desc": "Designuri pentru toate canalele și suporturile de comunicare.",
      "feature5Title": "Prototipare",
      "feature5Desc": "Testare și validare rapidă a conceptelor de design înainte de execuție.",
      "feature6Title": "Graphic Design",
      "feature6Desc": "Materiale vizuale de impact pentru orice ocazie și platformă."
    }
  }
```

- [ ] **Step 2: Add keys to `src/messages/en.json`**

Add before the closing `}`:

```json
  "pricing": {
    "label": "Investment",
    "heading": "OUR PRICING",
    "subtitle": "Transparent pricing, no hidden costs.",
    "from": "from",
    "includes": "What's included:",
    "contactCta": "Request a quote",
    "tab": {
      "web": "Web",
      "apps": "Applications",
      "marketing": "Marketing",
      "business": "Business",
      "design": "Design"
    }
  },
  "contact": {
    "label": "Let's collaborate",
    "heading": "CONTACT US",
    "subtitle": "Tell us about your project and we'll get back to you within 24 hours.",
    "namePlaceholder": "Your name *",
    "emailPlaceholder": "Your email *",
    "phonePlaceholder": "Phone (optional)",
    "servicePlaceholder": "Select a service *",
    "serviceWeb": "Web Development",
    "serviceApps": "Applications",
    "serviceMarketing": "Digital Marketing",
    "serviceBusiness": "Business Solutions",
    "serviceDesign": "Design & Branding",
    "serviceOther": "Other",
    "messagePlaceholder": "Describe your project *",
    "submit": "Send message",
    "sending": "Sending...",
    "successTitle": "Message sent!",
    "successDesc": "We'll contact you within 24 hours.",
    "errorGeneric": "Something went wrong. Please try again.",
    "infoEmail": "Email",
    "infoEmailValue": "contact@uranium.md",
    "infoPhone": "Phone",
    "infoPhoneValue": "+373 60 000 000",
    "infoHours": "Hours",
    "infoHoursValue": "Mon–Fri, 9:00–18:00",
    "infoAddress": "Address",
    "infoAddressValue": "Chișinău, Moldova"
  },
  "portfolioPage": {
    "label": "Our work",
    "heading": "PORTFOLIO",
    "subtitle": "Projects that speak for themselves.",
    "filterAll": "All",
    "filterWeb": "Web",
    "filterApps": "Applications",
    "filterMarketing": "Marketing",
    "filterDesign": "Design",
    "filterBusiness": "Business"
  },
  "aboutPage": {
    "label": "Who we are",
    "heading": "ABOUT US",
    "subtitle": "A team of creators dedicated to digital excellence.",
    "missionLabel": "Our mission",
    "missionText": "Uranium's mission is to transform clients' visions into high-quality digital reality, combining strategy, design and technology to deliver exceptional, lasting results.",
    "valuesLabel": "Our values",
    "value1Title": "Quality",
    "value1Desc": "Every pixel matters. We deliver only what we'd be proud to sign.",
    "value2Title": "Speed",
    "value2Desc": "Time is money. We work efficiently without compromising quality.",
    "value3Title": "Innovation",
    "value3Desc": "We embrace the latest technologies for solutions that last.",
    "value4Title": "Transparency",
    "value4Desc": "Clear communication, fair pricing, no surprises.",
    "teamLabel": "Our team",
    "member1Name": "Alexandru Popa",
    "member1Role": "CEO & Creative Director",
    "member2Name": "Maria Ionescu",
    "member2Role": "Lead Developer",
    "member3Name": "Andrei Lungu",
    "member3Role": "UI/UX Designer",
    "member4Name": "Elena Rus",
    "member4Role": "Marketing Manager"
  },
  "serviciiPage": {
    "label": "What we do",
    "heading": "OUR SERVICES",
    "subtitle": "Complete digital solutions for any business need.",
    "learnMore": "Learn more →",
    "whyTitle": "WHY URANIUM?",
    "reason1Title": "Proven experience",
    "reason1Desc": "15+ years and 250+ projects successfully delivered across industries.",
    "reason2Title": "Fast delivery",
    "reason2Desc": "Efficient processes and dedicated teams. We launch in 2–4 weeks.",
    "reason3Title": "Measurable results",
    "reason3Desc": "Clear KPIs, transparent reports and demonstrable growth."
  },
  "serviceDetail": {
    "featuresLabel": "What's included",
    "processLabel": "How we work",
    "step1Title": "Briefing",
    "step1Desc": "We analyse your needs, goals and target audience in detail.",
    "step2Title": "Execution",
    "step2Desc": "Design, development and rigorous testing, with regular updates.",
    "step3Title": "Delivery",
    "step3Desc": "Launch, team training and post-delivery support.",
    "portfolioLabel": "Relevant projects",
    "web": {
      "title": "WEB DEVELOPMENT",
      "tagline": "Websites that convert and perform.",
      "feature1Title": "Responsive Design",
      "feature1Desc": "Perfectly adapted design for all devices and resolutions.",
      "feature2Title": "Maximum Performance",
      "feature2Desc": "Core Web Vitals optimised for speed and smooth experience.",
      "feature3Title": "On-Page SEO",
      "feature3Desc": "Technical structure optimised for increased organic visibility.",
      "feature4Title": "CMS Integration",
      "feature4Desc": "Easy content management without technical knowledge.",
      "feature5Title": "SSL Security",
      "feature5Desc": "Complete data protection and SSL certificate included free.",
      "feature6Title": "Support & Maintenance",
      "feature6Desc": "Continuous technical assistance and regular security updates."
    },
    "aplicatii": {
      "title": "APPLICATIONS",
      "tagline": "Custom software for any platform.",
      "feature1Title": "iOS & Android",
      "feature1Desc": "High-quality native apps for both major platforms.",
      "feature2Title": "Fluid UX",
      "feature2Desc": "Intuitive interfaces that improve the user experience.",
      "feature3Title": "Native Performance",
      "feature3Desc": "Maximum speed and responsiveness, without compromise.",
      "feature4Title": "API Integrations",
      "feature4Desc": "Connect with any external service or existing system.",
      "feature5Title": "Push Notifications",
      "feature5Desc": "Direct and personalised communication with your users.",
      "feature6Title": "Ongoing Updates",
      "feature6Desc": "Support, improvements and regular updates post-launch."
    },
    "marketing": {
      "title": "DIGITAL MARKETING",
      "tagline": "We grow brands through data and creativity.",
      "feature1Title": "Technical SEO",
      "feature1Desc": "Complete optimisation for search engines and organic visibility.",
      "feature2Title": "Google Ads",
      "feature2Desc": "PPC campaigns with maximum ROI and highly precise targeting.",
      "feature3Title": "Meta Ads",
      "feature3Desc": "Facebook & Instagram advertising with real, measurable impact.",
      "feature4Title": "Social Media",
      "feature4Desc": "Active presence and content that generates real engagement.",
      "feature5Title": "Email Marketing",
      "feature5Desc": "Nurturing campaigns that turn subscribers into loyal clients.",
      "feature6Title": "Analytics & Reports",
      "feature6Desc": "Clear data and informed decisions based on real performance."
    },
    "business": {
      "title": "BUSINESS SOLUTIONS",
      "tagline": "We automate and optimise your operations.",
      "feature1Title": "CRM Implementation",
      "feature1Desc": "Efficient, centralised management of client relationships.",
      "feature2Title": "ERP Systems",
      "feature2Desc": "Business process automation at any scale.",
      "feature3Title": "Strategic Consulting",
      "feature3Desc": "Deep analysis and operational optimisation with clear results.",
      "feature4Title": "Automation",
      "feature4Desc": "Smart workflows that eliminate repetitive manual work.",
      "feature5Title": "Third-Party Integrations",
      "feature5Desc": "Seamless connection with existing systems and platforms.",
      "feature6Title": "Training & Onboarding",
      "feature6Desc": "Your team will know how to use the new systems from day one."
    },
    "design": {
      "title": "DESIGN & BRANDING",
      "tagline": "Visual identity that stays in memory.",
      "feature1Title": "Logo & Identity",
      "feature1Desc": "Memorable, distinctive brand that perfectly reflects your values.",
      "feature2Title": "UI/UX Design",
      "feature2Desc": "Beautiful, functional, user-centred interfaces.",
      "feature3Title": "Brand Guidelines",
      "feature3Desc": "Complete brand manual for total visual consistency.",
      "feature4Title": "Marketing Materials",
      "feature4Desc": "Designs for all channels and communication media.",
      "feature5Title": "Prototyping",
      "feature5Desc": "Rapid testing and validation of design concepts before execution.",
      "feature6Title": "Graphic Design",
      "feature6Desc": "Impactful visual materials for any occasion and platform."
    }
  }
```

- [ ] **Step 3: Add keys to `src/messages/ru.json`**

Add before the closing `}`:

```json
  "pricing": {
    "label": "Инвестиция",
    "heading": "НАШИ ЦЕНЫ",
    "subtitle": "Прозрачные цены, без скрытых расходов.",
    "from": "от",
    "includes": "Что включено:",
    "contactCta": "Запросить предложение",
    "tab": {
      "web": "Веб",
      "apps": "Приложения",
      "marketing": "Маркетинг",
      "business": "Бизнес",
      "design": "Дизайн"
    }
  },
  "contact": {
    "label": "Давайте сотрудничать",
    "heading": "СВЯЖИТЕСЬ С НАМИ",
    "subtitle": "Расскажите о своём проекте — ответим в течение 24 часов.",
    "namePlaceholder": "Ваше имя *",
    "emailPlaceholder": "Ваш email *",
    "phonePlaceholder": "Телефон (необязательно)",
    "servicePlaceholder": "Выберите услугу *",
    "serviceWeb": "Веб-разработка",
    "serviceApps": "Приложения",
    "serviceMarketing": "Цифровой маркетинг",
    "serviceBusiness": "Бизнес-решения",
    "serviceDesign": "Дизайн и брендинг",
    "serviceOther": "Другое",
    "messagePlaceholder": "Опишите ваш проект *",
    "submit": "Отправить сообщение",
    "sending": "Отправляем...",
    "successTitle": "Сообщение отправлено!",
    "successDesc": "Мы свяжемся с вами в течение 24 часов.",
    "errorGeneric": "Произошла ошибка. Попробуйте ещё раз.",
    "infoEmail": "Email",
    "infoEmailValue": "contact@uranium.md",
    "infoPhone": "Телефон",
    "infoPhoneValue": "+373 60 000 000",
    "infoHours": "Режим работы",
    "infoHoursValue": "Пн–Пт, 9:00–18:00",
    "infoAddress": "Адрес",
    "infoAddressValue": "Кишинёв, Молдова"
  },
  "portfolioPage": {
    "label": "Наши работы",
    "heading": "ПОРТФОЛИО",
    "subtitle": "Проекты, говорящие сами за себя.",
    "filterAll": "Все",
    "filterWeb": "Веб",
    "filterApps": "Приложения",
    "filterMarketing": "Маркетинг",
    "filterDesign": "Дизайн",
    "filterBusiness": "Бизнес"
  },
  "aboutPage": {
    "label": "Кто мы",
    "heading": "О НАС",
    "subtitle": "Команда создателей, преданных цифровому совершенству.",
    "missionLabel": "Наша миссия",
    "missionText": "Миссия Uranium — превращать видения клиентов в высококачественную цифровую реальность, объединяя стратегию, дизайн и технологии для достижения исключительных результатов.",
    "valuesLabel": "Наши ценности",
    "value1Title": "Качество",
    "value1Desc": "Каждый пиксель важен. Мы сдаём только то, чем гордимся.",
    "value2Title": "Скорость",
    "value2Desc": "Время — деньги. Работаем эффективно, не жертвуя качеством.",
    "value3Title": "Инновации",
    "value3Desc": "Применяем новейшие технологии для долговечных решений.",
    "value4Title": "Прозрачность",
    "value4Desc": "Чёткая коммуникация, честные цены, никаких сюрпризов.",
    "teamLabel": "Наша команда",
    "member1Name": "Alexandru Popa",
    "member1Role": "CEO & Creative Director",
    "member2Name": "Maria Ionescu",
    "member2Role": "Lead Developer",
    "member3Name": "Andrei Lungu",
    "member3Role": "UI/UX Designer",
    "member4Name": "Elena Rus",
    "member4Role": "Marketing Manager"
  },
  "serviciiPage": {
    "label": "Что мы делаем",
    "heading": "НАШИ УСЛУГИ",
    "subtitle": "Полные цифровые решения для любых бизнес-потребностей.",
    "learnMore": "Узнать больше →",
    "whyTitle": "ПОЧЕМУ URANIUM?",
    "reason1Title": "Проверенный опыт",
    "reason1Desc": "15+ лет и 250+ успешно сданных проектов в различных отраслях.",
    "reason2Title": "Быстрая доставка",
    "reason2Desc": "Эффективные процессы и преданные команды. Запускаем за 2–4 недели.",
    "reason3Title": "Измеримые результаты",
    "reason3Desc": "Чёткие KPI, прозрачные отчёты и доказуемый рост."
  },
  "serviceDetail": {
    "featuresLabel": "Что включено",
    "processLabel": "Как мы работаем",
    "step1Title": "Брифинг",
    "step1Desc": "Анализируем ваши потребности, цели и целевую аудиторию.",
    "step2Title": "Исполнение",
    "step2Desc": "Дизайн, разработка и строгое тестирование с регулярными обновлениями.",
    "step3Title": "Сдача",
    "step3Desc": "Запуск, обучение вашей команды и поддержка после сдачи.",
    "portfolioLabel": "Релевантные проекты",
    "web": {
      "title": "ВЕБ-РАЗРАБОТКА",
      "tagline": "Сайты, которые конвертируют и показывают результат.",
      "feature1Title": "Адаптивный дизайн",
      "feature1Desc": "Идеально адаптированный дизайн для всех устройств и разрешений.",
      "feature2Title": "Максимальная скорость",
      "feature2Desc": "Оптимизированные Core Web Vitals для быстрой и плавной работы.",
      "feature3Title": "On-Page SEO",
      "feature3Desc": "Техническая структура, оптимизированная для органической видимости.",
      "feature4Title": "Интеграция CMS",
      "feature4Desc": "Простое управление контентом без технических знаний.",
      "feature5Title": "SSL безопасность",
      "feature5Desc": "Полная защита данных и SSL-сертификат в комплекте.",
      "feature6Title": "Поддержка и обслуживание",
      "feature6Desc": "Постоянная техническая помощь и регулярные обновления."
    },
    "aplicatii": {
      "title": "ПРИЛОЖЕНИЯ",
      "tagline": "Кастомное ПО для любой платформы.",
      "feature1Title": "iOS и Android",
      "feature1Desc": "Высококачественные нативные приложения для обеих платформ.",
      "feature2Title": "Плавный UX",
      "feature2Desc": "Интуитивные интерфейсы, улучшающие пользовательский опыт.",
      "feature3Title": "Нативная производительность",
      "feature3Desc": "Максимальная скорость и отзывчивость без компромиссов.",
      "feature4Title": "API интеграции",
      "feature4Desc": "Подключение к любому внешнему сервису или существующей системе.",
      "feature5Title": "Push-уведомления",
      "feature5Desc": "Прямое и персонализированное общение с вашими пользователями.",
      "feature6Title": "Постоянные обновления",
      "feature6Desc": "Поддержка, улучшения и регулярные обновления после запуска."
    },
    "marketing": {
      "title": "ЦИФРОВОЙ МАРКЕТИНГ",
      "tagline": "Развиваем бренды через данные и творчество.",
      "feature1Title": "Технический SEO",
      "feature1Desc": "Полная оптимизация для поисковых систем и органической видимости.",
      "feature2Title": "Google Ads",
      "feature2Desc": "PPC-кампании с максимальным ROI и точным таргетингом.",
      "feature3Title": "Meta Ads",
      "feature3Desc": "Реклама в Facebook и Instagram с реальным измеримым эффектом.",
      "feature4Title": "Социальные сети",
      "feature4Desc": "Активное присутствие и контент, генерирующий вовлечённость.",
      "feature5Title": "Email маркетинг",
      "feature5Desc": "Nurturing-кампании, превращающие подписчиков в лояльных клиентов.",
      "feature6Title": "Аналитика и отчёты",
      "feature6Desc": "Чёткие данные и обоснованные решения на основе реальных показателей."
    },
    "business": {
      "title": "БИЗНЕС-РЕШЕНИЯ",
      "tagline": "Автоматизируем и оптимизируем ваши операции.",
      "feature1Title": "Внедрение CRM",
      "feature1Desc": "Эффективное централизованное управление отношениями с клиентами.",
      "feature2Title": "ERP системы",
      "feature2Desc": "Автоматизация бизнес-процессов в любом масштабе.",
      "feature3Title": "Стратегический консалтинг",
      "feature3Desc": "Глубокий анализ и операционная оптимизация с чёткими результатами.",
      "feature4Title": "Автоматизации",
      "feature4Desc": "Умные рабочие процессы, устраняющие повторяющийся ручной труд.",
      "feature5Title": "Интеграции",
      "feature5Desc": "Бесшовное подключение к существующим системам и платформам.",
      "feature6Title": "Обучение и онбординг",
      "feature6Desc": "Ваша команда освоит новые системы с первого дня."
    },
    "design": {
      "title": "ДИЗАЙН И БРЕНДИНГ",
      "tagline": "Визуальная идентичность, которая остаётся в памяти.",
      "feature1Title": "Логотип и идентичность",
      "feature1Desc": "Запоминающийся бренд, отражающий ваши ценности.",
      "feature2Title": "UI/UX дизайн",
      "feature2Desc": "Красивые, функциональные интерфейсы, ориентированные на пользователя.",
      "feature3Title": "Brand Guidelines",
      "feature3Desc": "Полное руководство по бренду для тотальной визуальной согласованности.",
      "feature4Title": "Маркетинговые материалы",
      "feature4Desc": "Дизайны для всех каналов и носителей коммуникации.",
      "feature5Title": "Прототипирование",
      "feature5Desc": "Быстрое тестирование и проверка концепций дизайна перед исполнением.",
      "feature6Title": "Графический дизайн",
      "feature6Desc": "Эффектные визуальные материалы для любого случая и платформы."
    }
  }
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/messages/ro.json src/messages/en.json src/messages/ru.json
git commit -m "feat: add i18n translations for all inner pages (RO/EN/RU)"
```

---

## Task 4: Environment Setup + Contact Server Action

**Files:**
- Create: `.env.example`
- Create: `src/app/actions/contact.ts`

- [ ] **Step 1: Create `.env.example`**

```
# Telegram Bot Integration (contact form)
# 1. Create a bot via @BotFather on Telegram → get BOT_TOKEN
# 2. Send a message to your bot, then visit:
#    https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
#    Find your chat_id in the response
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

- [ ] **Step 2: Copy to `.env.local` and fill in real values**

```bash
cp .env.example .env.local
# Then open .env.local and add your real TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID
```

> `.env.local` is already in `.gitignore` — never commit it.

- [ ] **Step 3: Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` to GitHub repository secrets**

Go to: GitHub repo → Settings → Secrets and variables → Actions → New repository secret.
Add both `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.

Then update `.github/workflows/deploy.yml` to pass them to the deploy step:

```yaml
      - name: Deploy to Cloudflare Workers
        run: npx wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}
```

- [ ] **Step 4: Create `src/app/actions/contact.ts`**

```ts
"use server";

export type ContactState = {
  success: boolean;
  error?: string;
};

export async function submitContact(formData: FormData): Promise<ContactState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const service = (formData.get("service") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !service || !message) {
    return { success: false, error: "Completează toate câmpurile obligatorii." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Adresă de email invalidă." };
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return { success: false, error: "Configurare server incompletă." };
  }

  const text =
    `🔔 <b>Nou mesaj de contact — Uranium</b>\n\n` +
    `👤 <b>Nume:</b> ${name}\n` +
    `📧 <b>Email:</b> ${email}\n` +
    `📞 <b>Telefon:</b> ${phone || "—"}\n` +
    `🛠 <b>Serviciu:</b> ${service}\n\n` +
    `💬 <b>Mesaj:</b>\n${message}`;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
      }
    );
    if (!res.ok) {
      return { success: false, error: "Eroare la trimitere. Încearcă din nou." };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Eroare de rețea. Încearcă din nou." };
  }
}
```

- [ ] **Step 5: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add .env.example src/app/actions/contact.ts .github/workflows/deploy.yml
git commit -m "feat: add Telegram contact Server Action and env setup"
```

---

## Task 5: Pricing Page

**Files:**
- Create: `src/app/[locale]/preturi/PricingContent.tsx`
- Create: `src/app/[locale]/preturi/page.tsx`

- [ ] **Step 1: Create `src/app/[locale]/preturi/PricingContent.tsx`**

```tsx
"use client";
import { useTranslations } from "next-intl";
import { Tabs } from "@/components/ui/Tabs";
import { pricingData } from "@/data/pricing";
import Link from "next/link";
import { useLocale } from "next-intl";

export function PricingContent() {
  const t = useTranslations("pricing");
  const locale = useLocale();

  const tabs = [
    { key: "web", label: t("tab.web") },
    { key: "apps", label: t("tab.apps") },
    { key: "marketing", label: t("tab.marketing") },
    { key: "business", label: t("tab.business") },
    { key: "design", label: t("tab.design") },
  ];

  return (
    <Tabs tabs={tabs}>
      {(activeKey) => {
        const service = pricingData.find((s) => s.key === activeKey);
        if (!service) return null;
        return (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.items.map((item) => (
              <div
                key={item.name}
                className="flex flex-col justify-between rounded-3xl p-8"
                style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
              >
                <div>
                  <h3
                    className="text-xl font-black uppercase tracking-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="mt-1 text-xs uppercase tracking-widest"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {t("includes")}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                        <span className="mt-0.5 shrink-0 text-xs" style={{ color: "var(--color-accent)" }}>✓</span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <p className="text-3xl font-black" style={{ color: "var(--color-text-primary)" }}>
                    <span className="text-sm font-normal" style={{ color: "var(--color-text-muted)" }}>
                      {t("from")}{" "}
                    </span>
                    {item.priceFrom.toLocaleString("ro-RO")} €
                    {item.unit && (
                      <span className="text-sm font-normal" style={{ color: "var(--color-text-muted)" }}>
                        {item.unit}
                      </span>
                    )}
                  </p>
                  <Link
                    href={`/${locale}/contact`}
                    className="mt-4 block w-full rounded-lg py-3 text-center text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-80"
                    style={{ background: "var(--color-accent)", color: "#000" }}
                  >
                    {t("contactCta")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        );
      }}
    </Tabs>
  );
}
```

- [ ] **Step 2: Create `src/app/[locale]/preturi/page.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { PricingContent } from "./PricingContent";
import { CTASection } from "@/components/sections/CTASection";

export default function PricingPage() {
  const t = useTranslations("pricing");
  return (
    <>
      <PageHero
        label={t("label")}
        title={t("heading")}
        subtitle={t("subtitle")}
      />
      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <PricingContent />
        </div>
      </section>
      <CTASection />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: build succeeds, no TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/preturi/
git commit -m "feat: add pricing page with tabs and service subcategories"
```

---

## Task 6: Contact Page

**Files:**
- Create: `src/app/[locale]/contact/ContactForm.tsx`
- Create: `src/app/[locale]/contact/page.tsx`

- [ ] **Step 1: Create `src/app/[locale]/contact/ContactForm.tsx`**

```tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitContact } from "@/app/actions/contact";

type Status = "idle" | "pending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const inputStyle: React.CSSProperties = {
    background: "var(--color-bg-surface)",
    color: "var(--color-text-primary)",
    border: "1px solid var(--color-border)",
  };
  const inputClass =
    "w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-[var(--color-accent)]";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    const formData = new FormData(e.currentTarget);
    const result = await submitContact(formData);
    if (result.success) {
      setStatus("success");
    } else {
      setErrorMsg(result.error ?? t("errorGeneric"));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="mb-6 flex size-16 items-center justify-center rounded-full text-2xl font-bold"
          style={{ background: "var(--color-accent)", color: "#000" }}
        >
          ✓
        </div>
        <h3
          className="text-2xl font-black uppercase tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {t("successDesc")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          placeholder={t("namePlaceholder")}
          required
          className={inputClass}
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          required
          className={inputClass}
          style={inputStyle}
        />
      </div>
      <input
        name="phone"
        type="tel"
        placeholder={t("phonePlaceholder")}
        className={inputClass}
        style={inputStyle}
      />
      <select
        name="service"
        required
        className={inputClass}
        style={{ ...inputStyle, appearance: "none" as const }}
        defaultValue=""
      >
        <option value="" disabled>
          {t("servicePlaceholder")}
        </option>
        <option value="Dezvoltare Web">{t("serviceWeb")}</option>
        <option value="Aplicații">{t("serviceApps")}</option>
        <option value="Marketing Digital">{t("serviceMarketing")}</option>
        <option value="Soluții Business">{t("serviceBusiness")}</option>
        <option value="Design & Branding">{t("serviceDesign")}</option>
        <option value="Altul">{t("serviceOther")}</option>
      </select>
      <textarea
        name="message"
        rows={5}
        placeholder={t("messagePlaceholder")}
        required
        className={inputClass}
        style={inputStyle}
      />
      {status === "error" && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "pending"}
        className="w-full rounded-lg px-6 py-4 text-sm font-bold uppercase tracking-wide transition-opacity disabled:opacity-50"
        style={{ background: "var(--color-accent)", color: "#000" }}
      >
        {status === "pending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Create `src/app/[locale]/contact/page.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "./ContactForm";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
      <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </p>
      <p className="mt-1 text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
        {value}
      </p>
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  return (
    <>
      <PageHero
        label={t("label")}
        title={t("heading")}
        subtitle={t("subtitle")}
      />
      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Form */}
            <div>
              <ContactForm />
            </div>
            {/* Info */}
            <div className="pt-2">
              <InfoRow label={t("infoEmail")} value={t("infoEmailValue")} />
              <InfoRow label={t("infoPhone")} value={t("infoPhoneValue")} />
              <InfoRow label={t("infoHours")} value={t("infoHoursValue")} />
              <InfoRow label={t("infoAddress")} value={t("infoAddressValue")} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/contact/
git commit -m "feat: add contact page with Telegram form integration"
```

---

## Task 7: Portfolio Full Page

**Files:**
- Create: `src/app/[locale]/portofoliu/PortfolioGrid.tsx`
- Create: `src/app/[locale]/portofoliu/page.tsx`

- [ ] **Step 1: Create `src/app/[locale]/portofoliu/PortfolioGrid.tsx`**

```tsx
"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { projects } from "@/data/portfolio";
import type { ProjectCategory } from "@/data/portfolio";

type Filter = "all" | ProjectCategory;

export function PortfolioGrid() {
  const t = useTranslations("portfolioPage");
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "web", label: t("filterWeb") },
    { key: "apps", label: t("filterApps") },
    { key: "marketing", label: t("filterMarketing") },
    { key: "design", label: t("filterDesign") },
    { key: "business", label: t("filterBusiness") },
  ];

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={
              filter === f.key
                ? { background: "var(--color-accent)", color: "#000" }
                : { background: "var(--color-bg-surface)", color: "var(--color-text-muted)" }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-3xl"
            style={{ backgroundColor: project.color }}
          >
            <div className="aspect-[4/3] w-full" />
            <div className="flex items-end justify-between p-6">
              <div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-1 text-sm text-white/60">{project.categoryLabel}</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/[locale]/portofoliu/page.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { PortfolioGrid } from "./PortfolioGrid";

export default function PortfolioPage() {
  const t = useTranslations("portfolioPage");
  return (
    <>
      <PageHero
        label={t("label")}
        title={t("heading")}
        subtitle={t("subtitle")}
      />
      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <PortfolioGrid />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/[locale]/portofoliu/
git commit -m "feat: add portfolio page with category filtering"
```

---

## Task 8: About Page

**Files:**
- Create: `src/app/[locale]/despre/page.tsx`

- [ ] **Step 1: Create `src/app/[locale]/despre/page.tsx`**

```tsx
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";

const valueIcons = [
  // Award
  <svg key="award" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  // Zap
  <svg key="zap" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  // Lightbulb
  <svg key="bulb" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>,
  // Eye
  <svg key="eye" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
];

export default function AboutPage() {
  const t = useTranslations("aboutPage");

  const values = [
    { title: t("value1Title"), desc: t("value1Desc"), icon: valueIcons[0] },
    { title: t("value2Title"), desc: t("value2Desc"), icon: valueIcons[1] },
    { title: t("value3Title"), desc: t("value3Desc"), icon: valueIcons[2] },
    { title: t("value4Title"), desc: t("value4Desc"), icon: valueIcons[3] },
  ];

  const members = [
    { name: t("member1Name"), role: t("member1Role"), bg: "#1e3a8a" },
    { name: t("member2Name"), role: t("member2Role"), bg: "#065f46" },
    { name: t("member3Name"), role: t("member3Role"), bg: "#312e81" },
    { name: t("member4Name"), role: t("member4Role"), bg: "#1c1917" },
  ];

  return (
    <>
      <PageHero label={t("label")} title={t("heading")} subtitle={t("subtitle")} />

      {/* Mission */}
      <section className="py-24" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p
                className="mb-4 text-xs uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t("missionLabel")}
              </p>
              <p
                className="text-2xl font-bold leading-relaxed"
                style={{ color: "var(--color-text-primary)" }}
              >
                {t("missionText")}
              </p>
            </div>
            <div
              className="aspect-[4/3] rounded-3xl"
              style={{
                background: "linear-gradient(135deg, var(--color-card-from) 0%, var(--color-card-to) 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 border-t"
        style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}
      >
        <div className="section-container">
          <p
            className="mb-12 text-xs uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("valuesLabel")}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl p-8"
                style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
              >
                <div
                  className="mb-4 flex size-12 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-accent)", color: "#000" }}
                >
                  {v.icon}
                </div>
                <h3
                  className="mb-2 text-base font-black uppercase tracking-tight"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <p
            className="mb-12 text-xs uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("teamLabel")}
          </p>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {members.map((m) => (
              <div key={m.name} className="flex flex-col items-center text-center">
                <div
                  className="mb-4 size-24 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${m.bg} 0%, #000 100%)` }}
                />
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {m.name}
                </p>
                <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/despre/
git commit -m "feat: add about page with mission, values, and team sections"
```

---

## Task 9: Services Overview Page

**Files:**
- Create: `src/app/[locale]/servicii/page.tsx`

- [ ] **Step 1: Create `src/app/[locale]/servicii/page.tsx`**

```tsx
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";

const serviceKeys = [
  { key: "web", slug: "web" },
  { key: "apps", slug: "aplicatii" },
  { key: "marketing", slug: "marketing" },
  { key: "business", slug: "business" },
  { key: "design", slug: "design" },
] as const;

const reasonIcons = [
  <svg key="star" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  <svg key="zap" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="chart" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
];

export default function ServicesPage() {
  const t = useTranslations();
  const locale = useLocale();

  const reasons = [
    { title: t("serviciiPage.reason1Title"), desc: t("serviciiPage.reason1Desc"), icon: reasonIcons[0] },
    { title: t("serviciiPage.reason2Title"), desc: t("serviciiPage.reason2Desc"), icon: reasonIcons[1] },
    { title: t("serviciiPage.reason3Title"), desc: t("serviciiPage.reason3Desc"), icon: reasonIcons[2] },
  ];

  return (
    <>
      <PageHero
        label={t("serviciiPage.label")}
        title={t("serviciiPage.heading")}
        subtitle={t("serviciiPage.subtitle")}
      />

      {/* Services accordion-style list */}
      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
            {serviceKeys.map(({ key, slug }) => (
              <div
                key={key}
                className="flex items-center justify-between py-8"
              >
                <div>
                  <h2
                    className="text-3xl font-black uppercase tracking-tight md:text-4xl"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {t(`services.${key}` as "services.web")}
                  </h2>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {t(`services.${key}Desc` as "services.webDesc")}
                  </p>
                </div>
                <Link
                  href={`/${locale}/servicii/${slug}`}
                  className="ml-8 shrink-0 text-sm font-medium transition-colors"
                  style={{ color: "var(--color-accent)" }}
                >
                  {t("serviciiPage.learnMore")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Uranium */}
      <section
        className="py-24 border-t"
        style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}
      >
        <div className="section-container">
          <h2
            className="mb-12 text-4xl font-black uppercase tracking-tight md:text-5xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            {t("serviciiPage.whyTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="rounded-3xl p-8"
                style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
              >
                <div
                  className="mb-4 flex size-12 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-accent)", color: "#000" }}
                >
                  {r.icon}
                </div>
                <h3
                  className="mb-2 text-base font-black uppercase"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {r.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/servicii/page.tsx
git commit -m "feat: add services overview page with links to detail pages"
```

---

## Task 10: ServiceDetailTemplate

**Files:**
- Create: `src/components/sections/service/ServiceDetailTemplate.tsx`

- [ ] **Step 1: Create directory and file**

Create directory `src/components/sections/service/` and the file:

```tsx
import { useTranslations, useLocale } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { projects } from "@/data/portfolio";
import type { ProjectCategory } from "@/data/portfolio";

export type ServiceKey = "web" | "aplicatii" | "marketing" | "business" | "design";

const slugToCategory: Record<ServiceKey, ProjectCategory> = {
  web: "web",
  aplicatii: "apps",
  marketing: "marketing",
  business: "business",
  design: "design",
};

const featureIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

export function ServiceDetailTemplate({ serviceKey }: { serviceKey: ServiceKey }) {
  const t = useTranslations("serviceDetail");
  const locale = useLocale();

  const category = slugToCategory[serviceKey];
  const relatedProjects = projects.filter((p) => p.category === category).slice(0, 3);

  const features = Array.from({ length: 6 }, (_, i) => ({
    title: t(`${serviceKey}.feature${i + 1}Title` as `web.feature1Title`),
    desc: t(`${serviceKey}.feature${i + 1}Desc` as `web.feature1Desc`),
  }));

  const steps = [
    { num: "01", title: t("step1Title"), desc: t("step1Desc") },
    { num: "02", title: t("step2Title"), desc: t("step2Desc") },
    { num: "03", title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <>
      <PageHero
        title={t(`${serviceKey}.title` as "web.title")}
        subtitle={t(`${serviceKey}.tagline` as "web.tagline")}
      />

      {/* Features */}
      <section className="py-24" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <p
            className="mb-10 text-xs uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("featuresLabel")}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6"
                style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
              >
                <div
                  className="mb-3 flex size-10 items-center justify-center rounded-lg"
                  style={{ background: "var(--color-accent)", color: "#000" }}
                >
                  {featureIcon}
                </div>
                <h3
                  className="mb-1 text-sm font-black uppercase tracking-tight"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        className="py-24 border-t"
        style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}
      >
        <div className="section-container">
          <p
            className="mb-10 text-xs uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("processLabel")}
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6">
                <div
                  className="shrink-0 text-4xl font-black leading-none"
                  style={{ color: "var(--color-accent)" }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    className="mb-1 text-base font-black uppercase"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <section className="py-24" style={{ background: "var(--color-bg)" }}>
          <div className="section-container">
            <p
              className="mb-10 text-xs uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("portfolioLabel")}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="overflow-hidden rounded-3xl"
                  style={{ backgroundColor: project.color }}
                >
                  <div className="aspect-[4/3] w-full" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <p className="mt-1 text-sm text-white/60">{project.categoryLabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/service/
git commit -m "feat: add ServiceDetailTemplate shared component"
```

---

## Task 11: Service Detail Dynamic Route

**Files:**
- Create: `src/app/[locale]/servicii/[slug]/page.tsx`

- [ ] **Step 1: Create `src/app/[locale]/servicii/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import { ServiceDetailTemplate } from "@/components/sections/service/ServiceDetailTemplate";
import type { ServiceKey } from "@/components/sections/service/ServiceDetailTemplate";

const validSlugs: ServiceKey[] = ["web", "aplicatii", "marketing", "business", "design"];

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!validSlugs.includes(slug as ServiceKey)) notFound();
  return <ServiceDetailTemplate serviceKey={slug as ServiceKey} />;
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: build succeeds. Next.js will pre-render all 5 service × 3 locale = 15 static pages.

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/servicii/[slug]/
git commit -m "feat: add service detail dynamic route (web, aplicatii, marketing, business, design)"
```

- [ ] **Step 4: Push to GitHub to trigger deploy**

```bash
git push origin master
```

Expected: GitHub Actions runs, Cloudflare Workers deploy succeeds in ~75 seconds.

---

## Self-Review Checklist

- [x] **Spec coverage:** Prețuri ✅ | Contact + Telegram ✅ | Portofoliu + filters ✅ | Despre ✅ | Servicii overview ✅ | Service detail × 5 ✅
- [x] **Data types consistent:** `ProjectCategory` used in both `portfolio.ts` and `PortfolioGrid.tsx`. `ServiceKey` exported from `ServiceDetailTemplate` and imported in `[slug]/page.tsx`. `ServicePricing.key` matches `Tabs` key and translation key.
- [x] **No placeholders:** All code complete. All translations provided for RO/EN/RU.
- [x] **i18n keys consistent:** `t("pricing.tab.web")`, `t("serviceDetail.web.title")` — dot-notation matches JSON structure.
- [x] **Server/Client boundary correct:** PageHero (Server), Tabs (Client), PricingContent (Client), ContactForm (Client), PortfolioGrid (Client). All other pages are Server Components.
- [x] **Env vars documented:** `.env.example` created, GitHub Secrets updated in deploy workflow.
