import { MenuCarousel } from "@/components/MenuCarousel";
import { menuData } from "@/lib/data";

export const metadata = {
  title: "Cardamom House · Interactive Carousel Menu",
  description: "Explore our slow brunch, sandwiches, and drinks with our interactive carousel menu.",
};

export default function CarouselPage() {
  return <MenuCarousel categories={menuData.categories} />;
}
