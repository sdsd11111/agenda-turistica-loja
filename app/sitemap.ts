import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CANTONES } from "@/lib/data/cantones";
import { HOSPEDAJES } from "@/lib/data/hospedaje";
import { GUIAS } from "@/lib/data/guias";
import { FALLBACK_POSTS } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const hoy = new Date().toISOString().split("T")[0];

  const estaticas = [
    { ruta: "", prioridad: 1.0, freq: "weekly" as const },
    { ruta: "/atractivos", prioridad: 0.9, freq: "weekly" as const },
    { ruta: "/cantones", prioridad: 0.9, freq: "weekly" as const },
    { ruta: "/hospedaje", prioridad: 0.9, freq: "weekly" as const },
    { ruta: "/guias", prioridad: 0.9, freq: "weekly" as const },
    { ruta: "/blog", prioridad: 0.9, freq: "weekly" as const },
    { ruta: "/auxilio-en-ruta", prioridad: 0.8, freq: "monthly" as const },
    { ruta: "/para-negocios", prioridad: 0.7, freq: "monthly" as const },
    { ruta: "/municipios", prioridad: 0.7, freq: "monthly" as const },
    { ruta: "/contacto", prioridad: 0.6, freq: "monthly" as const },
  ];

  return [
    ...estaticas.map((e) => ({
      url: `${SITE.url}${e.ruta}`,
      lastModified: hoy,
      changeFrequency: e.freq,
      priority: e.prioridad,
    })),
    ...CANTONES.map((c) => ({
      url: `${SITE.url}/cantones/${c.slug}`,
      lastModified: hoy,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...HOSPEDAJES.map((h) => ({
      url: `${SITE.url}/hospedaje/${h.slug}`,
      lastModified: hoy,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...GUIAS.map((g) => ({
      url: `${SITE.url}/guias/${g.slug}`,
      lastModified: g.fecha ?? hoy,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...FALLBACK_POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: p.fecha_publicacion || hoy,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

