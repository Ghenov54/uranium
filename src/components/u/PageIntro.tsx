import type { ReactNode } from "react";

/** Opening of every inner page: a large title whose words rise out of a mask, then one lead sentence. */
export function PageIntro({ title, lead, children }: { title: string; lead?: string | null; children?: ReactNode }) {
  const words = title.split(" ");
  return (
    <section className="u-intro">
      <div className="u-wrap">
        <h1 className="u-intro__title" aria-label={title}>
          {words.map((w, i) => (
            <span key={i} className="u-hero__clip" aria-hidden>
              <span style={{ "--i": i * 1.6 } as React.CSSProperties}>{w}</span>
            </span>
          ))}
        </h1>
        {(lead || children) && (
          <div className="u-intro__row u-enter" style={{ "--d": "260ms" } as React.CSSProperties}>
            {lead && <p className="u-intro__lead">{lead}</p>}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
