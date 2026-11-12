import { z } from 'zod';
import { PuntuacionesCaracteristicaSchema, CaracteristicaClaveSchema } from './caracteristicas';

export const BuildSugeridaSchema = z.object({
  id: z.string(),
  claseId: z.string(),
  nombre: z.string(),
  subtitulo: z.string(),
  enfoque: z.enum(['fuerza', 'destreza', 'magia', 'apoyo', 'defensa', 'mixto']),
  descripcion: z.string(),
  rolRecomendado: z.string(),
  puntuaciones: PuntuacionesCaracteristicaSchema,
  prioridadAtributos: z.array(CaracteristicaClaveSchema).min(3),
  trasfondosRecomendados: z.array(z.string()).min(1),
  doteOrigenRecomendada: z.string(),
  armasRecomendadas: z.array(z.string()).min(1),
  subclaseRecomendada: z.string().optional(),
  consejosTacticos: z.array(z.string()).min(1),
});

export type BuildSugerida = z.infer<typeof BuildSugeridaSchema>;
