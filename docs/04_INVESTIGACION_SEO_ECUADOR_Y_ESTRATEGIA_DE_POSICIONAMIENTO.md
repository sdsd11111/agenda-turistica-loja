# 04_INVESTIGACION_SEO_ECUADOR_Y_ESTRATEGIA_DE_POSICIONAMIENTO.md
**Proyecto:** Agenda Turística Loja (`agendaturisticaloja.com`)  
**Estatus:** Auditoría de Datos Reales en Google Search Console y Minería en Google Ecuador (`gl=ec, hl=es`)  
**Fecha:** Octubre 2026  

---

## 1. Metodología de Investigación y Fuentes de Datos Reales

A diferencia de estimaciones genéricas o herramientas teóricas con datos globales, esta investigación se ejecutó directamente contra:
1. **Google Search Console API (Oficial):** Cuenta de servicio conectada a las propiedades reales en Loja (`sc-domain:agendaturisticaloja.com`, `sc-domain:agendaculturalloja.com` y `hotelelcardenalloja.com`).
2. **Google Suggest & Complete API (Ecuador estricto `gl=ec`):** Minería de los patrones algorítmicos que Google autocompleta para los usuarios conectados desde Ecuador al buscar viajes, cantones y transporte hacia Loja.

---

## 2. Hallazgos Críticos de Demanda Real

### A. Diagnóstico de Marca vs. Intención
* **El Dominio (`agendaturisticaloja.com`):** Es una propiedad en fase de indexación (0 impresiones históricas registradas). Tiene el campo libre para rankear sin penalizaciones ni canibalización previa.
* **El Error a Evitar:** La búsqueda `"agenda loja"` compite contra tiendas de retail brasileñas (*"lojas americanas agenda"*). La búsqueda `"turismo loja"` choca con *Loja, Granada (España)*.
* **La Solución Obligatoria:** En toda la arquitectura web, los títulos y metadatos deben explicitar **"Loja, Ecuador"**, asociando los nombres de los 16 cantones y atractivos insignia.

---

## 3. Matriz de Palabras Clave Reales de Alto Tráfico en Ecuador

### Núcleo 1: Búsquedas de Origen y Planificación (Top of Funnel)
Usuarios de Pichincha, Guayas y Azuay planificando su viaje antes de llegar:
* `"como llegar a loja desde quito"`
* `"como llegar a loja desde guayaquil"` / `"como viajar a loja desde guayaquil"`
* `"como llegar a loja desde cuenca"`
* `"lugares turisticos de loja y sus cantones"`
* `"que visitar en la provincia de loja"`
* `"que visitar en loja y alrededores"`

### Núcleo 2: Los 7 Imanes de Tráfico Insignia (Consultas Específicas)
Estas entidades retienen el mayor volumen de intención directa:
1. **Zapotillo / Guayacanes:**
   * `"florecimiento de los guayacanes zapotillo 2026"`
   * `"cuándo es el florecimiento de los guayacanes en zapotillo"`
   * `"hotel los guayacanes zapotillo"`
2. **Puyango / Bosque Petrificado:**
   * `"bosque petrificado puyango como llegar"`
   * `"bosque petrificado de puyango horarios de atencion"`
   * `"bosque petrificado de puyango a que provincia pertenece"`
3. **Vilcabamba / Senderismo y Descanso:**
   * `"que hacer en vilcabamba loja"`
   * `"cerro mandango como llegar"` / `"cerro mandango altura"`
   * `"hoteles vilcabamba loja ecuador"` / `"hosterias en vilcabamba"`
4. **Parque Nacional Podocarpus:**
   * `"parque nacional podocarpus loja"`
   * `"parque nacional podocarpus como llegar"`
   * `"podocarpus flora y fauna"`
5. **El Cisne / Turismo Religioso:**
   * `"santuario del cisne loja"`
   * `"santuario del cisne horario de misas"`
   * `"santuario virgen del cisne ecuador"`
6. **Loja Capital / Centro y Recreación:**
   * `"parque jipiro loja horarios"` / `"parque jipiro como llegar"`
   * `"puerta de la ciudad loja"`
   * `"parque eolico villonaco"`
7. **Calvas / Cariamanga:**
   * `"cerro ahuaca cariamanga"`
   * `"que visitar en cariamanga"`

### Núcleo 3: Consultas de Salida y Tiempo Real (Short-Tail Recurrente)
Extraídas con CTR de hasta el 20% en Google Search Console:
* `"eventos loja hoy"`
* `"que hacer en loja este fin de semana"` / `"que hacer en loja un fin de semana"`
* `"que hacer en loja hoy"`
* `"concierto en loja hoy"`
* `"eventos locales gratuitos esta semana"`
* `"festival de artes vivas loja 2026 fechas"`
* `"artes vivas loja 2026 programacion"`

### Núcleo 4: Consultas Cantonales Específicas
Búsquedas directas descubiertas:
* `"que visitar en catamayo"` / `"hoteles en catamayo loja ecuador"`
* `"turismo en saraguro"` / `"que visitar en saraguro"`
* `"que visitar en malacatos"`
* `"lugares turisticos de macara ecuador"` / `"hoteles macara loja ecuador"`
* `"lugares turisticos de pindal ecuador"`
* `"que visitar en gonzanama"`

---

## 4. Plan de Posicionamiento para la Home y Ecosistema Web

### Fase 1: Optimización Semántica de la Home (`/`)
La Home funciona como el **Hub Central** de distribución de autoridad:
1. **Meta Title:**
   * `Qué Hacer en Loja, Ecuador: 16 Cantones, Lugares Turísticos y Eventos 2026 | Agenda Turística Loja`
2. **Meta Description:**
   * `Guía oficial de turismo de la provincia de Loja, Ecuador. Descubre qué hacer en Vilcabamba, el Florecimiento de Guayacanes en Zapotillo, Bosque de Puyango, eventos de hoy y hoteles verificados.`
3. **Buscador Turístico (Transición Hero - Sección 2):**
   * Chips de filtrado rápido y sugerencias optimizadas con las búsquedas reales: `Vilcabamba`, `Guayacanes`, `Bosque de Puyango`, `Saraguro`, `Podocarpus`, `El Cisne`, `Auxilio Mecánico`.
4. **Sección 2 (Cards de Decisión):**
   * Botones de ruta guiada con intenciones comprobadas:
     * *“Ruta 1: Vilcabamba y Cerro Mandango (2-3 días)”*
     * *“Ruta 2: Zapotillo y Bosque Petrificado de Puyango”*
     * *“Ruta 3: Saraguro intercultural y tradiciones andinas”*
5. **Sección 3 (Qué hay en Loja):**
   * Integración con la cartelera para capturar: *"¿Qué hay hoy en Loja?"* y eventos del fin de semana.

### Fase 2: Arquitectura de Silos por Cantón (`/cantones/[slug]`)
Cada una de las 16 páginas cantonales captura su intención transaccional:
* URL canónica: `/cantones/zapotillo` -> Ataca `"turismo zapotillo"`, `"guayacanes zapotillo fechas"`, `"hoteles zapotillo"`.
* URL canónica: `/cantones/puyango` -> Ataca `"bosque petrificado puyango como llegar"`, `"hoteles alamor"`.
* URL canónica: `/cantones/calvas` -> Ataca `"cerro ahuaca cariamanga"`, `"que visitar en cariamanga"`.

### Fase 3: Guías de Tráfico Long-Tail (`/descubre-loja/[slug]`)
Artículos editoriales diseñados para responder las preguntas de viaje directas:
* `/descubre-loja/como-llegar-a-loja-desde-quito-guayaquil-cuenca`
* `/descubre-loja/guia-florecimiento-de-los-guayacanes-zapotillo-2026`
* `/descubre-loja/como-visitar-el-bosque-petrificado-de-puyango`
* `/descubre-loja/cerro-mandango-vilcabamba-senderismo-y-consejos`

### Fase 4: Datos Estructurados JSON-LD (Schema.org)
Implementación en código para que Google genere Rich Snippets y sitelinks en los resultados:
* `TouristDestination` para la provincia de Loja y sus 16 cantones.
* `TouristInformationCenter` para el portal institucional.
* `Event` sincronizado con la cartelera semanal y el Festival de Artes Vivas 2026.
* `FAQPage` respondiendo: *¿Cómo llegar a Loja?*, *¿Cuál es la mejor fecha para visitar los Guayacanes?*, *¿Qué clima hay en Vilcabamba?*.

---

## 5. Protocolo de Monitoreo Continuo y Expansión

Para seguir descubriendo nuevas palabras clave en los próximos meses:
1. **Script de Auditoría Automática GSC (`consultar-gsc.js`):**
   * Ejecución mensual contra la Service Account para extraer queries con más de 20 impresiones y optimizar las páginas que alcancen posiciones 8 a 20 (oportunidades de página 1).
2. **Minería de Tendencias Estacionales (`mineria-google-ecuador.js`):**
   * Correr en:
     * **Diciembre - Enero:** Para captar la ventana exacta de lluvias del Florecimiento de Guayacanes.
     * **Agosto - Septiembre:** Para la peregrinación del Santuario de El Cisne y la Feria de Loja.
     * **Octubre - Noviembre:** Para el pico máximo del Festival Internacional de Artes Vivas Loja.
