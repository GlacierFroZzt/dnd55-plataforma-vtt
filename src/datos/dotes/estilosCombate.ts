import { DefinicionDote } from '@/esquemas/dote';

export const ESTILOS_COMBATE_55: Record<string, DefinicionDote> = {
  arqueria: {
    id: 'arqueria',
    nombre: 'Estilo de Combate: Arquería',
    categoria: 'estiloCombate',
    descripcion: 'Puntería excepcional con armas a distancia.',
    beneficios: [
      'Ganas un bonificador de +2 a las tiradas de ataque que realices con armas a distancia.',
    ],
  },
  defensa: {
    id: 'defensa',
    nombre: 'Estilo de Combate: Defensa',
    categoria: 'estiloCombate',
    descripcion: 'Entrenamiento en aprovechar al máximo la protección de la armadura.',
    beneficios: [
      'Ganas un bonificador de +1 a la Clase de Armadura mientras lleves puesta una armadura ligera, media o pesada.',
    ],
  },
  duelo: {
    id: 'duelo',
    nombre: 'Estilo de Combate: Duelo',
    categoria: 'estiloCombate',
    descripcion: 'Letalidad mejorada cuando combates con un arma cuerpo a cuerpo en una mano y ninguna otra arma.',
    beneficios: [
      'Cuando empuñas un arma cuerpo a cuerpo en una mano y ninguna otra arma, ganas un bonificador de +2 a las tiradas de daño con esa arma.',
    ],
  },
  armasGrandes: {
    id: 'armasGrandes',
    nombre: 'Estilo de Combate: Armas a Dos Manos',
    categoria: 'estiloCombate',
    descripcion: 'Fuerza aplastante con armas que requieren ambas manos.',
    beneficios: [
      'Cuando tiras un 1 o 2 en un dado de daño de un ataque con un arma cuerpo a cuerpo que empuñes a dos manos, puedes volver a tirar el dado y debes usar la nueva tirada.',
    ],
  },
  proteccion: {
    id: 'proteccion',
    nombre: 'Estilo de Combate: Protección',
    categoria: 'estiloCombate',
    descripcion: 'Uso táctico del escudo para desviar golpes dirigidos a tus camaradas.',
    beneficios: [
      'Cuando una criatura ataca a un objetivo que esté a 5 pies de ti que no seas tú, puedes usar tu Reacción para imponer desventaja a la tirada de ataque del atacante (debes estar empuñando un escudo).',
    ],
  },
  intercepcion: {
    id: 'intercepcion',
    nombre: 'Estilo de Combate: Intercepción',
    categoria: 'estiloCombate',
    descripcion: 'Interpones tu arma o escudo para mitigar el impacto de un ataque aliado.',
    beneficios: [
      'Cuando una criatura a 5 pies de ti recibe daño de un ataque, puedes usar tu Reacción para reducir el daño en 1d10 + tu Bonificador de Competencia (empuñando escudo o arma simple/marcial).',
    ],
  },
  dosArmas: {
    id: 'dosArmas',
    nombre: 'Estilo de Combate: Combate con Dos Armas',
    categoria: 'estiloCombate',
    descripcion: 'Sincronización letal entre el arma principal y la mano torpe.',
    beneficios: [
      'Cuando combates con dos armas, sumas tu modificador de característica al daño del ataque adicional realizado con la segunda arma.',
    ],
  },
  combateDesarmado: {
    id: 'combateDesarmado',
    nombre: 'Estilo de Combate: Combate Desarmado',
    categoria: 'estiloCombate',
    descripcion: 'Técnica letal de puños, codazos y llaves de sumisión.',
    beneficios: [
      'Tus Golpes Desarmados infligen 1d6 + mod FUE (o 1d8 si no sostienes armas ni escudo).',
      'Al inicio de cada uno de tus turnos, puedes infligir 1d4 de daño contundente a una criatura a la que tengas agarrada.',
    ],
  },
};
