"use client";

import { useState } from "react";
import { waLink } from "@/lib/whatsapp";

const MOTIVOS = [
  "Recomendar un lugar o servicio",
  "Reportar información incorrecta",
  "Solicitar afiliación de mi negocio",
  "Convenio para un GAD municipal",
  "Otro",
];

export default function ContactoForm() {
  const [motivo, setMotivo] = useState(MOTIVOS[0]);
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [sent, setSent] = useState(false);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const texto = `Hola, soy ${nombre.trim() || "un visitante"}. Motivo: ${motivo}.\n${mensaje.trim()}\n(Enviado desde agendaturisticaloja.com)`;
    window.open(waLink(texto), "_blank", "noopener,noreferrer");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const inputClass =
    "w-full rounded-2xl border border-[#E8EAE3] bg-[#FAFAF8] px-4 py-3 text-[#17201B] text-sm placeholder:text-[#9AA49E] focus:border-[#2C5E43] focus:bg-white focus:ring-2 focus:ring-[#2C5E43]/10 outline-none transition-all duration-200";

  return (
    <form
      onSubmit={enviar}
      className="grid gap-5 rounded-3xl border border-[#E8EAE3] bg-white p-8 shadow-[0_16px_50px_-12px_rgba(13,27,18,0.12)]"
    >
      {/* Motivo */}
      <label className="grid gap-1.5">
        <span style={{ fontFamily: "var(--font-label)", fontWeight: 700 }} className="text-xs uppercase tracking-wider text-[#2C5E43]">
          Motivo
        </span>
        <select value={motivo} onChange={(e) => setMotivo(e.target.value)} className={inputClass}>
          {MOTIVOS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>

      {/* Nombre */}
      <label className="grid gap-1.5">
        <span style={{ fontFamily: "var(--font-label)", fontWeight: 700 }} className="text-xs uppercase tracking-wider text-[#2C5E43]">
          Tu nombre
        </span>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="¿Cómo te llamas?"
          autoComplete="name"
          className={inputClass}
        />
      </label>

      {/* Mensaje */}
      <label className="grid gap-1.5">
        <span style={{ fontFamily: "var(--font-label)", fontWeight: 700 }} className="text-xs uppercase tracking-wider text-[#2C5E43]">
          Tu mensaje
        </span>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          rows={5}
          placeholder="Cuéntanos con detalle..."
          className={`${inputClass} resize-none`}
        />
      </label>

      {/* Submit */}
      <button
        type="submit"
        style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
        className={`relative overflow-hidden min-h-13 rounded-full px-6 text-sm text-white transition-all duration-300 ${
          sent
            ? "bg-[#2C5E43] shadow-[0_0_20px_rgba(44,94,67,0.4)]"
            : "bg-[#25D366] hover:bg-[#1db954] shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)]"
        }`}
      >
        {sent ? "✅ Abriendo WhatsApp..." : "💬 Enviar por WhatsApp"}
      </button>

      <p style={{ fontFamily: "var(--font-body)" }} className="text-xs text-[#64746B] text-center">
        Se abrirá WhatsApp con tu mensaje listo para enviar al equipo de GuIAloja.
      </p>
    </form>
  );
}
