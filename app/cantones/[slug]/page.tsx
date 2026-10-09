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
  const keywords = [
    `turismo en ${c.nombre.toLowerCase()}`,
    `que hacer en ${c.nombre.toLowerCase()}`,
    `lugares turisticos de ${c.nombre.toLowerCase()}`,
    `hoteles en ${c.nombre.toLowerCase()}`,
    `${c.nombre.toLowerCase()} loja`,
  ];
  if (c.atractivo) keywords.push(c.atractivo.toLowerCase());
  return {
    title: `Turismo en ${c.nombre}: Qué Hacer, Atractivos y Hospedaje`,
    description: `Guía turística de ${c.nombre}, provincia de Loja. ${c.descripcion} Descubre sus atractivos turísticos, clima, cabecera cantonal y hospedaje directo.`,
    keywords,
    alternates: { canonical: `/cantones/${c.slug}` },
    openGraph: {
      title: `Turismo en ${c.nombre}, Loja: Qué Hacer y Atractivos`,
      description: c.descripcion,
      images: c.imagen ? [{ url: c.imagen }] : undefined,
    },
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
      <PageHero
        title={canton.nombre}
        lead={canton.descripcion}
        badge={`${canton.emoji} Cantón · Cabecera: ${canton.cabecera}`}
        imagen={canton.imagen ?? "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&q=80"}
      >
        {canton.atractivo && (
          <span
            style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/25 px-4 py-2 text-xs text-white"
          >
            🏖️ Atración principal: {canton.atractivo}
          </span>
        )}
      </PageHero>

      {/* Atractivos */}
      <section className="py-20 bg-[#FAFAF8] text-[#17201B]">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <div className="mb-10">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43] block mb-2"
            >
              Destinos y Naturaleza
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              className="text-2xl sm:text-3xl text-[#17201B]"
            >
              Atractivos y lugares clave en {canton.nombre}
            </h2>
          </div>

          {atractivos.length === 0 ? (
            <div className="rounded-3xl border border-[#E8EAE3] bg-[#17201B] p-8 sm:p-10 text-center max-w-2xl mx-auto overflow-hidden relative">
              {/* Atractivo del cantón */}
              {canton.imagen && (
                <>
                  <img
                    src={canton.imagen}
                    alt={canton.nombre}
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17201B]/95 to-[#17201B]/50" aria-hidden />
                </>
              )}
              <div className="relative z-10">
                <span className="text-4xl">{canton.emoji}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }} className="text-xl text-white mt-3">
                  {canton.atractivo ?? `Descubre ${canton.nombre}`}
                </h3>
                <p style={{ fontFamily: "var(--font-body)" }} className="text-sm text-white/70 mt-2 leading-relaxed max-w-md mx-auto">
                  Estamos registrando los atractivos oficiales de {canton.nombre}. ¿Conoces rutas o sitios recomendados?
                </p>
                <Link
                  href="/contacto"
                  style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C5E43] text-white text-xs hover:bg-[#1f4530] transition-all"
                >
                  Recomendar un atractivo ↗
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {atractivos.map((a) => (
                <div
                  key={a.slug}
                  className="group relative overflow-hidden rounded-3xl min-h-[180px] flex flex-col justify-end shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-400"
                >
                  {/* Photo or gradient */}
                  {a.imagen ? (
                    <img
                      src={a.imagen}
                      alt={a.nombre}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-600 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: a.gradient }} />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden />
                  
                  <div className="relative z-10 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                        className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white"
                      >
                        {a.emoji} {a.categoria}
                      </span>
                      {a.duracion && (
                        <span className="text-[10px] text-white/70 font-medium">⏱ {a.duracion}</span>
                      )}
                    </div>
                    <h3
                      style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#FFFFFF" }}
                      className="text-lg leading-tight"
                    >
                      {a.nombre}
                    </h3>
                    <p
                      style={{ fontFamily: "var(--font-body)" }}
                      className="text-xs text-white/75 mt-1 leading-relaxed line-clamp-2"
                    >
                      {a.descripcion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hospedaje */}
      <section className="py-20 bg-white text-[#17201B] border-t border-[#EEF0EA]">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <div className="mb-10">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43] block mb-2"
            >
              Hospedaje & Estadía
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              className="text-2xl sm:text-3xl text-[#17201B]"
            >
              Dónde hospedarte en {canton.nombre}
            </h2>
          </div>

          {hoteles.length === 0 ? (
            <div className="rounded-3xl border border-[#E8EAE3] bg-[#FAFAF8] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }} className="text-lg text-[#17201B]">
                  ¿Tienes un hotel o cabaña en {canton.nombre}?
                </h3>
                <p style={{ fontFamily: "var(--font-body)" }} className="text-xs text-[#64746B] mt-1 max-w-xl">
                  Sé el primer hospedaje verificado en figurar para los viajeros que buscan quedarse en {canton.nombre}.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/para-negocios"
                  style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
                  className="px-5 py-2.5 rounded-full border border-[#E8EAE3] bg-white text-[#17201B] text-xs hover:bg-[#FAFAF8] transition-all"
                >
                  Ver planes
                </Link>
                <a
                  href={`https://wa.me/593963410409?text=${encodeURIComponent(
                    `Hola, tengo un hospedaje en ${canton.nombre} y deseo vincularme a la Agenda Turística de Loja.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                  className="px-5 py-2.5 rounded-full bg-[#2C5E43] text-white text-xs hover:bg-[#224B35] transition-all shadow-xs flex items-center gap-2"
                >
                  <span>💬 WhatsApp</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {hoteles.map((h) => (
                <HotelCard key={h.slug} hotel={h} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Institucional GAD */}
      <section className="py-16 bg-[#FAFAF8] border-t border-[#EEF0EA]">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <div className="p-6 sm:p-8 rounded-3xl border border-[#E8EAE3] bg-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }} className="text-lg text-[#17201B]">
                ¿Representas al GAD Municipal de {canton.nombre}?
              </h3>
              <p style={{ fontFamily: "var(--font-body)" }} className="text-xs text-[#64746B] mt-1 max-w-xl">
                El convenio cantonal permite certificar eventos oficiales, rutas temáticas y presencia en el Asesor IA.
              </p>
            </div>
            <Link
              href="/municipios"
              style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
              className="px-5 py-2.5 rounded-full bg-[#17201B] text-white text-xs hover:bg-[#2C5E43] transition-all shrink-0"
            >
              Conocer convenio cantonal →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
