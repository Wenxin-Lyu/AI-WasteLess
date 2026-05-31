type ExpirationItem = {
  name: string;
  category: string;
  originalText: string;
  quantity: number | null;
  unit: string | null;
  shelfLifeDays: number;
  wasteRisk: "Low" | "Medium" | "High";
  bestBeforeDate: string | null;
  daysRemaining: number | null;
  freshnessStatus: string;
};

function getTodayPriority(items: ExpirationItem[]) {
  return [...items].sort((a, b) => {
    const aDays = a.daysRemaining ?? 999;
    const bDays = b.daysRemaining ?? 999;

    if (aDays !== bDays) return aDays - bDays;

    const riskOrder = { High: 0, Medium: 1, Low: 2 };

    return riskOrder[a.wasteRisk] - riskOrder[b.wasteRisk];
  })[0];
}

function getMealRecommendation(priorityItem: ExpirationItem | undefined) {
  if (!priorityItem) {
    return {
      title: "Simple Zero-Waste Bowl",
      reason: "Use available ingredients before buying more groceries.",
    };
  }

  const categoryMealPattern: Record<string, (name: string) => string> = {
    fresh_fish: (name) => `${name} Rice Bowl`,
    fresh_meat: (name) => `${name} Meal Prep Bowl`,
    leafy_greens: (name) => `${name} Stir Fry`,
    berries: (name) => `${name} Yogurt Bowl`,
    dairy: (name) => `${name} Breakfast Bowl`,
    eggs: (name) => `${name} Breakfast Plate`,
    tomatoes: (name) => `${name} Rice Bowl`,
    root_vegetables: (name) => `Roasted ${name} Bowl`,
    spring_onion: (name) => `${name} Stir Fry`,
    fruit: (name) => `${name} Yogurt Bowl`,
    vegetables: (name) => `${name} Stir Fry`,
    bread_bakery: (name) => `${name} Toast Plate`,
    rice_grains: (name) => `${name} Grain Bowl`,
    frozen_food: (name) => `${name} Quick Meal`,
    canned_food: (name) => `${name} Pantry Bowl`,
    snacks: (name) => `${name} Snack Box`,
    beverages: (name) => `${name} Refill Reminder`,
    sauces_condiments: (name) => `${name} Meal Booster`,
    spices: (name) => `${name} Flavor Upgrade`,
  };

  const title =
    categoryMealPattern[priorityItem.category]?.(priorityItem.name) ||
    `${priorityItem.name} Zero-Waste Bowl`;

  return {
    title,
    reason: `${priorityItem.name} should be used first because it has ${priorityItem.wasteRisk.toLowerCase()} waste risk.`,
  };
}

function findByCategory(items: ExpirationItem[], category: string) {
  return items.find((item) => item.category === category);
}

function getWeeklyMealPlan(items: ExpirationItem[]) {
  const fish = findByCategory(items, "fresh_fish");
  const meat = findByCategory(items, "fresh_meat");
  const leafyGreens = findByCategory(items, "leafy_greens");
  const vegetables = findByCategory(items, "vegetables");
  const tomato = findByCategory(items, "tomatoes");
  const springOnion = findByCategory(items, "spring_onion");
  const berries = findByCategory(items, "berries");
  const fruit = findByCategory(items, "fruit");
  const dairy = findByCategory(items, "dairy");
  const eggs = findByCategory(items, "eggs");
  const grains = findByCategory(items, "rice_grains");
  const bread = findByCategory(items, "bread_bakery");
  const canned = findByCategory(items, "canned_food");
  const frozen = findByCategory(items, "frozen_food");

  return [
    {
      day: "Monday",
      meal: fish
        ? `${fish.name} Rice Bowl`
        : meat
        ? `${meat.name} Meal Prep Bowl`
        : leafyGreens
        ? `${leafyGreens.name} Stir Fry`
        : vegetables
        ? `${vegetables.name} Stir Fry`
        : "Fresh Ingredient Bowl",
    },
    {
      day: "Tuesday",
      meal:
        tomato && springOnion
          ? `${tomato.name} ${springOnion.name} Rice`
          : tomato
          ? `${tomato.name} Rice Bowl`
          : grains && vegetables
          ? `${grains.name} ${vegetables.name} Bowl`
          : canned
          ? `${canned.name} Pantry Bowl`
          : "Simple Leftover Stir Fry",
    },
    {
      day: "Wednesday",
      meal:
        berries && dairy
          ? `${berries.name} ${dairy.name} Bowl`
          : fruit && dairy
          ? `${fruit.name} ${dairy.name} Bowl`
          : eggs && bread
          ? `${eggs.name} ${bread.name} Breakfast`
          : frozen
          ? `${frozen.name} Quick Meal`
          : "Low-Waste Meal Prep Bowl",
    },
  ];
}

function getSmartShoppingSuggestion(items: ExpirationItem[]) {
  const highRiskItems = items.filter((item) => item.wasteRisk === "High");

  if (highRiskItems.length > 0) {
    return {
      type: "Buy Smaller Portions",
      suggestion: `Next time, consider buying smaller portions of ${highRiskItems
        .map((item) => item.name)
        .join(", ")}.`,
    };
  }

  return {
    type: "Smart Refill",
    suggestion:
      "Your current groceries look balanced. Refill only essential items.",
  };
}

export function generateMealPlan(expirationAnalysis: ExpirationItem[]) {
  const todayPriority = getTodayPriority(expirationAnalysis);
  const mealRecommendation = getMealRecommendation(todayPriority);
  const weeklyMealPlan = getWeeklyMealPlan(expirationAnalysis);
  const smartShoppingSuggestion =
    getSmartShoppingSuggestion(expirationAnalysis);

  return {
    todayPriority,
    mealRecommendation,
    weeklyMealPlan,
    smartShoppingSuggestion,
  };
}