import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { PortfolioGrid } from "./PortfolioGrid";

export default function PortfolioPage() {
  const t = useTranslations("portfolioPage");
  return (
    <>
      <PageHero
        label={t("label")}
        title={t("heading")}
        subtitle={t("subtitle")}
      />
      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <PortfolioGrid />
        </div>
      </section>
    </>
  );
}
