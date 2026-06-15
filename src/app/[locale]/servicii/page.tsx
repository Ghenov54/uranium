import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";

const serviceKeys = [
  { key: "web", slug: "web" },
  { key: "apps", slug: "aplicatii" },
  { key: "marketing", slug: "marketing" },
  { key: "business", slug: "business" },
  { key: "design", slug: "design" },
] as const;

const serviceDescKey = {
  web: "webDesc",
  apps: "appsDesc",
  marketing: "marketingDesc",
  business: "businessDesc",
  design: "designDesc",
} as const;

const reasonIcons = [
  <svg key="star" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  <svg key="zap" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  <svg key="chart" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
];

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = useTranslations("serviciiPage");
  const tServices = useTranslations("services");

  const reasons = [
    { title: t("reason1Title"), desc: t("reason1Desc"), icon: reasonIcons[0] },
    { title: t("reason2Title"), desc: t("reason2Desc"), icon: reasonIcons[1] },
    { title: t("reason3Title"), desc: t("reason3Desc"), icon: reasonIcons[2] },
  ];

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("heading")}
        subtitle={t("subtitle")}
      />

      {/* Services list */}
      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <div className="divide-y" style={{ borderColor: "var(--color-border)" }}>
            {serviceKeys.map(({ key, slug }) => (
              <div
                key={key}
                className="flex items-center justify-between py-8"
              >
                <div>
                  <h2
                    className="text-3xl font-black uppercase tracking-tight md:text-4xl"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {tServices(key)}
                  </h2>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {tServices(serviceDescKey[key])}
                  </p>
                </div>
                <Link
                  href={`/${locale}/servicii/${slug}`}
                  className="ml-8 shrink-0 text-sm font-medium transition-colors"
                  style={{ color: "var(--color-accent)" }}
                >
                  {t("learnMore")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Uranium */}
      <section
        className="py-24 border-t"
        style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}
      >
        <div className="section-container">
          <h2
            className="mb-12 text-4xl font-black uppercase tracking-tight md:text-5xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            {t("whyTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="rounded-3xl p-8"
                style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
              >
                <div
                  className="mb-4 flex size-12 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-accent)", color: "#000" }}
                >
                  {r.icon}
                </div>
                <h3
                  className="mb-2 text-base font-black uppercase"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {r.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
