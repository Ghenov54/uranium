"use client";

import { useTranslations } from "next-intl";
import { StatCounter } from "@/components/ui/StatCounter";

const labelKeys = ["experience", "projects", "clients", "satisfaction"] as const;
type StatsKey = (typeof labelKeys)[number];

const stats: { target: number; suffix: string; labelKey: StatsKey }[] = [
  { target: 15,  suffix: "+", labelKey: "experience"  },
  { target: 250, suffix: "+", labelKey: "projects"    },
  { target: 60,  suffix: "+", labelKey: "clients"     },
  { target: 99,  suffix: "%", labelKey: "satisfaction" },
];

export function StatsSection() {
  const t = useTranslations("stats");

  return (
    <section
      className="border-t py-24"
      style={{
        background: "var(--color-bg)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="section-container">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="flex flex-col items-center text-center">
              <StatCounter
                target={stat.target}
                suffix={stat.suffix}
                label={t(stat.labelKey)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
