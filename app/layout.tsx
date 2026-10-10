import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { SiteChrome } from "@/components/SiteChrome";


/** Títulos principales — geométrica elegante, impactante en bold */
const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/** Cuerpo de texto — óptica perfecta para lectura larga, aire limpio */
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

/** Números, métricas, etiquetas — numerales distintivos y compactos */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Lugares Turísticos y Qué Hacer en Loja: 16 Cantones y Agenda 2026",
    template: "%s | Agenda Turística Loja",
  },
  description:
    "Guía oficial de turismo de la provincia de Loja, Ecuador. Descubre qué hacer en Loja, Bosque Petrificado de Puyango, Vilcabamba, Parque Podocarpus, hoteles directos y eventos de los 16 cantones.",
  keywords: [
    "lugares turisticos de loja",
    "que hacer en loja",
    "turismo loja ecuador",
    "bosque petrificado puyango",
    "vilcabamba loja",
    "hoteles en loja",
    "hoteles en vilcabamba",
    "guayacanes zapotillo",
    "virgen del cisne",
    "agenda turistica loja",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: SITE.url,
    siteName: SITE.nombre,
    title: "Lugares Turísticos y Qué Hacer en Loja: 16 Cantones y Agenda 2026",
    description: "Guía oficial de turismo de la provincia de Loja, Ecuador. Bosque de Puyango, Vilcabamba, Podocarpus, hoteles y agenda 2026.",
    images: [
      {
        url: "/logo-horizontal-1200x375.png",
        width: 1200,
        height: 375,
        alt: "Agenda Turística Loja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lugares Turísticos y Qué Hacer en Loja: 16 Cantones y Agenda 2026",
    description: "Guía oficial de turismo de la provincia de Loja, Ecuador. 16 cantones, naturaleza, hoteles y agenda en vivo.",
    images: ["/logo-horizontal-1200x375.png"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="es" className={`${sora.variable} ${dmSans.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#FAFAF8] text-[#17201B] antialiased selection:bg-[#2C5E43] selection:text-white">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}