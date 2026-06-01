import { useTranslation } from "react-i18next";
import { useEffect, useState, type ChangeEvent } from "react";
import { speciesService } from "../../services/animalService";
import type { Animal } from "../../types/Animal";
import { Link } from "react-router-dom";
import style from "./AnimalList.module.css";
import { authService } from "../../services/authService";
import {
  removeFavoriteAnimal,
  saveFavoriteAnimal,
  getFavoriteAnimals,
} from "../../services/favouritesService";

export default function AnimalList() {
  const { i18n, t } = useTranslation();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  // =================================================
  useEffect(() => {
    async function loadFavourites() {
      try {
        const favourites = await getFavoriteAnimals(i18n.language);

        setIsFavourite(favourites.map((fav) => fav.id));
      } catch (error) {
        console.error("Failed to load favourites:", error);
      }
    }

    loadFavourites();

    window.addEventListener("favourites-changed", loadFavourites);

    return () => {
      window.removeEventListener("favourites-changed", loadFavourites);
    };
  }, [i18n.language]);
  // const [animal, setAnimal] = useState<AnimalDetail | null>(null);
  const [isFavourite, setIsFavourite] = useState<number[]>([]);
  const handleFavouriteChange = async (
    event: ChangeEvent<HTMLInputElement>,
    animal: Animal,
  ) => {
    if (!authService.isAuthenticated()) {
      event.preventDefault();
      event.stopPropagation();
      window.dispatchEvent(new Event("favorite-login-required"));
      return;
    }

    const checked = event.target.checked;

    try {
      if (checked) {
        setIsFavourite((prev) => [...prev, animal.id]);

        await saveFavoriteAnimal({
          id: animal.id,
          name: animal.name,
          scientificName: animal.scientificName,
          imageUrl: animal.imageUrl,
        });

        return;
      }

      setIsFavourite((prev) => prev.filter((id) => id !== animal.id));

      await removeFavoriteAnimal(animal.id);
    } catch (error) {
      console.error("Failed to update favorite state:", error);
    }
  };
  // =========================================================
  useEffect(() => {
    async function fetchAnimals() {
      try {
        setLoading(true);

        const data = await speciesService.getAll(i18n.language);
        setAnimals(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimals();
  }, [i18n.language]);

  if (loading) return <p>{t("list.loadingAnimals")}</p>;

  return (
    <main className={style.mainContainer}>
      <div className={style.cardContainer}>
        {animals.length === 0 ? (
          <p>{t("list.noAnimals")}</p>
        ) : (
          animals.map((animal) => (
            <div key={animal.id} className={style.cardwrapper}>
              <Link
                to={`/animal/${animal.id}`}
                className={style.cardLink}
              >
                <div className={style.card}>
                  <h3 className="">{animal.name}</h3>
                  <div className={style.wrapper}>
                    <img src={animal.imageUrl} alt="" className={style.pic} />
                  </div>
                  <p className={style.categoryName}>
                    {t(`animalCategories.${animal.category}`)}
                  </p>
                </div>
              </Link>
              <label className={style.favoriteCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={isFavourite.includes(animal.id)}
                  onChange={(event) => handleFavouriteChange(event, animal)}
                />
                {t("animal.favorite")}
              </label>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
