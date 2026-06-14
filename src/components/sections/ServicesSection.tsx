"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

type Service = {
  key: string;
  tags: string[];
};

const services: Service[] = [
  { key: "web", tags: ["React", "Next.js", "E-Commerce", "Landing Pages"] },
  { key: "apps", tags: ["iOS", "Android", "Web App", "PWA"] },
  { key: "marketing", tags: ["SEO", "Google Ads", "Meta Ads", "Social Media"] },
  { key: "business", tags: ["CRM", "ERP", "Automation", "Consulting"] },
  { key: "design", tags: ["UI/UX", "Branding", "Identity", "Prototyping"] },
];

export function ServicesSection() {
  const t = useTranslations("services");
  const [active, setActive] = useState<string | null>("apps");

  return (
    <section className="py-24" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[var(--color-text-muted)]" />
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                {t("label")}
              </span>
            </div>
            <h2 className="text-5xl font-black uppercase leading-tight tracking-tight text-[var(--color-text-primary)] md:text-6xl">
              {t("heading")}
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[var(--color-text-muted)]">
            Soluții complete pentru fiecare etapă a creșterii tale digitale.
          </p>
        </div>

        {/* Service rows */}
        <div className="divide-y divide-[var(--color-border)]">
          {services.map((service) => {
            const isActive = active === service.key;
            return (
              <div
                key={service.key}
                className={`group cursor-pointer py-8 transition-colors ${
                  isActive ? "bg-accent/5" : "hover:bg-white/5"
                }`}
                onClick={() => setActive(isActive ? null : service.key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-6">
                      <h3
                        className={`text-3xl font-black uppercase tracking-tight transition-colors md:text-4xl ${
                          isActive
                            ? "text-accent"
                            : "text-[var(--color-text-primary)]"
                        }`}
                      >
                        {t(service.key as "web" | "apps" | "marketing" | "business" | "design")}
                      </h3>
                    </div>
                    {isActive && (
                      <p className="mt-3 max-w-xl text-sm text-[var(--color-text-muted)]">
                        {t(`${service.key}Desc` as "webDesc" | "appsDesc" | "marketingDesc" | "businessDesc" | "designDesc")}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                            isActive
                              ? "border-accent/40 bg-accent/10 text-accent"
                              : "border-[var(--color-border)] text-[var(--color-text-muted)]"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full border transition-all ${
                      isActive
                        ? "border-accent bg-accent text-black"
                        : "border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:border-accent group-hover:text-accent"
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7"/>
                      <polyline points="7 7 17 7 17 17"/>
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
