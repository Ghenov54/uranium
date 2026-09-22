import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { POST_QUERY, RELATED_POSTS_QUERY } from "@/sanity/queries/posts";
import { img, type SanityImage } from "@/lib/sanity-helpers";
import { PortableTextRenderer } from "@/components/blog/PortableTextRenderer";
import { Journal } from "@/components/u/home/Journal";
import { ArrowRight } from "@/components/u/icons";

export const dynamic = "force-dynamic";

type Post = {
  _id: string;
  title: string | null;
  slug: { current: string } | null;
  excerpt: string | null;
  mainImage?: SanityImage;
  publishedAt: string | null;
  tags: string[] | null;
  body: unknown[] | null;
};
type Related = { _id: string; title: string | null; slug: { current: string } | null; publishedAt: string | null; mainImage?: SanityImage };

type Props = { params: Promise<{ locale: string; slug: string }> };

/** Rough reading time from the portable text body, 200 words a minute. */
function readingMinutes(body: unknown[] | null) {
  if (!body) return null;
  const text = JSON.stringify(body).replace(/"_[a-zA-Z]+":"[^"]*"/g, "");
  const words = text.match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const [t, tp, post] = await Promise.all([
    getTranslations("blog"),
    getTranslations("pages"),
    client.fetch<Post>(POST_QUERY, { slug, locale }).catch(() => null),
  ]);
  if (!post) notFound();

  const related = await client
    .fetch<Related[]>(RELATED_POSTS_QUERY, { locale, slug: post.slug?.current ?? slug, tags: post.tags ?? [] })
    .catch(() => []);

  const cover = img(post.mainImage, 2000, 1125);
  const minutes = readingMinutes(post.body);
  const fmt = new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : locale === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  const title = post.title ?? "";

  return (
    <article>
      <header className="u-intro">
        <div className="u-wrap u-article-head">
          <Link href={`/${locale}/blog`} className="u-back u-enter">
            <span className="u-back__icon" aria-hidden>
              <ArrowRight />
            </span>
            {t("backToBlog")}
          </Link>
          <h1 className="u-article-title" aria-label={title}>
            {title.split(" ").map((w, i) => (
              <span key={i} className="u-hero__clip" aria-hidden>
                <span style={{ "--i": i * 0.8 } as React.CSSProperties}>{w}</span>
              </span>
            ))}
          </h1>
          <div className="u-article-meta u-enter" style={{ "--d": "240ms" } as React.CSSProperties}>
            {post.publishedAt && <time dateTime={post.publishedAt}>{fmt.format(new Date(post.publishedAt))}</time>}
            {minutes && (
              <span className="u-tnum">
                {minutes} {tp("readTime")}
              </span>
            )}
          </div>
        </div>
      </header>

      {cover && (
        <div className="u-wrap">
          <div className="u-article-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt="" />
          </div>
        </div>
      )}

      <div className="u-wrap u-article-body">
        {post.excerpt && <p className="u-article-excerpt">{post.excerpt}</p>}
        {post.body && <PortableTextRenderer value={post.body} />}
        {post.tags && post.tags.length > 0 && (
          <ul className="u-tags u-article-tags" aria-label={t("tags")}>
            {post.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>

      <Journal
        posts={related.map((r) => ({
          id: r._id,
          title: r.title ?? "",
          href: `/${locale}/blog/${r.slug?.current ?? ""}`,
          date: r.publishedAt,
          image: img(r.mainImage, 640, 440),
        }))}
        title={t("relatedPosts")}
        allLabel={tp("blogTitle")}
        allHref={`/${locale}/blog`}
        locale={locale}
      />
    </article>
  );
}
