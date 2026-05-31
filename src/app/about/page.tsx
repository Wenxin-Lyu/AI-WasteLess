export default function AboutPage() {
  return (
    <main className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#f8fbf4]">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      />

      <div className="fixed inset-0 bg-white/20" />

      <section className="relative z-10 mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-[2rem] border border-[#d8e8c8] bg-white/90 p-8 shadow-[0_20px_60px_rgba(90,140,90,0.18)] backdrop-blur-xl sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#68a850]">
            About AI WasteLess
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0b4a29] sm:text-5xl">
            Turning grocery receipts into low-waste decisions
          </h1>

          <p className="mt-6 leading-8 text-[#536657]">
            AI 🌿 WasteLess is an AI-powered zero-waste meal planning product
            that transforms grocery receipts into low-waste meal
            recommendations, grocery insights, and sustainability-focused
            household decisions.
          </p>

          <p className="mt-4 leading-8 text-[#536657]">
            The product is designed for students, young professionals, and small
            households who want to reduce food waste, avoid unnecessary grocery
            spending, and plan meals around ingredients they already have.
          </p>

          <div className="mt-8 space-y-7">
            <section>
              <h2 className="text-2xl font-extrabold text-[#0b4a29]">
                Product Vision
              </h2>

              <p className="mt-3 leading-8 text-[#536657]">
                AI WasteLess starts with receipt understanding and expands
                toward a smarter sustainable kitchen assistant. The long-term
                vision is to support inventory awareness, food waste prediction,
                personalized shopping assistance, and low-waste household
                planning.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-[#0b4a29]">
                How it works
              </h2>

              <p className="mt-3 leading-8 text-[#536657]">
                The current workflow combines OCR, receipt validation,
                rule-based food category reasoning, expiration estimation, and
                meal planning logic. Each uploaded receipt is processed through a
                lightweight multi-agent workflow and turned into a simple AI
                dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-[#0b4a29]">
                Business Direction
              </h2>

              <p className="mt-3 leading-8 text-[#536657]">
                Future commercialization opportunities may include smart refill
                recommendations, low-waste grocery bundles, kitchen tool
                recommendations, sustainability-focused shopping support, and
                grocery ecosystem integration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-[#0b4a29]">
                Legal notice
              </h2>

              <p className="mt-3 leading-8 text-[#536657]">
                This project is an academic and competition MVP. The expiration
                dates, waste-risk estimates, meal suggestions, and shopping
                recommendations are generated for demonstration purposes only and
                should not be treated as professional food safety, medical, or
                nutritional advice.
              </p>

              <p className="mt-3 leading-8 text-[#536657]">
                Users should always check product labels, storage conditions,
                smell, appearance, and official food safety guidance before
                consuming any ingredient.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-[#0b4a29]">
                Developer
              </h2>

              <div className="mt-4 rounded-3xl border border-[#d8e8c8] bg-white/85 p-6 text-center shadow-[0_14px_40px_rgba(90,140,90,0.14)]">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f2faee] text-4xl shadow-inner">
                  👩🏻‍💻
                </div>

                <p className="mt-4 text-xl font-extrabold text-[#0b4a29]">
                  Wenxin Lyu
                </p>

                <a
                  href="mailto:wenxin.lyu@rwth-aachen.de"
                  className="mt-2 inline-block font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  wenxin.lyu@rwth-aachen.de
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}