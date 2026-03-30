export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8000";

export const api = {
  getUser: async () => {
    const res = await fetch(`${API_BASE}/user/me`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  },
  
  getBilling: async () => {
    const res = await fetch(`${API_BASE}/billing`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch billing");
    return res.json();
  },

  getInvoices: async () => {
    const res = await fetch(`${API_BASE}/billing/invoices`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch invoices");
    return res.json();
  },
  
  getBudget: async () => {
    const res = await fetch(`${API_BASE}/budget`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch budget");
    return res.json();
  },
  
  getServices: async () => {
    const res = await fetch(`${API_BASE}/services`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
  },
  
  getApiKeys: async () => {
    const res = await fetch(`${API_BASE}/api-keys`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch API keys");
    return res.json();
  },

  createApiKey: async (name: string) => {
    const res = await fetch(`${API_BASE}/api-keys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Failed to create API key");
    return res.json();
  },
  
  revokeApiKey: async (id: number) => {
    const res = await fetch(`${API_BASE}/api-keys/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error("Failed to revoke API key");
  },
  
  getInstances: async () => {
    const res = await fetch(`${API_BASE}/instances`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch instances");
    return res.json();
  },

  createInstance: async (data: { name: string, region: string, plan: string }) => {
    const res = await fetch(`${API_BASE}/instances`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create instance");
    return res.json();
  },

  updateInstanceStatus: async (id: number, status: string) => {
    const res = await fetch(`${API_BASE}/instances/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
  },

  deleteInstance: async (id: number) => {
    const res = await fetch(`${API_BASE}/instances/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error("Failed to delete instance");
  },
};
