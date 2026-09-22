"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "../icons";
import { ServiceObject } from "../three/ServiceObject";

export type ServiceCard = { id: string; name: string; description: string; tags: string[]; href: string; image?: string | null };

/**
 * Five services as dark panels that pin and stack (Cuberto), each with its own
 * live object lit in violet and green (Clay's industry panels).
 */
export function Services({ items, title, moreLabel }: { items: ServiceCard[]; title: string; moreLabel: string }) {
  return (
    <section className={title ? "u-section u-services" : "u-section u-section--flush u-services"}>
      <div className="u-wrap">
        {title && (
          <div className="u-head">
            <h2 className="u-h2">{title}</h2>
          </div>
        )}
        <div className="u-stack">
          {items.map((s, i) => (
            <StackCard key={s.id} item={s} index={i} last={i === items.length - 1} moreLabel={moreLabel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StackCard({ item, index, last, moreLabel }: { item: ServiceCard; index: number; last: boolean; moreLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Runs while the next card travels over this one.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["end end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const filter = useTransform(scrollYProgress, [0, 1], ["brightness(1)", "brightness(0.55)"]);

  return (
    <div ref={ref} className="u-stack__slot" style={{ "--i": index } as React.CSSProperties}>
      <motion.article className="u-stack__card u-dark" style={reduce || last ? undefined : { scale, filter }}>
        <CardLines />
        <div className="u-stack__body">
          <h3 className="u-stack__name">{item.name}</h3>
          <p className="u-stack__desc">{item.description}</p>
          {item.tags.length > 0 && (
            <ul className="u-tags">
              {item.tags.slice(0, 5).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          <Link href={item.href} className="u-arrow-link">
            {moreLabel}
            <ArrowRight />
          </Link>
        </div>
        <div className="u-stack__media">
          <ServiceObject variant={index} />
        </div>
      </motion.article>
    </div>
  );
}

/** Drafting-style linework behind each card: rings and axes centred on the object, one slowly turning dashed orbit. */
function CardLines() {
  return (
    <svg className="u-stack__lines" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <g fill="none" stroke="currentColor">
        {[90, 150, 220, 300, 390].map((r) => (
          <circle key={r} cx="760" cy="300" r={r} strokeWidth="1" />
        ))}
        <path d="M0 300H1000M760 0V600" strokeWidth="1" />
        <path d="M420 0 1000 580M1000 20 460 600" strokeWidth="1" opacity="0.6" />
        <circle className="u-stack__orbit" cx="760" cy="300" r="255" strokeWidth="1.5" strokeDasharray="2 10" />
      </g>
    </svg>
  );
}
