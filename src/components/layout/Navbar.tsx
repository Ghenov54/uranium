"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Only be transparent on homepage (dark hero background)
  const isHomepage = pathname === `/${locale}` || pathname === "/";
  const transparent = isHomepage && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  const links = [
    { href: `/${locale}/servicii`, label: t("services") },
    { href: `/${locale}/portofoliu`, label: t("portfolio") },
    { href: `/${locale}/despre`, label: t("about") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/preturi`, label: t("pricing") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          transparent
            ? "bg-transparent"
            : "border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md"
        )}
      >
        <div className="section-container flex h-16 items-center justify-between">
          {/* Logo — white when transparent, theme color when scrolled */}
          <Link
            href={`/${locale}`}
            className={cn(
              "text-xl font-black uppercase tracking-tight transition-colors duration-300",
              transparent ? "text-white" : "text-[var(--color-text-primary)]"
            )}
          >
            URANIUM.
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors duration-300",
                  transparent
                    ? "text-white/70 hover:text-white"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button variant="primary" className="text-xs">
              {t("cta")}
            </Button>
          </div>

          {/* Mobile hamburger — always visible */}
          <button
            className={cn(
              "flex size-10 items-center justify-center rounded-xl border transition-all duration-300 md:hidden",
              transparent
                ? "border-white/20 text-white"
                : "border-[var(--color-border)] text-[var(--color-text-primary)]"
            )}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ──────────────────────────────────── */}

      {/* Backdrop — click to close */}
      <div
        className="fixed inset-0 z-[60] md:hidden"
        style={{
          background: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
        onClick={closeMenu}
        aria-hidden
      />

      {/* Drawer — slides from RIGHT */}
      <div
        className="fixed right-0 top-0 bottom-0 z-[70] flex w-[280px] flex-col md:hidden"
        style={{
          background: "var(--color-bg)",
          borderLeft: "1px solid var(--color-border)",
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: mobileOpen ? "-20px 0 60px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <Link
            href={`/${locale}`}
            className="text-lg font-black uppercase"
            style={{ color: "var(--color-text-primary)" }}
            onClick={closeMenu}
          >
            URANIUM.
          </Link>
          <button
            onClick={closeMenu}
            className="flex size-9 items-center justify-center rounded-xl border transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav links — staggered animation */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-bold uppercase tracking-wide transition-colors hover:bg-[var(--color-bg-surface)]"
              style={{
                color: "var(--color-text-primary)",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(20px)",
                transition: `opacity 0.35s ease ${mobileOpen ? i * 45 : 0}ms, transform 0.35s ease ${mobileOpen ? i * 45 : 0}ms, background-color 0.2s ease, color 0.2s ease`,
              }}
              onClick={closeMenu}
            >
              <span>{link.label}</span>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: "var(--color-accent)" }}
              >
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </Link>
          ))}
        </nav>

        {/* Drawer footer */}
        <div
          className="p-6"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div className="mb-4 flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Link
            href={`/${locale}/contact`}
            className="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all hover:opacity-90"
            style={{ background: "var(--color-accent)", color: "#000" }}
            onClick={closeMenu}
          >
            {t("cta")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
