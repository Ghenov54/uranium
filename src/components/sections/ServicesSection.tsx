"use client";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import Link from "next/link";
import { t as tLocale } from "@/sanity/lib/locale";

type SanityServiceItem = {
  _id: string;
  name: Record<string, string | null | undefined> | null;
  slug: { current: string } | null;
  description: Record<string, string | null | undefined> | null;
  tags: string[] | null;
};

type Props = { items?: SanityServiceItem[] };

const FALLBACK_SERVICES: SanityServiceItem[] = [
  { _id: "web", name: { ro: "Dezvoltare Web", en: "Web Development", ru: "Веб-разработка" }, slug: { current: "web" }, description: { ro: "Soluții web care convertesc.", en: "Web solutions that convert.", ru: "Веб-решения, которые конвертируют." }, tags: ["React", "Next.js", "E-Commerce", "Landing Pages"] },
  { _id: "apps", name: { ro: "Aplicații", en: "Applications", ru: "Приложения" }, slug: { current: "aplicatii" }, description: { ro: "Software custom.", en: "Custom software.", ru: "Кастомное ПО." }, tags: ["iOS", "Android", "Web App", "PWA"] },
  { _id: "marketing", name: { ro: "Marketing Digital", en: "Digital Marketing", ru: "Цифровой маркетинг" }, slug: { current: "marketing" }, description: { ro: "Creștem branduri.", en: "We grow brands.", ru: "Растим бренды." }, tags: ["SEO", "Google Ads", "Meta Ads", "Social Media"] },
  { _id: "business", name: { ro: "Soluții Business", en: "Business Solutions", ru: "Бизнес-решения" }, slug: { current: "business" }, description: { ro: "Automatizăm operațiunile.", en: "We automate operations.", ru: "Автоматизируем операции." }, tags: ["CRM", "ERP", "Automation", "Consulting"] },
  { _id: "design", name: { ro: "Design & Branding", en: "Design & Branding", ru: "Дизайн и брендинг" }, slug: { current: "design" }, description: { ro: "Identitate vizuală.", en: "Visual identity.", ru: "Визуальная идентичность." }, tags: ["UI/UX", "Branding", "Identity", "Prototyping"] },
];

export function ServicesSection({ items }: Props) {
  const t = useTranslations("services");
  const locale = useLocale();
  const [active, setActive] = useState<string | null>("apps");
  const [hovered, setHovered] = useState<string | null>(null);

  const services = items && items.length > 0 ? items : FALLBACK_SERVICES;

  return (
    <section className="py-24" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
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
          <Link
            href={`/${locale}/servicii`}
            className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Toate serviciile
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="divide-y divide-[var(--color-border)]">
          {services.map((service) => {
            const id = service._id;
            const isActive = active === id;
            const slug = service.slug?.current ?? id;
            const name = tLocale(service.name, locale);
            const description = tLocale(service.description, locale);
            const tags = service.tags ?? [];
            return (
              <div
                key={id}
                className="cursor-pointer px-4 py-8 transition-colors sm:px-6"
                style={{
                  background: isActive
                    ? "var(--color-row-active)"
                    : hovered === id
                    ? "var(--color-row-hover)"
                    : undefined,
                }}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setActive(isActive ? null : id)}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex-1">
                    <h3
                      className="text-3xl font-black uppercase tracking-tight transition-colors md:text-4xl"
                      style={{ color: isActive ? "var(--color-heading-active)" : "var(--color-text-primary)" }}
                    >
                      {name}
                    </h3>
                    {isActive && (
                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
                        <p className="max-w-xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                          {description}
                        </p>
                        <Link
                          href={`/${locale}/servicii/${slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold transition-all hover:bg-[var(--color-accent)] hover:text-black"
                          style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
                        >
                          Descoperă serviciul →
                        </Link>
                      </div>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                          style={
                            isActive
                              ? { background: "var(--color-tag-active-bg)", borderColor: "var(--color-tag-active-border)", color: "var(--color-tag-active-text)" }
                              : { borderColor: "var(--color-border)", color: "var(--color-text-muted)" }
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/${locale}/servicii/${slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex size-12 shrink-0 items-center justify-center rounded-full border transition-all hover:bg-[var(--color-accent)] hover:text-black"
                    style={
                      isActive
                        ? { borderColor: "var(--color-accent)", background: "var(--color-accent)", color: "#000" }
                        : { borderColor: "var(--color-border)", color: "var(--color-text-muted)" }
                    }
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/servicii`}
            className="inline-flex items-center gap-3 rounded-full border px-10 py-4 text-sm font-semibold transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
          >
            Toate serviciile noastre
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
