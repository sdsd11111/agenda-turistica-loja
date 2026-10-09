import Link from "next/link";
import type { Canton } from "@/types";

export default function CantonCard({ canton }: { canton: Canton }) {
  return (
    <Link
      href={`/cantones/${canton.slug}`}
      className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-[#E8EAE3] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2C5E43]/40 hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)]"
    >
      {/* Imagen real del cantón */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-900">
        <img
          src={canton.imagen ?? "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"}
          alt={canton.nombre}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Emoji & Badge encima de la foto */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="size-10 rounded-xl bg-white/90 backdrop-blur-md border border-white/40 flex items-center justify-center text-xl shadow-sm">
            {canton.emoji}
          </span>
          <span
            style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
            className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20"
          >
            Cantón
          </span>
        </div>

        {/* Nombre sobre la parte inferior de la imagen */}
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              color: "#FFFFFF",
              textShadow: "0 2px 8px rgba(0,0,0,0.8)",
            }}
            className="text-xl leading-tight"
          >
            {canton.nombre}
          </h3>
        </div>
      </div>

      {/* Cuerpo con información */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <p
          style={{ fontFamily: "var(--font-body)" }}
          className="text-xs text-[#64746B] line-clamp-3 leading-relaxed"
        >
          {canton.descripcion}
        </p>

        <div className="mt-4 pt-3 border-t border-[#EEF0EA] flex items-center justify-between text-xs">
          <span style={{ fontFamily: "var(--font-label)", fontWeight: 600 }} className="text-[#78887F]">
            Cabecera: <span className="text-[#17201B] font-bold">{canton.cabecera}</span>
          </span>
          <span className="text-[#2C5E43] font-bold text-sm group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Explorar <span className="text-base">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
