import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative bg-[#17201B] pt-16 pb-12 text-[#E8EAE3] border-t border-[#2C5E43]/30">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[4px]"
        style={{ background: "linear-gradient(90deg, #2C5E43 0%, #5A9E78 50%, #D4A373 100%)" }}
      />
      <div className="mx-auto w-[min(1180px,100%-40px)]">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/brandmark.svg"
                alt="Agenda Turística Loja"
                className="size-9 object-contain"
              />
              <p
                style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.03em" }}
                className="text-2xl sm:text-3xl text-white"
              >
                agenda<span className="text-[#5A9E78]">turistica</span>loja.com
              </p>
            </div>
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="mt-3 max-w-[44ch] text-sm sm:text-base text-[#B2BEB5] leading-relaxed"
            >
              Descubre Loja. 16 cantones, una provincia completa por recorrer y disfrutar.
            </p>
          </div>

          <nav aria-label="Explorar" className="flex flex-col gap-2.5 text-sm">
            <p
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: "0.08em" }}
              className="text-xs uppercase text-white mb-1"
            >
              Explorar
            </p>
            <Link href="/cantones" className="text-[#B2BEB5] hover:text-white transition-colors">Cantones</Link>
            <Link href="/hospedaje" className="text-[#B2BEB5] hover:text-white transition-colors">Hospedaje</Link>
            <Link href="/atractivos" className="text-[#B2BEB5] hover:text-white transition-colors">Atractivos</Link>
            <Link href="/descubre-loja" className="text-[#B2BEB5] hover:text-white transition-colors">Guías Descubre Loja</Link>
            <Link href="/auxilio-en-ruta" className="text-[#B2BEB5] hover:text-white transition-colors">Auxilio en ruta</Link>
          </nav>

          <nav aria-label="Participar" className="flex flex-col gap-2.5 text-sm">
            <p
              style={{ fontFamily: "var(--font-label)", fontWeight: 700, letterSpacing: "0.08em" }}
              className="text-xs uppercase text-white mb-1"
            >
              Participar
            </p>
            <Link href="/para-negocios" className="text-[#B2BEB5] hover:text-white transition-colors">Para negocios</Link>
            <Link href="/municipios" className="text-[#B2BEB5] hover:text-white transition-colors">Municipios (GAD)</Link>
            <Link href="/contacto" className="text-[#B2BEB5] hover:text-white transition-colors">Contacto y sugerencias</Link>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <nav aria-label="Ecosistema GuIAloja" className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            {SITE.ecosistema.map((e) => (
              <a
                key={e.href}
                href={e.href}
                rel="noopener"
                className="text-[#94A39A] hover:text-white transition-colors border-b border-transparent hover:border-white"
              >
                {e.label}
              </a>
            ))}
          </nav>

          <p
            style={{ fontFamily: "var(--font-body)" }}
            className="mt-6 text-xs text-[#809085] leading-relaxed"
          >
            © 2026 GuIAloja. Una iniciativa de la provincia de Loja, Ecuador. Precios y disponibilidad referenciales: confirma directamente con cada establecimiento.
          </p>
        </div>
      </div>
    </footer>
  );
}
