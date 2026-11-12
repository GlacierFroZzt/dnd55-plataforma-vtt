/**
 * Reglas de Agotamiento de D&D 5.5 (Revisión 2024):
 * - Niveles del 1 al 6.
 * - Penalizador a pruebas d20: -2 por cada nivel acumulativo (Nivel 1 = -2, Nivel 2 = -4, ..., Nivel 5 = -10).
 * - Penalizador a CD de salvación de conjuros: -2 por cada nivel.
 * - Reducción de velocidad: -5 pies por cada nivel acumulativo.
 * - Nivel 6: Muerte inmediata del personaje.
 * - Descanso Largo: reduce el nivel en 1.
 */

export interface EfectosAgotamiento55 {
  nivel: number;
  penalizadorPruebasD20: number;
  penalizadorCDConjuros: number;
  penalizadorVelocidadPies: number;
  estaMuerto: boolean;
  descripcionResumen: string;
}

export function calcularEfectosAgotamiento(nivel: number): EfectosAgotamiento55 {
  const nivelSeguro = Math.max(0, Math.min(6, Math.floor(nivel)));

  if (nivelSeguro === 0) {
    return {
      nivel: 0,
      penalizadorPruebasD20: 0,
      penalizadorCDConjuros: 0,
      penalizadorVelocidadPies: 0,
      estaMuerto: false,
      descripcionResumen: 'Sin agotamiento.',
    };
  }

  if (nivelSeguro >= 6) {
    return {
      nivel: 6,
      penalizadorPruebasD20: -12,
      penalizadorCDConjuros: -12,
      penalizadorVelocidadPies: -30,
      estaMuerto: true,
      descripcionResumen: 'Agotamiento Nivel 6: Muerte instantánea por fatiga total.',
    };
  }

  const penalizador = nivelSeguro * -2;
  const reduccionVelocidad = nivelSeguro * -5;

  return {
    nivel: nivelSeguro,
    penalizadorPruebasD20: penalizador,
    penalizadorCDConjuros: penalizador,
    penalizadorVelocidadPies: reduccionVelocidad,
    estaMuerto: false,
    descripcionResumen: `Agotamiento Nivel ${nivelSeguro}: ${penalizador} a pruebas d20 y CDs de conjuros, ${reduccionVelocidad} pies a velocidad.`,
  };
}

export function aplicarDescansoLargoAgotamiento(nivelActual: number): number {
  return Math.max(0, nivelActual - 1);
}
