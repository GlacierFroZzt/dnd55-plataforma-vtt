import { BuildSugerida } from '@/esquemas/buildSugerida';

export const BUILDS_SUGERIDAS_55: BuildSugerida[] = [
  // ==========================================
  // BÁRBARO
  // ==========================================
  {
    id: 'barbaro_furia_pesada',
    claseId: 'barbaro',
    nombre: 'Titán de la Furia Implacable',
    subtitulo: 'Armas a Dos Manos y Daño Devastador',
    enfoque: 'fuerza',
    descripcion: 'Enfocado en canalizar Ataque Temerario con armas pesadas para maximizar el daño cuerpo a cuerpo y resistir daño masivo gracias a su alto pozo de PG.',
    rolRecomendado: 'Tanque y DPS cuerpo a cuerpo frontal.',
    puntuaciones: { fuerza: 16, destreza: 14, constitucion: 16, inteligencia: 8, sabiduria: 12, carisma: 8 },
    prioridadAtributos: ['fuerza', 'constitucion', 'destreza'],
    trasfondosRecomendados: ['soldado', 'granjero', 'marinero'],
    doteOrigenRecomendada: 'atacanteSalvaje',
    armasRecomendadas: ['espadon', 'hachaDosManos'],
    subclaseRecomendada: 'berserker',
    consejosTacticos: [
      'Usa Ataque Temerario para asegurar impactos constantes; tu Furia y resistencia al daño compensarán la ventaja que concedas.',
      'Aprovecha la Maestría de Roce (Graze) del espadón para infligir daño por Fuerza incluso cuando falles tus ataques.',
      'Tu CA de Defensa Sin Armadura será 15 (10 + 2 DES + 3 CON), pero puedes usar media armadura si necesitas CA 16 o 17.',
    ],
  },
  {
    id: 'barbaro_cazador_agil',
    claseId: 'barbaro',
    nombre: 'Cazador de Bestias y Merodeador',
    subtitulo: 'Movilidad, Agilidad y Sentidos Salvajes',
    enfoque: 'mixto',
    descripcion: 'Un bárbaro versátil con mayor percepción y agilidad táctica para derribar y empujar enemigos usando armas versátiles.',
    rolRecomendado: 'Hostigador frontal y rastreador.',
    puntuaciones: { fuerza: 16, destreza: 14, constitucion: 14, inteligencia: 8, sabiduria: 14, carisma: 10 },
    prioridadAtributos: ['fuerza', 'sabiduria', 'constitucion'],
    trasfondosRecomendados: ['guia', 'guardia', 'marinero'],
    doteOrigenRecomendada: 'alerta',
    armasRecomendadas: ['hachaGuerra', 'lanza'],
    subclaseRecomendada: 'corazon_salvaje',
    consejosTacticos: [
      'Iniciativa alta para activar Furia y cerrar distancias en el primer turno de combate.',
      'Mayor Sabiduría para superar salvaciones mentales y detectar emboscadas con Percepción pasiva alta.',
    ],
  },

  // ==========================================
  // BARDO
  // ==========================================
  {
    id: 'bardo_orador_arcano',
    claseId: 'bardo',
    nombre: 'Virtuoso de la Fascinación y Apoyo',
    subtitulo: 'Hechicería de Control y Magia Social',
    enfoque: 'magia',
    descripcion: 'Especialista en potenciar aliados con Inspiración Bárdica, debilitar enemigos con Palabras Cortantes y dominar el terreno con conjuros de encantamiento.',
    rolRecomendado: 'Controlador de multitudes, apoyo y diplomático del grupo.',
    puntuaciones: { fuerza: 8, destreza: 14, constitucion: 14, inteligencia: 10, sabiduria: 12, carisma: 16 },
    prioridadAtributos: ['carisma', 'destreza', 'constitucion'],
    trasfondosRecomendados: ['animador', 'noble', 'charlatan'],
    doteOrigenRecomendada: 'musico',
    armasRecomendadas: ['estoque', 'daga'],
    subclaseRecomendada: 'colegio_saber',
    consejosTacticos: [
      'Guarda tu Inspiración Heroica y Bárdica para cambiar fallos críticos de tus aliados en momentos clave.',
      'Mantén tu distancia utilizando Vicious Mockery y conjuros de concentración de área.',
      'Tu Carisma 16 maximiza la CD de salvación de tus conjuros y tus pruebas sociales.',
    ],
  },
  {
    id: 'bardo_espadachin_danza',
    claseId: 'bardo',
    nombre: 'Duelista Armónico de Vanguardia',
    subtitulo: 'Agilidad Marcial y Danza de Acero',
    enfoque: 'destreza',
    descripcion: 'Combina destreza marcial con el Colegio del Valor o Danza 2024 para combatir en primera línea mientras mantiene sus canciones mágicas.',
    rolRecomendado: 'DPS secundario y apoyo móvil.',
    puntuaciones: { fuerza: 10, destreza: 16, constitucion: 14, inteligencia: 8, sabiduria: 10, carisma: 16 },
    prioridadAtributos: ['destreza', 'carisma', 'constitucion'],
    trasfondosRecomendados: ['animador', 'errante', 'criminal'],
    doteOrigenRecomendada: 'afortunado',
    armasRecomendadas: ['estoque', 'cimitarra'],
    subclaseRecomendada: 'colegio_valor',
    consejosTacticos: [
      'Aprovecha la Maestría de Hostigamiento (Vex) del estoque para otorgarte ventaja en tu siguiente golpe.',
      'DES 16 te otorga +3 al ataque, al daño y a tu Clase de Armadura.',
    ],
  },

  // ==========================================
  // CLÉRIGO
  // ==========================================
  {
    id: 'clerigo_guardian_guerra',
    claseId: 'clerigo',
    nombre: 'Baluarte de la Guerra y la Placa',
    subtitulo: 'Armadura Pesada, Martillo y Golpe Sagrado',
    enfoque: 'defensa',
    descripcion: 'Clérigo blindado con armadura pesada y escudo, capaz de sostener la línea frontal mientras reparte curaciones y daño radiante masivo.',
    rolRecomendado: 'Tanque sagrado, curandero y combatiente frontal.',
    puntuaciones: { fuerza: 15, destreza: 8, constitucion: 14, inteligencia: 10, sabiduria: 16, carisma: 10 },
    prioridadAtributos: ['sabiduria', 'fuerza', 'constitucion'],
    trasfondosRecomendados: ['soldado', 'guardia', 'acolito'],
    doteOrigenRecomendada: 'iniciadoMagia',
    armasRecomendadas: ['martilloGuerra', 'maza'],
    subclaseRecomendada: 'dominio_guerra',
    consejosTacticos: [
      'FUE 15 te permite vestir Armadura de Placas completa sin sufrir penalización a la velocidad.',
      'Usa la Maestría de Empujón (Push) del martillo de guerra para alejar amenazas de tus aliados.',
      'SAB 16 asegura que tus armas espirituales y conjuros de daño impacten con máxima contundencia.',
    ],
  },
  {
    id: 'clerigo_taumaturgo_luz',
    claseId: 'clerigo',
    nombre: 'Taumaturgo de la Luz y la Fe',
    subtitulo: 'Lanzador Divino a Distancia y Radiación Pura',
    enfoque: 'magia',
    descripcion: 'Enfocado en desatar plegarias incandescentes de área, expulsar muertos vivientes y sanar a distancia.',
    rolRecomendado: 'Artillería radiante y sanador de retaguardia.',
    puntuaciones: { fuerza: 8, destreza: 14, constitucion: 16, inteligencia: 10, sabiduria: 16, carisma: 10 },
    prioridadAtributos: ['sabiduria', 'constitucion', 'destreza'],
    trasfondosRecomendados: ['acolito', 'ermitano', 'sabio'],
    doteOrigenRecomendada: 'curandero',
    armasRecomendadas: ['ballestaLigera', 'maza'],
    subclaseRecomendada: 'dominio_luz',
    consejosTacticos: [
      'CON 16 es vital para mantener la concentración en Espíritu Guardián y Benciones durante el fragor del combate.',
      'Con DES 14 y armadura media + escudo alcanzas CA 18 fácilmente.',
    ],
  },

  // ==========================================
  // DRUIDA
  // ==========================================
  {
    id: 'druida_forma_salvaje',
    claseId: 'druida',
    nombre: 'Guardián de la Luna y las Bestias',
    subtitulo: 'Transformación Salvaje y Regeneración',
    enfoque: 'defensa',
    descripcion: 'Aprovecha las reglas 2024 de Forma Salvaje del Círculo de la Luna para ganar PG temporales y destrozar enemigos cuerpo a cuerpo.',
    rolRecomendado: 'Tanque metamórfico y combatiente bestial.',
    puntuaciones: { fuerza: 10, destreza: 14, constitucion: 16, inteligencia: 10, sabiduria: 16, carisma: 8 },
    prioridadAtributos: ['sabiduria', 'constitucion', 'destreza'],
    trasfondosRecomendados: ['granjero', 'guia', 'ermitano'],
    doteOrigenRecomendada: 'duro',
    armasRecomendadas: ['cimitarra', 'garrote'],
    subclaseRecomendada: 'circulo_luna',
    consejosTacticos: [
      'Lanza un conjuro de concentración (como Enredo o Llama Lunar) antes de transformarte en bestia.',
      'La dote Duro te otorga +2 PG por nivel que complementan la enorme durabilidad de tus formas animales.',
    ],
  },
  {
    id: 'druida_elemental_tierra',
    claseId: 'druida',
    nombre: 'Chamán de los Elementos y la Tierra',
    subtitulo: 'Control del Terreno y Conjuros Primigenios',
    enfoque: 'magia',
    descripcion: 'Comanda el clima, invoca aliados elementales y altera el campo de batalla con espinas y tormentas.',
    rolRecomendado: 'Controlador ambiental y soporte primigenio.',
    puntuaciones: { fuerza: 8, destreza: 14, constitucion: 15, inteligencia: 12, sabiduria: 16, carisma: 10 },
    prioridadAtributos: ['sabiduria', 'constitucion', 'destreza'],
    trasfondosRecomendados: ['guia', 'sabio', 'acolito'],
    doteOrigenRecomendada: 'alerta',
    armasRecomendadas: ['baston', 'daga'],
    subclaseRecomendada: 'circulo_tierra',
    consejosTacticos: [
      'Altera el terreno difícil para neutralizar cargas enemigas sin exponer tu posición.',
      'SAB 16 eleva al máximo la CD de tus salvaciones elementales.',
    ],
  },

  // ==========================================
  // GUERRERO
  // ==========================================
  {
    id: 'guerrero_campeon_pesado',
    claseId: 'guerrero',
    nombre: 'Coloso de Armas Pesadas (Fuerza)',
    subtitulo: 'Críticos Ampliados y Maestría de Roce',
    enfoque: 'fuerza',
    descripcion: 'El arquetipo clásico de potencia marcial pura. Diseñado para blandir un espadón o alabarda, derribar enemigos y nunca fallar completamente gracias a Roce.',
    rolRecomendado: 'DPS marcial constante y vanguardia de combate.',
    puntuaciones: { fuerza: 16, destreza: 14, constitucion: 16, inteligencia: 10, sabiduria: 12, carisma: 8 },
    prioridadAtributos: ['fuerza', 'constitucion', 'destreza'],
    trasfondosRecomendados: ['soldado', 'guardia', 'granjero'],
    doteOrigenRecomendada: 'atacanteSalvaje',
    armasRecomendadas: ['espadon', 'alabarda'],
    subclaseRecomendada: 'campeon',
    consejosTacticos: [
      'Tu maestría Roce asegura que incluso con tiradas de ataque fallidas aplicas daño garantizado igual a tu mod de Fuerza (+3).',
      'Atacante Salvaje te permite tirar dos veces el daño del arma y quedarte con el total más alto en cada turno.',
      'Con Acción Súbita (Action Surge) doblas tus ataques en turnos decisivos.',
    ],
  },
  {
    id: 'guerrero_tirador_destreza',
    claseId: 'guerrero',
    nombre: 'Maestro Arquero y Duelo Rápido',
    subtitulo: 'Tiroteo de Precisión y Agilidad Táctica',
    enfoque: 'destreza',
    descripcion: 'Especialista en combate con arco largo y armas sutiles, con una Clase de Armadura altísima y ventaja de iniciativa.',
    rolRecomendado: 'Francotirador de precisión y combatiente ágil.',
    puntuaciones: { fuerza: 10, destreza: 16, constitucion: 14, inteligencia: 12, sabiduria: 14, carisma: 8 },
    prioridadAtributos: ['destreza', 'constitucion', 'sabiduria'],
    trasfondosRecomendados: ['criminal', 'guardia', 'errante'],
    doteOrigenRecomendada: 'alerta',
    armasRecomendadas: ['arcoLargo', 'estoque'],
    subclaseRecomendada: 'maestro_batalla',
    consejosTacticos: [
      'Aprovecha la Maestría Ralentizar (Slow) del arco largo para restar 10 pies de velocidad a cualquier enemigo que intente alcanzarte.',
      'Tu bonificador de iniciativa se potencia con Alerta (+DES + PB).',
    ],
  },

  // ==========================================
  // MONJE
  // ==========================================
  {
    id: 'monje_viento_ki',
    claseId: 'monje',
    nombre: 'Maestro del Puño Abierto y Ki',
    subtitulo: 'Aturdimiento, Reflejos y Golpes de Ki',
    enfoque: 'destreza',
    descripcion: 'Aprovecha las grandes mejoras del Monje 2024: dados de golpe desarmado aumentados (1d6 a nvl 1), Restauración de Ki y Golpe Aturdidor optimizado.',
    rolRecomendado: 'Incapacitador de élite y hostigador veloz.',
    puntuaciones: { fuerza: 10, destreza: 16, constitucion: 14, inteligencia: 8, sabiduria: 16, carisma: 10 },
    prioridadAtributos: ['destreza', 'sabiduria', 'constitucion'],
    trasfondosRecomendados: ['guia', 'acolito', 'ermitano'],
    doteOrigenRecomendada: 'alerta',
    armasRecomendadas: ['baston', 'daga'],
    subclaseRecomendada: 'guerrero_mano_abierta',
    consejosTacticos: [
      'Tu CA sin armadura es 16 (10 + 3 DES + 3 SAB).',
      'SAB 16 aumenta la dificultad (CD) del Golpe Aturdidor y los efectos del Puño Abierto.',
      'Usa Paso del Viento como acción adicional para moverte sin provocar ataques de oportunidad.',
    ],
  },
  {
    id: 'monje_sombra_infiltrador',
    claseId: 'monje',
    nombre: 'Acechador de las Sombras',
    subtitulo: 'Teletransporte y Asesinato Silencioso',
    enfoque: 'destreza',
    descripcion: 'Monje ninja que manipula la oscuridad mágica y salta entre sombras para neutralizar blancos prioritarios.',
    rolRecomendado: 'Infiltrador sigiloso y verdugo de hechiceros.',
    puntuaciones: { fuerza: 10, destreza: 16, constitucion: 14, inteligencia: 10, sabiduria: 15, carisma: 8 },
    prioridadAtributos: ['destreza', 'sabiduria', 'constitucion'],
    trasfondosRecomendados: ['criminal', 'errante', 'guia'],
    doteOrigenRecomendada: 'afortunado',
    armasRecomendadas: ['espadaCorta', 'daga'],
    subclaseRecomendada: 'guerrero_sombras',
    consejosTacticos: [
      'Usa tu visión mágica en la oscuridad para luchar con ventaja total dentro de tu propia niebla oscura.',
    ],
  },

  // ==========================================
  // PALADÍN
  // ==========================================
  {
    id: 'paladin_vanguardia_sagrada',
    claseId: 'paladin',
    nombre: 'Campeón de la Devoción y la Placa',
    subtitulo: 'Aura Protectora y Castigo Divino',
    enfoque: 'fuerza',
    descripcion: 'El pilar supremo de la defensa y la moral del grupo. Con armadura pesada, escudo y su Aura de Protección que añade su Carisma a todas las salvaciones aliadas.',
    rolRecomendado: 'Tanque supremo, protector y DPS de impacto con Castigos.',
    puntuaciones: { fuerza: 16, destreza: 10, constitucion: 14, inteligencia: 8, sabiduria: 10, carisma: 16 },
    prioridadAtributos: ['fuerza', 'carisma', 'constitucion'],
    trasfondosRecomendados: ['soldado', 'noble', 'acolito'],
    doteOrigenRecomendada: 'atacanteSalvaje',
    armasRecomendadas: ['espadaLarga', 'espadon'],
    subclaseRecomendada: 'juramento_devocion',
    consejosTacticos: [
      'CAR 16 otorga +3 directo a TODAS las tiradas de salvación de ti y de tus aliados a 10 pies a partir de nivel 6.',
      'Usa la Maestría Minar (Sap) de la espada larga para imponer desventaja al siguiente ataque del enemigo.',
      'Reserva tus espacios de conjuro para Castigos Divinos cuando consigas impactos críticos.',
    ],
  },
  {
    id: 'paladin_vengador_ofensivo',
    claseId: 'paladin',
    nombre: 'Castigador Vengativo de Mandoble',
    subtitulo: 'Voto de Encono y Persecución Implacable',
    enfoque: 'fuerza',
    descripcion: 'Paladín ofensivo que renuncia al escudo para empuñar armas pesadas y cazar a los enemigos jurados con ventaja permanente.',
    rolRecomendado: 'DPS pesado destructor de jefes.',
    puntuaciones: { fuerza: 16, destreza: 10, constitucion: 16, inteligencia: 8, sabiduria: 10, carisma: 14 },
    prioridadAtributos: ['fuerza', 'constitucion', 'carisma'],
    trasfondosRecomendados: ['soldado', 'marinero', 'guardia'],
    doteOrigenRecomendada: 'duro',
    armasRecomendadas: ['espadon', 'alabarda'],
    subclaseRecomendada: 'juramento_venganza',
    consejosTacticos: [
      'Activa Voto de Enemistad (Vow of Enmity) para obtener ventaja en todos tus ataques contra tu objetivo designado.',
    ],
  },

  // ==========================================
  // EXPLORADOR (RANGER)
  // ==========================================
  {
    id: 'explorador_cazador_distancia',
    claseId: 'explorador',
    nombre: 'Francotirador de la Marca Cazadora',
    subtitulo: 'Tiro con Arco y Rastreo Implacable',
    enfoque: 'destreza',
    descripcion: 'Experto en combate a distancia con la Marca del Cazador 2024, ralentizando y castigando objetivos sin exponerse al daño.',
    rolRecomendado: 'DPS a distancia sostenido y guía de expedición.',
    puntuaciones: { fuerza: 10, destreza: 16, constitucion: 14, inteligencia: 10, sabiduria: 16, carisma: 8 },
    prioridadAtributos: ['destreza', 'sabiduria', 'constitucion'],
    trasfondosRecomendados: ['guia', 'guardia', 'granjero'],
    doteOrigenRecomendada: 'alerta',
    armasRecomendadas: ['arcoLargo', 'espadaCorta'],
    subclaseRecomendada: 'cazador',
    consejosTacticos: [
      'Mantén activa Marca del Cazador en tu objetivo principal para sumar 1d6 a cada impacto.',
      'SAB 16 potencia tu CD de conjuros de exploración y tus tiradas de Supervivencia y Percepción.',
    ],
  },
  {
    id: 'explorador_dos_armas_veloz',
    claseId: 'explorador',
    nombre: 'Derviche de Espadas Gemelas',
    subtitulo: 'Combate con Dos Armas y Maestría Nick',
    enfoque: 'destreza',
    descripcion: 'Aprovecha al máximo la propiedad de maestría Corte Rápido (Nick) para realizar el ataque de la mano torpe como parte de la acción de Atacar, liberando tu acción adicional.',
    rolRecomendado: 'DPS cuerpo a cuerpo ágil y móvil.',
    puntuaciones: { fuerza: 12, destreza: 16, constitucion: 14, inteligencia: 8, sabiduria: 14, carisma: 10 },
    prioridadAtributos: ['destreza', 'constitucion', 'sabiduria'],
    trasfondosRecomendados: ['marinero', 'criminal', 'guia'],
    doteOrigenRecomendada: 'afortunado',
    armasRecomendadas: ['cimitarra', 'espadaCorta'],
    subclaseRecomendada: 'acechador_sombrio',
    consejosTacticos: [
      'Al usar una cimitarra con Corte Rápido, no gastas tu acción adicional para golpear con la segunda arma, permitiéndote lanzar conjuros o usar habilidades el mismo turno.',
    ],
  },

  // ==========================================
  // PÍCARO (ROGUE)
  // ==========================================
  {
    id: 'picaro_emboscador_critico',
    claseId: 'picaro',
    nombre: 'Fantasma de la Emboscada Silenciosa',
    subtitulo: 'Ataque Furtivo y Golpes Astutos 2024',
    enfoque: 'destreza',
    descripcion: 'Aprovecha las nuevas mecánicas de Golpes Astutos (Cunning Strike) para reducir dados de daño furtivo a cambio de envenenar, derribar o cegar objetivos.',
    rolRecomendado: 'DPS de ráfaga sigilosa y desactivador de trampas.',
    puntuaciones: { fuerza: 8, destreza: 16, constitucion: 14, inteligencia: 14, sabiduria: 12, carisma: 10 },
    prioridadAtributos: ['destreza', 'inteligencia', 'constitucion'],
    trasfondosRecomendados: ['criminal', 'errante', 'escriba'],
    doteOrigenRecomendada: 'alerta',
    armasRecomendadas: ['estoque', 'daga'],
    subclaseRecomendada: 'asesino',
    consejosTacticos: [
      'DES 16 te garantiza la máxima bonificación para Sigilo y Juego de Manos con tus pericias expertas.',
      'Usa Acción Astuta en cada turno para Esconderte con ventaja y asegurar el Ataque Furtivo.',
    ],
  },
  {
    id: 'picaro_charlatan_social',
    claseId: 'picaro',
    nombre: 'Infiltrador Cortesano y Espía',
    subtitulo: 'Labia Deslumbrante, Engaño y Sigilo',
    enfoque: 'mixto',
    descripcion: 'Pícaro con alto Carisma para misiones de espionaje, falsificación de documentos y combate psicológico.',
    rolRecomendado: 'Especialista en infiltración urbana y líder social.',
    puntuaciones: { fuerza: 8, destreza: 16, constitucion: 12, inteligencia: 12, sabiduria: 10, carisma: 16 },
    prioridadAtributos: ['destreza', 'carisma', 'constitucion'],
    trasfondosRecomendados: ['charlatan', 'noble', 'animador'],
    doteOrigenRecomendada: 'experto',
    armasRecomendadas: ['estoque', 'ballestaLigera'],
    subclaseRecomendada: 'ladron',
    consejosTacticos: [
      'Combina Pericia en Engaño y Persuasión para desarmar guardias y conseguir accesos privilegiados.',
    ],
  },

  // ==========================================
  // HECHICERO (SORCERER)
  // ==========================================
  {
    id: 'hechicero_furia_draconica',
    claseId: 'hechicero',
    nombre: 'Señor del Fuego y Furia Dracónica',
    subtitulo: 'Artillería Metamágica y Resistencia Escamosa',
    enfoque: 'magia',
    descripcion: 'Canaliza la magia pura en su sangre con Furia Hechicera (Sorcerous Rage 2024), CA 13+DES sin armadura y Metamagia potenciada.',
    rolRecomendado: 'Artillería mágica de daño masivo en área.',
    puntuaciones: { fuerza: 8, destreza: 14, constitucion: 16, inteligencia: 10, sabiduria: 10, carisma: 16 },
    prioridadAtributos: ['carisma', 'constitucion', 'destreza'],
    trasfondosRecomendados: ['charlatan', 'ermitano', 'noble'],
    doteOrigenRecomendada: 'iniciadoMagia',
    armasRecomendadas: ['ballestaLigera', 'daga'],
    subclaseRecomendada: 'hechiceria_draconica',
    consejosTacticos: [
      'Tu CA base es 15 gracias a las escamas de dragón (13 + 2 DES).',
      'Activa Furia Hechicera para obtener ventaja en tiradas de ataque con conjuros y elevar tu CD.',
      'Usa Conjuro Rápido (Quickened Spell) para lanzar un conjuro poderoso de acción y un truco el mismo turno.',
    ],
  },

  // ==========================================
  // BRUJO (WARLOCK)
  // ==========================================
  {
    id: 'brujo_hoja_pacto',
    claseId: 'brujo',
    nombre: 'Hoja del Filo Maldito (Pact Blade)',
    subtitulo: 'Ataques con Carisma y Armadura Mágica',
    enfoque: 'mixto',
    descripcion: 'Usa el Pacto del Filo 2024 para atacar y dañar con Carisma usando cualquier arma marcial, combinando tajos letales con Descarga Sobrenatural.',
    rolRecomendado: 'Combatiente híbrido arcano-marcial.',
    puntuaciones: { fuerza: 8, destreza: 14, constitucion: 16, inteligencia: 10, sabiduria: 10, carisma: 16 },
    prioridadAtributos: ['carisma', 'constitucion', 'destreza'],
    trasfondosRecomendados: ['soldado', 'acolito', 'charlatan'],
    doteOrigenRecomendada: 'atacanteSalvaje',
    armasRecomendadas: ['espadon', 'alabarda'],
    subclaseRecomendada: 'infernal',
    consejosTacticos: [
      'Vincula un arma pesada (como el espadón) con Pacto del Filo: atacarás usando CAR en lugar de FUE.',
      'Tus espacios de conjuro de pacto siempre se lanzan al máximo nivel disponible y se recuperan en descansos cortos.',
    ],
  },
  {
    id: 'brujo_tomo_ocultista',
    claseId: 'brujo',
    nombre: 'Invocador de los Secretos del Tomo',
    subtitulo: 'Francotirador de Descarga Sobrenatural',
    enfoque: 'magia',
    descripcion: 'Domina los misterios sobrenaturales lanzando Descargas Sobrenaturales con empuje de 10 pies y versatilidad de rituales infinitos.',
    rolRecomendado: 'Artillería mágica de control y tirador a distancia.',
    puntuaciones: { fuerza: 8, destreza: 14, constitucion: 15, inteligencia: 12, sabiduria: 10, carisma: 16 },
    prioridadAtributos: ['carisma', 'constitucion', 'destreza'],
    trasfondosRecomendados: ['sabio', 'escriba', 'acolito'],
    doteOrigenRecomendada: 'afortunado',
    armasRecomendadas: ['daga', 'ballestaLigera'],
    subclaseRecomendada: 'gran_antiguo',
    consejosTacticos: [
      'Invocación Explosión Agónica añade tu Carisma a cada rayo de Descarga Sobrenatural.',
      'Explosión Repulsiva empuja a los objetivos 10 pies hacia atrás por cada impacto sin tirada de salvación.',
    ],
  },

  // ==========================================
  // MAGO (WIZARD)
  // ==========================================
  {
    id: 'mago_erudito_evocacion',
    claseId: 'mago',
    nombre: 'Erudito de la Evocación Destructiva',
    subtitulo: 'Modelar Conjuros y Artillería Elemental',
    enfoque: 'magia',
    descripcion: 'El maestro indiscutible de la magia arcana de batalla. Con Modelar Conjuros puedes lanzar Bolas de Fuego justo encima de tus compañeros sin hacerles ningún daño.',
    rolRecomendado: 'Artillería de daño masivo y resolución de problemas.',
    puntuaciones: { fuerza: 8, destreza: 14, constitucion: 16, inteligencia: 16, sabiduria: 12, carisma: 8 },
    prioridadAtributos: ['inteligencia', 'constitucion', 'destreza'],
    trasfondosRecomendados: ['sabio', 'escriba', 'noble'],
    doteOrigenRecomendada: 'alerta',
    armasRecomendadas: ['ballestaLigera', 'baston'],
    subclaseRecomendada: 'evocador',
    consejosTacticos: [
      'INT 16 eleva al máximo tu cantidad de conjuros preparados y la CD de salvación enemiga.',
      'CON 16 te asegura éxito en las pruebas de concentración cuando recibas daño.',
      'Modelar Conjuros crea bolsillos seguros para que tus aliados superen automáticamente las salvaciones y no sufran daño.',
    ],
  },
  {
    id: 'mago_abjurador_bastion',
    claseId: 'mago',
    nombre: 'Baluarte de la Abjuración y Protección',
    subtitulo: 'Escudo Arcano y Guardia Protectora',
    enfoque: 'defensa',
    descripcion: 'Especialista en defensas mágicas, contraconjuros y la Guardia Arcana (Arcane Ward), que absorbe daño para protegerte a ti y a tus aliados.',
    rolRecomendado: 'Defensa arcana, soporte y contrahechizos.',
    puntuaciones: { fuerza: 8, destreza: 14, constitucion: 16, inteligencia: 16, sabiduria: 10, carisma: 10 },
    prioridadAtributos: ['inteligencia', 'constitucion', 'destreza'],
    trasfondosRecomendados: ['sabio', 'guardia', 'acolito'],
    doteOrigenRecomendada: 'duro',
    armasRecomendadas: ['baston', 'daga'],
    subclaseRecomendada: 'abjurador',
    consejosTacticos: [
      'Tu Guardia Arcana se recarga cada vez que lanzas un conjuro de abjuración (como Escudo o Armadura de Mago).',
      'La dote Duro sumada a la Guardia Arcana convierte a este mago en un objetivo sumamente difícil de abatir.',
    ],
  },
];

export const DICCIONARIO_BUILDS_POR_CLASE: Record<string, BuildSugerida[]> = BUILDS_SUGERIDAS_55.reduce(
  (acc, build) => {
    if (!acc[build.claseId]) {
      acc[build.claseId] = [];
    }
    acc[build.claseId].push(build);
    return acc;
  },
  {} as Record<string, BuildSugerida[]>
);
