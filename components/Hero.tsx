"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";
import { StatusDot, focusRing } from "@/components/ui";
import type { HeroProps } from "@/lib/types";

export function Hero({ restaurant, state }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  // Motion configs
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <header className="relative overflow-hidden px-4 min-h-[75vh] flex flex-col justify-between sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Dynamic Floating Ambient Background Blobs */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, 20, -10, 0],
                y: [0, -30, 20, 0],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand/15 blur-3xl lg:h-80 lg:w-80"
        aria-hidden="true"
      />
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : {
                x: [0, -20, 15, 0],
                y: [0, 25, -15, 0],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-amber-200/35 blur-3xl lg:h-80 lg:w-80"
        aria-hidden="true"
      />

      {/* Top Banner (Closed Today) */}
      <div className="relative mx-auto w-full max-w-5xl">
        {state.closedBanner ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-stone-300/60 bg-stone-100/90 px-4 py-3 text-center sm:px-6 shadow-sm"
            role="status"
          >
            <p className="font-serif text-lg text-stone-800">
              {state.closedBanner.message}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {state.closedBanner.nextOpening}
            </p>
          </motion.div>
        ) : null}
      </div>

      {/* Main Branding & Hero Title */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative mx-auto w-full max-w-5xl flex-1 flex flex-col justify-center py-10 md:py-16"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-brand"
        >
          Lisbon · Estrela
        </motion.p>
        
        <motion.h1
          variants={scaleVariants}
          className="mt-4 font-serif text-6xl leading-tight text-espresso sm:text-7xl lg:text-8xl max-w-3xl tracking-tight font-light"
        >
          {restaurant.name === "Cardamom House" ? (
            <>
              <span className="text-brand-accent font-normal italic">Cardamom</span>{" "}
              <span className="text-espresso font-semibold">House</span>
            </>
          ) : (
            restaurant.name
          )}
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-xl leading-relaxed text-stone-600 sm:text-2xl font-serif italic"
        >
          {restaurant.tagline}
        </motion.p>

        {/* Call to Action Button */}
        <motion.div variants={itemVariants} className="mt-8">
          <a
            href="#menu-carousel"
            className={`${focusRing()} inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand via-brand-accent to-brand px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-accent/25 hover:shadow-xl hover:shadow-brand-accent/40 transition-all duration-300 hover:scale-103 active:scale-98`}
          >
            <span>Explore Menu</span>
            <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom status badge + scroll chevron */}
      <div className="relative mx-auto w-full max-w-5xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-stone-200/40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="inline-flex self-start items-center gap-2 rounded-full border border-brand/20 bg-white/60 px-4 py-2 text-sm font-medium text-stone-700 backdrop-blur-sm shadow-sm"
        >
          <StatusDot isOpen={state.isOpen} />
          <span className="capitalize">{state.statusLabel}</span>
          <span className="text-stone-400" aria-hidden="true">
            ·
          </span>
          <span className="text-stone-500">
            {state.simulatedTime} (simulated)
          </span>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#menu-carousel"
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="hidden sm:flex items-center gap-1.5 text-xs text-stone-400 font-semibold tracking-wider uppercase hover:text-stone-700 transition-colors focus-visible:outline-none"
        >
          <span>Scroll to Menu</span>
          <ChevronDown className="h-4 w-4 text-brand" />
        </motion.a>
      </div>
    </header>
  );
}
