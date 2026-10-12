const mysql = require('mysql2/promise');

async function fixVideoMockup() {
  const conn = await mysql.createConnection({
    host: 'mysql.us.stackcp.com',
    port: 45486,
    user: 'blogagendaturistica-3139314513',
    password: 'EnmjwYbg6&&-',
    database: 'blogagendaturistica-3139314513'
  });

  const [rows] = await conn.query('SELECT slug, contenido FROM blog_posts WHERE slug = "como-lograr-que-turistas-encuentren-recuerden-finca-cafeteria-loja"');
  let cont = rows[0].contenido;

  // Reemplazar el div falso de aspecto negro por el reproductor interactivo real de Mac Miller
  const startIdx = cont.indexOf('<div class="rounded-2xl overflow-hidden aspect-video bg-[#17201B]');
  if (startIdx !== -1) {
    const endIdx = cont.indexOf('</div>', cont.indexOf('Los apartados 1, 2 y 3 desarrollan'));
    if (endIdx !== -1) {
      const fullEndIdx = endIdx + 6; // después del </div>
      cont = cont.substring(0, startIdx) + 'https://youtu.be/SsKT0s5J8ko' + cont.substring(fullEndIdx);
    }
  }

  // Asegurar que video_url esté grabado
  await conn.execute(
    'UPDATE blog_posts SET contenido = ?, video_url = ? WHERE slug = ?',
    [cont, 'https://youtu.be/SsKT0s5J8ko', rows[0].slug]
  );

  console.log('✅ REEMPLAZADO CON ÉXITO POR EL VIDEO REAL!');
  await conn.end();
}

fixVideoMockup().catch(console.error);
