import Link from "next/link";
import Buscador from "@/components/Buscador";
import PreloaderLoja from "@/components/PreloaderLoja";
import SeccionDecision from "@/components/SeccionDecision";
import SeccionQueHayEnLoja from "@/components/SeccionQueHayEnLoja";
import SeccionFundadores from "@/components/SeccionFundadores";
import RevealSection from "@/components/RevealSection";
import { construirIndice } from "@/lib/data/indice";

export default function Home() {
  return (
    <>
      {/* =========================================================================
          PRELOADER CINEMATOGRÁFICO: MAPA EN FORMA DE BOTA (ESTILO CARTOGRÁFICO NATURAL)
      ========================================================================= */}
      <PreloaderLoja />

      {/* =========================================================================
          SECCIÓN 1: HERO PRINCIPAL LUMINOSO FULLSCREEN CON IMÁGENES REALES
      ========================================================================= */}
      <section className="relative isolate min-h-screen flex flex-col justify-center overflow-hidden text-[#17201B] bg-[#FAFAF8] pt-24 pb-20">
        {/* Imagen de fondo real (Responsive: desktop y móvil) */}
        <picture className="absolute inset-0 -z-20 h-full w-full">
          <source media="(max-width: 768px)" srcSet="/hero/hero-eolico-movil.png" />
          <img
            src="/hero/hero-eolico-desktop.webp"
            alt="Parque Eólico Villonaco, Loja Ecuador"
            className="h-full w-full object-cover object-center"
          />
        </picture>

        {/* Overlay mínimo: solo oscurece ligeramente el lado izquierdo para legibilidad del texto */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-black/55 via-black/30 to-transparent"
        />

        <div className="mx-auto w-[min(1180px,100%-40px)] relative z-10 my-auto">
          <div className="max-w-2xl">
            {/* Badge: Space Grotesk — números y etiquetas compactas */}
            <div
              style={{ fontFamily: "var(--font-label)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white uppercase mb-6"
            >
              <span>Provincia de Loja, Ecuador · 16 Cantones</span>
            </div>

            {/* H1: Sora ExtraBold — Marca + Intención de Búsqueda Real */}
            <h1
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.035em", lineHeight: 1.05 }}
              className="text-[clamp(2.8rem,7vw,5.4rem)] text-white drop-shadow-sm"
            >
              Descubre qué hacer en{" "}
              <span className="text-[#7ECB9A]">Loja</span>
            </h1>

            {/* Subtítulo semántico descriptivo */}
            <p
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: "0.04em" }}
              className="mt-3 text-xs sm:text-sm text-white/70 uppercase"
            >
              Guía de Lugares Turísticos, 16 Cantones y Agenda 2026
            </p>

            {/* Descripción limpia y directa */}
            <p
              style={{ fontFamily: "var(--font-body)", fontWeight: 400, lineHeight: 1.7 }}
              className="mt-4 mb-8 max-w-[32em] text-base sm:text-lg text-white/80"
            >
              16 cantones por recorrer. Naturaleza, valles y cultura viva en el sur del Ecuador.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#seccion-decision"
                style={{ fontFamily: "var(--font-label)", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.06em" }}
                className="inline-flex min-h-12 items-center rounded-full bg-[#2C5E43] px-7 uppercase text-white hover:bg-[#224B35] shadow-sm transition-all"
              >
                Planificar itinerario
              </Link>
              <Link
                href="/cantones"
                style={{ fontFamily: "var(--font-label)", fontWeight: 500, fontSize: "0.78rem", letterSpacing: "0.04em" }}
                className="inline-flex min-h-12 items-center rounded-full border border-[#E8EAE3] bg-white px-7 uppercase text-[#17201B] hover:bg-[#FAFAF8] transition-all shadow-2xs"
              >
                Explorar 16 cantones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          💎 BUSCADOR TURÍSTICO "FLOTANTE" EXACTAMENTE A CABALLO / EN MEDIO
          Mitad sobre la Sección 1 (Hero) y mitad sobre la Sección 2 (Decisión)
      ========================================================================= */}
      <div className="relative z-30 -my-14" aria-label="Buscador turístico provincial">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <Buscador items={construirIndice()} />
        </div>
      </div>

      {/* =========================================================================
          SECCIÓN 2: LAS 2 CARDS DE DECISIÓN (Entrada dinámica desde abajo)
      ========================================================================= */}
      <RevealSection delay={50} direction="up">
        <SeccionDecision />
      </RevealSection>

      {/* =========================================================================
          SECCIÓN 3: "QUÉ HAY EN LOJA" (Entrada dinámica de lado izquierdo)
      ========================================================================= */}
      <RevealSection delay={80} direction="left">
        <SeccionQueHayEnLoja />
      </RevealSection>

      {/* =========================================================================
          SECCIÓN 4: LOGOS DE FUNDADORES Y CONVENIOS GAD (Entrada con zoom suave)
      ========================================================================= */}
      <RevealSection delay={80} direction="zoom">
        <SeccionFundadores />
      </RevealSection>
    </>
  );
}
