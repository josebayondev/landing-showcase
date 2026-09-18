import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

// Los títulos de sección comparten tamaño y peso con el nombre del hero, pero
// el h1 del documento es solo ese: aquí siempre h2, para que el árbol de
// encabezados tenga un único nivel 1 y las secciones cuelguen de él.
export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <h2
      className={`text-[clamp(2.75rem,9vw,8rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </h2>
  );
}
