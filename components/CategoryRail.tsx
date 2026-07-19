"use client";

import { Egg, Flame, Coffee, Salad, LucideIcon } from "lucide-react";
import type { Category } from "@/lib/types";

interface CategoryRailProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  brunch: Egg,
  sandwiches: Flame,
  drinks: Coffee,
  sides: Salad,
};

export function CategoryRail({
  categories,
  activeCategoryId,
  onSelectCategory,
}: CategoryRailProps) {
  return (
    <div className="w-full lg:w-auto">
      {/* Label for accessibility */}
      <h2 className="sr-only">Categories</h2>
      
      {/* Horizontal rail on mobile, vertical column on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none justify-start lg:flex-col lg:overflow-visible lg:pb-0">
        {categories.map((category) => {
          const IconComponent = CATEGORY_ICONS[category.id] || Egg;
          const isActive = category.id === activeCategoryId;

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none`}
              aria-label={`Filter by ${category.name}`}
              aria-pressed={isActive}
            >
              {/* Circular Icon Wrapper */}
              <div
                className={`relative flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-br from-brand-accent to-brand text-white shadow-lg shadow-brand-accent/30 scale-105"
                    : "bg-white/60 text-stone-600 hover:bg-brand-glow/15 hover:text-brand hover:scale-110 border border-white/25 shadow-sm"
                } focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-cream`}
              >
                <IconComponent className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              </div>
              
              {/* Category Name Label */}
              <span
                className={`text-xs font-semibold tracking-wide transition-colors ${
                  isActive ? "text-brand-accent" : "text-stone-500 group-hover:text-stone-800"
                }`}
              >
                {category.name.split(" ")[0]} {/* truncate to first word e.g. Sandwiches */}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
