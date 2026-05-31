import Link from "next/link";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[#f8fbf4]">
      {/* Full Screen Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      />

      {/* Soft Overlay */}
      <div className="fixed inset-0 bg-white/15" />

      {/* Content */}
      <section className="relative z-10 flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6 py-20 text-center">
        {/* Hero Title */}
        <div className="flex flex-wrap items-center justify-center text-5xl font-extrabold tracking-tight text-[#0b4a29] drop-shadow-sm sm:text-7xl md:text-8xl">
          <span>AI</span>

          <span className="mx-3 -translate-y-1 text-5xl sm:text-6xl md:text-7xl">
            🌿
          </span>

          <span>WasteLess</span>
        </div>

        {/* Slogan */}
        <p className="mt-8 text-2xl font-semibold text-[#185f37] sm:text-3xl">
          Keep the receipt. We handle the rest.
        </p>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4f5f55] sm:text-xl">
          Turn grocery receipts into AI-powered zero-waste meal planning.
        </p>

        {/* Button */}
        <Link
          href="/upload"
          className="mt-12 rounded-2xl bg-[#69af4f] px-14 py-5 text-2xl font-bold text-white shadow-[0_10px_30px_rgba(122,201,99,0.45)] transition duration-300 hover:-translate-y-1 hover:bg-[#5d9b45]"
        >
          Start Now →
        </Link>

        {/* Benefits */}
        <div className="mt-8 flex flex-col items-center gap-3 text-base font-medium text-[#215732] sm:flex-row sm:gap-8 sm:text-lg">
          <div>🌱 Reduce food waste</div>

          <div>🍽️ Plan meals smarter</div>

          <div>💰 Save money sustainably</div>
        </div>
      </section>
    </main>
  );
}