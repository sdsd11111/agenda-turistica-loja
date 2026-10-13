import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getPublishedPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';
import { renderContent, getVideoEmbedHtml } from '@/lib/markdown';
import { ArticleMedia } from '@/components/ArticleMedia';


interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artículo No Encontrado | Agenda Turística Loja',
    };
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.titulo} | Blog Agenda Turística Loja`,
    description: post.resumen,
    keywords: [
      post.categoria,
      ...(post.etiquetas || []),
      'Loja Ecuador',
      'Turismo Loja',
      post.canton_slug || 'Provincia de Loja',
    ],
    authors: [{ name: post.autor || 'Agenda Turística Loja' }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.titulo,
      description: post.resumen,
      url: postUrl,
      type: 'article',
      publishedTime: post.fecha_publicacion,
      authors: [post.autor || 'Agenda Turística Loja'],
      tags: post.etiquetas,
      images: [
        {
          url: post.imagen && post.imagen.startsWith('http')
            ? post.imagen
            : `${SITE_URL}/logo-horizontal-1200x375.png`,
          alt: post.imagen_alt || post.titulo,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.titulo,
      description: post.resumen,
      images: [
        post.imagen && post.imagen.startsWith('http')
          ? post.imagen
          : `${SITE_URL}/logo-horizontal-1200x375.png`,
      ],
    },
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Schema.org BlogPosting estructurado
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    headline: post.titulo,
    description: post.resumen,
    image: post.imagen ? [post.imagen] : undefined,
    datePublished: post.fecha_publicacion,
    dateModified: post.fecha_modificacion || post.fecha_publicacion,
    author: {
      '@type': 'Organization',
      name: post.autor || 'Agenda Turística Loja',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Agenda Turística Loja',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brandmark.svg`,
      },
    },
    articleSection: post.categoria,
    keywords: post.etiquetas?.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="min-h-screen bg-[#FAFAF8] text-[#17201B] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#64746B] mb-8 font-medium">
            <Link href="/" className="hover:text-[#2C5E43] transition">Inicio</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#2C5E43] transition">Blog</Link>
            <span>/</span>
            <span className="text-[#17201B] truncate max-w-xs">{post.titulo}</span>
          </nav>

          {/* Header del post */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-[#EBF3ED] text-[#2C5E43] border border-[#2C5E43]/20 text-xs font-bold px-3 py-1 rounded-full">
                {post.categoria}
              </span>
              <span className="text-xs text-[#64746B]">📅 {post.fecha_publicacion}</span>
              <span className="text-xs text-[#64746B]">•</span>
              <span className="text-xs text-[#64746B]">⏱️ {post.tiempo_lectura || 5} min de lectura</span>
              {post.canton_slug ? (
                <span className="inline-flex items-center gap-1">
                  <span className="text-xs text-[#64746B]">•</span>
                  <Link
                    href={`/cantones/${post.canton_slug}`}
                    className="text-xs text-[#2C5E43] font-semibold hover:underline capitalize"
                  >
                    📍 Cantón {post.canton_slug}
                  </Link>
                </span>
              ) : null}
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17201B] tracking-tight leading-tight mb-6 break-words [overflow-wrap:anywhere]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {post.titulo}
            </h1>

            <p className="text-lg text-[#64746B] leading-relaxed border-l-4 border-[#2C5E43] pl-4 bg-[#F4F5F0] py-3 rounded-r-2xl break-words [overflow-wrap:anywhere] overflow-hidden">
              {post.resumen}
            </p>
          </header>


          {/* Multimedia del Artículo: Foto, Video o Slide si ambos existen */}
          <ArticleMedia
            image={post.imagen}
            imageAlt={post.imagen_alt}
            videoUrl={post.video_url}
            title={post.titulo}
          />

          {/* Contenido del Artículo con Diseño Editorial */}
          {(() => {
            // Limpiar cualquier residuo de etiquetas <video> o <iframe> rotas que hayan quedado en el texto guardado
            let cleanContent = post.contenido
              .replace(/<div[^>]*aspect-video[\s\S]*?<\/div>/gi, '')
              .replace(/<div[^>]*class="my-8[^>]*>[\s\S]*?<\/div>/gi, '')
              .replace(/<video[\s\S]*?<\/video>/gi, '')
              .replace(/https?:\/\/redessociales\.b-cdn\.net\/uploads\/[^\s<>"']+/gi, '')
              .replace(/https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?.*?v=|embed\/|shorts\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}/gi, '');

            return (
              <div
                className="blog-content-body max-w-none break-words overflow-hidden [overflow-wrap:anywhere]"
                dangerouslySetInnerHTML={{ __html: renderContent(cleanContent).trim() }}
                suppressHydrationWarning
              />
            );
          })()}{post.etiquetas && post.etiquetas.length > 0 ? (
            <div className="mt-12 pt-6 border-t border-[#E8EAE3]" suppressHydrationWarning>
              <h3 className="text-xs uppercase tracking-wider text-[#64746B] font-bold mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                Temas relacionados:
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.etiquetas.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-[#F4F5F0] border border-[#E8EAE3] text-[#17201B] px-3 py-1.5 rounded-lg font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {/* Autor Card */}
          <div className="mt-8 bg-white border border-[#E8EAE3] rounded-3xl p-6 flex items-center gap-4 shadow-sm">
            <div className="size-12 rounded-2xl bg-[#EBF3ED] border border-[#2C5E43]/20 flex items-center justify-center shrink-0">
              <img src="/brandmark.svg" alt="Loja" className="size-7 object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#17201B]">{post.autor || 'Agenda Turística Loja'}</div>
              <div className="text-xs text-[#64746B] mt-0.5">
                Portal y guía oficial de turismo de los 16 cantones de la provincia de Loja, Ecuador.
              </div>
            </div>
          </div>

          {/* Artículos Recomendados */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 pt-12 border-t border-[#E8EAE3]">
              <h2 className="text-2xl font-bold text-[#17201B] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Continúa Explorando el Blog
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id || rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="bg-white border border-[#E8EAE3] rounded-2xl p-4 hover:border-[#2C5E43]/40 hover:shadow-md transition group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] text-[#2C5E43] font-bold bg-[#EBF3ED] px-2 py-0.5 rounded">
                        {rel.categoria}
                      </span>
                      <h4
                        className="text-sm font-bold text-[#17201B] group-hover:text-[#2C5E43] transition mt-2 line-clamp-2"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {rel.titulo}
                      </h4>
                    </div>
                    <span className="text-xs text-[#64746B] mt-3 block font-medium">Leer más →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Volver */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#2C5E43] hover:text-[#224B35] font-bold"
            >
              ← Volver a todos los artículos
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
