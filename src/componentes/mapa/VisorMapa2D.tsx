'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Mapa2D, BiomaMapa, EntidadMapa } from '@/esquemas/mapa2d';
import { renderizarMapaCanvas } from '@/motor/mapa/renderizadorCanvas';
import {
  actualizarNieblaDeGuerra,
  calcularCasillasAlcanzables,
  calcularDistanciaPies,
  esCasillaTransitable,
} from '@/motor/mapa/calculadorVisionNiebla';
import {
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Crosshair,
  Eye,
  EyeOff,
  Compass,
  Sword,
  Sparkles,
  Shield,
  Layers,
} from 'lucide-react';

interface Props {
  mapa: Mapa2D;
  posicionJugador: { x: number; y: number };
  velocidadJugadorPies: number;
  onMoverJugador: (nuevaPos: { x: number; y: number }, piesGastados: number) => void;
  onAtacarEnemigo: (enemigo: EntidadMapa) => void;
  onInteractuarObjeto: (objeto: EntidadMapa) => void;
  onCambiarBioma: (bioma: BiomaMapa) => void;
  onRegenerarMapa: () => void;
  onToggleNieblaGuerra: () => void;
}

const TAMANO_CASILLA_BASE = 44;

export function VisorMapa2D({
  mapa,
  posicionJugador,
  velocidadJugadorPies,
  onMoverJugador,
  onAtacarEnemigo,
  onInteractuarObjeto,
  onCambiarBioma,
  onRegenerarMapa,
  onToggleNieblaGuerra,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contenedorRef = useRef<HTMLDivElement | null>(null);

  // Estados de vista y cámara
  const [zoom, setZoom] = useState(1.1);
  const [camaraOffset, setCamaraOffset] = useState({ x: 0, y: 0 });
  const [arrastrando, setArrastrando] = useState(false);
  const [inicioArrastre, setInicioArrastre] = useState({ x: 0, y: 0 });
  const [offsetInicioArrastre, setOffsetInicioArrastre] = useState({ x: 0, y: 0 });
  const [distanciaPellizcoInicial, setDistanciaPellizcoInicial] = useState<number | null>(null);
  const [zoomInicioPellizco, setZoomInicioPellizco] = useState(1);

  // Casilla y Entidad seleccionada
  const [casillaSeleccionada, setCasillaSeleccionada] = useState<{ x: number; y: number } | null>(null);
  const [entidadSeleccionada, setEntidadSeleccionada] = useState<EntidadMapa | null>(null);
  const [tiempoTick, setTiempoTick] = useState(0);

  // Movimiento alcanzable en este turno
  const casillasAlcanzables = calcularCasillasAlcanzables(
    mapa,
    posicionJugador,
    velocidadJugadorPies,
    mapa.piesPorCasilla
  );

  const tamanoCasillaFinal = TAMANO_CASILLA_BASE * zoom;

  // Centrar la cámara en el personaje
  const centrarEnPersonaje = useCallback(() => {
    if (!contenedorRef.current) return;
    const { clientWidth, clientHeight } = contenedorRef.current;
    const pxJug = (posicionJugador.x + 0.5) * tamanoCasillaFinal;
    const pyJug = (posicionJugador.y + 0.5) * tamanoCasillaFinal;

    setCamaraOffset({
      x: Math.round(clientWidth / 2 - pxJug),
      y: Math.round(clientHeight / 2 - pyJug),
    });
  }, [posicionJugador, tamanoCasillaFinal]);

  // Centrar al montar o al cambiar de mapa
  useEffect(() => {
    centrarEnPersonaje();
  }, [mapa.id]);

  // Bucle de animación (60 FPS para niebla y luces)
  useEffect(() => {
    let animId: number;
    const loop = (t: number) => {
      setTiempoTick(t);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Redimensionar canvas y renderizar
  useEffect(() => {
    const canvas = canvasRef.current;
    const contenedor = contenedorRef.current;
    if (!canvas || !contenedor) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const ancho = contenedor.clientWidth;
    const alto = contenedor.clientHeight;

    if (canvas.width !== ancho * dpr || canvas.height !== alto * dpr) {
      canvas.width = ancho * dpr;
      canvas.height = alto * dpr;
      canvas.style.width = `${ancho}px`;
      canvas.style.height = `${alto}px`;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    renderizarMapaCanvas(ctx, mapa, {
      tamanoCasilla: tamanoCasillaFinal,
      camaraOffset,
      anchoCanvas: ancho,
      altoCanvas: alto,
      casillasAlcanzables,
      casillaSeleccionada,
      posicionJugador,
      tiempoTick,
    });

    ctx.restore();
  }, [mapa, tamanoCasillaFinal, camaraOffset, casillasAlcanzables, casillaSeleccionada, posicionJugador, tiempoTick]);

  // Convertir coordenadas del cliente a casillas de la cuadrícula
  const obtenerCasillaDesdePixel = (clientX: number, clientY: number): { x: number; y: number } | null => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    const px = clientX - rect.left - camaraOffset.x;
    const py = clientY - rect.top - camaraOffset.y;

    const x = Math.floor(px / tamanoCasillaFinal);
    const y = Math.floor(py / tamanoCasillaFinal);

    if (x >= 0 && x < mapa.ancho && y >= 0 && y < mapa.alto) {
      return { x, y };
    }
    return null;
  };

  // Manejar Clic o Tap en casilla
  const procesarAccionEnCasilla = (casilla: { x: number; y: number }) => {
    const { x, y } = casilla;
    const casillaInfo = mapa.casillas[y]?.[x];
    if (!casillaInfo) return;

    // Buscar si hay una entidad en esa casilla
    const entidad = mapa.entidades.find(
      (e) => e.x === x && e.y === y && (e.tipo !== 'jugador' || mapa.entidades.length === 1)
    );

    setCasillaSeleccionada({ x, y });
    setEntidadSeleccionada(entidad || null);

    // 1. Si clicó en una puerta cerrada adyacente, abrirla
    const distPies = calcularDistanciaPies(posicionJugador, { x, y }, mapa.piesPorCasilla);
    if (casillaInfo.tipoTerreno === 'puertaCerrada' && distPies <= 5) {
      casillaInfo.tipoTerreno = 'puertaAbierta';
      actualizarNieblaDeGuerra(mapa, posicionJugador);
      return;
    }

    // 2. Si es una casilla alcanzable y vacía de enemigos vivos, mover al personaje
    const clave = `${x},${y}`;
    if (casillasAlcanzables.has(clave) && (!entidad || entidad.tipo !== 'enemigo')) {
      const piesRecorridos = calcularDistanciaPies(posicionJugador, { x, y }, mapa.piesPorCasilla);
      onMoverJugador({ x, y }, piesRecorridos);
      setCasillaSeleccionada(null);
      setEntidadSeleccionada(null);
      return;
    }
  };

  // CONTROL DE RATÓN (PC / Escritorio)
  const handleMouseDown = (e: React.MouseEvent) => {
    setArrastrando(true);
    setInicioArrastre({ x: e.clientX, y: e.clientY });
    setOffsetInicioArrastre({ ...camaraOffset });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!arrastrando) return;
    const dx = e.clientX - inicioArrastre.x;
    const dy = e.clientY - inicioArrastre.y;
    setCamaraOffset({
      x: offsetInicioArrastre.x + dx,
      y: offsetInicioArrastre.y + dy,
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    const distancia = Math.hypot(e.clientX - inicioArrastre.x, e.clientY - inicioArrastre.y);
    setArrastrando(false);

    // Si apenas se movió (< 6px), se considera un clic intencionado
    if (distancia < 6) {
      const casilla = obtenerCasillaDesdePixel(e.clientX, e.clientY);
      if (casilla) {
        procesarAccionEnCasilla(casilla);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.85;
    setZoom((z) => Math.max(0.6, Math.min(2.5, z * factor)));
  };

  // CONTROL TÁCTIL (Móviles / Teléfonos)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      setArrastrando(true);
      setInicioArrastre({ x: t.clientX, y: t.clientY });
      setOffsetInicioArrastre({ ...camaraOffset });
      setDistanciaPellizcoInicial(null);
    } else if (e.touches.length === 2) {
      // Gesto de pellizco para zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      setDistanciaPellizcoInicial(dist);
      setZoomInicioPellizco(zoom);
      setArrastrando(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && arrastrando) {
      const t = e.touches[0];
      const dx = t.clientX - inicioArrastre.x;
      const dy = t.clientY - inicioArrastre.y;
      setCamaraOffset({
        x: offsetInicioArrastre.x + dx,
        y: offsetInicioArrastre.y + dy,
      });
    } else if (e.touches.length === 2 && distanciaPellizcoInicial !== null) {
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const distActual = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const escala = distActual / distanciaPellizcoInicial;
      setZoom(Math.max(0.6, Math.min(2.5, zoomInicioPellizco * escala)));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches.length === 1 && arrastrando) {
      const t = e.changedTouches[0];
      const dist = Math.hypot(t.clientX - inicioArrastre.x, t.clientY - inicioArrastre.y);
      setArrastrando(false);

      // Tap limpio sin arrastre
      if (dist < 8) {
        const casilla = obtenerCasillaDesdePixel(t.clientX, t.clientY);
        if (casilla) {
          procesarAccionEnCasilla(casilla);
        }
      }
    }
    setDistanciaPellizcoInicial(null);
  };

  const biomasDisponibles: Array<{ id: BiomaMapa; label: string; icono: string }> = [
    { id: 'cripta', label: 'Cripta', icono: '⚰️' },
    { id: 'bosque', label: 'Bosque', icono: '🌲' },
    { id: 'caverna', label: 'Caverna', icono: '🪨' },
    { id: 'templo', label: 'Templo', icono: '✨' },
    { id: 'taberna', label: 'Taberna', icono: '🍺' },
  ];

  return (
    <div
      ref={contenedorRef}
      className="relative w-full h-full min-h-[380px] bg-[#070b14] overflow-hidden select-none border border-slate-800 rounded-xl"
    >
      {/* Canvas Principal */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="block cursor-grab active:cursor-grabbing touch-none"
      />

      {/* BARRA SUPERIOR DE BIOMAS (Píldoras con scroll horizontal) */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none gap-2">
        <div className="flex overflow-x-auto no-scrollbar gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-lg border border-slate-800 pointer-events-auto">
          {biomasDisponibles.map((b) => (
            <button
              key={b.id}
              onClick={() => onCambiarBioma(b.id)}
              className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-all shrink-0 ${
                mapa.bioma === b.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{b.icono}</span>
              <span>{b.label}</span>
            </button>
          ))}
        </div>

        {/* Acciones Rápidas del Mapa */}
        <div className="flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-lg border border-slate-800 pointer-events-auto shrink-0">
          <button
            onClick={onRegenerarMapa}
            title="Generar nueva mazmorra procedural"
            className="p-1.5 rounded text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleNieblaGuerra}
            title={mapa.nieblaGuerraActiva ? 'Desactivar Niebla de Guerra' : 'Activar Niebla de Guerra'}
            className={`p-1.5 rounded transition-colors ${
              mapa.nieblaGuerraActiva
                ? 'text-emerald-400 hover:bg-slate-800'
                : 'text-slate-500 hover:bg-slate-800'
            }`}
          >
            {mapa.nieblaGuerraActiva ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button
            onClick={centrarEnPersonaje}
            title="Centrar en mi Héroe"
            className="p-1.5 rounded text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors"
          >
            <Crosshair className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CONTROLES DE ZOOM FLOTANTES */}
      <div className="absolute right-2 bottom-3 flex flex-col gap-1 pointer-events-auto">
        <button
          onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
          className="w-9 h-9 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-amber-400 flex items-center justify-center shadow-lg active:scale-95 transition-all"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
          className="w-9 h-9 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-300 hover:text-amber-400 flex items-center justify-center shadow-lg active:scale-95 transition-all"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* PANEL FLOTANTE DE INFORMACIÓN Y MOVIMIENTO */}
      <div className="absolute left-2 bottom-3 pointer-events-none flex flex-col gap-2 max-w-[80%] sm:max-w-sm">
        <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 pointer-events-auto shadow-lg">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">
            Velocidad: <strong className="text-amber-400">{velocidadJugadorPies} ft</strong> ({Math.floor(velocidadJugadorPies / 5)} casillas)
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 truncate">
            {mapa.nombre}
          </span>
        </div>

        {/* TARJETA DE INTERACCIÓN SI SE SELECCIONÓ UN ENEMIGO U OBJETO */}
        {entidadSeleccionada && (
          <div className="bg-slate-900/95 backdrop-blur-md border border-amber-500/50 p-3 rounded-xl text-xs space-y-2 pointer-events-auto shadow-2xl animate-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-100 flex items-center gap-1.5 text-sm">
                <span>{entidadSeleccionada.icono}</span>
                {entidadSeleccionada.nombre}
              </span>
              <span className="text-[10px] text-slate-400 font-mono capitalize">
                {calcularDistanciaPies(posicionJugador, entidadSeleccionada, mapa.piesPorCasilla)} ft
              </span>
            </div>

            {entidadSeleccionada.descripcion && (
              <p className="text-[11px] text-slate-400 leading-tight">
                {entidadSeleccionada.descripcion}
              </p>
            )}

            {entidadSeleccionada.tipo === 'enemigo' && (
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800">
                <span className="text-[11px] text-red-300 font-semibold">
                  PG: {entidadSeleccionada.pgActual}/{entidadSeleccionada.pgMax} • CA: {entidadSeleccionada.ca}
                </span>
                <button
                  onClick={() => onAtacarEnemigo(entidadSeleccionada)}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 shadow transition-colors"
                >
                  <Sword className="w-3.5 h-3.5" /> Atacar
                </button>
              </div>
            )}

            {entidadSeleccionada.esInteractuable && entidadSeleccionada.tipo !== 'enemigo' && (
              <div className="pt-1 border-t border-slate-800">
                <button
                  onClick={() => onInteractuarObjeto(entidadSeleccionada)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center justify-center gap-1 shadow transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Investigar / Interactuar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
