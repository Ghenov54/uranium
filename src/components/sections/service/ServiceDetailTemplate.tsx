import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { projects } from "@/data/portfolio";
import type { ProjectCategory } from "@/data/portfolio";

export type ServiceKey = "web" | "aplicatii" | "marketing" | "business" | "design";

const slugToCategory: Record<ServiceKey, ProjectCategory> = {
  web: "web",
  aplicatii: "apps",
  marketing: "marketing",
  business: "business",
  design: "design",
};

const featureIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

type ServiceTranslationKey = ServiceKey;

const titleKeys: Record<ServiceTranslationKey, string> = {
  web: "web.title",
  aplicatii: "aplicatii.title",
  marketing: "marketing.title",
  business: "business.title",
  design: "design.title",
};

const taglineKeys: Record<ServiceTranslationKey, string> = {
  web: "web.tagline",
  aplicatii: "aplicatii.tagline",
  marketing: "marketing.tagline",
  business: "business.tagline",
  design: "design.tagline",
};

const featureTitleKeys: Record<ServiceTranslationKey, string[]> = {
  web: ["web.feature1Title", "web.feature2Title", "web.feature3Title", "web.feature4Title", "web.feature5Title", "web.feature6Title"],
  aplicatii: ["aplicatii.feature1Title", "aplicatii.feature2Title", "aplicatii.feature3Title", "aplicatii.feature4Title", "aplicatii.feature5Title", "aplicatii.feature6Title"],
  marketing: ["marketing.feature1Title", "marketing.feature2Title", "marketing.feature3Title", "marketing.feature4Title", "marketing.feature5Title", "marketing.feature6Title"],
  business: ["business.feature1Title", "business.feature2Title", "business.feature3Title", "business.feature4Title", "business.feature5Title", "business.feature6Title"],
  design: ["design.feature1Title", "design.feature2Title", "design.feature3Title", "design.feature4Title", "design.feature5Title", "design.feature6Title"],
};

const featureDescKeys: Record<ServiceTranslationKey, string[]> = {
  web: ["web.feature1Desc", "web.feature2Desc", "web.feature3Desc", "web.feature4Desc", "web.feature5Desc", "web.feature6Desc"],
  aplicatii: ["aplicatii.feature1Desc", "aplicatii.feature2Desc", "aplicatii.feature3Desc", "aplicatii.feature4Desc", "aplicatii.feature5Desc", "aplicatii.feature6Desc"],
  marketing: ["marketing.feature1Desc", "marketing.feature2Desc", "marketing.feature3Desc", "marketing.feature4Desc", "marketing.feature5Desc", "marketing.feature6Desc"],
  business: ["business.feature1Desc", "business.feature2Desc", "business.feature3Desc", "business.feature4Desc", "business.feature5Desc", "business.feature6Desc"],
  design: ["design.feature1Desc", "design.feature2Desc", "design.feature3Desc", "design.feature4Desc", "design.feature5Desc", "design.feature6Desc"],
};

type Props = { serviceKey: ServiceKey };

export function ServiceDetailTemplate({ serviceKey }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = useTranslations("serviceDetail") as any;

  const category = slugToCategory[serviceKey];
  const relatedProjects = projects.filter((p) => p.category === category).slice(0, 3);

  const features = Array.from({ length: 6 }, (_, i) => ({
    title: t(featureTitleKeys[serviceKey][i]),
    desc: t(featureDescKeys[serviceKey][i]),
  }));

  const steps = [
    { num: "01", title: t("step1Title"), desc: t("step1Desc") },
    { num: "02", title: t("step2Title"), desc: t("step2Desc") },
    { num: "03", title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <>
      <PageHero
        title={t(titleKeys[serviceKey])}
        subtitle={t(taglineKeys[serviceKey])}
      />

      {/* Features */}
      <section className="py-24" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <p
            className="mb-10 text-xs uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("featuresLabel")}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6"
                style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
              >
                <div
                  className="mb-3 flex size-10 items-center justify-center rounded-lg"
                  style={{ background: "var(--color-accent)", color: "#000" }}
                >
                  {featureIcon}
                </div>
                <h3
                  className="mb-1 text-sm font-black uppercase tracking-tight"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section
        className="py-24 border-t"
        style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}
      >
        <div className="section-container">
          <p
            className="mb-10 text-xs uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("processLabel")}
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-6">
                <div
                  className="shrink-0 text-4xl font-black leading-none"
                  style={{ color: "var(--color-accent)" }}
                >
                  {step.num}
                </div>
                <div>
                  <h3
                    className="mb-1 text-base font-black uppercase"
                    style={{ color: "var(--color-text-primary)" }}
                  >
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
            <p
              className="mb-10 text-xs uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("portfolioLabel")}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="overflow-hidden rounded-3xl"
                  style={{ backgroundColor: project.color }}
                >
                  <div className="aspect-[4/3] w-full" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white">{project.title}</h3>
                    <p className="mt-1 text-sm text-white/60">{project.categoryLabel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
