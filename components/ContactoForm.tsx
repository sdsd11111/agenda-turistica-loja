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

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const texto = `Hola, soy ${nombre.trim() || "un visitante"}. Motivo: ${motivo}.\n${mensaje.trim()}\n(Enviado desde agendaturisticaloja.com)`;
    window.open(waLink(texto), "_blank", "noopener,noreferrer");
  }

  const campo = "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base focus:border-forest";

  return (
    <form onSubmit={enviar} className="grid gap-4 rounded-[24px] border border-ink/10 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(13,27,18,.25)]">
      <label className="grid gap-1.5 text-sm font-medium">
        Motivo
        <select value={motivo} onChange={(e) => setMotivo(e.target.value)} className={campo}>
          {MOTIVOS.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Tu nombre
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" className={campo} />
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Tu mensaje
        <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} required rows={5} className={campo} />
      </label>
      <button type="submit" className="min-h-12 rounded-full bg-wa px-6 font-semibold text-white hover:bg-[#178246]">
        💬 Enviar por WhatsApp
      </button>
      <p className="text-sm text-ink/60">Se abrirá WhatsApp con tu mensaje listo para enviar al equipo de GuIAloja.</p>
    </form>
  );
}
