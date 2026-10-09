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
      <PageHero
        title="Alianzas con GAD Municipales"
        lead="Plazas abiertas para los 16 gobiernos cantonales de la provincia de Loja. Digitalización oficial de tu patrimonio, rutas y entrenamiento directo del Asesor IA."
        badge="Marco Institucional · Convenio Cantonal"
        imagen="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1600&q=80"
      />
      <section className="py-20 bg-[#FAFAF8] text-[#17201B]">
        <div className="mx-auto grid w-[min(1180px,100%-40px)] gap-8 md:grid-cols-2">
          {/* Card Convenio Cantonal */}
          <article className="flex flex-col justify-between rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden" style={{ background: "linear-gradient(145deg,#12301f,#1B4332 65%,#245b57)" }}>
            <div>
              <span
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#52B788] border border-white/20 inline-block mb-3"
              >
                15 Cantones de la Provincia
              </span>
              <h2
                style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                className="text-2xl sm:text-3xl font-extrabold text-white"
              >
                Convenio Cantonal GAD
              </h2>
              <div className="my-5 flex items-baseline gap-2">
                <span
                  style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                  className="text-4xl sm:text-5xl text-[#F2C14E]"
                >
                  $4.900
                </span>
                <span className="text-xs text-white/70">/ año · Ínfima cuantía SERCOP</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-white/90">
                <li className="flex items-center gap-2">
                  <span className="text-[#52B788] font-bold">✓</span>
                  <span>Sección institucional y mapa exclusivo en agendaturisticaloja.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#52B788] font-bold">✓</span>
                  <span>Entrenamiento del Asesor IA con la historia, rutas y hospedajes de tu cantón</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#52B788] font-bold">✓</span>
                  <span>Publicación y difusión prioritaria de festividades y eventos oficiales</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#52B788] font-bold">✓</span>
                  <span>Trámite simplificado para gobiernos autónomos descentralizados</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15">
              <a
                href="https://wa.me/593963410409?text=Hola,%20represento%20a%20un%20GAD%20Municipal%20de%20la%20provincia%20de%20Loja%20y%20deseo%20solicitar%20el%20Convenio%20Cantonal."
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#F2C14E] text-[#17201B] hover:bg-white transition-all text-xs uppercase tracking-wider font-bold shadow-md cursor-pointer"
              >
                <span>💬 Solicitar convenio por WhatsApp</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </article>

          {/* Card Municipio Fundador */}
          <article className="flex flex-col justify-between rounded-3xl border border-[#E8EAE3] bg-white p-8 sm:p-10 shadow-sm hover:border-[#2C5E43]/40 transition-all">
            <div>
              <span
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#EBF3ED] text-[#2C5E43] inline-block mb-3"
              >
                Capital Provincial
              </span>
              <h2
                style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                className="text-2xl sm:text-3xl font-extrabold text-[#17201B]"
              >
                Municipio Fundador: Loja
              </h2>
              <p
                style={{ fontFamily: "var(--font-body)" }}
                className="mt-4 text-xs sm:text-sm text-[#47554E] leading-relaxed"
              >
                El cantón Loja encabeza la articulación de la agenda provincial mediante transferencia de contenidos culturales, agenda de teatros, cartelera del FIAVL y legitimidad institucional de la plataforma.
              </p>
              <div className="mt-6 rounded-2xl bg-[#FAFAF8] p-5 border border-[#EEF0EA]">
                <p className="text-xs font-semibold text-[#17201B]">
                  Puesto reservado institucional
                </p>
                <p className="text-[11px] text-[#64746B] mt-1">
                  Articulación permanente entre el sector privado y el cabildo lojano.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EEF0EA]">
              <a
                href="https://wa.me/593963410409?text=Hola,%20deseo%20coordinar%20la%20participaci%C3%B3n%20institucional%20con%20el%20GAD%20de%20Loja."
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#2C5E43] text-white hover:bg-[#224B35] transition-all text-xs uppercase tracking-wider font-bold shadow-xs cursor-pointer"
              >
                <span>💬 Coordinar con el GAD Loja</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
