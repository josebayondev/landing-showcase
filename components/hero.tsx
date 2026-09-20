import type { CSSProperties } from "react";

const BADGES = [
  { label: "Available for work", dot: true, delay: "0.72s" },
  { label: "Madrid, Spain", dot: false, delay: "0.8s" },
];

// Server component: la entrada es CSS (clases .enter de globals.css), no hay
// estado ni animación en JavaScript, así que no necesita "use client".
//
// `hero-scroll` va en la propia sección, no en un wrapper interno: las clases
// .enter están en los descendientes, así que las dos animaciones no compiten
// por el mismo elemento, y envolver los hijos rompería el flex (pasarían a ser
// un solo item) y la posición absoluta de los badges.
//
// El nombre arranca primero (0.8s, una línea desde arriba y otra desde abajo) y
// el resto entra cuando esa animación está terminando, escalonado cada ~100ms:
// rol 0.5s, bio 0.62s y badges 0.72s / 0.8s, con lo que la secuencia cierra
// sobre 1.3s. Antes el nombre tardaba 1.8s y los badges esperaban a 1.75s, y
// la página no terminaba de "llegar" hasta los 2.3s.
//
// Los retardos van en `--enter-delay` y no en `animationDelay`: la regla
// `.enter` los suma a `--enter-offset`, la espera común mientras la cortina de
// carga está delante (globals.css). Con `animationDelay` inline no habría
// forma de sumar las dos cosas.
//
// `hero-line-scroll-1/2` (globals.css) es aparte de todo lo anterior: el
// nombre ya está visible al cargar, esto es solo lo que pasa después, al
// hacer scroll. Cada línea tiene su propio rango sobre el scroll del
// documento, desfasado a propósito, para que "Jose Ignacio" reaccione y se
// vaya antes que "Bayón" en vez de moverse las dos línea a la vez.
export function Hero() {
  return (
    <section
      id="hero"
      className="hero-scroll relative flex min-h-[calc(100dvh-6rem)] flex-col items-start justify-center gap-4 px-6 pt-32 text-left sm:px-12"
    >
      <p
        className="enter enter-left font-display text-sm font-semibold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400"
        style={{ "--enter-delay": "0.5s" } as CSSProperties}
      >
        Software Developer
      </p>

      {/* Líneas fijas en vez de text-balance: alineado a la izquierda no
          necesitamos que el navegador decida dónde cortar. */}
      <h1 className="text-[clamp(2.75rem,9vw,8rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white">
        <span className="enter enter-down enter-name hero-line-scroll-1 block">
          Jose Ignacio
        </span>
        <span
          className="enter enter-up enter-name hero-line-scroll-2 block"
          style={{ "--enter-delay": "0.08s" } as CSSProperties}
        >
          Bay<span className="text-red-500">ó</span>n
        </span>
      </h1>

      <p
        className="enter mt-8 max-w-md font-mono text-sm text-zinc-600 sm:max-w-lg sm:text-base dark:text-zinc-400"
        style={{ "--enter-delay": "0.62s" } as CSSProperties}
      >
        Madrid raised, Murcia based. Tech dev who cares as much about
        pixel-perfect frontend as about backend that scales.
      </p>

      <div className="absolute right-6 bottom-1 flex flex-col items-end gap-2">
        {BADGES.map((badge) => (
          <span
            key={badge.label}
            style={{ "--enter-delay": badge.delay } as CSSProperties}
            className={`enter enter-right flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase dark:border-white/10 ${
              badge.dot
                ? // emerald-600 sobre blanco se queda en 3.77:1, por debajo de
                  // AA para 11px; el 700 sube a 5.1:1 sin cambiar el tono.
                  "text-emerald-700 dark:text-emerald-400"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {badge.dot && (
              <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
            )}
            {badge.label}
          </span>
        ))}
      </div>
    </section>
  );
}
