import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI WasteLess",
  description: "AI-powered zero-waste meal planning app",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#f6fff0] text-[#1f3b1f]">
        <header
          className="
            sticky top-4 z-50
            mx-auto
            w-[94%]
            max-w-7xl
            rounded-[2rem]
            bg-white/92
            backdrop-blur-xl
            border border-white/70
            shadow-[0_10px_40px_rgba(80,120,80,0.12)]
          "
          style={{
            paddingTop: "env(safe-area-inset-top)",
          }}
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-3 hover:opacity-90 transition"
            >
              <Image
                src="/logo.png"
                alt="AI WasteLess Logo"
                width={44}
                height={44}
                className="rounded-xl"
              />

              <span className="text-3xl font-extrabold tracking-tight text-[#245c2e]">
                WasteLess
              </span>
            </Link>

            <Link
              href="/about"
              className="
                text-lg
                font-semibold
                text-[#245c2e]
                hover:text-[#4f9f38]
                transition
              "
            >
              About Me
            </Link>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}