import Link from "next/link";
import type { Hospedaje } from "@/types";
import { mensajeConsulta } from "@/lib/whatsapp";
import { cantonNombre } from "@/lib/data/cantones";
import WhatsAppButton from "./WhatsAppButton";

export default function HotelCard({ hotel }: { hotel: Hospedaje }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl bg-white border border-[#E8EAE3] shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500">
      {/* Photo */}
      <div className="relative overflow-hidden h-52" style={hotel.imagen ? {} : { background: hotel.gradient }}>
        {hotel.imagen ? (
          <img
            src={hotel.imagen}
            alt={hotel.nombre}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span aria-hidden className="absolute inset-0 grid place-items-center text-6xl opacity-80">🏨</span>
        )}
        {/* Badge */}
        <span
          style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
          className={`absolute left-3 top-3 rounded-full backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider border shadow-sm ${
            hotel.verificado
              ? "bg-[#EBF3ED]/95 text-[#2C5E43] border-[#2C5E43]/25"
              : "bg-white/90 text-[#9A6200] border-[#9A6200]/25"
          }`}
        >
          {hotel.verificado ? "✅ Verificado" : "⏳ En proceso"}
        </span>
        {/* Precio flotante */}
        <div className="absolute bottom-3 right-3 rounded-2xl bg-black/50 backdrop-blur-md border border-white/20 px-3 py-1.5 text-white text-center">
          <p style={{ fontFamily: "var(--font-body)" }} className="text-[10px] text-white/70 leading-none">Desde</p>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 800 }} className="text-xl leading-tight">${hotel.desde}</p>
          <p className="text-[10px] text-white/60 leading-none">/noche</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <p
            style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
            className="text-[11px] text-[#2C5E43] uppercase tracking-wider"
          >
            {hotel.tipo} · {cantonNombre(hotel.cantonSlug)}
          </p>
          <h3
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
            className="text-lg text-[#17201B] leading-tight mt-1"
          >
            {hotel.nombre}
          </h3>
          <p style={{ fontFamily: "var(--font-body)" }} className="text-xs text-[#64746B] mt-1">
            📍 {hotel.zona}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#EEF0EA] flex flex-col gap-2">
          <WhatsAppButton mensaje={mensajeConsulta(hotel.nombre)} className="w-full justify-center">
            💬 Escribir por WhatsApp
          </WhatsAppButton>
          <Link
            href={`/hospedaje/${hotel.slug}`}
            style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
            className="w-full py-2.5 rounded-full border border-[#E8EAE3] text-center text-xs text-[#17201B] hover:bg-[#FAFAF8] hover:border-[#2C5E43]/30 transition-all duration-200"
          >
            Ver ficha completa
          </Link>
        </div>
      </div>
    </article>
  );
}
