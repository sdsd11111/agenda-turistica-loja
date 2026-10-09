const { google } = require('googleapis');
const path = require('path');

async function consultarSitiosHermanos() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'gsc-key.json'),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const hoy = new Date();
    const hace180Dias = new Date();
    hace180Dias.setDate(hoy.getDate() - 180);

    const startDate = hace180Dias.toISOString().split('T')[0];
    const endDate = hoy.toISOString().split('T')[0];

    const sitios = [
      'sc-domain:agendaculturalloja.com',
      'https://hotelelcardenalloja.com/'
    ];

    for (const siteUrl of sitios) {
      console.log(`\n======================================================`);
      console.log(`CONSULTANDO: ${siteUrl}`);
      console.log(`======================================================`);

      const queryRes = await searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['query'],
          rowLimit: 40,
        },
      });

      if (queryRes.data.rows && queryRes.data.rows.length > 0) {
        // Ordenar por impresiones descendente
        queryRes.data.rows.sort((a, b) => b.impressions - a.impressions);
        queryRes.data.rows.forEach(r => {
          console.log(`[Impresiones: ${r.impressions} | Clics: ${r.clicks} | CTR: ${(r.ctr * 100).toFixed(1)}% | Posición: ${r.position.toFixed(1)}] -> "${r.keys[0]}"`);
        });
      } else {
        console.log(`Sin datos de queries en este periodo.`);
      }
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

consultarSitiosHermanos();
