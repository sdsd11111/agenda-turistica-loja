# 📋 Plan y Matriz de Posicionamiento SEO 2026: Agenda Turística Loja

Este documento resume la estrategia de palabras clave reales extraídas de **Google Keyword Planner** y **Google Trends**, y cómo están aplicadas en la arquitectura, títulos, metadatos y páginas de `agendaturisticaloja.com`.

---

## 1. Datos Clave de Mercado (Google Keyword Planner & Trends)

| Término de Búsqueda Exacto | Volumen Estimado (Búsquedas/mes) | Intención del Usuario | Destino en la Web |
|---|---|---|---|
| **lugares turisticos de loja** | **1.000 – 10.000** | Inspiracional y exploración provincial | `/` (Home) y `/atractivos` |
| **que hacer en loja** | **1.000 – 5.000** | Planes, fines de semana e itinerarios | `/` (Home) y `/descubre-loja` |
| **bosque petrificado puyango** | **1.000 – 5.000** | Información arqueológica, cómo llegar y fósiles | `/descubre-loja/bosque-petrificado-puyango-guia` |
| **hoteles en loja** / **vilcabamba** | **1.000 – 5.000** | Transaccional: dónde dormir sin comisiones | `/hospedaje` y `/hospedaje/[slug]` |
| **virgen del cisne** / **romeria** | **Picos de 10.000+** | Rutas, etapas y fechas de agosto | `/descubre-loja/romeria-virgen-del-cisne-loja` |
| **cantones de loja** / **16 cantones** | **100 – 1.000** | Geografía y turismo cantonal | `/cantones` y `/cantones/[slug]` |
| **auxilio mecanico loja** / **gruas** | **100 – 500** | Emergencias y auxilio vial en carretera | `/auxilio-en-ruta` |

---

## 2. Configuración Global de Encabezados e Identidad Técnica

- **Favicon & Iconos**:
  - `icon.svg` configurado globalmente en `app/layout.tsx` para `icon`, `shortcut` y `apple-touch-icon`.
- **Plantilla de Títulos (`title.template`)**:
  - `%s | Agenda Turística Loja`
- **OpenGraph & Redes Sociales**:
  - Configurado en `app/layout.tsx` con locale `es_EC`, tipo `website`, canonicals dinámicos y descripciones optimizadas.
- **Indexación y Rastreo**:
  - `robots.ts` permite el rastreo general de bots (`*`) y apunta al sitemap.
  - `sitemap.ts` indexa dinámicamente las 46 rutas del sitio: estáticas, 16 cantones, guías y hospedajes.

---

## 3. Matriz de Metadatos por Página

### 🏠 Home (`/`)
- **Title (Default)**: `Lugares Turísticos y Qué Hacer en Loja: 16 Cantones y Agenda 2026`
- **H1**: `Lugares Turísticos y Qué Hacer en Loja`
- **H2 #1**: `Lugares Turísticos Más Visitados y Rutas de Loja`
- **H2 #2**: `¿Qué hacer en Loja hoy y este fin de semana?`
- **Keywords**: `lugares turisticos de loja`, `que hacer en loja`, `turismo loja ecuador`, `bosque petrificado puyango`, `vilcabamba loja`, `hoteles en loja`, `hoteles en vilcabamba`, `guayacanes zapotillo`, `virgen del cisne`.

### 🏨 Hospedaje (`/hospedaje`)
- **Title**: `Hoteles en Loja y Vilcabamba: Hosterías y Hospedaje Directo sin Comisiones`
- **Description**: Encuentra hoteles en Loja, hosterías en Vilcabamba y hospedaje en los 16 cantones de la provincia. Contacto directo por WhatsApp al mejor precio y sin comisiones.
- **Keywords**: `hoteles en loja`, `hoteles en vilcabamba`, `hospedaje en loja ecuador`, `hosterias en loja`, `donde alojarse en vilcabamba`.

### 🗺️ Atractivos Turísticos (`/atractivos`)
- **Title**: `Lugares Turísticos de Loja: 16 Cantones, Bosque Puyango, Vilcabamba y Podocarpus`
- **Description**: Descubre los mejores lugares turísticos de Loja, Ecuador: el Bosque Petrificado de Puyango, Vilcabamba, Parque Nacional Podocarpus, Florecimiento de Guayacanes y atractivos en 16 cantones.
- **Keywords**: `lugares turisticos de loja`, `que hacer en loja ecuador`, `bosque petrificado puyango`, `vilcabamba loja`, `parque nacional podocarpus`.

### 🏞️ Los 16 Cantones (`/cantones`)
- **Title**: `Los 16 Cantones de Loja: Guía Turística Completa, Rutas y Atractivos`
- **Description**: Explora los 16 cantones de la provincia de Loja, Ecuador: atractivos turísticos, clima, gastronomía y hospedaje en Saraguro, Calvas, Puyango, Zapotillo, Macará y más.
- **Keywords**: `cantones de loja`, `16 cantones de loja`, `turismo provincia de loja`, `saraguro loja`, `calvas cariamanga`, `puyango loja`.

### 📖 Guías y Rutas (`/descubre-loja`)
- **Title**: `Guías de Viaje de Loja: Rutas, Qué Hacer, Bosque Puyango y Vilcabamba`
- **Description**: Guías turísticas completas y rutas de viaje en la provincia de Loja, Ecuador: itinerarios de 3 días, qué hacer en Vilcabamba, Saraguro, Parque Podocarpus y cómo llegar.
- **Keywords**: `que hacer en loja ecuador`, `guias turisticas loja`, `rutas loja ecuador`, `que hacer en vilcabamba`, `bosque petrificado puyango guia`.

### 🚨 Auxilio en Ruta (`/auxilio-en-ruta`)
- **Title**: `Auxilio Mecánico en Carretera Loja: Grúas, Talleres y Gasolineras 24/7`
- **Keywords**: `auxilio mecanico loja`, `grua loja ecuador`, `taller mecanico loja`, `auxilio en carretera loja`.

### 🤝 Para Negocios (`/para-negocios`)
- **Title**: `Para Negocios Turísticos: Afilia tu Hotel, Hostería o Tour en Loja`
- **Keywords**: `publicidad turistica loja`, `promocionar hotel en loja`, `directorio de hoteles loja`.

### 🏛️ Gobiernos Cantonales (`/municipios`)
- **Title**: `Convenios Turísticos para Gobiernos Cantonales y GAD de Loja`
- **Keywords**: `gad municipales loja`, `turismo cantones loja`, `convenio turistico cantonal`.

### 💬 Contacto (`/contacto`)
- **Title**: `Contacto, Sugerencias y Registro de Negocios Turísticos en Loja`

---

## 4. Fichas Dinámicas Automatizadas

1. **Cada Cantón (`/cantones/[slug]`)**:
   - Title: `Turismo en [Cantón]: Qué Hacer, Atractivos y Hospedaje`
   - Genera OpenGraph con imagen propia y keywords específicas de cada cantón.
2. **Cada Hospedaje (`/hospedaje/[slug]`)**:
   - Title: `[Hotel]: [Tipo] en [Cantón], Loja (Contacto Directo)`
   - Description transaccional con tarifa mínima `desde` y llamada a la acción de WhatsApp.
3. **Cada Guía Editorial (`/descubre-loja/[slug]`)**:
   - Metadata estructurada `schema.org/Article` para enriquecer snippets de búsqueda.
