import { Reveal } from "@/components/reveal";
import { SectionTitle } from "@/components/section-title";
import { SOCIAL_LINKS } from "@/lib/site";

const LINKS = [
  { label: "Email", href: `mailto:${SOCIAL_LINKS.email}` },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "GitHub", href: SOCIAL_LINKS.github },
];

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 sm:px-12">
      <Reveal delay={0.1}>
        <SectionTitle className="mt-4">
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="group inline-block"
          >
            Let&apos;s talk{" "}
            <span className="inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-red-500">
              ↗
            </span>
          </a>
        </SectionTitle>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-8">
          <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
            <p>{SOCIAL_LINKS.email}</p>
            <p>Madrid, Spain</p>
          </div>

          <ul className="flex items-center gap-6 text-xs font-medium tracking-[0.15em] text-zinc-600 uppercase dark:text-zinc-400">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="transition-colors hover:text-zinc-950 dark:hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
