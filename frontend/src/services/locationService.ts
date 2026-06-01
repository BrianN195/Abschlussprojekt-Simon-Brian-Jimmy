import type { Location } from "../types/Locations";

const API_BASE_URL = "/api/v1";
const API_URL = `${API_BASE_URL}/resorts`;

type ApiError = {
  error?: string;
  message?: string;
};

async function parseJsonSafe<T>(response: Response): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch {
    return {} as T;
  }
}

function buildHeaders(locale?: string) {
  return locale ? { "Accept-Language": locale } : undefined;
}

export const locationService = {
  // Alle Locations / Resorts holen
  getAll: async (locale?: string): Promise<Location[]> => {
    const res = await fetch(`${API_URL}`, { headers: buildHeaders(locale) });

    const data = await parseJsonSafe<Location[] | ApiError>(res);

    if (!res.ok) {
      throw new Error((data as ApiError).error || "Failed to fetch locations");
    }

    return data as Location[];
  },

  // Einzelne Location
  getById: async (id: number, locale?: string): Promise<Location> => {
    const res = await fetch(`${API_URL}/${id}`, { headers: buildHeaders(locale) });

    const data = await parseJsonSafe<Location | ApiError>(res);

    if (!res.ok) {
      throw new Error((data as ApiError).error || "Location not found");
    }

    return data as Location;
  },

  // Tiere einer Location holen (JOIN Endpoint)
  getAnimalsByLocation: async (id: number, locale?: string) => {
    const res = await fetch(`${API_URL}/${id}/animals`, { headers: buildHeaders(locale) });

    const data = await parseJsonSafe<any | ApiError>(res);

    if (!res.ok) {
      throw new Error((data as ApiError).error || "Failed to fetch animals");
    }

    return data;
  },
};