import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "aside";
}

export function GlassCard({
  children,
  className = "",
  as: Component = "div",
}: GlassCardProps) {
  return (
    <Component
      className={`rounded-2xl border border-white/20 bg-white/40 shadow-lg shadow-amber-950/5 backdrop-blur-md ${className}`}
    >
      {children}
    </Component>
  );
}

interface FocusRingProps {
  className?: string;
}

export function focusRing({ className = "" }: FocusRingProps = {}): string {
  return `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${className}`;
}

interface TagPillProps {
  label: string;
  variant?: "default" | "sold-out" | "special";
}

const TAG_LABELS: Record<string, string> = {
  V: "Vegetarian",
  GF: "Gluten-free",
  spicy: "Spicy",
};

export function TagPill({ label, variant = "default" }: TagPillProps) {
  const readable = TAG_LABELS[label] ?? label;

  const variantClasses = {
    default: "border-stone-300/80 bg-stone-100/80 text-stone-600",
    "sold-out": "border-stone-300 bg-stone-200 text-stone-600",
    special: "border-brand/30 bg-brand/10 text-brand-dark",
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide ${variantClasses}`}
      aria-label={readable}
      title={readable}
    >
      {label}
    </span>
  );
}

export function StatusDot({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${isOpen ? "bg-emerald-500" : "bg-stone-400"}`}
      aria-hidden="true"
    />
  );
}
