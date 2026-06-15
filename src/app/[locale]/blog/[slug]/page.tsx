import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { POST_QUERY, RELATED_POSTS_QUERY } from "@/sanity/queries/posts";
import { urlFor } from "@/sanity/lib/image";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";

export const dynamic = "force-dynamic";

type SanityPost = {
  _id: string;
  title: string | null;
  slug: { current: string } | null;
  excerpt: string | null;
  mainImage?: { asset?: { _ref?: string } } | null;
  publishedAt: string | null;
  tags: string[] | null;
  language: string | null;
  body: unknown[] | null;
};

type SanityRelatedPost = {
  _id: string;
  title: string | null;
  slug: { current: string } | null;
  excerpt: string | null;
  publishedAt: string | null;
  mainImage?: { asset?: { _ref?: string } } | null;
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;

  const [t, post] = await Promise.all([
    getTranslations("blog"),
    client.fetch<SanityPost>(POST_QUERY, { slug, locale }).catch(() => null),
  ]);

  if (!post) notFound();

  // RELATED_POSTS_QUERY uses $locale, $slug, $tags
  const relatedPosts = await client
    .fetch<SanityRelatedPost[]>(RELATED_POSTS_QUERY, {
      locale,
      slug: post.slug?.current ?? slug,
      tags: post.tags ?? [],
    })
    .catch(() => []);

  const imageUrl =
    post.mainImage?.asset?._ref
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : null;

  return (
    <article>
      {/* Hero */}
      <div className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container max-w-3xl">
          <Link
            href={`/${locale}/blog`}
            className="mb-8 inline-flex items-center gap-2 text-sm transition-colors"
            style={{ color: "var(--color-text-muted)" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {t("backToBlog")}
          </Link>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                {t("tags")}
              </p>
              <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{ background: "var(--color-accent)", color: "#000" }}
                >
                  {tag}
                </span>
              ))}
              </div>
            </div>
          )}

          <h1
            className="mb-4 text-4xl font-black uppercase leading-tight tracking-tight md:text-5xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p
              className="mb-6 text-lg leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              {post.excerpt}
            </p>
          )}

          {post.publishedAt && (
            <time className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              {t("publishedAt")}{" "}
              {new Date(post.publishedAt).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </div>

      {/* Cover image */}
      {imageUrl && (
        <div className="section-container max-w-3xl pb-0">
          <img
            src={imageUrl}
            alt={post.title ?? ""}
            className="w-full rounded-3xl object-cover"
            style={{ maxHeight: "480px" }}
          />
        </div>
      )}

      {/* Body */}
      <div className="py-12" style={{ background: "var(--color-bg)" }}>
        <div className="section-container max-w-3xl">
          {post.body && post.body.length > 0 && (
            <PortableTextRenderer value={post.body} />
          )}
        </div>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section
          className="border-t py-16"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-bg-surface)",
          }}
        >
          <div className="section-container">
            <h2
              className="mb-8 text-2xl font-black uppercase tracking-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              {t("relatedPosts")}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedPosts.map((related) => {
                const relatedImage =
                  related.mainImage?.asset?._ref
                    ? urlFor(related.mainImage).width(600).height(340).url()
                    : null;
                return (
                  <Link
                    key={related._id}
                    href={`/${locale}/blog/${related.slug?.current ?? ""}`}
                    className="overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
                    style={{
                      background: "var(--color-bg)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {relatedImage ? (
                      <img
                        src={relatedImage}
                        alt={related.title ?? ""}
                        className="aspect-video w-full object-cover"
                      />
                    ) : (
                      <div
                        className="aspect-video w-full"
                        style={{ background: "var(--color-bg-elevated)" }}
                      />
                    )}
                    <div className="p-4">
                      <h3
                        className="text-sm font-black uppercase"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {related.title}
                      </h3>
                      {related.publishedAt && (
                        <time
                          className="text-xs"
                          style={{ color: "var(--color-text-muted)" }}
                        >
                          {new Date(related.publishedAt).toLocaleDateString(locale, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
