"use client";

import { useEffect, useState } from "react";
import { focusRing, GlassCard } from "@/components/ui";
import type { Category, CategoryNavProps } from "@/lib/types";

function categoryHref(categoryId: string): string {
  return `#category-${categoryId}`;
}

function NavLink({
  category,
  isActive,
}: {
  category: Category;
  isActive: boolean;
}) {
  return (
    <a
      href={categoryHref(category.id)}
      className={`${focusRing()} shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-brand text-white shadow-sm shadow-brand/30"
          : "bg-white/50 text-stone-700 hover:bg-brand/10 hover:text-brand-dark"
      }`}
      aria-current={isActive ? "location" : undefined}
    >
      {category.name}
    </a>
  );
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const [activeId, setActiveId] = useState<string>(categories[0]?.id ?? "");

  useEffect(() => {
    const sectionElements = categories
      .map((category) => document.getElementById(`category-${category.id}`))
      .filter((element): element is HTMLElement => element !== null);

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visible[0];
        if (topEntry?.target.id.startsWith("category-")) {
          setActiveId(topEntry.target.id.replace("category-", ""));
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [categories]);

  return (
    <nav
      className="sticky top-0 z-30 px-4 py-3 sm:px-6 lg:sticky lg:top-8 lg:self-start lg:px-0 lg:py-0"
      aria-label="Menu categories"
    >
      <GlassCard className="lg:p-3">
        <div className="flex gap-2 overflow-x-auto p-3 scrollbar-none lg:flex-col lg:overflow-visible lg:p-0">
          {categories.map((category) => (
            <NavLink
              key={category.id}
              category={category}
              isActive={activeId === category.id}
            />
          ))}
        </div>
      </GlassCard>
    </nav>
  );
}
