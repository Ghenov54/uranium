"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type IndexProject = {
  id: string;
  tall: boolean;
  name: string;
  summary: string;
  category: string;
  image: string | null;
  hover: string | null;
  href: string;
};

const FILTER_KEYS: Record<string, string> = {
  web: "filterWeb",
  apps: "filterApps",
  design: "filterDesign",
  marketing: "filterMarketing",
  business: "filterBusiness",
};

/**
 * Cuberto's project index: centred filter tabs, then two staggered columns of
 * large media. Hovering a project reveals a second frame from its gallery.
 */
export function PortfolioGrid({ projects }: { projects: IndexProject[] }) {
  const t = useTranslations("portfolioPage");
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...Object.keys(FILTER_KEYS).filter((c) => projects.some((p) => p.category === c))];
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const columns = [visible.filter((_, i) => i % 2 === 0), visible.filter((_, i) => i % 2 === 1)];

  return (
    <>
      <div className="u-ptabs" role="tablist">
        {categories.map((c) => (
          <button key={c} type="button" role="tab" aria-selected={filter === c} onClick={() => setFilter(c)}>
            {c === "all" ? t("filterAll") : t(FILTER_KEYS[c])}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          className="u-pgrid"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          {columns.map((col, ci) => (
            <div key={ci} className="u-pgrid__col">
              {col.map((p) => (
                <ProjectTile key={p.id} project={p} />
              ))}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function ProjectTile({ project }: { project: IndexProject }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link href={project.href} className="u-ptile">
        <div className="u-ptile__media" style={{ aspectRatio: project.tall ? "3 / 4" : "1 / 1" }}>
          {project.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={project.name} loading="lazy" decoding="async" />
          )}
          {project.hover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="u-ptile__alt" src={project.hover} alt="" loading="lazy" decoding="async" />
          )}
        </div>
        <p className="u-ptile__caption">
          <strong>{project.name}</strong> – {project.summary}
        </p>
      </Link>
    </motion.div>
  );
}
