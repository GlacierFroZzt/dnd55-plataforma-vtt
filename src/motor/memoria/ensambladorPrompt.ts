import { EstadoCampana, EventoDecision, EstadoPNJ } from '@/esquemas/campana';
import { FichaPersonaje } from '@/esquemas/personaje';
import { LedgerEventos } from './ledgerEventos';

export interface ContextoPromptEnsamblado {
  bloqueSistemaCacheador: string;
  capsulaEstadoDinamico: string;
  hechosCanónicosInyectados: string;
  ultimosMensajesChat: { rol: 'user' | 'assistant' | 'system'; contenido: string }[];
  estimacionTokensAproximada: number;
}

export function ensamblarPromptParaDM(params: {
  campana: EstadoCampana;
  fichasPersonajes: FichaPersonaje[];
  ledger: LedgerEventos;
  limiteMensajesChat?: number;
}): ContextoPromptEnsamblado {
  const { campana, fichasPersonajes, ledger, limiteMensajesChat = 5 } = params;

  // 1. BLOQUE DE SISTEMA CACHEABLE (Reglas 5.5 + Rol del DM)
  const bloqueSistemaCacheador = `Eres el Dungeon Master (DM) oficial de esta campaña de Dungeons & Dragons 5.5 (Revisión 2024).
Tu rol es narrar el mundo de forma vívida, inmersiva, reactiva y justa, arbitrando las reglas oficiales 2024.
REGLAS CLAVE D&D 5.5 A SEGUIR ESTRICTAMENTE:
- MAESTRÍAS DE ARMAS: Los personajes marciales desatan efectos de maestría (Hendidura, Roce, Corte Rápido, Empujón, Minar, Ralentizar, Derribo, Hostigamiento).
- AGOTAMIENTO 5.5: Cada nivel resta 2 a pruebas d20 y CD de conjuros, y reduce 5 pies de velocidad.
- INSPIRACIÓN HEROICA: Permite volver a tirar cualquier dado.
- GESTIÓN DE ACCIONES FORMALES: Atacar (daño/agarrar/empujar con FUE o DES), Correr, Destrabarse, Esquivar, Ayudar, Esconderse (CD 15 min), Influenciar, Magia (1 espacio por turno), etc.
- MEMORIA Y CONSISTENCIA: Nunca contradigas los Hechos Canónicos ni las Decisiones Previas registradas en la bitácora. El estado del mundo es determinista.
- Si requieres que un jugador tire dados, solicita la tirada explícitamente indicando la Característica y la CD si corresponde.`;

  // 2. MICRO-CÁPSULA DE ESTADO DINÁMICO (~200 tokens)
  const resumenParty = fichasPersonajes.map((pj) => {
    const condiciones = pj.condicionesActivas.map((c) => c.nombre).join(', ') || 'Ninguna';
    return `- ${pj.nombre} (${pj.claseId} Nv ${pj.nivel}): ${pj.puntosGolpeActuales}/${pj.puntosGolpeMaximos} PG | CA ${pj.claseArmadura} | Estados: [${condiciones}] | Inspiración: ${pj.inspiracionHeroica ? 'SÍ' : 'NO'}`;
  }).join('\n');

  const pnjsPresentesTexto = campana.escenaActual.pnjsPresentes.map((id) => {
    const pnj = campana.pnjs[id];
    return pnj ? `${pnj.nombre} (${pnj.tituloOcupacion}, Actitud: ${pnj.actitudHaciaGrupo}, Estado: ${pnj.estaVivo ? 'Vivo' : 'Muerto'})` : id;
  }).join(', ') || 'Ninguno';

  const capsulaEstadoDinamico = `[ESTADO ACTUAL DEL MUNDO]
Ubicación: ${campana.escenaActual.nombreLugar}
Iluminación: ${campana.escenaActual.iluminacion} | En Combate: ${campana.escenaActual.enCombate ? 'SÍ' : 'NO'}
PNJs en la Escena: ${pnjsPresentesTexto}
Amenazas Inmediatas: ${campana.escenaActual.amenazasVisibles.join(', ') || 'Ninguna aparente'}
Salidas Visibles: ${campana.escenaActual.salidasDisponibles.join(', ') || 'Exploración abierta'}

[ESTADO DEL GRUPO DE AVENTUREROS]
${resumenParty}`;

  // 3. HECHOS Y DECISIONES CANÓNICAS INYECTADAS (FILTRADAS) (~150 tokens)
  const hechosRelevantes = ledger.obtenerHechosRelevantesParaEscena(
    campana.escenaActual,
    campana.pnjs,
    5
  );

  let hechosCanónicosInyectados = '[BITÁCORA DE DECISIONES Y HECHOS PASADOS INMUTABLES]\n';
  if (hechosRelevantes.length === 0) {
    hechosCanónicosInyectados += '- Ninguna decisión crítica previa afecta directamente esta escena.\n';
  } else {
    for (const h of hechosRelevantes) {
      hechosCanónicosInyectados += `- [Hecho]: ${h.resumenHecho} -> Consecuencia Activa: ${h.consecuenciaActiva}\n`;
    }
  }

  // 4. VENTANA CORTA DE MENSAJES DE CHAT
  const ultimosMensajes = campana.mensajesChat
    .slice(-limiteMensajesChat)
    .map((m) => ({
      rol: (m.remitente === 'dm' ? 'assistant' : 'user') as 'assistant' | 'user',
      contenido: `${m.nombreEmisor}: ${m.contenido}`,
    }));

  const textoCompleto = `${bloqueSistemaCacheador}\n\n${capsulaEstadoDinamico}\n\n${hechosCanónicosInyectados}`;
  const estimacionTokensAproximada = Math.ceil(textoCompleto.length / 4);

  return {
    bloqueSistemaCacheador,
    capsulaEstadoDinamico,
    hechosCanónicosInyectados,
    ultimosMensajesChat: ultimosMensajes,
    estimacionTokensAproximada,
  };
}
