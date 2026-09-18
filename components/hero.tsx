const BADGES = [
  { label: "Available for work", dot: true },
  { label: "Madrid, Spain", dot: false },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100dvh-6rem)] flex-col items-center justify-center gap-4 px-6 text-center"
    >
      <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
        Software Engineer
      </p>

      <h1 className="text-5xl leading-none font-bold tracking-tight text-balance text-zinc-950 sm:text-7xl md:text-8xl dark:text-white">
        Jose Ignacio Bayon
      </h1>

      <div className="absolute right-6 bottom-6 flex flex-col items-end gap-2">
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
    </section>
  );
}
