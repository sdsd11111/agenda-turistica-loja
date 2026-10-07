import type { Metadata } from "next";
import AuxilioLocator from "@/components/AuxilioLocator";
import { SERVICIOS } from "@/lib/data/servicios";

export const metadata: Metadata = {
  title: "Auxilio en ruta: grúas, talleres y estaciones de servicio en Loja",
  description: "Directorio de auxilio mecánico en carretera para la provincia de Loja: talleres, grúas, rent a car y estaciones de servicio.",
  alternates: { canonical: "/auxilio-en-ruta" },
};

export default function AuxilioPage() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-24 text-white" style={{ background: "radial-gradient(70% 80% at 85% 0%,#8f1d1d 0%,transparent 60%),linear-gradient(160deg,#2a0808,#5c1010 55%,#3a0b0b)" }}>
      <div aria-hidden className="absolute inset-x-0 top-[68px] h-3.5" style={{ background: "repeating-linear-gradient(-45deg,#f2c14e 0 18px,#1a0505 18px 36px)" }} />
      <div className="mx-auto w-[min(1180px,100%-40px)]">
        <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[1.02] sm:text-6xl">Auxilio en ruta</h1>
        <p className="mt-4 max-w-[60ch] text-lg text-white/85">
          ¿Tuviste un imprevisto en carretera? Encuentra talleres, grúas y estaciones de servicio cerca de ti.
        </p>

        <div className="mt-8 rounded-[20px] border border-white/20 bg-black/35 p-6">
          <h2 className="font-serif text-3xl font-semibold">Primero, tu seguridad</h2>
          <ol className="mt-3 grid list-decimal gap-2 pl-5 text-white/90">
            <li>Detente en un lugar seguro y enciende las luces de emergencia.</li>
            <li>Si hay heridos o peligro, llama al <b>ECU 911</b>.</li>
            <li>Comparte tu ubicación para ver el servicio más cercano.</li>
          </ol>
          <a href="tel:911" className="mt-5 inline-flex min-h-12 items-center rounded-full bg-[#d93025] px-7 font-semibold hover:bg-[#ef4034]">📞 Llamar al ECU 911</a>
        </div>

        <div className="mt-10">
          <AuxilioLocator servicios={SERVICIOS} />
        </div>

        <p className="mt-8 text-sm text-white/65">
          Los registros mostrados son de demostración. El directorio real de talleres, grúas y estaciones por cantón se publica a medida que cada servicio es verificado.
        </p>
      </div>
    </section>
  );
}
