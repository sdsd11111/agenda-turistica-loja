import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative bg-ink pt-14 pb-8 text-white/80">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[5px]"
        style={{ background: "linear-gradient(90deg,#1B4332,#2D6A8B,#A0522D,#8B7355)" }}
      />
      <div className="mx-auto w-[min(1180px,100%-40px)]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-3xl font-bold text-white">
              agenda<b className="text-gold">turistica</b>loja.com
            </p>
            <p className="mt-3 max-w-[46ch] font-serif text-lg italic">
              Descubre Loja. 16 cantones, una provincia completa.
            </p>
          </div>
          <nav aria-label="Explorar" className="flex flex-col gap-2 text-[.95rem]">
            <p className="font-semibold text-white">Explorar</p>
            <Link href="/cantones" className="hover:text-gold">Cantones</Link>
            <Link href="/hospedaje" className="hover:text-gold">Hospedaje</Link>
            <Link href="/atractivos" className="hover:text-gold">Atractivos</Link>
            <Link href="/descubre-loja" className="hover:text-gold">Guías Descubre Loja</Link>
            <Link href="/auxilio-en-ruta" className="hover:text-gold">Auxilio en ruta</Link>
          </nav>
          <nav aria-label="Participar" className="flex flex-col gap-2 text-[.95rem]">
            <p className="font-semibold text-white">Participar</p>
            <Link href="/para-negocios" className="hover:text-gold">Para negocios</Link>
            <Link href="/municipios" className="hover:text-gold">Municipios (GAD)</Link>
            <Link href="/contacto" className="hover:text-gold">Contacto y sugerencias</Link>
          </nav>
        </div>

        <nav aria-label="Ecosistema GuIAloja" className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[.92rem]">
          {SITE.ecosistema.map((e) => (
            <a key={e.href} href={e.href} rel="noopener" className="border-b border-white/30 pb-0.5 hover:border-gold hover:text-gold">
              {e.label}
            </a>
          ))}
        </nav>

        <p className="mt-8 border-t border-white/15 pt-5 text-[.82rem] text-white/55">
          © 2026 GuIAloja. Una iniciativa de la provincia de Loja, Ecuador. Precios y disponibilidad referenciales: confirma directamente con cada establecimiento.
        </p>
      </div>
    </footer>
  );
}
