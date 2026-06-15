import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { PORTFOLIO_ITEMS_QUERY } from "@/sanity/queries/portfolio";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { PortfolioGrid } from "./PortfolioGrid";

export default async function PortfolioPage() {
  const [t, projects] = await Promise.all([
    getTranslations("portfolioPage"),
    client.fetch(PORTFOLIO_ITEMS_QUERY).catch(() => []),
  ]);

  return (
    <>
      <PageHero label={t("label")} title={t("heading")} subtitle={t("subtitle")} />
      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <PortfolioGrid projects={projects} />
        </div>
      </section>
      <CTASection />
    </>
  );
}
