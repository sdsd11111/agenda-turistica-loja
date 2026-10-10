import type { ItemBusqueda } from "@/types";
import { CANTONES, getCanton } from "./cantones";
import { HOSPEDAJES } from "./hospedaje";
import { ATRACTIVOS } from "./atractivos";
import { GUIAS } from "./guias";

/** Índice unificado para el buscador de la portada. */
export function construirIndice(): ItemBusqueda[] {
  const loja = getCanton("loja")!;
  return [
    ...CANTONES.map((c): ItemBusqueda => ({
      id: `canton-${c.slug}`, nombre: c.nombre, tipo: "cantones", descripcion: `Cantón · cabecera ${c.cabecera}`,
      href: `/cantones/${c.slug}`, emoji: c.emoji, lat: c.lat, lng: c.lng,
    })),
    ...HOSPEDAJES.map((h): ItemBusqueda => ({
      id: `hospedaje-${h.slug}`, nombre: h.nombre, tipo: "hoteles", descripcion: `${h.tipo} · ${h.zona} · desde $${h.desde}`,
      href: `/hospedaje/${h.slug}`, emoji: "🏨", lat: h.lat, lng: h.lng,
    })),
    ...ATRACTIVOS.map((a): ItemBusqueda => ({
      id: `atractivo-${a.slug}`, nombre: a.nombre, tipo: "atractivos", descripcion: `${a.categoria} · ${a.duracion ?? ""}`.trim(),
      href: `/atractivos#${a.slug}`, emoji: a.emoji, lat: a.lat, lng: a.lng,
    })),
    ...GUIAS.map((g): ItemBusqueda => {
      const c = (g.cantonSlug && getCanton(g.cantonSlug)) || loja;
      return {
        id: `guia-${g.slug}`, nombre: g.titulo, tipo: "guias", descripcion: `${g.duracion} · ${g.nivel}`,
        href: `/guias/${g.slug}`, emoji: "🧭", lat: c.lat, lng: c.lng,
      };
    }),
  ];
}
