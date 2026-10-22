import { getTurismoDbPool } from "@/lib/db-turismo";
import { ATRACTIVOS } from "@/lib/data/atractivos";
import { GUIAS } from "@/lib/data/guias";
import type { Atractivo, Guia, GuiaSeccion } from "@/types";

export interface AtractivoDinamico extends Atractivo {
  id?: number;
  canton?: string;
  distancia?: string;
  ruta?: string;
  mapaUrl?: string;
}

export interface GuiaDinamica extends Guia {
  id?: number;
}

/**
 * Obtener todos los atractivos activos desde MySQL con fallback seguro
 */
export async function getAtractivosDinamicos(): Promise<AtractivoDinamico[]> {
  try {
    const pool = getTurismoDbPool();
    const [rows]: any = await pool.query(
      `SELECT id, nombre, slug, canton, cantonSlug, categoria, emoji, descripcion,
              duracion, distancia, ruta, imagenUrl, mapaUrl, lat, lng, gradient
       FROM atractivos_cantonales
       WHERE activo = 1 AND slug IS NOT NULL
       ORDER BY id ASC;`
    );

    if (rows && rows.length > 0) {
      return rows.map((r: any) => ({
        id: r.id,
        nombre: r.nombre,
        slug: r.slug,
        canton: r.canton || "Loja",
        cantonSlug: r.cantonSlug || "loja",
        categoria: r.categoria || "Patrimonio",
        emoji: r.emoji || "📍",
        descripcion: r.descripcion || "",
        duracion: r.duracion || undefined,
        distancia: r.distancia || undefined,
        ruta: r.ruta || undefined,
        imagen: r.imagenUrl || undefined,
        mapaUrl: r.mapaUrl || undefined,
        lat: Number(r.lat) || -3.9931,
        lng: Number(r.lng) || -79.2042,
        gradient: r.gradient || "linear-gradient(135deg,#1B4332,#8B7355)",
      }));
    }
  } catch (err) {
    console.error("[turismoService] Error al consultar atractivos de DB:", err);
  }

  // Fallback a memoria estática
  return ATRACTIVOS.map((a) => ({
    ...a,
    canton: "Loja",
  }));
}

/**
 * Obtener un atractivo por su slug desde MySQL
 */
export async function getAtractivoDinamicoBySlug(slug: string): Promise<AtractivoDinamico | null> {
  try {
    const pool = getTurismoDbPool();
    const [rows]: any = await pool.query(
      `SELECT id, nombre, slug, canton, cantonSlug, categoria, emoji, descripcion,
              duracion, distancia, ruta, imagenUrl, mapaUrl, lat, lng, gradient
       FROM atractivos_cantonales
       WHERE slug = ? AND activo = 1
       LIMIT 1;`,
      [slug]
    );

    if (rows && rows.length > 0) {
      const r = rows[0];
      return {
        id: r.id,
        nombre: r.nombre,
        slug: r.slug,
        canton: r.canton || "Loja",
        cantonSlug: r.cantonSlug || "loja",
        categoria: r.categoria || "Patrimonio",
        emoji: r.emoji || "📍",
        descripcion: r.descripcion || "",
        duracion: r.duracion || undefined,
        distancia: r.distancia || undefined,
        ruta: r.ruta || undefined,
        imagen: r.imagenUrl || undefined,
        mapaUrl: r.mapaUrl || undefined,
        lat: Number(r.lat) || -3.9931,
        lng: Number(r.lng) || -79.2042,
        gradient: r.gradient || "linear-gradient(135deg,#1B4332,#8B7355)",
      };
    }
  } catch (err) {
    console.error(`[turismoService] Error buscando atractivo por slug '${slug}':`, err);
  }

  // Fallback
  const found = ATRACTIVOS.find((a) => a.slug === slug);
  if (found) {
    return { ...found, canton: "Loja" };
  }
  return null;
}

/**
 * Obtener atractivos por cantón
 */
export async function getAtractivosByCanton(cantonSlug: string): Promise<AtractivoDinamico[]> {
  const todos = await getAtractivosDinamicos();
  return todos.filter((a) => a.cantonSlug.toLowerCase() === cantonSlug.toLowerCase());
}

/**
 * Obtener todas las guías turísticas activas desde MySQL
 */
export async function getGuiasDinamicas(): Promise<GuiaDinamica[]> {
  try {
    const pool = getTurismoDbPool();
    const [rows]: any = await pool.query(
      `SELECT id, slug, cantonSlug, titulo, resumen, categoria, duracion, nivel,
              imagenUrl, gradient, keywords, secciones
       FROM guias_turisticas
       WHERE activo = 1 AND slug IS NOT NULL
       ORDER BY id ASC;`
    );

    if (rows && rows.length > 0) {
      return rows.map((r: any) => {
        let parsedSecciones: GuiaSeccion[] = [];
        try {
          parsedSecciones = typeof r.secciones === "string" ? JSON.parse(r.secciones) : r.secciones;
        } catch {
          parsedSecciones = [];
        }

        let parsedKeywords: string[] = [];
        try {
          parsedKeywords = typeof r.keywords === "string" ? JSON.parse(r.keywords) : (r.keywords || []);
        } catch {
          parsedKeywords = [];
        }

        return {
          id: r.id,
          slug: r.slug,
          cantonSlug: r.cantonSlug || "loja",
          titulo: r.titulo,
          resumen: r.resumen,
          categoria: r.categoria || "Rutas",
          duracion: r.duracion || "1 día",
          nivel: (r.nivel as "Fácil" | "Moderado") || "Fácil",
          imagen: r.imagenUrl || undefined,
          gradient: r.gradient || "linear-gradient(135deg,#1B4332,#2D6A8B)",
          fecha: "2026-10-22",
          keywords: Array.isArray(parsedKeywords) ? parsedKeywords : [],
          secciones: Array.isArray(parsedSecciones) ? parsedSecciones : [],
        };
      });
    }
  } catch (err) {
    console.error("[turismoService] Error al consultar guías de DB:", err);
  }

  // Fallback
  return GUIAS;
}

/**
 * Obtener una guía por su slug desde MySQL
 */
export async function getGuiaDinamicaBySlug(slug: string): Promise<GuiaDinamica | null> {
  try {
    const pool = getTurismoDbPool();
    const [rows]: any = await pool.query(
      `SELECT id, slug, cantonSlug, titulo, resumen, categoria, duracion, nivel,
              imagenUrl, gradient, keywords, secciones
       FROM guias_turisticas
       WHERE slug = ? AND activo = 1
       LIMIT 1;`,
      [slug]
    );

    if (rows && rows.length > 0) {
      const r = rows[0];
      let parsedSecciones: GuiaSeccion[] = [];
      try {
        parsedSecciones = typeof r.secciones === "string" ? JSON.parse(r.secciones) : r.secciones;
      } catch {
        parsedSecciones = [];
      }

      let parsedKeywords: string[] = [];
      try {
        parsedKeywords = typeof r.keywords === "string" ? JSON.parse(r.keywords) : (r.keywords || []);
      } catch {
        parsedKeywords = [];
      }

      return {
        id: r.id,
        slug: r.slug,
        cantonSlug: r.cantonSlug || "loja",
        titulo: r.titulo,
        resumen: r.resumen,
        categoria: r.categoria || "Rutas",
        duracion: r.duracion || "1 día",
        nivel: (r.nivel as "Fácil" | "Moderado") || "Fácil",
        imagen: r.imagenUrl || undefined,
        gradient: r.gradient || "linear-gradient(135deg,#1B4332,#2D6A8B)",
        fecha: "2026-10-22",
        keywords: Array.isArray(parsedKeywords) ? parsedKeywords : [],
        secciones: Array.isArray(parsedSecciones) ? parsedSecciones : [],
      };
    }
  } catch (err) {
    console.error(`[turismoService] Error buscando guía por slug '${slug}':`, err);
  }

  // Fallback
  const found = GUIAS.find((g) => g.slug === slug);
  return found || null;
}

/**
 * Obtener guías por cantón
 */
export async function getGuiasByCanton(cantonSlug: string): Promise<GuiaDinamica[]> {
  const todas = await getGuiasDinamicas();
  return todas.filter((g) => g.cantonSlug?.toLowerCase() === cantonSlug.toLowerCase());
}
