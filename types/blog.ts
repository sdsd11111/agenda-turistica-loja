// ── Tipo para artículos del Blog (leer de MySQL en producción) ──
export type BlogPost = {
  id: number;
  slug: string;
  titulo: string;
  resumen: string;               // meta description / excerpt
  contenido: string;             // HTML o markdown del cuerpo
  imagen: string;                // URL de imagen destacada
  imagen_alt: string;            // alt text SEO de la imagen
  categoria: string;             // tag principal p.ej. "Turismo", "Naturaleza", "Gastronomía"
  etiquetas: string[];           // tags adicionales
  canton_slug?: string;          // cantón relacionado
  autor: string;
  fecha_publicacion: string;     // ISO "2026-10-01"
  fecha_modificacion?: string;   // para lastModified en sitemap
  publicado: boolean;
  tiempo_lectura?: number;       // en minutos
};
