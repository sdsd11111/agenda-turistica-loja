import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GuideCard from "@/components/GuideCard";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";
import { GUIAS, getGuia } from "@/lib/data/guias";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) return {};
  return {
    title: `${g.titulo} | Guía Turística de Loja`,
    description: `${g.resumen} Consejos de viaje, duración, senderos, hospedaje y cómo llegar en la provincia de Loja, Ecuador.`,
    keywords: [...g.keywords, "guia de viaje loja", "turismo loja ecuador", "que hacer en loja"],
    alternates: { canonical: `/guias/${g.slug}` },
    openGraph: {
      type: "article",
      title: `${g.titulo} | Guía Turística de Loja`,
      description: g.resumen,
      url: `${SITE.url}/guias/${g.slug}`,
      images: g.imagen ? [{ url: g.imagen }] : undefined,
    },
  };
}

export default async function GuiaPage({ params }: Props) {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) notFound();

  const relacionadas = GUIAS.filter((x) => x.slug !== g.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.titulo,
    description: g.resumen,
    datePublished: g.fecha,
    author: { "@type": "Organization", name: "Agenda Turística Loja" },
    mainEntityOfPage: `${SITE.url}/guias/${g.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        title={g.titulo}
        badge={`📖 Guía Turística · ${g.categoria}`}
        lead={g.resumen}
        backLink={{ href: "/guias", label: "Volver a Guías" }}
        imagen={g.imagen || "https://mvps.b-cdn.net/agenda-turistica/guias/hero-guias.webp"}
      >
        <div className="flex flex-wrap gap-2">
          {[
            { label: `⏱ ${g.duracion}` },
            { label: `📊 Nivel ${g.nivel.toLowerCase()}` },
          ].map(({ label }) => (
            <span
              key={label}
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs text-white"
            >
              {label}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Article content */}
      <article className="py-16 bg-[#FAFAF8]">
        <div className="mx-auto w-[min(820px,100%-40px)]">
          {g.secciones.map((s) => (
            <section key={s.titulo} className="mb-12">
              <h2
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em" }}
                className="text-2xl sm:text-3xl text-[#17201B] mb-4"
              >
                {s.titulo}
              </h2>
              {s.parrafos.map((p, i) => (
                <p key={i} style={{ fontFamily: "var(--font-body)" }} className="mt-3 text-[1.05rem] leading-[1.8] text-[#3D4F45]">
                  {p}
                </p>
              ))}
            </section>
          ))}

          {/* CTA panel */}
          <div className="mt-14 rounded-3xl bg-[#17201B] p-8 sm:p-10 border border-[#2C5E43]/30 shadow-2xl">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="text-[11px] uppercase tracking-widest text-[#52B788] block mb-2"
            >
              ¿Listo para tu viaje?
            </span>
            <p
              style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
              className="text-2xl text-white mb-5"
            >
              Planifica tu estancia en la provincia de Loja
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/hospedaje"
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="inline-flex items-center gap-2 min-h-11 rounded-full bg-[#2C5E43] hover:bg-[#387856] px-6 text-xs uppercase tracking-wider text-white transition-all duration-200"
              >
                🏨 Ver hospedaje
              </Link>
              <Link
                href="/cantones"
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="inline-flex items-center gap-2 min-h-11 rounded-full border border-white/20 hover:bg-white/10 px-6 text-xs uppercase tracking-wider text-white transition-all duration-200"
              >
                🗺️ Explorar cantones
              </Link>
              <WhatsAppButton
                mensaje={`Hola, leí la guía "${g.titulo}" en agendaturisticaloja.com/guias/${g.slug} y quisiera asesoría para planear mi viaje.`}
              >
                💬 Consultar por WhatsApp
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </article>

      {/* Related guides */}
      {relacionadas.length > 0 && (
        <section className="py-20 bg-white border-t border-[#EEF0EA]">
          <div className="mx-auto w-[min(1420px,100%-48px)]">
            <div className="mb-10">
              <span
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="text-[11px] uppercase tracking-widest text-[#2C5E43] block mb-2"
              >
                Más rutas recomendadas
              </span>
              <h2
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
                className="text-2xl sm:text-3xl text-[#17201B]"
              >
                Otras guías turísticas que te pueden interesar
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {relacionadas.map((r) => (
                <GuideCard key={r.slug} guia={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
