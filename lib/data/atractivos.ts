import type { Atractivo } from "@/types";

// Ubicaciones referenciales. Confirmar coordenadas y horarios antes de publicar.
export const ATRACTIVOS: Atractivo[] = [
  { slug: "parque-nacional-podocarpus", nombre: "Parque Nacional Podocarpus", cantonSlug: "loja", categoria: "Naturaleza", emoji: "🌲",
    descripcion: "Bosque de niebla de enorme biodiversidad, con senderos para caminar entre vegetación húmeda y montañosa.",
    duracion: "1 día", lat: -4.113, lng: -79.178,
    imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#a9d6e5,#2D6A8B 40%,#12301f)" },

  { slug: "vilcabamba", nombre: "Vilcabamba", cantonSlug: "loja", categoria: "Naturaleza", emoji: "🌿",
    descripcion: "Parroquia del cantón Loja conocida como el Valle de la Longevidad. Clima amable, hosterías y la Ruta del Café.",
    duracion: "2 días", lat: -4.261, lng: -79.2217,
    imagen: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#f2c14e,#2d6a4f 55%,#12301f)" },

  { slug: "centro-historico-de-loja", nombre: "Centro histórico de Loja", cantonSlug: "loja", categoria: "Patrimonio", emoji: "🏛️",
    descripcion: "Plazas, iglesias y calles para recorrer a pie, con cafeterías y vida cultural a pocos pasos.",
    duracion: "Medio día", lat: -3.9931, lng: -79.2042,
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#1B4332,#8B7355)" },

  { slug: "parque-jipiro", nombre: "Parque Jipiro", cantonSlug: "loja", categoria: "Parque", emoji: "🎡",
    descripcion: "Gran parque recreativo de la ciudad, pensado para pasear en familia.",
    duracion: "2 horas", lat: -3.9758, lng: -79.2023,
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#2d6a4f,#f2c14e)" },

  { slug: "santuario-de-el-cisne", nombre: "Santuario de El Cisne", cantonSlug: "loja", categoria: "Religioso", emoji: "⛪",
    descripcion: "Santuario mariano de gran devoción, destino de peregrinación en la provincia.",
    duracion: "Medio día", lat: -3.8667, lng: -79.4167,
    imagen: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#8B7355,#2D6A8B)" },

  { slug: "saraguro-cultura-kichwa", nombre: "Saraguro y su cultura kichwa", cantonSlug: "saraguro", categoria: "Cultura", emoji: "🧵",
    descripcion: "Pueblo que mantiene su vestimenta, textiles y gastronomía. Se visita bien en un día.",
    duracion: "1 día", lat: -3.6213, lng: -79.2318,
    imagen: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#A0522D,#1B4332 60%,#2D6A8B)" },

  { slug: "catamayo-valle", nombre: "Valle de Catamayo", cantonSlug: "catamayo", categoria: "Naturaleza", emoji: "🌄",
    descripcion: "Valle de clima cálido, de paso obligado para quien llega por aire a la provincia.",
    duracion: "Medio día", lat: -3.9889, lng: -79.3544,
    imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#2D6A8B,#f2c14e)" },

  { slug: "macara-frontera", nombre: "Macará y la frontera", cantonSlug: "macara", categoria: "Cultura", emoji: "🌉",
    descripcion: "Ciudad de frontera con Perú, con ambiente propio y paso hacia el sur.",
    duracion: "Medio día", lat: -4.381, lng: -79.944,
    imagen: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#A0522D,#2D6A8B)" },

  { slug: "pindal-complejo-piscinas-naturales", nombre: "Piscinas Naturales y Cascadas de Pindal", cantonSlug: "pindal", categoria: "Naturaleza", emoji: "💦",
    descripcion: "Pozas y balnearios de agua cristalina rodeados de vegetación subtropical, ideales para refrescarse y disfrutar en familia.",
    duracion: "1 día", lat: -4.1167, lng: -80.1167,
    imagen: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#0077b6,#52b788)" },

  { slug: "pindal-bosque-seco-colinas", nombre: "Mirador de las Colinas y Maizales", cantonSlug: "pindal", categoria: "Aventura", emoji: "🌽",
    descripcion: "Pindal es conocido como la capital maicera del Ecuador; sus colinas ofrecen senderos con vistas a los campos verdes y cálidos valles.",
    duracion: "Medio día", lat: -4.125, lng: -80.11,
    imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#52b788,#d4a373)" },

  { slug: "calvas-cerro-ahuaca", nombre: "Cerro El Ahuaca", cantonSlug: "calvas", categoria: "Aventura", emoji: "⛰️",
    descripcion: "Monolito de granito gigantesco en Cariamanga, famoso por sus rutas de escalada en roca y miradores panorámicos.",
    duracion: "1 día", lat: -4.3333, lng: -79.5567,
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#2d6a4f,#8B7355)" },

  { slug: "puyango-bosque-petrificado", nombre: "Bosque Petrificado de Puyango", cantonSlug: "puyango", categoria: "Patrimonio", emoji: "🪵",
    descripcion: "Una de las reservas de árboles petrificados marinos y fósiles más grandes y antiguas del continente americano.",
    duracion: "1 día", lat: -3.874, lng: -80.084,
    imagen: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#1B4332,#A0522D)" },

  { slug: "zapotillo-florecimiento-guayacanes", nombre: "Bosque Seco y Florecimiento de los Guayacanes", cantonSlug: "zapotillo", categoria: "Naturaleza", emoji: "🌼",
    descripcion: "Espectáculo natural de millones de flores amarillas que cubren el bosque seco caducifolio tras las primeras lluvias del año.",
    duracion: "2 días", lat: -4.3833, lng: -80.2333,
    imagen: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#A0522D,#f2c14e)" },

  { slug: "celica-mirador-pucara", nombre: "Mirador de Pucará y Bosque Nublado", cantonSlug: "celica", categoria: "Naturaleza", emoji: "🌄",
    descripcion: "Conocida como la 'Ciudad Celeste' por sus nieblas y miradores naturales que divisan los valles costeros.",
    duracion: "Medio día", lat: -4.1, lng: -79.9667,
    imagen: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#2D6A8B,#2d6a4f)" },

  { slug: "paltas-balcon-del-inca", nombre: "El Shiriculapo y Mirador Balcón del Inca", cantonSlug: "paltas", categoria: "Patrimonio", emoji: "🎭",
    descripcion: "Majestuoso abismo rocoso y mirador sagrado preincaico en Catacocha, Patrimonio Cultural del Ecuador.",
    duracion: "Medio día", lat: -4.05, lng: -79.6333,
    imagen: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#8B7355,#A0522D)" },

  { slug: "espindola-lagunas-amaluza", nombre: "Complejo de Lagunas Negras de Jimbura", cantonSlug: "espindola", categoria: "Naturaleza", emoji: "🏞️",
    descripcion: "Lagunas glaciares en los altos páramos del Parque Nacional Yacuri, un paraíso de senderismo místico.",
    duracion: "1 día", lat: -4.6, lng: -79.4333,
    imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#12301f,#2D6A8B)" },

  { slug: "gonzanama-cerro-colambo", nombre: "Cerro Colambo y Tradición Textil", cantonSlug: "gonzanama", categoria: "Cultura", emoji: "🏘️",
    descripcion: "Santuario natural de biodiversidad y cuna de hábiles tejedores de alforjas y ponchos tradicionales.",
    duracion: "Medio día", lat: -4.2167, lng: -79.4333,
    imagen: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#A0522D,#1B4332)" },

  { slug: "sozoranga-reserva-yatana", nombre: "Reserva Natural El Ceibal y Bosque Yatana", cantonSlug: "sozoranga", categoria: "Naturaleza", emoji: "🌳",
    descripcion: "Hogar de aves endémicas y bosques tropicales secos protegidos con senderos de aventura.",
    duracion: "1 día", lat: -4.3167, lng: -79.7833,
    imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#12301f,#8B7355)" },

  { slug: "chaguarpamba-rutas-cafe", nombre: "Cascadas de Chaguarpamba y Fincas Cafeteras", cantonSlug: "chaguarpamba", categoria: "Naturaleza", emoji: "🌾",
    descripcion: "Cálidas cascadas y fincas productoras de café aromático de altura en un entorno verde y pacífico.",
    duracion: "Medio día", lat: -3.8667, lng: -79.6333,
    imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#8B7355,#2d6a4f)" },

  { slug: "quilanga-aroma-cafe-montana", nombre: "Mirador de Chiro y Rutas de Café de Especialidad", cantonSlug: "quilanga", categoria: "Naturaleza", emoji: "☕",
    descripcion: "Valles andinos de altura donde se cultiva café galardonado con Taza Dorada, entre senderos de aire puro.",
    duracion: "Medio día", lat: -4.3167, lng: -79.4,
    imagen: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#2d6a4f,#2D6A8B)" },

  { slug: "olmedo-valles-agricolas", nombre: "Senderos Rurales y Mirador La Rinconada", cantonSlug: "olmedo", categoria: "Naturaleza", emoji: "🛤️",
    descripcion: "Paraje campestre de tranquilidad absoluta, moliendas tradicionales y acogedores senderos.",
    duracion: "Medio día", lat: -4.0, lng: -79.6667,
    imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#2D6A8B,#8B7355)" },
];

export const getAtractivo = (slug: string) => ATRACTIVOS.find((a) => a.slug === slug);
