import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { groq } from "next-sanity";
import { t as tl } from "@/sanity/lib/locale";
import { img, type Localized, type SanityImage } from "@/lib/sanity-helpers";
import { PageIntro } from "@/components/u/PageIntro";
import { PortfolioGrid, type IndexProject } from "./PortfolioGrid";

const QUERY = groq`*[_type == "portfolioItem"] | order(order asc) { _id, title, category, categoryLabel, mainImage, slug, year }`;

type Row = { _id: string; title: Localized; category: string | null; categoryLabel: Localized; mainImage?: SanityImage; slug?: { current: string } | null; year?: number | null };

export default async function PortfolioPage() {
  const [locale, t, rows] = await Promise.all([
    getLocale(),
    getTranslations("pages"),
    client.fetch<Row[]>(QUERY).catch(() => []),
  ]);

  const projects: IndexProject[] = rows.map((p) => ({
    id: p._id,
    title: tl(p.title, locale),
    category: p.category ?? "",
    categoryLabel: tl(p.categoryLabel, locale),
    year: p.year ?? null,
    image: img(p.mainImage, 720, 495),
    href: p.slug?.current ? `/${locale}/portofoliu/${p.slug.current}` : `/${locale}/portofoliu`,
  }));

  return (
    <>
      <PageIntro title={t("workTitle")} lead={t("workLead")} />
      <section className="u-section u-section--flush">
        <div className="u-wrap">
          <PortfolioGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
