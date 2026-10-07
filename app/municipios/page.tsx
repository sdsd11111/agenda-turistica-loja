import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Convenio para GAD municipales",
  description: "Convenio cantonal para GAD de la provincia de Loja: sección propia en el portal turístico y difusión de su patrimonio.",
  alternates: { canonical: "/municipios" },
};

export default function MunicipiosPage() {
  return (
    <>
      <PageHero title="Para GAD municipales" lead="Tus atractivos, tu patrimonio y tu agenda, digitalizados y accesibles para el viajero nacional e internacional." />
      <section className="py-16">
        <div className="mx-auto grid w-[min(1180px,100%-40px)] gap-5 md:grid-cols-2">
          <article className="flex flex-col gap-3 rounded-[26px] p-8 text-white" style={{ background: "linear-gradient(150deg,#12301f,#1B4332 70%,#245b57)" }}>
            <h2 className="font-serif text-4xl font-semibold">Convenio cantonal</h2>
            <p className="font-serif text-6xl font-bold text-gold">$4.900<small className="font-sans text-base font-medium text-white/75"> / año</small></p>
            <ul className="mt-2 grid gap-2 text-white/90">
              <li>✓ Contratación por ínfima cuantía (SERCOP)</li>
              <li>✓ Sección cantonal propia en agendaturisticaloja.com</li>
              <li>✓ Información de tu patrimonio y atractivos</li>
              <li>✓ Aplica a los 15 cantones distintos de Loja</li>
            </ul>
            <WhatsAppButton variante="gold" mensaje="Hola, soy del GAD municipal y quisiera información sobre el convenio cantonal." className="mt-auto w-fit">Solicitar información</WhatsAppButton>
          </article>
          <article className="flex flex-col gap-3 rounded-[26px] border border-ink/10 bg-white p-8">
            <h2 className="font-serif text-4xl font-semibold text-forest">Municipio Fundador: Loja</h2>
            <p className="text-lg text-ink/75">El cantón Loja queda exento de la tarifa anual a cambio de aportar la información base del patrimonio y la legitimidad institucional del proyecto.</p>
            <WhatsAppButton variante="forest" mensaje="Hola, quisiera coordinar la participación del GAD Loja como Municipio Fundador." className="mt-auto w-fit">Coordinar con el GAD Loja</WhatsAppButton>
          </article>
        </div>
      </section>
    </>
  );
}
