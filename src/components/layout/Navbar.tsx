"use client";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: `/${locale}/servicii`, label: t("services") },
    { href: `/${locale}/portofoliu`, label: t("portfolio") },
    { href: `/${locale}/despre`, label: t("about") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/preturi`, label: t("pricing") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="section-container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-xl font-black uppercase tracking-tight text-[var(--color-text-primary)]"
        >
          URANIUM.
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button variant="primary" className="text-xs">
            {t("cta")}
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex size-9 items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
          <Button variant="primary" className="mt-4 w-full text-xs">
            {t("cta")}
          </Button>
        </div>
      )}
    </header>
  );
}
