import { Fragment } from "react";

type ScrollTextProps = {
  text: string;
  className?: string;
};

// Reparte un párrafo en palabras para que se enciendan con el scroll.
//
// No hay cliente ni retardos calculados: cada <span> tiene su propia view
// timeline (utilidades `scroll-driven:*:` sobre el <p>, que aplican a cada
// hijo), así que cada palabra se ilumina según su posición en la página. Las de una
// misma línea comparten altura y entran juntas, con lo que el efecto se lee
// línea a línea conforme el párrafo sube por la pantalla.
//
// El span va inline-block para tener caja propia sobre la que medir; el espacio
// se queda fuera, como nodo de texto, para que la frase siga partiendo por
// donde le toque al ancho disponible.
//
// 0.2 y no 0: la palabra que todavía no ha entrado se intuye, así el párrafo
// no parece cortado a media frase.
const WORD_IN =
  "scroll-driven:*:opacity-20 scroll-driven:*:animate-word-in scroll-driven:*:timeline-view scroll-driven:*:range-[cover_20%_cover_45%]";

export function ScrollText({ text, className }: ScrollTextProps) {
  const words = text.split(" ");

  return (
    <p className={className ? `${WORD_IN} ${className}` : WORD_IN}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block">{word}</span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}
