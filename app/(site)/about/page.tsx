export default function AboutPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          About
        </h1>

        <p className="mt-6 text-gray-700 leading-relaxed">
          Stypz exists to simplify infrastructure without reducing control.
          The goal is not to abstract everything away, but to remove the friction
          that usually comes with deploying and managing compute.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          Most platforms either prioritize flexibility at the cost of complexity,
          or simplicity at the cost of capability. Stypz is designed to sit in
          between — offering a clean experience while still maintaining direct,
          predictable access to the underlying system.
        </p>

        {[
          {
            heading: "1. Approach",
            items: [
              "1.1 The platform is built around a straightforward idea: infrastructure should behave exactly as expected. No hidden layers, no unnecessary abstraction, and no artificial limitations beyond what is required for stability.",
              "1.2 Systems are designed to remain predictable under load, with an emphasis on consistency rather than exaggerated performance claims.",
            ],
          },
          {
            heading: "2. Philosophy",
            items: [
              "2.1 Simplicity is treated as a design constraint, not a limitation. Reducing unnecessary complexity leads to better reliability, clearer behavior, and easier debugging when things go wrong.",
              "2.2 The platform avoids feature bloat. Every component exists for a reason, and anything that does not contribute to stability or usability is intentionally excluded.",
            ],
          },
          {
            heading: "3. What Stypz is not",
            items: [
              "3.1 Stypz is not a managed platform that hides infrastructure details behind layers of automation.",
              "3.2 It is not designed for marketing-driven features or unnecessary visual complexity.",
              "3.3 It does not attempt to replace understanding with convenience.",
            ],
          },
          {
            heading: "4. Direction",
            items: [
              "4.1 The direction is simple: build infrastructure that feels reliable, fast, and consistent — without requiring users to fight the platform.",
              "4.2 Improvements are made incrementally, with a focus on maintaining stability rather than introducing rapid, disruptive changes.",
              "4.3 The long-term goal is not to become complex, but to remain useful.",
            ],
          },
        ].map((section) => (
          <div key={section.heading} className="mt-12">
            <h2 className="text-xl font-semibold">{section.heading}</h2>
            {section.items.map((item, i) => (
              <p key={i} className="mt-4 text-gray-700 leading-relaxed">{item}</p>
            ))}
          </div>
        ))}

      </section>
    </main>
  );
}
