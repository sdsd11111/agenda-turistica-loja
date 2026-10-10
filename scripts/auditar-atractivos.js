const fs = require('fs');
const content = fs.readFileSync('lib/data/atractivos.ts', 'utf8');

const regex = /{\s*slug:\s*"([^"]+)",\s*nombre:\s*"([^"]+)",\s*cantonSlug:\s*"([^"]+)"([\s\S]*?)(?=},\s*\{|\s*\}\s*\];)/g;

const porCanton = {};
let total = 0;
let conImagen = 0;
let sinImagen = 0;

let match;
while ((match = regex.exec(content)) !== null) {
  total++;
  const slug = match[1];
  const nombre = match[2];
  const canton = match[3];
  const resto = match[4];

  const imgMatch = resto.match(/imagen:\s*"([^"]+)"/);
  const imagen = imgMatch ? imgMatch[1] : null;

  if (imagen) conImagen++;
  else sinImagen++;

  if (!porCanton[canton]) porCanton[canton] = [];
  porCanton[canton].push({ slug, nombre, imagen });
}

console.log('--- RESUMEN ---');
console.log('Total atractivos:', total);
console.log('Con imagen:', conImagen);
console.log('Sin imagen:', sinImagen);
console.log('\n--- DETALLE POR CANTON ---');
for (const [canton, lista] of Object.entries(porCanton)) {
  console.log(`\nCantón: [${canton.toUpperCase()}] (${lista.length} atractivos)`);
  lista.forEach(a => {
    console.log(` - ${a.nombre} (${a.slug}) -> ${a.imagen ? 'OK: ' + a.imagen : 'FALTA IMAGEN'}`);
  });
}
