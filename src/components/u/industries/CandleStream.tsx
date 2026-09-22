"use client";
import { useEffect, useRef, useState } from "react";

type Candle = { o: number; h: number; l: number; c: number };
type Alert = { id: number; pair: string; score: number; kind: "soon" | "break" };

const PAIRS = ["SOLUSDT", "ETHUSDT", "AVAXUSDT", "SUIUSDT", "ARBUSDT", "DOGEUSDT", "INJUSDT", "TIAUSDT", "WLDUSDT", "SEIUSDT"];

/**
 * An illustrative live market view in the spirit of Proboi Scanner: candles
 * form tick by tick on a canvas, an EMA follows, a breakout level is drawn,
 * and scanner alerts slide in. Synthetic data, drawn for motion only.
 */
export function CandleStream({ labels }: { labels: { soon: string; confirmed: string; score: string } }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [price, setPrice] = useState(142.18);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Seeded random walk so the first frame always looks the same.
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const candles: Candle[] = [];
    let last = 140;
    for (let i = 0; i < 70; i++) {
      const drift = i > 50 ? 0.05 : 0;
      const o = last;
      const c = o + (rnd() - 0.48 + drift) * 1.2;
      candles.push({ o, c, h: Math.max(o, c) + rnd() * 0.6, l: Math.min(o, c) - rnd() * 0.6 });
      last = c;
    }

    let raf = 0;
    let visible = true;
    let tick = 0;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (cv.width !== w * dpr) {
        cv.width = w * dpr;
        cv.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const view = candles.slice(-56);
      const hi = Math.max(...view.map((c) => c.h));
      const lo = Math.min(...view.map((c) => c.l));
      const pad = (hi - lo) * 0.12;
      const y = (v: number) => h - 28 - ((v - (lo - pad)) / (hi - lo + pad * 2)) * (h - 56);
      const cw = w / view.length;

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      for (let g = 1; g < 6; g++) {
        const gy = (h / 6) * g;
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      // Breakout level: the highest high of the older part of the window.
      const level = Math.max(...view.slice(0, -8).map((c) => c.h));
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = "rgba(255, 196, 0, 0.7)";
      ctx.beginPath();
      ctx.moveTo(0, y(level));
      ctx.lineTo(w, y(level));
      ctx.stroke();
      ctx.setLineDash([]);

      // Candles
      view.forEach((c, i) => {
        const x = i * cw + cw / 2;
        const up = c.c >= c.o;
        ctx.strokeStyle = ctx.fillStyle = up ? "#35d07f" : "#ff5a5f";
        ctx.beginPath();
        ctx.moveTo(x, y(c.h));
        ctx.lineTo(x, y(c.l));
        ctx.stroke();
        const top = y(Math.max(c.o, c.c));
        ctx.fillRect(x - cw * 0.32, top, cw * 0.64, Math.max(1.5, y(Math.min(c.o, c.c)) - top));
      });

      // EMA 20
      ctx.strokeStyle = "#9b6bff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      let ema = view[0].c;
      view.forEach((c, i) => {
        ema = ema + (c.c - ema) * (2 / 21);
        const px = i * cw + cw / 2;
        if (i === 0) ctx.moveTo(px, y(ema));
        else ctx.lineTo(px, y(ema));
      });
      ctx.stroke();

      // Last price tag
      const lc = view[view.length - 1];
      ctx.fillStyle = lc.c >= lc.o ? "#35d07f" : "#ff5a5f";
      ctx.fillRect(w - 64, y(lc.c) - 11, 64, 22);
      ctx.fillStyle = "#0f1016";
      ctx.font = "600 12px ui-monospace, monospace";
      ctx.fillText(lc.c.toFixed(2), w - 58, y(lc.c) + 4);
    };

    const step = () => {
      raf = 0;
      if (visible && !document.hidden) {
        tick++;
        const c = candles[candles.length - 1];
        // Each tick moves the live candle; every 12 ticks a new candle opens.
        c.c += (rnd() - 0.47) * 0.35;
        c.h = Math.max(c.h, c.c);
        c.l = Math.min(c.l, c.c);
        if (tick % 12 === 0) {
          candles.push({ o: c.c, c: c.c, h: c.c, l: c.c });
          if (candles.length > 200) candles.shift();
        }
        setPrice(c.c);
        draw();
      }
      raf = window.setTimeout(() => requestAnimationFrame(step), 160) as unknown as number;
    };

    draw();
    if (!reduce) step();

    let n = 0;
    const alertTimer = reduce
      ? 0
      : window.setInterval(() => {
          if (document.hidden) return;
          n++;
          const kind: Alert["kind"] = n % 3 === 0 ? "break" : "soon";
          const score = kind === "break" ? 86 + (n % 9) : 78 + (n % 7);
          setAlerts((a) => [{ id: n, pair: PAIRS[n % PAIRS.length], score, kind }, ...a].slice(0, 4));
        }, 1800);

    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(raf);
      clearInterval(alertTimer);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="u-market">
      <div className="u-market__head">
        <strong>SOL / USDT</strong>
        <span className="u-tnum">{price.toFixed(2)}</span>
        <em>5m</em>
      </div>
      <canvas ref={canvas} className="u-market__chart" aria-hidden />
      <ul className="u-market__alerts" aria-hidden>
        {alerts.map((a) => (
          <li key={a.id} data-kind={a.kind}>
            <b>{a.pair}</b>
            <span>{a.kind === "break" ? labels.confirmed : labels.soon}</span>
            <i className="u-tnum">
              {labels.score} {a.score}
            </i>
          </li>
        ))}
      </ul>
    </div>
  );
}
