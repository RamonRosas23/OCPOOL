import { NextRequest, NextResponse } from 'next/server';

const emailDestino = 'info@ocpool.com';

function isValidEmail(value: unknown): value is string {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const { nombre, telefono, email, tipoProyecto, ubicacion, mensaje } = body;

    if (
      !isNonEmpty(nombre) ||
      !isNonEmpty(telefono) ||
      !isValidEmail(email) ||
      !isNonEmpty(tipoProyecto) ||
      !isNonEmpty(ubicacion) ||
      !isNonEmpty(mensaje)
    ) {
      return NextResponse.json({ error: 'Completa todos los campos requeridos.' }, { status: 400 });
    }

    const fechaActual = new Date();
    const asunto = `[OCPOOL] Solicitud de proyecto de alberca - ${nombre.trim()}`;
    const cuerpo = `Nueva solicitud de proyecto de alberca

INFORMACIÓN DEL CONTACTO
Nombre: ${nombre.trim()}
Teléfono: ${telefono.trim()}
Correo: ${email.trim()}

PROYECTO
Tipo: ${tipoProyecto.trim()}
Ubicación: ${ubicacion.trim()}

MENSAJE
${mensaje.trim()}

Fecha: ${fechaActual.toLocaleDateString('es-MX')}
Hora: ${fechaActual.toLocaleTimeString('es-MX')}`;

    const mailtoUrl = `mailto:${emailDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    return NextResponse.json({ success: true, mailtoUrl }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'No fue posible preparar la solicitud.' }, { status: 500 });
  }
}
