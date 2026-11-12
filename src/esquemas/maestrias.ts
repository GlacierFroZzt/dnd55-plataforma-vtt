import { z } from 'zod';

export const MaestriaArmaClaveSchema = z.enum([
  'hendidura',    // Cleave
  'roce',         // Graze
  'corteRapido',  // Nick
  'empujon',      // Push
  'minar',        // Sap
  'ralentizar',   // Slow
  'derribo',      // Topple
  'hostigamiento' // Vex
]);

export type MaestriaArmaClave = z.infer<typeof MaestriaArmaClaveSchema>;

export const InfoMaestriaArmaSchema = z.object({
  clave: MaestriaArmaClaveSchema,
  nombre: z.string(),
  nombreOriginal: z.string(),
  requisitoGatillo: z.enum(['alImpactar', 'alFallar', 'accionAtacar']),
  descripcion: z.string(),
  mecanicaRegla: z.string(),
  permiteSalvacion: z.boolean(),
  salvacionCaracteristica: z.enum(['fuerza', 'destreza', 'constitucion']).optional(),
});

export type InfoMaestriaArma = z.infer<typeof InfoMaestriaArmaSchema>;
