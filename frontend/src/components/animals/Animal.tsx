import { useTranslation } from 'react-i18next';
import { useEffect, useState, type ChangeEvent } from "react";
import { Link, useParams } from "react-router-dom";
import type { AnimalDetail } from "../../types/Animal";
import {
  isFavouriteAnimal,
  removeFavoriteAnimal,
  saveFavoriteAnimal,
} from "../../services/favouritesService";

import styles from "./Animalcopy.module.css";

export default function Animal() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [animal, setAnimal] = useState<AnimalDetail | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/species/${id}/locations`)
      .then((res) => res.json())
      .then((data) => setAnimal(data));
  }, [id]);

  useEffect(() => {
    const loadFavouriteState = async () => {
      if (!id) return;

      const animalId = Number(id);
      const favourite = await isFavouriteAnimal(animalId);
      setIsFavourite(favourite);
    };

    loadFavouriteState();

    // geänderter Code: listen for favourites-changed to sync checkbox state (20.05.2026)
    window.addEventListener("favourites-changed", loadFavouriteState);

    return () => {
      window.removeEventListener("favourites-changed", loadFavouriteState);
    };
  }, [id]);

  const handleFavouriteChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (!animal) return;

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

  if (!animal) return <p>Loading</p>;
  return (
    <main className={styles.animalCard}>
      <div className={styles.uprow}>
        <div className={styles.hardInfoContainer}>
          <div className={styles.nameContainer}>
            <h2 className={styles.title}>{animal.name}</h2>
            <p className={styles.scientificName}>{animal.scientificName}</p>
            <div className={styles.statContainer}>
              <div className={styles.stat}>
                <p>Depth Range</p>
                <p>{animal.depthRange}</p>
              </div>
              <div className={styles.stat}>
                <p>Category</p>
                <p>{animal.category}</p>
              </div>
              <div className={styles.stat}>
                <p>Size</p>
                <p>{animal.size}</p>
              </div>
            </div>
            <label className={styles.favoriteCheckboxLabel}>
              <input
                type="checkbox"
                checked={isFavourite}
                onChange={handleFavouriteChange}
              />
              Favorite
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
          <h6 className={styles.title}>appears here</h6>

          <ul>
            {animal.locations?.map((location) => {
              return <Link className={styles.link} to={`/location/${location.id}`}> <li key={location.id}>{location.name}</li></Link>;
            })}
          </ul>
        </div>
      </div>
      <div className={styles.downrow}>
        <section className={styles.about}>
          <h6 className={styles.aboutTitle}>About</h6>
          {/* der inline style ist für ein mehrzeiligen text einfach */}
          <p style={{ whiteSpace: "pre-line" }} className={styles.aboutText}>{animal.description}</p>
        </section>
      </div>
    </main>
  );
}
