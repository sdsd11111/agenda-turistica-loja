import { SITE } from "./site";

/** Enlace de WhatsApp con mensaje prellenado. Si no hay número, WhatsApp deja elegir contacto. */
export function waLink(texto: string, numero: string = SITE.whatsapp): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}

export function mensajeConsulta(nombre: string): string {
  return `Hola, vi "${nombre}" en agendaturisticaloja.com y quisiera más información.`;
}
