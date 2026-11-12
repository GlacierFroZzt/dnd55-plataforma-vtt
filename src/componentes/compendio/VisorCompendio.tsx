'use client';

import React, { useState } from 'react';
import { TODAS_LAS_CLASES_55 } from '@/datos/clases';
import { MAESTRIAS_ARMAS_55 } from '@/datos/maestrias';
import { CONDICIONES_55 } from '@/datos/condiciones';
import { ACCIONES_COMBATE_55 } from '@/datos/acciones';
import { TODAS_LAS_DOTES_55 } from '@/datos/dotes';
import { BookOpen, Shield, Sword, Heart, Sparkles, Award } from 'lucide-react';

export function VisorCompendio() {
  const [pestana, setPestana] = useState<'clases' | 'maestrias' | 'condiciones' | 'acciones' | 'dotes'>('clases');
  const [claseSeleccionadaId, setClaseSeleccionadaId] = useState('barbaro');

  const claseActual = TODAS_LAS_CLASES_55.find((c) => c.id === claseSeleccionadaId) || TODAS_LAS_CLASES_55[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl max-w-6xl mx-auto">
      {/* Selector de Pestañas */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3">
        <div>
          <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-amber-400" />
            Compendio de Reglas y Contenido Oficial D&D 5.5 (2024)
          </h2>
          <p className="text-sm text-slate-400">
            Explora las 12 clases, 48 subclases, 8 maestrías de armas, condiciones y dotes oficiales.
          </p>
        </div>

        <div className="flex flex-wrap gap-1 bg-slate-950 p-1.5 rounded-lg border border-slate-800 text-xs font-semibold">
          {[
            { id: 'clases', label: '12 Clases y 48 Subclases' },
            { id: 'maestrias', label: '8 Maestrías de Armas' },
            { id: 'condiciones', label: '15 Condiciones y Agotamiento' },
            { id: 'acciones', label: '12 Acciones de Combate' },
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
          {/* Lista de las 12 clases */}
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

          {/* Detalle de la clase y sus 4 subclases */}
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
                  <span className="text-slate-500 block text-[10px]">Maestrías Armas</span>
                  <span className="font-semibold text-slate-200">
                    {(claseActual.maestriaArmasInicial ?? 0) > 0 ? `${claseActual.maestriaArmasInicial} armas` : 'Ninguna'}
                  </span>
                </div>
                <div className="bg-slate-900 p-2 rounded border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Magia</span>
                  <span className="font-semibold text-slate-200 capitalize">{claseActual.tipoMagia}</span>
                </div>
              </div>
            </div>

            {/* Las 4 Subclases */}
            <div>
              <h4 className="text-base font-bold text-amber-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Las 4 Subclases Oficiales de {claseActual.nombre} (Desbloqueo Nivel 3)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {claseActual.subclases.map((sub) => (
                  <div key={sub.id} className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100 text-sm">{sub.nombre}</span>
                      <span className="text-[10px] text-slate-500">{sub.nombreOriginal}</span>
                    </div>
                    <p className="text-xs text-slate-400">{sub.descripcion}</p>
                    <div className="pt-2 border-t border-slate-800/80 space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-500 block">Rasgos de Subclase:</span>
                      {sub.rasgos.map((r, i) => (
                        <div key={i} className="text-xs text-slate-300">
                          <span className="text-amber-400 font-medium">Nv {r.nivel} - {r.nombre}:</span>{' '}
                          <span className="text-slate-400 text-[11px]">{r.descripcion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 2: Maestrías de Armas */}
      {pestana === 'maestrias' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.values(MAESTRIAS_ARMAS_55).map((m) => (
            <div key={m.clave} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 text-base">{m.nombre}</span>
                <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                  {m.nombreOriginal}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{m.descripcion}</p>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-[11px] text-slate-400">
                <strong className="text-slate-200 block mb-0.5">Regla Mecánica 2024:</strong>
                {m.mecanicaRegla}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PESTAÑA 3: Condiciones y Agotamiento */}
      {pestana === 'condiciones' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* PESTAÑA 4: Acciones de Combate */}
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

      {/* PESTAÑA 5: Dotes */}
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
