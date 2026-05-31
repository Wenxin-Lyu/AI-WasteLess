import { parseReceiptText } from "./receiptAnalysisAgent";
import { analyzeExpiration } from "./expirationAgent";
import { generateMealPlan } from "./mealPlanningAgent";
import { validateReceiptText } from "./receiptValidator";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const image = formData.get("image") as File;

    if (!image) {
      return Response.json(
        { error: "No image uploaded" },
        { status: 400 }
      );
    }

    const ocrFormData = new FormData();

    ocrFormData.append("file", image);

    ocrFormData.append(
      "apikey",
      process.env.OCR_SPACE_API_KEY || ""
    );

    ocrFormData.append("language", "eng");

    const response = await fetch(
      "https://api.ocr.space/parse/image",
      {
        method: "POST",
        body: ocrFormData,
      }
    );

    const data = await response.json();

    const parsedText = data?.ParsedResults?.[0]?.ParsedText || "";

    const receiptValidation = validateReceiptText(parsedText);

    if (!receiptValidation.isLikelyReceipt) {
      console.log("RECEIPT VALIDATION FAILED:", receiptValidation);

      return Response.json(
        {
          success: false,
          error: "This image does not look like a grocery receipt.",
          receiptValidation,
          text: parsedText,
        },
        { status: 400 }
      );
    }

    const parsedReceipt = parseReceiptText(parsedText);

    const expirationAnalysis = analyzeExpiration(
      parsedReceipt.ingredients,
      parsedReceipt.purchaseDate
    );

    const mealPlan = generateMealPlan(expirationAnalysis);

    const analyzedAt = new Date().toISOString();

    console.log("OCR TEXT:", parsedText);
    console.log("RECEIPT VALIDATION:", receiptValidation);
    console.log("PARSED RECEIPT:", parsedReceipt);
    console.log("EXPIRATION ANALYSIS:", expirationAnalysis);
    console.log("MEAL PLAN:", mealPlan);

    return Response.json({
      success: !data?.IsErroredOnProcessing,
      analyzedAt,
      text: parsedText,
      parsedReceipt,
      expirationAnalysis,
      mealPlan,
      receiptValidation,
      raw: data,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "OCR failed" },
      { status: 500 }
    );
  }
}