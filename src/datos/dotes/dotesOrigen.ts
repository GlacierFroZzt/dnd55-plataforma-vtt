import { DefinicionDote } from '@/esquemas/dote';

export const DOTES_ORIGEN_55: Record<string, DefinicionDote> = {
  alerta: {
    id: 'alerta',
    nombre: 'Alerta',
    categoria: 'origen',
    descripcion: 'Tus sentidos siempre están afinados para reaccionar primero al peligro.',
    beneficios: [
      'Suma tu Bonificador de Competencia a tus tiradas de Iniciativa.',
      'Iniciativa Compartida: Inmediatamente después de tirar iniciativa, puedes intercambiar tu resultado con el de un aliado voluntario.',
    ],
  },
  artesano: {
    id: 'artesano',
    nombre: 'Artesano (Crafter)',
    categoria: 'origen',
    descripcion: 'Habilidoso en la forja y fabricación rápida de equipo y herramientas.',
    beneficios: [
      'Ganas competencia con tres herramientas de artesano a tu elección.',
      'Elaboración Rápida: Al finalizar un descanso largo, puedes fabricar un objeto mundano por un quinto de su precio normal.',
      'Descuento de Compra: Tienes un 20% de descuento al comprar cualquier equipo mundano.',
    ],
  },
  curandero: {
    id: 'curandero',
    nombre: 'Curandero (Healer)',
    categoria: 'origen',
    descripcion: 'Entrenado médicamente para estabilizar y curar heridas usando botiquines.',
    beneficios: [
      'Poco Convencional: Puedes volver a tirar cualquier dado de 1 al lanzar conjuros o usar dados de curación.',
      'Tratamiento de Batalla: Puedes gastar un uso de un estuche de curandero y un Dado de Golpe del objetivo como acción de Utilizar; el objetivo tira el dado y recupera esa cantidad de PG + tu mod de competencia.',
    ],
  },
  afortunado: {
    id: 'afortunado',
    nombre: 'Afortunado (Lucky)',
    categoria: 'origen',
    descripcion: 'Una suerte inexplicable que dobla el destino a tu favor en momentos decisivos.',
    beneficios: [
      'Puntos de Suerte: Tienes un número de puntos de suerte igual a tu bonificador de competencia.',
      'Gastar Puntos de Suerte: Puedes gastar un punto para ganar ventaja en una prueba d20 propia, o imponer desventaja a una tirada de ataque contra ti.',
    ],
  },
  iniciadoMagia: {
    id: 'iniciadoMagia',
    nombre: 'Iniciado en la Magia (Magic Initiate)',
    categoria: 'origen',
    descripcion: 'Has aprendido los rudimentos mágicos de una tradición arcana, divina o primordial.',
    beneficios: [
      'Eliges una lista de conjuros: Clérigo, Druida o Mago.',
      'Aprendes dos trucos de esa lista.',
      'Aprendes un conjuro de nivel 1 de esa lista y puedes lanzarlo una vez por descanso largo gratis, o usando tus ranuras normales.',
      'Puedes cambiar tu característica de lanzamiento asociada (INT, SAB o CAR).',
    ],
  },
  musico: {
    id: 'musico',
    nombre: 'Músico (Musician)',
    categoria: 'origen',
    descripcion: 'Tocas melodías que infunden valor en tus compañeros durante los descansos.',
    beneficios: [
      'Ganas competencia con tres instrumentos musicales a tu elección.',
      'Canción Inspiradora: Al finalizar un descanso corto o largo, otorgas Inspiración Heroica a un número de aliados igual a tu bonificador de competencia.',
    ],
  },
  atacanteSalvaje: {
    id: 'atacanteSalvaje',
    nombre: 'Atacante Salvaje (Savage Attacker)',
    categoria: 'origen',
    descripcion: 'Pones todo tu peso y furia en cada golpe de arma.',
    beneficios: [
      'Una vez por turno, cuando impactas con un arma, tiras los dados de daño del arma dos veces y te quedas con el total más alto.',
    ],
  },
  experto: {
    id: 'experto',
    nombre: 'Experto (Skilled)',
    categoria: 'origen',
    descripcion: 'Excepcionalmente versátil y competente en múltiples disciplinas.',
    beneficios: [
      'Ganas competencia en cualquier combinación de tres habilidades o herramientas a tu elección.',
      'Puedes elegir esta dote más de una vez.',
    ],
    esRepetible: true,
  },
  peleonTaberna: {
    id: 'peleonTaberna',
    nombre: 'Peleón de Taberna (Tavern Brawler)',
    categoria: 'origen',
    descripcion: 'Curtido en peleas a puñetazo limpio y usando taburetes como armas letales.',
    beneficios: [
      'Tus Golpes Desarmados infligen 1d4 + mod FUE de daño contundente.',
      'Al impactar con un golpe desarmado, puedes empujar al objetivo 5 pies inmediatamente.',
      'Puedes volver a tirar cualquier resultado de 1 en los dados de daño de tus ataques desarmados.',
    ],
  },
  duro: {
    id: 'duro',
    nombre: 'Duro (Tough)',
    categoria: 'origen',
    descripcion: 'Una constitución física férrea que resiste castigos extremos.',
    beneficios: [
      'Tus puntos de golpe máximos aumentan en 2 por cada nivel que poseas (por ejemplo, +2 al nivel 1, +4 al nivel 2, etc.).',
    ],
  },
};
