"use client";

import { motion } from "framer-motion";
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
    <motion.header
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed inset-x-0 z-50 mx-auto flex items-center justify-between ${
        scrolled
          ? "top-4 max-w-2xl gap-4 px-5 py-3"
          : "top-0 max-w-none gap-0 px-6 py-4 sm:px-12"
      }`}
    >
      <motion.div layout>
        <Link href="#hero" className="text-sm font-bold tracking-tight">
          JIB
        </Link>
      </motion.div>

      <motion.div layout className="flex items-center gap-4">
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
      </motion.div>
    </motion.header>
  );
}
