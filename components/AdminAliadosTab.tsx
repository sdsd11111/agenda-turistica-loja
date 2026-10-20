'use client';

import { useState, useEffect } from 'react';

export interface HabitacionForm {
  id?: number;
  nombre: string;
  precio: string;
  caracteristicas: string;
}

export interface AliadoForm {
  id?: number;
  nombre: string;
  tipo: string;
  imagenUrl: string;
  servicios: string;
  telefono: string;
  destacado: boolean;
  activo: boolean;
  descripcion: string;
  ubicacion: string;
  rangoPrecio: string;
  mapaUrl: string;
  websiteUrl: string;
  redesUrl: string;
  ubicacionLat: string | number;
  ubicacionLng: string | number;
  estrellas: string | number;
  numeroCuartos: string | number;
  /** Slug del cantón de Loja (ej: 'paltas', 'loja'). Vacío = detección automática. */
  canton: string;
  habitaciones: HabitacionForm[];
}

const INITIAL_FORM: AliadoForm = {
  nombre: '',
  tipo: 'HOSPEDAJE',
  imagenUrl: '',
  servicios: 'Wifi, Baño privado, Agua caliente, Parqueadero',
  telefono: '593',
  destacado: false,
  activo: true,
  descripcion: '',
  ubicacion: '',
  rangoPrecio: '$35 - $60 / noche',
  mapaUrl: '',
  websiteUrl: '',
  redesUrl: '',
  ubicacionLat: '',
  ubicacionLng: '',
  estrellas: '3',
  numeroCuartos: '10',
  canton: '',
  habitaciones: [],
};

const TIPOS_ALIADO = [
  { value: 'HOSPEDAJE', label: '🏨 Hospedaje (Hotel, Hostería, Hostal)' },
  { value: 'GASTRONOMIA', label: '🍽️ Gastronomía & Restaurante' },
  { value: 'CAFETERIA', label: '☕ Cafetera de Especialidad' },
  { value: 'EXPERIENCIA', label: '🎒 Tour & Experiencia' },
  { value: 'TRANSPORTE', label: '🚐 Transporte & Movilidad' },
  { value: 'CANTON_GAD', label: '🏛️ GAD / Institución Turística' },
  { value: 'CULTURA_ARTE', label: '🎭 Cultura & Arte' },
  { value: 'COMERCIO', label: '🛍️ Comercio Local' },
  { value: 'OTRO', label: '✨ Otro' },
];

const CANTONES_LOJA = [
  { value: '', label: '— Auto-detectar por ubicación —' },
  { value: 'loja', label: 'Loja' },
  { value: 'catamayo', label: 'Catamayo' },
  { value: 'calvas', label: 'Calvas (Cariamanga)' },
  { value: 'celica', label: 'Celica' },
  { value: 'chaguarpamba', label: 'Chaguarpamba' },
  { value: 'espindola', label: 'Espíndola (Amaluza)' },
  { value: 'gonzanama', label: 'Gonzanamá' },
  { value: 'macara', label: 'Macará' },
  { value: 'olmedo', label: 'Olmedo' },
  { value: 'paltas', label: 'Paltas (Catacocha)' },
  { value: 'pindal', label: 'Pindal' },
  { value: 'puyango', label: 'Puyango (Alamor)' },
  { value: 'quilanga', label: 'Quilanga' },
  { value: 'saraguro', label: 'Saraguro' },
  { value: 'sozoranga', label: 'Sozoranga' },
  { value: 'zapotillo', label: 'Zapotillo' },
];

export default function AdminAliadosTab() {
  const [aliados, setAliados] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<AliadoForm>(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<string>('TODOS');

  const fetchAliados = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/aliados');
      const data = await res.json();
      if (data.success) {
        setAliados(data.aliados || []);
      }
    } catch (err) {
      console.error('Error cargando aliados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAliados();
  }, []);

  const handleStartNew = () => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setMessage(null);
    setView('editor');
  };

  const handleEdit = (aliado: any) => {
    setEditingId(aliado.id);
    setForm({
      id: aliado.id,
      nombre: aliado.nombre || '',
      tipo: aliado.tipo || 'HOSPEDAJE',
      imagenUrl: aliado.imagenUrl || '',
      servicios: aliado.servicios || '',
      telefono: aliado.telefono || '',
      destacado: Boolean(aliado.destacado),
      activo: Boolean(aliado.activo),
      descripcion: aliado.descripcion || '',
      ubicacion: aliado.ubicacion || '',
      rangoPrecio: aliado.rangoPrecio || '',
      mapaUrl: aliado.mapaUrl || '',
      websiteUrl: aliado.websiteUrl || '',
      redesUrl: aliado.redesUrl || '',
      ubicacionLat: aliado.ubicacionLat ?? '',
      ubicacionLng: aliado.ubicacionLng ?? '',
      estrellas: aliado.estrellas ?? '',
      numeroCuartos: aliado.numeroCuartos ?? '',
      canton: aliado.canton || '',
      habitaciones: Array.isArray(aliado.habitaciones)
        ? aliado.habitaciones.map((h: any) => ({
            id: h.id,
            nombre: h.nombre || '',
            precio: h.precio || '',
            caracteristicas: h.caracteristicas || '',
          }))
        : [],
    });
    setMessage(null);
    setView('editor');
  };

  const handleDelete = async (id: number, nombre: string) => {
    if (!confirm(`¿Eliminar al aliado "${nombre}" y todas sus habitaciones asociadas?`)) return;
    try {
      const res = await fetch(`/api/admin/aliados/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchAliados();
      } else {
        alert('Error al eliminar');
      }
    } catch {
      alert('Error de red al intentar eliminar');
    }
  };

  const toggleActivo = async (aliado: any) => {
    const nuevoEstado = !aliado.activo;
    setAliados((prev) =>
      prev.map((a) => (a.id === aliado.id ? { ...a, activo: nuevoEstado } : a))
    );

    try {
      await fetch(`/api/admin/aliados/${aliado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...aliado,
          activo: nuevoEstado,
        }),
      });
    } catch {
      fetchAliados();
    }
  };

  // Manejo de habitaciones hijas
  const addHabitacion = () => {
    setForm((prev) => ({
      ...prev,
      habitaciones: [
        ...prev.habitaciones,
        { nombre: '', precio: '$35 / noche', caracteristicas: 'Cama matrimonial, wifi, baño privado' },
      ],
    }));
  };

  const removeHabitacion = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      habitaciones: prev.habitaciones.filter((_, i) => i !== idx),
    }));
  };

  const updateHabitacion = (idx: number, campo: keyof HabitacionForm, val: string) => {
    setForm((prev) => {
      const copy = [...prev.habitaciones];
      copy[idx] = { ...copy[idx], [campo]: val };
      return { ...prev, habitaciones: copy };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const endpoint = editingId ? `/api/admin/aliados/${editingId}` : '/api/admin/aliados';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: 'success', text: '¡Aliado guardado y sincronizado con éxito!' });
        fetchAliados();
        setTimeout(() => setView('list'), 1000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al guardar aliado' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error de conexión con el servidor' });
    } finally {
      setSaving(false);
    }
  };

  const filtrados = aliados.filter((a) =>
    filtroTipo === 'TODOS' ? true : a.tipo === filtroTipo
  );

  return (
    <div>
      {/* Barra de Título y Botón */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-[#17201B] tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {view === 'list'
              ? 'Directorio de Aliados (Hoteles & Servicios)'
              : editingId
              ? 'Editar Aliado Turístico'
              : 'Registrar Nuevo Aliado'}
          </h2>
          <p className="text-sm text-[#64746B] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
            {view === 'list'
              ? 'Gestiona hoteles, hostales, habitaciones y tarifas en TURISTICA_DB_URL. Se reflejan en la web y en el Chatbot.'
              : 'Completa la información comercial, teléfonos de contacto directo y agrega los tipos de habitaciones con tarifas.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {view === 'list' ? (
            <button
              onClick={handleStartNew}
              className="bg-[#2C5E43] hover:bg-[#224B35] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm shadow-[#2C5E43]/30"
            >
              <span>🏨</span> Nuevo Aliado
            </button>
          ) : (
            <button
              onClick={() => setView('list')}
              className="bg-[#F4F5F0] hover:bg-[#E8EAE3] text-[#17201B] text-sm font-medium px-4 py-2.5 rounded-xl transition"
            >
              ← Volver al Listado
            </button>
          )}
        </div>
      </div>

      {/* VISTA 1: LISTADO */}
      {view === 'list' && (
        <div className="space-y-4">
          {/* Filtros rápidos */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFiltroTipo('TODOS')}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition ${
                filtroTipo === 'TODOS'
                  ? 'bg-[#2C5E43] text-white'
                  : 'bg-white text-[#64746B] border border-[#E8EAE3] hover:border-[#2C5E43]/40'
              }`}
            >
              Todos ({aliados.length})
            </button>
            <button
              onClick={() => setFiltroTipo('HOSPEDAJE')}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition ${
                filtroTipo === 'HOSPEDAJE'
                  ? 'bg-[#2C5E43] text-white'
                  : 'bg-white text-[#64746B] border border-[#E8EAE3] hover:border-[#2C5E43]/40'
              }`}
            >
              🏨 Hospedaje ({aliados.filter((a) => a.tipo === 'HOSPEDAJE').length})
            </button>
            <button
              onClick={() => setFiltroTipo('GASTRONOMIA')}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition ${
                filtroTipo === 'GASTRONOMIA'
                  ? 'bg-[#2C5E43] text-white'
                  : 'bg-white text-[#64746B] border border-[#E8EAE3] hover:border-[#2C5E43]/40'
              }`}
            >
              🍽️ Gastronomía ({aliados.filter((a) => a.tipo === 'GASTRONOMIA').length})
            </button>
          </div>

          {loading ? (
            <div className="bg-white border border-[#E8EAE3] rounded-3xl p-12 text-center text-[#64746B]">
              <div className="size-8 border-2 border-[#2C5E43] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              Cargando aliados desde la base de datos turística...
            </div>
          ) : filtrados.length === 0 ? (
            <div className="bg-white border border-[#E8EAE3] rounded-3xl p-12 text-center text-[#64746B]">
              No se encontraron aliados registrados con este filtro. Haz clic en &ldquo;Nuevo Aliado&rdquo; para agregar el primero.
            </div>
          ) : (
            <div className="bg-white border border-[#E8EAE3] rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F4F5F0] text-[#64746B] uppercase text-[11px] font-semibold tracking-wider border-b border-[#E8EAE3]">
                    <tr>
                      <th className="py-3.5 px-5">Establecimiento</th>
                      <th className="py-3.5 px-4">Tipo</th>
                      <th className="py-3.5 px-4">Habitaciones</th>
                      <th className="py-3.5 px-4 text-center">Estado</th>
                      <th className="py-3.5 px-4">WhatsApp</th>
                      <th className="py-3.5 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEF0EA]">
                    {filtrados.map((a) => (
                      <tr key={a.id} className="hover:bg-[#FAFAF8] transition">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            {a.imagenUrl ? (
                              <img
                                src={a.imagenUrl}
                                alt={a.nombre}
                                className="size-12 rounded-xl object-cover border border-[#E8EAE3] shrink-0"
                              />
                            ) : (
                              <div className="size-12 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-xl shrink-0">
                                🏨
                              </div>
                            )}
                            <div>
                              <div className="font-bold text-[#17201B] flex items-center gap-2">
                                <span>{a.nombre}</span>
                                {a.destacado ? (
                                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                                    ⭐ Destacado
                                  </span>
                                ) : null}
                              </div>
                              <p className="text-xs text-[#64746B] mt-0.5 line-clamp-1">
                                📍 {a.ubicacion || 'Loja, Ecuador'}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EBF3ED] text-[#2C5E43] border border-[#2C5E43]/20">
                            {a.tipo}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-xs text-[#3D4F45]">
                          {a.habitaciones && a.habitaciones.length > 0 ? (
                            <span className="font-semibold text-[#17201B]">
                              {a.habitaciones.length} configurada{a.habitaciones.length > 1 ? 's' : ''}
                            </span>
                          ) : (
                            <span className="text-[#94A39A]">Sin habitaciones</span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => toggleActivo(a)}
                            className={`text-xs px-3 py-1 rounded-full font-bold transition shadow-sm ${
                              a.activo
                                ? 'bg-[#EBF3ED] text-[#2C5E43] hover:bg-emerald-100 border border-[#2C5E43]/30'
                                : 'bg-neutral-100 text-[#94A39A] hover:bg-neutral-200 border border-neutral-300'
                            }`}
                          >
                            {a.activo ? '✅ Activo' : '⚪ Oculto'}
                          </button>
                        </td>

                        <td className="py-4 px-4 text-xs font-mono text-[#3D4F45]">
                          {a.telefono ? (
                            <a
                              href={`https://wa.me/${a.telefono}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#2C5E43] hover:underline"
                            >
                              +{a.telefono}
                            </a>
                          ) : (
                            <span className="text-[#94A39A]">-</span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(a)}
                              className="text-xs font-semibold text-[#2C5E43] bg-[#EBF3ED] hover:bg-[#2C5E43] hover:text-white px-3 py-1.5 rounded-lg border border-[#2C5E43]/30 transition"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(a.id, a.nombre)}
                              className="text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white px-2.5 py-1.5 rounded-lg border border-red-200 transition"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VISTA 2: FORMULARIO EDITOR */}
      {view === 'editor' && (
        <form onSubmit={handleSave} className="space-y-8">
          {message && (
            <div
              className={`p-4 rounded-2xl text-sm font-semibold border ${
                message.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="bg-white border border-[#E8EAE3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3
              className="text-lg font-bold text-[#17201B] border-b border-[#EEF0EA] pb-3"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              1. Información General del Establecimiento
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#17201B] uppercase tracking-wider mb-2">
                  Nombre Comercial *
                </label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Ej: Hotel Gran Victoria Loja"
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-2.5 text-sm text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17201B] uppercase tracking-wider mb-2">
                  Tipo de Aliado
                </label>
                <select
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-2.5 text-sm text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                >
                  {TIPOS_ALIADO.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17201B] uppercase tracking-wider mb-2">
                  Cantón de la Provincia de Loja
                </label>
                <select
                  value={form.canton}
                  onChange={(e) => setForm({ ...form, canton: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-2.5 text-sm text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                >
                  {CANTONES_LOJA.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#17201B] uppercase tracking-wider mb-2">
                  Ubicación / Dirección Completa
                </label>
                <input
                  type="text"
                  value={form.ubicacion}
                  onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
                  placeholder="Ej: Bernardo Valdivieso y José Antonio Eguiguren (Centro Histórico), Loja"
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-2.5 text-sm text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17201B] uppercase tracking-wider mb-2">
                  WhatsApp Directo (con código de país sin +)
                </label>
                <input
                  type="text"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  placeholder="Ej: 593991234567"
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-2.5 text-sm font-mono text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17201B] uppercase tracking-wider mb-2">
                  Rango de Precios Referencial
                </label>
                <input
                  type="text"
                  value={form.rangoPrecio}
                  onChange={(e) => setForm({ ...form, rangoPrecio: e.target.value })}
                  placeholder="Ej: $45 - $80 / noche"
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-2.5 text-sm text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#17201B] uppercase tracking-wider mb-2">
                  URL de Imagen Principal
                </label>
                <input
                  type="url"
                  value={form.imagenUrl}
                  onChange={(e) => setForm({ ...form, imagenUrl: e.target.value })}
                  placeholder="https://mvps.b-cdn.net/... o https://images.unsplash.com/..."
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-2.5 text-sm text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#17201B] uppercase tracking-wider mb-2">
                  Descripción Comercial (Leída por el Chatbot y visible en la ficha)
                </label>
                <textarea
                  rows={4}
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  placeholder="Describe la experiencia, comodidades, cercanía a atractivos..."
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl p-4 text-sm text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#17201B] uppercase tracking-wider mb-2">
                  Servicios Incluidos (separados por coma)
                </label>
                <input
                  type="text"
                  value={form.servicios}
                  onChange={(e) => setForm({ ...form, servicios: e.target.value })}
                  placeholder="Wifi fibra óptica, Desayuno buffet, Parqueadero privado, Room service"
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-2.5 text-sm text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#EEF0EA]">
              <div>
                <label className="block text-xs font-medium text-[#64746B] mb-1">Estrellas</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={form.estrellas}
                  onChange={(e) => setForm({ ...form, estrellas: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-3 py-2 text-sm text-[#17201B]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#64746B] mb-1">Total Habitaciones</label>
                <input
                  type="number"
                  min={1}
                  value={form.numeroCuartos}
                  onChange={(e) => setForm({ ...form, numeroCuartos: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-3 py-2 text-sm text-[#17201B]"
                />
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="chk-destacado"
                  checked={form.destacado}
                  onChange={(e) => setForm({ ...form, destacado: e.target.checked })}
                  className="size-4 accent-[#2C5E43]"
                />
                <label htmlFor="chk-destacado" className="text-xs font-bold text-[#17201B] cursor-pointer">
                  ⭐ Destacado
                </label>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="chk-activo"
                  checked={form.activo}
                  onChange={(e) => setForm({ ...form, activo: e.target.checked })}
                  className="size-4 accent-[#2C5E43]"
                />
                <label htmlFor="chk-activo" className="text-xs font-bold text-[#17201B] cursor-pointer">
                  ✅ Activo en Web
                </label>
              </div>
            </div>
          </div>

          {/* 2. GESTIÓN DE HABITACIONES HIJAS */}
          <div className="bg-white border border-[#E8EAE3] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#EEF0EA] pb-3">
              <div>
                <h3
                  className="text-lg font-bold text-[#17201B]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  2. Tipos de Habitaciones y Tarifas Específicas
                </h3>
                <p className="text-xs text-[#64746B] mt-0.5">
                  El Chatbot y la ficha de hospedaje leen estos cuartos para recomendar precios exactos.
                </p>
              </div>
              <button
                type="button"
                onClick={addHabitacion}
                className="bg-[#EBF3ED] hover:bg-[#2C5E43] text-[#2C5E43] hover:text-white text-xs font-bold px-3.5 py-2 rounded-xl transition border border-[#2C5E43]/30"
              >
                + Agregar Habitación
              </button>
            </div>

            {form.habitaciones.length === 0 ? (
              <p className="text-xs text-[#94A39A] italic text-center py-6 bg-[#FAFAF8] rounded-2xl border border-dashed border-[#E8EAE3]">
                No hay habitaciones específicas añadidas. Puedes agregar Matrimonial, Doble, Suite, etc.
              </p>
            ) : (
              <div className="space-y-4">
                {form.habitaciones.map((hab, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8EAE3] grid grid-cols-1 sm:grid-cols-12 gap-3 items-end"
                  >
                    <div className="sm:col-span-5">
                      <label className="block text-[11px] font-semibold text-[#64746B] mb-1">
                        Nombre del Cuarto *
                      </label>
                      <input
                        type="text"
                        required
                        value={hab.nombre}
                        onChange={(e) => updateHabitacion(idx, 'nombre', e.target.value)}
                        placeholder="Ej: Habitación Matrimonial Superior"
                        className="w-full bg-white border border-[#E8EAE3] rounded-xl px-3 py-2 text-xs text-[#17201B]"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-semibold text-[#64746B] mb-1">
                        Tarifa / Precio
                      </label>
                      <input
                        type="text"
                        value={hab.precio}
                        onChange={(e) => updateHabitacion(idx, 'precio', e.target.value)}
                        placeholder="Ej: $45 / noche"
                        className="w-full bg-white border border-[#E8EAE3] rounded-xl px-3 py-2 text-xs text-[#17201B]"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-semibold text-[#64746B] mb-1">
                        Detalles / Comodidades
                      </label>
                      <input
                        type="text"
                        value={hab.caracteristicas}
                        onChange={(e) => updateHabitacion(idx, 'caracteristicas', e.target.value)}
                        placeholder="Cama Queen, jacuzzi, vista al centro"
                        className="w-full bg-white border border-[#E8EAE3] rounded-xl px-3 py-2 text-xs text-[#17201B]"
                      />
                    </div>
                    <div className="sm:col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeHabitacion(idx)}
                        className="text-red-500 hover:text-red-700 p-2 text-sm"
                        title="Quitar habitación"
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botones de acción final */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setView('list')}
              className="bg-[#F4F5F0] hover:bg-[#E8EAE3] text-[#17201B] font-medium text-sm px-6 py-3 rounded-xl transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#2C5E43] hover:bg-[#224B35] text-white font-bold text-sm px-8 py-3 rounded-xl transition shadow-md shadow-[#2C5E43]/20 disabled:opacity-50"
            >
              {saving ? 'Guardando en Base de Datos...' : 'Guardar Aliado y Sincronizar'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
