import { z } from 'zod';

export const CondicionClaveSchema = z.enum([
  'cegado',
  'hechizado',
  'ensordecido',
  'asustado',
  'agarrado',
  'incapacitado',
  'invisible',
  'paralizado',
  'petrificado',
  'envenenado',
  'tumbado',
  'apresado',
  'aturdido',
  'inconsciente',
  'agotamiento',
]);

export type CondicionClave = z.infer<typeof CondicionClaveSchema>;

export const InstanciaCondicionSchema = z.object({
  clave: CondicionClaveSchema,
  nombre: z.string(),
  nivelAgotamiento: z.number().int().min(1).max(6).optional(), // Solo aplicable a agotamiento
  origen: z.string().optional(),
  duracionRondas: z.number().int().optional(),
});

export type InstanciaCondicion = z.infer<typeof InstanciaCondicionSchema>;

export const InfoCondicionSchema = z.object({
  clave: CondicionClaveSchema,
  nombre: z.string(),
  descripcion: z.string(),
  efectosMecanicos: z.array(z.string()),
});

export type InfoCondicion = z.infer<typeof InfoCondicionSchema>;
