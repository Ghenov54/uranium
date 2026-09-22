import Link from "next/link";
import type { ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/u/Reveal";
import { ArrowRight } from "@/components/u/icons";
import { CandleStream } from "@/components/u/industries/CandleStream";
import { ScreenCycle } from "@/components/u/industries/ScreenCycle";
import { SpreadFlow } from "@/components/u/industries/SpreadFlow";
import { Shapes } from "@/components/u/three/Shapes";

type Industry = { key: "crypto" | "trading" | "payments" | "analytics"; tags: string[]; href: string; cta: string; media: ReactNode };

/** Clay's industries page, narrowed to money: every block shows real finance work, the screens always in motion. */
export default async function IndustriesPage() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("industries")]);
  const p = (slug: string) => `/${locale}/portofoliu/${slug}`;
  const img = (f: string) => `/industries/${f}`;

  const industries: Industry[] = [
    {
      key: "crypto",
      tags: ["ScalpScreener", "Nano Scalp", "Proboi Scanner"],
      href: `/${locale}/industrii/crypto`,
      cta: t("exploreCrypto"),
      media: <CandleStream labels={{ soon: t("soon"), confirmed: t("confirmed"), score: t("score") }} />,
    },
    {
      key: "trading",
      tags: ["Arbitrage Pro", "Proboi Scanner"],
      href: p("proboi-breakout-scanner"),
      cta: t("explore"),
      media: <SpreadFlow label={t("spread")} />,
    },
    {
      key: "payments",
      tags: t.raw("caps.payments") as string[],
      href: `/${locale}/contact`,
      cta: t("talk"),
      media: (
        <div className="u-ind__stage">
          <Shapes variant="cards" />
        </div>
      ),
    },
    {
      key: "analytics",
      tags: ["ScalpScreener", "Nano Scalp"],
      href: p("scalpscreener-trading-platform"),
      cta: t("explore"),
      media: (
        <ScreenCycle
          url="scalpscreener.app"
          frames={[
            { src: img("scalp-dash.jpg"), alt: "ScalpScreener dashboard", cursor: [80, 12] },
            { src: img("scalp-grid.jpg"), alt: "ScalpScreener chart grid", cursor: [42, 30] },
            { src: img("scalp-radar.jpg"), alt: "ScalpScreener volume radar", cursor: [86, 40] },
            { src: img("scalp-draw.jpg"), alt: "ScalpScreener drawing tools", cursor: [24, 54] },
          ]}
        />
      ),
    },
  ];

  const rows = ["defi", "exchanges", "neobanks", "wealth", "pos", "insurtech"] as const;
  const title = t("title");

  return (
    <>
      <section className="u-dark u-panel u-ind">
        <div className="u-wrap">
          <header className="u-ind__head">
            <h1 className="u-ind__title" aria-label={title}>
              {title.split(" ").map((w, i) => (
                <span key={i} className="u-rise" aria-hidden>
                  <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
                </span>
              ))}
            </h1>
            <p className="u-ind__lead u-enter">{t("lead")}</p>
          </header>

          {industries.map((ind) => (
            <article key={ind.key} className="u-ind__block" id={ind.key}>
              <Reveal className="u-ind__text">
                <h2>{t(`${ind.key}.title`)}</h2>
                <p>{t(`${ind.key}.lead`)}</p>
                <ul className="u-ind__clients">
                  {ind.tags.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <Link href={ind.href} className="u-arrow-link">
                  {ind.cta}
                  <ArrowRight />
                </Link>
              </Reveal>
              <Reveal className="u-ind__media" delay={0.1}>
                {ind.media}
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section className="u-section u-ind-more">
        <div className="u-wrap">
          <Reveal>
            <h2 className="u-bsec__title">{t("more")}</h2>
            <p className="u-bsec__lead">{t("moreLead")}</p>
          </Reveal>
          <ul className="u-ind-more__rows">
            {rows.map((r, i) => (
              <li key={r}>
                <Reveal delay={i * 0.04}>
                  <div className="u-ind-more__row">
                    <strong>{t(`rows.${r}.name`)}</strong>
                    <span>{t(`rows.${r}.what`)}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
