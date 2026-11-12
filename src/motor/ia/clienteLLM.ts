import { ContextoPromptEnsamblado } from '../memoria/ensambladorPrompt';
import { HERRAMIENTAS_BOT_DM } from './herramientasDM';

export type ProveedorIA = 'claude' | 'openai' | 'gemini' | 'mock';

export interface OpcionesClienteIA {
  proveedor: ProveedorIA;
  apiKey?: string;
  modelo?: string;
  temperatura?: number;
}

export interface RespuestaBotDM {
  narrativa: string;
  llamadasHerramientas: {
    nombre: string;
    argumentos: Record<string, any>;
  }[];
  tokensUsados?: {
    entrada: number;
    salida: number;
    cacheados?: number;
  };
}

export class ClienteBotDM {
  private opciones: OpcionesClienteIA;

  constructor(opciones: OpcionesClienteIA) {
    this.opciones = {
      proveedor: opciones.proveedor ?? 'mock',
      apiKey: opciones.apiKey,
      modelo: opciones.modelo,
      temperatura: opciones.temperatura ?? 0.7,
    };
  }

  /**
   * Genera la narración y posibles acciones del Bot DM
   */
  public async generarTurno(
    contexto: ContextoPromptEnsamblado,
    ultimoMensajeJugador: string
  ): Promise<RespuestaBotDM> {
    if (this.opciones.proveedor === 'claude' && this.opciones.apiKey) {
      return this.llamarClaude(contexto, ultimoMensajeJugador);
    } else if (this.opciones.proveedor === 'openai' && this.opciones.apiKey) {
      return this.llamarOpenAI(contexto, ultimoMensajeJugador);
    }

    // Por defecto o en modo mock, usamos el Simulador Inteligente Local
    return this.simularRespuestaDM(contexto, ultimoMensajeJugador);
  }

  /**
   * Llamada a Anthropic Claude con Prompt Caching
   */
  private async llamarClaude(
    contexto: ContextoPromptEnsamblado,
    ultimoMensaje: string
  ): Promise<RespuestaBotDM> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.opciones.apiKey!,
          'anthropic-version': '2023-06-01',
          'anthropic-beta': 'prompt-caching-2024-07-25',
        },
        body: JSON.stringify({
          model: this.opciones.modelo || 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: [
            {
              type: 'text',
              text: contexto.bloqueSistemaCacheador,
              cache_control: { type: 'ephemeral' }, // Prompt Caching
            },
            {
              type: 'text',
              text: `${contexto.capsulaEstadoDinamico}\n\n${contexto.hechosCanónicosInyectados}`,
            },
          ],
          messages: [
            ...contexto.ultimosMensajesChat,
            { role: 'user', content: ultimoMensaje },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error API Claude: ${response.statusText}`);
      }

      const data = await response.json();
      const texto = data.content?.[0]?.text || 'El silencio reina en la estancia...';

      return {
        narrativa: texto,
        llamadasHerramientas: [],
        tokensUsados: {
          entrada: data.usage?.input_tokens || 0,
          salida: data.usage?.output_tokens || 0,
          cacheados: data.usage?.cache_read_input_tokens || 0,
        },
      };
    } catch (err: any) {
      console.warn('Fallo al conectar con Claude API, recurriendo a simulador local:', err);
      return this.simularRespuestaDM(contexto, ultimoMensaje);
    }
  }

  /**
   * Llamada a OpenAI (GPT-4o)
   */
  private async llamarOpenAI(
    contexto: ContextoPromptEnsamblado,
    ultimoMensaje: string
  ): Promise<RespuestaBotDM> {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.opciones.apiKey}`,
        },
        body: JSON.stringify({
          model: this.opciones.modelo || 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `${contexto.bloqueSistemaCacheador}\n\n${contexto.capsulaEstadoDinamico}\n\n${contexto.hechosCanónicosInyectados}`,
            },
            ...contexto.ultimosMensajesChat,
            { role: 'user', content: ultimoMensaje },
          ],
          temperature: this.opciones.temperatura,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error API OpenAI: ${response.statusText}`);
      }

      const data = await response.json();
      const texto = data.choices?.[0]?.message?.content || 'Un viento helado apaga las antorchas...';

      return {
        narrativa: texto,
        llamadasHerramientas: [],
        tokensUsados: {
          entrada: data.usage?.prompt_tokens || 0,
          salida: data.usage?.completion_tokens || 0,
        },
      };
    } catch (err: any) {
      console.warn('Fallo al conectar con OpenAI API, recurriendo a simulador local:', err);
      return this.simularRespuestaDM(contexto, ultimoMensaje);
    }
  }

  /**
   * Simulador Inteligente Local del Bot DM (Mock DM):
   * Analiza el texto del jugador, evalúa el contexto, simula la personalidad del DM,
   * solicita tiradas y genera registros automáticos de hechos en el Ledger sin gastar APIs.
   */
  private simularRespuestaDM(
    contexto: ContextoPromptEnsamblado,
    mensaje: string
  ): RespuestaBotDM {
    const textoMinus = mensaje.toLowerCase();
    const llamadas: { nombre: string; argumentos: Record<string, any> }[] = [];
    let respuesta = '';

    if (textoMinus.includes('perdonar') || textoMinus.includes('rendir') || textoMinus.includes('pacto') || textoMinus.includes('aliado')) {
      llamadas.push({
        nombre: 'registrar_decision_campana',
        argumentos: {
          tipo: 'pactoAlianza',
          tituloCorto: 'Pacto de Piedad con el PNJ',
          resumenHecho: `El grupo decidió perdonar a los ocupantes y negociar una tregua pacífica: "${mensaje.substring(0, 80)}"`,
          consecuenciaActiva: 'Los PNJs de esta facción ahora son neutrales y no atacarán salvo provocación.',
          sujetosInvolucrados: ['pnj_1', 'party'],
          importancia: 'alta',
        },
      });
      llamadas.push({
        nombre: 'actualizar_relacion_pnj',
        argumentos: {
          pnjId: 'pnj_1',
          nuevaActitud: 'amistoso',
          nuevoRecuerdo: 'Los aventureros le perdonaron la vida cuando podían haberlo ejecutado.',
          estaVivo: true,
        },
      });
      respuesta = `El enemigo baja su arma lentamente con ojos temblorosos. Observa vuestras posturas y traga saliva antes de asentir.\n\n—*«No olvidaré este gesto, forasteros... En estas tierras la piedad es un bien más raro que el oro. Si buscáis la cámara del tesoro, tened cuidado con el pozo del centro; no todo lo que yace en el fondo duerme.»*\n\n*(El Bot DM ha registrado vuestra decisión en la Bitácora Canónica. La actitud de este PNJ ha pasado a Amistosa).*`;
    } else if (textoMinus.includes('ataco') || textoMinus.includes('disparo') || textoMinus.includes('golpeo') || textoMinus.includes('espada')) {
      llamadas.push({
        nombre: 'solicitar_tirada',
        argumentos: {
          personajeId: 'pj_activo',
          tipoPrueba: 'tiradaAtaque',
          caracteristica: 'fuerza',
          motivo: 'Tirada de Ataque para impactar al adversario con tu arma',
          dificultadCD: 14,
        },
      });
      respuesta = `Desenvainas tu arma con un chasquido metálico y te abalanzas hacia el objetivo buscando un ángulo vulnerable en su guardia.\n\nEl enemigo alza su escudo de roble reforzado en el último segundo mientras prepara un contragolpe.\n\n👉 **Por favor, realiza una Tirada de Ataque (D20)** usando el tirador de dados interactivo. (Recuerda que si portas un arma con Maestría como Derribo o Roce, sus efectos se activarán con tu resultado).`;
    } else if (textoMinus.includes('investigar') || textoMinus.includes('buscar') || textoMinus.includes('miro') || textoMinus.includes('percepcion')) {
      llamadas.push({
        nombre: 'solicitar_tirada',
        argumentos: {
          personajeId: 'pj_activo',
          tipoPrueba: 'pruebaCaracteristica',
          caracteristica: 'sabiduria',
          habilidad: 'percepcion',
          dificultadCD: 13,
          motivo: 'Inspeccionar minuciosamente el entorno en busca de trampas, compartimentos ocultos y rastros',
        },
      });
      respuesta = `Te agachas y pasas los dedos por la junta de las losas de piedra, aguzando la vista entre el polvo y los restos de antorchas apagadas.\n\nEl silencio de la sala solo es roto por el goteo lejano de agua subterránea.\n\n👉 **Haz una prueba de Sabiduría (Percepción o Investigación, CD 13)** para determinar qué descubren tus sentidos.`;
    } else {
      respuesta = `El eco de vuestras palabras resuena contra los muros húmedos de la cripta. Las sombras proyectadas por vuestra antorcha titilan sobre los bajorrelieves que adornan los pilares de piedra.\n\nEl ambiente está cargado de polvo antiguo y una ligera corriente de aire frío proviene del arco que conduce al siguiente pasadizo. ¿Qué hacéis a continuación?`;
    }

    return {
      narrativa: respuesta,
      llamadasHerramientas: llamadas,
      tokensUsados: {
        entrada: contexto.estimacionTokensAproximada,
        salida: Math.ceil(respuesta.length / 4),
        cacheados: Math.ceil(contexto.bloqueSistemaCacheador.length / 4),
      },
    };
  }
}
