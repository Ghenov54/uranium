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

      {/* ── BACKGROUND LAYERS ─────────────────────────────── */}

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 hero-anim-fade hero-d5"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />

      {/* Blue glow top-left */}
      <div
        className="pointer-events-none absolute hero-anim-fade hero-d1"
        style={{
          left: "-128px", top: "-128px", width: "700px", height: "700px",
          background: "radial-gradient(circle, rgba(30,58,138,0.45) 0%, rgba(30,58,138,0.18) 40%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Accent glow bottom-right */}
      <div
        className="pointer-events-none absolute hero-anim-fade hero-d2"
        style={{
          right: "-64px", bottom: "-64px", width: "500px", height: "500px",
          background: "radial-gradient(circle, rgba(180,245,0,0.12) 0%, rgba(180,245,0,0.05) 40%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Subtle horizontal lines */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-0 right-0 top-1/3 h-px" style={{ background: "rgba(255,255,255,0.03)" }} />
        <div className="absolute left-0 right-0 top-2/3 h-px" style={{ background: "rgba(255,255,255,0.03)" }} />
      </div>

      {/* Watermark */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden hero-anim-fade hero-d5"
        aria-hidden
      >
        <p
          className="font-black uppercase leading-none tracking-tight"
          style={{
            fontSize: "18vw",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          }}
        >
          URANIUM
        </p>
      </div>

      {/* ── IRIDESCENT ORB ────────────────────────────────── */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: "2%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(300px, 50vw, 620px)",
          height: "clamp(300px, 50vw, 620px)",
          animation: "heroOrbFloat 8s ease-in-out infinite",
          zIndex: 1,
        }}
        aria-hidden
      >
        {/* Outer aura — radial gradients, not box-shadow (safe with overflow:hidden) */}
        <div
          style={{
            position: "absolute",
            inset: "-18%",
            borderRadius: "50%",
            background: [
              "radial-gradient(ellipse 45% 75% at 12% 48%, rgba(60,90,255,0.18) 0%, transparent 70%)",
              "radial-gradient(ellipse 42% 65% at 88% 54%, rgba(220,45,100,0.14) 0%, transparent 65%)",
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(80,40,180,0.08) 0%, transparent 70%)",
            ].join(","),
            animation: "heroOrbPulse 8s ease-in-out infinite",
          }}
        />

        {/* Main orb body — dark purple core, visible against #020204 */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            animation: "heroOrbMorph 11s ease-in-out infinite",
            background: [
              "radial-gradient(circle at 38% 32%,",
              "rgba(65,52,118,0.98) 0%,",
              "rgba(28,22,62,0.99) 28%,",
              "rgba(10,8,24,1) 58%,",
              "rgba(2,2,6,1) 100%)",
            ].join(" "),
            boxShadow: [
              /* inset only — safe with overflow:hidden */
              "inset 0 0 100px rgba(0,0,6,0.96)",
              "inset 30px -30px 70px rgba(65,38,210,0.28)",
              "inset -22px 22px 60px rgba(210,38,85,0.2)",
              "inset 0 0 40px rgba(50,20,140,0.35)",
            ].join(","),
          }}
        >
          {/* Specular highlight — glass reflection */}
          <div style={{
            position: "absolute", top: "8%", left: "12%",
            width: "32%", height: "22%", borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.16) 0%, rgba(200,180,255,0.07) 55%, transparent 85%)",
          }} />

          {/* Chromatic left rim — blue */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            background: "radial-gradient(ellipse 22% 72% at 2% 50%, rgba(70,115,255,0.32) 0%, transparent 100%)",
          }} />

          {/* Chromatic right rim — red/magenta */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            background: "radial-gradient(ellipse 20% 62% at 98% 53%, rgba(235,48,100,0.26) 0%, transparent 100%)",
          }} />

          {/* Chromatic top rim — violet */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            background: "radial-gradient(ellipse 70% 18% at 50% 1%, rgba(130,55,255,0.28) 0%, transparent 100%)",
          }} />

          {/* Chromatic bottom rim — deep blue */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "inherit",
            background: "radial-gradient(ellipse 65% 16% at 48% 99%, rgba(40,80,220,0.2) 0%, transparent 100%)",
          }} />

          {/* Secondary specular — blue tint */}
          <div style={{
            position: "absolute", bottom: "16%", right: "11%",
            width: "16%", height: "12%", borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(100,145,255,0.16) 0%, transparent 75%)",
          }} />
        </div>
      </div>

      {/* ── HERO CONTENT ──────────────────────────────────── */}
      <div className="section-container relative w-full" style={{ zIndex: 2 }}>
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-3 hero-anim hero-d1">
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
            className="mb-10 max-w-lg text-base leading-relaxed md:text-lg hero-anim hero-d3"
            style={{ color: "var(--color-text-muted)" }}
          >
            {displaySubtitle}
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 hero-anim hero-d4">
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

      {/* ── ORB KEYFRAME ANIMATIONS ───────────────────────── */}
      <style>{`
        @keyframes heroOrbMorph {
          0%   { border-radius: 62% 38% 46% 54% / 56% 46% 54% 44%; }
          20%  { border-radius: 40% 60% 62% 38% / 48% 62% 38% 52%; }
          40%  { border-radius: 54% 46% 38% 62% / 62% 36% 64% 38%; }
          60%  { border-radius: 46% 54% 56% 44% / 40% 58% 42% 60%; }
          80%  { border-radius: 36% 64% 44% 56% / 54% 44% 56% 46%; }
          100% { border-radius: 62% 38% 46% 54% / 56% 46% 54% 44%; }
        }
        @keyframes heroOrbFloat {
          0%,  100% { transform: translateY(-50%) translate(0px,  0px); }
          30%        { transform: translateY(-50%) translate(6px,  -14px); }
          60%        { transform: translateY(-50%) translate(-4px, -22px); }
          80%        { transform: translateY(-50%) translate(8px,  -10px); }
        }
        @keyframes heroOrbPulse {
          0%, 100% { opacity: 0.65; }
          50%       { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
