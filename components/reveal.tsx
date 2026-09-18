"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

// Wrapper reutilizable para el scroll reveal de secciones: se anima la primera
// vez que entra en el viewport y se queda así (el observer se desconecta).
//
// La animación vive en globals.css bajo `html.js [data-reveal]`; aquí solo se
// marca `data-revealed`. Así el HTML que llega del servidor no trae opacity 0
// y la página se lee entera aunque el JavaScript no llegue a ejecutarse.
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reveal = () => {
      element.dataset.revealed = "true";
    };

    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }

    // rootMargin negativo en vez de threshold: dispara cuando el bloque ha
    // subido un 20% del viewport, sea cual sea su altura (con threshold, un
    // bloque más alto que la pantalla no llega nunca al porcentaje pedido).
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      { rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
