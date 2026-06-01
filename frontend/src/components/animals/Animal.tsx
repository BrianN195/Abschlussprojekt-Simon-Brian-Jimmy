import { useTranslation } from "react-i18next";
import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import type { AnimalDetail } from "../../types/Animal";
import type { Location } from "../../types/Locations";
import { authService } from "../../services/authService";
import {
  isFavouriteAnimal,
  removeFavoriteAnimal,
  saveFavoriteAnimal,
} from "../../services/favouritesService";

import styles from "./Animalcopy.module.css";

const API_BASE_URL = "/api/v1";

export default function Animal() {
  const { i18n, t } = useTranslation();
  const { id } = useParams();
  const [animal, setAnimal] = useState<AnimalDetail | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    const signal = controller.signal;

    const loadAnimal = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/species/${id}`, {
          headers: { "Accept-Language": i18n.language },
          signal,
        });
        if (!res.ok) throw new Error("Failed to load animal");
        const data = await res.json();
        setAnimal(data);
      } catch (err) {
        if ((err as any).name !== "AbortError") console.error(err);
      }
    };

    const loadLocations = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/species/${id}/locations`,
          {
            headers: { "Accept-Language": i18n.language },
            signal,
          },
        );
        if (!res.ok) throw new Error("Failed to load locations");
        const data = await res.json();
        // backend may return { locations: [...] } or an array
        setLocations(data.locations ?? data);
      } catch (err) {
        if ((err as any).name !== "AbortError") console.error(err);
      }
    };

    loadAnimal();
    loadLocations();

    return () => controller.abort();
  }, [id, i18n.language]);

  useEffect(() => {
    const loadFavouriteState = async () => {
      if (!id) return;
      const animalId = Number(id);
      const favourite = await isFavouriteAnimal(animalId);
      setIsFavourite(favourite);
    };

    loadFavouriteState();
    window.addEventListener("favourites-changed", loadFavouriteState);
    return () => {
      window.removeEventListener("favourites-changed", loadFavouriteState);
    };
  }, [id]);

  const handleFavouriteChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!animal) return;

    if (!authService.isAuthenticated()) {
      event.preventDefault();
      event.stopPropagation();
      setIsFavourite(false);
      window.dispatchEvent(new Event("favorite-login-required"));
      return;
    }

    const checked = event.target.checked;
    setIsFavourite(checked);

    try {
      if (checked) {
        await saveFavoriteAnimal({
          id: animal.id,
          name: animal.name,
          scientificName: animal.scientificName,
          imageUrl: animal.imageUrl,
        });
        return;
      }

      await removeFavoriteAnimal(animal.id);
    } catch (error) {
      console.error("Failed to update favorite state:", error);
      setIsFavourite(!checked);
    }
  };

  if (!animal) return <p>{t("animal.loading")}</p>;

  return (
    <main className={styles.animalCard}>
      <div className={styles.uprow}>
        <div className={styles.hardInfoContainer}>
          <div className={styles.nameContainer}>
            <h2 className={styles.title}>{animal.name}</h2>
            <p className={styles.scientificName}>{animal.scientificName}</p>

            <div className={styles.statContainer}>
              <div className={styles.stat}>
                <p>{t("animal.depthRange")}</p>
                <p>{animal.depthRange}</p>
              </div>
              <div className={styles.stat}>
                <p>{t("animal.category")}</p>
                <p>{t(`animalCategories.${animal.category}`)}</p>
              </div>
              <div className={styles.stat}>
                <p>{t("animal.size")}</p>
                <p>{animal.size}</p>
              </div>
            </div>

            <label className={styles.favoriteCheckboxLabel}>
              <input
                type="checkbox"
                checked={isFavourite}
                onChange={handleFavouriteChange}
              />
              {t("animal.favorite")}
            </label>
          </div>
        </div>

        <div className="imageWrapper">
          <img
            src={animal.imageUrl}
            alt={animal.imageUrl}
            className={styles.bild}
          />
        </div>

        <div className={styles.appearList}>
          <h6 className={styles.title}>{t("animal.locations")}</h6>

          <ul>
            {locations.map((location) => (
              <Link
                className={styles.link}
                to={`/location/${location.id}`}
                key={location.id}
              >
                <li>{location.name}</li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.downrow}>
        <section className={styles.about}>
          <h6 className={styles.aboutTitle}>{t("animal.about")}</h6>
          <p style={{ whiteSpace: "pre-line" }} className={styles.aboutText}>
            {animal.description}
          </p>
        </section>
      </div>
    </main>
  );
}