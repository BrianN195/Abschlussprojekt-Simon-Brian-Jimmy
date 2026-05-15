import { useEffect, useState } from "react";
import type { LocationDetail } from "../../types/Locations";
import { useParams } from "react-router-dom";
import styles from "./Location.module.css"

export default function Location() {
    const { id } = useParams();
  const [location, setLocation] = useState<LocationDetail | null>(null);
  useEffect(() => {
      fetch(`http://localhost:5000/api/v1/resorts/${id}/animal`)
        .then((res) => res.json())
        .then((data) => setLocation(data));
    }, [id]);
    if (!location) return <p>Loading</p>;
  return (
    <main>
      <div className={styles.hardInfoContainer}>
        <img
          src={location.imageUrl}
          alt={location.imageUrl}
          className={styles.bild}
        />
        <div className={styles.nameContainer}>
          <h2 className={styles.title}>{location.name}</h2>
          
        </div>
      </div>
      <section className={styles.about}>
        <h6 className={styles.title}>About</h6>
        {/* der inline style ist für ein mehrzeiligen text einfach */}
        <p style={{ whiteSpace: "pre-line" }}>{location.description}</p>
      </section>
      <div className={styles.appearList}>
        <h6 className={styles.title}>appears here</h6>
        <ul>
          {location.animals?.map((animal) => {
            return <li key={animal.id}>{animal.name}</li>;
            // hier noch Navlink dann zu den jewaligen locations
          })}
        </ul>
      </div>
      
    </main>
  )
}
