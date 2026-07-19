"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { TagPill, focusRing } from "@/components/ui";
import { formatPrice } from "@/lib/data";
import type { MenuItemProps } from "@/lib/types";

const IMAGE_MAPPING: Record<string, string> = {
  brunch_01: "/images/dishes/shakshuka.png",
  brunch_02: "/images/dishes/avacado-toast.jpg",
  brunch_03: "/images/dishes/full-lisbon-breakfast.jpg",
  brunch_04: "/images/dishes/acai-bowl.jpg",
  brunch_05: "/images/dishes/bircher-muesli.jpg",
  brunch_06: "/images/dishes/egg-benedict.jpg",
  brunch_07: "/images/dishes/saffron-french-toast.jpg",
  brunch_08: "/images/dishes/veggie-hash.jpg",
  sand_01: "/images/dishes/croque-monsieur.jpg",
  sand_02: "/images/dishes/mushroom-melt.jpg",
  sand_03: "/images/dishes/smoked-salmon-bagel.jpg",
  sand_04: "/images/dishes/tuna-crunch.jpg",
  sand_05: "/images/dishes/halloumi-and-harissa.jpg",
  drink_01: "/images/dishes/espresso.jpg",
  drink_02: "/images/dishes/flat-white.jpg",
  drink_03: "/images/dishes/cardamom-latte.jpg",
  drink_04: "/images/dishes/matcha.jpg",
  drink_05: "/images/dishes/Fresh-OJ.jpg",
  drink_06: "/images/dishes/mint-lemonade.jpg",
};

export function MenuItem({
  item,
  isSoldOut = false,
  isTodaySpecial = false,
  index = 0,
}: MenuItemProps) {
  const cardRef = useRef<HTMLLIElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 150 });
  const scale = useSpring(1, { damping: 25, stiffness: 150 });

  const imagePath = IMAGE_MAPPING[item.id];
  const hasImage = !!imagePath;
  const isPriority = item.id.startsWith("brunch_") && index < 4;

  const handleMouseMove = (event: React.MouseEvent<HTMLLIElement>) => {
    if (!hasImage || shouldReduceMotion || isSoldOut) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    x.set(mouseX / width);
    y.set(mouseY / height);
    scale.set(1.02);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  const initial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 };
  const whileInView = { opacity: 1, y: 0 };
  const transition = {
    duration: 0.4,
    ease: "easeOut" as const,
    delay: shouldReduceMotion ? 0 : index * 0.07,
  };

  return (
    <motion.li
      ref={cardRef}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        hasImage && !shouldReduceMotion && !isSoldOut
          ? { perspective: 1000, rotateX, rotateY, scale }
          : undefined
      }
      className={`group relative rounded-2xl p-4 transition-all duration-300 ${focusRing()} ${
        isSoldOut
          ? "bg-stone-100/40 opacity-70"
          : "bg-white/10 border border-white/10 hover:bg-white/40 hover:border-white/20"
      } ${isTodaySpecial && !isSoldOut ? "ring-2 ring-brand/35 bg-amber-50/10" : ""} ${
        hasImage && !isSoldOut
          ? "hover:shadow-xl focus-visible:shadow-md focus-visible:-translate-y-1"
          : ""
      }`}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-100px" }}
      transition={transition}
    >
      <div className="flex gap-4 items-start w-full">
        {hasImage && (
          <div className={`relative aspect-[4/3] w-20 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-stone-200/50 bg-stone-100 ${isSoldOut ? "grayscale opacity-50 contrast-75" : ""}`}>
            <Image
              src={imagePath}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 80px, 112px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={isPriority}
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className={`font-serif text-lg font-medium leading-snug ${isSoldOut ? "text-stone-500" : "text-espresso"}`}>
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
              className={`shrink-0 font-serif text-lg tabular-nums mt-1 sm:mt-0 ${
                isSoldOut ? "text-stone-400" : "text-brand-dark"
              }`}
              aria-label={`Price ${formatPrice(item.price)}`}
            >
              {formatPrice(item.price)}
            </p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
