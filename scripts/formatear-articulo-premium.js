const mysql = require('mysql2/promise');

async function estructurarArticuloPremium() {
  const conn = await mysql.createConnection({
    host: 'mysql.us.stackcp.com',
    port: 45486,
    user: 'blogagendaturistica-3139314513',
    password: 'EnmjwYbg6&&-',
    database: 'blogagendaturistica-3139314513'
  });

  const slug = 'como-lograr-que-turistas-encuentren-recuerden-finca-cafeteria-loja';
  const titulo = 'Cómo lograr que los turistas encuentren y recuerden tu finca o cafetería de café en Loja';
  const resumen = 'Guía práctica para productores de la Ruta del Café y expositores de Loja Sabor a Café 2026. Por César Reyes Jaramillo, asesor en estrategia digital.';
  const categoria = 'Gastronomía';
  const etiquetas = JSON.stringify(['Ruta del Café', 'Loja Sabor a Café 2026', 'Café de Especialidad', 'Fincas Cafetaleras', 'Estrategia Digital', 'Loja']);
  const canton_slug = 'loja';
  const autor = 'César Reyes Jaramillo';
  const imagen = 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop';
  const imagen_alt = 'Café de especialidad servido en taza y granos de café de Loja';
  const tiempo_lectura = 7;
  const publicado = 1;

  // Maquetación editorial rica y visual:
  const contenido = `
<div class="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#EBF3ED] to-[#F4F5F0] border border-[#2C5E43]/20 shadow-sm">
  <div class="flex items-center gap-2 text-xs font-bold text-[#2C5E43] uppercase tracking-wider mb-2">
    <span>☕</span> Guía Práctica Especializada
  </div>
  <p class="text-xl sm:text-2xl font-bold text-[#17201B] leading-snug mb-3">
    Para productores de la Ruta del Café y expositores de Loja Sabor a Café 2026
  </p>
  <div class="flex items-center gap-3 text-sm text-[#64746B] pt-2 border-t border-[#2C5E43]/15">
    <span>✍️ <strong>Por César Reyes Jaramillo</strong></span>
    <span>•</span>
    <span>Asesor en estrategia digital y automatización</span>
  </div>
</div>

<p class="text-lg leading-relaxed text-[#17201B] font-medium mb-6">
Para que un turista o cualquier persona encuentre, recuerde y vuelva a tu finca o cafetería en Loja, necesitas una buena base y tres cosas fundamentales: <strong>que se lleve tu contacto guardado en lugar de un papel</strong>, <strong>que sus datos queden registrados sin que tengas que anotar nada</strong> y <strong>que tengas una lista de personas a quienes escribir cuando se vayan</strong>.
</p>

<!-- BLOQUE DESTACADO DE VIDEO -->
<div class="my-10 p-6 rounded-3xl bg-white border border-[#E8EAE3] shadow-md">
  <div class="flex items-center gap-3 mb-4">
    <div class="size-10 rounded-xl bg-[#EBF3ED] flex items-center justify-center text-xl">🎬</div>
    <div>
      <h4 class="font-bold text-[#17201B] text-base leading-none">Video Principal de la Guía</h4>
      <p class="text-xs text-[#64746B] mt-0.5">Explicación paso a paso de los 3 pilares para el sector cafetalero lojano</p>
    </div>
  </div>
  <div class="rounded-2xl overflow-hidden aspect-video bg-[#17201B] flex flex-col items-center justify-center text-white p-6 text-center relative group">
    <div class="size-16 rounded-full bg-[#2C5E43] flex items-center justify-center text-2xl mb-3 shadow-lg group-hover:scale-110 transition duration-300">
      ▶
    </div>
    <div class="text-sm font-semibold">Video explicativo: Loja Sabor a Café</div>
    <div class="text-xs text-gray-400 mt-1">Los apartados 1, 2 y 3 desarrollan en detalle lo visto en video</div>
  </div>
</div>

<div class="my-6 p-4 rounded-2xl bg-[#F4F5F0] border-l-4 border-[#2C5E43] text-sm text-[#17201B]">
  👉 <em>¿Vienes de los videos de Loja Sabor a Café? Las tres cosas que necesitas están explicadas en los apartados 1, 2 y 3 de esta guía.</em>
</div>

## Por qué un turista que probó tu café a veces no te encuentra después

Loja ya tiene una forma ordenada de mostrar su café. La <a href="https://prefecturaloja.gob.ec/turismo/ruta-del-cafe/" target="_blank" rel="noopener noreferrer">Ruta del Café de la Prefectura de Loja</a> integra tres etapas: las cafeterías de especialidad de la ciudad, las fincas cafetaleras de la provincia y las cafeterías de las cabeceras cantonales.

En su segunda etapa, <a href="https://cronica.com.ec/2026/01/21/aplicacion-acerca-el-cafe-lojano-a-locales-y-turistas/" target="_blank" rel="noopener noreferrer">13 fincas agroturísticas</a> se organizan en cuatro rutas estratégicas:
- 📍 **Ruta 1:** Loja – Sauces Norte – Saraguro
- 📍 **Ruta 2:** Taquil – Catacocha
- 📍 **Ruta 3:** Loja – Catamayo – Quilanga
- 📍 **Ruta 4:** Loja – Vilcabamba – Yangana

Cada finca tiene en la aplicación de la Ruta su ubicación, el costo del recorrido y sus datos de contacto.

> **El problema real del turista:**
> Un visitante recorre varios lugares en pocos días. Imagina a alguien que prueba un café en el Parque Central, visita una finca el sábado y, una semana después, quiere volver o recomendarte a un amigo. En ese momento recuerda «la finca con vista a las montañas» o «el café rico de la feria», pero no tu nombre.

La memoria humana funciona así: <strong>lo que no se repasa se olvida pronto</strong>. Por eso no basta con que te visiten. Tu información tiene que quedar a un toque de su celular.

## La base: la ficha que un turista necesita para decidir

La propia Ruta del Café muestra qué datos necesita cada visitante para planificar su recorrido. En la <a href="https://prefecturaloja.gob.ec/turismo/ruta-del-cafe/etapa-2-ruta-del-cafe-en-fincas-cafetaleras-de-la-provincia-de-loja/" target="_blank" rel="noopener noreferrer">Etapa 2</a>, cada ficha incluye ubicación, horario, contacto y redes sociales, duración y precio del tour, transporte, comidas, alojamiento y período en que se ofrece el recorrido.

Además, las fincas que se integraron <a href="https://cronica.com.ec/2026/01/16/13-fincas-agroturisticas-fortalecen-la-ruta-del-cafe-de-especialidad-de-loja/" target="_blank" rel="noopener noreferrer">pasaron una rigurosa evaluación</a> con criterios del Ministerio de Turismo y un mínimo de 80 % de cumplimiento.

Esa lista sirve de modelo aunque todavía no estés formalmente en la Ruta. Antes de pensar en publicidad, revisa que tengas todo esto escrito y al día:

<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] shadow-sm flex items-start gap-3">
    <span class="text-[#2C5E43] font-bold text-lg">✓</span>
    <div>
      <strong class="text-sm text-[#17201B] block">Nombre exacto</strong>
      <span class="text-xs text-[#64746B]">El nombre idéntico en Google, redes y empaques.</span>
    </div>
  </div>
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] shadow-sm flex items-start gap-3">
    <span class="text-[#2C5E43] font-bold text-lg">✓</span>
    <div>
      <strong class="text-sm text-[#17201B] block">Ubicación y Google Maps</strong>
      <span class="text-xs text-[#64746B]">Pin exacto y referencia clara en la vía.</span>
    </div>
  </div>
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] shadow-sm flex items-start gap-3">
    <span class="text-[#2C5E43] font-bold text-lg">✓</span>
    <div>
      <strong class="text-sm text-[#17201B] block">Días y Horarios</strong>
      <span class="text-xs text-[#64746B]">Horarios de atención claros para evitar viajes en vano.</span>
    </div>
  </div>
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] shadow-sm flex items-start gap-3">
    <span class="text-[#2C5E43] font-bold text-lg">✓</span>
    <div>
      <strong class="text-sm text-[#17201B] block">Oferta de Servicios</strong>
      <span class="text-xs text-[#64746B]">Tours, catas, venta en grano/molido o comidas.</span>
    </div>
  </div>
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] shadow-sm flex items-start gap-3">
    <span class="text-[#2C5E43] font-bold text-lg">✓</span>
    <div>
      <strong class="text-sm text-[#17201B] block">Duración y Precios</strong>
      <span class="text-xs text-[#64746B]">Precios transparentes o indicación de «consultar».</span>
    </div>
  </div>
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] shadow-sm flex items-start gap-3">
    <span class="text-[#2C5E43] font-bold text-lg">✓</span>
    <div>
      <strong class="text-sm text-[#17201B] block">WhatsApp de Reservas</strong>
      <span class="text-xs text-[#64746B]">Un solo número centralizado de contacto directo.</span>
    </div>
  </div>
</div>

Un buscador o un asistente de inteligencia artificial solo puede recomendar lo que logra encontrar y leer sobre ti. Si alguien pregunta «¿qué finca de café visitar en Loja?» y tu negocio casi no tiene información publicada, no tiene de dónde obtener datos para recomendarte.

Por eso conviene tener, además de tus redes sociales y tu perfil de Google, una **página web propia** donde esté toda tu información. Así aumentas las posibilidades de que quienes buscan tus productos o servicios te encuentren. Aquí puedes consultar algunos de mis <a href="https://www.cesarreyesjaramillo.com/posicionamiento/loja" target="_blank" rel="noopener noreferrer">casos de éxito en posicionamiento en Loja</a>.

---

<!-- PASO 1 -->
<div class="my-10 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#2C5E43]/20 shadow-md">
  <div class="flex items-center gap-3 mb-4">
    <span class="size-10 rounded-2xl bg-[#2C5E43] text-white flex items-center justify-center font-bold text-lg shadow-sm">1</span>
    <h2 class="!text-2xl !my-0 !border-0 !p-0">Cómo lograr que el turista guarde tu contacto en lugar de un papel</h2>
  </div>

  <p class="text-[#2D3748] mb-4">
    Los volantes y las tarjetas impresas sirven para transmitir información sobre un negocio, pero esperar que alguien los guarde para después llamarnos no siempre es práctico. Pregúntate: <em>¿cuántas veces has guardado un volante o una tarjeta que te entregaron?</em>
  </p>

  <p class="text-[#2D3748] mb-6">
    La gente guarda teléfonos. Por eso, el primer paso es convertir tu tarjeta en una <strong>identidad digital</strong>: un contacto completo con tu logo, productos, redes y tu ubicación en el mapa, que el visitante pueda guardar con un solo toque.
  </p>

  <div class="bg-[#F4F5F0] p-5 rounded-2xl border border-[#E8EAE3] mb-6">
    <div class="text-xs uppercase tracking-wider font-bold text-[#2C5E43] mb-3">El Proceso de Implementación:</div>
    <ul class="!my-0 space-y-2 text-sm text-[#17201B]">
      <li>Generamos tu identidad digital a medida.</li>
      <li>La dejamos lista para que tu cliente descargue tu contacto en su teléfono con un toque.</li>
      <li>Recibes estadísticas mensuales de cuántas personas han descargado tu contacto.</li>
      <li>Es editable, intuitiva y tiene soporte los 365 días del año.</li>
    </ul>
  </div>

  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#EBF3ED] border border-[#2C5E43]/30">
    <div class="text-xs sm:text-sm text-[#17201B]">
      <strong>¿Prefieres crear tu identidad digital tú mismo?</strong> Puedes dar el primer paso hoy.
    </div>
    <a href="https://activaqr.com/mi-qr/general" target="_blank" rel="noopener noreferrer" class="shrink-0 bg-[#2C5E43] hover:bg-[#224B35] !text-white !no-underline text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm">
      Crear Identidad Digital ↗
    </a>
  </div>
</div>

<!-- PASO 2 -->
<div class="my-10 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#2C5E43]/20 shadow-md">
  <div class="flex items-center gap-3 mb-4">
    <span class="size-10 rounded-2xl bg-[#2C5E43] text-white flex items-center justify-center font-bold text-lg shadow-sm">2</span>
    <h2 class="!text-2xl !my-0 !border-0 !p-0">Cómo registrar a quien te escribe sin anotar nada</h2>
  </div>

  <p class="text-[#2D3748] mb-4">
    En una feria como Loja Sabor a Café o durante un tour en la finca estás atendiendo, cobrando y explicando. No siempre tienes tiempo para anotar el nombre de cada persona en una libreta.
  </p>

  <p class="text-[#2D3748] mb-6">
    La segunda clave es facilitar que el visitante te escriba por WhatsApp, reciba tu información y quede registrado automáticamente con su nombre y su número, mientras tú sigues atendiendo con total tranquilidad.
  </p>

  <!-- FLUJO VISUAL 1-2-3-4 -->
  <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 my-6">
    <div class="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8EAE3] text-center">
      <div class="size-8 mx-auto rounded-full bg-[#EBF3ED] text-[#2C5E43] font-bold text-xs flex items-center justify-center mb-2">Paso 1</div>
      <div class="text-xs font-bold text-[#17201B]">Te escribe por WhatsApp</div>
    </div>
    <div class="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8EAE3] text-center">
      <div class="size-8 mx-auto rounded-full bg-[#EBF3ED] text-[#2C5E43] font-bold text-xs flex items-center justify-center mb-2">Paso 2</div>
      <div class="text-xs font-bold text-[#17201B]">Recibe tu identidad digital</div>
    </div>
    <div class="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8EAE3] text-center">
      <div class="size-8 mx-auto rounded-full bg-[#EBF3ED] text-[#2C5E43] font-bold text-xs flex items-center justify-center mb-2">Paso 3</div>
      <div class="text-xs font-bold text-[#17201B]">Queda registrado con nombre</div>
    </div>
    <div class="p-4 rounded-2xl bg-[#FAFAF8] border border-[#E8EAE3] text-center">
      <div class="size-8 mx-auto rounded-full bg-[#EBF3ED] text-[#2C5E43] font-bold text-xs flex items-center justify-center mb-2">Paso 4</div>
      <div class="text-xs font-bold text-[#17201B]">Tú sigues atendiendo</div>
    </div>
  </div>

  <!-- VIDEO DEMO V3 -->
  <div class="mt-6 p-5 rounded-2xl bg-[#F4F5F0] border border-[#E8EAE3]">
    <div class="flex items-center gap-3">
      <div class="size-10 rounded-xl bg-white border border-[#E8EAE3] flex items-center justify-center text-lg">📱</div>
      <div>
        <div class="text-sm font-bold text-[#17201B]">Video Demostración del Sistema de Registro (V3)</div>
        <div class="text-xs text-[#64746B]">Mira en 60 segundos cómo interactúa el visitante y cómo queda registrado en tu base de contactos.</div>
      </div>
    </div>
  </div>
</div>

<!-- PASO 3 -->
<div class="my-10 p-6 sm:p-8 rounded-3xl bg-white border-2 border-[#2C5E43]/20 shadow-md">
  <div class="flex items-center gap-3 mb-4">
    <span class="size-10 rounded-2xl bg-[#2C5E43] text-white flex items-center justify-center font-bold text-lg shadow-sm">3</span>
    <h2 class="!text-2xl !my-0 !border-0 !p-0">Cómo tener una lista de clientes que no dependa de tu memoria</h2>
  </div>

  <p class="text-[#2D3748] mb-4">
    Una lista solo sirve si la usas. El tercer paso es tener a tus visitantes organizados con nombre y teléfono, y un sistema de mensajes programados para darles seguimiento: avisarles cuando abres cupos para un tour, cuando sale una cosecha nueva o cuando llega la temporada de visitas.
  </p>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
    <div class="p-5 rounded-2xl bg-red-50/70 border border-red-200">
      <div class="text-xs font-bold uppercase tracking-wider text-red-700 mb-2">❌ Sin lista organizada</div>
      <p class="text-xs text-red-900 leading-relaxed">
        Cada feria empieza desde cero. No sabes a quién escribirle, dependes de tu memoria y los contactos se pierden en papelitos.
      </p>
    </div>
    <div class="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
      <div class="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">✅ Con sistema automático</div>
      <p class="text-xs text-emerald-950 leading-relaxed">
        Cada feria suma a la anterior. Construyes una base de datos propia donde consultas quién escribió, qué le interesó y quién vuelve.
      </p>
    </div>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
    <div class="bg-[#FAFAF8] p-5 rounded-2xl border border-[#E8EAE3]">
      <h3 class="!text-base !font-bold !mt-0 !mb-2 text-[#17201B]">🔄 Sistema de seguimiento</h3>
      <p class="text-xs text-[#64746B] leading-relaxed">
        Respuestas informativas inmediatas para no perder clientes por tardanzas, con notificaciones directas al personal cuando se requiere atención personalizada.
      </p>
    </div>
    <div class="bg-[#FAFAF8] p-5 rounded-2xl border border-[#E8EAE3]">
      <h3 class="!text-base !font-bold !mt-0 !mb-2 text-[#17201B]">🎁 Sistema de fidelización</h3>
      <p class="text-xs text-[#64746B] leading-relaxed">
        Secuencias programadas con etiquetas como «visitó la finca» o «compró café»: avisos de cosechas, postales de temporada y recordatorios de eventos.
      </p>
    </div>
  </div>
</div>

<!-- EJEMPLO EN VIVO -->
<div class="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#17201B] to-[#24352B] text-white shadow-xl">
  <div class="flex items-center gap-2 text-xs font-bold text-[#D4A373] uppercase tracking-wider mb-2">
    <span>💡</span> Caso Práctico
  </div>
  <h3 class="!text-xl !font-bold text-white !mt-0 !mb-4">Cómo se ve todo junto en Loja Sabor a Café</h3>
  <div class="space-y-4 text-sm text-gray-300 leading-relaxed">
    <p>
      Imagina un sábado en el Parque Central de Loja. Una pareja de visitantes prueba tu café y te pregunta por tu finca.
    </p>
    <p>
      Te escribe un mensaje por WhatsApp y recibe al instante tu contacto con tu logo, ubicación y redes sociales. Tú sigues atendiendo al siguiente visitante sin pausas.
    </p>
    <p>
      El lunes, tu lista ya tiene sus nombres y teléfonos registrados. Dos semanas después, cuando abres cupos para un recorrido por la finca, puedes escribirles con un solo clic y contarles la novedad.
    </p>
    <p class="text-white font-medium border-t border-white/10 pt-3">
      Así, una visita no termina cuando el turista se marcha: se convierte en una relación duradera que genera ventas continuas.
    </p>
  </div>
</div>

## Qué puedes hacer antes de tu próxima feria

<div class="space-y-3 my-6">
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] flex items-start gap-3 shadow-sm">
    <span class="size-6 rounded-full bg-[#EBF3ED] text-[#2C5E43] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
    <div class="text-sm text-[#17201B]">
      <strong>Crea y completa tu identidad digital:</strong> Asegúrate de que sea editable por si cambias de número, ubicación o añades servicios.
    </div>
  </div>
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] flex items-start gap-3 shadow-sm">
    <span class="size-6 rounded-full bg-[#EBF3ED] text-[#2C5E43] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
    <div class="text-sm text-[#17201B]">
      <strong>Revisa tu posicionamiento en internet:</strong> Busca «café de especialidad en Loja» o tu servicio, y verifica si quien no te conoce te encuentra.
    </div>
  </div>
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] flex items-start gap-3 shadow-sm">
    <span class="size-6 rounded-full bg-[#EBF3ED] text-[#2C5E43] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
    <div class="text-sm text-[#17201B]">
      <strong>Crea un sistema para registrar clientes:</strong> Cumpliendo con la <a href="https://www.gob.ec/regulaciones/ley-organica-proteccion-datos-personales-0" target="_blank" rel="noopener noreferrer">Ley Orgánica de Protección de Datos Personales del Ecuador</a>.
    </div>
  </div>
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] flex items-start gap-3 shadow-sm">
    <span class="size-6 rounded-full bg-[#EBF3ED] text-[#2C5E43] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">4</span>
    <div class="text-sm text-[#17201B]">
      <strong>Mantén tu información actualizada:</strong> Nombre, horario y WhatsApp coincidentes en Google Maps y redes sociales.
    </div>
  </div>
  <div class="p-4 rounded-2xl bg-white border border-[#E8EAE3] flex items-start gap-3 shadow-sm">
    <span class="size-6 rounded-full bg-[#EBF3ED] text-[#2C5E43] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">5</span>
    <div class="text-sm text-[#17201B]">
      <strong>Pide reseñas a tus visitantes:</strong> Invítalos a dejar su opinión y muéstralas en tu sitio web y perfil de Google.
    </div>
  </div>
</div>

## Preguntas frecuentes

<div class="space-y-4 my-8">
  <div class="p-5 rounded-2xl bg-white border border-[#E8EAE3] shadow-sm">
    <h3 class="!text-base !font-bold !mt-0 !mb-2 text-[#17201B]">¿Qué es una identidad digital para un negocio de café?</h3>
    <p class="!text-sm !text-[#64746B] !mb-0 leading-relaxed">
      Es tu tarjeta de presentación convertida en un contacto que el cliente puede guardar en su celular, con tu logo, tus productos, tus redes sociales y tu ubicación. Cuando quiera volver a comprarte, podrá encontrarte entre sus contactos sin tener que buscarte de nuevo en Google.
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-white border border-[#E8EAE3] shadow-sm">
    <h3 class="!text-base !font-bold !mt-0 !mb-2 text-[#17201B]">¿Cuándo es Loja Sabor a Café 2026?</h3>
    <p class="!text-sm !text-[#64746B] !mb-0 leading-relaxed">
      La XIV edición se realiza del 15 al 18 de octubre de 2026, con sede principal en el Parque Central de Loja, según el <a href="https://lojasaboracafe.com/" target="_blank" rel="noopener noreferrer">sitio oficial del festival</a>.
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-white border border-[#E8EAE3] shadow-sm">
    <h3 class="!text-base !font-bold !mt-0 !mb-2 text-[#17201B]">¿Tengo que estar en la Ruta del Café para recibir turistas?</h3>
    <p class="!text-sm !text-[#64746B] !mb-0 leading-relaxed">
      No necesariamente. La Ruta del Café es una iniciativa de la Prefectura de Loja y sus fincas pasan por un proceso de evaluación. Si todavía no formas parte de ella, puedes empezar por mejorar la información que controlas: tu ficha de datos, Google Maps, WhatsApp, tus redes sociales y tu contacto digital.
    </p>
  </div>

  <div class="p-5 rounded-2xl bg-white border border-[#E8EAE3] shadow-sm">
    <h3 class="!text-base !font-bold !mt-0 !mb-2 text-[#17201B]">¿Cómo hago para que mi finca o cafetería aparezca en Agenda Turística Loja?</h3>
    <p class="!text-sm !text-[#64746B] !mb-0 leading-relaxed">
      Escríbenos desde la <a href="/contacto">página de contacto de Agenda Turística Loja</a> y cuéntanos qué ofreces, dónde estás y cómo pueden reservar tus clientes.
    </p>
  </div>
</div>

<!-- BANNER CALL TO ACTION FINAL CON CÉSAR REYES -->
<div class="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#2C5E43] to-[#1E4330] text-white shadow-xl relative overflow-hidden">
  <div class="relative z-10 max-w-xl">
    <span class="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
      Contacto & Asesoría
    </span>
    <h3 class="!text-2xl sm:!text-3xl !font-black text-white !mt-0 !mb-3">
      ¿Quieres que los turistas te encuentren, te recuerden y vuelvan a tu negocio?
    </h3>
    <p class="text-sm text-emerald-100 mb-6 leading-relaxed">
      Escríbeme por WhatsApp la palabra <strong>IDENTIDAD</strong> y revisamos directamente cómo puedo ayudarte a dar el siguiente paso en tu finca o cafetería.
    </p>
    <a
      href="https://wa.me/593963410409?text=IDENTIDAD"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] !text-black !no-underline font-extrabold px-6 py-3.5 rounded-2xl transition duration-200 shadow-lg text-sm"
    >
      <span>💬</span> Enviar mensaje por WhatsApp (+593 96 341 0409)
    </a>
  </div>
</div>
`;

  const query = `
    UPDATE blog_posts 
    SET contenido = ?,
        resumen = ?,
        etiquetas = ?,
        categoria = ?,
        autor = ?
    WHERE slug = ?
  `;

  await conn.execute(query, [contenido, resumen, etiquetas, categoria, autor, slug]);
  console.log('✅ Base de datos actualizada con diseño EDITORIAL PREMIUM!');
  await conn.end();
}

estructurarArticuloPremium().catch(console.error);
