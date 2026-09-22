"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export type CycleFrame = { src: string; alt: string; cursor?: [number, number] };

/**
 * Real product screens played like a short recording: each frame drifts and
 * zooms slowly, a cursor travels to a point of interest and clicks, then the
 * next screen fades in.
 */
export function ScreenCycle({ frames, url, hold = 4200 }: { frames: CycleFrame[]; url: string; hold?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || frames.length < 2) return;
    const id = setInterval(() => !document.hidden && setI((n) => (n + 1) % frames.length), hold);
    return () => clearInterval(id);
  }, [frames.length, hold, reduce]);

  const target = frames[i]?.cursor ?? [62, 48];

  return (
    <div className="u-screen u-screen--cycle">
      <div className="u-screen__bar" aria-hidden>
        <span />
        <span />
        <span />
        <em>{url}</em>
      </div>
      <div className="u-screen__view">
        {frames.map((f, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={f.src} src={f.src} alt={f.alt} loading="lazy" decoding="async" className="u-cycle__img" data-on={k === i ? "" : undefined} />
        ))}
        {!reduce && (
          <span className="u-cursor" key={i} style={{ "--cx": `${target[0]}%`, "--cy": `${target[1]}%` } as React.CSSProperties} aria-hidden>
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M4 2l16 9-7 1.6L9.6 20z" fill="#0f1016" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <i />
          </span>
        )}
      </div>
    </div>
  );
}
