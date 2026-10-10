"use client";

import { useState } from "react";
import Link from "next/link";
import type { Canton, Atractivo } from "@/types";

interface Props {
  canton: Canton;
  atractivos: Atractivo[];
}

// Mapeo curado de atractivos a sus páginas y guías SEO dedicadas
const ATRACTIVO_GUIA_MAP: Record<string, string> = {
  "parque-nacional-podocarpus": "/guias/parque-podocarpus-senderismo",
  "vilcabamba": "/guias/ruta-del-cafe-vilcabamba",
  "centro-historico-de-loja": "/guias/que-hacer-en-loja-3-dias",
  "santuario-de-el-cisne": "/guias/romeria-virgen-del-cisne-loja",
  "saraguro-cultura-kichwa": "/guias/saraguro-turismo-cultural-kichwa",
  "catamayo-valle": "/guias/como-llegar-a-loja",
  "macara-frontera": "/guias/que-hacer-en-macara-y-la-frontera",
  "puyango-bosque-petrificado": "/guias/bosque-petrificado-puyango-guia",
  "quilanga-aroma-cafe-montana": "/guias/quilanga-ruta-cafe-mirador-chiro",
  "zapotillo-florecimiento-guayacanes": "/guias/zapotillo-guayacanes-bosque-seco",
  "espindola-lagunas-amaluza": "/guias/espindola-lagunas-negras-yacuri",
  "calvas-cerro-ahuaca": "/guias/calvas-cariamanga-cerro-ahuaca",
};

export default function SeccionDecisionCanton({ canton, atractivos }: Props) {
  const [modalAtractivos, setModalAtractivos] = useState(false);

  const iniciarAsesorIA = (promptEspecial?: string) => {
    const texto =
      promptEspecial ||
      `Hola, deseo organizar un viaje para visitar los principales atractivos de ${canton.nombre}, Loja. Por favor recomiéndame un itinerario de 2 días con tiempos de viaje, recomendaciones gastronómicas y opciones de hospedaje.`;
    window.dispatchEvent(
      new CustomEvent("abrir-chat-turismo", {
        detail: { mensajeInicial: texto },
      })
    );
  };

  const getDestinoUrl = (slug: string) => {
    return ATRACTIVO_GUIA_MAP[slug] || `/atractivos#${slug}`;
  };

  const getDestinoLabel = (slug: string) => {
    return ATRACTIVO_GUIA_MAP[slug] ? "Ver Guía Completa ↗" : "Ver en Atractivos ↗";
  };

  const atractivosMostrados = atractivos.slice(0, 5);

  return (
    <>
      <section className="pt-20 pb-16 bg-[#FAFAF8] text-[#17201B]" id="decision-canton">
        <div className="mx-auto w-[min(1420px,100%-48px)]">
          <div className="max-w-2xl mb-12">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43] font-semibold block mb-2"
            >
              Planifica tu viaje a {canton.nombre} · Provincia de Loja
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.025em" }}
              className="text-3xl sm:text-4xl text-[#17201B]"
            >
              Lugares Turísticos, Rutas y Qué Hacer en {canton.nombre}
            </h2>
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="mt-2 text-sm sm:text-base text-[#47554E] leading-relaxed"
            >
              {canton.descripcion} Descubre sus sitios emblemáticos, crea un itinerario personalizado o consulta las actividades en vivo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {/* ── CARD 1: ATRACTIVOS DE ESTE CANTÓN ── */}
            <div className="relative rounded-[32px] overflow-hidden min-h-[480px] sm:min-h-[520px] flex flex-col justify-between p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white/20 group transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.28)]">
              <img
                src={canton.imagen || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"}
                alt={`Lugares turísticos de ${canton.nombre}`}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/95 text-[11px] font-semibold tracking-wider uppercase">
                  <span className="size-2 rounded-full bg-[#52B788] animate-pulse" />
                  Atractivos Cantón
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] font-medium">
                  {canton.cabecera}
                </span>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/75 backdrop-blur-2xl border border-white/30 shadow-2xl text-white">
                  <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-[#52B788] font-bold mb-1 drop-shadow-xs">
                        Destinos Destacados
                      </p>
                      <h3
                        style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}
                        className="text-xl sm:text-2xl !text-white leading-tight drop-shadow-md"
                      >
                        Lugares Clave de {canton.nombre}
                      </h3>
                      <p
                        style={{ fontFamily: "var(--font-body)", color: "#E2E8F0" }}
                        className="text-xs sm:text-sm !text-gray-200 mt-1 line-clamp-2 font-normal"
                      >
                        {canton.atractivo ? `Principal: ${canton.atractivo}.` : `Descubre la naturaleza, miradores y arquitectura de ${canton.nombre}.`}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setModalAtractivos(true)}
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className="px-5 py-3 rounded-xl bg-white text-[#17201B] hover:bg-[#52B788] hover:text-white transition-all text-xs uppercase tracking-wider shrink-0 shadow-lg flex items-center justify-center gap-2 font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Ver Atractivos</span>
                      <span className="text-sm">↗</span>
                    </button>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-white/20 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {atractivosMostrados.length > 0 ? (
                      atractivosMostrados.map((a) => (
                        <Link
                          key={a.slug}
                          href={getDestinoUrl(a.slug)}
                          style={{ color: "#FFFFFF" }}
                          className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-[11px] font-semibold !text-white transition-all cursor-pointer shadow-2xs hover:scale-105 inline-flex items-center gap-1"
                        >
                          <span>{a.nombre}</span>
                          <span className="text-[10px] opacity-75">↗</span>
                        </Link>
                      ))
                    ) : (
                      <span className="text-xs text-white/70">
                        {canton.atractivo || `Patrimonio natural de ${canton.nombre}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── CARD 2: ITINERARIOS Y RUTAS IA EN ESTE CANTÓN ── */}
            <div className="relative rounded-[32px] overflow-hidden min-h-[480px] sm:min-h-[520px] flex flex-col justify-between p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white/20 group transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.28)]">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                alt={`Rutas en ${canton.nombre}`}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold tracking-wider uppercase">
                  <span className="size-2 rounded-full bg-[#F2C14E] animate-ping" />
                  Asesor IA de Rutas
                </span>
                <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white text-[11px] font-medium">
                  Itinerario 1 a 2 Días
                </span>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/75 backdrop-blur-2xl border border-white/30 shadow-2xl text-white">
                  <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-[#F2C14E] font-bold mb-1 drop-shadow-xs">
                        Planifica tu viaje
                      </p>
                      <h3
                        style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}
                        className="text-xl sm:text-2xl !text-white leading-tight drop-shadow-md"
                      >
                        Rutas en {canton.nombre}
                      </h3>
                      <p
                        style={{ fontFamily: "var(--font-body)", color: "#E2E8F0" }}
                        className="text-xs sm:text-sm !text-gray-200 mt-1 line-clamp-2 font-normal"
                      >
                        Genera un itinerario a medida con paradas recomendadas, tiempos y gastronomía local.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => iniciarAsesorIA()}
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className="px-5 py-3 rounded-xl bg-[#2C5E43] text-white hover:bg-[#3d7c5a] transition-all text-xs uppercase tracking-wider shrink-0 shadow-lg flex items-center justify-center gap-2 font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-white/20"
                    >
                      <span>Crear ruta</span>
                      <span className="text-sm">⚡</span>
                    </button>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-white/20 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        iniciarAsesorIA(
                          `¿Qué lugares y platos típicos no me puedo perder en una escapada de 1 día a ${canton.nombre}?`
                        )
                      }
                      style={{ color: "#FFFFFF" }}
                      className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-[11px] font-semibold !text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>🥾</span>
                      <span>Escapada 1 día</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        iniciarAsesorIA(
                          `Recomiéndame una ruta de naturaleza, aventura y fotografía de 2 días en el cantón ${canton.nombre}.`
                        )
                      }
                      style={{ color: "#FFFFFF" }}
                      className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-[11px] font-semibold !text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>🌿</span>
                      <span>Naturaleza & Fotos</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CARD 3: ¿QUÉ HACER HOY EN ESTE CANTÓN? ── */}
            <div className="relative rounded-[32px] overflow-hidden min-h-[480px] sm:min-h-[520px] flex flex-col justify-between p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white/20 group transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.28)] md:col-span-2 lg:col-span-1">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80"
                alt={`Qué hacer hoy en ${canton.nombre}`}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold tracking-wider uppercase">
                  <span className="size-2 rounded-full bg-[#E63946] animate-ping" />
                  Cartelera en Vivo
                </span>
                <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white text-[11px] font-medium">
                  {canton.nombre}
                </span>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/75 backdrop-blur-2xl border border-white/30 shadow-2xl text-white">
                  <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-[#7ECB9A] font-bold mb-1 drop-shadow-xs">
                        Agenda & Festividades
                      </p>
                      <h3
                        style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}
                        className="text-xl sm:text-2xl !text-white leading-tight drop-shadow-md"
                      >
                        ¿Qué hacer hoy en {canton.nombre}?
                      </h3>
                      <p
                        style={{ fontFamily: "var(--font-body)", color: "#E2E8F0" }}
                        className="text-xs sm:text-sm !text-gray-200 mt-1 line-clamp-2 font-normal"
                      >
                        Eventos del día, ferias cívicas y actividades culturales de fin de semana en {canton.nombre}.
                      </p>
                    </div>

                    <Link
                      href="#eventos"
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className="px-5 py-3 rounded-xl bg-[#52B788] text-white hover:bg-[#3d966c] transition-all text-xs uppercase tracking-wider shrink-0 shadow-lg flex items-center justify-center gap-2 font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-white/20 text-center"
                    >
                      <span>Ver Eventos</span>
                      <span className="text-sm">↓</span>
                    </Link>
                  </div>

                  <div className="mt-4 pt-3.5 border-t border-white/20 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-white/80 font-medium">
                      📍 Cabecera cantonal: {canton.cabecera}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODAL ATRACTIVOS DE ESTE CANTÓN (PREMIUM + HIGH CONTRAST + LINKS SEO) ── */}
      {modalAtractivos && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          style={{ animation: "fadeIn 0.18s ease-out" }}
          onClick={() => setModalAtractivos(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0F1813] text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-white/20 relative max-h-[88vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-5 border-b border-white/20">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#52B788] font-bold block mb-1">
                  Atractivos y Rutas Oficiales
                </span>
                <h3
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}
                  className="text-2xl sm:text-3xl text-white font-extrabold"
                >
                  Lugares Turísticos en {canton.nombre}
                </h3>
                <p className="text-xs text-[#E5E7EB] mt-1.5 font-medium">
                  Haz clic en cualquier lugar para ver su guía de viaje completa.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalAtractivos(false)}
                className="size-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center font-bold text-lg transition-colors shrink-0 ml-3 border border-white/20"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            {/* Lista interactiva */}
            <div className="overflow-y-auto py-4 space-y-3 pr-1">
              {atractivos.length === 0 ? (
                <div className="text-center py-10 bg-white/5 rounded-2xl border border-white/10 px-4">
                  <p className="text-sm text-white font-medium">
                    {canton.atractivo || `Estamos ampliando la ficha de destinos para ${canton.nombre}.`}
                  </p>
                  <p className="text-xs text-[#D1D5DB] mt-1">
                    Puedes consultar rutas con nuestro Asesor IA o recomendar un nuevo atractivo.
                  </p>
                  <div className="mt-5 flex justify-center gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => { setModalAtractivos(false); iniciarAsesorIA(); }}
                      className="px-4 py-2.5 rounded-xl bg-[#52B788] hover:bg-[#3d966c] text-white text-xs font-bold transition-all shadow-md"
                    >
                      Consultar Rutas en {canton.nombre} ✦
                    </button>
                    <Link
                      href="/contacto"
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20"
                    >
                      Recomendar atractivo ↗
                    </Link>
                  </div>
                </div>
              ) : (
                atractivos.map((a) => {
                  const url = getDestinoUrl(a.slug);
                  const label = ATRACTIVO_GUIA_MAP[a.slug] ? "Ver Guía Completa" : "Ver en Atractivos";
                  return (
                    <Link
                      key={a.slug}
                      href={url}
                      onClick={() => setModalAtractivos(false)}
                      className="p-5 rounded-2xl bg-[#1A2820] hover:bg-[#23382D] border border-white/20 hover:border-[#52B788] transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg group block"
                    >
                      <div className="flex items-start gap-4 min-w-0">
                        <span className="text-2xl sm:text-3xl shrink-0 p-3 rounded-2xl bg-black/50 border border-white/15">
                          {a.emoji || "📍"}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <h4
                              style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#FFFFFF" }}
                              className="text-base sm:text-lg text-white font-bold group-hover:text-[#52B788] transition-colors leading-tight"
                            >
                              {a.nombre}
                            </h4>
                            <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#52B788]/20 text-[#A7F3D0] border border-[#52B788]/40">
                              {a.categoria}
                            </span>
                          </div>
                          <p className="text-xs text-[#E5E7EB] leading-relaxed line-clamp-2">
                            {a.descripcion}
                          </p>
                          {a.duracion && (
                            <span className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-semibold bg-white/15 text-white px-2.5 py-0.5 rounded-md border border-white/20">
                              ⏱ {a.duracion}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div
                        style={{ fontFamily: "var(--font-label)", fontWeight: 700, color: "#0F1813", backgroundColor: "#FFFFFF" }}
                        className="self-stretch sm:self-center px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold shrink-0 text-center shadow-md flex items-center justify-center gap-1.5 min-w-[150px] group-hover:!bg-[#52B788] group-hover:!text-white transition-all"
                      >
                        {label} →
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/20 flex items-center justify-between flex-wrap gap-3">
              <Link
                href="/atractivos"
                onClick={() => setModalAtractivos(false)}
                className="text-xs text-[#52B788] hover:text-white transition-colors font-semibold flex items-center gap-1"
              >
                <span>Ver catálogo completo de los 16 cantones</span>
                <span>→</span>
              </Link>
              <button
                type="button"
                onClick={() => setModalAtractivos(false)}
                className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition-colors border border-white/20"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
