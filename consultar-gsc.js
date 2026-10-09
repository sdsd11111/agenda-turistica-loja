const { google } = require('googleapis');
const path = require('path');

async function consultarSearchConsole() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'gsc-key.json'),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    console.log('--- 1. Listando sitios accesibles ---');
    const sitesRes = await searchconsole.sites.list();
    console.log('Sitios encontrados:', JSON.stringify(sitesRes.data.siteEntry, null, 2));

    const siteUrl = 'sc-domain:agendaturisticaloja.com';
    console.log(`\n--- 2. Consultando keywords de ${siteUrl} (últimos 90 días) ---`);

    const hoy = new Date();
    const hace90Dias = new Date();
    hace90Dias.setDate(hoy.getDate() - 90);

    const startDate = hace90Dias.toISOString().split('T')[0];
    const endDate = hoy.toISOString().split('T')[0];

    const performanceRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 25,
      },
    });

    console.log('Palabras clave (queries):');
    if (performanceRes.data.rows && performanceRes.data.rows.length > 0) {
      performanceRes.data.rows.forEach(r => {
        console.log(`- "${r.keys[0]}": Clics: ${r.clicks}, Impresiones: ${r.impressions}, CTR: ${(r.ctr * 100).toFixed(1)}%, Posición: ${r.position.toFixed(1)}`);
      });
    } else {
      console.log('Sin filas de queries aún registradas en este rango.');
    }

    console.log(`\n--- 3. Consultando páginas con impresiones ---`);
    const pagesRes = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 15,
      },
    });

    if (pagesRes.data.rows && pagesRes.data.rows.length > 0) {
      pagesRes.data.rows.forEach(r => {
        console.log(`- ${r.keys[0]}: Clics: ${r.clicks}, Impresiones: ${r.impressions}`);
      });
    } else {
      console.log('Sin páginas aún registradas en el índice con tráfico.');
    }

  } catch (error) {
    console.error('Error al consultar Search Console API:', error.message);
    if (error.response && error.response.data) {
      console.error('Detalles del error:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

consultarSearchConsole();
