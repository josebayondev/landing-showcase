import { Reveal } from "@/components/reveal";
import { ScrollText } from "@/components/scroll-text";
import { SectionTitle } from "@/components/section-title";
import { SKILLS } from "@/lib/skills";

// Fuera del JSX para poder partirlo en palabras en ScrollText. Sin `&apos;`:
// aquí es una cadena de JavaScript, no texto JSX.
const BIO =
  "Me atrae todo lo relacionado con la IA: lo rápido que avanza, y todo lo que estamos a punto de poder construir con ella. La uso a diario para acelerar cómo diseño, escribo código y tomo decisiones de producto, sin perder de vista la calidad de lo que sale. Ahí es donde quiero poner mi energía: convertir lo que empieza a ser posible en lo que de verdad se lanza, con criterio y sin dejar que la velocidad sustituya al buen trabajo.";

// Los puestos van en inglés a propósito, a diferencia del resto del copy
// (ver CLAUDE.md): es la convención habitual en un CV, para que recrucen
// las búsquedas de reclutadores.
const JOBS = [
  {
    company: "Independent Projects",
    role: "Product Builder",
    period: "2026 — Present",
  },
  {
    company: "Grupo SIC (IA)",
    role: "Full-Stack Developer",
    period: "Sep 2025 — Present",
  },
  {
    company: "Davante",
    role: "Mobile Developer",
    period: "Jan 2025 — Aug 2025",
  },
  {
    company: "Gemini",
    role: "IT Administrator",
    period: "2019 — Dec 2024",
  },
];

export function About() {
  return (
    <section id="about" className="px-6 py-8 sm:px-12">
      {/* Scroll clavado (ver components/hero.tsx y globals.css): la sección
          se ancla brevemente mientras "Sobre mí" sube y se asienta, antes de
          soltar el scroll para la bio y los puestos de abajo. items-end y no
          items-center: con el título centrado quedaba medio scroll vacío por
          debajo antes de llegar al contenido; pegado abajo, en cuanto se
          suelta el anclaje viene enseguida. */}
      <div className="pin-wrapper pin-wrapper--section">
        <div className="pin-sticky flex min-h-[28dvh] items-end pb-8">
          <Reveal>
            <SectionTitle pinReveal>Sobre mí</SectionTitle>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-8 border-t border-black/10 dark:border-white/10" />
      </Reveal>

      <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
        <ScrollText
          text={BIO}
          className="max-w-md font-mono text-xs text-zinc-600 sm:text-sm dark:text-zinc-400"
        />

        <Reveal delay={0.1}>
          <ul className="flex flex-col gap-6">
            {JOBS.map((job) => (
              <li
                key={job.company}
                className="flex items-baseline justify-between gap-4 border-b border-black/10 pb-4 dark:border-white/10"
              >
                <div>
                  <p className="font-display text-sm font-bold text-zinc-950 dark:text-white">
                    {job.role}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{job.company}</p>
                </div>
                <p className="font-mono text-[11px] whitespace-nowrap text-zinc-500 uppercase dark:text-zinc-400">
                  {job.period}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="mt-16">
          <h3 className="font-display text-xs font-semibold tracking-[0.3em] text-zinc-500 uppercase dark:text-zinc-400">
            Habilidades
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:text-zinc-400"
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
