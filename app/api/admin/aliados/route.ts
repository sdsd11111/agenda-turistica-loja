import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAliados, createAliado } from '@/lib/aliados-service';

const AUTH_COOKIE_NAME = 'admin_session_token';
const AUTH_SECRET_VALUE = 'authenticated_loja_admin_2026';

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  return token?.value === AUTH_SECRET_VALUE;
}

// GET: Listar todos los aliados (para el panel admin)
export async function GET(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo') || undefined;
    const aliados = await getAliados({ tipo });
    return NextResponse.json({ success: true, aliados });
  } catch (err: any) {
    console.error('Error GET /api/admin/aliados:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST: Crear nuevo aliado
export async function POST(request: Request) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const {
      nombre,
      tipo = 'HOSPEDAJE',
      imagenUrl,
      servicios,
      telefono,
      destacado,
      activo,
      cuartos,
      descripcion,
      mapaUrl,
      rangoPrecio,
      redesUrl,
      ubicacion,
      websiteUrl,
      ubicacionLat,
      ubicacionLng,
      estrellas,
      numeroCuartos,
      habitaciones,
    } = data;

    if (!nombre || !nombre.trim()) {
      return NextResponse.json({ error: 'El nombre es obligatorio' }, { status: 400 });
    }

    const id = await createAliado({
      nombre: nombre.trim(),
      tipo,
      imagenUrl: imagenUrl || null,
      servicios: servicios || null,
      telefono: telefono ? telefono.trim() : null,
      destacado: Boolean(destacado),
      activo: activo !== false,
      cuartos: cuartos || null,
      descripcion: descripcion || '',
      mapaUrl: mapaUrl || null,
      rangoPrecio: rangoPrecio || null,
      redesUrl: redesUrl || null,
      ubicacion: ubicacion || '',
      websiteUrl: websiteUrl || null,
      ubicacionLat: ubicacionLat ? Number(ubicacionLat) : null,
      ubicacionLng: ubicacionLng ? Number(ubicacionLng) : null,
      estrellas: estrellas ? Number(estrellas) : null,
      numeroCuartos: numeroCuartos ? Number(numeroCuartos) : null,
      habitaciones: Array.isArray(habitaciones) ? habitaciones : [],
    });

    return NextResponse.json({ success: true, id });
  } catch (err: any) {
    console.error('Error POST /api/admin/aliados:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
