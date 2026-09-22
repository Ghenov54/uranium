import { PLACEHOLDER_BRANDS } from "@/data/placeholders";
import { BrandMark } from "../BrandMark";
import { Reveal } from "../Reveal";

/** Clay's client wall: marks only, in muted grey, no labels. Placeholder brands for now. */
export function Clients({ title }: { title: string }) {
  return (
    <section className="u-section u-section--flush u-clients" aria-label={title}>
      <div className="u-wrap">
        <Reveal>
          <ul className="u-clients__grid">
            {PLACEHOLDER_BRANDS.map((b) => (
              <li key={b.name}>
                <BrandMark brand={b} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
