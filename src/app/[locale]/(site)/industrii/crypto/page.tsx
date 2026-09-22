import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/u/Reveal";
import { ArrowRight, ArrowUpRight } from "@/components/u/icons";
import { Shapes, type ShapeVariant } from "@/components/u/three/Shapes";
import { ScreenCycle } from "@/components/u/industries/ScreenCycle";
import { ScreenScroll } from "@/components/u/industries/ScreenScroll";
import { CandleStream } from "@/components/u/industries/CandleStream";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("crypto");
  return { title: `${t("eyebrow")} | Uranium`, description: t("lead") };
}

type Service = {
  key: "brand" | "web" | "ux";
  tone: "light" | "violet" | "dark";
  shape: ShapeVariant;
  project: { name: string; href: string; media: ReactNode };
};

/** Clay's crypto page, restyled: a dark 3D hero, then one section per discipline, each with its own object and a real project. */
export default async function CryptoPage() {
  const [locale, t, ti] = await Promise.all([
    getLocale(),
    getTranslations("crypto"),
    getTranslations("industries"),
  ]);
  const p = (slug: string) => `/${locale}/portofoliu/${slug}`;
  const img = (f: string) => `/industries/${f}`;
  const title = t("title");

  const built = [
    "ScalpScreener",
    "Nano Scalp",
    "Proboi Scanner",
    "Arbitrage Pro",
  ];
  const strip = [
    "scalp-dash.jpg",
    "proboi.jpg",
    "scalp-grid.jpg",
    "nano-full.jpg",
    "scalp-radar.jpg",
    "scalp-draw.jpg",
  ];

  const services: Service[] = [
    {
      key: "brand",
      tone: "light",
      shape: "spheres",
      project: {
        name: "ScalpScreener",
        href: p("scalpscreener-trading-platform"),
        media: (
          <ScreenCycle
            url="scalpscreener.app"
            frames={[
              {
                src: img("scalp-grid.jpg"),
                alt: "ScalpScreener chart grid",
                cursor: [42, 30],
              },
              {
                src: img("scalp-radar.jpg"),
                alt: "ScalpScreener volume radar",
                cursor: [86, 40],
              },
              {
                src: img("scalp-dash.jpg"),
                alt: "ScalpScreener dashboard",
                cursor: [80, 12],
              },
            ]}
          />
        ),
      },
    },
    {
      key: "web",
      tone: "violet",
      shape: "twist",
      project: {
        name: "Nano Scalp",
        href: p("nano-scalp-landing"),
        media: (
          <ScreenScroll
            src={img("nano-full.jpg")}
            url="nanoscalp.io"
            alt="Nano Scalp"
          />
        ),
      },
    },
    {
      key: "ux",
      tone: "light",
      shape: "discs",
      project: {
        name: "Proboi Scanner",
        href: p("proboi-breakout-scanner"),
        media: (
          <CandleStream
            labels={{
              soon: ti("soon"),
              confirmed: ti("confirmed"),
              score: ti("score"),
            }}
          />
        ),
      },
    },
  ];

  return (
    <>
      <section className="u-dark u-panel u-cx-hero">
        <div className="u-wrap u-cx-hero__grid">
          <div className="u-cx-hero__inner">
            <p
              className="u-cx-eyebrow u-enter"
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              <span className="u-cx-dot" aria-hidden />
              {t("eyebrow")}
            </p>
            <h1 className="u-cx-hero__title" aria-label={title}>
              {title.split(" ").map((w, i) => (
                <span key={i} className="u-rise" aria-hidden>
                  <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
                </span>
              ))}
            </h1>
            <p className="u-cx-hero__lead u-enter">{t("lead")}</p>
            <Link
              href={`/${locale}/contact`}
              className="u-btn u-btn--accent u-btn--lg u-enter"
              style={{ "--d": "450ms" } as React.CSSProperties}
            >
              {t("cta")}
              <ArrowRight />
            </Link>
          </div>
          <div className="u-cx-hero__scene">
            <Shapes variant="cubes" />
          </div>
        </div>
        <div className="u-wrap u-cx-built">
          <span>{t("built")}</span>
          <ul>
            {built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="u-section u-cx-need">
        <div className="u-wrap u-cx-need__grid">
          <Reveal>
            <h2 className="u-cx-h2">{t("needTitle")}</h2>
          </Reveal>
          <Reveal className="u-cx-need__text" delay={0.08}>
            <p>{t("needBody")}</p>
            <p>{t("needBody2")}</p>
          </Reveal>
        </div>
      </section>

      <section className="u-section u-cx-full">
        <div className="u-wrap">
          <Reveal className="u-cx-full__head">
            <h2 className="u-cx-h2">{t("fullTitle")}</h2>
            <p>{t("fullBody")}</p>
          </Reveal>
        </div>
        <div className="u-cx-strip" aria-hidden>
          <div className="u-cx-strip__track">
            {[...strip, ...strip].map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={img(s)} alt="" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {services.map((s) => (
        <section
          key={s.key}
          className={`u-cx-svc ${s.tone === "light" ? "" : "u-dark"} u-panel`}
          data-tone={s.tone}
        >
          <div className="u-wrap">
            <div className="u-cx-svc__top">
              <Reveal className="u-cx-svc__text">
                <p className="u-cx-eyebrow">
                  <span className="u-cx-dot" aria-hidden />
                  {t(`${s.key}Eyebrow`)}
                </p>
                <h2 className="u-cx-h2">{t(`${s.key}Title`)}</h2>
                <p>{t(`${s.key}Body`)}</p>
                <p className="u-cx-svc__strong">{t(`${s.key}Strong`)}</p>
              </Reveal>
              <div className="u-cx-svc__scene">
                <Shapes variant={s.shape} />
              </div>
            </div>

            <Reveal className="u-cx-feat">
              <div className="u-cx-feat__media">{s.project.media}</div>
              <div className="u-cx-feat__meta">
                <span>{t("featured")}</span>
                <strong>{s.project.name}</strong>
                <Link href={s.project.href} className="u-arrow-link">
                  {t("caseStudy")}
                  <ArrowUpRight />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
