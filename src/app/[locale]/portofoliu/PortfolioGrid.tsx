"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { t as tLocale } from "@/sanity/lib/locale";
import { urlFor } from "@/sanity/lib/image";

type SanityPortfolioItem = {
  _id: string;
  title: Record<string, string | null | undefined> | null;
  category: string;
  categoryLabel: Record<string, string | null | undefined> | null;
  mainImage?: { asset?: { _ref?: string } } | null;
  color?: string | null;
};

type Props = { projects: SanityPortfolioItem[] };

const FILTER_LABELS: Record<string, string> = {
  all: "Toate",
  web: "Web",
  apps: "Aplicații",
  marketing: "Marketing",
  design: "Design",
  business: "Business",
};

export function PortfolioGrid({ projects }: Props) {
  const locale = useLocale();
  const t = useTranslations("portfolioPage");
  const [filter, setFilter] = useState<string>("all");

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={
              filter === cat
                ? { background: "var(--color-accent)", color: "#000" }
                : { background: "var(--color-bg-surface)", color: "var(--color-text-muted)" }
            }
          >
            {cat === "all" ? t("filterAll") : (FILTER_LABELS[cat] ?? cat)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => {
          const bgImage = project.mainImage?.asset?._ref
            ? urlFor(project.mainImage).width(800).url()
            : null;
          return (
            <div
              key={project._id}
              className="group relative overflow-hidden rounded-3xl"
              style={{ backgroundColor: project.color ?? "#1e3a8a" }}
            >
              {bgImage ? (
                <img
                  src={bgImage}
                  alt={tLocale(project.title, locale)}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div className="aspect-[4/3] w-full" />
              )}
              <div className="flex items-end justify-between p-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{tLocale(project.title, locale)}</h3>
                  <p className="mt-1 text-sm text-white/60">{tLocale(project.categoryLabel, locale)}</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7"/>
                    <polyline points="7 7 17 7 17 17"/>
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
          Nu există proiecte în această categorie.
        </p>
      )}
    </div>
  );
}
