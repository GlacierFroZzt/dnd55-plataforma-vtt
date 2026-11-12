'use client';

import React, { useState } from 'react';
import { TODAS_LAS_CLASES_55 } from '@/datos/clases';
import { TODAS_LAS_ESPECIES_55 } from '@/datos/especies';
import { TODOS_LOS_TRASFONDOS_55 } from '@/datos/trasfondos';
import { MAESTRIAS_ARMAS_55 } from '@/datos/maestrias';
import { CONDICIONES_55 } from '@/datos/condiciones';
import { ACCIONES_COMBATE_55 } from '@/datos/acciones';
import { TODAS_LAS_DOTES_55, DOTES_ORIGEN_55 } from '@/datos/dotes';
import { BookOpen, Shield, Sword, Sparkles, Award, Compass, Feather, Flame, Coins, Wrench, Zap } from 'lucide-react';
import { DICCIONARIO_BUILDS_POR_CLASE } from '@/datos/builds';

export function VisorCompendio() {
  const [pestana, setPestana] = useState<'clases' | 'especies' | 'trasfondos' | 'maestrias' | 'condiciones' | 'acciones' | 'dotes'>('clases');
  const [claseSeleccionadaId, setClaseSeleccionadaId] = useState('barbaro');
  const [especieSeleccionadaId, setEspecieSeleccionadaId] = useState('elfo');

  const claseActual = TODAS_LAS_CLASES_55.find((c) => c.id === claseSeleccionadaId) || TODAS_LAS_CLASES_55[0];
  const especieActual = TODAS_LAS_ESPECIES_55.find((e) => e.id === especieSeleccionadaId) || TODAS_LAS_ESPECIES_55[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl max-w-6xl mx-auto">
      {/* Selector de Pestañas */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            Compendio Oficial D&D 5.5 (Revisión 2024)
          </h2>
          <p className="text-sm text-slate-400">
            10 Especies con Legados, 16 Trasfondos Oficiales, 12 Clases, 48 Subclases, Maestrías y Dotes.
          </p>
        </div>

        <div className="flex flex-wrap gap-1 bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-xs font-semibold">
          {[
            { id: 'clases', label: '12 Clases & 48 Subclases' },
            { id: 'especies', label: '10 Especies & Legados' },
            { id: 'trasfondos', label: '16 Trasfondos Oficiales' },
            { id: 'maestrias', label: '8 Maestrías de Armas' },
            { id: 'condiciones', label: '15 Condiciones' },
            { id: 'acciones', label: '12 Acciones' },
            { id: 'dotes', label: 'Catálogo de Dotes' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPestana(tab.id as any)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                pestana === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* PESTAÑA 1: Clases y Subclases */}
      {pestana === 'clases' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-4 space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {TODAS_LAS_CLASES_55.map((c) => (
              <button
                key={c.id}
                onClick={() => setClaseSeleccionadaId(c.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                  claseSeleccionadaId === c.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="font-bold block">{c.nombre}</span>
                  <span className="text-xs text-slate-500">{c.nombreOriginal}</span>
                </div>
                <div className="text-right text-xs">
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono font-bold block">
                    {c.dadoGolpe}
                  </span>
                  <span className="text-[10px] text-slate-400">4 subclases</span>
                </div>
              </button>
            ))}
          </div>

          <div className="md:col-span-8 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-100">{claseActual.nombre}</h3>
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full font-semibold">
                  Dado de Golpe: {claseActual.dadoGolpe}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-2">{claseActual.descripcion}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Primarias</span>
                  <span className="font-semibold text-slate-200 capitalize">
                    {claseActual.caracteristicasPrimarias.join(', ')}
                  </span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Salvaciones</span>
                  <span className="font-semibold text-slate-200 capitalize">
                    {claseActual.salvacionesCompetentes.join(', ')}
                  </span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Magia</span>
                  <span className="font-semibold text-slate-200 capitalize">{claseActual.tipoMagia}</span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Maestrías</span>
                  <span className="font-semibold text-amber-400 font-mono">
                    {claseActual.maestriaArmasInicial ? `${claseActual.maestriaArmasInicial} armas` : 'No'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> 4 Subclases Oficiales 2024 de {claseActual.nombre}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {claseActual.subclases.map((sub) => (
                  <div key={sub.id} className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100 text-sm">{sub.nombre}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Nivel 3</span>
                    </div>
                    <p className="text-xs text-slate-400">{sub.descripcion}</p>
                    <div className="pt-1.5 border-t border-slate-800/80">
                      <span className="text-[10px] text-amber-400/90 font-semibold block mb-1">Rasgos Desbloqueados:</span>
                      <div className="flex flex-wrap gap-1">
                        {sub.rasgos.map((r) => (
                          <span key={r.nombre} className="text-[10px] bg-slate-950 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800">
                            {r.nombre} (Nvl {r.nivel})
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BUILDS SUGERIDAS PARA LA CLASE */}
            <div>
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Builds Sugeridas Oficiales 2024 para {claseActual.nombre}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(DICCIONARIO_BUILDS_POR_CLASE[claseActual.id] || []).map((b) => (
                  <div key={b.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100 text-sm">{b.nombre}</span>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-semibold uppercase">
                        {b.enfoque}
                      </span>
                    </div>
                    <span className="text-xs text-amber-300/80 font-mono block">{b.subtitulo}</span>
                    <p className="text-xs text-slate-400">{b.descripcion}</p>

                    {/* Matriz de puntuaciones */}
                    <div className="grid grid-cols-6 gap-1 text-center">
                      {[
                        { k: 'FUE', v: b.puntuaciones.fuerza },
                        { k: 'DES', v: b.puntuaciones.destreza },
                        { k: 'CON', v: b.puntuaciones.constitucion },
                        { k: 'INT', v: b.puntuaciones.inteligencia },
                        { k: 'SAB', v: b.puntuaciones.sabiduria },
                        { k: 'CAR', v: b.puntuaciones.carisma },
                      ].map((s) => (
                        <div key={s.k} className="bg-slate-950 p-1.5 rounded border border-slate-800">
                          <span className="text-[9px] text-slate-500 block font-bold">{s.k}</span>
                          <span className="font-bold text-amber-400 text-xs">{s.v}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] space-y-1 pt-1.5 border-t border-slate-800/80 text-slate-300">
                      <div><strong className="text-slate-400">Rol:</strong> {b.rolRecomendado}</div>
                      <div><strong className="text-slate-400">Dote sugerida:</strong> {DOTES_ORIGEN_55[b.doteOrigenRecomendada]?.nombre || b.doteOrigenRecomendada}</div>
                      <div><strong className="text-slate-400">Armas:</strong> {b.armasRecomendadas.join(', ')}</div>
                      <div className="text-[10px] text-slate-400 italic mt-1 bg-slate-950/60 p-2 rounded border border-slate-800/60">
                        💡 {b.consejosTacticos[0]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 2: 10 Especies y Legados */}
      {pestana === 'especies' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Lista de las 10 especies */}
          <div className="md:col-span-4 space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {TODAS_LAS_ESPECIES_55.map((esp) => (
              <button
                key={esp.id}
                onClick={() => setEspecieSeleccionadaId(esp.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                  especieSeleccionadaId === esp.id
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <span className="font-bold block">{esp.nombre}</span>
                  <span className="text-xs text-slate-500">{esp.nombreOriginal}</span>
                </div>
                <div className="text-right text-xs">
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-bold block">
                    {esp.velocidadPies} ft
                  </span>
                  <span className="text-[10px] text-amber-400">
                    {esp.legados.length > 0 ? `${esp.legados.length} legados` : 'Versátil'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Detalle de la especie y sus legados */}
          <div className="md:col-span-8 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  {especieActual.nombre} ({especieActual.nombreOriginal})
                </h3>
                <span className="text-xs bg-slate-900 border border-slate-800 px-2.5 py-1 rounded text-slate-300 font-semibold">
                  Tipo: {especieActual.tipoCriatura}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-2">{especieActual.descripcion}</p>

              <div className="grid grid-cols-3 gap-3 mt-4 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Tamaño</span>
                  <span className="font-semibold text-slate-200">{especieActual.tamano}</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Velocidad Base</span>
                  <span className="font-semibold text-emerald-400">{especieActual.velocidadPies} pies</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Visión en Oscuridad</span>
                  <span className="font-semibold text-amber-300">
                    {especieActual.visionEnOscuridadPies > 0 ? `${especieActual.visionEnOscuridadPies} pies` : 'No tiene'}
                  </span>
                </div>
              </div>
            </div>

            {/* Rasgos Base de la Especie */}
            <div>
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> Rasgos Base de Especie
              </h4>
              <div className="space-y-2">
                {especieActual.rasgosBase.map((r) => (
                  <div key={r.nombre} className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                    <span className="font-bold text-amber-300 text-xs block">{r.nombre}</span>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{r.descripcion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legados / Linajes Oficiales */}
            {especieActual.legados.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Feather className="w-4 h-4" /> Legados / Linajes Oficiales 2024 ({especieActual.legados.length})
                </h4>
                <div className="grid grid-cols-1 gap-3 max-h-72 overflow-y-auto pr-1">
                  {especieActual.legados.map((leg) => (
                    <div key={leg.id} className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-slate-100 text-sm">{leg.nombre}</span>
                        {leg.resistenciaDanio && (
                          <span className="text-[10px] bg-emerald-950/80 border border-emerald-800 text-emerald-300 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                            <Shield className="w-3 h-3" /> Resistencia: {leg.resistenciaDanio.join(', ')}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{leg.descripcion}</p>

                      <div className="space-y-1.5 pt-1">
                        {leg.rasgos.map((rg) => (
                          <div key={rg.nombre} className="bg-slate-950 p-2 rounded text-xs border border-slate-800/80">
                            <span className="font-semibold text-amber-300 block text-[11px]">{rg.nombre}</span>
                            <span className="text-slate-300 text-[11px]">{rg.descripcion}</span>
                          </div>
                        ))}
                      </div>

                      {leg.trucosOConjuros && (
                        <div className="text-[11px] text-sky-400 font-mono bg-sky-950/30 p-2 rounded border border-sky-900/40">
                          ✨ Magia Innata: {leg.trucosOConjuros.join(' • ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PESTAÑA 3: 16 Trasfondos Oficiales */}
      {pestana === 'trasfondos' && (
        <div>
          <div className="mb-4 text-xs text-slate-400 flex items-center justify-between">
            <span>En D&D 2024, el trasfondo otorga la Dote de Origen, tres puntuaciones a mejorar (+2/+1 o +1/+1/+1), competencias y oro inicial.</span>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full font-bold">
              16 Trasfondos Oficiales
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-1">
            {TODOS_LOS_TRASFONDOS_55.map((t) => {
              const doteInfo = DOTES_ORIGEN_55[t.doteOrigenId];
              return (
                <div key={t.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-slate-100 text-base">{t.nombre}</h4>
                      <span className="text-xs text-slate-500 font-mono">{t.nombreOriginal}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{t.descripcion}</p>

                    <div className="space-y-2 text-xs">
                      <div className="bg-slate-900 p-2 rounded border border-slate-800">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Mejoras de Atributo (+2/+1)</span>
                        <span className="font-semibold text-amber-400 capitalize">
                          {t.caracteristicasOpciones.join(' / ')}
                        </span>
                      </div>

                      <div className="bg-slate-900 p-2 rounded border border-slate-800">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Dote de Origen (Nivel 1)</span>
                        <span className="font-bold text-sky-400">{doteInfo?.nombre || t.doteOrigenId}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{doteInfo?.descripcion}</p>
                      </div>

                      <div className="bg-slate-900 p-2 rounded border border-slate-800">
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Habilidades Competentes</span>
                        <span className="font-medium text-slate-200 capitalize">
                          {t.habilidadesCompetentes.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Coins className="w-3.5 h-3.5 text-amber-400" /> {t.oroInicial} po
                    </span>
                    <span className="text-[10px] text-slate-500 truncate max-w-[160px]">
                      {t.herramientasCompetentes[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PESTAÑA 4: 8 Maestrías de Armas */}
      {pestana === 'maestrias' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(MAESTRIAS_ARMAS_55).map((m) => (
            <div key={m.clave} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 text-base">{m.nombre}</span>
                <span className="text-xs text-slate-500 font-mono">{m.nombreOriginal}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{m.descripcion}</p>
              <div className="pt-2 border-t border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Gatillo:</span>
                  <span className="text-slate-300 font-mono capitalize">{m.requisitoGatillo}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Salvación:</span>
                  <span className="text-slate-300 font-semibold">
                    {m.permiteSalvacion ? `Sí (${m.salvacionCaracteristica})` : 'Ninguna'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 bg-slate-900 p-1.5 rounded border border-slate-800">
                  {m.mecanicaRegla}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PESTAÑA 5: Condiciones */}
      {pestana === 'condiciones' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-1">
          {Object.values(CONDICIONES_55).map((c) => (
            <div
              key={c.clave}
              className={`p-4 rounded-xl border space-y-2 ${
                c.clave === 'agotamiento'
                  ? 'bg-amber-950/20 border-amber-500/50'
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <h4 className="font-bold text-slate-100 text-base">{c.nombre}</h4>
              <p className="text-xs text-slate-400">{c.descripcion}</p>
              <ul className="text-xs space-y-1 pt-1 text-slate-300 list-disc list-inside">
                {c.efectosMecanicos.map((efecto, i) => (
                  <li key={i} className="text-[11px] leading-tight">{efecto}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* PESTAÑA 6: Acciones de Combate */}
      {pestana === 'acciones' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(ACCIONES_COMBATE_55).map((a) => (
            <div key={a.clave} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-300 text-base">{a.nombre}</span>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 uppercase font-semibold">
                  {a.tipoTiempo}
                </span>
              </div>
              <p className="text-xs text-slate-300">{a.descripcionCorta}</p>
              <p className="text-[11px] text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
                {a.reglasDetalladas}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PESTAÑA 7: Dotes */}
      {pestana === 'dotes' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-1">
          {TODAS_LAS_DOTES_55.map((d) => (
            <div key={d.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100 text-sm">{d.nombre}</span>
                <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded capitalize font-medium">
                  {d.categoria}
                </span>
              </div>
              <p className="text-xs text-slate-400">{d.descripcion}</p>
              <ul className="text-[11px] space-y-1 text-slate-300 list-disc list-inside">
                {d.beneficios.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
