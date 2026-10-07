"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/site";

export default function Nav() {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();

  const activo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-forest-2/95 text-white shadow-[0_6px_24px_-10px_rgba(0,0,0,.4)] backdrop-blur-md">
      <div className="mx-auto flex h-[68px] w-[min(1180px,100%-40px)] items-center justify-between">
        <Link href="/" className="font-serif text-[1.35rem] font-bold tracking-[.01em]" aria-label="Inicio">
          agenda<b className="text-gold">turistica</b>loja
        </Link>

        <nav className="hidden items-center gap-6 text-[.9rem] font-medium lg:flex" aria-label="Principal">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`transition-colors hover:text-gold ${activo(l.href) ? "text-gold" : "text-white/90"}`}
              aria-current={activo(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/auxilio-en-ruta" className="rounded-full bg-alert px-4 py-1.5 text-[.82rem] font-semibold text-white hover:brightness-110">
            🚨 Auxilio en ruta
          </Link>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center text-2xl lg:hidden"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto((o) => !o)}
        >
          {abierto ? "✕" : "☰"}
        </button>
      </div>

      {abierto && (
        <nav id="menu-movil" className="flex flex-col bg-forest-2 px-5 pb-5 lg:hidden" aria-label="Menú móvil">
          {[...NAV_LINKS, { href: "/municipios", label: "Municipios" }, { href: "/contacto", label: "Contacto" }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setAbierto(false)} className="border-b border-white/10 py-3">
              {l.label}
            </Link>
          ))}
          <Link href="/auxilio-en-ruta" onClick={() => setAbierto(false)} className="mt-3 rounded-full bg-alert py-3 text-center font-semibold">
            🚨 Auxilio en ruta
          </Link>
        </nav>
      )}
    </header>
  );
}
