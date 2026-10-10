"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CANTONES } from "@/lib/data/cantones";

const DESTACADOS = [
  {
    label: "Bosque Puyango",
    desc: "Troncos fosilizados de 100M años",
    href: "/guias/bosque-petrificado-puyango-guia",
    tag: "Paleontología",
    icon: "🪵",
  },
  {
    label: "Vilcabamba",
    desc: "Valle de la Longevidad & café",
    href: "/guias/ruta-del-cafe-vilcabamba",
    tag: "Naturaleza",
    icon: "🌿",
  },
  {
    label: "Santuario El Cisne",
    desc: "Basílica neogótica & Romería",
    href: "/guias/romeria-virgen-del-cisne-loja",
    tag: "Patrimonio",
    icon: "⛪",
  },
  {
    label: "Guayacanes (Zapotillo)",
    desc: "Bosque seco & florecimiento",
    href: "/cantones/zapotillo",
    tag: "Fenómeno",
    icon: "🌼",
  },
  {
    label: "Saraguro Kichwa",
    desc: "Cultura andina & medicina viva",
    href: "/guias/saraguro-turismo-cultural-kichwa",
    tag: "Intercultural",
    icon: "🧶",
  },
  {
    label: "Catamayo Valle",
    desc: "Clima cálido & portal aéreo",
    href: "/cantones/catamayo",
    tag: "Descanso",
    icon: "☀️",
  },
];

const ITINERARIOS = [
  {
    titulo: "Vilcabamba & Cerro Mandango",
    sub: "Senderismo, café de especialidad y relajación",
    tiempo: "2 días",
    badge: "Escapada",
    prompt: "¿Qué ruta de 2 días recomiendas para Vilcabamba, café y Cerro Mandango?",
    icon: "🥾",
  },
  {
    titulo: "Guayacanes & Bosque Puyango",
    sub: "Aventura por el bosque seco y fósiles milenarios",
    tiempo: "3 días",
    badge: "Aventura",
    prompt: "Quiero visitar los Guayacanes de Zapotillo y el Bosque Petrificado de Puyango en 3 días.",
    icon: "🦎",
  },
  {
    titulo: "Saraguro Ancestral & Tradiciones",
    sub: "Gastronomía comunitaria, telares y saberes kichwa",
    tiempo: "1-2 días",
    badge: "Cultura",
    prompt: "Quiero un plan cultural en Saraguro: gastronomía, tejidos y medicina ancestral.",
    icon: "🥣",
  },
];

export default function SeccionDecision() {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalLugaresAbierto, setModalLugaresAbierto] = useState(false);
  const [dias, setDias] = useState("2-3 días");
  const [canton, setCanton] = useState("loja");
  const [estilo, setEstilo] = useState("Naturaleza y Relax");
  const [compania, setCompania] = useState("En Pareja");

  const iniciarAsesorIA = (preguntaDirecta?: string) => {
    const cantonNombre = CANTONES.find((c) => c.slug === canton)?.nombre || "Loja";
    const prompt =
      preguntaDirecta ||
      `Hola, deseo organizar un viaje para visitar ${cantonNombre} por ${dias}, estilo ${estilo}, viajando ${compania}. Por favor bríndame un itinerario con atractivos clave, distancias y opciones de hospedaje verificado.`;
    window.dispatchEvent(
      new CustomEvent("abrir-chat-turismo", {
        detail: { mensajeInicial: prompt },
      })
    );
    setModalAbierto(false);
  };

  useEffect(() => {
    if (modalAbierto || modalLugaresAbierto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalAbierto, modalLugaresAbierto]);

  const abrirLugares = () => {
    setModalLugaresAbierto(true);
    const sec = document.getElementById("seccion-decision");
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const abrirRuta = () => {
    setModalAbierto(true);
    const sec = document.getElementById("seccion-decision");
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <>
      <section className="pt-28 pb-20 bg-[#FAFAF8] text-[#17201B]" id="seccion-decision">
        <div className="mx-auto w-[min(1420px,100%-48px)]">
          <div className="max-w-2xl mb-12">
            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43] font-semibold block mb-2"
            >
              Planifica tu visita a Loja, Ecuador
            </span>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.025em" }}
              className="text-3xl sm:text-4xl text-[#17201B]"
            >
              Lugares Turísticos Más Visitados y Rutas de Loja
            </h2>
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="mt-2 text-sm sm:text-base text-[#47554E] leading-relaxed"
            >
              Desde el Bosque Petrificado de Puyango y Vilcabamba hasta el Parque Podocarpus. Explora los 16 cantones o genera un itinerario de 2 a 3 días con nuestro Asesor IA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {/* ── CARD 1: ¿QUÉ VISITAR? (Glassmorphism con imagen de fondo) ── */}
            <div className="relative rounded-[32px] overflow-hidden min-h-[480px] sm:min-h-[520px] flex flex-col justify-between p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white/20 group transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.28)]">
              {/* Imagen de fondo con zoom sutil en hover */}
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                alt="Lugares turísticos de Loja"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Overlay gradiente cinematográfico para contraste perfecto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

              {/* Top Bar Glass */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-white/95 text-[11px] font-semibold tracking-wider uppercase">
                  <span className="size-2 rounded-full bg-[#52B788] animate-pulse" />
                  Directorio 16 Cantones
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] font-medium">
                  Loja · Ecuador
                </span>
              </div>

              {/* Bottom Glass Card Container con contraste optimizado */}
              <div className="relative z-10 mt-auto">
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/75 backdrop-blur-2xl border border-white/30 shadow-2xl text-white">
                  <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-[#52B788] font-bold mb-1 drop-shadow-xs">
                        Atractivos Insignia
                      </p>
                      <h3
                        style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}
                        className="text-xl sm:text-2xl !text-white leading-tight drop-shadow-md"
                      >
                        Lugares Turísticos de Loja
                      </h3>
                      <p
                        style={{ fontFamily: "var(--font-body)", color: "#E2E8F0" }}
                        className="text-xs sm:text-sm !text-gray-200 mt-1 line-clamp-2 font-normal"
                      >
                        Bosque Puyango, Vilcabamba, Podocarpus, Guayacanes y El Cisne.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={abrirLugares}
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className="px-5 py-3 rounded-xl bg-white text-[#17201B] hover:bg-[#52B788] hover:text-white transition-all text-xs uppercase tracking-wider shrink-0 shadow-lg flex items-center justify-center gap-2 font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Ver Atractivos</span>
                      <span className="text-sm">↗</span>
                    </button>
                  </div>

                  {/* Pills de atractivos en vidrio */}
                  <div className="mt-4 pt-3.5 border-t border-white/20 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {["🪵 Puyango", "🌿 Vilcabamba", "🌲 Podocarpus", "⛪ El Cisne", "🌼 Guayacanes"].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={abrirLugares}
                        style={{ color: "#FFFFFF" }}
                        className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-[11px] font-semibold !text-white transition-all cursor-pointer shadow-2xs"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── CARD 2: ASESOR IA E ITINERARIOS (Glassmorphism con imagen de fondo) ── */}
            <div className="relative rounded-[32px] overflow-hidden min-h-[480px] sm:min-h-[520px] flex flex-col justify-between p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white/20 group transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.28)]">
              {/* Imagen de fondo con zoom sutil en hover */}
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                alt="Itinerarios y rutas en Loja"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Overlay gradiente cinematográfico para contraste perfecto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

              {/* Top Bar Glass */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold tracking-wider uppercase">
                  <span className="size-2 rounded-full bg-[#F2C14E] animate-ping" />
                  Asesor IA de Viajes
                </span>
                <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white text-[11px] font-medium">
                  Rutas 2 a 3 Días
                </span>
              </div>

              {/* Bottom Glass Card Container con contraste optimizado */}
              <div className="relative z-10 mt-auto">
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/75 backdrop-blur-2xl border border-white/30 shadow-2xl text-white">
                  <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-[#F2C14E] font-bold mb-1 drop-shadow-xs">
                        Planifica tu viaje
                      </p>
                      <h3
                        style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}
                        className="text-xl sm:text-2xl !text-white leading-tight drop-shadow-md"
                      >
                        Qué Hacer en Loja: Rutas e Itinerarios
                      </h3>
                      <p
                        style={{ fontFamily: "var(--font-body)", color: "#E2E8F0" }}
                        className="text-xs sm:text-sm !text-gray-200 mt-1 line-clamp-2 font-normal"
                      >
                        Rutas de 2 a 3 días con distancias, clima y recomendaciones en tiempo real.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={abrirRuta}
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className="px-5 py-3 rounded-xl bg-[#2C5E43] text-white hover:bg-[#3d7c5a] transition-all text-xs uppercase tracking-wider shrink-0 shadow-lg flex items-center justify-center gap-2 font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-white/20"
                    >
                      <span>Crear mi ruta</span>
                      <span className="text-sm">⚡</span>
                    </button>
                  </div>

                  {/* Atajos rápidos en vidrio para itinerarios */}
                  <div className="mt-4 pt-3.5 border-t border-white/20 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {ITINERARIOS.map((it) => (
                      <button
                        key={it.titulo}
                        type="button"
                        onClick={() => iniciarAsesorIA(it.prompt)}
                        style={{ color: "#FFFFFF" }}
                        className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-[11px] font-semibold !text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <span>{it.icon}</span>
                        <span>{it.badge} · {it.tiempo}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── CARD 3: ¿QUÉ HACER HOY? (Anclada a la sección de Eventos en Vivo) ── */}
            <div className="relative rounded-[32px] overflow-hidden min-h-[480px] sm:min-h-[520px] flex flex-col justify-between p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-white/20 group transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.28)] md:col-span-2 lg:col-span-1">
              {/* Imagen de fondo con zoom sutil en hover */}
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80"
                alt="Qué hacer hoy en Loja - Eventos y cultura"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Overlay gradiente cinematográfico para contraste perfecto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />

              {/* Top Bar Glass */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/25 text-white text-[11px] font-semibold tracking-wider uppercase">
                  <span className="size-2 rounded-full bg-[#E63946] animate-ping" />
                  Cartelera en Vivo
                </span>
                <span className="px-3 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/30 text-white text-[11px] font-medium">
                  16 Cantones
                </span>
              </div>

              {/* Bottom Glass Card Container con contraste optimizado */}
              <div className="relative z-10 mt-auto">
                <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/75 backdrop-blur-2xl border border-white/30 shadow-2xl text-white">
                  <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-widest text-[#7ECB9A] font-bold mb-1 drop-shadow-xs">
                        Agenda Cultural & Festividades
                      </p>
                      <h3
                        style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF" }}
                        className="text-xl sm:text-2xl !text-white leading-tight drop-shadow-md"
                      >
                        ¿Qué hacer hoy en Loja?
                      </h3>
                      <p
                        style={{ fontFamily: "var(--font-body)", color: "#E2E8F0" }}
                        className="text-xs sm:text-sm !text-gray-200 mt-1 line-clamp-2 font-normal"
                      >
                        Eventos del día, festivales cantonales, ferias y conciertos de fin de semana.
                      </p>
                    </div>

                    <Link
                      href="#eventos"
                      style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                      className="px-5 py-3 rounded-xl bg-[#52B788] text-white hover:bg-[#3d966c] transition-all text-xs uppercase tracking-wider shrink-0 shadow-lg flex items-center justify-center gap-2 font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-white/20 text-center"
                    >
                      <span>Ver Agenda Hoy</span>
                      <span className="text-sm">↓</span>
                    </Link>
                  </div>

                  {/* Acceso directo a cantones en eventos */}
                  <div className="mt-4 pt-3.5 border-t border-white/20 flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {[
                      { nombre: "Loja & Vilca", anchor: "#eventos" },
                      { nombre: "Saraguro", anchor: "#eventos" },
                      { nombre: "Catamayo", anchor: "#eventos" },
                      { nombre: "Zapotillo", anchor: "#eventos" },
                    ].map((item) => (
                      <Link
                        key={item.nombre}
                        href={item.anchor}
                        style={{ color: "#FFFFFF" }}
                        className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/30 text-[11px] font-semibold !text-white transition-all cursor-pointer shadow-2xs"
                      >
                        📍 {item.nombre}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL PLANIFICADOR */}
      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E8EAE3] max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setModalAbierto(false)}
              className="absolute top-5 right-5 size-8 rounded-full bg-[#FAFAF8] hover:bg-[#EEF0EA] text-[#64746B] flex items-center justify-center transition-colors"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <span
              style={{ fontFamily: "var(--font-label)", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.1em" }}
              className="uppercase text-[#2C5E43] block mb-1"
            >
              Planificador de viaje
            </span>
            <h4
              style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              className="text-2xl text-[#17201B]"
            >
              Arma tu ruta con el Asesor IA
            </h4>
            <p
              style={{ fontFamily: "var(--font-body)" }}
              className="text-xs text-[#64746B] mt-1"
            >
              Personaliza tu recorrido y recibe recomendaciones inmediatas.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                iniciarAsesorIA();
              }}
              className="space-y-4 text-xs mt-6"
            >
              <div>
                <label className="block text-[#17201B] font-medium mb-1.5">
                  Cantón o zona de preferencia
                </label>
                <select
                  value={canton}
                  onChange={(e) => setCanton(e.target.value)}
                  className="w-full rounded-xl border border-[#E8EAE3] p-2.5 bg-[#FAFAF8] text-[#17201B] text-xs focus:outline-none focus:border-[#2C5E43]"
                >
                  <option value="toda-la-provincia">Toda la Provincia de Loja</option>
                  {CANTONES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.nombre} (Cabecera: {c.cabecera})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#17201B] font-medium mb-1.5">
                  Días disponibles
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["1 día", "2-3 días", "4+ días"].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setDias(t)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        dias === t
                          ? "bg-[#2C5E43] text-white font-semibold border-[#2C5E43]"
                          : "bg-[#FAFAF8] text-[#64746B] border-[#E8EAE3] hover:border-[#64746B]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#17201B] font-medium mb-1.5">
                  Estilo de viaje
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Naturaleza y Relax", "Aventura y Senderos", "Cultura y Pueblos", "Gastronomía y Café"].map((e) => (
                    <button
                      type="button"
                      key={e}
                      onClick={() => setEstilo(e)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        estilo === e
                          ? "bg-[#2C5E43] text-white font-semibold border-[#2C5E43]"
                          : "bg-[#FAFAF8] text-[#64746B] border-[#E8EAE3] hover:border-[#64746B]"
                      }`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#17201B] font-medium mb-1.5">
                  Compañía
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Solo", "En Pareja", "Familia"].map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setCompania(c)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        compania === c
                          ? "bg-[#2C5E43] text-white font-semibold border-[#2C5E43]"
                          : "bg-[#FAFAF8] text-[#64746B] border-[#E8EAE3] hover:border-[#64746B]"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setModalAbierto(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-[#E8EAE3] text-[#64746B] hover:bg-[#FAFAF8] font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-[#2C5E43] text-white font-semibold hover:bg-[#224B35] transition-all shadow-xs"
                >
                  Generar ruta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL POPUP: QUÉ VISITAR EN LOJA Y SUS CANTONES ── */}
      {modalLugaresAbierto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setModalLugaresAbierto(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E8EAE3] relative max-h-[90vh] flex flex-col"
          >
            {/* Cabecera del popup */}
            <div className="flex items-start justify-between pb-4 border-b border-[#EEF0EA]">
              <div>
                <span
                  style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "0.72rem", letterSpacing: "0.1em" }}
                  className="uppercase text-[#2C5E43] block mb-1"
                >
                  Directorio de Destinos
                </span>
                <h3
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                  className="text-xl sm:text-2xl text-[#17201B]"
                >
                  ¿Qué visitar en Loja y sus cantones?
                </h3>
                <p style={{ fontFamily: "var(--font-body)" }} className="text-xs text-[#64746B] mt-1">
                  Selecciona cualquier lugar o atractivo para acceder a su guía cantonal completa.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalLugaresAbierto(false)}
                className="size-9 rounded-full bg-[#FAFAF8] hover:bg-[#EEF0EA] text-[#17201B] flex items-center justify-center text-lg transition-colors shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Lista scrolleable de atractivos */}
            <div className="overflow-y-auto py-5 space-y-3 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DESTACADOS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setModalLugaresAbierto(false)}
                    className="group p-3.5 rounded-2xl border border-[#EEF0EA] bg-[#FAFAF8] hover:bg-white hover:border-[#2C5E43] hover:shadow-md transition-all flex items-center gap-3"
                  >
                    <div className="size-11 rounded-xl bg-white border border-[#E8EAE3] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p
                          style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
                          className="text-xs sm:text-sm text-[#17201B] truncate group-hover:text-[#2C5E43] transition-colors"
                        >
                          {item.label}
                        </p>
                        <span className="text-[9px] uppercase font-bold text-[#2C5E43] bg-[#EBF3ED] px-2 py-0.5 rounded-full shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <p
                        style={{ fontFamily: "var(--font-body)" }}
                        className="text-[11px] text-[#78887F] truncate mt-0.5"
                      >
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Acceso a todos los 16 cantones */}
              <div className="mt-4 pt-4 border-t border-[#EEF0EA] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAFAF8] p-4 rounded-2xl">
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontWeight: 600 }} className="text-xs text-[#17201B]">
                    ¿Quieres explorar por cantón específico?
                  </p>
                  <p className="text-[11px] text-[#78887F]">
                    Los 16 cantones de la provincia de Loja con mapas e historia.
                  </p>
                </div>
                <Link
                  href="/cantones"
                  onClick={() => setModalLugaresAbierto(false)}
                  style={{ fontFamily: "var(--font-label)", fontWeight: 600 }}
                  className="px-4 py-2 rounded-full bg-[#17201B] text-white text-xs hover:bg-[#2C5E43] transition-all shrink-0"
                >
                  Ver 16 Cantones →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
