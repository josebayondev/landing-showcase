"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Histéresis (entra en >32px, sale en <8px) para que no parpadee si el
    // scroll se queda oscilando justo alrededor de un único umbral.
    const onScroll = () => {
      setScrolled((prev) => (prev ? window.scrollY > 8 : window.scrollY > 32));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* El morph a píldora es una transición CSS sobre max-width, padding y
          margin. Antes lo hacía `layout` de framer-motion, que mide el DOM en
          cada cruce de umbral para animar lo mismo.

          max-w-[120rem] en vez de max-w-none porque `none` no interpola: la
          anchura saltaría en seco. 120rem es mayor que cualquier viewport
          razonable, así que se comporta igual que ancho completo. */}
      <div
        className={`mx-auto flex items-center justify-between gap-3 transition-[max-width,padding,margin] duration-300 ease-in-out sm:gap-4 ${
          scrolled
            ? "mt-4 max-w-2xl px-5 py-3"
            : "mt-0 max-w-[120rem] px-4 py-4 sm:px-12"
        }`}
      >
        <Link
          href="#hero"
          className="font-display text-sm font-extrabold tracking-tight"
        >
          JI<span className="text-red-500">B</span>
        </Link>

        <nav
          aria-label="Main"
          className="flex items-center gap-3 sm:gap-4"
        >
          {/* gap y tamaño reducidos por debajo de sm: con gap-8 fijo, a 390px
              los enlaces desbordaban y se pegaban al logo. */}
          <ul className="flex items-center gap-4 text-[11px] font-medium tracking-[0.15em] text-zinc-600 uppercase sm:gap-8 sm:text-xs dark:text-zinc-400">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-bold transition-colors hover:text-zinc-950 dark:hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
