import { useEffect, useState } from "react";
import type { LocationDetail } from "../../types/Locations";
import { Link, useParams } from "react-router-dom";
import styles from "./Location.module.css";

export default function Location() {
  const { id } = useParams();
  const [location, setLocation] = useState<LocationDetail | null>(null);
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/resorts/${id}/animal`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLocation(data);
      });
  }, [id]);
  if (!location) return <p>Loading</p>;
  return (
    <main className={styles.locationPage}>
      <div className={styles.uprow}>
        <div className={styles.hardInfoContainer}>
          <div className={styles.nameContainer}>
            <h2 className={styles.title}>{location.name}</h2>

            <div className={styles.statContainer}>
              <div className={styles.stat}>
                <p>depth</p>
                <p>{location.depth}</p>
              </div>
              <div className={styles.stat}>
                <p>latitude</p>
                <p>{location.latitude}</p>
              </div>
              <div className={styles.stat}>
                <p>longitude</p>
                <p>{location.longitude}</p>
              </div>
              <div className={styles.stat}>
                <p>Region</p>
                <p>{location.region}</p>
              </div>
              <div className={styles.stat}>
                <p>Location Type</p>
                <p>{location.type}</p>
              </div>
            </div>
          </div>
        </div>

        <img
          src={location.imageUrl}
          alt={location.name}
          className={styles.bild}
        />

        <div className={styles.appearList}>
          <h6 className={styles.title}>Animals here</h6>

          <ul>
            {location.animals?.map((animal) => {
              return (
                <Link
                  className={styles.link}
                  to={`/animal/${animal.id}`}
                  key={animal.id}
                >
                  <li>{animal.name}</li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={styles.downrow}>
        <section className={styles.about}>
          <h6 className={styles.aboutTitle}>About</h6>

          <p style={{ whiteSpace: "pre-line" }} className={styles.aboutText}>
            {location.description}
          </p>
        </section>
      </div>
    </main>
  );
}
