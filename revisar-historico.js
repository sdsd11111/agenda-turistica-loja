const { google } = require('googleapis');
const path = require('path');

async function consultarTodoGSC() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'gsc-key.json'),
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    // Consultemos 16 meses (el máximo que guarda Google Search Console)
    const hoy = new Date();
    const hace16Meses = new Date();
    hace16Meses.setDate(hoy.getDate() - 480);

    const startDate = hace16Meses.toISOString().split('T')[0];
    const endDate = hoy.toISOString().split('T')[0];

    console.log(`Consultando agenda turistica loja desde ${startDate} hasta ${endDate}...`);

    const siteUrl = 'sc-domain:agendaturisticaloja.com';

    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 50,
      },
    });

    console.log('RESULTADO DE QUERIES:');
    console.log(JSON.stringify(res.data, null, 2));

    const sitemapsRes = await searchconsole.sitemaps.list({ siteUrl });
    console.log('\nSITEMAPS ENVIADOS:');
    console.log(JSON.stringify(sitemapsRes.data, null, 2));

  } catch (err) {
    console.error('Error:', err.message);
  }
}

consultarTodoGSC();
