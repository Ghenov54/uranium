import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { SERVICE_ITEMS_QUERY } from "@/sanity/queries/services";
import { PORTFOLIO_ITEMS_QUERY } from "@/sanity/queries/portfolio";
import { t as tl } from "@/sanity/lib/locale";
import { img, SERVICE_CATEGORY, type SanityImage } from "@/lib/sanity-helpers";
import { FALLBACK_SERVICES, type ServiceRow } from "@/lib/services";
import { PageIntro } from "@/components/u/PageIntro";
import { Services, type ServiceCard } from "@/components/u/home/Services";
import { Process } from "@/components/u/Process";

type PortfolioRow = { _id: string; category: string | null; mainImage?: SanityImage };

export default async function ServicesPage() {
  const [locale, t, th, services, portfolio] = await Promise.all([
    getLocale(),
    getTranslations("pages"),
    getTranslations("home"),
    client.fetch<ServiceRow[]>(SERVICE_ITEMS_QUERY).catch(() => []),
    client.fetch<PortfolioRow[]>(PORTFOLIO_ITEMS_QUERY).catch(() => []),
  ]);

  const used = new Set<string>();
  const cards: ServiceCard[] = (services?.length ? services : FALLBACK_SERVICES).map((s) => {
    const slug = s.slug?.current ?? "";
    const match =
      portfolio.find((p) => p.category === SERVICE_CATEGORY[slug] && !used.has(p._id)) ?? portfolio.find((p) => !used.has(p._id));
    if (match) used.add(match._id);
    return {
      id: s._id,
      name: tl(s.name, locale),
      description: tl(s.description, locale),
      tags: s.tags ?? [],
      href: `/${locale}/servicii/${slug}`,
      image: match ? img(match.mainImage, 1200, 1200) : null,
    };
  });

  return (
    <>
      <PageIntro title={t("servicesTitle")} lead={t("servicesLead")} />
      <Services items={cards} title="" moreLabel={th("serviceMore")} />
      <Process title={t("processTitle")} />
    </>
  );
}
