import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { FavoriteAnimal } from "../../types/FavoriteAnimal";
import { getFavoriteAnimals } from "../../services/favouritesService";
import "../../styles/favorites.css";

function FavoritesSection() {
  const [favorites, setFavorites] = useState<FavoriteAnimal[]>([]);

  const loadFavorites = async () => {
    const favs = await getFavoriteAnimals();
    setFavorites(favs);
  };

  useEffect(() => {
    loadFavorites();

    window.addEventListener("favourites-changed", loadFavorites);

    return () => {
      window.removeEventListener("favourites-changed", loadFavorites);
    };
  }, []);

  return (
    <section className="favorites-section">
      <h2>Favorites</h2>

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
            <Link
              key={animal.id}
              to={`/animal/${animal.id}`}
              className="favorite-card"
            >
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
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritesSection;