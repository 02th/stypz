"use client";

import { useEffect, useRef, useState } from "react";

export default function FeaturesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const rafId = useRef<number>(0);

  const totalFrames = 286;
  const [frame, setFrame] = useState(1);
  const [progress, setProgress] = useState(0);

  // PRELOAD
  useEffect(() => {
    const load = (i: number) => {
      const img = new Image();
      img.src = `/cpu/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      imageCache.current.set(i, img);
    };

    for (let i = 1; i <= 30; i++) load(i);
    setTimeout(() => {
      for (let i = 31; i <= totalFrames; i++) load(i);
    }, 800);
  }, []);

  // SCROLL → FRAME
  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        const section = document.getElementById("scroll-section");
        if (!section) { rafId.current = 0; return; }

        const scrollTop = window.scrollY;
        const offsetTop = section.offsetTop;
        const height = section.offsetHeight;

        const raw = (scrollTop - offsetTop) / height;
        const clamped = Math.min(1, Math.max(0, raw));
        const eased = clamped * clamped * (3 - 2 * clamped);

        setProgress(eased);
        setFrame(Math.floor(eased * (totalFrames - 1)) + 1);
        rafId.current = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // DRAW FRAME
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cached = imageCache.current.get(frame);

    const draw = (img: HTMLImageElement) => {
      const scale = Math.min(
        window.innerWidth / img.width,
        window.innerHeight / img.height
      );
      const width = img.width * scale;
      const height = img.height * scale;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.85;
      ctx.drawImage(
        img,
        (canvas.width - width) / 2,
        (canvas.height - height) / 2,
        width,
        height
      );
    };

    if (cached && cached.complete) {
      draw(cached);
    } else {
      const img = new Image();
      img.src = `/cpu/ezgif-frame-${String(frame).padStart(3, "0")}.jpg`;
      img.onload = () => {
        imageCache.current.set(frame, img);
        draw(img);
      };
    }
  }, [frame]);

  const getText = () => {
    if (progress < 0.25) return { title: "Stypz", desc: "Power infrastructure" };
    if (progress < 0.5) return { title: "99.9% uptime", desc: "Stypz offers great uptime" };
    if (progress < 0.75) return { title: "Plug and Play", desc: "Deploy in seconds" };
    return { title: "Precision Compute", desc: "Optimized at every layer" };
  };

  const text = getText();

  return (
    <main className="w-full bg-black text-white">

      {/* SCROLL EXPERIENCE */}
      <section id="scroll-section" className="relative h-[300vh] w-full">
        <div className="sticky top-0 w-full flex items-center justify-center overflow-hidden" style={{ height: "100dvh", minHeight: "100vh" }}>

          {/* CANVAS */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* TEXT OVERLAY */}
          <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-2xl mx-auto -mt-24 sm:-mt-32">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
              {text.title}
            </h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400">
              {text.desc}
            </p>
          </div>

        </div>
      </section>

      {/* AFTER SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Built beyond expectations
        </h2>
        <p className="mt-6 text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
          Stypz delivers high-performance compute with a simplified experience.
          Every layer is engineered for precision, reliability, and speed —
          giving you infrastructure that simply works.
        </p>
      </section>

    </main>
  );
}
