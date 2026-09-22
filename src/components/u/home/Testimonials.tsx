import { PLACEHOLDER_BRANDS, PLACEHOLDER_TESTIMONIALS } from "@/data/placeholders";
import { BrandMark } from "../BrandMark";
import { Reveal } from "../Reveal";

/** Cuberto's testimonial wall: pastel cards, quote, then the client's mark. Placeholder content for now. */
export function Testimonials({ title, locale }: { title: string; locale: string }) {
  const l = (locale === "en" || locale === "ru" ? locale : "ro") as "ro" | "en" | "ru";
  return (
    <section className="u-section u-quotes">
      <div className="u-wrap">
        <Reveal>
          <h2 className="u-h2 u-quotes__title">{title}</h2>
        </Reveal>
        <ul className="u-quotes__grid">
          {PLACEHOLDER_TESTIMONIALS.map((q, i) => {
            const brand = PLACEHOLDER_BRANDS.find((b) => b.name === q.brand) ?? PLACEHOLDER_BRANDS[0];
            return (
              <li key={q.id} className="u-quote" data-tone={q.tone} style={{ "--i": i } as React.CSSProperties}>
                <Reveal delay={(i % 3) * 0.08}>
                  <svg className="u-quote__mark" width="34" height="26" viewBox="0 0 34 26" aria-hidden>
                    <path d="M0 26V15C0 6.5 4.6 1.3 12.6 0l1.5 3.6C9.4 5 7.3 8 7.2 12H14v14Zm19.4 0V15c0-8.5 4.6-13.7 12.6-15l1.5 3.6c-4.7 1.4-6.8 4.4-6.9 8.4h6.8v14Z" fill="currentColor" />
                  </svg>
                  <blockquote>“{q.quote[l]}”</blockquote>
                  <div className="u-quote__by">
                    <div>
                      <strong>{q.name}</strong>
                      <span>{q.role[l]}</span>
                    </div>
                    <BrandMark brand={brand} size={22} />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
