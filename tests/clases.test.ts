import { describe, it, expect } from 'vitest';
import { TODAS_LAS_CLASES_55, DICCIONARIO_CLASES_55 } from '@/datos/clases';
import { TODAS_LAS_DOTES_55 } from '@/datos/dotes';
import { DefinicionClaseSchema } from '@/esquemas/clase';
import { DefinicionDoteSchema } from '@/esquemas/dote';
import { CONDICIONES_55 } from '@/datos/condiciones';
import { ACCIONES_COMBATE_55 } from '@/datos/acciones';
import { MAESTRIAS_ARMAS_55 } from '@/datos/maestrias';
import { CATALOGO_ARMAS_55 } from '@/datos/armas';

describe('Compendio Oficial D&D 5.5 - Validación de Datos y Esquemas Zod', () => {
  it('debe contener exactamente las 12 clases oficiales de D&D 5.5', () => {
    expect(TODAS_LAS_CLASES_55).toHaveLength(12);
    const nombresClases = [
      'barbaro', 'bardo', 'clerigo', 'druida',
      'explorador', 'guerrero', 'hechicero', 'mago',
      'monje', 'paladin', 'picaro', 'brujo'
    ];
    for (const id of nombresClases) {
      expect(DICCIONARIO_CLASES_55[id]).toBeDefined();
    }
  });

  it('cada clase debe tener exactamente 4 subclases desbloqueadas a nivel 3 (48 subclases en total)', () => {
    let totalSubclases = 0;
    for (const clase of TODAS_LAS_CLASES_55) {
      expect(clase.subclases).toHaveLength(4);
      for (const subclase of clase.subclases) {
        expect(subclase.nivelDesbloqueo).toBe(3);
        expect(subclase.rasgos.length).toBeGreaterThan(0);
        totalSubclases++;
      }
    }
    expect(totalSubclases).toBe(48);
  });

  it('todas las clases deben validar exitosamente contra DefinicionClaseSchema', () => {
    for (const clase of TODAS_LAS_CLASES_55) {
      const resultado = DefinicionClaseSchema.safeParse(clase);
      if (!resultado.success) {
        console.error(`Error en clase ${clase.nombre}:`, resultado.error);
      }
      expect(resultado.success).toBe(true);
    }
  });

  it('todas las dotes deben validar exitosamente contra DefinicionDoteSchema', () => {
    expect(TODAS_LAS_DOTES_55.length).toBeGreaterThanOrEqual(25);
    for (const dote of TODAS_LAS_DOTES_55) {
      const resultado = DefinicionDoteSchema.safeParse(dote);
      expect(resultado.success).toBe(true);
    }
  });

  it('debe tener las 15 condiciones de D&D 5.5 incluyendo Agotamiento 5.5', () => {
    expect(Object.keys(CONDICIONES_55)).toHaveLength(15);
    expect(CONDICIONES_55.agotamiento).toBeDefined();
  });

  it('debe tener las 12 acciones formales de combate 2024', () => {
    expect(Object.keys(ACCIONES_COMBATE_55)).toHaveLength(12);
  });

  it('debe tener las 8 maestrías de armas 2024', () => {
    expect(Object.keys(MAESTRIAS_ARMAS_55)).toHaveLength(8);
    const maestrías = ['hendidura', 'roce', 'corteRapido', 'empujon', 'minar', 'ralentizar', 'derribo', 'hostigamiento'];
    for (const m of maestrías) {
      expect(MAESTRIAS_ARMAS_55[m]).toBeDefined();
    }
  });

  it('las armas deben tener asociadas maestrías de armas válidas', () => {
    for (const arma of Object.values(CATALOGO_ARMAS_55)) {
      expect(MAESTRIAS_ARMAS_55[arma.maestriaPorDefecto]).toBeDefined();
    }
  });
});
