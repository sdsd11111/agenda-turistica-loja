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
      <PageHero title="Hospedaje en Loja" lead="Hoteles, hosterías y casas rurales. Escribe directo al establecimiento: sin intermediarios y sin comisiones de reserva." />
      <section className="py-14">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <HospedajeCatalogo hoteles={HOSPEDAJES} />
          <p className="mt-8 text-center text-sm text-ink/60">Tarjetas de demostración. Precios referenciales: confirma tarifas y disponibilidad con cada establecimiento.</p>
        </div>
      </section>
    </>
  );
}
