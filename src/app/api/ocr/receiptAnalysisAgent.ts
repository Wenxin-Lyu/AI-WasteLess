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

function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isValidFoodLine(line: string) {
  const ignoredKeywords = [
    "BETRAG",
    "MWST",
    "NETTO",
    "KARTENZAHLUNG",
    "GIROCARD",
    "KONTAKTLOS",
    "AUTORISIERUNG",
    "ÖFFNUNGSZEITEN",
    "VIELEN DANK",
    "EINKAUF",
    "PREIS",
    "KASSE",
    "TSE",
    "UST",
    "EUR",
  ];

  return !ignoredKeywords.some((keyword) => line.includes(keyword));
}

function keywordMatchesLine(line: string, keyword: string) {
  const normalizedKeyword = normalizeText(keyword).trim();

  const wordRegex = new RegExp(
    `(^|[^A-ZÄÖÜẞ])${escapeRegExp(normalizedKeyword)}([^A-ZÄÖÜẞ]|$)`,
    "i"
  );

  return wordRegex.test(line);
}

function findFoodMatch(line: string) {
  if (!isValidFoodLine(line)) return null;

  for (const categoryItem of foodCategories) {
    const matchedKeyword = categoryItem.keywords.find((keyword) =>
      keywordMatchesLine(line, keyword)
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

function extractQuantityFromText(text: string) {
  const cleanedText = text.replace(/\bO(?=\s*[,.]\s*\d+)/gi, "0");

  const kgMatch = cleanedText.match(/(\d+[,.]?\s*\d*)\s*kg\b/i);

  if (kgMatch) {
    return {
      quantity: Number(kgMatch[1].replace(",", ".").replace(/\s/g, "")),
      unit: "kg",
    };
  }

  const gramMatch = cleanedText.match(/(\d+)\s*g\b/i);

  if (gramMatch) {
    return {
      quantity: Number(gramMatch[1]),
      unit: "g",
    };
  }

  const pieceMatch = cleanedText.match(/(\d+)\s*stk\b/i);

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

function looksLikeQuantityOnlyLine(line: string) {
  const cleanedLine = line.trim();

  return /^(\d+\s*[,.]?\s*\d*)\s*(kg|g|stk|x)?$/i.test(cleanedLine);
}

function extractQuantityNearLine(lines: string[], index: number) {
  const currentLine = lines[index];
  const nextLine = lines[index + 1];

  const currentLineQuantity = extractQuantityFromText(currentLine);

  if (currentLineQuantity.quantity !== null) {
    return currentLineQuantity;
  }

  if (nextLine && looksLikeQuantityOnlyLine(nextLine)) {
    return extractQuantityFromText(nextLine);
  }

  return {
    quantity: null,
    unit: null,
  };
}

export function parseReceiptText(text: string) {
  const normalizedDateText = text.replace(
    /(\d{2})\s*\.\s*(\d{2})\s*\.\s*(\d{2,4})/g,
    "$1.$2.$3"
  );

  const dateMatch = normalizedDateText.match(/\b\d{2}\.\d{2}\.\d{2,4}\b/);

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

    const duplicateIngredient = ingredients.some(
      (ingredient) => ingredient.name === foodMatch.name
    );

    if (duplicateIngredient) return;

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