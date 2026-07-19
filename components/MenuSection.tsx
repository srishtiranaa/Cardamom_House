"use client";

import { motion, useReducedMotion } from "motion/react";
import { MenuItem } from "@/components/MenuItem";
import type { MenuSectionProps } from "@/lib/types";

export function MenuSection({
  category,
  soldOutItemIds,
  todaySpecialItemId,
}: MenuSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 };
  const whileInView = { opacity: 1, y: 0 };
  const transition = { duration: 0.4, ease: "easeOut" } as const;

  return (
    <motion.section
      id={`category-${category.id}`}
      className="scroll-mt-28 lg:scroll-mt-8"
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
    >
      <div className="mb-6 border-b border-stone-200/80 pb-4">
        <h2 className="font-serif text-2xl text-espresso sm:text-3xl">
          {category.name}
        </h2>
        {category.description ? (
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-stone-600">
            {category.description}
          </p>
        ) : null}
      </div>

      <ul className="grid gap-4 sm:grid-cols-1" role="list">
        {category.items.map((item, index) => (
          <MenuItem
            key={item.id}
            item={item}
            index={index}
            isSoldOut={soldOutItemIds.includes(item.id)}
            isTodaySpecial={item.id === todaySpecialItemId}
          />
        ))}
      </ul>
    </motion.section>
  );
}
