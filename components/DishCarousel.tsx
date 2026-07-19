"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { MenuItem } from "@/lib/types";

interface DishCarouselProps {
  dishes: MenuItem[];
  activeDishId: string;
  onSelectDish: (id: string) => void;
}

export function DishCarousel({
  dishes,
  activeDishId,
  onSelectDish,
}: DishCarouselProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full lg:w-auto shrink-0">
      <h3 className="sr-only">Select a dish</h3>
      
      {/* Scroll rail: Horizontal on mobile, Vertical on desktop */}
      <div className="flex flex-row gap-4 overflow-x-auto pb-4 scrollbar-none justify-start lg:flex-col lg:overflow-y-auto lg:h-[550px] lg:pb-0 lg:pr-2 lg:py-2">
        {dishes.map((dish, idx) => {
          const isActive = dish.id === activeDishId;
          const imagePath = dish.image || "/images/dishes/shakshuka.png"; // fallback

          return (
            <button
              key={dish.id}
              onClick={() => onSelectDish(dish.id)}
              className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none relative"
              aria-label={`Select ${dish.name}`}
              aria-pressed={isActive}
            >
              {/* Circular Thumbnail Photo */}
              <div className="relative">
                {/* Active Indicator Ring */}
                {isActive && (
                  <motion.div
                    layoutId="activeRing"
                    className="absolute -inset-1.5 rounded-full border-2 border-brand"
                    transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                
                <div
                  className={`relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full border border-stone-200 bg-stone-100 transition-all duration-300 ${
                    isActive
                      ? "scale-105 shadow-md shadow-amber-950/10"
                      : "opacity-80 hover:opacity-100 border-white/20"
                  }`}
                >
                  <Image
                    src={imagePath}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 640px) 64px, 80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={idx < 3}
                  />
                </div>
              </div>
              
              {/* Dish Name & Price Label underneath */}
              <div className="flex flex-col items-center max-w-[76px] sm:max-w-[88px] text-center">
                <span
                  className={`text-[10px] font-medium leading-tight line-clamp-1 transition-colors ${
                    isActive ? "text-espresso font-semibold" : "text-stone-500 group-hover:text-stone-800"
                  }`}
                >
                  {dish.name}
                </span>
                <span
                  className={`text-[9px] font-serif transition-colors mt-0.5 ${
                    isActive ? "text-brand font-semibold" : "text-stone-400 group-hover:text-stone-600"
                  }`}
                >
                  €{dish.price.toFixed(2)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
