export const SITE = {
  nombre: "Agenda Turística Loja",
  marca: "Descubre Loja",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://agendaturisticaloja.com",
  /** Mismo número de GuIAloja. Se configura en .env.local (NEXT_PUBLIC_WHATSAPP). */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "",
  descripcion:
    "Directorio turístico verificado de los 16 cantones de la provincia de Loja, Ecuador: hospedaje, atractivos, guías y auxilio en carretera. Contacto directo por WhatsApp, sin comisiones.",
  ecosistema: [
    { label: "guialoja.com", href: "https://guialoja.com" },
    { label: "agendaculturalloja.com", href: "https://agendaculturalloja.com" },
    { label: "quecomerenloja.com", href: "https://quecomerenloja.com" },
  ],
} as const;

export const SITE_URL = SITE.url;


export const NAV_LINKS = [
  { href: "/cantones", label: "Cantones" },
  { href: "/hospedaje", label: "Hospedaje" },
  { href: "/atractivos", label: "Atractivos" },
  { href: "/guias", label: "Guías" },
  { href: "/blog", label: "Blog" },
  { href: "/para-negocios", label: "Para negocios" },
] as const;

