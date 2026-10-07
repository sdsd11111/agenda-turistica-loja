import type { Hospedaje } from "@/types";

// Datos de demostración. Reemplazar por la tabla `aliados_hospedaje` cuando se conecte la base de datos.
export const HOSPEDAJES: Hospedaje[] = [
  { slug: "hotel-libertador", nombre: "Hotel Libertador", tipo: "Hotel", cantonSlug: "loja", zona: "Centro de Loja",
    descripcion: "Hotel céntrico para recorrer el centro histórico a pie. Ficha en proceso de verificación.",
    desde: 65, servicios: ["Wi-Fi", "Desayuno", "Parqueadero"], verificado: false, demo: true, destacado: true,
    lat: -3.9965, lng: -79.201, gradient: "linear-gradient(135deg,#8B7355,#2d6a4f 60%,#1B4332)" },
  { slug: "hosterias-de-vilcabamba", nombre: "Hosterías de Vilcabamba", tipo: "Hostería", cantonSlug: "loja", zona: "Vilcabamba, Valle de la Longevidad",
    descripcion: "Hospedaje de ambiente tranquilo entre montañas, ideal para descansar y recorrer la Ruta del Café.",
    desde: 45, servicios: ["Wi-Fi", "Piscina", "Jardín", "Parqueadero"], verificado: true, demo: true, destacado: true,
    lat: -4.261, lng: -79.2217, gradient: "linear-gradient(135deg,#f2c14e,#2d6a4f 55%,#12301f)" },
  { slug: "casa-rural-saraguro", nombre: "Casa Rural Saraguro", tipo: "Casa rural", cantonSlug: "saraguro", zona: "Experiencia cultural kichwa",
    descripcion: "Casa rural para vivir la cultura saragureña de cerca, con trato directo con la comunidad.",
    desde: 35, servicios: ["Desayuno", "Experiencias culturales"], verificado: true, demo: true, destacado: true,
    lat: -3.6213, lng: -79.2318, gradient: "linear-gradient(135deg,#A0522D,#8B7355 50%,#2D6A8B)" },
  { slug: "hostal-de-ejemplo-catamayo", nombre: "Hostal de ejemplo Catamayo", tipo: "Hostal", cantonSlug: "catamayo", zona: "Cerca del aeropuerto",
    descripcion: "Ficha de demostración para mostrar cómo se verá un hostal en Catamayo.",
    desde: 30, servicios: ["Wi-Fi", "Traslado al aeropuerto"], verificado: false, demo: true,
    lat: -3.9889, lng: -79.3544, gradient: "linear-gradient(135deg,#2D6A8B,#a9d6e5 60%,#1B4332)" },
  { slug: "hacienda-de-ejemplo-loja", nombre: "Hacienda de ejemplo", tipo: "Hacienda", cantonSlug: "loja", zona: "Alrededores de Loja",
    descripcion: "Ficha de demostración de una hacienda con alojamiento y actividades de campo.",
    desde: 80, servicios: ["Desayuno", "Caminatas", "Parqueadero"], verificado: false, demo: true,
    lat: -4.0, lng: -79.25, gradient: "linear-gradient(135deg,#1B4332,#8B7355 60%,#f2c14e)" },
  { slug: "hotel-de-ejemplo-macara", nombre: "Hotel de ejemplo Macará", tipo: "Hotel", cantonSlug: "macara", zona: "Centro de Macará",
    descripcion: "Ficha de demostración para viajeros que cruzan la frontera con Perú.",
    desde: 40, servicios: ["Wi-Fi", "Aire acondicionado"], verificado: false, demo: true,
    lat: -4.381, lng: -79.944, gradient: "linear-gradient(135deg,#A0522D,#2D6A8B)" },
];

export const getHospedaje = (slug: string) => HOSPEDAJES.find((h) => h.slug === slug);
