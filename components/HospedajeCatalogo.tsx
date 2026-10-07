"use client";

import { useMemo, useState } from "react";
import type { Hospedaje, TipoHospedaje } from "@/types";
import { CANTONES } from "@/lib/data/cantones";
import HotelCard from "./HotelCard";

const TIPOS: TipoHospedaje[] = ["Hotel", "Hostal", "Hostería", "Hacienda", "Casa rural"];

export default function HospedajeCatalogo({ hoteles }: { hoteles: Hospedaje[] }) {
  const [canton, setCanton] = useState("");
  const [tipo, setTipo] = useState("");
  const [soloVerificados, setSoloVerificados] = useState(false);

  const lista = useMemo(
    () =>
      hoteles.filter(
        (h) => (!canton || h.cantonSlug === canton) && (!tipo || h.tipo === tipo) && (!soloVerificados || h.verificado),
      ),
    [hoteles, canton, tipo, soloVerificados],
  );

  const campo = "min-h-11 rounded-xl border border-ink/15 bg-white px-3 text-sm focus:border-forest";

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end gap-4 rounded-2xl border border-ink/10 bg-white p-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Cantón
          <select value={canton} onChange={(e) => setCanton(e.target.value)} className={campo}>
            <option value="">Todos</option>
            {CANTONES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.nombre}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Tipo
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={campo}>
            <option value="">Todos</option>
            {TIPOS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm font-medium">
          <input type="checkbox" checked={soloVerificados} onChange={(e) => setSoloVerificados(e.target.checked)} className="size-4 accent-forest" />
          Solo verificados
        </label>
        <p className="ml-auto text-sm text-ink/60" aria-live="polite">{lista.length} resultado{lista.length === 1 ? "" : "s"}</p>
      </div>

      {lista.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-forest/40 p-8 text-center text-ink/70">
          Aún no hay hospedajes con esos filtros. Quita alguno para ver más opciones.
        </p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {lista.map((h) => (
            <HotelCard key={h.slug} hotel={h} />
          ))}
        </div>
      )}
    </div>
  );
}
