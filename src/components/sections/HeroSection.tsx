import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  title?: string;
  subtitle?: string;
  cta?: string;
  locale?: string;
};

export function HeroSection({ title, subtitle, cta, locale = "ro" }: Props) {
  const t = useTranslations("hero");
  const displayTitle = title || t("tagline");
  const displaySubtitle = subtitle || t("subtitle");
  const displayCta = cta || t("cta");

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden" style={{ background: "#020204" }}>
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 hero-anim-fade hero-d5"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />

      {/* Blue glow top-left */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full blur-3xl hero-anim-fade hero-d1"
        style={{ background: "rgba(30, 58, 138, 0.35)" }}
        aria-hidden
      />

      {/* Accent glow bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-[400px] w-[400px] rounded-full blur-3xl hero-anim-fade hero-d2"
        style={{ background: "rgba(180, 245, 0, 0.06)" }}
        aria-hidden
      />

      {/* Horizontal rule lines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-0 right-0 top-1/3 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
        <div className="absolute left-0 right-0 top-2/3 h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>

      {/* Watermark */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden hero-anim-fade hero-d5"
        aria-hidden
      >
        <p className="text-[18vw] font-black uppercase leading-none tracking-tight text-white/[0.03]">
          URANIUM
        </p>
      </div>

      <div className="section-container relative z-10 w-full">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center justify-center gap-3 hero-anim hero-d1">
            <div className="h-px w-8" style={{ background: "var(--color-accent)" }} />
            <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
              Uranium Digital Agency
            </p>
          </div>

          {/* Main heading */}
          <h1 className="mb-6 text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl hero-anim hero-d2">
            {displayTitle.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            className="mb-10 mx-auto max-w-lg text-base leading-relaxed md:text-lg hero-anim hero-d3"
            style={{ color: "var(--color-text-muted)" }}
          >
            {displaySubtitle}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 hero-anim hero-d4">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold transition-all hover:opacity-90 hover:scale-105 accent-pulse"
              style={{ background: "var(--color-accent)", color: "#000" }}
            >
              {displayCta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
