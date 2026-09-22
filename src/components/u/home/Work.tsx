"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "../icons";

export type WorkItem = { id: string; title: string; category: string; image: string | null; href: string };

/** Work in Clay's rhythm: two squares, then one wide frame; images drift slightly against the scroll. */
export function Work({ items, title, allLabel, allHref }: { items: WorkItem[]; title: string; allLabel: string; allHref: string }) {
  if (!items.length) return null;
  return (
    <section className="u-section u-work">
      <div className="u-wrap">
        {title && (
          <div className="u-head">
            <h2 className="u-h2">{title}</h2>
          </div>
        )}
        <div className="u-work__grid">
          {items.map((p, i) => (
            <Card key={p.id} item={p} wide={i % 3 === 2} offset={i % 3 === 1} />
          ))}
        </div>
        <div className="u-work__foot">
          <Link href={allHref} className="u-arrow-link">
            {allLabel}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

const MotionLink = motion.create(Link);

function Card({ item, wide, offset }: { item: WorkItem; wide: boolean; offset: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <MotionLink
      ref={ref}
      href={item.href}
      className="u-card"
      data-wide={wide ? "" : undefined}
      data-offset={offset ? "" : undefined}
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="u-card__media" style={{ aspectRatio: wide ? "16 / 9" : "1 / 1" }}>
        {item.image && <motion.img src={item.image} alt={item.title} loading="lazy" decoding="async" style={reduce ? undefined : { y, scale: 1.12 }} />}
      </div>
      <div className="u-card__meta">
        <span className="u-card__title">{item.title}</span>
        <span className="u-card__cat">{item.category}</span>
      </div>
    </MotionLink>
  );
}
