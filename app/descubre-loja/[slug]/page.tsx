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
    title: g.titulo,
    description: g.resumen,
    keywords: g.keywords,
    alternates: { canonical: `/descubre-loja/${g.slug}` },
    openGraph: { type: "article", title: g.titulo, description: g.resumen, url: `${SITE.url}/descubre-loja/${g.slug}` },
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
    author: { "@type": "Organization", name: "GuIAloja" },
    mainEntityOfPage: `${SITE.url}/descubre-loja/${g.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero title={g.titulo} lead={g.resumen}>
        <div className="flex flex-wrap gap-2 text-sm font-semibold">
          <span className="rounded-full bg-white/15 px-3 py-1">{g.categoria}</span>
          <span className="rounded-full bg-white/15 px-3 py-1">⏱ {g.duracion}</span>
          <span className="rounded-full bg-white/15 px-3 py-1">Nivel {g.nivel.toLowerCase()}</span>
        </div>
      </PageHero>

      <article className="py-14">
        <div className="mx-auto w-[min(720px,100%-40px)]">
          {g.secciones.map((s) => (
            <section key={s.titulo} className="mb-10">
              <h2 className="font-serif text-3xl font-semibold text-forest">{s.titulo}</h2>
              {s.parrafos.map((p, i) => (
                <p key={i} className="mt-3 text-[1.08rem] leading-[1.75] text-ink/80">{p}</p>
              ))}
            </section>
          ))}

          <div className="mt-12 rounded-[20px] bg-mist p-6">
            <p className="font-serif text-2xl font-semibold text-forest">Planea tu viaje</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/hospedaje" className="inline-flex min-h-12 items-center rounded-full bg-forest px-6 font-semibold text-white hover:bg-leaf">Ver hospedaje</Link>
              <Link href="/auxilio-en-ruta" className="inline-flex min-h-12 items-center rounded-full border border-alert px-6 font-semibold text-alert hover:bg-alert hover:text-white">Auxilio en ruta</Link>
              <WhatsAppButton mensaje={`Hola, leí la guía "${g.titulo}" en agendaturisticaloja.com y quisiera ayuda para planear mi viaje.`}>💬 Consultar por WhatsApp</WhatsAppButton>
            </div>
          </div>
        </div>
      </article>

      <section className="pb-20">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-forest">Más guías</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {relacionadas.map((r) => (
              <GuideCard key={r.slug} guia={r} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
