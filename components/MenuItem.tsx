"use client";

import { motion } from "motion/react";
import { TagPill } from "@/components/ui";
import { formatPrice } from "@/lib/data";
import type { MenuItemProps } from "@/lib/types";

export function MenuItem({
  item,
  isSoldOut = false,
  isTodaySpecial = false,
  index = 0,
}: MenuItemProps) {
  return (
    <motion.li
      className={`rounded-xl px-3 py-4 transition-colors sm:px-4 ${
        isSoldOut
          ? "bg-stone-100/60 opacity-70"
          : "hover:bg-white/50"
      } ${isTodaySpecial && !isSoldOut ? "ring-1 ring-brand/15" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.05,
      }}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={`font-medium ${isSoldOut ? "text-stone-500" : "text-espresso"}`}
            >
              {item.name}
            </h3>
            {isSoldOut ? <TagPill label="Sold out" variant="sold-out" /> : null}
            {isTodaySpecial && !isSoldOut ? (
              <TagPill label="Today" variant="special" />
            ) : null}
          </div>
          {item.description ? (
            <p className="mt-1 text-sm leading-relaxed text-stone-600">
              {item.description}
            </p>
          ) : null}
          {item.tags.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <TagPill key={tag} label={tag} />
              ))}
            </div>
          ) : null}
        </div>
        <p
          className={`shrink-0 font-serif text-lg tabular-nums ${
            isSoldOut ? "text-stone-400" : "text-brand-dark"
          }`}
          aria-label={`Price ${formatPrice(item.price)}`}
        >
          {formatPrice(item.price)}
        </p>
      </div>
    </motion.li>
  );
}
