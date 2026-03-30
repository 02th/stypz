"use client";

import Link from "next/link";

export default function ProductsPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black px-4 sm:px-6 py-16 sm:py-24">

      <div className="w-full max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-12 sm:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Explore Stypz
          </h1>
          <p className="mt-4 text-gray-600">
            Built for performance. Designed for simplicity.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">

          {/* FEATURES CARD */}
          <Link href="/features">
            <div className="group cursor-pointer p-6 sm:p-8 rounded-3xl border border-black/5 bg-white/70 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Features
              </h2>
              <p className="mt-3 text-gray-600 text-sm sm:text-base">
                Dive deep into the architecture behind Stypz infrastructure.
              </p>
              <div className="mt-6 text-sm text-gray-500 group-hover:text-black transition">
                Explore →
              </div>
            </div>
          </Link>

          {/* SECURITY CARD */}
          <Link href="/security">
            <div className="group cursor-pointer p-6 sm:p-8 rounded-3xl border border-black/5 bg-white/70 backdrop-blur-md hover:shadow-xl transition-all duration-300 h-full">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                Security
              </h2>
              <p className="mt-3 text-gray-600 text-sm sm:text-base">
                Learn how your data and systems are protected at every layer.
              </p>
              <div className="mt-6 text-sm text-gray-500 group-hover:text-black transition">
                Explore →
              </div>
            </div>
          </Link>

        </div>

      </div>
    </main>
  );
}
