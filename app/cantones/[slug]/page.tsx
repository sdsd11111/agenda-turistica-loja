import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import HotelCard from "@/components/HotelCard";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CANTONES, getCanton } from "@/lib/data/cantones";
import { HOSPEDAJES } from "@/lib/data/hospedaje";
import { ATRACTIVOS } from "@/lib/data/atractivos";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CANTONES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCanton(slug);
  if (!c) return {};
  return {
    title: `Turismo en ${c.nombre}, Loja`,
    description: c.descripcion,
    alternates: { canonical: `/cantones/${c.slug}` },
  };
}

export default async function CantonPage({ params }: Props) {
  const { slug } = await params;
  const canton = getCanton(slug);
  if (!canton) notFound();

  const hoteles = HOSPEDAJES.filter((h) => h.cantonSlug === slug);
  const atractivos = ATRACTIVOS.filter((a) => a.cantonSlug === slug);

  return (
    <>
      <PageHero title={canton.nombre} lead={canton.descripcion}>
        <p className="text-sm text-white/75">Cabecera cantonal: {canton.cabecera}</p>
      </PageHero>

      <section className="py-16">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <SectionHead title="Atractivos y lugares" />
          {atractivos.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-forest/40 p-8 text-ink/70">
              Estamos reuniendo los atractivos de {canton.nombre}. ¿Conoces alguno?{" "}
              <Link href="/contacto" className="font-semibold text-sky underline">Recomiéndanoslo</Link>.
            </p>
          ) : (
            <ul className="grid gap-4 md:grid-cols-2">
              {atractivos.map((a) => (
                <li key={a.slug} className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-5">
                  <span aria-hidden className="text-4xl">{a.emoji}</span>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-forest">{a.nombre}</h3>
                    <p className="text-sm text-ink/60">{a.categoria}{a.duracion ? ` · ${a.duracion}` : ""}</p>
                    <p className="mt-1 text-ink/75">{a.descripcion}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="py-16" style={{ background: "linear-gradient(180deg,#eef4f0,#F8FAF9)" }}>
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <SectionHead title={`Dónde hospedarte en ${canton.nombre}`} />
          {hoteles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-forest/40 p-8">
              <p className="text-ink/75">Todavía no hay hospedajes verificados en {canton.nombre}. Si tienes uno, puedes aparecer aquí.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/para-negocios" className="inline-flex min-h-12 items-center rounded-full bg-forest px-6 font-semibold text-white hover:bg-leaf">Ver planes</Link>
                <WhatsAppButton mensaje={`Hola, tengo un hospedaje en ${canton.nombre} y quisiera aparecer en agendaturisticaloja.com.`}>💬 Escribir por WhatsApp</WhatsAppButton>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {hoteles.map((h) => (
                <HotelCard key={h.slug} hotel={h} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <p className="max-w-[62ch] text-ink/70">
            ¿Eres del GAD de {canton.nombre}? El convenio cantonal incluye una sección propia en este portal.{" "}
            <Link href="/municipios" className="font-semibold text-sky underline">Conocer el convenio</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
