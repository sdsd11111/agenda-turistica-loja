import Link from "next/link";
import type { Canton } from "@/types";

export default function CantonCard({ canton }: { canton: Canton }) {
  return (
    <Link
      href={`/cantones/${canton.slug}`}
      className="group relative flex min-h-[210px] flex-col gap-2 overflow-hidden rounded-[20px] border border-ink/10 bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:bg-forest hover:shadow-[0_24px_60px_-20px_rgba(13,27,18,.4)] focus-visible:bg-forest"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: canton.gradient }} />
      <span aria-hidden className="mt-2 text-3xl">{canton.emoji}</span>
      <h3 className="font-serif text-[1.7rem] font-semibold leading-none text-forest transition-colors group-hover:text-white">
        {canton.nombre}
      </h3>
      <p className="text-sm text-ink/70 transition-colors group-hover:text-white/85 line-clamp-3">{canton.descripcion}</p>
      <span className="mt-auto text-sm font-semibold text-ochre transition-colors group-hover:text-gold">
        Cabecera: {canton.cabecera}
      </span>
    </Link>
  );
}
