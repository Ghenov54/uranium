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
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
      {/* Top accent gradient line */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
        aria-hidden
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-48 w-[600px] blur-3xl"
        style={{ background: "rgba(180,245,0,0.04)" }}
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
        className="pointer-events-none select-none overflow-hidden leading-none"
        aria-hidden
      >
        <p
          className="text-center font-black uppercase tracking-tight"
          style={{
            fontSize: "clamp(4rem, 16vw, 14rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
            marginBottom: "-0.15em",
          }}
        >
          URANIUM
        </p>
      </div>
    </footer>
  );
}
