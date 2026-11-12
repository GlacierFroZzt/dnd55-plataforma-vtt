import { z } from 'zod';

export const CaracteristicaClaveSchema = z.enum([
  'fuerza',
  'destreza',
  'constitucion',
  'inteligencia',
  'sabiduria',
  'carisma',
]);

export type CaracteristicaClave = z.infer<typeof CaracteristicaClaveSchema>;

export const PuntuacionesCaracteristicaSchema = z.object({
  fuerza: z.number().int().min(1).max(30),
  destreza: z.number().int().min(1).max(30),
  constitucion: z.number().int().min(1).max(30),
  inteligencia: z.number().int().min(1).max(30),
  sabiduria: z.number().int().min(1).max(30),
  carisma: z.number().int().min(1).max(30),
});

export type PuntuacionesCaracteristica = z.infer<typeof PuntuacionesCaracteristicaSchema>;

export const HabilidadClaveSchema = z.enum([
  // Fuerza
  'atletismo',
  // Destreza
  'acrobacias',
  'juegoDeManos',
  'sigilo',
  // Inteligencia
  'arcanos',
  'historia',
  'investigacion',
  'naturaleza',
  'religion',
  // Sabiduría
  'tratoConAnimales',
  'medicina',
  'percepcion',
  'perspicacia',
  'supervivencia',
  // Carisma
  'engano',
  'intimidacion',
  'interpretacion',
  'persuasion',
]);

export type HabilidadClave = z.infer<typeof HabilidadClaveSchema>;

export const HABILIDAD_A_CARACTERISTICA: Record<HabilidadClave, CaracteristicaClave> = {
  atletismo: 'fuerza',
  acrobacias: 'destreza',
  juegoDeManos: 'destreza',
  sigilo: 'destreza',
  arcanos: 'inteligencia',
  historia: 'inteligencia',
  investigacion: 'inteligencia',
  naturaleza: 'inteligencia',
  religion: 'inteligencia',
  tratoConAnimales: 'sabiduria',
  medicina: 'sabiduria',
  percepcion: 'sabiduria',
  perspicacia: 'sabiduria',
  supervivencia: 'sabiduria',
  engano: 'carisma',
  intimidacion: 'carisma',
  interpretacion: 'carisma',
  persuasion: 'carisma',
};

export const NivelCompetenciaSchema = z.enum([
  'sinCompetencia',
  'competente',
  'experto', // Doble bonificador de competencia
]);

export type NivelCompetencia = z.infer<typeof NivelCompetenciaSchema>;
