"use client";
import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { t as tl } from "@/sanity/lib/locale";
import { urlFor } from "@/sanity/lib/image";
import { splitTitle } from "@/lib/projects";
import { Lightbox } from "@/components/ui/Lightbox";

type LocaleField = Record<string, string | null | undefined> | null;
type SanityImage = { asset?: { _ref?: string } } | null | undefined;

type PortfolioProject = {
  _id: string;
  title: LocaleField;
  categoryLabel: LocaleField;
  mainImage?: SanityImage;
  description?: LocaleField;
  client?: LocaleField;
  year?: number | null;
  results?: LocaleField;
  gallery?: Array<{ asset?: { _ref?: string }; caption?: string }> | null;
};

type Next = { slug: string; title: LocaleField; mainImage?: SanityImage } | null;

const src = (i: SanityImage, w: number, h: number) =>
  i?.asset?._ref ? urlFor(i).width(w).height(h).fit("crop").auto("format").quality(84).url() : null;

/** Rise into view once, like every block on a Cuberto case study. */
function Rise({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Label on the left, prose on the right: Cuberto's case-study text block. */
function TextBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Rise className="u-cs__text">
      <span className="u-cs__label">{label}</span>
      <div className="u-cs__prose">{children}</div>
    </Rise>
  );
}

export function ProjectDetail({ project, next }: { project: PortfolioProject; next: Next }) {
  const locale = useLocale();
  const t = useTranslations("work");
  const tp = useTranslations("project");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const { name, tagline } = splitTitle(tl(project.title, locale));
  const description = tl(project.description, locale);
  const results = tl(project.results, locale);
  const client = tl(project.client, locale);
  const category = tl(project.categoryLabel, locale);

  const gallery = (project.gallery ?? []).filter((g) => g.asset?._ref);
  const full = [project.mainImage, ...gallery].map((g) => src(g, 2000, 1250)).filter((s): s is string => Boolean(s));
  const hero = src(project.mainImage, 2400, 1200);
  const words = (tagline || name).split(" ");

  // Gallery rhythm: one wide frame, then an offset pair, repeating.
  const blocks: Array<{ kind: "wide"; i: number } | { kind: "pair"; a: number; b: number }> = [];
  for (let i = 0; i < gallery.length; ) {
    if (blocks.length % 2 === 0) {
      blocks.push({ kind: "wide", i });
      i += 1;
    } else if (i + 1 < gallery.length) {
      blocks.push({ kind: "pair", a: i, b: i + 1 });
      i += 2;
    } else {
      blocks.push({ kind: "wide", i });
      i += 1;
    }
  }

  const nextName = next ? splitTitle(tl(next.title, locale)).name : "";

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

      <section className="u-cs__head">
        <div className="u-wrap">
          <p className="u-cs__eyebrow u-enter" style={{ "--d": "80ms" } as React.CSSProperties}>
            {name}
          </p>
          <h1 className="u-cs__title" aria-label={tagline || name}>
            {words.map((w, i) => (
              <span key={i} className="u-rise" aria-hidden>
                <span style={{ "--i": i + 1 } as React.CSSProperties}>{w}</span>
              </span>
            ))}
          </h1>
        </div>
      </section>

      {hero && (
        <div className="u-wrap">
          <Rise>
            <button type="button" className="u-cs__hero" onClick={() => setLightbox(0)} aria-label={tp("open")}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero} alt={name} />
            </button>
          </Rise>
        </div>
      )}

      <section className="u-section">
        <div className="u-wrap u-cs__narrow">
          <Rise>
            <dl className="u-cs__meta">
            {client && (
              <div>
                <dt>{tp("client")}</dt>
                <dd>{client}</dd>
              </div>
            )}
            {category && (
              <div>
                <dt>{tp("category")}</dt>
                <dd>{category}</dd>
              </div>
            )}
            {project.year && (
              <div>
                <dt>{tp("year")}</dt>
                <dd className="u-tnum">{project.year}</dd>
              </div>
            )}
            </dl>
          </Rise>
          {description && (
            <TextBlock label={t("challenge")}>
              <p>{description}</p>
            </TextBlock>
          )}
        </div>
      </section>

      {blocks.length > 0 && (
        <section className="u-cs__gallery">
          <div className="u-wrap">
            {blocks.map((b, k) =>
              b.kind === "wide" ? (
                <Rise key={k} className="u-cs__wide">
                  <button type="button" onClick={() => setLightbox(b.i + 1)} aria-label={tp("open")}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src(gallery[b.i], 2200, 1240)!} alt="" loading="lazy" decoding="async" />
                  </button>
                  {gallery[b.i].caption && <p className="u-cs__cap">{gallery[b.i].caption}</p>}
                </Rise>
              ) : (
                <div key={k} className="u-cs__pair">
                  {[b.a, b.b].map((gi, j) => (
                    <Rise key={gi} delay={j * 0.1} className={j === 1 ? "u-cs__pair-b" : undefined}>
                      <button type="button" onClick={() => setLightbox(gi + 1)} aria-label={tp("open")}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src(gallery[gi], 1000, 1000)!} alt="" loading="lazy" decoding="async" />
                      </button>
                      {gallery[gi].caption && <p className="u-cs__cap">{gallery[gi].caption}</p>}
                    </Rise>
                  ))}
                </div>
              )
            )}
          </div>
        </section>
      )}

      {results && (
        <section className="u-section">
          <div className="u-wrap u-cs__narrow">
            <Rise>
              <h2 className="u-cs__h2">{t("results")}</h2>
            </Rise>
            <TextBlock label={t("results")}>
              <p>{results}</p>
            </TextBlock>
          </div>
        </section>
      )}

      {next && (
        <Link href={`/${locale}/portofoliu/${next.slug}`} className="u-cs__next" aria-label={`${t("next")}: ${nextName}`}>
          <div className="u-cs__marquee" aria-hidden>
            {[0, 1].map((k) => (
              <span key={k}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <em key={i}>{t("next")}</em>
                ))}
              </span>
            ))}
          </div>
          <span className="u-cs__next-name">{nextName}</span>
        </Link>
      )}
    </>
  );
}
