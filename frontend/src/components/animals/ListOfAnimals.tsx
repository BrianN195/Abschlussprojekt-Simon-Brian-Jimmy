import { useEffect, useState } from "react";
import { speciesService } from "../../services/animalService";
import type { Animal } from "../../types/Animal";
import { Link } from "react-router-dom";
import style from "./AnimalList.module.css";

export default function AnimalList() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Lade Tiere...</p>;

  return (
    <main className={style.mainContainer}>
      <div className={style.cardContainer}>
        {animals.length === 0 ? (
          <p>Keine Tiere gespeichert</p>
        ) : (
          animals.map((animal) => (
            <Link
              key={animal.id}
              to={`/animal/${animal.id}`}
              className={style.cardLink}
            >
              <div key={animal.id} className={style.card}>
                <h3 className="">{animal.name}</h3>
                <img src={animal.imageUrl} alt="" className={style.pic} />
                <p className={style.categoryName}>{animal.category}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
