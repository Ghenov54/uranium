import { groq } from "next-sanity";

export const BLOG_CATEGORIES = ["web", "marketing", "tech", "business"] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/**
 * Posts carry free-form tags in three languages; this maps them onto four
 * stable categories. The first category whose keywords match any tag wins.
 */
const KEYWORDS: Record<BlogCategory, string[]> = {
  web: ["web design", "ui", "ux", "design", "css", "next.js", "react", "web development", "веб", "дизайн", "mobile", "мобильн"],
  marketing: ["marketing", "маркетинг", "seo", "e-commerce", "электронная коммерция", "lead", "лидоген", "google"],
  tech: ["ai", "ии", "automat", "автоматиз", "cloud", "облако", "devops", "blockchain", "блокчейн", "iot", "securit", "безопасн", "data", "данн", "api", "rpa"],
  business: ["business", "бизнес", "startup", "стартап", "imm", "sme", "мсп", "digital", "цифров", "remote", "удалён", "agenți", "agency", "агентств"],
};

export function categoryOf(tags: string[] | null | undefined): BlogCategory {
  const t = (tags ?? []).map((x) => x.toLowerCase());
  for (const c of BLOG_CATEGORIES) {
    // Short keywords (ai, ui, ux, seo) must match a whole tag; longer ones may match inside a tag.
    if (t.some((tag) => KEYWORDS[c].some((k) => (k.length <= 3 ? tag === k : tag.includes(k))))) return c;
  }
  return "business";
}

export const isCategory = (v: unknown): v is BlogCategory => typeof v === "string" && (BLOG_CATEGORIES as readonly string[]).includes(v);

/** Posts for one locale, with a character count of the body for reading time. */
export const BLOG_LIST_QUERY = groq`
  *[_type == "post" && defined(slug.current) && (language == $locale || !defined(language))]
  | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, publishedAt, tags,
    "chars": length(pt::text(body))
  }
`;

/** Minutes at roughly 1,000 characters a minute (about 200 words). */
export const readMinutes = (chars: number | null | undefined) => (chars ? Math.max(1, Math.round(chars / 1000)) : null);
