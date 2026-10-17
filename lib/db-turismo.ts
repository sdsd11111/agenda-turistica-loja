import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getTurismoDbPool() {
  if (!pool) {
    const dbUrl = process.env.TURISTICA_DB_URL || 'mysql://agendatursticdinamic-31383916da:-fr%3F%23I%7DoZVxb@mysql.us.stackcp.com:46132/agendatursticdinamic-31383916da';
    const parsed = new URL(dbUrl);

    pool = mysql.createPool({
      host: parsed.hostname,
      port: Number(parsed.port) || 3306,
      user: decodeURIComponent(parsed.username),
      password: decodeURIComponent(parsed.password),
      database: parsed.pathname.replace('/', ''),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 10000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}
