// Cortina de carga: el nombre entra recortado por una máscara, la barra roja
// se llena y la cortina se retira hacia arriba dejando ver la web.
//
// Server component y cero JavaScript: toda la secuencia son keyframes CSS
// (globals.css, bloque "Cortina de carga"). La cortina está en `display: none`
// por defecto y solo se muestra bajo `html.js`, así que si el script no llega
// no hay pantalla negra permanente: se ve la web directamente.
//
// `aria-hidden` porque es decorativa, y `pointer-events: none` desde el primer
// fotograma para no interceptar clics ni dejar nada atrapado detrás.
export function Preloader() {
  return (
    <div aria-hidden className="preloader">
      <p className="preloader-name font-display text-[0.8rem] font-semibold tracking-[0.42em] text-zinc-950 dark:text-white">
        <span className="preloader-name-inner">
          Jose Ignacio Bay<span className="text-red-500">ó</span>n
        </span>
      </p>

      <div className="preloader-bar">
        <span className="preloader-bar-fill" />
      </div>
    </div>
  );
}
