"use client";

import { Menu, Search, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

interface TopbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topbar({ setOpen }: TopbarProps) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="h-16 bg-white/60 backdrop-blur-xl border-b border-white/80 shadow-sm flex items-center justify-between px-3 sm:px-6 shrink-0 z-20 gap-3">

      {/* LEFT */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          onClick={() => setOpen((prev: boolean) => !prev)}
          className="p-2 rounded-lg hover:bg-black/5 text-slate-600 transition shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        {/* Search bar — shrinks on small screens */}
        <div className="hidden sm:flex items-center bg-white/80 border border-slate-200/50 shadow-inner px-3 py-2 rounded-xl w-48 md:w-72 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
          <Search size={15} className="text-slate-400 mr-2 shrink-0" />
          <input
            placeholder="Search resources..."
            className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400 font-medium min-w-0"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          onClick={() => router.push("/portal/instances")}
          className="font-semibold text-sm text-slate-700 hover:text-blue-600 transition-colors hidden md:block whitespace-nowrap"
        >
          My Instances
        </button>

        <div className="h-5 w-px bg-slate-200 hidden md:block" />

        <select className="px-2 sm:px-3 py-1.5 focus:ring-2 ring-blue-100 outline-none rounded-lg border border-slate-200 bg-white/80 text-xs sm:text-sm font-medium text-slate-700 hover:border-slate-300 transition-all cursor-pointer max-w-[120px] sm:max-w-none">
          <option>US — NYC</option>
          <option>UK — London</option>
        </select>

        <button
          onClick={() => signOut()}
          className="flex items-center justify-center p-2 rounded-xl bg-white border border-slate-100 shadow-sm text-slate-500 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all shrink-0"
          title="Sign out"
        >
          <LogOut size={18} strokeWidth={2.5} />
        </button>
      </div>

    </div>
  );
}
