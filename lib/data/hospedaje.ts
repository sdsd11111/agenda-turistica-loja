import type { Hospedaje } from "@/types";

// Las propiedades y aliados se cargan dinámicamente desde la base de datos `TURISTICA_DB_URL` (tabla `aliados`).
// Mantenemos el array vacío para compatibilidad de tipos y fallbacks.
export const HOSPEDAJES: Hospedaje[] = [];

export const getHospedaje = (slug: string) => HOSPEDAJES.find((h) => h.slug === slug);

