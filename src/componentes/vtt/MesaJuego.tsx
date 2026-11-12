'use client';

import React, { useState, useEffect } from 'react';
import { FichaPersonaje } from '@/esquemas/personaje';
import { EstadoCampana, EventoDecision, EstadoPNJ } from '@/esquemas/campana';
import { LedgerEventos } from '@/motor/memoria/ledgerEventos';
import { ensamblarPromptParaDM } from '@/motor/memoria/ensambladorPrompt';
import { ClienteBotDM, ProveedorIA } from '@/motor/ia/clienteLLM';
import { resolverPruebaD20, calcularModificadorCaracteristica } from '@/motor/reglas/calculadorD20';
import { resolverEfectoMaestria } from '@/motor/reglas/resolutorMaestria';
import { calcularEfectosAgotamiento } from '@/motor/reglas/gestorAgotamiento';
import { CATALOGO_ARMAS_55 } from '@/datos/armas';
import { MAESTRIAS_ARMAS_55 } from '@/datos/maestrias';
import {
  Shield, Heart, Dices, BookOpen, Users, Sparkles, Send,
  Cpu, Copy, Check, AlertCircle, RefreshCw, Moon, Flame
} from 'lucide-react';

interface Props {
  personajeInicial: FichaPersonaje;
  onVolverAlMenu?: () => void;
}

export function MesaJuego({ personajeInicial, onVolverAlMenu }: Props) {
  // Estado de Campaña y Personajes
  const [personajes, setPersonajes] = useState<FichaPersonaje[]>([personajeInicial]);
  const [personajeActivoId, setPersonajeActivoId] = useState(personajeInicial.id);
  const [codigoSala, setCodigoSala] = useState('DND-55X9');
  const [copiado, setCopiado] = useState(false);
  const [modoJuego, setModoJuego] = useState<'solo' | 'multijugador'>('solo');
  const [turno, setTurno] = useState(1);
  const [sesion, setSesion] = useState(1);

  // Proveedor IA
  const [proveedorIA, setProveedorIA] = useState<ProveedorIA>('mock');
  const [apiKeyIA, setApiKeyIA] = useState('');
  const [mostrarAjustesIA, setMostrarAjustesIA] = useState(false);
  const [cargandoIA, setCargandoIA] = useState(false);

  // Subnavegación Phone-First para pantallas móviles (< 1024px)
  const [pestanaMovil, setPestanaMovil] = useState<'chat' | 'ficha' | 'dados'>('chat');

  // Memoria del Bot DM (Ledger de Decisiones)
  const [ledger] = useState<LedgerEventos>(() => {
    const l = new LedgerEventos();
    // Hecho inicial de prueba
    l.registrarEvento({
      numeroSesion: 1,
      turno: 1,
      tipo: 'decisionMoral',
      tituloCorto: 'Contrato de la Hermandad',
      resumenHecho: 'El grupo aceptó explorar las ruinas olvidadas para recuperar la reliquia del solsticio.',
      sujetosInvolucrados: [personajeInicial.id],
      ubicacionId: 'ruinas_cripta_1',
      consecuenciaActiva: 'Poseen un mapa rudimentario y una antorcha encantada.',
      vigente: true,
      importancia: 'media',
    });
    return l;
  });

  const [listaEventos, setListaEventos] = useState<EventoDecision[]>(() => ledger.obtenerTodos());

  // Chat
  const [mensajes, setMensajes] = useState<Array<{ id: string; emisor: 'dm' | 'jugador'; nombre: string; texto: string; timestamp: number }>>([
    {
      id: 'm_init',
      emisor: 'dm',
      nombre: 'Bot DM (D&D 5.5)',
      texto: `¡Bienvenidos a la mesa de juego! Os encontráis ante las pesadas puertas de piedra de la Cripta de los Antiguos. El aire es frío y huele a humedad y piedra caliza. Vuestra antorcha arroja largas sombras sobre los muros.\n\nEl sistema de reglas de **D&D 5.5 (Revisión 2024)** está activo: podéis utilizar Maestrías de Armas, Inspiración Heroica y consultar la Bitácora Canónica. ¿Qué deseáis hacer?`,
      timestamp: Date.now(),
    },
  ]);
  const [inputMensaje, setInputMensaje] = useState('');

  // Tiradas de Dados D20
  const [tipoVentaja, setTipoVentaja] = useState<'normal' | 'ventaja' | 'desventaja'>('normal');
  const [usaInspiracion, setUsaInspiracion] = useState(false);
  const [ultimoResultadoD20, setUltimoResultadoD20] = useState<any>(null);

  const personajeActivo = personajes.find((p) => p.id === personajeActivoId) || personajes[0];
  const armaEquipada = CATALOGO_ARMAS_55[personajeActivo.armasEquipadas[0]] || CATALOGO_ARMAS_55.espadon;
  const maestriaArma = MAESTRIAS_ARMAS_55[armaEquipada.maestriaPorDefecto];
  const agotamientoInfo = calcularEfectosAgotamiento(personajeActivo.nivelAgotamiento);

  const copiarEnlace = () => {
    navigator.clipboard.writeText(`https://dnd55.mesa.local/?sala=${codigoSala}`);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  // Enviar mensaje del jugador y procesar respuesta del Bot DM
  const enviarMensaje = async (textoPersonalizado?: string) => {
    const texto = textoPersonalizado || inputMensaje;
    if (!texto.trim() || cargandoIA) return;

    const nuevoMensajeJugador = {
      id: `msg_${Date.now()}`,
      emisor: 'jugador' as const,
      nombre: personajeActivo.nombre,
      texto,
      timestamp: Date.now(),
    };

    setMensajes((prev) => [...prev, nuevoMensajeJugador]);
    setInputMensaje('');
    setCargandoIA(true);

    // Preparar estado de la campaña para inyección de contexto
    const campanaActual: EstadoCampana = {
      id: 'camp_activa',
      codigoSala,
      nombreCampana: 'Aventura en la Cripta 2024',
      modoJuego,
      numeroSesionActual: sesion,
      turnoActual: turno,
      fechaCreacion: Date.now(),
      escenaActual: {
        id: 'ruinas_cripta_1',
        nombreLugar: 'Entrada a la Cripta de los Antiguos',
        descripcionCorta: 'Una cámara subterránea abovedada con dos pasillos',
        iluminacion: 'tenue',
        pnjsPresentes: ['pnj_guardian', 'pnj_1'],
        enemigosPresentes: [],
        amenazasVisibles: ['Escaleras mohosas'],
        objetosInteractuables: ['Sarcófago tallado', 'Antorchas'],
        salidasDisponibles: ['Pasillo izquierdo', 'Pasadizo norte'],
        enCombate: false,
      },
      personajesIds: personajes.map((p) => p.id),
      pnjs: {
        pnj_1: {
          id: 'pnj_1',
          nombre: 'Kaelen el Renegado',
          tituloOcupacion: 'Guía de la cripta',
          ubicacionActual: 'ruinas_cripta_1',
          estaVivo: true,
          puntosGolpeActuales: 18,
          puntosGolpeMaximos: 18,
          actitudHaciaGrupo: 'indiferente',
          secretosRevelados: [],
          recuerdosRelevantes: [],
          deudasOPromesas: [],
        },
      },
      ledgerDecisiones: ledger.obtenerTodos(),
      resumenCapituloAnterior: 'Llegada a las colinas silenciosas.',
      mensajesChat: mensajes.map((m) => ({
        id: m.id,
        remitente: m.emisor,
        nombreEmisor: m.nombre,
        contenido: m.texto,
        marcaTiempo: m.timestamp,
        tipoMensaje: 'narrativa',
      })),
    };

    const promptContexto = ensamblarPromptParaDM({
      campana: campanaActual,
      fichasPersonajes: personajes,
      ledger,
    });

    const cliente = new ClienteBotDM({
      proveedor: proveedorIA,
      apiKey: apiKeyIA,
    });

    try {
      const respuestaDM = await cliente.generarTurno(promptContexto, texto);

      // Si el DM ejecutó tool calls (como registrar decisiones):
      for (const call of respuestaDM.llamadasHerramientas) {
        if (call.nombre === 'registrar_decision_campana') {
          ledger.registrarEvento({
            numeroSesion: sesion,
            turno,
            tipo: call.argumentos.tipo,
            tituloCorto: call.argumentos.tituloCorto,
            resumenHecho: call.argumentos.resumenHecho,
            sujetosInvolucrados: call.argumentos.sujetosInvolucrados || [personajeActivo.id],
            ubicacionId: 'ruinas_cripta_1',
            consecuenciaActiva: call.argumentos.consecuenciaActiva,
            vigente: true,
            importancia: call.argumentos.importancia || 'alta',
          });
          setListaEventos(ledger.obtenerTodos());
        }
      }

      setMensajes((prev) => [
        ...prev,
        {
          id: `msg_dm_${Date.now()}`,
          emisor: 'dm',
          nombre: 'Bot DM',
          texto: respuestaDM.narrativa,
          timestamp: Date.now(),
        },
      ]);
      setTurno((t) => t + 1);
    } catch (e: any) {
      console.error(e);
    } finally {
      setCargandoIA(false);
    }
  };

  // Lanzar dado D20 interactivo
  const ejecutarTiradaD20 = (caracteristica: 'fuerza' | 'destreza' | 'constitucion' | 'inteligencia' | 'sabiduria' | 'carisma' = 'fuerza', tipo = 'Tirada de Ataque') => {
    const mod = calcularModificadorCaracteristica(personajeActivo.caracteristicas[caracteristica]);
    const penAgotamiento = agotamientoInfo.penalizadorPruebasD20;
    const res = resolverPruebaD20({
      id: `tir_${Date.now()}`,
      personajeId: personajeActivo.id,
      tipoPrueba: 'tiradaAtaque',
      caracteristica,
      ventaja: tipoVentaja,
      usaInspiracionHeroica: usaInspiracion,
      descripcion: tipo,
    });

    const totalConMod = res.dadoElegido + mod + 2 + penAgotamiento; // Base + Competencia (+2) + Agotamiento
    const resultadoCompuesto = {
      ...res,
      modificador: mod + 2 + penAgotamiento,
      totalFinal: totalConMod,
      caracteristica,
      tipo,
    };

    setUltimoResultadoD20(resultadoCompuesto);

    // Si sacó 20 natural, otorgar Inspiración Heroica si no la tenía (regla 5.5!)
    if (res.esCritico20) {
      setPersonajes((prev) =>
        prev.map((p) => (p.id === personajeActivo.id ? { ...p, inspiracionHeroica: true } : p))
      );
    }

    // Resolver Maestría de Arma si fue tirada de ataque
    let textoMaestria = '';
    if (armaEquipada.maestriaPorDefecto) {
      const efecto = resolverEfectoMaestria({
        maestria: armaEquipada.maestriaPorDefecto,
        impacto: totalConMod >= 14,
        modificadorAtaque: mod,
        bonificadorCompetencia: 2,
        tamanoObjetivo: 'Mediano',
      });
      if (efecto.aplicado) {
        textoMaestria = ` ⚔️ [Maestría 2024: ${efecto.descripcionEfecto}]`;
      }
    }

    // Enviar resultado al chat como mensaje del sistema
    const msgTexto = `🎲 Tirada de ${tipo}: Sacó un [${res.dadoElegido}] + mod (${mod + 2 + penAgotamiento}) = **${totalConMod}** ${res.esCritico20 ? '🔥 ¡CRÍTICO NATURAL 20!' : res.esPifia1 ? '💀 PIFIA NATURAL 1' : ''}${textoMaestria}`;
    setMensajes((prev) => [
      ...prev,
      {
        id: `msg_dice_${Date.now()}`,
        emisor: 'jugador',
        nombre: 'Sistema / Dados',
        texto: msgTexto,
        timestamp: Date.now(),
      },
    ]);
  };

  // Descanso corto o largo
  const realizarDescanso = (tipo: 'corto' | 'largo') => {
    if (tipo === 'largo') {
      setPersonajes((prev) =>
        prev.map((p) => ({
          ...p,
          puntosGolpeActuales: p.puntosGolpeMaximos,
          dadosGolpeDisponibles: p.dadosGolpeTotales,
          nivelAgotamiento: Math.max(0, p.nivelAgotamiento - 1),
        }))
      );
      enviarMensaje('El grupo se toma un Descanso Largo (8 horas). Recuperan toda su vida, dados de golpe y reducen 1 nivel de agotamiento.');
    } else {
      setPersonajes((prev) =>
        prev.map((p) => ({
          ...p,
          puntosGolpeActuales: Math.min(p.puntosGolpeMaximos, p.puntosGolpeActuales + 8),
        }))
      );
      enviarMensaje('El grupo realiza un Descanso Corto (1 hora) atendiendo heridas menores.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      {/* Barra Superior de la Mesa */}
      <header className="bg-slate-900 border-b border-slate-800 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 shadow-md shrink-0">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-400 font-bold text-xs sm:text-sm shrink-0">
            5.5
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-slate-100 text-xs sm:text-base flex items-center gap-1.5 sm:gap-2 truncate">
              <span className="truncate">Aventura en la Cripta</span>
              <span className="text-[10px] sm:text-xs font-normal bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded shrink-0">
                2024
              </span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 truncate">
              S{sesion} • T{turno} • <span className="text-slate-200 capitalize font-medium">{modoJuego}</span>
            </p>
          </div>
        </div>

        {/* Sala Multijugador y Ajustes */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setModoJuego(modoJuego === 'solo' ? 'multijugador' : 'solo')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold flex items-center gap-1 border transition-all ${
              modoJuego === 'multijugador'
                ? 'bg-purple-950/60 border-purple-500 text-purple-300'
                : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{modoJuego === 'multijugador' ? 'Multijugador Activo' : 'Modo Solitario'}</span>
            <span className="sm:hidden">{modoJuego === 'multijugador' ? 'Multi' : 'Solo'}</span>
          </button>

          <button
            onClick={copiarEnlace}
            title="Copiar código de sala para amigos"
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs flex items-center gap-1 font-mono"
          >
            {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{codigoSala}</span>
          </button>

          <button
            onClick={() => setMostrarAjustesIA(!mostrarAjustesIA)}
            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-400 px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs flex items-center gap-1 font-medium"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">IA: {proveedorIA.toUpperCase()}</span>
          </button>

          {onVolverAlMenu && (
            <button
              onClick={onVolverAlMenu}
              className="text-slate-400 hover:text-slate-200 text-xs px-2 py-1.5 rounded border border-slate-800 hover:border-slate-700"
            >
              Salir
            </button>
          )}
        </div>
      </header>

      {/* Subbarra de Navegación Phone-First (Visible únicamente en Móviles < 1024px) */}
      <nav aria-label="Secciones de la mesa en móvil" className="lg:hidden flex border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-20 shrink-0">
        <button
          type="button"
          onClick={() => setPestanaMovil('chat')}
          className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all min-h-[44px] ${
            pestanaMovil === 'chat'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Narración & DM</span>
        </button>
        <button
          type="button"
          onClick={() => setPestanaMovil('ficha')}
          className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all min-h-[44px] ${
            pestanaMovil === 'ficha'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Mi Ficha & Grupo</span>
        </button>
        <button
          type="button"
          onClick={() => setPestanaMovil('dados')}
          className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all min-h-[44px] ${
            pestanaMovil === 'dados'
              ? 'border-amber-500 text-amber-400 bg-amber-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Dices className="w-4 h-4" />
          <span>Dados & Bitácora</span>
        </button>
      </nav>

      {/* Modal / Panel de Ajustes de IA */}
      {mostrarAjustesIA && (
        <div className="bg-slate-900/95 border-b border-amber-500/30 p-4 px-6 flex flex-wrap items-center justify-between gap-4 animate-in slide-in-from-top">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Motor del Bot DM:</label>
              <select
                value={proveedorIA}
                onChange={(e) => setProveedorIA(e.target.value as ProveedorIA)}
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
              >
                <option value="mock">Simulador Local (Gratis / Sin API Key)</option>
                <option value="claude">Anthropic Claude (Sonnet 3.5 con Prompt Caching)</option>
                <option value="openai">OpenAI (GPT-4o-mini / GPT-4o)</option>
              </select>
            </div>

            {proveedorIA !== 'mock' && (
              <div className="min-w-[240px]">
                <label className="block text-xs font-semibold text-slate-300 mb-1">API Key:</label>
                <input
                  type="password"
                  placeholder="sk-ant-... o sk-..."
                  value={apiKeyIA}
                  onChange={(e) => setApiKeyIA(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-xs text-slate-100"
                />
              </div>
            )}
          </div>
          <button
            onClick={() => setMostrarAjustesIA(false)}
            className="text-xs bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded"
          >
            Listo
          </button>
        </div>
      )}

      {/* Contenido Principal en 3 Columnas: Panel de Grupo | Chat Narrativo DM | Tiradas y Bitácora */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* COLUMNA 1: Estado del Grupo de Aventureros (3 columnas) */}
        <div className={`${pestanaMovil === 'ficha' ? 'block' : 'hidden lg:block'} lg:col-span-3 bg-slate-950/70 border-r border-slate-800 p-3 sm:p-4 overflow-y-auto space-y-4 pb-16 lg:pb-4`}>
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" />
              Grupo de Aventureros ({personajes.length})
            </h2>
          </div>

          {personajes.map((pj) => {
            const hpPorcentaje = Math.round((pj.puntosGolpeActuales / pj.puntosGolpeMaximos) * 100);
            return (
              <div
                key={pj.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  pj.id === personajeActivoId
                    ? 'bg-slate-900 border-amber-500/50 shadow-md'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{pj.nombre}</h3>
                    <p className="text-xs text-slate-400">
                      {pj.especie}{pj.legadoEspecie ? ` (${pj.legadoEspecie})` : ''} • {pj.trasfondo} • {pj.claseId} (Nv {pj.nivel})
                    </p>
                  </div>
                  {pj.inspiracionHeroica && (
                    <span className="bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Inspiración
                    </span>
                  )}
                </div>

                {/* Barra de Vida */}
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400" /> Puntos de Golpe:
                    </span>
                    <span className="text-slate-200">
                      {pj.puntosGolpeActuales} / {pj.puntosGolpeMaximos}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        hpPorcentaje > 50 ? 'bg-emerald-500' : hpPorcentaje > 20 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${hpPorcentaje}%` }}
                    />
                  </div>
                </div>

                {/* Estadísticas de Combate 2024 */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">CA</span>
                    <span className="font-bold text-slate-200 flex items-center justify-center gap-0.5">
                      <Shield className="w-3 h-3 text-blue-400" /> {pj.claseArmadura}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Velocidad</span>
                    <span className="font-bold text-slate-200">
                      {Math.max(0, pj.velocidadPies + agotamientoInfo.penalizadorVelocidadPies)} ft
                    </span>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Agotamiento</span>
                    <span className={`font-bold ${pj.nivelAgotamiento > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                      Nv {pj.nivelAgotamiento}
                    </span>
                  </div>
                </div>

                {/* Maestría Activa */}
                <div className="mt-3 text-xs bg-amber-950/20 border border-amber-500/20 p-2 rounded text-slate-300">
                  <span className="text-amber-400 font-semibold block text-[10px] uppercase">
                    Maestría 2024: {maestriaArma?.nombre} ({maestriaArma?.nombreOriginal})
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                    {maestriaArma?.descripcion}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Botones de Descanso */}
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase">Gestión de Descanso</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => realizarDescanso('corto')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-1.5 rounded border border-slate-700 flex items-center justify-center gap-1"
              >
                <Flame className="w-3 h-3 text-amber-400" /> Descanso Corto
              </button>
              <button
                onClick={() => realizarDescanso('largo')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs py-1.5 rounded border border-slate-700 flex items-center justify-center gap-1"
              >
                <Moon className="w-3 h-3 text-indigo-400" /> Descanso Largo
              </button>
            </div>
          </div>
        </div>

        {/* COLUMNA 2: Chat Narrativo con Streaming del Bot DM (6 columnas) */}
        <div className={`${pestanaMovil === 'chat' ? 'flex' : 'hidden lg:flex'} lg:col-span-6 flex-col h-[calc(100dvh-106px)] lg:h-[calc(100vh-61px)] bg-[#090d16]`}>
          {/* Mensajes */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3">
            {mensajes.map((m) => (
              <div
                key={m.id}
                className={`p-3 sm:p-3.5 rounded-xl text-xs sm:text-sm leading-relaxed ${
                  m.emisor === 'dm'
                    ? 'bg-slate-900 border border-amber-500/30 text-slate-200'
                    : m.nombre.includes('Sistema')
                    ? 'bg-indigo-950/40 border border-indigo-800/40 text-indigo-200'
                    : 'bg-slate-800 border border-slate-700 text-slate-100 ml-4 sm:ml-6'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span
                    className={`font-bold ${
                      m.emisor === 'dm'
                        ? 'text-amber-400 flex items-center gap-1'
                        : 'text-slate-300'
                    }`}
                  >
                    {m.emisor === 'dm' && <Sparkles className="w-3 h-3" />}
                    {m.nombre}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="whitespace-pre-line">{m.texto}</div>
              </div>
            ))}
            {cargandoIA && (
              <div className="bg-slate-900 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-300 flex items-center gap-2 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                El Bot DM está calculando consecuencias y tejiendo la narración...
              </div>
            )}
          </div>

          {/* Acciones Rápidas con Scroll Horizontal en Móvil */}
          <div className="px-3 sm:px-4 py-2 border-t border-slate-800/60 bg-slate-950/50 flex overflow-x-auto no-scrollbar gap-1.5 text-xs whitespace-nowrap shrink-0">
            <button
              onClick={() => enviarMensaje('Ataco con mi arma principal aprovechando su maestría de combate.')}
              className="bg-red-950/50 hover:bg-red-900/60 border border-red-800/60 text-red-200 px-3 py-1.5 rounded-lg shrink-0 min-h-[36px] flex items-center"
            >
              ⚔️ Atacar con {armaEquipada.nombre}
            </button>
            <button
              onClick={() => enviarMensaje('Investigo el sarcófago y los bajorrelieves en busca de inscripciones o trampas.')}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg shrink-0 min-h-[36px] flex items-center"
            >
              🔍 Investigar Sala
            </button>
            <button
              onClick={() => enviarMensaje('Intento parlamentar pacíficamente y pactar una tregua sin derramar sangre.')}
              className="bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-200 px-3 py-1.5 rounded-lg shrink-0 min-h-[36px] flex items-center"
            >
              🤝 Negociar Tregua
            </button>
          </div>

          {/* Entrada de Texto Táctil */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              enviarMensaje();
            }}
            className="p-2.5 sm:p-3 bg-slate-900 border-t border-slate-800 flex gap-2 pb-safe shrink-0"
          >
            <input
              type="text"
              value={inputMensaje}
              onChange={(e) => setInputMensaje(e.target.value)}
              placeholder="¿Qué deseas hacer en este turno?"
              className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-base sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500 min-h-[44px]"
            />
            <button
              type="submit"
              disabled={cargandoIA}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold px-3.5 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 text-xs sm:text-sm transition-colors min-h-[44px] shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Enviar</span>
            </button>
          </form>
        </div>

        {/* COLUMNA 3: Tirador de Dados 5.5 y Bitácora de Decisiones (Ledger) (3 columnas) */}
        <div className={`${pestanaMovil === 'dados' ? 'block' : 'hidden lg:block'} lg:col-span-3 bg-slate-950/70 border-l border-slate-800 p-3 sm:p-4 overflow-y-auto space-y-4 pb-16 lg:pb-4`}>
          {/* Panel de Tiradas D20 */}
          <div className="bg-slate-900 p-3.5 sm:p-4 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Dices className="w-4 h-4 text-amber-400" />
              Tirador D20 (D&D 5.5)
            </h3>

            {/* Selector de Ventaja */}
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg text-xs font-semibold text-center">
              {(['normal', 'ventaja', 'desventaja'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setTipoVentaja(v)}
                  className={`py-2 rounded capitalize min-h-[38px] transition-all ${
                    tipoVentaja === v ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Botones de Tirada Táctiles */}
            <div className="space-y-2">
              <button
                onClick={() => ejecutarTiradaD20('fuerza', 'Tirada de Ataque (FUE)')}
                className="w-full bg-red-950/60 hover:bg-red-900/80 border border-red-700/60 text-red-200 text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                ⚔️ Tirada de Ataque ({armaEquipada.nombre})
              </button>
              <button
                onClick={() => ejecutarTiradaD20('sabiduria', 'Prueba de Sabiduría (Percepción)')}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium py-2.5 rounded-lg min-h-[44px]"
              >
                👁️ Percepción / Sabiduría
              </button>
              <button
                onClick={() => ejecutarTiradaD20('constitucion', 'Tirada de Salvación (CON)')}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium py-2.5 rounded-lg min-h-[44px]"
              >
                🛡️ Salvación de Constitución
              </button>
            </div>

            {/* Resultado Visual de Tirada */}
            {ultimoResultadoD20 && (
              <div className="bg-slate-950 p-3 rounded-lg border border-amber-500/40 text-center animate-in zoom-in-95">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Resultado D20:</span>
                <div className="text-3xl font-black text-amber-400 my-1">
                  {ultimoResultadoD20.totalFinal}
                </div>
                <div className="text-xs text-slate-400">
                  Dado: [{ultimoResultadoD20.dadoElegido}] + Modificador: {ultimoResultadoD20.modificador}
                </div>
                {ultimoResultadoD20.esCritico20 && (
                  <span className="text-xs font-bold text-amber-400 block mt-1">
                    🔥 ¡CRÍTICO! Dados dobles de daño + Inspiración Heroica
                  </span>
                )}
              </div>
            )}
          </div>

          {/* BITÁCORA DE DECISIONES CANÓNICAS (LEDGER - MEMORIA INMORTAL DEL BOT DM) */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                Bitácora de Decisiones (Ledger)
              </h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-mono">
                {listaEventos.length} hechos
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Event Sourcing inmutable: el Bot DM inyecta estos hechos en cada turno, impidiendo que olvide pactos, decisiones morales o consecuencias.
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {listaEventos.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{ev.tituloCorto}</span>
                    <span className="text-[9px] text-slate-500">T{ev.turno}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-snug">{ev.resumenHecho}</p>
                  <div className="text-[10px] text-emerald-400 font-medium">
                    ⚡ {ev.consecuenciaActiva}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
