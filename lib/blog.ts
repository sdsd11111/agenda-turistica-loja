import { BlogPost } from '@/types/blog';
import { getDbPool, initDb } from './db';

// Artículos de fallback para cuando MySQL no responde (por ejemplo en local con IP bloqueada)
export const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'guia-completa-florecimiento-guayacanes-mangahurco',
    titulo: 'Guía Completa para Vivir el Florecimiento de los Guayacanes en Mangahurco (Zapotillo)',
    resumen: 'Todo lo que necesitas saber para presenciar uno de los espectáculos naturales más impresionantes del sur del Ecuador: fechas, cómo llegar, hospedaje y recomendaciones.',
    contenido: `
      <h2>El mayor espectáculo natural del sur del Ecuador</h2>
      <p>Cada año, con las primeras lluvias del invierno, más de 40.000 hectáreas del bosque seco protegido de Zapotillo se transforman en una inmensa alfombra amarilla dorada. Este fenómeno natural, conocido como el <strong>florecimiento de los guayacanes</strong>, dura tan solo entre 4 y 6 días, atrayendo a miles de viajeros y amantes de la fotografía de todo el continente.</p>
      
      <h2>¿Cuándo ocurre el florecimiento?</h2>
      <p>Suele darse entre finales de diciembre y mediados de enero, dependiendo del inicio exacto de la temporada de lluvias. Las parroquias principales para apreciarlo son <strong>Mangahurco, Bolaspamba y Cazaderos</strong>.</p>
      
      <h2>¿Cómo llegar desde Loja o Guayaquil?</h2>
      <p>Desde la ciudad de Loja son aproximadamente 4 horas y media por la vía Catamayo - Catacocha - Celica - Pindal - Zapotillo. Se recomienda viajar en vehículos todo terreno o vehículos altos para acceder a los senderos interiores del bosque.</p>

      <h2>Consejos indispensables para tu visita</h2>
      <ul>
        <li>Reserva hospedaje o zona de camping con semanas de anticipación en Mangahurco o Zapotillo.</li>
        <li>Lleva abundante agua, repelente ecológico y protector solar factor 50+.</li>
        <li>Respeta la flora: no arranques ramas ni dejes basura en los senderos.</li>
        <li>Prueba el tradicional chivo al hueco en los comedores locales.</li>
      </ul>
    `,
    imagen: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1200&auto=format&fit=crop',
    imagen_alt: 'Bosque de guayacanes amarillos florecidos en Mangahurco Zapotillo Loja',
    categoria: 'Naturaleza',
    etiquetas: ['Guayacanes', 'Zapotillo', 'Mangahurco', 'Ecoturismo', 'Fotografía'],
    canton_slug: 'zapotillo',
    autor: 'Agenda Turística Loja',
    fecha_publicacion: '2026-10-01',
    publicado: true,
    tiempo_lectura: 6,
  },
  {
    id: 2,
    slug: 'ruta-del-cafe-especial-vilcabamba-quilanga',
    titulo: 'La Ruta del Café de Especialidad en Loja: De Vilcabamba a Quilanga y Chaguarpamba',
    resumen: 'Descubre por qué la provincia de Loja produce los cafés premiados con Taza de Excelencia más codiciados del planeta. Fincas turísticas, catas y paisajes de altura.',
    contenido: `
      <h2>Loja: Cuna de los mejores cafés del Ecuador</h2>
      <p>La combinación de microclimas andinos, suelos ricos en minerales y alturas entre los 1.500 y 2.200 m s.n.m. convierten a la provincia de Loja en un paraíso cafetero de clase mundial. Variedades como Típica Mejorada, Geisha, Bourbon y Sidra alcanzan notas florales y frutales inigualables.</p>
      
      <h2>Principales cantones de la ruta cafetera</h2>
      <p><strong>Vilcabamba (Cantón Loja):</strong> Fincas ecológicas donde puedes vivir la experiencia desde la cosecha hasta el tueste artesanal.</p>
      <p><strong>Quilanga:</strong> Tierra de productores galardonados con la Taza Dorada. El clima de páramo templado le otorga una acidez brillante.</p>
      <p><strong>Chaguarpamba:</strong> Tradición cafetalera centenaria y paisajes de colinas verdes inolvidables.</p>

      <h2>¿Dónde degustar y comprar café en grano?</h2>
      <p>En el centro histórico de Loja y en la calle 10 de Agosto encontrarás cafeterías especializadas que realizan métodos de filtrado V60, Chemex y Aeropress.</p>
    `,
    imagen: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    imagen_alt: 'Taza de café lojano de especialidad y granos tostados',
    categoria: 'Gastronomía',
    etiquetas: ['Café', 'Vilcabamba', 'Quilanga', 'Chaguarpamba', 'Rutas'],
    canton_slug: 'loja',
    autor: 'Agenda Turística Loja',
    fecha_publicacion: '2026-09-25',
    publicado: true,
    tiempo_lectura: 5,
  },
  {
    id: 3,
    slug: 'que-hacer-saraguro-cultura-viva-andes',
    titulo: 'Qué Hacer en Saraguro: Turismo Comunitario y Sabiduría Ancestral',
    resumen: 'Sumérgete en la cultura viva del pueblo Saraguro. Conoce sus talleres de filigrana, medicina tradicional, gastronomía autóctona y el majestuoso Baño del Inka.',
    contenido: `
      <h2>Una experiencia cultural auténtica en los Andes</h2>
      <p>Saraguro es uno de los pocos pueblos indígenas de América del Sur que ha mantenido sus tradiciones, vestimenta distintiva (sombreros blancos con manchas negras y collares de mullos multicolores) y su cosmovisión andina prácticamente intacta.</p>
      
      <h2>Atractivos imperdibles en Saraguro</h2>
      <ul>
        <li><strong>Cascada la Virgen del Agua (Sharashi) y Baño del Inka:</strong> Sitios sagrados donde se realizan baños energéticos guiados por taitas y mamas yachaks.</li>
        <li><strong>Turismo Comunitario en Ilincho y Lagunas:</strong> Hospedaje vivencial con familias locales, aprendizaje de telares y cocina con granos andinos.</li>
        <li><strong>Talleres de joyería y bisutería:</strong> Los collares de chaquiras y aretes de filigrana de plata hechos a mano por artesanas saragurenses.</li>
      </ul>
    `,
    imagen: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
    imagen_alt: 'Artesanías y collares tradicionales del pueblo Saraguro Loja',
    categoria: 'Cultura',
    etiquetas: ['Saraguro', 'Cultura', 'Artesanía', 'Comunidades', 'Andes'],
    canton_slug: 'saraguro',
    autor: 'Agenda Turística Loja',
    fecha_publicacion: '2026-09-18',
    publicado: true,
    tiempo_lectura: 7,
  }
];

// Helper para parsear etiquetas desde JSON o string
function parseEtiquetas(etiquetas: any): string[] {
  if (Array.isArray(etiquetas)) return etiquetas;
  if (typeof etiquetas === 'string') {
    try {
      const parsed = JSON.parse(etiquetas);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return etiquetas.split(',').map(s => s.trim()).filter(Boolean);
    }
  }
  return [];
}

// Obtener todos los posts publicados (para la vista pública)
export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const db = getDbPool();
    // Intenta conectar e inicializar si es necesario
    const [rows]: any = await Promise.race([
      db.query('SELECT * FROM blog_posts WHERE publicado = 1 ORDER BY fecha_publicacion DESC'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 3000))
    ]);

    if (rows && rows.length > 0) {
      return rows.map((r: any) => ({
        ...r,
        publicado: Boolean(r.publicado),
        etiquetas: parseEtiquetas(r.etiquetas),
        fecha_publicacion: r.fecha_publicacion ? new Date(r.fecha_publicacion).toISOString().split('T')[0] : '',
      }));
    }
  } catch (err) {
    console.warn('MySQL fallback activo (getPublishedPosts):', (err as Error).message);
  }
  return FALLBACK_POSTS;
}

// Obtener todos los posts (para el /admin, incluye borradores)
export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  try {
    const db = getDbPool();
    await initDb();
    const [rows]: any = await Promise.race([
      db.query('SELECT * FROM blog_posts ORDER BY fecha_publicacion DESC'),
      new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 3500))
    ]);

    if (rows) {
      return rows.map((r: any) => ({
        ...r,
        publicado: Boolean(r.publicado),
        etiquetas: parseEtiquetas(r.etiquetas),
        fecha_publicacion: r.fecha_publicacion ? new Date(r.fecha_publicacion).toISOString().split('T')[0] : '',
      }));
    }
  } catch (err) {
    console.warn('MySQL fallback admin (getAllPostsAdmin):', (err as Error).message);
  }
  return FALLBACK_POSTS;
}

// Obtener un solo post por su slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const db = getDbPool();
    const [rows]: any = await Promise.race([
      db.query('SELECT * FROM blog_posts WHERE slug = ? LIMIT 1', [slug]),
      new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 3000))
    ]);

    if (rows && rows.length > 0) {
      const r = rows[0];
      return {
        ...r,
        publicado: Boolean(r.publicado),
        etiquetas: parseEtiquetas(r.etiquetas),
        fecha_publicacion: r.fecha_publicacion ? new Date(r.fecha_publicacion).toISOString().split('T')[0] : '',
      };
    }
  } catch (err) {
    console.warn('MySQL fallback activo (getPostBySlug):', (err as Error).message);
  }

  // Fallback
  const found = FALLBACK_POSTS.find(p => p.slug === slug);
  return found || null;
}
