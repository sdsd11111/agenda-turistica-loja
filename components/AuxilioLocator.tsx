"use client";

import { useMemo, useState } from "react";
import type { ServicioRuta, TipoServicio } from "@/types";
import { TIPOS_SERVICIO } from "@/lib/data/servicios";
import { cantonNombre } from "@/lib/data/cantones";
import { distanciaKm, formatearDistancia } from "@/lib/haversine";

export default function AuxilioLocator({ servicios }: { servicios: ServicioRuta[] }) {
  const [tipo, setTipo] = useState<TipoServicio | null>(null);
  const [pos, setPos] = useState<[number, number] | null>(null);
  const [estado, setEstado] = useState<string | null>(null);

  const lista = useMemo(() => {
    const base = servicios
      .filter((s) => !tipo || s.tipo === tipo)
      .map((s) => ({ ...s, km: pos ? distanciaKm(pos[0], pos[1], s.lat, s.lng) : null }));
    if (pos) base.sort((a, b) => (a.km ?? 0) - (b.km ?? 0));
    return base;
  }, [servicios, tipo, pos]);

  function ubicar() {
    if (!navigator.geolocation) {
      setEstado("Tu navegador no permite geolocalización. Si es una emergencia, llama al ECU 911.");
      return;
    }
    setEstado("Obteniendo tu ubicación…");
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos([p.coords.latitude, p.coords.longitude]);
        setEstado("Ordenado del más cercano al más lejano (línea recta). Tu ubicación no se guarda.");
      },
      () => setEstado("No pudimos obtener tu ubicación. Describe a tu operador el último punto conocido de la vía."),
      { timeout: 10000, enableHighAccuracy: true },
    );
  }

  const chip = (on: boolean) =>
    `min-h-10 rounded-full border px-4 text-sm font-medium transition-colors ${
      on ? "border-white bg-white text-alert" : "border-white/40 text-white hover:bg-white/15"
    }`;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={ubicar} className="min-h-12 rounded-full bg-gold px-6 font-semibold text-[#1b1405] hover:bg-[#ffd36b]">
          📍 Compartir mi ubicación
        </button>
        {estado && <p className="text-sm text-white/85" aria-live="polite">{estado}</p>}
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Tipo de servicio">
        <button type="button" aria-pressed={tipo === null} onClick={() => setTipo(null)} className={chip(tipo === null)}>Todos</button>
        {TIPOS_SERVICIO.map((t) => (
          <button key={t.id} type="button" aria-pressed={tipo === t.id} onClick={() => setTipo(tipo === t.id ? null : t.id)} className={chip(tipo === t.id)}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      <ul className="mt-6 grid gap-3 md:grid-cols-2">
        {lista.map((s) => (
          <li key={s.id} className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-2xl font-semibold">{s.nombre}</h3>
                <p className="text-sm text-white/70">{cantonNombre(s.cantonSlug)}{s.disponible24h ? " · 24 horas" : ""}</p>
              </div>
              {s.km !== null && <span className="whitespace-nowrap text-sm font-semibold text-gold">≈ {formatearDistancia(s.km)}</span>}
            </div>
            <p className="mt-2 text-sm text-white/80">{s.descripcion}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold">
              {s.telefono ? (
                <a href={`tel:${s.telefono}`} className="rounded-full bg-white px-4 py-2 text-alert">📞 Llamar</a>
              ) : (
                <span className="rounded-full bg-black/25 px-4 py-2 text-white/75">Teléfono por verificar</span>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-4 py-2 hover:bg-white/15"
              >
                🗺️ Ver en mapa
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
