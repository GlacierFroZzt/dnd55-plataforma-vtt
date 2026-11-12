import { describe, it, expect } from 'vitest';
import { TODAS_LAS_ESPECIES_55, DICCIONARIO_ESPECIES_55 } from '@/datos/especies';
import { TODOS_LOS_TRASFONDOS_55, DICCIONARIO_TRASFONDOS_55 } from '@/datos/trasfondos';
import { EspecieSchema } from '@/esquemas/especie';
import { TrasfondoSchema } from '@/esquemas/trasfondo';
import { DOTES_ORIGEN_55 } from '@/datos/dotes/dotesOrigen';

describe('Compendio Oficial 2024: Especies y Legados', () => {
  it('debe contener las 10 especies oficiales del PHB 2024', () => {
    expect(TODAS_LAS_ESPECIES_55).toHaveLength(10);
    const ids = TODAS_LAS_ESPECIES_55.map((e) => e.id);
    expect(ids).toContain('humano');
    expect(ids).toContain('elfo');
    expect(ids).toContain('enano');
    expect(ids).toContain('mediano');
    expect(ids).toContain('goliat');
    expect(ids).toContain('orco');
    expect(ids).toContain('aasimar');
    expect(ids).toContain('tiefling');
    expect(ids).toContain('draconido');
    expect(ids).toContain('gnomo');
  });

  it('todas las especies deben validar contra EspecieSchema', () => {
    for (const esp of TODAS_LAS_ESPECIES_55) {
      const res = EspecieSchema.safeParse(esp);
      expect(res.success, `Error en especie ${esp.id}: ${JSON.stringify(res.error)}`).toBe(true);
    }
  });

  it('el Elfo debe incluir sus 3 legados oficiales (Drow, Alto Elfo, Bosques)', () => {
    const elfo = DICCIONARIO_ESPECIES_55.elfo;
    expect(elfo).toBeDefined();
    expect(elfo.legados).toHaveLength(3);
    const legados = elfo.legados.map((l) => l.id);
    expect(legados).toContain('drow');
    expect(legados).toContain('alto_elfo');
    expect(legados).toContain('elfo_bosques');
  });

  it('el Tiefling debe incluir sus 3 legados de planos inferiores (Abisal, Ctónico, Infernal)', () => {
    const tiefling = DICCIONARIO_ESPECIES_55.tiefling;
    expect(tiefling).toBeDefined();
    expect(tiefling.legados).toHaveLength(3);
    const legados = tiefling.legados.map((l) => l.id);
    expect(legados).toContain('abisal');
    expect(legados).toContain('ctonico');
    expect(legados).toContain('infernal');
  });

  it('el Goliat debe incluir sus 6 ancestros de gigantes del PHB 2024', () => {
    const goliat = DICCIONARIO_ESPECIES_55.goliat;
    expect(goliat).toBeDefined();
    expect(goliat.legados).toHaveLength(6);
    const ancestros = goliat.legados.map((l) => l.id);
    expect(ancestros).toContain('ancestro_nube');
    expect(ancestros).toContain('ancestro_fuego');
    expect(ancestros).toContain('ancestro_escarcha');
    expect(ancestros).toContain('ancestro_colina');
    expect(ancestros).toContain('ancestro_piedra');
    expect(ancestros).toContain('ancestro_tormenta');
  });

  it('el Dracónido debe incluir sus 10 legados cromáticos y metálicos con sus tipos de daño y aliento', () => {
    const draconido = DICCIONARIO_ESPECIES_55.draconido;
    expect(draconido).toBeDefined();
    expect(draconido.legados).toHaveLength(10);
    for (const legado of draconido.legados) {
      expect(legado.resistenciaDanio?.length).toBeGreaterThan(0);
    }
  });
});

describe('Compendio Oficial 2024: 16 Trasfondos Oficiales', () => {
  it('debe contener los 16 trasfondos oficiales del PHB 2024', () => {
    expect(TODOS_LOS_TRASFONDOS_55).toHaveLength(16);
    const ids = TODOS_LOS_TRASFONDOS_55.map((t) => t.id);
    expect(ids).toContain('acolito');
    expect(ids).toContain('artesano');
    expect(ids).toContain('charlatan');
    expect(ids).toContain('criminal');
    expect(ids).toContain('animador');
    expect(ids).toContain('granjero');
    expect(ids).toContain('guardia');
    expect(ids).toContain('guia');
    expect(ids).toContain('ermitano');
    expect(ids).toContain('comerciante');
    expect(ids).toContain('noble');
    expect(ids).toContain('sabio');
    expect(ids).toContain('marinero');
    expect(ids).toContain('escriba');
    expect(ids).toContain('soldado');
    expect(ids).toContain('errante');
  });

  it('todos los trasfondos deben validar contra TrasfondoSchema', () => {
    for (const trasfondo of TODOS_LOS_TRASFONDOS_55) {
      const res = TrasfondoSchema.safeParse(trasfondo);
      expect(res.success, `Error en trasfondo ${trasfondo.id}: ${JSON.stringify(res.error)}`).toBe(true);
    }
  });

  it('cada trasfondo debe asignar exactamente 3 características para el +2/+1 y una dote de origen válida', () => {
    for (const t of TODOS_LOS_TRASFONDOS_55) {
      expect(t.caracteristicasOpciones).toHaveLength(3);
      expect(DOTES_ORIGEN_55[t.doteOrigenId], `Dote inválida para trasfondo ${t.id}`).toBeDefined();
      expect(t.habilidadesCompetentes.length).toBeGreaterThanOrEqual(2);
      expect(t.oroInicial).toBeGreaterThan(0);
    }
  });
});
