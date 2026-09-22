import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/site";
import { realPhone } from "@/lib/sanity-helpers";
import { BackToTop } from "./BackToTop";
import { Ribbon } from "./three/Ribbon";
import { Logo } from "./Logo";
import { ArrowUpRight, SocialIcon } from "./icons";

type Settings = {
  email?: string | null;
  phone?: string | null;
  address?: string | Record<string, string | null | undefined> | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  instagramUrl?: string | null;
} | null;

/** "Let's talk" footer: contact first, a live white ribbon folding behind it. */
export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const ts = await getTranslations("shell");
  const th = await getTranslations("home");
  const settings: Settings = await client.fetch(SITE_SETTINGS_QUERY).catch(() => null);

  const phone = realPhone(settings?.phone);
  const address =
    typeof settings?.address === "string"
      ? settings.address
      : settings?.address
        ? settings.address[locale] ?? settings.address.ro ?? null
        : null;

  const nav = [
    { href: `/${locale}/servicii`, label: t("services") },
    { href: `/${locale}/portofoliu`, label: t("portfolio") },
    { href: `/${locale}/industrii`, label: t("industries") },
    { href: `/${locale}/despre`, label: t("about") },
    { href: `/${locale}/preturi`, label: t("pricing") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/cariere`, label: t("careers") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  const social = [
    { href: settings?.linkedinUrl, label: "LinkedIn" },
    { href: settings?.instagramUrl, label: "Instagram" },
    { href: settings?.twitterUrl, label: "X" },
  ].filter((s): s is { href: string; label: string } => Boolean(s.href && s.href !== "#"));

  return (
    <footer className="u-footer">
      <div className="u-footer__ribbon" aria-hidden>
        <Ribbon />
      </div>
      <div className="u-wrap u-footer__inner">
        <div className="u-footer__grid">
          <div className="u-footer__talk">
            <Link href={`/${locale}/contact`} className="u-footer__title">
              {th("closingTitle")}
            </Link>
            <div className="u-footer__pills">
              {settings?.email && (
                <a href={`mailto:${settings.email}`} className="u-pill">
                  {settings.email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="u-pill u-tnum">
                  {phone}
                </a>
              )}
              <Link href={`/${locale}/contact`} className="u-btn u-btn--accent">
                {t("cta")}
                <ArrowUpRight />
              </Link>
            </div>
          </div>

          <nav className="u-footer__nav" aria-label={ts("nav")}>
            {nav.map((l) => (
              <Link key={l.href} href={l.href} className="u-uline">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="u-footer__meta">
            {address && (
              <div>
                <h2>{ts("contact")}</h2>
                <p>{address}</p>
              </div>
            )}
            <div>
              <h2>{ts("language")}</h2>
              <ul className="u-footer__langs">
                {(["ro", "en", "ru"] as const).map((l) => (
                  <li key={l}>
                    <Link href={`/${l}`} aria-current={l === locale ? "true" : undefined}>
                      {l.toUpperCase()}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="u-footer__bar">
          <Logo height={28} />
          {social.length > 0 && (
            <ul className="u-footer__social">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                    <SocialIcon name={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          )}
          <span className="u-footer__copy">
            © {new Date().getFullYear()} Uranium. {ts("rights")}
          </span>
          <BackToTop label={ts("top")} />
        </div>
      </div>
    </footer>
  );
}
