'use client';

import React, { useState } from 'react';
import { FichaPersonaje } from '@/esquemas/personaje';
import { TODAS_LAS_CLASES_55, DICCIONARIO_CLASES_55 } from '@/datos/clases';
import { DOTES_ORIGEN_55 } from '@/datos/dotes/dotesOrigen';
import { CATALOGO_ARMAS_55 } from '@/datos/armas';
import { MAESTRIAS_ARMAS_55 } from '@/datos/maestrias';
import { calcularModificadorCaracteristica, calcularBonificadorCompetencia } from '@/motor/reglas/calculadorD20';
import { calcularClaseArmadura } from '@/motor/reglas/calculadorCA';
import { Shield, Sword, Heart, Sparkles, Wand2, Award, CheckCircle2 } from 'lucide-react';

interface Props {
  onGuardarPersonaje: (pj: FichaPersonaje) => void;
  onCancelar?: () => void;
}

export function CreadorPersonajePasoAPaso({ onGuardarPersonaje, onCancelar }: Props) {
  const [paso, setPaso] = useState<number>(1);
  const [nombre, setNombre] = useState('Valen');
  const [jugador, setJugador] = useState('Aventurero');
  const [especie, setEspecie] = useState('Humano');
  const [trasfondo, setTrasfondo] = useState('Soldado');
  const [claseId, setClaseId] = useState('guerrero');
  const [subclaseId, setSubclaseId] = useState('campeon');
  const [nivel, setNivel] = useState(3);
  
  // Características base
  const [fuerza, setFuerza] = useState(16);
  const [destreza, setDestreza] = useState(14);
  const [constitucion, setConstitucion] = useState(15);
  const [inteligencia, setInteligencia] = useState(10);
  const [sabiduria, setSabiduria] = useState(12);
  const [carisma, setCarisma] = useState(8);

  // Armas y Maestrías
  const [armaPrincipal, setArmaPrincipal] = useState('espadon');
  const [doteOrigen, setDoteOrigen] = useState('alerta');

  const claseActual = DICCIONARIO_CLASES_55[claseId] || DICCIONARIO_CLASES_55.guerrero;

  // Cálculos automáticos 2024
  const modCon = calcularModificadorCaracteristica(constitucion);
  const modDes = calcularModificadorCaracteristica(destreza);
  const dadoGolpeNum = parseInt(claseActual.dadoGolpe.replace('d', ''));
  const pgMax = dadoGolpeNum + modCon + (nivel - 1) * (Math.floor(dadoGolpeNum / 2) + 1 + modCon);
  
  const caCalculada = calcularClaseArmadura({
    destrezaMod: modDes,
    tipoArmadura: 'media',
    caBaseArmadura: 14,
    tieneEscudo: false,
  });

  const finalizarCreacion = () => {
    const nuevoPj: FichaPersonaje = {
      id: `pj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      nombre,
      jugadorNombre: jugador,
      especie,
      trasfondo,
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
      velocidadPies: 30,
      iniciativaMod: modDes + (doteOrigen === 'alerta' ? calcularBonificadorCompetencia(nivel) : 0),
      inspiracionHeroica: true,
      dadosGolpeDisponibles: nivel,
      dadosGolpeTotales: nivel,
      tipoDadoGolpe: claseActual.dadoGolpe,
      salvacionesMuerte: { exitos: 0, fallos: 0 },
      salvacionesCompetentes: claseActual.salvacionesCompetentes,
      habilidadesCompetentes: ['atletismo', 'intimidacion'],
      habilidadesExpertas: [],
      armasCompetentes: claseActual.competenciasIniciales.armas,
      armadurasCompetentes: claseActual.competenciasIniciales.armaduras,
      herramientasCompetentes: [],
      idiomas: ['Común'],
      maestriasArmasDesbloqueadas: [CATALOGO_ARMAS_55[armaPrincipal]?.maestriaPorDefecto || 'roce'],
      armasEquipadas: [armaPrincipal],
      armaduraEquipada: 'Cota de malla',
      escudoEquipado: false,
      monedas: { cobre: 0, plata: 0, electro: 0, oro: 25, platino: 0 },
      inventarioObjetos: ['Mochila de aventurero', 'Raciones de viaje', 'Antorchas (5)', 'Cuerda de cáñamo'],
      espaciosConjuroMaximos: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      espaciosConjuroGastados: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      conjurosPreparados: [],
      trucosConocidos: [],
      condicionesActivas: [],
      nivelAgotamiento: 0,
      dotesIds: [doteOrigen],
      rasgosEspeciales: claseActual.progresion
        .filter((p) => p.nivel <= nivel)
        .flatMap((p) => p.rasgos),
    };

    onGuardarPersonaje(nuevoPj);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-4xl mx-auto shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            Creador de Personaje D&D 5.5 (Revisión 2024)
          </h2>
          <p className="text-slate-400 text-sm">
            Diseña tu aventurero con las 12 clases oficiales, 48 subclases, maestrías de armas y dotes de origen.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold">
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                paso === n
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : paso > n
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {paso > n ? '✓' : n}
            </span>
          ))}
        </div>
      </div>

      {/* PASO 1: Identidad y Clase */}
      {paso === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Especie 2024 (Sin ASI)</label>
              <select
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
              >
                <option value="Humano">Humano (Inspiración + Dote Origen)</option>
                <option value="Elfo">Elfo (Trance + Visión Oscuridad 60)</option>
                <option value="Enano">Enano (Sentido de la Piedra + Temple)</option>
                <option value="Mediano">Mediano (Afortunado + Valiente)</option>
                <option value="Goliat">Goliat (Nuevo PHB: Linaje Gigante)</option>
                <option value="Orco">Orco (Nuevo PHB: Embestida + Resistencia)</option>
                <option value="Aasimar">Aasimar (Nuevo PHB: Alas Radiantes)</option>
                <option value="Tiefling">Tiefling (Legado Abisal/Infernal)</option>
                <option value="Dracónido">Dracónido (Aliento Elemental 2024)</option>
                <option value="Gnomo">Gnomo (Astucia Gnoma)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Trasfondo 2024 (+2/+1 ASI)</label>
              <select
                value={trasfondo}
                onChange={(e) => setTrasfondo(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
              >
                <option value="Soldado">Soldado (FUE/CON - Dote Salvaje)</option>
                <option value="Acólito">Acólito (SAB/CAR - Dote Mágico)</option>
                <option value="Erudito">Erudito (INT/SAB - Dote Experto)</option>
                <option value="Criminal">Criminal (DES/CON - Dote Alerta)</option>
                <option value="Animador">Animador (CAR/DES - Dote Músico)</option>
                <option value="Guía">Guía (SAB/DES - Dote Curandero)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Nivel Inicial</label>
              <input
                type="number"
                min={1}
                max={20}
                value={nivel}
                onChange={(e) => setNivel(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Selecciona una de las 12 Clases Oficiales 2024
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
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
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-semibold">{c.nombre}</div>
                  <div className="text-xs text-slate-500">{c.dadoGolpe} | {c.tipoMagia}</div>
                </button>
              ))}
            </div>
          </div>

          {nivel >= 3 && (
            <div className="bg-slate-950 p-4 rounded-lg border border-amber-500/30">
              <label className="block text-sm font-semibold text-amber-400 mb-2">
                Subclase 2024 de {claseActual.nombre} (Desbloqueada a Nivel 3)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {claseActual.subclases.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSubclaseId(sub.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      subclaseId === sub.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold text-slate-100">{sub.nombre}</div>
                    <div className="text-xs text-slate-400 mt-1 line-clamp-2">{sub.descripcion}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setPaso(2)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2 rounded-lg transition-colors"
            >
              Siguiente: Puntuaciones de Característica →
            </button>
          </div>
        </div>
      )}

      {/* PASO 2: Puntuaciones de Característica */}
      {paso === 2 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-slate-200">Asignar Puntuaciones de Característica</h3>
          <p className="text-sm text-slate-400">
            Los modificadores se calculan automáticamente con la fórmula estándar: Math.floor((puntuación - 10) / 2).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Fuerza (FUE)', val: fuerza, set: setFuerza },
              { label: 'Destreza (DES)', val: destreza, set: setDestreza },
              { label: 'Constitución (CON)', val: constitucion, set: setConstitucion },
              { label: 'Inteligencia (INT)', val: inteligencia, set: setInteligencia },
              { label: 'Sabiduría (SAB)', val: sabiduria, set: setSabiduria },
              { label: 'Carisma (CAR)', val: carisma, set: setCarisma },
            ].map((item) => {
              const mod = calcularModificadorCaracteristica(item.val);
              return (
                <div key={item.label} className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 mb-1 font-semibold">{item.label}</div>
                  <div className="text-2xl font-bold text-amber-400 mb-2">
                    {mod >= 0 ? `+${mod}` : mod}
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={item.val}
                    onChange={(e) => item.set(parseInt(e.target.value) || 10)}
                    className="w-20 text-center bg-slate-900 border border-slate-700 rounded px-2 py-1 text-slate-100 font-bold"
                  />
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setPaso(1)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg"
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
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Arma Principal y Maestría Asociada</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.values(CATALOGO_ARMAS_55).slice(0, 6).map((arma) => {
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
                    <div className="font-semibold">{arma.nombre}</div>
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
            <h3 className="text-lg font-semibold text-slate-200 mb-2">Dote de Origen Obligatoria (Nivel 1)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(DOTES_ORIGEN_55).slice(0, 6).map((d) => (
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
                  <div className="font-semibold">{d.nombre}</div>
                  <div className="text-xs text-slate-400 mt-1">{d.descripcion}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setPaso(2)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg"
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
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-amber-400">{nombre}</h3>
                <p className="text-slate-400 text-sm">
                  {especie} {claseActual.nombre} {nivel >= 3 ? `(${subclaseId})` : ''} - Nivel {nivel}
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
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-xs">Arma:</span>
                <p className="font-semibold text-slate-200">{CATALOGO_ARMAS_55[armaPrincipal]?.nombre}</p>
                <p className="text-xs text-amber-400 font-bold">Maestría: {CATALOGO_ARMAS_55[armaPrincipal]?.maestriaPorDefecto}</p>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-xs">Dote de Origen:</span>
                <p className="font-semibold text-slate-200">{DOTES_ORIGEN_55[doteOrigen]?.nombre}</p>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-xs">Competencia:</span>
                <p className="font-semibold text-slate-200">+{calcularBonificadorCompetencia(nivel)}</p>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="text-slate-400 text-xs">Inspiración Heroica:</span>
                <p className="font-semibold text-amber-300">ACTIVA ✓</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setPaso(3)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg"
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
