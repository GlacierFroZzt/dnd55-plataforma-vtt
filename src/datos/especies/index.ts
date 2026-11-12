import { Especie } from '@/esquemas/especie';

export const TODAS_LAS_ESPECIES_55: Especie[] = [
  {
    id: 'humano',
    nombre: 'Humano',
    nombreOriginal: 'Human',
    descripcion: 'Versátiles, ambiciosos y llenos de ingenio e inventiva inagotable en cualquier entorno o cultura.',
    tipoCriatura: 'Humanoide',
    tamano: 'Mediano o Pequeño',
    velocidadPies: 30,
    visionEnOscuridadPies: 0,
    rasgosBase: [
      {
        nombre: 'Ingenio Ingenioso (Resourceful)',
        descripcion: 'Obtienes Inspiración Heroica automáticamente cada vez que finalizas un descanso largo.',
      },
      {
        nombre: 'Habilidad Versátil (Skillful)',
        descripcion: 'Ganas competencia en una habilidad de tu elección.',
      },
      {
        nombre: 'Versatilidad (Versatile)',
        descripcion: 'Ganas una Dote de Origen adicional de nivel 1 a tu elección.',
      },
    ],
    legados: [],
  },
  {
    id: 'elfo',
    nombre: 'Elfo',
    nombreOriginal: 'Elf',
    descripcion: 'Seres de gracia sobrenatural vinculados al Feywild, dotados de percepciones agudas y vidas centenarias.',
    tipoCriatura: 'Humanoide',
    tamano: 'Mediano',
    velocidadPies: 30,
    visionEnOscuridadPies: 60,
    rasgosBase: [
      {
        nombre: 'Ascendencia Feérica (Fey Ancestry)',
        descripcion: 'Tienes ventaja en tiradas de salvación para evitar o terminar la condición Hechizado.',
      },
      {
        nombre: 'Sentidos Agudos (Keen Senses)',
        descripcion: 'Tienes competencia en la habilidad Percepción.',
      },
      {
        nombre: 'Trance',
        descripcion: 'No necesitas dormir. Completas un descanso largo en solo 4 horas de meditación profunda sin perder la consciencia de tu entorno.',
      },
    ],
    legados: [
      {
        id: 'drow',
        nombre: 'Legado Drow (Elfo Oscuro)',
        descripcion: 'Habitantes adaptados a las profundidades de la Infraoscuridad con visión térmica superior y magia feérica sombría.',
        rasgos: [
          {
            nombre: 'Visión en la Oscuridad Superior',
            descripcion: 'Tu visión en la oscuridad tiene un alcance de 120 pies en lugar de 60 pies.',
          },
          {
            nombre: 'Magia Drow',
            descripcion: 'Conoces el truco Luces danzantes. A nivel 3 puedes lanzar Fuego feérico y a nivel 5 Oscuridad (1 vez por descanso largo o usando ranuras). Tu característica mágica es INT, SAB o CAR.',
          },
        ],
        trucosOConjuros: ['Luces danzantes', 'Fuego feérico (Nvl 3)', 'Oscuridad (Nvl 5)'],
      },
      {
        id: 'alto_elfo',
        nombre: 'Legado de Alto Elfo (High Elf)',
        descripcion: 'Portadores de una noble tradición mágica arcana nacida en las cortes élficas.',
        rasgos: [
          {
            nombre: 'Magia de Alto Elfo',
            descripcion: 'Conoces un truco a tu elección de la lista de conjuros del Mago (puedes cambiarlo tras cada descanso largo). A nivel 3 puedes lanzar Paso brumoso y a nivel 5 Detectar magia. Característica mágica: INT, SAB o CAR.',
          },
        ],
        trucosOConjuros: ['Truco de Mago (intercambiable)', 'Paso brumoso (Nvl 3)', 'Detectar magia (Nvl 5)'],
      },
      {
        id: 'elfo_bosques',
        nombre: 'Legado del Elfo de los Bosques (Wood Elf)',
        descripcion: 'Ágiles y sigilosos rastreadores nacidos en los bosques primigenios con una velocidad veloz.',
        rasgos: [
          {
            nombre: 'Pies Veloces',
            descripcion: 'Tu velocidad caminando aumenta a 35 pies.',
          },
          {
            nombre: 'Magia de los Bosques',
            descripcion: 'Conoces el truco Arte de druida. A nivel 3 puedes lanzar Zancada prodigiosa y a nivel 5 Pasar sin rastro. Característica mágica: INT, SAB o CAR.',
          },
        ],
        trucosOConjuros: ['Arte de druida', 'Zancada prodigiosa (Nvl 3)', 'Pasar sin rastro (Nvl 5)'],
      },
    ],
  },
  {
    id: 'enano',
    nombre: 'Enano',
    nombreOriginal: 'Dwarf',
    descripcion: 'Poderosos artesanos y guerreros forjados en la piedra, resistentes como las montañas.',
    tipoCriatura: 'Humanoide',
    tamano: 'Mediano',
    velocidadPies: 30,
    visionEnOscuridadPies: 120,
    rasgosBase: [
      {
        nombre: 'Temple Enano (Dwarven Resilience)',
        descripcion: 'Tienes ventaja en tiradas de salvación contra veneno y resistencia al daño por veneno.',
      },
      {
        nombre: 'Resiliencia Enana (Dwarven Toughness)',
        descripcion: 'Tus puntos de golpe máximos aumentan en 1 por cada nivel que poseas.',
      },
      {
        nombre: 'Sentido de la Piedra (Stonecunning 2024)',
        descripcion: 'Como acción adicional, ganas Visión del Temblor con un radio de 60 pies sobre superficies de piedra durante 10 minutos. Puedes usarlo tantas veces como tu bonificador de competencia por descanso largo.',
      },
    ],
    legados: [
      {
        id: 'enano_colinas',
        nombre: 'Enano de las Colinas (Hill Dwarf)',
        descripcion: 'Custodios de profundas tradiciones artesanales y clanes de canteros y orfebres de templanza inquebrantable.',
        rasgos: [
          {
            nombre: 'Sabiduría Ancestral de la Forja',
            descripcion: 'Competencia con herramientas de herrero, albañil o cervecero, y ventaja en pruebas de Historia sobre construcciones de piedra.',
          },
        ],
      },
      {
        id: 'enano_montanas',
        nombre: 'Enano de las Montañas (Mountain Dwarf)',
        descripcion: 'Guerreros curtidos en fortalezas alpinas y túneles subterráneos donde la armadura pesada es una segunda piel.',
        rasgos: [
          {
            nombre: 'Vigor Montañés',
            descripcion: 'Entrenamiento marcial de vanguardia que añade bonificación de estabilidad contra efectos de derribo forzado.',
          },
        ],
      },
    ],
  },
  {
    id: 'mediano',
    nombre: 'Mediano',
    nombreOriginal: 'Halfling',
    descripcion: 'Gente pequeña, alegre y hogareña cuya fortuna desafía las mayores adversidades.',
    tipoCriatura: 'Humanoide',
    tamano: 'Pequeño',
    velocidadPies: 30,
    visionEnOscuridadPies: 0,
    rasgosBase: [
      {
        nombre: 'Afortunado (Lucky)',
        descripcion: 'Cuando sacas un 1 natural en el d20 de una tirada de ataque, prueba de característica o tirada de salvación, puedes volver a tirar el dado y debes usar el nuevo resultado.',
      },
      {
        nombre: 'Valiente (Brave)',
        descripcion: 'Tienes ventaja en tiradas de salvación para evitar o terminar la condición Asustado.',
      },
      {
        nombre: 'Agilidad de Mediano (Halfling Nimbleness)',
        descripcion: 'Puedes moverte a través del espacio ocupado por cualquier criatura que sea de un tamaño mayor que el tuyo.',
      },
    ],
    legados: [
      {
        id: 'piesligeros',
        nombre: 'Legado Piesligeros (Lightfoot)',
        descripcion: 'Maestros del despiste y la discreción capaces de ocultarse tras sombras y compañeros.',
        rasgos: [
          {
            nombre: 'Sigilo Natural',
            descripcion: 'Puedes intentar esconderte incluso cuando solo estás cubierto por una criatura que sea al menos de tamaño Mediano.',
          },
        ],
      },
      {
        id: 'fornido',
        nombre: 'Legado Fornido (Stout)',
        descripcion: 'Medianos de constitución más robusta con sangre y fortaleza semejante a la de los enanos.',
        rasgos: [
          {
            nombre: 'Temple Fornido',
            descripcion: 'Tienes ventaja en tiradas de salvación contra veneno y resistencia al daño por veneno.',
          },
        ],
        resistenciaDanio: ['Veneno'],
      },
    ],
  },
  {
    id: 'goliat',
    nombre: 'Goliat',
    nombreOriginal: 'Goliath',
    descripcion: 'Poderosos descendientes de los gigantes con una fuerza colosal y la majestuosidad de las cumbres.',
    tipoCriatura: 'Humanoide',
    tamano: 'Mediano',
    velocidadPies: 35,
    visionEnOscuridadPies: 0,
    rasgosBase: [
      {
        nombre: 'Gran Corpulencia (Little Giant)',
        descripcion: 'Tienes competencia en Atletismo y cuentas como una categoría de tamaño más grande (Grande) al determinar tu capacidad de carga y el peso que puedes empujar, arrastrar o levantar.',
      },
      {
        nombre: 'Forma de Gigante (Large Form - Nvl 5)',
        descripcion: 'A nivel 5, como acción adicional puedes transformarte en tamaño Grande durante 10 minutos (PB veces por descanso largo). Tienes ventaja en pruebas de Fuerza y tu velocidad aumenta en 10 pies.',
      },
    ],
    legados: [
      {
        id: 'ancestro_nube',
        nombre: 'Ancestro Gigante de las Nubes (Cloud Giant)',
        descripcion: 'Desciende de los señores de los castillos celestes con el poder de desplazarse entre las brumas.',
        rasgos: [
          {
            nombre: 'Salto Brumoso (Featherfall Jaunt)',
            descripcion: 'Como acción adicional, puedes teletransportarte mágicamente hasta 30 pies a un espacio desocupado que puedas ver. Puedes usarlo tantas veces como tu bonificador de competencia por descanso largo.',
          },
        ],
      },
      {
        id: 'ancestro_fuego',
        nombre: 'Ancestro Gigante de Fuego (Fire Giant)',
        descripcion: 'Lleva en su sangre el fuego de las forjas magmáticas de los gigantes herreros.',
        rasgos: [
          {
            nombre: 'Fervor Ígneo',
            descripcion: 'Cuando impactas a un objetivo con una tirada de ataque, puedes infligirle 1d10 de daño de fuego adicional. Puedes usarlo tantas veces como tu bonificador de competencia por descanso largo.',
          },
        ],
      },
      {
        id: 'ancestro_escarcha',
        nombre: 'Ancestro Gigante de Escarcha (Frost Giant)',
        descripcion: 'Heredero del frío implacable de los glaciares y las tundras polares.',
        rasgos: [
          {
            nombre: 'Escarcha Invernal',
            descripcion: 'Cuando impactas con un ataque, puedes infligir 1d6 de daño de frío adicional y reducir la velocidad del objetivo en 10 pies hasta el inicio de tu próximo turno. Tantas veces como tu bonificador de competencia por descanso largo.',
          },
        ],
      },
      {
        id: 'ancestro_colina',
        nombre: 'Ancestro Gigante de las Colinas (Hill Giant)',
        descripcion: 'Portador de la fuerza bruta descomunal de los gigantes de las laderas.',
        rasgos: [
          {
            nombre: 'Derribo Contundente',
            descripcion: 'Cuando impactas a una criatura de tamaño Grande o menor con un ataque, puedes derribarla inmediatamente dejándola Tumbada (Prone). Tantas veces como tu bonificador de competencia por descanso largo.',
          },
        ],
      },
      {
        id: 'ancestro_piedra',
        nombre: 'Ancestro Gigante de Piedra (Stone Giant)',
        descripcion: 'Piel y reflejos duros como el granito de las cavernas profundas.',
        rasgos: [
          {
            nombre: 'Resistencia Pétrea',
            descripcion: 'Cuando recibes daño, puedes usar tu reacción para reducir ese daño en 1d12 + tu modificador de Constitución. Tantas veces como tu bonificador de competencia por descanso largo.',
          },
        ],
      },
      {
        id: 'ancestro_tormenta',
        nombre: 'Ancestro Gigante de las Tormentas (Storm Giant)',
        descripcion: 'Canaliza los truenos y centellas de las cumbres más tempestuosas.',
        rasgos: [
          {
            nombre: 'Represalia de Tormenta',
            descripcion: 'Cuando recibes daño de una criatura que esté a 60 pies o menos de ti, puedes usar tu reacción para infligirle 1d8 de daño por relámpago. Tantas veces como tu bonificador de competencia por descanso largo.',
          },
        ],
      },
    ],
  },
  {
    id: 'orco',
    nombre: 'Orco',
    nombreOriginal: 'Orc',
    descripcion: 'Poderosos supervivientes de vigor indomable y tenacidad marcial capaces de resistir golpes mortales.',
    tipoCriatura: 'Humanoide',
    tamano: 'Mediano',
    velocidadPies: 30,
    visionEnOscuridadPies: 120,
    rasgosBase: [
      {
        nombre: 'Embestida de Adrenalina (Adrenaline Rush)',
        descripcion: 'Puedes usar la acción Correr (Dash) como acción adicional un número de veces igual a tu bonificador de competencia por descanso largo. Cada vez que lo haces, ganas puntos de golpe temporales iguales a tu bonificador de competencia.',
      },
      {
        nombre: 'Resistencia Implacable (Relentless Endurance)',
        descripcion: 'Cuando tus puntos de golpe se reducen a 0 pero no mueres inmediatamente, puedes quedarte en 1 punto de golpe en su lugar. Recuperas este rasgo tras un descanso largo.',
      },
    ],
    legados: [],
  },
  {
    id: 'aasimar',
    nombre: 'Aasimar',
    nombreOriginal: 'Aasimar',
    descripcion: 'Humanoides tocados por la chispa de los planos celestiales que encarnan la justicia y la luz radiante.',
    tipoCriatura: 'Humanoide',
    tamano: 'Mediano o Pequeño',
    velocidadPies: 30,
    visionEnOscuridadPies: 60,
    rasgosBase: [
      {
        nombre: 'Resistencia Celestial',
        descripcion: 'Tienes resistencia al daño Necrótico y al daño Radiante.',
      },
      {
        nombre: 'Manos Sanadoras (Healing Hands)',
        descripcion: 'Como acción mágica, puedes tocar a una criatura y hacer que recupere un número de puntos de golpe igual a una tirada de d4s tantos como tu bonificador de competencia. Una vez por descanso largo.',
      },
      {
        nombre: 'Luz Celestial',
        descripcion: 'Conoces el truco Luz. Característica de lanzamiento: INT, SAB o CAR.',
      },
    ],
    legados: [
      {
        id: 'alma_radiante',
        nombre: 'Revelación: Alma Radiante (Radiant Soul)',
        descripcion: 'A nivel 3, desatas alas de energía radiante que te elevan hacia los cielos.',
        rasgos: [
          {
            nombre: 'Vuelo Radiante',
            descripcion: 'Como acción adicional a partir de nivel 3, despliegas alas luminosas durante 1 minuto (1 vez por descanso largo). Obtienes velocidad de vuelo de 30 pies y una vez por turno infliges daño radiante adicional igual a tu bonificador de competencia con un ataque o conjuro.',
          },
        ],
      },
      {
        id: 'sudario_radiante',
        nombre: 'Revelación: Sudario Radiante (Radiant Consumption)',
        descripcion: 'A nivel 3, emanas un calor solar sofocante que incinera a quienes te rodean.',
        rasgos: [
          {
            nombre: 'Aura Abrasadora',
            descripcion: 'Como acción adicional a partir de nivel 3, emites luz abrasadora en un radio de 10 pies durante 1 minuto (1 vez por descanso largo). Al final de cada uno de tus turnos, cualquier criatura a 10 pies recibe daño radiante igual a tu PB, y un ataque o conjuro tuyo inflige daño radiante extra igual a tu PB.',
          },
        ],
      },
      {
        id: 'vuelo_necrotico',
        nombre: 'Revelación: Vuelo Necrótico (Necrotic Shroud)',
        descripcion: 'A nivel 3, liberas alas esqueléticas oscuras que aterran los corazones de tus enemigos.',
        rasgos: [
          {
            nombre: 'Sudario de Espanto',
            descripcion: 'Como acción adicional a partir de nivel 3, despliegas alas espectrales oscuras (1 vez por descanso largo). Todas las criaturas que puedas ver a 10 pies deben superar una tirada de salvación de Carisma (CD 8 + PB + mod CAR/SAB) o quedar Asustadas de ti hasta el final de tu próximo turno. Además, infliges daño necrótico extra igual a tu PB una vez por turno.',
          },
        ],
      },
    ],
  },
  {
    id: 'tiefling',
    nombre: 'Tiefling',
    nombreOriginal: 'Tiefling',
    descripcion: 'Herederos de pactos y linajes procedentes de los planos inferiores, con cuernos, colas y un halo sobrenatural.',
    tipoCriatura: 'Humanoide',
    tamano: 'Mediano o Pequeño',
    velocidadPies: 30,
    visionEnOscuridadPies: 60,
    rasgosBase: [
      {
        nombre: 'Taumaturgia',
        descripcion: 'Conoces el truco Taumaturgia. Tu característica mágica es Inteligencia, Sabiduría o Carisma.',
      },
      {
        nombre: 'Herencia de los Planos Inferiores',
        descripcion: 'Tu linaje te conecta a un legado fiend específico que define tu resistencia elemental y tu repertorio mágico innato.',
      },
    ],
    legados: [
      {
        id: 'abisal',
        nombre: 'Legado Abisal (Abyssal Tiefling)',
        descripcion: 'Vinculado a los abismos caóticos del Abismo y los demonios salvajes.',
        rasgos: [
          {
            nombre: 'Resistencia Abisal',
            descripcion: 'Tienes resistencia al daño por Veneno.',
          },
          {
            nombre: 'Magia Abisal',
            descripcion: 'Conoces el truco Rociada venenosa. A nivel 3 puedes lanzar Rayo de enfermedad y a nivel 5 Mantener persona (1 vez por descanso largo o con ranuras).',
          },
        ],
        trucosOConjuros: ['Rociada venenosa', 'Rayo de enfermedad (Nvl 3)', 'Mantener persona (Nvl 5)'],
        resistenciaDanio: ['Veneno'],
      },
      {
        id: 'ctonico',
        nombre: 'Legado Ctónico (Chthonic Tiefling)',
        descripcion: 'Vinculado al inframundo sombrío de Carceri, Gehena y el Hades neutral-maligno.',
        rasgos: [
          {
            nombre: 'Resistencia Ctónica',
            descripcion: 'Tienes resistencia al daño Necrótico.',
          },
          {
            nombre: 'Magia Ctónica',
            descripcion: 'Conoces el truco Toque helado (Chill Touch). A nivel 3 puedes lanzar Falsa vida y a nivel 5 Rayo de debilitamiento (1 vez por descanso largo o con ranuras).',
          },
        ],
        trucosOConjuros: ['Toque helado', 'Falsa vida (Nvl 3)', 'Rayo de debilitamiento (Nvl 5)'],
        resistenciaDanio: ['Necrótico'],
      },
      {
        id: 'infernal',
        nombre: 'Legado Infernal (Infernal Tiefling)',
        descripcion: 'Vinculado al orden tiránico de los Nueve Infiernos de Baator y los diablos.',
        rasgos: [
          {
            nombre: 'Resistencia Infernal',
            descripcion: 'Tienes resistencia al daño por Fuego.',
          },
          {
            nombre: 'Magia Infernal',
            descripcion: 'Conoces el truco Descarga de fuego (Fire Bolt). A nivel 3 puedes lanzar Reprensión infernal y a nivel 5 Oscuridad (1 vez por descanso largo o con ranuras).',
          },
        ],
        trucosOConjuros: ['Descarga de fuego', 'Reprensión infernal (Nvl 3)', 'Oscuridad (Nvl 5)'],
        resistenciaDanio: ['Fuego'],
      },
    ],
  },
  {
    id: 'draconido',
    nombre: 'Dracónido',
    nombreOriginal: 'Dragonborn',
    descripcion: 'Orgullosos vástagos draconianos que portan en sus pulmones el aliento elemental de los dragones.',
    tipoCriatura: 'Humanoide',
    tamano: 'Mediano',
    velocidadPies: 30,
    visionEnOscuridadPies: 60,
    rasgosBase: [
      {
        nombre: 'Vuelo Dracónico (Draconic Flight - Nvl 5)',
        descripcion: 'A nivel 5, como acción adicional puedes manifestar alas espectrales draconianas durante 10 minutos (1 vez por descanso largo). Obtienes una velocidad de vuelo igual a tu velocidad caminando.',
      },
    ],
    legados: [
      {
        id: 'draconido_negro',
        nombre: 'Legado Negro (Ácido - Línea)',
        descripcion: 'Aliento de ácido cáustico en línea de 30x5 pies (Salvación Destreza). Resistencia al daño de ácido.',
        rasgos: [
          {
            nombre: 'Arma de Aliento Cáustica',
            descripcion: 'Exhalas un chorro de ácido en una línea de 30 pies de largo y 5 pies de ancho. Cada criatura debe superar una salvación de DES o sufrir 1d10 de daño ácido (2d10 a nvl 5, 3d10 a nvl 11, 4d10 a nvl 17), o la mitad con éxito. Usos: PB veces por descanso largo.',
          },
        ],
        resistenciaDanio: ['Ácido'],
      },
      {
        id: 'draconido_azul',
        nombre: 'Legado Azul (Relámpago - Línea)',
        descripcion: 'Aliento de arco eléctrico en línea de 30x5 pies (Salvación Destreza). Resistencia a relámpago.',
        rasgos: [
          {
            nombre: 'Arma de Aliento Eléctrico',
            descripcion: 'Línea de 30x5 pies. 1d10 de daño por relámpago (escala a 2d10, 3d10, 4d10). Salvación de Destreza. Usos: PB veces por descanso largo.',
          },
        ],
        resistenciaDanio: ['Relámpago'],
      },
      {
        id: 'draconido_rojo',
        nombre: 'Legado Rojo (Fuego - Cono)',
        descripcion: 'Aliento abrasador en cono de 15 pies (Salvación Destreza). Resistencia al fuego.',
        rasgos: [
          {
            nombre: 'Arma de Aliento de Llamas',
            descripcion: 'Cono de 15 pies. 1d10 de daño de fuego (escala a 2d10, 3d10, 4d10). Salvación de Destreza. Usos: PB veces por descanso largo.',
          },
        ],
        resistenciaDanio: ['Fuego'],
      },
      {
        id: 'draconido_verde',
        nombre: 'Legado Verde (Veneno - Cono)',
        descripcion: 'Nube tóxica en cono de 15 pies (Salvación Constitución). Resistencia a veneno.',
        rasgos: [
          {
            nombre: 'Arma de Aliento de Cloro Venenoso',
            descripcion: 'Cono de 15 pies. 1d10 de daño por veneno (escala a 2d10, 3d10, 4d10). Salvación de Constitución. Usos: PB veces por descanso largo.',
          },
        ],
        resistenciaDanio: ['Veneno'],
      },
      {
        id: 'draconido_blanco',
        nombre: 'Legado Blanco (Frío - Cono)',
        descripcion: 'Ventisca gélida en cono de 15 pies (Salvación Constitución). Resistencia al frío.',
        rasgos: [
          {
            nombre: 'Arma de Aliento Glacial',
            descripcion: 'Cono de 15 pies. 1d10 de daño por frío (escala a 2d10, 3d10, 4d10). Salvación de Constitución. Usos: PB veces por descanso largo.',
          },
        ],
        resistenciaDanio: ['Frío'],
      },
      {
        id: 'draconido_oro',
        nombre: 'Legado Oro (Fuego - Cono)',
        descripcion: 'Llama pura metálica en cono de 15 pies (Salvación Destreza). Resistencia al fuego.',
        rasgos: [
          {
            nombre: 'Arma de Aliento Dorado',
            descripcion: 'Cono de 15 pies. 1d10 de daño de fuego. Salvación de Destreza. Usos: PB veces por descanso largo.',
          },
        ],
        resistenciaDanio: ['Fuego'],
      },
      {
        id: 'draconido_plata',
        nombre: 'Legado Plata (Frío - Cono)',
        descripcion: 'Vaho ártico en cono de 15 pies (Salvación Constitución). Resistencia al frío.',
        rasgos: [
          {
            nombre: 'Arma de Aliento Plateado',
            descripcion: 'Cono de 15 pies. 1d10 de daño por frío. Salvación de Constitución. Usos: PB veces por descanso largo.',
          },
        ],
        resistenciaDanio: ['Frío'],
      },
      {
        id: 'draconido_bronce',
        nombre: 'Legado Bronce (Relámpago - Línea)',
        descripcion: 'Relámpago estruendoso en línea de 30x5 pies (Salvación Destreza). Resistencia a relámpago.',
        rasgos: [
          {
            nombre: 'Arma de Aliento Fulgurante',
            descripcion: 'Línea de 30x5 pies. 1d10 de daño por relámpago. Salvación de Destreza. Usos: PB veces por descanso largo.',
          },
        ],
        resistenciaDanio: ['Relámpago'],
      },
      {
        id: 'draconido_cobre',
        nombre: 'Legado Cobre (Ácido - Línea)',
        descripcion: 'Chorro corrosivo en línea de 30x5 pies (Salvación Destreza). Resistencia al ácido.',
        rasgos: [
          {
            nombre: 'Arma de Aliento Cobrizo',
            descripcion: 'Línea de 30x5 pies. 1d10 de daño ácido. Salvación de Destreza. Usos: PB veces por descanso largo.',
          },
        ],
        resistenciaDanio: ['Ácido'],
      },
      {
        id: 'draconido_laton',
        nombre: 'Legado Latón (Fuego - Línea)',
        descripcion: 'Haz ignífero concentrado en línea de 30x5 pies (Salvación Destreza). Resistencia al fuego.',
        rasgos: [
          {
            nombre: 'Arma de Aliento de Latón',
            descripcion: 'Línea de 30x5 pies. 1d10 de daño de fuego. Salvación de Destreza. Usos: PB veces por descanso largo.',
          },
        ],
        resistenciaDanio: ['Fuego'],
      },
    ],
  },
  {
    id: 'gnomo',
    nombre: 'Gnomo',
    nombreOriginal: 'Gnome',
    descripcion: 'Inventores curiosos y diminutos imbuidos de una intensa agudeza mental e ingenio mágico.',
    tipoCriatura: 'Humanoide',
    tamano: 'Pequeño',
    velocidadPies: 30,
    visionEnOscuridadPies: 60,
    rasgosBase: [
      {
        nombre: 'Astucia Gnoma (Gnomish Cunning)',
        descripcion: 'Tienes ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma.',
      },
    ],
    legados: [
      {
        id: 'gnomo_bosques',
        nombre: 'Legado del Gnomo de los Bosques (Forest Gnome)',
        descripcion: 'Conectados mágicamente a la fauna silvestre y el camuflaje ilusorio.',
        rasgos: [
          {
            nombre: 'Magia Silvestre Ilusoria',
            descripcion: 'Conoces el truco Ilusión menor. Además, puedes lanzar Hablar con animales un número de veces igual a tu bonificador de competencia por descanso largo sin gastar ranura.',
          },
        ],
        trucosOConjuros: ['Ilusión menor', 'Hablar con animales (PB veces)'],
      },
      {
        id: 'gnomo_rocas',
        nombre: 'Legado del Gnomo de las Rocas (Rock Gnome)',
        descripcion: 'Hábiles artesanos mecánicos y artificieros capaces de construir ingenios asombrosos.',
        rasgos: [
          {
            nombre: 'Conocimiento Artificiero',
            descripcion: 'Conoces los trucos Reparar y Prestidigitación. Puedes invertir 10 minutos para fabricar hasta 3 pequeños artilugios mecánicos que funcionan durante 8 horas (reloj despertador, encendedor o caja musical).',
          },
        ],
        trucosOConjuros: ['Reparar', 'Prestidigitación'],
      },
    ],
  },
];

export const DICCIONARIO_ESPECIES_55: Record<string, Especie> = TODAS_LAS_ESPECIES_55.reduce(
  (acc, esp) => {
    acc[esp.id] = esp;
    return acc;
  },
  {} as Record<string, Especie>
);
