import { Reveal } from "@/components/reveal";

const LINKS = [
  { label: "Email", href: "mailto:josebayondev@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/josebayondev/" },
  { label: "GitHub", href: "https://github.com/josebayondev" },
];

export function Contact() {
  return (
    <section id="contact" className="px-6 py-24 sm:px-12">

      <Reveal delay={0.1}>
        <h1 className="mt-4 text-[clamp(2.75rem,9vw,8rem)] leading-none font-extrabold tracking-tight text-zinc-950 dark:text-white">
          <a href="mailto:josebayondev@gmail.com" className="group inline-block">
            Let&apos;s talk{" "}
            <span className="inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-red-500">
              ↗
            </span>
          </a>
        </h1>
      </Reveal>

      <Reveal delay={0.15}>
        <div className="mt-16 flex flex-wrap items-end justify-between gap-8">
          <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
            <p>josebayondev@gmail.com</p>
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

      <Reveal delay={0.2}>
        <p className="mt-24 border-t border-black/10 pt-8 text-center font-mono text-xs text-zinc-500 dark:border-white/10 dark:text-zinc-400">
          © 2026 Jose Ignacio Bayón · Software Developer
        </p>
      </Reveal>
    </section>
  );
}
