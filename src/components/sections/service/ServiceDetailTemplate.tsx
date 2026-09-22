import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { t as tl } from "@/sanity/lib/locale";
import { img, type Localized, type SanityImage } from "@/lib/sanity-helpers";
import { PageIntro } from "@/components/u/PageIntro";
import { Work } from "@/components/u/home/Work";
import { Process } from "@/components/u/Process";
import { ArrowRight } from "@/components/u/icons";

type SanityServiceItem = {
  _id: string;
  name: Localized;
  slug: { current: string } | null;
  tagline: Localized;
  description: Localized;
  tags: string[] | null;
  features: Array<{ title: Localized; description: Localized }> | null;
};

type SanityPortfolioItem = {
  _id: string;
  title: Localized;
  categoryLabel: Localized;
  mainImage?: SanityImage;
  slug?: { current: string } | null;
};

export async function ServiceDetailTemplate({
  serviceItem,
  relatedProjects,
}: {
  serviceItem: SanityServiceItem;
  relatedProjects: SanityPortfolioItem[];
}) {
  const locale = await getLocale();
  const ts = await getTranslations("service");
  const tp = await getTranslations("pages");
  const features = serviceItem.features ?? [];
  const description = tl(serviceItem.description, locale);

  const work = relatedProjects.map((p, i) => ({
    id: p._id,
    title: tl(p.title, locale),
    category: tl(p.categoryLabel, locale),
    image: i % 4 === 0 || i % 4 === 3 ? img(p.mainImage, 1200, 1500) : img(p.mainImage, 1400, 1050),
    href: p.slug?.current ? `/${locale}/portofoliu/${p.slug.current}` : `/${locale}/portofoliu`,
  }));

  return (
    <>
      <PageIntro title={tl(serviceItem.name, locale)} lead={tl(serviceItem.tagline, locale)}>
        <Link href={`/${locale}/servicii`} className="u-btn u-btn--line">
          {ts("all")}
          <ArrowRight />
        </Link>
      </PageIntro>

      {(description || features.length > 0) && (
        <section className="u-section u-section--flush">
          <div className="u-wrap">
            {description && <p className="u-lede">{description}</p>}
            {features.length > 0 && (
              <>
                <h2 className="u-subhead">{ts("includes")}</h2>
                <ul className="u-features">
                  {features.map((f, i) => (
                    <li key={i}>
                      <h3>{tl(f.title, locale)}</h3>
                      <p>{tl(f.description, locale)}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {serviceItem.tags && serviceItem.tags.length > 0 && (
              <ul className="u-tags u-features__tags">
                {serviceItem.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      <Process title={tp("processTitle")} />
      <Work items={work} title={ts("related")} allLabel={tp("workTitle")} allHref={`/${locale}/portofoliu`} />
    </>
  );
}
