const https = require('https');

// Lista semilla de términos para explorar en el motor de sugerencias de Google (Ecuador / es)
const seeds = [
  'turismo loja',
  'lugares turisticos loja',
  'que hacer en loja',
  'loja turismo',
  'visitar loja',
  'agenda loja',
  'eventos loja',
  'atractivos loja',
  'vilcabamba que hacer',
  'turismo saraguro',
  'viajar a loja',
  'tours loja ecuador',
  'hoteles loja ecuador'
];

function fetchSuggest(query) {
  return new Promise((resolve) => {
    const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=es&gl=ec&q=${encodeURIComponent(query)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ query, suggestions: parsed[1] || [] });
        } catch (e) {
          resolve({ query, suggestions: [] });
        }
      });
    }).on('error', () => resolve({ query, suggestions: [] }));
  });
}

async function run() {
  console.log('=== EXTRAYENDO CONSULTAS REALES DE USUARIOS EN GOOGLE (ECUADOR) ===\n');
  const allResults = {};

  for (const seed of seeds) {
    const res = await fetchSuggest(seed);
    allResults[seed] = res.suggestions;
  }

  // Ahora hacer expansión con letras del abecedario para "que hacer en loja" y "turismo loja"
  console.log('--- Expansión profunda: "que hacer en loja [a-z]" ---');
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','n','p','r','s','v'];
  const deepResults = [];

  for (const letter of alphabet) {
    const query = `que hacer en loja ${letter}`;
    const res = await fetchSuggest(query);
    if (res.suggestions.length > 0) {
      deepResults.push(...res.suggestions);
    }
  }

  // Y para "lugares turisticos de loja [a-z]"
  console.log('--- Expansión profunda: "lugares turisticos de loja [a-z]" ---');
  for (const letter of ['c','e','f','n','v','s']) {
    const query = `lugares turisticos de loja ${letter}`;
    const res = await fetchSuggest(query);
    if (res.suggestions.length > 0) {
      deepResults.push(...res.suggestions);
    }
  }

  console.log('\n--- RESULTADOS POR INTENCIÓN BASE ---');
  for (const [seed, list] of Object.entries(allResults)) {
    console.log(`\n[Semilla: "${seed}"]`);
    list.forEach(s => console.log(`   * ${s}`));
  }

  console.log('\n--- BÚSQUEDAS ESPECÍFICAS LONG-TAIL (USUARIOS REALES) ---');
  const uniqueDeep = Array.from(new Set(deepResults));
  uniqueDeep.forEach(s => console.log(`   -> ${s}`));
}

run();
