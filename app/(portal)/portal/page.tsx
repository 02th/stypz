"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Activity, CreditCard, Cpu, Server, Loader2, Plus, RefreshCw } from "lucide-react";

export default function PortalHome() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [billingData, setBillingData] = useState<any>(null);
  const [instances, setInstances] = useState<any[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/portal");
      return;
    }

    if (status === "authenticated" && session?.user) {
      // Fetch data client-side
      const fetchData = async () => {
        try {
          const token = (session.user as any).accessToken;
          const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

          const [userRes, billingRes, instancesRes] = await Promise.all([
            fetch(`${apiBase}/user/me`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${apiBase}/billing`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            fetch(`${apiBase}/instances`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          if (userRes.ok) setUserData(await userRes.json());
          if (billingRes.ok) setBillingData(await billingRes.json());
          if (instancesRes.ok) setInstances(await instancesRes.json());
        } catch (error) {
          console.error("Error fetching portal data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [status, session, router]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 size={48} className="animate-spin text-blue-500 mx-auto" />
          <p className="text-slate-500 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const user = userData || { name: session?.user?.name || "User" };
  const billing = billingData || { current_cycle_amount: 0 };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">{user.name}</span>
          </h1>
          <p className="text-sm font-medium text-slate-500">
            Here&apos;s an overview of your Stypz infrastructure.
          </p>
        </div>
        <button
          onClick={() => router.push("/portal/instances")}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
        >
          <Plus size={18} />
          New Instance
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* USAGE GRAPH */}
        <div className="premium-card p-5 sm:p-6 flex flex-col group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2 text-sm sm:text-base">
            <Cpu size={18} className="text-blue-500 shrink-0" /> Global Compute Usage
          </h2>
          <div className="h-36 sm:h-44 bg-slate-50 border border-slate-100/50 rounded-xl flex items-end justify-center px-4 pb-0 relative overflow-hidden shadow-inner">
            <div className="absolute bottom-0 w-full h-[60%] bg-gradient-to-t from-blue-100/50 to-transparent flex items-end justify-around px-4">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="w-6 sm:w-8 bg-blue-500 rounded-t-sm opacity-20" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-slate-400">
            Avg CPU 42% · RAM 2.4 GB · Storage 45GB
          </div>
        </div>

        {/* COST & BILLING */}
        <div className="premium-card p-5 sm:p-6 flex flex-col justify-between group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2 text-sm sm:text-base">
            <CreditCard size={18} className="text-indigo-500 shrink-0" /> Current Billing Cycle
          </h2>
          <div>
            <div className="text-4xl sm:text-5xl font-bold tracking-tighter text-slate-900 mt-2">
              ${billing.current_cycle_amount?.toFixed(2) || "0.00"}
            </div>
            <p className="text-sm font-medium text-slate-500 mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" /> Projected: ${(billing.current_cycle_amount + 2.4 || 2.4).toFixed(2)}
            </p>
          </div>
          <button 
            onClick={() => router.push("/portal/billing")}
            className="mt-6 sm:mt-8 text-sm font-semibold text-indigo-600 self-start group-hover:underline px-4 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            View detailed invoice
          </button>
        </div>

        {/* API USAGE */}
        <div className="premium-card p-5 sm:p-6 flex flex-col group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2 text-sm sm:text-base">
            <Activity size={18} className="text-cyan-500 shrink-0" /> Overall API Requests
          </h2>
          <div className="h-36 sm:h-44 bg-slate-50 border border-slate-100/50 rounded-xl relative overflow-hidden shadow-inner flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse" />
            <div className="text-3xl sm:text-4xl font-bold text-slate-300">24.5k</div>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-400">
            99.99% success rate · 42ms p99 latency
          </p>
        </div>

        {/* APPLICATIONS */}
        <div className="premium-card p-5 sm:p-6 flex flex-col group relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
              <Server size={18} className="text-emerald-500 shrink-0" /> Active Applications
            </h2>
            <button
              onClick={() => setInstances([...instances])}
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          <div className="space-y-2 sm:space-y-3 flex-1 overflow-y-auto pr-1 max-h-48">
            {instances.length === 0 ? (
              <div className="text-center py-8">
                <Server size={40} className="text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 text-sm font-medium italic">No applications running.</p>
                <button
                  onClick={() => router.push("/portal/instances")}
                  className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
                >
                  Deploy your first instance →
                </button>
              </div>
            ) : (
              instances.map((instance: any) => (
                <div key={instance.id} className="flex justify-between items-center p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-white/50 transition-colors cursor-pointer group/item">
                  <span className="font-semibold text-sm text-slate-700 group-hover/item:text-blue-600 transition-colors truncate mr-2">{instance.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    {instance.status === "running" && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                    )}
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      instance.status === "running" ? "text-emerald-600" : "text-slate-400"
                    }`}>
                      {instance.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
