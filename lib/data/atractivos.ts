import type { Atractivo } from "@/types";

// Ubicaciones referenciales. Confirmar coordenadas y horarios antes de publicar.
export const ATRACTIVOS: Atractivo[] = [
  { slug: "parque-nacional-podocarpus", nombre: "Parque Nacional Podocarpus", cantonSlug: "loja", categoria: "Naturaleza", emoji: "🌲",
    descripcion: "Bosque de niebla de enorme biodiversidad, con senderos para caminar entre vegetación húmeda y montañosa.",
    duracion: "1 día", lat: -4.113, lng: -79.178, gradient: "linear-gradient(135deg,#a9d6e5,#2D6A8B 40%,#12301f)" },
  { slug: "vilcabamba", nombre: "Vilcabamba", cantonSlug: "loja", categoria: "Naturaleza", emoji: "🌿",
    descripcion: "Parroquia del cantón Loja conocida como el Valle de la Longevidad. Clima amable, hosterías y la Ruta del Café.",
    duracion: "2 días", lat: -4.261, lng: -79.2217, gradient: "linear-gradient(135deg,#f2c14e,#2d6a4f 55%,#12301f)" },
  { slug: "centro-historico-de-loja", nombre: "Centro histórico de Loja", cantonSlug: "loja", categoria: "Patrimonio", emoji: "🏛️",
    descripcion: "Plazas, iglesias y calles para recorrer a pie, con cafeterías y vida cultural a pocos pasos.",
    duracion: "Medio día", lat: -3.9931, lng: -79.2042, gradient: "linear-gradient(135deg,#1B4332,#8B7355)" },
  { slug: "parque-jipiro", nombre: "Parque Jipiro", cantonSlug: "loja", categoria: "Parque", emoji: "🎡",
    descripcion: "Gran parque recreativo de la ciudad, pensado para pasear en familia.",
    duracion: "2 horas", lat: -3.9758, lng: -79.2023, gradient: "linear-gradient(135deg,#2d6a4f,#f2c14e)" },
  { slug: "santuario-de-el-cisne", nombre: "Santuario de El Cisne", cantonSlug: "loja", categoria: "Religioso", emoji: "⛪",
    descripcion: "Santuario mariano de gran devoción, destino de peregrinación en la provincia.",
    duracion: "Medio día", lat: -3.8667, lng: -79.4167, gradient: "linear-gradient(135deg,#8B7355,#2D6A8B)" },
  { slug: "saraguro-cultura-kichwa", nombre: "Saraguro y su cultura kichwa", cantonSlug: "saraguro", categoria: "Cultura", emoji: "🧵",
    descripcion: "Pueblo que mantiene su vestimenta, textiles y gastronomía. Se visita bien en un día.",
    duracion: "1 día", lat: -3.6213, lng: -79.2318, gradient: "linear-gradient(135deg,#A0522D,#1B4332 60%,#2D6A8B)" },
  { slug: "catamayo-valle", nombre: "Valle de Catamayo", cantonSlug: "catamayo", categoria: "Naturaleza", emoji: "🌄",
    descripcion: "Valle de clima cálido, de paso obligado para quien llega por aire a la provincia.",
    duracion: "Medio día", lat: -3.9889, lng: -79.3544, gradient: "linear-gradient(135deg,#2D6A8B,#f2c14e)" },
  { slug: "macara-frontera", nombre: "Macará y la frontera", cantonSlug: "macara", categoria: "Cultura", emoji: "🌉",
    descripcion: "Ciudad de frontera con Perú, con ambiente propio y paso hacia el sur.",
    duracion: "Medio día", lat: -4.381, lng: -79.944, gradient: "linear-gradient(135deg,#A0522D,#2D6A8B)" },
];

export const getAtractivo = (slug: string) => ATRACTIVOS.find((a) => a.slug === slug);
