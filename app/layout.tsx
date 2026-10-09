import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";
import { ChatbotTurismo } from "@/components/ChatbotTurismo";

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
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: SITE.url,
    siteName: SITE.nombre,
    title: "Lugares Turísticos y Qué Hacer en Loja: 16 Cantones y Agenda 2026",
    description: "Guía oficial de turismo de la provincia de Loja, Ecuador. Bosque de Puyango, Vilcabamba, Podocarpus, hoteles y agenda 2026.",
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
        <Nav />
        <main>{children}</main>
        <Footer />
        <ChatbotTurismo />
      </body>
    </html>
  );
}