import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Photo from "@/components/Photo";
import { ATRACTIVOS } from "@/lib/data/atractivos";
import { cantonNombre } from "@/lib/data/cantones";

export const metadata: Metadata = {
  title: "Atractivos turísticos de la provincia de Loja",
  description: "Naturaleza, patrimonio y cultura en la provincia de Loja: Podocarpus, Vilcabamba, el centro histórico de Loja, Saraguro y más.",
  alternates: { canonical: "/atractivos" },
};

export default function AtractivosPage() {
  return (
    <>
      <PageHero title="Atractivos de Loja" lead="Bosque de niebla, patrimonio, cultura viva y paisajes. Elige qué quieres vivir." />
      <section className="py-14">
        <div className="mx-auto grid w-[min(1180px,100%-40px)] gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ATRACTIVOS.map((a) => (
            <article id={a.slug} key={a.slug} className="flex flex-col overflow-hidden rounded-[20px] border border-ink/10 bg-white">
              <Photo gradient={a.gradient} emoji={a.emoji} className="h-44" />
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-sm text-ink/60">{a.categoria} · {cantonNombre(a.cantonSlug)}</p>
                <h2 className="font-serif text-2xl font-semibold leading-tight text-forest">{a.nombre}</h2>
                <p className="text-[.95rem] text-ink/75">{a.descripcion}</p>
                <div className="mt-auto flex items-center justify-between pt-3 text-sm">
                  {a.duracion && <span className="rounded-full bg-mist px-3 py-1 font-semibold text-forest">⏱ {a.duracion}</span>}
                  <Link href={`/cantones/${a.cantonSlug}`} className="font-semibold text-sky hover:text-forest">Ver cantón</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-8 w-[min(1180px,100%-40px)] text-center text-sm text-ink/60">Confirma horarios, accesos y requisitos de ingreso antes de visitar.</p>
      </section>
    </>
  );
}
