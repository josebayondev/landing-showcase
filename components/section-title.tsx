import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

// Los títulos de sección comparten peso y proporción con el nombre del hero,
// pero un punto más pequeños (clamp reducido a propósito, no es el mismo
// valor): el h1 del documento es solo ese nombre, así que aquí siempre h2,
// para que el árbol de encabezados tenga un único nivel 1 y las secciones
// cuelguen de él.
//
// `title-scroll` (globals.css) repite en estos títulos el mismo lenguaje de
// escala del nombre del hero: entra un poco grande y se asienta según se
// revela. Va aparte del <Reveal> que envuelve cada SectionTitle en las
// secciones (el fade), así que ambas conviven sin pisarse.
export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={`title-scroll text-[clamp(2.5rem,8.25vw,7.25rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </h2>
  );
}
