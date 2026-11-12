'use client';

import React, { useState } from 'react';
import { MesaJuego } from '@/componentes/vtt/MesaJuego';
import { CreadorPersonajePasoAPaso } from '@/componentes/ficha/CreadorPersonajePasoAPaso';
import { VisorCompendio } from '@/componentes/compendio/VisorCompendio';
import { FichaPersonaje } from '@/esquemas/personaje';
import {
  Sword, Dices, BookOpen, Users, Sparkles, Shield, Heart,
  Flame, ArrowRight, Brain, Zap
} from 'lucide-react';

// Personaje de inicio por defecto listo para jugar
const PERSONAJE_DEFECTO: FichaPersonaje = {
  id: 'pj_defecto_valen',
  nombre: 'Valen Sombra-de-Acero',
  jugadorNombre: 'Aventurero',
  especie: 'Humano',
  trasfondo: 'Soldado',
  claseId: 'guerrero',
  subclaseId: 'campeon',
  nivel: 3,
  alineamiento: 'Neutral Bueno',
  caracteristicas: {
    fuerza: 16,
    destreza: 14,
    constitucion: 15,
    inteligencia: 10,
    sabiduria: 12,
    carisma: 8,
  },
  puntosGolpeMaximos: 28,
  puntosGolpeActuales: 28,
  puntosGolpeTemporales: 0,
  claseArmadura: 18,
  velocidadPies: 30,
  iniciativaMod: 4, // DES (+2) + Alerta (+2)
  inspiracionHeroica: true,
  dadosGolpeDisponibles: 3,
  dadosGolpeTotales: 3,
  tipoDadoGolpe: 'd10',
  salvacionesMuerte: { exitos: 0, fallos: 0 },
  salvacionesCompetentes: ['fuerza', 'constitucion'],
  habilidadesCompetentes: ['atletismo', 'intimidacion', 'percepcion', 'supervivencia'],
  habilidadesExpertas: [],
  armasCompetentes: ['armasSimples', 'armasMarciales'],
  armadurasCompetentes: ['armaduraLigera', 'armaduraMedia', 'armaduraPesada', 'escudos'],
  herramientasCompetentes: [],
  idiomas: ['Común'],
  maestriasArmasDesbloqueadas: ['roce', 'derribo', 'empujon'],
  armasEquipadas: ['espadon'],
  armaduraEquipada: 'Armadura de placas',
  escudoEquipado: false,
  monedas: { cobre: 0, plata: 0, electro: 0, oro: 25, platino: 0 },
  inventarioObjetos: ['Mochila', 'Cuerda de cáñamo 50ft', 'Antorchas (5)', 'Poción de curación'],
  espaciosConjuroMaximos: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  espaciosConjuroGastados: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  conjurosPreparados: [],
  trucosConocidos: [],
  condicionesActivas: [],
  nivelAgotamiento: 0,
  dotesIds: ['alerta'],
  rasgosEspeciales: ['Segundo Aliento (2)', 'Oleada de Acción (1)', 'Crítico Mejorado (19-20)', 'Atleta Extraordinario'],
};

export default function PaginaPrincipal() {
  const [vistaActual, setVistaActual] = useState<'inicio' | 'mesa' | 'creador' | 'compendio'>('inicio');
  const [personajeActivo, setPersonajeActivo] = useState<FichaPersonaje>(PERSONAJE_DEFECTO);

  if (vistaActual === 'mesa') {
    return (
      <MesaJuego
        personajeInicial={personajeActivo}
        onVolverAlMenu={() => setVistaActual('inicio')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 p-4 sm:p-8 flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full space-y-12">
        {/* Cabecera / Barra de Navegación */}
        <header className="flex flex-wrap items-center justify-between border-b border-slate-800/80 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-amber-500/20">
              5.5
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-100 flex items-center gap-2">
                D&D 5.5 Virtual Tabletop
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                  Revisión 2024
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Plataforma Web con Bot DM Inteligente • Solo y Multijugador • Memoria Inmortal (Event Sourcing)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setVistaActual('compendio')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Compendio Oficial 2024
            </button>
            <button
              onClick={() => setVistaActual('creador')}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Crear Ficha 2024
            </button>
          </div>
        </header>

        {/* Modalidad de Vistas Interactivas */}
        {vistaActual === 'creador' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setVistaActual('inicio')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                ← Volver al Menú Principal
              </button>
            </div>
            <CreadorPersonajePasoAPaso
              onGuardarPersonaje={(pj) => {
                setPersonajeActivo(pj);
                setVistaActual('mesa');
              }}
              onCancelar={() => setVistaActual('inicio')}
            />
          </div>
        )}

        {vistaActual === 'compendio' && (
          <div>
            <div className="mb-4">
              <button
                onClick={() => setVistaActual('inicio')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                ← Volver al Menú Principal
              </button>
            </div>
            <VisorCompendio />
          </div>
        )}

        {vistaActual === 'inicio' && (
          <div className="space-y-12">
            {/* Hero Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-slate-800 p-8 sm:p-12 shadow-2xl">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
                  <Brain className="w-3.5 h-3.5" />
                  Arquitectura de Memoria Inmortal contra la Amnesia del LLM
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
                  Juega D&D 5.5 con un Bot DM que <span className="text-amber-400 underline decoration-amber-500/50">jamás olvida</span> tus decisiones.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Basado en una arquitectura de <strong>Ledger de Hechos Canónicos (Event Sourcing)</strong> y separación de estado determinista. 
                  En cada turno se inyectan solo los hechos relevantes a la escena activa, garantizando consistencia absoluta, mínimo consumo de tokens y cero alucinaciones.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() => setVistaActual('mesa')}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl flex items-center gap-2 text-base transition-all shadow-lg shadow-amber-500/20"
                  >
                    <Sword className="w-5 h-5" />
                    Entrar a la Mesa Virtual de Juego
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <button
                    onClick={() => setVistaActual('creador')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold px-5 py-3 rounded-xl text-sm border border-slate-700 transition-colors"
                  >
                    Crear Nuevo Personaje
                  </button>
                </div>
              </div>
            </div>

            {/* Tres Pilares Tecnológicos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100 text-lg">Memoria Inmortal (Event Sourcing)</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Las decisiones de los jugadores, promesas a PNJs y alianzas se registran en una bitácora inmutable. No se pierde contexto al avanzar la campaña y no se satura la ventana de tokens.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100 text-lg">12 Clases y 48 Subclases 2024</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  12 archivos modulares en TypeScript con datos canónicos del PHB 2024: dados de golpe, progresión nivel 1-20, maestrías de armas tácticas y las 4 subclases desbloqueadas a nivel 3.
                </p>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-100 text-lg">Solo y Multijugador con Amigos</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Juega en solitario con el Bot DM como compañero narrativo o crea una sala multijugador compartiendo un código de invitación de 6 caracteres con tiradas en tiempo real.
                </p>
              </div>
            </div>

            {/* Ficha Rápida del Personaje Listo */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-lg">
                  🛡️
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-base">{personajeActivo.nombre}</h4>
                  <p className="text-xs text-slate-400">
                    {personajeActivo.especie} {personajeActivo.claseId} (Nv {personajeActivo.nivel}) • PG: {personajeActivo.puntosGolpeActuales}/{personajeActivo.puntosGolpeMaximos} • CA: {personajeActivo.claseArmadura} • Maestría: Roce (Graze)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVistaActual('mesa')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
              >
                Jugar con este Personaje →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pie de Página */}
      <footer className="mt-12 border-t border-slate-800/60 pt-6 text-center text-xs text-slate-500">
        D&D 5.5 (Revisión 2024) Plataforma de Rol Web • Diseñado con Next.js, Zod y Vitest.
      </footer>
    </div>
  );
}
