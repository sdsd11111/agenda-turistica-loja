"use client";

import { useEffect, useState } from "react";

// Posiciones de cada cantón dentro del viewBox 620×620,
// calibradas con base en la silueta real (imagen oficial).
const CANTONES = [
  // Noreste (cañón de Saraguro — la "caña" de la bota)
  { id: "saraguro",     nombre: "Saraguro",     cx: 430, cy: 68,  capital: false },
  { id: "olmedo",       nombre: "Olmedo",        cx: 432, cy: 172, capital: false },
  // Centro-norte
  { id: "chaguarpamba", nombre: "Chaguarpamba", cx: 355, cy: 182, capital: false },
  { id: "catamayo",     nombre: "Catamayo",     cx: 435, cy: 238, capital: false },
  // Capital provincial
  { id: "loja",         nombre: "Loja",         cx: 465, cy: 316, capital: true  },
  // Franja occidental
  { id: "paltas",       nombre: "Paltas",       cx: 268, cy: 258, capital: false },
  { id: "puyango",      nombre: "Puyango",      cx: 154, cy: 244, capital: false },
  { id: "pindal",       nombre: "Pindal",       cx: 158, cy: 300, capital: false },
  { id: "celica",       nombre: "Celica",       cx: 194, cy: 344, capital: false },
  // Extremo oeste (punta de Zapotillo)
  { id: "zapotillo",    nombre: "Zapotillo",    cx: 72,  cy: 342, capital: false },
  // Centro-sur
  { id: "sozoranga",    nombre: "Sozoranga",    cx: 338, cy: 382, capital: false },
  { id: "gonzanama",    nombre: "Gonzanamá",    cx: 420, cy: 384, capital: false },
  { id: "macara",       nombre: "Macará",       cx: 256, cy: 418, capital: false },
  { id: "calvas",       nombre: "Calvas",       cx: 400, cy: 452, capital: false },
  { id: "quilanga",     nombre: "Quilanga",     cx: 464, cy: 416, capital: false },
  // Extremo sur (punta de Espíndola)
  { id: "espindola",    nombre: "Espíndola",    cx: 394, cy: 540, capital: false },
];

export default function PreloaderLoja() {
  const [progreso, setProgreso] = useState(0);
  const [visible, setVisible]   = useState(true);
  const [fading,  setFading]    = useState(false);

  useEffect(() => {
    const yaVisto  = sessionStorage.getItem("atl_preloader_seen");
    const duracion = yaVisto ? 900 : 2800;

    const inicio = Date.now();
    const iv = setInterval(() => {
      const t   = Date.now() - inicio;
      const val = Math.min(100, Math.round((t / duracion) * 100));
      setProgreso(val);

      if (val >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setVisible(false);
            sessionStorage.setItem("atl_preloader_seen", "true");
          }, 700);
        }, 380);
      }
    }, 20);

    return () => clearInterval(iv);
  }, []);

  if (!visible) return null;

  const W = 620;
  const H = 620;
  const revealX         = (progreso / 100) * W;
  const cantonesMostr   = Math.floor((progreso / 100) * CANTONES.length);

  return (
    <div
      aria-label="Cargando Descubre Loja"
      className={[
        "fixed inset-0 z-[100] flex flex-col items-center justify-center",
        "bg-[#FAFAF8] select-none transition-opacity duration-700 ease-out",
        fading ? "opacity-0 pointer-events-none" : "opacity-100",
      ].join(" ")}
    >
      {/* ─── MAPA ─── */}
      <div className="w-[min(560px,90vw)] aspect-square">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-full drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/*
              Filtro de inversión: convierte el JPG (fondo blanco, provincia negra)
              en (fondo negro, provincia blanca) para que el <mask> funcione
              correctamente (blanco = opaco, negro = transparente).
            */}
            <filter
              id="loja-invert"
              colorInterpolationFilters="sRGB"
              x="0" y="0" width="100%" height="100%"
            >
              <feColorMatrix
                type="matrix"
                values="-1 0 0 0 1   0 -1 0 0 1   0 0 -1 0 1   0 0 0 1 0"
              />
            </filter>

            {/* Máscara basada en la silueta REAL (la imagen oficial del proyecto) */}
            <mask id="loja-shape" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <image
                href="/loja-silhouette.jpg"
                x="0" y="0"
                width={W} height={H}
                preserveAspectRatio="xMidYMid meet"
                filter="url(#loja-invert)"
              />
            </mask>

            {/* ClipPath para el efecto de relleno progresivo izquierda → derecha */}
            <clipPath id="loja-reveal" clipPathUnits="userSpaceOnUse">
              <rect x="0" y="0" width={revealX} height={H} />
            </clipPath>

            {/* Degradado de relleno: base sage + halo de luz al centro */}
            <radialGradient id="fill-grad" cx="55%" cy="55%" r="55%">
              <stop offset="0%"   stopColor="#5A9E78" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#2C5E43" stopOpacity="0.85" />
            </radialGradient>
          </defs>

          {/* 1. Tinte de base: verde muy claro (siempre visible dentro de la forma) */}
          <rect
            x="0" y="0" width={W} height={H}
            fill="#EBF3ED"
            mask="url(#loja-shape)"
          />

          {/* 2. Relleno progresivo (sweeps de izquierda a derecha) */}
          <rect
            x="0" y="0" width={W} height={H}
            fill="url(#fill-grad)"
            mask="url(#loja-shape)"
            clipPath="url(#loja-reveal)"
          />

          {/* 3. Cuadrícula topográfica sutil (sólo dentro de la forma) */}
          <g mask="url(#loja-shape)" stroke="#2C5E43" strokeWidth="0.6" opacity="0.10">
            {[90, 155, 220, 285, 350, 415, 480, 545].map(x => (
              <line key={`gx${x}`} x1={x} y1="0"  x2={x} y2={H} />
            ))}
            {[90, 155, 220, 285, 350, 415, 480, 545].map(y => (
              <line key={`gy${y}`} x1="0" y1={y} x2={W} y2={y} />
            ))}
          </g>

          {/* 4. Borde de la silueta (imagen a muy baja opacidad para dar el trazo) */}
          <image
            href="/loja-silhouette.jpg"
            x="0" y="0"
            width={W} height={H}
            preserveAspectRatio="xMidYMid meet"
            opacity="0.07"
          />

          {/* 5. Puntos de cantones (aparecen secuencialmente) */}
          {CANTONES.slice(0, cantonesMostr).map((c) => (
            <g key={c.id}>
              {/* halo */}
              <circle
                cx={c.cx} cy={c.cy}
                r={c.capital ? 11 : 7}
                fill="#2C5E43" opacity="0.18"
              />
              {/* punto */}
              <circle
                cx={c.cx} cy={c.cy}
                r={c.capital ? 4.5 : 3}
                fill={c.capital ? "#D4A373" : "#2C5E43"}
              />
              {/* etiqueta — aparece recién en la segunda mitad del progreso */}
              {progreso > 38 && (
                <text
                  x={c.cx}
                  y={c.cy - 11}
                  textAnchor="middle"
                  fill="#17201B"
                  fontSize={c.capital ? "11" : "8.5"}
                  fontWeight={c.capital ? "700" : "600"}
                  fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
                  letterSpacing="0.01em"
                >
                  {c.nombre}
                </text>
              )}
            </g>
          ))}

          {/* 6. Coordenadas (esquina inferior derecha) */}
          <text
            x={W - 8} y={H - 8}
            textAnchor="end"
            fill="#94A39A"
            fontSize="8"
            fontFamily="monospace"
          >
            04°S 79°W — Loja, Ecuador
          </text>
        </svg>
      </div>

      {/* ─── IDENTIDAD + PROGRESO ─── */}
      <div className="mt-5 flex flex-col items-center text-center">
        <span
          className="font-mono text-[10px] tracking-[0.28em] text-[#64746B] uppercase font-semibold"
          aria-hidden
        >
          Provincia de Loja · Ecuador
        </span>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#17201B]">
          Descubre Loja
        </h2>
        <p className="mt-0.5 text-[12px] text-[#64746B]">
          {cantonesMostr} de {CANTONES.length} cantones cargados
        </p>

        {/* Barra de progreso */}
        <div className="mt-4 w-48 h-[2px] bg-[#E8EAE3] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#2C5E43] rounded-full"
            style={{ width: `${progreso}%`, transition: "width 0.05s linear" }}
          />
        </div>
        <p className="mt-1.5 font-mono text-[10px] text-[#94A39A]">{progreso}%</p>
      </div>
    </div>
  );
}
