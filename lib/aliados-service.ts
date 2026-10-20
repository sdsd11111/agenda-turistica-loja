import { getTurismoDbPool } from './db-turismo';
import { runMigrations } from './db-migrations';

// Ejecutar migraciones al cargar el módulo (idempotente)
runMigrations().catch(() => {});

export interface HabitacionRow {
  id: number;
  aliadoId: number;
  nombre: string;
  precio: string | null;
  caracteristicas: string | null;
  imagenes: string | null;
  orden: number;
  createdAt: Date;
}

export interface AliadoRow {
  id: number;
  nombre: string;
  tipo: 'HOSPEDAJE' | 'GASTRONOMIA' | 'CAFETERIA' | 'EXPERIENCIA' | 'TRANSPORTE' | 'CANTON_GAD' | 'CULTURA_ARTE' | 'COMERCIO' | 'OTRO';
  imagenUrl: string | null;
  servicios: string | null;
  telefono: string | null;
  destacado: number | boolean;
  activo: number | boolean;
  createdAt: Date;
  cuartos: string | null;
  descripcion: string;
  mapaUrl: string | null;
  rangoPrecio: string | null;
  redesUrl: string | null;
  ubicacion: string;
  websiteUrl: string | null;
  ubicacionLat: number | null;
  ubicacionLng: number | null;
  estrellas: number | null;
  numeroCuartos: number | null;
  /** Slug explícito del cantón (ej: 'paltas', 'loja'). NULL si no fue asignado manualmente. */
  canton: string | null;
  habitaciones?: HabitacionRow[];
}

/**
 * Obtiene todos los aliados, opcionalmente filtrados por tipo o estado activo.
 */
export async function getAliados(options: { tipo?: string; soloActivos?: boolean } = {}): Promise<AliadoRow[]> {
  const pool = getTurismoDbPool();
  let query = 'SELECT * FROM aliados WHERE 1=1';
  const params: any[] = [];

  if (options.soloActivos) {
    query += ' AND activo = 1';
  }
  if (options.tipo) {
    query += ' AND tipo = ?';
    params.push(options.tipo);
  }

  query += ' ORDER BY destacado DESC, id ASC';

  const [rows] = await pool.query(query, params);
  const aliados = rows as AliadoRow[];

  if (aliados.length === 0) return [];

  // Traer habitaciones de estos aliados
  const ids = aliados.map((a) => a.id);
  const [habRows] = await pool.query(
    `SELECT * FROM aliado_habitaciones WHERE aliadoId IN (?) ORDER BY orden ASC, id ASC`,
    [ids]
  );
  const habitaciones = habRows as HabitacionRow[];

  const habMap = new Map<number, HabitacionRow[]>();
  for (const hab of habitaciones) {
    if (!habMap.has(hab.aliadoId)) {
      habMap.set(hab.aliadoId, []);
    }
    habMap.get(hab.aliadoId)!.push(hab);
  }

  return aliados.map((a) => ({
    ...a,
    destacado: Boolean(a.destacado),
    activo: Boolean(a.activo),
    habitaciones: habMap.get(a.id) || [],
  }));
}

/**
 * Obtiene un aliado por ID con sus habitaciones.
 */
export async function getAliadoById(id: number): Promise<AliadoRow | null> {
  const pool = getTurismoDbPool();
  const [rows] = await pool.query('SELECT * FROM aliados WHERE id = ?', [id]);
  const arr = rows as AliadoRow[];
  if (arr.length === 0) return null;

  const aliado = arr[0];
  const [habRows] = await pool.query(
    'SELECT * FROM aliado_habitaciones WHERE aliadoId = ? ORDER BY orden ASC, id ASC',
    [id]
  );

  return {
    ...aliado,
    destacado: Boolean(aliado.destacado),
    activo: Boolean(aliado.activo),
    habitaciones: habRows as HabitacionRow[],
  };
}

/**
 * Inserta un aliado en TURISTICA_DB_URL y opcionalmente sus habitaciones.
 */
export async function createAliado(data: {
  nombre: string;
  tipo?: string;
  imagenUrl?: string | null;
  servicios?: string | null;
  telefono?: string | null;
  destacado?: boolean;
  activo?: boolean;
  cuartos?: string | null;
  descripcion: string;
  mapaUrl?: string | null;
  rangoPrecio?: string | null;
  redesUrl?: string | null;
  ubicacion: string;
  websiteUrl?: string | null;
  ubicacionLat?: number | null;
  ubicacionLng?: number | null;
  estrellas?: number | null;
  numeroCuartos?: number | null;
  /** Slug explícito del cantón (ej: 'paltas', 'loja'). Si se omite, se detecta por texto. */
  canton?: string | null;
  habitaciones?: Array<{
    nombre: string;
    precio?: string | null;
    caracteristicas?: string | null;
    imagenes?: string | null;
    orden?: number;
  }>;
}): Promise<number> {
  const pool = getTurismoDbPool();
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const insertQuery = `
      INSERT INTO aliados (
        nombre, tipo, imagenUrl, servicios, telefono,
        destacado, activo, createdAt, cuartos, descripcion,
        mapaUrl, rangoPrecio, redesUrl, ubicacion, websiteUrl,
        ubicacionLat, ubicacionLng, estrellas, numeroCuartos, canton
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.nombre,
      data.tipo || 'HOSPEDAJE',
      data.imagenUrl || null,
      data.servicios || null,
      data.telefono || null,
      data.destacado ? 1 : 0,
      data.activo !== false ? 1 : 0,
      data.cuartos || null,
      data.descripcion || '',
      data.mapaUrl || null,
      data.rangoPrecio || null,
      data.redesUrl || null,
      data.ubicacion || '',
      data.websiteUrl || null,
      data.ubicacionLat ?? null,
      data.ubicacionLng ?? null,
      data.estrellas ?? null,
      data.numeroCuartos ?? null,
      data.canton || null,
    ];

    const [result]: any = await conn.query(insertQuery, values);
    const newAliadoId = result.insertId;

    if (data.habitaciones && Array.isArray(data.habitaciones) && data.habitaciones.length > 0) {
      for (let i = 0; i < data.habitaciones.length; i++) {
        const hab = data.habitaciones[i];
        await conn.query(
          `INSERT INTO aliado_habitaciones (aliadoId, nombre, precio, caracteristicas, imagenes, orden, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [
            newAliadoId,
            hab.nombre,
            hab.precio || null,
            hab.caracteristicas || null,
            hab.imagenes || null,
            hab.orden ?? i,
          ]
        );
      }
    }

    await conn.commit();
    return newAliadoId;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

/**
 * Actualiza un aliado existente y sincroniza sus habitaciones.
 */
export async function updateAliado(
  id: number,
  data: {
    nombre: string;
    tipo?: string;
    imagenUrl?: string | null;
    servicios?: string | null;
    telefono?: string | null;
    destacado?: boolean;
    activo?: boolean;
    cuartos?: string | null;
    descripcion: string;
    mapaUrl?: string | null;
    rangoPrecio?: string | null;
    redesUrl?: string | null;
    ubicacion: string;
    websiteUrl?: string | null;
    ubicacionLat?: number | null;
    ubicacionLng?: number | null;
    estrellas?: number | null;
    numeroCuartos?: number | null;
    /** Slug explícito del cantón (ej: 'paltas', 'loja'). */
    canton?: string | null;
    habitaciones?: Array<{
      id?: number;
      nombre: string;
      precio?: string | null;
      caracteristicas?: string | null;
      imagenes?: string | null;
      orden?: number;
    }>;
  }
): Promise<void> {
  const pool = getTurismoDbPool();
  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const updateQuery = `
      UPDATE aliados SET
        nombre = ?,
        tipo = ?,
        imagenUrl = ?,
        servicios = ?,
        telefono = ?,
        destacado = ?,
        activo = ?,
        cuartos = ?,
        descripcion = ?,
        mapaUrl = ?,
        rangoPrecio = ?,
        redesUrl = ?,
        ubicacion = ?,
        websiteUrl = ?,
        ubicacionLat = ?,
        ubicacionLng = ?,
        estrellas = ?,
        numeroCuartos = ?,
        canton = ?
      WHERE id = ?
    `;

    const values = [
      data.nombre,
      data.tipo || 'HOSPEDAJE',
      data.imagenUrl || null,
      data.servicios || null,
      data.telefono || null,
      data.destacado ? 1 : 0,
      data.activo !== false ? 1 : 0,
      data.cuartos || null,
      data.descripcion || '',
      data.mapaUrl || null,
      data.rangoPrecio || null,
      data.redesUrl || null,
      data.ubicacion || '',
      data.websiteUrl || null,
      data.ubicacionLat ?? null,
      data.ubicacionLng ?? null,
      data.estrellas ?? null,
      data.numeroCuartos ?? null,
      data.canton || null,
      id,
    ];

    await conn.query(updateQuery, values);

    // Si se enviaron habitaciones, actualizar limpiamente
    if (data.habitaciones !== undefined && Array.isArray(data.habitaciones)) {
      await conn.query('DELETE FROM aliado_habitaciones WHERE aliadoId = ?', [id]);
      for (let i = 0; i < data.habitaciones.length; i++) {
        const hab = data.habitaciones[i];
        if (!hab.nombre || !hab.nombre.trim()) continue;
        await conn.query(
          `INSERT INTO aliado_habitaciones (aliadoId, nombre, precio, caracteristicas, imagenes, orden, createdAt)
           VALUES (?, ?, ?, ?, ?, ?, NOW())`,
          [
            id,
            hab.nombre,
            hab.precio || null,
            hab.caracteristicas || null,
            hab.imagenes || null,
            hab.orden ?? i,
          ]
        );
      }
    }

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

/**
 * Elimina un aliado y sus habitaciones en cascada.
 */
export async function deleteAliado(id: number): Promise<void> {
  const pool = getTurismoDbPool();
  await pool.query('DELETE FROM aliado_habitaciones WHERE aliadoId = ?', [id]);
  await pool.query('DELETE FROM aliados WHERE id = ?', [id]);
}

/**
 * Normaliza y extrae un precio numérico "desde" a partir de string como "$45 / noche" o "$45 - $80"
 */
function parsearPrecioDesde(rangoOPrecio: string | null | undefined): number {
  if (!rangoOPrecio) return 30;
  const match = rangoOPrecio.match(/\$?(\d+)/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (!isNaN(num) && num > 0) return num;
  }
  return 30;
}

/**
 * Detecta el slug del cantón a partir del texto de ubicación o descripción.
 */
function detectarCantonSlug(ubicacion: string, descripcion: string): string {
  const texto = `${ubicacion} ${descripcion}`.toLowerCase();
  const cantones = [
    { slug: 'vilcabamba', keywords: ['vilcabamba'] },
    { slug: 'catamayo', keywords: ['catamayo'] },
    { slug: 'saraguro', keywords: ['saraguro'] },
    { slug: 'calvas', keywords: ['calvas', 'cariamanga'] },
    { slug: 'paltas', keywords: ['paltas', 'catacocha'] },
    { slug: 'macara', keywords: ['macará', 'macara'] },
    { slug: 'puyango', keywords: ['puyango', 'alamor'] },
    { slug: 'zapotillo', keywords: ['zapotillo', 'guayacanes'] },
    { slug: 'celica', keywords: ['celica'] },
    { slug: 'chaguarpamba', keywords: ['chaguarpamba'] },
    { slug: 'espindola', keywords: ['espíndola', 'espindola', 'amaluza'] },
    { slug: 'gonzanama', keywords: ['gonzanamá', 'gonzanama'] },
    { slug: 'olmedo', keywords: ['olmedo'] },
    { slug: 'pindal', keywords: ['pindal'] },
    { slug: 'quilanga', keywords: ['quilanga'] },
    { slug: 'sozoranga', keywords: ['sozoranga'] },
    { slug: 'loja', keywords: ['loja', 'centro'] },
  ];

  for (const c of cantones) {
    if (c.keywords.some((k) => texto.includes(k))) {
      // Vilcabamba pertenece administrativamente al cantón Loja en la web
      if (c.slug === 'vilcabamba') return 'loja';
      return c.slug;
    }
  }
  return 'loja';
}


/**
 * Convierte un AliadoRow en la estructura Hospedaje consumida por el frontend
 */
export function adaptarAliadoAHospedaje(aliado: AliadoRow) {
  const serviciosArray = aliado.servicios
    ? aliado.servicios.split(/[,;\n•]+/).map((s) => s.trim()).filter(Boolean)
    : ['Wi-Fi', 'Atención directa'];

  // Determinar tipo legible
  let tipoFormateado: 'Hotel' | 'Hostal' | 'Hostería' | 'Hacienda' | 'Casa rural' = 'Hotel';
  const nombreMin = aliado.nombre.toLowerCase();
  if (nombreMin.includes('hostal')) tipoFormateado = 'Hostal';
  else if (nombreMin.includes('hostería') || nombreMin.includes('hosteria')) tipoFormateado = 'Hostería';
  else if (nombreMin.includes('hacienda')) tipoFormateado = 'Hacienda';
  else if (nombreMin.includes('casa rural') || nombreMin.includes('cabaña')) tipoFormateado = 'Casa rural';

  // Extraer precio más económico de habitaciones o de rangoPrecio
  let menorPrecio = parsearPrecioDesde(aliado.rangoPrecio);
  if (aliado.habitaciones && aliado.habitaciones.length > 0) {
    for (const h of aliado.habitaciones) {
      if (h.precio) {
        const p = parsearPrecioDesde(h.precio);
        if (p < menorPrecio) menorPrecio = p;
      }
    }
  }

  const slug = `aliado-${aliado.id}-${aliado.nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;

  // Prioridad: campo `canton` explícito → detección automática por texto
  const cantonSlug = aliado.canton ||
    detectarCantonSlug(aliado.ubicacion || '', aliado.descripcion || '');

  return {
    id: aliado.id,
    slug,
    nombre: aliado.nombre,
    tipo: tipoFormateado,
    cantonSlug,
    zona: aliado.ubicacion || 'Loja, Ecuador',
    descripcion: aliado.descripcion || 'Establecimiento aliado verificado de Agenda Turística Loja.',
    desde: menorPrecio,
    servicios: serviciosArray,
    verificado: Boolean(aliado.activo),
    demo: false,
    destacado: Boolean(aliado.destacado),
    lat: aliado.ubicacionLat || -3.9965,
    lng: aliado.ubicacionLng || -79.201,
    gradient: 'linear-gradient(135deg,#1B4332,#2D6A4F 60%,#52B788)',
    imagen: aliado.imagenUrl || undefined,
    telefono: aliado.telefono || undefined,
    websiteUrl: aliado.websiteUrl || undefined,
    mapaUrl: aliado.mapaUrl || undefined,
    habitaciones: aliado.habitaciones || [],
  };
}

/**
 * Obtiene todos los hospedajes activos desde TURISTICA_DB_URL listos para catálogo
 */
export async function getHospedajesDinamicos() {
  try {
    const aliados = await getAliados({ tipo: 'HOSPEDAJE', soloActivos: true });
    return aliados.map(adaptarAliadoAHospedaje);
  } catch (error) {
    console.error('Error cargando hospedajes dinámicos desde TURISTICA_DB_URL:', error);
    return [];
  }
}
