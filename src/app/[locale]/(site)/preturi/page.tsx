import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { PRICING_QUERY } from "@/sanity/queries/pricing";
import { PageIntro } from "@/components/u/PageIntro";
import { PricingContent, type SanityPricingService } from "./PricingContent";

export default async function PricingPage() {
  const [t, services] = await Promise.all([
    getTranslations("pages"),
    client.fetch<SanityPricingService[]>(PRICING_QUERY).catch(() => [] as SanityPricingService[]),
  ]);

  return (
    <>
      <PageIntro title={t("pricingTitle")} lead={t("pricingLead")} />
      <section className="u-section u-section--flush">
        <div className="u-wrap">
          <PricingContent services={services} />
        </div>
      </section>
    </>
  );
}
