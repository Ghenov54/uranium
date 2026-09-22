import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { PORTFOLIO_ITEMS_QUERY } from "@/sanity/queries/portfolio";
import { SERVICE_ITEMS_QUERY } from "@/sanity/queries/services";
import { POSTS_QUERY } from "@/sanity/queries/posts";
import { t as tl } from "@/sanity/lib/locale";
import { img, SERVICE_CATEGORY, type Localized, type SanityImage } from "@/lib/sanity-helpers";
import { FALLBACK_SERVICES, type ServiceRow } from "@/lib/services";
import { chatData } from "@/data/chatData";
import { Hero } from "@/components/u/home/Hero";
import { Reel } from "@/components/u/home/Reel";
import { Intro } from "@/components/u/home/Intro";
import { Work } from "@/components/u/home/Work";
import { Services } from "@/components/u/home/Services";
import { News } from "@/components/u/home/News";
import { Faq } from "@/components/u/home/Faq";
import { Clients } from "@/components/u/home/Clients";
import { Testimonials } from "@/components/u/home/Testimonials";

export const dynamic = "force-dynamic";

type PortfolioRow = { _id: string; title: Localized; category: string | null; categoryLabel: Localized; mainImage?: SanityImage; slug?: { current: string } | null };
type PostRow = { _id: string; title: string | null; slug: { current: string } | null; mainImage?: SanityImage; publishedAt: string | null };

export default async function HomePage() {
  const locale = await getLocale();
  const th = await getTranslations("home");

  const [portfolio, services, posts] = await Promise.all([
    client.fetch<PortfolioRow[]>(PORTFOLIO_ITEMS_QUERY).catch(() => []),
    client.fetch<ServiceRow[]>(SERVICE_ITEMS_QUERY).catch(() => []),
    client.fetch<PostRow[]>(POSTS_QUERY, { locale }).catch(() => []),
  ]);

  const projects = portfolio ?? [];
  const projectHref = (p: PortfolioRow) => (p.slug?.current ? `/${locale}/portofoliu/${p.slug.current}` : `/${locale}/portofoliu`);

  const reel = projects
    .map((p) => ({ title: tl(p.title, locale), category: tl(p.categoryLabel, locale), image: img(p.mainImage, 2200, 1238), href: projectHref(p) }))
    .filter((r): r is { title: string; category: string; image: string; href: string } => Boolean(r.image))
    .slice(0, 6);

  const work = projects.slice(0, 6).map((p, i) => ({
    id: p._id,
    title: tl(p.title, locale),
    category: tl(p.categoryLabel, locale),
    image: i % 3 === 2 ? img(p.mainImage, 2000, 1125) : img(p.mainImage, 1200, 1200),
    href: projectHref(p),
  }));

  const svc = (services?.length ? services : FALLBACK_SERVICES).map((s) => {
    const slug = s.slug?.current ?? "";
    return {
      id: s._id,
      name: tl(s.name, locale),
      description: tl(s.description, locale),
      tags: s.tags ?? [],
      href: `/${locale}/servicii/${slug}`,
      category: SERVICE_CATEGORY[slug],
    };
  });

  const news = (posts ?? []).slice(0, 3).map((p) => ({
    id: p._id,
    title: p.title ?? "",
    href: `/${locale}/blog/${p.slug?.current ?? ""}`,
    date: p.publishedAt,
    image: img(p.mainImage, 900, 600),
  }));

  const faq = (chatData[locale as "ro" | "en" | "ru"] ?? chatData.ro).categories.flatMap((c) => c.questions).slice(0, 7);

  return (
    <>
      <Hero title={th("heroTitle")} />
      {/* Temporary showreel: Mixkit free-licence footage, to be replaced by our own. */}
      <Reel items={reel} label={th("reel")} video="/reel/showreel.mp4" />
      <Intro text={th("statement")} linkLabel={th("statementLink")} href={`/${locale}/servicii`} services={svc} moreLabel={th("serviceMore")} />
      <Clients title={th("clientsTitle")} />
      <Work items={work} title={th("workTitle")} allLabel={th("workAll")} allHref={`/${locale}/portofoliu`} />
      <Services items={svc} title={th("servicesTitle")} moreLabel={th("serviceMore")} />
      <Testimonials title={th("quotesTitle")} locale={locale} />
      <div className="u-dark u-panel">
        <News posts={news} title={th("journalTitle")} allLabel={th("journalAll")} allHref={`/${locale}/blog`} locale={locale} />
        <Faq items={faq} title={th("faqTitle")} />
      </div>
    </>
  );
}
