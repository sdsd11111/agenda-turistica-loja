import { waLink } from "@/lib/whatsapp";

type Props = {
  mensaje: string;
  children: React.ReactNode;
  variante?: "wa" | "gold" | "forest" | "ghost";
  className?: string;
};

const ESTILOS = {
  wa: "bg-wa text-white hover:bg-[#178246]",
  gold: "bg-gold text-[#1b1405] hover:bg-[#ffd36b] shadow-[0_10px_24px_-8px_rgba(242,193,78,.6)]",
  forest: "bg-forest text-white hover:bg-leaf",
  ghost: "border border-white/60 text-white bg-white/10 hover:bg-white/20",
} as const;

export default function WhatsAppButton({ mensaje, children, variante = "wa", className = "" }: Props) {
  return (
    <a
      href={waLink(mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[.95rem] font-semibold transition-colors ${ESTILOS[variante]} ${className}`}
    >
      {children}
    </a>
  );
}
