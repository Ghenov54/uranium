import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-black font-bold hover:bg-[#c8f020] transition-colors",
  secondary:
    "bg-transparent border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-accent hover:text-accent transition-colors",
  ghost:
    "bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 rounded-[9999px] px-6 py-3 text-sm font-medium transition-all",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
