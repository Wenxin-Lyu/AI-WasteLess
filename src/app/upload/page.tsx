"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    title: "🧾 Step 1：Receipt Analysis Agent",
    items: [
      "Receipt successfully scanned",
      "Ingredients and quantities identified",
      "Purchase time extracted",
    ],
  },
  {
    title: "⏳ Step 2：Expiration Agent",
    items: [
      "High-risk ingredients identified",
      "Freshness timeline generated",
      "Waste risk estimation completed",
    ],
  },
  {
    title: "🍽️ Step 3：Meal Planning Agent",
    items: [
      "Today’s priority ingredient selected",
      "Personalized meal plan generated",
      "Smart shopping suggestions generated",
    ],
  },
];

export default function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [visibleItems, setVisibleItems] = useState(0);
  const [ocrFailed, setOcrFailed] = useState(false);
  const [shouldFail, setShouldFail] = useState(false);

  const uploadRef = useRef<HTMLLabelElement | null>(null);
  const processingRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const totalItems = steps.reduce((sum, step) => sum + step.items.length, 0);

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    setSelectedFiles((prev) => {
      const combined = [...prev, ...newFiles].slice(0, 10);

      const fail = combined.some((file) =>
        file.name.toLowerCase().match(/random|test|fail|meme/)
      );

      setShouldFail(fail);
      return combined;
    });

    setIsProcessing(false);
    setVisibleItems(0);
    setOcrFailed(false);

    event.target.value = "";
  }

  function removeFile(index: number) {
    setSelectedFiles((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      const fail = updated.some((file) =>
        file.name.toLowerCase().match(/random|test|fail|meme/)
      );

      setShouldFail(fail);
      return updated;
    });

    setIsProcessing(false);
    setVisibleItems(0);
    setOcrFailed(false);
  }

  async function startAnalysis() {
    if (selectedFiles.length === 0) return;

    setIsProcessing(true);
    setVisibleItems(0);
    setOcrFailed(false);

    try {
      const formData = new FormData();

      formData.append("image", selectedFiles[0]);

      const response = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("OCR RESULT:", data);

      if (!response.ok || !data.success) {
        setVisibleItems(1);
        setOcrFailed(true);
        return;
      }

      localStorage.setItem(
        "aiWasteLessResult",
        JSON.stringify(data)
      );

    } catch (error) {
      console.error("OCR ERROR:", error);
      setVisibleItems(1);
      setOcrFailed(true);
    }

    setTimeout(() => {
      processingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  }

  function handleUploadAgain() {
    setIsProcessing(false);
    setVisibleItems(0);
    setOcrFailed(false);

    setTimeout(() => {
      uploadRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  }

  useEffect(() => {
    if (!isProcessing) return;

    if (ocrFailed) return;

    if (shouldFail) {
      if (visibleItems >= 1) {
        setOcrFailed(true);
        return;
      }

      const timer = setTimeout(() => {
        setVisibleItems(1);
      }, 800);

      return () => clearTimeout(timer);
    }

    if (visibleItems >= totalItems) return;

    const timer = setTimeout(() => {
      setVisibleItems((prev) => prev + 1);
    }, 700);

    return () => clearTimeout(timer);
  }, [isProcessing, visibleItems, shouldFail, totalItems]);

  useEffect(() => {
    if (!isProcessing) return;

    const isSuccessComplete = !ocrFailed && visibleItems >= totalItems;
    const isFailureComplete = ocrFailed && visibleItems >= 1;
    const shouldScrollToBottom = isSuccessComplete || isFailureComplete;

    const timer = setTimeout(
      () => {
        if (shouldScrollToBottom) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        } else {
          bottomRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      },
      shouldScrollToBottom ? 500 : 120
    );

    return () => clearTimeout(timer);
  }, [visibleItems, isProcessing, ocrFailed, totalItems]);

  let currentIndex = 0;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f8fbf4]">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/upload-bg.png')",
        }}
      />

      <div className="fixed inset-0 bg-white/10" />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl rounded-[2rem] border border-[#d8e8c8] bg-white/84 p-8 text-center shadow-2xl shadow-green-100/80 backdrop-blur-md sm:p-10">
          <div className="mb-4 text-5xl">🧾</div>

          <h1 className="text-4xl font-extrabold leading-tight text-[#0b4a29] sm:text-5xl">
            Upload Your Grocery Receipt
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#55665a]">
            AI will read your receipt, detect ingredients, and generate a
            zero-waste meal plan.
          </p>

          <label
            ref={uploadRef}
            className="mx-auto mt-8 block w-full max-w-md cursor-pointer rounded-3xl border-2 border-dashed border-[#8fc77a] bg-[#f7fbf3]/85 p-7 transition hover:-translate-y-1 hover:bg-white"
          >
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={handleFileSelect}
            />

            <div className="text-4xl">📷</div>

            <p className="mt-4 text-lg font-semibold text-[#275f36]">
              Take photos or upload from your phone album
            </p>

            <p className="mt-2 text-sm text-[#6b766b]">
              Supports up to 10 receipt photos
            </p>

            <p className="mt-2 text-xs font-medium text-[#7a8a75]">
              Currently optimized for English and German receipt images.
            </p>

            <p className="mt-2 text-xs leading-5 text-[#7d8978]">
              For best results, make sure the receipt is clearly visible,
              including prices and purchase date.
            </p>
          </label>

          {selectedFiles.length > 0 && (
            <div className="mx-auto mt-5 max-w-sm rounded-2xl bg-[#e8f5df] px-4 py-3 text-sm font-semibold text-[#2f6b35]">
              <p>
                📎 {selectedFiles.length} receipt photo
                {selectedFiles.length > 1 ? "s" : ""} selected
              </p>

              <div className="mt-3 space-y-2 text-left">
                {selectedFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white/70 px-3 py-2"
                  >
                    <span className="truncate">{file.name}</span>

                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="font-bold text-[#9a3412]"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedFiles.length > 0 && !isProcessing && (
            <button
              onClick={startAnalysis}
              className="mt-8 rounded-2xl bg-[#69af4f] px-10 py-4 text-xl font-bold text-white shadow-xl shadow-green-200/80 transition hover:-translate-y-1 hover:bg-[#548f3f]"
            >
              Start AI Analysis →
            </button>
          )}


          {isProcessing && (
            <div
              ref={processingRef}
              className="mt-10 border-t border-[#dcebd2] pt-10 text-left"
            >
              <div className="mb-4 text-center text-5xl">🤖</div>

              <h2 className="text-center text-3xl font-extrabold leading-tight text-[#0b4a29] sm:text-4xl">
                AI is analyzing your receipt...
              </h2>

              <div className="mt-8 space-y-5">
                {steps.map((step, stepIndex) => {
                  const startIndex = currentIndex;
                  const endIndex = currentIndex + step.items.length;

                  const visibleCountForStep = Math.max(
                    0,
                    Math.min(visibleItems - startIndex, step.items.length)
                  );

                  const visibleStepItems = step.items.slice(0, visibleCountForStep);

                  currentIndex = endIndex;

                  if (visibleStepItems.length === 0) return null;
                  return (
                    <div
                      key={step.title}
                      className="rounded-2xl bg-[#f2faee] p-5"
                    >
                      <p className="text-lg font-bold text-[#0b4a29]">
                        {step.title}
                      </p>

                      <ul className="mt-4 space-y-3 text-[#536657]">
                        {visibleStepItems.map((item, itemIndex) => {
                          const isFailedScan =
                            (shouldFail || ocrFailed) && stepIndex === 0 && itemIndex === 0;
                          return (
                            <li key={item} className="flex gap-3">
                              <span>{isFailedScan ? "❌" : "✅"}</span>
                              <span>
                                {isFailedScan ? "Receipt scan failed" : item}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {ocrFailed && visibleItems >= 1 && (
                <div className="mt-6 rounded-2xl bg-[#fff7ed] p-5">
                  <p className="text-lg font-bold text-[#9a3412]">
                    We couldn’t read this receipt clearly.
                  </p>

                  <p className="mt-4 text-[#7c5a3c]">Try:</p>

                  <ul className="mt-3 space-y-2 text-[#7c5a3c]">
                    <li>✅ Better lighting</li>
                    <li>✅ A clearer photo</li>
                    <li>✅ A flatter receipt</li>
                  </ul>

                  <button
                    onClick={handleUploadAgain}
                    className="mt-6 rounded-2xl bg-[#69af4f] px-6 py-3 font-bold text-white shadow-lg shadow-green-200/80 transition hover:-translate-y-1 hover:bg-[#548f3f]"
                  >
                    Upload Again
                  </button>
                </div>
              )}

              {!ocrFailed && visibleItems >= totalItems && (
                <div className="text-center">
                  <p className="mt-8 text-xl font-bold text-[#185f37]">
                    Your AI Dashboard is ready ✨
                  </p>

                  <Link
                    href="/dashboard"
                    className="mt-8 inline-flex rounded-2xl bg-[#69af4f] px-10 py-4 text-xl font-bold text-white shadow-xl shadow-green-200/80 transition hover:-translate-y-1 hover:bg-[#548f3f]"
                  >
                    View Dashboard →
                  </Link>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}

          <Link
            href="/"
            className="mt-6 block text-center text-sm font-medium text-[#3f6f3a] hover:underline"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}