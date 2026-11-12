import { z } from 'zod';
import { CaracteristicaClaveSchema } from './caracteristicas';

export const CategoriaDoteSchema = z.enum([
  'origen',         // Nivel 1 (por trasfondo)
  'general',        // Nivel 4+
  'estiloCombate',  // Nivel 1+ para clases marciales
  'bendicionEpica', // Nivel 19+
]);

export type CategoriaDote = z.infer<typeof CategoriaDoteSchema>;

export const PrerrequisitoDoteSchema = z.object({
  nivelMinimo: z.number().int().min(1).max(20).default(1),
  caracteristicasMinimas: z.record(CaracteristicaClaveSchema, z.number().int()).optional(),
  competenciaArmaduraOArma: z.string().optional(),
  claseRequerida: z.string().optional(),
  lanzamientoConjuros: z.boolean().optional(),
  descripcionTexto: z.string().optional(),
});

export type PrerrequisitoDote = z.infer<typeof PrerrequisitoDoteSchema>;

export const DefinicionDoteSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  categoria: CategoriaDoteSchema,
  prerrequisito: PrerrequisitoDoteSchema.optional(),
  mejoraCaracteristica: z.object({
    cantidad: z.number().int(),
    opciones: z.array(CaracteristicaClaveSchema),
  }).optional(),
  descripcion: z.string(),
  beneficios: z.array(z.string()),
  esRepetible: z.boolean().optional(),
});

export type DefinicionDote = z.infer<typeof DefinicionDoteSchema>;
