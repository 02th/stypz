"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Key, Copy, Eye, Plus, Trash2, ShieldAlert } from "lucide-react";

export default function API() {
  const [keys, setKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    async function loadKeys() {
      try {
        const data = await api.getApiKeys();
        setKeys(data);
      } catch (err) {
        console.error("Failed to load api keys:", err);
      } finally {
        setLoading(false);
      }
    }
    loadKeys();
  }, []);

  const revokeKey = async (id: number) => {
    if (!window.confirm("Revoking this key will immediately break any apps using it. Are you certain?")) return;
    try {
      setKeys((prev) => prev.filter((k) => k.id !== id));
      await api.revokeApiKey(id);
    } catch (err) {
      console.error("Failed to revoke api key", err);
      const data = await api.getApiKeys();
      setKeys(data);
    }
  };

  const createKey = async () => {
    setCreating(true);
    try {
      const newKey = await api.createApiKey(`stypz-key-${Date.now().toString().slice(-5)}`);
      setKeys((prev) => [...prev, newKey]);
    } catch (err) {
      console.error("Failed to create api key:", err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <Key size={24} className="text-amber-500 shrink-0" /> Platform API
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Programmatically provision and manage your infrastructure.
          </p>
        </div>

        <button 
          onClick={createKey}
          disabled={creating}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-black/20 hover:-translate-y-0.5 transition-all disabled:opacity-50"
        >
          <Plus size={16} />
          {creating ? "Generating..." : "Generate New Key"}
        </button>
      </div>

      <div className="premium-card p-6 border-t-4 border-t-amber-400 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <ShieldAlert size={120} />
        </div>
        <h2 className="font-bold text-lg text-slate-800 mb-6 relative z-10 flex items-center gap-2">
           Active API Keys
        </h2>

        {loading ? (
          <div className="text-sm font-medium text-slate-400 py-4 flex items-center gap-2 justify-center">
            <span className="animate-spin w-4 h-4 rounded-full border-2 border-slate-300 border-t-amber-500" />
            Loading API keys...
          </div>
        ) : keys.length === 0 ? (
          <div className="text-sm text-slate-500 py-4 font-medium text-center italic relative z-10">No active API keys found. Build something awesome!</div>
        ) : (
          <div className="space-y-3 relative z-10">
            {keys.map((key) => (
              <div key={key.id} className="group flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white/60 border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-slate-800 flex items-center gap-2">
                    {key.name}
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] uppercase font-bold tracking-widest border border-emerald-100">Live</span>
                  </span>
                  
                  <div className="flex items-center gap-2 mt-2 min-w-0">
                    <code className="bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono border border-slate-200/60 select-all truncate max-w-[200px] sm:max-w-none">
                      {key.key}
                    </code>
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200/60 rounded-lg transition-colors cursor-pointer" title="Copy">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                   <div className="text-xs text-slate-400 font-medium">
                      Created {key.created_at}
                   </div>
                   <button 
                     onClick={() => revokeKey(key.id)}
                     className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-all"
                   >
                     <Trash2 size={14} />
                     Revoke
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
