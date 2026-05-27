import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import type { FavoriteAnimal } from "../../types/FavoriteAnimal";
import {
  getFavoriteAnimals,
  removeFavoriteAnimal,
} from "../../services/favouritesService";
import "../../styles/favorites.css";

function FavoritesSection() {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<FavoriteAnimal[]>([]);
  const [selectedFavoriteIds, setSelectedFavoriteIds] = useState<number[]>([]);
  const carouselViewportRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const visibleCount = 4;

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

  const getPageCount = () => Math.max(1, Math.ceil(favorites.length / visibleCount));

  const updateCurrentPage = () => {
    const viewport = carouselViewportRef.current;

    if (!viewport) {
      setCurrentPage(0);
      return;
    }

    const nextPage = Math.round(viewport.scrollLeft / viewport.clientWidth);
    setCurrentPage(Math.min(Math.max(nextPage, 0), getPageCount() - 1));
  };

  const scrollCarousel = (direction: -1 | 1) => {
    const viewport = carouselViewportRef.current;

    if (!viewport) {
      return;
    }

    const nextPage = Math.min(Math.max(currentPage + direction, 0), getPageCount() - 1);

    viewport.scrollTo({
      left: nextPage * viewport.clientWidth,
      behavior: "smooth",
    });

    setCurrentPage(nextPage);
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

  useEffect(() => {
    updateCurrentPage();

    const viewport = carouselViewportRef.current;

    const handleScroll = () => updateCurrentPage();

    if (viewport) {
      viewport.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (viewport) viewport.removeEventListener("scroll", handleScroll);
    };
  }, [favorites]);

  useEffect(() => {
    setCurrentPage((current) => Math.min(current, getPageCount() - 1));
  }, [favorites]);

  const allSelected = favorites.length > 0 && selectedFavoriteIds.length === favorites.length;

  return (
    <section className="favorites-section">
      <div className="favorites-header">
        <h2>{t('favorites.title')}</h2>

        <div className="favorites-actions">
          <label className="favorites-select-all">
            <span>{t('favorites.selectAll')}</span>

            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              aria-label={t('favorites.selectAll')}
            />
          </label>

          <button
            type="button"
            className="favorites-delete-button"
            onClick={handleDeleteSelected}
            disabled={selectedFavoriteIds.length === 0}
          >
            {t('favorites.delete')}
          </button>
        </div>
      </div>

      {favorites.length === 0 ? (
        <article className="favorite-card favorite-card-default">
          <img
            src="/images/default/default-favorites-1-hell-desktop.png"
            alt={t('favorites.placeholderAlt')}
            className="favorite-image"
          />

          <div className="favorite-info">
            <p className="favorite-common-name">{t('favorites.emptyTitle')}</p>
            <p className="favorite-scientific-name">{t('favorites.emptySubtitle')}</p>
          </div>
        </article>
      ) : (
        <div className="favorites-carousel">
          {favorites.length > visibleCount && currentPage > 0 && (
            <button
              type="button"
              className="favorites-carousel-button favorites-carousel-button-left visible"
              onClick={() => scrollCarousel(-1)}
              aria-label="Scroll favorites left"
            >
              ‹
            </button>
          )}

          <div className="favorites-carousel-viewport" ref={carouselViewportRef}>
            <div className="favorites-carousel-track">
              {favorites.map((animal) => (
                // geänderter Code: per-item checkbox added (20.05.2026)
                <article
                  key={animal.id}
                  className="favorite-card"
                >
                  <input
                    className="favorite-card-checkbox"
                    type="checkbox"
                    checked={selectedFavoriteIds.includes(animal.id)}
                    onChange={() => toggleFavoriteSelection(animal.id)}
                    aria-label={`Select ${animal.name}`}
                  />

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
          </div>

          {favorites.length > visibleCount && currentPage < getPageCount() - 1 && (
            <button
              type="button"
              className="favorites-carousel-button favorites-carousel-button-right visible"
              onClick={() => scrollCarousel(1)}
              aria-label="Scroll favorites right"
            >
              ›
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default FavoritesSection;