import type { FavoriteAnimal } from "../types/FavoriteAnimal";

const FAVOURITES_KEY = "favouriteAnimals";

// Get all favorite animals from localStorage
export async function getFavoriteAnimals(): Promise<FavoriteAnimal[]> {
    try {
        const storedFavourites = localStorage.getItem(FAVOURITES_KEY);
        if (!storedFavourites) {
            return [];
        }
        return JSON.parse(storedFavourites) as FavoriteAnimal[];
    } catch (error) {
        console.error("Failed to load favourites:", error);
        return [];
    }
}

// Add a favorite animal to localStorage
export async function saveFavoriteAnimal(animal: FavoriteAnimal): Promise<void> {
    try {
        const favourites = await getFavoriteAnimals();
        const alreadyExists = favourites.some((favorite) => favorite.id === animal.id);

        if (!alreadyExists) {
            favourites.push(animal);
            localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
            window.dispatchEvent(new Event("favourites-changed"));
        }
    } catch (error) {
        console.error("Failed to save favourite:", error);
        throw error;
    }
}

// Remove a favorite animal from localStorage
export async function removeFavoriteAnimal(animalId: number): Promise<void> {
    try {
        const favourites = await getFavoriteAnimals();
        const filtered = favourites.filter((favorite) => favorite.id !== animalId);
        localStorage.setItem(FAVOURITES_KEY, JSON.stringify(filtered));
        window.dispatchEvent(new Event("favourites-changed"));
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
