import type { Canton } from "@/types";

// Coordenadas aproximadas (referenciales) de cada cabecera cantonal.
export const CANTONES: Canton[] = [
  { slug: "loja", nombre: "Loja", cabecera: "Loja", emoji: "🏛️", destacado: true, lat: -3.9931, lng: -79.2042,
    descripcion: "Capital provincial: centro histórico, parques, vida cultural y gastronomía. Desde aquí parten las rutas hacia Vilcabamba y el Parque Nacional Podocarpus.",
    imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    atractivo: "Parque Nacional Podocarpus",
    gradient: "linear-gradient(135deg,#1B4332,#8B7355)" },

  { slug: "saraguro", nombre: "Saraguro", cabecera: "Saraguro", emoji: "🧵", destacado: true, lat: -3.6213, lng: -79.2318,
    descripcion: "Pueblo kichwa que conserva su vestimenta, sus textiles y su gastronomía. Una visita de cultura viva.",
    imagen: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=900&q=80",
    atractivo: "Cultura kichwa Saraguro",
    gradient: "linear-gradient(135deg,#A0522D,#8B7355)" },

  { slug: "catamayo", nombre: "Catamayo", cabecera: "Catamayo", emoji: "✈️", destacado: true, lat: -3.9889, lng: -79.3544,
    descripcion: "Valle cálido y puerta de entrada aérea a la provincia. Punto de partida habitual para llegar a Loja.",
    imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    atractivo: "Valle de Catamayo",
    gradient: "linear-gradient(135deg,#2D6A8B,#a9d6e5)" },

  { slug: "macara", nombre: "Macará", cabecera: "Macará", emoji: "🌉", destacado: true, lat: -4.381, lng: -79.944,
    descripcion: "Cantón fronterizo con Perú, de clima seco y con una identidad propia de frontera.",
    imagen: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=900&q=80",
    atractivo: "Puente internacional Macará–La Tina",
    gradient: "linear-gradient(135deg,#A0522D,#2D6A8B)" },

  { slug: "calvas", nombre: "Calvas", cabecera: "Cariamanga", emoji: "⛰️", lat: -4.3333, lng: -79.5567,
    descripcion: "Cantón del sur de la provincia, con Cariamanga como cabecera y paisajes de montaña.",
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80",
    atractivo: "Mirador de Cariamanga",
    gradient: "linear-gradient(135deg,#2d6a4f,#8B7355)" },

  { slug: "celica", nombre: "Célica", cabecera: "Célica", emoji: "🌄", lat: -4.1, lng: -79.9667,
    descripcion: "Cantón del occidente lojano, con clima templado y tradiciones propias.",
    imagen: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&q=80",
    atractivo: "Área de Bosque Protector Célica",
    gradient: "linear-gradient(135deg,#2D6A8B,#2d6a4f)" },

  { slug: "chaguarpamba", nombre: "Chaguarpamba", cabecera: "Chaguarpamba", emoji: "🌾", lat: -3.8667, lng: -79.6333,
    descripcion: "Cantón del norte de la provincia, de vocación agrícola y paisaje de valles.",
    imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    atractivo: "Valles agrícolas de Chaguarpamba",
    gradient: "linear-gradient(135deg,#8B7355,#2d6a4f)" },

  { slug: "espindola", nombre: "Espíndola", cabecera: "Amaluza", emoji: "🏞️", lat: -4.6, lng: -79.4333,
    descripcion: "Cantón del extremo sur, con Amaluza como cabecera, cerca de la frontera.",
    imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
    atractivo: "Páramos de Espíndola",
    gradient: "linear-gradient(135deg,#12301f,#2D6A8B)" },

  { slug: "gonzanama", nombre: "Gonzanamá", cabecera: "Gonzanamá", emoji: "🏘️", lat: -4.2167, lng: -79.4333,
    descripcion: "Cantón de la zona centro-sur, de pueblos tranquilos y tradición artesanal.",
    imagen: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80",
    atractivo: "Artesanías de Gonzanamá",
    gradient: "linear-gradient(135deg,#A0522D,#1B4332)" },

  { slug: "paltas", nombre: "Paltas", cabecera: "Catacocha", emoji: "🎭", lat: -4.05, lng: -79.6333,
    descripcion: "Cantón con Catacocha como cabecera, de fuerte identidad cultural.",
    imagen: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=900&q=80",
    atractivo: "Centro histórico de Catacocha",
    gradient: "linear-gradient(135deg,#8B7355,#A0522D)" },

  { slug: "pindal", nombre: "Pindal", cabecera: "Pindal", emoji: "🌳", lat: -4.1167, lng: -80.1167,
    descripcion: "Cantón del occidente de la provincia, en la zona de transición hacia la costa.",
    imagen: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=900&q=80",
    atractivo: "Bosques del occidente lojano",
    gradient: "linear-gradient(135deg,#2d6a4f,#f2c14e)" },

  { slug: "puyango", nombre: "Puyango", cabecera: "Alamor", emoji: "🪵", lat: -4.0333, lng: -80.0333,
    descripcion: "Cantón del occidente con Alamor como cabecera, cercano a zonas de bosque seco.",
    imagen: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=900&q=80",
    atractivo: "Bosque Petrificado de Puyango",
    gradient: "linear-gradient(135deg,#1B4332,#A0522D)" },

  { slug: "quilanga", nombre: "Quilanga", cabecera: "Quilanga", emoji: "🌿", lat: -4.3167, lng: -79.4,
    descripcion: "Cantón pequeño de montaña en el sur de la provincia.",
    imagen: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=900&q=80",
    atractivo: "Paisajes de montaña de Quilanga",
    gradient: "linear-gradient(135deg,#2d6a4f,#2D6A8B)" },

  { slug: "sozoranga", nombre: "Sozoranga", cabecera: "Sozoranga", emoji: "🏔️", lat: -4.3167, lng: -79.7833,
    descripcion: "Cantón del suroccidente lojano, de paisajes de altura y pueblos acogedores.",
    imagen: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    atractivo: "Cascadas de Sozoranga",
    gradient: "linear-gradient(135deg,#12301f,#8B7355)" },

  { slug: "zapotillo", nombre: "Zapotillo", cabecera: "Zapotillo", emoji: "🌵", lat: -4.3833, lng: -80.2333,
    descripcion: "Cantón fronterizo del extremo occidental, de bosque seco y clima cálido.",
    imagen: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80",
    atractivo: "Bosque seco de Zapotillo",
    gradient: "linear-gradient(135deg,#A0522D,#f2c14e)" },

  { slug: "olmedo", nombre: "Olmedo", cabecera: "Olmedo", emoji: "🛤️", lat: -4.0, lng: -79.6667,
    descripcion: "Cantón pequeño de la provincia, de ambiente rural y tranquilo.",
    imagen: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80",
    atractivo: "Paisajes rurales de Olmedo",
    gradient: "linear-gradient(135deg,#2D6A8B,#8B7355)" },
];

export const getCanton = (slug: string) => CANTONES.find((c) => c.slug === slug);
export const cantonNombre = (slug: string) => getCanton(slug)?.nombre ?? slug;
