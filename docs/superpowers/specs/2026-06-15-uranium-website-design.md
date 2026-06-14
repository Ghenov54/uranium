# Uranium — Website Design Spec
**Data:** 2026-06-15
**Status:** Aprobat

---

## 1. Rezumat

Site de prezentare pentru agenția digitală **Uranium**, care oferă servicii de web, aplicații, marketing, business și design. Adresat startup-urilor, IMM-urilor și clienților internaționali. Disponibil în 3 limbi: Română (default), Engleză, Rusă.

---

## 2. Stack Tehnic

| Componentă | Tehnologie |
|-----------|-----------|
| Framework | Next.js 15 (App Router) |
| Limbaj | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | Sanity (headless) |
| i18n | next-intl |
| Dark/Light | next-themes |
| Deploy | Cloudflare Pages |
| Repo | GitHub |
| Font | Inter (Google Fonts / self-hosted) |

---

## 3. Design System

### 3.1 Culori

```css
/* Dark Mode (default) */
--color-bg:           #000000;
--color-bg-surface:   #111827;
--color-bg-card:      linear-gradient(135deg, #1e3a8a, #000000);
--color-accent:       #d4ff37;
--color-text-primary: #ffffff;
--color-text-muted:   rgba(255, 255, 255, 0.6);
--color-border:       rgba(255, 255, 255, 0.1);

/* Light Mode */
--color-bg:           #ffffff;
--color-bg-surface:   #f8f8f8;
--color-bg-card:      linear-gradient(135deg, #1e3a8a, #2563eb);
--color-accent:       #d4ff37;
--color-text-primary: #111827;
--color-text-muted:   #6b7280;
--color-border:       #f3f4f6;
```

### 3.2 Tipografie

| Rol | Mărime | Greutate | Note |
|-----|--------|----------|------|
| Display / Hero | 72–96px | Black 900 | Uppercase |
| H1 | 60px | Black 900 | Uppercase, letter-spacing -3px |
| H2 | 48px | Black 900 | |
| H3 | 30–36px | Bold 700 | |
| Body | 16–18px | Regular 400 | |
| Caption / Badge | 12–14px | Medium 500 | Uppercase |

### 3.3 Spațiere & Formă

- **Max width:** 1400px, padding lateral 32px
- **Border radius:** 8px (butoane), 24px (carduri), 9999px (badges/pills)
- **Gap scale:** 8 · 16 · 24 · 32 · 48 · 64 · 80 · 96px

---

## 4. Structura de Fișiere

```
uranium/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx                    # Home
│   │   │   ├── servicii/
│   │   │   │   ├── page.tsx                # Pagina generală servicii
│   │   │   │   ├── web/page.tsx
│   │   │   │   ├── aplicatii/page.tsx
│   │   │   │   ├── marketing/page.tsx
│   │   │   │   ├── business/page.tsx
│   │   │   │   └── design/page.tsx
│   │   │   ├── portofoliu/page.tsx
│   │   │   ├── despre/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── preturi/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── layout.tsx                      # Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── IntroSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── PortfolioSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CTASection.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── ServiceCard.tsx
│   │       ├── ProjectCard.tsx
│   │       ├── StatCounter.tsx
│   │       ├── TestimonialSlider.tsx
│   │       ├── LanguageSwitcher.tsx
│   │       ├── ThemeToggle.tsx
│   │       └── NewsletterForm.tsx
│   ├── lib/
│   │   ├── sanity.client.ts
│   │   ├── sanity.queries.ts
│   │   └── i18n.ts
│   ├── messages/
│   │   ├── ro.json
│   │   ├── en.json
│   │   └── ru.json
│   └── styles/
│       └── tokens.css
├── sanity/
│   ├── schemas/
│   │   ├── project.ts
│   │   ├── service.ts
│   │   ├── blogPost.ts
│   │   ├── testimonial.ts
│   │   ├── teamMember.ts
│   │   └── siteSettings.ts
│   └── sanity.config.ts
└── public/
    └── fonts/
```

---

## 5. Pagini & Secțiuni Home

| # | Secțiune | Descriere |
|---|----------|-----------|
| 1 | **HeroSection** | Imagine/video full-screen, tagline animat, buton CTA primar |
| 2 | **IntroSection** | Heading bold + 3 carduri gradient (Award Winning, Fast Delivery, Growth Focused) |
| 3 | **ServicesSection** | 5 rânduri expandabile: Web · Aplicații · Marketing · Business · Design |
| 4 | **PortfolioSection** | Grid 2×2 cu 4 proiecte recente, link "Vezi toate" |
| 5 | **StatsSection** | 4 contoare animate: Ani · Proiecte · Clienți · Satisfacție |
| 6 | **AboutSection** | Foto echipă + Mission card + mini-stats |
| 7 | **TestimonialsSection** | Slider testimoniale cu foto client |
| 8 | **CTASection** | Text mare + buton contact |
| 9 | **Footer** | Logo · Servicii · Company · Newsletter |

---

## 6. Navbar

- **Logo:** wordmark "URANIUM." (text, alb pe negru) — placeholder până la logo final
- **Linkuri:** Servicii · Portofoliu · Despre · Blog · Prețuri · Contact
- **Dreapta:** LanguageSwitcher (RO/EN/RU) + ThemeToggle + Button CTA ("Start a project")
- **Comportament scroll:** transparent → opac cu `backdrop-blur`
- **Mobile:** hamburger menu cu drawer lateral

---

## 7. Internaționalizare (i18n)

- **Librărie:** next-intl
- **Limbi:** `ro` (default) · `en` · `ru`
- **URL scheme:** `/ro/servicii` · `/en/services` · `/ru/uslugi`
- **Detecție:** Accept-Language header la prima vizită, fallback `ro`
- **Conținut static (UI):** fișiere JSON în `messages/`
- **Conținut dinamic (blog, proiecte):** câmpuri multilingv în Sanity

---

## 8. CMS — Sanity

### Scheme

| Schema | Câmpuri cheie |
|--------|--------------|
| `project` | titlu[ro/en/ru] · descriere · categorie · imagini · link · an |
| `service` | titlu[ro/en/ru] · descriere · features · icon · slug |
| `blogPost` | titlu[ro/en/ru] · slug · autor · dată · body (portable text) · cover |
| `testimonial` | citat[ro/en/ru] · autor · companie · foto · rating (1–5) |
| `teamMember` | nume · rol[ro/en/ru] · bio[ro/en/ru] · foto · social links |
| `siteSettings` | tagline[ro/en/ru] · email · telefon · social links |

### Revalidare
- Blog posts: ISR cu `revalidate: 3600` (1 oră)
- Proiecte & testimoniale: on-demand revalidation prin Sanity webhook

---

## 9. Dark / Light Mode

- **Librărie:** next-themes
- **Default:** dark mode
- **Implementare:** CSS variables switchate via `[data-theme="light"]` pe `<html>`
- **Persistare:** localStorage
- **Toggle:** iconiță în navbar (soare → lună)

---

## 10. Responsive

| Breakpoint | Lățime | Layout |
|-----------|--------|--------|
| Mobile | < 768px | 1 coloană, hamburger nav |
| Tablet | 768–1024px | 2 coloane, nav condensat |
| Desktop | > 1024px | Layout complet, max-width 1400px |

---

## 11. Hero — Animație (faza 2)

La lansarea demo: imagine statică full-screen cu overlay gradient.
Faza 2: video/GIF animat cu efect parallax la scroll (implementat după validarea demo-ului).

---

## 12. Referințe

- **Figma design:** https://www.figma.com/design/vLsct7tE5q4xGH8EzermeN/Uranium.io
- **Design inspirat din:** Stitch AI generated design (referință vizuală pentru layout și tonalitate)
- **Referințe conținut web:** colorlib.com/wp/digital-agency-website-examples, designrush.com
