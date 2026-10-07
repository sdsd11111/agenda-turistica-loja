import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { CANTONES } from "@/lib/data/cantones";
import { HOSPEDAJES } from "@/lib/data/hospedaje";
import { GUIAS } from "@/lib/data/guias";

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas = ["", "/cantones", "/hospedaje", "/atractivos", "/auxilio-en-ruta", "/descubre-loja", "/para-negocios", "/municipios", "/contacto"];
  return [
    ...estaticas.map((r) => ({ url: `${SITE.url}${r}`, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.7 })),
    ...CANTONES.map((c) => ({ url: `${SITE.url}/cantones/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...HOSPEDAJES.map((h) => ({ url: `${SITE.url}/hospedaje/${h.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...GUIAS.map((g) => ({ url: `${SITE.url}/descubre-loja/${g.slug}`, lastModified: g.fecha, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
