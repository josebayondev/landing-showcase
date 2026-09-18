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
  **antes** de que React hidrate, para evitar parpadeo (FOUC).
- `components/theme-toggle.tsx`: botón cliente que alterna la clase y `localStorage.theme`. Usa
  `useSyncExternalStore` (no `useState` + `useEffect`) para leer `document.documentElement.classList` —
  necesario porque este proyecto tiene activada la regla de ESLint `react-hooks/set-state-in-effect`
  (parte de `eslint-config-next`), que prohíbe el patrón clásico `useEffect(() => setState(...), [])` para
  sincronizar con estado externo. `useSyncExternalStore` es además la única forma de evitar que el toggle se
  quede "congelado" mostrando el valor renderizado en servidor.
- `<html>` lleva `suppressHydrationWarning` en `app/layout.tsx` a propósito: su `className`/atributos
  cambian por el script antes de hidratar, y ese desajuste servidor/cliente es esperado, no un bug.

### Referencia de diseño

El navbar (píldora flotante, logo + enlaces + toggle) y el hero (rol pequeño + nombre grande + badges de
estado apilados) están adaptados de [dvdrod.com](https://dvdrod.com/) como referencia visual, no copiados
literalmente. Al añadir nuevas secciones, mantener esa coherencia (fondo neutro, badges tipo pill, tipografía
bold para el nombre) salvo que se decida lo contrario.

### Despliegue

Sin `vercel.json` a propósito (se quitó del template porque es una plantilla reutilizable, no atada a
Vercel). El despliegue a Vercel de este sitio concreto es una tarea pendiente por separado.
