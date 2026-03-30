"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { CreditCard, FileText, Banknote, Wallet, Loader2, ExternalLink } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Billing() {
  const [billing, setBilling] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [depositAmount, setDepositAmount] = useState("10");
  const [depositing, setDepositing] = useState(false);
  const [payLink, setPayLink] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [b, inv] = await Promise.all([api.getBilling(), api.getInvoices()]);
        setBilling(b);
        setInvoices(inv);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleDeposit = async () => {
    setDepositing(true);
    try {
      const res = await fetch(`${API_URL}/payments/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(depositAmount), currency: "USDT" }),
      });
      const data = await res.json();
      if (data.pay_link) setPayLink(data.pay_link);
    } catch (err) {
      console.error("Deposit error:", err);
    } finally {
      setDepositing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 gap-2">
        <Loader2 size={20} className="animate-spin" /> Loading billing...
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <CreditCard size={24} className="text-indigo-500 shrink-0" /> Billing Center
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Invoices, payment sources, and current charges.
        </p>
      </div>

      {/* Top cards — 1 col → 2 col → 3 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Payment Method Card */}
        {billing && (
          <div className="premium-card p-5 sm:p-6 flex flex-col justify-between bg-gradient-to-b from-white to-slate-50/50">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h2 className="font-semibold text-slate-800 text-sm sm:text-base">Payment Method</h2>
                {billing.payment_method?.type && (
                  <div className="w-10 h-6 bg-slate-900 rounded flex items-center justify-center text-[10px] font-bold text-white tracking-widest px-1 shrink-0">
                    {billing.payment_method.type}
                  </div>
                )}
              </div>
              {billing.payment_method?.last4 ? (
                <div className="mt-4 sm:mt-8 flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-xl text-slate-600 border border-slate-200 shadow-sm shrink-0">
                    <CreditCard size={22} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-base sm:text-lg font-mono font-bold tracking-widest text-slate-800">
                      •••• •••• {billing.payment_method.last4}
                    </div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5 uppercase tracking-wide">
                      Expires {billing.payment_method.expires}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic mt-4">No payment method added yet.</p>
              )}
            </div>
            <button className="mt-6 sm:mt-8 text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100/50 py-2.5 rounded-xl border border-indigo-100 transition-colors w-full text-center">
              Update Method
            </button>
          </div>
        )}

        {/* OxaPay Deposit Card */}
        <div className="premium-card p-5 sm:p-6 flex flex-col justify-between border-t-4 border-t-emerald-400">
          <div>
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-3 sm:mb-4 text-sm sm:text-base">
              <Wallet size={18} className="text-emerald-500 shrink-0" /> Add Funds (Crypto)
            </h2>
            <p className="text-sm font-medium text-slate-500 mb-4">
              Deposit via OxaPay — supports USDT, BTC, ETH, and more.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold text-slate-600 shrink-0">$</span>
              <input
                type="number"
                min="1"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="flex-1 px-3 sm:px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 transition-all min-w-0"
              />
              <span className="text-xs font-semibold text-slate-400 shrink-0">USDT</span>
            </div>

            {payLink && (
              <a
                href={payLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-xl py-2.5 hover:bg-emerald-100 transition-colors"
              >
                <ExternalLink size={14} /> Open Payment Link
              </a>
            )}
          </div>

          <button
            onClick={handleDeposit}
            disabled={depositing || !depositAmount}
            className="mt-5 sm:mt-6 w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all disabled:opacity-50"
          >
            {depositing ? <Loader2 size={16} className="animate-spin" /> : <Wallet size={16} />}
            {depositing ? "Generating invoice..." : "Deposit Funds"}
          </button>
        </div>

        {/* Billing Address */}
        {billing && (
          <div className="premium-card p-5 sm:p-6 flex flex-col justify-between group sm:col-span-2 lg:col-span-1">
            <div>
              <h2 className="font-semibold text-slate-800 flex items-center gap-2 mb-4 text-sm sm:text-base">
                <FileText size={18} className="text-blue-500 shrink-0" /> Billing Address
              </h2>
              <div className="text-sm font-medium text-slate-600 space-y-1.5 p-4 bg-slate-50/50 rounded-xl border border-slate-100 shadow-inner group-hover:bg-slate-100 transition-colors">
                <p className="font-bold text-slate-800">{billing.address?.name || "—"}</p>
                <p>{billing.address?.city}{billing.address?.state ? `, ${billing.address.state}` : ""}</p>
                <p className="uppercase tracking-widest text-xs">{billing.address?.country}</p>
              </div>
            </div>
            <button className="mt-6 sm:mt-8 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:underline text-left">
              Edit Address Details
            </button>
          </div>
        )}
      </div>

      {/* Invoices */}
      <div className="premium-card">
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-white/50 rounded-t-2xl">
          <div>
            <h2 className="font-semibold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
              <Banknote size={18} className="text-emerald-500 shrink-0" /> Past Invoices
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Monthly invoices generated after billing cycles.</p>
          </div>
        </div>

        {invoices.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-2 text-slate-400">
            <FileText size={32} className="opacity-50" />
            <span className="text-sm font-medium">No past invoices found.</span>
          </div>
        ) : (
          <div className="divide-y divide-slate-100/50">
            {invoices.map((invoice: any) => (
              <div key={invoice.id} className="flex justify-between items-center py-4 px-4 sm:px-6 hover:bg-slate-50 transition-colors gap-3">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center font-bold font-mono text-xs border border-indigo-100/50 shadow-sm shrink-0">
                    {invoice.date ? new Date(invoice.date).toLocaleString("default", { month: "short" }) : "—"}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-bold text-slate-800">Invoice #{invoice.id.toString().padStart(5, "0")}</span>
                    <span className="text-xs font-semibold text-slate-500 truncate">{invoice.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  <div className="text-sm sm:text-base font-black tracking-tight text-slate-900">
                    ${invoice.amount.toFixed(2)}
                  </div>
                  <div className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-sm hidden sm:block">
                    {invoice.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
