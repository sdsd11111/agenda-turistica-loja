import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";
import { ChatbotTurismo } from "@/components/ChatbotTurismo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Descubre Loja | Turismo en la provincia de Loja, Ecuador",
    template: "%s | Descubre Loja",
  },
  description: SITE.descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "agendaturisticaloja.com",
    locale: "es_EC",
    title: "Descubre Loja | Turismo en la provincia de Loja, Ecuador",
    description: "16 cantones. Naturaleza, cultura, gastronomia y el Valle de la Longevidad. Directorio verificado GuIAloja.",
    url: SITE.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1B4332",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TouristInformationCenter",
  name: "Descubre Loja - agendaturisticaloja.com",
  url: SITE.url,
  description: "Directorio turistico verificado de la provincia de Loja, Ecuador.",
  areaServed: { "@type": "AdministrativeArea", name: "Provincia de Loja, Ecuador" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Nav />
        <main>{children}</main>
        <Footer />
        <ChatbotTurismo />
      </body>
    </html>
  );
}