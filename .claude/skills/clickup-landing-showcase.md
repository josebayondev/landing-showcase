# Referencia de ClickUp para landing-showcase

El mapa del tablero de este proyecto: qué IDs tiene cada lista, cómo está organizado el
trabajo y qué convenciones de git aplican. Lo leen las skills `siguiente-tarea` y
`cerrar-tarea` para no redescubrirlo con llamadas MCP cada día.

## Dónde está el tablero

Workspace `90121621006`, espacio **landing-showcase** `901210294767`. Sin carpetas: las
listas cuelgan directamente del espacio.

| Lista | ID | Qué es |
| --- | --- | --- |
| List | `901222264802` | Backlog sin triar — ideas o referencias sueltas (p. ej. "Referencia de diseño: dvdrod.com") que todavía no encajan en una fase concreta. No es el punto de partida por defecto. |
| Setup | `901222264826` | Infraestructura del proyecto: scaffold, fuentes, dependencias, CI, deploy. |
| Hero | `901222264828` | Navbar y sección hero. |
| Work / Case studies | `901222264830` | Sección de proyectos/casos. |
| About y Contact | `901222264831` | Secciones about y contacto. |
| Deploy y QA | `901222264833` | Verificación final y despliegue a producción. |

## Cómo está organizado el trabajo

A diferencia de booking-app, aquí **no hay FEAT padre ni subtareas numeradas**: cada tarea
de una lista es una unidad de entrega en sí misma, con su propio título. Las listas
funcionan como fases secuenciales del proyecto — el orden por defecto para elegir trabajo
es `Setup → Hero → Work / Case studies → About y Contact → Deploy y QA`, y dentro de cada
lista no hay un orden numérico explícito, así que hay que fijarse en si una tarea depende
de otra por lógica (p. ej. no tiene sentido maquetar `About y Contact` antes de tener el
hero terminado).

Tampoco hay una convención `DoD:` en la descripción — muchas tareas tienen la descripción
vacía y el título es el propio criterio de cierre. Cuando la descripción sí trae contexto
(enlaces de referencia, decisiones de diseño), léela con `clickup_get_task` e
`include: ["description"]`, pero no des por hecho que ahí va a haber un DoD literal como en
booking-app.

## Estados

Este espacio usa un único set de estados para todas sus listas, sin la trampa de
booking-app (`terminada` vs `complete`):

- `to do` (tipo `open`)
- `in progress` (tipo `custom`)
- `complete` (tipo `closed`)

Aun así, antes de cerrar una tarea conviene comprobar los estados reales con
`clickup_get_task(expand_statuses: true)` por si esto cambia con el tiempo, en vez de dar
por hecho el nombre `complete`.

## Correspondencia con el repositorio

A diferencia de booking-app, **este repo no usa ramas ni PRs** — el historial de
`landing-showcase` son commits directos a `main` (`git log --oneline` no tiene ningún
commit de merge). Mientras esa convención siga así:

- El cierre de una tarea es un commit (o varios) directamente en `main`, no un PR mergeado.
- Mensaje de commit en Conventional Commits, una sola línea: prefijo en inglés (`feat:`,
  `fix:`, `docs:`...), descripción en español (ver "Idioma" en `CLAUDE.md`).
- La CI (`.github/workflows/ci.yml`) corre en cada push a `main` — comprobar su resultado
  (`gh run list --branch main -L 1` o el MCP de GitHub) es el gate de cierre, no el estado
  de un PR.

Si en algún momento Jose empieza a trabajar con ramas/PRs en este repo, este fichero es el
que hay que actualizar para reflejarlo — las skills no lo asumen por su cuenta.

## Mantenimiento

Si el tablero cambia — listas nuevas, se introduce una convención de DoD, se empieza a usar
ramas — se actualiza **este fichero**, no las skills. Las skills describen el
procedimiento; esto describe el terreno.
