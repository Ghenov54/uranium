import { getLocale } from "next-intl/server";
import { client } from "@/sanity/client";
import { HOME_PAGE_QUERY } from "@/sanity/queries/site";
import { PORTFOLIO_ITEMS_QUERY } from "@/sanity/queries/portfolio";
import { SERVICE_ITEMS_QUERY } from "@/sanity/queries/services";
import { POSTS_QUERY } from "@/sanity/queries/posts";
import { t } from "@/sanity/lib/locale";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { PricingTeaserSection } from "@/components/sections/PricingTeaserSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = await getLocale();

  const [homePage, portfolioItems, serviceItems, posts] = await Promise.all([
    client.fetch(HOME_PAGE_QUERY).catch(() => null),
    client.fetch(PORTFOLIO_ITEMS_QUERY).catch(() => []),
    client.fetch(SERVICE_ITEMS_QUERY).catch(() => []),
    client.fetch(POSTS_QUERY, { locale }).catch(() => []),
  ]);

  return (
    <>
      <HeroSection
        title={homePage ? t(homePage.heroTitle, locale) : undefined}
        subtitle={homePage ? t(homePage.heroSubtitle, locale) : undefined}
        cta={homePage ? t(homePage.heroCta, locale) : undefined}
        locale={locale}
      />
      <IntroSection />
      <ServicesSection items={serviceItems} />
      <PortfolioSection projects={portfolioItems} />
      <StatsSection />
      <BlogPreviewSection posts={posts} />
      <PricingTeaserSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
