"use client";

import { motion, useScroll } from "framer-motion";

// Barra de progreso de scroll de toda la página (no solo del hero), fija en
// la esquina superior derecha. scaleY + origin-top evita relayout: solo anima
// un transform.
export function ScrollIndicator() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed top-24 right-6 z-50 h-24 w-0.5 bg-zinc-400/20 dark:bg-zinc-500/20">
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="h-full w-full origin-top bg-red-500"
      />
    </div>
  );
}
