import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { ATRACTIVOS } from "@/lib/data/atractivos";
import { getCanton } from "@/lib/data/cantones";
import { getEventosCanton } from "@/lib/services/eventosCultura";
import SeccionEventosCanton from "@/components/SeccionEventosCanton";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ATRACTIVOS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const atractivo = ATRACTIVOS.find((a) => a.slug === slug);
  if (!atractivo) return {};
  const canton = getCanton(atractivo.cantonSlug);

  return {
    title: `${atractivo.nombre} — Turismo en ${canton?.nombre || "Loja"}, Ecuador`,
    description: `${atractivo.descripcion} Ubicado en el cantón ${canton?.nombre || "Loja"}, provincia de Loja, Ecuador. ${atractivo.duracion ? `Duración recomendada: ${atractivo.duracion}.` : ""}`,
    keywords: [
      atractivo.nombre.toLowerCase(),
      `que hacer en ${canton?.nombre?.toLowerCase() || "loja"}`,
      `turismo en ${canton?.nombre?.toLowerCase() || "loja"}`,
      `lugares turisticos de loja`,
    ],
    alternates: { canonical: `/atractivos/${atractivo.slug}` },
    openGraph: {
      title: `${atractivo.nombre} — ${canton?.nombre || "Loja"}, Ecuador`,
      description: atractivo.descripcion,
      images: atractivo.imagen ? [{ url: atractivo.imagen }] : undefined,
    },
  };
}

export const revalidate = 3600;

export default async function AtractivoPage({ params }: Props) {
  const { slug } = await params;
  const atractivo = ATRACTIVOS.find((a) => a.slug === slug);
  if (!atractivo) notFound();

  const canton = getCanton(atractivo.cantonSlug);

  // Atractivos relacionados del mismo cantón (excluir el actual)
  const relacionados = ATRACTIVOS.filter(
    (a) => a.cantonSlug === atractivo.cantonSlug && a.slug !== atractivo.slug
  ).slice(0, 3);

  // Eventos culturales del cantón
  const eventosRes = await getEventosCanton(atractivo.cantonSlug);

  // JSON-LD TouristAttraction
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: atractivo.nombre,
    description: atractivo.descripcion,
    image: atractivo.imagen,
    url: `https://www.agendaturisticaloja.com/atractivos/${atractivo.slug}`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: atractivo.lat,
      longitude: atractivo.lng,
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: canton?.nombre || "Loja",
      containedInPlace: {
        "@type": "State",
        name: "Loja",
        containedInPlace: {
          "@type": "Country",
          name: "Ecuador",
        },
      },
    },
    touristType: atractivo.categoria,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title={atractivo.nombre}
        lead={atractivo.descripcion}
        badge={`${atractivo.emoji} ${atractivo.categoria} · Cantón ${canton?.nombre || "Loja"}`}
        imagen={
          atractivo.imagen ||
          "https://mvps.b-cdn.net/agenda-turistica/atractivos/hero-atractivos.webp"
        }
        backLink={{ href: "/atractivos", label: "Todos los atractivos" }}
      >
        <div className="flex flex-wrap items-center gap-2">
          {atractivo.duracion && (
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 px-4 py-2 text-xs text-white"
            >
              ⏱ Duración recomendada: {atractivo.duracion}
            </span>
          )}
          {canton && (
            <Link
              href={`/cantones/${canton.slug}`}
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 px-4 py-2 text-xs text-white transition-all"
            >
              {canton.emoji} Cantón {canton.nombre} →
            </Link>
          )}
        </div>
      </PageHero>

      {/* ── INFORMACIÓN DETALLADA ── */}
      <section className="py-20 bg-[#FAFAF8] text-[#17201B] border-b border-[#EEF0EA]">
        <div className="mx-auto w-[min(1420px,100%-48px)]">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* ── COLUMNA PRINCIPAL ── */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span
                  style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}
                  className="uppercase text-[#2C5E43] block mb-3"
                >
                  Acerca de este atractivo
                </span>
                <h2
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
                  className="text-2xl sm:text-3xl text-[#17201B] mb-4"
                >
                  {atractivo.nombre}
                </h2>
                <p
                  style={{ fontFamily: "var(--font-body)", lineHeight: 1.8 }}
                  className="text-[#3D4F45] text-base leading-relaxed"
                >
                  {atractivo.descripcion}
                </p>
              </div>

              {/* MAPA EMBED */}
              <div className="rounded-3xl overflow-hidden border border-[#E8EAE3] shadow-sm aspect-[16/9]">
                <iframe
                  title={`Ubicación de ${atractivo.nombre}`}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${atractivo.lng - 0.05},${atractivo.lat - 0.05},${atractivo.lng + 0.05},${atractivo.lat + 0.05}&layer=mapnik&marker=${atractivo.lat},${atractivo.lng}`}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-[#94A39A] -mt-4">
                📍 Coordenadas: {atractivo.lat.toFixed(4)}, {atractivo.lng.toFixed(4)} —{" "}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${atractivo.lat},${atractivo.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2C5E43] underline hover:text-[#224B35]"
                >
                  Abrir en Google Maps ↗
                </a>
              </p>

              {/* ATRACTIVOS RELACIONADOS DEL MISMO CANTÓN */}
              {relacionados.length > 0 && (
                <div>
                  <span
                    style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}
                    className="uppercase text-[#2C5E43] block mb-4"
                  >
                    Más atractivos en el Cantón {canton?.nombre}
                  </span>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {relacionados.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/atractivos/${rel.slug}`}
                        className="group relative rounded-2xl overflow-hidden h-[180px] block hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
                      >
                        {rel.imagen ? (
                          <img
                            src={rel.imagen}
                            alt={rel.nombre}
                            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="absolute inset-0"
                            style={{ background: rel.gradient }}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="text-[10px] text-[#7ECB9A] font-bold uppercase tracking-wider mb-0.5">
                            {rel.emoji} {rel.categoria}
                          </p>
                          <h3
                            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                            className="text-sm text-white leading-snug line-clamp-2"
                          >
                            {rel.nombre}
                          </h3>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── COLUMNA LATERAL (SIDEBAR) ── */}
            <aside className="space-y-5">
              {/* CARD DE INFO RÁPIDA */}
              <div className="rounded-3xl border border-[#E8EAE3] bg-white p-6 shadow-sm">
                <h3
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                  className="text-base text-[#17201B] mb-4"
                >
                  📋 Información útil
                </h3>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-[10px] uppercase tracking-wider font-bold text-[#2C5E43]">Categoría</dt>
                    <dd className="text-sm text-[#3D4F45] font-medium mt-0.5">{atractivo.emoji} {atractivo.categoria}</dd>
                  </div>
                  {atractivo.duracion && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider font-bold text-[#2C5E43]">Duración recomendada</dt>
                      <dd className="text-sm text-[#3D4F45] font-medium mt-0.5">⏱ {atractivo.duracion}</dd>
                    </div>
                  )}
                  {canton && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider font-bold text-[#2C5E43]">Cantón</dt>
                      <dd className="text-sm mt-0.5">
                        <Link
                          href={`/cantones/${canton.slug}`}
                          className="text-[#2C5E43] font-semibold hover:underline"
                        >
                          {canton.emoji} {canton.nombre} →
                        </Link>
                      </dd>
                    </div>
                  )}
                  {canton && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-wider font-bold text-[#2C5E43]">Cabecera cantonal</dt>
                      <dd className="text-sm text-[#3D4F45] font-medium mt-0.5">🏘 {canton.cabecera}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* CTA HOSPEDAJE */}
              {canton && (
                <div className="rounded-3xl border border-[#E8EAE3] bg-[#F0F7F3] p-6 shadow-sm">
                  <h3
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                    className="text-sm text-[#17201B] mb-2"
                  >
                    🛏 ¿Dónde alojarte en {canton.nombre}?
                  </h3>
                  <p
                    style={{ fontFamily: "var(--font-body)" }}
                    className="text-xs text-[#55695C] mb-4 leading-relaxed"
                  >
                    Hoteles, hosterías y casas rurales directamente en el cantón, sin comisiones.
                  </p>
                  <Link
                    href={`/cantones/${canton.slug}#hospedaje`}
                    style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                    className="block w-full py-3 rounded-xl bg-[#2C5E43] hover:bg-[#224B35] text-white text-center text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    Ver hospedaje en {canton.nombre} →
                  </Link>
                </div>
              )}

              {/* CTA AGENDA CULTURAL */}
              <div className="rounded-3xl border border-[#E8EAE3] bg-white p-6 shadow-sm">
                <h3
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                  className="text-sm text-[#17201B] mb-2"
                >
                  🎉 Eventos culturales en {canton?.nombre}
                </h3>
                <p
                  style={{ fontFamily: "var(--font-body)" }}
                  className="text-xs text-[#55695C] mb-4 leading-relaxed"
                >
                  {eventosRes.total > 0
                    ? `Hay ${eventosRes.total} evento${eventosRes.total === 1 ? "" : "s"} vigente${eventosRes.total === 1 ? "" : "s"} en este cantón ahora mismo.`
                    : "Consulta la agenda cultural de la provincia para planificar tu visita."}
                </p>
                <a
                  href={`https://www.agendaculturalloja.com/?ref=agendaturistica_${atractivo.cantonSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                  className="block w-full py-3 rounded-xl bg-[#17201B] hover:bg-[#2C5E43] text-white text-center text-xs uppercase tracking-wider transition-all shadow-sm"
                >
                  Ver Agenda Cultural ↗
                </a>
              </div>

              {/* NAV BREADCRUMB */}
              <nav className="text-xs text-[#94A39A] flex items-center gap-1.5 flex-wrap">
                <Link href="/" className="hover:text-[#2C5E43] transition-colors">Inicio</Link>
                <span>/</span>
                <Link href="/atractivos" className="hover:text-[#2C5E43] transition-colors">Atractivos</Link>
                {canton && (
                  <>
                    <span>/</span>
                    <Link href={`/cantones/${canton.slug}`} className="hover:text-[#2C5E43] transition-colors">{canton.nombre}</Link>
                  </>
                )}
                <span>/</span>
                <span className="text-[#3D4F45] font-medium truncate max-w-[120px]">{atractivo.nombre}</span>
              </nav>
            </aside>
          </div>
        </div>
      </section>

      {/* ── EVENTOS EN VIVO DEL CANTÓN ── */}
      {canton && (
        <SeccionEventosCanton
          canton={canton}
          eventosIniciales={eventosRes.eventos}
        />
      )}
    </>
  );
}
