import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Para negocios: afilia tu hotel o servicio turístico",
  description: "Membresías GuIAloja para hoteles, hosterías, haciendas y servicios de ruta en la provincia de Loja. Contacto directo por WhatsApp, sin comisiones.",
  alternates: { canonical: "/para-negocios" },
};

const PLANES = [
  { nombre: "Hoteles pequeños y hostales", mes: 35, anio: 350, oscuro: false },
  { nombre: "Hoteles grandes, haciendas y hosterías", mes: 65, anio: 650, oscuro: true },
  { nombre: "Servicios de ruta y rent a car", mes: 35, anio: 350, oscuro: false },
] as const;

const INCLUYE = [
  "Ficha verificada GuIAloja en el directorio",
  "Contacto directo por WhatsApp con tu mensaje listo",
  "Aparición por cantón y en las guías Descubre Loja",
  "Cero comisiones de reserva",
];

export default function NegociosPage() {
  return (
    <>
      <PageHero title="Haz que te encuentren" lead="Aparece en el directorio turístico verificado de los 16 cantones y recibe a los viajeros directo en tu WhatsApp." />

      <section className="py-16">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <h2 className="mb-8 font-serif text-4xl font-semibold text-forest">Membresías</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {PLANES.map((p) => (
              <article key={p.nombre} className={`flex flex-col gap-3 rounded-[26px] p-7 shadow-[0_10px_30px_-12px_rgba(13,27,18,.25)] ${p.oscuro ? "text-white" : "border border-ink/10 bg-white"}`} style={p.oscuro ? { background: "linear-gradient(150deg,#12301f,#1B4332 70%,#245b57)" } : undefined}>
                <h3 className={`font-serif text-2xl font-semibold ${p.oscuro ? "text-white" : "text-forest"}`}>{p.nombre}</h3>
                <p className={`font-serif text-5xl font-bold ${p.oscuro ? "text-gold" : "text-ochre"}`}>${p.anio}<small className="font-sans text-base font-medium opacity-75"> / año</small></p>
                <p className={p.oscuro ? "text-white/80" : "text-ink/70"}>Referencia mensual: ${p.mes} / mes. Pagando el plan anual: 10 meses por 12.</p>
                <WhatsAppButton variante={p.oscuro ? "gold" : "forest"} mensaje={`Hola, me interesa la membresía "${p.nombre}" de agendaturisticaloja.com.`} className="mt-auto w-full">Solicitar este plan</WhatsAppButton>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center font-serif text-3xl italic text-forest">Pague 10 meses, quédese con 12.</p>
          <p className="mt-2 text-center text-ink/70">Diferido a 12 cuotas sin interés con tarjeta de crédito.</p>
        </div>
      </section>

      <section className="py-16" style={{ background: "linear-gradient(180deg,#eef4f0,#F8FAF9)" }}>
        <div className="mx-auto grid w-[min(1180px,100%-40px)] gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl font-semibold text-forest">Qué incluye</h2>
            <ul className="mt-5 grid gap-3">
              {INCLUYE.map((i) => (
                <li key={i} className="flex gap-3"><span aria-hidden className="font-bold text-leaf">✓</span>{i}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[26px] border border-gold/60 bg-white p-8">
            <h2 className="font-serif text-3xl font-semibold text-forest">Posicionamiento Top 5</h2>
            <p className="mt-2 font-serif text-5xl font-bold text-ochre">$4.500<small className="font-sans text-base font-medium text-ink/70"> / 5 años</small></p>
            <p className="mt-3 text-ink/75">Asegura prioridad de recomendación entre los primeros cinco lugares de tu categoría de hospedaje.</p>
            <WhatsAppButton variante="gold" mensaje="Hola, quisiera información sobre el Posicionamiento Top 5 de agendaturisticaloja.com." className="mt-5">Consultar disponibilidad</WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
