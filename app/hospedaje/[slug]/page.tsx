import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import WhatsAppButton from "@/components/WhatsAppButton";
import { HOSPEDAJES, getHospedaje } from "@/lib/data/hospedaje";
import { cantonNombre } from "@/lib/data/cantones";
import { mensajeConsulta } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return HOSPEDAJES.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const h = getHospedaje(slug);
  if (!h) return {};
  return {
    title: `${h.nombre}, ${h.tipo.toLowerCase()} en ${cantonNombre(h.cantonSlug)}`,
    description: h.descripcion,
    alternates: { canonical: `/hospedaje/${h.slug}` },
  };
}

export default async function HospedajeFicha({ params }: Props) {
  const { slug } = await params;
  const h = getHospedaje(slug);
  if (!h) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: h.nombre,
    description: h.descripcion,
    address: { "@type": "PostalAddress", addressLocality: cantonNombre(h.cantonSlug), addressCountry: "EC" },
    geo: { "@type": "GeoCoordinates", latitude: h.lat, longitude: h.lng },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero title={h.nombre} lead={`${h.tipo} · ${h.zona}`}>
        <span className={`inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold ${h.verificado ? "text-[#1b6b3a]" : "text-[#9a6200]"}`}>
          {h.verificado ? "✅ Verificado GuIAloja" : "⏳ En proceso de verificación"}
        </span>
      </PageHero>

      <section className="py-14">
        <div className="mx-auto grid w-[min(1180px,100%-40px)] gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Photo gradient={h.gradient} src={h.imagen} alt={h.nombre} emoji="🏨" className="h-72 rounded-[24px] sm:h-96" />
            <h2 className="mt-8 font-serif text-3xl font-semibold text-forest">Sobre este hospedaje</h2>
            <p className="mt-2 max-w-[62ch] text-lg text-ink/75">{h.descripcion}</p>
            <h3 className="mt-8 font-serif text-2xl font-semibold text-forest">Servicios</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {h.servicios.map((s) => (
                <li key={s} className="rounded-full bg-mist px-4 py-1.5 text-sm font-medium text-forest">{s}</li>
              ))}
            </ul>
            {h.demo && <p className="mt-8 rounded-xl bg-[#f6e7dc] p-4 text-sm text-ochre">Ficha de demostración. Los datos reales se cargarán cuando el establecimiento se afilie.</p>}
          </div>

          <aside className="h-fit rounded-[24px] border border-ink/10 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(13,27,18,.25)] lg:sticky lg:top-24">
            <p className="text-sm text-ink/60">Desde</p>
            <p className="font-serif text-5xl font-bold text-ochre">${h.desde}<span className="font-sans text-base font-medium text-ink/70"> /noche</span></p>
            <p className="mt-2 text-sm text-ink/60">Precio referencial. Confirma tarifa y disponibilidad por WhatsApp.</p>
            <WhatsAppButton mensaje={mensajeConsulta(h.nombre)} className="mt-5 w-full">💬 Reservar por WhatsApp</WhatsAppButton>
            <p className="mt-3 text-sm text-ink/60">Sin intermediarios ni comisiones.</p>
            <Link href={`/cantones/${h.cantonSlug}`} className="mt-5 block text-sm font-semibold text-sky hover:text-forest">
              Más sobre {cantonNombre(h.cantonSlug)}
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
