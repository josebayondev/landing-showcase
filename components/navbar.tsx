import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-2xl items-center justify-between gap-4 rounded-full border border-black/10 bg-white/80 px-5 py-3 backdrop-blur-md dark:border-white/10 dark:bg-black/60">
        <Link href="#hero" className="text-sm font-bold tracking-tight">
          jib
        </Link>
        <ul className="flex items-center gap-6 text-xs font-medium tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-zinc-950 dark:hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
