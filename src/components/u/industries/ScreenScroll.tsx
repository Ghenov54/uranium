"use client";
import { useEffect, useRef, useState } from "react";

/**
 * A browser window playing back a real site like a screen recording:
 * the full-page capture scrolls down slowly, pauses, and returns.
 */
export function ScreenScroll({ src, url, alt }: { src: string; url: string; alt: string }) {
  const view = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!view.current || !img.current) return;
      setTravel(Math.max(0, img.current.getBoundingClientRect().height - view.current.getBoundingClientRect().height));
    };
    const i = img.current;
    if (i?.complete) measure();
    i?.addEventListener("load", measure);
    const ro = new ResizeObserver(measure);
    if (view.current) ro.observe(view.current);
    return () => {
      i?.removeEventListener("load", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="u-screen">
      <div className="u-screen__bar" aria-hidden>
        <span />
        <span />
        <span />
        <em>{url}</em>
      </div>
      <div ref={view} className="u-screen__view">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={img}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="u-screen__page"
          style={{ "--travel": `${-travel}px`, "--dur": `${Math.max(14, travel / 180)}s` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
