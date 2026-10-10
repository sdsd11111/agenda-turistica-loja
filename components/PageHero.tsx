import Link from "next/link";

export default function PageHero({
  title,
  lead,
  badge = "Agenda Turística Loja · Ecuador",
  children,
  imagen = "https://mvps.b-cdn.net/agenda-turistica/cantones/hero-cantones.webp",
  backLink,
}: {
  title: string;
  lead?: string;
  badge?: string;
  children?: React.ReactNode;
  imagen?: string;
  backLink?: { href: string; label: string };
}) {
  return (
    <section className="relative isolate overflow-hidden min-h-[440px] sm:min-h-[480px] flex flex-col justify-center pt-36 pb-20 text-white">
      {/* Imagen fotográfica de fondo */}
      <img
        src={imagen}
        alt={title}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Overlay cinematográfico equilibrado: imagen visible pero texto con máximo contraste */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/35"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0a130d]/90 via-transparent to-black/40"
      />

      <div className="mx-auto w-[min(1420px,100%-48px)] relative z-10">
        {/* Fila superior: Flecha retroceder + Badge en vidrio */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {backLink && (
            <Link
              href={backLink.href}
              style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/25 text-white text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-x-1 shadow-lg group"
            >
              <svg
                className="size-3.5 transition-transform duration-200 group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>{backLink.label}</span>
            </Link>
          )}

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase shadow-lg">
            <span className="size-2 rounded-full bg-[#52B788] animate-pulse" />
            <span style={{ fontFamily: "var(--font-label)" }}>{badge}</span>
          </div>
        </div>

        {/* Título principal en blanco radiante con Text Shadow */}
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.85), 0 4px 20px rgba(0,0,0,0.6)",
          }}
          className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08]"
        >
          {title}
        </h1>

        {/* Descripción en blanco / crema tenue con sombra */}
        {lead && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "#F4F5F0",
              textShadow: "0 1px 6px rgba(0, 0, 0, 0.9)",
            }}
            className="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed font-medium"
          >
            {lead}
          </p>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
}
