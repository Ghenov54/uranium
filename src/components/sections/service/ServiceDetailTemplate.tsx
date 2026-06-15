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
};

type Props = {
  serviceItem: SanityServiceItem;
  relatedProjects: SanityPortfolioItem[];
};

const featureIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

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
        title={tLocale(serviceItem.name, locale).toUpperCase()}
        subtitle={tLocale(serviceItem.tagline, locale)}
      />

      {/* Features */}
      {features.length > 0 && (
        <section className="py-24" style={{ background: "var(--color-bg)" }}>
          <div className="section-container">
            <p className="mb-10 text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
              {t("featuresLabel")}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6"
                  style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-lg" style={{ background: "var(--color-accent)", color: "#000" }}>
                    {featureIcon}
                  </div>
                  <h3 className="mb-1 text-sm font-black uppercase tracking-tight" style={{ color: "var(--color-text-primary)" }}>
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

      {/* Process */}
      <section className="py-24 border-t" style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}>
        <div className="section-container">
          <p className="mb-10 text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
            {t("processLabel")}
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6">
                <div className="shrink-0 text-4xl font-black leading-none" style={{ color: "var(--color-accent)" }}>
                  {step.num}
                </div>
                <div>
                  <h3 className="mb-1 text-base font-black uppercase" style={{ color: "var(--color-text-primary)" }}>
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
            <p className="mb-10 text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
              {t("portfolioLabel")}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProjects.map((project) => {
                const bgImage = project.mainImage?.asset?._ref
                  ? urlFor(project.mainImage).width(800).url()
                  : null;
                return (
                  <div
                    key={project._id}
                    className="overflow-hidden rounded-3xl"
                    style={{ backgroundColor: project.color ?? "#1e3a8a" }}
                  >
                    {bgImage ? (
                      <img src={bgImage} alt={tLocale(project.title, locale)} className="aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="aspect-[4/3] w-full" />
                    )}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white">{tLocale(project.title, locale)}</h3>
                      <p className="mt-1 text-sm text-white/60">{tLocale(project.categoryLabel, locale)}</p>
                    </div>
                  </div>
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
