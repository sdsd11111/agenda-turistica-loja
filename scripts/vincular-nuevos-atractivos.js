const fs = require('fs');

const MAPEO = {
  // Saraguro
  "saraguro-cerro-de-arcos": "/atractivos/cerro-de-arcos.webp",
  // Catamayo
  "catamayo-mirador-la-cruz": "/atractivos/mirador-cruz-catamayo.webp",
  // Calvas
  "calvas-cerro-ahuaca": "/atractivos/cerro-el-ahuaca.webp",
  // Zapotillo
  "zapotillo-florecimiento-guayacanes": "/atractivos/guayacanes-zapotillo.webp",
  "zapotillo-reserva-ceiba": "/atractivos/guayacanes-zapotillo.webp",
  // Celica
  "celica-megalitos-quilluzara": "/atractivos/megalitos-quilluzara-celica.webp",
  // Paltas
  "paltas-petroglifos-yamana": "/atractivos/petroglifos-yamana-paltas.webp",
  // Puyango
  "puyango-bosque-petrificado": "/atractivos/bosque-petrificado-puyango.webp",
  // Espindola
  "espindola-lagunas-amaluza": "/atractivos/lagunas-negras-jimbura.webp",
  "espindola-parque-nacional-yacuri": "/atractivos/lagunas-negras-jimbura.webp",
  // Gonzanama
  "gonzanama-cascada-la-banda": "/atractivos/cascada-la-banda-gonzanama.webp",
  // Sozoranga
  "sozoranga-reserva-el-tundo": "/atractivos/reserva-el-tundo-sozoranga.webp",
  // Chaguarpamba
  "chaguarpamba-cascadas-saraguallas": "/atractivos/cascadas-saraguallas.webp",
  // Quilanga
  "quilanga-lagunas-chuquiragua": "/atractivos/lagunas-chuquiragua-quilanga.webp",
  // Olmedo
  "olmedo-cerro-santa-barbara": "/atractivos/cerro-santa-barbara-olmedo.webp",
  // Macara
  "macara-reserva-jorupe": "/atractivos/reserva-jorupe-macara.webp",
  // Pindal
  "pindal-complejo-piscinas-naturales": "/atractivos/complejo-lagunas-pindal.webp",
  "pindal-bosque-seco-colinas": "/atractivos/complejo-lagunas-pindal.webp",
  "pindal-laguna-encantada": "/atractivos/complejo-lagunas-pindal.webp",
};

// Actualizar lib/data/atractivos.ts
let atractivosContent = fs.readFileSync('lib/data/atractivos.ts', 'utf8');

for (const [slug, imagen] of Object.entries(MAPEO)) {
  const regex = new RegExp(`(slug:\\s*"${slug}"[\\s\\S]*?imagen:\\s*")[^"]+(")`, 'g');
  atractivosContent = atractivosContent.replace(regex, `$1${imagen}$2`);
}

fs.writeFileSync('lib/data/atractivos.ts', atractivosContent, 'utf8');
console.log('atractivos.ts actualizado con éxito.');

// Actualizar lib/data/guias.ts
const MAPEO_GUIAS = {
  "bosque-petrificado-puyango-guia": "/atractivos/bosque-petrificado-puyango.webp",
  "zapotillo-guayacanes-bosque-seco": "/atractivos/guayacanes-zapotillo.webp",
  "espindola-lagunas-negras-yacuri": "/atractivos/lagunas-negras-jimbura.webp",
  "calvas-cariamanga-cerro-ahuaca": "/atractivos/cerro-el-ahuaca.webp",
  "que-hacer-en-macara-y-la-frontera": "/atractivos/reserva-jorupe-macara.webp",
  "quilanga-ruta-cafe-mirador-chiro": "/atractivos/lagunas-chuquiragua-quilanga.webp"
};

let guiasContent = fs.readFileSync('lib/data/guias.ts', 'utf8');
for (const [slug, imagen] of Object.entries(MAPEO_GUIAS)) {
  const regex = new RegExp(`(slug:\\s*"${slug}"[\\s\\S]*?imagen:\\s*")[^"]+(")`, 'g');
  guiasContent = guiasContent.replace(regex, `$1${imagen}$2`);
}
fs.writeFileSync('lib/data/guias.ts', guiasContent, 'utf8');
console.log('guias.ts actualizado con éxito.');
