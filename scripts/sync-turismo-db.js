const mysql = require('mysql2/promise');

const DB_URL = process.env.TURISTICA_DB_URL || 'mysql://agendatursticdinamic-31383916da:-fr%3F%23I%7DoZVxb@mysql.us.stackcp.com:46132/agendatursticdinamic-31383916da';

const ATRACTIVOS_DATA = [
  // Loja urbana
  {
    nombre: "Puerta de la Ciudad",
    slug: "puerta-de-la-ciudad",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Patrimonio",
    emoji: "🏰",
    descripcion: "Emblemático monumento arquitectónico y museo que recrea el escudo de armas otorgado en 1571. Alberga salas de exposiciones de arte contemporáneo lojano, cafetería con café de altura y mirador panorámico sobre el río Malacatos.",
    duracion: "1 a 2 horas",
    distancia: "Centro urbano de Loja",
    ruta: "Av. Gran Colombia y 18 de Noviembre",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/centro-historico-loja.webp",
    mapaUrl: "https://maps.google.com/?q=-3.9878,-79.2048",
    lat: -3.9878,
    lng: -79.2048,
    gradient: "linear-gradient(135deg,#8B7355,#1B4332 50%,#2D6A8B)",
    activo: 1,
  },
  {
    nombre: "Parque Recreacional Jipiro",
    slug: "parque-jipiro",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Parque",
    emoji: "🎡",
    descripcion: "Extenso complejo recreacional y cultural de más de 10 hectáreas. Famoso por sus réplicas arquitectónicas de las culturas del mundo (Torre Eiffel, Mezquita Árabe, Pagoda China, Catedral de San Basilio), laguna navegable con botes a pedal, áreas deportivas y senderos arbolados.",
    duracion: "3 a 4 horas",
    distancia: "3.5 km al norte del centro",
    ruta: "Av. Salvador Bustamante Celi",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/parque-jipiro.webp",
    mapaUrl: "https://maps.google.com/?q=-3.9758,-79.2023",
    lat: -3.9758,
    lng: -79.2023,
    gradient: "linear-gradient(135deg,#2d6a4f,#f2c14e 60%,#1B4332)",
    activo: 1,
  },
  {
    nombre: "Central Eólica Villonaco y Mirador",
    slug: "central-eolica-villonaco",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Mirador",
    emoji: "💨",
    descripcion: "Impresionante parque de generación de energía limpia situado en la cima de la cordillera de Villonaco a 2.720 msnm. Cuenta con 11 aerogeneradores gigantes, centro de interpretación técnica y mirador natural con vistas de 360° hacia los valles de Loja y Catamayo.",
    duracion: "2 horas",
    distancia: "14 km al oeste de Loja",
    ruta: "Vía antigua Loja - Catamayo km 14",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/villonaco.webp",
    mapaUrl: "https://maps.google.com/?q=-3.9961,-79.2619",
    lat: -3.9961,
    lng: -79.2619,
    gradient: "linear-gradient(135deg,#2D6A8B,#a9d6e5 50%,#1B4332)",
    activo: 1,
  },
  {
    nombre: "Museo de la Cultura Lojana",
    slug: "museo-de-la-cultura-lojana",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Cultura",
    emoji: "🏺",
    descripcion: "Principal museo etnográfico y arqueológico de la ciudad, ubicado frente a la Plaza Central. Exhibe colecciones prehispánicas de las culturas Paltas e Incas, arte religioso colonial del siglo XVIII y testimonios de la historia republicana de Loja.",
    duracion: "1.5 horas",
    distancia: "Frente al Parque Central de Loja",
    ruta: "Calle 10 de Agosto y Bernardo Valdivieso",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/centro-historico-loja.webp",
    mapaUrl: "https://maps.google.com/?q=-3.9934,-79.2045",
    lat: -3.9934,
    lng: -79.2045,
    gradient: "linear-gradient(135deg,#8B7355,#2D6A8B 60%,#12301f)",
    activo: 1,
  },
  {
    nombre: "Centro Histórico de Loja y Calle Lourdes",
    slug: "centro-historico-de-loja",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Patrimonio",
    emoji: "🏛️",
    descripcion: "Trazado urbano colonial tradicional con casonas de balcones de madera tallada, farolas artesanales, plazas ajardinadas y la emblemática calle Lourdes con cafeterías de especialidad, galerías y tiendas de productos lojanos auténticos.",
    duracion: "Medio día",
    distancia: "Centro urbano",
    ruta: "Calles Bolívar, Lourdes y Sucre",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/centro-historico-loja.webp",
    mapaUrl: "https://maps.google.com/?q=-3.9931,-79.2042",
    lat: -3.9931,
    lng: -79.2042,
    gradient: "linear-gradient(135deg,#1B4332,#8B7355)",
    activo: 1,
  },
  {
    nombre: "Parque Nacional Podocarpus (Sector Caxaruma)",
    slug: "parque-nacional-podocarpus",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Naturaleza",
    emoji: "🌲",
    descripcion: "Santuario de biodiversidad mundial y reserva de biósfera que protege los últimos bosques nativos de Romerillo (Podocarpus) en los Andes del sur. Senderos interpretativos como Bosque Nublado, Mirador y Lagunas del Compadre entre cascadas y orquídeas.",
    duracion: "1 día completo",
    distancia: "15 km al sur de Loja",
    ruta: "Vía Loja - Vilcabamba, desvío Caxaruma",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/parque-podocarpus.webp",
    mapaUrl: "https://maps.google.com/?q=-4.113,-79.178",
    lat: -4.113,
    lng: -79.178,
    gradient: "linear-gradient(135deg,#a9d6e5,#2D6A8B 40%,#12301f)",
    activo: 1,
  },
  // Vilcabamba
  {
    nombre: "Cerro Mandango (Dios Acostado)",
    slug: "cerro-mandango-vilcabamba",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Naturaleza",
    emoji: "⛰️",
    descripcion: "Monolito sagrado y formación rocosa mística que vigila el Valle de Vilcabamba. Su silueta asemeja un rostro humano durmiente. Ruta de trekking de pendiente media-alta para ascender a su cumbre a 2.150 msnm con vistas panorámicas excepcionales.",
    duracion: "Medio día (4 horas)",
    distancia: "42 km de Loja (1 km del parque de Vilcabamba)",
    ruta: "Vilcabamba, sendero este hacia Mandango",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/vilcabamba-mandango.webp",
    mapaUrl: "https://maps.google.com/?q=-4.2541,-79.2274",
    lat: -4.2541,
    lng: -79.2274,
    gradient: "linear-gradient(135deg,#f2c14e,#2d6a4f 55%,#12301f)",
    activo: 1,
  },
  {
    nombre: "Parque Recreacional Yamburara",
    slug: "parque-recreacional-yamburara",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Naturaleza",
    emoji: "🌺",
    descripcion: "Centro recreacional municipal a orillas del río Uchima en Vilcabamba. Cuenta con vivero botánico, una vasta colección de orquídeas autóctonas del sur ecuatoriano, centro de rescate de fauna silvestre, piscinas familiares y áreas de pícnic.",
    duracion: "2 horas",
    distancia: "1.5 km desde el centro de Vilcabamba",
    ruta: "Vía Yamburara Alto, Vilcabamba",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/vilcabamba-mandango.webp",
    mapaUrl: "https://maps.google.com/?q=-4.2562,-79.2081",
    lat: -4.2562,
    lng: -79.2081,
    gradient: "linear-gradient(135deg,#2d6a4f,#f2c14e 60%,#2D6A8B)",
    activo: 1,
  },
  // Malacatos
  {
    nombre: "Santuario Diocesano El Señor de la Caridad",
    slug: "santuario-el-senor-de-la-caridad",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Patrimonio",
    emoji: "⛪",
    descripcion: "Hermoso templo de arquitectura renacentista-neoclásica construido en 1942 en el corazón del fértil valle de Malacatos. Es el epicentro de la devoción al Señor de la Caridad y punto de partida para degustar melcochas, moliendas de caña y frutas subtropicales.",
    duracion: "1.5 horas",
    distancia: "33 km al sur de Loja",
    ruta: "Parroquia Malacatos, Plaza Central",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/centro-historico-loja.webp",
    mapaUrl: "https://maps.google.com/?q=-4.2235,-79.2575",
    lat: -4.2235,
    lng: -79.2575,
    gradient: "linear-gradient(135deg,#A0522D,#1B4332 50%,#f2c14e)",
    activo: 1,
  },
  // El Cisne
  {
    nombre: "Basílica Santuario de Nuestra Señora del Cisne",
    slug: "basilica-santuario-de-el-cisne",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Patrimonio",
    emoji: "🕊️",
    descripcion: "Majestuoso santuario de estilo gótico ojival empotrado en la cima de la cordillera andina a 2.440 msnm. Es el mayor centro de peregrinación mariana del sur ecuatoriano y norte peruano. Cuenta con museo de arte sacro, cripta y la histórica Torre del Reloj.",
    duracion: "Medio día",
    distancia: "72 km al noroeste de Loja",
    ruta: "Vía Loja - Catamayo - San Pedro de la Bendita - El Cisne",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/el-cisne.webp",
    mapaUrl: "https://maps.google.com/?q=-3.8509,-79.4265",
    lat: -3.8509,
    lng: -79.4265,
    gradient: "linear-gradient(135deg,#2D6A8B,#8B7355 50%,#f2c14e)",
    activo: 1,
  },
  // Taquil
  {
    nombre: "Alfarería Ancestral de Cera (Taquil)",
    slug: "alfareria-ancestral-de-cera",
    canton: "Loja",
    cantonSlug: "loja",
    categoria: "Cultura",
    emoji: "🏺",
    descripcion: "Comunidad artesanal de la parroquia Taquil donde familias enteras preservan técnicas preincaicas de alfarería en barro negro y rojo sin torno. Los visitantes pueden presenciar el moldeado a mano, pulido con piedras de río y quema a cielo abierto.",
    duracion: "3 horas",
    distancia: "26 km al noroccidente de Loja",
    ruta: "Vía Loja - Catamayo, desvío a Taquil / Comunidad Cera",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/atractivos/centro-historico-loja.webp",
    mapaUrl: "https://maps.google.com/?q=-3.9212,-79.2845",
    lat: -3.9212,
    lng: -79.2845,
    gradient: "linear-gradient(135deg,#8B7355,#A0522D 60%,#1B4332)",
    activo: 1,
  }
];

const GUIAS_DATA = [
  {
    slug: "guia-senderismo-mandango-vilcabamba",
    cantonSlug: "loja",
    titulo: "Guía de senderismo: Cerro Mandango y el Valle de Vilcabamba",
    resumen: "Ascenso al mítico Dios Acostado, miradores naturales, orquídeas en Yamburara y fincas cafetaleras en el valle de la eterna juventud.",
    categoria: "Aventura & Naturaleza",
    duracion: "2 días",
    nivel: "Moderado",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/guias/guia-ruta-cafe.webp",
    gradient: "linear-gradient(135deg,#f2c14e,#2d6a4f 55%,#12301f)",
    keywords: JSON.stringify(["mandango vilcabamba", "senderismo loja", "valle de la longevidad", "yamburara", "trekking loja"]),
    secciones: JSON.stringify([
      {
        titulo: "Día 1: El ascenso al Dios Acostado",
        parrafos: [
          "El cerro Mandango domina el paisaje de Vilcabamba con su perfil escarpado. La caminata inicia temprano desde el sendero este del pueblo para evitar el calor del mediodía.",
          "El trayecto toma entre 3 y 4 horas ida y vuelta con tramos de pendiente media-alta sobre roca arcillosa. Se recomienda llevar calzado de montaña con buen agarre, 1.5 litros de agua y bastones de trekking.",
          "Desde la cumbre se tiene una panorámica abierta hacia los valles de Vilcabamba y Malacatos, perfecta para fotografía y contemplación."
        ]
      },
      {
        titulo: "Día 2: Parque Yamburara y Fincas Cafetaleras",
        parrafos: [
          "Para el segundo día, el ritmo baja: visita el Parque Recreacional Yamburara para conocer el orquideario municipal y el centro de rescate faunístico junto al río Uchima.",
          "Complementa la tarde con una cata guiada en alguna de las fincas cafetaleras orgánicas del valle, donde aprenderás los procesos de secado y tueste de los cafés de especialidad lojanos."
        ]
      },
      {
        titulo: "Logística, Seguridad y Hospedaje",
        parrafos: [
          "Desde la Terminal Terrestre de Loja salen buses cada 15 minutos (Cooperativas Vilcabambatur y Sur Oriente, costo $1.50).",
          "Nota de seguridad: La Reserva El Bosque en San Pedro de Vilcabamba se encuentra cerrada temporalmente al turismo. Prioriza los senderos del Mandango y Yamburara.",
          "Encuentra hosterías ecológicas con piscina y huertos orgánicos en nuestra sección de hospedaje con reserva directa por WhatsApp."
        ]
      }
    ]),
    activo: 1
  },
  {
    slug: "guia-santuario-el-cisne-y-ruta-mariana",
    cantonSlug: "loja",
    titulo: "Guía de peregrinación y patrimonio: Basílica de El Cisne",
    resumen: "Ruta espiritual y cultural hacia el santuario gótico más importante del sur del país, museo de arte sacro y vistas de la cordillera.",
    categoria: "Cultura & Fe",
    duracion: "1 día",
    nivel: "Fácil",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/guias/guia-saraguro-cultura.webp",
    gradient: "linear-gradient(135deg,#2D6A8B,#8B7355 50%,#f2c14e)",
    keywords: JSON.stringify(["el cisne loja", "basilica del cisne", "virgen del cisne", "turismo religioso loja", "romeria loja"]),
    secciones: JSON.stringify([
      {
        titulo: "Cómo llegar desde Loja",
        parrafos: [
          "El trayecto desde la ciudad de Loja toma aproximadamente 2 horas y media en transporte público (Cooperativa Catamayo exprés o Sur Oriente) o 1 hora y 45 minutos en auto particular.",
          "La ruta cruza el valle cálido de Catamayo antes de ascender nuevamente por San Pedro de la Bendita hacia el nudo montañoso donde se asienta la parroquia de El Cisne."
        ]
      },
      {
        titulo: "Recorrido por la Basílica y el Museo",
        parrafos: [
          "La Basílica destaca por su imponente fachada neogótica de torres gemelas. En su interior se custodia la sagrada imagen tallada por Don Diego de Robles en 1594.",
          "No dejes de visitar el Museo de Nuestra Señora del Cisne, que custodia mantos bordados en oro y plata, joyas de devoción histórica y exvotos que datan de más de tres siglos.",
          "Sube a la Torre del Reloj para contemplar la vista panorámica de la cordillera andina que desciende hacia la cuenca del Catamayo."
        ]
      },
      {
        titulo: "Gastronomía local y festividades",
        parrafos: [
          "En los exteriores del templo podrás degustar dulces tradicionales de leche, bocadillos de panela y maní, y las tradicionales fritadas con mote.",
          "Si viajas entre el 15 y 20 de agosto, vivirás la multitudinaria Romería anual; si buscas tranquilidad, el resto del año ofrece un clima de profunda paz y devoción."
        ]
      }
    ]),
    activo: 1
  },
  {
    slug: "guia-centro-historico-y-parques-loja",
    cantonSlug: "loja",
    titulo: "Guía urbana: Puerta de la Ciudad, Museos y Parque Jipiro",
    resumen: "Un día completo explorando la capital musical y cultural de Ecuador: casonas coloniales, calle Lourdes, café de altura y el parque de las naciones.",
    categoria: "Patrimonio & Familia",
    duracion: "1 día",
    nivel: "Fácil",
    imagenUrl: "https://mvps.b-cdn.net/agenda-turistica/guias/hero-guias.webp",
    gradient: "linear-gradient(135deg,#1B4332,#2D6A8B 50%,#8B7355)",
    keywords: JSON.stringify(["loja urbana", "puerta de la ciudad loja", "parque jipiro", "calle lourdes loja", "que hacer en loja"]),
    secciones: JSON.stringify([
      {
        titulo: "Mañana: Puerta de la Ciudad y Museos",
        parrafos: [
          "Comienza a las 9:00 en la Puerta de la Ciudad. Sube a su mirador para orientarte y recorre las galerías temporales de artistas plásticos lojanos.",
          "Camina por la calle Bolívar hasta la Plaza Central. Ingresa a la Catedral Metropolitana y al Museo de la Cultura Lojana para conocer el legado de los Paltas y la Loja colonial."
        ]
      },
      {
        titulo: "Mediodía: Almuerzo y Café en la Calle Lourdes",
        parrafos: [
          "Dirígete a la histórica Calle Lourdes, la calle peatonal empedrada más pintoresca de la ciudad. Sus casas de adobe y madera albergan acogedoras cafeterías.",
          "Prueba un café lojano de especialidad (variedades Típica o Bourbon galardonadas con Taza Dorada) acompañado de tamales lojanos o humitas recién hechas."
        ]
      },
      {
        titulo: "Tarde: Recorrido Familiar en Parque Jipiro",
        parrafos: [
          "Toma un taxi (10 minutos) hacia el Parque Recreacional Jipiro. Es el plan favorito de familias y visitantes.",
          "Pasea en botes cisne por la laguna, admira las réplicas del Taj Mahal, la Catedral de San Basilio y la Pagoda China, y relájate en sus amplios prados verdes.",
          "Si tienes vehículo, corona el atardecer subiendo al Parque Eólico Villonaco para ver la puesta de sol sobre el valle."
        ]
      }
    ]),
    activo: 1
  }
];

async function sync() {
  console.log("Conectando a MySQL...");
  const conn = await mysql.createConnection(DB_URL);

  // 1. Limpiar registros obsoletos con slug nulo
  await conn.query("DELETE FROM atractivos_cantonales WHERE slug IS NULL;");
  console.log("Limpieza de registros con slug nulo completada.");

  // 2. Insertar o actualizar Atractivos
  for (const a of ATRACTIVOS_DATA) {
    const [existing] = await conn.query("SELECT id FROM atractivos_cantonales WHERE slug = ?;", [a.slug]);
    if (existing.length > 0) {
      await conn.query(
        `UPDATE atractivos_cantonales SET
          nombre = ?, canton = ?, cantonSlug = ?, categoria = ?, emoji = ?,
          descripcion = ?, duracion = ?, distancia = ?, ruta = ?,
          imagenUrl = ?, mapaUrl = ?, lat = ?, lng = ?, gradient = ?, activo = ?
        WHERE slug = ?`,
        [
          a.nombre, a.canton, a.cantonSlug, a.categoria, a.emoji,
          a.descripcion, a.duracion, a.distancia, a.ruta,
          a.imagenUrl, a.mapaUrl, a.lat, a.lng, a.gradient, a.activo,
          a.slug
        ]
      );
      console.log(`[UPDATE] Atractivo: ${a.nombre} (${a.slug})`);
    } else {
      await conn.query(
        `INSERT INTO atractivos_cantonales 
          (nombre, slug, canton, cantonSlug, categoria, emoji, descripcion, duracion, distancia, ruta, imagenUrl, mapaUrl, lat, lng, gradient, activo, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          a.nombre, a.slug, a.canton, a.cantonSlug, a.categoria, a.emoji,
          a.descripcion, a.duracion, a.distancia, a.ruta,
          a.imagenUrl, a.mapaUrl, a.lat, a.lng, a.gradient, a.activo
        ]
      );
      console.log(`[INSERT] Atractivo: ${a.nombre} (${a.slug})`);
    }
  }

  // 3. Insertar o actualizar Guías
  for (const g of GUIAS_DATA) {
    const [existing] = await conn.query("SELECT id FROM guias_turisticas WHERE slug = ?;", [g.slug]);
    if (existing.length > 0) {
      await conn.query(
        `UPDATE guias_turisticas SET
          cantonSlug = ?, titulo = ?, resumen = ?, categoria = ?,
          duracion = ?, nivel = ?, imagenUrl = ?, gradient = ?,
          keywords = ?, secciones = ?, activo = ?, updatedAt = NOW()
        WHERE slug = ?`,
        [
          g.cantonSlug, g.titulo, g.resumen, g.categoria,
          g.duracion, g.nivel, g.imagenUrl, g.gradient,
          g.keywords, g.secciones, g.activo,
          g.slug
        ]
      );
      console.log(`[UPDATE] Guía: ${g.titulo} (${g.slug})`);
    } else {
      await conn.query(
        `INSERT INTO guias_turisticas 
          (slug, cantonSlug, titulo, resumen, categoria, duracion, nivel, imagenUrl, gradient, keywords, secciones, activo, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          g.slug, g.cantonSlug, g.titulo, g.resumen, g.categoria,
          g.duracion, g.nivel, g.imagenUrl, g.gradient,
          g.keywords, g.secciones, g.activo
        ]
      );
      console.log(`[INSERT] Guía: ${g.titulo} (${g.slug})`);
    }
  }

  const [atCount] = await conn.query("SELECT COUNT(*) as c FROM atractivos_cantonales WHERE activo = 1;");
  const [guCount] = await conn.query("SELECT COUNT(*) as c FROM guias_turisticas WHERE activo = 1;");
  console.log(`\nSincronización finalizada con éxito.`);
  console.log(`Total atractivos activos en DB: ${atCount[0].c}`);
  console.log(`Total guías activas en DB: ${guCount[0].c}`);

  await conn.end();
}

sync().catch(err => {
  console.error("Error sincronizando:", err);
  process.exit(1);
});
