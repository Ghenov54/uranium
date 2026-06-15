import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { PricingContent } from "./PricingContent";
import { CTASection } from "@/components/sections/CTASection";

export default function PricingPage() {
  const t = useTranslations("pricing");
  return (
    <>
      <PageHero
        label={t("label")}
        title={t("heading")}
        subtitle={t("subtitle")}
      />
      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <PricingContent />
        </div>
      </section>
      <CTASection />
    </>
  );
}
