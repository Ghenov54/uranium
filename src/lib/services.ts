type Localized = Record<string, string | null | undefined> | null;

export type ServiceRow = {
  _id: string;
  name: Localized;
  description: Localized;
  tags: string[] | null;
  slug: { current: string } | null;
};

/** Used only when Sanity returns no services. */
export const FALLBACK_SERVICES: ServiceRow[] = [
  { _id: "web", name: { ro: "Dezvoltare Web", en: "Web Development", ru: "Веб-разработка" }, slug: { current: "web" }, description: { ro: "Site-uri de prezentare, landing page-uri și e-commerce de înaltă performanță.", en: "High-performance websites, landing pages and e-commerce.", ru: "Сайты, лендинги и интернет-магазины с высокой производительностью." }, tags: ["Next.js", "E-Commerce", "Landing Pages"] },
  { _id: "apps", name: { ro: "Aplicații", en: "Applications", ru: "Приложения" }, slug: { current: "aplicatii" }, description: { ro: "Web apps, aplicații mobile și software custom.", en: "Web apps, mobile apps and custom software.", ru: "Веб-приложения, мобильные приложения и кастомное ПО." }, tags: ["iOS", "Android", "Web App"] },
  { _id: "marketing", name: { ro: "Marketing Digital", en: "Digital Marketing", ru: "Цифровой маркетинг" }, slug: { current: "marketing" }, description: { ro: "SEO, social media, Google/Meta Ads și strategii de creștere.", en: "SEO, social media, Google/Meta Ads and growth strategy.", ru: "SEO, соцсети, Google/Meta Ads и стратегии роста." }, tags: ["SEO", "Google Ads", "Meta Ads"] },
  { _id: "business", name: { ro: "Soluții Business", en: "Business Solutions", ru: "Бизнес-решения" }, slug: { current: "business" }, description: { ro: "Consultanță, automatizări, CRM și ERP personalizate.", en: "Consulting, automation, CRM and custom ERP.", ru: "Консалтинг, автоматизация, CRM и ERP." }, tags: ["CRM", "ERP", "Automation"] },
  { _id: "design", name: { ro: "Design & Branding", en: "Design & Branding", ru: "Дизайн и брендинг" }, slug: { current: "design" }, description: { ro: "Identitate vizuală, UI/UX design și branding complet.", en: "Visual identity, UI/UX design and full branding.", ru: "Визуальная идентичность, UI/UX и брендинг." }, tags: ["UI/UX", "Branding", "Identity"] },
];
