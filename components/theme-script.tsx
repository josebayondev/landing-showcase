// Se ejecuta antes de pintar la página: marca que hay JavaScript y aplica el
// tema guardado, para que no haya parpadeo ni de animaciones ni de color.
const THEME_SCRIPT = `
(function () {
  // Las animaciones de entrada de globals.css cuelgan de .js: sin esta clase
  // el contenido se ve sin animar en vez de quedarse invisible.
  document.documentElement.classList.add("js");
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
