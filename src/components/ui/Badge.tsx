import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[9999px] border px-3 py-1 text-xs font-medium uppercase tracking-wider",
        variant === "default"
          ? "border-[var(--color-border)] text-[var(--color-text-muted)]"
          : "border-accent bg-accent/10 text-accent",
        className
      )}
    >
      {children}
    </span>
  );
}
