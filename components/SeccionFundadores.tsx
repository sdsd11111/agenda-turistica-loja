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
    href: "https://mvps.b-cdn.net/agenda-turistica/cantones/loja",
  },
  {
    nombre: "GAD Saraguro",
    rol: "Convenio Cantonal",
    siglas: "SGR",
    descripcion: "Patrimonio vivo del pueblo kichwa y medicina ancestral.",
    color: "#7C4A1E",
    bg: "#FDF0E6",
    initial: "S",
    href: "https://mvps.b-cdn.net/agenda-turistica/cantones/saraguro",
  },
  {
    nombre: "GAD Catamayo",
    rol: "Convenio Cantonal",
    siglas: "CTM",
    descripcion: "Portal aéreo provincial, clima de valle y gastronomía.",
    color: "#1E5A7C",
    bg: "#E6F2FD",
    initial: "C",
    href: "https://mvps.b-cdn.net/agenda-turistica/cantones/catamayo",
  },
  {
    nombre: "GAD Calvas",
    rol: "Convenio Cantonal",
    siglas: "CLV",
    descripcion: "Escalada y senderismo en el monolito del Cerro Ahuaca.",
    color: "#5A1E7C",
    bg: "#F0E6FD",
    initial: "C",
    href: "https://mvps.b-cdn.net/agenda-turistica/cantones/calvas",
  },
  {
    nombre: "GAD Zapotillo",
    rol: "Convenio Cantonal",
    siglas: "ZPT",
    descripcion: "Reserva de biósfera y florecimiento de los guayacanes.",
    color: "#7C6B1E",
    bg: "#FDF8E6",
    initial: "Z",
    href: "https://mvps.b-cdn.net/agenda-turistica/cantones/zapotillo",
  },
  {
    nombre: "GAD Puyango",
    rol: "Convenio Cantonal",
    siglas: "PYG",
    descripcion: "Bosque Petrificado y riqueza paleontológica única.",
    color: "#1E7C5A",
    bg: "#E6FDF4",
    initial: "P",
    href: "https://mvps.b-cdn.net/agenda-turistica/cantones/puyango",
  },
  {
    nombre: "Red GuIAloja",
    rol: "Operadores Verificados",
    siglas: "GIA",
    descripcion: "Red privada de hospedaje y auxilio vial certificado.",
    color: "#2C5E43",
    bg: "#EBF3ED",
    initial: "G",
    href: "/contacto",
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
      <div className="mx-auto w-[min(1420px,100%-48px)]">
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
          className="marquee-track gap-5 px-4"
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee-loop 35s linear infinite",
          }}
        >
          {triple.map((f, idx) => (
            <a
              key={`${f.siglas}-${idx}`}
              href={`https://wa.me/593963410409?text=${encodeURIComponent(
                `Hola, deseo información para la vinculación institucional del cantón / operador turístico en la Agenda Turística de Loja (${f.nombre}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[220px] sm:w-[240px] h-[210px] p-6 rounded-3xl border border-[#E8EAE3] bg-white hover:border-[#2C5E43] hover:shadow-xl transition-all duration-300 shrink-0 group select-none flex flex-col items-center justify-between text-center cursor-pointer shadow-xs hover:-translate-y-1"
            >
              {/* Contenedor central de logo/monograma súper clean */}
              <div className="flex-1 flex flex-col items-center justify-center my-auto">
                <div
                  className="size-16 rounded-2xl flex flex-col items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300 mb-2.5"
                  style={{ background: f.bg, border: `1.5px solid ${f.color}25` }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "1.5rem",
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
                      fontSize: "0.48rem",
                      letterSpacing: "0.14em",
                      color: f.color,
                      opacity: 0.85,
                    }}
                    className="uppercase mt-0.5"
                  >
                    {f.siglas}
                  </span>
                </div>

                <h3
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.85rem" }}
                  className="text-[#17201B] leading-tight line-clamp-1 group-hover:text-[#2C5E43] transition-colors"
                >
                  {f.nombre}
                </h3>
              </div>

              {/* Único texto inferior solicitado: super clean */}
              <div className="w-full pt-3 border-t border-[#EEF0EA]/80 flex items-center justify-center">
                <span
                  style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.68rem", letterSpacing: "0.05em" }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3ED] text-[#2C5E43] group-hover:bg-[#2C5E43] group-hover:text-white transition-all uppercase"
                >
                  <span className="size-1.5 rounded-full bg-[#2C5E43] group-hover:bg-white animate-pulse" />
                  <span>Puesto Abierto · Postular</span>
                  <span className="text-[10px]">↗</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bloque CTA B2G */}
      <div className="mx-auto w-[min(1420px,100%-48px)] mt-12">
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
              href="/contacto"
              style={{ fontFamily: "var(--font-label)", fontWeight: 500 }}
              className="px-5 py-2.5 rounded-full border border-[#E8EAE3] text-[#47554E] text-xs hover:bg-[#FAFAF8] transition-all"
            >
              Contactar por Negocios
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
