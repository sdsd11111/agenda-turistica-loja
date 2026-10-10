import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ATRACTIVOS } from "@/lib/data/atractivos";
import { cantonNombre } from "@/lib/data/cantones";

export const metadata: Metadata = {
  title: "Lugares Turísticos de Loja: 16 Cantones, Bosque Puyango, Vilcabamba y Podocarpus",
  description: "Descubre los mejores lugares turísticos de Loja, Ecuador: el Bosque Petrificado de Puyango, Vilcabamba, Parque Nacional Podocarpus, Florecimiento de Guayacanes y atractivos en 16 cantones.",
  keywords: [
    "lugares turisticos de loja",
    "que hacer en loja ecuador",
    "bosque petrificado puyango",
    "vilcabamba loja",
    "parque nacional podocarpus",
    "atractivos turisticos de loja",
  ],
  alternates: { canonical: "/atractivos" },
};

export default function AtractivosPage() {
  return (
    <>
      <PageHero
        title="Lugares Turísticos de Loja"
        lead="Desde el Bosque Petrificado de Puyango y Vilcabamba hasta el Parque Podocarpus. Naturaleza, senderos milenarios y patrimonio de los 16 cantones de Loja."
        badge="🗺️ Atractivos Turísticos de Loja · Ecuador"
        imagen="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-16 bg-[#FAFAF8] text-[#17201B]">
        <div className="mx-auto w-[min(1420px,100%-48px)]">
          {/* Section header */}
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <span
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="text-[11px] uppercase tracking-widest text-[#2C5E43] block mb-2"
              >
                {ATRACTIVOS.length} atractivos disponibles en la provincia
              </span>
              <h2
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em" }}
                className="text-2xl sm:text-3xl text-[#17201B]"
              >
                ¿Qué lugares turísticos visitar en Loja?
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ATRACTIVOS.map((a) => (
              <article
                id={a.slug}
                key={a.slug}
                className="group relative flex flex-col overflow-hidden rounded-3xl min-h-[360px] shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:-translate-y-1.5 transition-all duration-500"
              >
                {/* Real photo or gradient fallback */}
                {a.imagen ? (
                  <img
                    src={a.imagen}
                    alt={a.nombre}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0" style={{ background: a.gradient }} />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15" aria-hidden />

                {/* Content */}
                <div className="relative z-10 flex flex-1 flex-col justify-between p-6">
                  {/* Top badges */}
                  <div className="flex flex-wrap gap-2">
                    <span
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] uppercase tracking-wider text-white"
                    >
                      {a.emoji} {a.categoria}
                    </span>
                    {a.duracion && (
                      <span
                        style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 text-[10px] uppercase tracking-wider text-white/85"
                      >
                        ⏱ {a.duracion}
                      </span>
                    )}
                  </div>

                  {/* Bottom info */}
                  <div className="mt-auto">
                    <p
                      style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
                      className="text-[11px] text-[#52B788] uppercase tracking-wider mb-1"
                    >
                      Cantón {cantonNombre(a.cantonSlug)}
                    </p>
                    <h2
                      style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}
                      className="text-xl leading-tight drop-shadow-md"
                    >
                      {a.nombre}
                    </h2>
                    <p
                      style={{ fontFamily: "var(--font-body)" }}
                      className="text-xs text-white/75 mt-2 leading-relaxed line-clamp-2"
                    >
                      {a.descripcion}
                    </p>

                    <Link
                      href={`/cantones/${a.cantonSlug}`}
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 px-4 py-2 text-xs text-white transition-all duration-300"
                    >
                      Ver cantón →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p style={{ fontFamily: "var(--font-body)" }} className="mt-12 text-center text-xs text-[#94A39A]">
            Información verificada para visitantes. Confirma horarios y estado de senderos antes de viajar.
          </p>
        </div>
      </section>
    </>
  );
}
