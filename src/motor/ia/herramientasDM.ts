export interface DefinicionHerramientaIA {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, any>;
    required: string[];
  };
}

export const HERRAMIENTAS_BOT_DM: DefinicionHerramientaIA[] = [
  {
    name: 'solicitar_tirada',
    description: 'Solicita formalmente a un jugador que realice una tirada de dados D20 (prueba de habilidad, salvación o tirada de ataque).',
    parameters: {
      type: 'object',
      properties: {
        personajeId: { type: 'string', description: 'ID del personaje que debe tirar' },
        tipoPrueba: { type: 'string', enum: ['tiradaAtaque', 'pruebaCaracteristica', 'tiradaSalvacion'], description: 'Tipo de tirada D&D 5.5' },
        caracteristica: { type: 'string', enum: ['fuerza', 'destreza', 'constitucion', 'inteligencia', 'sabiduria', 'carisma'] },
        habilidad: { type: 'string', description: 'Habilidad específica si aplica (ej. percepcion, sigilo, atletismo)' },
        dificultadCD: { type: 'number', description: 'Clase de Dificultad (CD) para tener éxito (ej. 10 fácil, 15 moderada, 20 difícil)' },
        ventaja: { type: 'string', enum: ['normal', 'ventaja', 'desventaja'], default: 'normal' },
        motivo: { type: 'string', description: 'Explicación narrativa de por qué se pide la tirada' },
      },
      required: ['personajeId', 'tipoPrueba', 'motivo'],
    },
  },
  {
    name: 'aplicar_dano_curacion',
    description: 'Modifica los puntos de golpe de un personaje o PNJ debido a daño, veneno, o sanación mágica.',
    parameters: {
      type: 'object',
      properties: {
        objetivoId: { type: 'string', description: 'ID del personaje o PNJ afectado' },
        cantidad: { type: 'number', description: 'Número positivo para curación o daño a restar' },
        operacion: { type: 'string', enum: ['dano', 'curacion', 'puntosTemporales'] },
        tipoDano: { type: 'string', description: 'Tipo de daño (ej. fuego, cortante, contundente, veneno)' },
        motivo: { type: 'string', description: 'Origen del daño o curación' },
      },
      required: ['objetivoId', 'cantidad', 'operacion'],
    },
  },
  {
    name: 'registrar_decision_campana',
    description: 'INMORTALIZA UNA DECISIÓN CLAVE en el Ledger de la campaña para que nunca sea olvidada ni alterada.',
    parameters: {
      type: 'object',
      properties: {
        tipo: { type: 'string', enum: ['decisionMoral', 'pactoAlianza', 'combateMuerte', 'descubrimientoSecreto', 'traicionPromesa'] },
        tituloCorto: { type: 'string', description: 'Título breve del hecho (ej. Pacto con Klarg)' },
        resumenHecho: { type: 'string', description: 'Qué hicieron exactamente los jugadores' },
        consecuenciaActiva: { type: 'string', description: 'Efecto permanente en el mundo o en los PNJs' },
        sujetosInvolucrados: { type: 'array', items: { type: 'string' }, description: 'IDs de PNJs o personajes afectados' },
        importancia: { type: 'string', enum: ['baja', 'media', 'alta', 'critica'] },
      },
      required: ['tipo', 'tituloCorto', 'resumenHecho', 'consecuenciaActiva', 'sujetosInvolucrados'],
    },
  },
  {
    name: 'actualizar_relacion_pnj',
    description: 'Modifica la actitud viva de un PNJ hacia el grupo y añade recuerdos importantes a su memoria.',
    parameters: {
      type: 'object',
      properties: {
        pnjId: { type: 'string', description: 'ID del PNJ' },
        nuevaActitud: { type: 'string', enum: ['enemigoMortal', 'hostil', 'desconfiado', 'indiferente', 'amistoso', 'leal'] },
        nuevoRecuerdo: { type: 'string', description: 'Nuevo hecho que este PNJ recordará siempre sobre los jugadores' },
        estaVivo: { type: 'boolean', description: 'Si el PNJ murió en este encuentro' },
      },
      required: ['pnjId'],
    },
  },
  {
    name: 'cambiar_escena',
    description: 'Transiciona al grupo a una nueva sala, ubicación o cambia las condiciones ambientales.',
    parameters: {
      type: 'object',
      properties: {
        nombreLugar: { type: 'string', description: 'Nuevo lugar (ej. Guarida de Cragmaw - Almacén)' },
        iluminacion: { type: 'string', enum: ['brillante', 'tenue', 'oscuridad'] },
        pnjsPresentes: { type: 'array', items: { type: 'string' } },
        enCombate: { type: 'boolean' },
        descripcionAmbiente: { type: 'string' },
      },
      required: ['nombreLugar', 'iluminacion'],
    },
  },
];
