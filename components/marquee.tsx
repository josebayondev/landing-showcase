import { SKILLS } from "@/lib/skills";

// Decorativo: el contenido real (rol, nombre, contacto...) ya está en el
// resto de la página, así que se oculta entero a lectores de pantalla en
// vez de dejar que repitan la lista dos veces.
export function Marquee() {
  return (
    <div
      aria-hidden
      className="mt-12 overflow-hidden border-y border-black/10 dark:border-white/10"
    >
      <div className="flex w-max animate-marquee py-3.5">
        {[...SKILLS, ...SKILLS].map((item, index) => (
          <span key={index} className="flex items-center whitespace-nowrap">
            <span className="font-display text-[11px] font-semibold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400">
              {item}
            </span>
            <span className="mx-7 text-red-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
