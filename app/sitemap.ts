import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CANTONES } from "@/lib/data/cantones";
import { HOSPEDAJES } from "@/lib/data/hospedaje";
import { FALLBACK_POSTS } from "@/lib/blog";
import { getAtractivosDinamicos, getGuiasDinamicas } from "@/lib/services/turismoService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hoy = new Date().toISOString().split("T")[0];

  const estaticas = [
    { ruta: "", prioridad: 1.0, freq: "daily" as const },
    { ruta: "/atractivos", prioridad: 0.95, freq: "weekly" as const },
    { ruta: "/cantones", prioridad: 0.95, freq: "weekly" as const },
    { ruta: "/guias", prioridad: 0.95, freq: "weekly" as const },
    { ruta: "/hospedaje", prioridad: 0.9, freq: "weekly" as const },
    { ruta: "/eventos", prioridad: 0.9, freq: "daily" as const },
    { ruta: "/blog", prioridad: 0.85, freq: "weekly" as const },
    { ruta: "/auxilio-en-ruta", prioridad: 0.8, freq: "monthly" as const },
    { ruta: "/municipios", prioridad: 0.7, freq: "monthly" as const },
    { ruta: "/contacto", prioridad: 0.6, freq: "monthly" as const },
  ];

  // Obtener atractivos y guías dinámicos desde la base de datos
  const [atractivosDb, guiasDb] = await Promise.all([
    getAtractivosDinamicos(),
    getGuiasDinamicas(),
  ]);

  return [
    ...estaticas.map((e) => ({
      url: `${SITE.url}${e.ruta}`,
      lastModified: hoy,
      changeFrequency: e.freq,
      priority: e.prioridad,
    })),
    // 53+ Atractivos turísticos dinámicos
    ...atractivosDb.map((a) => ({
      url: `${SITE.url}/atractivos/${a.slug}`,
      lastModified: hoy,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    // Guías turísticas dinámicas
    ...guiasDb.map((g) => ({
      url: `${SITE.url}/guias/${g.slug}`,
      lastModified: g.fecha ?? hoy,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    // 16 Cantones de la provincia
    ...CANTONES.map((c) => ({
      url: `${SITE.url}/cantones/${c.slug}`,
      lastModified: hoy,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    // Hospedajes
    ...HOSPEDAJES.map((h) => ({
      url: `${SITE.url}/hospedaje/${h.slug}`,
      lastModified: hoy,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    // Posts de Blog
    ...FALLBACK_POSTS.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: p.fecha_publicacion || hoy,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

