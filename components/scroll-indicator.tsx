"use client";

import { useEffect, useRef } from "react";

// Barra de progreso de scroll de toda la página, fija en la esquina superior
// derecha. Escribe el progreso en una custom property y anima solo un
// transform (scaleY + origin-top), así que no provoca relayout.
//
// Oculta por debajo de sm: en móvil se cruzaba con los títulos de sección y
// con los badges del hero. Decorativa, por eso aria-hidden.
export function ScrollIndicator() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.setProperty("--scroll-progress", String(progress));
    };

    // rAF para no recalcular en cada evento de scroll, que llega muchas veces
    // por frame.
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-24 right-6 z-50 hidden h-24 w-0.5 bg-zinc-400/20 sm:block dark:bg-zinc-500/20"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-top bg-red-500"
        style={{ transform: "scaleY(var(--scroll-progress, 0))" }}
      />
    </div>
  );
}
