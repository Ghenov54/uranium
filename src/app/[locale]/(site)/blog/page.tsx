import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { POSTS_QUERY } from "@/sanity/queries/posts";
import { img, type SanityImage } from "@/lib/sanity-helpers";
import { PageIntro } from "@/components/u/PageIntro";
import { Journal } from "@/components/u/home/Journal";
import { ArrowUpRight } from "@/components/u/icons";

export const dynamic = "force-dynamic";

type Post = { _id: string; title: string | null; slug: { current: string } | null; excerpt: string | null; mainImage?: SanityImage; publishedAt: string | null };

export default async function BlogPage() {
  const [locale, t, tb] = await Promise.all([getLocale(), getTranslations("pages"), getTranslations("blog")]);
  const posts = await client.fetch<Post[]>(POSTS_QUERY, { locale }).catch(() => []);
  const [first, ...rest] = posts;
  const fmt = new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : locale === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  const href = (p: Post) => `/${locale}/blog/${p.slug?.current ?? ""}`;

  return (
    <>
      <PageIntro title={t("blogTitle")} lead={t("blogLead")} />

      {!first ? (
        <section className="u-section u-section--flush">
          <div className="u-wrap">
            <p className="u-muted">{tb("noPostsFound")}</p>
          </div>
        </section>
      ) : (
        <>
          <section className="u-section u-section--flush">
            <div className="u-wrap">
              <Link href={href(first)} className="u-feature-post">
                <div className="u-feature-post__media">
                  {img(first.mainImage, 1600, 1000) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={img(first.mainImage, 1600, 1000)!} alt="" />
                  )}
                </div>
                <div className="u-feature-post__body">
                  {first.publishedAt && <time className="u-muted">{fmt.format(new Date(first.publishedAt))}</time>}
                  <h2>{first.title}</h2>
                  {first.excerpt && <p>{first.excerpt}</p>}
                  <span className="u-btn u-btn--line">
                    {tb("readMore")}
                    <ArrowUpRight />
                  </span>
                </div>
              </Link>
            </div>
          </section>
          <Journal
            posts={rest.map((p) => ({ id: p._id, title: p.title ?? "", href: href(p), date: p.publishedAt, image: img(p.mainImage, 640, 440) }))}
            title=""
            allLabel=""
            allHref=""
            locale={locale}
            limit={100}
          />
        </>
      )}

    </>
  );
}
