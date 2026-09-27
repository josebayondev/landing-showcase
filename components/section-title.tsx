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
// - Por defecto, `TITLE_SETTLE`: entra un poco grande y se asienta según se
//   revela. Va aparte del <Reveal> que envuelve cada SectionTitle en las
//   secciones (el fade), así que ambas conviven sin pisarse.
// - Con `pinReveal`, `.pin-reveal` (styles/animations/scroll.css): mismo patrón de scroll
//   clavado que "Bayón" en el hero (ver components/work.tsx, about.tsx y
//   hero.tsx) — la sección se ancla y el título sube desde abajo mientras se
//   revela. Se sigue envolviendo en <Reveal> igualmente: por sí solo (sin
//   .pin-reveal, que solo actúa dentro de @supports) es el único fallback en
//   navegadores sin animation-timeline.
// Mismo lenguaje que el nombre del hero (con el que comparte tamaño y peso),
// pero al revés —entra grande y se asienta— porque aquí no hay cortina que ya
// lo haya mostrado. cover 0%/55% y no 0%/100%: se asienta a mitad de
// recorrido, mientras todavía está entrando en pantalla, no cuando ya lleva
// rato visible.
const TITLE_SETTLE =
  "scroll-driven:animate-title-settle scroll-driven:timeline-view scroll-driven:range-[cover_0%_cover_55%]";

export function SectionTitle({ children, className, pinReveal }: SectionTitleProps) {
  return (
    <h2
      className={`${pinReveal ? "pin-reveal" : TITLE_SETTLE} text-[clamp(2.5rem,8.25vw,7.25rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </h2>
  );
}
