export default function Contact() {
  return (
    <main className="bg-white text-black min-h-screen">

      {/* HEADER */}
      <section className="py-16 sm:py-20 border-b border-black/5 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Contact
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
            If you&apos;re here, something is very serious.
          </p>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">

          {/* EMAIL */}
          <div className="p-5 sm:p-6 rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold">Email Support</h2>
            <p className="mt-2 text-sm text-gray-600">
              For account issues, billing problems, or service disruptions.
            </p>
            <p className="mt-4 text-sm font-medium text-black break-all">
              support@stypz.me
            </p>
          </div>

          {/* DISCORD */}
          <div className="p-5 sm:p-6 rounded-2xl border border-black/10 bg-white shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold">Discord</h2>
            <p className="mt-2 text-sm text-gray-600">
              For faster communication and real-time support.
            </p>
            <a
              href="https://discord.gg/YdnyRZ83Ue"
              className="mt-4 inline-block text-sm font-medium text-black hover:underline"
            >
              Join server →
            </a>
          </div>

        </div>
      </section>

      {/* INFO SECTION */}
      <section className="py-12 sm:py-16 bg-[#F6F7FB] border-t border-black/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-sm">

          <div className="p-5 rounded-xl bg-white border border-black/5">
            <h3 className="font-semibold mb-2">Response Time</h3>
            <p className="text-gray-600">
              Most requests are handled within a few hours depending on severity.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-black/5">
            <h3 className="font-semibold mb-2">Priority Issues</h3>
            <p className="text-gray-600">
              Infrastructure or downtime issues are prioritized immediately.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-black/5 sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold mb-2">Abuse Reports</h3>
            <p className="text-gray-600">
              Report violations or misuse of services directly via email.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
