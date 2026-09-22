import type { CSSProperties } from "react";

const BADGES = [
  { label: "Disponible para trabajar", dot: true, delay: "0.72s" },
  { label: "Madrid, España", dot: false, delay: "0.8s" },
];

// Server component: la entrada es CSS (clases .enter de globals.css), no hay
// estado ni animación en JavaScript, así que no necesita "use client".
//
// `hero-scroll` va en la propia sección, no en el wrapper `.pin-wrapper`: las
// clases .enter están en los descendientes, así que las dos animaciones no
// compiten por el mismo elemento, y envolver los hijos rompería el flex
// (pasarían a ser un solo item) y la posición absoluta de los badges.
//
// El nombre arranca primero (1s, "Jose Ignacio" desde arriba) y el resto
// entra cuando esa animación está terminando, escalonado cada ~100ms: rol
// 0.5s, bio 0.62s y badges 0.72s / 0.8s. "Bayón" es la excepción: no entra al
// cargar, se queda oculto y solo se revela al hacer scroll (ver más abajo).
//
// Los retardos van en `--enter-delay` y no en `animationDelay`: la regla
// `.enter` los suma a `--enter-offset`, la espera común mientras la cortina de
// carga está delante (globals.css). Con `animationDelay` inline no habría
// forma de sumar las dos cosas.
//
// `.pin-wrapper`/`.pin-sticky`/`.pin-reveal` (globals.css, dentro de
// @supports animation-timeline; patrón reutilizable, también lo usan los
// títulos de Proyectos y Sobre mí vía `SectionTitle`) anclan la sección en su
// sitio durante un tramo de scroll extra, para que mientras se revela "Bayón"
// no se mueva nada más. Solo esa línea reacciona al scroll durante ese tramo;
// el resto (Jose Ignacio, rol, bio, badges) se queda fijo. Cuando termina, el
// scroll se libera y toda la sección (incluida ya "Bayón", asentada) se
// desvanece junta al alejarse (`hero-exit`, en globals.css). Fuera del
// @supports (o sin JS, o con prefers-reduced-motion) no hay wrapper ni scroll
// clavado: la página fluye normal y "Bayón" entra en la carga con `enter-up`,
// nunca se queda invisible para siempre.
export function Hero() {
  return (
    <div className="pin-wrapper pin-wrapper--hero">
      <section
        id="hero"
        className="hero-scroll pin-sticky relative flex min-h-[calc(100dvh-6rem)] flex-col items-start justify-center gap-4 px-6 pt-32 text-left sm:px-12"
      >
        <p
          className="enter enter-left font-display text-xs font-semibold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400"
          style={{ "--enter-delay": "0.5s" } as CSSProperties}
        >
          Software Developer
        </p>

        {/* Líneas fijas en vez de text-balance: alineado a la izquierda no
            necesitamos que el navegador decida dónde cortar. */}
        <h1 className="text-[clamp(2.75rem,9vw,8rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white">
          <span className="enter enter-down enter-name block">Jose Ignacio</span>
          <span
            className="enter enter-up enter-name pin-reveal block"
            style={{ "--enter-delay": "0.08s" } as CSSProperties}
          >
            Bay<span className="text-red-500">ó</span>n
          </span>
        </h1>

        <p
          className="enter mt-8 max-w-md font-mono text-xs text-zinc-600 sm:max-w-lg sm:text-sm dark:text-zinc-400"
          style={{ "--enter-delay": "0.62s" } as CSSProperties}
        >
          Entre Madrid y Murcia. Desarrollador centrado en el frontend y el
          diseño UI/UX, con atención al detalle en cada interfaz que
          construyo, también construyo backend y me aseguro que sea sólido,
          cargue rápido y escale sin problemas.
        </p>

        <div className="absolute right-6 bottom-1 flex flex-col items-end gap-2">
          {BADGES.map((badge) => (
            <span
              key={badge.label}
              style={{ "--enter-delay": badge.delay } as CSSProperties}
              className={`enter enter-right flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-[10px] font-medium tracking-wide uppercase dark:border-white/10 ${
                badge.dot
                  ? // emerald-600 sobre blanco se queda en 3.77:1, por debajo
                    // de AA para 11px; el 700 sube a 5.1:1 sin cambiar el tono.
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
    </div>
  );
}
