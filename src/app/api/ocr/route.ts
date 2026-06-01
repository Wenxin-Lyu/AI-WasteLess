import { parseReceiptText } from "./receiptAnalysisAgent";
import { analyzeExpiration } from "./expirationAgent";
import { generateMealPlan } from "./mealPlanningAgent";
import { validateReceiptText } from "./receiptValidator";

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

    const receiptResults = [];

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
        console.log("RECEIPT VALIDATION FAILED:", {
          fileName: image.name,
          receiptValidation,
        });

        return Response.json(
          {
            success: false,
            error:
              "One or more uploaded images do not look like readable grocery receipts.",
            failedFileName: image.name,
            receiptValidation,
            text: ocrResult.parsedText,
            raw: ocrResult.data,
          },
          { status: 400 }
        );
      }

      const parsedReceipt = parseReceiptText(ocrResult.parsedText);

      if (parsedReceipt.ingredients.length === 0) {
        console.log("NO INGREDIENTS DETECTED:", image.name);

        return Response.json(
          {
            success: false,
            error:
              "One or more uploaded receipts did not contain recognizable grocery ingredients.",
            failedFileName: image.name,
            receiptValidation,
            text: ocrResult.parsedText,
            parsedReceipt,
            raw: ocrResult.data,
          },
          { status: 400 }
        );
      }

      receiptResults.push({
        fileName: image.name,
        text: ocrResult.parsedText,
        parsedReceipt,
        receiptValidation,
        raw: ocrResult.data,
      });
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
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, error: "OCR failed" },
      { status: 500 }
    );
  }
}