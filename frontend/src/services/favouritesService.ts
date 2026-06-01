import type { FavoriteAnimal } from "../types/FavoriteAnimal";
import { authService } from "./authService";

const API_BASE_URL = "/api/v1";
const API_URL = `${API_BASE_URL}/favorites`;

type ApiError = {
    error?: string;
    message?: string;
};

type FavoriteChangeDetail = {
    action: "added" | "removed";
    animalId: number;
};

async function parseJsonSafe<T>(response: Response): Promise<T> {
    try {
        return (await response.json()) as T;
    } catch {
        return [] as T;
    }
}

function buildHeaders(): HeadersInit {
    const authHeader = authService.getAuthHeader();

    return {
        "Content-Type": "application/json",
        ...(authHeader ? (authHeader as Record<string, string>) : {}),
    };
}

function buildLocaleHeaders(locale?: string): HeadersInit {
    return locale ? { "Accept-Language": locale } : {};
}

function dispatchFavoriteChange(detail: FavoriteChangeDetail) {
    window.dispatchEvent(new CustomEvent<FavoriteChangeDetail>("favourites-changed", { detail }));
}

// Get all favorite animals from the backend database
export async function getFavoriteAnimals(locale?: string): Promise<FavoriteAnimal[]> {
    try {
        if (!authService.isAuthenticated()) {
            return [];
        }

        const response = await fetch(API_URL, {
            method: "GET",
            headers: { ...buildHeaders(), ...buildLocaleHeaders(locale) },
        });

        const data = await parseJsonSafe<FavoriteAnimal[] | ApiError>(response);

        if (!response.ok) {
            throw new Error((data as ApiError).error || "Failed to load favorites");
        }

        return data as FavoriteAnimal[];
    } catch (error) {
        console.error("Failed to load favourites:", error);
        return [];
    }
}

// Add a favorite animal in the backend database
export async function saveFavoriteAnimal(animal: FavoriteAnimal): Promise<void> {
    try {
        if (!authService.isAuthenticated()) {
            return;
        }

        const response = await fetch(`${API_URL}/${animal.id}`, {
            method: "POST",
            headers: buildHeaders(),
        });

        const data = await parseJsonSafe<FavoriteAnimal[] | ApiError>(response);

        if (!response.ok) {
            throw new Error((data as ApiError).error || "Failed to save favourite");
        }

        dispatchFavoriteChange({ action: "added", animalId: animal.id });
    } catch (error) {
        console.error("Failed to save favourite:", error);
        throw error;
    }
}

// Remove a favorite animal from the backend database
export async function removeFavoriteAnimal(animalId: number): Promise<void> {
    try {
        if (!authService.isAuthenticated()) {
            return;
        }

        const response = await fetch(`${API_URL}/${animalId}`, {
            method: "DELETE",
            headers: buildHeaders(),
        });

        const data = await parseJsonSafe<FavoriteAnimal[] | ApiError>(response);

        if (!response.ok) {
            throw new Error((data as ApiError).error || "Failed to remove favourite");
        }

        dispatchFavoriteChange({ action: "removed", animalId: animalId });
    } catch (error) {
        console.error("Failed to remove favourite:", error);
        throw error;
    }
}

// Check if an animal is in favorites
export async function isFavouriteAnimal(animalId: number): Promise<boolean> {
    try {
        const favourites = await getFavoriteAnimals();
        return favourites.some((favorite) => favorite.id === animalId);
    } catch (error) {
        console.error("Failed to check favourite:", error);
        return false;
    }
}
