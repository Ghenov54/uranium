"use client";

import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export function StatCounter({
  target,
  suffix = "",
  label,
  duration = 2000,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            // easeOut cubic
            const progress = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(progress * target));

            if (t < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <div ref={containerRef} className="flex flex-col items-center text-center">
      <div
        className="font-black leading-none"
        style={{
          fontSize: "clamp(72px, 8vw, 96px)",
          color: "var(--color-accent)",
        }}
      >
        {count}
        <span>{suffix}</span>
      </div>
      <p className="mt-3 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
        {label}
      </p>
    </div>
  );
}
