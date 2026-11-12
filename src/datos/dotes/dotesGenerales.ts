import { DefinicionDote } from '@/esquemas/dote';

export const DOTES_GENERALES_55: Record<string, DefinicionDote> = {
  maestroArmasPesadas: {
    id: 'maestroArmasPesadas',
    nombre: 'Maestro en Armas Pesadas (Great Weapon Master)',
    categoria: 'general',
    prerrequisito: {
      nivelMinimo: 4,
      caracteristicasMinimas: { fuerza: 13 },
      descripcionTexto: 'Fuerza 13 o superior, Nivel 4+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['fuerza'],
    },
    descripcion: 'Poder demoledor con armas a dos manos que suma tu bonificador de competencia al daño.',
    beneficios: [
      'Aumenta tu puntuación de Fuerza en 1.',
      'Ataque Pesado: Cuando impactas con un arma con la propiedad Pesada usando la acción de atacar, sumas tu Bonificador de Competencia al daño.',
      'Ataque Adicional Crítico: Cuando consigues un crítico o reduces a una criatura a 0 PG, puedes realizar un ataque adicional con arma como acción adicional.',
    ],
  },
  tiradorCertero: {
    id: 'tiradorCertero',
    nombre: 'Tirador Certero (Sharpshooter)',
    categoria: 'general',
    prerrequisito: {
      nivelMinimo: 4,
      caracteristicasMinimas: { destreza: 13 },
      descripcionTexto: 'Destreza 13 o superior, Nivel 4+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['destreza'],
    },
    descripcion: 'Tiro de precisión que ignora cobertura y penalizadores por distancia larga.',
    beneficios: [
      'Aumenta tu puntuación de Destreza en 1.',
      'Disparos a distancia larga no imponen desventaja.',
      'Tus ataques con armas a distancia ignoran tres cuartos de cobertura y media cobertura.',
      'Disparar a 5 pies de un enemigo no impone desventaja a tus ataques a distancia.',
    ],
  },
  centinela: {
    id: 'centinela',
    nombre: 'Centinela (Sentinel)',
    categoria: 'general',
    prerrequisito: {
      nivelMinimo: 4,
      caracteristicasMinimas: { fuerza: 13, destreza: 13 },
      descripcionTexto: 'Fuerza o Destreza 13+, Nivel 4+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['fuerza', 'destreza'],
    },
    descripcion: 'Control implacable del espacio defensivo y ataques de oportunidad demoledores.',
    beneficios: [
      'Aumenta tu Fuerza o Destreza en 1.',
      'Cuando impactas a una criatura con un ataque de oportunidad, su velocidad se convierte en 0 para el resto del turno.',
      'Las criaturas provocan ataques de oportunidad de tu parte incluso si usan la acción de Destrabarse.',
      'Venganza de Aliado: Cuando una criatura a 5 pies ataca a un objetivo que no seas tú, puedes usar tu Reacción para atacarla con un arma cuerpo a cuerpo.',
    ],
  },
  combatienteDosArmas: {
    id: 'combatienteDosArmas',
    nombre: 'Combatiente con Dos Armas (Dual Wielder)',
    categoria: 'general',
    prerrequisito: {
      nivelMinimo: 4,
      caracteristicasMinimas: { fuerza: 13, destreza: 13 },
      descripcionTexto: 'Fuerza o Destreza 13+, Nivel 4+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['fuerza', 'destreza'],
    },
    descripcion: 'Maestría en empuñar armas en ambas manos simultáneamente.',
    beneficios: [
      'Aumenta tu Fuerza o Destreza en 1.',
      'Puedes usar el combate con dos armas incluso si una de las armas no tiene la propiedad Ligera.',
      'Ataque Rápido Adicional: Al realizar la acción de atacar con un arma Ligera, puedes realizar un ataque adicional como acción adicional con una segunda arma no ligera.',
      'Desenvainar o guardar dos armas a la vez.',
    ],
  },
  atleta: {
    id: 'atleta',
    nombre: 'Atleta (Athlete)',
    categoria: 'general',
    prerrequisito: {
      nivelMinimo: 4,
      descripcionTexto: 'Nivel 4+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['fuerza', 'destreza'],
    },
    descripcion: 'Acondicionamiento físico extraordinario para saltos, levantarse del suelo y trepar.',
    beneficios: [
      'Aumenta tu Fuerza o Destreza en 1.',
      'Levantarte de la condición Tumbado solo te cuesta 5 pies de movimiento en lugar de la mitad.',
      'Escalar no te cuesta movimiento extra.',
      'Solo necesitas moverte 5 pies antes de hacer un salto de longitud o altura para alcanzar la distancia máxima.',
    ],
  },
  resiliente: {
    id: 'resiliente',
    nombre: 'Resiliente (Resilient)',
    categoria: 'general',
    prerrequisito: {
      nivelMinimo: 4,
      descripcionTexto: 'Nivel 4+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['fuerza', 'destreza', 'constitucion', 'inteligencia', 'sabiduria', 'carisma'],
    },
    descripcion: 'Entrenamiento mental o físico que otorga competencia en una tirada de salvación.',
    beneficios: [
      'Eliges una característica y aumentas su puntuación en 1.',
      'Ganas competencia en las tiradas de salvación de la característica elegida.',
    ],
  },
  combatienteMontado: {
    id: 'combatienteMontado',
    nombre: 'Combatiente Montado (Mounted Combatant)',
    categoria: 'general',
    prerrequisito: {
      nivelMinimo: 4,
      descripcionTexto: 'Nivel 4+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['fuerza', 'destreza', 'sabiduria'],
    },
    descripcion: 'Dominio absoluto de la caballería y protección de corceles en el fragor de la batalla.',
    beneficios: [
      'Aumenta tu Fuerza, Destreza o Sabiduría en 1.',
      'Tienes ventaja en tiradas de ataque cuerpo a cuerpo contra cualquier criatura sin montar de tamaño menor que tu montura.',
      'Puedes obligar a que cualquier ataque dirigido a tu montura te tenga a ti como objetivo.',
      'Si tu montura es sujeta a un efecto que permite una salvación de Destreza para sufrir la mitad del daño, no sufre daño si tiene éxito y solo la mitad si falla.',
    ],
  },
  conjuradorGuerra: {
    id: 'conjuradorGuerra',
    nombre: 'Conjurador de Guerra (War Caster)',
    categoria: 'general',
    prerrequisito: {
      nivelMinimo: 4,
      lanzamientoConjuros: true,
      descripcionTexto: 'Capacidad de lanzar al menos un conjuro, Nivel 4+',
    },
    mejoraCaracteristica: {
      cantidad: 1,
      opciones: ['inteligencia', 'sabiduria', 'carisma'],
    },
    descripcion: 'Capacidad de mantener concentración y lanzar conjuros en el cuerpo a cuerpo.',
    beneficios: [
      'Aumenta tu Inteligencia, Sabiduría o Carisma en 1.',
      'Tienes ventaja en las tiradas de salvación de Constitución para mantener la concentración en un conjuro cuando recibes daño.',
      'Puedes realizar los componentes somáticos de los conjuros incluso cuando sostienes armas o un escudo en ambas manos.',
      'Ataque de Oportunidad Mágico: Cuando una criatura provoca un ataque de oportunidad, puedes lanzar un conjuro contra ella en lugar de usar un arma (tiempo de lanzamiento de 1 acción).',
    ],
  },
};
