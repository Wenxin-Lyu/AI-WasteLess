export function validateReceiptText(text: string) {
  const normalizedText = text.toUpperCase();

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const hasEnoughLines = lines.length >= 8;

  const hasDate =
    /\b\d{2}\.\d{2}\.\d{4}\b/.test(text) ||
    /\b\d{2}\/\d{2}\/\d{4}\b/.test(text) ||
    /\b\d{4}-\d{2}-\d{2}\b/.test(text);

  const hasPrice =
    /\b\d+[,.]\d{2}\b/.test(text) ||
    normalizedText.includes("EUR") ||
    normalizedText.includes("USD") ||
    normalizedText.includes("GBP");

  const hasReceiptKeyword =
    normalizedText.includes("SUMME") ||
    normalizedText.includes("TOTAL") ||
    normalizedText.includes("SUBTOTAL") ||
    normalizedText.includes("AMOUNT") ||
    normalizedText.includes("BETRAG") ||
    normalizedText.includes("CASH") ||
    normalizedText.includes("CARD") ||
    normalizedText.includes("EC-CASH") ||
    normalizedText.includes("RECEIPT") ||
    normalizedText.includes("BON");

  const isLikelyReceipt =
    hasEnoughLines && hasDate && hasPrice && hasReceiptKeyword;

  return {
    isLikelyReceipt,
    checks: {
      hasEnoughLines,
      hasDate,
      hasPrice,
      hasReceiptKeyword,
    },
  };
}