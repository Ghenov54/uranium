"use client";
import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { t as tl } from "@/sanity/lib/locale";
import { urlFor } from "@/sanity/lib/image";
import { Lightbox } from "@/components/ui/Lightbox";
import { Work } from "@/components/u/home/Work";
import { ArrowRight } from "@/components/u/icons";

type LocaleField = Record<string, string | null | undefined> | null;
type SanityImage = { asset?: { _ref?: string } } | null | undefined;

type PortfolioProject = {
  _id: string;
  title: LocaleField;
  slug: { current: string } | null;
  category: string;
  categoryLabel: LocaleField;
  mainImage?: SanityImage;
  description?: LocaleField;
  client?: LocaleField;
  year?: number | null;
  results?: LocaleField;
  gallery?: Array<{ asset?: { _ref?: string }; caption?: string }> | null;
};

type RelatedItem = { _id: string; title: LocaleField; categoryLabel: LocaleField; mainImage?: SanityImage; slug?: { current: string } | null };

const src = (i: SanityImage, w: number, h: number) =>
  i?.asset?._ref ? urlFor(i).width(w).height(h).fit("crop").auto("format").quality(84).url() : null;

export function ProjectDetail({ project, related }: { project: PortfolioProject; related: RelatedItem[] }) {
  const locale = useLocale();
  const t = useTranslations("project");
  const reduce = useReducedMotion();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const title = tl(project.title, locale);
  const description = tl(project.description, locale);
  const client = tl(project.client, locale);
  const results = tl(project.results, locale);
  const category = tl(project.categoryLabel, locale);

  const full = [project.mainImage, ...(project.gallery ?? [])]
    .map((g) => src(g, 2000, 1250))
    .filter((s): s is string => Boolean(s));
  const hero = src(project.mainImage, 2400, 1350);
  const gallery = (project.gallery ?? []).map((g) => src(g, 1400, 1000)).filter((s): s is string => Boolean(s));

  const words = title.split(" ");
  const work = related.map((p, i) => ({
    id: p._id,
    title: tl(p.title, locale),
    category: tl(p.categoryLabel, locale),
    image: i % 4 === 0 || i % 4 === 3 ? src(p.mainImage, 1200, 1500) : src(p.mainImage, 1400, 1050),
    href: p.slug?.current ? `/${locale}/portofoliu/${p.slug.current}` : `/${locale}/portofoliu`,
  }));

  return (
    <>
      {lightbox !== null && full.length > 0 && (
        <Lightbox
          images={full}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((i) => (i === null || i === 0 ? full.length - 1 : i - 1))}
          onNext={() => setLightbox((i) => (i === null ? 0 : (i + 1) % full.length))}
        />
      )}

      <section className="u-intro">
        <div className="u-wrap">
          <Link href={`/${locale}/portofoliu`} className="u-back u-enter">
            <span className="u-back__icon" aria-hidden>
              <ArrowRight />
            </span>
            {t("back")}
          </Link>
          <h1 className="u-intro__title u-intro__title--project" aria-label={title}>
            {words.map((w, i) => (
              <span key={i} className="u-hero__clip" aria-hidden>
                <span style={{ "--i": i * 1.6 } as React.CSSProperties}>{w}</span>
              </span>
            ))}
          </h1>
          <dl className="u-meta u-enter" style={{ "--d": "260ms" } as React.CSSProperties}>
            {client && (
              <div>
                <dt>{t("client")}</dt>
                <dd>{client}</dd>
              </div>
            )}
            {category && (
              <div>
                <dt>{t("category")}</dt>
                <dd>{category}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt>{t("year")}</dt>
                <dd className="u-tnum">{project.year}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {hero && (
        <motion.button
          type="button"
          className="u-project-hero"
          onClick={() => setLightbox(0)}
          aria-label={t("open")}
          initial={reduce ? false : { clipPath: "inset(12% 6% 0% 6% round 16px)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
          transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero} alt={title} />
        </motion.button>
      )}

      {(description || results) && (
        <section className="u-section">
          <div className="u-wrap u-project-body">
            {description && (
              <div>
                <h2 className="u-subhead">{t("about")}</h2>
                <p className="u-lede">{description}</p>
              </div>
            )}
            {results && (
              <div className="u-results">
                <h2 className="u-subhead">{t("results")}</h2>
                <p>{results}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="u-section u-section--flush">
          <div className="u-wrap">
            <h2 className="u-subhead">{t("gallery")}</h2>
            <div className="u-gallery">
              {gallery.map((g, i) => (
                <button key={g} type="button" onClick={() => setLightbox(i + 1)} aria-label={`${t("open")} ${i + 1}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <Work items={work} title={t("related")} allLabel={t("back")} allHref={`/${locale}/portofoliu`} />
    </>
  );
}
