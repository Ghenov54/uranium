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
    <section
      className="border-t py-24"
      style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}
    >
      <div className="section-container">
        <AnimateIn className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[var(--color-text-muted)]" />
              <span className="text-xs uppercase tracking-widest text-[var(--color-text-muted)]">
                {t("label")}
              </span>
            </div>
            <h2
              className="text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl"
              style={{ color: "var(--color-text-primary)" }}
            >
              {t("heading")}
            </h2>
          </div>
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--color-accent)]"
            style={{ color: "var(--color-text-muted)" }}
          >
            Toate articolele
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {displayed.map((post, i) => {
            const imageUrl = post.mainImage?.asset?._ref
              ? urlFor(post.mainImage).width(700).height(440).url()
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
                  className="group flex h-full flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-1"
                  style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
                >
                  {imageUrl ? (
                    <div className="overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={post.title ?? ""}
                        className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${isFeature ? "aspect-[16/9]" : "aspect-video"}`}
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-full ${isFeature ? "aspect-[16/9]" : "aspect-video"}`}
                      style={{ background: "var(--color-bg-surface)" }}
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {post.tags && post.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full px-3 py-1 text-xs font-medium"
                            style={{ background: "var(--color-accent)", color: "#000" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3
                      className={`mb-2 font-black uppercase leading-tight tracking-tight ${isFeature ? "text-xl md:text-2xl" : "text-base"}`}
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p
                        className="mb-4 flex-1 text-sm leading-relaxed line-clamp-2"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between">
                      {post.publishedAt && (
                        <time className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                          {new Date(post.publishedAt).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      )}
                      <span className="text-xs font-semibold transition-colors group-hover:underline" style={{ color: "var(--color-accent)" }}>
                        {t("readMore")} →
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            );
          })}
        </div>

        <AnimateIn delay={300} className="mt-12 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-3 rounded-full border px-10 py-4 text-sm font-semibold transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:scale-105"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
          >
            Explorează blogul
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
