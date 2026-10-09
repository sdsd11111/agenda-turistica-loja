# 03_ARQUITECTURA_HOME_CANTONES_Y_EVENTOS.md
**Proyecto:** Agenda Turística Loja (`agendaturisticaloja.com`)  
**Estatus:** Especificación de UI/UX, Plantillas Reutilizables y Arquitectura SEO de Eventos  
**Referencia:** Decisiones tomadas en la sesión de diseño y arquitectura técnica.

---

## 1. Estructura Exacta de la Página Home (`/`)

La Home se estructura en **4 secciones troncales**, diseñada con mentalidad modular y Zero-App:

### Sección 1: Hero Principal
* **Concepto:** Portada visual inmersiva de alto impacto (fotografía/video de la provincia de Loja, texturas andinas y paleta cálida/natural).
* **Copywriting:** "Descubre Loja: 16 cantones, una provincia completa".
* **Llamado a la acción (CTA):** Acceso rápido a explorar cantones y buscar atractivos/hospedaje.

### Sección 2: Las 2 Cards de Decisión del Turista
* **Card 1: "¿Qué hay?" (Descubre Loja / Atractivos):**
  * Acceso directo al inventario de experiencias clasificadas por categorías: Naturaleza, Aventura, Cultura, Gastronomía.
* **Card 2: "¿Cómo lo organizo?" (Pop-up Asesor IA "Arma tu Ruta"):**
  * Abre el modal del Asesor IA conversacional turístico.
  * Permite al viajero ingresar: días disponibles, presupuesto, con quién viaja (familia, pareja, amigos) y preferencias para generar un itinerario sugerido en segundos.

### Sección 3: "Qué hay en Loja" (Banner + Eventos Activos)
* **Banner completo transversal:** "¿Qué hay en Loja hoy y este fin de semana?".
* **Eventos por Cantones:** Filtro rápido por cantón (Loja, Vilcabamba/Malacatos, Saraguro, Catamayo, etc.).
* **Filtro Inmediato: "¿Qué hay hoy?":** Cartelera para planes de consumo inmediato.
* **Integración con Agenda Cultural:** Enlace/sincronización con `agendaculturalloja.com` para eventos artísticos, ferias y conciertos.

### Sección 4: Municipios Fundadores y Aliados Institucionales
* Carrusel/grilla sobria con logos institucionales de confianza:
  * GAD Municipal de Loja (Municipio Fundador).
  * GADs Cantonales en convenio (Saraguro, Catamayo, etc.).
  * Marcas aliadas y operadores turísticos verificados (GuIAloja).

---

## 2. Plantilla Universal de Cantón (`/cantones/[slug]`)

Cada uno de los 16 cantones (Saraguro, Puyango, Calvas, etc.) funciona como una **"Home Reducida"**, garantizando que el diseño sea escalable y consistente sin rediseñar cada cantón desde cero.

### Componentes de la Plantilla Cantonal:
1. **Hero Cantonal Compacto:** Fotografía o video del cantón, cabecera cantonal, altura, clima y descripción esencial.
2. **Bloque "¿Qué hay en [Cantón]?":** Inventario de atractivos locales con filtros por etiquetas (Gastronomía, Aventura, Cultura, Naturaleza).
3. **Modal/Pop-up Asesor IA Contextualizado:**
   * El mismo botón "Arma tu ruta con IA", pero precargando el contexto del cantón seleccionado (ejemplo: *"Estás en Saraguro: ¿cuántos días te quedas?"*).
4. **Ancla / Sección "Agenda de Eventos en [Cantón]":**
   * Próximos eventos, ferias patronales o conciertos del cantón.
5. **Hospedaje Verificado en el Cantón:** Hoteles, hosterías y cabañas del sector con contacto directo a WhatsApp.
6. **Módulo B2G Convenio Cantonal:** Enlace informativo para autoridades del GAD.

---

## 3. Arquitectura SEO de Eventos: Solución a Crawl Budget y Profundidad

### Problemas Técnicos Identificados:
1. **Profundidad de Clic (Crawl Depth > 3):**
   * *Riesgo:* `provincia -> canton -> agenda -> evento` (Nivel 4). Google tarda en rastrear y diluye el PageRank.
2. **Index Bloat y Crawl Budget Desperdiciado:**
   * Al no borrar eventos pasados (por valor histórico/estadístico), se acumulan cientos de URLs "muertas" sin tráfico futuro que agotan el rastreo de Googlebot.
3. **Duplicación Semántica:**
   * Mismos eventos recurrentes cada año (ej. concierto anual en una hostería de Malacatos) compitiendo entre sí con contenido casi idéntico.

### La Solución Implementada:
1. **Ruta Plana de Eventos:**
   * Los eventos cuelgan de una ruta directa de nivel 2:
     ```
     agendaturisticaloja.com/eventos/[slug-del-evento-ano]
     ```
   * El cantón se vincula como metadato y enlace cruzado, no como carpeta anidada de nivel 4.
2. **Páginas Agregadoras por Venue o Serie (Hubs de Autoridad):**
   * Para eventos recurrentes o lugares icónicos, se genera una página agregadora:
     * Ejemplo: `/venues/hosteria-malacatos` o `/series/festival-de-artes-loja`.
   * Esta página agregadora es la que retiene la autoridad y posiciona a largo plazo; las fichas anuales enlazan a ella.
3. **Manejo de Eventos Pasados:**
   * Eventos pasados permanecen accesibles con banner informativo (*"Este evento ya finalizó - Ver próxima edición o eventos similares"*), schemas `Event` con status `EventCancelled` o `EventScheduled`, y enlaces cruzados a atractivos permanentes del cantón.
