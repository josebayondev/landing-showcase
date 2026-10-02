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
    <section id="work" className="px-6 pt-[20dvh] pb-8 sm:px-12">
      {/* Scroll clavado (ver components/hero.tsx y styles/animations/scroll.css): la sección
          se ancla brevemente mientras "Proyectos" sube y se asienta, antes de
          soltar el scroll para las tarjetas de abajo. Título y línea pegados
          abajo (justify-end) y no centrados: con el título centrado quedaba medio scroll vacío por
          debajo antes de llegar a las tarjetas; pegado abajo, en cuanto se
          suelta el anclaje viene enseguida el contenido. */}
      <div className="pin-wrapper pin-wrapper--section">
        <div className="pin-sticky flex min-h-[28dvh] flex-col justify-end">
          <Reveal>
            <SectionTitle pinReveal>Proyectos</SectionTitle>
          </Reveal>
          {/* La línea va dentro del bloque clavado, no después, y sin
              <Reveal>: en los dos casos se movía hacia el título mientras
              este estaba quieto. */}
          <div className="mt-8 border-t border-black/10 dark:border-white/10" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {PROJECTS.map((project, index) => (
          <Reveal key={project.href} delay={0.15 + index * 0.05}>
            <ProjectCard index={index + 1} {...project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
