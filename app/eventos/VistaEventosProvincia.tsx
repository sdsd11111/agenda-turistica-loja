"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CANTONES } from "@/lib/data/cantones";
import type { EventoCultural } from "@/lib/services/eventosCultura";
import { formatearFechaEvento } from "@/lib/services/eventosCultura";

interface Props {
  eventosIniciales: EventoCultural[];
  conteoPorCanton: Record<string, number>;
}

export default function VistaEventosProvincia({
  eventosIniciales,
  conteoPorCanton,
}: Props) {
  const [filtroCanton, setFiltroCanton] = useState<string>("todos");
  const [busqueda, setBusqueda] = useState<string>("");
  const [soloFinDeSemana, setSoloFinDeSemana] = useState(false);

  const eventosFiltrados = useMemo(() => {
    return eventosIniciales.filter((ev) => {
      if (filtroCanton !== "todos" && ev.canton?.slug !== filtroCanton) {
        return false;
      }
      if (busqueda.trim() !== "") {
        const query = busqueda.toLowerCase().trim();
        const coincideNombre = ev.nombre.toLowerCase().includes(query);
        const coincideLugar = ev.lugar.toLowerCase().includes(query);
        const coincideCanton = ev.canton?.nombre.toLowerCase().includes(query);
        const coincideCat = (ev.categoria || "").toLowerCase().includes(query);
        if (!coincideNombre && !coincideLugar && !coincideCanton && !coincideCat) {
          return false;
        }
      }
      if (soloFinDeSemana) {
        const { esFinDeSemana, esHoy } = formatearFechaEvento(
          ev.fechaInicio,
          ev.fechaFin
        );
        if (!esFinDeSemana && !esHoy) return false;
      }
      return true;
    });
  }, [eventosIniciales, filtroCanton, busqueda, soloFinDeSemana]);

  const cantonActual = CANTONES.find((c) => c.slug === filtroCanton);

  return (
    <div className="space-y-8">
      {/* ── BARRA DE BÚSQUEDA Y FILTROS RÁPIDOS ── */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8EAE3] shadow-sm">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </span>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, lugar, categoría o cantón..."
              className="w-full pl-11 pr-4 py-3 rounded-full border border-[#E8EAE3] bg-[#FAFAF8] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5E43] focus:border-transparent transition-all"
            />
            {busqueda && (
              <button
                type="button"
                onClick={() => setBusqueda("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-700"
              >
                ✕ Limpiar
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setSoloFinDeSemana(!soloFinDeSemana)}
              style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
              className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all border ${
                soloFinDeSemana
                  ? "bg-[#2C5E43] text-white border-[#2C5E43] shadow-sm"
                  : "bg-white text-[#17201B] border-[#E8EAE3] hover:bg-[#FAFAF8]"
              }`}
            >
              🎉 Fin de Semana y Hoy
            </button>
            <a
              href="https://www.agendaculturalloja.com/contacto?ref=agendaturistica_directorio"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="px-4 py-2.5 rounded-full bg-[#52B788] text-[#0d140f] text-xs uppercase tracking-wider hover:bg-[#439e73] transition-all shadow-sm font-bold"
            >
              + Publicar Evento Gratis ↗
            </a>
          </div>
        </div>

        {/* ── PILLS DE CANTONES ── */}
        <div className="mt-6 pt-5 border-t border-[#EEF0EA]">
          <div className="flex items-center justify-between mb-3">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43]"
            >
              Filtrar por Cantón ({CANTONES.length})
            </span>
            {filtroCanton !== "todos" && (
              <button
                type="button"
                onClick={() => setFiltroCanton("todos")}
                className="text-xs text-[#2C5E43] font-semibold hover:underline"
              >
                Mostrar todos los cantones
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
            <button
              type="button"
              onClick={() => setFiltroCanton("todos")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all border ${
                filtroCanton === "todos"
                  ? "bg-[#2C5E43] text-white border-[#2C5E43] shadow-sm"
                  : "bg-[#FAFAF8] text-[#17201B] border-[#E8EAE3] hover:border-[#2C5E43]"
              }`}
            >
              🌐 Todos ({eventosIniciales.length})
            </button>
            {CANTONES.map((c) => {
              const activo = filtroCanton === c.slug;
              const cuenta = conteoPorCanton[c.slug] || 0;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setFiltroCanton(c.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 border ${
                    activo
                      ? "bg-[#2C5E43] text-white border-[#2C5E43] shadow-sm"
                      : "bg-[#FAFAF8] text-[#17201B] border-[#E8EAE3] hover:border-[#2C5E43]"
                  }`}
                >
                  <span>{c.nombre}</span>
                  {cuenta > 0 && (
                    <span
                      className={`size-4 rounded-full text-[9px] font-extrabold flex items-center justify-center ${
                        activo ? "bg-white text-[#2C5E43]" : "bg-[#2C5E43] text-white"
                      }`}
                    >
                      {cuenta}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CONTADOR DE RESULTADOS ── */}
      <div className="flex items-center justify-between">
        <h2
          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          className="text-xl sm:text-2xl text-[#17201B]"
        >
          {filtroCanton === "todos"
            ? `Todos los eventos en la provincia (${eventosFiltrados.length})`
            : `Eventos en ${cantonActual?.nombre || filtroCanton} (${eventosFiltrados.length})`}
        </h2>
        <span className="text-xs text-[#55695C]">
          Sincronizado con Agenda Cultural Loja
        </span>
      </div>

      {/* ── GRID DE EVENTOS ── */}
      {eventosFiltrados.length === 0 ? (
        <div className="p-12 sm:p-16 rounded-3xl bg-white border border-[#E8EAE3] text-center max-w-xl mx-auto shadow-sm">
          <div className="size-16 rounded-2xl bg-[#FAFAF8] border border-[#E8EAE3] flex items-center justify-center text-3xl mx-auto mb-4">
            📅
          </div>
          <h3
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            className="text-xl text-[#17201B] mb-2"
          >
            No se encontraron eventos vigentes con este criterio
          </h3>
          <p className="text-sm text-[#55695C] mb-6">
            {filtroCanton !== "todos"
              ? `Aún no hay eventos cargados para el cantón ${cantonActual?.nombre}. ¿Organizas una festividad o feria?`
              : "Intenta cambiar el término de búsqueda o desactivar los filtros activos."}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => {
                setFiltroCanton("todos");
                setBusqueda("");
                setSoloFinDeSemana(false);
              }}
              className="px-5 py-2.5 rounded-full bg-[#2C5E43] hover:bg-[#224B35] text-white text-xs uppercase font-bold tracking-wider transition-all"
            >
              Restablecer filtros
            </button>
            <a
              href="https://www.agendaculturalloja.com/contacto?ref=agendaturistica_vacio"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-[#E8EAE3] hover:bg-[#FAFAF8] text-[#17201B] text-xs uppercase font-bold tracking-wider transition-all"
            >
              Publicar evento en Loja ↗
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {eventosFiltrados.map((ev) => {
            const fechaInfo = formatearFechaEvento(ev.fechaInicio, ev.fechaFin);
            return (
              <article
                key={ev.id || ev.slug}
                className="rounded-2xl bg-white border border-[#E8EAE3] flex flex-col overflow-hidden hover:border-[#2C5E43] hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-[200px] w-full overflow-hidden bg-gray-100">
                  <img
                    src={
                      ev.imagenUrl ||
                      "https://mvps.b-cdn.net/agenda-turistica/home/bg-eventos-loja.webp"
                    }
                    alt={ev.nombre}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <Link
                      href={`/cantones/${ev.canton?.slug}`}
                      className="text-[10px] uppercase font-bold bg-[#2C5E43] hover:bg-[#224B35] text-white px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm truncate max-w-[140px] transition-colors"
                    >
                      📍 {ev.canton?.nombre || "Loja"}
                    </Link>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm ${
                        fechaInfo.esHoy
                          ? "bg-[#E63946] text-white animate-pulse"
                          : "bg-black/60 text-white"
                      }`}
                    >
                      {fechaInfo.etiquetaBadge}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 text-xs font-semibold text-white drop-shadow-md truncate">
                    📅 {fechaInfo.fechaLegible}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[10px] uppercase font-bold text-[#2C5E43] bg-[#EBF3EE] px-2 py-0.5 rounded-md">
                        {ev.categoria || "Cultura"}
                      </span>
                      {ev.organizador && (
                        <span className="text-[10px] text-gray-500 truncate">
                          · {ev.organizador}
                        </span>
                      )}
                    </div>
                    <h3
                      style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                      className="text-base text-[#17201B] leading-snug line-clamp-2 group-hover:text-[#2C5E43] transition-colors"
                    >
                      {ev.nombre}
                    </h3>
                    {ev.resumen && (
                      <p className="mt-2 text-xs text-[#55695C] line-clamp-3 leading-relaxed">
                        {ev.resumen}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#EEF0EA]">
                    <p className="text-xs text-[#55695C] flex items-center gap-1.5 truncate">
                      <span>📍</span>
                      <span className="truncate">{ev.lugar}</span>
                    </p>
                    {fechaInfo.horaLegible && (
                      <p className="text-xs text-[#7A8C80] flex items-center gap-1.5 mt-1 truncate">
                        <span>⏰</span>
                        <span>{fechaInfo.horaLegible}</span>
                      </p>
                    )}
                    <a
                      href={ev.flywheelLink || ev.canonicalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className="mt-4 block w-full py-2.5 rounded-xl bg-[#17201B] text-white hover:bg-[#2C5E43] transition-all text-center text-xs uppercase tracking-wider font-extrabold shadow-sm cursor-pointer"
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
  );
}
