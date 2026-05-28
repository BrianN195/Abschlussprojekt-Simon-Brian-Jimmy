import { useTranslation } from "react-i18next";
import { useEffect, useState, type ChangeEvent } from "react";
import { speciesService } from "../../services/animalService";
import type { Animal } from "../../types/Animal";
import { Link } from "react-router-dom";
import style from "./AnimalList.module.css";
import {
  removeFavoriteAnimal,
  saveFavoriteAnimal,
  getFavoriteAnimals,
} from "../../services/favouritesService";

export default function AnimalList() {
  const { t } = useTranslation();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  // =================================================
  useEffect(() => {
    async function loadFavourites() {
      try {
        const favourites = await getFavoriteAnimals();

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
  }, []);
  // const [animal, setAnimal] = useState<AnimalDetail | null>(null);
  const [isFavourite, setIsFavourite] = useState<number[]>([]);
  const handleFavouriteChange = async (
    event: ChangeEvent<HTMLInputElement>,
    animal: Animal,
  ) => {
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

        const data = await speciesService.getAll();
        setAnimals(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnimals();
  }, []);

  if (loading) return <p>{t("list.loadingAnimals")}</p>;

  return (
    <main className={style.mainContainer}>
      <div className={style.cardContainer}>
        {animals.length === 0 ? (
          <p>Keine Tiere gespeichert</p>
        ) : (
          animals.map((animal) => (
            <div className={style.cardwrapper}>
              <Link
                key={animal.id}
                to={`/animal/${animal.id}`}
                className={style.cardLink}
              >
                <div key={animal.id} className={style.card}>
                  <h3 className="">{animal.name}</h3>
                  <div className={style.wrapper}>
                    <img src={animal.imageUrl} alt="" className={style.pic} />
                  </div>
                  <p className={style.categoryName}>{animal.category}</p>
                </div>
              </Link>
              <label className={style.favoriteCheckboxLabel}>
                <input
                  type="checkbox"
                  checked={isFavourite.includes(animal.id)}
                  onChange={(event) => handleFavouriteChange(event, animal)}
                />
                Favorite
              </label>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
