"use client";

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "Features", href: "/features" },
  { label: "Security", href: "/security" },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="w-full bg-white border-b border-black/5 relative z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" onClick={() => setMobileOpen(false)}>
            <img
              src="/logo.webp"
              alt="Stypz logo"
              className="h-7 w-7 transition-transform duration-200 group-hover:scale-105"
            />
            <span className="text-lg font-semibold tracking-tight text-black">
              Stypz
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-black transition">
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT CTA */}
          <div className="hidden md:flex items-center">
            {session ? (
              <Link
                href="/portal"
                className="px-4 py-2 rounded-lg bg-black text-sm font-medium text-white hover:bg-black/90 transition"
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-4 py-2 rounded-lg border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition"
              >
                Login
              </button>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 -mr-1 rounded-lg hover:bg-black/5 text-gray-700 transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </nav>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`
          fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col
          transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <img src="/logo.webp" alt="Stypz" className="h-7 w-7" />
            <span className="text-lg font-semibold tracking-tight text-black">Stypz</span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg hover:bg-black/5 text-gray-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-6 py-6 border-t border-black/5">
          {session ? (
            <Link
              href="/portal"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl bg-black text-sm font-medium text-white hover:bg-black/90 transition"
            >
              Dashboard
            </Link>
          ) : (
            <button
              onClick={() => { setMobileOpen(false); signIn(); }}
              className="w-full px-4 py-3 rounded-xl border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}
