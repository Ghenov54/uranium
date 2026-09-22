import { HeroScene } from "../three/HeroScene";

/** Positioning sentence on the left, the live porcelain object on the right. */
export function Hero({ title }: { title: string }) {
  const words = title.split(" ");
  return (
    <section className="u-hero">
      <div className="u-wrap u-hero__grid">
        <h1 className="u-hero__title" aria-label={title}>
          {words.map((w, i) => (
            <span key={i} className="u-rise" aria-hidden>
              <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
            </span>
          ))}
        </h1>
        <div className="u-hero__scene">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
