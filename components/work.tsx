import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";

export function Work() {
  return (
    <section id="work" className="px-6 py-24 sm:px-12">
      <Reveal>
        <SectionTitle>Work</SectionTitle>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 border-t border-black/10 dark:border-white/10" />
      </Reveal>

      <Reveal delay={0.15}>
        <p className="mt-8 font-mono text-sm text-zinc-500 dark:text-zinc-400">
          Selected work — coming soon.
        </p>
      </Reveal>
    </section>
  );
}
