import { Fragment } from "react";

type ScrollTextProps = {
  text: string;
  className?: string;
};

// Reparte un párrafo en palabras para que se enciendan con el scroll.
//
// No hay cliente ni retardos calculados: cada <span> tiene su propia view
// timeline (la animación vive en globals.css, bajo `[data-scroll-text] > span`),
// así que cada palabra se ilumina según su posición en la página. Las de una
// misma línea comparten altura y entran juntas, con lo que el efecto se lee
// línea a línea conforme el párrafo sube por la pantalla.
//
// El span va inline-block para tener caja propia sobre la que medir; el espacio
// se queda fuera, como nodo de texto, para que la frase siga partiendo por
// donde le toque al ancho disponible.
export function ScrollText({ text, className }: ScrollTextProps) {
  const words = text.split(" ");

  return (
    <p data-scroll-text className={className}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="inline-block">{word}</span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </p>
  );
}
