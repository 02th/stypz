const plans = [
  { name: "Starter", ram: "2GB", cpu: "1 vCore", storage: "10GB", price: "$0.99" },
  { name: "Basic", ram: "4GB", cpu: "2 vCore", storage: "20GB", price: "$1.50" },
  { name: "Plus", ram: "6GB", cpu: "2 vCore", storage: "25GB", price: "$1.99" },
  { name: "Pro", ram: "8GB", cpu: "4 vCore", storage: "40GB", price: "$3.99" },
  { name: "Advanced", ram: "12GB", cpu: "4 vCore", storage: "50GB", price: "$4.99" },
  { name: "Performance", ram: "24GB", cpu: "6 vCore", storage: "100GB", price: "$6.99" },
  { name: "Scale", ram: "32GB", cpu: "8 vCore", storage: "150GB", price: "$9.99" },
];

export default function Pricing() {
  return (
    <main className="relative bg-white text-black overflow-hidden">

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <div className="absolute top-20 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-blue-100 rounded-3xl blur-3xl" />
        <div className="absolute bottom-10 right-10 w-56 sm:w-72 h-56 sm:h-72 bg-indigo-100 rounded-full blur-3xl" />
      </div>

      {/* Heading */}
      <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Compute pricing
        </h1>
        <p className="mt-3 text-gray-600 max-w-xl text-sm sm:text-base">
          Simple, predictable pricing for every workload. No hidden costs.
        </p>
      </section>

      {/* MOBILE CARDS */}
      <section className="md:hidden px-4 sm:px-6 pb-16 space-y-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="p-4 sm:p-5 rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-base sm:text-lg">{plan.name}</h3>
              <span className="font-semibold text-sm sm:text-base">
                {plan.price}
                <span className="text-xs text-gray-500"> /mo</span>
              </span>
            </div>

            <div className="grid grid-cols-3 text-sm text-gray-600 gap-2">
              <div>
                <p className="text-xs text-gray-400">RAM</p>
                <p className="font-medium">{plan.ram}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">vCPU</p>
                <p className="font-medium">{plan.cpu}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Storage</p>
                <p className="font-medium">{plan.storage}</p>
              </div>
            </div>

            <button className="mt-4 w-full py-2 rounded-lg bg-black text-white text-sm font-medium">
              Deploy
            </button>
          </div>
        ))}
      </section>

      {/* DESKTOP TABLE */}
      <section className="hidden md:block max-w-6xl mx-auto px-6 pb-24">

        <div className="border border-black/10 rounded-xl overflow-hidden bg-white/70 backdrop-blur-sm">

          <div className="grid grid-cols-5 text-sm text-gray-500 border-b border-black/10 bg-gray-50">
            <div className="p-4 font-semibold">Plan</div>
            <div className="p-4 font-semibold">RAM</div>
            <div className="p-4 font-semibold">vCPU</div>
            <div className="p-4 font-semibold">Storage</div>
            <div className="p-4 text-right font-semibold">Price</div>
          </div>

          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`grid grid-cols-5 items-center text-sm ${
                i !== plans.length - 1 ? "border-b border-black/5" : ""
              } hover:bg-black/[0.02] transition`}
            >
              <div className="p-4 font-medium">{plan.name}</div>
              <div className="p-4 text-gray-600">{plan.ram}</div>
              <div className="p-4 text-gray-600">{plan.cpu}</div>
              <div className="p-4 text-gray-600">{plan.storage}</div>
              <div className="p-4 text-right">
                <span className="font-medium">{plan.price}</span>
                <span className="text-gray-500 text-xs"> /mo</span>
              </div>
            </div>
          ))}

        </div>

        <div className="mt-8 flex justify-end">
          <button className="text-sm text-gray-600 hover:text-black transition">
            Launch instance →
          </button>
        </div>

      </section>

    </main>
  );
}
