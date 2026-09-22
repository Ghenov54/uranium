"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export type ReelItem = {
  title: string;
  category: string;
  image: string;
  href: string;
};

const HOLD_MS = 3200;

/**
 * Work montage in a rounded frame that opens to full bleed as you scroll.
 * Plays a muted, looping showreel when `video` is given; otherwise cycles project images.
 */
export function Reel({
  items,
  label,
  video,
}: {
  items: ReelItem[];
  label: string;
  video?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  // Inset in % of the frame: starts as a card inside the gutters, ends edge to edge.
  const inset = useTransform(scrollYProgress, [0.25, 0.75], [1, 0]);
  const clipPath = useTransform(inset, (v) => {
    const side = `calc(var(--gutter) * ${v.toFixed(3)})`;
    const top = `${(v * 10).toFixed(2)}%`;
    return `inset(${top} ${side} ${top} ${side} round ${(v * 16).toFixed(1)}px)`;
  });
  const scale = useTransform(scrollYProgress, [0.25, 1], [1.12, 1]);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % items.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [items.length]);

  if (!items.length) return null;
  const current = items[index];

  return (
    <section ref={ref} className="u-reel" aria-label={label}>
      <div className="u-reel__sticky">
        <motion.div
          className="u-reel__frame"
          style={reduce ? undefined : { clipPath }}
        >
          <motion.div
            className="u-reel__media"
            style={reduce ? undefined : { scale }}
          >
            {video ? (
              <video
                src={video}
                poster={items[0].image}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
              />
            ) : (
              items.map((it, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={it.image}
                  src={it.image}
                  alt=""
                  data-on={i === index ? "" : undefined}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              ))
            )}
          </motion.div>
          <div className="u-reel__shade" aria-hidden />
          <Link href={current.href} className="u-reel__caption">
            <span className="u-reel__title" key={current.href}>
              {current.title}
            </span>
            <span className="u-reel__cat">{current.category}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
