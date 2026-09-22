import Link from "next/link";
import { ArrowRight } from "../icons";
import { Reveal } from "../Reveal";

export type NewsPost = { id: string; title: string; href: string; date: string | null; image: string | null; excerpt?: string | null };

/** Latest articles as wide rows on ink: image left, title right (Clay's featured news). */
export function News({ posts, title, allLabel, allHref, locale }: { posts: NewsPost[]; title: string; allLabel: string; allHref: string; locale: string }) {
  if (!posts.length) return null;
  const fmt = new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : locale === "ru" ? "ru-RU" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <section className="u-section u-news">
      <div className="u-wrap">
        <Reveal>
          <h2 className="u-h2 u-news__title">{title}</h2>
        </Reveal>
        <ul className="u-news__list">
          {posts.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={i * 0.05}>
                <Link href={p.href} className="u-news__row">
                  <div className="u-news__media">
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" loading="lazy" decoding="async" />
                    )}
                  </div>
                  <div className="u-news__body">
                    <h3>{p.title}</h3>
                    {p.date && <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>}
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="u-news__foot">
          <Link href={allHref} className="u-arrow-link">
            {allLabel}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
