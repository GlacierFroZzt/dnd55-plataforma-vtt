import { z } from 'zod';
import { CaracteristicaClaveSchema, HabilidadClaveSchema } from './caracteristicas';

export const TrasfondoSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  nombreOriginal: z.string(),
  descripcion: z.string(),
  caracteristicasOpciones: z.array(CaracteristicaClaveSchema).min(3).max(3),
  doteOrigenId: z.string(),
  habilidadesCompetentes: z.array(HabilidadClaveSchema).min(2),
  herramientasCompetentes: z.array(z.string()),
  equipoSugerido: z.array(z.string()),
  oroInicial: z.number().int().min(0),
});

export type Trasfondo = z.infer<typeof TrasfondoSchema>;
