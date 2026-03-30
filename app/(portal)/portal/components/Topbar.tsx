"use client";

import { Menu, Search, LogOut, User as UserIcon, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

interface TopbarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topbar({ setOpen }: TopbarProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userInitial = session?.user?.name?.charAt(0).toUpperCase() || "U";
  const userEmail = session?.user?.email || "";
  const userName = session?.user?.name || "User";

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

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all shrink-0"
            title="User menu"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
              {userInitial}
            </div>
            <span className="text-sm font-semibold text-slate-700 hidden sm:block max-w-[100px] truncate">
              {userName}
            </span>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {/* User Info */}
                <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
                      {userInitial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900 text-sm truncate">{userName}</p>
                      <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      router.push("/portal");
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Shield size={16} className="text-slate-400" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      router.push("/portal/billing");
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <UserIcon size={16} className="text-slate-400" />
                    Account Settings
                  </button>
                </div>

                {/* Sign Out */}
                <div className="py-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/login" });
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
