# 05_AUDITORIA_DESCUBRE_LOJA_VS_INTENCION_REAL_Y_PLAN_HOME.md
**Proyecto:** Agenda Turística Loja (`agendaturisticaloja.com`)  
**Estatus:** Auditoría Específica de Marca ("Descubre Loja") vs Intención de Búsqueda Orgánica y Plan Maestro de la Home  
**Fecha:** Octubre 2026  

---

## 1. La Pregunta Crítica: ¿"Descubre Loja" tiene búsquedas reales en Google Ecuador?

Se corrió un extractor algorítmico específico contra Google Ecuador (`gl=ec, hl=es`) para evaluar el término `"descubre loja"` y sus variaciones:

### A. Datos Arrojados por Google:
* **`"descubre loja"`:** Aparece en el autocompletado como término único, pero **sin ninguna expansión long-tail** (`descubre loja ecuador`, `descubre loja cantones`, etc. arrojaron 0 sugerencias en el algoritmo).
* **Naturaleza del término:** Es un **lema / eslogan de marca y redes sociales**, utilizado con hashtags (`#DescubreLoja`) por entidades y plataformas como Facebook o campañas institucionales, pero **NO es la frase con la que un turista busca activamente en Google**.

### B. Comparativa Brutal: "Descubre Loja" vs Lo que la gente SÍ teclea en Google

| Término | Tipo de Intención | Volumen Real en Google Ecuador | Veredicto SEO |
| :--- | :--- | :--- | :--- |
| **`"descubre loja"`** | Marca / Eslogan | **Bajo** (búsqueda de marca/campaña) | Útil como concepto de branding y paraguas de guías, pero **insuficiente** para ganar tráfico masivo solo. |
| **`"que hacer en loja ecuador"`** | Intención Transaccional | **Muy Alto** (con decenas de sugerencias long-tail) | **Imprescindible**. La gente pregunta qué hacer hoy, este fin de semana, con niños, de noche. |
| **`"lugares turisticos de loja y sus cantones"`** | Intención de Exploración | **Muy Alto** (coincidencia exacta) | **El núcleo exacto** de nuestro proyecto (16 cantones). |
| **`"sitios turisticos de loja"`** | Intención Informativa | **Alto** | Debe estar como sinónimo en el contenido. |
| **`"que visitar en loja y alrededores"`** | Intención de Excursión | **Alto** | Ideal para enlazar Vilcabamba, Malacatos y Catamayo. |

---

## 2. La Solución Ganadora: La Fórmula "Marca + Intención"

Para no perder la identidad visual elegante que ya tenemos, aplicamos la **Fórmula Híbrida**:
> **Branding Visible** ("Descubre Loja") + **Keyword Transaccional para Google** ("Qué hacer en Loja: Lugares turísticos de los 16 cantones").

De esta manera:
1. El usuario ve en la web una marca moderna y profesional (`Descubre Loja`).
2. Googlebot indexa la página para quienes buscan: *"qué hacer en loja"*, *"lugares turísticos de loja"* y *"qué visitar en la provincia de loja"*.

---

## 3. Plan Maestro de Textos para la Home (`/`)

### A. Nivel Metadatos (Lo que lee Google en el SERP)
* **`<title>`:**
  `Qué Hacer en Loja: 16 Cantones, Lugares Turísticos y Agenda 2026 | Descubre Loja`
* **`<meta name="description">`:**
  `Guía oficial de turismo de la provincia de Loja, Ecuador. Descubre qué hacer en Vilcabamba, Guayacanes de Zapotillo, Bosque de Puyango, eventos de hoy y lugares turísticos de los 16 cantones.`

---

### B. Sección 1: Hero Principal (H1)
* **Badge Superior (Space Grotesk):**
  `PROVINCIA DE LOJA, ECUADOR · 16 CANTONES`
* **H1 (Sora ExtraBold):**
  `Descubre Qué Hacer en Loja`
  *(O visualmente: "Descubre Loja" acompañado inmediatamente de la etiqueta semántica H1: "Descubre Qué Hacer en Loja: Lugares Turísticos y Agenda de los 16 Cantones")*
* **Párrafo Descriptivo (DM Sans):**
  `Tu guía completa de turismo en el sur del Ecuador. Encuentra qué visitar en Vilcabamba, el Florecimiento de Guayacanes en Zapotillo, senderos en el Parque Podocarpus, eventos de este fin de semana y hospedaje verificado.`
* **Botones CTA:**
  - `Planificar viaje (Itinerarios)` -> Lleva a `#seccion-decision`
  - `Explorar los 16 Cantones` -> Lleva a `/cantones`

---

### C. Transición Flotante: Buscador Turístico
* **Input Search (Placeholder optimizado):**
  `Busca qué hacer en Loja, Vilcabamba, cascadas, hoteles o cantones...`
* **Filtros Rápidos (Chips con demanda comprobada):**
  `16 Cantones` · `Lugares Turísticos` · `Hospedaje` · `Rutas e Itinerarios` · `📍 Cerca de mí` · `🚨 Auxilio en ruta`

---

### D. Sección 2: Las 2 Cards de Decisión (H2)
* **Encabezado:**
  - *Badge:* `PLANIFICA TU VISITA A LA PROVINCIA DE LOJA`
  - *H2:* `Lugares Turísticos y Rutas por Cantón`
  - *Párrafo:* `Explora el inventario de atractivos naturales y culturales o genera un itinerario a tu medida con nuestro Asesor IA.`
* **Card 1: "¿Qué hay?"**
  - *Label:* `01 · Directorio Provincial`
  - *H3:* `¿Qué visitar en Loja y sus cantones?`
  - *Párrafo:* `Atractivos icónicos, clima y patrimonio clasificado en los 16 cantones.`
  - *Chips rápidos:* `Vilcabamba` · `Zapotillo` · `Puyango` · `Saraguro` · `El Cisne` · `Catamayo`
* **Card 2: "¿Cómo lo organizo?"**
  - *Label:* `02 · Asesor IA de Viajes`
  - *H3:* `Itinerarios: ¿Qué hacer en Loja en 2 o 3 días?`
  - *Párrafo:* `Genera una ruta optimizada según tus días, presupuesto y preferencias de viaje.`
  - *Botones de consulta comprobados:*
    - `Ruta 2 días: Vilcabamba y Cerro Mandango`
    - `Ruta naturaleza: Guayacanes y Bosque Petrificado de Puyango`
    - `Ruta cultural: Saraguro intercultural y tradiciones andinas`

---

### E. Sección 3: "Qué hay en Loja" (Agenda y Tiempo Real)
* **Banner Transversal:**
  - *Label:* `AGENDA PROVINCIAL EN VIVO`
  - *H2:* `¿Qué hacer en Loja hoy y este fin de semana?`
  - *Párrafo:* `Cartelera cultural, ferias cantonales, conciertos y la programación oficial del Festival de Artes Vivas 2026.`
  - *CTA:* `Ver Agenda Cultural ↗`
* **Filtro Inmediato:**
  - Botón activo: `¿Qué hay hoy? (Planes inmediatos)`
  - Selector de cantones con eventos activos.

---

### F. Sección 4: Municipios Fundadores y Aliados
* **H2:** `Municipios Fundadores y Aliados Institucionales`
* **Párrafo:** `Convenios oficiales con los GADs cantonales y la red de operadores turísticos verificados de la provincia de Loja, Ecuador.`
