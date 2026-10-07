import type { Metadata } from "next";
import GuideCard from "@/components/GuideCard";
import PageHero from "@/components/PageHero";
import { GUIAS } from "@/lib/data/guias";

export const metadata: Metadata = {
  title: "Guías para descubrir Loja",
  description: "Guías editoriales de la provincia de Loja: qué hacer en Loja, Vilcabamba, Saraguro, Podocarpus, cómo llegar y auxilio en carretera.",
  alternates: { canonical: "/descubre-loja" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero title="Guías para descubrir Loja" lead="Rutas, itinerarios y consejos prácticos para planear tu viaje a la provincia." />
      <section className="py-14">
        <div className="mx-auto grid w-[min(1180px,100%-40px)] gap-5 md:grid-cols-2 lg:grid-cols-3">
          {GUIAS.map((g) => (
            <GuideCard key={g.slug} guia={g} />
          ))}
        </div>
      </section>
    </>
  );
}
