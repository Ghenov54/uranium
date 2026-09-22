"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CaretDown } from "../icons";
import { Reveal } from "../Reveal";

export type IntroService = { id: string; name: string; description: string; tags: string[]; href: string };

/** What Uranium does in one paragraph, and the five services as an accordion beside it. */
export function Intro({ text, linkLabel, href, services, moreLabel }: { text: string; linkLabel: string; href: string; services: IntroService[]; moreLabel: string }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="u-section u-intro-block">
      <div className="u-wrap u-intro-block__grid">
        <Reveal>
          <p className="u-intro-block__text">{text}</p>
          <Link href={href} className="u-arrow-link">
            {linkLabel}
            <ArrowRight />
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="u-acc">
            {services.map((s) => {
              const isOpen = open === s.id;
              return (
                <li key={s.id} data-open={isOpen ? "" : undefined}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : s.id)}>
                    <span>{s.name}</span>
                    <CaretDown />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        className="u-acc__panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <div className="u-acc__inner">
                          <p>{s.description}</p>
                          {s.tags.length > 0 && <p className="u-acc__tags">{s.tags.slice(0, 5).join(", ")}</p>}
                          <Link href={s.href} className="u-arrow-link">
                            {moreLabel}
                            <ArrowRight />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
