# Registro de Cambios en Base de Datos (DB Changelog)

**Base de datos:** agendatursticdinamic-31383916da (vía TURISTICA_DB_URL)
**Fecha:** 19 de Octubre de 2026
**Proyecto:** Agenda Turística Loja

---

## 1. Migración: Columna canton en tabla liados

### Detalle del cambio SQL
`sql
ALTER TABLE aliados 
ADD COLUMN canton VARCHAR(50) NULL DEFAULT NULL 
AFTER numeroCuartos;
`

### Motivo y Funcionamiento
Anteriormente, el cantón del aliado se deducía exclusivamente analizando el texto en los campos ubicacion y descripcion. Si un hospedaje de Paltas, Catamayo o Saraguro incluía la palabra "Loja" en su dirección de referencia, el algoritmo lo clasificaba erróneamente en el cantón Loja.

Con este campo:
1. El panel de administración (/admin) permite seleccionar explícitamente el cantón correspondiente al aliado.
2. Las páginas de cada cantón (/cantones/[slug], ej. /cantones/paltas) muestran con precisión los aliados reales de ese cantón.
3. Si el campo está vacío (aliados antiguos), se mantiene la detección automática por texto como fallback para no romper nada.
4. Si un cantón no tiene ningún aliado asignado, se despliegan automáticamente las tarjetas de "Plaza Libre".

---

## 2. Compatibilidad con otros proyectos

La base de datos es compartida con otros proyectos del ecosistema (como Agenda Cultural, Que Comer en Loja, o chatbots):

- **Columna NULLABLE:** No afecta en absoluto a sentencias INSERT o UPDATE de otros proyectos que no incluyan este campo.
- **Sincronización Prisma:** El modelo aliados en prisma/schema.prisma fue sincronizado con canton String? @db.VarChar(50).
- **Mecanismo de migración:** Se encuentra centralizado e idempotente en lib/db-migrations.ts.
