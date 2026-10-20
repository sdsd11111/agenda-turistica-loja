"use client";

import { useState } from "react";
import Link from "next/link";
import type { Canton } from "@/types";
import type { EventoCultural } from "@/lib/services/eventosCultura";
import { formatearFechaEvento } from "@/lib/services/eventosCultura";

interface Props {
  canton: Canton;
  eventosIniciales: EventoCultural[];
}

export default function SeccionEventosCanton({ canton, eventosIniciales }: Props) {
  const [soloHoy, setSoloHoy] = useState(false);

  // Filtrado de eventos únicamente para este cantón si activa el toggle "Solo Hoy"
  const eventosDelCanton = eventosIniciales.filter((ev) => {
    if (!soloHoy) return true;
    const { esHoy } = formatearFechaEvento(ev.fechaInicio, ev.fechaFin);
    return esHoy;
  });

  const imagenFondo =
    canton.imagen ||
    "https://mvps.b-cdn.net/agenda-turistica/home/bg-eventos-loja.webp";

  return (
    <section
      id="eventos"
      className="relative isolate min-h-[70vh] flex flex-col justify-center py-24 text-white overflow-hidden bg-[#0a120c]"
    >
      {/* Fondo con Parallax Sutil e Inmersivo usando la imagen oficial del cantón */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 overflow-hidden pointer-events-none"
      >
        <div
          className="absolute -top-[15%] -bottom-[15%] left-0 right-0 bg-cover bg-center bg-no-repeat bg-fixed filter brightness-90 contrast-[1.05]"
          style={{
            backgroundImage: `url('${imagenFondo}')`,
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
              Agenda en Vivo · {canton.nombre}
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
            ¿Qué hacer en {canton.nombre} hoy y este fin de semana?
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "#FFFFFF",
              textShadow: "0 1px 10px rgba(0,0,0,0.85)",
            }}
            className="mt-3 text-sm sm:text-base !text-white/95 leading-relaxed max-w-2xl font-medium"
          >
            Cartelera cultural, ferias productivas, celebraciones tradicionales y programación turística en {canton.nombre} sincronizada en tiempo real con Agenda Cultural Loja.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={`https://www.agendaculturalloja.com/?ref=agendaturistica_${canton.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2C5E43] text-white hover:bg-[#387856] transition-all text-xs uppercase tracking-wider shadow-xl hover:scale-105"
            >
              <span>Ver Agenda Cultural Provincial</span>
              <span>↗</span>
            </a>
            {eventosIniciales.length > 0 && (
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
            )}
          </div>
        </div>

        {/* ── CARD CONTENEDORA DE LA CARTELERA ── */}
        <div className="rounded-3xl p-5 sm:p-7 bg-black/85 backdrop-blur-2xl border border-white/25 shadow-2xl">
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/20 flex-wrap gap-3">
            <div>
              <span className="text-[11px] text-[#52B788] uppercase font-bold tracking-widest drop-shadow-xs">
                Cartelera Verificada
              </span>
              <h3
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#FFFFFF" }}
                className="text-lg sm:text-2xl !text-white mt-0.5 leading-tight drop-shadow-sm"
              >
                {eventosDelCanton.length} actividad{eventosDelCanton.length === 1 ? "" : "es"}{" "}
                en {canton.nombre}
              </h3>
            </div>
            {eventosDelCanton.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/70 hidden sm:inline mr-2">Desliza para ver más →</span>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(`swipe-eventos-${canton.slug}`);
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
                    const el = document.getElementById(`swipe-eventos-${canton.slug}`);
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

          {eventosDelCanton.length === 0 ? (
            /* BANNER AMIGABLE / ESTADO PERSUASIVO CUANDO NO HAY EVENTOS */
            <div className="py-12 sm:py-16 text-center text-white/90 max-w-2xl mx-auto">
              <div className="size-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl mx-auto mb-4 backdrop-blur-md">
                🎉
              </div>
              <h4
                style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                className="text-xl sm:text-2xl text-white mb-2"
              >
                No hay eventos programados en los próximos días en {canton.nombre}
              </h4>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-6 font-normal">
                ¿Organizas una festividad, concierto, feria gastronómica o deportiva en {canton.nombre}?
                Publícala gratis en Agenda Cultural Loja para que aparezca aquí y llegue a miles de turistas.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <a
                  href={`https://www.agendaculturalloja.com/contacto?ref=agendaturistica_${canton.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                  className="px-6 py-3 rounded-full bg-[#52B788] hover:bg-[#439e73] text-[#0d140f] text-xs uppercase font-extrabold tracking-wider transition-all shadow-xl hover:scale-105"
                >
                  Publicar evento gratis en Agenda Cultural ↗
                </a>
                <Link
                  href="/eventos"
                  style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
                  className="px-6 py-3 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs uppercase tracking-wider transition-all border border-white/20"
                >
                  Ver cartelera de toda la provincia
                </Link>
              </div>
            </div>
          ) : (
            /* TRACK DE 1 SOLA FILA CON SWIPE NATURAL Y SCROLLBAR OCULTA */
            <div
              id={`swipe-eventos-${canton.slug}`}
              className="flex items-stretch gap-5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {eventosDelCanton.map((ev) => {
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
                        <span className="text-[10px] uppercase font-bold bg-[#2C5E43] text-white px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm truncate max-w-[140px]">
                          {ev.categoria || "Evento"}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md border shadow-sm ${
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
  );
}
