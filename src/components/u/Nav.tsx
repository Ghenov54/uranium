"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "./Logo";

const LOCALES = ["ro", "en", "ru"] as const;

export function Nav() {
  const t = useTranslations("nav");
  const ts = useTranslations("shell");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  // Hide while scrolling down, reveal on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 240 && y > prev);
  });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: `/${locale}/servicii`, label: t("services") },
    { href: `/${locale}/portofoliu`, label: t("portfolio") },
    { href: `/${locale}/despre`, label: t("about") },
    { href: `/${locale}/preturi`, label: t("pricing") },
    { href: `/${locale}/blog`, label: t("blog") },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const switchLocale = (next: string) => {
    const seg = pathname.split("/");
    seg[1] = next;
    router.push(seg.join("/"));
  };

  return (
    <>
      <header
        className="u-nav"
        data-hidden={hidden && !open ? "" : undefined}
        data-solid={solid && !open ? "" : undefined}
      >
        <div className="u-wrap u-nav__row">
          <Link href={`/${locale}`} className="u-nav__logo" aria-label="Uranium">
            <Logo />
          </Link>

          <nav className="u-nav__links" aria-label="Main">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="u-link" aria-current={isActive(l.href) ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="u-nav__end">
            <div className="u-lang" role="group" aria-label={ts("language")}>
              {LOCALES.map((l) => (
                <button key={l} type="button" onClick={() => switchLocale(l)} aria-current={l === locale ? "true" : undefined}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Link href={`/${locale}/contact`} className="u-btn u-btn--accent u-nav__cta">
              {t("cta")}
            </Link>
            <button
              type="button"
              className="u-burger"
              aria-expanded={open}
              aria-controls="u-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span>{open ? ts("close") : ts("menu")}</span>
              <span className="u-burger__lines" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div id="u-menu" className="u-menu" data-open={open ? "" : undefined} aria-hidden={!open}>
        <nav className="u-wrap u-menu__inner" aria-label="Mobile">
          {[{ href: `/${locale}`, label: ts("home") }, ...links, { href: `/${locale}/contact`, label: t("contact") }].map((l, i) => (
            <Link key={l.href} href={l.href} style={{ "--i": i } as React.CSSProperties} tabIndex={open ? 0 : -1}>
              {l.label}
            </Link>
          ))}
          <div className="u-menu__foot">
            <div className="u-lang" role="group" aria-label={ts("language")}>
              {LOCALES.map((l) => (
                <button key={l} type="button" onClick={() => switchLocale(l)} aria-current={l === locale ? "true" : undefined} tabIndex={open ? 0 : -1}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <Link href={`/${locale}/contact`} className="u-btn u-btn--accent" tabIndex={open ? 0 : -1}>
              {t("cta")}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
