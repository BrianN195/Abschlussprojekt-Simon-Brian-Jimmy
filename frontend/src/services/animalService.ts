import type { Animal } from "../types/Animal";
const API_BASE_URL = "/api/v1";
const API_URL = `${API_BASE_URL}/species`;

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

export const speciesService = {
  // Alle Tiere holen
  getAll: async (locale?: string): Promise<Animal[]> => {
    const res = await fetch(`${API_URL}`, { headers: buildHeaders(locale) });

    const data = await parseJsonSafe<Animal[] | ApiError>(res);

    if (!res.ok) {
      throw new Error((data as ApiError).error || "Failed to fetch animals");
    }

    return data as Animal[];
  },

  // Einzelnes Tier
  getById: async (id: number, locale?: string): Promise<Animal> => {
    const res = await fetch(`${API_URL}/${id}`, { headers: buildHeaders(locale) });

    const data = await parseJsonSafe<Animal | ApiError>(res);

    if (!res.ok) {
      throw new Error((data as ApiError).error || "Animal not found");
    }

    return data as Animal;
  },

  // Locations (falls dein Backend das sauber fixed hat)
  getLocations: async (id: number, locale?: string) => {
    const res = await fetch(`${API_URL}/${id}/locations`, { headers: buildHeaders(locale) });

    const data = await parseJsonSafe<any | ApiError>(res);

    if (!res.ok) {
      throw new Error((data as ApiError).error || "Failed to fetch locations");
    }

    return data;
  },
};