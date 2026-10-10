const fs = require('fs');
const path = require('path');
const https = require('https');

// Cargar variables desde .env.local
const envFile = fs.readFileSync(path.join(__dirname, '..', '.env.local'), 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) env[k.trim()] = v.join('=').trim();
});

const STORAGE_ZONE = env.BUNNY_STORAGE_ZONE || 'mvps';
const API_KEY = env.BUNNY_STORAGE_API_KEY || '58296509-eefd-401e-b6c85809cb7b-b0ef-4aa0';
const HOST = env.BUNNY_STORAGE_HOST || 'storage.bunnycdn.com';
const REMOTE_PREFIX = 'agenda-turistica'; // Carpeta en Bunny

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const CARPETAS = ['cantones', 'atractivos', 'guias', 'home', 'hospedaje'];

function uploadFile(localPath, remotePath) {
  return new Promise((resolve, reject) => {
    const fileData = fs.readFileSync(localPath);
    const options = {
      hostname: HOST,
      port: 443,
      path: `/${STORAGE_ZONE}/${remotePath}`,
      method: 'PUT',
      headers: {
        'AccessKey': API_KEY,
        'Content-Type': 'application/octet-stream',
        'Content-Length': fileData.length,
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, path: remotePath });
        } else {
          reject(new Error(`Error ${res.statusCode} en ${remotePath}: ${body}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(fileData);
    req.end();
  });
}

async function main() {
  console.log(`Iniciando subida a BunnyCDN [${STORAGE_ZONE}/${REMOTE_PREFIX}]...`);
  let total = 0;
  let exitos = 0;
  let fallos = 0;

  for (const carpeta of CARPETAS) {
    const dir = path.join(PUBLIC_DIR, carpeta);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.svg'));

    console.log(`\nSubiendo carpeta: /${carpeta} (${files.length} archivos)...`);

    for (const file of files) {
      total++;
      const localPath = path.join(dir, file);
      const remotePath = `${REMOTE_PREFIX}/${carpeta}/${file}`;
      try {
        await uploadFile(localPath, remotePath);
        console.log(`  ✓ Subido: ${remotePath}`);
        exitos++;
      } catch (err) {
        console.error(`  ✗ Error al subir ${file}:`, err.message);
        fallos++;
      }
    }
  }

  console.log(`\n================================`);
  console.log(`Subida completada: ${exitos}/${total} archivos.`);
  if (fallos > 0) console.log(`Errores: ${fallos}`);
  console.log(`================================`);
}

main();
