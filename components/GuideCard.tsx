import Link from "next/link";
import type { Guia } from "@/types";

const NIVEL_COLORS: Record<string, string> = {
  Fácil: "from-emerald-500/80 to-teal-600/80",
  Moderado: "from-amber-500/80 to-orange-600/80",
  Difícil: "from-red-500/80 to-rose-600/80",
};

export default function GuideCard({ guia }: { guia: Guia }) {
  const gradientOverlay = NIVEL_COLORS[guia.nivel] ?? "from-slate-700/80 to-slate-900/80";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl min-h-[380px] shadow-[0_8px_32px_rgba(0,0,0,0.28)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-500 hover:-translate-y-1.5">
      {/* Background: real photo or gradient */}
      {guia.imagen ? (
        <img
          src={guia.imagen}
          alt={guia.titulo}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${guia.gradient ?? "from-[#1a3a2a] to-[#0d1f15]"}`}
          aria-hidden
        />
      )}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" aria-hidden />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-between p-7">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-auto">
          <span
            style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] uppercase tracking-wider text-white/90"
          >
            ⏱ {guia.duracion}
          </span>
          <span
            style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
            className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${gradientOverlay} backdrop-blur-md border border-white/20 px-3 py-1 text-[10px] uppercase tracking-wider text-white`}
          >
            {guia.nivel}
          </span>
          <span
            style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 text-[10px] uppercase tracking-wider text-white/80"
          >
            {guia.categoria}
          </span>
        </div>

        {/* Title and description */}
        <div className="mt-8">
          <h3
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.025em", color: "#FFFFFF" }}
            className="text-2xl leading-tight mb-3 drop-shadow-md"
          >
            {guia.titulo}
          </h3>
          <p style={{ fontFamily: "var(--font-body)" }} className="text-sm text-white/80 leading-relaxed line-clamp-2 drop-shadow-sm">
            {guia.resumen}
          </p>
        </div>

        {/* CTA */}
        <Link
          href={`/descubre-loja/${guia.slug}`}
          style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 px-5 py-2.5 text-sm text-white transition-all duration-300 group-hover:border-white/50 w-fit"
        >
          Leer guía
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
