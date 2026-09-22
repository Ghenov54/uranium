"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const TOP_FLAG = "uranium-go-top";

/** Inertial page scroll. Off for reduced motion. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // A logo click reloads the homepage; make sure it opens at the very top, not at the restored scroll.
    let goTop = false;
    try {
      goTop = sessionStorage.getItem(TOP_FLAG) === "1";
      sessionStorage.removeItem(TOP_FLAG);
    } catch {}
    if (goTop) {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -80 } });
    window.__lenis = lenis;
    if (goTop) lenis.scrollTo(0, { immediate: true });
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // New route starts at the top.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
