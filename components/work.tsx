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
    <section id="work" className="px-6 py-8 sm:px-12">
      {/* Scroll clavado (ver components/hero.tsx y globals.css): la sección
          se ancla brevemente mientras "Proyectos" sube y se asienta, antes de
          soltar el scroll para las tarjetas de abajo. items-end y no
          items-center: con el título centrado quedaba medio scroll vacío por
          debajo antes de llegar a las tarjetas; pegado abajo, en cuanto se
          suelta el anclaje viene enseguida el contenido. */}
      <div className="pin-wrapper pin-wrapper--section">
        <div className="pin-sticky flex min-h-[28dvh] items-end pb-8">
          <Reveal>
            <SectionTitle pinReveal>Proyectos</SectionTitle>
          </Reveal>
        </div>
      </div>

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
