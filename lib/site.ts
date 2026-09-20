// Datos del sitio compartidos por la metadata, el sitemap, robots.txt y la
// imagen de Open Graph, para no repetirlos en cuatro ficheros.
//
// NEXT_PUBLIC_SITE_URL se fija en el hosting al desplegar. En local cae a
// localhost para que `metadataBase` nunca quede sin valor: sin él, Next
// resuelve las URLs relativas de openGraph contra un origen vacío y avisa en
// cada build.
const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Sin barra final: este valor se concatena con rutas (`${SITE_URL}/sitemap.xml`
// en app/robots.ts), y si la variable del hosting la lleva sale `//sitemap.xml`.
export const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const SITE_NAME = "Jose Ignacio Bayón";

export const SITE_TITLE = "Jose Ignacio Bayón — Software Developer";

// El copy visible va en español; "Software Developer" se queda en inglés a
// propósito, igual que en el resto de la web (ver CLAUDE.md).
export const SITE_DESCRIPTION =
  "Software Developer entre Madrid y Murcia, centrado en frontend y diseño UI/UX, sin perder de vista un backend sólido y que escale.";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/josebayondev/",
  github: "https://github.com/josebayondev",
  email: "josebayondev@gmail.com",
};
