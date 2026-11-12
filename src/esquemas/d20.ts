import { z } from 'zod';
import { CaracteristicaClaveSchema, HabilidadClaveSchema } from './caracteristicas';

export const TipoPruebaD20Schema = z.enum([
  'tiradaAtaque',
  'pruebaCaracteristica',
  'tiradaSalvacion',
  'salvacionMuerte',
]);

export type TipoPruebaD20 = z.infer<typeof TipoPruebaD20Schema>;

export const ModificadorVentajaSchema = z.enum([
  'normal',
  'ventaja',
  'desventaja',
]);

export type ModificadorVentaja = z.infer<typeof ModificadorVentajaSchema>;

export const SolicitudTiradaD20Schema = z.object({
  id: z.string(),
  personajeId: z.string(),
  tipoPrueba: TipoPruebaD20Schema,
  caracteristica: CaracteristicaClaveSchema.optional(),
  habilidad: HabilidadClaveSchema.optional(),
  dificultadCD: z.number().int().min(1).max(40).optional(),
  ventaja: ModificadorVentajaSchema.default('normal'),
  usaInspiracionHeroica: z.boolean().default(false),
  descripcion: z.string(),
});

export type SolicitudTiradaD20 = z.infer<typeof SolicitudTiradaD20Schema>;

export const ResultadoTiradaD20Schema = z.object({
  solicitudId: z.string(),
  dado1: z.number().int().min(1).max(20),
  dado2: z.number().int().min(1).max(20).optional(),
  dadoElegido: z.number().int().min(1).max(20),
  modificadorBase: z.number().int(),
  bonificadorCompetencia: z.number().int().default(0),
  modificadoresAdicionales: z.number().int().default(0),
  total: z.number().int(),
  esCritico20: z.boolean(),
  esPifia1: z.boolean(),
  exito: z.boolean().optional(),
  detalleTexto: z.string(),
});

export type ResultadoTiradaD20 = z.infer<typeof ResultadoTiradaD20Schema>;
