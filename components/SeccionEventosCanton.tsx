"use client";

import { useState } from "react";
import Link from "next/link";
import type { Canton } from "@/types";
import { EVENTOS_DESTACADOS } from "@/lib/data/eventos";

interface Props {
  canton: Canton;
}

export default function SeccionEventosCanton({ canton }: Props) {
  const [soloHoy, setSoloHoy] = useState(false);

  // Filtrado de eventos únicamente para este cantón
  const eventosDelCanton = EVENTOS_DESTACADOS.filter((ev) => {
    if (ev.cantonSlug !== canton.slug) return false;
    if (soloHoy && !ev.esHoy) return false;
    return true;
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

      {/* Solo un suave viñeteado en los bordes para separar de la sección superior e inferior */}
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
            style={{ fontFamily: "var(--font-body)", color: "#FFFFFF", textShadow: "0 1px 10px rgba(0,0,0,0.85)" }}
            className="mt-3 text-sm sm:text-base !text-white/95 leading-relaxed max-w-2xl font-medium"
          >
            Cartelera cultural, ferias productivas, celebraciones tradicionales y programación turística en {canton.nombre}.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="https://agendaculturalloja.com/"
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
              <span className={`size-2 rounded-full ${soloHoy ? "bg-white animate-ping" : "bg-[#E63946]"}`} />
              <span>{soloHoy ? "Mostrando solo hoy" : "Filtrar solo hoy"}</span>
            </button>
          </div>
        </div>

        {/* ── BARRA INFORMATIVA DEL CANTÓN ── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/25 shadow-2xl">
          <div className="flex items-center gap-3.5">
            <div className="size-11 rounded-xl bg-[#52B788]/20 border border-[#52B788]/40 flex items-center justify-center text-[#52B788] shrink-0 shadow-inner">
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-[#52B788] uppercase font-bold tracking-widest drop-shadow-xs">
                Territorio seleccionado
              </p>
              <h3
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "#FFFFFF" }}
                className="text-lg sm:text-2xl !text-white leading-tight drop-shadow-sm"
              >
                Cantón {canton.nombre} · Cabecera: {canton.cabecera}
              </h3>
            </div>
          </div>

          <Link
            href="/#eventos"
            style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white border border-white/30 text-xs uppercase tracking-wider transition-all cursor-pointer font-bold flex items-center gap-2"
          >
            <span>Ver los 16 cantones</span>
            <span>↗</span>
          </Link>
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
                {eventosDelCanton.length} actividad{eventosDelCanton.length === 1 ? "" : "es"} en {canton.nombre}
              </h3>
            </div>
            {eventosDelCanton.length > 0 && (
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
            <div className="py-12 text-center text-white/80">
              <span className="text-4xl block mb-2">📅</span>
              <p className="text-base font-medium">No hay eventos masivos registrados hoy en {canton.nombre}.</p>
              <p className="text-xs text-white/60 mt-1 max-w-md mx-auto">
                ¿Organizas una feria, concierto o festividad patronal en {canton.nombre}? Puedes registrarla gratuitamente en la Agenda Oficial.
              </p>
              <div className="mt-4 flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/contacto"
                  className="px-5 py-2 rounded-full bg-[#2C5E43] hover:bg-[#387856] text-white text-xs uppercase font-bold tracking-wider transition-all"
                >
                  Registrar evento en {canton.nombre} ↗
                </Link>
                <Link
                  href="/#eventos"
                  className="px-5 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs uppercase font-bold tracking-wider transition-all"
                >
                  Explorar agenda provincial
                </Link>
              </div>
            </div>
          ) : (
            /* TRACK DE 1 SOLA FILA CON SWIPE NATURAL Y SCROLLBAR OCULTA */
            <div
              id={`swipe-eventos-${canton.slug}`}
              className="flex items-stretch gap-5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {eventosDelCanton.map((ev) => (
                <article
                  key={ev.slug}
                  className="w-[280px] sm:w-[330px] shrink-0 snap-start rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col overflow-hidden hover:border-[#52B788] hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative h-[160px] w-full overflow-hidden">
                    <img
                      src={ev.imagen}
                      alt={ev.titulo}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold bg-[#2C5E43] text-white px-2 py-0.5 rounded-full shadow-sm">
                        {ev.categoria}
                      </span>
                      <span className="text-[10px] font-semibold bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur-sm border border-white/20">
                        {ev.gratis ? "Acceso libre" : "Con entrada"}
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2.5 text-xs font-bold text-white drop-shadow-md">
                      📅 {ev.fechaTexto} · {ev.cantonNombre}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h4
                        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                        className="text-base text-white leading-snug line-clamp-2 group-hover:text-[#7ECB9A] transition-colors"
                      >
                        {ev.titulo}
                      </h4>
                      <p className="mt-1.5 text-xs text-white/80 line-clamp-2 leading-relaxed">
                        {ev.descripcion}
                      </p>
                    </div>
                    <div className="mt-4 pt-2.5 border-t border-white/15">
                      <p className="text-[11px] text-white/80 flex items-center gap-1.5 truncate">
                        <span>📍</span>
                        <span className="truncate">{ev.lugar}</span>
                      </p>
                      {ev.hora && (
                        <p className="text-[11px] text-white/70 flex items-center gap-1.5 mt-0.5 truncate">
                          <span>⏰</span>
                          <span>{ev.hora}</span>
                        </p>
                      )}
                      <a
                        href={ev.urlExterna || "https://agendaculturalloja.com/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                        className="mt-3 block w-full py-2 rounded-xl bg-white text-[#17201B] hover:bg-[#52B788] hover:text-white transition-all text-center text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer"
                      >
                        Ver detalles ↗
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
