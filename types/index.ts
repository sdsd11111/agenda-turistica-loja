export type Canton = {
  slug: string;
  nombre: string;
  cabecera: string;
  descripcion: string;
  emoji: string;
  gradient: string;
  lat: number;
  lng: number;
  destacado?: boolean;
};

export type TipoHospedaje = "Hotel" | "Hostal" | "Hostería" | "Hacienda" | "Casa rural";

export type Hospedaje = {
  slug: string;
  nombre: string;
  tipo: TipoHospedaje;
  cantonSlug: string;
  zona: string;
  descripcion: string;
  desde: number;
  servicios: string[];
  verificado: boolean;
  demo: boolean;
  lat: number;
  lng: number;
  gradient: string;
  imagen?: string;
  destacado?: boolean;
};

export type CategoriaAtractivo = "Naturaleza" | "Cultura" | "Patrimonio" | "Religioso" | "Parque";

export type Atractivo = {
  slug: string;
  nombre: string;
  cantonSlug: string;
  categoria: CategoriaAtractivo;
  descripcion: string;
  emoji: string;
  gradient: string;
  lat: number;
  lng: number;
  duracion?: string;
};

export type TipoServicio = "TALLER" | "GRUA" | "RENT_A_CAR" | "GASOLINERA";

export type ServicioRuta = {
  id: string;
  nombre: string;
  tipo: TipoServicio;
  cantonSlug: string;
  descripcion: string;
  telefono: string | null;
  disponible24h: boolean;
  lat: number;
  lng: number;
  demo: boolean;
};

export type GuiaSeccion = { titulo: string; parrafos: string[] };

export type Guia = {
  slug: string;
  titulo: string;
  resumen: string;
  categoria: string;
  duracion: string;
  nivel: "Fácil" | "Moderado";
  gradient: string;
  cantonSlug?: string;
  fecha: string;
  secciones: GuiaSeccion[];
  keywords: string[];
};

export type TipoBusqueda = "hoteles" | "atractivos" | "cantones" | "guias";

export type ItemBusqueda = {
  id: string;
  nombre: string;
  tipo: TipoBusqueda;
  descripcion: string;
  href: string;
  emoji: string;
  lat: number;
  lng: number;
};
