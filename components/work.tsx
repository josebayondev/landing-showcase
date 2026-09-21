import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";

const PROJECTS = [
  {
    meta: "josebayon.vercel.app · 2026",
    title: "Conóceme un poco más",
    tags: ["Programación", "IA"],
    description:
      "Blog personal donde hablo de programación, IA y de lo que voy aprendiendo por el camino.",
    href: "https://josebayon.vercel.app",
    glyph: "</>",
  },
];

export function Work() {
  return (
    <section id="work" className="px-6 py-24 sm:px-12">
      <Reveal>
        <SectionTitle>Proyectos</SectionTitle>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 border-t border-black/10 dark:border-white/10" />
      </Reveal>

      <div className="mt-12 flex flex-col gap-6">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.href} delay={0.15 + index * 0.05}>
            <ProjectCard index={index + 1} {...project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
