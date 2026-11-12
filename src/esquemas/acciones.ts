import { z } from 'zod';

export const AccionClaveSchema = z.enum([
  'atacar',
  'correr',
  'destrabarse',
  'esquivar',
  'ayudar',
  'esconderse',
  'influenciar',
  'magia',
  'preparar',
  'buscar',
  'estudiar',
  'utilizar',
]);

export type AccionClave = z.infer<typeof AccionClaveSchema>;

export const InfoAccionSchema = z.object({
  clave: AccionClaveSchema,
  nombre: z.string(),
  tipoTiempo: z.enum(['accion', 'accionAdicional', 'reaccion', 'movimiento', 'gratuita']),
  descripcionCorta: z.string(),
  reglasDetalladas: z.string(),
  requierePrueba: z.boolean(),
  caracteristicaAsociada: z.string().optional(),
});

export type InfoAccion = z.infer<typeof InfoAccionSchema>;
