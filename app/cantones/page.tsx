import type { Metadata } from "next";
import CantonCard from "@/components/CantonCard";
import PageHero from "@/components/PageHero";
import { CANTONES } from "@/lib/data/cantones";

export const metadata: Metadata = {
  title: "Los 16 cantones de la provincia de Loja",
  description: "Conoce los 16 cantones de la provincia de Loja, Ecuador: Loja, Saraguro, Catamayo, Macará, Calvas, Célica y más.",
  alternates: { canonical: "/cantones" },
};

export default function CantonesPage() {
  return (
    <>
      <PageHero title="Los 16 cantones de Loja" lead="Cada cantón tiene su paisaje, su gente y sus sabores. Elige uno y empieza a planear." />
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
