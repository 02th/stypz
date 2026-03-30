import { getSession } from "next-auth/react";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

/**
 * Get auth headers for API requests
 * Includes the access token from the current session
 */
async function getAuthHeaders(): Promise<HeadersInit> {
  const session = await getSession();
  const accessToken = (session?.user as any)?.accessToken;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }
  
  return headers;
}

/**
 * Client-side API helper that uses session token
 */
export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const authHeaders = await getAuthHeaders();
  
  return fetch(url, {
    ...options,
    headers: {
      ...authHeaders,
      ...(options.headers || {}),
    },
    cache: "no-store",
  });
}

export const api = {
  getUser: async () => {
    const res = await fetchWithAuth(`${API_BASE}/user/me`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  },
  
  getBilling: async () => {
    const res = await fetchWithAuth(`${API_BASE}/billing`);
    if (!res.ok) throw new Error("Failed to fetch billing");
    return res.json();
  },

  getInvoices: async () => {
    const res = await fetchWithAuth(`${API_BASE}/billing/invoices`);
    if (!res.ok) throw new Error("Failed to fetch invoices");
    return res.json();
  },
  
  getBudget: async () => {
    const res = await fetchWithAuth(`${API_BASE}/budget`);
    if (!res.ok) throw new Error("Failed to fetch budget");
    return res.json();
  },
  
  getServices: async () => {
    const res = await fetchWithAuth(`${API_BASE}/services`);
    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
  },
  
  getApiKeys: async () => {
    const res = await fetchWithAuth(`${API_BASE}/api-keys`);
    if (!res.ok) throw new Error("Failed to fetch API keys");
    return res.json();
  },

  createApiKey: async (name: string) => {
    const res = await fetchWithAuth(`${API_BASE}/api-keys`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Failed to create API key");
    return res.json();
  },
  
  revokeApiKey: async (id: number) => {
    const res = await fetchWithAuth(`${API_BASE}/api-keys/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to revoke API key");
  },
  
  getInstances: async () => {
    const res = await fetchWithAuth(`${API_BASE}/instances`);
    if (!res.ok) throw new Error("Failed to fetch instances");
    return res.json();
  },

  createInstance: async (data: { name: string, region: string, plan: string }) => {
    const res = await fetchWithAuth(`${API_BASE}/instances`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create instance");
    return res.json();
  },

  updateInstanceStatus: async (id: number, status: string) => {
    const res = await fetchWithAuth(`${API_BASE}/instances/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update status");
    return res.json();
  },

  deleteInstance: async (id: number) => {
    const res = await fetchWithAuth(`${API_BASE}/instances/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete instance");
  },
};
