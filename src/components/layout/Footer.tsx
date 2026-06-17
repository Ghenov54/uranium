"use client";

import { useTranslations, useLocale } from "next-intl";

type SiteData = {
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
} | null;

type Props = { siteData?: SiteData };

export function Footer({ siteData }: Props) {
  const t = useTranslations("footer");
  const locale = useLocale();

  const serviceLinks = [
    { label: "Web", href: `/${locale}/servicii/web` },
    { label: "Aplicații", href: `/${locale}/servicii/aplicatii` },
    { label: "Marketing", href: `/${locale}/servicii/marketing` },
    { label: "Business", href: `/${locale}/servicii/business` },
    { label: "Design", href: `/${locale}/servicii/design` },
  ];

  const companyLinks = [
    { label: t("aboutUs"), href: `/${locale}/despre` },
    { label: t("ourWork"), href: `/${locale}/portofoliu` },
    { label: t("careers"), href: "#" },
    { label: t("blogLink"), href: `/${locale}/blog` },
    { label: t("contactLink"), href: `/${locale}/contact` },
  ];

  const socialLinks = [
    { label: "LI", href: siteData?.linkedinUrl ?? "#", title: "LinkedIn" },
    { label: "TW", href: siteData?.twitterUrl ?? "#", title: "Twitter/X" },
    { label: "IG", href: siteData?.instagramUrl ?? "#", title: "Instagram" },
  ];

  return (
    <footer
      className="relative overflow-hidden pt-20 pb-0"
      style={{ background: "#020204", borderTop: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Aurora mesh gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 70% 50% at 20% 0%, rgba(180,245,0,0.12), transparent 60%)",
            "radial-gradient(ellipse 60% 60% at 80% 30%, rgba(20,60,220,0.16), transparent 60%)",
            "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,0,0,0.85), transparent 70%)",
          ].join(","),
        }}
        aria-hidden
      />

      {/* Film grain — no blend mode for cross-platform consistency */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
        aria-hidden
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      {/* Top accent gradient line — bright center */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 0%, var(--color-accent) 25%, rgba(255,255,255,0.55) 50%, var(--color-accent) 75%, transparent 100%)" }}
        aria-hidden
      />
      {/* Top glow bloom */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "900px", height: "380px",
          background: "radial-gradient(ellipse 50% 100% at 50% 0%, rgba(180,245,0,0.14) 0%, rgba(180,245,0,0.05) 50%, transparent 100%)",
        }}
        aria-hidden
      />

      <div className="section-container relative z-10">
        {/* Top grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 pb-12 border-b lg:gap-12"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {/* Column 1 — Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-2xl font-black text-white">
              URANIUM.
            </span>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Creăm experiențe digitale extraordinare.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  title={social.title}
                  className="text-xs font-mono uppercase tracking-widest transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              {t("services")}
            </p>
            <ul className="space-y-0">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-1 text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>
              {t("company")}
            </p>
            <ul className="space-y-0">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-1 text-sm transition-colors"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              {t("newsletter")}
            </p>
            <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.45)" }}>
              {t("newsletterDesc")}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="flex-1 rounded-lg px-4 py-2 text-sm bg-transparent focus:outline-none"
                style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.8)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}
              />
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: "var(--color-accent)", color: "#000" }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs pb-6"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <span>{t("copyright")}</span>
          <div className="flex gap-2">
            <a href="#" className="hover:underline" style={{ color: "rgba(255,255,255,0.3)" }}>
              {t("privacy")}
            </a>
            <span>·</span>
            <a href="#" className="hover:underline" style={{ color: "rgba(255,255,255,0.3)" }}>
              {t("terms")}
            </a>
          </div>
        </div>
      </div>

      {/* Large URANIUM watermark at the very bottom */}
      <div
        className="pointer-events-none select-none overflow-hidden leading-none relative"
        aria-hidden
      >
        {/* Glow behind text */}
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full h-32 blur-3xl"
          style={{ background: "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(180,245,0,0.08), transparent)" }}
        />
        <p
          className="text-center font-black uppercase"
          style={{
            fontSize: "clamp(4rem, 16vw, 14rem)",
            letterSpacing: "-0.03em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(180,245,0,0.2)",
            textShadow: "0 0 60px rgba(180,245,0,0.1), 0 0 180px rgba(180,245,0,0.05)",
            marginBottom: "-0.15em",
          }}
        >
          URANIUM
        </p>
      </div>
    </footer>
  );
}
