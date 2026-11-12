import { NextRequest, NextResponse } from 'next/server';

// Almacén en memoria persistente durante el ciclo de vida del contenedor/servidor
const ALMACEN_SALAS: Record<string, any> = {};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ idSala: string }> }
) {
  const { idSala } = await params;
  const sala = ALMACEN_SALAS[idSala];

  if (!sala) {
    return NextResponse.json(
      { error: 'Sala no encontrada', idSala },
      { status: 404 }
    );
  }

  return NextResponse.json({
    exito: true,
    sala,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ idSala: string }> }
) {
  try {
    const { idSala } = await params;
    const body = await req.json();

    // Actualizar o crear la sala en el almacén serverless
    ALMACEN_SALAS[idSala] = {
      ...body,
      idSala,
      ultimaActualizacion: Date.now(),
    };

    return NextResponse.json({
      exito: true,
      mensaje: 'Estado de sala sincronizado exitosamente',
      idSala,
      ultimaActualizacion: ALMACEN_SALAS[idSala].ultimaActualizacion,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error al sincronizar sala', mensaje: error.message },
      { status: 500 }
    );
  }
}
