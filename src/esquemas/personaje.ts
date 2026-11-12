import { z } from 'zod';
import { PuntuacionesCaracteristicaSchema, HabilidadClaveSchema } from './caracteristicas';
import { MaestriaArmaClaveSchema } from './maestrias';
import { InstanciaCondicionSchema } from './condiciones';

export const FichaPersonajeSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  jugadorNombre: z.string().default('Aventurero'),
  especie: z.string(),
  legadoEspecie: z.string().optional(),
  trasfondo: z.string(),
  claseId: z.string(),
  subclaseId: z.string().optional(),
  nivel: z.number().int().min(1).max(20).default(1),
  alineamiento: z.string().default('Neutral'),
  
  // Características base
  caracteristicas: PuntuacionesCaracteristicaSchema,
  
  // Combate y estadísticas vitales
  puntosGolpeMaximos: z.number().int().min(1),
  puntosGolpeActuales: z.number().int().min(0),
  puntosGolpeTemporales: z.number().int().min(0).default(0),
  claseArmadura: z.number().int().min(1),
  velocidadPies: z.number().int().default(30),
  iniciativaMod: z.number().int().default(0),
  
  // Recursos 2024
  inspiracionHeroica: z.boolean().default(false),
  dadosGolpeDisponibles: z.number().int().min(0),
  dadosGolpeTotales: z.number().int().min(1),
  tipoDadoGolpe: z.enum(['d6', 'd8', 'd10', 'd12']),
  
  // Muerte y agonía
  salvacionesMuerte: z.object({
    exitos: z.number().int().min(0).max(3).default(0),
    fallos: z.number().int().min(0).max(3).default(0),
  }).default({ exitos: 0, fallos: 0 }),

  // Competencias
  salvacionesCompetentes: z.array(z.string()),
  habilidadesCompetentes: z.array(HabilidadClaveSchema),
  habilidadesExpertas: z.array(HabilidadClaveSchema).default([]),
  armasCompetentes: z.array(z.string()).default([]),
  armadurasCompetentes: z.array(z.string()).default([]),
  herramientasCompetentes: z.array(z.string()).default([]),
  idiomas: z.array(z.string()).default(['Común']),

  // Maestrías de Armas seleccionadas (D&D 5.5)
  maestriasArmasDesbloqueadas: z.array(MaestriaArmaClaveSchema).default([]),

  // Equipo
  armasEquipadas: z.array(z.string()).default([]),
  armaduraEquipada: z.string().optional(),
  escudoEquipado: z.boolean().default(false),
  monedas: z.object({
    cobre: z.number().int().default(0),
    plata: z.number().int().default(0),
    electro: z.number().int().default(0),
    oro: z.number().int().default(15),
    platino: z.number().int().default(0),
  }).default({ cobre: 0, plata: 0, electro: 0, oro: 15, platino: 0 }),
  inventarioObjetos: z.array(z.string()).default([]),

  // Magia (si aplica)
  caracteristicaLanzamiento: z.string().optional(),
  cdSalvacionConjuros: z.number().int().optional(),
  modificadorAtaqueConjuro: z.number().int().optional(),
  espaciosConjuroMaximos: z.array(z.number().int()).default([0, 0, 0, 0, 0, 0, 0, 0, 0]),
  espaciosConjuroGastados: z.array(z.number().int()).default([0, 0, 0, 0, 0, 0, 0, 0, 0]),
  conjurosPreparados: z.array(z.string()).default([]),
  trucosConocidos: z.array(z.string()).default([]),

  // Condiciones activas y agotamiento
  condicionesActivas: z.array(InstanciaCondicionSchema).default([]),
  nivelAgotamiento: z.number().int().min(0).max(6).default(0),

  // Dotes obtenidas
  dotesIds: z.array(z.string()).default([]),
  rasgosEspeciales: z.array(z.string()).default([]),
});

export type FichaPersonaje = z.infer<typeof FichaPersonajeSchema>;
