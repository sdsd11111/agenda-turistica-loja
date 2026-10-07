import type { ServicioRuta, TipoServicio } from "@/types";

export const TIPOS_SERVICIO: { id: TipoServicio; label: string; emoji: string }[] = [
  { id: "TALLER", label: "Talleres mecánicos", emoji: "🔧" },
  { id: "GRUA", label: "Grúas y auxilio", emoji: "🚛" },
  { id: "GASOLINERA", label: "Estaciones de servicio", emoji: "⛽" },
  { id: "RENT_A_CAR", label: "Rent a car", emoji: "🚗" },
];

// Registros de demostración SIN teléfono. Se reemplazan por servicios verificados uno a uno.
export const SERVICIOS: ServicioRuta[] = [
  { id: "taller-demo-loja", nombre: "Taller de ejemplo, Loja", tipo: "TALLER", cantonSlug: "loja",
    descripcion: "Registro de demostración. Aquí aparecerá un taller verificado.", telefono: null, disponible24h: false,
    lat: -3.9931, lng: -79.2042, demo: true },
  { id: "grua-demo-loja", nombre: "Grúa de ejemplo, Loja", tipo: "GRUA", cantonSlug: "loja",
    descripcion: "Registro de demostración. Aquí aparecerá un servicio de grúa verificado.", telefono: null, disponible24h: true,
    lat: -3.9965, lng: -79.21, demo: true },
  { id: "gasolinera-demo-catamayo", nombre: "Estación de servicio de ejemplo, Catamayo", tipo: "GASOLINERA", cantonSlug: "catamayo",
    descripcion: "Registro de demostración para la ruta Loja–Catamayo.", telefono: null, disponible24h: false,
    lat: -3.9889, lng: -79.3544, demo: true },
  { id: "taller-demo-vilcabamba", nombre: "Taller de ejemplo, Vilcabamba", tipo: "TALLER", cantonSlug: "loja",
    descripcion: "Registro de demostración para la ruta hacia el sur.", telefono: null, disponible24h: false,
    lat: -4.261, lng: -79.2217, demo: true },
  { id: "rent-demo-loja", nombre: "Rent a car de ejemplo, Loja", tipo: "RENT_A_CAR", cantonSlug: "loja",
    descripcion: "Registro de demostración de un servicio de alquiler de vehículos.", telefono: null, disponible24h: false,
    lat: -3.9931, lng: -79.2042, demo: true },
  { id: "grua-demo-saraguro", nombre: "Grúa de ejemplo, Saraguro", tipo: "GRUA", cantonSlug: "saraguro",
    descripcion: "Registro de demostración para la vía Loja–Cuenca.", telefono: null, disponible24h: true,
    lat: -3.6213, lng: -79.2318, demo: true },
];
