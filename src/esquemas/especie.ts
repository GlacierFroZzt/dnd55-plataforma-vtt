import { z } from 'zod';

export const RasgoEspecieSchema = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  nivelRequerido: z.number().int().min(1).optional(),
});

export const LegadoEspecieSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
  rasgos: z.array(RasgoEspecieSchema),
  trucosOConjuros: z.array(z.string()).optional(),
  resistenciaDanio: z.array(z.string()).optional(),
});

export const EspecieSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  nombreOriginal: z.string(),
  descripcion: z.string(),
  tipoCriatura: z.string().default('Humanoide'),
  tamano: z.enum(['Mediano', 'Pequeño', 'Mediano o Pequeño']),
  velocidadPies: z.number().int().min(20),
  visionEnOscuridadPies: z.number().int().min(0),
  rasgosBase: z.array(RasgoEspecieSchema),
  legados: z.array(LegadoEspecieSchema).default([]),
});

export type RasgoEspecie = z.infer<typeof RasgoEspecieSchema>;
export type LegadoEspecie = z.infer<typeof LegadoEspecieSchema>;
export type Especie = z.infer<typeof EspecieSchema>;
