---
name: siguiente-tarea
description: Elige la siguiente tarea de ClickUp del proyecto landing-showcase y prepara el plan para implementarla. Úsala cuando el desarrollador abra sesión preguntando qué toca hoy, pida mirar ClickUp, o nombre una lista del tablero (Setup, Hero, Work / Case studies, About y Contact, Deploy y QA) sin más contexto.
---

# Abrir el día: elegir la siguiente tarea

Convierte el tablero de ClickUp en una tarea concreta lista para empezar: cuál toca, por
qué esa y no otra, qué la da por terminada y qué ficheros toca. No escribe código todavía.

Lee primero `.claude/skills/clickup-landing-showcase.md` — el mapa del tablero, los IDs de
las listas y las convenciones de git de este repo están ahí, no aquí.

## Procedimiento

### 1. Fijar el ámbito

Si el desarrollador ha nombrado una lista, ese es el ámbito. Si no lo ha dicho, **pregunta
con `AskUserQuestion`** ofreciendo las fases en su orden natural (`Setup`, `Hero`,
`Work / Case studies`, `About y Contact`, `Deploy y QA`) más `List` como backlog — no
asumas que toca seguir la fase anterior sin confirmarlo.

### 2. Leer el tablero

`clickup_filter_tasks` sobre el espacio `901210294767` (o la lista concreta si el ámbito ya
está fijado), con `subtasks: true` e `include_closed: true`. Hace falta ver lo cerrado
además de lo pendiente: es lo que dice por dónde iba el trabajo.

### 3. Elegir candidata

Por este orden:

1. Tareas pendientes de la fase en curso — la lista más temprana en el orden
   `Setup → Hero → Work / Case studies → About y Contact → Deploy y QA` que todavía tenga
   pendientes.
2. Dentro de esa lista, si hay una dependencia lógica evidente entre tareas (aunque
   ClickUp no la modele como dependencia formal — p. ej. no tiene sentido maquetar
   `About y Contact` antes de que el hero esté cerrado), respétala.
3. Las tareas de `List` (backlog sin triar) son la última opción, no la primera: solo se
   proponen si el desarrollador pide explícitamente mirar el backlog o si no queda nada
   pendiente en las fases.

Si dos candidatas empatan de verdad, propón las dos con su porqué y deja elegir. Y si has
saltado por encima de una fase anterior que sigue con pendientes, menciónalo en una línea:
saltársela puede ser deliberado, pero que sea una decisión y no un descuido.

### 4. Leer la ficha completa

`clickup_get_task` con `include: ["description"]` sobre la tarea elegida. Los listados
truncan las descripciones y muchas tareas de este tablero no tienen `DoD:` explícito — si
la descripción está vacía, el criterio de cierre es el propio título más lo que se acuerde
en el paso 6, y hay que decirlo así, no inventar un DoD que no está escrito.

### 5. Contrastar con el repositorio antes de proponer nada

Mira `git log --oneline -15` y el código que la tarea toca. Dos cosas que se cazan aquí:
trabajo que ya está hecho y que el tablero no refleja, y patrones existentes que hay que
seguir en vez de inventar (componentes en `components/` sin subcarpetas, convenciones de
modo oscuro descritas en `CLAUDE.md`, etc.). Si algo de la tarea ya está implementado,
dilo antes de planificar — puede que lo que toque sea cerrarla, no hacerla.

### 6. Presentar

Un resumen corto, no un documento:

- **Qué toca** y por qué esa tarea y no otra.
- **Criterio de cierre**: el DoD literal si la descripción lo trae, o una propuesta
  concreta derivada del título si no lo trae — y en ese caso, pide confirmación antes de
  seguir.
- **Ficheros** que se van a tocar, y qué se reutiliza de lo que ya existe.
- **Tests o verificación manual** que hará falta — este repo no tiene suite de tests
  todavía, así que la verificación suele ser `npm run lint` / `npm run typecheck` /
  `npm run build` más una comprobación visual en el navegador.

### 7. Ofrecer marcar `in progress`

Antes de empezar, ofrece pasar la tarea a `in progress` en ClickUp. Espera el visto bueno;
no lo hagas por tu cuenta.

### 8. Sugerir el commit

Este repo no usa ramas ni PRs — el historial de `main` son commits directos (ver
`.claude/skills/clickup-landing-showcase.md`). Cierra la presentación con un adelanto del
commit con el que probablemente se cierre la tarea, en Conventional Commits y una sola
línea: `<tipo>: <descripción corta>`, con `<tipo>` de entre `feat`, `fix`, `chore`, `docs`,
`test`, `refactor` según la naturaleza de la tarea. Es una plantilla orientativa a partir
del criterio de cierre, no una promesa — el commit real lo escribe el desarrollador cuando
el código esté listo, y puede que haga falta más de uno. Si el desarrollador prefiere
trabajar en una rama para esta tarea en concreto, sugiere el comando
(`git checkout -b <tipo>/<nombre-en-kebab-case>`) pero no lo des por hecho como flujo por
defecto.

## Límites

- **Nada de git**: nunca ejecutes `checkout`, `add`, `commit`, `push`, ni ningún comando
  que modifique el working tree, el índice o el historial. Los ejecuta el desarrollador
  (ver `CLAUDE.md`). Sugerir el texto del commit o de una rama (paso 8) no es una excepción
  a esto: se enseña como texto para copiar, nunca se lanza.
- No crees tareas nuevas en ClickUp. Si detectas algo que falta en el tablero, propónlo y
  deja que él decida.
- No amplíes el alcance de la tarea. Si algo colindante parece necesario, sepáralo y dilo.
