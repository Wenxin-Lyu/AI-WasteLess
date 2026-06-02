export function validateReceiptText(text: string) {
  const normalizedText = text.toUpperCase();

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const hasEnoughLines = lines.length >= 8;

  const hasDate =
    /\b\d{2}\.\d{2}\.\d{4}\b/.test(text) ||
    /\b\d{2}\.\d{2}\.\d{2}\b/.test(text) ||
    /\b\d{2}\s*\.\s*\d{2}\s*\.\s*\d{2,4}\b/.test(text) ||
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
    normalizedText.includes("BON") ||
    normalizedText.includes("GIROCARD") ||
    normalizedText.includes("MASTERCARD") ||
    normalizedText.includes("VISA") ||
    normalizedText.includes("MWST") ||
    normalizedText.includes("NETTO");

  const receiptConfidenceScore = [
    hasEnoughLines,
    hasDate,
    hasPrice,
    hasReceiptKeyword,
  ].filter(Boolean).length;

  const isLikelyReceipt =
    hasEnoughLines &&
    hasPrice &&
    hasReceiptKeyword &&
    receiptConfidenceScore >= 3;

  return {
    isLikelyReceipt,
    confidenceScore: receiptConfidenceScore,
    checks: {
      hasEnoughLines,
      hasDate,
      hasPrice,
      hasReceiptKeyword,
    },
  };
}