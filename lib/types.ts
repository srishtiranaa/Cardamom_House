export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type StateParam = "open" | "closed" | "special-sold-out";

export interface Hours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Restaurant {
  name: string;
  tagline: string;
  address: string;
  hours: Hours;
  brand_color: string;
  phone: string;
  instagram: string;
}

export interface TodaySpecial {
  item_id: string;
  blurb: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags: string[];
  prepTime?: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  items: MenuItem[];
}

export interface MenuData {
  restaurant: Restaurant;
  today_special: TodaySpecial;
  categories: Category[];
}

export interface ClosedBanner {
  message: string;
  nextOpening: string;
}

export interface TodaySpecialState {
  itemId: string;
  blurb: string;
  soldOut: boolean;
  calloutMessage: string;
}

export interface RestaurantState {
  param: StateParam;
  simulatedDay: DayOfWeek;
  simulatedTime: string;
  isOpen: boolean;
  statusLabel: "open now" | "closed now";
  closedBanner: ClosedBanner | null;
  todaySpecial: TodaySpecialState;
  soldOutItemIds: readonly string[];
}

export interface HeroProps {
  restaurant: Restaurant;
  state: RestaurantState;
}

export interface TodaySpecialProps {
  state: RestaurantState;
  specialItem: MenuItem | undefined;
}

export interface CategoryNavProps {
  categories: Category[];
}

export interface MenuSectionProps {
  category: Category;
  soldOutItemIds: readonly string[];
  todaySpecialItemId: string;
}

export interface MenuItemProps {
  item: MenuItem;
  isSoldOut?: boolean;
  isTodaySpecial?: boolean;
  index?: number;
}

export interface HoursTableProps {
  hours: Hours;
  todayDay: DayOfWeek;
}

export interface FooterProps {
  restaurant: Restaurant;
}
