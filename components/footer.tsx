// Footer real del documento (antes era un <p> suelto al final de Contact):
// como landmark, los lectores de pantalla lo anuncian y se puede saltar.
export function Footer() {
  return (
    <footer className="px-6 pb-8 sm:px-12">
      <p className="border-t border-black/10 pt-8 text-center font-mono text-[11px] text-zinc-500 dark:border-white/10 dark:text-zinc-400">
        © {new Date().getFullYear()} Jose Ignacio Bayón · Software Developer
      </p>
    </footer>
  );
}
