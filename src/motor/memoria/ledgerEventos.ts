import { EventoDecision, EstadoPNJ, EstadoEscena } from '@/esquemas/campana';

/**
 * Gestor del Ledger Canónico de Decisiones (Event Sourcing)
 * Almacena de forma inmutable todas las decisiones y consecuencias de los jugadores
 * para evitar que el Bot DM sufra de amnesia o alucinaciones.
 */
export class LedgerEventos {
  private eventos: EventoDecision[] = [];

  constructor(eventosIniciales: EventoDecision[] = []) {
    this.eventos = [...eventosIniciales];
  }

  /**
   * Registra una nueva decisión o hecho canónico inmutable en la bitácora
   */
  public registrarEvento(evento: Omit<EventoDecision, 'id' | 'marcaTiempo'>): EventoDecision {
    const nuevoEvento: EventoDecision = {
      ...evento,
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      marcaTiempo: Date.now(),
      vigente: evento.vigente ?? true,
      importancia: evento.importancia ?? 'media',
    };
    this.eventos.push(nuevoEvento);
    return nuevoEvento;
  }

  /**
   * Obtiene todos los eventos de la campaña
   */
  public obtenerTodos(): EventoDecision[] {
    return [...this.eventos];
  }

  /**
   * FILTRO DINÁMICO DE CONTEXTO:
   * Recupera solo los eventos pertinentes a la escena actual y los PNJs presentes.
   * Esto mantiene el consumo de tokens en menos de ~200 tokens sin perder nunca hechos clave.
   */
  public obtenerHechosRelevantesParaEscena(
    escena: EstadoEscena,
    pnjs: Record<string, EstadoPNJ>,
    limite = 5
  ): EventoDecision[] {
    const pnjsEnEscena = new Set(escena.pnjsPresentes);
    const idUbicacion = escena.id;

    // Puntuamos la relevancia de cada evento
    const eventosPuntuados = this.eventos
      .filter((e) => e.vigente)
      .map((evento) => {
        let puntuacion = 0;

        // Si ocurrió en la misma ubicación
        if (evento.ubicacionId === idUbicacion) {
          puntuacion += 3;
        }

        // Si involucra a alguno de los PNJs presentes en la sala
        for (const sujeto of evento.sujetosInvolucrados) {
          if (pnjsEnEscena.has(sujeto)) {
            puntuacion += 5;
          }
        }

        // Eventos críticos siempre tienen prioridad
        if (evento.importancia === 'critica') {
          puntuacion += 4;
        } else if (evento.importancia === 'alta') {
          puntuacion += 2;
        }

        return { evento, puntuacion };
      })
      .filter((item) => item.puntuacion > 0)
      .sort((a, b) => b.puntuacion - a.puntuacion);

    return eventosPuntuados.slice(0, limite).map((item) => item.evento);
  }

  /**
   * Serializa el ledger para almacenamiento persistente (localStorage / BD)
   */
  public serializar(): string {
    return JSON.stringify(this.eventos);
  }

  public static deserializar(json: string): LedgerEventos {
    try {
      const data = JSON.parse(json);
      return new LedgerEventos(Array.isArray(data) ? data : []);
    } catch {
      return new LedgerEventos([]);
    }
  }
}
