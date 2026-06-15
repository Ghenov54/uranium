"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { projects } from "@/data/portfolio";
import type { ProjectCategory } from "@/data/portfolio";

type Filter = "all" | ProjectCategory;

export function PortfolioGrid() {
  const t = useTranslations("portfolioPage");
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "web", label: t("filterWeb") },
    { key: "apps", label: t("filterApps") },
    { key: "marketing", label: t("filterMarketing") },
    { key: "design", label: t("filterDesign") },
    { key: "business", label: t("filterBusiness") },
  ];

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="mb-10 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={
              filter === f.key
                ? { background: "var(--color-accent)", color: "#000" }
                : { background: "var(--color-bg-surface)", color: "var(--color-text-muted)" }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <div
            key={project.id}
            className="group relative overflow-hidden rounded-3xl"
            style={{ backgroundColor: project.color }}
          >
            <div className="aspect-[4/3] w-full" />
            <div className="flex items-end justify-between p-6">
              <div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="mt-1 text-sm text-white/60">{project.categoryLabel}</p>
              </div>
              <div className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-16 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
