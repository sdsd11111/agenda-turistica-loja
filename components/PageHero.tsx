export default function PageHero({
  title,
  lead,
  badge = "Agenda Turística Loja · Ecuador",
  children,
  imagen = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
}: {
  title: string;
  lead?: string;
  badge?: string;
  children?: React.ReactNode;
  imagen?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-center pt-32 pb-16 text-white">
      {/* Imagen fotográfica de fondo */}
      <img
        src={imagen}
        alt={title}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />

      {/* Overlay cinematográfico equilibrado: imagen visible pero texto con máximo contraste */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/55 to-black/30"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0a130d]/90 via-transparent to-black/30"
      />

      <div className="mx-auto w-[min(1180px,100%-40px)] relative z-10">
        {/* Badge en vidrio */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase mb-4 shadow-lg">
          <span className="size-2 rounded-full bg-[#52B788] animate-pulse" />
          <span style={{ fontFamily: "var(--font-label)" }}>{badge}</span>
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
