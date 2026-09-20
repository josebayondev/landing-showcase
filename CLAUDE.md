# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Reglas importantes

- **Idioma**: código, comentarios, mensajes de commit y documentación (README, CLAUDE.md, etc.) van en
  **español**. El copy visible en la propia web (nav, hero, badges...) también va en **español**, con dos
  excepciones a propósito: la etiqueta de rol "Software Developer" (hero, footer, metadata, JSON-LD), y los
  puestos de `JOBS` en `components/about.tsx` (empresa, cargo, periodo), que van en inglés como en un CV.
- **Git**: Claude solo ejecuta comandos de **consulta** (`git status`, `git log`, `git diff`, `git show`,
  `git blame`...). `git add`, `git commit`, `git push` y `git checkout` (o cualquier otro comando que
  modifique el working tree, el índice o el historial) los ejecuta **Jose**, nunca Claude. Si hace falta
  alguno de esos pasos, Claude debe dejar los cambios listos y pedirle a Jose que los ejecute él.

## Sobre este repo

`landing-showcase` es el portfolio personal de Jose Ignacio Bayon. Se generó a partir del repo plantilla
[`josebayondev/web-template`](https://github.com/josebayondev/web-template) (marcado como *template repository*
en GitHub), que es un `create-next-app` mínimo + CI, sin código de producto. Todo lo específico de este sitio
(navbar, hero, secciones, copy) vive únicamente en `landing-showcase`, no en la plantilla.

## Comandos

```bash
npm run dev         # servidor de desarrollo (Turbopack)
npm run lint         # eslint (eslint-config-next: core-web-vitals + typescript)
npm run typecheck    # next typegen && tsc --noEmit — ver nota abajo, el orden importa
npm run build        # build de producción
npm run start        # servir el build de producción
```

No hay suite de tests configurada todavía.

**`npm run typecheck` necesita `next typegen` primero.** Next.js 16 genera tipos globales para las rutas
tipadas (p. ej. `LayoutProps<"/">` en `app/layout.tsx`) dentro de `.next/types` durante `next build` o
`next dev`. Si se ejecuta `tsc --noEmit` a pelo sin ese paso (p. ej. tras un `rm -rf .next`), falla con
`Cannot find name 'LayoutProps'`. Por eso el script encadena `next typegen && tsc --noEmit`; el workflow de
CI (`.github/workflows/ci.yml`) depende de este orden.

## Arquitectura

- Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS v4 + TypeScript. Sin `tailwind.config.js`:
  la configuración de Tailwind v4 es CSS-first, vive en `app/globals.css` (`@import "tailwindcss"`, bloques
  `@theme`).
- Alias de imports `@/*` → raíz del repo (ver `tsconfig.json`), p. ej. `@/components/navbar`.
- Componentes en `components/` en plano (sin subcarpetas `ui/`, `sections/`, etc. todavía) — un fichero por
  componente, exports con nombre (no default).

### Modo oscuro (clase, no `prefers-color-scheme`)

El tema oscuro se controla por la clase `.dark` en `<html>`, no por media query. Piezas involucradas:

- `app/globals.css`: `@custom-variant dark (&:where(.dark, .dark *));` redefine cómo Tailwind resuelve el
  prefijo `dark:` para que dependa de la clase en vez de las preferencias del SO.
- `components/theme-script.tsx`: script inline inyectado en `<head>` desde `app/layout.tsx` que lee
  `localStorage.theme` (o `prefers-color-scheme` si no hay preferencia guardada) y aplica la clase `dark`
  **antes** de que React hidrate, para evitar parpadeo (FOUC). El mismo script añade la clase `js` al
  `<html>` — de ella cuelgan las animaciones de entrada, ver más abajo.
- `components/theme-toggle.tsx`: botón cliente que alterna la clase y `localStorage.theme`. **No guarda el
  tema en estado de React**: qué icono y qué texto se ven lo deciden las variantes `dark:` sobre dos pares
  de elementos (☀/LIGHT y ☾/DARK), y el botón se limita a escribir. Así no hay nada que sincronizar entre
  servidor y cliente. Antes usaba `useSyncExternalStore`, y aun así el primer pintado salía siempre con el
  snapshot de servidor (claro) y el icono saltaba al hidratar aunque el tema guardado fuese oscuro. Si
  alguna vez hace falta el valor en JavaScript, `useSyncExternalStore` sigue siendo el patrón correcto aquí:
  la regla de ESLint `react-hooks/set-state-in-effect` (parte de `eslint-config-next`) prohíbe el clásico
  `useEffect(() => setState(...), [])` para sincronizar con estado externo.
- `<html>` lleva `suppressHydrationWarning` en `app/layout.tsx` a propósito: su `className`/atributos
  cambian por el script antes de hidratar, y ese desajuste servidor/cliente es esperado, no un bug.

### Animaciones (CSS, no framer-motion)

Las entradas del hero y el scroll reveal de las secciones son **CSS puro**, definido en `app/globals.css`:

- `.enter` (+ `.enter-up`, `.enter-down`, `.enter-left`, `.enter-right`, `.enter-name`) para la entrada del
  hero al cargar. El escalonado se pasa con `style={{ animationDelay }}` desde el componente, no con más
  clases. El nombre entra primero y el resto (rol, bio, badges) arranca mientras esa animación termina;
  la secuencia cierra sobre 1.3s.
- `[data-reveal]` para el scroll reveal. `components/reveal.tsx` es el único cliente implicado: observa con
  `IntersectionObserver` y marca `data-revealed`; toda la animación es una transición CSS.

Todo esto cuelga del selector `html.js`, es decir, **solo se aplica si hay JavaScript**. Es deliberado: con
framer-motion el HTML que salía del servidor traía `style="opacity:0"` en cada bloque (17 nodos), así que sin
JS la página era un rectángulo vacío y el LCP esperaba a la hidratación. Cualquier animación nueva que empiece
en estado invisible debe seguir la misma regla.

Antes de todo eso está la **cortina de carga** (`components/preloader.tsx`), otra secuencia de CSS puro de
2.05s: el nombre entra recortado por una máscara, la barra roja se llena y la cortina se retira hacia arriba
con `clip-path`. Dos consecuencias que hay que tener presentes al tocarla:

- La cortina está en `display: none` por defecto y solo se muestra bajo `html.js`. Es la regla del proyecto
  aplicada al revés: si el script no llega, en vez de quedarse una pantalla opaca tapando la web, no hay
  cortina y la página se ve directa.
- La entrada del hero tiene que esperarla, o pasaría entera por detrás. Por eso `.enter` usa
  `animation-delay: calc(var(--enter-offset, 0s) + var(--enter-delay, 0s))`: `--enter-delay` es el escalonado
  de cada elemento (lo pone `hero.tsx` en el `style`, ya no `animationDelay`) y `--enter-offset` es la espera
  común, definida en `html.js` y puesta a `0s` en `prefers-reduced-motion`. Al cambiar la duración de la
  cortina hay que mover también ese offset.

Contrapartida asumida a propósito: dos segundos de cortina opaca retrasan el LCP, justo la métrica por la
que se migró desde framer-motion. Fue una decisión consciente de Jose, no un descuido.

Hay además una segunda capa, **ligada al scroll** y también en `app/globals.css`, que usa
`animation-timeline` (CSS scroll-driven, sin JavaScript):

- `.hero-scroll` en la sección del hero: se aparta un poco más rápido que el scroll y se apaga al salir.
  Va sobre `scroll(root block)` y no sobre `view()` porque el hero arranca pegado al origen del documento,
  así el recorrido es la primera pantalla y no depende de cuánto asoma el bloque. La clase va en la propia
  `<section>`: las clases `.enter` están en los descendientes, así que no compiten por el mismo elemento, y
  envolver los hijos rompería el flex y la posición absoluta de los badges.
- `[data-scroll-text] > span` para `components/scroll-text.tsx`, que parte un párrafo en palabras. Cada
  `<span>` tiene su propia `view()` timeline, así que se enciende según su posición: las palabras de una
  misma línea comparten altura y entran juntas, con lo que se lee **línea a línea**. No hay retardos
  calculados ni componente cliente.

`animation-timeline` cubre ~87% de los navegadores (Chrome/Edge 115+, Opera 101+, Safari 26+, Firefox 156+),
así que **todo lo que arranque atenuado va dentro de `@supports (animation-timeline: view())`**. Quien no lo
soporte ve el contenido a opacidad normal y quieto — la misma regla que el gate `html.js`, por el mismo
motivo: nada puede quedarse invisible esperando algo que no va a llegar.

`@media (prefers-reduced-motion: reduce)` desactiva marquee, entradas, reveals, el parallax del hero y el
revelado por scroll, además del scroll suave. Hay que mantenerlo al añadir animaciones.

Tras esta migración **framer-motion ya no se importa en ningún sitio**; sigue en `package.json` por si vuelve
a hacer falta, pero se puede desinstalar.

### SEO y metadata

- `lib/site.ts` centraliza URL pública, nombre, título, descripción y perfiles. Lo consumen `app/layout.tsx`,
  `app/robots.ts`, `app/sitemap.ts`, `app/opengraph-image.tsx` y `components/contact.tsx`.
- **`NEXT_PUBLIC_SITE_URL` hay que fijarla en el hosting al desplegar.** Sin ella se usa
  `http://localhost:3000`, y con eso el canonical, el sitemap y la URL absoluta de la imagen OG salen
  apuntando a localhost.
- `app/opengraph-image.tsx` genera la tarjeta 1200×630 con `ImageResponse`. Usa `assets/Syne-ExtraBold.ttf`,
  que es Syne instanciada a peso 800 (la variable original no vale: el renderer se queda con la instancia por
  defecto y el nombre saldría en regular). Licencia OFL en `assets/OFL.txt`.
- Jerarquía de encabezados: **un solo `<h1>`**, el nombre del hero. Los títulos de sección usan
  `components/section-title.tsx`, que renderiza `<h2>` con el mismo tamaño.

### Accesibilidad

Cosas que hay que no romper al tocar el layout: el skip link es el primer elemento del `<body>`; las secciones
viven dentro de `<main id="content">`; los enlaces del navbar van dentro de un `<nav aria-label="Principal">`; el
copyright es un `<footer>` propio; `scroll-padding-top: 7rem` en `html` evita que los anclajes dejen el título
debajo del navbar fijo; y hay un `:focus-visible` propio (el outline por defecto casi no se ve sobre negro).

### Referencia de diseño

El navbar (píldora flotante, logo + enlaces + toggle) y el hero (rol pequeño + nombre grande + badges de
estado apilados) están adaptados de [dvdrod.com](https://dvdrod.com/) como referencia visual, no copiados
literalmente. Al añadir nuevas secciones, mantener esa coherencia (fondo neutro, badges tipo pill, tipografía
bold para el nombre) salvo que se decida lo contrario.

### Despliegue

Sin `vercel.json` a propósito (se quitó del template porque es una plantilla reutilizable, no atada a
Vercel). El despliegue a Vercel de este sitio concreto es una tarea pendiente por separado.
