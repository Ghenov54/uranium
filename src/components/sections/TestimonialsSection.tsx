"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

type Testimonial = {
  main: string;
  accent: string;
  author: string;
  role: string;
  company: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    main: "URANIUM A TRANSFORMAT COMPLET PREZENȚA NOASTRĂ DIGITALĂ,",
    accent: "REZULTATELE AU DEPĂȘIT TOATE AȘTEPTĂRILE NOASTRE.",
    author: "Alexandru Popescu",
    role: "CEO & Founder",
    company: "TechStart Moldova",
    image: "https://picsum.photos/seed/testim-site1/700/560",
  },
  {
    main: "ECHIPA URANIUM A LIVRAT UN PROIECT EXCEPȚIONAL LA TIMP,",
    accent: "CALITATEA ȘI PROFESIONALISMUL LOR SUNT REMARCABILE.",
    author: "Maria Ionescu",
    role: "Director Marketing",
    company: "RetailPlus România",
    image: "https://picsum.photos/seed/testim-site2/700/560",
  },
  {
    main: "DE LA STRATEGIE LA EXECUȚIE, URANIUM A FOST PARTENERUL PERFECT",
    accent: "ÎN LANSAREA NOASTRĂ PE PIAȚA INTERNAȚIONALĂ.",
    author: "Dmitri Volkov",
    role: "COO",
    company: "GlobalVentures",
    image: "https://picsum.photos/seed/testim-site3/700/560",
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);
  const active = testimonials[currentIndex];

  const handlePrev = () =>
    setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const handleNext = () =>
    setCurrentIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section className="border-t py-24" style={{ borderColor: "var(--color-border)" }}>
      <div className="section-container">

        {/* Top row: label + heading (left) | description (right) */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--color-text-muted)" }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                {t("label")}
              </span>
            </div>
            <h2
              className="text-5xl font-black uppercase leading-none tracking-tighter md:text-6xl lg:text-7xl"
              style={{ color: "var(--color-text-primary)" }}
            >
              {t("heading")}
            </h2>
          </div>

          <p
            className="max-w-xs text-sm leading-relaxed lg:text-right"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("description")}
          </p>
        </div>

        {/* Main testimonial card */}
        <div
          className="flex overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(135deg, var(--color-card-from) 0%, var(--color-card-to) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* LEFT: content */}
          <div className="flex flex-1 flex-col justify-between p-8 md:p-12 lg:p-14">

            {/* Stars */}
            <div>
              <div className="mb-8 flex gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote>
                <p
                  className="text-2xl font-black uppercase leading-tight tracking-tight md:text-3xl xl:text-4xl"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {active.main}
                </p>
                <p
                  className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight md:text-3xl xl:text-4xl"
                  style={{ color: "var(--color-accent)" }}
                >
                  {active.accent}
                </p>
              </blockquote>
            </div>

            {/* Bottom: author + navigation */}
            <div className="mt-10 flex items-end justify-between">
              <div>
                <p className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                  {active.author}
                </p>
                <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {active.role} · {active.company}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="flex h-12 w-12 items-center justify-center rounded-full border transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                  aria-label="Previous testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="flex h-12 w-12 items-center justify-center rounded-full border transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                  aria-label="Next testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: mockup image — visible on lg+ */}
          <div className="relative hidden lg:block" style={{ width: 380, minHeight: 460 }}>
            <img
              key={active.image}
              src={active.image}
              alt=""
              className="h-full w-full object-cover"
            />
            {/* Left-edge fade to blend with card */}
            <div
              className="absolute inset-y-0 left-0 w-24"
              style={{
                background: "linear-gradient(to right, var(--color-card-from), transparent)",
              }}
            />
          </div>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: idx === currentIndex ? 28 : 8,
                background: idx === currentIndex ? "var(--color-accent)" : "var(--color-text-muted)",
                opacity: idx === currentIndex ? 1 : 0.35,
              }}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
