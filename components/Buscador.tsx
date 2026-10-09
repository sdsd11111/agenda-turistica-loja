"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { distanciaKm, formatearDistancia } from "@/lib/haversine";
import type { ItemBusqueda, TipoBusqueda } from "@/types";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const FILTROS: { id: TipoBusqueda; label: string }[] = [
  { id: "cantones", label: "16 Cantones" },
  { id: "atractivos", label: "Lugares Turísticos" },
  { id: "hoteles", label: "Hospedaje" },
  { id: "guias", label: "Rutas e Itinerarios" },
];

type Resultado = ItemBusqueda & { km: number | null };

export default function Buscador({ items }: { items: ItemBusqueda[] }) {
  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState<TipoBusqueda | null>(null);
  const [cerca, setCerca] = useState(false);
  const [pos, setPos] = useState<[number, number] | null>(null);
  const [estado, setEstado] = useState<string | null>(null);

  const activo = q.trim() !== "" || tipo !== null || cerca;

  const resultados = useMemo<Resultado[]>(() => {
    if (!activo) return [];
    const t = norm(q.trim());
    const lista: Resultado[] = items
      .filter((i) => (!tipo || i.tipo === tipo) && (!t || norm(`${i.nombre} ${i.descripcion}`).includes(t)))
      .map((i) => ({ ...i, km: cerca && pos ? distanciaKm(pos[0], pos[1], i.lat, i.lng) : null }));
    if (cerca && pos) lista.sort((a, b) => (a.km ?? 0) - (b.km ?? 0));
    return lista.slice(0, 8);
  }, [items, q, tipo, cerca, pos, activo]);

  function alternarCerca() {
    if (cerca) {
      setCerca(false);
      setEstado(null);
      return;
    }
    if (!navigator.geolocation) {
      setEstado("Tu navegador no soporta geolocalización.");
      return;
    }
    setEstado("Buscando coordenadas...");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos([p.coords.latitude, p.coords.longitude]);
        setCerca(true);
        setEstado("Ordenado por proximidad geográfica.");
      },
      () => setEstado("No se pudo obtener la ubicación."),
      { timeout: 10000 },
    );
  }

  return (
    <div className="rounded-2xl border border-[#E8EAE3] bg-white p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-3 rounded-xl border border-[#E8EAE3] bg-[#FAFAF8] px-4 py-1.5 focus-within:border-[#2C5E43] focus-within:bg-white transition-all"
      >
        <svg className="size-4 text-[#64746B] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          autoComplete="off"
          aria-label="Buscar en la provincia de Loja, Ecuador"
          placeholder="Busca qué hacer en Loja, Vilcabamba, Guayacanes, cascadas u hoteles..."
          style={{ fontFamily: "var(--font-body)" }}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm sm:text-base text-[#17201B] placeholder:text-[#78887F] focus:outline-none"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="text-xs text-[#94A39A] hover:text-[#17201B] px-2 py-1"
          >
            ✕
          </button>
        )}
      </form>

      {/* FILTROS RÁPIDOS */}
      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Filtros rápidos">
        {FILTROS.map((f) => {
          const isSelected = tipo === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setTipo(isSelected ? null : f.id)}
              style={{ fontFamily: "var(--font-label)" }}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-[#2C5E43] text-white shadow-xs"
                  : "bg-[#FAFAF8] text-[#47554E] hover:bg-[#EEF0EA] border border-[#E8EAE3]"
              }`}
            >
              {f.label}
            </button>
          );
        })}

        <button
          type="button"
          aria-pressed={cerca}
          onClick={alternarCerca}
          style={{ fontFamily: "var(--font-label)" }}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            cerca
              ? "bg-[#2C5E43] text-white shadow-xs"
              : "bg-[#FAFAF8] text-[#47554E] hover:bg-[#EEF0EA] border border-[#E8EAE3]"
          }`}
        >
          📍 Cerca de mí
        </button>

        <div className="ml-auto">
          <Link
            href="/auxilio-en-ruta"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#E8EAE3] bg-[#FAFAF8] hover:bg-red-50 hover:text-red-700 hover:border-red-200 px-3.5 py-1.5 text-xs font-medium text-[#64746B] transition-all"
          >
            <span>🚨</span>
            <span className="hidden sm:inline">Auxilio mecánico</span>
            <span className="sm:hidden">Auxilio</span>
          </Link>
        </div>
      </div>

      {estado && <p className="mt-2 text-xs text-[#2C5E43] pl-1 font-medium">{estado}</p>}

      {/* RESULTADOS EN TIEMPO REAL */}
      {activo && (
        <div className="mt-3.5 border-t border-[#EEF0EA] pt-3">
          {resultados.length === 0 ? (
            <p className="py-4 text-center text-xs text-[#64746B]">
              No encontramos coincidencias para &ldquo;{q}&rdquo;. Prueba con Vilcabamba, Saraguro o Podocarpus.
            </p>
          ) : (
            <ul className="grid gap-2 sm:grid-cols-2">
              {resultados.map((r) => (
                <li key={r.id}>
                  <Link
                    href={r.href}
                    className="flex items-center gap-3 rounded-xl border border-[#EEF0EA] bg-[#FAFAF8] p-2.5 transition-all hover:bg-white hover:border-[#2C5E43]/40 group"
                  >
                    <span className="text-xl size-9 rounded-lg bg-white border border-[#E8EAE3] flex items-center justify-center shrink-0">
                      {r.emoji}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="font-semibold text-xs sm:text-sm text-[#17201B] truncate group-hover:text-[#2C5E43]">
                          {r.nombre}
                        </p>
                        {r.km !== null && (
                          <span className="text-[10px] font-mono font-medium text-[#2C5E43] shrink-0 bg-[#EBF3ED] px-1.5 py-0.5 rounded">
                            {formatearDistancia(r.km)}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#64746B] truncate mt-0.5">{r.descripcion}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
