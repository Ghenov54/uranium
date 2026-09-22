import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { img, type SanityImage } from "@/lib/sanity-helpers";
import { BLOG_CATEGORIES, BLOG_LIST_QUERY, categoryOf, isCategory, readMinutes, type BlogCategory } from "@/lib/blog";
import { BlogCarousel } from "@/components/u/blog/BlogCarousel";
import { PostCard, type BlogPost } from "@/components/u/blog/PostCard";
import { ArrowRight } from "@/components/u/icons";

export const dynamic = "force-dynamic";

type Row = { _id: string; title: string | null; slug: { current: string } | null; mainImage?: SanityImage; publishedAt: string | null; tags: string[] | null; chars: number | null };
type Props = { searchParams: Promise<{ c?: string }> };

const PICK_TONES = ["violet", "blue", "green"] as const;

export default async function BlogPage({ searchParams }: Props) {
  const [{ c }, locale, t] = await Promise.all([searchParams, getLocale(), getTranslations("journal")]);
  const active: BlogCategory | null = isCategory(c) ? c : null;
  const rows = await client.fetch<Row[]>(BLOG_LIST_QUERY, { locale }).catch(() => []);

  const fmt = new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : locale === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
  const catLabel = (k: BlogCategory) => t(`cat.${k}.label`);

  const posts = rows.map((p) => {
    const cat = categoryOf(p.tags);
    return {
      id: p._id,
      title: p.title ?? "",
      href: `/${locale}/blog/${p.slug?.current ?? ""}`,
      image: img(p.mainImage, 900, 620),
      imageWide: img(p.mainImage, 1600, 900),
      category: catLabel(cat),
      cat,
      date: p.publishedAt,
      minutes: readMinutes(p.chars),
    } satisfies BlogPost & { cat: BlogCategory };
  });

  const base = `/${locale}/blog`;
  const tabs = (
    <nav className="u-btabs" aria-label={t("title")}>
      <Link href={base} aria-current={!active ? "page" : undefined}>
        {t("all")}
      </Link>
      {BLOG_CATEGORIES.map((k) => (
        <Link key={k} href={`${base}?c=${k}`} aria-current={active === k ? "page" : undefined}>
          {catLabel(k)}
        </Link>
      ))}
    </nav>
  );

  const featured = posts.slice(0, 6).map((p) => ({ id: p.id, title: p.title, href: p.href, image: p.imageWide, category: p.category }));
  const card = (p: BlogPost, size: "lg" | "md" | "sm" = "sm") => <PostCard key={p.id} post={p} size={size} minLabel={t("min")} fmt={fmt} />;

  // Filtered view: one category, every article in a plain grid.
  if (active) {
    const list = posts.filter((p) => p.cat === active);
    return (
      <>
        <section className="u-dark u-panel u-bhero u-bhero--compact">
          <div className="u-wrap">
            {tabs}
            <h1 className="u-bhero__title">{catLabel(active)}</h1>
            <p className="u-bhero__lead">{t(`cat.${active}.lead`)}</p>
          </div>
        </section>
        <section className="u-section">
          <div className="u-wrap">
            {list.length ? <div className="u-bgrid">{list.map((p) => card(p))}</div> : <p className="u-muted">{t("empty")}</p>}
          </div>
        </section>
      </>
    );
  }

  const latest = posts.slice(0, 5);
  const picks = posts.filter((p) => p.cat === "tech").slice(0, 3);

  return (
    <>
      <section className="u-dark u-panel u-bhero">
        <div className="u-wrap">
          {tabs}
          <div className="u-bhero__head">
            <div>
              <h1 className="u-bhero__title">{t("title")}</h1>
              <p className="u-bhero__lead">{t("lead")}</p>
            </div>
          </div>
          <BlogCarousel posts={featured} prevLabel={t("prev")} nextLabel={t("next")} />
        </div>
      </section>

      <section className="u-section">
        <div className="u-wrap">
          <h2 className="u-bsec__title">{t("latest")}</h2>
          <div className="u-blatest">
            {latest.slice(0, 2).map((p) => card(p, "md"))}
            {latest.slice(2, 5).map((p) => card(p))}
          </div>
        </div>
      </section>

      {picks.length > 0 && (
        <section className="u-dark u-panel u-picks">
          <div className="u-wrap">
            <h2 className="u-bsec__title">{t("picks")}</h2>
            <p className="u-bsec__lead">{t("picksLead")}</p>
            <ul className="u-picks__grid">
              {picks.map((p, i) => (
                <li key={p.id}>
                  <Link href={p.href} className="u-pick" data-tone={PICK_TONES[i % 3]}>
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" loading="lazy" decoding="async" />
                    )}
                    <span className="u-pick__tint" aria-hidden />
                    <span className="u-pick__text">
                      <span className="u-pick__cat">{p.category}</span>
                      <span className="u-pick__title">{p.title}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {BLOG_CATEGORIES.map((k) => {
        const list = posts.filter((p) => p.cat === k).slice(0, 5);
        if (list.length < 2) return null;
        return (
          <section key={k} className="u-section u-bsec">
            <div className="u-wrap">
              <h2 className="u-bsec__title">{catLabel(k)}</h2>
              <p className="u-bsec__lead">{t(`cat.${k}.lead`)}</p>
              <div className="u-bfeat">
                {card(list[0], "lg")}
                <div className="u-bfeat__side">{list.slice(1, 2).map((p) => card(p))}</div>
              </div>
              {list.length > 2 && <div className="u-bgrid u-bgrid--row">{list.slice(2, 5).map((p) => card(p))}</div>}
              <div className="u-bsec__foot">
                <Link href={`${base}?c=${k}`} className="u-arrow-link">
                  {t("viewAll")}
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
