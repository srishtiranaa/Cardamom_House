import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HoursTable } from "@/components/HoursTable";
import { MenuSection } from "@/components/MenuSection";
import { TodaySpecial } from "@/components/TodaySpecial";
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
      <main id="main-content">
        <Hero restaurant={menuData.restaurant} state={restaurantState} />

        <div className="mt-8 space-y-12">
          <TodaySpecial state={restaurantState} specialItem={specialItem} />

          <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] lg:items-start lg:gap-10 lg:px-8">
            <CategoryNav categories={menuData.categories} />

            <div className="min-w-0 space-y-14">
              {menuData.categories.map((category) => (
                <MenuSection
                  key={category.id}
                  category={category}
                  soldOutItemIds={restaurantState.soldOutItemIds}
                  todaySpecialItemId={restaurantState.todaySpecial.itemId}
                />
              ))}
            </div>
          </div>

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
