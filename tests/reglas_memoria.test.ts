import { describe, it, expect } from 'vitest';
import {
  calcularModificadorCaracteristica,
  calcularBonificadorCompetencia,
  resolverPruebaD20,
} from '@/motor/reglas/calculadorD20';
import {
  calcularEfectosAgotamiento,
  aplicarDescansoLargoAgotamiento,
} from '@/motor/reglas/gestorAgotamiento';
import { resolverEfectoMaestria } from '@/motor/reglas/resolutorMaestria';
import { calcularClaseArmadura } from '@/motor/reglas/calculadorCA';
import { LedgerEventos } from '@/motor/memoria/ledgerEventos';
import { ensamblarPromptParaDM } from '@/motor/memoria/ensambladorPrompt';
import { EstadoCampana } from '@/esquemas/campana';
import { FichaPersonaje } from '@/esquemas/personaje';
import { ClienteBotDM } from '@/motor/ia/clienteLLM';

describe('Motor de Reglas y Fórmulas D&D 5.5', () => {
  it('calcula correctamente los modificadores de característica D&D', () => {
    expect(calcularModificadorCaracteristica(10)).toBe(0);
    expect(calcularModificadorCaracteristica(11)).toBe(0);
    expect(calcularModificadorCaracteristica(12)).toBe(1);
    expect(calcularModificadorCaracteristica(15)).toBe(2);
    expect(calcularModificadorCaracteristica(18)).toBe(4);
    expect(calcularModificadorCaracteristica(20)).toBe(5);
    expect(calcularModificadorCaracteristica(8)).toBe(-1);
    expect(calcularModificadorCaracteristica(3)).toBe(-4);
  });

  it('calcula la progresión oficial del Bonificador de Competencia según nivel', () => {
    expect(calcularBonificadorCompetencia(1)).toBe(2);
    expect(calcularBonificadorCompetencia(4)).toBe(2);
    expect(calcularBonificadorCompetencia(5)).toBe(3);
    expect(calcularBonificadorCompetencia(8)).toBe(3);
    expect(calcularBonificadorCompetencia(9)).toBe(4);
    expect(calcularBonificadorCompetencia(13)).toBe(5);
    expect(calcularBonificadorCompetencia(17)).toBe(6);
    expect(calcularBonificadorCompetencia(20)).toBe(6);
  });

  it('aplica las reglas estrictas de Agotamiento de D&D 5.5', () => {
    const nv1 = calcularEfectosAgotamiento(1);
    expect(nv1.penalizadorPruebasD20).toBe(-2);
    expect(nv1.penalizadorCDConjuros).toBe(-2);
    expect(nv1.penalizadorVelocidadPies).toBe(-5);
    expect(nv1.estaMuerto).toBe(false);

    const nv3 = calcularEfectosAgotamiento(3);
    expect(nv3.penalizadorPruebasD20).toBe(-6);
    expect(nv3.penalizadorCDConjuros).toBe(-6);
    expect(nv3.penalizadorVelocidadPies).toBe(-15);
    expect(nv3.estaMuerto).toBe(false);

    const nv6 = calcularEfectosAgotamiento(6);
    expect(nv6.estaMuerto).toBe(true);
    expect(nv6.penalizadorPruebasD20).toBe(-12);

    expect(aplicarDescansoLargoAgotamiento(3)).toBe(2);
    expect(aplicarDescansoLargoAgotamiento(1)).toBe(0);
  });

  it('resuelve adecuadamente las Maestrías de Armas 2024', () => {
    // Roce (Graze): Daño en fallo igual al mod
    const roceFallo = resolverEfectoMaestria({
      maestria: 'roce',
      impacto: false,
      modificadorAtaque: 4,
      bonificadorCompetencia: 2,
      tamanoObjetivo: 'Mediano',
    });
    expect(roceFallo.aplicado).toBe(true);
    expect(roceFallo.danoGarantizadoEnFallo).toBe(4);

    // Derribo (Topple): CD = 8 + mod + prof
    const toppleImpacto = resolverEfectoMaestria({
      maestria: 'derribo',
      impacto: true,
      modificadorAtaque: 3,
      bonificadorCompetencia: 2,
      tamanoObjetivo: 'Mediano',
    });
    expect(toppleImpacto.aplicado).toBe(true);
    expect(toppleImpacto.obligaSalvacionConstitucion?.cd).toBe(13); // 8 + 3 + 2

    // Corte Rápido (Nick): libera acción adicional
    const nick = resolverEfectoMaestria({
      maestria: 'corteRapido',
      impacto: true,
      modificadorAtaque: 3,
      bonificadorCompetencia: 2,
      tamanoObjetivo: 'Mediano',
    });
    expect(nick.permiteAtaqueAdicionalAccionAtacar).toBe(true);

    // Hostigamiento (Vex): otorga ventaja en siguiente ataque
    const vex = resolverEfectoMaestria({
      maestria: 'hostigamiento',
      impacto: true,
      modificadorAtaque: 3,
      bonificadorCompetencia: 2,
      tamanoObjetivo: 'Mediano',
    });
    expect(vex.otorgaVentajaSiguienteAtaque).toBe(true);
  });

  it('calcula la Clase de Armadura según tipo de armadura y destreza', () => {
    // Sin armadura (10 + DES)
    expect(calcularClaseArmadura({
      destrezaMod: 3,
      tipoArmadura: 'sinArmadura',
      caBaseArmadura: 10,
      tieneEscudo: false,
    })).toBe(13);

    // Bárbaro sin armadura (10 + DES + CON)
    expect(calcularClaseArmadura({
      destrezaMod: 2,
      tipoArmadura: 'sinArmadura',
      caBaseArmadura: 10,
      tieneEscudo: false,
      rasgoDefensaSinArmadura: 'barbaro',
      constitucionMod: 3,
    })).toBe(15);

    // Armadura media (base 14 + DES capped a +2) con escudo (+2)
    expect(calcularClaseArmadura({
      destrezaMod: 4, // Excede el tope de +2
      tipoArmadura: 'media',
      caBaseArmadura: 14,
      tieneEscudo: true,
    })).toBe(18); // 14 + 2 + 2

    // Armadura pesada (base 18, ignora DES)
    expect(calcularClaseArmadura({
      destrezaMod: -1,
      tipoArmadura: 'pesada',
      caBaseArmadura: 18,
      tieneEscudo: false,
    })).toBe(18);
  });
});

describe('Motor de Memoria del Bot DM (Event Sourcing y Ledger Inmutable)', () => {
  it('registra eventos y filtra hechos relevantes para la escena y PNJs presentes', () => {
    const ledger = new LedgerEventos();

    // Evento 1: Ocurre en la cueva con Klarg
    ledger.registrarEvento({
      numeroSesion: 1,
      turno: 3,
      tipo: 'pactoAlianza',
      tituloCorto: 'Tregua con Klarg',
      resumenHecho: 'Los jugadores perdonaron a Klarg y le prometieron oro.',
      sujetosInvolucrados: ['pnj_klarg', 'party'],
      ubicacionId: 'cueva_cragmaw',
      consecuenciaActiva: 'Klarg no atacará y alertará sobre las trampas del pozo.',
      vigente: true,
      importancia: 'alta',
    });

    // Evento 2: Ocurre en la posada del pueblo con Toblen
    ledger.registrarEvento({
      numeroSesion: 1,
      turno: 12,
      tipo: 'compraVenta',
      tituloCorto: 'Compra de raciones',
      resumenHecho: 'Compraron provisiones en la posada de Toblen.',
      sujetosInvolucrados: ['pnj_toblen'],
      ubicacionId: 'posada_pueblo',
      consecuenciaActiva: 'Pagaron 5 piezas de plata.',
      vigente: true,
      importancia: 'baja',
    });

    expect(ledger.obtenerTodos()).toHaveLength(2);

    // Si la party está en la cueva de Cragmaw con Klarg presente:
    const escenaCueva = {
      id: 'cueva_cragmaw',
      nombreLugar: 'Guarida de Cragmaw',
      descripcionCorta: 'Una caverna húmeda',
      iluminacion: 'tenue' as const,
      pnjsPresentes: ['pnj_klarg'],
      enemigosPresentes: [],
      amenazasVisibles: [],
      objetosInteractuables: [],
      salidasDisponibles: [],
      enCombate: false,
    };

    const hechos = ledger.obtenerHechosRelevantesParaEscena(escenaCueva, {}, 5);
    expect(hechos).toHaveLength(1);
    expect(hechos[0].tituloCorto).toBe('Tregua con Klarg');
  });

  it('ensambla un prompt ultra-compacto inyectando el estado y la decisión del Ledger', () => {
    const ledger = new LedgerEventos();
    ledger.registrarEvento({
      numeroSesion: 1,
      turno: 2,
      tipo: 'decisionMoral',
      tituloCorto: 'Perdón a los cautivos',
      resumenHecho: 'Liberaron a los aldeanos apresados.',
      sujetosInvolucrados: ['aldeanos'],
      ubicacionId: 'mazmorra_1',
      consecuenciaActiva: 'Los aldeanos están a salvo y ofrecen refugio en la aldea.',
      vigente: true,
      importancia: 'alta',
    });

    const campana: EstadoCampana = {
      id: 'camp_1',
      codigoSala: 'SALA123',
      nombreCampana: 'Las Minas Perdidas 2024',
      modoJuego: 'solo',
      numeroSesionActual: 1,
      turnoActual: 4,
      fechaCreacion: Date.now(),
      escenaActual: {
        id: 'mazmorra_1',
        nombreLugar: 'Mazmorra Antigua',
        descripcionCorta: 'Pasillo con celdas abiertas',
        iluminacion: 'tenue',
        pnjsPresentes: ['aldeanos'],
        enemigosPresentes: [],
        amenazasVisibles: [],
        objetosInteractuables: [],
        salidasDisponibles: [],
        enCombate: false,
      },
      personajesIds: ['pj_1'],
      pnjs: {},
      ledgerDecisiones: ledger.obtenerTodos(),
      resumenCapituloAnterior: 'Comienzo de la aventura.',
      mensajesChat: [
        {
          id: 'm1',
          remitente: 'jugador',
          nombreEmisor: 'Valen',
          contenido: '¿Siguen los aldeanos en las celdas?',
          marcaTiempo: Date.now(),
          tipoMensaje: 'narrativa',
        },
      ],
    };

    const pjMuestra: FichaPersonaje = {
      id: 'pj_1',
      nombre: 'Valen el Valiente',
      jugadorNombre: 'Usuario',
      especie: 'Humano',
      trasfondo: 'Soldado',
      claseId: 'guerrero',
      nivel: 3,
      alineamiento: 'Legal Bueno',
      caracteristicas: { fuerza: 16, destreza: 14, constitucion: 15, inteligencia: 10, sabiduria: 12, carisma: 8 },
      puntosGolpeMaximos: 28,
      puntosGolpeActuales: 24,
      puntosGolpeTemporales: 0,
      claseArmadura: 18,
      velocidadPies: 30,
      iniciativaMod: 2,
      inspiracionHeroica: true,
      dadosGolpeDisponibles: 3,
      dadosGolpeTotales: 3,
      tipoDadoGolpe: 'd10',
      salvacionesMuerte: { exitos: 0, fallos: 0 },
      salvacionesCompetentes: ['fuerza', 'constitucion'],
      habilidadesCompetentes: ['atletismo', 'intimidacion'],
      habilidadesExpertas: [],
      armasCompetentes: ['armasMarciales'],
      armadurasCompetentes: ['armaduraPesada'],
      herramientasCompetentes: [],
      idiomas: ['Común'],
      maestriasArmasDesbloqueadas: ['derribo', 'roce'],
      armasEquipadas: ['espadon'],
      armaduraEquipada: 'placas',
      escudoEquipado: false,
      monedas: { cobre: 0, plata: 0, electro: 0, oro: 25, platino: 0 },
      inventarioObjetos: ['cuerda de cáñamo', 'antorcha'],
      espaciosConjuroMaximos: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      espaciosConjuroGastados: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      conjurosPreparados: [],
      trucosConocidos: [],
      condicionesActivas: [],
      nivelAgotamiento: 0,
      dotesIds: ['alerta'],
      rasgosEspeciales: ['Segundo Aliento', 'Oleada de Acción'],
    };

    const promptEnsamblado = ensamblarPromptParaDM({
      campana,
      fichasPersonajes: [pjMuestra],
      ledger,
    });

    expect(promptEnsamblado.bloqueSistemaCacheador).toContain('D&D 5.5');
    expect(promptEnsamblado.capsulaEstadoDinamico).toContain('Valen el Valiente');
    expect(promptEnsamblado.hechosCanónicosInyectados).toContain('Liberaron a los aldeanos apresados.');
    // Comprobamos que el conteo de tokens estimado es inferior a 800 tokens
    expect(promptEnsamblado.estimacionTokensAproximada).toBeLessThan(800);
  });

  it('el cliente simulador local del Bot DM responde coherentemente y genera tool calls de decisiones', async () => {
    const cliente = new ClienteBotDM({ proveedor: 'mock' });
    const contextoPrueba = {
      bloqueSistemaCacheador: 'DM de D&D 5.5',
      capsulaEstadoDinamico: 'Cueva con bandidos',
      hechosCanónicosInyectados: 'Ninguno',
      ultimosMensajesChat: [],
      estimacionTokensAproximada: 120,
    };

    // Si el jugador decide perdonar al enemigo:
    const respuesta = await cliente.generarTurno(contextoPrueba, 'Decidimos perdonar su vida y pactar una tregua');
    expect(respuesta.narrativa).toContain('baja su arma');
    expect(respuesta.llamadasHerramientas.length).toBeGreaterThan(0);
    expect(respuesta.llamadasHerramientas[0].nombre).toBe('registrar_decision_campana');
  });
});
