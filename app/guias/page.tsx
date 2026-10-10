import type { Metadata } from "next";
import GuideCard from "@/components/GuideCard";
import PageHero from "@/components/PageHero";
import { GUIAS } from "@/lib/data/guias";

export const metadata: Metadata = {
  title: "Guías Turísticas de Loja: Rutas, Itinerarios y Senderismo en los 16 Cantones",
  description:
    "Descubre las mejores guías turísticas de la provincia de Loja, Ecuador: Vilcabamba y Ruta del Café, Bosque Petrificado de Puyango, Romería del Cisne, Saraguro y Parque Nacional Podocarpus.",
  keywords: [
    "guias turisticas loja",
    "guia turistica loja ecuador",
    "que hacer en loja ecuador",
    "rutas turisticas loja",
    "itinerarios loja 16 cantones",
  ],
  alternates: { canonical: "/guias" },
  openGraph: {
    title: "Guías Turísticas de Loja: Rutas e Itinerarios 2026",
    description: "Guías editoriales con mapas, tiempos, dificultad y consejos para recorrer los 16 cantones de Loja.",
  },
};

export default function GuiasPage() {
  return (
    <>
      <PageHero
        title="Guías Turísticas de Loja"
        lead="Itinerarios comprobados, rutas de café, senderismo y patrimonio cultural por los 16 cantones del sur del Ecuador."
        badge="📖 Guías y Rutas Oficiales 2026"
        imagen="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Intro strip */}
      <div className="bg-[#17201B]">
        <div className="mx-auto w-[min(1420px,100%-48px)] py-7">
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-white/80 text-sm text-center max-w-2xl mx-auto leading-relaxed"
          >
            Cada guía incluye mapas, consejos de temporada, nivel de dificultad y duración estimada. Diseñadas para que viajes seguro e informado por la provincia de Loja.
          </p>
        </div>
      </div>

      {/* Grid de guías */}
      <section className="py-16 bg-[#FAFAF8]">
        <div className="mx-auto w-[min(1420px,100%-48px)]">
          {/* Header */}
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="text-[11px] uppercase tracking-widest text-[#2C5E43] block mb-2"
              >
                {GUIAS.length} guías turísticas disponibles
              </span>
              <h2
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
                className="text-2xl sm:text-3xl text-[#17201B]"
              >
                Elige tu ruta por Loja
              </h2>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GUIAS.map((g) => (
              <GuideCard key={g.slug} guia={g} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
