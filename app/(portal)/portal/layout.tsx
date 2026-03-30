"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // Open sidebar by default on desktop
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setOpen(true);
    }
  }, []);

  return (
    // Use dvh (dynamic viewport height) to handle mobile browser chrome,
    // fall back to 100vh for browsers that don't support it
    <div
      className="flex bg-slate-50 text-slate-900 relative overflow-hidden"
      style={{ height: "100dvh", minHeight: "100vh" }}
    >
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col z-10 overflow-hidden min-w-0">
        <Topbar setOpen={setOpen} />

        <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
