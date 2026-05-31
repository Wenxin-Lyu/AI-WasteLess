import { foodCategories } from "./foodCategories";

type Ingredient = {
  name: string;
  category: string;
  originalText: string;
  quantity: number | null;
  unit: string | null;
};

function normalizeText(text: string) {
  return text.toUpperCase();
}

function findFoodMatch(line: string) {
  for (const categoryItem of foodCategories) {
    const matchedKeyword = categoryItem.keywords.find((keyword) =>
      line.includes(keyword)
    );

    if (matchedKeyword) {
      return {
        category: categoryItem.category,
        name: categoryItem.displayName,
      };
    }
  }

  return null;
}

function extractQuantityNearLine(lines: string[], index: number) {
  const nearbyLines = [
    lines[index],
    lines[index + 1],
    lines[index - 1],
  ]
    .filter(Boolean)
    .join(" ");

  const cleanedNearbyLines = nearbyLines.replace(/\bO(?=\s*[,.]\s*\d+)/gi, "0");

  const kgMatch = cleanedNearbyLines.match(/(\d+[,.]\s*\d+)\s*kg/i);

  if (kgMatch) {
    return {
      quantity: Number(kgMatch[1].replace(",", ".").replace(/\s/g, "")),
      unit: "kg",
    };
  }

  const pieceMatch = nearbyLines.match(/(\d+)\s*stk/i);

  if (pieceMatch) {
    return {
      quantity: Number(pieceMatch[1]),
      unit: "pcs",
    };
  }

  return {
    quantity: null,
    unit: null,
  };
}

export function parseReceiptText(text: string) {
  const dateMatch = text.match(/\b\d{2}\.\d{2}\.\d{4}\b/);

  const timeMatch = text.match(/\b\d{2}:\d{2}\b/);

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const normalizedLines = lines.map(normalizeText);

  const ingredients: Ingredient[] = [];

  normalizedLines.forEach((line, index) => {
    const foodMatch = findFoodMatch(line);

    if (!foodMatch) return;

    const alreadyDetected = ingredients.some(
      (ingredient) => ingredient.originalText === lines[index]
    );

    if (alreadyDetected) return;

    const quantityInfo = extractQuantityNearLine(lines, index);

    ingredients.push({
      name: foodMatch.name,
      category: foodMatch.category,
      originalText: lines[index],
      quantity: quantityInfo.quantity,
      unit: quantityInfo.unit,
    });
  });

  return {
    purchaseDate: dateMatch ? dateMatch[0] : null,
    purchaseTime: timeMatch ? timeMatch[0] : null,
    ingredients,
  };
}