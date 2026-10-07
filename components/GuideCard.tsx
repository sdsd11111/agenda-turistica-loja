import Link from "next/link";
import type { Guia } from "@/types";
import Photo from "./Photo";

export default function GuideCard({ guia }: { guia: Guia }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[20px] border border-ink/10 bg-white">
      <Photo gradient={guia.gradient} className="h-40" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-2xl font-semibold leading-tight text-forest">{guia.titulo}</h3>
        <p className="line-clamp-2 text-[.93rem] text-ink/70">{guia.resumen}</p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-mist px-3 py-1 text-forest">⏱ {guia.duracion}</span>
          <span className={`rounded-full px-3 py-1 ${guia.nivel === "Moderado" ? "bg-[#f6e7dc] text-ochre" : "bg-mist text-forest"}`}>
            Nivel {guia.nivel.toLowerCase()}
          </span>
        </div>
        <Link href={`/descubre-loja/${guia.slug}`} className="mt-auto font-semibold text-sky hover:text-forest">
          Leer guía
        </Link>
      </div>
    </article>
  );
}
