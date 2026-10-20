import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAliadoById, updateAliado, deleteAliado } from '@/lib/aliados-service';

const AUTH_COOKIE_NAME = 'admin_session_token';
const AUTH_SECRET_VALUE = 'authenticated_loja_admin_2026';

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);
  return token?.value === AUTH_SECRET_VALUE;
}

// GET: Obtener un aliado individual con sus habitaciones
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const aliado = await getAliadoById(Number(id));
    if (!aliado) {
      return NextResponse.json({ error: 'Aliado no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, aliado });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PUT: Actualizar un aliado y sus habitaciones
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await request.json();
    const aliadoId = Number(id);

    await updateAliado(aliadoId, {
      nombre: data.nombre.trim(),
      tipo: data.tipo || 'HOSPEDAJE',
      imagenUrl: data.imagenUrl || null,
      servicios: data.servicios || null,
      telefono: data.telefono ? data.telefono.trim() : null,
      destacado: Boolean(data.destacado),
      activo: data.activo !== false,
      cuartos: data.cuartos || null,
      descripcion: data.descripcion || '',
      mapaUrl: data.mapaUrl || null,
      rangoPrecio: data.rangoPrecio || null,
      redesUrl: data.redesUrl || null,
      ubicacion: data.ubicacion || '',
      websiteUrl: data.websiteUrl || null,
      ubicacionLat: data.ubicacionLat ? Number(data.ubicacionLat) : null,
      ubicacionLng: data.ubicacionLng ? Number(data.ubicacionLng) : null,
      estrellas: data.estrellas ? Number(data.estrellas) : null,
      numeroCuartos: data.numeroCuartos ? Number(data.numeroCuartos) : null,
      canton: data.canton ? String(data.canton).trim().toLowerCase() : null,
      habitaciones: data.habitaciones,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error PUT /api/admin/aliados/[id]:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE: Eliminar aliado y sus habitaciones
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteAliado(Number(id));
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Error DELETE /api/admin/aliados/[id]:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
