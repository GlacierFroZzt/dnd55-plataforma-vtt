import { z } from 'zod';

export const BiomaMapaSchema = z.enum([
  'cripta',
  'bosque',
  'caverna',
  'templo',
  'taberna',
]);

export type BiomaMapa = z.infer<typeof BiomaMapaSchema>;

export const TipoTerrenoSchema = z.enum([
  'suelo',
  'muro',
  'puertaCerrada',
  'puertaAbierta',
  'agua',
  'abismo',
  'arbol',
  'mesa',
  'escaleras',
]);

export type TipoTerreno = z.infer<typeof TipoTerrenoSchema>;

export const TipoEntidadMapaSchema = z.enum([
  'jugador',
  'enemigo',
  'pnj',
  'cofre',
  'antorcha',
  'sarcofago',
]);

export type TipoEntidadMapa = z.infer<typeof TipoEntidadMapaSchema>;

export const EntidadMapaSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  tipo: TipoEntidadMapaSchema,
  x: z.number().int().min(0),
  y: z.number().int().min(0),
  icono: z.string().default('🛡️'),
  colorBorde: z.string().default('#f59e0b'),
  pgActual: z.number().int().optional(),
  pgMax: z.number().int().optional(),
  ca: z.number().int().optional(),
  esInteractuable: z.boolean().optional(),
  estadoInteractuado: z.boolean().optional(),
  descripcion: z.string().optional(),
});

export type EntidadMapa = z.infer<typeof EntidadMapaSchema>;

export const CasillaMapaSchema = z.object({
  x: z.number().int().min(0),
  y: z.number().int().min(0),
  tipoTerreno: TipoTerrenoSchema,
  visible: z.boolean().default(false),
  visitada: z.boolean().default(false),
  decoracion: z.string().optional(),
});

export type CasillaMapa = z.infer<typeof CasillaMapaSchema>;

export const Mapa2DSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  bioma: BiomaMapaSchema,
  ancho: z.number().int().min(10).max(60),
  alto: z.number().int().min(10).max(60),
  casillas: z.array(z.array(CasillaMapaSchema)),
  entidades: z.array(EntidadMapaSchema),
  posicionJugadorInicial: z.object({
    x: z.number().int(),
    y: z.number().int(),
  }),
  nieblaGuerraActiva: z.boolean().default(true),
  piesPorCasilla: z.number().default(5),
});

export type Mapa2D = z.infer<typeof Mapa2DSchema>;
