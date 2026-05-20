import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { FavoriteAnimal } from "../../types/FavoriteAnimal";
import {
  getFavoriteAnimals,
  removeFavoriteAnimal,
} from "../../services/favouritesService";
import "../../styles/favorites.css";

function FavoritesSection() {
  const [favorites, setFavorites] = useState<FavoriteAnimal[]>([]);
  const [selectedFavoriteIds, setSelectedFavoriteIds] = useState<number[]>([]);

  const loadFavorites = async () => {
    const favs = await getFavoriteAnimals();
    setFavorites(favs);
  };

  const toggleFavoriteSelection = (animalId: number) => {
    setSelectedFavoriteIds((currentSelected) =>
      currentSelected.includes(animalId)
        ? currentSelected.filter((id) => id !== animalId)
        : [...currentSelected, animalId]
    );
  };

  const toggleSelectAll = () => {
    // geänderter Code: select-all implemented (20.05.2026)
    if (selectedFavoriteIds.length === favorites.length) {
      setSelectedFavoriteIds([]);
      return;
    }

    setSelectedFavoriteIds(favorites.map((animal) => animal.id));
  };

  const handleDeleteSelected = async () => {
    // geänderter Code: batch delete implementation (20.05.2026)
    if (selectedFavoriteIds.length === 0) {
      return;
    }

    try {
      await Promise.all(selectedFavoriteIds.map((animalId) => removeFavoriteAnimal(animalId)));
      setSelectedFavoriteIds([]);
      await loadFavorites();
    } catch (error) {
      console.error("Failed to delete selected favorites:", error);
    }
  };

  useEffect(() => {
    loadFavorites();

    window.addEventListener("favourites-changed", loadFavorites);

    return () => {
      window.removeEventListener("favourites-changed", loadFavorites);
    };
  }, []);

  useEffect(() => {
    setSelectedFavoriteIds((currentSelected) =>
      currentSelected.filter((id) => favorites.some((animal) => animal.id === id))
    );
  }, [favorites]);

  const allSelected = favorites.length > 0 && selectedFavoriteIds.length === favorites.length;

  return (
    <section className="favorites-section">
      <div className="favorites-header">
        <h2>Favorites</h2>

        <div className="favorites-actions">
          <label className="favorites-select-all">
            <span>select all</span>

            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              aria-label="Select all favorites"
            />
          </label>

          <button
            type="button"
            className="favorites-delete-button"
            onClick={handleDeleteSelected}
            disabled={selectedFavoriteIds.length === 0}
          >
            Delete
          </button>
        </div>
      </div>

      {favorites.length === 0 ? (
        <article className="favorite-card favorite-card-default">
          <img
            src="/images/default/default-favorites-1-hell-desktop.png"
            alt="Default favorite marine placeholder"
            className="favorite-image"
          />

          <div className="favorite-info">
            <p className="favorite-common-name">No favorites yet</p>
            <p className="favorite-scientific-name">
              Select animals with the favorite checkbox
            </p>
          </div>
        </article>
      ) : (
        <div className="favorites-grid">
          {favorites.map((animal) => (
            // geänderter Code: per-item checkbox added (20.05.2026)
            <article
              key={animal.id}
              className="favorite-card"
            >
              <label className="favorite-card-select">
                <input
                  type="checkbox"
                  checked={selectedFavoriteIds.includes(animal.id)}
                  onChange={() => toggleFavoriteSelection(animal.id)}
                  aria-label={`Select ${animal.name}`}
                />
              </label>

              <Link to={`/animal/${animal.id}`} className="favorite-card-link">
                <img
                  src={animal.imageUrl}
                  alt={animal.name}
                  className="favorite-image"
                />

                <div className="favorite-info">
                  <p className="favorite-scientific-name">
                    {animal.scientificName}
                  </p>
                  <p className="favorite-common-name">{animal.name}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritesSection;