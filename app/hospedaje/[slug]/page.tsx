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
  const cNombre = cantonNombre(h.cantonSlug);
  return {
    title: `${h.nombre}: ${h.tipo} en ${cNombre}, Loja (Contacto Directo)`,
    description: `${h.descripcion} Reserva directo por WhatsApp sin comisiones. Tarifas desde $${h.desde} en ${cNombre}, provincia de Loja.`,
    keywords: [
      `${h.nombre.toLowerCase()}`,
      `hoteles en ${cNombre.toLowerCase()}`,
      `hospedaje en ${cNombre.toLowerCase()}`,
      `${h.tipo.toLowerCase()} en ${cNombre.toLowerCase()}`,
      "hospedaje loja contacto directo",
    ],
    alternates: { canonical: `/hospedaje/${h.slug}` },
    openGraph: {
      title: `${h.nombre} — Hospedaje en ${cNombre}`,
      description: h.descripcion,
      images: h.imagen ? [{ url: h.imagen }] : undefined,
    },
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

      <PageHero
        title={h.nombre}
        badge={`🏨 ${h.tipo} · ${cantonNombre(h.cantonSlug)}`}
        lead={h.zona}
        backLink={{ href: "/hospedaje", label: "Volver a Hospedaje" }}
        imagen={h.imagen ?? "https://mvps.b-cdn.net/agenda-turistica/hospedaje/hero-hospedaje.webp"}
      >
        <span
          style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs uppercase tracking-wider ${
            h.verificado
              ? "bg-[#EBF3ED]/90 text-[#2C5E43] border border-[#2C5E43]/25"
              : "bg-amber-100/90 text-amber-800 border border-amber-300/40"
          }`}
        >
          {h.verificado ? "✅ Verificado GuIAloja" : "⏳ En proceso de verificación"}
        </span>
      </PageHero>

      <section className="py-14 bg-[#FAFAF8]">
        <div className="mx-auto grid w-[min(1180px,100%-40px)] gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Left: content */}
          <div>
            <div className="overflow-hidden rounded-3xl">
              <Photo gradient={h.gradient} src={h.imagen} alt={h.nombre} emoji="🏨" className="h-72 sm:h-96 w-full" />
            </div>

            <div className="mt-8">
              <span
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="text-[11px] uppercase tracking-widest text-[#2C5E43] block mb-2"
              >
                Sobre este hospedaje
              </span>
              <h2
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
                className="text-2xl text-[#17201B]"
              >
                Descripción
              </h2>
              <p style={{ fontFamily: "var(--font-body)" }} className="mt-3 text-[1.05rem] text-[#3D4F45] leading-relaxed max-w-[62ch]">
                {h.descripcion}
              </p>
            </div>

            <div className="mt-8">
              <h3
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                className="text-xl text-[#17201B] mb-3"
              >
                Servicios incluidos
              </h3>
              <ul className="flex flex-wrap gap-2">
                {h.servicios.map((s) => (
                  <li
                    key={s}
                    style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
                    className="rounded-full bg-[#EBF3ED] text-[#2C5E43] border border-[#2C5E43]/15 px-4 py-1.5 text-xs uppercase tracking-wide"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {h.demo && (
              <p className="mt-8 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                ⚠️ Ficha de demostración. Los datos reales se cargarán cuando el establecimiento se afilie a GuIAloja.
              </p>
            )}
          </div>

          {/* Right: booking card */}
          <aside className="h-fit rounded-3xl border border-[#E8EAE3] bg-white p-7 shadow-[0_16px_50px_-12px_rgba(13,27,18,0.12)] lg:sticky lg:top-24">
            <p style={{ fontFamily: "var(--font-body)" }} className="text-xs text-[#64746B] uppercase tracking-wider mb-1">Precio desde</p>
            <div className="flex items-baseline gap-1">
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900 }} className="text-5xl text-[#17201B]">${h.desde}</span>
              <span style={{ fontFamily: "var(--font-body)" }} className="text-sm text-[#64746B]">/noche</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)" }} className="mt-2 text-xs text-[#64746B]">
              Precio referencial. Confirma tarifa y disponibilidad directamente.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <WhatsAppButton mensaje={mensajeConsulta(h.nombre)} className="w-full justify-center">
                💬 Reservar por WhatsApp
              </WhatsAppButton>
              <p style={{ fontFamily: "var(--font-body)" }} className="text-[11px] text-[#64746B] text-center">Sin intermediarios ni comisiones.</p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#EEF0EA]">
              <Link
                href={`/cantones/${h.cantonSlug}`}
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="flex items-center gap-2 text-sm text-[#2C5E43] hover:text-[#17201B] transition-colors"
              >
                🗺️ Más sobre {cantonNombre(h.cantonSlug)}
                <span>→</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
