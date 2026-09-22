"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "@/components/u/icons";

export type IndexProject = { id: string; title: string; category: string; categoryLabel: string; year: number | null; image: string | null; href: string };

const FILTER_KEYS: Record<string, string> = {
  web: "filterWeb",
  apps: "filterApps",
  marketing: "filterMarketing",
  design: "filterDesign",
  business: "filterBusiness",
};

/** All work as a typographic index: filter by discipline, hover a row to see the project. */
export function PortfolioGrid({ projects }: { projects: IndexProject[] }) {
  const t = useTranslations("portfolioPage");
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLLIElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category))).filter((c) => FILTER_KEYS[c])];
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const shown = visible.find((p) => p.id === active) ?? null;

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

  return (
    <>
      <div className="u-filters" role="tablist" aria-label={t("filterAll")}>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c)}
          >
            {c === "all" ? t("filterAll") : t(FILTER_KEYS[c])}
            <span className="u-tnum">{c === "all" ? projects.length : projects.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>

      <ul
        ref={listRef}
        className="u-index u-index--work"
        data-active={active ? "" : undefined}
        onPointerMove={onMove}
        onPointerLeave={() => setActive(null)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((p) => (
            <motion.li
              key={p.id}
              layout={!reduce}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              data-on={active === p.id ? "" : undefined}
            >
              <Link href={p.href} className="u-index__row" onPointerEnter={(e) => e.pointerType === "mouse" && setActive(p.id)}>
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="u-index__thumb" src={p.image} alt="" loading="lazy" decoding="async" />
                )}
                <span className="u-index__title">{p.title}</span>
                <span className="u-index__meta">
                  {p.categoryLabel}
                  {p.year ? <span className="u-tnum"> {p.year}</span> : null}
                </span>
                <span className="u-index__go" aria-hidden>
                  <ArrowUpRight />
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>

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
    </>
  );
}
