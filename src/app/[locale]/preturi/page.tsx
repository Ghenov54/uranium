import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { PRICING_QUERY } from "@/sanity/queries/pricing";
import { PageHero } from "@/components/ui/PageHero";
import { PricingContent, type SanityPricingService } from "./PricingContent";
import { CTASection } from "@/components/sections/CTASection";

export default async function PricingPage() {
  const [t, services] = await Promise.all([
    getTranslations("pricing"),
    client.fetch<SanityPricingService[]>(PRICING_QUERY).catch(() => [] as SanityPricingService[]),
  ]);

  return (
    <>
      <PageHero
        label={t("label")}
        title={t("heading")}
        subtitle={t("subtitle")}
      />
      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <PricingContent services={services} />
        </div>
      </section>
      <CTASection />
    </>
  );
}
