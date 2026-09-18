"use client";

import { motion } from "framer-motion";

const BADGES = [
  { label: "Available for work", dot: true, delay: 1.6 },
  { label: "Madrid, Spain", dot: false, delay: 1.75 },
];

// Curva "expo out": arranque rápido, llegada muy suave. Se usa en el rol y
// los badges para que se sientan como la misma coreografía que el nombre.
const ENTRANCE_EASE = [0.16, 1, 0.3, 1] as const;

// Curva más gradual que ENTRANCE_EASE (menos arranque brusco) para el
// nombre: es lo primero que ve el usuario y pedía una entrada más lenta y
// suave que el resto de la secuencia.
const NAME_EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-6rem)] flex-col items-start justify-center gap-4 px-6 text-left sm:px-12"
    >
      {/* El nombre entra primero: "Jose Ignacio" cae desde arriba, "Bayón"
          sube desde abajo, casi a la vez, despacio (1.8s). El resto del hero
          entra a los 1.6s, un poco antes de que el nombre termine de
          asentarse del todo (2s), para que la espera no se note tanto. */}
      <motion.p
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.6, ease: ENTRANCE_EASE }}
        className="font-display text-sm font-semibold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400"
      >
        Software Developer
      </motion.p>

      {/* Líneas fijas en vez de text-balance: alineado a la izquierda no
          necesitamos que el navegador decida dónde cortar. */}
      <h1 className="text-[clamp(2.75rem,9vw,7.5rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white">
        <motion.span
          initial={{ opacity: 0, y: -56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0, ease: NAME_EASE }}
          className="block"
        >
          Jose Ignacio
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.2, ease: NAME_EASE }}
          className="block"
        >
          Bay<span className="text-red-500">ó</span>n
        </motion.span>
      </h1>

      <div className="absolute right-6 bottom-6 flex flex-col items-end gap-2">
        {BADGES.map((badge) => (
          <motion.span
            key={badge.label}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: badge.delay, ease: ENTRANCE_EASE }}
            className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-medium tracking-wide text-zinc-600 uppercase dark:border-white/10 dark:text-zinc-400"
          >
            {badge.dot && (
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            )}
            {badge.label}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
