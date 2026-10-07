import Link from "next/link";
import type { Hospedaje } from "@/types";
import { mensajeConsulta } from "@/lib/whatsapp";
import { cantonNombre } from "@/lib/data/cantones";
import Photo from "./Photo";
import WhatsAppButton from "./WhatsAppButton";

export default function HotelCard({ hotel }: { hotel: Hospedaje }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[20px] border border-ink/10 bg-white shadow-[0_10px_30px_-12px_rgba(13,27,18,.25)]">
      <div className="relative">
        <Photo gradient={hotel.gradient} src={hotel.imagen} alt={hotel.nombre} emoji="🏨" className="h-48" />
        <span
          className={`absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold ${
            hotel.verificado ? "text-[#1b6b3a]" : "text-[#9a6200]"
          }`}
        >
          {hotel.verificado ? "✅ Verificado GuIAloja" : "⏳ En proceso de verificación"}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <p className="text-sm text-ink/60">{hotel.tipo} · {cantonNombre(hotel.cantonSlug)}</p>
        <h3 className="font-serif text-[1.65rem] font-semibold leading-tight text-forest">{hotel.nombre}</h3>
        <p className="text-sm text-ink/70">📍 {hotel.zona}</p>
        <p className="my-2">
          Desde <b className="font-serif text-3xl text-ochre">${hotel.desde}</b>
          <span className="text-ink/70">/noche</span>
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <WhatsAppButton mensaje={mensajeConsulta(hotel.nombre)} className="w-full">
            💬 Escribir por WhatsApp
          </WhatsAppButton>
          <Link
            href={`/hospedaje/${hotel.slug}`}
            className="grid min-h-11 place-items-center rounded-full border border-forest/25 text-sm font-semibold text-forest hover:border-forest"
          >
            Ver ficha
          </Link>
        </div>
      </div>
    </article>
  );
}
