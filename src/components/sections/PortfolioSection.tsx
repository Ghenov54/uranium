import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { t as tLocale } from "@/sanity/lib/locale";
import { urlFor } from "@/sanity/lib/image";

type SanityPortfolioItem = {
  _id: string;
  title: Record<string, string | null | undefined> | null;
  categoryLabel: Record<string, string | null | undefined> | null;
  mainImage?: { asset?: { _ref?: string } } | null;
  color?: string | null;
  slug?: { current: string } | null;
};

type Props = { projects?: SanityPortfolioItem[] };

export function PortfolioSection({ projects }: Props) {
  const t = useTranslations("portfolio");
  const locale = useLocale();
  const displayed = (projects ?? []).slice(0, 6);

  const itemHref = (p: SanityPortfolioItem) =>
    p.slug?.current ? `/${locale}/portofoliu/${p.slug.current}` : `/${locale}/portofoliu`;

  return (
    <section className="py-24" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
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
            className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("seeAll")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* Featured first item — full width */}
        {displayed[0] && (() => {
          const p = displayed[0];
          const img = p.mainImage?.asset?._ref
            ? urlFor(p.mainImage).width(1400).height(700).url()
            : null;
          return (
            <Link
              href={itemHref(p)}
              className="group relative mb-6 block overflow-hidden rounded-3xl"
              style={{ minHeight: 480, backgroundColor: p.color ?? "#1e3a8a" }}
            >
              {img && (
                <img
                  src={img}
                  alt={tLocale(p.title, locale) ?? ""}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-end justify-between p-8 md:p-12">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-widest text-white/60">
                    {tLocale(p.categoryLabel, locale)}
                  </p>
                  <h3 className="text-3xl font-black uppercase text-white md:text-4xl lg:text-5xl">
                    {tLocale(p.title, locale)}
                  </h3>
                </div>
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-black">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
            </Link>
          );
        })()}

        {/* Remaining items — 2 col grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {displayed.slice(1).map((project, i) => {
            const bgImage = project.mainImage?.asset?._ref
              ? urlFor(project.mainImage).width(800).height(560).url()
              : null;
            return (
              <Link
                key={project._id}
                href={itemHref(project)}
                className={`group relative overflow-hidden rounded-3xl ${i % 2 !== 0 ? "md:mt-10" : ""}`}
                style={{ minHeight: 380, backgroundColor: project.color ?? "#1e3a8a" }}
              >
                {bgImage && (
                  <img
                    src={bgImage}
                    alt={tLocale(project.title, locale) ?? ""}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex items-end justify-between p-6 md:p-8">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-widest text-white/60">
                      {tLocale(project.categoryLabel, locale)}
                    </p>
                    <h3 className="text-xl font-black uppercase text-white md:text-2xl">
                      {tLocale(project.title, locale)}
                    </h3>
                  </div>
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-all group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-black">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href={`/${locale}/portofoliu`}
            className="inline-flex items-center gap-3 rounded-full border px-10 py-4 text-sm font-semibold transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
          >
            {t("seeAll")}
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
