import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
  pinReveal?: boolean;
};

// Los títulos de sección comparten peso y proporción con el nombre del hero,
// pero un punto más pequeños (clamp reducido a propósito, no es el mismo
// valor): el h1 del documento es solo ese nombre, así que aquí siempre h2,
// para que el árbol de encabezados tenga un único nivel 1 y las secciones
// cuelguen de él.
//
// Dos modos de entrada, mutuamente excluyentes (las dos animan `transform`,
// así que combinarlas en el mismo elemento haría que solo ganase la última):
// - Por defecto, `title-scroll` (globals.css): entra un poco grande y se
//   asienta según se revela. Va aparte del <Reveal> que envuelve cada
//   SectionTitle en las secciones (el fade), así que ambas conviven sin
//   pisarse.
// - Con `pinReveal`, `.pin-reveal` (globals.css): mismo patrón de scroll
//   clavado que "Bayón" en el hero (ver components/work.tsx, about.tsx y
//   hero.tsx) — la sección se ancla y el título sube desde abajo mientras se
//   revela. Se sigue envolviendo en <Reveal> igualmente: por sí solo (sin
//   .pin-reveal, que solo actúa dentro de @supports) es el único fallback en
//   navegadores sin animation-timeline.
export function SectionTitle({ children, className, pinReveal }: SectionTitleProps) {
  return (
    <h2
      className={`${pinReveal ? "pin-reveal" : "title-scroll"} text-[clamp(2.5rem,8.25vw,7.25rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </h2>
  );
}
