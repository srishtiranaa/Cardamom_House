import { GlassCard } from "@/components/ui";
import { formatPrice } from "@/lib/data";
import type { TodaySpecialProps } from "@/lib/types";

export function TodaySpecial({ state, specialItem }: TodaySpecialProps) {
  return (
    <aside
      className="px-4 sm:px-6 lg:px-8"
      aria-label="Today's special"
    >
      <div className="mx-auto max-w-5xl">
        <GlassCard
          className={`overflow-hidden ${state.todaySpecial.soldOut ? "border-stone-300/50" : "border-brand/25 bg-gradient-to-br from-brand/12 via-white/75 to-amber-50/80"}`}
        >
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Today&apos;s special
              </p>
              <p
                className={`mt-2 font-serif text-xl text-espresso sm:text-2xl ${state.todaySpecial.soldOut ? "text-stone-500" : ""}`}
              >
                {specialItem?.name ?? "Chef's pick"}
              </p>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-stone-600">
                {state.todaySpecial.calloutMessage}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
              {specialItem ? (
                <span
                  className={`font-serif text-2xl ${state.todaySpecial.soldOut ? "text-stone-400 line-through" : "text-brand-dark"}`}
                >
                  {formatPrice(specialItem.price)}
                </span>
              ) : null}
              {state.todaySpecial.soldOut ? (
                <span className="rounded-full bg-stone-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-stone-600">
                  Sold out
                </span>
              ) : (
                <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Available now
                </span>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </aside>
  );
}
