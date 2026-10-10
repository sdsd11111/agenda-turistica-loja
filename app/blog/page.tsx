import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog Turístico de Loja | Guías, Rutas y Consejos de Viaje',
  description: 'Descubre artículos, guías detalladas y secretos de los 16 cantones de Loja: naturaleza, gastronomía, eventos, rutas cafeteras y cultura viva del sur del Ecuador.',
  keywords: ['Blog Loja', 'Turismo Loja', 'Viajar a Loja', 'Qué hacer en Loja', 'Guías de viaje Loja Ecuador', 'Podocarpus', 'Vilcabamba'],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog Turístico de Loja | Guías, Rutas y Consejos de Viaje',
    description: 'Descubre artículos, guías detalladas y secretos de los 16 cantones de Loja: naturaleza, gastronomía, eventos y cultura viva.',
    url: `${SITE_URL}/blog`,
    type: 'website',
  },
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de Agenda Turística Loja',
    description: 'Guías completas, rutas, gastronomía y recomendaciones para explorar la provincia de Loja, Ecuador.',
    url: `${SITE_URL}/blog`,
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.titulo,
      description: post.resumen,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.fecha_publicacion,
      author: {
        '@type': 'Organization',
        name: post.autor || 'Agenda Turística Loja',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <div className="min-h-screen bg-[#FAFAF8] text-[#17201B] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero del Blog */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span
              className="text-[#2C5E43] text-xs font-bold tracking-widest uppercase bg-[#EBF3ED] border border-[#2C5E43]/20 px-4 py-1.5 rounded-full inline-block mb-4"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Bitácora & Guías Oficiales
            </span>
            <h1
              className="text-3xl sm:text-5xl font-black text-[#17201B] tracking-tight mb-4"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Blog Turístico de <span className="text-[#2C5E43]">Loja</span>
            </h1>
            <p className="text-[#64746B] text-base sm:text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
              Explora crónicas de viaje, guías paso a paso, fechas de eventos naturales y los mejores secretos de los 16 cantones de la provincia.
            </p>
          </div>

          {/* Grilla de Artículos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id || post.slug}
                className="bg-white border border-[#E8EAE3] rounded-3xl overflow-hidden hover:border-[#2C5E43]/40 hover:shadow-[0_16px_36px_rgba(44,94,67,0.08)] transition duration-300 flex flex-col group"
              >
                {/* Imagen del artículo */}
                <Link href={`/blog/${post.slug}`} className="relative h-56 w-full overflow-hidden block bg-[#F4F5F0]">
                  {post.imagen ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.imagen}
                      alt={post.imagen_alt || post.titulo}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-[#EBF3ED]">
                      🌄
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-[#2C5E43] text-xs font-bold px-3 py-1 rounded-full border border-[#2C5E43]/20 shadow-sm">
                    {post.categoria || 'Turismo'}
                  </span>
                </Link>

                {/* Contenido Card */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-xs text-[#64746B] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                      <span>📅 {post.fecha_publicacion || 'Reciente'}</span>
                      <span>•</span>
                      <span>⏱️ {post.tiempo_lectura || 5} min de lectura</span>
                    </div>

                    <h2
                      className="text-xl font-bold text-[#17201B] group-hover:text-[#2C5E43] transition leading-snug mb-3 break-words [overflow-wrap:anywhere]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      <Link href={`/blog/${post.slug}`}>{post.titulo}</Link>
                    </h2>

                    <p className="text-[#64746B] text-sm line-clamp-3 leading-relaxed mb-4 break-words [overflow-wrap:anywhere]" style={{ fontFamily: 'var(--font-body)' }}>
                      {post.resumen}
                    </p>

                  </div>

                  <div>
                    {/* Tags */}
                    {post.etiquetas && post.etiquetas.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.etiquetas.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-[#F4F5F0] text-[#64746B] px-2.5 py-0.5 rounded-md border border-[#E8EAE3]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-[#2C5E43] hover:text-[#224B35] text-xs font-bold flex items-center gap-1 group/btn"
                    >
                      <span>Leer artículo completo</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Banner de llamada a la acción */}
          <div className="mt-16 bg-[#EBF3ED] border border-[#2C5E43]/20 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17201B] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              ¿Tienes un negocio turístico o evento en Loja?
            </h2>
            <p className="text-[#64746B] text-sm sm:text-base max-w-xl mx-auto mb-6">
              Aparece en nuestra agenda y publícate con nosotros para conectar con viajeros y turistas de todo el país.
            </p>
            <Link
              href="/contacto"
              className="inline-block bg-[#2C5E43] hover:bg-[#224B35] text-white font-bold text-sm px-7 py-3.5 rounded-xl transition shadow-md shadow-[#2C5E43]/20"
            >
              Contactar para Publicar mi Negocio
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
