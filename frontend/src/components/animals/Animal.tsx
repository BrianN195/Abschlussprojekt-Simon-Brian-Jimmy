import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { AnimalDetail } from "../../types/Animal";
import styles from "./Animal.module.css";

export default function Animal() {
  const { id } = useParams();
  const [animal, setAnimal] = useState<AnimalDetail | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/species/${id}/locations`)
      .then((res) => res.json())
      .then((data) => setAnimal(data));
  }, [id]);
  
  
  if (!animal) return <p>Loading</p>;
  return (
    <main>
      <div className={styles.hardInfoContainer}>
        <img
          src={animal.imageUrl}
          alt={animal.imageUrl}
          className={styles.bild}
        />
        <div className={styles.nameContainer}>
          <h2 className={styles.title}>{animal.name}</h2>
          <p className={styles.scientificName}>{animal.scientificName}</p>
        
        </div>
      </div>
      <section className={styles.about}>
        <h6 className={styles.title}>About</h6>
        {/* der inline style ist für ein mehrzeiligen text einfach */}
        <p style={{ whiteSpace: "pre-line" }}>{animal.description}</p>
      </section>
      <div className={styles.appearList}>
        <h6 className={styles.title}>appears here</h6>
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
