const https = require('https');

const seedsDescubre = [
  'descubre loja',
  'descubre loja ecuador',
  'descubre loja turismo',
  'descubrir loja',
  'descubreloja',
  'descubre loja cantones'
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

async function auditarDescubreLoja() {
  console.log('=== AUDITORÍA ESPECÍFICA: "¿DESCUBRE LOJA" TIENE DEMANDA EN GOOGLE ECUADOR? ===\n');

  for (const s of seedsDescubre) {
    const res = await fetchSuggest(s);
    console.log(`[Consulta: "${s}"] -> Sugerencias de Google:`, res.suggestions.length > 0 ? res.suggestions : '(Ninguna sugerencia autocompletada por Google)');
  }

  // Comparamos contra la variante popular con letras para ver si Google la asocia
  const letras = ['a','e','i','o','u','c','v','s'];
  console.log('\n--- Expansión profunda de "descubre loja [letra]" ---');
  for (const l of letras) {
    const res = await fetchSuggest(`descubre loja ${l}`);
    if (res.suggestions.length > 0) {
      console.log(`   -> [descubre loja ${l}]:`, res.suggestions);
    }
  }
}

auditarDescubreLoja();
