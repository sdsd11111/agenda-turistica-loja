"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/site";

export default function Nav() {
  const [abierto, setAbierto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const activo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Cierra el menú al cambiar de ruta
  useEffect(() => { setAbierto(false); }, [pathname]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)] border-b border-[#E8EAE3]/60"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-[68px] w-[min(1180px,100%-40px)] items-center justify-between gap-8">

        {/* ── LOGOTIPO ── */}
        <Link href="/" aria-label="Inicio — Descubre Loja" className="flex items-center gap-2 shrink-0 group">
          {/* Ícono de hoja / marca */}
          <div className={[
            "h-8 w-8 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300",
            scrolled ? "bg-[#2C5E43] text-white" : "bg-white/15 backdrop-blur-sm text-white border border-white/25",
          ].join(" ")}>
            🌿
          </div>
          <div className="flex items-baseline gap-[1px]">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.03em", fontSize: "1.05rem" }}
              className={scrolled ? "text-[#17201B]" : "text-white"}>
              agenda
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.03em", fontSize: "1.05rem" }}
              className={scrolled ? "text-[#2C5E43]" : "text-[#7ECB9A]"}>
              turistica
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.03em", fontSize: "1.05rem" }}
              className={scrolled ? "text-[#17201B]" : "text-white"}>
              loja
            </span>
          </div>
        </Link>

        {/* ── NAV DESKTOP ── */}
        <nav className="hidden items-center gap-1 lg:flex flex-1 justify-center" aria-label="Principal">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ fontFamily: "var(--font-body)", fontSize: "0.865rem", fontWeight: activo(l.href) ? 600 : 400 }}
              className={[
                "relative px-3.5 py-2 rounded-xl transition-all duration-200",
                activo(l.href)
                  ? scrolled
                    ? "text-[#2C5E43] bg-[#EBF3ED]"
                    : "text-white bg-white/15 backdrop-blur-sm"
                  : scrolled
                    ? "text-[#47554E] hover:text-[#17201B] hover:bg-[#F4F5F0]"
                    : "text-white/80 hover:text-white hover:bg-white/10",
              ].join(" ")}
              aria-current={activo(l.href) ? "page" : undefined}
            >
              {l.label}
              {/* Indicador activo */}
              {activo(l.href) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-4 rounded-full bg-[#2C5E43] opacity-60" />
              )}
            </Link>
          ))}
        </nav>

        {/* ── ACCIONES DESKTOP ── */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          {/* Badge "Agenda hoy" */}
          <Link
            href="/#eventos"
            style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.04em" }}
            className={[
              "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all uppercase border shadow-xs",
              scrolled
                ? "text-[#17201B] bg-[#F4F5F0] border-[#2C5E43]/30 hover:bg-[#2C5E43] hover:text-white"
                : "text-white bg-black/40 border-white/40 backdrop-blur-md hover:bg-white hover:text-[#2C5E43]",
            ].join(" ")}
          >
            <span className="h-2 w-2 rounded-full bg-[#52B788] animate-ping" />
            Agenda hoy
          </Link>

          {/* CTA Principal Auxilio */}
          <Link
            href="/auxilio-en-ruta"
            style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.04em" }}
            className={[
              "px-4 py-2 rounded-full uppercase transition-all duration-200 shadow-md font-bold",
              scrolled
                ? "bg-[#2C5E43] text-white hover:bg-[#1B4332]"
                : "bg-white text-[#17201B] hover:bg-[#EBF3ED] border border-white/60",
            ].join(" ")}
          >
            Auxilio en ruta
          </Link>
        </div>

        {/* ── HAMBURGER MÓVIL ── */}
        <button
          type="button"
          className={[
            "grid size-9 place-items-center rounded-xl lg:hidden transition-all",
            scrolled ? "text-[#17201B] hover:bg-[#F4F5F0]" : "text-white hover:bg-white/15",
          ].join(" ")}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto((o) => !o)}
        >
          {/* Ícono hamburger / X animado */}
          <span className="flex flex-col items-center justify-center gap-[5px] w-5">
            <span className={`h-[1.5px] w-full rounded transition-all duration-300 ${scrolled ? "bg-[#17201B]" : "bg-white"} ${abierto ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`h-[1.5px] rounded transition-all duration-200 ${scrolled ? "bg-[#17201B]" : "bg-white"} ${abierto ? "w-0 opacity-0" : "w-full"}`} />
            <span className={`h-[1.5px] w-full rounded transition-all duration-300 ${scrolled ? "bg-[#17201B]" : "bg-white"} ${abierto ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* ── MENÚ MÓVIL ── */}
      <div
        id="menu-movil"
        className={[
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          abierto ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        aria-hidden={!abierto}
      >
        <nav
          className="bg-white/95 backdrop-blur-xl border-t border-[#E8EAE3] px-5 pb-5 pt-3 space-y-0.5"
          aria-label="Menú móvil"
        >
          {[...NAV_LINKS, { href: "/municipios", label: "Municipios" }, { href: "/contacto", label: "Contacto" }].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{ fontFamily: "var(--font-body)", fontWeight: activo(l.href) ? 600 : 400 }}
              className={[
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors",
                activo(l.href)
                  ? "text-[#2C5E43] bg-[#EBF3ED]"
                  : "text-[#17201B] hover:bg-[#F4F5F0]",
              ].join(" ")}
            >
              {l.label}
              {activo(l.href) && <span className="text-[#2C5E43] text-xs">✓</span>}
            </Link>
          ))}
          <div className="pt-3 flex gap-2">
            <Link
              href="/auxilio-en-ruta"
              style={{ fontFamily: "var(--font-label)", fontWeight: 600, fontSize: "0.78rem" }}
              className="flex-1 py-2.5 rounded-xl bg-[#2C5E43] text-white text-center uppercase tracking-wide hover:bg-[#224B35] transition-all"
            >
              Auxilio en ruta
            </Link>
            <Link
              href="/#eventos"
              style={{ fontFamily: "var(--font-label)", fontWeight: 600, fontSize: "0.78rem" }}
              className="flex-1 py-2.5 rounded-xl border border-[#E8EAE3] text-[#2C5E43] text-center uppercase tracking-wide hover:bg-[#EBF3ED] transition-all"
            >
              Agenda hoy
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
