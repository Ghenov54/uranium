import { getLocale, getTranslations } from "next-intl/server";
import { groq } from "next-sanity";
import { client } from "@/sanity/client";
import { t as tl } from "@/sanity/lib/locale";
import { img, type Localized, type SanityImage } from "@/lib/sanity-helpers";
import { firstSentence, splitTitle } from "@/lib/projects";
import { PortfolioGrid, type IndexProject } from "./PortfolioGrid";

const QUERY = groq`*[_type == "portfolioItem"] | order(order asc) {
  _id, title, category, categoryLabel, mainImage, slug, description, "hover": gallery[0]
}`;

type Row = {
  _id: string;
  title: Localized;
  category: string | null;
  categoryLabel: Localized;
  mainImage?: SanityImage;
  hover?: SanityImage;
  slug?: { current: string } | null;
  description?: Localized;
};

export default async function PortfolioPage() {
  const [locale, t, rows] = await Promise.all([getLocale(), getTranslations("work"), client.fetch<Row[]>(QUERY).catch(() => [])]);

  const projects: IndexProject[] = rows.map((p, i) => {
    const { name, tagline } = splitTitle(tl(p.title, locale));
    const summary = firstSentence(tl(p.description, locale)) || tagline || tl(p.categoryLabel, locale);
    // Alternate portrait and square frames, as the grid does.
    const tall = i % 4 === 0 || i % 4 === 3;
    return {
      id: p._id,
      tall,
      name,
      summary,
      category: p.category ?? "",
      image: tall ? img(p.mainImage, 1000, 1333) : img(p.mainImage, 1000, 1000),
      hover: tall ? img(p.hover, 1000, 1333) : img(p.hover, 1000, 1000),
      href: p.slug?.current ? `/${locale}/portofoliu/${p.slug.current}` : `/${locale}/portofoliu`,
    };
  });

  const title = t("title");
  return (
    <>
      <section className="u-phead">
        <div className="u-wrap">
          <h1 className="u-phead__title" aria-label={title}>
            {title.split(" ").map((w, i) => (
              <span key={i} className="u-rise" aria-hidden>
                <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
              </span>
            ))}
          </h1>
          <p className="u-phead__lead u-enter">{t("lead")}</p>
        </div>
      </section>
      <section className="u-section u-section--flush">
        <div className="u-wrap">
          <PortfolioGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
