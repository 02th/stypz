import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-white text-black">

      {/* ── HERO ── */}
      <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] flex items-start overflow-hidden">

        <Image
          src="/hero.webp"
          alt="infrastructure hero"
          fill
          priority
          className="object-cover opacity-70 pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-white/20" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28">
          <div className="max-w-sm sm:max-w-md text-left">

            <div className="mb-4 inline-flex items-center px-3 py-1 rounded-full border border-black/10 backdrop-blur-sm bg-white/60 text-xs text-gray-600">
              Infrastructure
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              Deploy VPS <br /> <span className="italic">in seconds.</span>
            </h1>

            <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
              High-performance compute. No setup friction.
            </p>

            <Link
              href="/signup"
              className="mt-6 inline-block px-6 py-3 rounded-xl bg-black text-white text-sm hover:bg-black/90 transition"
            >
              Launch Server
            </Link>

          </div>
        </div>
      </section>

      <div className="h-16 md:h-32" />

      {/* ── HIGH-SPEED NETWORKING ── */}
      <section className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden">

        {/* Image: right half on desktop, full overlay on mobile */}
        <div className="absolute inset-0 md:left-auto md:right-0 md:w-1/2">
          <Image
            src="/database.webp"
            alt="network"
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-white/50 md:bg-gradient-to-r md:from-white md:via-white/80 md:to-white/30" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
              High-speed networking built in
            </h2>
            <a
              href="#"
              className="inline-flex items-center text-gray-700 hover:text-black text-sm font-medium transition"
            >
              Explore ›
            </a>
          </div>
        </div>
      </section>

      {/* ── BUILT FOR PERFORMANCE ── */}
      <section className="w-full py-16 md:py-24 bg-[#F6F7FB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Built for performance
          </h2>
          <p className="mt-3 text-gray-600 max-w-xl">
            Reliable infrastructure designed to scale with your workload.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {["Compute", "Storage", "Security"].map((item) => (
              <div key={item} className="p-5 md:p-6 rounded-2xl border border-black/5 bg-white/70 backdrop-blur-sm">
                <h3 className="text-base md:text-lg font-medium">{item}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Optimized systems for consistent and fast performance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 md:h-32" />

      {/* ── ENTERPRISE SECURITY ── */}
      <section className="relative w-full min-h-[50vh] md:min-h-[65vh] flex items-center overflow-hidden">

        <div className="absolute inset-0 md:right-auto md:left-0 md:w-1/2">
          <Image
            src="/security.webp"
            alt="security"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-white/60 md:bg-gradient-to-r md:from-white/30 md:via-white/80 md:to-white" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-md md:ml-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
              Enterprise Security
            </h2>
            <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
              Bank-level encryption and compliance certifications. Every layer built with security at its core.
            </p>
            <div className="mt-6 space-y-2 md:space-y-3">
              {["End-to-end encryption", "SOC 2 Type II Compliant", "Regular penetration testing"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-16 md:h-32" />

      {/* ── GLOBAL SCALE ── */}
      <section className="relative w-full min-h-[50vh] md:min-h-[65vh] flex items-center overflow-hidden">

        <div className="absolute inset-0 md:left-auto md:right-0 md:w-1/2">
          <Image
            src="/network.webp"
            alt="network"
            fill
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-white/60 md:bg-gradient-to-r md:from-white md:via-white/80 md:to-white/30" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-md">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
              Global Scale
            </h2>
            <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
              Deploy anywhere in the world with our distributed infrastructure and CDN.
            </p>
            <div className="mt-6 space-y-2 md:space-y-3">
              {["99.99% Uptime SLA", "Multi-region deployment", "Automatic failover"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-black rounded-full shrink-0" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full py-20 md:py-24 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Ready to get started?
          </h2>

          <p className="mt-4 text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
            Join thousands of companies using Stypz to scale their infrastructure.
          </p>

          <Link
            href="/signup"
            className="mt-8 inline-block px-6 md:px-8 py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-100 transition"
          >
            Start Free Trial
          </Link>

        </div>
      </section>

    </main>
  );
}
