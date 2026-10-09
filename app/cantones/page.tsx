import type { Metadata } from "next";
import CantonCard from "@/components/CantonCard";
import PageHero from "@/components/PageHero";
import { CANTONES } from "@/lib/data/cantones";

export const metadata: Metadata = {
  title: "Los 16 Cantones de Loja: Guía Turística Completa, Rutas y Atractivos",
  description: "Explora los 16 cantones de la provincia de Loja, Ecuador: atractivos turísticos, clima, gastronomía y hospedaje en Saraguro, Calvas, Puyango, Zapotillo, Macará y más.",
  keywords: [
    "cantones de loja",
    "16 cantones de loja",
    "turismo provincia de loja",
    "saraguro loja",
    "calvas cariamanga",
    "puyango loja",
    "zapotillo guayacanes",
  ],
  alternates: { canonical: "/cantones" },
};

export default function CantonesPage() {
  return (
    <>
      <PageHero
        title="Los 16 Cantones de Loja"
        lead="Guía de turismo de la provincia de Loja: atractivos, rutas, gastronomía y hospedaje en Saraguro, Puyango, Calvas, Zapotillo, Macará y más."
        badge="🗺️ Turismo en los 16 Cantones de Loja"
      />
      <section className="py-16">
        <div className="mx-auto grid w-[min(1180px,100%-40px)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CANTONES.map((c) => (
            <CantonCard key={c.slug} canton={c} />
          ))}
        </div>
      </section>
    </>
  );
}
