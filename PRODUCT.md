# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Business owners and marketing leads choosing a digital agency. Two audiences, confirmed by the owner:

- Companies in Moldova (SMEs and established local businesses), reading in Romanian or Russian.
- International clients (startups and companies from the EU/US), reading in English. The local market is the base; international work is a growth target.

Their job on the site: decide whether Uranium can be trusted with their website, app, marketing or brand, and start a conversation.

## Product Purpose

Marketing and presentation site for Uranium, a digital agency. Success means a visitor reaches the contact form or pricing page and submits a request.

## Positioning

Full-service digital agency under one roof: web development, apps, digital marketing, business solutions (automation, CRM, ERP) and design and branding. Serves both the local Moldovan market and international clients in three languages.

## Operating Context

- Locales: `ro` (default), `en`, `ru` via next-intl; all copy must work in all three, including longer Russian strings.
- Content (services, portfolio, team, pricing, blog, home hero copy) is managed in Sanity and changes without deploys.
- Contact form delivers leads (Telegram worker). An FAQ chat widget exists on home and contact.

## Capabilities and Constraints

- Next.js 16 App Router, Tailwind v4, deployed on Cloudflare Workers via OpenNext. Pages are force-dynamic.
- Routes: home, servicii (with per-service pages), portofoliu (with detail pages and lightbox), preturi, despre, blog (list and article), contact.
- Must stay fast and consistent across macOS/Windows/mobile browsers (previous work fixed cross-platform blur and blend-mode issues).

## Brand Commitments

- Name: Uranium. The owner has given full freedom on colors, typography and visual style; no existing visual asset is binding.

## Evidence on Hand

- Real: portfolio projects and images in Sanity, service list, pricing, team members, blog posts in three languages.
- Only partially real: the numbers and claims currently on the site (years of experience, countries, projects delivered, awards, satisfaction rates, testimonials). OPEN: the owner must confirm which are real. Until then, do not feature or invent specific numbers, awards or quotes.

## Product Principles

1. Show the work first. Real portfolio work carries more trust than claims.
2. Never invent proof. Numbers, awards and testimonials appear only once confirmed.
3. One clear path to contact from every page.
4. Equal quality in all three languages.
