"use client";
import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { t as tLocale } from "@/sanity/lib/locale";
import { urlFor } from "@/sanity/lib/image";
import { Lightbox } from "@/components/ui/Lightbox";

type SanityPortfolioItem = {
  _id: string;
  title: Record<string, string | null | undefined> | null;
  category: string;
  categoryLabel: Record<string, string | null | undefined> | null;
  mainImage?: { asset?: { _ref?: string } } | null;
  color?: string | null;
  slug?: { current: string } | null;
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
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];

  const openLightbox = (src: string) => {
    setLightboxImages([src]);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  return (
    <div>
      {lightboxOpen && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, i - 1))}
          onNext={() => setLightboxIndex((i) => Math.min(lightboxImages.length - 1, i + 1))}
        />
      )}

      {/* Filter tabs */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => {
          const bgImage = project.mainImage?.asset?._ref
            ? urlFor(project.mainImage).width(900).height(600).url()
            : null;
          const slug = project.slug?.current;
          const href = slug ? `/${locale}/portofoliu/${slug}` : `/${locale}/portofoliu`;

          return (
            <div
              key={project._id}
              className="group relative overflow-hidden rounded-3xl"
              style={{ backgroundColor: project.color ?? "#1e3a8a" }}
            >
              {/* Image — click opens lightbox */}
              <div
                className="relative cursor-zoom-in overflow-hidden"
                style={{ aspectRatio: "4/3" }}
                onClick={() => bgImage && openLightbox(bgImage)}
              >
                {bgImage ? (
                  <img
                    src={bgImage}
                    alt={tLocale(project.title, locale) ?? ""}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full" style={{ background: project.color ?? "#1e3a8a" }} />
                )}

                {/* Expand icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/20">
                  <div className="flex size-12 items-center justify-center rounded-full border border-white/0 bg-black/0 text-white opacity-0 backdrop-blur-sm transition-all group-hover:border-white/40 group-hover:bg-black/40 group-hover:opacity-100">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info bar — click navigates to detail page */}
              <Link href={href} className="flex items-end justify-between p-5 hover:opacity-90">
                <div>
                  <h3 className="text-lg font-bold text-white">{tLocale(project.title, locale)}</h3>
                  <p className="mt-0.5 text-sm text-white/60">{tLocale(project.categoryLabel, locale)}</p>
                </div>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </Link>
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
