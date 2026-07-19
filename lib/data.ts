import type {
  DayOfWeek,
  MenuData,
  RestaurantState,
  StateParam,
} from "./types";

export const menuData: MenuData = {
  restaurant: {
    name: "Cardamom House",
    tagline: "Slow brunch. Strong coffee. Lisbon, since 2021.",
    address: "Rua da Boavista 84, 1200-066 Lisboa, Portugal",
    hours: {
      monday: "Closed",
      tuesday: "08:00 – 15:00",
      wednesday: "08:00 – 15:00",
      thursday: "08:00 – 15:00",
      friday: "08:00 – 16:00",
      saturday: "09:00 – 17:00",
      sunday: "09:00 – 17:00",
    },
    brand_color: "#B45309",
    phone: "+351 21 123 4567",
    instagram: "@cardamomhouse",
  },
  today_special: {
    item_id: "brunch_07",
    blurb: "Chef's pick today: our Saffron French Toast with cardamom syrup.",
  },
  categories: [
    {
      id: "brunch",
      name: "Brunch",
      description: "Served all day. Local eggs, slow-cooked everything.",
      items: [
        {
          id: "brunch_01",
          name: "Shakshuka",
          description:
            "Two eggs poached in spiced tomato and pepper sauce, served with sourdough.",
          price: 11.5,
          tags: ["V"],
        },
        {
          id: "brunch_02",
          name: "Avocado Toast",
          description:
            "Smashed avocado, lemon, chili flakes, hemp seeds, soft poached egg.",
          price: 9.8,
          tags: ["V"],
        },
        {
          id: "brunch_03",
          name: "Full Lisbon Breakfast",
          description:
            "Eggs your way, chorizo, grilled tomato, beans, sourdough, salted butter.",
          price: 14.2,
          tags: [],
        },
        {
          id: "brunch_04",
          name: "Acai Bowl",
          description: "Acai, banana, granola, blueberries, honey, coconut.",
          price: 10.4,
          tags: ["V", "GF"],
        },
        {
          id: "brunch_05",
          name: "Bircher Muesli",
          description:
            "Oats soaked overnight in apple juice with cinnamon, apple, almonds, yogurt.",
          price: 8.2,
          tags: ["V"],
        },
        {
          id: "brunch_06",
          name: "Eggs Benedict",
          description:
            "Two poached eggs, smoked salmon or ham, hollandaise, on toasted muffins.",
          price: 13.6,
          tags: [],
        },
        {
          id: "brunch_07",
          name: "Saffron French Toast",
          description:
            "Brioche soaked in saffron-cardamom custard, pistachios, mascarpone, honey.",
          price: 12.8,
          tags: ["V"],
        },
        {
          id: "brunch_08",
          name: "Veggie Hash",
          description:
            "Sweet potato, kale, peppers, two eggs, smoked paprika, avocado.",
          price: 12.2,
          tags: ["V", "GF"],
        },
      ],
    },
    {
      id: "sandwiches",
      name: "Sandwiches & Toasties",
      description: "Served on house sourdough or rye.",
      items: [
        {
          id: "sand_01",
          name: "Croque Monsieur",
          description: "Ham, gruyere, béchamel, mustard, on grilled sourdough.",
          price: 10.2,
          tags: [],
        },
        {
          id: "sand_02",
          name: "Mushroom Melt",
          description: "Garlic mushrooms, taleggio, truffle oil, rocket, on rye.",
          price: 11.4,
          tags: ["V"],
        },
        {
          id: "sand_03",
          name: "Smoked Salmon Bagel",
          description: "Cream cheese, dill, capers, red onion, smoked salmon.",
          price: 11.8,
          tags: [],
        },
        {
          id: "sand_04",
          name: "Tuna Crunch",
          description: "Tuna, celery, cornichons, mayo, lettuce, on sourdough.",
          price: 9.6,
          tags: [],
        },
        {
          id: "sand_05",
          name: "Halloumi & Harissa",
          description:
            "Grilled halloumi, harissa mayo, slaw, rocket, on sourdough.",
          price: 10.8,
          tags: ["V", "spicy"],
        },
      ],
    },
    {
      id: "drinks",
      name: "Drinks",
      description: "All coffee is single-origin from Reverb Roasters, Porto.",
      items: [
        {
          id: "drink_01",
          name: "Espresso",
          description: "Double shot.",
          price: 1.8,
          tags: [],
        },
        {
          id: "drink_02",
          name: "Flat White",
          description: "Double shot, silky milk.",
          price: 3.2,
          tags: [],
        },
        {
          id: "drink_03",
          name: "Cardamom Latte",
          description: "House blend, cardamom syrup, milk of your choice.",
          price: 3.8,
          tags: [],
        },
        {
          id: "drink_04",
          name: "Matcha",
          description: "Stone-ground Uji matcha, milk of your choice.",
          price: 4.2,
          tags: ["V"],
        },
        {
          id: "drink_05",
          name: "Fresh OJ",
          description: "Pressed to order.",
          price: 4.4,
          tags: ["V", "GF"],
        },
        {
          id: "drink_06",
          name: "Mint Lemonade",
          description: "House-made, lightly sparkling.",
          price: 3.8,
          tags: ["V", "GF"],
        },
      ],
    },
    {
      id: "sides",
      name: "Sides & Extras",
      description: "",
      items: [
        { id: "side_01", name: "Side of Bacon", price: 3.2, tags: [] },
        { id: "side_02", name: "Side of Sourdough", price: 2.4, tags: ["V"] },
        { id: "side_03", name: "Extra Egg", price: 1.6, tags: ["V"] },
        {
          id: "side_04",
          name: "Side of Avocado",
          price: 2.8,
          tags: ["V", "GF"],
        },
      ],
    },
  ],
};

const DAYS: readonly DayOfWeek[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

function parseStateParam(raw: string | undefined): StateParam {
  if (raw === "closed" || raw === "special-sold-out") {
    return raw;
  }
  return "open";
}

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function parseHoursRange(hoursString: string): { open: number; close: number } | null {
  if (hoursString.toLowerCase() === "closed") {
    return null;
  }

  const [openPart, closePart] = hoursString.split("–").map((part) => part.trim());
  if (!openPart || !closePart) {
    return null;
  }

  return {
    open: parseTimeToMinutes(openPart),
    close: parseTimeToMinutes(closePart),
  };
}

function isOpenAt(hoursString: string, time: string): boolean {
  const range = parseHoursRange(hoursString);
  if (!range) {
    return false;
  }

  const current = parseTimeToMinutes(time);
  return current >= range.open && current < range.close;
}

function getOpeningTime(hoursString: string): string | null {
  const range = parseHoursRange(hoursString);
  if (!range) {
    return null;
  }

  const hours = Math.floor(range.open / 60);
  const minutes = range.open % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function getNextOpening(fromDay: DayOfWeek): string {
  const startIndex = DAYS.indexOf(fromDay);

  for (let offset = 1; offset <= 7; offset += 1) {
    const day = DAYS[(startIndex + offset) % 7];
    const hoursString = menuData.restaurant.hours[day];
    const openingTime = getOpeningTime(hoursString);

    if (openingTime) {
      return `We open again ${DAY_LABELS[day]} at ${openingTime}`;
    }
  }

  return "Please check our hours below.";
}

export function formatPrice(price: number): string {
  return `€${price.toFixed(2)}`;
}

export function getMenuItemById(itemId: string) {
  for (const category of menuData.categories) {
    const item = category.items.find((entry) => entry.id === itemId);
    if (item) {
      return item;
    }
  }
  return undefined;
}

export function getRestaurantState(rawState?: string): RestaurantState {
  const param = parseStateParam(rawState);
  const simulatedDay: DayOfWeek = param === "closed" ? "monday" : "tuesday";
  const simulatedTime = "11:30";
  const hoursToday = menuData.restaurant.hours[simulatedDay];
  const isOpen = param !== "closed" && isOpenAt(hoursToday, simulatedTime);
  const specialSoldOut = param === "special-sold-out";
  const specialItemId = menuData.today_special.item_id;

  const todaySpecialCallout = specialSoldOut
    ? "Today's special has sold out — ask our team about tomorrow's pick."
    : menuData.today_special.blurb;

  return {
    param,
    simulatedDay,
    simulatedTime,
    isOpen,
    statusLabel: isOpen ? "open now" : "closed now",
    closedBanner: param === "closed"
      ? {
          message: "We're closed today",
          nextOpening: getNextOpening(simulatedDay),
        }
      : null,
    todaySpecial: {
      itemId: specialItemId,
      blurb: menuData.today_special.blurb,
      soldOut: specialSoldOut,
      calloutMessage: todaySpecialCallout,
    },
    soldOutItemIds: specialSoldOut ? [specialItemId] : [],
  };
}

export { DAY_LABELS, DAYS };
