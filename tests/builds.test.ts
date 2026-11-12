import { describe, it, expect } from 'vitest';
import { BUILDS_SUGERIDAS_55, DICCIONARIO_BUILDS_POR_CLASE } from '@/datos/builds';
import { BuildSugeridaSchema } from '@/esquemas/buildSugerida';
import { TODAS_LAS_CLASES_55 } from '@/datos/clases';
import { CATALOGO_ARMAS_55 } from '@/datos/armas';
import { DOTES_ORIGEN_55 } from '@/datos/dotes/dotesOrigen';

describe('Builds Sugeridas Oficiales 2024 (Revisión D&D 5.5)', () => {
  it('debe tener al menos una build sugerida para cada una de las 12 clases oficiales', () => {
    for (const clase of TODAS_LAS_CLASES_55) {
      const buildsClase = DICCIONARIO_BUILDS_POR_CLASE[clase.id];
      expect(buildsClase, `Faltan builds sugeridas para la clase ${clase.id}`).toBeDefined();
      expect(buildsClase.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('todas las builds deben validar contra BuildSugeridaSchema', () => {
    for (const build of BUILDS_SUGERIDAS_55) {
      const res = BuildSugeridaSchema.safeParse(build);
      expect(res.success, `Error de validación en build ${build.id}: ${JSON.stringify(res.error)}`).toBe(true);
    }
  });

  it('cada build debe tener puntuaciones de características en rango válido (entre 8 y 18)', () => {
    for (const b of BUILDS_SUGERIDAS_55) {
      const { fuerza, destreza, constitucion, inteligencia, sabiduria, carisma } = b.puntuaciones;
      expect(fuerza).toBeGreaterThanOrEqual(8);
      expect(fuerza).toBeLessThanOrEqual(18);
      expect(destreza).toBeGreaterThanOrEqual(8);
      expect(destreza).toBeLessThanOrEqual(18);
      expect(constitucion).toBeGreaterThanOrEqual(8);
      expect(constitucion).toBeLessThanOrEqual(18);
      expect(inteligencia).toBeGreaterThanOrEqual(8);
      expect(inteligencia).toBeLessThanOrEqual(18);
      expect(sabiduria).toBeGreaterThanOrEqual(8);
      expect(sabiduria).toBeLessThanOrEqual(18);
      expect(carisma).toBeGreaterThanOrEqual(8);
      expect(carisma).toBeLessThanOrEqual(18);
    }
  });

  it('todas las dotes de origen y armas recomendadas deben ser válidas', () => {
    for (const b of BUILDS_SUGERIDAS_55) {
      expect(DOTES_ORIGEN_55[b.doteOrigenRecomendada], `Dote inválida ${b.doteOrigenRecomendada} en build ${b.id}`).toBeDefined();
      for (const arma of b.armasRecomendadas) {
        expect(CATALOGO_ARMAS_55[arma], `Arma inválida ${arma} en build ${b.id}`).toBeDefined();
      }
    }
  });
});
