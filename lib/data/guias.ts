import type { Guia } from "@/types";

// Contenido editorial inicial. Verifica horarios, tarifas y estado de las vías antes de publicar.
export const GUIAS: Guia[] = [
  {
    slug: "ruta-del-cafe-vilcabamba",
    titulo: "Ruta del café en Vilcabamba",
    resumen: "Fincas entre montañas, tazas recién preparadas y un valle donde el ritmo baja solo.",
    categoria: "Rutas", duracion: "2 días", nivel: "Fácil", cantonSlug: "loja", fecha: "2026-10-01",
    imagen: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#8B7355,#A0522D 45%,#2d6a4f)",
    keywords: ["ruta del café vilcabamba", "café en loja", "qué hacer en vilcabamba"],
    secciones: [
      { titulo: "Por qué Vilcabamba", parrafos: [
        "Vilcabamba es una parroquia del cantón Loja, conocida como el Valle de la Longevidad. Su clima amable y su paisaje de montaña la hacen ideal para bajar el ritmo.",
        "La zona tiene tradición cafetalera, y recorrerla es una buena excusa para conocer fincas, probar café de origen y conversar con quienes lo cultivan." ] },
      { titulo: "Cómo armar los dos días", parrafos: [
        "El primer día, llega temprano desde Loja, instálate en tu hospedaje y dedica la tarde a una finca o cafetería de la zona. El segundo día, camina por el pueblo y alarga el desayuno.",
        "Escribe a cada finca antes de ir: los horarios de visita y las catas cambian según la temporada. Los contactos verificados están en nuestras fichas de hospedaje." ] },
      { titulo: "Consejos prácticos", parrafos: [
        "Lleva ropa ligera y una chaqueta para la noche. Si viajas en carro, revisa combustible y llantas antes de salir de Loja; en nuestra sección de auxilio en ruta tienes el directorio de apoyo." ] },
    ],
  },
  {
    slug: "saraguro-turismo-cultural-kichwa",
    titulo: "Saraguro: turismo cultural kichwa",
    resumen: "Un pueblo que conserva su vestimenta, sus textiles y su gastronomía, y la comparte con orgullo.",
    categoria: "Cultura", duracion: "1 día", nivel: "Fácil", cantonSlug: "saraguro", fecha: "2026-10-01",
    imagen: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#A0522D,#1B4332 60%,#2D6A8B)",
    keywords: ["turismo en saraguro", "cultura kichwa saraguro", "qué hacer en saraguro"],
    secciones: [
      { titulo: "Una cultura viva", parrafos: [
        "Saraguro es el territorio del pueblo kichwa Saraguro. Aquí la vestimenta tradicional no es un disfraz para turistas: se usa a diario, y eso se nota en las calles y en el mercado.",
        "Visitar con respeto es la regla: pregunta antes de fotografiar a las personas y prefiere comprar directamente a quienes elaboran los textiles." ] },
      { titulo: "Qué hacer en un día", parrafos: [
        "Recorre el centro, visita el mercado, prueba la comida local y busca artesanías. Si quieres una experiencia más profunda, coordina con anticipación una visita comunitaria.",
        "Saraguro está al norte de Loja, sobre la vía hacia Cuenca, por lo que también funciona como parada de ruta." ] },
      { titulo: "Dónde dormir", parrafos: [
        "Si quieres quedarte, revisa nuestras fichas de hospedaje en Saraguro y escribe directo por WhatsApp, sin intermediarios ni comisiones." ] },
    ],
  },
  {
    slug: "parque-podocarpus-senderismo",
    titulo: "Parque Podocarpus: senderismo en el bosque de niebla",
    resumen: "Caminatas por bosque cargado de niebla, con una biodiversidad que sorprende en cada sendero.",
    categoria: "Naturaleza", duracion: "1 día", nivel: "Moderado", cantonSlug: "loja", fecha: "2026-10-01",
    imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#a9d6e5,#2D6A8B 40%,#12301f)",
    keywords: ["parque podocarpus", "senderismo loja", "bosque de niebla ecuador"],
    secciones: [
      { titulo: "El bosque", parrafos: [
        "El Parque Nacional Podocarpus protege bosque de niebla y páramo en la zona sur del país, con una biodiversidad notable. Es uno de los grandes atractivos naturales cerca de la ciudad de Loja.",
        "La humedad, la niebla y los cambios de altura hacen que el paisaje cambie en pocos kilómetros." ] },
      { titulo: "Cómo prepararte", parrafos: [
        "Lleva calzado con buen agarre, chaqueta impermeable, agua y algo de comer. El clima cambia rápido: sal temprano y regresa con luz.",
        "Consulta con anticipación las condiciones de los senderos y los requisitos de ingreso con la administración del área protegida." ] },
      { titulo: "Nivel y tiempos", parrafos: [
        "Con un día completo es posible hacer una caminata moderada. Si quieres más, combina la visita con una noche en Loja o en Vilcabamba." ] },
    ],
  },
  {
    slug: "que-hacer-en-loja-3-dias",
    titulo: "Qué hacer en Loja en 3 días",
    resumen: "Ciudad, naturaleza y un valle de descanso: una ruta realista para un fin de semana largo.",
    categoria: "Itinerarios", duracion: "3 días", nivel: "Fácil", cantonSlug: "loja", fecha: "2026-10-01",
    imagen: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#1B4332,#8B7355 60%,#f2c14e)",
    keywords: ["qué hacer en loja ecuador", "itinerario loja 3 días", "descubre loja"],
    secciones: [
      { titulo: "Día 1: la ciudad", parrafos: [
        "Dedica el primer día al centro histórico y a un parque de la ciudad. Cierra con una cena local; Loja tiene una vida cultural activa y se disfruta caminando." ] },
      { titulo: "Día 2: naturaleza", parrafos: [
        "Sal temprano hacia el Parque Nacional Podocarpus y reserva la tarde para descansar. Si prefieres algo más tranquilo, visita un parque o jardín cercano." ] },
      { titulo: "Día 3: el valle", parrafos: [
        "Viaja a Vilcabamba, camina por el pueblo y prueba café local. Regresa a Loja con calma o continúa tu ruta hacia el sur." ] },
    ],
  },
  {
    slug: "como-llegar-a-loja",
    titulo: "Cómo llegar a Loja: aeropuerto, bus y carro",
    resumen: "Las formas de llegar a la provincia y lo que conviene saber antes de salir.",
    categoria: "Logística", duracion: "Lectura de 5 min", nivel: "Fácil", cantonSlug: "catamayo", fecha: "2026-10-01",
    imagen: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#2D6A8B,#a9d6e5 60%,#1B4332)",
    keywords: ["cómo llegar a loja", "aeropuerto catamayo", "bus a loja"],
    secciones: [
      { titulo: "En avión", parrafos: [
        "El aeropuerto de la provincia está en Catamayo, a poca distancia de la ciudad de Loja. Confirma con tu aerolínea los vuelos y horarios vigentes antes de reservar." ] },
      { titulo: "En bus", parrafos: [
        "Loja se conecta por carretera con otras ciudades del país. Revisa con la terminal terrestre las frecuencias y tarifas actuales; cambian con frecuencia." ] },
      { titulo: "En carro", parrafos: [
        "Si viajas en carro, consulta el estado de las vías antes de salir, revisa llantas y combustible, y guarda el directorio de auxilio en ruta en tu teléfono." ] },
    ],
  },
  {
    slug: "hoteles-en-vilcabamba",
    titulo: "Hoteles en Vilcabamba: cómo elegir",
    resumen: "Hosterías, casas rurales y hostales: qué mirar antes de escribir para reservar.",
    categoria: "Hospedaje", duracion: "Lectura de 4 min", nivel: "Fácil", cantonSlug: "loja", fecha: "2026-10-01",
    imagen: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#f2c14e,#2d6a4f 55%,#12301f)",
    keywords: ["hoteles en vilcabamba", "hospedaje vilcabamba", "hosterías vilcabamba"],
    secciones: [
      { titulo: "Qué tipo de hospedaje buscas", parrafos: [
        "En Vilcabamba conviven hosterías con jardín, casas rurales y hostales sencillos. Define si priorizas descanso, presupuesto o cercanía al pueblo." ] },
      { titulo: "Qué preguntar al escribir", parrafos: [
        "Pregunta por la tarifa final, el desayuno, el parqueadero y el acceso por carretera. Contactar directo por WhatsApp evita comisiones de plataformas." ] },
      { titulo: "Dónde ver opciones", parrafos: [
        "En nuestro catálogo de hospedaje puedes filtrar por cantón y tipo, y ver cuáles establecimientos ya están verificados por GuIAloja." ] },
    ],
  },
  {
    slug: "que-hacer-en-macara-y-la-frontera",
    titulo: "Qué hacer en Macará y la frontera",
    resumen: "Una escala distinta en el sur: clima seco, ambiente fronterizo y paso hacia Perú.",
    categoria: "Cantones", duracion: "Medio día", nivel: "Fácil", cantonSlug: "macara", fecha: "2026-10-01",
    imagen: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#A0522D,#2D6A8B)",
    keywords: ["qué hacer en macará", "frontera ecuador perú macará", "turismo macará"],
    secciones: [
      { titulo: "Una ciudad de paso", parrafos: [
        "Macará es el cantón fronterizo con Perú. Tiene un ambiente propio, de comercio y tránsito, y clima más seco que el de la ciudad de Loja." ] },
      { titulo: "Si cruzas la frontera", parrafos: [
        "Antes de viajar, verifica los requisitos de documentación y el horario del paso fronterizo en fuentes oficiales; pueden cambiar." ] },
    ],
  },
  {
    slug: "auxilio-mecanico-en-carretera-loja",
    titulo: "Qué hacer si se te daña el carro en la vía",
    resumen: "Pasos de seguridad y cómo encontrar talleres y grúas en la provincia de Loja.",
    categoria: "Auxilio en ruta", duracion: "Lectura de 4 min", nivel: "Fácil", cantonSlug: "loja", fecha: "2026-10-01",
    imagen: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#5c1010,#C0392B 60%,#2a0808)",
    keywords: ["auxilio mecánico en carretera loja", "grúa loja", "taller mecánico loja"],
    secciones: [
      { titulo: "Primero, tu seguridad", parrafos: [
        "Detente en un lugar seguro, enciende las luces de emergencia y señaliza tu vehículo. Si hay heridos o peligro, llama al ECU 911." ] },
      { titulo: "Pide ayuda con tu ubicación", parrafos: [
        "En la página de auxilio en ruta puedes compartir tu ubicación para ver los servicios más cercanos. Si no tienes señal, describe al operador el último punto conocido de la vía." ] },
      { titulo: "Antes de salir de viaje", parrafos: [
        "Revisa llantas, frenos, aceite y combustible, lleva herramientas básicas y guarda los contactos de talleres y grúas de tu ruta." ] },
    ],
  },
  {
    slug: "bosque-petrificado-puyango-guia",
    titulo: "Bosque Petrificado de Puyango: Guía de visita, fósiles y cómo llegar",
    resumen: "Uno de los yacimientos de madera petrificada más grandes del planeta, compartido entre Loja y El Oro. Todo para planificar tu visita.",
    categoria: "Naturaleza", duracion: "1 día completo", nivel: "Fácil", cantonSlug: "puyango", fecha: "2026-10-09",
    imagen: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#5c4033,#8B5A2B 50%,#2d6a4f)",
    keywords: ["bosque petrificado puyango", "puyango loja", "fosiles puyango ecuador", "turismo puyango", "como llegar bosque petrificado puyango"],
    secciones: [
      {
        titulo: "Un museo natural al aire libre",
        parrafos: [
          "El Bosque Petrificado de Puyango alberga una de las colecciones de troncos y árboles petrificados marinos y terrestres más imponentes de Sudamérica, con más de 100 millones de años de antigüedad.",
          "El área protegida cuenta con senderos autoguiados y acompañamiento de guardaparques locales que explican los procesos geológicos que transformaron la madera en roca viva.",
        ],
      },
      {
        titulo: "Cómo llegar y mejores horarios",
        parrafos: [
          "Se accede desde Alamor (cabecera cantonal de Puyango) o desde la vía Arenillas-Alamor. El trayecto ofrece miradores sobre el valle del río Puyango.",
          "Se recomienda visitar en horas de la mañana para evitar el calor fuerte del mediodía y llevar abundante agua, sombrero y calzado cómodo para caminata.",
        ],
      },
      {
        titulo: "Recomendaciones prácticas",
        parrafos: [
          "La entrada tiene un costo simbólico regulado por el consorcio de administración. Está prohibido retirar cualquier fragmento de roca o fósil del área protegida.",
          "Combina la visita almorzando en Alamor o descansando en los hostales y fincas turísticas del cantón Puyango.",
        ],
      },
    ],
  },
  {
    slug: "romeria-virgen-del-cisne-loja",
    titulo: "Romería de la Virgen del Cisne: Fechas, rutas y guía para el peregrino",
    resumen: "La manifestación de fe y turismo religioso más grande del sur de Ecuador. Tramos, fechas de agosto y consejos de viaje.",
    categoria: "Cultura", duracion: "3 días / Romería", nivel: "Moderado", cantonSlug: "loja", fecha: "2026-10-09",
    imagen: "https://images.unsplash.com/photo-1548625361-16a70e704a43?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#1B365D,#4A69BD 50%,#F6B93B)",
    keywords: ["virgen del cisne", "romeria virgen del cisne loja", "santuario el cisne", "fechas romeria loja", "turismo religioso ecuador"],
    secciones: [
      {
        titulo: "La peregrinación más convocante del Austro",
        parrafos: [
          "Cada mes de agosto, cientos de miles de devotos y visitantes acompañan a 'La Churona' en su tradicional caminata de más de 70 kilómetros desde el Santuario Nacional de El Cisne hasta la Catedral de Loja.",
          "El recorrido se divide históricamente en tres etapas principales: El Cisne a San Pedro de la Bendita, luego a Catamayo, y finalmente el ascenso a Loja el 20 de agosto.",
        ],
      },
      {
        titulo: "Logística y hospedaje con tiempo",
        parrafos: [
          "Durante los días de romería y las festividades septembrinas de Loja, la ocupación hotelera en Loja, Catamayo y El Cisne llega a su capacidad máxima.",
          "Es fundamental asegurar tu hospedaje con semanas de antelación. Revisa nuestro catálogo provincial de hoteles para contactar de manera directa con los anfitriones.",
        ],
      },
      {
        titulo: "Consejos para caminar la romería",
        parrafos: [
          "Usa zapatos deportivos con amortiguación ya usados (no nuevos), medias gruesas de algodón, protector solar, gorra y abrigo para la noche.",
          "Encuentra puntos de hidratación y asistencia médica de la Cruz Roja y auxilio vial a lo largo de toda la vía durante las jornadas oficiales.",
        ],
      },
    ],
  },
  {
    slug: "quilanga-ruta-cafe-mirador-chiro",
    titulo: "Quilanga: Ruta del café de especialidad y Mirador de Chiro",
    resumen: "Valles andinos de altura productores de café de Taza Dorada, senderos campesinos y vistas panorámicas de ensueño.",
    categoria: "Rutas",
    duracion: "1 a 2 días",
    nivel: "Fácil",
    cantonSlug: "quilanga",
    fecha: "2026-10-09",
    imagen: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#2d6a4f,#2D6A8B 60%,#1B4332)",
    keywords: ["turismo quilanga", "cafe de especialidad quilanga", "mirador de chiro", "que hacer en quilanga"],
    secciones: [
      {
        titulo: "El secreto del mejor café del Ecuador",
        parrafos: [
          "Quilanga se ha consolidado en el mapa internacional por sus microclimas privilegiados en las estribaciones de la cordillera, cuna de variedades de café arábigo que han ganado múltiples ediciones de Taza Dorada.",
          "Caminar entre los cafetales de altura bajo sombra permite comprender el proceso minucioso de cosecha manual, despulpado y secado al sol que practican las familias caficultoras.",
        ],
      },
      {
        titulo: "Mirador de Chiro y senderos andinos",
        parrafos: [
          "Desde las alturas del Mirador de Chiro se divisa la cuenca del río Catamayo y los cerros ondulados del sur lojano, siendo un punto privilegiado para la fotografía de atardeceres y avistamiento de aves de montaña.",
          "El pueblo mantiene un ambiente sereno y seguro, perfecto para desconectarse y saborear una taza recién filtrada en las cafeterías artesanales del parque central.",
        ],
      },
    ],
  },
  {
    slug: "zapotillo-guayacanes-bosque-seco",
    titulo: "Zapotillo: Bosque seco, florecimiento de guayacanes y gastronomía caprina",
    resumen: "El fenómeno natural más impresionante de la provincia de Loja, Reserva de Biósfera y el tradicional chivo al hueco.",
    categoria: "Naturaleza",
    duracion: "2 días",
    nivel: "Fácil",
    cantonSlug: "zapotillo",
    fecha: "2026-10-09",
    imagen: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#A0522D,#f2c14e 60%,#1B4332)",
    keywords: ["florecimiento de guayacanes zapotillo", "bosque seco zapotillo", "turismo zapotillo", "chivo al hueco zapotillo"],
    secciones: [
      {
        titulo: "El milagro amarillo del bosque seco",
        parrafos: [
          "Con las primeras lluvias de invierno (usualmente entre diciembre y enero), más de 40.000 hectáreas de bosque seco en las parroquias Mangahurco, Bolaspamba y Cazaderos florecen de forma sincronizada, pintando de amarillo intenso todo el horizonte.",
          "El espectáculo dura entre 4 y 6 días antes de que las flores caigan como una alfombra dorada sobre el suelo, atrayendo a miles de abejas, mariposas y viajeros de todo el mundo.",
        ],
      },
      {
        titulo: "Gastronomía y tradición fronteriza",
        parrafos: [
          "Zapotillo deleita al viajero con su plato insignia: el chivo al hueco, cocinado lentamente bajo tierra con leña de faique y sazón criolla tradicional.",
          "La Reserva de Biósfera del Bosque Seco alberga cocodrilos de la costa, monos aulladores y aves endémicas de la región tumbesina.",
        ],
      },
    ],
  },
  {
    slug: "espindola-lagunas-negras-yacuri",
    titulo: "Espíndola: Lagunas Negras de Jimbura y Parque Nacional Yacuri",
    resumen: "Lagunas glaciares a más de 3.400 metros de altura, orquídeas de páramo y leyendas ancestrales en la frontera sur.",
    categoria: "Aventura",
    duracion: "1 a 2 días",
    nivel: "Moderado",
    cantonSlug: "espindola",
    fecha: "2026-10-09",
    imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#12301f,#2D6A8B 60%,#1B4332)",
    keywords: ["lagunas negras de jimbura", "parque nacional yacuri", "turismo espindola", "amaluza loja"],
    secciones: [
      {
        titulo: "El páramo místico de Yacuri",
        parrafos: [
          "El Parque Nacional Yacuri protege uno de los complejos lacustres de alta montaña más prístinos del Ecuador. Las Lagunas Negras se asientan sobre lechos volcánicos con aguas de un tono azul profundo casi azabache.",
          "Es un destino soñado para montañistas, observadores de flora alpina y amantes del senderismo que buscan silencio absoluto y aire puro.",
        ],
      },
    ],
  },
  {
    slug: "calvas-cariamanga-cerro-ahuaca",
    titulo: "Calvas: Escalada en el Cerro El Ahuaca y miradores de Cariamanga",
    resumen: "El monolito de granito más impresionante de los Andes lojanos, rutas de escalada deportiva y gastronomía calvense.",
    categoria: "Aventura",
    duracion: "1 día",
    nivel: "Moderado",
    cantonSlug: "calvas",
    fecha: "2026-10-09",
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#2d6a4f,#8B7355 60%,#1B4332)",
    keywords: ["cerro ahuaca cariamanga", "turismo calvas", "escalada cerro ahuaca", "cariamanga loja"],
    secciones: [
      {
        titulo: "El gigante de roca de Cariamanga",
        parrafos: [
          "El Cerro El Ahuaca es un macizo granítico que se eleva sobre los 2.470 metros sobre el nivel del mar, visible desde kilómetros a la redonda y hogar de la vizcacha de montaña, especie endémica de la zona.",
          "Sus paredes verticales cuentan con decenas de vías abiertas para escalada en roca de diversa dificultad, además de un sendero peatonal que conduce hasta su cumbre con una vista de 360 grados de los valles del sur.",
        ],
      },
    ],
  },
];

export const getGuia = (slug: string) => GUIAS.find((g) => g.slug === slug);

