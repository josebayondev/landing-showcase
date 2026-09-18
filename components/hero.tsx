import { Reveal } from "@/components/reveal";

const BADGES = [
  { label: "Available for work", dot: true },
  { label: "Madrid, Spain", dot: false },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-6rem)] flex-col items-start justify-center gap-4 px-6 text-left sm:px-12"
    >
      <Reveal>
        <p className="font-display text-sm font-semibold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400">
          Software Engineer
        </p>
      </Reveal>

      {/* Líneas fijas en vez de text-balance: alineado a la izquierda no
          necesitamos que el navegador decida dónde cortar. */}
      <Reveal delay={0.15}>
        <h1 className="text-[clamp(2.75rem,9vw,7.5rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white">
          <span className="block">Jose Ignacio</span>
          <span className="block">
            Bay<span className="text-red-500">ó</span>n
          </span>
        </h1>
      </Reveal>

      <Reveal delay={0.3} className="absolute right-6 bottom-6">
        <div className="flex flex-col items-end gap-2">
          {BADGES.map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-medium tracking-wide text-zinc-600 uppercase dark:border-white/10 dark:text-zinc-400"
            >
              {badge.dot && (
                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
              )}
              {badge.label}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
