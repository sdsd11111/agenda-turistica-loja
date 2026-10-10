import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Para Negocios Turísticos: Afilia tu Hotel, Hostería o Tour en Loja",
  description: "Aparece en el directorio turístico oficial de los 16 cantones de Loja. Recibe reservas y turistas directo en tu WhatsApp sin comisiones por intermediarios.",
  keywords: [
    "publicidad turistica loja",
    "promocionar hotel en loja",
    "directorio de hoteles loja",
    "negocios turisticos ecuador",
    "afiliarse guia loja",
  ],
  alternates: { canonical: "/para-negocios" },
};

const PLANES = [
  { nombre: "Hoteles pequeños y hostales", mes: 35, anio: 350, oscuro: false },
  { nombre: "Hoteles grandes, haciendas y hosterías", mes: 65, anio: 650, oscuro: true },
  { nombre: "Servicios de ruta y rent a car", mes: 35, anio: 350, oscuro: false },
] as const;

const INCLUYE = [
  "Ficha verificada GuIAloja en el directorio",
  "Contacto directo por WhatsApp con tu mensaje listo",
  "Aparición por cantón y en las guías Descubre Loja",
  "Cero comisiones de reserva",
];

export default function NegociosPage() {
  return (
    <>
      <PageHero
        title="Para Negocios y Operadores Turísticos"
        lead="Aparece en el directorio oficial verificado de los 16 cantones y recibe huéspedes y clientes directamente en tu WhatsApp, sin comisiones de intermediarios."
        badge="Red Verificada GuIAloja"
        imagen="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-20 bg-[#FAFAF8] text-[#17201B]">
        <div className="mx-auto w-[min(1420px,100%-48px)]">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43] block mb-2"
            >
              Planes y Membresías 2026
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
              className="text-3xl sm:text-4xl text-[#17201B]"
            >
              Invierte en visibilidad directa
            </h2>
            <p style={{ fontFamily: "var(--font-body)" }} className="text-xs sm:text-sm text-[#64746B] mt-2">
              Paga 10 meses y quédate con 12. Trato directo entre viajero y anfitrión.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 items-stretch">
            {PLANES.map((p) => (
              <article
                key={p.nombre}
                className={`flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${
                  p.oscuro
                    ? "bg-[#17201B] text-white shadow-xl border border-white/10"
                    : "bg-white text-[#17201B] border border-[#E8EAE3] hover:border-[#2C5E43]/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded-full ${
                        p.oscuro ? "bg-white/15 text-[#52B788]" : "bg-[#EBF3ED] text-[#2C5E43]"
                      }`}
                    >
                      {p.oscuro ? "Recomendado" : "Plan Anual"}
                    </span>
                  </div>

                  <h3
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                    className={`text-xl leading-tight ${p.oscuro ? "text-white" : "text-[#17201B]"}`}
                  >
                    {p.nombre}
                  </h3>

                  <div className="my-5 flex items-baseline gap-1">
                    <span
                      style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                      className={`text-4xl ${p.oscuro ? "text-[#F2C14E]" : "text-[#2C5E43]"}`}
                    >
                      ${p.anio}
                    </span>
                    <span className={`text-xs ${p.oscuro ? "text-white/70" : "text-[#78887F]"}`}>
                      / año (ref. ${p.mes}/mes)
                    </span>
                  </div>

                  <ul className={`space-y-2.5 text-xs ${p.oscuro ? "text-white/85" : "text-[#47554E]"}`}>
                    <li className="flex items-center gap-2">
                      <span className="text-[#52B788] font-bold">✓</span>
                      <span>Ficha verificada GuIAloja en directorio</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#52B788] font-bold">✓</span>
                      <span>Botón directo a tu WhatsApp comercial</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#52B788] font-bold">✓</span>
                      <span>Recomendaciones del Asesor IA de Viajes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#52B788] font-bold">✓</span>
                      <span>0% de comisiones por reserva</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-[#EEF0EA]/30">
                  <a
                    href={`https://wa.me/593963410409?text=${encodeURIComponent(
                      `Hola, deseo activar el plan "${p.nombre}" en la Agenda Turística de Loja.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                    className={`w-full py-3 rounded-full text-center text-xs uppercase tracking-wider font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer ${
                      p.oscuro
                        ? "bg-[#52B788] text-[#17201B] hover:bg-white"
                        : "bg-[#2C5E43] text-white hover:bg-[#224B35]"
                    }`}
                  >
                    <span>💬 Afiliar por WhatsApp</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye & Posicionamiento Top 5 */}
      <section className="py-20 bg-white text-[#17201B] border-t border-[#EEF0EA]">
        <div className="mx-auto grid w-[min(1180px,100%-40px)] gap-10 md:grid-cols-2 items-center">
          <div>
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43] block mb-2"
            >
              Garantía de la Plataforma
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
              className="text-2xl sm:text-3xl text-[#17201B]"
            >
              ¿Por qué afiliarte a la Agenda Provincial?
            </h2>
            <div className="mt-6 space-y-3.5">
              {INCLUYE.map((i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAFAF8] border border-[#EEF0EA]">
                  <span className="size-8 rounded-full bg-[#EBF3ED] text-[#2C5E43] flex items-center justify-center font-bold text-sm shrink-0">
                    ✓
                  </span>
                  <p style={{ fontFamily: "var(--font-body)" }} className="text-xs sm:text-sm text-[#17201B] font-medium">
                    {i}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-8 sm:p-10 border border-[#E8EAE3] bg-[#FAFAF8] shadow-sm">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-[#EBF3ED] text-[#2C5E43] inline-block mb-3"
            >
              Membresía Exclusiva
            </span>
            <h3
              style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
              className="text-2xl text-[#17201B]"
            >
              Posicionamiento Top 5 Provincial
            </h3>
            <div className="my-4 flex items-baseline gap-2">
              <span
                style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
                className="text-4xl text-[#2C5E43]"
              >
                $4.500
              </span>
              <span className="text-xs text-[#78887F]">/ 5 años completos</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)" }} className="text-xs sm:text-sm text-[#64746B] leading-relaxed">
              Garantiza prioridad absoluta de recomendación entre los primeros cinco lugares de tu categoría en búsquedas web y en el asistente IA.
            </p>
            <div className="mt-6 pt-4 border-t border-[#EEF0EA]">
              <a
                href="https://wa.me/593963410409?text=Hola,%20deseo%20consultar%20disponibilidad%20para%20el%20Posicionamiento%20Top%205%20Provincial."
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#17201B] text-white hover:bg-[#2C5E43] transition-all text-xs uppercase tracking-wider font-bold shadow-xs cursor-pointer"
              >
                <span>💬 Consultar disponibilidad</span>
                <span className="text-xs">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
