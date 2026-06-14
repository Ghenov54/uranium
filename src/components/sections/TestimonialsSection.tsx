"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "Uranium a transformat complet prezența noastră digitală. Rezultatele au depășit toate așteptările noastre.",
    author: "Alexandru Popescu",
    company: "TechStart Moldova",
    role: "CEO & Founder",
  },
  {
    quote:
      "Echipa Uranium a livrat proiectul la timp și cu o calitate excepțională. Recomand cu căldură oricărui business.",
    author: "Maria Ionescu",
    company: "RetailPlus România",
    role: "Director Marketing",
  },
  {
    quote:
      "De la strategie la execuție, Uranium a fost partenerul perfect pentru lansarea noastră internațională.",
    author: "Dmitri Volkov",
    company: "GlobalVentures",
    role: "COO",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const active = testimonials[currentIndex];

  return (
    <section
      className="border-t py-24"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="section-container">
        {/* Label */}
        <p
          className="mb-4 text-xs uppercase tracking-widest"
          style={{ color: "var(--color-text-muted)" }}
        >
          {t("label")}
        </p>

        {/* Heading */}
        <h2
          className="mb-12 text-4xl font-black md:text-5xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          {t("heading")}
        </h2>

        {/* Testimonial card */}
        <div
          className="rounded-2xl p-8 md:p-12"
          style={{
            background:
              "linear-gradient(135deg, var(--color-card-from), var(--color-card-to))",
          }}
        >
          {/* Opening quote mark */}
          <div
            className="mb-4 text-6xl font-black leading-none"
            style={{ color: "var(--color-accent)" }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* Quote */}
          <p
            className="mb-8 text-xl leading-relaxed md:text-2xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            {active.quote}
          </p>

          {/* Author */}
          <div>
            <p
              className="font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {active.author}
            </p>
            <p
              className="text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              {active.role} &middot; {active.company}
            </p>
          </div>
        </div>

        {/* Navigation row */}
        <div className="mt-8 flex items-center gap-6">
          {/* Prev button */}
          <button
            onClick={handlePrev}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full border transition-colors",
              "border-[var(--color-border)] hover:border-[var(--color-accent)]"
            )}
            style={{ color: "var(--color-text-primary)" }}
            aria-label="Previous testimonial"
          >
            &lt;
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="h-2 w-2 rounded-full transition-colors"
                style={{
                  background:
                    idx === currentIndex
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                }}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full border transition-colors",
              "border-[var(--color-border)] hover:border-[var(--color-accent)]"
            )}
            style={{ color: "var(--color-text-primary)" }}
            aria-label="Next testimonial"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}
