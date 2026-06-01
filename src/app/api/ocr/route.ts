import { parseReceiptText } from "./receiptAnalysisAgent";
import { analyzeExpiration } from "./expirationAgent";
import { generateMealPlan } from "./mealPlanningAgent";
import { validateReceiptText } from "./receiptValidator";

type ReceiptResult = {
  fileName: string;
  text: string;
  parsedReceipt: ReturnType<typeof parseReceiptText>;
  receiptValidation: ReturnType<typeof validateReceiptText>;
  raw: unknown;
};

type FailedResult = {
  fileName: string;
  error: string;
  text: string;
  receiptValidation: ReturnType<typeof validateReceiptText>;
  raw: unknown;
};

async function runOCR(image: File) {
  const ocrFormData = new FormData();

  ocrFormData.append("file", image);
  ocrFormData.append("apikey", process.env.OCR_SPACE_API_KEY || "");
  ocrFormData.append("language", "eng");

  const response = await fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    body: ocrFormData,
  });

  const data = await response.json();
  const parsedText = data?.ParsedResults?.[0]?.ParsedText || "";

  return {
    data,
    parsedText,
    isErroredOnProcessing: Boolean(data?.IsErroredOnProcessing),
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const uploadedImages = formData.getAll("images") as File[];
    const fallbackSingleImage = formData.get("image") as File | null;

    const images =
      uploadedImages.length > 0
        ? uploadedImages
        : fallbackSingleImage
        ? [fallbackSingleImage]
        : [];

    if (images.length === 0) {
      return Response.json(
        { success: false, error: "No image uploaded" },
        { status: 400 }
      );
    }

    const receiptResults: ReceiptResult[] = [];
    const failedResults: FailedResult[] = [];

    for (const image of images) {
      const ocrResult = await runOCR(image);
      const receiptValidation = validateReceiptText(ocrResult.parsedText);

      console.log("OCR TEXT:", ocrResult.parsedText);
      console.log("RECEIPT VALIDATION:", receiptValidation);

      if (
        ocrResult.isErroredOnProcessing ||
        !ocrResult.parsedText ||
        !receiptValidation.isLikelyReceipt
      ) {
        failedResults.push({
          fileName: image.name,
          error: "This image does not look like a readable grocery receipt.",
          text: ocrResult.parsedText,
          receiptValidation,
          raw: ocrResult.data,
        });

        continue;
      }

      const parsedReceipt = parseReceiptText(ocrResult.parsedText);

      if (parsedReceipt.ingredients.length === 0) {
        failedResults.push({
          fileName: image.name,
          error: "No recognizable grocery ingredients were detected.",
          text: ocrResult.parsedText,
          receiptValidation,
          raw: ocrResult.data,
        });

        continue;
      }

      receiptResults.push({
        fileName: image.name,
        text: ocrResult.parsedText,
        parsedReceipt,
        receiptValidation,
        raw: ocrResult.data,
      });
    }

    if (failedResults.length > 0) {
      console.log("FAILED RECEIPTS:", failedResults);

      return Response.json(
        {
          success: false,
          error:
            "One or more uploaded images do not look like readable grocery receipts.",
          failedFileName: failedResults[0].fileName,
          failedFileNames: failedResults.map((result) => result.fileName),
          failedResults,
          receiptResults,
        },
        { status: 400 }
      );
    }

    const firstPurchaseDate =
      receiptResults.find((result) => result.parsedReceipt.purchaseDate)
        ?.parsedReceipt.purchaseDate || null;

    const firstPurchaseTime =
      receiptResults.find((result) => result.parsedReceipt.purchaseTime)
        ?.parsedReceipt.purchaseTime || null;

    const mergedIngredients = receiptResults.flatMap(
      (result) => result.parsedReceipt.ingredients
    );

    const parsedReceipt = {
      purchaseDate: firstPurchaseDate,
      purchaseTime: firstPurchaseTime,
      ingredients: mergedIngredients,
    };

    const expirationAnalysis = analyzeExpiration(
      parsedReceipt.ingredients,
      parsedReceipt.purchaseDate
    );

    const mealPlan = generateMealPlan(expirationAnalysis);

    const analyzedAt = new Date().toISOString();

    console.log("PARSED RECEIPT:", parsedReceipt);
    console.log("EXPIRATION ANALYSIS:", expirationAnalysis);
    console.log("MEAL PLAN:", mealPlan);

    return Response.json({
      success: true,
      analyzedAt,
      text: receiptResults.map((result) => result.text).join("\n\n"),
      parsedReceipt,
      expirationAnalysis,
      mealPlan,
      receiptValidation: {
        isLikelyReceipt: true,
        checkedImages: receiptResults.length,
      },
      receiptResults,
      failedResults: [],
      failedFileNames: [],
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, error: "OCR failed" },
      { status: 500 }
    );
  }
}