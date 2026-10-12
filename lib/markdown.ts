import { marked } from 'marked';

// Configuración de marked para que genere HTML semántico y limpio
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Helper para generar el HTML del iframe o reproductor responsivo a partir de una URL
export function getVideoEmbedHtml(videoUrl: string): string {
  if (!videoUrl) return '';

  // YouTube
  const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:watch\?.*?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `
      <div class="my-8 rounded-3xl overflow-hidden shadow-xl border border-[#E8EAE3] bg-black aspect-video relative w-full">
        <iframe
          src="https://www.youtube-nocookie.com/embed/${ytMatch[1]}?rel=0"
          title="Video de YouTube"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="absolute inset-0 w-full h-full border-0"
        ></iframe>
      </div>
    `;
  }

  // Vimeo
  const vimeoMatch = videoUrl.match(/vimeo\.com\/(\d+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return `
      <div class="my-8 rounded-3xl overflow-hidden shadow-xl border border-[#E8EAE3] bg-black aspect-video relative w-full">
        <iframe
          src="https://player.vimeo.com/video/${vimeoMatch[1]}"
          title="Video de Vimeo"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          class="absolute inset-0 w-full h-full border-0"
        ></iframe>
      </div>
    `;
  }

  // MP4 directo
  if (videoUrl.match(/\.(mp4|webm)($|\?)/i)) {
    return `
      <div class="my-8 rounded-3xl overflow-hidden shadow-xl border border-[#E8EAE3] bg-black w-full">
        <video controls playsinline preload="metadata" class="w-full h-auto max-h-[500px]">
          <source src="${videoUrl}" type="video/mp4" />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    `;
  }

  return '';
}

// Helper para transformar enlaces de video sueltos o sintaxis de video en reproductores responsivos
function parseVideos(content: string): string {
  // Coincidir URLs de YouTube que estén en líneas o párrafos independientes, no dentro de atributos src o href
  // 1. YouTube
  const ytRegex = /(?:<p>\s*)?(?:https?:\/\/)?(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?.*?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[^\s<>"']*)?(?:\s*<\/p>)?/gi;
  
  // 2. Si ya hay iframes de youtube generados, no duplicarlos
  let processed = content.replace(ytRegex, (match, videoId) => {
    // Si ya forma parte de un src="...", no reemplazar
    if (match.includes('src=') || match.includes('href=')) return match;
    return `<div class="my-8 rounded-3xl overflow-hidden shadow-xl border border-[#E8EAE3] bg-black aspect-video relative w-full max-w-3xl mx-auto"><iframe src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" title="Video de YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="absolute inset-0 w-full h-full border-0"></iframe></div>`;
  });

  return processed;
}

/**
 * Convierte texto (Markdown o HTML existente) en HTML limpio y semántico para renderizar.
 * Además detecta e inserta reproductores de video responsivos (YouTube, Vimeo, MP4 directos).
 */
export function renderContent(content: string): string {
  if (!content) return '';

  try {
    // Procesar videos en markdown antes de parsear, o parsear y luego limpiar
    // Primero limpiamos cualquier tag huérfano o enlaces rotos con youtube
    const withVideos = parseVideos(content);
    const rawHtml = marked.parse(withVideos);
    return typeof rawHtml === 'string' ? rawHtml : String(rawHtml);
  } catch (err) {
    console.error('Error renderizando markdown:', err);
    return content;
  }
}

