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

import SeccionDecisionCanton from "@/components/SeccionDecisionCanton";
import SeccionEventosCanton from "@/components/SeccionEventosCanton";

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
        backLink={{ href: "/cantones", label: "Volver a Cantones" }}
        imagen={canton.imagen ?? "https://mvps.b-cdn.net/agenda-turistica/cantones/hero-cantones.webp"}
      >
        {canton.atractivo && (
          <span
            style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/25 px-4 py-2 text-xs text-white"
          >
            🏖️ Atracción principal: {canton.atractivo}
          </span>
        )}
      </PageHero>

      {/* ── SECCIÓN 1: DECISIÓN DEL CANTÓN (3 CARDS ADAPTADAS AL CANTÓN) ── */}
      <SeccionDecisionCanton canton={canton} atractivos={atractivos} />

      {/* ── SECCIÓN 2: EVENTOS EN VIVO DEL CANTÓN CON PARALLAX Y SWIPE ── */}
      <SeccionEventosCanton canton={canton} />

      {/* ── SECCIÓN 3: HOSPEDAJE & ESTADÍA EN EL CANTÓN ── */}
      <section className="py-20 bg-white text-[#17201B] border-t border-[#EEF0EA]">
        <div className="mx-auto w-[min(1420px,100%-48px)]">
          <div className="mb-10">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43] block mb-2"
            >
              Hospedaje & Estadía Verificada
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              className="text-2xl sm:text-3xl text-[#17201B]"
            >
              Dónde hospedarte en {canton.nombre}
            </h2>
          </div>

          {hoteles.length === 0 ? (
            <div>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {[
                  {
                    numero: "01",
                    tipo: "Hotel / Cabaña Principal",
                    descripcion: "Espacio verificado disponible para el primer hotel o complejo turístico de cabañas en " + canton.nombre + ".",
                  },
                  {
                    numero: "02",
                    tipo: "Hostería / Glamping",
                    descripcion: "Plaza abierta para alojamientos campestres, glampings o fincas de descanso certificadas en " + canton.nombre + ".",
                  },
                  {
                    numero: "03",
                    tipo: "Posada / Hospedaje Local",
                    descripcion: "Plaza abierta para posadas familiares, hostales y alojamientos de hospitalidad lojana en " + canton.nombre + ".",
                  },
                ].map((plaza) => (
                  <div
                    key={plaza.numero}
                    className="p-8 rounded-3xl border-2 border-dashed border-[#D4D7CD] hover:border-[#2C5E43] bg-[#FAFAF8] hover:bg-white transition-all duration-300 flex flex-col items-center text-center justify-between min-h-[340px] shadow-xs hover:shadow-lg group"
                  >
                    {/* Badge superior */}
                    <div className="w-full flex items-center justify-between text-[11px] font-bold text-[#64746B]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#2C5E43] uppercase tracking-wider text-[10px] font-bold">
                        <span className="size-1.5 rounded-full bg-[#52B788] animate-pulse" />
                        Plaza Libre
                      </span>
                      <span style={{ fontFamily: "var(--font-label)" }}>#{plaza.numero}</span>
                    </div>

                    {/* Logo grande centrado súper clean */}
                    <div className="my-auto py-4 flex flex-col items-center">
                      <div className="size-20 sm:size-24 rounded-3xl bg-white border border-[#E8EAE3] group-hover:border-[#2C5E43]/40 group-hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center shadow-xs text-[#2C5E43] mb-4">
                        <span className="text-3xl sm:text-4xl">🏨</span>
                      </div>
                      <h3
                        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                        className="text-base sm:text-lg text-[#17201B] group-hover:text-[#2C5E43] transition-colors"
                      >
                        {plaza.tipo}
                      </h3>
                      <p className="text-xs text-[#64746B] mt-2 max-w-xs leading-relaxed">
                        {plaza.descripcion}
                      </p>
                    </div>

                    {/* Botón CTA Postular / Vincular Hospedaje */}
                    <a
                      href={`https://wa.me/593963410409?text=${encodeURIComponent(
                        `Hola, tengo un hospedaje en ${canton.nombre} y deseo postular para ocupar la plaza #${plaza.numero} (${plaza.tipo}) en la Agenda Turística de Loja.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className="w-full py-3 rounded-2xl bg-white border border-[#E8EAE3] group-hover:bg-[#2C5E43] group-hover:border-[#2C5E43] group-hover:text-white text-[#17201B] text-xs uppercase tracking-wider transition-all duration-200 shadow-xs flex items-center justify-center gap-2"
                    >
                      <span>Puesto Abierto · Postular</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>
                ))}
              </div>

              {/* Banner informativo de vinculación */}
              <div className="mt-8 p-6 rounded-2xl bg-[#F4F5F0] border border-[#E8EAE3] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <span className="text-2xl shrink-0">✨</span>
                  <p className="text-xs text-[#47554E]">
                    <strong>¿Eres propietario de un hospedaje en {canton.nombre}?</strong> Los tres primeros alojamientos certificados obtienen verificación directa e integración en el Asesor IA.
                  </p>
                </div>
                <Link
                  href="/contacto"
                  style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                  className="px-5 py-2.5 rounded-full bg-[#17201B] hover:bg-[#2C5E43] text-white text-xs whitespace-nowrap transition-all shrink-0"
                >
                  Registrar mi hospedaje →
                </Link>

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
        <div className="mx-auto w-[min(1420px,100%-48px)]">
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
