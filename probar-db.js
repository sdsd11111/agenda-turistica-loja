const mysql = require('mysql2/promise');

async function testConnection() {
  const configs = [
    {
      name: "Remote External Host",
      host: "mysql.us.stackcp.com",
      port: 45486,
      user: "blogagendaturistica-3139314513",
      password: "EnmjwYbg6&&-",
      database: "blogagendaturistica-3139314513",
      connectTimeout: 8000
    },
    {
      name: "Hosting Internal Host",
      host: "sdb-k.hosting.stackcp.net",
      port: 3306,
      user: "blogagendaturistica-3139314513",
      password: "EnmjwYbg6&&-",
      database: "blogagendaturistica-3139314513",
      connectTimeout: 8000
    }
  ];

  for (const c of configs) {
    console.log(`Probando conexión con: ${c.name} (${c.host}:${c.port})...`);
    try {
      const conn = await mysql.createConnection(c);
      console.log(`✅ Conexión exitosa con ${c.name}!`);
      const [rows] = await conn.query('SHOW TABLES');
      console.log('Tablas en la BD:', rows);
      await conn.end();
      return c;
    } catch (err) {
      console.log(`❌ Error con ${c.name}:`, err.message);
    }
  }
}

testConnection();
