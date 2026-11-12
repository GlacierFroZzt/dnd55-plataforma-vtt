import { Mapa2D, CasillaMapa, EntidadMapa, BiomaMapa, TipoTerreno } from '@/esquemas/mapa2d';

export interface OpcionesRenderizado {
  tamanoCasilla: number;
  camaraOffset: { x: number; y: number };
  anchoCanvas: number;
  altoCanvas: number;
  casillasAlcanzables?: Set<string>;
  casillaSeleccionada?: { x: number; y: number } | null;
  posicionJugador: { x: number; y: number };
  alcanceArmaCasillas?: number;
  tiempoTick?: number;
}

export function renderizarMapaCanvas(
  ctx: CanvasRenderingContext2D,
  mapa: Mapa2D,
  opciones: OpcionesRenderizado
): void {
  const {
    tamanoCasilla,
    camaraOffset,
    anchoCanvas,
    altoCanvas,
    casillasAlcanzables = new Set(),
    casillaSeleccionada = null,
    posicionJugador,
    tiempoTick = 0,
  } = opciones;

  // Limpiar lienzo completo
  ctx.fillStyle = '#070b14';
  ctx.fillRect(0, 0, anchoCanvas, altoCanvas);

  ctx.save();
  // Aplicar traslación de la cámara (Pan)
  ctx.translate(camaraOffset.x, camaraOffset.y);

  // Calcular rango visible en pantalla para frustum culling
  const startX = Math.max(0, Math.floor(-camaraOffset.x / tamanoCasilla));
  const endX = Math.min(mapa.ancho, Math.ceil((anchoCanvas - camaraOffset.x) / tamanoCasilla) + 1);
  const startY = Math.max(0, Math.floor(-camaraOffset.y / tamanoCasilla));
  const endY = Math.min(mapa.alto, Math.ceil((altoCanvas - camaraOffset.y) / tamanoCasilla) + 1);

  // 1. DIBUJAR TERRENO DE CASILLAS
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const casilla = mapa.casillas[y]?.[x];
      if (!casilla) continue;

      const px = x * tamanoCasilla;
      const py = y * tamanoCasilla;

      // Si hay niebla activa y nunca ha sido visitada, se deja en negro
      if (mapa.nieblaGuerraActiva && !casilla.visitada) {
        ctx.fillStyle = '#050811';
        ctx.fillRect(px, py, tamanoCasilla, tamanoCasilla);
        continue;
      }

      // Dibujar suelo o muro según bioma
      dibujarCasillaBioma(ctx, casilla, px, py, tamanoCasilla, mapa.bioma);

      // Resaltar rango de movimiento alcanzable (halo cyan)
      if (casillasAlcanzables.has(`${x},${y}`) && (!mapa.nieblaGuerraActiva || casilla.visible)) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.22)';
        ctx.fillRect(px, py, tamanoCasilla, tamanoCasilla);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 0.5, py + 0.5, tamanoCasilla - 1, tamanoCasilla - 1);
      }

      // Resaltar casilla seleccionada (halo ámbar)
      if (casillaSeleccionada && casillaSeleccionada.x === x && casillaSeleccionada.y === y) {
        ctx.fillStyle = 'rgba(245, 158, 11, 0.3)';
        ctx.fillRect(px, py, tamanoCasilla, tamanoCasilla);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.strokeRect(px + 1, py + 1, tamanoCasilla - 2, tamanoCasilla - 2);
      }

      // Cuadrícula sutil
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, tamanoCasilla, tamanoCasilla);
    }
  }

  // 2. EFECTO DINÁMICO DE LUZ DE ANTORCHAS / FOGATA
  const parpadeoLuz = Math.sin(tiempoTick * 0.005) * 0.08 + 1;
  const pxJug = (posicionJugador.x + 0.5) * tamanoCasilla;
  const pyJug = (posicionJugador.y + 0.5) * tamanoCasilla;
  const radioHaloLuz = tamanoCasilla * 3.5 * parpadeoLuz;

  const gradienteLuz = ctx.createRadialGradient(pxJug, pyJug, tamanoCasilla * 0.4, pxJug, pyJug, radioHaloLuz);
  gradienteLuz.addColorStop(0, 'rgba(245, 158, 11, 0.12)');
  gradienteLuz.addColorStop(0.5, 'rgba(245, 158, 11, 0.04)');
  gradienteLuz.addColorStop(1, 'rgba(245, 158, 11, 0)');

  ctx.fillStyle = gradienteLuz;
  ctx.beginPath();
  ctx.arc(pxJug, pyJug, radioHaloLuz, 0, Math.PI * 2);
  ctx.fill();

  // 3. DIBUJAR ENTIDADES (Tokens de Personajes, Enemigos y Objetos)
  for (const ent of mapa.entidades) {
    const casilla = mapa.casillas[ent.y]?.[ent.x];

    // Ocultar enemigos y secretos si están en niebla de guerra no visible
    if (mapa.nieblaGuerraActiva && ent.tipo === 'enemigo' && casilla && !casilla.visible) {
      continue;
    }

    if (mapa.nieblaGuerraActiva && !casilla?.visitada) {
      continue;
    }

    const ex = ent.x * tamanoCasilla;
    const ey = ent.y * tamanoCasilla;
    dibujarEntidad(ctx, ent, ex, ey, tamanoCasilla, casilla?.visible ?? true);
  }

  // 4. CAPA DE PENUMBRA / MEMORIA DE NIEBLA DE GUERRA
  if (mapa.nieblaGuerraActiva) {
    for (let y = startY; y < endY; y++) {
      for (let x = startX; x < endX; x++) {
        const casilla = mapa.casillas[y]?.[x];
        if (!casilla) continue;

        const px = x * tamanoCasilla;
        const py = y * tamanoCasilla;

        // Casilla ya visitada pero actualmente fuera de la línea de visión
        if (casilla.visitada && !casilla.visible) {
          ctx.fillStyle = 'rgba(7, 11, 20, 0.72)';
          ctx.fillRect(px, py, tamanoCasilla, tamanoCasilla);
        }
      }
    }
  }

  ctx.restore();
}

function dibujarCasillaBioma(
  ctx: CanvasRenderingContext2D,
  casilla: CasillaMapa,
  px: number,
  py: number,
  size: number,
  bioma: BiomaMapa
) {
  const { tipoTerreno } = casilla;

  // MURO
  if (tipoTerreno === 'muro') {
    switch (bioma) {
      case 'cripta':
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(px, py, size, size);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.strokeRect(px + 1, py + 1, size - 2, size - 2);
        break;
      case 'caverna':
        ctx.fillStyle = '#1c1917';
        ctx.fillRect(px, py, size, size);
        ctx.strokeStyle = '#292524';
        ctx.lineWidth = 2;
        ctx.strokeRect(px + 2, py + 2, size - 4, size - 4);
        break;
      case 'templo':
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(px, py, size, size);
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 2, py + 2, size - 4, size - 4);
        break;
      case 'taberna':
        ctx.fillStyle = '#27170e';
        ctx.fillRect(px, py, size, size);
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 2;
        ctx.strokeRect(px + 1, py + 1, size - 2, size - 2);
        break;
      case 'bosque':
      default:
        ctx.fillStyle = '#052e16';
        ctx.fillRect(px, py, size, size);
        break;
    }
    return;
  }

  // ÁRBOL (En bosque)
  if (tipoTerreno === 'arbol') {
    ctx.fillStyle = '#14532d';
    ctx.fillRect(px, py, size, size);
    ctx.fillStyle = '#064e3b';
    ctx.beginPath();
    ctx.arc(px + size / 2, py + size / 2, size * 0.45, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#052e16';
    ctx.lineWidth = 2;
    ctx.stroke();
    return;
  }

  // AGUA / RIACHUELO / CHARCO
  if (tipoTerreno === 'agua') {
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(px, py, size, size);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(px + size * 0.2, py + size * 0.4, size * 0.6, 2);
    return;
  }

  // MESA / ALTARES
  if (tipoTerreno === 'mesa') {
    ctx.fillStyle = bioma === 'taberna' ? '#78350f' : '#334155';
    ctx.fillRect(px + 3, py + 3, size - 6, size - 6);
    ctx.strokeStyle = bioma === 'taberna' ? '#b45309' : '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.strokeRect(px + 3, py + 3, size - 6, size - 6);
    return;
  }

  // PUERTAS
  if (tipoTerreno === 'puertaCerrada' || tipoTerreno === 'puertaAbierta') {
    ctx.fillStyle = bioma === 'cripta' ? '#1e293b' : '#3f2212';
    ctx.fillRect(px, py, size, size);

    if (tipoTerreno === 'puertaCerrada') {
      ctx.fillStyle = '#92400e';
      ctx.fillRect(px + 4, py + size * 0.35, size - 8, size * 0.3);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(px + size / 2 - 2, py + size * 0.45, 4, 4); // Cerrojo
    } else {
      ctx.strokeStyle = '#78350f';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px + 2, py + 2);
      ctx.lineTo(px + size * 0.3, py + size - 2);
      ctx.stroke();
    }
    return;
  }

  // SUELO SEGÚN BIOMA
  switch (bioma) {
    case 'cripta':
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(px, py, size, size);
      // Detalle de losas de piedra
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 1, py + 1, size - 2, size - 2);
      break;
    case 'caverna':
      ctx.fillStyle = '#292524';
      ctx.fillRect(px, py, size, size);
      break;
    case 'bosque':
      ctx.fillStyle = '#15803d';
      ctx.fillRect(px, py, size, size);
      // Briznas de hierba sutiles
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(px + size * 0.3, py + size * 0.4, 2, 4);
      break;
    case 'templo':
      ctx.fillStyle = '#334155';
      ctx.fillRect(px, py, size, size);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.strokeRect(px + 2, py + 2, size - 4, size - 4);
      break;
    case 'taberna':
      ctx.fillStyle = '#451a03';
      ctx.fillRect(px, py, size, size);
      ctx.strokeStyle = '#27170e';
      ctx.lineWidth = 1;
      ctx.strokeRect(px, py, size, size);
      break;
    default:
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(px, py, size, size);
  }
}

function dibujarEntidad(
  ctx: CanvasRenderingContext2D,
  ent: EntidadMapa,
  ex: number,
  ey: number,
  size: number,
  esVisible: boolean
) {
  const centroX = ex + size / 2;
  const centroY = ey + size / 2;
  const radio = size * 0.42;

  // Sombra proyectada
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.beginPath();
  ctx.ellipse(centroX, ey + size * 0.85, radio * 0.8, radio * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  // Fondo circular del token
  ctx.fillStyle = ent.tipo === 'jugador' ? '#1e1b4b' : ent.tipo === 'enemigo' ? '#450a0a' : '#042f2e';
  ctx.beginPath();
  ctx.arc(centroX, centroY, radio, 0, Math.PI * 2);
  ctx.fill();

  // Borde circular
  ctx.strokeStyle = ent.colorBorde || '#f59e0b';
  ctx.lineWidth = ent.tipo === 'jugador' ? 3 : 2;
  ctx.stroke();

  // Icono / Emoji en el centro
  ctx.font = `${Math.floor(size * 0.52)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(ent.icono || '🛡️', centroX, centroY + 1);

  // Barra miniatura de vida para criaturas vivas
  if (esVisible && ent.pgActual !== undefined && ent.pgMax !== undefined && ent.pgMax > 0) {
    const anchoBarra = size * 0.8;
    const altoBarra = 3;
    const bx = centroX - anchoBarra / 2;
    const by = ey + size * 0.08;
    const pct = Math.max(0, Math.min(1, ent.pgActual / ent.pgMax));

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(bx, by, anchoBarra, altoBarra);

    ctx.fillStyle = pct > 0.5 ? '#10b981' : pct > 0.2 ? '#f59e0b' : '#ef4444';
    ctx.fillRect(bx, by, anchoBarra * pct, altoBarra);
  }
}
