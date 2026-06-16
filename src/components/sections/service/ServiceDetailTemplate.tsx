import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { t as tLocale } from "@/sanity/lib/locale";
import { urlFor } from "@/sanity/lib/image";

type LocaleField = Record<string, string | null | undefined> | null;

type SanityServiceItem = {
  _id: string;
  name: LocaleField;
  slug: { current: string } | null;
  tagline: LocaleField;
  description: LocaleField;
  tags: string[] | null;
  features: Array<{ title: LocaleField; description: LocaleField }> | null;
};

type SanityPortfolioItem = {
  _id: string;
  title: LocaleField;
  categoryLabel: LocaleField;
  mainImage?: { asset?: { _ref?: string } } | null;
  color?: string | null;
  slug?: { current: string } | null;
};

type Props = {
  serviceItem: SanityServiceItem;
  relatedProjects: SanityPortfolioItem[];
};

const featureIcons = [
  <svg key="check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>,
  <svg key="zap" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
  <svg key="star" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  <svg key="target" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  <svg key="layers" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
  <svg key="trending" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>,
];

export function ServiceDetailTemplate({ serviceItem, relatedProjects }: Props) {
  const t = useTranslations("serviceDetail");
  const locale = useLocale();

  const features = serviceItem.features ?? [];
  const steps = [
    { num: "01", title: t("step1Title"), desc: t("step1Desc") },
    { num: "02", title: t("step2Title"), desc: t("step2Desc") },
    { num: "03", title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <>
      <PageHero
        title={tLocale(serviceItem.name, locale)?.toUpperCase() ?? ""}
        subtitle={tLocale(serviceItem.tagline, locale) ?? undefined}
      />

      {/* Features */}
      {features.length > 0 && (
        <section className="py-24" style={{ background: "var(--color-bg)" }}>
          <div className="section-container">
            <div className="mb-10 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--color-text-muted)" }} />
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                {t("featuresLabel")}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="group rounded-2xl p-7 transition-all hover:-translate-y-1 hover:border-[var(--color-accent)]"
                  style={{
                    background: "var(--color-bg-surface)",
                    border: "1px solid var(--color-border)",
                    transition: "transform 0.3s ease, border-color 0.3s ease",
                  }}
                >
                  <div
                    className="mb-4 flex size-11 items-center justify-center rounded-xl transition-all group-hover:scale-110"
                    style={{ background: "var(--color-accent)", color: "#000" }}
                  >
                    {featureIcons[i % featureIcons.length]}
                  </div>
                  <h3 className="mb-2 text-sm font-black uppercase tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                    {tLocale(f.title, locale)}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                    {tLocale(f.description, locale)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process steps */}
      <section className="border-t py-24" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
        <div className="section-container">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--color-text-muted)" }} />
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
              {t("processLabel")}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-6">
                <div
                  className="shrink-0 text-5xl font-black leading-none"
                  style={{ color: i === 0 ? "var(--color-accent)" : "rgba(255,255,255,0.12)" }}
                >
                  {step.num}
                </div>
                <div>
                  <h3 className="mb-2 text-base font-black uppercase" style={{ color: "var(--color-text-primary)" }}>
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

      {/* Related projects — clickable, navigate to detail page */}
      {relatedProjects.length > 0 && (
        <section className="py-24" style={{ background: "var(--color-bg)" }}>
          <div className="section-container">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--color-text-muted)" }} />
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                {t("portfolioLabel")}
              </p>
            </div>
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-3xl font-black uppercase tracking-tight md:text-4xl" style={{ color: "var(--color-text-primary)" }}>
                Proiecte Relevante
              </h2>
              <Link
                href={`/${locale}/portofoliu`}
                className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-accent)]"
                style={{ color: "var(--color-text-muted)" }}
              >
                Toate proiectele
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProjects.map((project) => {
                const bgImage = project.mainImage?.asset?._ref
                  ? urlFor(project.mainImage).width(800).height(600).url()
                  : null;
                const href = project.slug?.current
                  ? `/${locale}/portofoliu/${project.slug.current}`
                  : `/${locale}/portofoliu`;

                return (
                  <Link
                    key={project._id}
                    href={href}
                    className="group relative overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-2"
                    style={{ backgroundColor: project.color ?? "#1e3a8a", display: "block" }}
                  >
                    {/* Image with zoom effect */}
                    <div className="overflow-hidden">
                      {bgImage ? (
                        <img
                          src={bgImage}
                          alt={tLocale(project.title, locale) ?? ""}
                          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="aspect-[4/3] w-full" />
                      )}
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                    {/* Info row */}
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                      <div>
                        <p className="mb-0.5 text-xs uppercase tracking-widest text-white/50">
                          {tLocale(project.categoryLabel, locale)}
                        </p>
                        <h3 className="text-lg font-black uppercase leading-tight text-white">
                          {tLocale(project.title, locale)}
                        </h3>
                      </div>
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-all group-hover:border-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-black"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
