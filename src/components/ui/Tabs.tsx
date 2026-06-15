"use client";
import { useState } from "react";
import type { ReactNode } from "react";

export type Tab = { key: string; label: string };

type TabsProps = {
  tabs: Tab[];
  children: (activeKey: string) => ReactNode;
};

export function Tabs({ tabs, children }: TabsProps) {
  const [active, setActive] = useState(tabs[0]?.key ?? "");

  if (tabs.length === 0) return null;

  return (
    <div>
      <div
        role="tablist"
        className="mb-10 flex flex-wrap gap-2 border-b pb-6"
        style={{ borderColor: "var(--color-border)" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            aria-selected={active === tab.key}
            onClick={() => setActive(tab.key)}
            className="rounded-full px-5 py-2 text-sm font-medium transition-colors"
            style={
              active === tab.key
                ? { background: "var(--color-accent)", color: "#000" }
                : { background: "var(--color-bg-surface)", color: "var(--color-text-muted)" }
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{children(active)}</div>
    </div>
  );
}
