"use client";

import { useSyncExternalStore } from "react";

// No existe un evento nativo para "cambió la clase dark"; usamos uno propio
// que disparamos nosotros mismos al hacer toggle, para que React se sincronice.
function subscribe(onChange: () => void) {
  window.addEventListener("theme-change", onChange);
  return () => window.removeEventListener("theme-change", onChange);
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    window.dispatchEvent(new Event("theme-change"));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium tracking-wide text-zinc-600 transition-colors hover:text-zinc-950 dark:border-white/10 dark:text-zinc-400 dark:hover:text-white"
    >
      <span aria-hidden className="text-sm leading-none">
        {isDark ? "☾" : "☀"}
      </span>
      {isDark ? "DARK" : "LIGHT"}
    </button>
  );
}
