import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { projects } from "@/data/portfolio";

export function PortfolioSection() {
  const t = useTranslations("portfolio");
  const locale = useLocale();

  return (
    <section className="py-24" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[var(--color-text-muted)]" />
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                {t("label")}
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase leading-tight tracking-tight text-[var(--color-text-primary)] md:text-5xl lg:text-6xl">
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
          {projects.slice(0, 4).map((project, i) => (
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
                  <p className="mt-1 text-sm text-white/60">{project.categoryLabel}</p>
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
