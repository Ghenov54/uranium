"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight } from "../icons";

export type JournalPost = { id: string; title: string; href: string; date: string | null; image: string | null };

/** Articles as a typographic index; on a fine pointer the hovered article's image trails the cursor. */
export function Journal({
  posts,
  title,
  allLabel,
  allHref,
  locale,
  limit = 5,
}: {
  posts: JournalPost[];
  title: string;
  allLabel: string;
  allHref: string;
  locale: string;
  limit?: number;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLLIElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  if (!posts.length) return null;

  const fmt = new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : locale === "ru" ? "ru-RU" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    // Pinned to the right column (clear of the titles); only the vertical position follows the cursor.
    const px = Math.max(0, r.width - (previewRef.current?.offsetWidth ?? 300) - 200);
    const h = previewRef.current?.offsetHeight ?? 220;
    // Keep the preview a clear gap below the fixed nav.
    const py = Math.max(e.clientY, 72 + 24 + h * 0.5) - r.top;
    // First contact: place it without sliding in from the corner.
    if (sx.get() === 0 && sy.get() === 0) {
      sx.jump(px);
      sy.jump(py);
    }
    x.set(px);
    y.set(py);
  };

  const shown = active !== null ? posts[active] : null;

  return (
    <section className={title ? "u-journal u-section" : "u-journal u-section u-section--flush"}>
      <div className="u-wrap">
        {title && (
          <div className="u-head">
            <h2 className="u-h2">{title}</h2>
            <Link href={allHref} className="u-btn u-btn--line">
              {allLabel}
              <ArrowRight />
            </Link>
          </div>
        )}

        <ul
          ref={listRef}
          className="u-index"
          data-active={active !== null ? "" : undefined}
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
        >
          {posts.slice(0, limit).map((p, i) => (
            <li key={p.id} data-on={active === i ? "" : undefined}>
              <Link href={p.href} className="u-index__row" onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}>
                <span className="u-index__title">{p.title}</span>
                <span className="u-index__meta u-tnum">{p.date ? fmt.format(new Date(p.date)) : ""}</span>
                <span className="u-index__go" aria-hidden>
                  <ArrowUpRight />
                </span>
              </Link>
            </li>
          ))}

          {!reduce && (
            <motion.li ref={previewRef} className="u-index__preview" style={{ x: sx, y: sy }} aria-hidden>
              <AnimatePresence mode="popLayout">
                {shown?.image && (
                  <motion.img
                    key={shown.id}
                    src={shown.image}
                    alt=""
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
              </AnimatePresence>
            </motion.li>
          )}
        </ul>
      </div>
    </section>
  );
}
