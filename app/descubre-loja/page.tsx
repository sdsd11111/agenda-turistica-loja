import type { Metadata } from "next";
import GuideCard from "@/components/GuideCard";
import PageHero from "@/components/PageHero";
import { GUIAS } from "@/lib/data/guias";

export const metadata: Metadata = {
  title: "Guías de Viaje de Loja: Rutas, Qué Hacer, Bosque Puyango y Vilcabamba",
  description: "Guías turísticas completas y rutas de viaje en la provincia de Loja, Ecuador: itinerarios de 3 días, qué hacer en Vilcabamba, Saraguro, Parque Podocarpus y cómo llegar.",
  keywords: [
    "que hacer en loja ecuador",
    "guias turisticas loja",
    "rutas loja ecuador",
    "que hacer en vilcabamba",
    "bosque petrificado puyango guia",
    "itinerario loja",
  ],
  alternates: { canonical: "/descubre-loja" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Guías de Viaje y Qué Hacer en Loja"
        badge="📖 Rutas e Itinerarios · Provincia de Loja"
        lead="Itinerarios de 3 días, guía del Bosque Petrificado de Puyango, Romería de El Cisne, Vilcabamba y rutas por el Parque Podocarpus."
        imagen="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Intro strip */}
      <div className="bg-[#17201B]">
        <div className="mx-auto w-[min(1180px,100%-40px)] py-7">
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-white/70 text-sm text-center max-w-2xl mx-auto leading-relaxed"
          >
            Cada guía incluye mapas, consejos de temporada, dificultad y duración estimada. Úsalas como punto de partida — la aventura la escribes tú.
          </p>
        </div>
      </div>

      {/* Grid de guías */}
      <section className="py-16 bg-[#FAFAF8]">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          {/* Header */}
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="text-[11px] uppercase tracking-widest text-[#2C5E43] block mb-2"
              >
                {GUIAS.length} guías disponibles
              </span>
              <h2
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
                className="text-2xl sm:text-3xl text-[#17201B]"
              >
                Elige tu aventura
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {GUIAS.map((g) => (
              <GuideCard key={g.slug} guia={g} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
