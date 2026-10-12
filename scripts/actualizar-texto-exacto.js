const mysql = require('mysql2/promise');

async function actualizarTextoExacto() {
  const conn = await mysql.createConnection({
    host: 'mysql.us.stackcp.com',
    port: 45486,
    user: 'blogagendaturistica-3139314513',
    password: 'EnmjwYbg6&&-',
    database: 'blogagendaturistica-3139314513'
  });

  const slug = 'como-lograr-que-turistas-encuentren-recuerden-finca-cafeteria-loja';
  const titulo = 'Cómo lograr que los turistas encuentren y recuerden tu finca o cafetería de café en Loja';
  const resumen = 'Guía práctica para productores de la Ruta del Café y expositores de Loja Sabor a Café 2026. Por César Reyes Jaramillo.';
  const categoria = 'Gastronomía';
  const etiquetas = JSON.stringify(['Ruta del Café', 'Loja Sabor a Café 2026', 'Café', 'Fincas Cafetaleras', 'Loja']);
  const canton_slug = 'loja';
  const autor = 'César Reyes Jaramillo';
  const imagen = 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop';
  const imagen_alt = 'Café de especialidad en Loja';
  const tiempo_lectura = 7;
  const publicado = 1;

  // Texto 100% puro y exacto provisto por el usuario:
  const contenido = `*Guía práctica para productores de la Ruta del Café y expositores de Loja Sabor a Café 2026*

**Por César Reyes Jaramillo, asesor en estrategia digital y automatización**

Para que un turista o cualquier persona encuentre, recuerde y vuelva a tu finca o cafetería en Loja, necesitas una buena base y tres cosas: que se lleve tu contacto guardado en lugar de un papel, que sus datos queden registrados sin que tengas que anotar nada y que tengas una lista de personas a quienes escribir cuando se vayan. Te explico cómo hacerlo, con la ficha de datos que el turista necesita para decidir y los pasos que puedes dar hoy.

**[VIDEO PRINCIPAL DEL ARTÍCULO: insertar aquí]**

*¿Vienes de los videos de Loja Sabor a Café? Las tres cosas que necesitas están explicadas en los apartados 1, 2 y 3.*

## Por qué un turista que probó tu café a veces no te encuentra después

Loja ya tiene una forma ordenada de mostrar su café. La [Ruta del Café de la Prefectura de Loja](https://prefecturaloja.gob.ec/turismo/ruta-del-cafe/) integra tres etapas: las cafeterías de especialidad de la ciudad, las fincas cafetaleras de la provincia y las cafeterías de las cabeceras cantonales.

En su segunda etapa, [13 fincas agroturísticas](https://cronica.com.ec/2026/01/21/aplicacion-acerca-el-cafe-lojano-a-locales-y-turistas/) se organizan en cuatro rutas: Loja–Sauces Norte–Saraguro, Taquil–Catacocha, Loja–Catamayo–Quilanga y Loja–Vilcabamba–Yangana. Cada finca tiene en la aplicación de la Ruta su ubicación, el costo del recorrido y sus datos de contacto.

Aun así, un visitante recorre varios lugares en pocos días. Imagina a alguien que prueba un café en el Parque Central, visita una finca el sábado y, una semana después, quiere volver o recomendarte a un amigo. En ese momento recuerda «la finca con vista a las montañas» o «el café rico de la feria», pero no tu nombre.

La memoria funciona así: lo que no se repasa se olvida pronto. Por eso no basta con que te visiten. Tu información tiene que quedar a un toque de su celular.

## La base: la ficha que un turista necesita para decidir

La propia Ruta del Café muestra qué datos necesita cada visitante para planificar su recorrido. En la [Etapa 2](https://prefecturaloja.gob.ec/turismo/ruta-del-cafe/etapa-2-ruta-del-cafe-en-fincas-cafetaleras-de-la-provincia-de-loja/), cada ficha incluye ubicación, horario, contacto y redes sociales, duración y precio del tour, transporte, comidas, alojamiento y período en que se ofrece el recorrido.

Además, las fincas que se integraron [pasaron una evaluación](https://cronica.com.ec/2026/01/16/13-fincas-agroturisticas-fortalecen-la-ruta-del-cafe-de-especialidad-de-loja/) con criterios del Ministerio de Turismo y un mínimo de 80 % de cumplimiento.

Esa lista sirve de modelo aunque todavía no estés en la Ruta. Antes de pensar en publicidad, revisa que tengas todo esto escrito y actualizado:

- El nombre exacto de tu finca o cafetería, igual en todas partes.
- Cómo llegar: tu ubicación en Google Maps y una referencia clara.
- Días y horarios de atención.
- Qué ofreces: tours, degustaciones, venta de café o almuerzos.
- Duración y precio de tus servicios, o la indicación «consultar» si varían.
- Opciones de transporte y alojamiento, si aplica.
- Cómo reservar, con un solo número de WhatsApp.
- Tus redes sociales y tu sitio web, si tienes uno.

Un buscador o un asistente de inteligencia artificial solo puede recomendar lo que logra encontrar y leer sobre ti. Si alguien pregunta «¿qué finca de café visitar en Loja?» y tu negocio casi no tiene información publicada, no tiene de dónde obtener datos para recomendarte.

Por eso conviene tener, además de tus redes sociales y tu perfil de Google, una página web propia donde esté toda tu información. Así aumentas las posibilidades de que quienes buscan tus productos o servicios te encuentren y conozcan lo que ofreces.

También es importante revisar si apareces cuando alguien busca lo que vendes, no solamente cuando escribe tu nombre. Quien todavía no te conoce puede buscar «café de especialidad en Loja» o «finca de café para visitar». Aquí puedes ver algunos de mis [casos de éxito en posicionamiento en Loja](https://www.cesarreyesjaramillo.com/posicionamiento/loja).

## 1. Cómo lograr que el turista guarde tu contacto en lugar de un papel

Los volantes y las tarjetas impresas sirven para transmitir información sobre un negocio, pero esperar que alguien los guarde para después llamarnos no siempre es práctico. Pregúntate: ¿cuántas veces has guardado un volante o una tarjeta que te entregaron?

La gente guarda teléfonos. Por eso, la primera cosa es convertir tu tarjeta de presentación en una identidad digital: un contacto completo con tu logo, tus productos, tus redes y tu ubicación en el mapa, que el visitante pueda guardar con un solo toque.

**El proceso:**

- Generamos tu identidad digital.
- La dejamos lista para que tu cliente descargue tu contacto en su teléfono con un toque.
- Recibes estadísticas mensuales de cuántas personas han descargado tu contacto.
- Es editable, intuitiva y tiene soporte los 365 días del año.

El resultado es simple. Cuando ese turista quiera volver a comprar café, no tiene que buscarte de nuevo en Google. Abre sus contactos, escribe «café» y encuentra tu finca con toda su información.

¿Prefieres crearla tú mismo? [Crea tu identidad digital aquí](https://activaqr.com/mi-qr/general).

## 2. Cómo registrar a quien te escribe sin anotar nada

En una feria o durante una visita a la finca estás atendiendo, cobrando y explicando. No siempre tienes tiempo para anotar el nombre de cada persona.

La segunda cosa es facilitar que el visitante te escriba por WhatsApp, reciba tu información y quede registrado con su nombre y su número, mientras tú sigues atendiendo.

Así funciona, visto desde el visitante:

1. Te escribe un mensaje por WhatsApp.
2. Recibe tu identidad digital, como explicamos en el apartado anterior.
3. Queda registrado con su nombre y su número.
4. Tú sigues atendiendo mientras todo eso sucede.

Así, cuando termina el día, tienes más contactos registrados, con quienes además puedes intercambiar estados de WhatsApp, sin haber anotado nada a las apuradas en una libreta.

Tienes una lista de personas que ya mostraron interés en tu café o tus servicios. Eso te permite mantener el contacto y aprovechar nuevas oportunidades de venta.

**[VIDEO V3: insertar aquí el video relacionado con este apartado]**

## 3. Cómo tener una lista de clientes que no dependa de tu memoria

Una lista solo sirve si la usas. La tercera cosa es tener a tus visitantes organizados, con nombre y teléfono, y un sistema de mensajes programados para darles seguimiento: avisarles cuando abres cupos para un tour, cuando sale una cosecha nueva o cuando llega una temporada de visitas.

Sin una lista, cada feria empieza de cero. Con una lista organizada, cada feria suma a la anterior.

### Sistema de seguimiento

Los clientes que escriben reciben respuestas inmediatas, así no se pierden oportunidades por hacerlos esperar o por contestar demasiado tarde.

Aquí no guardas solo un nombre y un número: construyes una base de clientes donde puedes consultar quién escribió, qué le interesó y quién vuelve. Esa información te ayuda a entender mejor qué busca tu público y a tomar decisiones comerciales con más criterio.

Entre sus principales beneficios están:

- Registro organizado de clientes.
- Respuestas informativas inmediatas.
- Notificaciones al personal cuando se necesita dar seguimiento a una consulta.

### Sistema de fidelización

Con los datos registrados puedes programar secuencias de mensajes para mantener la relación con tus clientes: recordatorios de eventos, felicitaciones de cumpleaños, envío de postales y avisos sobre nuevas cosechas, productos o experiencias.

Esta tercera cosa parte de las dos anteriores: llevas esos contactos a una base de datos, los organizas con etiquetas como «visitó la finca» o «compró café» y preparas mensajes de seguimiento.

No tienes que aprender a configurar todo desde cero: nosotros lo dejamos funcionando y, si algo falla, puedes escribirnos para recibir soporte.

## Cómo se ve todo junto: un ejemplo

Imagina un sábado en Loja Sabor a Café. Una pareja de visitantes prueba tu café y te pregunta por tu finca.

Te escribe un mensaje y recibe tu contacto con tu logo, tu ubicación y tus redes sociales. Tú sigues atendiendo al siguiente visitante.

El lunes, tu lista ya tiene sus nombres y teléfonos. Dos semanas después, cuando abres cupos para un recorrido por la finca, puedes escribirles y contarles la novedad.

Y cuando quieran volver a comprar café, solo tendrán que buscar tu contacto en su celular.

Así, una visita no termina cuando el turista se marcha: se convierte en una oportunidad para construir una relación que puede generar nuevas visitas, recomendaciones y ventas.

## Qué puedes hacer antes de tu próxima feria

1. **Crea y completa tu identidad digital.** Asegúrate de que sea editable por si cambias de número, ubicación o añades productos y servicios. Déjala accesible para que cualquiera pueda descargarla y guardarla en su teléfono.
2. **Revisa tu posicionamiento en internet.** Busca tu producto o servicio, no solamente el nombre de tu negocio. Comprueba si alguien que todavía no te conoce puede encontrarte.
3. **Crea un sistema para registrar la información de tus clientes.** Hazlo respetando la [Ley Orgánica de Protección de Datos Personales de Ecuador](https://www.gob.ec/regulaciones/ley-organica-proteccion-datos-personales-0). Informa para qué utilizarás los datos y solicita el consentimiento correspondiente antes de usarlos para comunicaciones comerciales.
4. **Mantén tu información actualizada.** Revisa que tu nombre, horario y número de WhatsApp coincidan en Google Maps, WhatsApp y tus redes sociales.
5. **Pide reseñas a tus visitantes y clientes.** Invítalos a compartir su experiencia y muestra esas opiniones en tu sitio web, tu perfil de Google y tus redes sociales.

## Preguntas frecuentes

### ¿Qué es una identidad digital para un negocio de café?

Es tu tarjeta de presentación convertida en un contacto que el cliente puede guardar en su celular, con tu logo, tus productos, tus redes sociales y tu ubicación. Cuando quiera volver a comprarte, podrá encontrarte entre sus contactos sin tener que buscarte de nuevo en Google.

### ¿Cuándo es Loja Sabor a Café 2026?

La XIV edición se realiza del 15 al 18 de octubre de 2026, con sede principal en el Parque Central de Loja, según el [sitio oficial del festival](https://lojasaboracafe.com/).

### ¿Tengo que estar en la Ruta del Café para recibir turistas?

No necesariamente. La Ruta del Café es una iniciativa de la Prefectura de Loja y sus fincas pasan por un proceso de evaluación. Si todavía no formas parte de ella, puedes empezar por mejorar la información que controlas: tu ficha de datos, Google Maps, WhatsApp, tus redes sociales y tu contacto digital.

### ¿Cómo hago para que mi finca o cafetería aparezca en Agenda Turística Loja?

Escríbenos desde la [página de contacto de Agenda Turística Loja](https://www.agendaturisticaloja.com/contacto) y cuéntanos qué ofreces, dónde estás y cómo pueden reservar tus clientes.

## Sobre el autor

César Reyes Jaramillo es asesor en estrategia digital y automatización, con más de 25 años de experiencia comercial. Trabaja con negocios para ayudarlos a construir relaciones duraderas con sus clientes, mejorar su presencia digital y dejar de depender de que el dueño tenga que estar pendiente de todo.

**¿Quieres que los turistas te encuentren, te recuerden y vuelvan a tu negocio?**

Escríbeme la palabra **IDENTIDAD** por [WhatsApp](https://wa.me/593963410409) y revisamos cómo puedo ayudarte a dar el siguiente paso.`;

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
  console.log('✅ Base de datos actualizada con el texto 100% exacto y limpio!');
  await conn.end();
}

actualizarTextoExacto().catch(console.error);
