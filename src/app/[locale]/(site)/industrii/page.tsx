import Link from "next/link";
import type { ReactNode } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/u/Reveal";
import { ArrowRight } from "@/components/u/icons";
import { CandleStream } from "@/components/u/industries/CandleStream";
import { ScreenScroll } from "@/components/u/industries/ScreenScroll";
import { ScreenCycle } from "@/components/u/industries/ScreenCycle";

type Industry = { key: "crypto" | "fintech" | "security" | "commerce"; clients: string[]; href: string; media: ReactNode };

/** Clay's industries page: each field gets its own block of real work, the screens always in motion. */
export default async function IndustriesPage() {
  const [locale, t] = await Promise.all([getLocale(), getTranslations("industries")]);
  const p = (slug: string) => `/${locale}/portofoliu/${slug}`;
  const img = (f: string) => `/industries/${f}`;

  const industries: Industry[] = [
    {
      key: "crypto",
      clients: ["ScalpScreener", "Nano Scalp", "Proboi Scanner"],
      href: p("scalpscreener-trading-platform"),
      media: <CandleStream labels={{ soon: t("soon"), confirmed: t("confirmed"), score: t("score") }} />,
    },
    {
      key: "fintech",
      clients: ["ScalpScreener", "Proboi Scanner"],
      href: p("proboi-breakout-scanner"),
      media: (
        <ScreenCycle
          url="scalpscreener.app"
          frames={[
            { src: img("scalp-dash.jpg"), alt: "ScalpScreener dashboard", cursor: [80, 12] },
            { src: img("scalp-grid.jpg"), alt: "ScalpScreener chart grid", cursor: [42, 30] },
            { src: img("scalp-radar.jpg"), alt: "ScalpScreener volume radar", cursor: [86, 40] },
            { src: img("proboi.jpg"), alt: "Proboi Scanner", cursor: [12, 22] },
          ]}
        />
      ),
    },
    {
      key: "security",
      clients: ["Watt Security", "Watt Security Shop"],
      href: p("watt-security-website"),
      media: <ScreenScroll src={img("watt-full.jpg")} url="watt-security.md" alt="Watt Security" />,
    },
    {
      key: "commerce",
      clients: ["Watt Security Shop", "Nano Scalp"],
      href: p("watt-security-online-store"),
      media: (
        <ScreenCycle
          url="shop.watt-security.md"
          hold={3800}
          frames={[
            { src: img("shop-home.jpg"), alt: "Watt Security Shop home", cursor: [14, 22] },
            { src: img("shop-catalog.jpg"), alt: "Watt Security Shop catalogue", cursor: [34, 58] },
            { src: img("shop-product.jpg"), alt: "Watt Security Shop product", cursor: [74, 44] },
          ]}
        />
      ),
    },
  ];

  const rows = ["startups", "business", "realestate", "health", "education", "food"] as const;
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
                  {ind.clients.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <Link href={ind.href} className="u-arrow-link">
                  {t("explore")}
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
