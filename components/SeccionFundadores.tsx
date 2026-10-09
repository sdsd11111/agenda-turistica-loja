"use client";

import Link from "next/link";

// Colores institucionales + logos SVG en línea por cada GAD
const FUNDADORES = [
  {
    nombre: "GAD Municipal de Loja",
    rol: "Municipio Fundador",
    siglas: "LOJA",
    descripcion: "Capital de la cultura y la música del Ecuador.",
    color: "#2C5E43",
    bg: "#EBF3ED",
    initial: "L",
    href: "/cantones/loja",
  },
  {
    nombre: "GAD Saraguro",
    rol: "Convenio Cantonal",
    siglas: "SGR",
    descripcion: "Patrimonio vivo del pueblo kichwa y medicina ancestral.",
    color: "#7C4A1E",
    bg: "#FDF0E6",
    initial: "S",
    href: "/cantones/saraguro",
  },
  {
    nombre: "GAD Catamayo",
    rol: "Convenio Cantonal",
    siglas: "CTM",
    descripcion: "Portal aéreo provincial, clima de valle y gastronomía.",
    color: "#1E5A7C",
    bg: "#E6F2FD",
    initial: "C",
    href: "/cantones/catamayo",
  },
  {
    nombre: "GAD Calvas",
    rol: "Convenio Cantonal",
    siglas: "CLV",
    descripcion: "Escalada y senderismo en el monolito del Cerro Ahuaca.",
    color: "#5A1E7C",
    bg: "#F0E6FD",
    initial: "C",
    href: "/cantones/calvas",
  },
  {
    nombre: "GAD Zapotillo",
    rol: "Convenio Cantonal",
    siglas: "ZPT",
    descripcion: "Reserva de biósfera y florecimiento de los guayacanes.",
    color: "#7C6B1E",
    bg: "#FDF8E6",
    initial: "Z",
    href: "/cantones/zapotillo",
  },
  {
    nombre: "GAD Puyango",
    rol: "Convenio Cantonal",
    siglas: "PYG",
    descripcion: "Bosque Petrificado y riqueza paleontológica única.",
    color: "#1E7C5A",
    bg: "#E6FDF4",
    initial: "P",
    href: "/cantones/puyango",
  },
  {
    nombre: "Red GuIAloja",
    rol: "Operadores Verificados",
    siglas: "GIA",
    descripcion: "Red privada de hospedaje y auxilio vial certificado.",
    color: "#2C5E43",
    bg: "#EBF3ED",
    initial: "G",
    href: "/para-negocios",
  },
];

export default function SeccionFundadores() {
  // Triplicamos para que el loop 33.3334% sea siempre fluido
  const triple = [...FUNDADORES, ...FUNDADORES, ...FUNDADORES];

  return (
    <section
      className="py-20 bg-[#FAFAF8] text-[#17201B] border-t border-[#E8EAE3] overflow-hidden"
      id="fundadores"
    >
      {/* Encabezado */}
      <div className="mx-auto w-[min(1180px,100%-40px)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#EEF0EA] gap-4">
          <div>
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43] block mb-2"
            >
              Marco institucional y alianzas
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.025em" }}
              className="text-2xl sm:text-3xl text-[#17201B]"
            >
              Municipios Aliados y Plazas de Vinculación
            </h2>
          </div>
          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-xs sm:text-sm text-[#47554E] max-w-sm"
          >
            Puestos abiertos y en fase de integración para los 16 GADs cantonales y operadores turísticos certificados de la provincia de Loja.
          </p>
        </div>
      </div>

      {/* ── CARRUSEL CONTINUO ── */}
      <div className="relative w-full overflow-hidden py-2">
        {/* Fade laterales */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAFAF8] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAFAF8] to-transparent z-10" />

        <div
          className="marquee-track gap-4 px-4"
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee-loop 35s linear infinite",
          }}
        >
          {triple.map((f, idx) => (
            <div
              key={`${f.siglas}-${idx}`}
              onClick={() => {
                window.location.href = f.href;
              }}
              className="w-[270px] sm:w-[310px] p-5 rounded-3xl border border-[#E8EAE3] bg-white hover:border-[#2C5E43]/50 hover:shadow-md transition-all shadow-[0_2px_12px_rgb(0,0,0,0.03)] shrink-0 group select-none flex flex-col gap-3.5 relative overflow-hidden cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {/* Escudo / logo */}
                <div
                  className="w-13 h-13 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                  style={{ background: f.bg, border: `1.5px solid ${f.color}22` }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.25rem",
                      letterSpacing: "-0.04em",
                      color: f.color,
                      lineHeight: 1,
                    }}
                  >
                    {f.initial}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-label)",
                      fontWeight: 700,
                      fontSize: "0.45rem",
                      letterSpacing: "0.12em",
                      color: f.color,
                      opacity: 0.8,
                    }}
                    className="uppercase mt-0.5"
                  >
                    {f.siglas}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span
                      style={{
                        fontFamily: "var(--font-label)",
                        fontWeight: 700,
                        fontSize: "0.6rem",
                        letterSpacing: "0.06em",
                        color: f.color,
                      }}
                      className="uppercase block truncate"
                    >
                      {f.rol}
                    </span>
                    <span className="text-[9px] font-semibold text-[#2C5E43] bg-[#EBF3ED] px-2 py-0.5 rounded-full shrink-0">
                      Abierto
                    </span>
                  </div>
                  <h3
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem" }}
                    className="text-[#17201B] leading-tight truncate"
                  >
                    {f.nombre}
                  </h3>
                </div>
              </div>

              {/* Descripción */}
              <p
                style={{ fontFamily: "var(--font-body)" }}
                className="text-[11.5px] text-[#47554E] leading-relaxed line-clamp-2"
              >
                {f.descripcion}
              </p>

              {/* Footer de estado con botón llamativo que salta y lleva al WhatsApp 593963410409 */}
              <div className="pt-3 border-t border-[#EEF0EA] flex items-center justify-between">
                <a
                  href={`https://wa.me/593963410409?text=${encodeURIComponent(
                    `Hola, deseo información para la vinculación institucional del cantón / operador turístico en la Agenda Turística de Loja (${f.nombre}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.04em" }}
                  className="animate-badge-bounce inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EBF3ED] hover:bg-[#2C5E43] text-[#2C5E43] hover:text-white transition-all shadow-sm border border-[#2C5E43]/30 uppercase group/btn cursor-pointer"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2C5E43] opacity-75 group-hover/btn:bg-white" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2C5E43] group-hover/btn:bg-white" />
                  </span>
                  <span>Puesto Abierto · Postular</span>
                  <span className="text-xs">↗</span>
                </a>
                <span className="text-[#2C5E43] text-xs font-bold group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bloque CTA B2G */}
      <div className="mx-auto w-[min(1180px,100%-40px)] mt-12">
        <div className="p-6 sm:p-8 rounded-3xl border border-[#E8EAE3] bg-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              className="text-lg sm:text-xl text-[#17201B]"
            >
              ¿Representas al GAD Municipal de tu cantón?
            </h4>
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="text-xs text-[#47554E] mt-1 max-w-xl"
            >
              Incorpora el patrimonio de tu cantón en la agenda provincial mediante convenio oficial y entrenamiento directo del Asesor IA.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="https://wa.me/593963410409?text=Hola,%20represento%20a%20un%20GAD%20Municipal%20o%20Negocio%20tur%C3%ADstico%20de%20la%20provincia%20de%20Loja%20y%20deseo%20vincularme%20a%20la%20Agenda%20Tur%C3%ADstica."
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="animate-badge-bounce px-5 py-2.5 rounded-full bg-[#2C5E43] text-white text-xs hover:bg-[#224B35] transition-all shadow-md flex items-center gap-2"
            >
              <span>💬 Postular por WhatsApp</span>
              <span className="text-xs">↗</span>
            </a>
            <Link
              href="/municipios"
              style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
              className="px-5 py-2.5 rounded-full border border-[#E8EAE3] text-[#17201B] text-xs hover:bg-[#FAFAF8] transition-all"
            >
              Convenio Cantonal GAD
            </Link>
            <Link
              href="/para-negocios"
              style={{ fontFamily: "var(--font-label)", fontWeight: 500 }}
              className="px-5 py-2.5 rounded-full border border-[#E8EAE3] text-[#47554E] text-xs hover:bg-[#FAFAF8] transition-all"
            >
              Para Hoteles y Operadores
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
