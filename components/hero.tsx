const BADGES = [
  { label: "Available for work", dot: true, delay: "0.72s" },
  { label: "Madrid, Spain", dot: false, delay: "0.8s" },
];

// Server component: la entrada es CSS (clases .enter de globals.css), no hay
// estado ni animación en JavaScript, así que no necesita "use client".
//
// El nombre arranca ya (0.8s, una línea desde arriba y otra desde abajo) y el
// resto entra cuando esa animación está terminando, escalonado cada ~100ms:
// rol 0.5s, bio 0.62s y badges 0.72s / 0.8s, con lo que la secuencia cierra
// sobre 1.3s. Antes el nombre tardaba 1.8s y los badges esperaban a 1.75s, y
// la página no terminaba de "llegar" hasta los 2.3s.
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-6rem)] flex-col items-start justify-center gap-4 px-6 pt-32 text-left sm:px-12"
    >
      <p
        className="enter enter-left font-display text-sm font-semibold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400"
        style={{ animationDelay: "0.5s" }}
      >
        Software Developer
      </p>

      {/* Líneas fijas en vez de text-balance: alineado a la izquierda no
          necesitamos que el navegador decida dónde cortar. */}
      <h1 className="text-[clamp(2.75rem,9vw,8rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white">
        <span className="enter enter-down enter-name block">Jose Ignacio</span>
        <span
          className="enter enter-up enter-name block"
          style={{ animationDelay: "0.08s" }}
        >
          Bay<span className="text-red-500">ó</span>n
        </span>
      </h1>

      <p
        className="enter mt-8 max-w-md font-mono text-sm text-zinc-600 sm:max-w-lg sm:text-base dark:text-zinc-400"
        style={{ animationDelay: "0.62s" }}
      >
        Madrid raised, Murcia based. Tech dev who cares as much about
        pixel-perfect frontend as about backend that scales.
      </p>

      <div className="absolute right-6 bottom-1 flex flex-col items-end gap-2">
        {BADGES.map((badge) => (
          <span
            key={badge.label}
            style={{ animationDelay: badge.delay }}
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
