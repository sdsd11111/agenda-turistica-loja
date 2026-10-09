import type { Metadata } from "next";
import AuxilioLocator from "@/components/AuxilioLocator";
import { SERVICIOS } from "@/lib/data/servicios";

export const metadata: Metadata = {
  title: "Auxilio Mecánico en Carretera Loja: Grúas, Talleres y Gasolineras 24/7",
  description: "Directorio de auxilio en carretera en la provincia de Loja, Ecuador: talleres mecánicos, servicio de grúas, vulcanizadoras y estaciones de servicio cerca de ti.",
  keywords: [
    "auxilio mecanico loja",
    "grua loja ecuador",
    "taller mecanico loja",
    "auxilio en carretera loja",
    "mecanico a domicilio loja",
  ],
  alternates: { canonical: "/auxilio-en-ruta" },
};

export default function AuxilioPage() {
  return (
    <>
      {/* Hero cinematográfico - tonos rojos de emergencia */}
      <section
        className="relative isolate overflow-hidden min-h-[420px] sm:min-h-[480px] flex flex-col justify-center pt-32 pb-16 text-white"
      >
        {/* Fondo fotográfico */}
        <img
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=80"
          alt="Carretera en la provincia de Loja"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
        {/* Overlay de emergencia */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-red-950/90 via-red-900/75 to-black/50"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0d0505] via-transparent to-transparent"
        />
        {/* Franja de advertencia */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[68px] h-3"
          style={{ background: "repeating-linear-gradient(-45deg,#f2c14e 0 16px,#1a0505 16px 32px)" }}
        />

        <div className="mx-auto w-[min(1180px,100%-40px)] relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase mb-4">
            <span className="size-2 rounded-full bg-red-400 animate-pulse" />
            <span style={{ fontFamily: "var(--font-label)" }}>🚨 Servicio de emergencia · Loja</span>
          </div>

          <h1
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.03em" }}
            className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl text-white font-extrabold leading-[1.08] drop-shadow-md"
          >
            Auxilio en Ruta
          </h1>
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="mt-4 max-w-2xl text-base sm:text-lg text-white/85 leading-relaxed"
          >
            ¿Tuviste un imprevisto en carretera? Encuentra talleres, grúas y estaciones de servicio cerca de ti en la provincia de Loja.
          </p>

          {/* Botón 911 prominente */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="tel:911"
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="inline-flex items-center gap-2.5 rounded-full bg-red-600 hover:bg-red-500 active:bg-red-700 px-7 py-3.5 text-sm text-white shadow-[0_0_24px_rgba(239,68,68,0.5)] hover:shadow-[0_0_36px_rgba(239,68,68,0.7)] transition-all duration-300"
            >
              📞 Llamar al ECU 911
            </a>
          </div>
        </div>
      </section>

      {/* Panel de seguridad */}
      <section className="bg-[#1a0808] border-b border-red-900/30">
        <div className="mx-auto w-[min(1180px,100%-40px)] py-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: "⚠️", step: "1", text: "Detente en un lugar seguro y enciende las luces de emergencia." },
              { icon: "📍", step: "2", text: "Si hay heridos o peligro, llama al ECU 911 de inmediato." },
              { icon: "🗺️", step: "3", text: "Comparte tu ubicación con el servicio más cercano de esta lista." },
            ].map(({ icon, step, text }) => (
              <div key={step} className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
                <div
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                  className="shrink-0 size-9 rounded-full bg-red-700/60 border border-red-500/40 flex items-center justify-center text-white text-sm"
                >
                  {step}
                </div>
                <div>
                  <span className="text-xl">{icon}</span>
                  <p style={{ fontFamily: "var(--font-body)" }} className="text-sm text-white/75 leading-relaxed mt-1">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directorio de servicios */}
      <section className="py-16 bg-[#FAFAF8]">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <div className="mb-8">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="text-[11px] uppercase tracking-widest text-[#2C5E43] block mb-2"
            >
              Directorio verificado
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
              className="text-2xl sm:text-3xl text-[#17201B]"
            >
              Servicios en tu zona
            </h2>
          </div>
          <AuxilioLocator servicios={SERVICIOS} />
          <p className="mt-8 text-sm text-[#64746B] text-center max-w-xl mx-auto">
            Los registros mostrados son de demostración. El directorio real se publica a medida que cada servicio es verificado por cantón.
          </p>
        </div>
      </section>
    </>
  );
}
