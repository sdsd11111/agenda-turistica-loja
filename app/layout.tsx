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
    default: "Qué Hacer en Loja: 16 Cantones, Lugares Turísticos y Agenda 2026 | Descubre Loja",
    template: "%s | Descubre Loja",
  },
  description:
    "Guía oficial de turismo de la provincia de Loja, Ecuador. Descubre qué hacer en Vilcabamba, los Guayacanes de Zapotillo, Bosque de Puyango, lugares turísticos de los 16 cantones y agenda de eventos 2026.",
  keywords: [
    "que hacer en loja",
    "lugares turisticos de loja",
    "turismo loja ecuador",
    "vilcabamba loja",
    "guayacanes zapotillo",
    "bosque petrificado puyango",
    "agenda turistica loja",
    "eventos loja hoy",
  ],
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