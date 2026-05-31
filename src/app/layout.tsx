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
            sticky top-0 z-50
            w-full
            bg-white/92
            backdrop-blur-md
            border-b border-green-100
            shadow-sm
          "
          style={{
            paddingTop: "env(safe-area-inset-top)",
          }}
        >
          <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
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

              <span className="text-2xl font-bold tracking-tight text-[#245c2e]">
                WasteLess
              </span>
            </Link>

            <Link
              href="/about"
              className="
                text-[15px]
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