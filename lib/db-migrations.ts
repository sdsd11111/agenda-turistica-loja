/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  MIGRACIONES AUTOMÁTICAS — TURISTICA_DB_URL                             ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * Este archivo aplica migraciones seguras (idempotentes) a la DB compartida
 * TURISTICA_DB_URL (agendatursticdinamic-31383916da en stackcp.com).
 *
 * ─── HISTORIAL DE CAMBIOS DE DB ──────────────────────────────────────────
 *
 *  v1 — 2026-10-19  (Agenda Turística Loja)
 *  Tabla    : aliados
 *  Cambio   : ADD COLUMN `canton` VARCHAR(50) NULL DEFAULT NULL
 *  Motivo   : Permite asignar explícitamente el cantón de Loja al que
 *             pertenece cada aliado. Sin este campo, el cantón se detectaba
 *             automáticamente por texto de `ubicacion`, generando
 *             clasificaciones incorrectas. Con el campo explícito, el
 *             selector en /admin asigna el cantón y prevalece sobre la
 *             detección automática (que queda como fallback).
 *
 *  Impacto en otros proyectos que comparten esta DB:
 *    - La columna es NULLABLE → no rompe ningún INSERT/SELECT existente
 *      que no la mencione.
 *    - Chatbots compartidos (Agenda Cultural, QueComerEnLoja, etc.) y sus
 *      queries NO requieren ningún cambio; la columna es ignorada si no se
 *      la solicita explícitamente.
 *    - Solo es leída/escrita por lib/aliados-service.ts de este proyecto.
 *
 * ─── AVISO PARA EL EQUIPO ─────────────────────────────────────────────────
 *  Si trabajas con la misma DB (agendatursticdinamic-31383916da), la tabla
 *  `aliados` ahora tiene una columna adicional:
 *    `canton`  VARCHAR(50)  NULL  — slug del cantón (ej: "paltas", "loja")
 *  Tus queries existentes NO se ven afectadas.
 * ─────────────────────────────────────────────────────────────────────────
 */

import { getTurismoDbPool } from './db-turismo';

let migrationsDone = false;

export async function runMigrations(): Promise<void> {
  if (migrationsDone) return;
  migrationsDone = true; // evitar re-entradas concurrentes

  const pool = getTurismoDbPool();

  try {
    // ── Migración v1: Agregar columna `canton` a la tabla `aliados` ──────
    // Usamos ADD COLUMN + capturamos el error 1060 (columna duplicada),
    // lo cual convierte la migración en idempotente.
    await pool.query(`
      ALTER TABLE aliados
      ADD COLUMN canton VARCHAR(50) NULL DEFAULT NULL
      COMMENT 'Slug del cantón de Loja al que pertenece el aliado (ej: paltas, loja, saraguro). Prevalece sobre detección automática por texto.'
    `).catch((err: any) => {
      if (err?.errno !== 1060 && err?.code !== 'ER_DUP_FIELDNAME') {
        throw err;
      }
      // Si la columna ya existe simplemente continuamos
    });

    console.log('[DB Migrations] TURISTICA_DB_URL: migraciones aplicadas correctamente.');
  } catch (err) {
    // No bloqueamos el arranque de la app ante errores de migración
    console.error('[DB Migrations] Error al aplicar migraciones:', err);
  }
}
