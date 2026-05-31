type Ingredient = {
  name: string;
  category: string;
  originalText: string;
  quantity: number | null;
  unit: string | null;
};

type ExpirationInfo = {
  shelfLifeDays: number;
  wasteRisk: "Low" | "Medium" | "High";
};

const expirationDatabase: Record<string, ExpirationInfo> = {
  leafy_greens: {
    shelfLifeDays: 4,
    wasteRisk: "High",
  },

  berries: {
    shelfLifeDays: 3,
    wasteRisk: "High",
  },

  fresh_fish: {
    shelfLifeDays: 2,
    wasteRisk: "High",
  },

  fresh_meat: {
    shelfLifeDays: 3,
    wasteRisk: "High",
  },

  dairy: {
    shelfLifeDays: 10,
    wasteRisk: "Medium",
  },

  eggs: {
    shelfLifeDays: 21,
    wasteRisk: "Low",
  },

  tomatoes: {
    shelfLifeDays: 5,
    wasteRisk: "Medium",
  },

  root_vegetables: {
    shelfLifeDays: 14,
    wasteRisk: "Low",
  },

  spring_onion: {
    shelfLifeDays: 4,
    wasteRisk: "High",
  },

  fruit: {
    shelfLifeDays: 7,
    wasteRisk: "Medium",
  },

  vegetables: {
    shelfLifeDays: 6,
    wasteRisk: "Medium",
  },

  bread_bakery: {
    shelfLifeDays: 4,
    wasteRisk: "Medium",
  },

  rice_grains: {
    shelfLifeDays: 90,
    wasteRisk: "Low",
  },

  frozen_food: {
    shelfLifeDays: 90,
    wasteRisk: "Low",
  },

  canned_food: {
    shelfLifeDays: 365,
    wasteRisk: "Low",
  },

  snacks: {
    shelfLifeDays: 60,
    wasteRisk: "Low",
  },

  beverages: {
    shelfLifeDays: 30,
    wasteRisk: "Low",
  },

  sauces_condiments: {
    shelfLifeDays: 60,
    wasteRisk: "Low",
  },

  spices: {
    shelfLifeDays: 365,
    wasteRisk: "Low",
  },

  unknown: {
    shelfLifeDays: 5,
    wasteRisk: "Medium",
  },
};

function parseGermanDate(dateText: string | null) {
  if (!dateText) return null;

  const [day, month, year] = dateText.split(".").map(Number);

  if (!day || !month || !year) return null;

  return new Date(year, month - 1, day);
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-GB");
}

function addDays(date: Date, days: number) {
  const result = new Date(date);

  result.setDate(result.getDate() + days);

  return result;
}

function getFreshnessStatus(daysRemaining: number) {
  if (daysRemaining <= 1) return "Use immediately";
  if (daysRemaining <= 3) return "Use soon";
  return "Fresh";
}

export function analyzeExpiration(
  ingredients: Ingredient[],
  purchaseDate: string | null
) {
  const purchaseDateObject = parseGermanDate(purchaseDate);
  const today = new Date();

  return ingredients.map((ingredient) => {
    const expirationInfo =
      expirationDatabase[ingredient.category] || expirationDatabase.unknown;

    const bestBeforeDate = purchaseDateObject
      ? addDays(purchaseDateObject, expirationInfo.shelfLifeDays)
      : null;

    const calculatedDaysRemaining = bestBeforeDate
      ? Math.ceil(
          (bestBeforeDate.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : null;

    const daysRemaining =
      calculatedDaysRemaining !== null && Object.is(calculatedDaysRemaining, -0)
        ? 0
        : calculatedDaysRemaining;

    return {
      ...ingredient,
      shelfLifeDays: expirationInfo.shelfLifeDays,
      wasteRisk: expirationInfo.wasteRisk,
      bestBeforeDate: bestBeforeDate ? formatDate(bestBeforeDate) : null,
      daysRemaining,
      freshnessStatus:
        daysRemaining !== null ? getFreshnessStatus(daysRemaining) : "Unknown",
    };
  });
}