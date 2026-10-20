import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { CANTONES } from "@/lib/data/cantones";
import { getEventosCanton, formatearFechaEvento } from "@/lib/services/eventosCultura";
import VistaEventosProvincia from "./VistaEventosProvincia";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Agenda de Eventos en Loja: Qué Hacer Hoy y Próximas Fiestas 2026",
  description:
    "Cartelera cultural y festividades de los 16 cantones de Loja, Ecuador. Conciertos, ferias cantonales, turismo y eventos en vivo actualizados.",
  alternates: { canonical: "/eventos" },
  openGraph: {
    title: "Agenda de Eventos en Loja y sus 16 Cantones",
    description:
      "Conoce la cartelera de eventos culturales, artísticos y festividades en la provincia de Loja.",
    images: [{ url: "https://mvps.b-cdn.net/agenda-turistica/home/bg-eventos-loja.webp" }],
  },
};

export default async function EventosPage() {
  const data = await getEventosCanton("todos");

  // Structured Data (JSON-LD ItemList) para potenciar SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Agenda de Eventos Culturales y Turísticos de la Provincia de Loja",
    description: "Cartelera de eventos en tiempo real de los 16 cantones de Loja.",
    numberOfItems: data.eventos.length,
    itemListElement: data.eventos.map((ev, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "Event",
        name: ev.nombre,
        startDate: ev.fechaInicio,
        endDate: ev.fechaFin || undefined,
        description: ev.resumen || ev.nombre,
        image: ev.imagenUrl,
        url: ev.canonicalUrl,
        location: {
          "@type": "Place",
          name: ev.lugar,
          address: {
            "@type": "PostalAddress",
            addressLocality: ev.canton.nombre,
            addressRegion: "Loja",
            addressCountry: "EC",
          },
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title="Agenda de Eventos en Loja"
        lead="Descubre qué hacer hoy, este fin de semana y en las próximas semanas en los 16 cantones de la provincia de Loja. Información verificada en tiempo real."
        badge="🎉 Cartelera Provincial en Vivo · Loja 2026"
        imagen="https://mvps.b-cdn.net/agenda-turistica/home/bg-eventos-loja.webp"
        backLink={{ href: "/", label: "Volver al Inicio" }}
      >
        <span
          style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/25 px-4 py-2 text-xs text-white"
        >
          ✨ {data.eventos.length} evento{data.eventos.length === 1 ? "" : "s"} vigente{data.eventos.length === 1 ? "" : "s"} en la provincia
        </span>
      </PageHero>

      <section className="py-14 sm:py-20 bg-[#FAFAF8] text-[#17201B]">
        <div className="mx-auto w-[min(1420px,100%-48px)]">
          <VistaEventosProvincia
            eventosIniciales={data.eventos}
            conteoPorCanton={data.conteoPorCanton}
          />
        </div>
      </section>
    </>
  );
}
