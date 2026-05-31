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
      <div className="fixed inset-0 bg-white/10" />

      {/* Content */}
      <section className="relative z-10 flex min-h-[calc(100vh-120px)] flex-col items-center justify-center px-6 py-20 text-center">
        {/* Hero Title */}
        <div className="flex flex-wrap items-center justify-center text-5xl font-extrabold tracking-[-0.04em] text-[#0b4a29] drop-shadow-sm sm:text-7xl md:text-[7rem]">
          <span>AI</span>

          <span className="mx-3 -translate-y-1 text-5xl sm:text-6xl md:text-7xl">
            🌿
          </span>

          <span>WasteLess</span>
        </div>

        {/* Slogan */}
        <div className="mt-8 space-y-1">
          <p className="text-2xl font-bold tracking-tight text-[#185f37] sm:text-3xl">
            Keep the receipt.
          </p>

          <p className="text-2xl font-bold tracking-tight text-[#185f37] sm:text-3xl">
            We handle the rest.
          </p>
        </div>

        {/* Subtitle */}
        <p className="mt-5 max-w-2xl text-base leading-8 text-[#55675a] sm:text-lg">
          Turn grocery receipts into AI-powered zero-waste meal
          planning.
        </p>

        {/* Button */}
        <Link
          href="/upload"
          className="mt-8 rounded-2xl bg-[#69af4f] px-14 py-5 text-2xl font-bold text-white shadow-[0_10px_30px_rgba(122,201,99,0.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#5d9b45]"
        >
          Start Now
        </Link>

        {/* Benefits */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-[#245c2e] sm:gap-5 sm:text-base">
          <div className="rounded-full bg-white/70 px-4 py-2 backdrop-blur-sm">
            🌱 Reduce waste
          </div>

          <div className="rounded-full bg-white/70 px-4 py-2 backdrop-blur-sm">
            🍽️ Plan smarter
          </div>

          <div className="rounded-full bg-white/70 px-4 py-2 backdrop-blur-sm">
            💰 Save sustainably
          </div>
        </div>
      </section>
    </main>
  );
}