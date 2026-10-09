"use client";

import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from "react";

const API_URL =
  (process.env.NEXT_PUBLIC_CHAT_API_URL as string | undefined) ??
  "https://agendacultural.loja.ec/api/chat";

const ORIGEN = "agendaturisticaloja";
const SESSION_KEY = "turismo_chat_session";
const HISTORY_KEY = "turismo_chat_history";
const WELCOME = "¡Hola! 🌿 Soy tu guía turístico de la provincia de Loja. Pregúntame sobre cantones, rutas de naturaleza, atractivos, hospedaje o cómo llegar.";
const SUGERENCIAS = [
  "🌲 ¿Qué hacer en Vilcabamba?",
  "🌊 Rutas de naturaleza en Loja",
  "🛖 Cantones con turismo en Loja",
  "🏨 ¿Dónde hospedarse en Loja?",
];

interface AliadoCard {
  id: number;
  nombre: string;
  ubicacion: string;
  rangoPrecio?: string | null;
  telefono?: string | null;
  imagenUrl?: string | null;
}

interface AtractivoCard {
  id: number;
  nombre: string;
  canton: string;
  descripcion: string;
  distancia: string;
  ruta: string;
  imagenUrl?: string | null;
  mapaUrl?: string | null;
}

interface Msg {
  id: string;
  role: "user" | "bot";
  text: string;
  aliados?: AliadoCard[];
  atractivos?: AtractivoCard[];
  time: string;
}

export function ChatbotTurismo() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "w0", role: "bot", text: WELCOME, time: "Ahora" },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [btnVisible, setBtnVisible] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = `atl_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      localStorage.setItem(SESSION_KEY, sid);
    }
    setSessionId(sid);
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        const parsed: Msg[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) setMsgs(parsed);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  useEffect(() => {
    let last = window.scrollY;
    const handler = () => {
      const y = window.scrollY;
      const near = y + window.innerHeight >= document.documentElement.scrollHeight - 120;
      setBtnVisible(!(near && y > last));
      last = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handleOpenChat = (e: Event) => {
      setOpen(true);
      const customEvent = e as CustomEvent<{ mensajeInicial?: string }>;
      if (customEvent.detail?.mensajeInicial) {
        setTimeout(() => {
          send(customEvent.detail.mensajeInicial);
        }, 300);
      }
    };
    window.addEventListener("abrir-chat-turismo", handleOpenChat);
    return () => window.removeEventListener("abrir-chat-turismo", handleOpenChat);
  }, [msgs, sessionId]);

  const reiniciar = () => {
    localStorage.removeItem(HISTORY_KEY);
    const sid = `atl_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(SESSION_KEY, sid);
    setSessionId(sid);
    setMsgs([{ id: `w-${Date.now()}`, role: "bot", text: WELCOME, time: "Ahora" }]);
  };

  async function send(text?: string) {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    const timeStr = new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" });
    const userMsg: Msg = { id: `u-${Date.now()}`, role: "user", text: q, time: timeStr };
    setMsgs((prev) => [...prev, userMsg]);
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setBusy(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origen: ORIGEN,
          sessionId,
          messages: [...msgs, userMsg].map((m) => ({
            sender: m.role === "user" ? "user" : "bot",
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      const texto: string = data.texto || "No pude responder ahora.";
      const botId = `b-${Date.now()}`;
      const botBase: Msg = {
        id: botId, role: "bot", text: "",
        aliados: data.aliados || [],
        atractivos: data.atractivos || [],
        time: new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" }),
      };
      setMsgs((prev) => [...prev, botBase]);
      let i = 0;
      await new Promise<void>((resolve) => {
        const iv = setInterval(() => {
          i = Math.min(texto.length, i + 3);
          setMsgs((prev) => prev.map((m) => m.id === botId ? { ...m, text: texto.slice(0, i) } : m));
          if (i >= texto.length) {
            clearInterval(iv);
            setMsgs((prev) => {
              const final = prev.map((m) => m.id === botId ? { ...m, text: texto } : m);
              localStorage.setItem(HISTORY_KEY, JSON.stringify(final.slice(-20)));
              return final;
            });
            resolve();
          }
        }, 18);
      });
    } catch {
      setMsgs((prev) => [
        ...prev,
        { id: `err-${Date.now()}`, role: "bot", text: "No pude conectarme. Intenta de nuevo.", time: new Date().toLocaleTimeString("es-EC", { hour: "2-digit", minute: "2-digit" }) },
      ]);
    } finally {
      setBusy(false);
    }
  }

  const hayConversacion = msgs.some((m) => m.role === "user");

  return (
    <>
      {/* ─── BOTÓN FLOTANTE ─── */}
      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 transition-all duration-300 ${!btnVisible && !open ? "translate-y-24 opacity-0 pointer-events-none" : ""}`}>
        {!open && (
          <div
            style={{ fontFamily: "var(--font-body)" }}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md text-[#17201B] text-[11px] font-semibold px-4 py-2 rounded-2xl border border-[#E8EAE3] shadow-md animate-bounce"
          >
            <span className="h-2 w-2 rounded-full bg-[#2C5E43] animate-ping" />
            <span>¿Qué descubrir en Loja hoy?</span>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Abrir guía turística IA"
          style={{ fontFamily: "var(--font-display)" }}
          className="flex items-center gap-2 px-5 py-3 bg-[#2C5E43] hover:bg-[#224B35] text-white font-bold rounded-2xl shadow-lg shadow-[#2C5E43]/25 hover:scale-105 active:scale-95 transition-all border border-[#224B35]/30"
        >
          {open ? <span className="text-xl px-1">×</span> : (
            <>
              <span className="text-lg">🌿</span>
              <span className="text-xs font-bold tracking-wide uppercase">Descubre Loja</span>
            </>
          )}
        </button>
      </div>

      {/* ─── PANEL DEL CHAT ─── */}
      {open && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl shadow-[#2C5E43]/10 border border-[#E8EAE3] flex flex-col overflow-hidden">
          
          {/* Header — gradiente sage */}
          <div className="bg-gradient-to-r from-[#2C5E43] to-[#3A7A58] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-2xl bg-white/15 flex items-center justify-center text-xl border border-white/20">🌿</div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-[#D4A373] border-2 border-[#2C5E43] rounded-full" />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)" }} className="font-extrabold text-sm tracking-wide">Guía Turística de Loja</h3>
                <p style={{ fontFamily: "var(--font-body)" }} className="text-[11px] text-white/75">Naturaleza, cantones &amp; hospedaje</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={reiniciar} title="Nuevo chat" className="text-white/75 hover:text-white p-1.5 rounded-xl hover:bg-white/15 text-xs flex items-center gap-1 transition-all">
                <span>🔄</span><span className="hidden sm:inline text-[11px]">Nuevo chat</span>
              </button>
              <button onClick={() => setOpen(false)} className="text-white/75 hover:text-white p-1.5 rounded-xl hover:bg-white/15 font-bold transition-all">×</button>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAF8]">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  <span className="mr-2 mt-1 h-7 w-7 rounded-full bg-[#2C5E43] flex items-center justify-center text-sm shrink-0">🌿</span>
                )}
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#2C5E43] text-white rounded-br-sm"
                    : "bg-white border border-[#E8EAE3] text-[#17201B] rounded-bl-sm shadow-sm"
                }`}>
                  {m.text}

                  {/* Cards de atractivos */}
                  {m.role === "bot" && m.atractivos && m.atractivos.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {m.atractivos.slice(0, 4).map((at) => (
                        <div key={at.id} className="bg-[#EBF3ED] border border-[#2C5E43]/15 rounded-xl overflow-hidden text-[10px]">
                          {at.imagenUrl && <img src={at.imagenUrl} alt={at.nombre} className="w-full h-16 object-cover" />}
                          <div className="p-2">
                            <p style={{ fontFamily: "var(--font-display)" }} className="font-bold text-[#2C5E43] truncate">{at.nombre}</p>
                            <p style={{ fontFamily: "var(--font-body)" }} className="text-[#64746B] truncate">{at.canton}</p>
                            <p className="text-[#2C5E43] mt-0.5">{at.distancia}</p>
                            {at.mapaUrl && (
                              <a href={at.mapaUrl} target="_blank" rel="noopener noreferrer"
                                className="mt-1.5 w-full py-1 bg-[#2C5E43] text-white font-bold rounded-lg flex items-center justify-center gap-1 text-[9px]">
                                🗺️ Ver mapa
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Cards de aliados / hospedaje */}
                  {m.role === "bot" && m.aliados && m.aliados.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {m.aliados.slice(0, 2).map((a) => (
                        <div key={a.id} className="bg-[#EBF3ED] border border-[#2C5E43]/15 rounded-xl overflow-hidden text-[10px]">
                          {a.imagenUrl && <img src={a.imagenUrl} alt={a.nombre} className="w-full h-16 object-cover" />}
                          <div className="p-2">
                            <p style={{ fontFamily: "var(--font-display)" }} className="font-bold text-[#2C5E43] truncate">{a.nombre}</p>
                            <p style={{ fontFamily: "var(--font-body)" }} className="text-[#64746B] truncate">{a.ubicacion}</p>
                            {a.rangoPrecio && <p className="text-[#2C5E43] font-semibold mt-0.5">{a.rangoPrecio}</p>}
                            {a.telefono && (
                              <a href={`https://wa.me/${a.telefono.replace(/\D/g,"")}?text=Hola, vengo de AgendaTuristicaLoja.com y quisiera informacion de ${a.nombre}`}
                                target="_blank" rel="noopener noreferrer"
                                className="mt-1.5 w-full py-1 bg-[#2C5E43] text-white font-bold rounded-lg flex items-center justify-center gap-1 text-[9px]">
                                📲 WhatsApp
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Indicador de escritura */}
            {busy && (
              <div className="flex justify-start">
                <span className="mr-2 h-7 w-7 rounded-full bg-[#2C5E43] flex items-center justify-center text-sm">🌿</span>
                <div className="bg-white border border-[#E8EAE3] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 shadow-sm">
                  {[0, 1, 2].map((i) => <span key={i} className="h-2 w-2 rounded-full bg-[#2C5E43] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            )}

            {/* Sugerencias iniciales */}
            {!hayConversacion && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGERENCIAS.map((s) => (
                  <button key={s} onClick={() => send(s)}
                    style={{ fontFamily: "var(--font-body)" }}
                    className="px-3 py-1.5 text-[11px] rounded-full border border-[#2C5E43]/25 text-[#2C5E43] bg-[#EBF3ED] hover:bg-[#D6EAD8] transition-all font-medium">
                    {s}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#E8EAE3] bg-white">
            <form className="flex gap-2 items-end" onSubmit={(e: FormEvent) => { e.preventDefault(); send(); }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); e.target.style.height = "auto"; e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`; }}
                onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="¿Qué quieres descubrir en Loja?"
                maxLength={500}
                rows={1}
                style={{ fontFamily: "var(--font-body)" }}
                className="flex-1 resize-none rounded-xl border border-[#E8EAE3] px-3 py-2.5 text-sm focus:outline-none focus:border-[#2C5E43] placeholder:text-[#94A39A] text-[#17201B]"
              />
              <button type="submit" disabled={busy || !input.trim()}
                className="h-10 w-10 rounded-xl bg-[#2C5E43] hover:bg-[#224B35] text-white flex items-center justify-center text-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0">
                ↑
              </button>
            </form>
            <p style={{ fontFamily: "var(--font-body)" }} className="text-[9px] text-[#94A39A] text-center mt-1.5">Guía IA · Verifica disponibilidad directamente con el lugar</p>
          </div>
        </div>
      )}
    </>
  );
}
