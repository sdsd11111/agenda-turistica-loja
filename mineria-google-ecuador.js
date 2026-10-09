const https = require('https');

// Lista exhaustiva de cantones, atractivos y patrones turísticos de Ecuador
const cantones = [
  'loja', 'vilcabamba', 'catamayo', 'saraguro', 'malacatos', 'calvas', 'cariamanga',
  'puyango', 'zapotillo', 'macara', 'celica', 'pindal', 'chaguarpamba', 'olmedo',
  'gonzanama', 'sozoranga', 'quilanga', 'espindola'
];

const patrones = [
  'turismo en [CANTON] ecuador',
  'lugares turisticos de [CANTON] ecuador',
  'que visitar en [CANTON]',
  'que hacer en [CANTON] ecuador',
  'atractivos de [CANTON]',
  'hoteles en [CANTON] ecuador',
  'hosterias en [CANTON]'
];

const preguntasEcuador = [
  'como llegar a loja desde quito',
  'como llegar a loja desde guayaquil',
  'como llegar a loja desde cuenca',
  'que conocer en loja ecuador',
  'donde ir en loja ecuador',
  'sitios turisticos de loja ecuador',
  'ruta turistica loja ecuador',
  'feriado en loja que hacer',
  'florecimiento de los guayacanes zapotillo',
  'bosque petrificado de puyango como llegar',
  'parque podocarpus loja senderismo',
  'cascadas en loja ecuador',
  'miradores en loja ecuador'
];

function fetchSuggest(query) {
  return new Promise((resolve) => {
    // Configurado estrictamente para Google Ecuador (gl=ec, hl=es)
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

async function minarTodo() {
  console.log('=== MINERÍA MASIVA DE BÚSQUEDAS EN GOOGLE ECUADOR ===\n');

  const hallazgos = {};

  // 1. Minar preguntas generales de Ecuador
  console.log('--- 1. Minando preguntas de viaje a Loja desde otras provincias de Ecuador ---');
  for (const q of preguntasEcuador) {
    const res = await fetchSuggest(q);
    if (res.suggestions.length > 0) {
      hallazgos[q] = res.suggestions;
    }
  }

  // 2. Minar por cantón
  console.log('--- 2. Minando cantón por cantón ---');
  for (const canton of cantones) {
    for (const pat of patrones.slice(0, 3)) {
      const q = pat.replace('[CANTON]', canton);
      const res = await fetchSuggest(q);
      if (res.suggestions.length > 0) {
        hallazgos[q] = res.suggestions;
      }
    }
  }

  // 3. Minar temas específicos de alta demanda turística
  console.log('--- 3. Minando atractivos icónicos (Guayacanes, Puyango, Podocarpus, Ahuaca) ---');
  const iconos = [
    'guayacanes zapotillo',
    'bosque petrificado puyango',
    'parque nacional podocarpus',
    'cerro mandango',
    'valle de vilcabamba',
    'santuario del cisne',
    'cerro ahuaca cariamanga',
    'parque jipiro loja'
  ];

  for (const ic of iconos) {
    const res = await fetchSuggest(ic);
    if (res.suggestions.length > 0) {
      hallazgos[ic] = res.suggestions;
    }
  }

  console.log('\n=== RESULTADOS CONSOLIDADOS (CONSULTAS REALES EN GOOGLE ECUADOR) ===\n');
  for (const [busqueda, sugerencias] of Object.entries(hallazgos)) {
    console.log(`[Consulta: "${busqueda}"]`);
    sugerencias.forEach(s => console.log(`   -> ${s}`));
  }
}

minarTodo();
