"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, MoreVertical, Clock, Heart, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { formatPrice } from "@/lib/data";
import type { MenuItem } from "@/lib/types";

interface DishDetailCardProps {
  dish: MenuItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (dish: MenuItem) => void;
}

export function DishDetailCard({
  dish,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: DishDetailCardProps) {
  const imagePath = dish.image || "/images/dishes/shakshuka.png";

  return (
    <GlassCard className="flex flex-col overflow-hidden max-w-md w-full mx-auto md:max-w-lg lg:max-w-xl">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link
          href="/"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-stone-700 hover:bg-brand/10 hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:ring-offset-cream"
          aria-label="Back to menu listing"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        
        <span className="font-serif text-sm font-semibold tracking-wide text-espresso">
          Detail Card
        </span>
        
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 text-stone-700 hover:bg-brand/10 hover:text-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:ring-offset-cream"
          aria-label="More options"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-6 flex flex-col gap-6 items-center flex-1">
        {/* Large Rounded Dish Photo */}
        <div className="relative h-52 w-52 sm:h-60 sm:w-60 overflow-hidden rounded-full border-4 border-white/50 shadow-lg shadow-amber-950/10">
          <Image
            src={imagePath}
            alt={dish.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info Block */}
        <div className="w-full text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-espresso tracking-tight">
              {dish.name}
            </h2>
            
            {/* Prep Time Badge */}
            {dish.prepTime && (
              <div className="flex items-center gap-1 self-center sm:self-start bg-brand/10 border border-brand/20 text-brand-dark px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0">
                <Clock className="h-3.5 w-3.5" />
                <span>{dish.prepTime}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {dish.description ? (
            <p className="mt-4 text-stone-600 text-sm leading-relaxed line-clamp-3">
              {dish.description}
            </p>
          ) : (
            <p className="mt-4 text-stone-400 text-sm italic leading-relaxed">
              No description available. A fresh and tasty selection prepared with passion.
            </p>
          )}

          {/* Tags */}
          {dish.tags && dish.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-1.5">
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-stone-100 text-stone-600 border border-stone-200/50 text-[10px] uppercase font-bold tracking-wide px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Checkout Bottom Panel */}
      <div className="px-6 py-5 bg-white/30 border-t border-white/10 flex items-center justify-between gap-4 mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
            Total Price
          </span>
          <span className="font-serif text-3xl font-bold text-espresso mt-0.5">
            {formatPrice(dish.price)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Favorite heart button */}
          <motion.button
            onClick={() => onToggleFavorite(dish.id)}
            whileTap={{ scale: 0.85 }}
            animate={{ scale: isFavorite ? [1, 1.25, 1] : 1 }}
            transition={{ duration: 0.3 }}
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-stone-200/40 bg-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:ring-offset-cream ${
              isFavorite ? "text-rose-500" : "text-stone-500 hover:text-rose-500"
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFavorite}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-rose-500" : ""}`} />
          </motion.button>

          {/* Add to Cart button */}
          <motion.button
            onClick={() => onAddToCart(dish)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-espresso text-cream hover:bg-espresso/90 px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors shadow-md shadow-espresso/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:ring-offset-cream"
          >
            <Plus className="h-4 w-4" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </GlassCard>
  );
}
