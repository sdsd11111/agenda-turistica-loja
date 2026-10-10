const fs = require('fs');
const path = require('path');

// Archivos donde sólo deben existir URLs locales para navegación interna
const FILES_TO_FIX = [
  'components/SeccionDecisionCanton.tsx',
  'components/SeccionDecision.tsx',
  'components/CantonCard.tsx',
  'app/cantones/[slug]/page.tsx',
  'app/atractivos/page.tsx',
  'app/guias/[slug]/page.tsx',
  'app/hospedaje/[slug]/page.tsx',
  'lib/site.ts'
];

let corregidos = 0;

for (const rel of FILES_TO_FIX) {
  const full = path.join(__dirname, '..', rel);
  if (!fs.existsSync(full)) continue;

  let content = fs.readFileSync(full, 'utf8');
  const original = content;

  // Reemplazar ocurrencias de CDN en href o en mapas de URLs de navegación
  content = content.replace(/https:\/\/mvps\.b-cdn\.net\/agenda-turistica\/guias\//g, '/guias/');
  content = content.replace(/https:\/\/mvps\.b-cdn\.net\/agenda-turistica\/cantones\//g, '/cantones/');
  content = content.replace(/https:\/\/mvps\.b-cdn\.net\/agenda-turistica\/atractivos\//g, '/atractivos/');
  content = content.replace(/https:\/\/mvps\.b-cdn\.net\/agenda-turistica\/hospedaje\//g, '/hospedaje/');

  // PERO si era una imagen (.webp, .png, .jpg, .svg), mantener o restaurar la URL de CDN
  content = content.replace(/(['"])\/([a-z0-9_-]+)\/([^'"]+\.(?:webp|png|jpg|svg))(['"])/g, '$1https://mvps.b-cdn.net/agenda-turistica/$2/$3$4');

  if (content !== original) {
    fs.writeFileSync(full, content, 'utf8');
    console.log(`✓ Enlaces internos corregidos en: ${rel}`);
    corregidos++;
  }
}

console.log(`Finalizado. Total archivos corregidos: ${corregidos}`);
