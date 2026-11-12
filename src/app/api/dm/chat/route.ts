import { NextRequest, NextResponse } from 'next/server';
import { ensamblarPromptParaDM } from '@/motor/memoria/ensambladorPrompt';
import { LedgerEventos } from '@/motor/memoria/ledgerEventos';
import { ClienteBotDM, ProveedorIA } from '@/motor/ia/clienteLLM';
import { EstadoCampanaSchema } from '@/esquemas/campana';
import { FichaPersonajeSchema } from '@/esquemas/personaje';
import { z } from 'zod';

const PeticionChatDMSchema = z.object({
  mensajeJugador: z.string(),
  campana: EstadoCampanaSchema,
  fichasPersonajes: z.array(FichaPersonajeSchema),
  proveedorIA: z.enum(['claude', 'openai', 'gemini', 'mock']).default('mock'),
  apiKey: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validacion = PeticionChatDMSchema.safeParse(body);

    if (!validacion.success) {
      return NextResponse.json(
        { error: 'Datos de petición inválidos', detalles: validacion.error.format() },
        { status: 400 }
      );
    }

    const { mensajeJugador, campana, fichasPersonajes, proveedorIA, apiKey } = validacion.data;

    // Reconstruir el Ledger con los eventos actuales
    const ledger = new LedgerEventos(campana.ledgerDecisiones);

    // Ensamblar prompt contextual dinámico ultra-eficiente
    const contexto = ensamblarPromptParaDM({
      campana,
      fichasPersonajes,
      ledger,
    });

    // Instanciar cliente LLM
    const cliente = new ClienteBotDM({
      proveedor: proveedorIA as ProveedorIA,
      apiKey: apiKey || process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY,
    });

    const respuesta = await cliente.generarTurno(contexto, mensajeJugador);

    return NextResponse.json({
      exito: true,
      narrativa: respuesta.narrativa,
      llamadasHerramientas: respuesta.llamadasHerramientas,
      tokensUsados: respuesta.tokensUsados,
    });
  } catch (error: any) {
    console.error('Error en API Route /api/dm/chat:', error);
    return NextResponse.json(
      { error: 'Error interno en el servidor DM', mensaje: error.message },
      { status: 500 }
    );
  }
}
