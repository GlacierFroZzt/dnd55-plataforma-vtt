import { z } from 'zod';
import { MaestriaArmaClaveSchema } from './maestrias';

export const TipoDanoSchema = z.enum([
  'contundente',
  'perforante',
  'cortante',
  'acido',
  'frio',
  'fuego',
  'fuerza',
  'rayo',
  'necriotico',
  'veneno',
  'psiquico',
  'radiante',
  'trueno',
]);

export type TipoDano = z.infer<typeof TipoDanoSchema>;

export const CategoriaArmaSchema = z.enum([
  'simpleCuerpoACuerpo',
  'simpleADistancia',
  'marcialCuerpoACuerpo',
  'marcialADistancia',
]);

export type CategoriaArma = z.infer<typeof CategoriaArmaSchema>;

export const PropiedadArmaSchema = z.enum([
  'municion',
  'sutileza',
  'pesada',
  'ligera',
  'recarga',
  'alcance',
  'arrojadiza',
  'dosManos',
  'versatil',
]);

export type PropiedadArma = z.infer<typeof PropiedadArmaSchema>;

export const DefinicionArmaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  categoria: CategoriaArmaSchema,
  dadoDano: z.string(), // ej. "1d8", "2d6", "1d6/1d8"
  tipoDano: TipoDanoSchema,
  propiedades: z.array(PropiedadArmaSchema),
  maestriaPorDefecto: MaestriaArmaClaveSchema,
  pesoLibras: z.number(),
  precioPo: z.number(),
  alcancePies: z.object({
    normal: z.number(),
    maximo: z.number().optional(),
  }).optional(),
});

export type DefinicionArma = z.infer<typeof DefinicionArmaSchema>;
