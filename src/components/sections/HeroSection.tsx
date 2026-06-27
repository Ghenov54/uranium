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
        className="pointer-events-none absolute hero-anim-fade hero-d3"
        style={{
          right: "-8%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "clamp(300px, 52vw, 640px)",
          height: "clamp(300px, 52vw, 640px)",
          animation: "heroOrbFloat 8s ease-in-out infinite",
          zIndex: 1,
        }}
        aria-hidden
      >
        {/* Outer ambient haze */}
        <div
          style={{
            position: "absolute",
            inset: "-15%",
            borderRadius: "50%",
            background: [
              "radial-gradient(ellipse 55% 55% at 35% 35%, rgba(70,80,255,0.07) 0%, transparent 65%)",
              "radial-gradient(ellipse 50% 50% at 65% 65%, rgba(220,50,110,0.05) 0%, transparent 65%)",
            ].join(","),
            animation: "heroOrbPulse 8s ease-in-out infinite",
          }}
        />

        {/* Main orb body */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            animation: "heroOrbMorph 11s ease-in-out infinite",
            background: [
              "radial-gradient(circle at 36% 30%, rgba(48,44,85,0.97) 0%, rgba(14,12,28,0.98) 30%, rgba(4,4,10,1) 65%, rgba(0,0,0,1) 100%)",
            ].join(","),
            boxShadow: [
              /* chromatic outer rim — blue top-left */
              "-6px -6px 45px rgba(60,95,255,0.38)",
              /* purple mid */
              "0 0 55px rgba(110,50,230,0.18)",
              /* red-magenta bottom-right */
              "8px 8px 40px rgba(215,45,105,0.28)",
              /* thin colored outline */
              "0 0 0 1px rgba(90,65,255,0.22)",
              /* inner depth */
              "inset 0 0 90px rgba(0,0,8,0.92)",
              "inset 28px -28px 70px rgba(75,45,200,0.22)",
              "inset -20px 20px 55px rgba(200,45,80,0.14)",
            ].join(","),
          }}
        >
          {/* Specular highlight — primary */}
          <div
            style={{
              position: "absolute",
              top: "9%",
              left: "13%",
              width: "32%",
              height: "22%",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(255,255,255,0.11) 0%, rgba(190,170,255,0.06) 50%, transparent 80%)",
            }}
          />

          {/* Specular highlight — secondary (blue tint) */}
          <div
            style={{
              position: "absolute",
              bottom: "18%",
              right: "12%",
              width: "18%",
              height: "14%",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(100,140,255,0.13) 0%, transparent 70%)",
            }}
          />

          {/* Inner chromatic rim arc — blue-left */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: "radial-gradient(ellipse 30% 80% at 5% 50%, rgba(60,100,255,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Inner chromatic rim arc — red-right */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: "radial-gradient(ellipse 30% 70% at 95% 55%, rgba(220,55,100,0.1) 0%, transparent 70%)",
            }}
          />
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
