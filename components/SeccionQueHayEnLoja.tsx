"use client";

import { useState } from "react";
import Link from "next/link";
import { CANTONES } from "@/lib/data/cantones";
import type { EventoCultural } from "@/lib/services/eventosCultura";
import { formatearFechaEvento } from "@/lib/services/eventosCultura";

interface Props {
  eventosIniciales: EventoCultural[];
  conteoPorCanton: Record<string, number>;
}

export default function SeccionQueHayEnLoja({ eventosIniciales, conteoPorCanton }: Props) {
  const [filtroCanton, setFiltroCanton] = useState<string>("todos");
  const [soloHoy, setSoloHoy] = useState(false);
  const [modalCantonesAbierto, setModalCantonesAbierto] = useState(false);

  // Filtrado reactivo al cantón clickeado o solo hoy
  const eventosFiltrados = eventosIniciales.filter((ev) => {
    if (filtroCanton !== "todos" && ev.canton?.slug !== filtroCanton) return false;
    if (soloHoy) {
      const { esHoy } = formatearFechaEvento(ev.fechaInicio, ev.fechaFin);
      if (!esHoy) return false;
    }
    return true;
  });

  const cantonActualObj = CANTONES.find((c) => c.slug === filtroCanton);
  const nombreCantonActual =
    filtroCanton === "todos"
      ? "Todos los 16 Cantones"
      : cantonActualObj?.nombre || "Cantón";
  const emojiCantonActual =
    filtroCanton === "todos" ? "✨" : cantonActualObj?.emoji || "📍";

  return (
    <>
      <section
        id="eventos"
        className="relative isolate min-h-screen flex flex-col justify-center py-28 text-white overflow-hidden bg-[#0a120c]"
      >
        {/* Fondo con Parallax Sutil e Inmersivo */}
        <div
          aria-hidden
          className="absolute inset-0 -z-20 overflow-hidden pointer-events-none"
        >
          <div
            className="absolute -top-[15%] -bottom-[15%] left-0 right-0 bg-cover bg-center bg-no-repeat bg-fixed filter brightness-90 contrast-[1.05]"
            style={{
              backgroundImage: `url('https://mvps.b-cdn.net/agenda-turistica/home/bg-eventos-loja.webp')`,
            }}
          />
        </div>

        {/* Suave viñeteado en los bordes para separar de la sección superior e inferior */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAFAF8]/90 via-transparent to-black/60 pointer-events-none"
        />

        <div className="mx-auto w-[min(1420px,100%-48px)] relative z-10 my-auto">
          {/* ── CABECERA DE LA SECCIÓN ── */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#7ECB9A] text-[11px] font-semibold tracking-wider uppercase mb-4 shadow-lg">
              <span className="size-2 rounded-full bg-[#52B788] animate-pulse" />
              <span style={{ fontFamily: "var(--font-label)" }}>
                Agenda Provincial en Vivo · Loja
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
                textShadow: "0 2px 18px rgba(0,0,0,0.9)",
              }}
              className="text-3xl sm:text-4xl lg:text-5xl !text-white font-extrabold leading-tight"
            >
              ¿Qué hacer en Loja hoy y este fin de semana?
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "#FFFFFF",
                textShadow: "0 1px 10px rgba(0,0,0,0.85)",
              }}
              className="mt-3 text-sm sm:text-base !text-white/95 leading-relaxed max-w-2xl font-medium"
            >
              Cartelera cultural, conciertos, ferias gastronómicas y festividades en los 16 cantones sincronizadas en tiempo real con Agenda Cultural Loja.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="https://www.agendaculturalloja.com/?ref=agendaturistica_home"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2C5E43] text-white hover:bg-[#387856] transition-all text-xs uppercase tracking-wider shadow-xl hover:scale-105"
              >
                <span>Ver Agenda Cultural Provincial</span>
                <span>↗</span>
              </a>
              <button
                type="button"
                onClick={() => setSoloHoy(!soloHoy)}
                style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase transition-all backdrop-blur-md border shadow-lg ${
                  soloHoy
                    ? "bg-[#E63946] text-white border-white/40"
                    : "bg-black/60 text-white/90 border-white/25 hover:bg-black/80"
                }`}
              >
                <span className="size-2 rounded-full bg-white" />
                <span>Solo eventos de hoy</span>
              </button>
              <Link
                href="/eventos"
                style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs uppercase tracking-wider transition-all backdrop-blur-md"
              >
                <span>Ver cartelera completa</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* ── BARRA DE SELECCIÓN Y FILTRO POR CANTÓN ── */}
          <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white/90 flex items-center gap-1.5">
                <span>{emojiCantonActual}</span>
                <span>{nombreCantonActual}</span>
              </span>
              <span className="text-xs text-white/50">·</span>
              <span className="text-xs text-[#52B788] font-semibold">
                {eventosFiltrados.length} evento{eventosFiltrados.length === 1 ? "" : "s"} disponible{eventosFiltrados.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setModalCantonesAbierto(!modalCantonesAbierto)}
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs uppercase tracking-wider transition-all backdrop-blur-md cursor-pointer"
              >
                <span>🏛️ Filtrar por Cantón ({CANTONES.length})</span>
                <span>{modalCantonesAbierto ? "▲" : "▼"}</span>
              </button>
              {filtroCanton !== "todos" && (
                <button
                  type="button"
                  onClick={() => setFiltroCanton("todos")}
                  className="text-xs text-[#7ECB9A] hover:underline"
                >
                  Ver todos los cantones
                </button>
              )}
            </div>
          </div>

          {/* ── ACORDEÓN DESPLEGABLE: 16 CANTONES ── */}
          <div
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              modalCantonesAbierto
                ? "max-h-[600px] opacity-100 mb-6"
                : "max-h-0 opacity-0 mb-0 pointer-events-none"
            }`}
          >
            <div className="p-5 sm:p-6 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/15 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#52B788] uppercase font-bold tracking-wider">
                    Red Territorial Oficial · 16 Cantones
                  </span>
                  <span className="text-white/40 text-xs">|</span>
                  <span className="text-white/70 text-xs">Selecciona un cantón para filtrar</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFiltroCanton("todos");
                    setModalCantonesAbierto(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                    filtroCanton === "todos"
                      ? "bg-[#52B788] text-[#0d140f] border-transparent"
                      : "bg-white/10 hover:bg-white/20 text-white border-white/20"
                  }`}
                >
                  🌐 Ver los 16 cantones (Todos)
                </button>
              </div>

              {/* GRID DE CANTONES */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {CANTONES.map((c) => {
                  const seleccionado = filtroCanton === c.slug;
                  const cantidadCanton = conteoPorCanton[c.slug] || 0;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => {
                        setFiltroCanton(c.slug);
                        setModalCantonesAbierto(false);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer group ${
                        seleccionado
                          ? "bg-[#2C5E43] border-[#7ECB9A] text-white shadow-md scale-[1.03]"
                          : "bg-white/5 border-white/10 hover:bg-white/15 text-white/90 hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center gap-1 justify-center w-full">
                        <span className="font-bold text-xs truncate group-hover:text-[#7ECB9A] transition-colors">
                          {c.nombre}
                        </span>
                        {cantidadCanton > 0 && (
                          <span className="size-4 rounded-full bg-[#52B788] text-[#0d140f] text-[9px] font-extrabold flex items-center justify-center">
                            {cantidadCanton}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-white/50 truncate w-full">
                        {c.cabecera}
                      </span>
                      {seleccionado && (
                        <span className="size-1.5 rounded-full bg-[#7ECB9A] mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── 1 SOLA FILA CON SWIPE / SCROLL HORIZONTAL SUAVE Y CONTROLES ── */}
          <div className="rounded-3xl p-5 sm:p-7 bg-black/85 backdrop-blur-2xl border border-white/25 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/20 flex-wrap gap-3">
              <div>
                <span className="text-[11px] text-[#52B788] uppercase font-bold tracking-widest drop-shadow-xs">
                  Cartelera actual
                </span>
                <h3
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#FFFFFF" }}
                  className="text-lg sm:text-2xl !text-white mt-0.5 leading-tight drop-shadow-sm"
                >
                  {eventosFiltrados.length} actividad{eventosFiltrados.length === 1 ? "" : "es"} en {nombreCantonActual}
                </h3>
              </div>
              {eventosFiltrados.length > 1 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white/70 hidden sm:inline mr-2">Desliza para ver más →</span>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("swipe-eventos-track");
                      if (el) el.scrollBy({ left: -340, behavior: "smooth" });
                    }}
                    className="size-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Anterior"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("swipe-eventos-track");
                      if (el) el.scrollBy({ left: 340, behavior: "smooth" });
                    }}
                    className="size-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Siguiente"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            {eventosFiltrados.length === 0 ? (
              <div className="py-12 text-center text-white/80 max-w-lg mx-auto">
                <span className="text-4xl block mb-2">📅</span>
                <p className="text-base font-medium">
                  No hay eventos registrados en {nombreCantonActual} para este filtro.
                </p>
                <p className="text-xs text-white/60 mt-1">
                  Prueba seleccionando otro cantón o haz clic en &ldquo;Ver todos los cantones&rdquo; para explorar la agenda provincial completa.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => {
                      setFiltroCanton("todos");
                      setSoloHoy(false);
                    }}
                    className="px-5 py-2 rounded-full bg-[#2C5E43] hover:bg-[#387856] text-white text-xs uppercase font-bold tracking-wider transition-all"
                  >
                    Restablecer filtros
                  </button>
                  <a
                    href="https://www.agendaculturalloja.com/contacto?ref=agendaturistica_home_empty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs uppercase font-bold tracking-wider transition-all"
                  >
                    Publicar un evento gratis ↗
                  </a>
                </div>
              </div>
            ) : (
              /* TRACK DE 1 SOLA FILA CON SWIPE NATURAL Y SCROLLBAR OCULTA */
              <div
                id="swipe-eventos-track"
                className="flex items-stretch gap-5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {eventosFiltrados.map((ev) => {
                  const fechaInfo = formatearFechaEvento(ev.fechaInicio, ev.fechaFin);
                  return (
                    <article
                      key={ev.id || ev.slug}
                      className="w-[280px] sm:w-[330px] shrink-0 snap-start rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col overflow-hidden hover:border-[#52B788] hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="relative h-[170px] w-full overflow-hidden bg-black/40">
                        <img
                          src={
                            ev.imagenUrl ||
                            "https://mvps.b-cdn.net/agenda-turistica/home/bg-eventos-loja.webp"
                          }
                          alt={ev.nombre}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                          {/* BADGE DEL CANTÓN DESTACADO */}
                          <span className="text-[10px] uppercase font-bold bg-[#52B788] text-[#0d140f] px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm truncate max-w-[130px]">
                            📍 {ev.canton?.nombre || "Loja"}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md border shadow-sm ${
                              fechaInfo.esHoy
                                ? "bg-[#E63946] text-white border-white/30 animate-pulse"
                                : "bg-black/60 text-white border-white/20"
                            }`}
                          >
                            {fechaInfo.etiquetaBadge}
                          </span>
                        </div>

                        <div className="absolute bottom-2 left-2.5 right-2.5 text-xs font-semibold text-white drop-shadow-md truncate">
                          📅 {fechaInfo.fechaLegible}
                        </div>
                      </div>

                      <div className="p-4 flex flex-col flex-1 justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="text-[10px] uppercase font-bold text-[#7ECB9A]">
                              {ev.categoria || "Cultura"}
                            </span>
                            {ev.organizador && (
                              <>
                                <span className="text-white/40 text-[10px]">·</span>
                                <span className="text-[10px] text-white/60 truncate">
                                  {ev.organizador}
                                </span>
                              </>
                            )}
                          </div>
                          <h4
                            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                            className="text-base text-white leading-snug line-clamp-2 group-hover:text-[#7ECB9A] transition-colors"
                          >
                            {ev.nombre}
                          </h4>
                          {ev.resumen && (
                            <p className="mt-1.5 text-xs text-white/80 line-clamp-2 leading-relaxed">
                              {ev.resumen}
                            </p>
                          )}
                        </div>

                        <div className="mt-4 pt-2.5 border-t border-white/15">
                          <p className="text-[11px] text-white/85 flex items-center gap-1.5 truncate">
                            <span>📍</span>
                            <span className="truncate">{ev.lugar}</span>
                          </p>
                          {fechaInfo.horaLegible && (
                            <p className="text-[11px] text-white/75 flex items-center gap-1.5 mt-0.5 truncate">
                              <span>⏰</span>
                              <span>{fechaInfo.horaLegible}</span>
                            </p>
                          )}
                          <a
                            href={ev.flywheelLink || ev.canonicalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                            className="mt-3 block w-full py-2.5 rounded-xl bg-white text-[#17201B] hover:bg-[#52B788] hover:text-[#0d140f] transition-all text-center text-xs uppercase tracking-wider font-extrabold shadow-md cursor-pointer"
                          >
                            Ver programación en Agenda Cultural →
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
