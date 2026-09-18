---
name: cerrar-tarea
description: Verifica que una tarea de landing-showcase está realmente terminada, la marca en ClickUp y reporta lo que falta. Úsala cuando el desarrollador diga que ha acabado algo, que ya está en main, o pida marcar en ClickUp, revisar si está todo bien y ver qué queda.
---

# Cerrar el día: verificar, marcar y decir qué falta

Cierra el ciclo que abrió `siguiente-tarea`: comprueba con evidencia que el trabajo cumple
su criterio de cierre y está en `main`, actualiza el estado en ClickUp y deja claro qué
queda por delante.

Lee primero `.claude/skills/clickup-landing-showcase.md` — el mapa del tablero y las
convenciones de git de este repo están ahí.

## Procedimiento

### 1. Identificar la tarea

Por el nombre o lista que diga el desarrollador. Si no lo dice, dedúcela del último commit
de `main` y contrástala con el tablero, y **confirma cuál has elegido** antes de tocar
nada.

Si ya está cerrada, dilo y pasa directamente al paso 6: no la reescribas.

### 2. Verificar con evidencia, no de memoria

```bash
npm run lint
npm run typecheck
npm run build
```

Si algo falla: dilo con la salida delante, **no cierres nada** y ofrece arreglarlo. Una
tarea cerrada con estos comandos en rojo es peor que una tarea abierta. No hay suite de
tests configurada todavía en este repo, así que estos tres comandos son la verificación
completa — no inventes `npm test`.

### 3. Comprobar el criterio de cierre

Saca la descripción de la tarea (`clickup_get_task` con `include: ["description"]`). Si
trae un `DoD:` literal, ve punto por punto señalando el fichero:línea concreto que lo
cumple. Si la descripción está vacía (frecuente en este tablero), contrasta el resultado
contra el título de la tarea y contra lo que se acordó al abrirla con `siguiente-tarea` —
y si hay algo ambiguo, dilo como tal en vez de asumir que está cubierto.

### 4. Comprobar que está en `main` — este es el gate

```bash
git fetch origin --quiet && git log origin/main --oneline -10
```

Este repo no usa ramas ni PRs (ver `.claude/skills/clickup-landing-showcase.md`): el
trabajo se cierra con un commit directo en `main`. Busca el commit correspondiente en ese
log. Si el trabajo sigue solo en local (no en `origin/main`), la tarea **no se marca**: se
reporta como "lista, pendiente de subir". Comprueba también que la CI de ese commit está en
verde (`gh run list --branch main -L 1`, o el MCP de GitHub) — un commit en `main` con CI
roja tampoco cierra.

### 5. Escribir en ClickUp, y solo ahora

- Lee los estados reales con `clickup_get_task(expand_statuses: true)` — por defecto este
  espacio usa `to do` / `in progress` / `complete`, con `complete` de tipo `closed`, sin la
  trampa de estados por lista que tiene booking-app, pero conviene comprobarlo en vez de
  asumirlo si el tablero ha cambiado.
- Aplícalo con `clickup_update_task`.
- Opcional, útil para el rastro: un comentario en la tarea con el hash del commit.

### 6. Decir qué falta

- Tareas que siguen pendientes en la fase en curso (la lista actual del tablero).
- **Cuál es la siguiente** — el punto de entrada de `siguiente-tarea` la próxima vez.
- Lo que hayas detectado durante la verificación y no esté en el tablero: deuda, un caso
  sin cubrir, una decisión que quedó a medias. **Propónlo, no lo crees** en ClickUp por tu
  cuenta.

### 7. Documentación

Si el cambio ha tocado arquitectura — una convención nueva, una pieza del modo oscuro, algo
que afecte a cómo se construyen futuras secciones — la sección correspondiente de
`CLAUDE.md` tiene que reflejarlo. Si falta, dilo aquí y ofrece escribirlo.

## Límites

- **Nada de git que escriba** (`add`, `commit`, `push`, `merge`, `rebase`, `reset`, ni
  ningún otro comando que modifique el working tree, el índice o el historial). Leer el
  estado de git sí (`status`, `diff`, `log`, `fetch`).
- Nunca marques cerrado lo que no has verificado tú en esta sesión.
