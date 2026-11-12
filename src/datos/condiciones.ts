import { InfoCondicion } from '@/esquemas/condiciones';

export const CONDICIONES_55: Record<string, InfoCondicion> = {
  cegado: {
    clave: 'cegado',
    nombre: 'Cegado',
    descripcion: 'Una criatura cegada no puede ver y falla automáticamente cualquier prueba que requiera la vista.',
    efectosMecanicos: [
      'Fallas automáticamente cualquier prueba de característica que requiera la vista.',
      'Las tiradas de ataque contra ti tienen ventaja.',
      'Tus propias tiradas de ataque tienen desventaja.',
    ],
  },
  hechizado: {
    clave: 'hechizado',
    nombre: 'Hechizado',
    descripcion: 'Una criatura hechizada no puede atacar al encantador y este tiene ventaja en interacciones sociales contra ella.',
    efectosMecanicos: [
      'No puedes atacar al encantador ni elegirlo como objetivo de habilidades o efectos dañinos.',
      'El encantador tiene ventaja en cualquier prueba de característica para interactuar socialmente contigo.',
    ],
  },
  ensordecido: {
    clave: 'ensordecido',
    nombre: 'Ensordecido',
    descripcion: 'Una criatura ensordecida no puede oír y falla automáticamente cualquier prueba de característica que requiera el oído.',
    efectosMecanicos: [
      'Fallas automáticamente cualquier prueba de característica que requiera el oído.',
    ],
  },
  asustado: {
    clave: 'asustado',
    nombre: 'Asustado',
    descripcion: 'Una criatura asustada tiene desventaja mientras la fuente de su miedo esté en su línea de visión.',
    efectosMecanicos: [
      'Tienes desventaja en pruebas de característica y tiradas de ataque mientras la fuente de tu miedo esté en tu línea de visión.',
      'No puedes moverte voluntariamente hacia una posición más cercana a la fuente del miedo.',
    ],
  },
  agarrado: {
    clave: 'agarrado',
    nombre: 'Agarrado',
    descripcion: 'La criatura ha sido atrapada físicamente por un atacante.',
    efectosMecanicos: [
      'Tu velocidad se convierte en 0 y no puedes beneficiarte de ningún bonificador a tu velocidad.',
      'Tienes desventaja en tiradas de ataque contra cualquier criatura que no sea la que te tiene agarrado.',
      'Quien te agarra puede moverte consigo, pero su velocidad se reduce a la mitad salvo que seas dos tamaños menor.',
      'La condición termina si quien te agarra queda incapacitado o si un efecto te aleja de su alcance.',
    ],
  },
  incapacitado: {
    clave: 'incapacitado',
    nombre: 'Incapacitado',
    descripcion: 'La criatura no puede actuar ni reaccionar en el combate.',
    efectosMecanicos: [
      'No puedes realizar acciones ni reacciones.',
      'Tu concentración en conjuros se rompe de inmediato.',
      'No puedes hablar con coherencia.',
      'Si tienes iniciativa cuando quedas incapacitado, la pierdes.',
    ],
  },
  invisible: {
    clave: 'invisible',
    nombre: 'Invisible',
    descripcion: 'La criatura es imposible de ver sin ayuda de magia o sentidos especiales como vista ciega.',
    efectosMecanicos: [
      'Para propósitos de sigilo e interacciones, se te considera pesadamente oculto.',
      'Las tiradas de ataque contra ti tienen desventaja.',
      'Tus tiradas de ataque tienen ventaja contra criaturas que no puedan verte.',
    ],
  },
  paralizado: {
    clave: 'paralizado',
    nombre: 'Paralizado',
    descripcion: 'La criatura está completamente congelada e indefensa.',
    efectosMecanicos: [
      'Estás incapacitado y no puedes moverte ni hablar.',
      'Fallas automáticamente las tiradas de salvación de Fuerza y Destreza.',
      'Las tiradas de ataque contra ti tienen ventaja.',
      'Cualquier ataque que te impacte es un impacto crítico automático si el atacante está a 5 pies de ti.',
    ],
  },
  petrificado: {
    clave: 'petrificado',
    nombre: 'Petrificado',
    descripcion: 'Transformado en una sustancia sólida e inerte (generalmente piedra).',
    efectosMecanicos: [
      'Estás incapacitado, no puedes moverte ni hablar y dejas de ser consciente de tu entorno.',
      'Tu peso se multiplica por diez y envejeces.',
      'Las tiradas de ataque contra ti tienen ventaja.',
      'Fallas automáticamente las tiradas de salvación de Fuerza y Destreza.',
      'Tienes resistencia a todo tipo de daño y eres inmune al veneno y enfermedades.',
    ],
  },
  envenenado: {
    clave: 'envenenado',
    nombre: 'Envenenado',
    descripcion: 'Toxinas en el organismo debilitan el rendimiento de la criatura.',
    efectosMecanicos: [
      'Tienes desventaja en todas tus tiradas de ataque y pruebas de característica.',
    ],
  },
  tumbado: {
    clave: 'tumbado',
    nombre: 'Tumbado / Derribado',
    descripcion: 'La criatura está en el suelo boca arriba o boca abajo.',
    efectosMecanicos: [
      'Tu única opción de movimiento es arrastrarte (cuesta el doble de movimiento) a menos que te levantes.',
      'Levantarte cuesta la mitad de tu velocidad de movimiento total.',
      'Tienes desventaja en tus propias tiradas de ataque.',
      'Una tirada de ataque contra ti tiene ventaja si el atacante está a 5 pies de ti; si está a mayor distancia, tiene desventaja.',
    ],
  },
  apresado: {
    clave: 'apresado',
    nombre: 'Apresado',
    descripcion: 'Atado por redes, cadenas o enredaderas mágicas.',
    efectosMecanicos: [
      'Tu velocidad es 0 y no puedes beneficiarte de ningún bonificador a tu velocidad.',
      'Las tiradas de ataque contra ti tienen ventaja y tus tiradas de ataque tienen desventaja.',
      'Tienes desventaja en las tiradas de salvación de Destreza.',
    ],
  },
  aturdido: {
    clave: 'aturdido',
    nombre: 'Aturdido',
    descripcion: 'Un golpe severo o sacudida mágica nubla completamente los sentidos.',
    efectosMecanicos: [
      'Estás incapacitado, no puedes moverte y solo puedes balbucear.',
      'Fallas automáticamente las tiradas de salvación de Fuerza y Destreza.',
      'Las tiradas de ataque contra ti tienen ventaja.',
    ],
  },
  inconsciente: {
    clave: 'inconsciente',
    nombre: 'Inconsciente',
    descripcion: 'Dormido o dejado a 0 puntos de golpe sin estabilizar.',
    efectosMecanicos: [
      'Estás incapacitado y tumbado.',
      'Sueltas todo lo que sostengas y caes al suelo.',
      'Fallas automáticamente las tiradas de salvación de Fuerza y Destreza.',
      'Las tiradas de ataque contra ti tienen ventaja.',
      'Cualquier tirada de ataque que te impacte es un crítico automático si el atacante está a 5 pies.',
    ],
  },
  agotamiento: {
    clave: 'agotamiento',
    nombre: 'Agotamiento 5.5',
    descripcion: 'Fatiga extrema escalonada en 6 niveles. Cada nivel resta 2 a todas las pruebas d20 y reduce la velocidad en 5 pies.',
    efectosMecanicos: [
      'Nivel 1: -2 a todas las pruebas d20 y a tu CD de conjuros. -5 pies de velocidad.',
      'Nivel 2: -4 a todas las pruebas d20 y a tu CD de conjuros. -10 pies de velocidad.',
      'Nivel 3: -6 a todas las pruebas d20 y a tu CD de conjuros. -15 pies de velocidad.',
      'Nivel 4: -8 a todas las pruebas d20 y a tu CD de conjuros. -20 pies de velocidad.',
      'Nivel 5: -10 a todas las pruebas d20 y a tu CD de conjuros. -25 pies de velocidad.',
      'Nivel 6: Muerte instantánea.',
      'Completar un descanso largo reduce tu nivel de agotamiento en 1.',
    ],
  },
};
