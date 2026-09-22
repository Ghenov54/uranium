"use client";
import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { t as tl } from "@/sanity/lib/locale";
import { ArrowUpRight } from "@/components/u/icons";

type LocaleField = Record<string, string | null | undefined> | null;
type SanityPricingItem = { name: LocaleField; includes: LocaleField[]; priceFrom: number; unit: LocaleField };
export type SanityPricingService = { _id: string; key: string; items: SanityPricingItem[]; order?: number | null };

const KEYS = ["web", "apps", "marketing", "business", "design"] as const;

export function PricingContent({ services }: { services: SanityPricingService[] }) {
  const t = useTranslations("pricing");
  const tn = useTranslations("nav");
  const locale = useLocale();
  const available = KEYS.filter((k) => services.some((s) => s.key === k));
  const [active, setActive] = useState<string>(available[0] ?? "web");
  const service = services.find((s) => s.key === active);
  const money = new Intl.NumberFormat(locale === "ro" ? "ro-RO" : locale === "ru" ? "ru-RU" : "en-GB");

  return (
    <>
      <div className="u-filters" role="tablist" aria-label={t("heading")}>
        {available.map((k) => (
          <button key={k} type="button" role="tab" aria-selected={active === k} onClick={() => setActive(k)}>
            {t(`tab.${k}`)}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {service && (
          <motion.div
            key={active}
            className="u-plans"
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            {service.items.map((item, i) => (
              <article key={i} className="u-plan">
                <h2 className="u-plan__name">{tl(item.name, locale)}</h2>
                <p className="u-plan__price">
                  <span className="u-plan__from">{t("from")}</span>
                  <span className="u-tnum">{money.format(item.priceFrom)} €</span>
                  {item.unit && <span className="u-plan__unit">{tl(item.unit, locale)}</span>}
                </p>
                <h3 className="u-plan__inc">{t("includes")}</h3>
                <ul>
                  {item.includes.map((inc, j) => (
                    <li key={j}>{tl(inc, locale)}</li>
                  ))}
                </ul>
                <Link href={`/${locale}/contact`} className="u-btn u-btn--line u-plan__cta">
                  {tn("cta")}
                  <ArrowUpRight />
                </Link>
              </article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
