import { Mapa2D, CasillaMapa, TipoTerreno } from '@/esquemas/mapa2d';

// Comprueba si un tipo de terreno bloquea el paso
export function esCasillaTransitable(tipo: TipoTerreno): boolean {
  switch (tipo) {
    case 'suelo':
    case 'puertaAbierta':
    case 'escaleras':
      return true;
    case 'muro':
    case 'puertaCerrada':
    case 'abismo':
    case 'arbol':
    case 'mesa':
    case 'agua':
    default:
      return false;
  }
}

// Comprueba si un terreno bloquea la visión (opaco)
export function bloqueaVision(tipo: TipoTerreno): boolean {
  return tipo === 'muro' || tipo === 'puertaCerrada' || tipo === 'arbol';
}

// Algoritmo de Bresenham para trazar línea entre dos puntos
function trazarLinea(x0: number, y0: number, x1: number, y1: number): Array<{ x: number; y: number }> {
  const puntos: Array<{ x: number; y: number }> = [];
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  let currX = x0;
  let currY = y0;

  while (true) {
    puntos.push({ x: currX, y: currY });
    if (currX === x1 && currY === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      currX += sx;
    }
    if (e2 < dx) {
      err += dx;
      currY += sy;
    }
  }

  return puntos;
}

/**
 * Actualiza la visibilidad y niebla de guerra en el mapa según la posición del personaje.
 * Las casillas vistas se marcan como visible = true y visitada = true.
 * Las casillas ya exploradas anteriormente pero fuera de rango quedan como visible = false y visitada = true (penumbra/memoria).
 */
export function actualizarNieblaDeGuerra(
  mapa: Mapa2D,
  posJugador: { x: number; y: number },
  radioVisionCasillas: number = 7
): void {
  const { casillas, ancho, alto } = mapa;

  // 1. Apagar la visibilidad actual (pero conservar visitada)
  for (let y = 0; y < alto; y++) {
    for (let x = 0; x < ancho; x++) {
      casillas[y][x].visible = false;
    }
  }

  // 2. La propia casilla del jugador siempre es visible
  if (casillas[posJugador.y]?.[posJugador.x]) {
    casillas[posJugador.y][posJugador.x].visible = true;
    casillas[posJugador.y][posJugador.x].visitada = true;
  }

  const minX = Math.max(0, posJugador.x - radioVisionCasillas);
  const maxX = Math.min(ancho - 1, posJugador.x + radioVisionCasillas);
  const minY = Math.max(0, posJugador.y - radioVisionCasillas);
  const maxY = Math.min(alto - 1, posJugador.y + radioVisionCasillas);

  // 3. Trazar líneas de visión (Raycasting) hacia el perímetro de la caja de visión
  for (let ty = minY; ty <= maxY; ty++) {
    for (let tx = minX; tx <= maxX; tx++) {
      const dist = Math.hypot(tx - posJugador.x, ty - posJugador.y);
      if (dist > radioVisionCasillas) continue;

      const linea = trazarLinea(posJugador.x, posJugador.y, tx, ty);
      let lineaBloqueada = false;

      for (let i = 0; i < linea.length; i++) {
        const pt = linea[i];
        if (pt.x < 0 || pt.x >= ancho || pt.y < 0 || pt.y >= alto) break;

        const casilla = casillas[pt.y][pt.x];

        if (!lineaBloqueada) {
          casilla.visible = true;
          casilla.visitada = true;
        }

        // Si esta casilla intermedia es opaca y no es el origen, bloquea todo lo que hay detrás
        if (i > 0 && bloqueaVision(casilla.tipoTerreno)) {
          lineaBloqueada = true;
        }
      }
    }
  }
}

/**
 * Calcula el conjunto de casillas transitables alcanzables en este turno
 * según la velocidad en pies del personaje (e.g. 30 pies = 6 casillas).
 */
export function calcularCasillasAlcanzables(
  mapa: Mapa2D,
  inicio: { x: number; y: number },
  velocidadPies: number,
  piesPorCasilla: number = 5
): Set<string> {
  const maxCasillas = Math.floor(velocidadPies / piesPorCasilla);
  const alcanzables = new Set<string>();
  if (maxCasillas <= 0) return alcanzables;

  // Cola para búsqueda en anchura (BFS): [x, y, coste]
  const cola: Array<[number, number, number]> = [[inicio.x, inicio.y, 0]];
  const visitados = new Map<string, number>();
  visitados.set(`${inicio.x},${inicio.y}`, 0);

  const direcciones = [
    [0, -1], // Norte
    [0, 1],  // Sur
    [-1, 0], // Oeste
    [1, 0],  // Este
    [-1, -1], // Diagonales
    [1, -1],
    [-1, 1],
    [1, 1],
  ];

  while (cola.length > 0) {
    const [cx, cy, coste] = cola.shift()!;

    for (const [dx, dy] of direcciones) {
      const nx = cx + dx;
      const ny = cy + dy;

      if (nx < 0 || nx >= mapa.ancho || ny < 0 || ny >= mapa.alto) continue;

      const casilla = mapa.casillas[ny][nx];
      if (!esCasillaTransitable(casilla.tipoTerreno)) continue;

      // Verificar si hay una entidad que bloquea el paso (ej. enemigo vivo)
      const entidadBloqueante = mapa.entidades.find(
        (e) => e.x === nx && e.y === ny && e.tipo === 'enemigo' && (e.pgActual === undefined || e.pgActual > 0)
      );
      if (entidadBloqueante) continue;

      const nuevoCoste = coste + 1;
      if (nuevoCoste <= maxCasillas) {
        const clave = `${nx},${ny}`;
        const costeExistente = visitados.get(clave);

        if (costeExistente === undefined || nuevoCoste < costeExistente) {
          visitados.set(clave, nuevoCoste);
          alcanzables.add(clave);
          cola.push([nx, ny, nuevoCoste]);
        }
      }
    }
  }

  // Quitar la casilla de origen donde ya está
  alcanzables.delete(`${inicio.x},${inicio.y}`);
  return alcanzables;
}

// Distancia en pies según la regla clásica de D&D (Chebyshev: 1 diagonal = 5 pies)
export function calcularDistanciaPies(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  piesPorCasilla: number = 5
): number {
  const dx = Math.abs(p1.x - p2.x);
  const dy = Math.abs(p1.y - p2.y);
  return Math.max(dx, dy) * piesPorCasilla;
}
