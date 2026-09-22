"use client";
import { useEffect, useState } from "react";

const EXCHANGES = ["Binance", "Bybit", "OKX", "KuCoin", "Gate", "MEXC"];
const PAIRS = ["BTC", "ETH", "SOL", "TON", "ARB", "SUI"];

type Row = { pair: string; buy: string; sell: string; spread: number; hot: boolean };

let seed = 11;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const pick = <T,>(a: T[]) => a[Math.floor(rnd() * a.length)];

const makeRow = (pair: string): Row => {
  const buy = pick(EXCHANGES);
  let sell = pick(EXCHANGES);
  while (sell === buy) sell = pick(EXCHANGES);
  const spread = Math.round((0.05 + rnd() * 0.9) * 100) / 100;
  return { pair, buy, sell, spread, hot: spread > 0.6 };
};

/**
 * An illustrative arbitrage monitor: pairs are compared across exchanges,
 * spreads re-rank every second and the widest ones light up. Synthetic data.
 */
export function SpreadFlow({ label }: { label: string }) {
  const [rows, setRows] = useState<Row[]>(() => {
    // Same seed on server and client, so the first frame hydrates identically.
    seed = 11;
    return PAIRS.map(makeRow);
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setRows((prev) => {
        const next = prev.map((r) => (rnd() < 0.45 ? makeRow(r.pair) : r));
        return [...next].sort((a, b) => b.spread - a.spread);
      });
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="u-spread" aria-hidden>
      <div className="u-spread__head">
        <strong>Arbitrage Pro</strong>
        <span className="u-spread__live">
          <i /> live
        </span>
        <em>{EXCHANGES.length} exchanges</em>
      </div>
      <ol className="u-spread__rows">
        {rows.map((r) => (
          <li key={r.pair} data-hot={r.hot ? "" : undefined}>
            <b>{r.pair}/USDT</b>
            <span className="u-spread__route">
              {r.buy} <span>→</span> {r.sell}
            </span>
            <span className="u-spread__bar">
              <span style={{ width: `${Math.min(100, r.spread * 100)}%` }} />
            </span>
            <span className="u-spread__val" key={`${r.pair}-${r.spread}`}>
              {label} {r.spread.toFixed(2)}%
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
