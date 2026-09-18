"use client";

// Qué icono y qué texto se ven lo decide la clase .dark del <html> vía CSS, no
// un estado de React. Así no hay nada que sincronizar entre servidor y
// cliente: antes el primer pintado mostraba siempre "LIGHT" (el snapshot de
// servidor) y saltaba a "DARK" al hidratar, aunque el tema ya fuese oscuro.
export function ThemeToggle() {
  function toggleTheme() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-xs font-medium tracking-wide text-zinc-600 transition-colors hover:text-zinc-950 dark:border-white/10 dark:text-zinc-400 dark:hover:text-white"
    >
      <span aria-hidden className="text-sm leading-none">
        <span className="dark:hidden">☀</span>
        <span className="hidden dark:inline">☾</span>
      </span>
      {/* El texto se oculta en móvil: son ~45px que el navbar necesita para
          que los tres enlaces y el logo no se toquen a 390px. */}
      <span className="hidden sm:inline">
        <span className="dark:hidden">LIGHT</span>
        <span className="hidden dark:inline">DARK</span>
      </span>
    </button>
  );
}
