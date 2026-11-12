import { Mapa2D, BiomaMapa, CasillaMapa, EntidadMapa, TipoTerreno } from '@/esquemas/mapa2d';

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Generador pseudo-aleatorio con semilla determinista
function crearPRNG(seedInicial: number) {
  let s = seedInicial;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generarMapaProcedural(bioma: BiomaMapa = 'cripta', semilla: number = Date.now()): Mapa2D {
  const rand = crearPRNG(semilla);
  const ancho = bioma === 'taberna' ? 20 : 24;
  const alto = bioma === 'taberna' ? 18 : 24;

  // Inicializar cuadrícula base
  const casillas: CasillaMapa[][] = [];
  for (let y = 0; y < alto; y++) {
    const fila: CasillaMapa[] = [];
    for (let x = 0; x < ancho; x++) {
      fila.push({
        x,
        y,
        tipoTerreno: 'muro',
        visible: false,
        visitada: false,
      });
    }
    casillas.push(fila);
  }

  const entidades: EntidadMapa[] = [];
  let posJugador = { x: 2, y: 2 };

  switch (bioma) {
    case 'cripta':
      posJugador = generarCripta(casillas, entidades, ancho, alto, rand);
      break;
    case 'caverna':
      posJugador = generarCaverna(casillas, entidades, ancho, alto, rand);
      break;
    case 'bosque':
      posJugador = generarBosque(casillas, entidades, ancho, alto, rand);
      break;
    case 'templo':
      posJugador = generarTemplo(casillas, entidades, ancho, alto, rand);
      break;
    case 'taberna':
      posJugador = generarTaberna(casillas, entidades, ancho, alto, rand);
      break;
  }

  // Asegurar que la casilla inicial del jugador sea transitable
  if (casillas[posJugador.y]?.[posJugador.x]) {
    casillas[posJugador.y][posJugador.x].tipoTerreno = 'suelo';
    casillas[posJugador.y][posJugador.x].visitada = true;
    casillas[posJugador.y][posJugador.x].visible = true;
  }

  // Agregar el token del jugador a las entidades
  entidades.unshift({
    id: 'ent_jugador',
    nombre: 'Mi Personaje',
    tipo: 'jugador',
    x: posJugador.x,
    y: posJugador.y,
    icono: '🛡️',
    colorBorde: '#f59e0b',
    esInteractuable: false,
    estadoInteractuado: false,
    descripcion: 'Aventurero activo en la escena',
  });

  const nombresBiomas: Record<BiomaMapa, string> = {
    cripta: 'Cripta de los Antiguos',
    caverna: 'Cavernas del Eco Sombrío',
    bosque: 'Bosque de las Sombras',
    templo: 'Templo Olvidado de Eldoria',
    taberna: 'Taberna El Grifo Carmesí',
  };

  return {
    id: `mapa_${bioma}_${semilla}`,
    nombre: nombresBiomas[bioma],
    bioma,
    ancho,
    alto,
    casillas,
    entidades,
    posicionJugadorInicial: posJugador,
    nieblaGuerraActiva: true,
    piesPorCasilla: 5,
  };
}

// 1. GENERADOR DE CRIPTA / MAZMORRA (Salas rectangulares y pasillos)
function generarCripta(
  grid: CasillaMapa[][],
  entidades: EntidadMapa[],
  w: number,
  h: number,
  rand: () => number
): { x: number; y: number } {
  const salas: Rect[] = [];
  const numSalasIntentos = 8;

  for (let i = 0; i < numSalasIntentos; i++) {
    const rw = Math.floor(rand() * 4) + 4; // 4 a 7
    const rh = Math.floor(rand() * 4) + 4;
    const rx = Math.floor(rand() * (w - rw - 2)) + 1;
    const ry = Math.floor(rand() * (h - rh - 2)) + 1;

    const nuevaSala: Rect = { x: rx, y: ry, w: rw, h: rh };
    const solapa = salas.some(
      (s) =>
        nuevaSala.x < s.x + s.w + 1 &&
        nuevaSala.x + nuevaSala.w + 1 > s.x &&
        nuevaSala.y < s.y + s.h + 1 &&
        nuevaSala.y + nuevaSala.h + 1 > s.y
    );

    if (!solapa) {
      salas.push(nuevaSala);
      for (let y = ry; y < ry + rh; y++) {
        for (let x = rx; x < rx + rw; x++) {
          grid[y][x].tipoTerreno = 'suelo';
        }
      }
    }
  }

  // Si se crearon menos de 2 salas, crear 2 por defecto
  if (salas.length < 2) {
    salas.push({ x: 2, y: 2, w: 6, h: 6 });
    salas.push({ x: 14, y: 14, w: 7, h: 7 });
    for (const s of salas) {
      for (let y = s.y; y < s.y + s.h; y++) {
        for (let x = s.x; x < s.x + s.w; x++) {
          grid[y][x].tipoTerreno = 'suelo';
        }
      }
    }
  }

  // Conectar salas consecutivas con pasillos
  for (let i = 0; i < salas.length - 1; i++) {
    const s1 = salas[i];
    const s2 = salas[i + 1];
    const c1x = Math.floor(s1.x + s1.w / 2);
    const c1y = Math.floor(s1.y + s1.h / 2);
    const c2x = Math.floor(s2.x + s2.w / 2);
    const c2y = Math.floor(s2.y + s2.h / 2);

    // Pasillo horizontal
    const minX = Math.min(c1x, c2x);
    const maxX = Math.max(c1x, c2x);
    for (let x = minX; x <= maxX; x++) {
      grid[c1y][x].tipoTerreno = 'suelo';
    }

    // Pasillo vertical
    const minY = Math.min(c1y, c2y);
    const maxY = Math.max(c1y, c2y);
    for (let y = minY; y <= maxY; y++) {
      grid[y][c2x].tipoTerreno = 'suelo';
    }

    // Colocar puerta en la entrada de la sala destino
    grid[s2.y][c2x].tipoTerreno = 'puertaCerrada';
  }

  const primeraSala = salas[0];
  const ultimaSala = salas[salas.length - 1];

  const posJugador = {
    x: Math.floor(primeraSala.x + primeraSala.w / 2),
    y: Math.floor(primeraSala.y + primeraSala.h / 2),
  };

  // Agregar antorchas en la primera sala
  entidades.push({
    id: 'antorcha_1',
    nombre: 'Antorcha Encantada',
    tipo: 'antorcha',
    x: primeraSala.x,
    y: primeraSala.y + 1,
    icono: '🔥',
    colorBorde: '#f97316',
    esInteractuable: true,
    descripcion: 'Arroja luz brillante en 20 pies y tenue en otros 20 pies.',
  });

  // Agregar enemigos en salas secundarias
  if (salas.length > 1) {
    const sEnemigo = salas[1];
    entidades.push({
      id: 'enemigo_esqueleto_1',
      nombre: 'Guardián Esqueleto',
      tipo: 'enemigo',
      x: sEnemigo.x + 2,
      y: sEnemigo.y + 2,
      icono: '💀',
      colorBorde: '#ef4444',
      pgActual: 13,
      pgMax: 13,
      ca: 13,
      esInteractuable: true,
      descripcion: 'Esqueleto ancestral blandiendo una espada corta oxidada.',
    });
  }

  // Cofre / Sarcófago en la última sala
  entidades.push({
    id: 'sarcofago_reliquia',
    nombre: 'Sarcófago de Piedra Tallada',
    tipo: 'sarcofago',
    x: Math.floor(ultimaSala.x + ultimaSala.w / 2),
    y: Math.floor(ultimaSala.y + ultimaSala.h / 2),
    icono: '⚰️',
    colorBorde: '#a855f7',
    esInteractuable: true,
    descripcion: 'Inscrito con runas arcanas de la cripta. Contiene una reliquia.',
  });

  return posJugador;
}

// 2. GENERADOR DE CAVERNAS (Autómata Celular orgánico)
function generarCaverna(
  grid: CasillaMapa[][],
  entidades: EntidadMapa[],
  w: number,
  h: number,
  rand: () => number
): { x: number; y: number } {
  // Inicialización con ruido aleatorio (48% suelo)
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      grid[y][x].tipoTerreno = rand() < 0.52 ? 'suelo' : 'muro';
    }
  }

  // 3 pasadas de suavizado celular
  for (let paso = 0; paso < 3; paso++) {
    const copia = grid.map((fila) => fila.map((c) => c.tipoTerreno));
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        let murosVecinos = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (copia[y + dy][x + dx] === 'muro') murosVecinos++;
          }
        }
        grid[y][x].tipoTerreno = murosVecinos >= 5 ? 'muro' : 'suelo';
      }
    }
  }

  // Agregar un estanque subterráneo
  const centroX = Math.floor(w / 2);
  const centroY = Math.floor(h / 2);
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      if (dx * dx + dy * dy <= 4) {
        grid[centroY + dy][centroX + dx].tipoTerreno = 'agua';
      }
    }
  }

  // Buscar una casilla transitable para el jugador en el cuadrante suroeste
  let posJugador = { x: 3, y: h - 4 };
  for (let y = h - 3; y >= 2; y--) {
    for (let x = 2; x < w - 2; x++) {
      if (grid[y][x].tipoTerreno === 'suelo') {
        posJugador = { x, y };
        break;
      }
    }
  }

  // Entidades en la caverna
  entidades.push({
    id: 'enemigo_arana',
    nombre: 'Araña Gigante de las Profundidades',
    tipo: 'enemigo',
    x: Math.min(w - 4, centroX + 3),
    y: Math.max(3, centroY - 3),
    icono: '🕷️',
    colorBorde: '#ef4444',
    pgActual: 26,
    pgMax: 26,
    ca: 14,
    esInteractuable: true,
    descripcion: 'Monstruosidad con colmillos venenosos acechando en las sombras.',
  });

  entidades.push({
    id: 'cofre_gemas',
    nombre: 'Veta Mineral / Cristal Brillante',
    tipo: 'cofre',
    x: Math.min(w - 3, centroX + 4),
    y: Math.min(h - 3, centroY + 4),
    icono: '💎',
    colorBorde: '#38bdf8',
    esInteractuable: true,
    descripcion: 'Gemas fluorescentes que pueden ser extraídas con tirada de atletismo o herramientas.',
  });

  return posJugador;
}

// 3. GENERADOR DE BOSQUE (Claros de hierba y arboledas)
function generarBosque(
  grid: CasillaMapa[][],
  entidades: EntidadMapa[],
  w: number,
  h: number,
  rand: () => number
): { x: number; y: number } {
  // Todo comienza como suelo
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      grid[y][x].tipoTerreno = 'suelo';
    }
  }

  // Borde de árboles y grupos boscosos
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x === 0 || x === w - 1 || y === 0 || y === h - 1) {
        grid[y][x].tipoTerreno = 'arbol';
      } else {
        // Árboles dispersos excepto en el centro
        const distCentro = Math.hypot(x - w / 2, y - h / 2);
        if (distCentro > 4 && rand() < 0.28) {
          grid[y][x].tipoTerreno = 'arbol';
        }
      }
    }
  }

  // Riachuelo cruzando el bosque
  for (let y = 1; y < h - 1; y++) {
    const rx = Math.floor(w * 0.75 + Math.sin(y * 0.5) * 1.5);
    if (rx > 0 && rx < w - 1) {
      grid[y][rx].tipoTerreno = 'agua';
      grid[y][rx + 1].tipoTerreno = 'agua';
    }
  }

  const centroX = Math.floor(w / 2);
  const centroY = Math.floor(h / 2);

  // Fogata en el centro del claro
  entidades.push({
    id: 'fogata_campamento',
    nombre: 'Hoguera de Campamento',
    tipo: 'antorcha',
    x: centroX,
    y: centroY,
    icono: '🏕️',
    colorBorde: '#f97316',
    esInteractuable: true,
    descripcion: 'Hoguera crepitante donde el grupo puede tomar un descanso corto o largo.',
  });

  // Enemigo emboscado
  entidades.push({
    id: 'enemigo_lobo',
    nombre: 'Lobo Alfa Sombrío',
    tipo: 'enemigo',
    x: centroX + 4,
    y: centroY - 2,
    icono: '🐺',
    colorBorde: '#ef4444',
    pgActual: 18,
    pgMax: 18,
    ca: 13,
    esInteractuable: true,
    descripcion: 'Feroz depredador nocturno protegiendo su territorio.',
  });

  // PNJ explorador
  entidades.push({
    id: 'pnj_guardabosques',
    nombre: 'Elara la Rastreadora',
    tipo: 'pnj',
    x: centroX - 2,
    y: centroY + 1,
    icono: '🧝‍♀️',
    colorBorde: '#10b981',
    esInteractuable: true,
    descripcion: 'Elfa exploradora que conoce el sendero hacia las ruinas olvidadas.',
  });

  return { x: centroX - 3, y: centroY };
}

// 4. GENERADOR DE TEMPLO ARCANO (Nave central simétrica y altares)
function generarTemplo(
  grid: CasillaMapa[][],
  entidades: EntidadMapa[],
  w: number,
  h: number,
  _rand: () => number
): { x: number; y: number } {
  // Borde de muros exteriores
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const enBorde = x <= 2 || x >= w - 3 || y <= 2 || y >= h - 3;
      grid[y][x].tipoTerreno = enBorde ? 'muro' : 'suelo';
    }
  }

  // Columnas gemelas ceremoniales
  for (let y = 6; y <= h - 7; y += 3) {
    grid[y][6].tipoTerreno = 'muro';
    grid[y][w - 7].tipoTerreno = 'muro';
  }

  // Entrada sur con puertas
  const entradaX = Math.floor(w / 2);
  grid[h - 3][entradaX].tipoTerreno = 'puertaAbierta';
  grid[h - 3][entradaX - 1].tipoTerreno = 'puertaAbierta';

  // Altar en el norte
  const altarX = Math.floor(w / 2);
  const altarY = 5;
  grid[altarY][altarX].tipoTerreno = 'mesa';

  entidades.push({
    id: 'altar_arcano',
    nombre: 'Altar de la Llama Radiante',
    tipo: 'sarcofago',
    x: altarX,
    y: altarY,
    icono: '✨',
    colorBorde: '#38bdf8',
    esInteractuable: true,
    descripcion: 'Altar consagrado que confiere bendiciones divinas a los píos.',
  });

  entidades.push({
    id: 'enemigo_guardian_piedra',
    nombre: 'Gárgola Guardiana de Piedra',
    tipo: 'enemigo',
    x: altarX,
    y: altarY + 3,
    icono: '🗿',
    colorBorde: '#ef4444',
    pgActual: 38,
    pgMax: 38,
    ca: 15,
    esInteractuable: true,
    descripcion: 'Constructo de mármol que cobra vida ante intrusos.',
  });

  return { x: entradaX, y: h - 5 };
}

// 5. GENERADOR DE TABERNA (Salón de madera con mesas, barra y chimenea)
function generarTaberna(
  grid: CasillaMapa[][],
  entidades: EntidadMapa[],
  w: number,
  h: number,
  _rand: () => number
): { x: number; y: number } {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const borde = x === 0 || x === w - 1 || y === 0 || y === h - 1;
      grid[y][x].tipoTerreno = borde ? 'muro' : 'suelo';
    }
  }

  // Puerta de entrada sur
  const puertaX = Math.floor(w / 2);
  grid[h - 1][puertaX].tipoTerreno = 'puertaAbierta';

  // Barra del bar (en L en la esquina noroeste)
  for (let x = 3; x <= 8; x++) {
    grid[4][x].tipoTerreno = 'mesa';
  }
  for (let y = 2; y <= 4; y++) {
    grid[y][8].tipoTerreno = 'mesa';
  }

  // Mesas para comensales
  const mesas = [
    { x: 4, y: 8 },
    { x: 4, y: 12 },
    { x: 12, y: 6 },
    { x: 12, y: 10 },
    { x: 12, y: 14 },
    { x: 16, y: 8 },
  ];
  for (const m of mesas) {
    if (m.x < w - 1 && m.y < h - 1) {
      grid[m.y][m.x].tipoTerreno = 'mesa';
    }
  }

  // Chimenea en el muro este
  grid[Math.floor(h / 2)][w - 1].tipoTerreno = 'muro';
  entidades.push({
    id: 'chimenea_taberna',
    nombre: 'Chimenea Crepitante',
    tipo: 'antorcha',
    x: w - 2,
    y: Math.floor(h / 2),
    icono: '🔥',
    colorBorde: '#f97316',
    esInteractuable: true,
    descripcion: 'Hogar cálido donde los aventureros descansan de los rigores del viaje.',
  });

  // Tabernero PNJ
  entidades.push({
    id: 'pnj_tabernero',
    nombre: 'Barnaby Barba-Castaña',
    tipo: 'pnj',
    x: 5,
    y: 2,
    icono: '🍺',
    colorBorde: '#10b981',
    esInteractuable: true,
    descripcion: 'Tabernero bonachón con rumores sobre los misterios de la cripta.',
  });

  // Bardo
  entidades.push({
    id: 'pnj_barda',
    nombre: 'Lyra la Trovadora',
    tipo: 'pnj',
    x: 16,
    y: 4,
    icono: '🪕',
    colorBorde: '#a855f7',
    esInteractuable: true,
    descripcion: 'Música ambulante dispuesta a otorgar Inspiración Bárdica.',
  });

  return { x: puertaX, y: h - 3 };
}
