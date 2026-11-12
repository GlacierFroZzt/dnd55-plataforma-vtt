import {
  SolicitudTiradaD20,
  ResultadoTiradaD20,
  ModificadorVentaja,
} from '@/esquemas/d20';

/**
 * Calcula el modificador de una puntuación de característica según la regla D&D 5.5:
 * Modificador = Math.floor((puntuación - 10) / 2)
 */
export function calcularModificadorCaracteristica(puntuacion: number): number {
  return Math.floor((puntuacion - 10) / 2);
}

/**
 * Calcula el Bonificador por Competencia según el nivel del personaje (1-20):
 * Niveles 1-4: +2
 * Niveles 5-8: +3
 * Niveles 9-12: +4
 * Niveles 13-16: +5
 * Niveles 17-20: +6
 */
export function calcularBonificadorCompetencia(nivel: number): number {
  if (nivel <= 4) return 2;
  if (nivel <= 8) return 3;
  if (nivel <= 12) return 4;
  if (nivel <= 16) return 5;
  return 6;
}

/**
 * Resuelve una prueba D20 completa con ventaja/desventaja, críticos e inspiración heroica
 */
export function resolverPruebaD20(
  solicitud: SolicitudTiradaD20,
  dadosManuales?: { dado1?: number; dado2?: number }
): ResultadoTiradaD20 {
  const d1 = dadosManuales?.dado1 ?? Math.floor(Math.random() * 20) + 1;
  let d2: number | undefined = undefined;

  let dadoElegido = d1;

  if (solicitud.ventaja === 'ventaja') {
    d2 = dadosManuales?.dado2 ?? Math.floor(Math.random() * 20) + 1;
    dadoElegido = Math.max(d1, d2);
  } else if (solicitud.ventaja === 'desventaja') {
    d2 = dadosManuales?.dado2 ?? Math.floor(Math.random() * 20) + 1;
    dadoElegido = Math.min(d1, d2);
  }

  // Si se usa Inspiración Heroica y el resultado fue bajo (por ejemplo <= 9), se puede volver a tirar
  if (solicitud.usaInspiracionHeroica && dadoElegido <= 9) {
    const retira = Math.floor(Math.random() * 20) + 1;
    dadoElegido = retira;
  }

  const esCritico20 = dadoElegido === 20;
  const esPifia1 = dadoElegido === 1;

  const total = dadoElegido +
    (solicitud.tipoPrueba === 'salvacionMuerte' ? 0 : 0) + // Salvación de muerte es d20 puro contra CD 10
    0;

  // En una tirada real, los modificadores vendrán inyectados
  return {
    solicitudId: solicitud.id,
    dado1: d1,
    dado2: d2,
    dadoElegido,
    modificadorBase: 0,
    bonificadorCompetencia: 0,
    modificadoresAdicionales: 0,
    total: dadoElegido,
    esCritico20,
    esPifia1,
    exito: solicitud.dificultadCD ? (esCritico20 || (!esPifia1 && total >= solicitud.dificultadCD)) : undefined,
    detalleTexto: `Tirada [${dadoElegido}] ${solicitud.ventaja !== 'normal' ? `(${solicitud.ventaja})` : ''}`,
  };
}
