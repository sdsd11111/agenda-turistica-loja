import type { Metadata } from "next";
import ContactoForm from "@/components/ContactoForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contacto, Sugerencias y Registro de Negocios Turísticos en Loja",
  description: "Contáctanos para afiliar tu hotel, hostería o servicio turístico, recomendar atractivos de la provincia de Loja o solicitar información de la agenda.",
  keywords: [
    "contacto turismo loja",
    "registrar hotel en loja",
    "afiliar negocio turistico loja",
    "directorio turistico loja",
  ],
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        title="Hablemos"
        badge="💬 Contacto · GuIAloja"
        lead="Cuéntanos qué lugar falta, qué dato está mal, o cómo podemos trabajar juntos para potenciar el turismo de Loja."
        imagen="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Motivos rápidos */}
      <div className="bg-[#17201B]">
        <div className="mx-auto w-[min(1180px,100%-40px)] py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "📍", label: "Recomendar lugar" },
            { icon: "✏️", label: "Corregir dato" },
            { icon: "🏢", label: "Afiliar negocio" },
            { icon: "🤝", label: "Convenio GAD" },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm px-5 py-3.5"
            >
              <span className="text-2xl">{icon}</span>
              <span style={{ fontFamily: "var(--font-label)", fontWeight: 600 }} className="text-sm text-white/85">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formulario */}
      <section className="py-16 bg-[#FAFAF8]">
        <div className="mx-auto w-[min(640px,100%-40px)]">
          <div className="mb-8 text-center">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="text-[11px] uppercase tracking-widest text-[#2C5E43] block mb-2"
            >
              Formulario de contacto
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
              className="text-2xl sm:text-3xl text-[#17201B]"
            >
              Envíanos tu mensaje
            </h2>
            <p style={{ fontFamily: "var(--font-body)" }} className="mt-2 text-sm text-[#64746B]">
              Respondemos en menos de 24 horas por WhatsApp.
            </p>
          </div>
          <ContactoForm />
        </div>
      </section>
    </>
  );
}
