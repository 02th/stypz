export default function SecurityPage() {
  return (
    <main className="w-full min-h-screen bg-white text-black">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Security
        </h1>

        <p className="mt-6 text-gray-700 leading-relaxed">
          Stypz infrastructure is architected with an emphasis on controlled
          execution, operational predictability, and systemic integrity. Rather
          than relying on superficial safeguards or overstated assurances, the
          platform is designed to maintain stability through deliberate
          constraints, isolation boundaries, and clearly defined usage
          expectations.
        </p>

        <p className="mt-4 text-gray-700 leading-relaxed">
          The objective is not merely to provide compute resources, but to
          sustain an environment in which workloads can operate without
          interference, degradation, or exposure to unnecessary risk vectors.
        </p>

        <h2 className="mt-12 text-xl font-semibold">1. Infrastructure model</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          1.1 All compute instances are provisioned using LXC-based
          virtualization. This model enables lightweight containment while
          preserving near-native performance characteristics across workloads.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          1.2 Each container is instantiated within an isolated execution
          context. Resource boundaries are enforced in a manner that prevents
          cross-instance interference, ensuring that one workload does not
          degrade the performance or stability of another.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          1.3 Networking is facilitated through NAT-based IPv4 allocation. This
          approach intentionally limits direct external exposure while allowing
          efficient routing and controlled ingress/egress behavior.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          1.4 The infrastructure is structured to favor determinism over
          flexibility, prioritizing consistent behavior and predictable
          performance under varying load conditions.
        </p>

        <h2 className="mt-12 text-xl font-semibold">2. Stability and uptime</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          2.1 Systems are continuously monitored to maintain operational
          continuity and minimize service disruption.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          2.2 Performance consistency is treated as a primary metric. Resource
          allocation and scheduling are managed to ensure workloads retain
          expected responsiveness over time.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          2.3 Any deviations from normal operating conditions are handled with
          corrective measures intended to restore equilibrium.
        </p>

        <h2 className="mt-12 text-xl font-semibold">3. Acceptable use</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          3.1 In order to preserve infrastructure integrity and maintain fair
          resource distribution, specific categories of activity are explicitly
          disallowed within the Stypz environment.
        </p>
        <ul className="mt-4 space-y-2 text-gray-700 list-disc pl-5">
          <li>3.1.1 Cryptomining or any form of sustained resource exploitation</li>
          <li>3.1.2 Distributed denial-of-service activity or traffic flooding</li>
          <li>3.1.3 Operation of botnets or large-scale malicious automation systems</li>
          <li>3.1.4 Hosting, distributing, or facilitating illegal content</li>
        </ul>
        <p className="mt-6 text-gray-700 leading-relaxed">
          3.2 These restrictions exist to ensure all users operate within a
          controlled and equitable environment.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          3.3 Violations may result in immediate suspension or termination of
          services without prior notification, where deemed necessary to protect
          system stability.
        </p>

        <h2 className="mt-12 text-xl font-semibold">4. Operational approach</h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          4.1 Security within Stypz is not implemented as an additional feature
          layer, but is instead integrated into the foundational design of the
          infrastructure itself.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          4.2 The platform operates under a philosophy of controlled simplicity,
          where reducing unnecessary complexity directly contributes to lowering
          the overall attack surface.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          4.3 By enforcing clear operational boundaries and maintaining strict
          environmental discipline, the system provides a stable and predictable
          execution space for legitimate workloads.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          4.4 The overarching objective is to sustain an infrastructure layer
          that remains unobtrusive, dependable, and resistant to misuse.
        </p>

      </section>
    </main>
  );
}
