// Offer Configuration - Manage all discounts here

export const offersConfig = {
  // Different discounts per product
  products: {
    // Androfud Products
    "Androfud $2000": { baseDiscount: 30, label: "30% OFF" },
    "Androfud $1200": { baseDiscount: 35, label: "35% OFF" },
    "Androfud $850": { baseDiscount: 40, label: "40% OFF" },
    "Androfud $350": { baseDiscount: 45, label: "45% OFF" },

    // BT Mob Products
    "BT Mob $199": { baseDiscount: 20, label: "20% OFF" },
    "BT Mob $499": { baseDiscount: 25, label: "25% OFF" },
    "BT Mob $999": { baseDiscount: 30, label: "30% OFF" },

    // Windows Tools
    "S400 Lifetime Only": { baseDiscount: 25, label: "25% OFF" },
    "Venom Rat 6.0.3": { baseDiscount: 28, label: "28% OFF" },
    "Venom Rat 6.0.9 Pro": { baseDiscount: 32, label: "32% OFF" },
  },

  // Time-based boosters (applied ON TOP of base discount)
  timeBoosters: {
    // Day of week boosts
    MONDAY: { boost: 5, label: "Monday Madness" }, // +5% extra
    TUESDAY: { boost: 0, label: "" },
    WEDNESDAY: { boost: 10, label: "Mid-Week Mega" }, // +10% extra
    THURSDAY: { boost: 0, label: "" },
    FRIDAY: { boost: 15, label: "Friday Flash" }, // +15% extra
    SATURDAY: { boost: 20, label: "Weekend Blast" }, // +20% extra
    SUNDAY: { boost: 20, label: "Sunday Special" }, // +20% extra

    // Holiday/Special Events (uncomment to enable)
    // CHRISTMAS: { boost: 50, label: "🎄 Christmas Sale" },
    // NEWYEAR: { boost: 30, label: "🎉 New Year Deal" },
    // BLACKFRIDAY: { boost: 60, label: "🔥 Black Friday" },
  },

  // Special date ranges (format: "MM-DD")
  seasonalOffers: [
    // {
    //   name: "Black Friday",
    //   startDate: "11-24", // November 24
    //   endDate: "11-27",   // November 27
    //   boost: 50,
    //   label: "🔥 Black Friday"
    // },
    // {
    //   name: "Christmas",
    //   startDate: "12-20",
    //   endDate: "12-26",
    //   boost: 40,
    //   label: "🎄 Christmas Special"
    // },
  ],
};

// Helper function to get discount for a product
export function getProductDiscount(productName: string): {
  discount: number;
  label: string;
  timeBoost: string;
} {
  const baseOffer =
    offersConfig.products[productName as keyof typeof offersConfig.products];

  if (!baseOffer) {
    return { discount: 0, label: "", timeBoost: "" };
  }

  // Get current day of week
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const today = new Date();
  const dayOfWeek = days[
    today.getDay()
  ] as keyof typeof offersConfig.timeBoosters;

  const timeBooster = offersConfig.timeBoosters[dayOfWeek] || {
    boost: 0,
    label: "",
  };

  // Check seasonal offers
  let seasonalBoost = 0;
  const monthDay = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  for (const seasonal of offersConfig.seasonalOffers) {
    if (monthDay >= seasonal.startDate && monthDay <= seasonal.endDate) {
      seasonalBoost = seasonal.boost;
      break;
    }
  }

  // Calculate total discount (max 70% to keep prices reasonable)
  const totalDiscount = Math.min(
    baseOffer.baseDiscount + timeBooster.boost + seasonalBoost,
    70,
  );

  return {
    discount: totalDiscount,
    label: baseOffer.label,
    timeBoost: timeBooster.label,
  };
}

// Get all active discounts for display
export function getActiveOffers() {
  const today = new Date();
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const dayOfWeek = days[today.getDay()];
  const timeBooster =
    offersConfig.timeBoosters[
      dayOfWeek as keyof typeof offersConfig.timeBoosters
    ];

  return {
    dayOfWeek,
    timeBooster: timeBooster?.label || "",
    boost: timeBooster?.boost || 0,
  };
}
