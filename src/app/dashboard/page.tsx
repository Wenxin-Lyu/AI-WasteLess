"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MealPlanDay = {
  day: string;
  meal: string;
};

type RiskLevel = "Low" | "Medium" | "High";

type ExpirationItem = {
  name: string;
  category: string;
  originalText: string;
  quantity: number | null;
  unit: string | null;
  shelfLifeDays: number;
  wasteRisk: RiskLevel;
  bestBeforeDate: string | null;
  daysRemaining: number | null;
  freshnessStatus: string;
};

type AgentResult = {
  analyzedAt?: string;
  mealPlan?: {
    todayPriority?: ExpirationItem;
    mealRecommendation?: {
      title: string;
      reason: string;
    };
    weeklyMealPlan?: MealPlanDay[];
    smartShoppingSuggestion?: {
      type: string;
      suggestion: string;
    };
  };
  expirationAnalysis?: ExpirationItem[];
};

export default function DashboardPage() {
  const [agentResult, setAgentResult] = useState<AgentResult | null>(null);
  const [itemStatus, setItemStatus] = useState<"active" | "cooked" | "wasted">(
    "active"
  );

  useEffect(() => {
    const savedResult = localStorage.getItem("aiWasteLessResult");

    if (savedResult) {
      setAgentResult(JSON.parse(savedResult));
    }
  }, []);

  const todayPriority = agentResult?.mealPlan?.todayPriority;
  const mealRecommendation = agentResult?.mealPlan?.mealRecommendation;
  const weeklyMealPlan = agentResult?.mealPlan?.weeklyMealPlan || [];
  const smartShoppingSuggestion = agentResult?.mealPlan?.smartShoppingSuggestion;

  const highRiskItems =
    agentResult?.expirationAnalysis?.filter(
      (item) => item.wasteRisk === "High"
    ) || [];

  function formatPlanDate(offsetDays: number) {
    const baseDate = agentResult?.analyzedAt
      ? new Date(agentResult.analyzedAt)
      : new Date();

    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + offsetDays);

    return date.toLocaleDateString("en-GB");
  }

  const isCompleted = itemStatus !== "active";

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f8fbf4]">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/dashboard-bg.png')" }}
      />

      <div className="fixed inset-0 bg-white/20" />

      <section className="relative z-10 mx-auto max-w-4xl px-5 py-24 sm:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#68a850]">
            AI 🌿 WasteLess
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#0b4a29] sm:text-6xl">
            AI Dashboard
          </h1>

          <p className="mt-4 text-lg text-[#55665a]">
            Your zero-waste kitchen plan is ready ✨
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          <section className="rounded-[2rem] border border-[#d8e8c8] bg-white/86 p-6 shadow-[0_20px_60px_rgba(90,140,90,0.18)] backdrop-blur-xl sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="text-4xl">⚠️</div>

              <h2 className="text-3xl font-extrabold text-[#0b4a29]">
                Today’s Priority
              </h2>
            </div>

            {!isCompleted ? (
              <>
                <div className="space-y-3">
                  {todayPriority ? (
                    <div className="rounded-2xl bg-[#fff8df] p-4 font-semibold text-[#7a5a00]">
                      ⚠️ {todayPriority.name} expires in{" "}
                      {Math.abs(todayPriority.daysRemaining ?? 0)} day(s)
                    </div>
                  ) : (
                    <div className="rounded-2xl bg-[#fff8df] p-4 font-semibold text-[#7a5a00]">
                      Upload a receipt to generate today’s priority.
                    </div>
                  )}
                </div>

                <div className="mt-6 rounded-3xl bg-[#f2faee] p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#68a850]">
                    Today Recommendation
                  </p>

                  <h3 className="mt-3 text-3xl font-extrabold text-[#0b4a29]">
                    {mealRecommendation?.title ||
                      "Waiting for AI recommendation"}
                  </h3>

                  <p className="mt-4 leading-7 text-[#536657]">
                    {mealRecommendation?.reason ||
                      "Upload a grocery receipt first, then AI will recommend what to cook."}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setItemStatus("cooked")}
                    className="flex-1 rounded-2xl bg-[#69af4f] px-6 py-4 text-lg font-bold text-white shadow-lg shadow-green-200/80 transition hover:-translate-y-1 hover:bg-[#548f3f]"
                  >
                    Cooked
                  </button>

                  <button
                    onClick={() => setItemStatus("wasted")}
                    className="flex-1 rounded-2xl border border-[#d9b6a3] bg-[#fff7ed] px-6 py-4 text-lg font-bold text-[#9a3412] transition hover:-translate-y-1 hover:bg-[#ffedd5]"
                  >
                    Wasted
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-3xl bg-[#f2faee] p-6 text-center">
                <div className="text-5xl">
                  {itemStatus === "cooked" ? "✅" : "🗑️"}
                </div>

                <h3 className="mt-4 text-2xl font-extrabold text-[#0b4a29]">
                  {todayPriority?.name || "Ingredient"} →{" "}
                  {itemStatus === "cooked" ? "Consumed" : "Wasted"}
                </h3>

                <p className="mt-3 text-[#536657]">
                  Dashboard updated. Weekly Meal Plan and AI Insight have been
                  refreshed.
                </p>
              </div>
            )}

            <div className="mt-6 rounded-3xl border border-[#d8e8c8] bg-white/80 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#68a850]">
                Smart Refill
              </p>

              <p className="mt-3 text-lg font-bold text-[#0b4a29]">
                {smartShoppingSuggestion?.type || "Smart Shopping Suggestion"}
              </p>

              <p className="mt-2 text-[#536657]">
                {smartShoppingSuggestion?.suggestion ||
                  "AI will suggest smarter shopping options after receipt analysis."}
              </p>

              <button className="mt-4 rounded-2xl bg-[#f2d96b] px-5 py-3 font-bold text-[#335022] transition hover:-translate-y-1">
                See Refill Options 
              </button>
            </div>
          </section>

          <section className="rounded-[2rem] border border-[#d8e8c8] bg-white/86 p-6 sshadow-[0_20px_60px_rgba(90,140,90,0.18)] backdrop-blur-xl sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="text-4xl">🤖</div>

              <h2 className="text-3xl font-extrabold text-[#0b4a29]">
                AI Insight
              </h2>
            </div>

            <div className="rounded-3xl bg-[#f2faee] p-5">
              <p className="text-xl font-bold text-[#0b4a29]">
                AI is learning your kitchen habits...
              </p>

              <ul className="mt-4 space-y-3 text-[#536657]">
                {highRiskItems.length > 0 ? (
                  highRiskItems.map((item) => (
                    <li key={`${item.name}-${item.originalText}`}>
                      🌿 {item.name} has high waste risk
                    </li>
                  ))
                ) : (
                  <li>🌿 No high-risk ingredients detected yet</li>
                )}

                <li>🍱 Meal prep is recommended</li>

                <li>
                  {itemStatus === "cooked"
                    ? "✅ Great choice — high-risk ingredient consumed"
                    : itemStatus === "wasted"
                    ? `⚠️ Next time, AI will recommend buying less ${
                        todayPriority?.name || "this ingredient"
                      }`
                    : "✨ Prioritize fresh ingredients this week"}
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-3xl bg-white/80 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#68a850]">
                Estimated Sustainability Impact
              </p>

              <ul className="mt-4 space-y-5 text-[#536657]">
                <li>
                  <p className="font-bold text-[#0b4a29]">
                    ✅ Less food waste
                  </p>

                  <p className="mt-1 leading-6">
                    High-risk ingredients were identified before expiration.
                  </p>
                </li>

                <li>
                  <p className="font-bold text-[#0b4a29]">✅ Save money</p>

                  <p className="mt-1 leading-6">
                    AI meal suggestions help maximize the value of purchased
                    groceries.
                  </p>
                </li>

                <li>
                  <p className="font-bold text-[#0b4a29]">
                    ✅ Lower CO₂ impact
                  </p>

                  <p className="mt-1 leading-6">
                    Reducing household food waste contributes to a lower
                    environmental footprint.
                  </p>
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-3xl border border-[#d8e8c8] bg-white/80 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#68a850]">
                Kitchen Recommendations
              </p>

              <p className="mt-3 text-[#536657]">
                AI detected your cooking pattern and may recommend meal prep
                tools to help reduce food waste.
              </p>

              <button className="mt-4 rounded-2xl bg-[#f2d96b] px-5 py-3 font-bold text-[#335022] transition hover:-translate-y-1">
                Explore Kitchen Tools
              </button>
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-[2rem] border border-[#d8e8c8] bg-white/86 p-6 shadow-[0_20px_60px_rgba(90,140,90,0.18)] backdrop-blur-xl sm:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="text-4xl">🍽️</div>

            <h2 className="text-3xl font-extrabold text-[#0b4a29]">
              Weekly Meal Plan
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {weeklyMealPlan.length > 0 ? (
              weeklyMealPlan.map((plan, index) => (
                <div key={plan.day} className="rounded-3xl bg-[#f2faee] p-5">
                  <p className="font-bold text-[#68a850]">
                    {formatPlanDate(index)}
                  </p>

                  <h3 className="mt-2 text-xl font-extrabold text-[#0b4a29]">
                    {plan.meal}
                  </h3>
                </div>
              ))
            ) : (
              <div className="rounded-3xl bg-[#f2faee] p-5">
                <p className="font-bold text-[#68a850]">Waiting</p>

                <h3 className="mt-2 text-xl font-extrabold text-[#0b4a29]">
                  Upload a receipt to generate your meal plan
                </h3>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-3xl border border-[#d8e8c8] bg-white/80 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#68a850]">
              Zero-Waste Grocery Bundle
            </p>

            <p className="mt-3 text-lg font-bold text-[#0b4a29]">
              AI recommends a low-waste grocery bundle based on your cooking
              habits.
            </p>

            <ul className="mt-4 space-y-2 text-[#536657]">
              <li>✅ Smaller portions of high-risk ingredients</li>
              <li>✅ Pre-portioned meal prep items</li>
              <li>✅ Longer-lasting alternatives</li>
            </ul>

            <button className="mt-4 rounded-2xl bg-[#f2d96b] px-5 py-3 font-bold text-[#335022] transition hover:-translate-y-1">
              Explore Smart Bundles
            </button>
          </div>
        </section>

      </section>
    </main>
  );
}