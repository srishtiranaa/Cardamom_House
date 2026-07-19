"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { StatusDot, focusRing } from "@/components/ui";
import type { HeroProps } from "@/lib/types";

export function Hero({ restaurant, state }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 };
  const animate = { opacity: 1, scale: 1 };
  const transition = { duration: 0.5, ease: "easeOut" } as const;

  return (
    <header className="relative overflow-hidden px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8">
      <div
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto max-w-5xl"
        initial={initial}
        animate={animate}
        transition={transition}
      >
        {state.closedBanner ? (
          <div
            className="mb-6 rounded-2xl border border-stone-300/60 bg-stone-100/90 px-4 py-3 text-center sm:px-6"
            role="status"
          >
            <p className="font-serif text-lg text-stone-800">
              {state.closedBanner.message}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {state.closedBanner.nextOpening}
            </p>
          </div>
        ) : null}

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">
          Lisbon · Estrela
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-espresso sm:text-5xl lg:text-6xl">
          {restaurant.name}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
          {restaurant.tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/60 px-4 py-2 text-sm font-medium text-stone-700 backdrop-blur-sm">
            <StatusDot isOpen={state.isOpen} />
            <span className="capitalize">{state.statusLabel}</span>
            <span className="text-stone-400" aria-hidden="true">
              ·
            </span>
            <span className="text-stone-500">
              {state.simulatedTime} (simulated)
            </span>
          </div>

          <Link
            href="/carousel"
            className={`${focusRing()} inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-all hover:bg-brand-dark hover:scale-102`}
          >
            <span>Interactive Carousel Menu</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </motion.div>
    </header>
  );
}
