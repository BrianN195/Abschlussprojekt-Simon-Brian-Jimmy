import { useEffect, useState, type ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import type { AnimalDetail } from "../../types/Animal";
import {
  isFavouriteAnimal,
  removeFavoriteAnimal,
  saveFavoriteAnimal,
} from "../../services/favouritesService";
import "../../styles/animal.css";

export default function Animal() {
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
  }, [id]);

  const handleFavouriteChange = async (
    event: ChangeEvent<HTMLInputElement>
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
    <main>
      <div className="hardInfoContainer">
        <img
          src={animal.imageUrl}
          alt={animal.imageUrl}
          className="bild"
        />
        <div className="nameContainer">
          <h2 className="title">{animal.name}</h2>
          <p className="scientificName">{animal.scientificName}</p>
          <label className="favoriteCheckboxLabel">
            <input
              type="checkbox"
              checked={isFavourite}
              onChange={handleFavouriteChange}
            />
            Favorite
          </label>
        
        </div>
      </div>
      <section className="about">
        <h6 className="title">About</h6>
        {/* der inline style ist für ein mehrzeiligen text einfach */}
        <p style={{ whiteSpace: "pre-line" }}>{animal.description}</p>
      </section>
      <div className="appearList">
        <h6 className="title">appears here</h6>
        <ul>
          {animal.locations?.map((location) => {
            return <li key={location.id}>{location.name}</li>;
            // hier noch Navlink dann zu den jewaligen locations
          })}
        </ul>
      </div>
      
    </main>
  );
}
