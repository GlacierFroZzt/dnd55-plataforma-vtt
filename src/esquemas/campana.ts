import { z } from 'zod';
import { InstanciaCondicionSchema } from './condiciones';

export const TipoEventoDecisionSchema = z.enum([
  'decisionMoral',
  'pactoAlianza',
  'combateMuerte',
  'descubrimientoSecreto',
  'traicionPromesa',
  'compraVenta',
  'interaccionSocial',
]);

export type TipoEventoDecision = z.infer<typeof TipoEventoDecisionSchema>;

export const EventoDecisionSchema = z.object({
  id: z.string(),
  marcaTiempo: z.number(), // epoch timestamp
  numeroSesion: z.number().int().min(1),
  turno: z.number().int().min(1),
  tipo: TipoEventoDecisionSchema,
  tituloCorto: z.string(),
  resumenHecho: z.string(),
  sujetosInvolucrados: z.array(z.string()), // IDs de personajes o PNJs
  ubicacionId: z.string(),
  consecuenciaActiva: z.string(),
  vigente: z.boolean().default(true),
  importancia: z.enum(['baja', 'media', 'alta', 'critica']).default('media'),
});

export type EventoDecision = z.infer<typeof EventoDecisionSchema>;

export const ActitudPNJSchema = z.enum([
  'enemigoMortal',
  'hostil',
  'desconfiado',
  'indiferente',
  'amistoso',
  'leal',
]);

export type ActitudPNJ = z.infer<typeof ActitudPNJSchema>;

export const EstadoPNJSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  tituloOcupacion: z.string(),
  ubicacionActual: z.string(),
  estaVivo: z.boolean().default(true),
  puntosGolpeActuales: z.number().int(),
  puntosGolpeMaximos: z.number().int(),
  actitudHaciaGrupo: ActitudPNJSchema,
  secretosRevelados: z.array(z.string()).default([]),
  recuerdosRelevantes: z.array(z.string()).default([]),
  deudasOPromesas: z.array(z.string()).default([]),
});

export type EstadoPNJ = z.infer<typeof EstadoPNJSchema>;

export const EstadoEscenaSchema = z.object({
  id: z.string(),
  nombreLugar: z.string(),
  descripcionCorta: z.string(),
  iluminacion: z.enum(['brillante', 'tenue', 'oscuridad']),
  climaEntorno: z.string().optional(),
  pnjsPresentes: z.array(z.string()), // IDs de PNJs
  enemigosPresentes: z.array(z.string()),
  amenazasVisibles: z.array(z.string()).default([]),
  objetosInteractuables: z.array(z.string()).default([]),
  salidasDisponibles: z.array(z.string()).default([]),
  enCombate: z.boolean().default(false),
  ordenIniciativa: z.array(z.object({
    idEntidad: z.string(),
    nombre: z.string(),
    esJugador: z.boolean(),
    iniciativa: z.number().int(),
  })).optional(),
});

export type EstadoEscena = z.infer<typeof EstadoEscenaSchema>;

export const MensajeChatSchema = z.object({
  id: z.string(),
  remitente: z.enum(['dm', 'jugador', 'sistema']),
  nombreEmisor: z.string(),
  personajeId: z.string().optional(),
  contenido: z.string(),
  marcaTiempo: z.number(),
  tipoMensaje: z.enum(['narrativa', 'accion', 'tirada', 'susurro', 'alerta']).default('narrativa'),
  tiradaAsociadaId: z.string().optional(),
});

export type MensajeChat = z.infer<typeof MensajeChatSchema>;

export const EstadoCampanaSchema = z.object({
  id: z.string(),
  codigoSala: z.string(),
  nombreCampana: z.string(),
  modoJuego: z.enum(['solo', 'multijugador']),
  numeroSesionActual: z.number().int().default(1),
  turnoActual: z.number().int().default(1),
  fechaCreacion: z.number(),
  escenaActual: EstadoEscenaSchema,
  personajesIds: z.array(z.string()),
  pnjs: z.record(z.string(), EstadoPNJSchema),
  ledgerDecisiones: z.array(EventoDecisionSchema),
  resumenCapituloAnterior: z.string().default('Comienza la aventura en las tierras olvidadas.'),
  mensajesChat: z.array(MensajeChatSchema),
});

export type EstadoCampana = z.infer<typeof EstadoCampanaSchema>;
