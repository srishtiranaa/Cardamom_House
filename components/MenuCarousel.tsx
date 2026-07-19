"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryRail } from "@/components/CategoryRail";
import { DishCarousel } from "@/components/DishCarousel";
import { DishDetailCard } from "@/components/DishDetailCard";
import type { Category, MenuItem } from "@/lib/types";

interface MenuCarouselProps {
  categories: Category[];
}

export function MenuCarousel({ categories }: MenuCarouselProps) {
  // Filters out categories with no items (or handles empty categories gracefully)
  const validCategories = useMemo(() => {
    return categories.filter((c) => c.items.length > 0);
  }, [categories]);

  // State: active category ID
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    validCategories[0]?.id ?? ""
  );

  // Get items in the active category
  const activeCategoryDishes = useMemo(() => {
    const category = validCategories.find((c) => c.id === activeCategoryId);
    return category?.items ?? [];
  }, [activeCategoryId, validCategories]);

  // State: active dish ID (defaults to the first item in the active category)
  const [activeDishId, setActiveDishId] = useState<string>(
    activeCategoryDishes[0]?.id ?? ""
  );

  // Set default dish when category changes
  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    const category = validCategories.find((c) => c.id === categoryId);
    if (category && category.items.length > 0) {
      setActiveDishId(category.items[0].id);
    } else {
      setActiveDishId("");
    }
  };

  // Find the active dish object
  const activeDish = useMemo(() => {
    return activeCategoryDishes.find((dish) => dish.id === activeDishId);
  }, [activeDishId, activeCategoryDishes]);

  // State: Favorites list
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const handleToggleFavorite = (dishId: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(dishId)) {
        next.delete(dishId);
      } else {
        next.add(dishId);
      }
      return next;
    });
  };

  // State: Shopping cart indicator (toast notification)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = (dish: MenuItem) => {
    console.log(`Modular Cart Integration: Item added ->`, dish);
    setToastMessage(`Added ${dish.name} to cart!`);
    setShowToast(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-rose-100 via-amber-50 to-orange-100 py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden">
      {/* Decorative Blur Background Blobs */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-rose-200/40 blur-3xl lg:h-96 lg:w-96" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-96 w-96 rounded-full bg-orange-200/35 blur-3xl lg:h-[500px] lg:w-[500px]" />
      
      {/* Interactive Micro-Animated Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            onAnimationComplete={() => {
              // Hide toast after 2.5s
              const timer = setTimeout(() => setShowToast(false), 2200);
              return () => clearTimeout(timer);
            }}
            className="fixed top-6 z-50 rounded-full bg-espresso text-cream px-6 py-3.5 shadow-lg shadow-espresso/30 flex items-center gap-2 border border-white/10"
          >
            <span className="text-xs font-semibold uppercase tracking-wide">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-5xl flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-center">
        {/* Step 1: Category Selector (Circular categories) */}
        <div className="flex flex-col gap-4">
          <h1 className="font-serif text-2xl font-bold text-espresso lg:hidden text-center sm:text-left">
            Cardamom House
          </h1>
          <CategoryRail
            categories={validCategories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* Step 2: Vertical Dish Carousel (Adaptable to horizontal on mobile) */}
        {activeCategoryDishes.length > 0 ? (
          <DishCarousel
            dishes={activeCategoryDishes}
            activeDishId={activeDishId}
            onSelectDish={setActiveDishId}
          />
        ) : (
          <div className="text-stone-400 text-sm italic py-4">No dishes available.</div>
        )}

        {/* Step 3: Main Dish Detail Card Panel (Glass Card) */}
        <div className="flex-1 max-w-xl w-full">
          <AnimatePresence mode="wait">
            {activeDish ? (
              <motion.div
                key={activeDish.id}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full"
              >
                <DishDetailCard
                  dish={activeDish}
                  isFavorite={favorites.has(activeDish.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center p-12 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 text-stone-500 italic"
              >
                Select a dish to view details.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
