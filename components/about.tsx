import { Reveal } from "@/components/reveal";
import { SKILLS } from "@/lib/skills";

const JOBS = [
    {
    company: "Independent Projects",
    role: "Full-Stack Developer",
    period: "2026 — Present",
  },
  {
    company: "Grupo SIC (IA)",
    role: "Full-Stack Developer",
    period: "Sep 2025 — Present",
  }
];

export function About() {
  return (
    <section id="about" className="px-6 py-24 sm:px-12">
      <Reveal>
        <h1 className="text-[clamp(2.75rem,9vw,8rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white">
          About
        </h1>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 border-t border-black/10 dark:border-white/10" />
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="max-w-md font-mono text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
            I&apos;m drawn to everything AI — how fast it&apos;s moving, and
            everything we&apos;re about to be able to build with it.
            That&apos;s where I want to put my energy: turning what&apos;s
            becoming possible into what actually ships.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="flex flex-col gap-6">
            {JOBS.map((job) => (
              <li
                key={job.company}
                className="flex items-baseline justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10"
              >
                <div>
                  <p className="font-display text-base font-bold text-zinc-950 dark:text-white">
                    {job.role}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{job.company}</p>
                </div>
                <p className="font-mono text-xs whitespace-nowrap text-zinc-500 uppercase dark:text-zinc-400">
                  {job.period}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-16">
          <p className="font-display text-sm font-semibold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400">
            Skills
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:border-white/10 dark:text-zinc-400"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
