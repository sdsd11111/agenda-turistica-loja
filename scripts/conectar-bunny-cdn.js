const fs = require('fs');
const path = require('path');

const CDN_BASE = 'https://mvps.b-cdn.net/agenda-turistica';

// Carpetas y archivos a actualizar
const TARGET_FILES = [
  'lib/data/cantones.ts',
  'lib/data/atractivos.ts',
  'lib/data/guias.ts',
  'lib/data/hospedaje.ts',
  'lib/data/eventos.ts',
  'app/cantones/page.tsx',
  'app/cantones/[slug]/page.tsx',
  'app/atractivos/page.tsx',
  'app/guias/page.tsx',
  'app/guias/[slug]/page.tsx',
  'app/hospedaje/page.tsx',
  'app/hospedaje/[slug]/page.tsx',
  'app/auxilio-en-ruta/page.tsx',
  'app/municipios/page.tsx',
  'app/contacto/page.tsx',
  'components/PageHero.tsx',
  'components/CantonCard.tsx',
  'components/SeccionDecision.tsx',
  'components/SeccionDecisionCanton.tsx',
  'components/SeccionQueHayEnLoja.tsx',
  'components/SeccionEventosCanton.tsx',
  'components/SeccionFundadores.tsx'
];

const RUTAS_A_REEMPLAZAR = [
  '/cantones/',
  '/atractivos/',
  '/guias/',
  '/home/',
  '/hospedaje/'
];

let totalReemplazos = 0;

for (const relPath of TARGET_FILES) {
  const fullPath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');
  let modificado = false;

  for (const prefix of RUTAS_A_REEMPLAZAR) {
    // Reemplaza comillas con el prefijo local por la URL de CDN
    const regex = new RegExp(`(['"\`])${prefix}([^'"\`]+)\\1`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, `$1${CDN_BASE}${prefix}$2$1`);
      modificado = true;
      totalReemplazos++;
    }
  }

  if (modificado) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✓ Archivo actualizado con BunnyCDN: ${relPath}`);
  }
}

console.log(`\nReemplazo completado en todos los archivos.`);
