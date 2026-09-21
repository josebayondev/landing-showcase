type ProjectCardProps = {
  index: number;
  meta: string;
  title: string;
  tags: string[];
  description: string;
  href: string;
  glyph: string;
};

// Banner horizontal: panel de texto a la izquierda, panel decorativo a
// sangre a la derecha. Todo el bloque es un único <a> (sin enlaces
// anidados).
//
// En vez de una captura del sitio (quedaba pobre a este tamaño), el panel
// derecho es un glifo grande en dos capas superpuestas: una tenue de fondo y
// otra en rojo que se "rellena" con `clip-path` según el bloque entra en el
// viewport (`.project-glyph-fill`, definido en globals.css junto al resto de
// animaciones ligadas al scroll, mismo mecanismo que la barra de la cortina
// de carga pero con clip-path en vez de scaleX).
export function ProjectCard({ index, meta, title, tags, description, href, glyph }: ProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white transition-colors duration-300 hover:border-red-500 focus-visible:border-red-500 sm:h-96 sm:flex-row dark:border-white/10 dark:bg-zinc-950"
    >
      <div className="flex flex-col justify-between gap-8 p-8 sm:w-[45%] sm:p-10">
        <div>
          <p className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
            {String(index).padStart(2, "0")}
          </p>
          <p className="mt-6 font-mono text-xs text-zinc-500 dark:text-zinc-400">{meta}</p>
          <p className="mt-3 font-display text-3xl leading-tight font-bold text-zinc-950 sm:text-4xl dark:text-white">
            {title}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-600 uppercase dark:border-white/10 dark:text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="font-mono text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
          {description}
        </p>
      </div>

      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-zinc-50 sm:h-full sm:flex-1 dark:bg-zinc-900">
        <div
          aria-hidden
          className="absolute inset-0 text-zinc-950 opacity-[0.06] [background-image:radial-gradient(currentColor_1.5px,transparent_1.5px)] [background-size:20px_20px] dark:text-white"
        />

        <div aria-hidden className="relative">
          <span className="block font-display text-[6rem] leading-none font-extrabold text-zinc-950/10 select-none sm:text-[8rem] dark:text-white/10">
            {glyph}
          </span>
          <span className="project-glyph-fill absolute inset-0 block font-display text-[6rem] leading-none font-extrabold text-red-500 select-none sm:text-[8rem]">
            {glyph}
          </span>
        </div>

        <span
          aria-hidden
          className="absolute right-5 bottom-5 flex size-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-zinc-950 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 dark:border-white/20 dark:bg-black/50 dark:text-white"
        >
          ↗
        </span>
      </div>
    </a>
  );
}
