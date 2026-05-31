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

      <section className="relative z-10 mx-auto max-w-4xl px-6 py-24">
        <div className="rounded-[2rem] border border-[#d8e8c8] bg-white/90 p-8 shadow-[0_20px_60px_rgba(90,140,90,0.18)] backdrop-blur-xl sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#68a850]">
            About Me 
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0b4a29] sm:text-5xl">
            AI-powered zero-waste meal planning
          </h1>

          <p className="mt-6 leading-8 text-[#536657]">
            AI 🌿 WasteLess is a student-built MVP that turns grocery receipts into
            low-waste meal recommendations and grocery insights. The product is
            designed for students, young professionals, and small households who
            want to reduce food waste, save money, and plan meals more
            efficiently.
          </p>

          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-2xl font-extrabold text-[#0b4a29]">
                How it works
              </h2>

              <p className="mt-3 leading-8 text-[#536657]">
                The current MVP uses OCR, receipt validation, rule-based food
                category reasoning, expiration estimation, and a meal planning
                workflow to generate a simple AI dashboard from each uploaded
                receipt.
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

              <p className="mt-3 leading-8 text-[#536657]">
                Developed by Wenxin Lyu.
              </p>

              <p className="mt-1 font-semibold text-[#245c2e]">
                wenxin.lyu@rwth-aachen.de
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}