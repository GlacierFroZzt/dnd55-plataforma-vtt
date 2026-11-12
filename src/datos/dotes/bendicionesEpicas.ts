import { DefinicionDote } from '@/esquemas/dote';

export const BENDICIONES_EPICAS_55: Record<string, DefinicionDote> = {
  bendicionDestino: {
    id: 'bendicionDestino',
    nombre: 'Bendición del Destino (Boon of Fate)',
    categoria: 'bendicionEpica',
    prerrequisito: {
      nivelMinimo: 19,
      descripcionTexto: 'Nivel 19+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['fuerza', 'destreza', 'constitucion', 'inteligencia', 'sabiduria', 'carisma'],
    },
    descripcion: 'Poder divino para alterar el hilo causal del destino.',
    beneficios: [
      'Aumenta una puntuación de característica en 1 (hasta un máximo de 30).',
      'Cuando tú u otra criatura a 60 pies realiza una tirada de d20, puedes sumar o restar 2d4 al resultado tras ver la tirada (recupera en descanso corto o al tirar iniciativa).',
    ],
  },
  bendicionFortalezaIrrompible: {
    id: 'bendicionFortalezaIrrompible',
    nombre: 'Bendición de Fortaleza Irrompible (Boon of Fortitude)',
    categoria: 'bendicionEpica',
    prerrequisito: {
      nivelMinimo: 19,
      descripcionTexto: 'Nivel 19+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['constitucion'],
    },
    descripcion: 'Una resistencia mítica que desafía la mortalidad.',
    beneficios: [
      'Aumenta tu puntuación de Constitución en 1 (hasta un máximo de 30).',
      'Tus puntos de golpe máximos aumentan en 40 adicionales.',
      'Cuando recibes curación, recuperas puntos de golpe adicionales iguales a tu modificador de Constitución.',
    ],
  },
  bendicionRecuperacionEnergia: {
    id: 'bendicionRecuperacionEnergia',
    nombre: 'Bendición de Recuperación de Energía (Boon of Energy Absorption)',
    categoria: 'bendicionEpica',
    prerrequisito: {
      nivelMinimo: 19,
      descripcionTexto: 'Nivel 19+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['constitucion', 'sabiduria', 'carisma'],
    },
    descripcion: 'Absorbe daño elemental y lo canaliza en fuerza vital.',
    beneficios: [
      'Aumenta una característica en 1 (hasta 30).',
      'Tienes resistencia al daño de ácido, frío, fuego, rayo y trueno.',
      'Cuando sufres daño de uno de esos tipos, puedes usar tu Reacción para anular el daño restante y recuperar puntos de golpe iguales a la mitad del daño original.',
    ],
  },
  bendicionPoderIrresistible: {
    id: 'bendicionPoderIrresistible',
    nombre: 'Bendición del Poder Irresistible (Boon of Irresistible Offense)',
    categoria: 'bendicionEpica',
    prerrequisito: {
      nivelMinimo: 19,
      descripcionTexto: 'Nivel 19+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['fuerza', 'destreza'],
    },
    descripcion: 'Tus ataques penetran cualquier resistencia y armadura.',
    beneficios: [
      'Aumenta tu Fuerza o Destreza en 1 (hasta 30).',
      'El daño infligido por tus armas ignora cualquier resistencia a daño físico.',
      'Cuando sacas un 20 natural en una tirada de ataque, infliges daño adicional igual a tu puntuación de Fuerza o Destreza.',
    ],
  },
  bendicionVelocidadDimensional: {
    id: 'bendicionVelocidadDimensional',
    nombre: 'Bendición del Viaje Dimensional (Boon of Dimensional Travel)',
    categoria: 'bendicionEpica',
    prerrequisito: {
      nivelMinimo: 19,
      descripcionTexto: 'Nivel 19+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['destreza', 'inteligencia', 'carisma'],
    },
    descripcion: 'Parpadeas por el espacio con cada paso y acción.',
    beneficios: [
      'Aumenta una característica en 1 (hasta 30).',
      'Inmediatamente después de realizar la acción de Atacar o Magia, puedes teletransportarte hasta 30 pies a un espacio desocupado que puedas ver.',
    ],
  },
};
