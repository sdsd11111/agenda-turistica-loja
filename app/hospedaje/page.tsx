import type { Metadata } from "next";
import HospedajeCatalogo from "@/components/HospedajeCatalogo";
import PageHero from "@/components/PageHero";
import { HOSPEDAJES } from "@/lib/data/hospedaje";

export const metadata: Metadata = {
  title: "Hoteles en Loja y Vilcabamba: Hosterías y Hospedaje Directo sin Comisiones",
  description: "Encuentra hoteles en Loja, hosterías en Vilcabamba y hospedaje en los 16 cantones de la provincia. Contacto directo por WhatsApp al mejor precio y sin comisiones.",
  keywords: [
    "hoteles en loja",
    "hoteles en vilcabamba",
    "hospedaje en loja ecuador",
    "hosterias en loja",
    "donde alojarse en vilcabamba",
    "hotel loja centro",
  ],
  alternates: { canonical: "/hospedaje" },
};

export default function HospedajePage() {
  return (
    <>
      <PageHero
        title="Hoteles en Loja y Vilcabamba"
        badge="🏨 Directorio de Hospedaje · Sin comisiones"
        lead="Hoteles en el centro de Loja, hosterías en Vilcabamba y hospedaje en los 16 cantones. Contacto directo por WhatsApp al mejor precio y sin comisiones."
        imagen="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Stats bar */}
      <div className="bg-[#17201B] text-white">
        <div className="mx-auto w-[min(1180px,100%-40px)] flex flex-wrap items-center justify-around gap-6 py-6">
          {[
            { num: `${HOSPEDAJES.length}+`, label: "Establecimientos" },
            { num: "16", label: "Cantones cubiertos" },
            { num: "$0", label: "Comisión de reserva" },
            { num: "24/7", label: "Contacto directo" },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 800 }} className="text-2xl sm:text-3xl text-[#52B788]">{num}</p>
              <p style={{ fontFamily: "var(--font-body)" }} className="text-xs text-white/60 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Catálogo */}
      <section className="py-16 bg-[#FAFAF8]">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <HospedajeCatalogo hoteles={HOSPEDAJES} />
          <p className="mt-10 text-center text-sm text-[#64746B]">
            Tarjetas de demostración. Precios referenciales: confirma tarifas y disponibilidad con cada establecimiento.
          </p>
        </div>
      </section>

      {/* Contenido estructurado Server-Side para crawlers y LLMs */}
      <div
        style={{
          position: "absolute",
          left: "-10000px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <h2>Directorio Completo de Hoteles y Hospedaje en Loja</h2>
        <p>
          Catálogo verificado de hoteles, hosterías y hostales en la provincia de Loja con reserva directa por WhatsApp:
        </p>
        <ul>
          {HOSPEDAJES.map((h) => (
            <li key={h.slug}>
              <h3>{h.nombre}</h3>
              <p>Tipo: {h.tipo}</p>
              <p>Cantón: {h.cantonSlug}</p>
              <p>Zona: {h.zona}</p>
              <p>Tarifa desde: ${h.desde} USD por noche</p>
              <p>Descripción: {h.descripcion}</p>
              <p>Servicios: {h.servicios.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
