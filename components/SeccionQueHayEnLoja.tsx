"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { EVENTOS_DESTACADOS } from "@/lib/data/eventos";

const CANTONES_CON_EVENTOS = [
  { slug: "todos", nombre: "Todos" },
  { slug: "loja", nombre: "Loja & Vilcabamba" },
  { slug: "saraguro", nombre: "Saraguro" },
  { slug: "catamayo", nombre: "Catamayo" },
  { slug: "zapotillo", nombre: "Zapotillo" },
];

export default function SeccionQueHayEnLoja() {
  const [filtroCanton, setFiltroCanton] = useState("todos");
  const [soloHoy, setSoloHoy] = useState(false);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const eventosFiltrados = EVENTOS_DESTACADOS.filter((ev) => {
    if (filtroCanton !== "todos" && ev.cantonSlug !== filtroCanton) return false;
    return true;
  });

  // Si no ha presionado "Ver más", mostramos hasta 3 eventos; si presiona "Ver más", se despliegan todos para swipe libre
  const eventosVisibles = mostrarTodos ? eventosFiltrados : eventosFiltrados.slice(0, 3);
  const hayMasEventos = eventosFiltrados.length > 3;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-white text-[#17201B] border-t border-[#EEF0EA]" id="eventos">

      {/* ── ENCABEZADO con ancho contenido ── */}
      <div className="mx-auto w-[min(1180px,100%-40px)]">

        {/* Banner superior */}
        <div className="rounded-2xl p-7 sm:p-9 mb-10 border border-[#E8EAE3] bg-[#FAFAF8] flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="max-w-2xl">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43] block mb-2 flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#2C5E43] animate-ping inline-block" />
              Agenda Provincial en Vivo
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.025em" }}
              className="text-2xl sm:text-3xl lg:text-4xl text-[#17201B]"
            >
              ¿Qué hacer en Loja hoy y este fin de semana?
            </h2>
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="mt-2 text-sm sm:text-base text-[#47554E] leading-relaxed"
            >
              Cartelera cultural, conciertos, ferias productivas en los 16 cantones y programación oficial del Festival de Artes Vivas 2026.
            </p>
          </div>
          <a
            href="https://agendaculturalloja.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-label)", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.04em" }}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C5E43] text-white hover:bg-[#224B35] transition-all shadow-sm uppercase"
          >
            <span>Ver Agenda Cultural</span>
            <span>↗</span>
          </a>
        </div>

        {/* Barra de controles */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h3
                style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.015em" }}
                className="text-xl text-[#17201B]"
              >
                Eventos y actividades
              </h3>
              <p style={{ fontFamily: "var(--font-body)" }} className="text-xs text-[#64746B] mt-0.5">
                {mostrarTodos
                  ? `Mostrando ${eventosFiltrados.length} eventos · Desliza horizontalmente`
                  : `Mostrando ${Math.min(3, eventosFiltrados.length)} de ${eventosFiltrados.length} eventos`}
              </p>
            </div>

            {/* Botones de navegación flecha */}
            <div className="hidden sm:flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="Anterior"
                className="size-8 rounded-full border border-[#E8EAE3] bg-white hover:bg-[#FAFAF8] text-[#17201B] flex items-center justify-center text-sm shadow-xs transition-colors"
              >
                ←
              </button>
              <button
                type="button"
                onClick={scrollRight}
                aria-label="Siguiente"
                className="size-8 rounded-full border border-[#E8EAE3] bg-white hover:bg-[#FAFAF8] text-[#17201B] flex items-center justify-center text-sm shadow-xs transition-colors"
              >
                →
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Botón Ver Más / Ver Menos si hay más eventos */}
            {hayMasEventos && (
              <button
                onClick={() => setMostrarTodos(!mostrarTodos)}
                style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.04em" }}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase transition-all border ${
                  mostrarTodos
                    ? "bg-[#17201B] text-white border-[#17201B]"
                    : "bg-[#EBF3ED] text-[#2C5E43] border-[#2C5E43]/30 hover:bg-[#2C5E43] hover:text-white"
                }`}
              >
                {mostrarTodos ? "Ver Menos" : `Ver Más (${eventosFiltrados.length - 3}+)`}
              </button>
            )}

            {/* Toggle Hoy */}
            <button
              onClick={() => setSoloHoy(!soloHoy)}
              style={{ fontFamily: "var(--font-label)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.04em" }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs uppercase transition-all border ${
                soloHoy
                  ? "bg-[#2C5E43] text-white border-[#2C5E43] shadow-sm"
                  : "bg-[#FAFAF8] text-[#64746B] border-[#E8EAE3] hover:border-[#2C5E43]/40"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${soloHoy ? "bg-white animate-ping" : "bg-[#2C5E43]"}`} />
              Hoy
            </button>

            {/* Filtros cantón */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5">
              {CANTONES_CON_EVENTOS.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => {
                    setFiltroCanton(c.slug);
                    setMostrarTodos(false);
                  }}
                  style={{ fontFamily: "var(--font-label)", fontWeight: filtroCanton === c.slug ? 600 : 500 }}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all shrink-0 ${
                    filtroCanton === c.slug
                      ? "bg-[#17201B] text-white shadow-xs"
                      : "bg-[#FAFAF8] text-[#47554E] border border-[#E8EAE3] hover:text-[#17201B] hover:bg-[#EEF0EA]"
                  }`}
                >
                  {c.nombre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          CARRUSEL HORIZONTAL FULL-WIDTH CON SCROLL SNAP
      ══════════════════════════════════════════════════════ */}
      {soloHoy ? (
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <div className="rounded-2xl border border-[#E8EAE3] bg-[#FAFAF8] p-8 text-center max-w-lg mx-auto">
            <h4 className="text-xl font-bold text-[#17201B]">Planes recomendados para hoy</h4>
            <p className="mt-2 text-xs text-[#64746B] leading-relaxed">
              Recorrido peatonal del Centro Histórico de Loja, degustación de café de especialidad y rutas naturales en Vilcabamba.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/cantones/loja" className="px-4 py-2 rounded-full bg-[#2C5E43] text-xs text-white hover:bg-[#224B35] transition-all font-semibold">
                Ver atractivos de Loja
              </Link>
              <button onClick={() => setSoloHoy(false)} className="px-4 py-2 rounded-full border border-[#E8EAE3] text-xs text-[#64746B] hover:bg-white transition-all font-medium">
                Ver todos los eventos
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Fade derecho — indicador visual de que hay más */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-4 w-24 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Track con padding para que las cards se desplacen */}
          <div
            ref={scrollRef}
            className="eventos-scroll px-[max(20px,calc((100vw-1180px)/2+20px))] py-2"
          >
            {eventosVisibles.length === 0 ? (
              <div className="w-full min-w-[280px] p-8 rounded-2xl border border-[#E8EAE3] bg-[#FAFAF8] text-center">
                <p style={{ fontFamily: "var(--font-body)" }} className="text-sm text-[#64746B]">
                  No hay eventos en este cantón por ahora.
                </p>
              </div>
            ) : (
              eventosVisibles.map((ev, i) => (
                <article
                  key={ev.slug}
                  className="w-[min(340px,85vw)] sm:w-[360px] rounded-2xl bg-white border border-[#E8EAE3] flex flex-col overflow-hidden hover:border-[#2C5E43]/40 hover:shadow-lg transition-all duration-200 shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
                >
                  {/* Imagen */}
                  <div className="relative h-[200px] w-full overflow-hidden group">
                    {ev.imagen ? (
                      <>
                        <img
                          src={ev.imagen}
                          alt={ev.titulo}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                          loading={i < 3 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#17201B]/70 via-black/10 to-transparent" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-[#EBF3ED] flex items-center justify-center">
                        <span className="text-4xl opacity-30">📅</span>
                      </div>
                    )}

                    {/* Badges sobre imagen */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span
                        style={{ fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: "0.07em" }}
                        className="text-[9px] uppercase bg-white/90 backdrop-blur-sm text-[#2C5E43] px-2.5 py-1 rounded-full shadow-xs"
                      >
                        {ev.categoria}
                      </span>
                      <span
                        style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
                        className={`text-[9px] backdrop-blur-sm text-white px-2.5 py-1 rounded-full ${
                          ev.gratis ? "bg-[#2C5E43]/90" : "bg-[#D4A373]/90"
                        }`}
                      >
                        {ev.gratis ? "Acceso libre" : "Con entrada"}
                      </span>
                    </div>

                    {/* Fecha al pie de la imagen */}
                    <div className="absolute bottom-3 left-3">
                      <span
                        style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                        className="text-[11px] text-white drop-shadow"
                      >
                        {ev.fechaTexto}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-5 flex flex-col flex-1">
                    <h4
                      style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.015em" }}
                      className="text-[15px] text-[#17201B] leading-snug"
                    >
                      {ev.titulo}
                    </h4>

                    <p
                      style={{ fontFamily: "var(--font-body)" }}
                      className="mt-2 text-xs text-[#47554E] line-clamp-2 leading-relaxed flex-1"
                    >
                      {ev.descripcion}
                    </p>

                    <div
                      style={{ fontFamily: "var(--font-body)" }}
                      className="mt-3 pt-3 border-t border-[#EEF0EA] text-[11px] text-[#64746B] space-y-1"
                    >
                      <p className="flex items-center gap-1.5 truncate">
                        <span>📍</span>
                        <span className="truncate">{ev.lugar}</span>
                      </p>
                      {ev.hora && (
                        <p className="flex items-center gap-1.5">
                          <span>⏰</span>
                          <span>{ev.hora}</span>
                        </p>
                      )}
                    </div>

                    <a
                      href={ev.urlExterna || "https://agendaculturalloja.com/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "var(--font-label)", fontWeight: 600, letterSpacing: "0.03em" }}
                      className="mt-4 w-full py-2.5 rounded-xl border border-[#2C5E43]/30 text-[#2C5E43] text-[11px] uppercase text-center hover:bg-[#EBF3ED] transition-colors"
                    >
                      Ver detalles ↗
                    </a>
                  </div>
                </article>
              ))
            )}

            {/* Card para expandir más o ver agenda completa */}
            {!mostrarTodos && hayMasEventos ? (
              <div
                onClick={() => setMostrarTodos(true)}
                className="w-[220px] sm:w-[240px] rounded-2xl border-2 border-dashed border-[#2C5E43]/40 bg-[#FAFAF8] hover:bg-[#EBF3ED] cursor-pointer flex flex-col items-center justify-center gap-3 p-6 shrink-0 transition-all group"
              >
                <div className="size-12 rounded-full bg-white border border-[#2C5E43]/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-xs">
                  ➕
                </div>
                <div className="text-center">
                  <p
                    style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.05em" }}
                    className="text-[#2C5E43] uppercase"
                  >
                    Ver más eventos
                  </p>
                  <p className="text-[11px] text-[#64746B] mt-1">
                    Desplegar todos para hacer swipe
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-[190px] sm:w-[210px] rounded-2xl border-2 border-dashed border-[#E8EAE3] flex flex-col items-center justify-center gap-3 p-6 shrink-0">
                <span className="text-2xl">🗓️</span>
                <a
                  href="https://agendaculturalloja.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.08em" }}
                  className="text-center text-[#2C5E43] uppercase hover:underline"
                >
                  Ver agenda completa ↗
                </a>
              </div>
            )}
          </div>

          {/* Indicador de scroll en móvil */}
          <div className="mx-auto w-[min(1180px,100%-40px)] mt-3 flex items-center gap-2 sm:hidden">
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem" }} className="text-[#94A39A] italic">
              ← Desliza para ver más eventos
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
