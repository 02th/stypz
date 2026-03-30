import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Stypz — Modern Infrastructure, Simplified",
    template: "%s | Stypz",
  },
  description:
    "High-performance compute infrastructure. Deploy VPS in seconds with no setup friction.",
  openGraph: {
    title: "Stypz — Modern Infrastructure, Simplified",
    description:
      "High-performance compute infrastructure. Deploy VPS in seconds.",
    siteName: "Stypz",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen selection:bg-blue-100 selection:text-blue-900">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
