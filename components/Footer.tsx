import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative bg-[#17201B] pt-10 pb-8 text-[#E8EAE3] border-t border-[#2C5E43]/30 text-center sm:text-left">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, #2C5E43 0%, #5A9E78 50%, #D4A373 100%)" }}
      />
      <div className="mx-auto w-[min(1420px,100%-32px)] sm:w-[min(1420px,100%-48px)]">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-[1.5fr_1fr_1fr] items-center sm:items-start">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <img
                src="/brandmark.svg"
                alt="Agenda Turística Loja"
                className="size-7 sm:size-8 object-contain"
              />
              <p
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.03em" }}
                className="text-xl sm:text-2xl text-white"
              >
                agenda<span className="text-[#5A9E78]">turistica</span>loja.com
              </p>
            </div>
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="max-w-[40ch] text-xs sm:text-sm text-[#B2BEB5] leading-relaxed mx-auto sm:mx-0"
            >
              Guías oficiales y cartelera turística de los 16 cantones de la provincia de Loja, Ecuador.
            </p>
          </div>

          <nav aria-label="Explorar" className="flex flex-col items-center sm:items-start gap-2 text-xs sm:text-sm">
            <p
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: "0.08em" }}
              className="text-[11px] sm:text-xs uppercase text-white mb-0.5 tracking-wider"
            >
              Explorar
            </p>
            <div className="flex flex-wrap sm:flex-col justify-center gap-x-4 gap-y-1.5 sm:gap-2">
              <Link href="/cantones" className="text-[#B2BEB5] hover:text-white transition-colors">Cantones</Link>
              <Link href="/hospedaje" className="text-[#B2BEB5] hover:text-white transition-colors">Hospedaje</Link>
              <Link href="/atractivos" className="text-[#B2BEB5] hover:text-white transition-colors">Atractivos</Link>
              <Link href="/guias" className="text-[#B2BEB5] hover:text-white transition-colors">Guías Turísticas</Link>
              <Link href="/auxilio-en-ruta" className="text-[#B2BEB5] hover:text-white transition-colors">Auxilio en ruta</Link>
            </div>
          </nav>

          <nav aria-label="Participar" className="flex flex-col items-center sm:items-start gap-2 text-xs sm:text-sm">
            <p
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: "0.08em" }}
              className="text-[11px] sm:text-xs uppercase text-white mb-0.5 tracking-wider"
            >
              Participar
            </p>
            <div className="flex flex-wrap sm:flex-col justify-center gap-x-4 gap-y-1.5 sm:gap-2">
              <Link href="/municipios" className="text-[#B2BEB5] hover:text-white transition-colors">Municipios (GAD)</Link>
              <Link href="/contacto" className="text-[#B2BEB5] hover:text-white transition-colors">Contacto y sugerencias</Link>
            </div>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-3">
          <nav aria-label="Ecosistema" className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs">
            {SITE.ecosistema.map((e) => (
              <a
                key={e.href}
                href={e.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#94A39A] hover:text-white transition-colors border-b border-transparent hover:border-white"
              >
                {e.label}
              </a>
            ))}
          </nav>

          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="text-[11px] sm:text-xs text-[#809085] leading-relaxed text-center"
          >
            Diseñado por{" "}
            <a
              href="https://cesarreyesjaramillo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5A9E78] hover:text-white underline font-medium transition-colors"
            >
              César Reyes
            </a>{" "}
            | Agenda turística 2026 Loja-Ecuador
          </p>
        </div>
      </div>
    </footer>
  );
}
