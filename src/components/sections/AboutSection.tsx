import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();

  const headingWords = t("heading").split(" ");
  const headingMain = headingWords.slice(0, -1).join(" ");
  const headingLast = headingWords[headingWords.length - 1];

  return (
    <section className="border-t py-24" style={{ borderColor: "var(--color-border)" }}>
      <div className="section-container">

        {/* Top row: heading (left) + subtitle (right) */}
        <AnimateIn className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8" style={{ background: "var(--color-text-muted)" }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                {t("label")}
              </span>
            </div>
            <h2 className="text-5xl font-black uppercase leading-none tracking-tighter md:text-6xl lg:text-7xl">
              <span style={{ color: "var(--color-text-primary)" }}>{headingMain} </span>
              <span style={{ color: "var(--color-text-primary)", opacity: 0.25 }}>{headingLast}</span>
            </h2>
          </div>

          <p
            className="max-w-xs text-sm leading-relaxed lg:mt-8 lg:text-right"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("subtitle")}
          </p>
        </AnimateIn>

        {/* Two-column body */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">

          {/* LEFT: Visual card + quote + chips */}
          <AnimateIn delay={0} from="left">
            <div className="flex flex-col gap-7">

              {/* Visual studio card */}
              <div
                className="relative overflow-hidden rounded-3xl"
                style={{
                  minHeight: 420,
                  background: "linear-gradient(145deg, #0b1740 0%, #1a0a3c 45%, #050d20 100%)",
                }}
              >
                {/* Dot-grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "26px 26px",
                  }}
                />

                {/* Background image */}
                <img
                  src="https://picsum.photos/seed/uranium-studio/900/700"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ opacity: 0.18, mixBlendMode: "luminosity" }}
                />

                {/* Accent glow */}
                <div
                  className="absolute -top-16 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl opacity-20 float-slow"
                  style={{ background: "var(--color-accent)" }}
                />

                {/* Content */}
                <div className="relative flex h-full flex-col justify-between p-8" style={{ minHeight: 420 }}>
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest"
                      style={{ background: "var(--color-accent)", color: "#000" }}
                    >
                      URANIUM
                    </span>
                    <span className="text-xs text-white/40">Chișinău · Moldova</span>
                  </div>

                  <div>
                    <p className="mb-1 text-xs uppercase tracking-widest text-white/40">
                      Creative Design Agency
                    </p>
                    <p className="text-3xl font-black uppercase leading-tight text-white md:text-4xl">
                      WE CRAFT<br />BOLD BRANDS
                    </p>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {[
                        { value: "15+", label: "AWARDS" },
                        { value: "250+", label: "PROJECTS" },
                        { value: "10+", label: "YEARS" },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-2xl p-3"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <p className="text-xl font-black" style={{ color: "var(--color-accent)" }}>
                            {stat.value}
                          </p>
                          <p className="mt-0.5 text-xs uppercase tracking-wider text-white/40">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-base italic leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                &ldquo;{t("quote")}&rdquo;
              </p>

              {/* Tag chips */}
              <div className="flex flex-wrap gap-2">
                {["15+ AWARDS", "250+ PROJECTS", "10+ YEARS"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                    style={{
                      background: "var(--color-bg-surface)",
                      color: "var(--color-text-muted)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* RIGHT: Mission card + stats + CTA */}
          <AnimateIn delay={180} from="right">
            <div className="flex flex-col gap-6">

              {/* Mission card */}
              <div
                className="flex-1 rounded-3xl p-8 md:p-10"
                style={{
                  background: "linear-gradient(135deg, var(--color-card-from) 0%, var(--color-card-to) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: "var(--color-accent)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#000">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>

                <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
                  {t("mission")}
                </p>
                <p className="text-base leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {t("missionText")}
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                <div
                  className="flex flex-col gap-1 rounded-2xl p-5 accent-pulse"
                  style={{ background: "var(--color-accent)" }}
                >
                  <span className="text-3xl font-black text-black">100%</span>
                  <span className="text-xs font-bold uppercase leading-tight tracking-wide text-black/60">
                    {t("delivery")}
                  </span>
                </div>

                <div
                  className="flex flex-col gap-1 rounded-2xl p-5"
                  style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
                >
                  <span className="text-3xl font-black" style={{ color: "var(--color-text-primary)" }}>
                    {t("supportLabel")}
                  </span>
                  <span className="text-xs uppercase leading-tight tracking-wide" style={{ color: "var(--color-text-muted)" }}>
                    {t("support")}
                  </span>
                </div>

                <div
                  className="flex flex-col gap-1 rounded-2xl p-5"
                  style={{ background: "var(--color-bg-surface)", border: "1px solid var(--color-border)" }}
                >
                  <span className="text-3xl font-black" style={{ color: "var(--color-text-primary)" }}>
                    {t("countriesLabel")}
                  </span>
                  <span className="text-xs uppercase leading-tight tracking-wide" style={{ color: "var(--color-text-muted)" }}>
                    {t("countries")}
                  </span>
                </div>
              </div>

              <div>
                <Link
                  href={`/${locale}/despre`}
                  className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:scale-105"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
                >
                  {t("teamLink")}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
