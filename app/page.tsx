import Link from "next/link";
import Buscador from "@/components/Buscador";
import CantonCard from "@/components/CantonCard";
import HotelCard from "@/components/HotelCard";
import GuideCard from "@/components/GuideCard";
import SectionHead from "@/components/SectionHead";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CANTONES } from "@/lib/data/cantones";
import { HOSPEDAJES } from "@/lib/data/hospedaje";
import { GUIAS } from "@/lib/data/guias";
import { construirIndice } from "@/lib/data/indice";

export default function Home() {
  const destacados = CANTONES.filter((c) => c.destacado);
  const hoteles = HOSPEDAJES.filter((h) => h.destacado);
  const guias = GUIAS.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate grid min-h-[100svh] items-center overflow-hidden text-white" style={{ background: "linear-gradient(170deg,#0f2a1c 0%,#1B4332 45%,#245b57 78%,#2D6A8B 100%)" }}>
        <div aria-hidden className="pattern-andino absolute inset-0 -z-10 opacity-[.12]" style={{ WebkitMaskImage: "linear-gradient(180deg,#000,transparent 75%)", maskImage: "linear-gradient(180deg,#000,transparent 75%)" }} />
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(60% 50% at 78% 22%,rgba(242,193,78,.42),transparent 60%),radial-gradient(40% 40% at 15% 70%,rgba(45,106,139,.5),transparent 70%)" }} />
        <svg aria-hidden viewBox="0 0 1440 500" preserveAspectRatio="none" className="absolute inset-x-0 bottom-[-2px] -z-10 h-[58%] w-full">
          <path d="M0 330 L120 250 L220 310 L360 170 L470 270 L560 220 L700 330 L820 190 L940 290 L1060 210 L1200 320 L1320 240 L1440 300 L1440 500 L0 500Z" fill="#2d6a8b" opacity=".45" />
          <path d="M0 400 L150 310 L270 380 L420 260 L540 360 L690 280 L830 390 L980 300 L1120 380 L1260 310 L1440 390 L1440 500 L0 500Z" fill="#2d6a4f" opacity=".7" />
          <path d="M0 460 L200 400 L360 450 L560 390 L760 455 L960 400 L1160 452 L1300 410 L1440 455 L1440 500 L0 500Z" fill="#F8FAF9" />
        </svg>

        <div className="hero-in mx-auto w-[min(1180px,100%-40px)] pt-32 pb-40">
          <p className="mb-5 flex items-center gap-3 text-sm font-semibold text-gold before:h-0.5 before:w-9 before:bg-gold">
            Provincia de Loja, Ecuador
          </p>
          <h1 className="font-serif text-[clamp(3.6rem,13vw,9rem)] font-bold leading-[.95] tracking-tight [text-shadow:0_8px_40px_rgba(0,0,0,.35)]">
            Descubre Loja
          </h1>
          <p className="mt-6 mb-9 max-w-[34em] text-[clamp(1.05rem,2.6vw,1.45rem)] text-white/90">
            16 cantones. Una provincia que lo tiene todo: naturaleza, cultura, gastronomía y el Valle de la Longevidad.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link href="/cantones" className="inline-flex min-h-12 items-center rounded-full bg-gold px-7 font-semibold text-[#1b1405] shadow-[0_10px_24px_-8px_rgba(242,193,78,.6)] hover:bg-[#ffd36b]">
              Explorar la provincia
            </Link>
            <Link href="/hospedaje" className="inline-flex min-h-12 items-center rounded-full border border-white/60 bg-white/10 px-7 font-semibold backdrop-blur hover:bg-white/20">
              Ver hospedaje verificado
            </Link>
          </div>
        </div>
      </section>

      {/* BUSCADOR */}
      <section className="relative z-10 -mt-14" aria-label="Buscador turístico">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <Buscador items={construirIndice()} />
        </div>
      </section>

      {/* CANTONES */}
      <section className="py-24">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <SectionHead title="16 cantones, una provincia completa" lead="Del bosque de niebla al valle seco, de la cultura kichwa a la frontera con Perú: cada cantón tiene su propia historia." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destacados.map((c) => (
              <CantonCard key={c.slug} canton={c} />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/cantones" className="inline-flex min-h-12 items-center rounded-full bg-forest px-7 font-semibold text-white hover:bg-leaf">
              Ver los 16 cantones
            </Link>
          </div>
        </div>
      </section>

      {/* HOSPEDAJE */}
      <section className="py-24" style={{ background: "linear-gradient(180deg,#eef4f0,#F8FAF9)" }}>
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <SectionHead title="Hospedaje verificado GuIAloja" lead="Contáctalos directamente. Sin intermediarios y sin comisiones de reserva." />
          <div className="grid gap-5 md:grid-cols-3">
            {hoteles.map((h) => (
              <HotelCard key={h.slug} hotel={h} />
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-ink/60">Tarjetas de demostración. Precios referenciales: confirma tarifas y disponibilidad con cada establecimiento.</p>
          <div className="mt-6 text-center">
            <Link href="/hospedaje" className="font-semibold text-sky hover:text-forest">Ver todo el hospedaje</Link>
          </div>
        </div>
      </section>

      {/* GUÍAS */}
      <section className="py-24">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <SectionHead title="Guías para descubrir Loja" lead="Rutas pensadas para el viajero: qué ver, cómo llegar y cuánto tiempo necesitas." />
          <div className="grid gap-5 md:grid-cols-3">
            {guias.map((g) => (
              <GuideCard key={g.slug} guia={g} />
            ))}
          </div>
          <div className="mt-6">
            <Link href="/descubre-loja" className="font-semibold text-sky hover:text-forest">Ver todas las guías</Link>
          </div>
        </div>
      </section>

      {/* AUXILIO EN RUTA: el diferencial */}
      <section className="relative overflow-hidden py-24 text-white" style={{ background: "radial-gradient(70% 80% at 85% 0%,#8f1d1d 0%,transparent 60%),linear-gradient(160deg,#2a0808,#5c1010 55%,#3a0b0b)" }}>
        <div aria-hidden className="absolute inset-x-0 top-0 h-3.5" style={{ background: "repeating-linear-gradient(-45deg,#f2c14e 0 18px,#1a0505 18px 36px)" }} />
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <div aria-hidden className="sirena mb-5 grid size-16 place-items-center rounded-full bg-[#d93025] text-3xl">🚨</div>
          <h2 className="max-w-3xl font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl">¿Tuviste un imprevisto en carretera?</h2>
          <p className="mt-4 max-w-[60ch] text-lg text-white/85">
            Un directorio de grúas, talleres y estaciones de servicio verificados en la provincia, en tu teléfono cuando más lo necesitas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link href="/auxilio-en-ruta" className="inline-flex min-h-12 items-center rounded-full bg-white px-7 font-bold text-[#8f1d1d] hover:bg-[#ffe3df]">Ver directorio de auxilio</Link>
            <a href="tel:911" className="inline-flex min-h-12 items-center rounded-full bg-[#d93025] px-7 font-semibold hover:bg-[#ef4034]">📞 Llamar al ECU 911</a>
          </div>
        </div>
      </section>

      {/* NEGOCIOS Y MUNICIPIOS */}
      <section className="py-24">
        <div className="mx-auto w-[min(1180px,100%-40px)]">
          <SectionHead title="¿Tienes un hotel, un servicio o eres un GAD?" lead="Tus atractivos y tu negocio, digitalizados y accesibles para el viajero nacional e internacional." />
          <div className="grid gap-5 md:grid-cols-2">
            <article className="flex flex-col gap-3 rounded-[26px] p-8 text-white shadow-[0_10px_30px_-12px_rgba(13,27,18,.25)]" style={{ background: "linear-gradient(150deg,#12301f,#1B4332 70%,#245b57)" }}>
              <p className="text-sm font-semibold text-gold">GAD municipal</p>
              <h3 className="font-serif text-4xl font-semibold">Cantón asociado</h3>
              <p className="font-serif text-5xl font-bold">$4.900 <small className="font-sans text-base font-medium opacity-75">/ año</small></p>
              <p className="text-white/80">Sección cantonal propia y un asesor entrenado con el patrimonio de tu cantón.</p>
              <Link href="/municipios" className="mt-auto inline-flex min-h-12 w-fit items-center rounded-full bg-gold px-7 font-semibold text-[#1b1405] hover:bg-[#ffd36b]">Conocer el convenio</Link>
            </article>
            <article className="flex flex-col gap-3 rounded-[26px] border border-ink/10 bg-white p-8 shadow-[0_10px_30px_-12px_rgba(13,27,18,.25)]">
              <p className="text-sm font-semibold text-ochre">Sector privado</p>
              <h3 className="font-serif text-4xl font-semibold text-forest">Hotel o empresa turística</h3>
              <p className="font-serif text-5xl font-bold text-ochre">Desde $35 <small className="font-sans text-base font-medium text-ink/70">/ mes</small></p>
              <p className="text-ink/70">Ficha verificada GuIAloja, contacto directo por WhatsApp y cero comisiones.</p>
              <Link href="/para-negocios" className="mt-auto inline-flex min-h-12 w-fit items-center rounded-full bg-forest px-7 font-semibold text-white hover:bg-leaf">Ver planes</Link>
            </article>
          </div>
          <p className="mt-8 text-center font-serif text-2xl italic text-forest sm:text-3xl">
            Pague 10 meses, quédese con 12.
          </p>
          <div className="mt-6 flex justify-center">
            <WhatsAppButton mensaje="Hola, quisiera información sobre cómo aparecer en agendaturisticaloja.com.">💬 Escríbenos por WhatsApp</WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
