import type { Metadata } from "next";
import HospedajeCatalogo from "@/components/HospedajeCatalogo";
import PageHero from "@/components/PageHero";
import { HOSPEDAJES } from "@/lib/data/hospedaje";

export const metadata: Metadata = {
  title: "Hospedaje en la provincia de Loja",
  description: "Hoteles, hostales, hosterías y casas rurales en la provincia de Loja. Contacta directo por WhatsApp, sin comisiones.",
  alternates: { canonical: "/hospedaje" },
};

export default function HospedajePage() {
  return (
    <>
      <PageHero
        title="Hospedaje en Loja"
        badge="🏨 Donde quedarte · Sin comisiones"
        lead="Hoteles, hosterías y casas rurales. Escribe directo al establecimiento: sin intermediarios y sin comisiones de reserva."
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
    </>
  );
}
