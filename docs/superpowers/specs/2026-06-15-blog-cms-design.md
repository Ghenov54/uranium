# Blog + Full Site CMS — Plan 3 Design Spec

## Goal

Integrate Sanity CMS to power all editable site content (homepage, services, portfolio, team, pricing, footer) and add a full blog with RO/EN/RU support. All content manageable from Sanity Studio embedded at `/studio`.

## Architecture

**CMS:** Sanity v3 with `@sanity/document-internationalization` for blog posts. All other schemas use inline locale fields `{ ro, en, ru }`.

**Studio:** Embedded in Next.js at `/studio/[[...tool]]` — client-side SPA only (`"use client"`, `dynamic = "force-dynamic"`). Protected by Sanity auth (Google/GitHub login configured in sanity.io project settings).

**Data flow:** Next.js pages fetch via GROQ queries using `@sanity/client` with CDN. All pages remain statically generated (`generateStaticParams`). On Sanity publish → webhook → GitHub Actions `repository_dispatch` → redeploy Cloudflare Workers (~2-3 min delay).

**Tech stack:** `next-sanity`, `@sanity/client`, `@sanity/document-internationalization`, `@portabletext/react`, `@sanity/image-url`, `sanity`

---

## File Structure

### New files
```
sanity.config.ts                              ← Sanity project config + schema registration
src/sanity/
  client.ts                                   ← Sanity client (CDN + server)
  schemas/
    localeString.ts                           ← {ro, en, ru} short text type
    localeText.ts                             ← {ro, en, ru} multiline text type
    post.ts                                   ← Blog post schema (i18n plugin)
    blockContent.ts                           ← Portable Text block definitions
    siteSettings.ts                           ← Singleton: logo, contact, socials, footer
    homePage.ts                               ← Singleton: hero, section labels
    portfolioItem.ts                          ← Portfolio project documents
    serviceItem.ts                            ← Service documents
    teamMember.ts                             ← Team member documents
    pricingService.ts                         ← Pricing service + items documents
    index.ts                                  ← Exports all schemas as array
  queries/
    posts.ts                                  ← GROQ queries for blog
    site.ts                                   ← GROQ queries for siteSettings + homePage
    portfolio.ts                              ← GROQ queries for portfolioItem
    services.ts                               ← GROQ queries for serviceItem
    team.ts                                   ← GROQ queries for teamMember
    pricing.ts                                ← GROQ queries for pricingService
  lib/
    image.ts                                  ← urlFor() helper using @sanity/image-url
  structure.ts                                ← Custom Studio desk structure
src/app/
  studio/
    [[...tool]]/
      page.tsx                                ← Studio embedded route
  [locale]/
    blog/
      page.tsx                                ← Blog list page (Server Component)
      [slug]/
        page.tsx                              ← Article page (Server Component)
        ArticleSidebar.tsx                    ← Related articles (Server Component)
src/components/ui/
  PortableText.tsx                            ← @portabletext/react renderer
```

### Modified files
```
src/app/[locale]/page.tsx                     ← Fetch hero + services + portfolio from Sanity
src/app/[locale]/portofoliu/
  PortfolioGrid.tsx                           ← Fetch portfolioItems from Sanity
src/app/[locale]/servicii/
  page.tsx                                    ← Fetch serviceItems from Sanity
  [slug]/page.tsx                             ← Fetch single serviceItem from Sanity
src/components/sections/
  ServiceDetailTemplate.tsx                   ← Fetch from Sanity instead of portfolio.ts
  PortfolioSection.tsx                        ← Fetch portfolioItems from Sanity
src/app/[locale]/despre/page.tsx              ← Fetch teamMembers from Sanity
src/app/[locale]/preturi/
  PricingContent.tsx                          ← Fetch pricingServices from Sanity
src/components/layout/Footer.tsx              ← Fetch siteSettings from Sanity
src/app/actions/contact.ts                    ← Email/phone from siteSettings (optional)
.env.example                                  ← Add Sanity env vars
.github/workflows/deploy.yml                  ← Add Sanity env vars to deploy step
```

### Deleted files
```
src/data/portfolio.ts                         ← Replaced by portfolioItem Sanity schema
src/data/pricing.ts                           ← Replaced by pricingService Sanity schema
```

---

## Schemas

### localeString (helper type)
```ts
// src/sanity/schemas/localeString.ts
export const localeString = {
  name: "localeString",
  type: "object",
  fields: [
    { name: "ro", type: "string", title: "Română" },
    { name: "en", type: "string", title: "English" },
    { name: "ru", type: "string", title: "Русский" },
  ],
};
```

### localeText (helper type)
```ts
// src/sanity/schemas/localeText.ts
export const localeText = {
  name: "localeText",
  type: "object",
  fields: [
    { name: "ro", type: "text", title: "Română" },
    { name: "en", type: "text", title: "English" },
    { name: "ru", type: "text", title: "Русский" },
  ],
};
```

### blockContent
```ts
// src/sanity/schemas/blockContent.ts
export const blockContent = {
  name: "blockContent",
  type: "array",
  of: [
    {
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            fields: [{ name: "href", type: "url" }],
          },
        ],
      },
    },
    { type: "image", options: { hotspot: true } },
  ],
};
```

### post
```ts
// src/sanity/schemas/post.ts
export const post = {
  name: "post",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (R) => R.required() },
    { name: "slug", type: "slug", options: { source: "title" }, validation: (R) => R.required() },
    { name: "language", type: "string", readOnly: true, hidden: true }, // set by i18n plugin
    { name: "excerpt", type: "text", rows: 3 },                        // ~160 chars, SEO meta
    { name: "mainImage", type: "image", options: { hotspot: true } },
    { name: "body", type: "blockContent" },
    { name: "publishedAt", type: "datetime" },
    { name: "tags", type: "array", of: [{ type: "string" }] },         // for filtering + related
  ],
};
```
i18n plugin creates separate documents per locale linked by `__i18n_refs`. Studio shows "Translations" tab.

### siteSettings (singleton)
```ts
// src/sanity/schemas/siteSettings.ts
fields: [
  { name: "logoText", type: "string" },                    // "URANIUM."
  { name: "tagline", type: "localeString" },               // footer tagline
  { name: "email", type: "string" },                       // contact@uranium.md
  { name: "phone", type: "string" },                       // +373 XX XXX XXX
  { name: "address", type: "localeString" },               // Chișinău, Moldova
  { name: "workingHours", type: "localeString" },          // Luni-Vineri, 9:00-18:00
  { name: "linkedinUrl", type: "url" },
  { name: "twitterUrl", type: "url" },
  { name: "instagramUrl", type: "url" },
]
```

### homePage (singleton)
```ts
// src/sanity/schemas/homePage.ts
fields: [
  { name: "heroTitle", type: "localeString" },             // "Agenție Digitală"
  { name: "heroSubtitle", type: "localeText" },
  { name: "heroCta", type: "localeString" },               // "Începe proiectul"
  { name: "servicesLabel", type: "localeString" },         // "Servicii"
  { name: "servicesHeading", type: "localeString" },       // "CE FACEM"
  { name: "portfolioLabel", type: "localeString" },
  { name: "portfolioHeading", type: "localeString" },
  { name: "ctaTitle", type: "localeString" },
  { name: "ctaSubtitle", type: "localeText" },
  { name: "ctaButton", type: "localeString" },
]
```

### portfolioItem
```ts
// src/sanity/schemas/portfolioItem.ts
fields: [
  { name: "title", type: "localeString", validation: (R) => R.required() },
  { name: "category", type: "string", options: { list: ["web","apps","marketing","design","business"] } },
  { name: "categoryLabel", type: "localeString" },
  { name: "mainImage", type: "image", options: { hotspot: true } },
  { name: "color", type: "string" },                       // fallback hex if no image
  { name: "order", type: "number" },                       // for sorting
]
```

### serviceItem
```ts
// src/sanity/schemas/serviceItem.ts
fields: [
  { name: "name", type: "localeString", validation: (R) => R.required() },
  { name: "slug", type: "slug", options: { source: "name.ro" }, validation: (R) => R.required() },
  // slug values must be: web | aplicatii | marketing | business | design
  { name: "tagline", type: "localeString" },
  { name: "description", type: "localeText" },
  { name: "tags", type: "array", of: [{ type: "string" }] },     // ["React", "Next.js", ...]
  { name: "features", type: "array", of: [{
    type: "object",
    fields: [
      { name: "title", type: "localeString" },
      { name: "description", type: "localeText" },
    ],
  }], validation: (R) => R.max(6) },                              // max 6 features
  { name: "order", type: "number" },
]
```

### teamMember
```ts
// src/sanity/schemas/teamMember.ts
fields: [
  { name: "name", type: "string", validation: (R) => R.required() },
  { name: "role", type: "localeString" },
  { name: "bio", type: "localeText" },
  { name: "photo", type: "image", options: { hotspot: true } },
  { name: "order", type: "number" },
]
```

### pricingService
```ts
// src/sanity/schemas/pricingService.ts
fields: [
  { name: "key", type: "string", options: { list: ["web","apps","marketing","business","design"] } },
  { name: "items", type: "array", of: [{
    type: "object",
    fields: [
      { name: "name", type: "localeString" },
      { name: "includes", type: "array", of: [{ type: "localeString" }] },
      { name: "priceFrom", type: "number" },
      { name: "unit", type: "localeString" },              // "/lună", "/oră", or empty
    ],
  }]},
  { name: "order", type: "number" },
]
```

---

## GROQ Queries

### posts.ts
```ts
// All posts for locale (list page)
export const POSTS_QUERY = groq`
  *[_type == "post" && language == $locale && defined(slug.current)]
  | order(publishedAt desc)[0...20] {
    _id, title, slug, excerpt, mainImage, publishedAt, tags, language
  }
`;

// Single post by slug + locale
export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug && language == $locale][0] {
    _id, title, slug, excerpt, mainImage, body, publishedAt, tags
  }
`;

// Related posts (same tags, same locale, excluding current)
export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && language == $locale && slug.current != $slug
    && count((tags[])[@ in $tags]) > 0]
  | order(publishedAt desc)[0...3] {
    _id, title, slug, excerpt, mainImage, publishedAt, tags
  }
`;

// All slugs for generateStaticParams
export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] { slug, language }
`;
```

### site.ts
```ts
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    logoText, tagline, email, phone, address, workingHours,
    linkedinUrl, twitterUrl, instagramUrl
  }
`;

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0] {
    heroTitle, heroSubtitle, heroCta,
    servicesLabel, servicesHeading,
    portfolioLabel, portfolioHeading,
    ctaTitle, ctaSubtitle, ctaButton
  }
`;
```

### portfolio.ts
```ts
export const PORTFOLIO_ITEMS_QUERY = groq`
  *[_type == "portfolioItem"] | order(order asc) {
    _id, title, category, categoryLabel, mainImage, color
  }
`;
```

### services.ts
```ts
export const SERVICE_ITEMS_QUERY = groq`
  *[_type == "serviceItem"] | order(order asc) {
    _id, name, slug, tagline, description, tags, features
  }
`;

export const SERVICE_ITEM_QUERY = groq`
  *[_type == "serviceItem" && slug.current == $slug][0] {
    _id, name, slug, tagline, description, tags, features
  }
`;

export const SERVICE_SLUGS_QUERY = groq`
  *[_type == "serviceItem" && defined(slug.current)] { slug }
`;
```

### team.ts
```ts
export const TEAM_QUERY = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id, name, role, bio, photo
  }
`;
```

### pricing.ts
```ts
export const PRICING_QUERY = groq`
  *[_type == "pricingService"] | order(order asc) {
    _id, key, items
  }
`;
```

---

## Reading locale fields in Next.js

All pages use `await getLocale()` (async Server Components) or `useLocale()` (Client Components) to get the current locale, then access the locale field from Sanity data:

```ts
// Server Component pattern
const locale = await getLocale(); // "ro" | "en" | "ru"
const data = await client.fetch(HOME_PAGE_QUERY);
const title = data.heroTitle?.[locale] ?? data.heroTitle?.ro ?? "";
```

Helper function in `src/sanity/lib/locale.ts`:
```ts
export function t(field: Record<string, string> | null | undefined, locale: string): string {
  if (!field) return "";
  return field[locale] ?? field.ro ?? "";
}
```

Used as: `t(item.name, locale)` throughout all pages.

---

## Page Designs

### Blog List (`/{locale}/blog`)
- `PageHero` — title from `blog.title` i18n key, subtitle from `blog.subtitle`
- Horizontal list: `<article>` per post
  - Left: `mainImage` (aspect 16/9, ~320px wide, via `urlFor().width(640).url()`)
  - Right: tag pill (accent color) + `<h2>` title + `<p>` excerpt + date formatted with `Intl.DateTimeFormat(locale)`
- Empty state: i18n key `blog.noPosts`

### Blog Article (`/{locale}/blog/[slug]`)
- Hero: `mainImage` full-width (aspect 21/9 on desktop), fallback solid accent bg
- Below hero: `<h1>` title + excerpt + date + tags
- 2-col layout (lg): `PortableText` body (col-span 2/3) + `ArticleSidebar` (col-span 1/3, sticky)
- `ArticleSidebar`: "Articole similare" heading + 3 post cards (image + title + date)
- SEO: `generateMetadata` using `title` + `excerpt` as description + `mainImage`

### Studio (`/studio/[[...tool]]`)
```tsx
// src/app/studio/[[...tool]]/page.tsx
"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
export const dynamic = "force-dynamic";
export default function StudioPage() {
  return <NextStudio config={config} />;
}
```

**IMPORTANT — middleware fix required:** `src/middleware.ts` matcher must exclude `studio` to prevent next-intl from redirecting `/studio` to `/ro/studio`:
```ts
// src/middleware.ts
export const config = {
  matcher: ["/((?!_next|_vercel|studio|.*\\..*).*)"],
};
```

---

## Sanity Config

```ts
// sanity.config.ts
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { documentInternationalization } from "@sanity/document-internationalization";
import { structure } from "./src/sanity/structure";
import { schema } from "./src/sanity/schemas";

export default defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [
    structureTool({ structure }),
    documentInternationalization({
      supportedLanguages: [
        { id: "ro", title: "Română" },
        { id: "en", title: "English" },
        { id: "ru", title: "Русский" },
      ],
      schemaTypes: ["post"],
    }),
  ],
  schema,
});
```

---

## Studio Structure (`src/sanity/structure.ts`)

Custom desk structure to organize content by section:
- 📝 **Blog** — list of posts (grouped by language)
- 🏠 **Homepage** — singleton editor
- ⚙️ **Site Settings** — singleton editor
- 💼 **Portofoliu** — portfolioItem list
- 🛠️ **Servicii** — serviceItem list
- 👥 **Echipă** — teamMember list
- 💰 **Prețuri** — pricingService list

---

## Sanity Client

```ts
// src/sanity/client.ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
```

---

## Webhook → GitHub Actions Redeploy

In Sanity project → API → Webhooks:
- **URL:** `https://api.github.com/repos/[owner]/[repo]/dispatches`
- **HTTP method:** POST
- **Headers:** `Authorization: Bearer [GITHUB_PAT]`, `Content-Type: application/json`
- **Body:** `{"event_type": "sanity-publish"}`
- **Trigger on:** Create, Update, Publish

In `.github/workflows/deploy.yml`, add trigger:
```yaml
on:
  push:
    branches: [master]
  repository_dispatch:
    types: [sanity-publish]
```

---

## Environment Variables

```bash
# .env.local (never committed)
NEXT_PUBLIC_SANITY_PROJECT_ID=           # from sanity.io > project settings
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=                   # from sanity.io > API > Tokens (read-only)
SANITY_WEBHOOK_SECRET=                   # optional, for verifying webhook signature
```

All 4 added to GitHub repo secrets and `.github/workflows/deploy.yml` env block.

---

## i18n Translations (new keys)

New top-level key `blog` added to `src/messages/ro.json`, `en.json`, `ru.json`:
```json
{
  "blog": {
    "title": "BLOG",
    "subtitle": "Idei, ghiduri și perspective din lumea digitală.",
    "readMore": "Citește mai mult",
    "noPosts": "Nu există articole momentan.",
    "relatedArticles": "Articole similare",
    "publishedOn": "Publicat pe"
  }
}
```

---

## Data Migration Notes

When Sanity project is first created, data must be seeded manually in Studio before site deploys:
- Create 1 `siteSettings` document with contact info
- Create 1 `homePage` document with hero content
- Create 8 `portfolioItem` documents (matching current hardcoded data from `portfolio.ts`)
- Create 5 `serviceItem` documents (web, aplicatii, marketing, business, design)
- Create 4 `teamMember` documents
- Create 5 `pricingService` documents (matching current hardcoded data from `pricing.ts`)

Until seeded, pages fall back to empty strings (safe — no crashes, just blank fields visible in production).
