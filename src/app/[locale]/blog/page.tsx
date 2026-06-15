import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { client } from "@/sanity/client";
import { POSTS_QUERY } from "@/sanity/queries/posts";
import { urlFor } from "@/sanity/lib/image";

export const dynamic = "force-dynamic";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";

type SanityPost = {
  _id: string;
  title: string | null;
  slug: { current: string } | null;
  excerpt: string | null;
  mainImage?: { asset?: { _ref?: string } } | null;
  publishedAt: string | null;
  tags: string[] | null;
  language: string | null;
};

export default async function BlogPage() {
  const [t, locale] = await Promise.all([
    getTranslations("blog"),
    getLocale(),
  ]);

  const posts = await client
    .fetch<SanityPost[]>(POSTS_QUERY, { locale })
    .catch(() => []);

  return (
    <>
      <PageHero label={t("label")} title={t("heading")} subtitle={t("subtitle")} />

      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          {posts.length === 0 ? (
            <p
              className="text-center py-16 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("noPostsFound")}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const imageUrl = post.mainImage?.asset?._ref
                  ? urlFor(post.mainImage).width(800).height(450).url()
                  : null;
                return (
                  <Link
                    key={post._id}
                    href={`/${locale}/blog/${post.slug?.current ?? ""}`}
                    className="group flex flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-1"
                    style={{
                      background: "var(--color-bg-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={post.title ?? ""}
                        className="aspect-video w-full object-cover"
                      />
                    ) : (
                      <div
                        className="aspect-video w-full"
                        style={{ background: "var(--color-bg-elevated)" }}
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      {post.tags && post.tags.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full px-3 py-1 text-xs font-medium"
                              style={{
                                background: "var(--color-accent)",
                                color: "#000",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h2
                        className="mb-2 text-lg font-black uppercase leading-tight tracking-tight"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p
                          className="mb-4 flex-1 text-sm leading-relaxed line-clamp-3"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between">
                        {post.publishedAt && (
                          <time
                            className="text-xs"
                            style={{ color: "var(--color-text-muted)" }}
                          >
                            {new Date(post.publishedAt).toLocaleDateString(
                              locale,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </time>
                        )}
                        <span
                          className="text-xs font-medium"
                          style={{ color: "var(--color-accent)" }}
                        >
                          {t("readMore")} →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
