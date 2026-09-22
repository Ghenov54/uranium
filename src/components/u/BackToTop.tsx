"use client";
import { ArrowUp } from "./icons";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="u-link u-footer__top"
      onClick={() => (window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
    >
      {label}
      <ArrowUp />
    </button>
  );
}
