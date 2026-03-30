"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Server, Play, Square, RefreshCw, Trash2, Plus, Globe } from "lucide-react";

export default function Servers() {
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRegion, setNewRegion] = useState("US");
  const [newPlan, setNewPlan] = useState("Starter");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function loadServers() {
      try {
        const data = await api.getInstances();
        setServers(data);
      } catch (err) {
        console.error("Failed to load instances:", err);
      } finally {
        setLoading(false);
      }
    }
    loadServers();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      setServers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status } : s))
      );
      const updated = await api.updateInstanceStatus(id, status);
      setServers((prev) =>
        prev.map((s) => (s.id === id ? updated : s))
      );
    } catch (err) {
      console.error("Failed to update status", err);
      const data = await api.getInstances();
      setServers(data);
    }
  };

  const createServer = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const newInstance = await api.createInstance({
        name: newName.trim(),
        region: newRegion,
        plan: newPlan,
      });
      setServers((prev) => [...prev, newInstance]);
      setShowModal(false);
      setNewName("");
    } catch (err) {
      console.error("Failed to create instance:", err);
    } finally {
      setCreating(false);
    }
  };

  const deleteServer = async (id: number) => {
    if (!window.confirm("Are you sure you want to destroy this instance? This action is irreversible.")) return;
    try {
      setServers((prev) => prev.filter((s) => s.id !== id));
      await api.deleteInstance(id);
    } catch (err) {
      console.error("Failed to delete instance:", err);
      const data = await api.getInstances();
      setServers(data);
    }
  };

  const StatusBadge = ({ status }: { status: string }) => (
    <div className="flex items-center gap-2">
      {status === "running" && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      )}
      {status === "stopped" && <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />}
      {status === "restarting" && <RefreshCw size={12} className="animate-spin text-amber-500 shrink-0" />}
      <span className={`text-xs font-bold uppercase tracking-wider ${
        status === "running" ? "text-emerald-600" :
        status === "restarting" ? "text-amber-600" :
        "text-slate-500"
      }`}>
        {status}
      </span>
    </div>
  );

  const ActionButtons = ({ server }: { server: any }) => (
    <div className="flex items-center gap-1">
      {server.status === "running" ? (
        <button onClick={() => updateStatus(server.id, "stopped")} className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Stop">
          <Square fill="currentColor" size={14} />
        </button>
      ) : server.status === "stopped" ? (
        <button onClick={() => updateStatus(server.id, "running")} className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Start">
          <Play fill="currentColor" size={14} />
        </button>
      ) : null}
      <button
        onClick={() => { updateStatus(server.id, "restarting"); setTimeout(() => updateStatus(server.id, "running"), 3000); }}
        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Restart"
      >
        <RefreshCw size={14} />
      </button>
      <div className="w-px h-4 bg-slate-200 mx-0.5" />
      <button onClick={() => deleteServer(server.id)} className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Destroy">
        <Trash2 size={14} />
      </button>
    </div>
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <Server size={24} className="text-blue-500 shrink-0" /> My Instances
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Provision, manage, and scale your infrastructure.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-tr from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
        >
          <Plus size={16} />
          Create Instance
        </button>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowModal(false)}>
          <div
            className="bg-white/95 backdrop-blur-2xl border border-white/80 shadow-2xl rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 w-full sm:max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-slate-900 mb-6">Provision New Instance</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Instance Name</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="my-app"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Region</label>
                <select
                  value={newRegion}
                  onChange={(e) => setNewRegion(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all cursor-pointer"
                >
                  <option value="US">🇺🇸 US — us1.stypz.me (Proxmox)</option>
                  <option value="UK">🇬🇧 UK — uk1.stypz.me (Incus)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Plan</label>
                <select
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all cursor-pointer"
                >
                  <option value="Starter">Starter — 1 vCPU · 512MB RAM</option>
                  <option value="Pro">Pro — 2 vCPU · 2GB RAM</option>
                  <option value="Enterprise">Enterprise — 4 vCPU · 4GB RAM</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createServer}
                disabled={creating || !newName.trim()}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {creating ? <RefreshCw className="animate-spin" size={16} /> : <Plus size={16} />}
                {creating ? "Provisioning..." : "Deploy"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="premium-card overflow-hidden">
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
            <RefreshCw size={24} className="animate-spin text-blue-500" />
            <span className="text-sm font-medium">Resolving state...</span>
          </div>
        ) : servers.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-3 text-slate-400">
            <Server size={32} className="opacity-50" />
            <span className="text-sm font-medium">No active instances. Spin one up.</span>
          </div>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 uppercase text-[11px] tracking-wider font-semibold">
                  <tr>
                    <th className="px-6 py-4">Instance</th>
                    <th className="px-6 py-4">Hostname</th>
                    <th className="px-6 py-4">Region</th>
                    <th className="px-6 py-4">Plan</th>
                    <th className="px-6 py-4">State</th>
                    <th className="px-6 py-4">IP</th>
                    <th className="px-6 py-4 text-right">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50">
                  {servers.map((server) => (
                    <tr key={server.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{server.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Globe size={14} className="text-blue-400" />
                          <span className="font-mono text-xs text-blue-600 font-semibold">{server.hostname || "—"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        <span className="text-sm">{server.region === "US" ? "🇺🇸 US" : "🇬🇧 UK"}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">{server.plan}</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={server.status} />
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">{server.ip}</td>
                      <td className="px-6 py-4 text-right">
                        <ActionButtons server={server} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden divide-y divide-slate-100">
              {servers.map((server) => (
                <div key={server.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-slate-800">{server.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{server.plan} · {server.region === "US" ? "🇺🇸 US" : "🇬🇧 UK"}</div>
                    </div>
                    <StatusBadge status={server.status} />
                  </div>

                  {server.hostname && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-blue-600 font-semibold">
                      <Globe size={12} className="text-blue-400" />
                      {server.hostname}
                    </div>
                  )}

                  {server.ip && (
                    <div className="text-xs font-mono text-slate-400">{server.ip}</div>
                  )}

                  <div className="flex items-center justify-end pt-1">
                    <ActionButtons server={server} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
