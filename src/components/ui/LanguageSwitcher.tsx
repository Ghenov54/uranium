"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const locales = [
  { code: "ro", label: "RO" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:border-accent hover:text-accent"
      >
        {locale.toUpperCase()}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-16 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] shadow-lg">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`block w-full px-3 py-2 text-left text-xs font-medium uppercase tracking-wider transition-colors hover:text-accent ${
                locale === l.code
                  ? "text-accent"
                  : "text-[var(--color-text-muted)]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
