# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Reglas importantes

- **Idioma**: código, comentarios, mensajes de commit y documentación (README, CLAUDE.md, etc.) van en
  **español**. El copy visible en la propia web (nav, hero, badges...) va en **inglés** — ver más abajo.
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

`@media (prefers-reduced-motion: reduce)` desactiva marquee, entradas, reveals y scroll suave. Hay que
mantenerlo al añadir animaciones.

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
viven dentro de `<main id="content">`; los enlaces del navbar van dentro de un `<nav aria-label="Main">`; el
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
