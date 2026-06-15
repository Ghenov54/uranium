"use client";
import { useTranslations } from "next-intl";
import { Tabs } from "@/components/ui/Tabs";
import { pricingData } from "@/data/pricing";
import Link from "next/link";
import { useLocale } from "next-intl";

export function PricingContent() {
  const t = useTranslations("pricing");
  const locale = useLocale();

  const tabs = [
    { key: "web", label: t("tab.web") },
    { key: "apps", label: t("tab.apps") },
    { key: "marketing", label: t("tab.marketing") },
    { key: "business", label: t("tab.business") },
    { key: "design", label: t("tab.design") },
  ];

  return (
    <Tabs tabs={tabs}>
      {(activeKey) => {
        const service = pricingData.find((s) => s.key === activeKey);
        if (!service) return null;
        return (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.items.map((item) => (
              <div
                key={item.name}
                className="flex flex-col justify-between rounded-3xl p-8"
                style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
              >
                <div>
                  <h3
                    className="text-xl font-black uppercase tracking-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="mt-1 text-xs uppercase tracking-widest"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {t("includes")}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {item.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                        <span className="mt-0.5 shrink-0 text-xs" style={{ color: "var(--color-accent)" }}>✓</span>
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <p className="text-3xl font-black" style={{ color: "var(--color-text-primary)" }}>
                    <span className="text-sm font-normal" style={{ color: "var(--color-text-muted)" }}>
                      {t("from")}{" "}
                    </span>
                    {item.priceFrom.toLocaleString("ro-RO")} €
                    {item.unit && (
                      <span className="text-sm font-normal" style={{ color: "var(--color-text-muted)" }}>
                        {item.unit}
                      </span>
                    )}
                  </p>
                  <Link
                    href={`/${locale}/contact`}
                    className="mt-4 block w-full rounded-lg py-3 text-center text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-80"
                    style={{ background: "var(--color-accent)", color: "#000" }}
                  >
                    {t("contactCta")}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        );
      }}
    </Tabs>
  );
}
