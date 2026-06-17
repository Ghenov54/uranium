"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { AnimateIn } from "@/components/ui/AnimateIn";

type SanityPost = {
  _id: string;
  title: string | null;
  slug: { current: string } | null;
  excerpt: string | null;
  mainImage?: { asset?: { _ref?: string } } | null;
  publishedAt: string | null;
  tags: string[] | null;
};

type Props = { posts?: SanityPost[] };

export function BlogPreviewSection({ posts }: Props) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const displayed = (posts ?? []).slice(0, 3);

  if (displayed.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-28" style={{ background: "#020204" }}>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />

      {/* Accent glow top-right */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "rgba(180,245,0,0.06)" }}
        aria-hidden
      />

      {/* Accent glow bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: "rgba(30,58,138,0.25)" }}
        aria-hidden
      />

      {/* Large watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
        aria-hidden
      >
        <p className="text-[22vw] font-black uppercase leading-none tracking-tight text-white/[0.025]">
          BLOG
        </p>
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <AnimateIn className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--color-accent)" }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
                {t("label")}
              </span>
            </div>
            <h2 className="text-5xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-6xl lg:text-7xl">
              {t("heading")}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="group flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
          >
            Toate articolele
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </AnimateIn>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {displayed.map((post, i) => {
            const imageUrl = post.mainImage?.asset?._ref
              ? urlFor(post.mainImage).width(800).height(500).url()
              : null;
            const isFeature = i === 0;
            return (
              <AnimateIn
                key={post._id}
                delay={i * 120}
                className={isFeature ? "md:col-span-2 md:row-span-2" : ""}
              >
                <Link
                  href={`/${locale}/blog/${post.slug?.current ?? ""}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = "rgba(180,245,0,0.25)")}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                >
                  {/* Image */}
                  {imageUrl ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={post.title ?? ""}
                        className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${isFeature ? "aspect-[16/9]" : "aspect-video"}`}
                      />
                      {/* Gradient overlay on image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Tags on top of image */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full px-3 py-1 text-xs font-bold backdrop-blur-sm"
                              style={{ background: "var(--color-accent)", color: "#000" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`relative w-full ${isFeature ? "aspect-[16/9]" : "aspect-video"}`}
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      {post.tags && post.tags.length > 0 && (
                        <div className="absolute bottom-3 left-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full px-3 py-1 text-xs font-bold"
                              style={{ background: "var(--color-accent)", color: "#000" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3
                      className={`mb-2 font-black uppercase leading-tight tracking-tight text-white ${isFeature ? "text-xl md:text-2xl" : "text-base"}`}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mb-4 flex-1 text-sm leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                      {post.publishedAt && (
                        <time className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {new Date(post.publishedAt).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      )}
                      <span
                        className="flex items-center gap-1 text-xs font-bold transition-all group-hover:gap-2"
                        style={{ color: "var(--color-accent)" }}
                      >
                        {t("readMore")}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>

        {/* CTA */}
        <AnimateIn delay={300} className="mt-14 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-3 rounded-full px-10 py-4 text-sm font-bold text-black transition-all hover:scale-105 hover:opacity-90"
            style={{ background: "var(--color-accent)" }}
          >
            Explorează blogul
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
