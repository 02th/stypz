"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Server, CreditCard, Activity, Key, X } from "lucide-react";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const links = [
  { name: "Overview", href: "/portal", icon: LayoutDashboard },
  { name: "Instances", href: "/portal/instances", icon: Server },
  { name: "Services", href: "/portal/services", icon: Activity },
  { name: "Billing", href: "/portal/billing", icon: CreditCard },
  { name: "Budget", href: "/portal/budget", icon: Activity },
  { name: "API", href: "/portal/api", icon: Key },
];

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* OVERLAY (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed md:relative md:flex md:flex-col
          top-0 left-0 z-50 shrink-0
          h-full w-64
          bg-white/80 backdrop-blur-2xl border-r border-white/80 shadow-[4px_0_24px_rgba(0,0,0,0.04)]
          transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="px-6 flex items-center justify-between h-16 border-b border-slate-100/60 shrink-0 safe-top">
          <Link href="/portal" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight text-slate-900 flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/20" />
              Stypz
            </span>
          </Link>
          {/* Close button — visible on mobile only */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col px-4 gap-1.5 py-4 overflow-y-auto" role="menubar">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Menu
          </div>
          {links.map((link) => {
            const active = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/portal");
            const isDashboard = pathname === "/portal" && link.href === "/portal";
            const actuallyActive = active || isDashboard;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                role="menuitem"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  actuallyActive
                    ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.05)] text-blue-600 ring-1 ring-black/5"
                    : "text-slate-600 hover:bg-slate-100/50 hover:text-slate-900"
                }`}
              >
                <link.icon
                  size={18}
                  className={`transition-colors shrink-0 ${
                    actuallyActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span className="truncate">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer - Safe area for mobile */}
        <div className="safe-bottom" />
      </aside>
    </>
  );
}
