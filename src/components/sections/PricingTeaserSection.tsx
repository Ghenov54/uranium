import { useLocale } from "next-intl";
import Link from "next/link";

const PACKAGES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    key: "web",
    label: { ro: "Dezvoltare Web", en: "Web Development", ru: "Веб-разработка" },
    from: "€800",
    unit: { ro: "per proiect", en: "per project", ru: "за проект" },
    items: {
      ro: ["Landing pages & site-uri", "Design responsiv", "SEO tehnic", "CMS inclus"],
      en: ["Landing pages & websites", "Responsive design", "Technical SEO", "CMS included"],
      ru: ["Лендинги и сайты", "Адаптивный дизайн", "Техническое SEO", "CMS включена"],
    },
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    key: "apps",
    label: { ro: "Aplicații Mobile", en: "Mobile Apps", ru: "Мобильные приложения" },
    from: "€3.000",
    unit: { ro: "per proiect", en: "per project", ru: "за проект" },
    items: {
      ro: ["iOS & Android", "Design nativ", "Push notifications", "Analytics integrat"],
      en: ["iOS & Android", "Native design", "Push notifications", "Integrated analytics"],
      ru: ["iOS & Android", "Нативный дизайн", "Push-уведомления", "Встроенная аналитика"],
    },
    featured: true,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    key: "marketing",
    label: { ro: "Marketing Digital", en: "Digital Marketing", ru: "Цифровой маркетинг" },
    from: "€500",
    unit: { ro: "pe lună", en: "per month", ru: "в месяц" },
    items: {
      ro: ["Google & Meta Ads", "SEO organic", "Email marketing", "Rapoarte lunare"],
      en: ["Google & Meta Ads", "Organic SEO", "Email marketing", "Monthly reports"],
      ru: ["Google & Meta Ads", "Органическое SEO", "Email-маркетинг", "Ежемесячные отчёты"],
    },
  },
];

export function PricingTeaserSection() {
  const locale = useLocale() as "ro" | "en" | "ru";

  return (
    <section
      className="border-t py-24"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg)" }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[var(--color-text-muted)]" />
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                {locale === "ru" ? "Инвестиция" : locale === "en" ? "Investment" : "Investiție"}
              </span>
            </div>
            <h2
              className="text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl lg:text-6xl"
              style={{ color: "var(--color-text-primary)" }}
            >
              {locale === "ru" ? "НАШИ ЦЕНЫ" : locale === "en" ? "OUR PRICING" : "PREȚURILE NOASTRE"}
            </h2>
          </div>
          <Link
            href={`/${locale}/preturi`}
            className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {locale === "ru" ? "Все тарифы" : locale === "en" ? "All pricing" : "Toate prețurile"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.key}
              className="relative flex flex-col rounded-3xl p-8 transition-transform hover:-translate-y-1"
              style={{
                background: pkg.featured
                  ? "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)"
                  : "var(--color-bg-surface)",
                border: pkg.featured ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--color-border)",
              }}
            >
              {pkg.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest"
                  style={{ background: "var(--color-accent)", color: "#000" }}
                >
                  {locale === "ru" ? "Популярно" : locale === "en" ? "Popular" : "Popular"}
                </div>
              )}

              <div
                className="mb-6 flex size-14 items-center justify-center rounded-2xl"
                style={{
                  background: pkg.featured ? "rgba(255,255,255,0.1)" : "var(--color-bg-elevated)",
                  color: pkg.featured ? "#fff" : "var(--color-accent)",
                }}
              >
                {pkg.icon}
              </div>

              <p
                className="mb-1 text-xs uppercase tracking-widest"
                style={{ color: pkg.featured ? "rgba(255,255,255,0.5)" : "var(--color-text-muted)" }}
              >
                {pkg.label[locale]}
              </p>

              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-xs" style={{ color: pkg.featured ? "rgba(255,255,255,0.5)" : "var(--color-text-muted)" }}>
                  {locale === "ru" ? "от" : locale === "en" ? "from" : "de la"}
                </span>
                <span
                  className="text-4xl font-black"
                  style={{ color: pkg.featured ? "#fff" : "var(--color-text-primary)" }}
                >
                  {pkg.from}
                </span>
                <span className="text-xs" style={{ color: pkg.featured ? "rgba(255,255,255,0.5)" : "var(--color-text-muted)" }}>
                  / {pkg.unit[locale]}
                </span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {pkg.items[locale].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ color: pkg.featured ? "var(--color-accent)" : "var(--color-accent)", flexShrink: 0 }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span style={{ color: pkg.featured ? "rgba(255,255,255,0.8)" : "var(--color-text-muted)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/contact`}
                className="block rounded-full py-3 text-center text-sm font-semibold transition-all"
                style={
                  pkg.featured
                    ? { background: "var(--color-accent)", color: "#000" }
                    : {
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-primary)",
                      }
                }
              >
                {locale === "ru" ? "Запросить предложение" : locale === "en" ? "Get a quote" : "Solicită ofertă"}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/preturi`}
            className="inline-flex items-center gap-3 rounded-full border px-10 py-4 text-sm font-semibold transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
          >
            {locale === "ru" ? "Смотреть все тарифы" : locale === "en" ? "See full pricing" : "Vezi prețuri complete"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
