import type { Hospedaje } from "@/types";

// Datos de demostración. Reemplazar por la tabla `aliados_hospedaje` cuando se conecte la base de datos.
export const HOSPEDAJES: Hospedaje[] = [
  { slug: "hotel-boutique-centro-loja", nombre: "Hotel Boutique Centro Loja", tipo: "Hotel", cantonSlug: "loja", zona: "Centro Histórico de Loja",
    descripcion: "Hospedaje de ambiente acogedor para recorrer el centro histórico a pie y conocer la arquitectura de la ciudad.",
    desde: 55, servicios: ["Wi-Fi", "Desayuno", "Parqueadero"], verificado: true, demo: true, destacado: true,
    lat: -3.9965, lng: -79.201,
    imagen: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#8B7355,#2d6a4f 60%,#1B4332)" },

  { slug: "hosterias-de-vilcabamba", nombre: "Hostería Valle Sagrado", tipo: "Hostería", cantonSlug: "loja", zona: "Vilcabamba, Valle de la Longevidad",
    descripcion: "Hospedaje de ambiente tranquilo entre montañas, ideal para descansar y recorrer la Ruta del Café.",
    desde: 45, servicios: ["Wi-Fi", "Piscina", "Jardín", "Parqueadero"], verificado: true, demo: true, destacado: true,
    lat: -4.261, lng: -79.2217,
    imagen: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#f2c14e,#2d6a4f 55%,#12301f)" },

  { slug: "casa-rural-saraguro", nombre: "Casa Rural Saraguro", tipo: "Casa rural", cantonSlug: "saraguro", zona: "Experiencia cultural kichwa",
    descripcion: "Casa rural para vivir la cultura saragureña de cerca, con trato directo con la comunidad.",
    desde: 35, servicios: ["Desayuno", "Experiencias culturales"], verificado: true, demo: true, destacado: true,
    lat: -3.6213, lng: -79.2318,
    imagen: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#A0522D,#8B7355 50%,#2D6A8B)" },

  { slug: "hostal-valle-catamayo", nombre: "Hostal Valle del Sol", tipo: "Hostal", cantonSlug: "catamayo", zona: "Cerca del Aeropuerto de Catamayo",
    descripcion: "Hospedaje cómodo y cálido para viajeros en tránsito o visitas cortas cerca del aeropuerto.",
    desde: 30, servicios: ["Wi-Fi", "Traslado al aeropuerto"], verificado: false, demo: true,
    lat: -3.9889, lng: -79.3544,
    imagen: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#2D6A8B,#a9d6e5 60%,#1B4332)" },

  { slug: "hacienda-campestre-loja", nombre: "Hacienda Agroturística Loja", tipo: "Hacienda", cantonSlug: "loja", zona: "Valles en los alrededores de Loja",
    descripcion: "Experiencia de hacienda con amplio contacto con la naturaleza, cabalgatas y gastronomía criolla.",
    desde: 80, servicios: ["Desayuno", "Caminatas", "Parqueadero"], verificado: false, demo: true,
    lat: -4.0, lng: -79.25,
    imagen: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#1B4332,#8B7355 60%,#f2c14e)" },

  { slug: "hotel-frontera-macara", nombre: "Hotel Frontera Macará", tipo: "Hotel", cantonSlug: "macara", zona: "Zona Urbana de Macará",
    descripcion: "Establecimiento para viajeros y comerciantes en la zona fronteriza sur del Ecuador.",
    desde: 40, servicios: ["Wi-Fi", "Aire acondicionado"], verificado: false, demo: true,
    lat: -4.381, lng: -79.944,
    imagen: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=800&q=80",
    gradient: "linear-gradient(135deg,#A0522D,#2D6A8B)" },
];

export const getHospedaje = (slug: string) => HOSPEDAJES.find((h) => h.slug === slug);
