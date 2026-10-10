'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { renderContent } from '@/lib/markdown';


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados del CRUD
  const [posts, setPosts] = useState<any[]>([]);
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<any | null>(null);

  // Formulario de artículo
  const [form, setForm] = useState({
    titulo: '',
    slug: '',
    resumen: '',
    contenido: '',
    imagen: '',
    imagen_alt: '',
    categoria: 'Turismo',
    etiquetas: '',
    canton_slug: '',
    autor: 'Agenda Turística Loja',
    publicado: true,
    tiempo_lectura: 5,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Auto-slug a partir del título
  const handleTituloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setForm((prev) => ({
      ...prev,
      titulo: val,
      slug: editingId
        ? prev.slug
        : val
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, ''),
    }));
  };

  // Convertir imagen a Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe superar los 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        imagen: reader.result as string,
        imagen_alt: prev.imagen_alt || prev.titulo,
      }));
    };
    reader.readAsDataURL(file);
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/posts');
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (data.posts) {
        setPosts(data.posts);
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchPosts();
      } else {
        setLoginError(data.error || 'Contraseña incorrecta');
      }
    } catch {
      setLoginError('Error de red al intentar iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  const startNewPost = () => {
    setEditingId(null);
    setForm({
      titulo: '',
      slug: '',
      resumen: '',
      contenido: '',
      imagen: '',
      imagen_alt: '',
      categoria: 'Turismo',
      etiquetas: '',
      canton_slug: '',
      autor: 'Agenda Turística Loja',
      publicado: true,
      tiempo_lectura: 5,
    });
    setMessage(null);
    setView('editor');
  };

  const editPost = (post: any) => {
    setEditingId(post.id);
    setForm({
      titulo: post.titulo,
      slug: post.slug,
      resumen: post.resumen,
      contenido: post.contenido,
      imagen: post.imagen || '',
      imagen_alt: post.imagen_alt || '',
      categoria: post.categoria || 'Turismo',
      etiquetas: Array.isArray(post.etiquetas) ? post.etiquetas.join(', ') : post.etiquetas || '',
      canton_slug: post.canton_slug || '',
      autor: post.autor || 'Agenda Turística Loja',
      publicado: post.publicado,
      tiempo_lectura: post.tiempo_lectura || 5,
    });
    setMessage(null);
    setView('editor');
  };

  // Activar o desactivar publicación directamente desde la tabla
  const togglePublishStatus = async (post: any) => {
    const newStatus = !post.publicado;
    // Actualización optimista en interfaz
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, publicado: newStatus } : p))
    );

    try {
      const res = await fetch(`/api/admin/posts/${post.id}/toggle`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicado: newStatus }),
      });
      if (!res.ok) {
        // Revertir si falló
        fetchPosts();
      }
    } catch {
      fetchPosts();
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar permanentemente este artículo?')) return;
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
      } else {
        alert('Error al eliminar el artículo');
      }
    } catch {
      alert('Error de red al intentar eliminar');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const endpoint = editingId ? `/api/admin/posts/${editingId}` : '/api/admin/posts';
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: 'success', text: '¡Artículo guardado exitosamente!' });
        fetchPosts();
        setTimeout(() => setView('list'), 1000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al guardar el artículo' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Error al conectar con el servidor' });
    } finally {
      setSaving(false);
    }
  };

  // 1. PANTALLA DE LOGIN CON PALETA DE LA MARCA (#FAFAF8, #17201B, #2C5E43)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] text-[#17201B] flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white border border-[#E8EAE3] rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(23,32,27,0.06)]">
          <div className="text-center mb-8">
            <div className="size-14 mx-auto mb-4 rounded-2xl bg-[#EBF3ED] flex items-center justify-center border border-[#2C5E43]/20 shadow-sm">
              <img src="/brandmark.svg" alt="Loja" className="size-8 object-contain" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#17201B]" style={{ fontFamily: 'var(--font-display)' }}>
              Panel de Administración
            </h1>
            <p className="text-sm text-[#64746B] mt-1.5" style={{ fontFamily: 'var(--font-body)' }}>
              Agenda Turística Loja • Gestión del Blog
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#17201B] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                Contraseña de Acceso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu clave maestra"
                required
                className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-3 text-[#17201B] placeholder-[#94A39A] focus:outline-none focus:ring-2 focus:ring-[#2C5E43] focus:border-transparent transition text-sm"
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-4 py-3 rounded-xl font-medium">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2C5E43] hover:bg-[#224B35] text-white font-semibold py-3.5 rounded-xl transition duration-200 disabled:opacity-50 shadow-md shadow-[#2C5E43]/20 text-sm tracking-wide"
            >
              {loading ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-[#EEF0EA] pt-5">
            <Link href="/" className="text-xs font-medium text-[#64746B] hover:text-[#2C5E43] transition">
              ← Volver al sitio público
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. PANEL ADMINISTRADOR
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#17201B]">
      {/* HEADER EXCLUSIVO DEL PANEL DE ADMIN (Sin el navbar público tradicional) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8EAE3] shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/brandmark.svg" alt="Loja" className="size-8 object-contain" />
            <div>
              <div className="font-bold text-[#17201B] leading-none text-base" style={{ fontFamily: 'var(--font-display)' }}>
                Panel Blog • <span className="text-[#2C5E43]">Agenda Turística Loja</span>
              </div>
              <div className="text-[11px] text-[#64746B] mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>
                Gestión de Artículos & SEO
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="text-xs font-medium bg-[#EBF3ED] hover:bg-[#2C5E43] text-[#2C5E43] hover:text-white px-3.5 py-2 rounded-xl border border-[#2C5E43]/30 transition flex items-center gap-1.5"
            >
              <span>Ver Blog</span>
              <span>↗</span>
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-medium bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3.5 py-2 rounded-xl transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de Título y Botón Nuevo */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17201B] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {view === 'list' ? 'Artículos del Blog' : editingId ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
            </h1>
            <p className="text-sm text-[#64746B] mt-1" style={{ fontFamily: 'var(--font-body)' }}>
              {view === 'list'
                ? 'Gestiona tus publicaciones, activa o desactiva su visibilidad al instante, edita o previsualiza.'
                : 'Completa el título, contenido, resumen para SEO y sube imágenes que se guardarán en la base de datos.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {view === 'list' ? (
              <button
                onClick={startNewPost}
                className="bg-[#2C5E43] hover:bg-[#224B35] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-sm shadow-[#2C5E43]/30"
              >
                <span>➕</span> Nuevo Artículo
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(form)}
                  className="bg-white hover:bg-[#FAFAF8] text-[#17201B] border border-[#E8EAE3] text-sm font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>👁️</span> Vista Previa
                </button>
                <button
                  onClick={() => setView('list')}
                  className="bg-[#F4F5F0] hover:bg-[#E8EAE3] text-[#17201B] text-sm font-medium px-4 py-2.5 rounded-xl transition"
                >
                  ← Volver al Listado
                </button>
              </div>
            )}
          </div>
        </div>

        {/* VISTA 1: LISTADO DE POSTS */}
        {view === 'list' && (
          <div className="bg-white border border-[#E8EAE3] rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F4F5F0] text-[#64746B] uppercase text-[11px] font-semibold tracking-wider border-b border-[#E8EAE3]">
                  <tr>
                    <th className="py-3.5 px-5">Artículo</th>
                    <th className="py-3.5 px-4">Categoría</th>
                    <th className="py-3.5 px-4 text-center">Estado (Activar/Desactivar)</th>
                    <th className="py-3.5 px-4">Fecha</th>
                    <th className="py-3.5 px-5 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEF0EA]">
                  {posts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-[#64746B]">
                        No hay artículos aún. Haz clic en "Nuevo Artículo" para crear el primero.
                      </td>
                    </tr>
                  ) : (
                    posts.map((post) => (
                      <tr key={post.id || post.slug} className="hover:bg-[#FAFAF8] transition">
                        <td className="py-4 px-5 max-w-xs sm:max-w-md">
                          <div className="font-bold text-[#17201B] text-base break-words [overflow-wrap:anywhere]">{post.titulo}</div>
                          <div className="text-xs text-[#64746B] font-mono mt-0.5 break-all">/blog/{post.slug}</div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="bg-[#EBF3ED] text-[#2C5E43] font-semibold text-xs px-2.5 py-1 rounded-lg border border-[#2C5E43]/20">
                            {post.categoria || 'Turismo'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          {/* BOTÓN INTERACTIVO ACTIVAR / DESACTIVAR */}
                          <button
                            onClick={() => togglePublishStatus(post)}
                            title="Haz clic para activar o desactivar"
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border transition cursor-pointer ${
                              post.publicado
                                ? 'bg-[#EBF3ED] text-[#2C5E43] border-[#2C5E43]/30 hover:bg-emerald-100'
                                : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                            }`}
                          >
                            <span className={`size-2 rounded-full ${post.publicado ? 'bg-[#2C5E43]' : 'bg-amber-500'}`} />
                            {post.publicado ? 'Activo (Público)' : 'Inactivo (Oculto)'}
                          </button>
                        </td>
                        <td className="py-4 px-4 text-xs text-[#64746B]">
                          {post.fecha_publicacion || 'Reciente'}
                        </td>
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* VISTA PREVIA */}
                            <button
                              onClick={() => setShowPreviewModal(post)}
                              className="text-xs font-medium text-[#17201B] bg-[#FAFAF8] hover:bg-[#EEF0EA] border border-[#E8EAE3] px-2.5 py-1.5 rounded-lg transition"
                              title="Previsualizar artículo"
                            >
                              👁️ Vista previa
                            </button>
                            {/* EDITAR */}
                            <button
                              onClick={() => editPost(post)}
                              className="text-xs font-medium text-[#2C5E43] bg-[#EBF3ED] hover:bg-[#2C5E43] hover:text-white border border-[#2C5E43]/30 px-2.5 py-1.5 rounded-lg transition"
                            >
                              ✏️ Editar
                            </button>
                            {/* ELIMINAR */}
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-xs font-medium text-red-600 bg-red-50 hover:bg-red-600 hover:text-white border border-red-200 px-2.5 py-1.5 rounded-lg transition"
                            >
                              🗑️ Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VISTA 2: FORMULARIO CREAR / EDITAR */}
        {view === 'editor' && (
          <form onSubmit={handleSave} className="bg-white border border-[#E8EAE3] rounded-3xl p-6 sm:p-10 space-y-7 shadow-sm">
            {message && (
              <div
                className={`p-4 rounded-2xl text-sm font-medium border ${
                  message.type === 'success'
                    ? 'bg-[#EBF3ED] border-[#2C5E43]/30 text-[#2C5E43]'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Título */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#17201B] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Título del Artículo (H1 & SEO Title) *
                </label>
                <input
                  type="text"
                  value={form.titulo}
                  onChange={handleTituloChange}
                  placeholder="Ej: Los 5 Senderos Más Impresionantes del Parque Nacional Podocarpus"
                  required
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-2xl px-4 py-3 text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43] text-lg font-bold"
                  style={{ fontFamily: 'var(--font-display)' }}
                />
              </div>

              {/* Slug URL */}
              <div>
                <label className="block text-xs font-bold text-[#17201B] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Slug (URL amigable) *
                </label>
                <div className="flex items-center bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-3 py-2.5 text-[#64746B] text-sm">
                  <span>/blog/</span>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="los-5-senderos-podocarpus"
                    required
                    className="w-full bg-transparent text-[#17201B] focus:outline-none ml-1 font-mono font-medium"
                  />
                </div>
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-xs font-bold text-[#17201B] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Categoría Principal *
                </label>
                <select
                  value={form.categoria}
                  onChange={(e) => setForm((prev) => ({ ...prev, categoria: e.target.value }))}
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-3 text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43] font-medium"
                >
                  <option value="Turismo">Turismo</option>
                  <option value="Naturaleza">Naturaleza</option>
                  <option value="Gastronomía">Gastronomía</option>
                  <option value="Cultura">Cultura</option>
                  <option value="Aventura">Aventura</option>
                  <option value="Hospedaje">Hospedaje</option>
                  <option value="Eventos">Eventos</option>
                </select>
              </div>

              {/* Resumen / Meta Description */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#17201B] uppercase tracking-wider mb-2 flex justify-between" style={{ fontFamily: 'var(--font-mono)' }}>
                  <span>Resumen / Meta Descripción (SEO & LLMs) *</span>
                  <span className="text-[#64746B] font-normal">{form.resumen.length} / 160 caracteres</span>
                </label>
                <textarea
                  rows={2}
                  value={form.resumen}
                  onChange={(e) => setForm((prev) => ({ ...prev, resumen: e.target.value }))}
                  placeholder="Escribe un resumen conciso que enganche al usuario en Google y redes sociales..."
                  required
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-3 text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43] text-sm leading-relaxed"
                />
              </div>

              {/* Imagen destacada: Subir archivo Base64 o URL */}
              <div className="md:col-span-2 bg-[#F4F5F0] p-5 rounded-2xl border border-[#E8EAE3] space-y-4">
                <label className="block text-xs font-bold text-[#17201B] uppercase tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
                  Imagen Destacada (Base64 o URL directa)
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs text-[#64746B] mb-1 font-medium">Subir desde tu computador/teléfono (Base64)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-xs text-[#64746B] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#2C5E43] file:text-white hover:file:bg-[#224B35] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#64746B] mb-1 font-medium">O pega una URL de imagen</label>
                    <input
                      type="text"
                      value={form.imagen}
                      onChange={(e) => setForm((prev) => ({ ...prev, imagen: e.target.value }))}
                      placeholder="https://..."
                      className="w-full bg-white border border-[#E8EAE3] rounded-xl px-3 py-2 text-[#17201B] text-xs focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                    />
                  </div>
                </div>

                {form.imagen && (
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 pt-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={form.imagen}
                      alt="Vista previa"
                      className="w-32 h-20 object-cover rounded-xl border border-[#E8EAE3] shadow-sm shrink-0"
                    />
                    <div className="flex-1 w-full">
                      <label className="block text-xs text-[#64746B] mb-1 font-medium">Texto Alternativo SEO (Alt Text de la imagen) *</label>
                      <input
                        type="text"
                        value={form.imagen_alt}
                        onChange={(e) => setForm((prev) => ({ ...prev, imagen_alt: e.target.value }))}
                        placeholder="Descripción visual con palabras clave para Google Imágenes"
                        className="w-full bg-white border border-[#E8EAE3] rounded-xl px-3 py-2 text-[#17201B] text-xs focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Contenido (Cuerpo del artículo en Markdown o texto normal) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-[#17201B] uppercase tracking-wider mb-2 flex flex-wrap justify-between items-center gap-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  <span>Cuerpo del Artículo (Formato Markdown o Texto Normal) *</span>
                  <span className="text-[#2C5E43] font-semibold text-xs bg-[#EBF3ED] px-2.5 py-0.5 rounded-md">
                    Soporta: ## Título, **Negrita**, - Listas, [Enlaces](url)
                  </span>
                </label>
                <textarea
                  rows={14}
                  value={form.contenido}
                  onChange={(e) => setForm((prev) => ({ ...prev, contenido: e.target.value }))}
                  placeholder={`## Descubre los mejores atractivos de Loja\n\nPuedes escribir en texto normal o usar formato Markdown:\n\n- Usa **negritas** para destacar palabras clave\n- Usa ## o ### para subtítulos (óptimo para SEO y Google)\n- Usa listas con guiones para organizar consejos`}
                  required
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-2xl p-4 text-[#17201B] focus:outline-none focus:ring-2 focus:ring-[#2C5E43] font-mono text-sm leading-relaxed"
                />
              </div>


              {/* Etiquetas / Tags */}
              <div>
                <label className="block text-xs font-bold text-[#17201B] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Etiquetas (separadas por coma)
                </label>
                <input
                  type="text"
                  value={form.etiquetas}
                  onChange={(e) => setForm((prev) => ({ ...prev, etiquetas: e.target.value }))}
                  placeholder="Podocarpus, Senderismo, Naturaleza, Loja"
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-3 text-[#17201B] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                />
              </div>

              {/* Cantón Relacionado */}
              <div>
                <label className="block text-xs font-bold text-[#17201B] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Cantón Relacionado
                </label>
                <select
                  value={form.canton_slug}
                  onChange={(e) => setForm((prev) => ({ ...prev, canton_slug: e.target.value }))}
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-3 text-[#17201B] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5E43] font-medium"
                >
                  <option value="">Toda la Provincia de Loja</option>
                  <option value="loja">Loja</option>
                  <option value="catamayo">Catamayo</option>
                  <option value="saraguro">Saraguro</option>
                  <option value="calvas">Calvas (Cariamanga)</option>
                  <option value="paltas">Paltas (Catacocha)</option>
                  <option value="zapotillo">Zapotillo</option>
                  <option value="puyango">Puyango</option>
                  <option value="celica">Celica</option>
                  <option value="chaguarpamba">Chaguarpamba</option>
                  <option value="espindola">Espíndola</option>
                  <option value="gonzanama">Gonzanamá</option>
                  <option value="macara">Macará</option>
                  <option value="olmedo">Olmedo</option>
                  <option value="pindal">Pindal</option>
                  <option value="quilanga">Quilanga</option>
                  <option value="sozoranga">Sozoranga</option>
                </select>
              </div>

              {/* Autor y Tiempo */}
              <div>
                <label className="block text-xs font-bold text-[#17201B] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Autor
                </label>
                <input
                  type="text"
                  value={form.autor}
                  onChange={(e) => setForm((prev) => ({ ...prev, autor: e.target.value }))}
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-3 text-[#17201B] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#17201B] uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  Tiempo estimado de lectura (minutos)
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={form.tiempo_lectura}
                  onChange={(e) => setForm((prev) => ({ ...prev, tiempo_lectura: Number(e.target.value) }))}
                  className="w-full bg-[#FAFAF8] border border-[#E8EAE3] rounded-xl px-4 py-3 text-[#17201B] text-sm focus:outline-none focus:ring-2 focus:ring-[#2C5E43]"
                />
              </div>

              {/* CHECKBOX ACTIVAR / DESACTIVAR AL CREAR O EDITAR */}
              <div className="md:col-span-2 bg-[#EBF3ED]/60 border border-[#2C5E43]/20 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#17201B] text-sm">Estado de Publicación</div>
                  <div className="text-xs text-[#64746B]">
                    {form.publicado
                      ? 'Activo: El artículo será público e indexable inmediatamente.'
                      : 'Inactivo: Se guardará como borrador oculto.'}
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.publicado}
                    onChange={(e) => setForm((prev) => ({ ...prev, publicado: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2C5E43]" />
                </label>
              </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#EEF0EA]">
              <button
                type="button"
                onClick={() => setShowPreviewModal(form)}
                className="px-5 py-3 rounded-xl border border-[#E8EAE3] bg-white hover:bg-[#FAFAF8] text-[#17201B] font-semibold text-sm transition shadow-sm"
              >
                👁️ Vista Previa
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                className="px-5 py-3 rounded-xl text-[#64746B] hover:text-[#17201B] transition text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-[#2C5E43] hover:bg-[#224B35] text-white font-bold px-7 py-3 rounded-xl transition text-sm disabled:opacity-50 shadow-md shadow-[#2C5E43]/20"
              >
                {saving ? 'Guardando...' : editingId ? 'Actualizar Artículo' : 'Guardar Artículo'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* MODAL DE VISTA PREVIA DEL ARTÍCULO */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#E8EAE3] shadow-2xl">
            {/* Header modal */}
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-[#E8EAE3] p-4 px-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#EBF3ED] text-[#2C5E43] px-2.5 py-1 rounded-full font-bold">
                  Vista Previa en Vivo
                </span>
                <span className="text-xs text-[#64746B]">
                  {showPreviewModal.publicado ? '● Estado: Activo' : '○ Estado: Inactivo'}
                </span>
              </div>
              <button
                onClick={() => setShowPreviewModal(null)}
                className="text-[#64746B] hover:text-[#17201B] size-8 rounded-full bg-[#F4F5F0] flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Contenido del post renderizado tal como se ve en el blog */}
            <div className="p-6 sm:p-10">
              <div className="flex items-center gap-3 text-xs text-[#64746B] mb-3">
                <span className="bg-[#EBF3ED] text-[#2C5E43] font-bold px-2.5 py-1 rounded-full">
                  {showPreviewModal.categoria || 'Turismo'}
                </span>
                <span>⏱️ {showPreviewModal.tiempo_lectura || 5} min de lectura</span>
                <span>•</span>
                <span>Autor: {showPreviewModal.autor || 'Agenda Turística Loja'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17201B] tracking-tight leading-tight mb-4 break-words [overflow-wrap:anywhere]" style={{ fontFamily: 'var(--font-display)' }}>
                {showPreviewModal.titulo || 'Sin título'}
              </h1>

              {showPreviewModal.resumen && (
                <p className="text-base text-[#64746B] leading-relaxed border-l-4 border-[#2C5E43] pl-4 py-2 bg-[#F4F5F0] rounded-r-xl mb-6 break-words [overflow-wrap:anywhere] overflow-hidden">
                  {showPreviewModal.resumen}
                </p>
              )}


              {showPreviewModal.imagen && (
                <div className="rounded-2xl overflow-hidden mb-8 border border-[#E8EAE3] shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={showPreviewModal.imagen}
                    alt={showPreviewModal.imagen_alt || 'Imagen del artículo'}
                    className="w-full max-h-[420px] object-cover"
                  />
                  {showPreviewModal.imagen_alt && (
                    <div className="text-center text-xs text-[#64746B] p-2 bg-[#FAFAF8] italic border-t border-[#E8EAE3]">
                      {showPreviewModal.imagen_alt}
                    </div>
                  )}
                </div>
              )}

              <div
                className="prose prose-slate max-w-none text-[#17201B] text-base leading-relaxed break-words overflow-hidden [overflow-wrap:anywhere]
                  prose-headings:font-bold prose-headings:text-[#17201B] prose-headings:tracking-tight prose-headings:break-words
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-[#E8EAE3] prose-h2:pb-2
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-[#17201B] prose-p:leading-relaxed prose-p:mb-4 prose-p:break-words
                  prose-ul:text-[#17201B] prose-ul:my-4 prose-li:my-1
                  prose-strong:text-[#17201B] prose-strong:font-bold
                  prose-a:text-[#2C5E43] prose-a:font-semibold hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: renderContent(showPreviewModal.contenido) || '<p className="text-gray-400">Sin contenido...</p>' }}
              />


            </div>

            <div className="sticky bottom-0 bg-[#FAFAF8] border-t border-[#E8EAE3] p-4 px-6 text-right">
              <button
                onClick={() => setShowPreviewModal(null)}
                className="bg-[#2C5E43] hover:bg-[#224B35] text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition shadow-sm"
              >
                Cerrar Vista Previa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
