"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown } from "../icons";

export type FaqItem = { id: string; question: string; answer: string };

/** Render the chat data's light markup: **bold** and line breaks. */
function Answer({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <p key={i}>
          {line.split(/\*\*(.+?)\*\*/g).map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
        </p>
      ))}
    </>
  );
}

/** The same answers the chat assistant gives, as an accordion on ink. */
export function Faq({ items, title }: { items: FaqItem[]; title: string }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!items.length) return null;
  return (
    <section className="u-section u-faq">
      <div className="u-wrap">
        <h2 className="u-h2 u-faq__title">{title}</h2>
        <ul className="u-faq__list">
          {items.map((q) => {
            const isOpen = open === q.id;
            return (
              <li key={q.id} data-open={isOpen ? "" : undefined}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : q.id)}>
                  <span>{q.question}</span>
                  <CaretDown />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="u-faq__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div className="u-faq__inner">
                        <Answer text={q.answer} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
