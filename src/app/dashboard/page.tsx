"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const [spinachStatus, setSpinachStatus] = useState<"active" | "cooked" | "wasted">("active");

  const isCompleted = spinachStatus !== "active";

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f8fbf4]">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/dashboard-bg.png')",
        }}
      />

      <div className="fixed inset-0 bg-white/20" />

      <section className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#68a850]">
            AI 🌿 WasteLess
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-[#0b4a29] sm:text-6xl">
            AI Dashboard
          </h1>

          <p className="mt-4 text-lg text-[#55665a]">
            Your zero-waste kitchen plan is ready ✨
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Today Priority */}
          <section className="rounded-[2rem] border border-[#d8e8c8] bg-white/86 p-6 shadow-2xl shadow-green-100/80 backdrop-blur-md sm:p-8">
            <div className="mb-5 flex items-center gap-3">
                <div className="text-4xl">⚠️</div>

                <h2 className="text-3xl font-extrabold text-[#0b4a29]">
                    Today’s Priority
                </h2>
            </div>

            {!isCompleted ? (
              <>
                <div className="space-y-3">
                  <div className="rounded-2xl bg-[#fff8df] p-4 font-semibold text-[#7a5a00]">
                    ⚠️ Spinach expires in 1 day
                  </div>
                  <div className="rounded-2xl bg-[#fff8df] p-4 font-semibold text-[#7a5a00]">
                    ⚠️ Cream expires in 3 days
                  </div>
                </div>

                <div className="mt-6 rounded-3xl bg-[#f2faee] p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#68a850]">
                    Today Recommendation
                  </p>
                  <h3 className="mt-3 text-3xl font-extrabold text-[#0b4a29]">
                    Creamy Spinach Pasta
                  </h3>
                  <p className="mt-4 leading-7 text-[#536657]">
                    Boil pasta with salt, cook spinach gently, then add cream.
                    Keep it simple and use the high-risk ingredients first.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => setSpinachStatus("cooked")}
                    className="flex-1 rounded-2xl bg-[#69af4f] px-6 py-4 text-lg font-bold text-white shadow-lg shadow-green-200/80 transition hover:-translate-y-1 hover:bg-[#548f3f]"
                  >
                    Cooked
                  </button>

                  <button
                    onClick={() => setSpinachStatus("wasted")}
                    className="flex-1 rounded-2xl border border-[#d9b6a3] bg-[#fff7ed] px-6 py-4 text-lg font-bold text-[#9a3412] transition hover:-translate-y-1 hover:bg-[#ffedd5]"
                  >
                    Wasted
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-3xl bg-[#f2faee] p-6 text-center">
                <div className="text-5xl">{spinachStatus === "cooked" ? "✅" : "🗑️"}</div>
                <h3 className="mt-4 text-2xl font-extrabold text-[#0b4a29]">
                  Spinach → {spinachStatus === "cooked" ? "Consumed" : "Wasted"}
                </h3>
                <p className="mt-3 text-[#536657]">
                  Dashboard updated. Weekly Meal Plan and AI Insight have been refreshed.
                </p>
              </div>
            )}

            <div className="mt-6 rounded-3xl border border-[#d8e8c8] bg-white/80 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#68a850]">
                Smart Refill
              </p>
              <p className="mt-3 text-lg font-bold text-[#0b4a29]">
                Milk may run low in 1 day.
              </p>
              <button className="mt-4 rounded-2xl bg-[#f2d96b] px-5 py-3 font-bold text-[#335022] transition hover:-translate-y-1">
                See Refill Options →
              </button>
            </div>
          </section>

          {/* AI Insight */}
          <section className="rounded-[2rem] border border-[#d8e8c8] bg-white/86 p-6 shadow-2xl shadow-green-100/80 backdrop-blur-md sm:p-8">
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
                <li>🌿 Spinach has high waste risk</li>
                <li>🍱 Meal prep is recommended</li>
                <li>
                  {spinachStatus === "cooked"
                    ? "✅ Great choice — high-risk ingredient consumed"
                    : spinachStatus === "wasted"
                    ? "⚠️ Next time, AI will recommend buying less spinach"
                    : "✨ Prioritize fresh ingredients this week"}
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-3xl bg-white/80 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#68a850]">
                Estimated Sustainability Impact
              </p>

              <ul className="mt-4 space-y-3 text-[#536657]">
                <li>✅ Less food waste</li>
                <li>✅ Save money</li>
                <li>✅ Lower CO₂ impact</li>
              </ul>
            </div>

            <div className="mt-6 rounded-3xl border border-[#d8e8c8] bg-white/80 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#68a850]">
                Kitchen Recommendations
              </p>
              <p className="mt-3 text-[#536657]">
                You often cook pasta. A Pasta Pot may help you prepare meal prep
                faster and reduce cooking friction.
              </p>
              <button className="mt-4 rounded-2xl bg-[#f2d96b] px-5 py-3 font-bold text-[#335022] transition hover:-translate-y-1">
                Explore Kitchen Tools →
              </button>
            </div>
          </section>
        </div>

        {/* Weekly Meal Plan */}
        <section className="mt-6 rounded-[2rem] border border-[#d8e8c8] bg-white/86 p-6 shadow-2xl shadow-green-100/80 backdrop-blur-md sm:p-8">
            <div className="mb-5 flex items-center gap-3">
                <div className="text-4xl">🍽️</div>

                <h2 className="text-3xl font-extrabold text-[#0b4a29]">
                    Weekly Meal Plan
                </h2>
            </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#f2faee] p-5">
              <p className="font-bold text-[#68a850]">Monday</p>
              <h3 className="mt-2 text-xl font-extrabold text-[#0b4a29]">
                Spinach Pasta with Milk
              </h3>
            </div>

            <div className="rounded-3xl bg-[#f2faee] p-5">
              <p className="font-bold text-[#68a850]">Tuesday</p>
              <h3 className="mt-2 text-xl font-extrabold text-[#0b4a29]">
                Chicken Rice and Beef
              </h3>
            </div>

            <div className="rounded-3xl bg-[#f2faee] p-5">
              <p className="font-bold text-[#68a850]">Wednesday</p>
              <h3 className="mt-2 text-xl font-extrabold text-[#0b4a29]">
                Broccoli Chicken Bowl
              </h3>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-[#d8e8c8] bg-white/80 p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#68a850]">
              Zero-Waste Grocery Bundle
            </p>

            <p className="mt-3 text-lg font-bold text-[#0b4a29]">
              AI recommends a low-waste grocery bundle based on your cooking habits.
            </p>

            <ul className="mt-4 space-y-2 text-[#536657]">
              <li>✅ Half-size spinach</li>
              <li>✅ Pre-portioned chicken</li>
              <li>✅ Frozen broccoli</li>
            </ul>

            <p className="mt-4 font-bold text-[#185f37]">
              Estimated: 28% less food waste
            </p>

            <button className="mt-4 rounded-2xl bg-[#f2d96b] px-5 py-3 font-bold text-[#335022] transition hover:-translate-y-1">
              Explore Smart Bundles →
            </button>
          </div>
        </section>

        <div className="mt-8 text-center">
          <Link href="/upload" className="text-sm font-bold text-[#3f6f3a] hover:underline">
            ← Back to upload
          </Link>
        </div>
      </section>
    </main>
  );
}