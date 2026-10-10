import { marked } from 'marked';

// Configuración de marked para que genere HTML semántico y limpio
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Convierte texto (Markdown o HTML existente) en HTML limpio y semántico para renderizar.
 * Si el usuario escribe texto plano, saltos de línea o Markdown (#, ##, **, -, etc.),
 * se formatea de manera óptima para buscadores (Google) y modelos LLM.
 */
export function renderContent(content: string): string {
  if (!content) return '';

  // Si ya tiene tags HTML (<h2, <p, etc.), marked los respeta y procesa cualquier markdown intercalado
  try {
    const html = marked.parse(content);
    return typeof html === 'string' ? html : String(html);
  } catch (err) {
    console.error('Error renderizando markdown:', err);
    return content;
  }
}
