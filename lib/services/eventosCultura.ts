export interface EventoCantonRef {
  slug: string;
  nombre: string;
}

export interface EventoCultural {
  id: number;
  nombre: string;
  slug: string;
  fechaInicio: string;
  fechaFin: string | null;
  lugar: string;
  resumen?: string;
  imagenUrl: string;
  mapaUrl?: string | null;
  organizador?: string;
  categoria?: string;
  categoriaSlug?: string;
  parroquia?: string;
  canton: EventoCantonRef;
  canonicalUrl: string;
  flywheelLink: string;
}

export interface EventosTurismoResponse {
  success: boolean;
  cantonConsultado: string;
  total: number;
  totalVigentesProvincia: number;
  conteoPorCanton: Record<string, number>;
  eventos: EventoCultural[];
}

const DEFAULT_RESPONSE: EventosTurismoResponse = {
  success: false,
  cantonConsultado: "todos",
  total: 0,
  totalVigentesProvincia: 0,
  conteoPorCanton: {},
  eventos: [],
};

/**
 * Consulta la API en vivo de Agenda Cultural Loja (agendaculturalloja.com)
 * Revalidación ISR cada 60s (Next.js Cache).
 */
export async function getEventosCanton(
  cantonSlug: string = "todos"
): Promise<EventosTurismoResponse> {
  const slugNormalizado = (cantonSlug || "todos").toLowerCase().trim();

  try {
    const res = await fetch(
      `https://www.agendaculturalloja.com/api/eventos/turismo?canton=${encodeURIComponent(
        slugNormalizado
      )}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.error(
        `[AgendaCultural API] Error HTTP ${res.status} al consultar cantón: ${slugNormalizado}`
      );
      return { ...DEFAULT_RESPONSE, cantonConsultado: slugNormalizado };
    }

    const data: EventosTurismoResponse = await res.json();
    return {
      success: Boolean(data.success),
      cantonConsultado: data.cantonConsultado || slugNormalizado,
      total: typeof data.total === "number" ? data.total : data.eventos?.length || 0,
      totalVigentesProvincia:
        typeof data.totalVigentesProvincia === "number"
          ? data.totalVigentesProvincia
          : 0,
      conteoPorCanton: data.conteoPorCanton || {},
      eventos: Array.isArray(data.eventos) ? data.eventos : [],
    };
  } catch (error) {
    console.error(
      `[AgendaCultural API] Error de red consultando cantón "${slugNormalizado}":`,
      error
    );
    return { ...DEFAULT_RESPONSE, cantonConsultado: slugNormalizado };
  }
}

/**
 * Formatea fechas ISO en etiquetas legibles amigables ("Hoy", "Mañana", "Sáb 24 Oct", rango)
 */
export function formatearFechaEvento(fechaInicioIso: string, fechaFinIso?: string | null): {
  etiquetaBadge: string;
  esHoy: boolean;
  esFinDeSemana: boolean;
  fechaLegible: string;
  horaLegible: string;
} {
  try {
    const inicio = new Date(fechaInicioIso);
    const ahora = new Date();

    const inicioStr = inicio.toLocaleDateString("es-EC", {
      timeZone: "America/Guayaquil",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const ahoraStr = ahora.toLocaleDateString("es-EC", {
      timeZone: "America/Guayaquil",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const mañana = new Date(ahora.getTime() + 24 * 60 * 60 * 1000);
    const mañanaStr = mañana.toLocaleDateString("es-EC", {
      timeZone: "America/Guayaquil",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const esHoy = inicioStr === ahoraStr;
    const esMañana = inicioStr === mañanaStr;

    const diaSemanaNum = inicio.getDay(); // 0 Domingo, 6 Sábado, 5 Viernes
    const esFinDeSemana = diaSemanaNum === 5 || diaSemanaNum === 6 || diaSemanaNum === 0;

    let etiquetaBadge = "";
    if (esHoy) {
      etiquetaBadge = "Hoy";
    } else if (esMañana) {
      etiquetaBadge = "Mañana";
    } else if (esFinDeSemana) {
      etiquetaBadge = "Este Fin de Semana";
    } else {
      etiquetaBadge = inicio.toLocaleDateString("es-EC", {
        timeZone: "America/Guayaquil",
        day: "numeric",
        month: "short",
      });
    }

    const fechaLegible = inicio.toLocaleDateString("es-EC", {
      timeZone: "America/Guayaquil",
      weekday: "short",
      day: "numeric",
      month: "long",
    });

    const horaLegible = inicio.toLocaleTimeString("es-EC", {
      timeZone: "America/Guayaquil",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return {
      etiquetaBadge,
      esHoy,
      esFinDeSemana,
      fechaLegible,
      horaLegible,
    };
  } catch {
    return {
      etiquetaBadge: "Próximamente",
      esHoy: false,
      esFinDeSemana: false,
      fechaLegible: "Fecha por confirmar",
      horaLegible: "",
    };
  }
}
