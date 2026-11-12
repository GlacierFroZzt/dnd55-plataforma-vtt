import { z } from 'zod';
import { CaracteristicaClaveSchema, HabilidadClaveSchema } from './caracteristicas';

export const DadoGolpeSchema = z.enum(['d6', 'd8', 'd10', 'd12']);
export type DadoGolpe = z.infer<typeof DadoGolpeSchema>;

export const RasgoNivelSchema = z.object({
  nivel: z.number().int().min(1).max(20),
  nombre: z.string(),
  descripcion: z.string(),
  esOpcional: z.boolean().optional(),
});
export type RasgoNivel = z.infer<typeof RasgoNivelSchema>;

export const SubclaseSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  nombreOriginal: z.string(),
  descripcion: z.string(),
  nivelDesbloqueo: z.literal(3), // Siempre nivel 3 en D&D 5.5
  rasgos: z.array(RasgoNivelSchema),
});
export type Subclase = z.infer<typeof SubclaseSchema>;

export const ProgresionEspaciosConjuroSchema = z.record(
  z.string(), // Nivel '1' a '20'
  z.array(z.number().int()) // [cantrips, nv1, nv2, nv3, ...]
);

export const ProgresionNivelClaseSchema = z.object({
  nivel: z.number().int().min(1).max(20),
  bonificadorCompetencia: z.number().int().min(2).max(6),
  rasgos: z.array(z.string()),
  ranurasMaestriaArmas: z.number().int().min(0).max(6).optional(),
  puntosClase: z.object({
    nombre: z.string(),
    cantidad: z.number().int(),
  }).optional(),
  espaciosConjuro: z.array(z.number().int()).optional(), // Por nivel de conjuro 1-9
});
export type ProgresionNivelClase = z.infer<typeof ProgresionNivelClaseSchema>;

export const DefinicionClaseSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  nombreOriginal: z.string(),
  descripcion: z.string(),
  dadoGolpe: DadoGolpeSchema,
  caracteristicasPrimarias: z.array(CaracteristicaClaveSchema),
  salvacionesCompetentes: z.array(CaracteristicaClaveSchema).length(2),
  competenciasIniciales: z.object({
    armaduras: z.array(z.string()),
    armas: z.array(z.string()),
    herramientas: z.array(z.string()).optional(),
    habilidadesOpciones: z.object({
      elegir: z.number().int(),
      de: z.array(HabilidadClaveSchema),
    }),
  }),
  maestriaArmasInicial: z.number().int().min(0).max(5).optional(),
  tipoMagia: z.enum(['ninguna', 'completa', 'media', 'pacto']),
  subclases: z.array(SubclaseSchema).length(4), // Las 4 subclases oficiales 2024
  progresion: z.array(ProgresionNivelClaseSchema).length(20), // 20 niveles
});

export type DefinicionClase = z.infer<typeof DefinicionClaseSchema>;
