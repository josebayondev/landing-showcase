// Difumina el contenido que pasa por debajo del navbar al hacer scroll, para
// que siga siendo legible por encima de lo que sea que haya detrás. El
// mask-image hace que el blur sea total arriba y se disuelva hacia abajo, en
// vez de cortar en seco al final de la franja.
export function ScrollBlur() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] [mask-image:linear-gradient(to_bottom,black,transparent)] sm:h-36"
    />
  );
}
