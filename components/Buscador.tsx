"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { distanciaKm, formatearDistancia } from "@/lib/haversine";
import type { ItemBusqueda, TipoBusqueda } from "@/types";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const FILTROS: { id: TipoBusqueda; label: string }[] = [
  { id: "hoteles", label: "🏨 Hoteles" },
  { id: "atractivos", label: "🏞️ Atractivos" },
  { id: "cantones", label: "🗺️ Cantones" },
  { id: "guias", label: "📖 Guías" },
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
      setEstado("Tu navegador no permite geolocalización.");
      return;
    }
    setEstado("Buscando tu ubicación… acepta el permiso del navegador.");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos([p.coords.latitude, p.coords.longitude]);
        setCerca(true);
        setEstado("Distancias en línea recta, aproximadas. Tu ubicación no se guarda.");
      },
      () => setEstado("No pudimos obtener tu ubicación. Revisa los permisos del navegador."),
      { timeout: 10000 },
    );
  }

  const chip = (on: boolean) =>
    `min-h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${
      on ? "border-forest bg-forest text-white" : "border-forest/20 bg-white hover:border-forest hover:text-forest"
    }`;

  return (
    <div className="rounded-[26px] border border-ink/10 bg-white p-4 shadow-[0_24px_60px_-20px_rgba(13,27,18,.4)] sm:p-6">
      <form role="search" onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3 rounded-2xl border-2 border-forest/20 pl-4 pr-2 focus-within:border-forest">
        <span aria-hidden>🔍</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
          aria-label="Buscar en la provincia de Loja"
          placeholder="Busca un destino, cantón o actividad (ej: Vilcabamba, senderismo, hotel)"
          className="min-w-0 flex-1 bg-transparent py-3.5 text-base focus:outline-none"
        />
      </form>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filtros rápidos">
        {FILTROS.map((f) => (
          <button key={f.id} type="button" aria-pressed={tipo === f.id} onClick={() => setTipo(tipo === f.id ? null : f.id)} className={chip(tipo === f.id)}>
            {f.label}
          </button>
        ))}
        <button type="button" aria-pressed={cerca} onClick={alternarCerca} className={chip(cerca)}>
          📍 Cerca de mí
        </button>
        <Link href="/auxilio-en-ruta" className="inline-grid min-h-10 shrink-0 place-items-center rounded-full border border-alert px-4 text-sm font-medium text-alert hover:bg-alert hover:text-white">
          🚨 Emergencia en ruta
        </Link>
      </div>

      {estado && <p className="mt-3 text-sm text-ink/65" aria-live="polite">{estado}</p>}

      {activo && (
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2" aria-live="polite">
          {resultados.length === 0 && (
            <li className="text-sm text-ink/65 sm:col-span-2">
              No encontramos resultados. Prueba con “Vilcabamba”, “senderismo” u “hotel”.
            </li>
          )}
          {resultados.map((r) => (
            <li key={r.id}>
              <Link href={r.href} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-snow px-4 py-3 hover:border-forest hover:bg-mist">
                <span aria-hidden className="text-2xl">{r.emoji}</span>
                <span className="min-w-0 flex-1">
                  <strong className="block truncate">{r.nombre}</strong>
                  <small className="block truncate text-ink/60">{r.descripcion}</small>
                </span>
                {r.km !== null && <span className="whitespace-nowrap text-sm font-semibold text-sky">≈ {formatearDistancia(r.km)}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
