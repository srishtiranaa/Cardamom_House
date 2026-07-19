import { HomePageClient } from "@/components/HomePageClient";
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
    <HomePageClient
      categories={menuData.categories}
      restaurantState={restaurantState}
      specialItem={specialItem}
      restaurant={menuData.restaurant}
    />
  );
}
