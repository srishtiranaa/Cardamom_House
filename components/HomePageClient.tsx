"use client";

import { useState } from "react";
import { IntroSplash } from "@/components/IntroSplash";
import { Hero } from "@/components/Hero";
import { MenuCarousel } from "@/components/MenuCarousel";
import { HoursTable } from "@/components/HoursTable";
import { Footer } from "@/components/Footer";
import type { Category, MenuItem, RestaurantState, Restaurant } from "@/lib/types";

interface HomePageClientProps {
  categories: Category[];
  restaurantState: RestaurantState;
  specialItem: MenuItem | undefined;
  restaurant: Restaurant;
}

export function HomePageClient({
  categories,
  restaurantState,
  specialItem,
  restaurant,
}: HomePageClientProps) {
  const [introActive, setIntroActive] = useState(true);

  return (
    <>
      {/* Intro Splash Video Screen Overlay */}
      <IntroSplash onDismiss={() => setIntroActive(false)} />

      {/* Main website page flow */}
      <main id="main-content" className="w-full">
        {/* Pass introActive to Hero to sync text fade-in transitions */}
        <Hero
          restaurant={restaurant}
          state={restaurantState}
          introActive={introActive}
        />

        {/* Menu carousel listing */}
        <MenuCarousel
          categories={categories}
          restaurantState={restaurantState}
          specialItem={specialItem}
        />

        {/* Cafe Operating Hours */}
        <div className="mt-12">
          <HoursTable
            hours={restaurant.hours}
            todayDay={restaurantState.simulatedDay}
          />
        </div>
      </main>

      <Footer restaurant={restaurant} />
    </>
  );
}
