import { describe, it, expect } from 'vitest';
import { generarMapaProcedural } from '@/motor/mapa/generadorProcedural';
import {
  actualizarNieblaDeGuerra,
  calcularCasillasAlcanzables,
  esCasillaTransitable,
  calcularDistanciaPies,
} from '@/motor/mapa/calculadorVisionNiebla';
import { BiomaMapa } from '@/esquemas/mapa2d';

describe('Motor de Generación Procedural de Mapas 2D (5 Biomas)', () => {
  const biomas: BiomaMapa[] = ['cripta', 'bosque', 'caverna', 'templo', 'taberna'];

  biomas.forEach((bioma) => {
    it(`debe generar un mapa válido y jugable para el bioma: ${bioma}`, () => {
      const mapa = generarMapaProcedural(bioma, 12345);

      expect(mapa.bioma).toBe(bioma);
      expect(mapa.ancho).toBeGreaterThanOrEqual(18);
      expect(mapa.alto).toBeGreaterThanOrEqual(18);
      expect(mapa.casillas.length).toBe(mapa.alto);
      expect(mapa.casillas[0].length).toBe(mapa.ancho);

      // Posición inicial del jugador debe estar dentro de límites y ser transitable
      const { x, y } = mapa.posicionJugadorInicial;
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(mapa.ancho);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThan(mapa.alto);

      const casillaInicio = mapa.casillas[y][x];
      expect(esCasillaTransitable(casillaInicio.tipoTerreno)).toBe(true);

      // El token del jugador debe existir en las entidades
      const tokenJugador = mapa.entidades.find((e) => e.tipo === 'jugador');
      expect(tokenJugador).toBeDefined();
      expect(tokenJugador?.x).toBe(x);
      expect(tokenJugador?.y).toBe(y);
    });
  });

  it('debe incluir entidades temáticas según el bioma correspondiente', () => {
    const cripta = generarMapaProcedural('cripta', 42);
    expect(cripta.entidades.some((e) => e.id.includes('sarcofago') || e.id.includes('esqueleto'))).toBe(true);

    const bosque = generarMapaProcedural('bosque', 42);
    expect(bosque.entidades.some((e) => e.id.includes('fogata') || e.id.includes('lobo'))).toBe(true);

    const caverna = generarMapaProcedural('caverna', 42);
    expect(caverna.entidades.some((e) => e.id.includes('arana') || e.id.includes('gemas'))).toBe(true);

    const templo = generarMapaProcedural('templo', 42);
    expect(templo.entidades.some((e) => e.id.includes('altar') || e.id.includes('guardian'))).toBe(true);

    const taberna = generarMapaProcedural('taberna', 42);
    expect(taberna.entidades.some((e) => e.id.includes('tabernero') || e.id.includes('barda'))).toBe(true);
  });
});

describe('Motor de Visión y Niebla de Guerra (Line of Sight D&D 5.5)', () => {
  it('la casilla del jugador siempre debe ser visible y visitada', () => {
    const mapa = generarMapaProcedural('cripta', 999);
    actualizarNieblaDeGuerra(mapa, mapa.posicionJugadorInicial, 7);

    const { x, y } = mapa.posicionJugadorInicial;
    const casillaJugador = mapa.casillas[y][x];
    expect(casillaJugador.visible).toBe(true);
    expect(casillaJugador.visitada).toBe(true);
  });

  it('los muros deben bloquear la línea de visión de las casillas posteriores', () => {
    const mapa = generarMapaProcedural('cripta', 101);
    const { x, y } = mapa.posicionJugadorInicial;

    // Colocar deliberadamente un muro inmediatamente al este y un suelo detrás
    if (x + 2 < mapa.ancho) {
      mapa.casillas[y][x + 1].tipoTerreno = 'muro';
      mapa.casillas[y][x + 2].tipoTerreno = 'suelo';

      actualizarNieblaDeGuerra(mapa, { x, y }, 7);

      // El muro que da frente al jugador es visible
      expect(mapa.casillas[y][x + 1].visible).toBe(true);
      // La casilla detrás del muro queda bloqueada por la línea de visión
      expect(mapa.casillas[y][x + 2].visible).toBe(false);
    }
  });

  it('las casillas visitadas previamente conservan visitada = true al moverse', () => {
    const mapa = generarMapaProcedural('cripta', 202);
    const pos1 = { x: 5, y: 5 };
    mapa.casillas[pos1.y][pos1.x].tipoTerreno = 'suelo';
    actualizarNieblaDeGuerra(mapa, pos1, 7);

    expect(mapa.casillas[pos1.y][pos1.x].visitada).toBe(true);

    // Mover a otra posición distante
    const pos2 = { x: 18, y: 18 };
    mapa.casillas[pos2.y][pos2.x].tipoTerreno = 'suelo';
    actualizarNieblaDeGuerra(mapa, pos2, 3);

    // pos1 ya no es visible, pero permanece visitada en la memoria del mapa
    expect(mapa.casillas[pos1.y][pos1.x].visible).toBe(false);
    expect(mapa.casillas[pos1.y][pos1.x].visitada).toBe(true);
  });
});

describe('Reglas de Movimiento y Cuadrícula Táctica D&D 5.5', () => {
  it('calcula casillas alcanzables según la velocidad en pies', () => {
    const mapa = generarMapaProcedural('cripta', 303);
    const inicio = mapa.posicionJugadorInicial;

    // 30 pies = 6 casillas
    const alcanzables30 = calcularCasillasAlcanzables(mapa, inicio, 30, 5);
    expect(alcanzables30.size).toBeGreaterThan(0);

    // Con 0 pies de velocidad no hay casillas alcanzables
    const alcanzables0 = calcularCasillasAlcanzables(mapa, inicio, 0, 5);
    expect(alcanzables0.size).toBe(0);

    // Ninguna casilla alcanzable debe ser un muro impenetrable
    alcanzables30.forEach((coordStr) => {
      const [cx, cy] = coordStr.split(',').map(Number);
      const casilla = mapa.casillas[cy][cx];
      expect(esCasillaTransitable(casilla.tipoTerreno)).toBe(true);
    });
  });

  it('calcula correctamente la distancia táctica en pies (regla Chebyshev de D&D 5.5)', () => {
    const p1 = { x: 2, y: 2 };
    const p2 = { x: 2, y: 4 }; // 2 casillas verticales = 10 pies
    expect(calcularDistanciaPies(p1, p2, 5)).toBe(10);

    const p3 = { x: 5, y: 5 }; // 3 casillas diagonales = 15 pies (1 casilla diagonal = 5 pies)
    expect(calcularDistanciaPies(p1, p3, 5)).toBe(15);
  });

  it('abrir una puerta cambia su terreno a transitable', () => {
    expect(esCasillaTransitable('puertaCerrada')).toBe(false);
    expect(esCasillaTransitable('puertaAbierta')).toBe(true);
  });
});
