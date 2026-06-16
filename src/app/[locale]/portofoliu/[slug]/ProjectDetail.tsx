"use client";
import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { t as tLocale } from "@/sanity/lib/locale";
import { urlFor } from "@/sanity/lib/image";
import { Lightbox } from "@/components/ui/Lightbox";

type LocaleField = Record<string, string | null | undefined> | null;

type GalleryImage = {
  asset?: { _ref?: string };
  caption?: string;
};

type PortfolioProject = {
  _id: string;
  title: LocaleField;
  slug: { current: string } | null;
  category: string;
  categoryLabel: LocaleField;
  mainImage?: { asset?: { _ref?: string } } | null;
  color?: string | null;
  description?: LocaleField;
  client?: LocaleField;
  year?: number | null;
  results?: LocaleField;
  gallery?: GalleryImage[] | null;
};

type RelatedItem = {
  _id: string;
  title: LocaleField;
  categoryLabel: LocaleField;
  mainImage?: { asset?: { _ref?: string } } | null;
  color?: string | null;
  slug?: { current: string } | null;
};

type Props = {
  project: PortfolioProject;
  related: RelatedItem[];
};

export function ProjectDetail({ project, related }: Props) {
  const locale = useLocale();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build full image list: mainImage + gallery
  const allImages: string[] = [];
  if (project.mainImage?.asset?._ref) {
    allImages.push(urlFor(project.mainImage).width(1600).height(1000).url());
  }
  (project.gallery ?? []).forEach((g) => {
    if (g.asset?._ref) {
      allImages.push(urlFor(g).width(1600).height(1000).url());
    }
  });

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevSlide = () => setLightboxIndex((i) => (i === null || i === 0 ? allImages.length - 1 : i - 1));
  const nextSlide = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % allImages.length));

  const title = tLocale(project.title, locale);
  const description = tLocale(project.description, locale);
  const client = tLocale(project.client, locale);
  const results = tLocale(project.results, locale);
  const catLabel = tLocale(project.categoryLabel, locale);

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox
          images={allImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevSlide}
          onNext={nextSlide}
        />
      )}

      {/* Hero image */}
      {allImages[0] && (
        <div
          className="relative w-full cursor-zoom-in overflow-hidden"
          style={{ maxHeight: "70vh", minHeight: 320, backgroundColor: project.color ?? "#1e3a8a" }}
          onClick={() => openLightbox(0)}
        >
          <img
            src={allImages[0]}
            alt={title ?? ""}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            style={{ maxHeight: "70vh" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent" />

          {/* Expand hint */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs text-white/80 backdrop-blur-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            {allImages.length > 1 ? `${allImages.length} imagini` : "Mărește"}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="section-container max-w-4xl py-16">

        {/* Back link + category badge — stacked on mobile */}
        <div className="mb-8 flex flex-col gap-4">
          <Link
            href={`/${locale}/portofoliu`}
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Înapoi la portofoliu
          </Link>

          <span
            className="inline-block self-start rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest"
            style={{ background: "var(--color-accent)", color: "#000" }}
          >
            {catLabel}
          </span>
        </div>

        {/* Title */}
        <h1
          className="mb-6 text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h1>

        {/* Meta row */}
        <div className="mb-10 flex flex-wrap gap-6 border-b pb-10" style={{ borderColor: "var(--color-border)" }}>
          {client && (
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Client</p>
              <p className="mt-1 font-semibold" style={{ color: "var(--color-text-primary)" }}>{client}</p>
            </div>
          )}
          {project.year && (
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>An</p>
              <p className="mt-1 font-semibold" style={{ color: "var(--color-text-primary)" }}>{project.year}</p>
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>Categorie</p>
            <p className="mt-1 font-semibold" style={{ color: "var(--color-text-primary)" }}>{catLabel}</p>
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="mb-12">
            <h2 className="mb-4 text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
              Despre proiect
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
              {description}
            </p>
          </div>
        )}

        {/* Results */}
        {results && (
          <div
            className="mb-12 rounded-2xl p-6"
            style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="mb-3 text-xs uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
              Rezultate
            </p>
            <p className="text-sm leading-relaxed text-white/80">{results}</p>
          </div>
        )}

        {/* Gallery grid */}
        {allImages.length > 1 && (
          <div className="mb-12">
            <h2 className="mb-6 text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
              Galerie
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className="group relative overflow-hidden rounded-2xl"
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={src}
                    alt={`Imagine ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related projects */}
      {related.length > 0 && (
        <section
          className="border-t py-16"
          style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}
        >
          <div className="section-container">
            <h2 className="mb-8 text-2xl font-black uppercase tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Proiecte similare
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {related.map((rel) => {
                const relImg = rel.mainImage?.asset?._ref
                  ? urlFor(rel.mainImage).width(600).height(400).url()
                  : null;
                const slug = rel.slug?.current;
                return (
                  <Link
                    key={rel._id}
                    href={slug ? `/${locale}/portofoliu/${slug}` : `/${locale}/portofoliu`}
                    className="group relative overflow-hidden rounded-3xl"
                    style={{ minHeight: 240, backgroundColor: rel.color ?? "#1e3a8a" }}
                  >
                    {relImg && (
                      <img
                        src={relImg}
                        alt={tLocale(rel.title, locale) ?? ""}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-end p-5">
                      <div>
                        <p className="text-xs text-white/60">{tLocale(rel.categoryLabel, locale)}</p>
                        <h3 className="mt-1 text-base font-black uppercase text-white">{tLocale(rel.title, locale)}</h3>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
