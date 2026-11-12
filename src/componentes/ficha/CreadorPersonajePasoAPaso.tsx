'use client';

import React, { useState } from 'react';
import { FichaPersonaje } from '@/esquemas/personaje';
import { TODAS_LAS_CLASES_55, DICCIONARIO_CLASES_55 } from '@/datos/clases';
import { TODAS_LAS_ESPECIES_55, DICCIONARIO_ESPECIES_55 } from '@/datos/especies';
import { TODOS_LOS_TRASFONDOS_55, DICCIONARIO_TRASFONDOS_55 } from '@/datos/trasfondos';
import { DOTES_ORIGEN_55 } from '@/datos/dotes/dotesOrigen';
import { CATALOGO_ARMAS_55 } from '@/datos/armas';
import { MAESTRIAS_ARMAS_55 } from '@/datos/maestrias';
import { calcularModificadorCaracteristica, calcularBonificadorCompetencia } from '@/motor/reglas/calculadorD20';
import { calcularClaseArmadura } from '@/motor/reglas/calculadorCA';
import { Shield, Sword, Heart, Sparkles, Award, CheckCircle2, Compass, Feather, Zap } from 'lucide-react';
import { DICCIONARIO_BUILDS_POR_CLASE } from '@/datos/builds';
import { BuildSugerida } from '@/esquemas/buildSugerida';

interface Props {
  onGuardarPersonaje: (pj: FichaPersonaje) => void;
  onCancelar?: () => void;
}

export function CreadorPersonajePasoAPaso({ onGuardarPersonaje, onCancelar }: Props) {
  const [paso, setPaso] = useState<number>(1);
  const [nombre, setNombre] = useState('Valen');
  const [jugador, setJugador] = useState('Aventurero');
  
  // Especie y Legado 2024
  const [especieId, setEspecieId] = useState('elfo');
  const [legadoId, setLegadoId] = useState('drow');
  
  // Trasfondo 2024
  const [trasfondoId, setTrasfondoId] = useState('soldado');
  
  // Clase y Subclase 2024
  const [claseId, setClaseId] = useState('guerrero');
  const [subclaseId, setSubclaseId] = useState('campeon');
  const [nivel, setNivel] = useState(3);
  
  // Puntuaciones de características base
  const [fuerza, setFuerza] = useState(16);
  const [destreza, setDestreza] = useState(14);
  const [constitucion, setConstitucion] = useState(14);
  const [inteligencia, setInteligencia] = useState(10);
  const [sabiduria, setSabiduria] = useState(12);
  const [carisma, setCarisma] = useState(10);

  // Armas y Dote de Origen
  const [armaPrincipal, setArmaPrincipal] = useState('espadon');
  const [doteOrigen, setDoteOrigen] = useState('atacanteSalvaje');

  // Objetos de datos actuales
  const especieActual = DICCIONARIO_ESPECIES_55[especieId] || TODAS_LAS_ESPECIES_55[0];
  const legadoActual = especieActual.legados?.find((l) => l.id === legadoId) || especieActual.legados?.[0];
  const trasfondoActual = DICCIONARIO_TRASFONDOS_55[trasfondoId] || TODOS_LOS_TRASFONDOS_55[0];
  const claseActual = DICCIONARIO_CLASES_55[claseId] || DICCIONARIO_CLASES_55.guerrero;

  // Cambiar especie y auto-ajustar su primer legado si tiene
  const handleCambiarEspecie = (id: string) => {
    setEspecieId(id);
    const esp = DICCIONARIO_ESPECIES_55[id];
    if (esp?.legados && esp.legados.length > 0) {
      setLegadoId(esp.legados[0].id);
    } else {
      setLegadoId('');
    }
  };

  // Cambiar trasfondo y sugerir su dote de origen oficial
  const handleCambiarTrasfondo = (id: string) => {
    setTrasfondoId(id);
    const tr = DICCIONARIO_TRASFONDOS_55[id];
    if (tr?.doteOrigenId && DOTES_ORIGEN_55[tr.doteOrigenId]) {
      setDoteOrigen(tr.doteOrigenId);
    }
  };

  // Aplicar Build Sugerida para la clase seleccionada
  const aplicarBuildSugerida = (b: BuildSugerida) => {
    setFuerza(b.puntuaciones.fuerza);
    setDestreza(b.puntuaciones.destreza);
    setConstitucion(b.puntuaciones.constitucion);
    setInteligencia(b.puntuaciones.inteligencia);
    setSabiduria(b.puntuaciones.sabiduria);
    setCarisma(b.puntuaciones.carisma);
    if (b.armasRecomendadas?.[0] && CATALOGO_ARMAS_55[b.armasRecomendadas[0]]) {
      setArmaPrincipal(b.armasRecomendadas[0]);
    }
    if (b.doteOrigenRecomendada && DOTES_ORIGEN_55[b.doteOrigenRecomendada]) {
      setDoteOrigen(b.doteOrigenRecomendada);
    }
    if (b.subclaseRecomendada && nivel >= 3) {
      setSubclaseId(b.subclaseRecomendada);
    }
  };

  // Aplicar matriz estándar clásica (15, 14, 13, 12, 10, 8)
  const aplicarMatrizEstandar = () => {
    setFuerza(15);
    setDestreza(14);
    setConstitucion(13);
    setInteligencia(10);
    setSabiduria(12);
    setCarisma(8);
  };

  // Cálculos automáticos 2024
  const modCon = calcularModificadorCaracteristica(constitucion);
  const modDes = calcularModificadorCaracteristica(destreza);
  const dadoGolpeNum = parseInt(claseActual.dadoGolpe.replace('d', ''));
  
  // Resiliencia enana (+1 PG por nivel si es enano)
  const bonifPGEnano = especieId === 'enano' ? nivel : 0;
  // Dote duro (+2 PG por nivel si tiene dote duro)
  const bonifPGDuro = doteOrigen === 'duro' ? nivel * 2 : 0;
  const pgMax = dadoGolpeNum + modCon + (nivel - 1) * (Math.floor(dadoGolpeNum / 2) + 1 + modCon) + bonifPGEnano + bonifPGDuro;
  
  const caCalculada = calcularClaseArmadura({
    destrezaMod: modDes,
    tipoArmadura: 'media',
    caBaseArmadura: 14,
    tieneEscudo: false,
  });

  // Velocidad según especie y legado
  let velocidadFinal = especieActual.velocidadPies;
  if (especieId === 'elfo' && legadoId === 'elfo_bosques') {
    velocidadFinal = 35;
  }

  // Visión en la oscuridad
  let visionFinal = especieActual.visionEnOscuridadPies;
  if (especieId === 'elfo' && legadoId === 'drow') {
    visionFinal = 120;
  }

  const finalizarCreacion = () => {
    const nuevoPj: FichaPersonaje = {
      id: `pj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      nombre,
      jugadorNombre: jugador,
      especie: especieActual.nombre,
      legadoEspecie: legadoActual ? legadoActual.nombre : undefined,
      trasfondo: trasfondoActual.nombre,
      claseId,
      subclaseId: nivel >= 3 ? subclaseId : undefined,
      nivel,
      alineamiento: 'Neutral Bueno',
      caracteristicas: {
        fuerza,
        destreza,
        constitucion,
        inteligencia,
        sabiduria,
        carisma,
      },
      puntosGolpeMaximos: Math.max(1, pgMax),
      puntosGolpeActuales: Math.max(1, pgMax),
      puntosGolpeTemporales: 0,
      claseArmadura: caCalculada,
      velocidadPies: velocidadFinal,
      iniciativaMod: modDes + (doteOrigen === 'alerta' ? calcularBonificadorCompetencia(nivel) : 0),
      inspiracionHeroica: true,
      dadosGolpeDisponibles: nivel,
      dadosGolpeTotales: nivel,
      tipoDadoGolpe: claseActual.dadoGolpe,
      salvacionesMuerte: { exitos: 0, fallos: 0 },
      salvacionesCompetentes: claseActual.salvacionesCompetentes,
      habilidadesCompetentes: Array.from(new Set([
        ...trasfondoActual.habilidadesCompetentes,
        'atletismo',
        'percepcion',
      ])) as any,
      habilidadesExpertas: [],
      armasCompetentes: claseActual.competenciasIniciales.armas,
      armadurasCompetentes: claseActual.competenciasIniciales.armaduras,
      herramientasCompetentes: trasfondoActual.herramientasCompetentes,
      idiomas: ['Común'],
      maestriasArmasDesbloqueadas: [CATALOGO_ARMAS_55[armaPrincipal]?.maestriaPorDefecto || 'roce'],
      armasEquipadas: [armaPrincipal],
      armaduraEquipada: 'Cota de malla',
      escudoEquipado: false,
      monedas: { cobre: 0, plata: 0, electro: 0, oro: trasfondoActual.oroInicial || 25, platino: 0 },
      inventarioObjetos: [
        ...trasfondoActual.equipoSugerido,
        'Mochila de aventurero',
        'Raciones de viaje (5)',
      ],
      espaciosConjuroMaximos: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      espaciosConjuroGastados: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      conjurosPreparados: [],
      trucosConocidos: legadoActual?.trucosOConjuros || [],
      condicionesActivas: [],
      nivelAgotamiento: 0,
      dotesIds: [doteOrigen],
      rasgosEspeciales: [
        ...especieActual.rasgosBase.map((r) => r.nombre),
        ...(legadoActual ? legadoActual.rasgos.map((r) => r.nombre) : []),
        ...claseActual.progresion
          .filter((p) => p.nivel <= nivel)
          .flatMap((p) => p.rasgos),
      ],
    };

    onGuardarPersonaje(nuevoPj);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-5xl mx-auto shadow-2xl">
      {/* Encabezado y Progreso */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            Creador de Personajes D&D 5.5 (Revisión Oficial 2024)
          </h2>
          <p className="text-slate-400 text-sm">
            10 especies oficiales con sus legados, 16 trasfondos oficiales, 12 clases, 48 subclases y maestrías de armas.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          {[
            { num: 1, label: 'Origen & Clase' },
            { num: 2, label: 'Características' },
            { num: 3, label: 'Equipo & Dotes' },
            { num: 4, label: 'Finalizar' },
          ].map((item) => (
            <span
              key={item.num}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                paso === item.num
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : paso > item.num
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {paso > item.num ? '✓' : item.num}
              <span className="hidden sm:inline">{item.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* PASO 1: Identidad, Especie con Legados, Trasfondos y Clase */}
      {paso === 1 && (
        <div className="space-y-6">
          {/* Nombres y Nivel */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nombre del Personaje</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nombre del Jugador</label>
              <input
                type="text"
                value={jugador}
                onChange={(e) => setJugador(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nivel Inicial (1-20)</label>
              <input
                type="number"
                min={1}
                max={20}
                value={nivel}
                onChange={(e) => setNivel(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-bold"
              />
            </div>
          </div>

          {/* SELECCIÓN DE ESPECIE 2024 */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4" /> 1. Especie Oficial 2024 (10 Especies Oficiales)
              </label>
              <span className="text-xs text-slate-400">
                Velocidad: {especieActual.velocidadPies} pies • Tamaño: {especieActual.tamano} • Visión Oscuridad: {especieActual.visionEnOscuridadPies} pies
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
              {TODAS_LAS_ESPECIES_55.map((esp) => (
                <button
                  key={esp.id}
                  type="button"
                  onClick={() => handleCambiarEspecie(esp.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    especieId === esp.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm">{esp.nombre}</div>
                  <div className="text-[10px] text-slate-400">
                    {esp.legados.length > 0 ? `${esp.legados.length} legados` : 'Rasgos versátiles'}
                  </div>
                </button>
              ))}
            </div>

            {/* SELECTOR DE LEGADOS DE LA ESPECIE (Si la especie tiene legados) */}
            {especieActual.legados && especieActual.legados.length > 0 && (
              <div className="bg-slate-900/90 p-4 rounded-lg border border-amber-500/40 mt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                    <Feather className="w-4 h-4" /> Legado / Linaje de {especieActual.nombre}
                  </span>
                  <span className="text-xs text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Elige tu linaje
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {especieActual.legados.map((leg) => (
                    <button
                      key={leg.id}
                      type="button"
                      onClick={() => setLegadoId(leg.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        legadoId === leg.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-500/50'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-100">{leg.nombre}</div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{leg.descripcion}</p>
                      {leg.resistenciaDanio && (
                        <div className="mt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Resistencia: {leg.resistenciaDanio.join(', ')}
                        </div>
                      )}
                      {leg.trucosOConjuros && (
                        <div className="mt-1 text-[11px] text-sky-400 font-mono">
                          ✨ {leg.trucosOConjuros.join(' • ')}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SELECCIÓN DE TRASFONDO 2024 */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> 2. Trasfondo Oficial 2024 (16 Trasfondos Oficiales)
              </label>
              <span className="text-xs text-slate-400">
                Otorga Dote de Origen + Puntuaciones (+2/+1) + Competencias
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 max-h-56 overflow-y-auto pr-1">
              {TODOS_LOS_TRASFONDOS_55.map((tr) => (
                <button
                  key={tr.id}
                  type="button"
                  onClick={() => handleCambiarTrasfondo(tr.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    trasfondoId === tr.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-sm">{tr.nombre}</div>
                  <div className="text-[10px] text-amber-400/90 font-mono capitalize">
                    {tr.caracteristicasOpciones.join(' / ')}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    Dote: {DOTES_ORIGEN_55[tr.doteOrigenId]?.nombre.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>

            {/* Detalle del Trasfondo Seleccionado */}
            <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-200 text-sm block">{trasfondoActual.nombre} ({trasfondoActual.nombreOriginal})</span>
                <p className="text-slate-400 text-xs mt-0.5">{trasfondoActual.descripcion}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Dote de Origen</span>
                  <span className="text-amber-400 font-bold">{DOTES_ORIGEN_55[trasfondoActual.doteOrigenId]?.nombre}</span>
                </div>
                <div className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Habilidades</span>
                  <span className="text-slate-200 font-semibold capitalize">{trasfondoActual.habilidadesCompetentes.join(', ')}</span>
                </div>
                <div className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Oro Inicial</span>
                  <span className="text-amber-300 font-bold">{trasfondoActual.oroInicial} po</span>
                </div>
              </div>
            </div>
          </div>

          {/* SELECCIÓN DE CLASE Y SUBCLASE */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            <label className="block text-sm font-semibold text-amber-300 mb-3 flex items-center gap-1.5">
              <Sword className="w-4 h-4" /> 3. Selecciona una de las 12 Clases Oficiales 2024
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {TODAS_LAS_CLASES_55.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setClaseId(c.id);
                    setSubclaseId(c.subclases[0].id);
                  }}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    claseId === c.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm">{c.nombre}</div>
                  <div className="text-xs text-slate-400">{c.dadoGolpe} • {c.tipoMagia}</div>
                </button>
              ))}
            </div>

            {/* Subclases si nivel >= 3 */}
            {nivel >= 3 && (
              <div className="bg-slate-900/90 p-4 rounded-lg border border-amber-500/30 mt-4">
                <label className="block text-sm font-semibold text-amber-400 mb-2">
                  Subclase 2024 de {claseActual.nombre} (Desbloqueada a Nivel {nivel})
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {claseActual.subclases.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSubclaseId(sub.id)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        subclaseId === sub.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold text-slate-100 text-sm">{sub.nombre}</div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-2">{sub.descripcion}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setPaso(2)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg transition-colors shadow"
            >
              Siguiente: Puntuaciones de Característica →
            </button>
          </div>
        </div>
      )}

      {/* PASO 2: Puntuaciones de Característica */}
      {paso === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-200">Asignar Puntuaciones de Característica</h3>
            <p className="text-sm text-slate-400 mt-1">
              En D&D 2024, tu trasfondo ({trasfondoActual.nombre}) sugiere mejoras a sus 3 atributos principales:
              <span className="text-amber-400 font-bold capitalize"> {trasfondoActual.caracteristicasOpciones.join(', ')}</span>.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { clave: 'fuerza', label: 'Fuerza (FUE)', val: fuerza, set: setFuerza },
              { clave: 'destreza', label: 'Destreza (DES)', val: destreza, set: setDestreza },
              { clave: 'constitucion', label: 'Constitución (CON)', val: constitucion, set: setConstitucion },
              { clave: 'inteligencia', label: 'Inteligencia (INT)', val: inteligencia, set: setInteligencia },
              { clave: 'sabiduria', label: 'Sabiduría (SAB)', val: sabiduria, set: setSabiduria },
              { clave: 'carisma', label: 'Carisma (CAR)', val: carisma, set: setCarisma },
            ].map((item) => {
              const mod = calcularModificadorCaracteristica(item.val);
              const esOpcionTrasfondo = trasfondoActual.caracteristicasOpciones.includes(item.clave as any);
              return (
                <div
                  key={item.label}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    esOpcionTrasfondo
                      ? 'bg-slate-950 border-amber-500/40 shadow-sm'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1 font-semibold">
                    <span>{item.label}</span>
                    {esOpcionTrasfondo && (
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">
                        Trasfondo
                      </span>
                    )}
                  </div>
                  <div className="text-3xl font-bold text-amber-400 my-1">
                    {mod >= 0 ? `+${mod}` : mod}
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={item.val}
                    onChange={(e) => item.set(parseInt(e.target.value) || 10)}
                    className="w-20 text-center bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-100 font-bold"
                  />
                </div>
              );
            })}
          </div>

          {/* PRESETS RÁPIDOS Y BUILDS SUGERIDAS */}
          <div className="bg-slate-950/80 p-4 rounded-xl border border-amber-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Builds Sugeridas para {claseActual.nombre} (PHB 2024)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Distribuciones oficiales optimizadas con trasfondos, armas y dotes recomendadas.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={aplicarMatrizEstandar}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
                >
                  Matriz Estándar (15, 14, 13...)
                </button>
              </div>
            </div>

            {/* Tarjetas de builds sugeridas para esta clase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(DICCIONARIO_BUILDS_POR_CLASE[claseId] || []).map((build) => {
                const esCoincidente =
                  fuerza === build.puntuaciones.fuerza &&
                  destreza === build.puntuaciones.destreza &&
                  constitucion === build.puntuaciones.constitucion &&
                  inteligencia === build.puntuaciones.inteligencia &&
                  sabiduria === build.puntuaciones.sabiduria &&
                  carisma === build.puntuaciones.carisma;

                return (
                  <div
                    key={build.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                      esCoincidente
                        ? 'bg-amber-950/20 border-amber-500 shadow-md ring-1 ring-amber-500/40'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-100 text-sm">{build.nombre}</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono font-semibold uppercase">
                          {build.enfoque}
                        </span>
                      </div>
                      <span className="text-xs text-amber-300/80 font-mono block mt-0.5">{build.subtitulo}</span>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{build.descripcion}</p>

                      {/* Mini Matriz */}
                      <div className="grid grid-cols-6 gap-1 mt-2.5 text-center">
                        {[
                          { k: 'FUE', v: build.puntuaciones.fuerza },
                          { k: 'DES', v: build.puntuaciones.destreza },
                          { k: 'CON', v: build.puntuaciones.constitucion },
                          { k: 'INT', v: build.puntuaciones.inteligencia },
                          { k: 'SAB', v: build.puntuaciones.sabiduria },
                          { k: 'CAR', v: build.puntuaciones.carisma },
                        ].map((stat) => (
                          <div key={stat.k} className="bg-slate-950 p-1 rounded border border-slate-800">
                            <span className="text-[9px] text-slate-500 block font-bold">{stat.k}</span>
                            <span className="font-bold text-amber-400 text-xs">{stat.v}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 text-[11px] text-slate-400 space-y-0.5 border-t border-slate-800/80 pt-2">
                        <div><span className="text-slate-500 font-semibold">Rol:</span> {build.rolRecomendado}</div>
                        <div><span className="text-slate-500 font-semibold">Dote:</span> {DOTES_ORIGEN_55[build.doteOrigenRecomendada]?.nombre || build.doteOrigenRecomendada}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => aplicarBuildSugerida(build)}
                      className={`w-full mt-3 font-bold py-1.5 px-3 rounded text-xs transition-all flex items-center justify-center gap-1.5 ${
                        esCoincidente
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 hover:border-amber-500'
                      }`}
                    >
                      {esCoincidente ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          ¡Build Aplicada Activa!
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5" />
                          Aplicar Puntuaciones ({build.nombre})
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setPaso(1)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2 rounded-lg"
            >
              ← Volver
            </button>
            <button
              onClick={() => setPaso(3)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2 rounded-lg"
            >
              Siguiente: Armas y Maestrías →
            </button>
          </div>
        </div>
      )}

      {/* PASO 3: Armas, Maestrías y Dotes */}
      {paso === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-1">Arma Principal y Propiedad de Maestría</h3>
            <p className="text-xs text-slate-400 mb-3">
              Las maestrías 2024 desbloquean efectos tácticos en combate al impactar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.values(CATALOGO_ARMAS_55).slice(0, 9).map((arma) => {
                const infoMaestria = MAESTRIAS_ARMAS_55[arma.maestriaPorDefecto];
                return (
                  <button
                    key={arma.id}
                    type="button"
                    onClick={() => setArmaPrincipal(arma.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      armaPrincipal === arma.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-sm">{arma.nombre}</div>
                    <div className="text-xs text-slate-400">{arma.dadoDano} {arma.tipoDano}</div>
                    <div className="mt-2 text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Sword className="w-3 h-3" />
                      Maestría: {infoMaestria?.nombre} ({infoMaestria?.nombreOriginal})
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-slate-200">Dote de Origen Obligatoria (Nivel 1)</h3>
              <span className="text-xs text-amber-400 font-semibold">
                Sugerida por tu trasfondo: {DOTES_ORIGEN_55[trasfondoActual.doteOrigenId]?.nombre}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
              {Object.values(DOTES_ORIGEN_55).map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDoteOrigen(d.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    doteOrigen === d.id
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold text-sm">{d.nombre}</div>
                  <div className="text-xs text-slate-400 mt-1">{d.descripcion}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setPaso(2)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2 rounded-lg"
            >
              ← Volver
            </button>
            <button
              onClick={() => setPaso(4)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2 rounded-lg"
            >
              Siguiente: Resumen y Finalizar →
            </button>
          </div>
        </div>
      )}

      {/* PASO 4: Resumen y Confirmación */}
      {paso === 4 && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-amber-400">{nombre}</h3>
                <p className="text-slate-300 text-sm mt-0.5">
                  <span className="font-bold text-amber-300">{especieActual.nombre}</span>
                  {legadoActual ? ` (${legadoActual.nombre})` : ''} •{' '}
                  <span className="font-semibold text-slate-200">Trasfondo {trasfondoActual.nombre}</span> •{' '}
                  <span className="font-bold text-sky-400">{claseActual.nombre}</span> {nivel >= 3 ? `[${subclaseId}]` : ''} (Nivel {nivel})
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-red-950/60 border border-red-800 px-3 py-1.5 rounded-lg text-center">
                  <div className="text-xs text-red-300 font-semibold flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> PG Máx
                  </div>
                  <div className="text-lg font-bold text-red-200">{pgMax}</div>
                </div>
                <div className="bg-blue-950/60 border border-blue-800 px-3 py-1.5 rounded-lg text-center">
                  <div className="text-xs text-blue-300 font-semibold flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> CA
                  </div>
                  <div className="text-lg font-bold text-blue-200">{caCalculada}</div>
                </div>
                <div className="bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg text-center">
                  <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Vel.
                  </div>
                  <div className="text-lg font-bold text-emerald-200">{velocidadFinal} ft</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-xs">Visión en Oscuridad:</span>
                <p className="font-semibold text-slate-200">{visionFinal > 0 ? `${visionFinal} pies` : 'No tiene'}</p>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-xs">Arma & Maestría:</span>
                <p className="font-semibold text-slate-200">{CATALOGO_ARMAS_55[armaPrincipal]?.nombre}</p>
                <p className="text-xs text-amber-400 font-bold capitalize">{CATALOGO_ARMAS_55[armaPrincipal]?.maestriaPorDefecto}</p>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-xs">Dote de Origen:</span>
                <p className="font-semibold text-slate-200">{DOTES_ORIGEN_55[doteOrigen]?.nombre}</p>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-xs">Inspiración Heroica:</span>
                <p className="font-semibold text-amber-300">ACTIVA ✓</p>
              </div>
            </div>

            {/* Rasgos de Especie y Legado en el resumen */}
            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
              <span className="font-bold text-amber-400 block text-xs uppercase tracking-wider">
                Rasgos de {especieActual.nombre} {legadoActual ? `• ${legadoActual.nombre}` : ''}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {especieActual.rasgosBase.map((r) => (
                  <span key={r.nombre} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-slate-700">
                    {r.nombre}
                  </span>
                ))}
                {legadoActual?.rasgos.map((r) => (
                  <span key={r.nombre} className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-semibold">
                    ⭐ {r.nombre}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setPaso(3)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2 rounded-lg"
            >
              ← Volver
            </button>
            <button
              onClick={finalizarCreacion}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 py-2.5 rounded-lg text-lg flex items-center gap-2 shadow-lg shadow-emerald-950/50"
            >
              <CheckCircle2 className="w-5 h-5" />
              ¡Guardar Personaje y Comenzar Aventura!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
