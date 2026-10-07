import type { Guia } from "@/types";

// Contenido editorial inicial. Verifica horarios, tarifas y estado de las vías antes de publicar.
export const GUIAS: Guia[] = [
  {
    slug: "ruta-del-cafe-vilcabamba",
    titulo: "Ruta del café en Vilcabamba",
    resumen: "Fincas entre montañas, tazas recién preparadas y un valle donde el ritmo baja solo.",
    categoria: "Rutas", duracion: "2 días", nivel: "Fácil", cantonSlug: "loja", fecha: "2026-10-01",
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
];

export const getGuia = (slug: string) => GUIAS.find((g) => g.slug === slug);
