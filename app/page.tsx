import { Hero } from "@/components/Hero";
import { MenuCarousel } from "@/components/MenuCarousel";
import { HoursTable } from "@/components/HoursTable";
import { Footer } from "@/components/Footer";
import {
  getMenuItemById,
  getRestaurantState,
  menuData,
} from "@/lib/data";

interface HomePageProps {
  searchParams: Promise<{ state?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const restaurantState = getRestaurantState(params.state);
  const specialItem = getMenuItemById(restaurantState.todaySpecial.itemId);

  return (
    <>
      <main id="main-content" className="w-full">
        {/* Revamped attractive landing splash screen */}
        <Hero restaurant={menuData.restaurant} state={restaurantState} />

        {/* Carousel Menu that comes directly after the Hero */}
        <MenuCarousel
          categories={menuData.categories}
          restaurantState={restaurantState}
          specialItem={specialItem}
        />

        {/* Muted Hours Table at the bottom */}
        <div className="mt-12">
          <HoursTable
            hours={menuData.restaurant.hours}
            todayDay={restaurantState.simulatedDay}
          />
        </div>
      </main>

      <Footer restaurant={menuData.restaurant} />
    </>
  );
}
